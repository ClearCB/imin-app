import { Routes } from '@angular/router';
import { LoginComponent } from './auth/infrastructure/view/login/login.component';
import { DashboardComponent } from './shared/infrastructure/view/dashboard/dashboard.component';
import { GeneralErrorComponent } from './shared/infrastructure/view/error/general-error/general-error.component';
import { authGuard } from './auth/infrastructure/guard/auth.guard';
import { LayoutComponent } from './shared/infrastructure/view/layout/layout.component';
import { EventListComponent } from './event/infrastructure/view/event-list/event-list.component';
import { RegisterComponent } from './auth/infrastructure/view/register/register.component';
import { NotFoundErrorComponent } from './shared/infrastructure/view/error/not-found-error/not-found-error.component';
import { ForbiddenErrorComponent } from './shared/infrastructure/view/error/forbidden-error/forbidden-error.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Empty route => home
    { path: 'login', component: LoginComponent },
    {
        path: 'home', component: LayoutComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'event', data: { breadcrumb: 'Prime Icons' }, component: EventListComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'new-event', component: EventListComponent, canActivate: [authGuard] },
        ]
    },
    { path: 'error', component: GeneralErrorComponent, },
    { path: 'forbidden', component: ForbiddenErrorComponent },
    { path: 'not-found', component: NotFoundErrorComponent },
    { path: '**', redirectTo: '/not-found' },

];
