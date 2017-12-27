import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpParams, HttpClient } from '@angular/common/http';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable'
import { API } from "../../app/tmdb";
import { AlertController } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';
import { Subscription } from 'rxjs/Subscription';

export interface Result {
  poster_path: string;
  overview: string;
  release_date: string;
  title: string;
  backdrop_path: string;
  //id: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  realResults : Observable<Result[]> ;
  detailsPage : any ;
  shakeSubscription: Subscription;

  constructor(private shake: Shake, public navCtrl: NavController, public http: HttpClient, public alertControl : AlertController ) {
      this.realResults = Observable.of([]) ;
      this.detailsPage = DetailsPage;
  }

  ionViewDidEnter() {
    this.shakeSubscription = this.shake.startWatch().switchMap(() => this.discoverMovies())
      .subscribe(movies => this.showRandomMovieAlert(movies));
  }
  ionViewDidLeave() {
    this.shakeSubscription.unsubscribe();
  }

  fetchResults(query: string): Observable<Result[]> {
    return this.http.get<Result[]>('https://api.themoviedb.org/3/search/movie', {
      params: new HttpParams().set('api_key', API).set('query', query)
    }).pluck('results');
  }

  discoverMovies(): Observable<Result[]> {
    return this.http.get<Result[]>('https://api.themoviedb.org/3/discover/movie', {
      params: new HttpParams().set('api_key', API).set('primary_release_year', '2018')
    }).pluck('results');
  }

  showRandomMovieAlert(movies: Result[]): void {
    var movie = movies[Math.floor(Math.random()*movies.length)];
    const confirm = this.alertControl.create({
      title: movie.title,
      message: movie.overview,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'More',
          handler: () => {
            this.navCtrl.push(this.detailsPage, movie);
          }
        }
      ]
    });
  confirm.present();
  }


  getResults($event : any) : void {
    const query: string = $event.target.value;
    if (query) {
      this.realResults = this.fetchResults(query);
    } else {
      this.realResults = Observable.of([]);
    }
  }
}
