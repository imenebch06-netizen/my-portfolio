import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatChipsModule, MatIconModule, MatRippleModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  readonly domains: string[] = [
    'Web Development',
    'Angular & TypeScript',
    'NestJS',
    'AI · RAG',
    'Docker & Kubernetes',
    'UI & Visual Design',
  ];

  readonly pillars = [
    {
      icon: 'groups',
      title: 'ByteCraft Club',
      role: 'Exeternal Relationship & communication Manager',
      text: 'Representing the club and building bridges with partners, guests and other student organizations for every ByteCraft event.',
    },
    {
      icon: 'terminal',
      title: 'Tech & Dev Department',
      role: 'Active Contributor',
      text: 'Hands-on contributor to the department that powers the club\'s own projects — coding, designing and shipping with the team.',
    },
    {
      icon: 'school',
      title: 'ESTIN - École Supérieure en Sciences et Technologies de l\'Informatique et du Numérique  · 1CS',
      role: 'Computer Science Student',
      text: 'Motivated and passionate learner, double-skilled in web development and always curious about new horizons.',
    },
  ];
}
