import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SHARED_CONSTANTS } from '../../../../shared-constants';

@Component({
  selector: 'app-forbidden-error',
  standalone: true,
  imports: [RouterLink, ButtonModule, RippleModule],
  templateUrl: './forbidden-error.component.html',
  styleUrl: './forbidden-error.component.scss'
})
export class ForbiddenErrorComponent {
  homeRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.HOME}`;

}
