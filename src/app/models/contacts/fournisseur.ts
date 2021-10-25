import { PersonneDeContact } from './personne-de-contact';
export class Fournisseur {
  REFERENCE: any;
  CAT: any;
  NOM: any;
  CP: any;
  VILLE: any;
  TVA: any;
  email?: any;
  adresse?: any;
  adresseLigne2?: any;
  pays?: any;
  commentaire?: any;
  IBAN?: any;
  BIC?: any;
  referenceComptable?: any;
  referenceComptableNumerique?: any;
  personnesDeContact?: PersonneDeContact[];
}
