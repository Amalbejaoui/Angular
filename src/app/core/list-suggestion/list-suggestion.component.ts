import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../models/suggestion';
import { SuggestionService } from '../services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {

  suggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];
  searchText: string = '';
  selectedCategory: string = 'Toutes';
  likedSuggestions: number[] = [];

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    // @ts-ignore
    this.suggestionService.getSuggestionsList().subscribe(data => {
      this.suggestions = data;
    });

  }

  like(s: any) {
    s.nbLikes++;
    this.suggestionService.updateLikes(s.id, s.nbLikes).subscribe();
  }

  isLiked(s: Suggestion): boolean {
    return this.likedSuggestions.includes(s.id);
  }

  addToFavorites(s: Suggestion) {
    if (s.status !== 'refusee' && !this.isInFavorites(s)) {
      this.favorites.push(s);
    }
  }

  removeFromFavorites(s: Suggestion) {
    this.favorites = this.favorites.filter(fav => fav.id !== s.id);
  }

  isInFavorites(s: Suggestion): boolean {
    return this.favorites.some(fav => fav.id === s.id);
  }

  getStatusLabel(status: string): string {
    const statusLabels: {[key: string]: string} = {
      'acceptee': 'Acceptée',
      'refusee': 'Refusée',
      'en_attente': 'En attente'
    };
    return statusLabels[status] || status;
  }

  getUniqueCategories(): string[] {
    const categories = this.suggestions.map(s => s.category);
    return [...new Set(categories)];
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  get filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(s => {

      const categoryMatch =
        this.selectedCategory === 'Toutes' ||
        s.category === this.selectedCategory;

      const searchMatch =
        !this.searchText ||
        s.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.category.toLowerCase().includes(this.searchText.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }

  getTotalLikes(): number {
    return this.suggestions.reduce((total, s) => total + s.nbLikes, 0);
  }

  getActiveSuggestions(): number {
    return this.suggestions.filter(s => s.status !== 'refusee').length;
  }
  delete(id: number) {
    this.suggestionService.deleteSuggestion(id).subscribe(() => {
      this.ngOnInit();
    });
  }



}
