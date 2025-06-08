import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesSettingsComponent } from './user-roles-settings.component';

describe('UserRolesSettingsComponent', () => {
  let component: UserRolesSettingsComponent;
  let fixture: ComponentFixture<UserRolesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRolesSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRolesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
