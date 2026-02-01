import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  
  suggestions: Suggestion[] = [
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
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Mise en place dun programme de récompenses pour motiver les employes et reconnaître leurs efforts.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: 'Moderniser linterface utilisateur',
      description: 'Refonte complète de linterface utilisateur pour une meilleure expérience utilisateur.',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    },
  ];
  
  favorites: Suggestion[] = [];
  searchText: string = '';
  selectedCategory: string = 'Toutes';
  likedSuggestions: number[] = []; // Stocke les IDs des suggestions likées

  ngOnInit(): void {
    // Initialisation si nécessaire
  }

  // Méthode pour liker une suggestion
  like(s: Suggestion) {
    if (s.status !== 'refusee') {
      s.nbLikes++;
      
      // Ajouter à la liste des suggestions likées
      if (!this.likedSuggestions.includes(s.id)) {
        this.likedSuggestions.push(s.id);
      }
    }
  }

  // Vérifier si une suggestion est likée
  isLiked(s: Suggestion): boolean {
    return this.likedSuggestions.includes(s.id);
  }

  // Ajouter aux favoris
  addToFavorites(s: Suggestion) {
    if (s.status !== 'refusee' && !this.isInFavorites(s)) {
      this.favorites.push(s);
    }
  }

  // Retirer des favoris
  removeFromFavorites(s: Suggestion) {
    const index = this.favorites.findIndex(fav => fav.id === s.id);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }

  // Vérifier si une suggestion est dans les favoris
  isInFavorites(s: Suggestion): boolean {
    return this.favorites.some(fav => fav.id === s.id);
  }

  // Obtenir le label du statut
  getStatusLabel(status: string): string {
    const statusLabels: {[key: string]: string} = {
      'acceptee': 'Acceptée',
      'refusee': 'Refusée',
      'en_attente': 'En attente'
    };
    return statusLabels[status] || status;
  }

  // Obtenir les catégories uniques
  getUniqueCategories(): string[] {
    const categories = this.suggestions.map(s => s.category);
    return [...new Set(categories)];
  }

  // Sélectionner une catégorie
  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  // Obtenir les suggestions filtrées
  get filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(s => {
      // Filtre par catégorie
      const categoryMatch = this.selectedCategory === 'Toutes' || s.category === this.selectedCategory;
      
      // Filtre par recherche
      const searchMatch = !this.searchText || 
        s.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.category.toLowerCase().includes(this.searchText.toLowerCase());
      
      return categoryMatch && searchMatch;
    });
  }

  // Calculer le total des likes
  getTotalLikes(): number {
    return this.suggestions.reduce((total, s) => total + s.nbLikes, 0);
  }

  // Obtenir le nombre de suggestions actives
  getActiveSuggestions(): number {
    return this.suggestions.filter(s => s.status !== 'refusee').length;
  }
}