import { Component } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { curveBasis } from 'd3-shape';
import { PatientService } from '../../../core/services/patient.service';
import { Patient } from '../../../core/models/patient.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patientvisit',
  imports: [NgxChartsModule, FormsModule],
  templateUrl: './patientvisit.component.html',
  standalone: true,
  styleUrl: './patientvisit.component.css',
})
export class PatientvisitComponent {
   patientVisitData: any[] = [];
   allPatients: Patient[] = [];
   selectedRange: string = 'monthly';
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2563EB'],
  };
  curveBasis = curveBasis;

   constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe((patients: Patient[]) => {
      this.allPatients = patients;
      this.updateChart();
    });
  }

   onRangeChange() {
    this.updateChart();
  }

   updateChart() {
    let series: any[] = [];
    if (this.selectedRange === 'monthly') {
      series = this.getMonthlyCounts(this.allPatients);
    } else if (this.selectedRange === 'weekly') {
      series = this.getWeeklyCounts(this.allPatients);
    } else if (this.selectedRange === 'daily') {
      series = this.getDailyCounts(this.allPatients);
    }
    this.patientVisitData = [
      {
        name: 'Patients',
        series,
      },
    ];
  }

  getMonthlyCounts(patients: Patient[]): { name: string; value: number }[] {
    // Initialize counts for each month
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const counts = Array(12).fill(0);

    patients.forEach(patient => {
      const dateStr = patient.registrationDate || patient.dateOfBirth;
      if (dateStr) {
        const date = new Date(dateStr);
        const month = date.getMonth(); // 0 = Jan, 11 = Dec
        counts[month]++;
      }
    });

    return months.map((month, i) => ({
      name: month,
      value: counts[i]
    }));
  }

   getWeeklyCounts(patients: Patient[]): { name: string; value: number }[] {
    // Group by week number of the year
    const weekCounts: { [week: string]: number } = {};
    patients.forEach(patient => {
      const dateStr = patient.registrationDate || patient.dateOfBirth;
      if (dateStr) {
        const date = new Date(dateStr);
        const week = this.getWeekNumber(date);
        const label = `W${week}`;
        weekCounts[label] = (weekCounts[label] || 0) + 1;
      }
    });
    // Sort by week label
    return Object.keys(weekCounts).sort().map(week => ({
      name: week,
      value: weekCounts[week]
    }));
  }

   getDailyCounts(patients: Patient[]): { name: string; value: number }[] {
    // Group by date string
    const dayCounts: { [day: string]: number } = {};
    patients.forEach(patient => {
      const dateStr = patient.registrationDate || patient.dateOfBirth;
      if (dateStr) {
        const date = new Date(dateStr);
        const label = date.toISOString().slice(0, 10); // YYYY-MM-DD
        dayCounts[label] = (dayCounts[label] || 0) + 1;
      }
    });
    // Sort by date
    return Object.keys(dayCounts).sort().map(day => ({
      name: day,
      value: dayCounts[day]
    }));
  }

   getWeekNumber(date: Date): number {
    // Returns ISO week number
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year
    tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
    // January 4 is always in week 1
    const week1 = new Date(tempDate.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1
    return (
      1 +
      Math.round(
        ((tempDate.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  }

  // colorScheme: Color = {
  //   name: 'customScheme',
  //   selectable: true,
  //   group: ScaleType.Ordinal,
  //   domain: ['#2563EB'], // Your desired color
  // };

  // curveBasis = curveBasis; // Smooth curve effect
}
