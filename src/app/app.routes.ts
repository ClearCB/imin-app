import { Routes } from '@angular/router';
import { LoginComponent } from './auth/infrastructure/view/login/login.component';
import { DashboardComponent } from './shared/infrastructure/view/dashboard/dashboard.component';
import { GeneralErrorComponent } from './shared/infrastructure/view/error/general-error/general-error.component';
import { authGuard } from './auth/infrastructure/guard/auth.guard';
import { LayoutComponent } from './shared/infrastructure/view/layout/layout.component';
import { EventListComponent } from './event/infrastructure/view/event-list/event-list.component';
import { NotFoundErrorComponent } from './shared/infrastructure/view/error/not-found-error/not-found-error.component';
import { ForbiddenErrorComponent } from './shared/infrastructure/view/error/forbidden-error/forbidden-error.component';
import { EventCreateFormComponent } from './event/infrastructure/view/event-create-form/event-create-form.component';
import { EventDetailComponent } from './event/infrastructure/view/event-detail/event-detail/event-detail.component';
import { MapLayoutComponent } from './map/infrastructure/view/map-layout/map-layout.component';
import { EventMapComponent } from './event/infrastructure/view/event-map/event-map.component';
import { ProfileComponent } from './account/infrastructure/view/profile/profile.component';
import { CustomCalendarComponent } from './event/infrastructure/view/custom-calendar/custom-calendar.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Empty route => home
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'calendar', component: CustomCalendarComponent, canActivate: [authGuard] },
    {
        path: 'home', component: LayoutComponent,
        children: [
            { path: '', component: DashboardComponent },
            {
                path: 'event-map', component: EventMapComponent,
                children: [{ path: "", component: MapLayoutComponent }]
            },
            { path: 'event-list', component: EventListComponent },
            { path: 'event-new', component: EventCreateFormComponent, canActivate: [authGuard] },
            { path: 'event-detail', component: EventDetailComponent },
        ]
    },
    { path: 'error', component: GeneralErrorComponent, },
    { path: 'forbidden', component: ForbiddenErrorComponent },
    { path: 'not-found', component: NotFoundErrorComponent },
    { path: '**', redirectTo: '/not-found' },

];
