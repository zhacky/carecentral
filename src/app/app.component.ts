import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatListModule,
    RouterModule,
    FormsModule,
    MatSelectModule,
    MatTableModule
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'], // Fixed property name
})
export class AppComponent {
  title = 'carecentral';
}
