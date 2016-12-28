import { Component, OnInit } from '@angular/core';
import { DiscogsApi } from "../../services/discogs-api";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class Collection implements OnInit {

  public library;
  constructor(public discogs: DiscogsApi){
    discogs.loadDisco();
    discogs.libraryObs.subscribe(data => this.library = JSON.parse(window.localStorage['disco']));
  }

  ngOnInit() {
  }

}
