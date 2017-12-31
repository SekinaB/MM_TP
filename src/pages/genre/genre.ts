import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Shake } from '@ionic-native/shake';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { API } from "../../app/tmdb";
import { DetailsPage } from '../details/details';
import { SearchPage } from '../search/search';
import { MovieResult, GenreResult } from '../home/home';

@Component({
  selector: 'page-genre',
  templateUrl: 'genre.html',
})
export class GenrePage {
  inGenre: Observable<MovieResult[]>;
  currentGenre: GenreResult;
  detailsPage: any;
  searchPage: any;
  shakeSubscription: Subscription;

  constructor(private shake: Shake, public navCtrl: NavController, public http: HttpClient,
    public alertControl: AlertController, public navParams: NavParams) {
    this.currentGenre = this.navParams.data;
    this.inGenre = this.fetchGenres(this.currentGenre.id);
    this.detailsPage = DetailsPage;
    this.searchPage = SearchPage;
  }

  ionViewDidEnter() {
    this.shakeSubscription = this.shake.startWatch().switchMap(() => this.discoverMovies())
      .subscribe(movies => this.showRandomMovieAlert(movies));
  }
  ionViewDidLeave() {
    this.shakeSubscription.unsubscribe();
  }

  fetchGenres(id: number): Observable<MovieResult[]> {
    return this.http.get<MovieResult[]>('https://api.themoviedb.org/3/discover/movie', {
      params: new HttpParams().set('api_key', API).set('with_genres', id.toString())
    }).pluck('results')
  }

  discoverMovies(): Observable<MovieResult[]> {
    return this.http.get<MovieResult[]>('https://api.themoviedb.org/3/discover/movie', {
      params: new HttpParams().set('api_key', API).set('primary_release_year', '2018').set('with_genres', this.currentGenre.id.toString())
    }).pluck('results');
  }

  showRandomMovieAlert(movies: MovieResult[]): void {
    var movie = movies[Math.floor(Math.random() * movies.length)];
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
}
