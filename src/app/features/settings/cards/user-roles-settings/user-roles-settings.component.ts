import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-roles-settings',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './user-roles-settings.component.html',
  styleUrl: './user-roles-settings.component.css'
})
export class UserRolesSettingsComponent {
  @Output() editRole = new EventEmitter<string>();
  @Output() addRole = new EventEmitter<string>();
  @Input() roles!: { name: string }[];
  newRoleName = '';

  editRoleHandler(role: string) {
    this.editRole.emit(role);
  }

  addRoleHandler(newRoleName: string) {
    this.addRole.emit(newRoleName);
  }
}
