import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LookupRequest } from '../models/lookup-request';
import { LookupResponse } from '../models/lookup-response';
import { ErrorHandlerService } from '../services/error-handler.service';
import { LookupService } from '../services/lookup.service';

@Component({
  selector: 'app-dns-lookup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  templateUrl: './dns-lookup.component.html',
  styleUrl: './dns-lookup.component.css'
})
export class DnsLookupComponent {
  destroyRef = inject(DestroyRef);
  regex = /^(([A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9]\.)+([A-Za-z]{2,63}\.?))|((\d{1,3}\.){3}\d{1,3})$/;
  form = this.fb.group({
    searchField: ['', Validators.compose([Validators.required, Validators.pattern(this.regex)])]
  });
  searching = false;

  resp: LookupResponse | undefined;
  displayValidationError = false;

  constructor(private fb: FormBuilder, private lookupSvc: LookupService, private errHandler: ErrorHandlerService) { }

  doReverseLookup(ip: string) {
    this.form.controls["searchField"].setValue(ip);
    this.lookupDNS();
  }

  lookupDNS() {
    if (this.form.valid) {
      this.resp = undefined;
      this.searching = true;
      this.form.controls['searchField'].setValue(this.form.controls['searchField'].value?.trim() ?? "")
      const req: LookupRequest = {
        host: this.form.controls['searchField'].value ?? ""
      };
      this.lookupSvc.lookup(req).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (data: LookupResponse) => {
          if (data) {
            this.resp = data;
          }
          this.searching = false;
        },
        error: (err: Error) => {
          //this.errHandler.displayMsgToUser("Unable to get proper lookup from backend", ToastrType.error);
          console.log(err);
          this.searching = false;
        }
      });
    } else {
      this.displayValidationError = true;
    }

  }
  validate() {
    if (this.form.valid) {
      this.displayValidationError = false;
    } else {
      this.displayValidationError = true;
    }
  }

}

