import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-about-skills',
  imports: [NgStyle, NgIf, NgForOf, NgClass],
  templateUrl: './about-skills.component.html',
  standalone: true,
  styleUrl: './about-skills.component.css',
})
export class AboutSkillsComponent {
  tab = 'about';

  skills = [
    {
      name: 'OPD',
      level: 40,
      color: 'linear-gradient(to right, #00c6ff, #0072ff)',
    },
    {
      name: 'Operations',
      level: 30,
      color: 'linear-gradient(to right, #f7971e, #ffd200)',
    },
    {
      name: 'Patient Visit',
      level: 35,
      color: 'linear-gradient(to right, #56ccf2, #2f80ed)',
    },
    {
      name: 'RND',
      level: 70,
      color: 'linear-gradient(to right, #da22ff, #9733ee)',
    },
  ];
}
