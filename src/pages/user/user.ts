import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';
import { NdbServiceProvider } from '../../providers/ndb-service/ndb-service';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  public requestApiKey : boolean;
  public foodForm : any;
  public apiKey : any;
  public results : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _fb : FormBuilder,
    public storage : Storage,
    public toastCtrl : ToastController,
    public _ndb : NdbServiceProvider
  ) {
    this.requestApiKey = true;
    this.results = [];
    this.foodForm=_fb.group({
     query: ["", Validators.required]
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  /**
  * searchFood will pass the query string to call the service for a response
  */
  searchFood(foodForm){
    console.log(foodForm)
    if(foodForm.valid && !this.requestApiKey){

      this._ndb.searchFood(foodForm.value.query,this.apiKey).then( response => {
        console.log(response);
        this.results = response['list']['item'];
      });
    } else {
      this.presentToast('Api value not valid');
    }
  }

  /**
  * goDetail
  */
  goDetail(){
    console.log('hola');
  }

  /**
  * presetToast will call the toaster message in the top of the app
  */
  presentToast(message) {

    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  /**
  * checkApiKey will check if we already have an api key
  */
  checkApiKey(){
    this.storage.get('api_key').then((apiKey) => {
      if(apiKey){
        this.requestApiKey = false;
        this.apiKey = apiKey;
      }
    });
  }

  ionViewWillEnter(){
    this.checkApiKey();
  }

}
