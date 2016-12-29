import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { rootRoutes } from "../pages/root-page/root.routes";
import { collectionRoutes } from '../pages/collection/collection.routes';
import { identityRoutes } from "../pages/identity/identity.routes";
import { profileRoutes } from "../pages/profile/profile.routes";
import { pageNotFoundRoutes } from "../pages/page-not-found/page-not-found.routes";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    ...rootRoutes,
    ...collectionRoutes,
    ...identityRoutes,
    ...profileRoutes,
    ...pageNotFoundRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);