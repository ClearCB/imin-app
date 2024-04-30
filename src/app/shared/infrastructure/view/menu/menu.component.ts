import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';
import { MenuItemContent } from 'primeng/menu';
import { AppMenuitemComponent } from '../menu-item/menu-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AppMenuitemComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  model: any[] = [];

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          // { label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink: ['/calendar'] }
        ]
      },
      {
        label: 'Events',
        items: [
          { label: 'Map', icon: 'pi pi-fw pi-map', routerLink: ['/home/event-map'] },
          { label: 'Search', icon: 'pi pi-fw pi-search', routerLink: ['/home/event-list'] },
          { label: 'Create', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/home/event-new'] },
          { label: 'Today', icon: 'pi pi-fw pi-thumbtack', routerLink: ['/home/event-new1'] },
          { label: 'Ratings', icon: 'pi pi-fw pi-star', routerLink: ['/home/event-new2'] },
        ]
      },
      // {
      //   label: 'Plans',
      //   items: [
      //     { label: 'Map', icon: 'pi pi-fw pi-map', routerLink: ['/home/event-map'] },
      //     { label: 'Search', icon: 'pi pi-fw pi-search', routerLink: ['/home/event-list'] },
      //     { label: 'Create ', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/event-new'] },
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
  }
}
