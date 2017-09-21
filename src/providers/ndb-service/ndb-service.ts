import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { MyConfs } from  '../../app/constants'; //This is my constants of the API

import 'rxjs/add/operator/map';

@Injectable()
export class NdbServiceProvider {

  private baseUrl = this.myConfs.DEV_API_URL;
  public data : any;
  public extraInformation : any;

  constructor(public http: Http, private myConfs : MyConfs) {
    console.log('Hello NdbServiceProvider Provider');
  }

  /**
  * searchFood will call for the search endpoint passing a query for more information about the endpoint
  * go to https://ndb.nal.usda.gov/ndb/doc/apilist/API-SEARCH.md
  * complete url: https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=DEMO_KEY
  */
  searchFood(queryString,apiKey){
    if(queryString && apiKey){
      this.extraInformation = 'search/?format=json&sort=n&max=25&offset=0&q='+queryString+'&api_key='+apiKey;
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option
      return new Promise(resolve => {
        this.http.get(this.baseUrl+this.extraInformation,options).map(res => res.json()).subscribe(data => {
          // console.log(data);
          this.data = data;
          // this.data = data.locations;
          // this.data = this.applyHaversine(data.locations);
          // this.data.sort((locationA, locationB) => {
          //     return locationA.distance - locationB.distance;
          // });

          resolve(this.data);
        });
      });
    } else {
      console.log('i dont the complete information to continue');
    }

  }

  // reports
  // https://api.nal.usda.gov/ndb/reports/?ndbno=01009&type=b&format=json&api_key=DEMO_KEY

  // nutrients
  // https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=DEMO_KEY&nutrients=205&nutrients=204&nutrients=208&nutrients=269&ndbno=01009

  // list
  // https://api.nal.usda.gov/ndb/list?format=json&lt=f&sort=n&api_key=DEMO_KEY

}
