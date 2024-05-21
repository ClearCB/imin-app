import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { AuthService } from '../../../../auth/infrastructure/service/auth.service';
import { LoginResponse } from '../../../../auth/domain/model/login-response';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TabViewModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  userInfo?: LoginResponse | null;
  loaded: boolean = false;

  constructor(private authService: AuthService) {

  }
  async ngOnInit(): Promise<void> {
    this.loaded = false;

    this.authService.currentUserLogged.subscribe({
      next: (userData) => this.userInfo = userData
    })

    this.loaded = true
  }

}
