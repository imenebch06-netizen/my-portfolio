import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { ProjectsComponent } from '../../components/projects/projects';
import { SkillsComponent } from '../../components/skills/skills';
import { ContactComponent } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-projects></app-projects>
    <app-skills></app-skills>
    <app-contact></app-contact>
  `
})
export class HomeComponent {}