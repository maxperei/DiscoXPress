import { Component } from '@angular/core';
import { Collection } from "../pages/collection/collection.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App {

  rootPage: any = Collection;
  pages: Array<{title: string, component: any}>;

  constructor() {
    // set our app's pages
    this.pages = [
      {title: 'Search', component: Collection},
      {title: 'Collection', component: Collection},
      {title: 'Wantlist', component: Collection},
      {title: 'Identity', component: Collection},
      {title: 'Settings', component: Collection},
    ];
  }
}