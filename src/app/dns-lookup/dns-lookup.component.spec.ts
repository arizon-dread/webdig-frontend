import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnsLookupComponent } from './dns-lookup.component';

describe('DnsLookupComponent', () => {
  let component: DnsLookupComponent;
  let fixture: ComponentFixture<DnsLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnsLookupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
