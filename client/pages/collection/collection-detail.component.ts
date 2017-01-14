import { Component, OnInit } from '@angular/core';
import { DiscogsApi } from "../../services/discogs-api";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})

export class CollectionDetail implements OnInit {
  private sub: any;
  private call: any;
  ref: any;
  status: any;
  title: any;
  artists: any;
  country: any;
  videos: any;
  uri : string = 'http://youtube.com/embed/V5s-KLGVcTI';
  constructor(public discogs: DiscogsApi, private route: ActivatedRoute){
      this.sub = this.route.params.subscribe(
          (params: any) => {
              let id = params['id'];
              this.discogs.findRefById(id);
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
