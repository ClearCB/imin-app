import { Component, ElementRef } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { LayoutService } from '../../service/app.layout.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  constructor(public layoutService: LayoutService, public el: ElementRef) {

  }
}
