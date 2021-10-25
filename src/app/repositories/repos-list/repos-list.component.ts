import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Repo } from 'src/app/models/repos/repo';
import { ReposService } from 'src/app/services/repos.service';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.css']
})
export class ReposListComponent implements OnInit {

  toolbarSubscription: Subscription;
  repoSubscription: Subscription;
  reposChecked: Repo[]=[];

  searchBarValue: string = '';

  numbersCount: number[]=[];//Les différentes valeurs à assigner au ngFor pour l'affichage de la liste
  currentPosition: number;
  maxNumberToDisplay: number;
  numberOfPages: number;
  allItemsCheckedDisplayed: boolean;

  dateNow: Date;

  repos: Repo[];

  constructor(private cdRef: ChangeDetectorRef, private reposService: ReposService) { }

  ngOnInit(): void {
    this.maxNumberToDisplay = 5; // première valeur du steps dans contacts-items-number.component.html
    this.repoSubscription = this.reposService.repoSubject.subscribe((repos: Repo[]) => {
      this.repos = repos
    });
    this.reposService.emitRepos();

    if (this.repos.length !== 0 ) {
      this.setNumbersCount(this.maxNumberToDisplay);
      this.currentPosition = this.maxNumberToDisplay;
    }else{
      this.numbersCount = new Array();
      this.currentPosition = 0;
    }
  }

  ngOnChanges()
  {
    this.toolbarSubscription = this.reposService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === true) {
        //this.onExportContactsAsXLSX(res.value);
      }
    });
  }

  ngAfterViewChecked()
  {
    this.upDateNumberOfPages();

    this.dateNow = new Date();
    this.cdRef.detectChanges();
  }

  onSingleDelete(value: any){

    this.reposService.deleteRepot(value);
    if (this.repos.length - this.currentPosition) {this.numbersCount.pop(); }// Si dernière page

    this.allItemsCheckedDisplayed = false;
    console.log('numbers count: ' + this.numbersCount.length);
  }

  onMultipleDelete(){
    for (let i = 0; i < this.reposChecked.length; i++) {
      this.reposService.deleteRepot(this.reposChecked[i].name);
      if (this.repos.length - this.currentPosition) {this.numbersCount.pop(); }// Si dernière page
    }
    this.allItemsCheckedDisplayed = false;
  }

  onCheckedSingle(reponame: string){
    let repo = new Repo;
    this.reposService.getRepo(reponame).subscribe(data => {repo = data});
    console.log(this.reposChecked.length);
    this.reposChecked.push(repo);
    console.log("Vous avez selectionné 1");
  }

  onUnCheckedSingle(reference: string){
    for (let i = 0; i < this.reposChecked.length; i++) {
      if (this.reposChecked[i].name.includes(reference) && reference.includes(this.reposChecked[i].name)){
        this.reposChecked.splice(i, 1);
        break;
       }
    }
  }

  onSelectAllDisplayed(value: boolean){

    this.allItemsCheckedDisplayed = value;
    if(this.allItemsCheckedDisplayed){
      this.numbersCount.forEach((item) => {this.reposChecked.push(this.repos[item]); });
      console.log("Vous avez tout selectionné");
    }else{
      this.reposChecked = Array(0);
    }
  }

  onPreviousPageClicked(value: boolean){

    if (this.currentPosition % this.maxNumberToDisplay === 0)
    {
      if (this.currentPosition - this.maxNumberToDisplay > 0)
      {
        this.onPageNumberClicked((this.currentPosition / this.maxNumberToDisplay) - 1);
      }
    }else{
      if (this.currentPosition - this.maxNumberToDisplay > 0){
        this.onPageNumberClicked(Math.floor(this.currentPosition / this.maxNumberToDisplay));
      }
    }
  }

  onPageNumberClicked(value: number)
  {
    this.currentPosition = (value - 1) * this.maxNumberToDisplay;
    let pagesLeft: number;

    pagesLeft = this.repos.length - this.currentPosition;

    if (pagesLeft > 0)
    {
      if (pagesLeft <= this.maxNumberToDisplay){
        this.forwardFill(pagesLeft);
      }else{
        this.forwardFill(this.maxNumberToDisplay);
      }
      this.allItemsCheckedDisplayed = false;
    }
  }

  onNextPageClicked(value: boolean)
  {
    let pagesLeft: number;

    pagesLeft = this.repos.length - this.currentPosition;
    if (pagesLeft > 0){
      this.onPageNumberClicked((this.currentPosition / this.maxNumberToDisplay) + 1);
    }
  }

  onMaxNumberChanged(value: any)
  {
    this.maxNumberToDisplay = parseInt(value);
    this.setNumbersCount(this.maxNumberToDisplay);
    if (this.allItemsCheckedDisplayed) {this.onSelectAllDisplayed(true); }
  }

  onWritingIntoSearchbar(value: string) {
    this.searchBarValue = value;
    this.currentPosition = this.maxNumberToDisplay;
    this.numbersCount = Array(this.maxNumberToDisplay).fill(this.maxNumberToDisplay).map( (x , i) => i);

    this.repos = this.reposService.filterReposByName(value);

    if (this.numbersCount.length > this.repos.length) { this.numbersCount.length = this.repos.length; }
  }

  setNumbersCount(value: number)
  {
    if (value > this.numbersCount.length)
    {
      for (let index = this.numbersCount.length, j = this.numbersCount[this.numbersCount.length - 1] + 1; index < value; index++, j++)
      {
        if (this.repos.length - 1 > this.numbersCount[this.numbersCount.length - 1] ){
          this.numbersCount.push(j);
          this.currentPosition += 1;
        }
      }
    }
    else
    {
      for (let index = this.numbersCount.length; index > value; index--)
      {
        this.numbersCount.pop();
        this.currentPosition -= 1;
      }
    }
  }

  upDateNumberOfPages()
  {
    this.numberOfPages = Math.floor(this.repos.length / this.maxNumberToDisplay);

    if ((this.repos.length % this.maxNumberToDisplay) !== 0) {this.numberOfPages++; }
  }

  forwardFill(interval: number)
  {
    this.numbersCount = Array(interval);

    for (let i = (this.currentPosition ), j = 0; i < (this.currentPosition + interval); i++, j++)
    {
      this.numbersCount[j] = i;
    }
    this.currentPosition += interval;
  }

  ngOnDestroy() {
    this.toolbarSubscription.unsubscribe();
    this.repoSubscription.unsubscribe();
  }
}
