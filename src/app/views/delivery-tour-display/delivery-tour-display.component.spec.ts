import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTourDisplayComponent } from './delivery-tour-display.component';

describe('DeliveryTourDisplayComponent', () => {
  let component: DeliveryTourDisplayComponent;
  let fixture: ComponentFixture<DeliveryTourDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryTourDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryTourDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
