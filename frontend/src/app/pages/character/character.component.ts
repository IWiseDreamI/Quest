import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  standalone: true,
  selector: 'character',
  imports: [CommonModule],
  templateUrl: './character.component.html'
})
export class CharacterComponent implements OnInit {
  protected id: number = 0;
  protected character?: character;

  constructor(private apollo: Apollo, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.apollo.watchQuery({
      query: gql`{
        character(id: ${this.id}){
          id
          name
          status
          species
          gender
          image
          episode {
            id
            name
            episode
            air_date
          }
        }
      }`,
    }).valueChanges.subscribe((result: any) => {
      this.character = result.data.character;
    });
  }
}
