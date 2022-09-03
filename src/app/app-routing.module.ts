import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

const routes: Routes = [
  {path: "", component: MoviesListComponent},
  {path: "movie/:title", component: MoviePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
