// services/api.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizQuestion, QuizResponse } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrlTCM = 'https://opentdb.com/api.php?amount=50&category=15&type=boolean';

  constructor(private http: HttpClient) { }

  get(): Observable<QuizResponse> {
    return this.http.get<QuizResponse>(this.apiUrlTCM);
  }
}
