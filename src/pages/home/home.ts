import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpParams, HttpClient } from '@angular/common/http';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable'
import { API } from "../../app/tmdb";
import { AsyncPipe } from '@angular/common';

export interface Result {
//  author: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  //id: number;
  release_date: string;
}

const fakeResults: Result[] = [{
  //author: 'Author 1',
  title: 'Fuck this shit ',
  overview: 'I don\'t know man ! ',
  poster_path:'https://cdn-images-1.medium.com/max/1600/1*RxmPeSybIUtxea4Vh98y2g.jpeg',
  backdrop_path: 'blab',
  release_date: 'No data'
  }, {
  //author: 'Author 2',
  title: 'About life',
  overview: 'I don\'t know man ! ',
  poster_path: 'http://memions.com/wp-content/themes/wumblr/themify/img.php?src=http://memions.com/wp-content/uploads/2015/02/10929203_781076021976935_808464437295772567_n.jpg&w=590&h=&q=70',
  backdrop_path: 'blab',
  release_date: 'No data'
  }, {
  //author: 'Author 3',
  title: 'Things happen',
  overview: 'I don\'t know man ! ',
  poster_path: 'https://ih1.redbubble.net/image.202504306.6869/sticker,375x360-bg,ffffff.u2.png',
  backdrop_path: 'blab',
  release_date: 'No data'
  }]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  realResults : Observable<Result[]> ;
  detailsPage : any ;
  httpImages: string = 'https://image.tmdb.org/t/p/w500/';
  constructor(public http: HttpClient) {
      this.realResults = Observable.of([]) ;
      this.detailsPage = DetailsPage;
  }

  fetchResults(query: string): Observable<Result[]> {
    return this.http.get<Result[]>('https://api.themoviedb.org/3/search/movie', {
      params: new HttpParams().set('api_key', API).set('query', query)
    }).pluck('results');
  }

  getResults($event : any) : void {
    const query: string = $event.target.value;
    if (query) {
      this.realResults =this.fetchResults(query);
    } else {
      this.realResults = Observable.of([]);
    }
  }

}
