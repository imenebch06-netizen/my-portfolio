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

interface SkillSegment {
  category: SkillCategory;
  start: number;
  percentage: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class SkillsComponent {
  hoveredIndex: number | null = null;

  get hovered(): SkillCategory | null {
    const index = this.hoveredIndex;
    if (index === null) {
      return null;
    }
    return this.skills[index] ?? null;
  }

  onHover(index: number): void {
    this.hoveredIndex = index;
  }

  onLeave(): void {
    this.hoveredIndex = null;
  }

  get hoveredSubSkills(): SubSkill[] {
    return this.hovered?.subSkills ?? [];
  }

  get segments(): SkillSegment[] {
    let current = 0;
    return this.skills.map(category => {
      const segment: SkillSegment = { category, start: current, percentage: category.percentage };
      current += category.percentage;
      return segment;
    });
  }

  segmentDasharray(index: number): string {
    const segment = this.segments[index];
    return `${segment.percentage} ${100 - segment.percentage}`;
  }

  segmentOffset(index: number): string {
    const segment = this.segments[index];
    // Dash offset positions the dash pattern start at the segment's beginning.
    return String(segment.start);
  }

  skills: SkillCategory[] = [
    {
      name: 'Frontend Engineering',
      percentage: 25,
      color: '#D4A5E8',
      subSkills: [
        { name: 'Angular & Material', share: 65 },
        { name: 'React', share: 35 }
      ]
    },
    {
      name: 'Backend & Web APIs',
      percentage: 25,
      color: '#6C63FF',
      subSkills: [
        { name: 'NestJS', share: 60 },
        { name: 'Django', share: 40 }
      ]
    },
    {
      name: 'AI & Intelligent Apps',
      percentage: 15,
      color: '#00C49F',
      subSkills: [
        { name: 'RAG & LLM Tooling', share: 70 },
        { name: 'Python', share: 30 }
      ]
    },
    {
      name: 'DevOps & Infrastructure',
      percentage: 15,
      color: '#FFB800',
      subSkills: [
        { name: 'Docker & Kubernetes', share: 60 },
        { name: 'CI/CD & GitLab', share: 40 }
      ]
    },
    {
      name: 'Databases & Cloud DB',
      percentage: 10,
      color: '#27C93F',
      subSkills: [
        { name: 'MySQL & Prisma ORM', share: 60 },
        { name: 'Supabase & Railway', share: 40 }
      ]
    },
    {
      name: 'Conception & Design',
      percentage: 10,
      color: '#FF5F56',
      subSkills: [
        { name: 'UML Diagramming', share: 50 },
        { name: 'System Design & Visual Art', share: 50 }
      ]
    }
  ];
}
