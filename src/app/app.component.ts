import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/infrastructure/view/footer/footer.component';
import { DashboardComponent } from './shared/infrastructure/view/dashboard/dashboard.component';
import { ToastModule } from 'primeng/toast';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    DashboardComponent,
    ToastModule,
    LeafletModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { }
