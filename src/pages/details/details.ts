import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Result } from '../home/home';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  currentResult: Result;
  constructor(public navParams: NavParams) {
    this.currentResult = this.navParams.data;
  }

}
