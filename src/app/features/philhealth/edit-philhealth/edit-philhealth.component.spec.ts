import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhilhealthComponent } from './edit-philhealth.component';

describe('EditPhilhealthComponent', () => {
  let component: EditPhilhealthComponent;
  let fixture: ComponentFixture<EditPhilhealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPhilhealthComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditPhilhealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
