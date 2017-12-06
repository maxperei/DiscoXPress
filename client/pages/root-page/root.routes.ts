import { Routes } from '@angular/router';
import { RootPageComponent } from './root-page.component';
import { ReleaseDetailComponent } from '../release/release-detail.component';

export const rootRoutes: Routes = [
    { path: '', component: RootPageComponent },
    { path: 'rel/:id', component: ReleaseDetailComponent }
];
