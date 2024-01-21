import { Component, DestroyRef, inject } from '@angular/core';
import { LookupResponse } from '../models/lookup-response';
import { LookupService } from '../services/lookup.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LookupRequest } from '../models/lookup-request';
import { ErrorHandlerService } from '../services/error-handler.service';
import { ToastrType } from '../enums/toastr-type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  resp: LookupResponse | undefined;
  
  constructor(private fb: FormBuilder, private lookupSvc: LookupService, private errHandler: ErrorHandlerService) {}

  lookupDNS() {
    if (this.form.valid) {

      const req: LookupRequest = {
        host: this.form.controls['searchField'].value ?? ""
      };
      this.lookupSvc.lookup(req).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (data: LookupResponse) => {
          if (data) {
            this.resp = data;
          }
        },
        error: (err: Error) => {
          this.errHandler.displayMsgToUser("Unable to get proper lookup from backend", ToastrType.error);
          console.log(err);
        }
      })
     

    }
    
  }

}

