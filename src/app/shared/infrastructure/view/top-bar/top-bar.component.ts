import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../service/app.layout.service';
import { NgClass } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../../../auth/infrastructure/service/auth.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormBuilder, FormGroup, FormsModule, NgModel } from '@angular/forms';
import { LoginResponse } from '../../../../auth/domain/model/login-response';
import { SHARED_CONSTANTS } from '../../../shared-constants';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [NgClass, RouterLink, TooltipModule, InputSwitchModule, FormsModule,],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {

  items!: MenuItem[];

  homeRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.HOME}`;
  profileRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.PROFILE}`;
  loginRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.LOGIN}`;

  formGroup: FormGroup | undefined;

  selected: boolean = false;

  userLoggedIn: boolean = false;

  userInfo?: LoginResponse | null;

  localesList = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' }
  ];

  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;

  set theme(val: string) {
    this.layoutService.config.update((config) => ({
      ...config,
      theme: val,
    }));
  }

  get theme(): string {
    return this.layoutService.config().theme;
  }

  set colorScheme(val: string) {
    this.layoutService.config.update((config) => ({
      ...config,
      colorScheme: val,
    }));
  }

  get colorScheme(): string {
    return this.layoutService.config().colorScheme;
  }

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   this.selected = true;
    //   this.toggleTheme();
    // }
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      checked: true
    })

    this.authService.currentUserLoginIn.subscribe({
      next: (userLoggedin) => this.userLoggedIn = userLoggedin
    })

    this.authService.currentUserLogged.subscribe({
      next: (userData) => this.userInfo = userData
    })

  }

  singOut() {
    this.authService.logout();
    this.router.navigateByUrl(`/${SHARED_CONSTANTS.ENDPOINTS.LOGIN}`);
  }

  changeTheme(theme: string, colorScheme: string) {
    this.theme = theme;
    this.colorScheme = colorScheme;
  }

  toggleTheme() {

    this.changeTheme(
      this.selected ? 'bootstrap4-dark-blue' : 'bootstrap4-light-blue',
      this.selected ? 'dark' : 'light'
    );

  }

}
