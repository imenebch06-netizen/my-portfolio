import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatButtonModule, MatIconModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
export class ProjectsComponent {
  projects = [
    {
      title: 'ChronoApp – HR Time Management',
      tech: ['NestJS', 'Angular', 'Prisma', 'MySQL','Typecript'],
      description: 'Full-stack application built for BMT to manage 24/7 scheduling, biometric pointages, and hierarchical leave validation.',
      // SPECIFIC REPOSITORY LINK
      link: 'https://github.com/imenebch06-netizen/chrono-app', 
      icon: 'schedule'
    },
    {
      title: '2CP Academic Projects',
      tech: ['React', 'Django', 'PostgreSQL','Python','Supabase'],
      description: 'Collaborative academic applications built with MVC architecture. These projects, along with others, is hosted on my student repository.',
      // ACADEMIC/SCHOLAR GITHUB ACCOUNT PROFILE LINK
      link: 'https://github.com/minari9797', 
      icon: 'school'
    }
  ];
}