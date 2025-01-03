import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../../shared/components/edit-profile-dialog/dialog.component';
import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';


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
        MatProgressBarModule
    ],
    templateUrl: './profile.component.html',
    standalone: true,
    styleUrl: './profile.component.css'
  })
  export class ProfileComponent {
    constructor(private dialog: MatDialog) {}

    openEditProfileDialog(): void {
        console.log('Opening edit profile dialog');
        const dialogRef = this.dialog.open(EditProfileDialogComponent, {
        width: '400px',
        });

        dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
            console.log('Updated profile:', result);
            // Update the profile on the main page
        }
        });
    }
  }

