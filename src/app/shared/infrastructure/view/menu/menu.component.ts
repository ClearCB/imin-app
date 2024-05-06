import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';
import { MenuItemContent } from 'primeng/menu';
import { AppMenuitemComponent } from '../menu-item/menu-item.component';
import { CommonModule } from '@angular/common';
import { SHARED_CONSTANTS } from '../../../shared-constants';
import { AuthService } from '../../../../auth/infrastructure/service/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AppMenuitemComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  model: any[] = [];
  profileSection: any[] = [];
  userLoggedIn: boolean = false;

  constructor(public layoutService: LayoutService, private authService: AuthService) { }


  ngOnInit() {

    this.authService.currentUserLoginIn.subscribe({
      next: (userLoggedin) => this.userLoggedIn = userLoggedin
    })

    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: [`/${SHARED_CONSTANTS.ENDPOINTS.HOME}`] },
          // { label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink: ['/calendar'] }
        ]
      },
      {
        label: 'Events',
        items: [
          { label: 'Map', icon: 'pi pi-fw pi-map', routerLink: [`/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.MAP}`] },
          { label: 'List', icon: 'pi pi-fw pi-search', routerLink: [`/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.LIST}`] },
          { label: 'Create', icon: 'pi pi-fw pi-plus-circle', routerLink: [`/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.CREATE}`] },
          // { label: 'Today', icon: 'pi pi-fw pi-thumbtack', routerLink: [`/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN}123`] },
          // { label: 'Ratings', icon: 'pi pi-fw pi-star', routerLink: [`/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.MAP}`] },
        ]
      }
      // {
      //   label: 'Plans',
      //   items: [
      //     { label: 'Map', icon: 'pi pi-fw pi-map', routerLink: ['/home/event-map'] },
      //     { label: 'Search', icon: 'pi pi-fw pi-search', routerLink: ['/home/list'] },
      //     { label: 'Create ', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/create'] },
      //   ]
      // },
      // {
      //   label: 'Community',
      //   items: [
      //     { label: 'Create', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/event'] },
      //     { label: 'New community', icon: 'pi pi-fw pi-users', routerLink: ['/home/new-event'] },
      //     { label: 'Search community', icon: 'pi pi-fw pi-search', routerLink: ['/home/new-event'] },
      //   ]
      // }
    ];

    this.profileSection = [
      {
        label: 'Profile',
        items: [
          { label: 'My personal data', icon: 'pi pi-user', routerLink: [`/${SHARED_CONSTANTS.ENDPOINTS.USER.NAME}/${SHARED_CONSTANTS.ENDPOINTS.USER.CHILDREN.PROFILE}`] },
          { label: 'My events', icon: 'pi pi-map-marker', routerLink: [`/${SHARED_CONSTANTS.ENDPOINTS.USER.NAME}/${SHARED_CONSTANTS.ENDPOINTS.USER.CHILDREN.EVENTS}`] },
        ]
      }

    ];
  }
}
