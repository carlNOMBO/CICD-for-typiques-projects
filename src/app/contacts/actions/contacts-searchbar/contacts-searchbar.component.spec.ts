import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsSearchbarComponent } from './contacts-searchbar.component';

describe('ContactsSearchbarComponent', () => {
  let component: ContactsSearchbarComponent;
  let fixture: ComponentFixture<ContactsSearchbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsSearchbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
