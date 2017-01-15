import { Routes } from '@angular/router';
import { Collection } from './collection.component';
import { ReleaseDetail } from "../release/release-detail.component";

export const collectionRoutes: Routes = [
    { path: 'collection', component: Collection },
    { path: 'rel/:id', component: ReleaseDetail }
];