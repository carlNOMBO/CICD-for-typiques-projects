import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy, AfterViewChecked, OnChanges } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Client } from '../../models/contacts/client';
import { Fournisseur } from '../../models/contacts/fournisseur';
import { Subscription } from 'rxjs';
declare var $;
@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {

  @Input() isClients: boolean;

  clients: Client[];
  clientsChecked: Client[];
  fournisseurs: Fournisseur[];
  fournisseursChecked: Fournisseur[];

  toolbarSubscription: Subscription;
  clientSubscription: Subscription;
  fournisseurSubscription: Subscription;

  searchBarValue: string = '';

  numbersCount: number[]=[];//Les différentes valeurs à assigner au ngFor pour l'affichage de la liste
  currentPosition: number;
  maxNumberToDisplay: number;
  numberOfPages: number;
  allContactsCheckedDisplayed: boolean;

  dateNow: Date;

  constructor(private cdRef: ChangeDetectorRef, private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.maxNumberToDisplay = 5; // première valeur du steps dans contacts-items-number.component.html

    if (this.isClients){
      this.clientSubscription = this.contactsService.clientSubject.subscribe((clients: Client[]) => {
        this.clients = clients;
      });
      this.contactsService.emitClients();
      this.clientsChecked = new Array();

      if (this.clients.length !== 0 ) {
        this.setNumbersCount(this.maxNumberToDisplay);
        this.currentPosition = this.maxNumberToDisplay;
      }else{
        this.numbersCount = new Array();
        this.currentPosition = 0;
      }

    }else{
      this.fournisseurSubscription = this.contactsService.fournisseurSubject.subscribe(
        (fournisseurs: Fournisseur[]) => {this.fournisseurs = fournisseurs; }
      );
      this.contactsService.emitFournisseurs();
      this.fournisseursChecked = new Array();

      if (this.fournisseurs.length !== 0 ) {
        this.setNumbersCount(this.maxNumberToDisplay);
        this.currentPosition = this.maxNumberToDisplay;
      }else{
        this.numbersCount = new Array();
        this.currentPosition = 0;
      }
    }
  }

  ngOnChanges()
  {
    this.toolbarSubscription = this.contactsService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === true) {
        this.onExportContactsAsXLSX(res.value);
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
    if (this.isClients){
      this.contactsService.deleteClient(value);
      if (this.clients.length - this.currentPosition) {this.numbersCount.pop(); }// Si dernière page
    }else{
      this.contactsService.deleteFournisseur(value);
      if (this.fournisseurs.length - this.currentPosition) {this.numbersCount.pop(); }// Si dernière page
    }
    this.allContactsCheckedDisplayed = false;
    console.log('numbers count: ' + this.numbersCount.length);
  }

  onMultipleDelete()
  {
    if (this.isClients){
      for (let i = 0; i < this.clientsChecked.length; i++) {
        this.contactsService.deleteClient(this.clientsChecked[i].REFERENCE);
        if (this.clients.length - this.currentPosition) {this.numbersCount.pop(); }// Si dernière page
      }
    }else{
      for (let i = 0; i < this.fournisseursChecked.length; i++) {
        this.contactsService.deleteFournisseur(this.fournisseursChecked[i].REFERENCE);
        if (this.fournisseurs.length - this.currentPosition) {this.numbersCount.pop(); }// Si dernière page
      }
    }
    this.allContactsCheckedDisplayed = false;
  }

  onExportContactsAsXLSX(value: boolean)
  {
    const data = Array();


    if (this.isClients && this.clientsChecked.length !== 0){
      this.contactsService.exportAsExcelFile(this.clientsChecked , 'Clients', this.isClients);
    }else{
      if (!this.isClients && this.fournisseursChecked.length !== 0){
        this.contactsService.exportAsExcelFile(this.fournisseursChecked , 'Fournisseurs', this.isClients);
      }
    }

  }

  onCheckedSingle(reference: string){
    if (this.isClients){
      this.clientsChecked.push(this.contactsService.getClientByRef(reference));
    }else{
      this.fournisseursChecked.push(this.contactsService.getFournisseurByRef(reference));
    }
  }

  onUnCheckedSingle(reference: string){
    //this.allContactsCheckedDisplayed = false;

    if (this.isClients) {
      for (let i = 0; i < this.clientsChecked.length; i++) {
        if (this.clientsChecked[i].REFERENCE.includes(reference) && reference.includes(this.clientsChecked[i].REFERENCE)){
          this.clientsChecked.splice(i, 1);
          break;
         }
      }
    }else{
      for (let i = 0; i < this.fournisseursChecked.length; i++) {
        if (this.fournisseursChecked[i].REFERENCE.includes(reference) && reference.includes(this.fournisseursChecked[i].REFERENCE)){
          this.fournisseursChecked.splice(i, 1);
          break;
         }
      }
    }
  }

  onSelectAllDisplayed(value: boolean){
    this.allContactsCheckedDisplayed = value;

    if(this.allContactsCheckedDisplayed){
      if (this.isClients){
        this.numbersCount.forEach((item) => {this.clientsChecked.push(this.clients[item]); });
      }else{
        this.numbersCount.forEach((item) => {this.fournisseursChecked.push(this.fournisseurs[item]); });
      }
    }else{
      this.isClients ? this.clientsChecked = Array(0) : this.fournisseursChecked = Array(0);
    }
  }

  onPreviousPageClicked(value: boolean)
  {
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

    if (this.isClients){
       pagesLeft = this.clients.length - this.currentPosition;
    }else{
       pagesLeft = this.fournisseurs.length - this.currentPosition;
    }

    if (pagesLeft > 0)
    {
      if (pagesLeft <= this.maxNumberToDisplay){
        this.forwardFill(pagesLeft);
      }else{
        this.forwardFill(this.maxNumberToDisplay);
      }
      this.allContactsCheckedDisplayed = false;
    }
  }

  onNextPageClicked(value: boolean)
  {
    let pagesLeft: number;

    if (this.isClients){
       pagesLeft = this.clients.length - this.currentPosition;
    }else{
       pagesLeft = this.fournisseurs.length - this.currentPosition;
    }
    if (pagesLeft > 0){
      this.onPageNumberClicked((this.currentPosition / this.maxNumberToDisplay) + 1);
    }
  }

  onMaxNumberChanged(value: any)
  {
    this.maxNumberToDisplay = parseInt(value);
    this.setNumbersCount(this.maxNumberToDisplay);
    if (this.allContactsCheckedDisplayed) {this.onSelectAllDisplayed(true); }
  }

  onWritingIntoSearchbar(value: string) {
    this.searchBarValue = value;
    this.currentPosition = this.maxNumberToDisplay;
    this.numbersCount = Array(this.maxNumberToDisplay).fill(this.maxNumberToDisplay).map( (x , i) => i);

    if (this.isClients) {
      this.clients = this.contactsService.filterClientsByName(value);

      if (this.numbersCount.length > this.clients.length) { this.numbersCount.length = this.clients.length; }

    }else{
      this.fournisseurs = this.contactsService.filterFournisseursByName(value);

      if (this.numbersCount.length > this.fournisseurs.length) { this.numbersCount.length = this.fournisseurs.length; }
    }
  }

  setNumbersCount(value: number)
  {
    if (value > this.numbersCount.length)
    {
      for (let index = this.numbersCount.length, j = this.numbersCount[this.numbersCount.length - 1] + 1; index < value; index++, j++)
      {
        if ( this.isClients && this.clients.length - 1 > this.numbersCount[this.numbersCount.length - 1] ){
          this.numbersCount.push(j);
          this.currentPosition += 1;
        }

        if ( !this.isClients && this.fournisseurs.length - 1 > this.numbersCount[this.numbersCount.length - 1] ){
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
    if (this.isClients){
      this.numberOfPages = Math.floor(this.clients.length / this.maxNumberToDisplay);

      if ((this.clients.length % this.maxNumberToDisplay) !== 0) {this.numberOfPages++; }

    }else{
      this.numberOfPages = Math.floor(this.fournisseurs.length / this.maxNumberToDisplay);

      if ((this.fournisseurs.length % this.maxNumberToDisplay) !== 0) {this.numberOfPages++; }
    }
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
    this.isClients ? this.clientSubscription.unsubscribe() : this.fournisseurSubscription.unsubscribe();
  }
}
