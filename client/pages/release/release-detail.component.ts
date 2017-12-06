import { Component, OnInit } from '@angular/core';
import { DiscogsApi } from '../../services/discogs-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.css']
})

export class ReleaseDetailComponent implements OnInit {
  private sub: any;
  private call: any;
  ref: any;
  artw: any;
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
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.call.unsubscribe();
  }

}
