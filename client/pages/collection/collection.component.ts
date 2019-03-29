import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DiscogsApi } from '../../services/discogs-api';
import { apiBase } from '../../../server/config';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, AfterViewInit {
  public library;
  private authorize: string = apiBase + '/authorize';
  pages: any;
  model = { pP: null };
  choice: number[] = [50, 75, 100];

  constructor(public discogs: DiscogsApi, private router: Router, private activatedRoute: ActivatedRoute){
    let qPage, qPerPage;

    activatedRoute.params.subscribe((params: Params) => {
      if (params['p'] && params['pp']) {
        qPage = params['p'];
        qPerPage = params['pp'];
        this.model.pP = qPerPage;
        this.discogs.loadDisco(qPage, qPerPage);
      } else {
        qPage = 1;
        this.model.pP = qPerPage = this.choice[0];
        discogs.loadDisco(qPage, qPerPage);
      }
    });

    if (this.discogs.isInColCache(qPage, qPerPage)) {
      this.library = this.discogs.library;
    }
  }

  ngOnInit() {
    this.discogs.libraryObs.subscribe(
        (data) => {
          this.library = data;
          if (this.library.message) {
            this.router.navigate(['./login']);
            /* @todo FlashMessage */
          }
        }
    );
  }

  ngAfterViewInit() {}

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
