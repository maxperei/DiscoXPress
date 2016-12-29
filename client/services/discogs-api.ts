import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Subject } from "rxjs";
import { apiBase } from "../../server/config";
import 'rxjs/add/operator/map';

@Injectable()
export class DiscogsApi {
  data: any;
  library: Object = {};
  identity: Object = {};
  libraryObs = new Subject<string>();
  identityObs = new Subject<string>();

  constructor(public http: Http) {
    this.http = http;
    this.data = null;
  }

  // TODO url refacto
  loadDisco(){
    this.http.get(apiBase).map(res => res.json()).subscribe((data) => {
      this.library = data;
      window.localStorage['disco'] = JSON.stringify(this.library);
      this.libraryObs.next(data);
    });
  }

  loadIdentity(){
    this.http.get(apiBase+'/identity').map(res => res.json()).subscribe((data) => {
      this.identity = data;
      window.localStorage['identity'] = JSON.stringify(this.identity);
      this.identityObs.next(data);
    })
  }

}
