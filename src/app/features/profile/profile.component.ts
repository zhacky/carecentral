import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../../shared/components/edit-profile-dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../core/services/auth.service';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { AboutSkillsComponent } from './about-skills/about-skills.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatDialogModule,
    MatListModule,
    MatChipsModule,
    MatProgressBarModule,
    DoctorProfileComponent,
    AboutSkillsComponent,
    UserProfileComponent,
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.profile = this.authService.getCurrentUser();
  }

  openEditProfileDialog(): void {
    console.log('Opening edit profile dialog');
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: { profile: this.profile },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Updated profile:', result);
        this.profile = result;
        localStorage.setItem('currentUser', JSON.stringify(this.profile));
      }
    });
  }
}
