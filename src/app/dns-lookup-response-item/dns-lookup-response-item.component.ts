import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Result } from '../models/lookup-response';

@Component({
  selector: 'app-dns-lookup-response-item',
  standalone: true,
  imports: [],
  templateUrl: './dns-lookup-response-item.component.html',
  styleUrl: './dns-lookup-response-item.component.css'
})
export class DnsLookupResponseItemComponent {

  @Input() result: Result | undefined;
  @Output() emitLookupReq: EventEmitter<string> = new EventEmitter()


  doReverseLookup(ipOrDns: string) {
    this.emitLookupReq.emit(ipOrDns)
  }
}
