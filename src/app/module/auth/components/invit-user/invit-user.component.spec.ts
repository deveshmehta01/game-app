import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitUserComponent } from './invit-user.component';

describe('InvitUserComponent', () => {
  let component: InvitUserComponent;
  let fixture: ComponentFixture<InvitUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
