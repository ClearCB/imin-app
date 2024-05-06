import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventProfileTabComponent } from './event-profile-tab.component';

describe('EventProfileTabComponent', () => {
  let component: EventProfileTabComponent;
  let fixture: ComponentFixture<EventProfileTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventProfileTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventProfileTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
