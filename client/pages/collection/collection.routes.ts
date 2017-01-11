import { Routes } from '@angular/router';
import { Collection } from './collection.component';
import { CollectionDetail } from "./collection-detail.component";

export const collectionRoutes: Routes = [
    //{ path: '', component: Collection },
    { path: 'collection', component: Collection },
    { path: 'col/:id', component: CollectionDetail }
];