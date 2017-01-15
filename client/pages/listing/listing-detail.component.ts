import { Component, OnInit } from '@angular/core';
import { DiscogsApi } from "../../services/discogs-api";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})

export class ListingDetail implements OnInit {
  private sub: any;
  private call: any;
  ref: any;
  status: any;
  title: any;
  artists: any;
  country: any;
  videos: any;
  constructor(public discogs: DiscogsApi, private route: ActivatedRoute){
      this.sub = this.route.params.subscribe(
          (params: any) => {
              let id = params['id'];
              this.discogs.findRelById(id);
              this.call = this.discogs.releaseObs.subscribe(
                  (data) => {
                      this.ref = data;
                      this.status = this.ref.status;
                      this.title = this.ref.title;
                      this.artists = this.ref.artists;
                      this.country = this.ref.country;
                      this.videos = this.ref.videos;
                  }
              );
          }
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.call.unsubscribe();
  }

}
