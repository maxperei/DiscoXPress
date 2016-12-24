import { Component } from '@angular/core';
import { DiscogsApi } from "../services/discogs-api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public library;
  constructor(public discogs: DiscogsApi){
    discogs.loadDisco();
    discogs.libraryObs.subscribe(data => this.library = JSON.parse(window.localStorage['disco']));
  }
}