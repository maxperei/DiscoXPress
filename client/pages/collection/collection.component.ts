import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DiscogsApi } from '../../services/discogs-api';
import { apiBase } from '../../../server/config';
import { isUndefined } from 'util';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class Collection implements OnInit {

  public library;
  private authorize: string = apiBase+'/authorize';
  pages: any;
  model = { pP: null };
  choice: number[] = [50, 75, 100];
  constructor(public discogs: DiscogsApi, private router: Router){
    this.model.pP = this.choice[1];
    discogs.loadDisco(1, this.model.pP);
    discogs.libraryObs.subscribe(
      (data) => {
        this.library = JSON.parse(window.localStorage['disco']);
        this.pages = this.library.releases.pagination.pages;
      }
    );
  }

  ngOnInit() { }

  getDetail(id){
    this.router.navigate(['./col/'+id]);
  }

  createRange(number){
    let items: number[] = [];
    for(let i = 1; i <= number; i++){
      items.push(i);
    }
    return items;
  }

  pagination(p, pP){
    if(isUndefined(pP)){
      pP = this.model.pP;
    }
    this.discogs.loadDisco(p, pP);
  }
}
