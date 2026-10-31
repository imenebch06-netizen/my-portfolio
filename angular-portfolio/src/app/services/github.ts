import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GithubRepo, Project } from '../models/github-repo';

/**
 * Curated metadata per repository, written from each project's README
 * (and live site). Keeps GitHub live-sync for links/tech while giving
 * every project a real, portfolio-grade description and icon.
 */
const PROJECT_META: Record<string, { description: string; icon: string; screenshot?: boolean }> = {
  'theranova-project-final': {
    description:
      'Full online-therapy platform (React + Django REST Framework): three role-based spaces — patient, therapist and admin — with a filterable therapist directory, session booking, mood journal and a questionnaire-driven recommendation engine, all in a bilingual FR/EN interface with JWT authentication.',
    icon: 'psychology',
    screenshot: true,
  },
  'alignment-audit2': {
    description:
      'Open-source teaching tool built for ByteCraft × SkillFest: students drop a design mockup and a screenshot of their coded page, and an AI vision model (Ollama / OpenRouter) scores the match, pinpoints layout errors and suggests the exact HTML/CSS fixes — streaming results and a participant leaderboard included.',
    icon: 'rule',
    screenshot: true,
  },
  'f1-rag-project': {
    description:
      'Pit Wall OS — F1 news & history hub powered by Retrieval-Augmented Generation: season stats, a live paddock news feed and a "Pit Wall AI" assistant answering questions over curated Formula 1 knowledge.',
    icon: 'flag',
    screenshot: true,
  },
  'flask-docker-swarm': {
    description:
      'Asynchronous CV-to-PDF generator as a fully containerized stack — Flask API, Celery workers, Redis and PostgreSQL — deployed on Docker Swarm behind an Nginx proxy, with Swagger docs, a metrics dashboard and automated tests.',
    icon: 'view_in_ar',
  },
  'astro-nerd': {
    description:
      'AstroSphere — astrophysics outreach platform in modern Angular (Signals, standalone components): bilingual AI chatbot (Groq/Gemini), real-time NASA telemetry, Explore modules and a Stargazer Lab, with serverless contact via EmailJS and dark/light theming.',
    icon: 'rocket_launch',
    screenshot: true,
  },
  'chrono-app': {
    description:
      'Enterprise time-management & HR supervision suite built during an internship at BMT port terminal (NestJS + Angular 21 + Prisma/MySQL): biometric check-in imports, 3×8 rotating schedules, hierarchical leave-validation workflow, materialized-path org tree, CRON jobs and JWT role management.',
    icon: 'schedule',
    screenshot: true,
  },
  'bytie-game': {
    description:
      'Interactive quiz game built for ByteCraft\'s open day: three mini-games (Zoom Reveal, Connections, Timeline) hosted by Bytie, the club\'s animated robot mascot, who reads an AI-generated summary of your run. React + FastAPI + MongoDB architecture.',
    icon: 'sports_esports',
    screenshot: true,
  },
};

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private http = inject(HttpClient);

  getProjects(username: string = 'imenebch06-netizen', topicFilter?: string): Observable<Project[]> {
    const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

    return this.http.get<GithubRepo[]>(url).pipe(
      map(repos =>
        repos
          .filter(repo => !repo.fork)
          // Never show the portfolio repo itself as a "project"
          .filter(repo => repo.name.toLowerCase() !== 'my-portfolio')
          .filter(repo => !topicFilter || repo.topics?.includes(topicFilter))
          .map(repo => this.mapRepoToProject(repo))
      )
    );
  }

  private mapRepoToProject(repo: GithubRepo): Project {
    // 1. Détection intelligente de la stack technique (Combine Langage + Topics)
    const rawTopics = repo.topics ?? [];
    const techSet = new Set<string>();

    if (repo.language) {
      techSet.add(repo.language);
    }

    rawTopics
      .filter(t => t.toLowerCase() !== 'portfolio')
      .forEach(t => techSet.add(t));

    const techStack = Array.from(techSet);

    // 2. Traitement propre de l'URL Demo Live (évite les chaînes vides "")
    const demoUrl = repo.homepage && repo.homepage.trim().length > 0 ? repo.homepage.trim() : null;

    // 3 . Cover: local screenshot captured from the live app, else GitHub card
    const meta = PROJECT_META[repo.name];
    const coverFallback = !(meta && meta.screenshot);

    return {
      id: repo.id,
      title: this.formatTitle(repo.name),
      description: meta?.description || repo.description || 'Application web développée et déployée avec succès.',
      tech: techStack.length > 0 ? techStack : ['Software Dev'],
      link: repo.html_url,
      demo: demoUrl,
      icon: meta?.icon || this.getIconForTech(repo.language || (techStack[0] ?? '')),
      cover: `assets/projects/${repo.name}.png`,
      coverFallback
    };
  }

  private formatTitle(name: string): string {
    return name
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  private getIconForTech(primaryTech: string): string {
    const tech = primaryTech.toLowerCase();
    if (tech.includes('script') || tech.includes('angular')) return 'code';
    if (tech.includes('python') || tech.includes('flask')) return 'terminal';
    if (tech.includes('docker')) return 'view_in_ar';
    return 'hub';
  }
}
