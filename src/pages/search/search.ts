import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MovieResult } from '../home/home';
import { DetailsPage } from '../details/details';
import { API } from "../../app/tmdb";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  movieResults: Observable<MovieResult[]>;
  detailsPage: any;

  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.movieResults = Observable.of([]);
    this.detailsPage = DetailsPage;
  }

  fetchResults(query: string): Observable<MovieResult[]> {
    return this.http.get<MovieResult[]>('https://api.themoviedb.org/3/search/movie', {
      params: new HttpParams().set('api_key', API).set('query', query)
    }).pluck('results');
  }

  getResults($event: any): void {
    const query: string = $event.target.value;
    if (query) {
      this.movieResults = this.fetchResults(query);
    } else {
      this.movieResults = Observable.of([]);
    }
  }
}
