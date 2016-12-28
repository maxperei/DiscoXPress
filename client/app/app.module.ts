import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { App } from './app.component';
import { DiscogsApi } from '../services/discogs-api';
import { Collection } from '../pages/collection/collection.component';
import { Identity } from '../pages/identity/identity.component';
import { PageNotFound } from '../pages/page-not-found/page-not-found.component'

const appRoutes : Routes = [
  { path: 'collection', component: Collection },
  { path: 'identity', component: Identity },
  { path: '**', component: PageNotFound }
];

@NgModule({
  declarations: [
    App,
    Collection,
    Identity,
    PageNotFound
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
      DiscogsApi
  ],
  bootstrap: [App]
})
export class AppModule { }
