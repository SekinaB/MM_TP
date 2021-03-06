import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { Shake } from '@ionic-native/shake';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IntheatresPage } from '../pages/intheatres/intheatres';
import { GenrePage } from '../pages/genre/genre';
import { SearchPage } from '../pages/search/search';
import { DetailsPage } from '../pages/details/details';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntheatresPage,
    GenrePage,
    SearchPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntheatresPage,
    GenrePage,
    SearchPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Shake,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
