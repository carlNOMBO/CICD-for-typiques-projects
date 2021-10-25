import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsAddFournisseurComponent } from './contacts-add-fournisseur.component';

describe('ContactsAddFournisseurComponent', () => {
  let component: ContactsAddFournisseurComponent;
  let fixture: ComponentFixture<ContactsAddFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsAddFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsAddFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
