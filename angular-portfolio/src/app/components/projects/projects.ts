import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { GithubService } from '../../services/github';
import { Project } from '../../models/github-repo';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss' // Modifiez en './projects.css' selon l'extension de votre projet
})
export class ProjectsComponent implements OnInit {
  private githubService = inject(GithubService);
  private platformId = inject(PLATFORM_ID);

  readonly username = 'imenebch06-netizen';

  projects = signal<Project[]>([]);
  readonly repos = this.projects;
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  /** Repo ids whose cover image failed to load → show styled gradient instead. */
  brokenCovers = new Set<number>();

  onCoverError(repoId: number): void {
    this.brokenCovers.add(repoId);
  }

  isCoverBroken(repo: Project): boolean {
    return this.brokenCovers.has(repo.id);
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoading.set(true);
      this.error.set(null);

      // Sync with ALL public repositories on GitHub (excluding this portfolio repo & forks)
      this.githubService.getProjects(this.username).subscribe({
        next: (data) => {
          this.projects.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Erreur lors du chargement des projets GitHub', err);
          this.error.set('Unable to load projects at the moment.');
          this.isLoading.set(false);
        }
      });
    } else {
      this.isLoading.set(false);
    }
  }
}