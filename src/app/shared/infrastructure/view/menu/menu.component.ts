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
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
        ]
      },
      {
        label: 'Events',
        items: [
          { label: 'Create', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/event'] },
          { label: 'New event', icon: 'pi pi-fw pi-plus', routerLink: ['/home/new-event'] },
          { label: 'Search event', icon: 'pi pi-fw pi-search', routerLink: ['/home/new-event'] },
        ]
      },
      {
        label: 'Community',
        items: [
          { label: 'Create', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/event'] },
          { label: 'New community', icon: 'pi pi-fw pi-users', routerLink: ['/home/new-event'] },
          { label: 'Search community', icon: 'pi pi-fw pi-search', routerLink: ['/home/new-event'] },
        ]
      }
    ];
  }
}
