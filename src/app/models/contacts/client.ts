import { PersonneDeContact } from './personne-de-contact';
export class Client {
  REFERENCE: any;
  NOM: any;
  CP: any;
  VILLE: any;
  TVA: any;
  NOMLigne2?: any;
  email?: any;
  adresse?: any;
  adresseLigne2?: any;
  pays?: any;
  langue?: any;
  tauxTvaDefaut?: any;
  delaiPaiementJour?: any;
  delaiPaiementType?: any;
  cycleRappel?: any;
  referenceClient?: any;
  numeroClient?: any;
  personnesDeContact?: PersonneDeContact[];
}
