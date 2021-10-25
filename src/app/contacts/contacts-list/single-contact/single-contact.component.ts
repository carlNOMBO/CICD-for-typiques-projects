import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.scss']
})
export class SingleContactComponent implements OnInit {

  @Input() REFERENCE: any;
  @Input() CAT: any;
  @Input() NOM: any;
  @Input() CP: any;
  @Input() VILLE: any;
  @Input() TVA: any;
  @Input() selectState: boolean;

  @Output() checked: EventEmitter<string> = new EventEmitter<string>();
  @Output() unChecked: EventEmitter<string> = new EventEmitter<string>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  @Input() isClients: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCheckboxChange(value: any){
    value.checked ? this.checked.emit(this.REFERENCE) : this.unChecked.emit(this.REFERENCE);
  }

  onDelete(){
    this.delete.emit(this.REFERENCE);
  }

  onModify(){
    this.isClients ? this.router.navigate(['/contacts', 'ajout', 'client', this.REFERENCE])
                   : this.router.navigate(['/contacts', 'ajout', 'fournisseur', this.REFERENCE]);
  }
}
