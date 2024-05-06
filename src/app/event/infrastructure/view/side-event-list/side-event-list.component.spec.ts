import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideEventListComponent } from './side-event-list.component';

describe('SideEventListComponent', () => {
  let component: SideEventListComponent;
  let fixture: ComponentFixture<SideEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideEventListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
