import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhilhealthDetailsComponent } from './philhealth-details.component';

describe('PhilhealthDetailsComponent', () => {
  let component: PhilhealthDetailsComponent;
  let fixture: ComponentFixture<PhilhealthDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhilhealthDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhilhealthDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
