import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-not-found-error',
  standalone: true,
  imports: [RouterLink, ButtonModule, RippleModule],
  templateUrl: './not-found-error.component.html',
  styleUrl: './not-found-error.component.scss'
})
export class NotFoundErrorComponent {

}
