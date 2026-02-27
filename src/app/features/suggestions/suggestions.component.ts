import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuggestionService } from '../../core/services/suggestion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css'
})
export class SuggestionsComponent implements OnInit {

  suggestionForm!: FormGroup;
  id!: number;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: SuggestionService,
    private router: Router,
    private actR: ActivatedRoute
  ) {}

  ngOnInit() {

    this.suggestionForm = this.fb.group({
      title: [''],
      description: [''],
      category: [''],
      date: [new Date()],
      status: ['en_attente'],
      nbLikes: [0]
    });

    // vérifier si on est en mode edit
    const paramId = this.actR.snapshot.params['id'];
    if (paramId) {
      this.isEditMode = true;
      this.id = paramId;

      this.service.getSuggestionById(this.id)
        .subscribe(data => {
          this.suggestionForm.patchValue(data);
        });
    }
  }

  //  Ajouter
  onSubmit() {
    if (this.isEditMode) {
      this.save();
    } else {
      this.service.addSuggestion(this.suggestionForm.value)
        .subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
    }
  }

  // Modifier
  save() {
    this.service.updateSuggestion(this.id, this.suggestionForm.value)
      .subscribe(() => {
        this.router.navigate(['/suggestions']);
      });
  }

}
