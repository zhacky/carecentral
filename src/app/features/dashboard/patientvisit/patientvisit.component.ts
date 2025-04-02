import { Component } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { curveBasis } from 'd3-shape';

@Component({
  selector: 'app-patientvisit',
  imports: [NgxChartsModule],
  templateUrl: './patientvisit.component.html',
  standalone: true,
  styleUrl: './patientvisit.component.css',
})
export class PatientvisitComponent {
  patientVisitData = [
    {
      name: 'Patients',
      series: [
        { name: 'Jan', value: 50 },
        { name: 'Feb', value: 150 },
        { name: 'Mar', value: 40 },
        { name: 'Apr', value: 30 },
        { name: 'May', value: 50 },
        { name: 'Jun', value: 70 },
        { name: 'Jul', value: 140 },
        { name: 'Aug', value: 40 },
        { name: 'Sep', value: 50 },
        { name: 'Oct', value: 160 },
        { name: 'Nov', value: 170 },
        { name: 'Dec', value: 60 },
      ],
    },
  ];

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2563EB'], // Your desired color
  };

  curveBasis = curveBasis; // Smooth curve effect
}
