import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsAddClientComponent } from './contacts-add-client.component';

describe('ContactsAddClientComponent', () => {
  let component: ContactsAddClientComponent;
  let fixture: ComponentFixture<ContactsAddClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsAddClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsAddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
