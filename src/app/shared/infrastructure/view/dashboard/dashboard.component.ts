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
import { CarouselModule } from 'primeng/carousel';
import { SearchEventComponent } from '../../../../event/infrastructure/view/search-event/search-event.component';
import { searchOnlineEvent } from '../../../../event/application/search-event/search-event-precon-searchs';
import { EventService } from '../../../../event/infrastructure/service/event.service';
import { CustomCardEventComponent } from '../../../../event/infrastructure/view/custom-card-event/custom-card-event.component';
import { SHARED_CONSTANTS } from '../../../shared-constants';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TableModule, MenuModule,
    RouterLink, ButtonModule, SidebarModule,
    AvatarModule, AvatarGroupModule,
    FooterComponent, NgStyle, CurrencyPipe,
    CarouselModule, SearchEventComponent, CustomCardEventComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userInfo?: LoginResponse;
  tokenData?: any;

  items!: MenuItem[];

  categories: any[] = [];

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
  dataLoaded: boolean = false;
  products: any[] = [];

  responsiveOptions: any[] | undefined;

  listEventRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.LIST}`;
  mapEventRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.MAP}`;

  constructor(
    public layoutService: LayoutService, private eventService: EventService) {

  }

  ngOnInit(): void {

    const eOptions = searchOnlineEvent(false);

    this.eventService.searchEvents(eOptions)
      .then((events) => {
        if (events) {
          this.products = events;
          this.dataLoaded = true;
        }
      })

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];


    this.prepareCategoriesSection();

  }


  private prepareCategoriesSection() {
    this.categories = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus', name: "Sport" },
      { label: 'Add New', icon: 'pi pi-fw pi-plus', name: "Sport" },
      { label: 'Add New', icon: 'pi pi-fw pi-plus', name: "Sport" },
      { label: 'Add New', icon: 'pi pi-fw pi-plus', name: "Sport" },
      { label: 'Add New', icon: 'pi pi-fw pi-plus', name: "Sport" },
      { label: 'Add New', icon: 'pi pi-fw pi-plus', name: "Sport" },
    ]

    // const rows = Math.round(totalCategories.length / 6);

    // let startIndex = 0;
    // let nextIndex = 6;
    // for (let i = 1; i <= rows; i++) {

    //   const categoriesSplit = totalCategories.slice(startIndex, nextIndex);
    //   this.categories.push(categoriesSplit);

    //   startIndex = nextIndex;
    //   nextIndex = 6 * (i + 1);


    // }

  }
}
