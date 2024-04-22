import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginResponse } from '../../../../auth/domain/model/login-response';
import { RouterLink } from '@angular/router';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FooterComponent } from '../footer/footer.component';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../service/app.layout.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TableModule, MenuModule,
    RouterLink, ButtonModule, SidebarModule,
    AvatarModule, AvatarGroupModule,
    FooterComponent, NgStyle, CurrencyPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userLoggedIn: boolean = false;
  userInfo?: LoginResponse;
  tokenData?: any;

  items!: MenuItem[];

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;

  constructor(
    public layoutService: LayoutService) {

  }

  ngOnInit(): void {

    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];

  }

}
