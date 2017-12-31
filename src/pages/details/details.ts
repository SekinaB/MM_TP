import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { MovieResult } from '../home/home';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  currentResult: MovieResult;

  constructor(public navParams: NavParams) {
    this.currentResult = this.navParams.data;
  }
}
