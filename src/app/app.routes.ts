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
import { EventDetailComponent } from './event/infrastructure/view/event-detail/event-detail.component';
import { MapLayoutComponent } from './map/infrastructure/view/map-layout/map-layout.component';
import { ProfileComponent } from './account/infrastructure/view/profile/profile.component';
import { RegisterComponent } from './auth/infrastructure/view/register/register.component';
import { SHARED_CONSTANTS } from './shared/shared-constants';
import { EventMapLayoutComponent } from './event/infrastructure/view/event-map-layout/event-map-layout.component';
import { EventListLayoutComponent } from './event/infrastructure/view/event-list-layout/event-list-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Empty route => home
    { path: SHARED_CONSTANTS.ENDPOINTS.LOGIN, component: LoginComponent },
    { path: SHARED_CONSTANTS.ENDPOINTS.REGISTER, component: RegisterComponent },
    { path: SHARED_CONSTANTS.ENDPOINTS.PROFILE, component: ProfileComponent, canActivate: [authGuard] },
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'home', component: DashboardComponent },
            {
                path: SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME,
                children: [
                    { path: SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.CREATE, component: EventCreateFormComponent, canActivate: [authGuard] },
                    { path: SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.MAP, component: EventMapLayoutComponent, },
                    { path: SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.LIST, component: EventListLayoutComponent },
                    { path: `${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.DETAIL}/:eventId`, component: EventDetailComponent },
                ]
            },
        ]
    },
    { path: SHARED_CONSTANTS.ENDPOINTS.ERROR, component: GeneralErrorComponent, },
    { path: SHARED_CONSTANTS.ENDPOINTS.FORBIDDEN, component: ForbiddenErrorComponent },
    { path: SHARED_CONSTANTS.ENDPOINTS.NOT_FOUND, component: NotFoundErrorComponent },
    { path: '**', redirectTo: '/not-found' },

];
