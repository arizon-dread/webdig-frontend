import { Routes } from '@angular/router';
import { DnsLookupComponent } from './dns-lookup/dns-lookup.component';

export const routes: Routes = [
    {path: '**', component: DnsLookupComponent}
];
