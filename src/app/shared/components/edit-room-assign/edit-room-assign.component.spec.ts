import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomAssignComponent } from './edit-room-assign.component';

describe('EditRoomAssignComponent', () => {
  let component: EditRoomAssignComponent;
  let fixture: ComponentFixture<EditRoomAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRoomAssignComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditRoomAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
