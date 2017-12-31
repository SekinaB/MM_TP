import { HttpParams, HttpClient } from '@angular/common/http';
import { NavController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

import { IntheatresPage } from '../intheatres/intheatres';
import { GenrePage } from '../genre/genre';
import { API } from "../../app/tmdb";

export interface MovieResult {
  poster_path: string;
  overview: string;
  release_date: string;
  title: string;
  vote_average: number;
  id: number;
  adult: boolean;
  genre_ids: number[];
}

export interface GenreResult {
  name: string;
  id: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  listGenres: Observable<GenreResult[]>;
  rootPage: any;
  genrePage: any;

  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.listGenres = this.fetchListGenres();
    this.rootPage = IntheatresPage;
    this.genrePage = GenrePage;
  }

  fetchListGenres(): Observable<GenreResult[]> {
    return this.http.get<GenreResult[]>('https://api.themoviedb.org/3/genre/movie/list', {
      params: new HttpParams().set('api_key', API)
    }).pluck('genres');
  }
}
