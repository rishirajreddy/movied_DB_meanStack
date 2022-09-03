import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {environment} from "../environments/environment.prod";

@Injectable({
    providedIn: "root"
})

export class AppService {
    url = environment.url;

    constructor(private http:HttpClient){}

    getMovieDetail(title:string){
        return this.http.get(`${this.url}/api/getMovie/${title}`);
    }

    getPopularMovies(){
        return this.http.get(`${this.url}/api/popular`);
    }

    getLatestMovies() {
        return this.http.get(`${this.url}/api/latest`);
    }
}