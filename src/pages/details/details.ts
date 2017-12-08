import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Result } from '../home/home';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//export interface Result {
//  author: string;
//  date: number;
//  image: string;
//  title: string
//}


@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  author: string;
  date: number;
  image: string;
  title: string;
  //currentResult: Result;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.author = this.navParams.get('author');
    this.title = this.navParams.get('title');
    this.date = this.navParams.get('date');
    this.image = this.navParams.get('image');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
