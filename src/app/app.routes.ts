import { Routes } from '@angular/router';
import { LoginComponent } from './auth/infrastructure/view/login/login.component';
import { DashboardComponent } from './shared/infrastructure/view/dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/infrastructure/view/error/page-not-found/page-not-found.component';
import { GeneralErrorComponent } from './shared/infrastructure/view/error/general-error/general-error.component';
import { authGuard } from './auth/infrastructure/guard/auth.guard';
import { LayoutComponent } from './shared/infrastructure/view/layout/layout.component';
import { EventListComponent } from './event/infrastructure/view/event-list/event-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Empty route => home
    { path: 'login', component: LoginComponent },
    { path: 'home', component: DashboardComponent },
    { path: 'new-event', component: EventListComponent },
    { path: 'error', component: GeneralErrorComponent, canActivate: [authGuard] },
    { path: '**', component: PageNotFoundComponent }, // 404 page not found


    // // This is for admin panels
    // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Empty route => home
    // { path: 'login', component: LoginComponent },
    // {
    //     path: '',
    //     component: LayoutComponent,
    //     children: [{
    //         path: 'dashboard',
    //         component: DashboardComponent
    //     }]
    // },
    // { path: '**', component: PageNotFoundComponent }, // 404 page not found
];
