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

  form = this.fb.group({
    searchField: ['', Validators.required]
  });
  searching = false;

  resp: LookupResponse | undefined;

  constructor(private fb: FormBuilder, private lookupSvc: LookupService, private errHandler: ErrorHandlerService) {}
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


    }

  }

}

