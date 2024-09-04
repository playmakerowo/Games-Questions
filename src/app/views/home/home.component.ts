import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  score = 0;
  bestScore = 0;
  category = 0;
  ngOnInit(): void {
    this.loadScoreFromLocalStorage();
  }
  loadScoreFromLocalStorage(): void {
    const savedScore = localStorage.getItem('gameScore');
    const savedBestScore = localStorage.getItem('bestScore');
    if (savedScore) {
      this.score = parseInt(savedScore, 10);
    }
    if (savedBestScore) {
      this.bestScore = parseInt(savedBestScore, 10);
    }
  }
}
