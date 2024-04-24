import { Component, Input } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { CommonModule } from '@angular/common';
import { AppService } from '../../app.service';

@Component({
  standalone: true,
  imports: [CharacterCardComponent, CommonModule],
  selector: 'app-character-list',
  templateUrl: './characters-list.component.html',
})
export class CharactersListComponent {
  protected characters: character[] = [];
  protected filter: filter = { page: 1 };
  protected maxCharacters = 0;
  protected loading = true;
  protected isEnd = false;

  constructor(private appService: AppService) {
    this.appService.getMaxCharacters.subscribe(maxChars => {
      this.maxCharacters = maxChars
    })
    this.appService.getCharacters.subscribe(chars => {
      this.characters = chars;
      if (this.characters.length >= this.maxCharacters && this.maxCharacters) this.isEnd = true
      else this.isEnd = false
    })
    this.appService.getLoading.subscribe(loading => this.loading = loading)
    this.appService.getFilter.subscribe(filter => this.filter = filter)

  }

  ngOnInit() { this.appService.setCharacters(); }

  protected loadMore() {
    this.appService.setFilter(this.filter.page + 1)
    this.appService.updateCharacters();
    if (this.characters.length + 20 >= this.maxCharacters) this.isEnd = true
  }
}
