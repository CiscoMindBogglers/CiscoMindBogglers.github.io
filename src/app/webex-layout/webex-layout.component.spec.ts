import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebexLayoutComponent } from './webex-layout.component';

describe('WebexLayoutComponent', () => {
  let component: WebexLayoutComponent;
  let fixture: ComponentFixture<WebexLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebexLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebexLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
