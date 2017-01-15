import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Subject } from "rxjs";
import { apiBase, username } from "../../server/config";
import 'rxjs/add/operator/map';

@Injectable()
export class DiscogsApi {
  data: any;
  library: Object = {};
  identity: Object = {};
  release: Object = {};
  inventory: Object = {};
  cache: Array<any> = [];
  libraryObs = new Subject<string>();
  identityObs = new Subject<string>();
  releaseObs = new Subject<string>();
  invObs = new Subject<string>();

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

  ownerInventory(page, per_page){
    this.http.get(`${apiBase}/owner/${page}/${per_page}`).map(res => res.json()).subscribe(
      (data) => {
        this.inventory = data;
        window.localStorage['inv'] = JSON.stringify(this.inventory);
        this.invObs.next(data);
      }
    )
  }

  cougouyouInventory(page, per_page){
    this.http.get(apiBase+`/cougouyou/${page}/${per_page}`).map(res => res.json()).subscribe(
      (data) => {
        this.inventory = data;
        window.localStorage['inv'] = JSON.stringify(this.inventory);
        this.invObs.next(data);
      }
    )
  }

  isInCache(id){
      return this.cache[id] != undefined;
  }

  findRelById(id){
    if(this.isInCache(id)){
      this.releaseObs.next(this.cache[id]);
    }else{
      this.http.get(apiBase+'/releases/'+id).map(res => res.json()).subscribe(
        (data) => {
          this.release = data;
          this.cache[id] = data;
          this.releaseObs.next(data);
        }
      )
    }
  }



}