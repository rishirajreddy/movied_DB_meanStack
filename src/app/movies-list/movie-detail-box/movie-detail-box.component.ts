import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail-box',
  templateUrl: './movie-detail-box.component.html',
  styleUrls: ['./movie-detail-box.component.css']
})
export class MovieDetailBoxComponent implements OnInit {

  genre1 = "";
  genre2 = "";
  runtime!:string;
  overview!:string;
  show = false;
  constructor(private dialogRef:MatDialogRef<MovieDetailBoxComponent>,
              private route: Router,
              @Inject (MAT_DIALOG_DATA) public data:any
    ) { }

  ngOnInit(): void {
    let genres = this.data.genres[0].split(" ");
    this.genre1 = genres[3].replace(/[^a-zA-Z0-9 ]/g, '');
    this.genre2 = genres[7].replace(/[^a-zA-Z0-9 ]/g, '');
    this.runtime = (Math.trunc((this.data.runtime)/60)).toString()+'h'+' '+ ((this.data.runtime)%60).toString()+'m';
    this.overview = this.data.overview;
    // this.runtime = Math.trunc((this.data.runtime)%60);
    // console.log(JSON.stringify(this.data.genres[0]));
    console.log(genres);
  }

  moviesPage(){
    this.route.navigate(['/movie', this.data.title])
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
  }
}
