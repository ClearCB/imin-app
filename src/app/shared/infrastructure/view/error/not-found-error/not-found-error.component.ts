import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SHARED_CONSTANTS } from '../../../../shared-constants';

@Component({
  selector: 'app-not-found-error',
  standalone: true,
  imports: [RouterLink, ButtonModule, RippleModule],
  templateUrl: './not-found-error.component.html',
  styleUrl: './not-found-error.component.scss'
})
export class NotFoundErrorComponent {
  homeRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.HOME}`;
}
