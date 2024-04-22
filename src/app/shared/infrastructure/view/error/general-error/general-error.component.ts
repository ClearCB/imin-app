import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-general-error',
  standalone: true,
  imports: [RouterLink, ButtonModule, RippleModule],
  templateUrl: './general-error.component.html',
  styleUrl: './general-error.component.scss'
})
export class GeneralErrorComponent {

}
