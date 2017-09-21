import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public apiForm : any;
  public requestApiKey : boolean;

  constructor(
    public navCtrl : NavController,
    public _fb : FormBuilder,
    public storage : Storage,
    public toastCtrl : ToastController
    ) {
    this.storage = storage;
    this.requestApiKey = true;
    //ej. 1k43Y6yfQX3mrunU9TRR9hH5swL2IXOfiZwJ0n0n
    let apiKeyRegex = '[a-zA-Z0-9]{40}';
    this.apiForm=_fb.group({
     api: ["", Validators.compose([Validators.pattern(apiKeyRegex),Validators.required])]
   });
  }

  /**
  *
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
  * storeApiKey will save in localstorage the api key provided for the user
  */
  storeApiKey(apiForm){
    console.log(apiForm)
    if(apiForm.valid){
      this.storage.set('api_key',apiForm.value.api);
    } else {
      this.presentToast('Api value not valid');
    }
  }

  /**
  * checkApiKey will check if we already have an api key
  */
  checkApiKey(){
    this.storage.get('api_key').then((apiKey) => {
      if(apiKey){
        this.requestApiKey = false;
      }
    });
  }

  ionViewWillEnter(){
    this.checkApiKey();
  }
}
