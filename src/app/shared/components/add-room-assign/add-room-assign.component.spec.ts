import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomAssignComponent } from './add-room-assign.component';

describe('AddRoomAssignComponent', () => {
  let component: AddRoomAssignComponent;
  let fixture: ComponentFixture<AddRoomAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoomAssignComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddRoomAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
