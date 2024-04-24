import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppService } from '../../app.service';
import { FormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  protected searchForm: { searchInput: string } = { searchInput: "" };
  protected characters: character[] = [];
  protected gender: string = "";

  constructor(private appService: AppService) {
    this.appService.getCharacters.subscribe(chars => this.characters = chars)
  }

  protected search() {
    this.appService.setFilter(1, this.searchForm.searchInput, this.gender);
    this.appService.setCharacters();
  }

  protected sort() { this.appService.sortByDate() }
}
