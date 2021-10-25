import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-contacts-quick-actions',
  templateUrl: './contacts-quick-actions.component.html',
  styleUrls: ['./contacts-quick-actions.component.scss']
})
export class ContactsQuickActionsComponent implements OnInit, OnChanges {

  @Output() allContactsCheckedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deleteCheckedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() changeState: boolean;
  allContactsChecked: boolean;

  constructor() { }

  ngOnInit(): void {
    this.allContactsChecked = false;
  }

  ngOnChanges(changes){
    this.allContactsChecked = this.changeState;
  }

  onSelectAllDisplayed(){
    this.allContactsChecked = !this.allContactsChecked;
    this.allContactsCheckedEvent.emit(this.allContactsChecked);
  }

  onDeleteChecked(){
    this.deleteCheckedEvent.emit(true);
  }

}
