import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { QuizQuestion } from '../../models/question.model';
import { RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  quizQuestions: QuizQuestion[] = [];
  question!: QuizQuestion;
  score = 0;
  bestScore = 0;

  constructor(private _api: ApiService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadScoreFromLocalStorage();
    this.loadQuestions();
  }

  loadQuestions(): void {
    const category = parseInt(this._route.snapshot.paramMap.get('category') ?? "");
    
    this._api.get(category).subscribe(
      (result) => {
        if (result.response_code === 0 && result.results.length > 0) {
          this.quizQuestions = result.results;
          this.question = this.quizQuestions[0];
        }
      },
      (error) => {
        console.error('Error loading questions:', error);
        setTimeout(() => {
          this.loadQuestions(); // Reintento de carga de preguntas después de 5 segundos
        }, 5000);
      }
    );
  }

  checkAnswer(selectedAnswer: string): void {
    if (this.question.correct_answer === selectedAnswer) {
      this.score++;
      if (this.score > this.bestScore) {
        this.bestScore = this.score;
      }
    } else {
      this.score = 0;
    }

    const currentIndex = this.quizQuestions.indexOf(this.question);
    if (currentIndex < this.quizQuestions.length - 1) {
      this.question = this.quizQuestions[currentIndex + 1];
    } else {
      this.loadQuestions(); // Vuelve a cargar las preguntas cuando se alcanza la última
    }

    this.saveScoreToLocalStorage();
  }

  saveScoreToLocalStorage(): void {
    localStorage.setItem('gameScore', this.score.toString());
    localStorage.setItem('bestScore', this.bestScore.toString());
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
