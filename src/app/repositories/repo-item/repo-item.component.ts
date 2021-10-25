import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-repo-item',
  templateUrl: './repo-item.component.html',
  styleUrls: ['./repo-item.component.css']
})
export class RepoItemComponent implements OnInit {

  @Input() name: any;
  @Input() repotype: any;
  @Input() project: any;
  @Input() pipe: any;
  @Input() selectState: boolean;

  @Output() checked: EventEmitter<string> = new EventEmitter<string>();
  @Output() unChecked: EventEmitter<string> = new EventEmitter<string>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }


  onCheckboxChange(value: any){
    value.checked ? this.checked.emit(this.name) : this.unChecked.emit(this.name);
  }

  onDelete(){
    this.delete.emit(this.name);
  }

  onModify(){
  }
}
