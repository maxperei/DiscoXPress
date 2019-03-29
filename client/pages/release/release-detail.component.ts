import { Component, OnDestroy, OnInit } from '@angular/core';
import { DiscogsApi } from '../../services/discogs-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.css']
})

export class ReleaseDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  private call: any;
  protected ref: any;
  protected artw: any;
  protected status: any;
  protected title: any;
  protected artists: any;
  protected country: any;
  protected videos: any;

  constructor(public discogs: DiscogsApi, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        this.discogs.findRelById(id);

        if (this.discogs.cache[id]) {
          this.ref = this.discogs.release;
          this.artw = this.ref.images;
          this.status = this.ref.status;
          this.title = this.ref.title;
          this.artists = this.ref.artists;
          this.country = this.ref.country;
          this.videos = this.ref.videos;
        }

        this.call = this.discogs.releaseObs.subscribe(
            (data) => {
              this.ref = data;
              this.artw = this.ref.images;
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
    // console.log(this.route.params);
    // if (this.discogs.isInCache())
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.call.unsubscribe();
  }

}
