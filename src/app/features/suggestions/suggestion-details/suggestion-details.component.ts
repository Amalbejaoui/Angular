import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Suggestion} from '../../../models/suggestion';
import {SuggestionService} from '../../../core/services/suggestion.service';


@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {

  suggestion!: Suggestion;
  id!: number;

  constructor(
    private actR: ActivatedRoute,
    private service: SuggestionService
  ) {}

  ngOnInit() {
    this.id = this.actR.snapshot.params['id'];

    this.service.getSuggestionById(this.id)
      .subscribe((data: Suggestion) => {
        this.suggestion = data;
      });
  }
}
