import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VericationCodeComponent } from './verication-code.component';

describe('VericationCodeComponent', () => {
  let component: VericationCodeComponent;
  let fixture: ComponentFixture<VericationCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VericationCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VericationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
