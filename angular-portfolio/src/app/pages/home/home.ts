import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { AboutComponent } from '../../components/about/about';
import { ProjectsComponent } from '../../components/projects/projects';
import { SkillsComponent } from '../../components/skills/skills';
import { ArtsComponent } from '../../components/arts/arts';
import { ContactComponent } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent,
    ArtsComponent,
    ContactComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-about></app-about>
    <app-projects></app-projects>
    <app-skills></app-skills>
    <app-arts></app-arts>
    <app-contact></app-contact>
  `
})
export class HomeComponent {}