import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { LayoutService } from '../../service/app.layout.service';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FooterComponent } from '../footer/footer.component';
import { Subscription, filter } from 'rxjs';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventCreateFormComponent } from '../../../../event/infrastructure/view/event-create-form/event-create-form.component';
import { AuthService } from '../../../../auth/infrastructure/service/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, TopBarComponent, DashboardComponent,
    RouterOutlet, FooterComponent, SideBarComponent,
    SpeedDialModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {
  overlayMenuOpenSubscription: Subscription;

  eventCreateForm: DynamicDialogRef | undefined;

  userLoggedIn: boolean = false;

  menuOutsideClickListener: any;

  profileMenuOutsideClickListener: any;

  @ViewChild(SideBarComponent) appSidebar!: SideBarComponent;

  @ViewChild(TopBarComponent) appTopbar!: TopBarComponent;

  items: any;

  constructor(public layoutService: LayoutService, private authService: AuthService,
    public renderer: Renderer2, public router: Router, public dialogService: DialogService) {
    this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
      if (!this.menuOutsideClickListener) {
        this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
          const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
            || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));

          if (isOutsideClicked) {
            this.hideMenu();
          }
        });
      }

      if (!this.profileMenuOutsideClickListener) {
        this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
          const isOutsideClicked = !(this.appTopbar.menu.nativeElement.isSameNode(event.target) || this.appTopbar.menu.nativeElement.contains(event.target)
            || this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) || this.appTopbar.topbarMenuButton.nativeElement.contains(event.target));

          if (isOutsideClicked) {
            this.hideProfileMenu();
          }
        });
      }

      if (this.layoutService.state.staticMenuMobileActive) {
        this.blockBodyScroll();
      }
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideMenu();
        this.hideProfileMenu();
      });
  }
  ngOnInit(): void {

    this.authService.currentUserLoginIn.subscribe({
      next: (userLoggedin) => this.userLoggedIn = userLoggedin
    })

    this.items = [
      {
        tooltipOptions: {
          tooltipLabel: 'Add event'
        },
        icon: 'pi pi-map-marker',
        command: () => {
          this.eventCreateForm = this.dialogService.open(EventCreateFormComponent, {
            header: 'Select a Product',
            width: '85vw',
            modal: true,
            breakpoints: {
              '960px': '75vw',
              '640px': '90vw'
            },
            baseZIndex: 10000,
            maximizable: true
          });
        }
      }
    ];
  }

  hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  hideProfileMenu() {
    this.layoutService.state.profileSidebarVisible = false;
    if (this.profileMenuOutsideClickListener) {
      this.profileMenuOutsideClickListener();
      this.profileMenuOutsideClickListener = null;
    }
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    }
    else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    }
    else {
      document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
        'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config().colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
      'layout-overlay': this.layoutService.config().menuMode === 'overlay',
      'layout-static': this.layoutService.config().menuMode === 'static',
      'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config().menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config().inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config().ripple
    }
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
