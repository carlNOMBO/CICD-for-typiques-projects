import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsItemsNumberComponent } from './contacts-items-number.component';

describe('ContactsItemsNumberComponent', () => {
  let component: ContactsItemsNumberComponent;
  let fixture: ComponentFixture<ContactsItemsNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsItemsNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsItemsNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
