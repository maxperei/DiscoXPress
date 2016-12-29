import { Routes } from '@angular/router';
import { PageNotFound } from './page-not-found.component';

export const pageNotFoundRoutes: Routes = [
    { path: '**', component: PageNotFound },
];