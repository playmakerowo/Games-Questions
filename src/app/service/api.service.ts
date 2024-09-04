// services/api.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizQuestion, QuizResponse } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrlTCM = 'https://opentdb.com/api.php?amount=30';

  constructor(private http: HttpClient) { }

  get(category : number): Observable<QuizResponse> {
    console.log(`${this.apiUrlTCM}&category=${category}&type=boolean`);
    return this.http.get<QuizResponse>(`${this.apiUrlTCM}&category=${category}&type=boolean`);
  }
}
