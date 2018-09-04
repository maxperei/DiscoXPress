import { Component } from '@angular/core';
import { CollectionComponent } from '../pages/collection/collection.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pages: Array<{title: string, link: string}>;

  constructor() {
    this.pages = [
      {title: 'Shop', link: '/'},
      {title: 'Collection', link: '/collection'},
      {title: 'Settings', link: '/settings'},
    ];
  }
}
