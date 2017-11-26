import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

export interface Result {
  author: string;
  date: number;
  image: string;
  title: string;
}

const fakeResults: Result[] = [{
  author: 'Author 1',
  date: 2017,
  image:'https://cdn-images-1.medium.com/max/1600/1*RxmPeSybIUtxea4Vh98y2g.jpeg',
  title: 'Fuck this shit '
  }, {
  author: 'Author 2',
  date: 2015,
  image: 'http://memions.com/wp-content/themes/wumblr/themify/img.php?src=http://memions.com/wp-content/uploads/2015/02/10929203_781076021976935_808464437295772567_n.jpg&w=590&h=&q=70',
  title: 'About life'
  }, {
  author: 'Author 3',
  date: 2018,
  image: 'https://ih1.redbubble.net/image.202504306.6869/sticker,375x360-bg,ffffff.u2.png',
  title: 'Things happen'
  }]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fakeResults : Result[] ;
  constructor(public navCtrl: NavController) {
      this.fakeResults = [];
  }

  getResults($event : any) : void {
    const val: string = $event.target.value;
    if (val) {
      this.fakeResults = fakeResults;
    }
    else {
      this.fakeResults = [];
    }
  }
}
