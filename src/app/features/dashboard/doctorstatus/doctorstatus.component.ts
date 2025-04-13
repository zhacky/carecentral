import {Component} from '@angular/core';
import {NgClass} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-doctorstatus',
  imports: [MatTableModule, MatButtonModule, MatChipsModule, NgClass],
  templateUrl: './doctorstatus.component.html',
  styleUrl: './doctorstatus.component.css',
  standalone: true,
})
export class DoctorstatusComponent {
  displayedColumns: string[] = ['doctor', 'status'];

  doctors = [
    {
      name: 'Dr. Jay Soni',
      degree: 'MBBS, MD',
      img: 'assets/doc1.jpg',
      status: 'Available',
    },
    {
      name: 'Dr. Sarah Smith',
      degree: 'BDS, MDS',
      img: 'assets/doc2.jpg',
      status: 'Absent',
    },
    {
      name: 'Dr. Megha Trive',
      degree: 'BHMS',
      img: 'assets/doc3.jpg',
      status: 'Available',
    },
    {
      name: 'Dr. John Deo',
      degree: 'MBBS, MS',
      img: 'assets/doc4.jpg',
      status: 'Available',
    },
    {
      name: 'Dr. Jacob Ryan',
      degree: 'MBBS, MD',
      img: 'assets/doc5.jpg',
      status: 'Absent',
    },
    {
      name: 'Dr. Linda Carter',
      degree: 'MBBS, DNB',
      img: 'assets/doc6.jpg',
      status: 'Available',
    },
  ];
}
