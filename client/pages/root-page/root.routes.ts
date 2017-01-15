import { Routes } from '@angular/router';
import { RootPage } from './root-page.component';
import { ReleaseDetail } from "../release/release-detail.component";

export const rootRoutes: Routes = [
    { path: '', component: RootPage },
    { path: 'rel/:id', component: ReleaseDetail }
];