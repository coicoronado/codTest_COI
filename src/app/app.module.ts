import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { UserPage } from '../pages/user/user';
import { DeveloperPage } from '../pages/developer/developer';
import { FoodDetailPage } from '../pages/food-detail/food-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NdbServiceProvider } from '../providers/ndb-service/ndb-service';
import { MyConfs } from './constants';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    UserPage,
    DeveloperPage,
    FoodDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    UserPage,
    DeveloperPage,
    FoodDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NdbServiceProvider, MyConfs
  ]
})
export class AppModule {}
