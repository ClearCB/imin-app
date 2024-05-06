import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TabViewModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
