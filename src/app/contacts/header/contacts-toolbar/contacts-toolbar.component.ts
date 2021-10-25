import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../../../services/contacts.service';
import * as XLSX from 'xlsx';
import { Client } from '../../../models/contacts/client';
import { Fournisseur } from '../../../models/contacts/fournisseur';
import { PersonneDeContact } from '../../../models/contacts/personne-de-contact';

@Component({
  selector: 'app-contacts-toolbar',
  templateUrl: './contacts-toolbar.component.html',
  styleUrls: ['./contacts-toolbar.component.scss']
})
export class ContactsToolbarComponent implements OnInit {

  @Input() isClients: boolean;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  data: any[];
  maxPersContacts = 4;

  constructor(private router: Router, private contactsService: ContactsService) { }

  ngOnInit(): void {

  }

  /*onGoTo(path){
    this.router.navigate(path);
    }

  onDisplayClient(){
    this.router.navigate(['/contacts/clients']);
  }

  onDisplayFournisseurs(){
    this.router.navigate(['/contacts/fournisseurs']);
  }*/
  onExportContactsAsXLSX(){
    this.clicked.emit(true);
  }

  importClients(ws: any)
  {
    const clients: Client[] = [];

    for (let i = 2; i < ws.length; i++)
    {
      let cellKey = 0;
      const newClient = new Client();
      const wsl = ws[i];

      newClient.REFERENCE = wsl[cellKey++];
      newClient.NOM = wsl[cellKey++];
      newClient.CP = wsl[cellKey++];
      newClient.VILLE = wsl[cellKey++];
      newClient.TVA = wsl[cellKey++];
      newClient.NOMLigne2 = wsl[cellKey++];
      newClient.email = wsl[cellKey++];
      newClient.adresse = wsl[cellKey++];
      newClient.adresseLigne2 = wsl[cellKey++];
      newClient.pays = wsl[cellKey++];
      newClient.langue = wsl[cellKey++];
      newClient.tauxTvaDefaut = wsl[cellKey++];
      newClient.delaiPaiementJour = wsl[cellKey++];
      newClient.delaiPaiementType = wsl[cellKey++];
      newClient.cycleRappel = wsl[cellKey++];
      newClient.referenceClient = wsl[cellKey++];
      newClient.numeroClient = wsl[cellKey++];
      newClient.personnesDeContact = [];

      for (let j = 0; j < this.maxPersContacts ; j++)
      {
        const contact = new PersonneDeContact();
        contact.nomFonction = wsl[cellKey++];
        contact.email = wsl[cellKey++];
        contact.telephone = wsl[cellKey++];
        newClient.personnesDeContact.push(contact);
      }

      clients.push(newClient);
    }
    this.contactsService.importExcelFile(clients, this.isClients);
  }

  importFournisseurs(ws: any)
  {
    const fournisseurs: Fournisseur[] = [];

    for (let i = 2; i < ws.length; i++)
    {
      let cellKey = 0;
      const newFournisseur = new Fournisseur();
      const wsl = ws[i];

      newFournisseur.REFERENCE = wsl[cellKey++];
      newFournisseur.CAT = wsl[cellKey++];
      newFournisseur.NOM = wsl[cellKey++];
      newFournisseur.CP = wsl[cellKey++];
      newFournisseur.VILLE = wsl[cellKey++];
      newFournisseur.TVA = wsl[cellKey++];
      newFournisseur.email = wsl[cellKey++];
      newFournisseur.adresse = wsl[cellKey++];
      newFournisseur.adresseLigne2 = wsl[cellKey++];
      newFournisseur.pays = wsl[cellKey++];
      newFournisseur.commentaire = wsl[cellKey++];
      newFournisseur.IBAN = wsl[cellKey++];
      newFournisseur.BIC = wsl[cellKey++];
      newFournisseur.referenceComptable = wsl[cellKey++];
      newFournisseur.referenceComptableNumerique = wsl[cellKey++];
      newFournisseur.personnesDeContact = [];

      for (let j = 0; j < this.maxPersContacts ; j++)
      {
        const contact = new PersonneDeContact();
        contact.nomFonction = wsl[cellKey++];
        contact.email = wsl[cellKey++];
        contact.telephone = wsl[cellKey++];
        newFournisseur.personnesDeContact.push(contact);
      }
      fournisseurs.push(newFournisseur);
    }
    this.contactsService.importExcelFile(fournisseurs, this.isClients);
  }

  onFileChange(evt: any)
  {
    const target: DataTransfer =  <DataTransfer>(evt.target);

    if (target.files.length !== 1) {
      alert("Veuillez selectionner un seul fichier !");
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      this.isClients ? this.importClients(this.data) : this.importFournisseurs(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  onUpload(){
    event.preventDefault();
    let element: HTMLElement = document.getElementById('elhoo_import_input') as HTMLElement;
    element.click();
  }
}
