import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterState } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-character-card',
  imports: [RouterLink, FormsModule],
  templateUrl: './character-card.component.html'
})
export class CharacterCardComponent {
  @Input() character: character = {
    id: 0,
    name: "",
    status: "",
    species: "",
    gender: "",
    image: "",
    created: ""
  };
}
