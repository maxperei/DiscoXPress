import { Component, OnInit } from '@angular/core';
import { DiscogsApi } from "../../services/discogs-api";

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class Identity implements OnInit {
  public identity;

  constructor(public discogs: DiscogsApi) {
    discogs.loadIdentity();
    discogs.identityObs.subscribe(data => this.identity = JSON.parse(window.localStorage['identity']));
  }

  ngOnInit() {
  }

}
