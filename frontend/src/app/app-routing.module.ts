import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { CharacterComponent } from './pages/character/character.component';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';

const routes: Routes = [
  {
    path: "character/:id",
    component: CharacterComponent,
  },
  {
    path: "",
    component: CharactersListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
