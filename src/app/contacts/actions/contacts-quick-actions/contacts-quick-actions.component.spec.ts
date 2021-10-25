import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsQuickActionsComponent } from './contacts-quick-actions.component';

describe('ContactsQuickActionsComponent', () => {
  let component: ContactsQuickActionsComponent;
  let fixture: ComponentFixture<ContactsQuickActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsQuickActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
