import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhilhealthComponent } from './add-philhealth.component';

describe('AddPhilhealthComponent', () => {
  let component: AddPhilhealthComponent;
  let fixture: ComponentFixture<AddPhilhealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPhilhealthComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddPhilhealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
