import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nomenclature-app');
  // Dans ton fichier Angular (ex: app.component.ts)
@HostListener('window:scroll', [])
onWindowScroll() {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
}

}
