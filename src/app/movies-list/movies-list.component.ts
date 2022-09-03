import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { MovieDetailBoxComponent } from './movie-detail-box/movie-detail-box.component';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  @ViewChild('popularContent')
  popularContent!: ElementRef;

  @ViewChild('latestContent')
  latestContent!: ElementRef;

  isLoading = false;
  cardsArray = [
    1,2,3,4,5,6,7,8,9
  ]

  popularMovies:any =  [];
  latestMovies:any =  [];

  constructor(
    private service:AppService,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.onGetPopularMovies();
    this.onGetLatestMovies();
  }

  onGetPopularMovies(){
    return this.service.getPopularMovies()
      .subscribe({
        next: (val:any) => {
          this.popularMovies = val;
          console.log(this.popularMovies);
          this.isLoading = false;
        }
      })
  }

  onGetLatestMovies(){
    return this.service.getLatestMovies()
      .subscribe({
        next: (val:any) => {
          this.latestMovies = val;
          console.log(this.latestMovies);
          this.isLoading = false;
        }
      })
  }


  scrollLeft(mode:string){
    if(mode === 'popular') {
      this.popularContent.nativeElement.scrollLeft -= 270;
    }
    if(mode === 'latest'){
      this.latestContent.nativeElement.scrollLeft -= 270;
    }
  }
  
  scrollRight(mode:string){
    if(mode === 'popular') {
      this.popularContent.nativeElement.scrollLeft += 270;
    }
    if(mode === 'latest'){
      this.latestContent.nativeElement.scrollLeft += 270;
    }
  }

  openDialog(data:string): void {
    const dialogRef = this.dialog.open(MovieDetailBoxComponent, {
      width: '600px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
