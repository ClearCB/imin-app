import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMapLayoutComponent } from './event-map-layout.component';

describe('EventMapLayoutComponent', () => {
  let component: EventMapLayoutComponent;
  let fixture: ComponentFixture<EventMapLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventMapLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventMapLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
