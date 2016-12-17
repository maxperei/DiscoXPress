import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Subject } from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class DiscogsApi {
  data: any;
  library: Object = {};
  libraryObs = new Subject<string>();

  constructor(public http: Http) {
    this.http = http;
    this.data = null;
  }

  loadDisco(){
    this.http.get('http://localhost:3000/disco').map(res => res.json()).subscribe((data) => {
      this.library = data;
      window.localStorage['disco'] = JSON.stringify(this.library);
      this.libraryObs.next(data);
    });
  }

}
