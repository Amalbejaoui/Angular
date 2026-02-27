import { Injectable } from '@angular/core';
import { Suggestion } from '../../models/suggestion';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private suggestionList: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de léquipe.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations en ligne.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Programme de récompenses pour motiver les employés.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: 'Moderniser linterface utilisateur',
      description: 'Refonte complète de linterface utilisateur.',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    }
  ];

  getSuggestionsList(): Observable<any[]> {
    return this.http.get<any[]>(this.suggestionUrl);
  }


  getSuggestionById(id: number): Observable<any> {
    return this.http.get(`${this.suggestionUrl}/${id}`);
  }
  deleteSuggestion(id: number): Observable<any> {
    return this.http.delete(`${this.suggestionUrl}/${id}`);
  }
  addSuggestion(suggestion: any): Observable<any> {
    return this.http.post(this.suggestionUrl, suggestion);
  }
  updateSuggestion(id: number, suggestion: any): Observable<any> {
    return this.http.put(`${this.suggestionUrl}/${id}`, suggestion);
  }
  updateLikes(id: number, nbLikes: number) {
    return this.http.patch(`${this.suggestionUrl}/${id}`, { nbLikes });
  }


  constructor(private http: HttpClient) {}

  suggestionUrl = 'http://localhost:3000/suggestions';

}
