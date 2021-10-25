import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsDisplayClientsComponent } from './contacts-display-clients.component';

describe('ContactsDisplayClientsComponent', () => {
  let component: ContactsDisplayClientsComponent;
  let fixture: ComponentFixture<ContactsDisplayClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsDisplayClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsDisplayClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
