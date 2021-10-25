import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Fournisseur } from '../../models/contacts/fournisseur';
import { ContactsService } from '../../services/contacts.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-contacts-add-fournisseur',
  templateUrl: './contacts-add-fournisseur.component.html',
  styleUrls: ['./contacts-add-fournisseur.component.scss']
})
export class ContactsAddFournisseurComponent implements OnInit {

  checked = false;
  maxContacts = 4;
  fournisseurForm: FormGroup;
  personContactForm: FormGroup;
  personnesDeContact: PersonneDeContact[];
  fournisseurModif: Fournisseur;
  modification: boolean;
  title = 'Créer Fournisseur';
  submitText = 'CREER FOURNISSEUR';

  categorieFormControl = new FormControl('', [

  ]);

  referenceFormControl = new FormControl('', [

  ]);
  nomFormControl = new FormControl('', [
    Validators.required,

  ]);
  emailFormControl = new FormControl('', [
    Validators.required
    , Validators.email

  ]);
  commentaireFormControl = new FormControl('', [
    Validators.required,

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
  numeroTVAFormControl = new FormControl('', [

  ]);
  IBANFormControl = new FormControl('', [

  ]);
  BICFormControl = new FormControl('', [

  ]);
  referenceComptableFormControl = new FormControl('', [

  ]);
  referenceComptableNumeriqueFormControl = new FormControl('', [

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
    {value: '1', viewValue: 'catégorie 1'},
    {value: '2', viewValue: 'catégorie 2'},
    {value: '3', viewValue: 'catégorie 3'},
    {value: '4', viewValue: 'catégorie 4'},
    {value: '5', viewValue: 'catégorie 5'},
  ];

  constructor(private formBuilder: FormBuilder,
              private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.personnesDeContact = [];
    this.initForm();
    this.modification = false;
    this.fournisseurModif = new Fournisseur();

    if (this.route.snapshot.paramMap.get('ref') !== null)
    {
      this.fournisseurModif = this.contactsService.getFournisseurByRef(this.route.snapshot.paramMap.get('ref'));
      this.modification = true;
      this.title = 'Modifier fournisseur';
      this.submitText = 'MODIFIER';

      for (let i = 0; i < this.fournisseurModif.personnesDeContact.length; i++) {
        this.personnesDeContact.push(this.fournisseurModif.personnesDeContact[i]);
      }
    }
  }

  initForm()
  {
    this.fournisseurForm = this.formBuilder.group({
      REFERENCE: '',
      NOM: '',
      CP: '',
      VILLE: '',
      TVA: '',
      CAT: '',
      email: '',
      adresse: '',
      adresseLigne2: '',
      pays: '',
      commentaire: '',
      IBAN: 'IBAN',
      BIC: 'BIC',
      referenceComptable: '',
      referenceComptableNumerique: 0
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
    const newFournisseur = new Fournisseur();
    newFournisseur.REFERENCE = this.referenceFormControl.value;
    newFournisseur.NOM = this.nomFormControl.value;
    newFournisseur.CP = this.codePostalFormControl.value;
    newFournisseur.VILLE = this.villeFormControl.value;
    newFournisseur.TVA = this.numeroTVAFormControl.value;
    newFournisseur.CAT = this.categorieFormControl.value;
    newFournisseur.email = this.emailFormControl.value;
    newFournisseur.adresse = this.adresseFormControl.value;
    newFournisseur.adresseLigne2 = this.adresseLigne2FormControl.value;
    newFournisseur.pays = this.paysFormControl.value;
    newFournisseur.commentaire = this.commentaireFormControl.value;
    newFournisseur.IBAN = this.IBANFormControl.value;
    newFournisseur.BIC = this.BICFormControl.value;
    newFournisseur.referenceComptable = this.referenceComptableFormControl.value;
    newFournisseur.referenceComptableNumerique = this.referenceComptableNumeriqueFormControl.value;
    newFournisseur.personnesDeContact = this.personnesDeContact;

    console.log("newFournisseur :"+ JSON.stringify(newFournisseur));

    this.contactsService.addFournisseur(newFournisseur);
    this.router.navigate(['contacts/fournisseurs']);
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
