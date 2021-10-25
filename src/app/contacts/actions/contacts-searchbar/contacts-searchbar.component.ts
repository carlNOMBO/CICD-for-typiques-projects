import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contacts-searchbar',
  templateUrl: './contacts-searchbar.component.html',
  styleUrls: ['./contacts-searchbar.component.scss']
})
export class ContactsSearchbarComponent implements OnInit {

  @Output()
  searchValueChange: EventEmitter<string> = new EventEmitter<string>();
  searchValue: string;

  constructor() { }

  ngOnInit(): void {
    this.searchValue = '';
  }

  onChange(value: string) {
    this.searchValueChange.emit(value);
  }
}
