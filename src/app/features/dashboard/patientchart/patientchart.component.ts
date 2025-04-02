import { Component } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-patientchart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './patientchart.component.html',
  styleUrl: './patientchart.component.css',
})
export class PatientchartComponent {
  view: [number, number] = [230, 180]; // Chart size

  // Chart Data
  patientSatisfactionData = [
    { name: 'Excellent', value: 45251 },
    { name: 'Good', value: 25000 },
    { name: 'Poor', value: 15000 },
  ];

  // Compute total patients
  totalPatients = this.patientSatisfactionData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  // Color Scheme
  colorScheme: any = {
    domain: ['#377DFF', '#28C76F', '#FF9F43'], // Blue, Orange, Green
    group: ScaleType.Ordinal,
  };

  // Options
  showLegend = false;
  explodeSlices = false;
  doughnut = true;
}
