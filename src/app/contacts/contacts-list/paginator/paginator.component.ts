import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() numberOfPages: number;
  @Output() previousClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() pageNumberClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() nextClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  pagesNumbers: any[];

  dateNow: Date;

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.pagesNumbers = new Array(this.numberOfPages).fill(this.numberOfPages).map((x , i) => i + 1);
  }

  ngOnChanges(): void {
    this.pagesNumbers = new Array(this.numberOfPages).fill(this.numberOfPages).map((x , i) => i + 1);
  }

  onBackwardClicked(){
    this.previousClicked.emit(true);
  }

  onNumberClicked(value: number){
    this.pageNumberClicked.emit(value);
  }

  onForwardClicked(){
    this.nextClicked.emit(true);
  }
}
