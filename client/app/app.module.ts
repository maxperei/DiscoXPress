import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { App } from './app.component';
import { DiscogsApi } from '../services/discogs-api';
import { Collection } from '../pages/collection/collection.component'

const appRoutes : Routes = [
  { path: 'collection', component: Collection }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    App,
    Collection
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
