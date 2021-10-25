import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { Client } from '../../models/contacts/client';
import { PersonneDeContact } from '../../models/contacts/personne-de-contact';


interface Ville {
  value: string;
  viewValue: string;
}

interface Langue {
  value: string;
  viewValue: string;
}

interface TVA {
  value: number;
  viewValue: string;
}

interface JoursPaiment {
  value: string;
  viewValue: string;
}

/** Error when invalid control is dirty, touched, or submitted. */

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-contacts-add-client',
  templateUrl: './contacts-add-client.component.html',
  styleUrls: ['./contacts-add-client.component.scss']
})
export class ContactsAddClientComponent implements OnInit {

  cycleRappel = false;
  maxContacts = 4;
  clientModif: Client;
  modification: boolean;
  title = 'Créer Client';
  submitText = 'CREER CLIENT';

  referenceFormControl = new FormControl('', [

  ]);
  nomFormControl = new FormControl('', [
    Validators.required,

  ]);
  nomLigne2FormControl = new FormControl('', [

  ]);
  emailFormControl = new FormControl('', [
    Validators.required
    , Validators.email

  ]);
  adresseFormControl = new FormControl('', [
    Validators.required,

  ]);
  adresseLigne2FormControl = new FormControl('', [

  ]);
  codePostalFormControl = new FormControl('', [
    Validators.required,

  ]);
  villeFormControl = new FormControl('', [
    Validators.required,

  ]);
  paysFormControl = new FormControl('', [
    Validators.required,

  ]);
  langueFormControl = new FormControl('', [
    Validators.required,
  ]);
  numeroTVAFormControl = new FormControl('', [

  ]);
  TVADefautFormControl = new FormControl('', [

  ]);
  paiementJoursFormControl = new FormControl('', [

  ]);
  paiementTypeFormControl = new FormControl('', [

  ]);
  cycleRappelFormControl = new FormControl('', [

  ]);
  referenceClientFormControl = new FormControl('', [

  ]);
  numeroClientFormControl = new FormControl('', [

  ]);
  telephoneFormControl = new FormControl('', [
    Validators.required,

  ]);
  civiliteFormControl = new FormControl('', [

  ]);
  nomFonctionFormControl = new FormControl('', [

  ]);
  emailPersContactFormControl = new FormControl('', [
    Validators.email
  ]);
  numeroTelephoneFormControl = new FormControl('', [

  ]);
  numeroTelephone2FormControl = new FormControl('', [
    Validators.required,

  ]);

  societeFormControl = new FormControl('', [
    Validators.required,

  ]);

  personnesDeContact: PersonneDeContact[];

  matcher = new MyErrorStateMatcher();
  date_chart: any;

  villes: Ville[] = [
    {value: 'Rabat', viewValue: 'Rabat'},
    {value: 'Casablanca', viewValue: 'Casablanca'},
    {value: 'Tanger', viewValue: 'Tanger'}
  ];

  langues: Langue[] = [
    {value: 'Francais', viewValue: 'Français'},
    {value: 'English', viewValue: 'English'},
    {value: 'Arabe', viewValue: 'Arabe'},
    {value: 'Espagnol', viewValue: 'Español'}
  ];

  TVAs_Par_Defaut: TVA[] = [
    {value: 0, viewValue: '0'},
    {value: 10, viewValue: '10'},
    {value: 20, viewValue: '20'},
    {value: 75, viewValue: '75'}
  ];

  categories: JoursPaiment[] = [
    {value: 'jours fin de mois', viewValue: 'jours fin de mois'},
    {value: 'jours debut de mois', viewValue: 'jours début de mois'}
  ];

  clientForm: FormGroup;
  personContactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.personnesDeContact = [];
    this.modification = false;
    this.clientModif = new Client();

    if (this.route.snapshot.paramMap.get('ref') !== null)
    {
      this.clientModif = this.contactsService.getClientByRef(this.route.snapshot.paramMap.get('ref'));
      this.modification = true;
      this.title = 'Modifier client';
      this.submitText = 'MODIFIER';

      for (let i = 0; i < this.clientModif.personnesDeContact.length; i++) {
        this.personnesDeContact.push(this.clientModif.personnesDeContact[i]);
      }
    }
  }

  initForm(){
    this.clientForm = this.formBuilder.group({
      REFERENCE: '',
      NOM: '',
      CP: '',
      VILLE: '',
      TVA: '',
      NOMLigne2: '',
      email: '',
      adresse: '',
      adresseLigne2: '',
      pays: '',
      langue: '',
      numeroTVA: '',
      tauxTvaDefau: '',
      delaiPaiementJour: 10,
      delaiPaiementTour: 'jours fin de mois',
      cycleRappel: false,
      referenceClient: '',
      numeroClient: '',
    });

    this.personContactForm = this.formBuilder.group({
      civilite: '',
      email: '',
      nomFonction: '',
      telephone: '',
      telephone2: '',
    });

  }

  onSubmitForm()
  {
    if (this.clientForm.valid)
    {
      const newClient = new Client();
      newClient.REFERENCE = this.referenceFormControl.value;
      newClient.NOM = this.nomFormControl.value;
      newClient.CP = this.codePostalFormControl.value;
      newClient.VILLE = this.villeFormControl.value;
      newClient.TVA = this.numeroTVAFormControl.value;
      newClient.NOMLigne2 = this.nomLigne2FormControl.value;
      newClient.email = this.emailFormControl.value;
      newClient.adresse = this.adresseFormControl.value;
      newClient.adresseLigne2 = this.adresseLigne2FormControl.value;
      newClient.pays = this.paysFormControl.value;
      newClient.langue = this.langueFormControl.value;
      newClient.tauxTvaDefaut = this.TVADefautFormControl.value;
      newClient.delaiPaiementJour = this.paiementJoursFormControl.value;
      newClient.delaiPaiementType = this.paiementTypeFormControl.value;
      newClient.cycleRappel = this.cycleRappelFormControl.value;
      newClient.referenceClient = this.referenceClientFormControl.value;
      newClient.numeroClient = this.numeroClientFormControl.value;
      newClient.personnesDeContact = this.personnesDeContact;

      console.log("newClient :"+ JSON.stringify(newClient));

      this.modification ? this.contactsService.modifyClient(newClient) : this.contactsService.addClient(newClient);
      this.router.navigate(['contacts/clients']);
    }
  }

  onAddPersonneDeContact(){
    const persContact = new PersonneDeContact();

    persContact.civilite = this.civiliteFormControl.value;
    persContact.email = this.emailPersContactFormControl.value;
    persContact.nomFonction = this.nomFonctionFormControl.value;
    persContact.telephone = this.numeroTelephoneFormControl.value;
    persContact.telephone2 = this.numeroTelephone2FormControl.value;

    console.log(JSON.stringify(persContact));
    console.log(this.personnesDeContact.length);
    this.personnesDeContact.push(persContact);
    this.personContactForm.reset();
  }

  onDeletePersonneDeContact(id: number){
    for (let i = 0; i < this.personnesDeContact.length; i++) {
      if (i === id){
        this.personnesDeContact.splice(i, 1);
      }
    }
  }
}
