import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { DnsLookupResponseItemComponent } from '../dns-lookup-response-item/dns-lookup-response-item.component';
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
    DnsLookupResponseItemComponent
  ],
  templateUrl: './dns-lookup.component.html',
  styleUrl: './dns-lookup.component.css'
})
export class DnsLookupComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  regex = /^(([A-ZÅÄÖa-zåäö0-9][A-ZÅÄÖa-zåäö0-9\-]*[A-ZÅÄÖa-zåäö0-9]\.)+([A-Za-z]{2,63}\.?))|((\d{1,3}\.){3}\d{1,3})$/;
  form = this.fb.group({
    searchField: ['', Validators.compose([Validators.required, Validators.pattern(this.regex)])],
    cname: new FormControl(false)
  });
  searching = signal<boolean>(false);
  routeSnapShot: ActivatedRouteSnapshot | undefined;

  resp = signal<LookupResponse | undefined>(undefined);
  displayValidationError = false;

  constructor(private fb: FormBuilder,
    private lookupSvc: LookupService,
    private cdr: ChangeDetectorRef,
    private errHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private location: Location) {
    this.routeSnapShot = route.snapshot;
  }

  ngOnInit() {
    this.form.controls.cname.setValue(localStorage.getItem("cname")?.toLowerCase() === 'true' ? true : false);

    const q = this.routeSnapShot?.queryParamMap.get("q");
    if (q) {
      this.form.controls["searchField"].setValue(q);
      this.lookupDNS();
    }

  }
  doReverseLookup(ip: string) {
    this.form.controls["searchField"].setValue(ip);
    this.location.go("/", `q=${ip}`);
    this.lookupDNS();
  }

  lookupDNS() {
    if (this.form.valid) {
      localStorage.setItem("cname", this.form.controls.cname.value?.toString() ?? "false");
      this.resp.set(undefined);
      this.searching.set(true);
      let value = this.form.controls['searchField'].value?.trim() ?? "";
      if (value.endsWith(".")) {
        value = value.slice(0, value.length - 1)
      }
      this.form.controls['searchField'].setValue(value)
      this.location.go("/", `q=${this.form.controls['searchField'].value}`);
      const req: LookupRequest = {
        host: this.form.controls.searchField.value ?? "",
        cname: this.form.controls.cname.value ?? false
      };
      this.lookupSvc.lookup(req).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (data: LookupResponse) => {
          if (data) {
            this.resp.set(data);
          }
          this.searching.set(false);
        },
        error: (err: Error) => {
          //this.errHandler.displayMsgToUser("Unable to get proper lookup from backend", ToastrType.error);
          console.log(err);
          this.searching.set(false);
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

