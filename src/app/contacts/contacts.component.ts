import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

 option: string;
 @Input() title: string;
 @Input() subtitle: string;
 @Input() isClients: boolean;

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
  }

  //Import ou Export
  onToolbarClicked(value: boolean){
    this.contactsService.notifyOther({option: value});
  }
}
