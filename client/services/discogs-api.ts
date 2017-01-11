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
  release: Object = {};
  cache: Array<any> = [];
  libraryObs = new Subject<string>();
  identityObs = new Subject<string>();
  releaseObs = new Subject<string>();

  constructor(public http: Http) {
    this.http = http;
    this.data = null;
  }

  loadDisco(page, per_page){
    this.http.get(apiBase+`/${page}/${per_page}`).map(res => res.json()).subscribe(
      (data) => {
        this.library = data;
        window.localStorage['disco'] = JSON.stringify(this.library);
        this.libraryObs.next(data);
      }
    );
  }

  loadIdentity(){
    this.http.get(apiBase+'/identity').map(res => res.json()).subscribe(
      (data) => {
        this.identity = data;
        window.localStorage['identity'] = JSON.stringify(this.identity);
        this.identityObs.next(data);
      }
    );
  }

  isInCache(id){
      return this.cache[id] != undefined;
  }

  findRefById(id){
    if(this.isInCache(id)){
        this.releaseObs.next(this.cache[id]);
    }else{
        this.http.get(apiBase+'/releases/'+id).map(res => res.json()).subscribe(
            (data) => {
                this.release = data;
                /*console.log('data: ', data);
                console.log('id: ', id);
                console.log('localStorage[id]: ', window.localStorage[id]);
                window.localStorage[id] = JSON.stringify(this.release);*/
                this.cache[id] = data;
                this.releaseObs.next(data);
            }
        )
    }
  }

}