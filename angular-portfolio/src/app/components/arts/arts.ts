import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface ArtPhoto {
  src: string;
  title: string;
  tag: string;   // event name shown on the photo
  date: string; 
}

@Component({
  selector: 'app-arts',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './arts.html',
  styleUrl: './arts.scss',
})
export class ArtsComponent {
  
  readonly photos: ArtPhoto[] = [
  {
    src: 'assets/art/1000023293 (1).jpg',
    title: 'My drawing for the Opening Day competition',
    tag: 'Opening Day',
    date: '2025',
  },
  {
    src: 'assets/art/1000034431.jpg',
    title: 'Scientific club exhibition — all the works, with my drawings displayed',
    tag: 'Club Exhibition',
    date: '2025',
  },
  {
    src: 'assets/art/1000066323.jpg',
    title: 'My drawing for Yennayer — Amazigh New Year',
    tag: 'Yennayer',
    date: 'Jan 2026',
  },
  {
    src: 'assets/art/1000033894 (1).jpg',
    title: 'Art Week at ESTIN',
    tag: 'Art Week',
    date: 'Apr 2026',
  },
  {
    src: 'assets/art/1000033867 (1).jpg',
    title: 'Art Week — Knowledge Day',
    tag: 'Knowledge Day',
    date: 'Apr 2026',
  },
  {
    src: 'assets/art/1000065938 (1).jpg',
    title: 'Octobre Rose exhibition — my latest contribution at ESTIN',
    tag: 'Octobre Rose',
    date: 'Oct 2026',
  },
];

  /** Track which images failed to load so we can show a styled placeholder. */
  readonly broken: boolean[] = this.photos.map(() => false);

  onImgError(index: number): void {
    this.broken[index] = true;
  }
}
