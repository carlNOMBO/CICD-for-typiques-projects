import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsDisplayFournisseursComponent } from './contacts-display-fournisseurs.component';

describe('ContactsDisplayFournisseursComponent', () => {
  let component: ContactsDisplayFournisseursComponent;
  let fixture: ComponentFixture<ContactsDisplayFournisseursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsDisplayFournisseursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsDisplayFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
