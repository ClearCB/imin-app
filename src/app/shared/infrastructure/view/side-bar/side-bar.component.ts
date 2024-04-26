import { Component, ElementRef } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MenuComponent, DividerModule, RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  constructor(public el: ElementRef) {

  }
}
