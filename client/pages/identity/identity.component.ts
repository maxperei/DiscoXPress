import { Component, OnInit } from '@angular/core';
import { DiscogsApi } from "../../services/discogs-api";
import { Router } from '@angular/router';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class Identity implements OnInit {
  public identity;
  public message;

  constructor(public discogs: DiscogsApi, public router: Router) {
    discogs.loadIdentity();
    discogs.identityObs.subscribe(
        (data) => {
          this.identity = JSON.parse(window.localStorage['identity']);
          if (this.identity.message) {
            router.navigate(['./login']);
            /* TODO FlashMessage */
          }
        }
    );
  }

  ngOnInit() {  }
}