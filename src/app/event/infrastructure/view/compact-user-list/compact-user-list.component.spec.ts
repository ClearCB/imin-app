import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactUserListComponent } from './compact-user-list.component';

describe('CompactUserListComponent', () => {
  let component: CompactUserListComponent;
  let fixture: ComponentFixture<CompactUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompactUserListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompactUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
