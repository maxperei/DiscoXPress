import { Component, OnInit } from '@angular/core';
import { DiscogsApi } from "../../services/discogs-api";
import { Router } from '@angular/router';
import { isUndefined } from 'util';

@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html',
  styleUrls: ['./root-page.component.css']
})
export class RootPage implements OnInit {
  public inventory;
  pages: any;
  model = { pP: null };
  choice: number[] = [50, 75, 100];
  constructor(public discogs: DiscogsApi, public router: Router) {
    this.model.pP = this.choice[1];
    discogs.ownerInventory(1, this.model.pP);
    discogs.invObs.subscribe(
        (data) => {
          this.inventory = JSON.parse(window.localStorage['inv']);
          this.pages = this.inventory.inventory.pagination.pages;
        }
    );
  }

  ngOnInit() {
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
    this.discogs.ownerInventory(p, pP);
  }

  getDetail(id){
    this.router.navigate(['./rel/'+id]);
  }
}