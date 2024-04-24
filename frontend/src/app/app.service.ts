import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  private filter = new BehaviorSubject<filter>({ page: 1 })
  private maxCharacters = new BehaviorSubject<number>(0)
  private characters = new BehaviorSubject<character[]>([]);
  private loading = new BehaviorSubject<boolean>(true);

  private currentFilter: filter = { page: 1 };
  private currentCharacters: character[] = [];

  public getMaxCharacters = this.maxCharacters.asObservable()
  public getCharacters = this.characters.asObservable()
  public getLoading = this.loading.asObservable()
  public getFilter = this.filter.asObservable()

  private getQuery() {
    const nameFilter = this.currentFilter.name ? `name: "${this.currentFilter.name}", ` : "";
    const genderFilter = this.currentFilter.gender ? `gender: "${this.currentFilter.gender}", ` : "";

    return gql`{
      characters(page: ${this.currentFilter.page}, filter: {${nameFilter}${genderFilter}}, ){
        info{
          count
        }
        results{
          id
          name
          status
          species
          gender
          image
          created
        }
      }
    }`
  }

  constructor(private apollo: Apollo) {
    this.getCharacters.subscribe(char => this.currentCharacters = char);
    this.getFilter.subscribe(filter => this.currentFilter = filter)
  }

  public setCharacters() {
    this.loading.next(true);
    this.apollo.watchQuery({ query: this.getQuery() })
      .valueChanges.subscribe((result: any) => {
        this.maxCharacters.next(result.data.characters.info.count);
        this.characters.next(result.data.characters.results);
        this.loading.next(false);
      });
  }

  public updateCharacters() {
    this.loading.next(true);
    this.apollo.watchQuery({ query: this.getQuery() })
      .valueChanges.subscribe((result: any) => {
        const prevChars = [...this.currentCharacters]
        this.characters.next([...prevChars, ...result.data.characters.results]);
        this.loading.next(false);
      });
  }

  public setFilter(page: number, name: string = "None", gender: string = "None") {
    this.filter.next({
      page: page,
      name: name != "None" ? name : this.currentFilter.name,
      gender: gender != "None" ? gender : this.currentFilter.gender
    })
  }

  public sortByDate() {
    const charactersArray = [...this.currentCharacters]
    charactersArray.sort((firstChar, secondChar) => {
      const firstTime = new Date(firstChar.created).getTime()
      const secondTime = new Date(secondChar.created).getTime()
      return secondTime - firstTime
    })

    this.characters.next([...charactersArray])
  }
}
