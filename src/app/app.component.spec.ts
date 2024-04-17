import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { DashboardComponent } from './shared/infrastructure/view/dashboard/dashboard.component';
import { FooterComponent } from './shared/infrastructure/view/footer/footer.component';
import { HeaderComponent } from './shared/infrastructure/view/header/header.component';
import { MessageService } from 'primeng/api';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet,
        FooterComponent,
        DashboardComponent,
        HeaderComponent,
        ToastModule],
      providers: [MessageService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'imin-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('imin-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
  });
});
