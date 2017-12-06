import { Routes } from '@angular/router';
import { CollectionComponent } from './collection.component';
import { ReleaseDetailComponent } from '../release/release-detail.component';

export const collectionRoutes: Routes = [
    { path: 'collection', component: CollectionComponent },
    { path: 'collection/:p/:pp', component: CollectionComponent },
    { path: 'rel/:id', component: ReleaseDetailComponent }
];
