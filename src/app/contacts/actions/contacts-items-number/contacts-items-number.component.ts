import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contacts-items-number',
  templateUrl: './contacts-items-number.component.html',
  styleUrls: ['./contacts-items-number.component.scss']
})
export class ContactsItemsNumberComponent implements OnInit {

  @Output()
  maxNumberChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onMaxNumberChanged(value: number) {
    this.maxNumberChanged.emit(value);
  }
}
