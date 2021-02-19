import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebexTeamsComponent } from './webex-teams.component';

describe('WebexTeamsComponent', () => {
  let component: WebexTeamsComponent;
  let fixture: ComponentFixture<WebexTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebexTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebexTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
