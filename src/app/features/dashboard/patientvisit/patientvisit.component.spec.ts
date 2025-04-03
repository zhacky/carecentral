import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientvisitComponent } from './patientvisit.component';

describe('PatientvisitComponent', () => {
  let component: PatientvisitComponent;
  let fixture: ComponentFixture<PatientvisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientvisitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
