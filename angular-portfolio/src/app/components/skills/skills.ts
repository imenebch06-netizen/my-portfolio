import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SubSkill {
  name: string;
  share: number;
}

interface SkillCategory {
  name: string;
  percentage: number;
  color: string;
  subSkills: SubSkill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class SkillsComponent {
  skills: SkillCategory[] = [
    {
      name: 'Backend Architecture',
      percentage: 30,
      color: '#D4A5E8',
      subSkills: [
        { name: 'NestJS', share: 70 },
        { name: 'Django', share: 30 }
      ]
    },
    {
      name: 'Frontend Engineering',
      percentage: 25,
      color: '#6C63FF',
      subSkills: [
        { name: 'Angular & MatDash', share: 70 },
        { name: 'React', share: 30 }
      ]
    },
    {
      name: 'Databases & Cloud DB',
      percentage: 20,
      color: '#00C49F',
      subSkills: [
        { name: 'MySQL & Prisma ORM', share: 60 },
        { name: 'Supabase & Railway', share: 40 }
      ]
    },
    {
      name: 'Conception & UML',
      percentage: 15,
      color: '#FFB800',
      subSkills: [
        { name: 'UML Diagramming', share: 50 },
        { name: 'Brainstorming & System Design', share: 50 }
      ]
    },
    {
      name: 'DevOps & Tooling',
      percentage: 10,
      color: '#27C93F',
      subSkills: [
        { name: 'GitHub & GitLab', share: 80 },
        { name: 'Docker & CI/CD', share: 20 }
      ]
    }
  ];

  get conicGradient(): string {
    let current = 0;
    const segments = this.skills.map(s => {
      const start = current;
      current += s.percentage;
      return `${s.color} ${start}% ${current}%`;
    });
    return `conic-gradient(${segments.join(', ')})`;
  }
}