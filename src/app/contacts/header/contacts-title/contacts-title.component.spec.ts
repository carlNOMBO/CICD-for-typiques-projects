import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsTitleComponent } from './contacts-title.component';

describe('ContactsTitleComponent', () => {
  let component: ContactsTitleComponent;
  let fixture: ComponentFixture<ContactsTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
