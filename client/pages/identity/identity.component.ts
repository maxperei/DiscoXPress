import { Component, OnInit } from '@angular/core';
import { DiscogsApi } from "../../services/discogs-api";
import { Http } from "@angular/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IdentityComponent implements OnInit {
  public identity;
  public profile;
  public avatar: string;
  public message: string;
  private username: string;
  private name: string;
  private avatar_url: string ;

  constructor(public discogs: DiscogsApi, public router: Router, public http: Http) {
    discogs.loadIdentity();
    discogs.identityObs.subscribe(
        (data) => {
          this.identity = JSON.parse(window.localStorage['identity']);
          if (this.identity.message) {
            router.navigate(['./login']);
            /* TODO FlashMessage */
          }
          /* TODO Service */
          this.http.get(this.identity.session.resource_url).map(res => res.json()).subscribe(
              (data) => {
                this.profile = data;
                this.username = this.profile.username;
                this.name = this.profile.name;
                this.avatar = this.profile.avatar_url;
                this.avatar_url = 'url('+this.profile.avatar_url+')';
              }
          )
        }
    );
  }

  ngOnInit() {  }
}
