import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SHARED_CONSTANTS } from '../../../../shared-constants';

@Component({
  selector: 'app-general-error',
  standalone: true,
  imports: [RouterLink, ButtonModule, RippleModule],
  templateUrl: './general-error.component.html',
  styleUrl: './general-error.component.scss'
})
export class GeneralErrorComponent {
  homeRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.HOME}`;
}
