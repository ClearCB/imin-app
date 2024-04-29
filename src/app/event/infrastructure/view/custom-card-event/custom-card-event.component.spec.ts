import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCardEventComponent } from './custom-card-event.component';

describe('CustomCardEventComponent', () => {
  let component: CustomCardEventComponent;
  let fixture: ComponentFixture<CustomCardEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCardEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomCardEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
