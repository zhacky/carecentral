import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorstatusComponent } from './doctorstatus.component';

describe('DoctorstatusComponent', () => {
  let component: DoctorstatusComponent;
  let fixture: ComponentFixture<DoctorstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorstatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
