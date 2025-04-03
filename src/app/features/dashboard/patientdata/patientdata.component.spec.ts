import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientdataComponent } from './patientdata.component';

describe('PatientdataComponent', () => {
  let component: PatientdataComponent;
  let fixture: ComponentFixture<PatientdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientdataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
