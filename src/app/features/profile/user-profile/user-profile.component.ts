import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [NgIf, NgClass],
  templateUrl: './user-profile.component.html',
  standalone: true,
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  activeTab: 'about' | 'settings' = 'about';
  showCurrentPassword = false;
  showNewPassword = false;
}
