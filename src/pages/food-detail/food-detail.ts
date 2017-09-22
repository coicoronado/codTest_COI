import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-food-detail',
  templateUrl: 'food-detail.html'
})
export class FoodDetailPage {

  public foodDetails : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.foodDetails = navParams.get('params');
  }

  convertToGrams(nutrientEntry){
    let result = nutrientEntry.value;
    if(nutrientEntry.unit ==='mg'){
      result= result/1000;
    }
    return result;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodDetailPage');
  }

}
