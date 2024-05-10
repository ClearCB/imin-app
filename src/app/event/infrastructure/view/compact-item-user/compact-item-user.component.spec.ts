import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactItemUserComponent } from './compact-item-user.component';

describe('CompactItemUserComponent', () => {
  let component: CompactItemUserComponent;
  let fixture: ComponentFixture<CompactItemUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompactItemUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompactItemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
