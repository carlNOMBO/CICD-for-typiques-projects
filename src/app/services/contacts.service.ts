import { Injectable } from '@angular/core';
import { Client } from '../models/contacts/client';
import { Fournisseur } from '../models/contacts/fournisseur';
import * as FileSaver from 'file-saver';
import { Subject } from 'rxjs';
import * as Excel from 'exceljs';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class ContactsService {

  clients: Client[]  = [
    {REFERENCE: 'ref1', NOM: 'nom1', CP: '100', VILLE: 'ville', TVA: '5500',
    personnesDeContact: [
      {civilite: '1', email: '1', nomFonction: '1', telephone: '1', telephone2: '1'},
      {civilite: '2', email: '2', nomFonction: '2', telephone: '2', telephone2: '2'},
      {civilite: '3', email: '3', nomFonction: '3', telephone: '3', telephone2: '3'}
  ]},
    {REFERENCE: 'ref2', NOM: 'nom2', CP: '100', VILLE: 'ville', TVA: '5500', personnesDeContact: []},
    {REFERENCE: 'ref3', NOM: 'nom3', CP: '100', VILLE: 'ville', TVA: '5500', personnesDeContact: []}
  ];

  fournisseurs: Fournisseur[] = [
    {REFERENCE: 'ref1', NOM: 'nom1', CP: '100', VILLE: 'ville', TVA: '5500', CAT: 'categories 1',
    personnesDeContact: [
      {civilite: '1', email: '1', nomFonction: '1', telephone: '1', telephone2: '1'},
      {civilite: '2', email: '2', nomFonction: '2', telephone: '2', telephone2: '2'},
      {civilite: '3', email: '3', nomFonction: '3', telephone: '3', telephone2: '3'}
  ]}
  ];

  clientSubject = new Subject<Client[]>();
  fournisseurSubject = new Subject<Fournisseur[]>();

  private notify = new Subject<any>();
  /**
   * Observable string streams
   */
  notifyObservable$ = this.notify.asObservable();



  constructor() { }

  emitClients(){
    this.clientSubject.next(this.clients.slice());
  }

  emitFournisseurs(){
    this.fournisseurSubject.next(this.fournisseurs.slice());
  }

  addClient(client: Client){
    this.clients.push(client);
    this.emitClients();
  }

  addFournisseur(fournisseur: Fournisseur){
    this.fournisseurs.push(fournisseur);
    this.emitFournisseurs();
  }

  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

  getClients(): Client[] {
    return this.clients;
  }

  getClientByRef(reference: string): Client{
    let client = new Client();
    this.clients.forEach( (item) => {
      if (item.REFERENCE.includes(reference) && reference.includes(item.REFERENCE)) {
        client = item;
      }
    });
    return client;
  }

  deleteClient(reference: string){
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].REFERENCE.includes(reference) && reference.includes(this.clients[i].REFERENCE)) {
        this.clients.splice(i, 1);
        this.emitClients();
        break;
      }
    }
  }

  getFournisseurs(): Fournisseur[] {
    return this.fournisseurs;
  }

  getFournisseurByRef(reference: string): Fournisseur{
    let fournisseur = new Fournisseur();
    this.fournisseurs.forEach( (item) => {
      if (item.REFERENCE.includes(reference) && reference.includes(item.REFERENCE)) {
        fournisseur = item;
      }
    });
    return fournisseur;
  }

  deleteFournisseur(reference: string){
    for (let i = 0; i < this.fournisseurs.length; i++) {
      if (this.fournisseurs[i].REFERENCE.includes(reference) && reference.includes(this.fournisseurs[i].REFERENCE)) {
        this.fournisseurs.splice(i, 1);
        this.emitFournisseurs();
        break;
      }
    }
  }

  modifyClient(client: Client) {
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].REFERENCE.includes(client.REFERENCE) && client.REFERENCE.includes(this.clients[i].REFERENCE))
      {
        this.clients[i] = client;
        this.emitClients();
      }
    }
  }

  modifyFournisseur(fournisseur: Fournisseur) {
    for (let i = 0; i < this.fournisseurs.length; i++) {
      if (this.fournisseurs[i].REFERENCE.includes(fournisseur.REFERENCE) && fournisseur.REFERENCE.includes(this.fournisseurs[i].REFERENCE))
      {
        this.fournisseurs[i] = fournisseur;
        this.emitFournisseurs();
      }
    }
  }

  filterClientsByName(name: string) {
    const clients: Client[] = new Array();

    this.clients.forEach( (client) => {
      if (client.NOM.includes(name)) {
        clients.push(client);
      }
    });
    return clients;
  }

  filterFournisseursByName(name: string) {
    const fournisseurs: Fournisseur[] = [];

    this.fournisseurs.forEach( (fournisseur) => {
      if (fournisseur.NOM.includes(name)) {
      fournisseurs.push(fournisseur);
      }
    });

    return fournisseurs;
 }

 exportAsExcelFile(data: any[], excelFileName: string, isClients: boolean): void
 {
   const wb = new Excel.Workbook();
   const ws = wb.addWorksheet(isClients ? 'clients' : 'fournisseurs');

   const headerKeys = isClients ? ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'P1', 'Q1', 'R1', 'U1', 'X1', 'AA1', 'R2', 'S2', 'T2', 'U2', 'V2', 'W2', 'X2', 'Y2', 'Z2', 'AA2', 'AB2', 'AC2']
                                : ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'R1', 'U1', 'X1', 'AA1', 'P2', 'Q2', 'R2', 'S2', 'T2', 'U2', 'V2', 'W2', 'X2', 'Y2', 'Z2', 'AA2'];
   const keysValues = isClients ? ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC']
                                : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA'];
   const headerValues = isClients ? ['REFERENCE', 'NOM', 'CP', 'VILLE', 'TVA', 'NOM ligne 2', 'email', 'adresse', 'adresse ligne 2', 'pays', 'langue', 'taux de TVA par defaut', 'delai de paiement jour', 'delai de paiement type', 'exclure du cycle de rappel', 'reference client', 'numero client', 'contact 1', 'contact 2', 'contact 3', 'contact 4', 'nom fonction', 'email', 'telephone', 'nom fonction', 'email', 'telephone', 'nom fonction', 'email', 'telephone', 'nom fonction', 'email', 'telephone']
                                  : ['REFERENCE', 'NOM', 'CP', 'VILLE', 'TVA', 'categorie', 'email', 'adresse', 'adresse ligne 2', 'pays', 'commentaire', 'IBAN', 'BIC', 'reference comptable', 'reference comptable numerique', 'contact 1', 'contact 2', 'contact 3', 'contact 4', 'nom fonction', 'email', 'telephone', 'nom fonction', 'email', 'telephone', 'nom fonction', 'email', 'telephone', 'nom fonction', 'email', 'telephone'];

   ws.getRow(0).alignment = { vertical: 'middle', horizontal: 'center', wrapText: false };
   ws.getRow(0).font = { size: 14, bold: true, underline: true };

   if (isClients){
    ws.mergeCells('R1:T1'); ws.mergeCells('U1:W1'); ws.mergeCells('X1:Z1'); ws.mergeCells('AA1:AC1');
   }else{
    ws.mergeCells('P1:R1'); ws.mergeCells('S1:U1'); ws.mergeCells('V1:X1'); ws.mergeCells('Y1:AA1');
   }

   for (let i = 0, j = 0; i < headerKeys.length; i++, j++){
     ws.getCell(headerKeys[i]).value = headerValues[i];
   }

   for (let i = 0, o = 3; i < data.length; i++, o++)
   {
     if (isClients) {
      let client = new Client();
      client = data[i];
      this.insertClientRow(client, o, keysValues, ws);
     }else{
      let fournisseur = new Fournisseur();
      fournisseur = data[i];
      this.insertFournisseurRow(fournisseur, o, keysValues, ws);
     }
   }
   wb.xlsx.writeBuffer().then((excelBuffer) => {this.saveAsExcelFile(excelBuffer, excelFileName); });
 }

 importExcelFile(data: any[], isClients: boolean)
 {
   if (isClients){
     this.clients = data as Client[];
     this.emitClients();
   }else{
     this.fournisseurs = data as Fournisseur[];
     this.emitFournisseurs();
   }
 }

 private saveAsExcelFile(buffer: any, fileName: string): void
 {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
 }

 private insertClientRow(client: Client, o: number, keysValues: string[], ws: Excel.Worksheet): any
 {
  let cellKey = 0;
  ws.getCell(keysValues[cellKey++] + o).value = client.REFERENCE;
  ws.getCell(keysValues[cellKey++] + o).value = client.NOM;
  ws.getCell(keysValues[cellKey++] + o).value = client.CP;
  ws.getCell(keysValues[cellKey++] + o).value = client.VILLE;
  ws.getCell(keysValues[cellKey++] + o).value = client.TVA ;
  ws.getCell(keysValues[cellKey++] + o).value = client.NOMLigne2 ;
  ws.getCell(keysValues[cellKey++] + o).value = client.email ;
  ws.getCell(keysValues[cellKey++] + o).value = client.adresse ;
  ws.getCell(keysValues[cellKey++] + o).value = client.adresseLigne2 ;
  ws.getCell(keysValues[cellKey++] + o).value = client.pays ;
  ws.getCell(keysValues[cellKey++] + o).value = client.langue ;
  ws.getCell(keysValues[cellKey++] + o).value = client.tauxTvaDefaut ;
  ws.getCell(keysValues[cellKey++] + o).value = client.delaiPaiementJour ;
  ws.getCell(keysValues[cellKey++] + o).value = client.delaiPaiementType ;
  ws.getCell(keysValues[cellKey++] + o).value = client.cycleRappel ;
  ws.getCell(keysValues[cellKey++] + o).value = client.referenceClient ;
  ws.getCell(keysValues[cellKey++] + o).value = client.numeroClient ;

  client.personnesDeContact.forEach((pers) => {
    ws.getCell(keysValues[cellKey++] + o).value = pers.nomFonction;
    ws.getCell(keysValues[cellKey++] + o).value = pers.email;
    ws.getCell(keysValues[cellKey++] + o).value = pers.telephone;
  });
 }

 private insertFournisseurRow(fournisseur: Fournisseur, o: number, keysValues: string[], ws: Excel.Worksheet): any
 {
  let cellKey = 0;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.REFERENCE;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.NOM;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.CP;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.VILLE;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.TVA ;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.CAT ;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.email ;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.adresse ;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.adresseLigne2 ;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.pays ;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.commentaire ;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.IBAN ;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.BIC ;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.referenceComptable ;
  ws.getCell(keysValues[cellKey++] + o).value = fournisseur.referenceComptableNumerique ;

  fournisseur.personnesDeContact.forEach((pers) => {
    ws.getCell(keysValues[cellKey++] + o).value = pers.nomFonction;
    ws.getCell(keysValues[cellKey++] + o).value = pers.email;
    ws.getCell(keysValues[cellKey++] + o).value = pers.telephone;
  });
 }
}
