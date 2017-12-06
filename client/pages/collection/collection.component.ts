import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DiscogsApi } from '../../services/discogs-api';
import { apiBase } from '../../../server/config';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  public library;
  private authorize: string = apiBase + '/authorize';
  pages: any;
  model = { pP: null };
  choice: number[] = [50, 75, 100];
  constructor(public discogs: DiscogsApi, private router: Router, private activatedRoute: ActivatedRoute){
    activatedRoute.params.subscribe((params: Params) => {
      if(params['p'] && params['pp']) {
        let qPage = params['p'];
        let qPerPage = params['pp'];
        this.model.pP = qPerPage;
        this.discogs.loadDisco(qPage, qPerPage);
      } else {
        this.model.pP = this.choice[0];
        discogs.loadDisco(1, this.model.pP);
      }
    });
    // this.library = discogs;
    discogs.libraryObs.subscribe(
      (data) => {
        this.library = data;
        if (this.library.message) {
          router.navigate(['./login']);
          /* TODO FlashMessage */
        } else {

        }
        // this.pages = this.library.releases.pagination.pages;
      }
    );
  }

  ngOnInit() {  }

  getDetail(id) {
    this.router.navigate(['./rel/' + id]);
  }

  createRange(number) {
    let items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  pagination(p, pP) {
    pP = this.model.pP;
    this.discogs.loadDisco(p, pP);
    this.router.navigate([`./collection/${p}/${pP}`]);
  }
}
