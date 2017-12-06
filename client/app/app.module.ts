import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DiscogsApi } from '../services/discogs-api';
import { CollectionComponent } from '../pages/collection/collection.component';
import { IdentityComponent } from '../pages/identity/identity.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { routing } from './app.routes';
import { RootPageComponent } from '../pages/root-page/root-page.component';
import { ReleaseDetailComponent } from '../pages/release/release-detail.component';
import { SafePipe } from '../pipes/safe.pipe';
import { LoginComponent } from '../pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    IdentityComponent,
    PageNotFoundComponent,
    ProfileComponent,
    RootPageComponent,
    ReleaseDetailComponent,
    SafePipe,
    LoginComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    DiscogsApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
