import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAssignDetailsComponent } from './room-assign-details.component';

describe('RoomAssignDetailsComponent', () => {
  let component: RoomAssignDetailsComponent;
  let fixture: ComponentFixture<RoomAssignDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAssignDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAssignDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
