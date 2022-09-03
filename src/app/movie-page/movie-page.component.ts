import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { MovieDetail } from '../movie.model';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {
  title!:string;
  movieDetails!:MovieDetail;
  isLoading = false;
  genre1!:string;
  genre2!:string;
  runtime!:any;
  budget!:number;
  production_houses:string[] = [];
  companies:string[] = [];

  constructor(
    private router:ActivatedRoute,
    private service:AppService
    ) { 
    this.title=  this.router.snapshot.paramMap.get('title')!;
  }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.onGettingMovieDetails();
    this.onGettingCompanies();
  }

  onGettingMovieDetails(){
    return this.service.getMovieDetail(this.title)
      .subscribe({
        next: (v:any) => {
          this.movieDetails = v;
          let genres = this.movieDetails.genres[0].split(" ");
          this.genre1 = genres[3].replace(/[^a-zA-Z0-9 ]/g, '');
          this.genre2 = genres[7].replace(/[^a-zA-Z0-9 ]/g, '');
          this.runtime = (Math.trunc((this.movieDetails.runtime)as any /60)).toString() +'h'+' '+ ((this.movieDetails.runtime) as any %60).toString() as any+'m';
          this.budget = parseInt(this.movieDetails.budget)/1000000;
          this.production_houses = this.movieDetails.production_companies[0].split(",");
          console.log(this.movieDetails);
          console.log(this.production_houses);
          
          this.isLoading = false;
        }
      })
  }

  onGettingCompanies(){
    for (let i = 0; i < this.production_houses.length; i+2) {
      this.companies.push(this.production_houses[i]);
    }
    return this.companies;
  }

  removeSepcialChars(house:string){
    return house.replace(/[^a-zA-Z0-9 ]/g, '').substring(5, house.length);
  }

}
