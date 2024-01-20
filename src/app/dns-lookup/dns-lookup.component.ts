import { Component } from '@angular/core';
import { LookupResponse } from '../models/lookup-response';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  form = this.fb.group({
    searchField: ['', Validators.required]
  });

  resp: LookupResponse | undefined;
  
  constructor(private fb: FormBuilder) {}

  lookupDNS() {
    if (this.form.valid) {
      this.resp = {};

      const searchValue = this.form.controls['searchField'].value
      //Lookup using the client's host machine's configured dns server:
      

    }
    
  }

}
