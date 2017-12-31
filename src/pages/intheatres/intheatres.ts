import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Shake } from '@ionic-native/shake';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DetailsPage } from '../details/details';
import { SearchPage } from '../search/search';
import { MovieResult } from '../home/home';
import { GenreResult } from '../home/home';
import { API } from "../../app/tmdb";


@Component({
  selector: 'page-intheatres',
  templateUrl: 'intheatres.html',
})
export class IntheatresPage {
  inTheatre: Observable<MovieResult[]>;
  detailsPage: any;
  searchPage: any;
  testSaMere: Observable<GenreResult[]>;
  shakeSubscription: Subscription;

  constructor(private shake: Shake, public navCtrl: NavController, public http: HttpClient,
    public alertControl: AlertController) {
    this.inTheatre = this.fetchPopular();
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

  dateToString(date: Date): string {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var fullDate;
    if (day < 10) {
      if (month < 10) {
        fullDate = year + '-0' + month + '-0' + day;
      }
      else {
        fullDate = year + '-' + month + '-0' + day;
      } 550
    }
    else {
      fullDate = year + '-' + month + '-' + day;
    }
    return fullDate;
  }

  fetchPopular(): Observable<MovieResult[]> {
    var currentDate = new Date();
    var fullCurrentDate = this.dateToString(currentDate);
    currentDate.setDate(currentDate.getDate() - 45);
    var monthBeforeDate = this.dateToString(currentDate);
    return this.http.get<MovieResult[]>('https://api.themoviedb.org/3/discover/movie', {
      params: new HttpParams().set('api_key', API).set('primary_release_date.gte', monthBeforeDate)
        .set('primary_release_date.lte', fullCurrentDate)
    }).pluck('results');
  }

  fetchMovieGenre(movie: MovieResult): void {
    this.testSaMere = this.http.get<GenreResult[]>('https://api.themoviedb.org/3/movie/' + movie.id.toString(), {
      params: new HttpParams().set('api_key', API)
    }).pluck('genres');
  }


  discoverMovies(): Observable<MovieResult[]> {
    return this.http.get<MovieResult[]>('https://api.themoviedb.org/3/discover/movie', {
      params: new HttpParams().set('api_key', API).set('primary_release_year', '2018')
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
