import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnsLookupResponseItemComponent } from './dns-lookup-response-item.component';

describe('DnsLookupResponseItemComponent', () => {
  let component: DnsLookupResponseItemComponent;
  let fixture: ComponentFixture<DnsLookupResponseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnsLookupResponseItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnsLookupResponseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
