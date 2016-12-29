import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <p>
        <strong>404</strong>
        <br>
        page not found
    </p>
  `
})
export class PageNotFound implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
