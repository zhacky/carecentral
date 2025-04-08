import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientchartComponent } from './patientchart.component';

describe('PatientchartComponent', () => {
  let component: PatientchartComponent;
  let fixture: ComponentFixture<PatientchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
