import { Component } from '@angular/core';
import { Collection } from '../pages/collection/collection.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App {
  pages: Array<{title: string, link: string}>;

  constructor() {

    this.pages = [
      {title: 'Home', link: '/'},
      {title: 'Collection', link: '/collection'},
      {title: 'Wantlist', link: '/wantlist'},
      {title: 'Identity', link: '/identity'},
      {title: 'Settings', link: '/settings'},
    ];
  }
}