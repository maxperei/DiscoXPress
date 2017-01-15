import { Routes } from '@angular/router';
import { RootPage } from './root-page.component';
import { ListingDetail } from "../listing/listing-detail.component";

export const rootRoutes: Routes = [
    { path: '', component: RootPage },
    { path: 'rel/:id', component: ListingDetail }
];