import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomListItemEventComponent } from './custom-list-item-event.component';

describe('CustomListItemEventComponent', () => {
  let component: CustomListItemEventComponent;
  let fixture: ComponentFixture<CustomListItemEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomListItemEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomListItemEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
