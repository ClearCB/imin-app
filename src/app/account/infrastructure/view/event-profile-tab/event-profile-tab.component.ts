import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-event-profile-tab',
  standalone: true,
  imports: [TabViewModule],
  templateUrl: './event-profile-tab.component.html',
  styleUrl: './event-profile-tab.component.scss'
})
export class EventProfileTabComponent {

}
