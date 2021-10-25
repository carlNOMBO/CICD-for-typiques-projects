import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contacts-title',
  templateUrl: './contacts-title.component.html',
  styleUrls: ['./contacts-title.component.scss']
})
export class ContactsTitleComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  constructor() { }

  ngOnInit(): void {
  }

}
