import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DiscogsApi } from '../../services/discogs-api';
import { apiBase } from '../../../server/config';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class Collection implements OnInit {

  public library;
  private authorize: string = apiBase+'/authorize';
  constructor(public discogs: DiscogsApi, private router: Router){
    discogs.loadDisco();
    discogs.libraryObs.subscribe(data => this.library = JSON.parse(window.localStorage['disco']));
  }

  ngOnInit() { }

}
