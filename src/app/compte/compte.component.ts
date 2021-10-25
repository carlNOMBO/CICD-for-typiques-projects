import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';


interface Food {
  value: string;
  viewValue: string;
}

interface Car {
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
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css'],
})
export class CompteComponent implements OnInit {

  checked = false;
 

  nomFormControl = new FormControl('', [
    Validators.required,

  ]);
  prenomFormControl = new FormControl('', [
    Validators.required,

  ]);
  langueFormControl = new FormControl('', [
    Validators.required,

  ]);
  usernameFormControl = new FormControl('', [
    Validators.required,

  ]);
  passwordConfirmFormControl = new FormControl('', [
    Validators.required,

  ]);
  passwordCorantFormControl = new FormControl('', [
    Validators.required,

  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,

  ]);
  emailFormControl = new FormControl('', [
    Validators.required
    , Validators.email

  ]);
  telephoneFormControl = new FormControl('', [
    Validators.required,

  ]);

  societeFormControl = new FormControl('', [
    Validators.required,

  ]);

  
  codePostalFormControl = new FormControl('', [
    Validators.required,

  ]);
  villeFormControl = new FormControl('', [
    Validators.required,

  ]);

  
  matcher = new MyErrorStateMatcher();
  date_chart: any;

  selectedValue: string;
  selectedValue1: string;
  selectedCar: string;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  cars: Car[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'}
  ];
  route_active: string;
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route_active =this.router.url
  }

  setrouter(e){
    this.route_active = e;
    console.log(this.route_active)
     
  }
  chosenYearHandler_chart(normalizedYear_chart: Moment , datepicker_chart: MatDatepicker<Moment>) {
    const ctrlValue = this.date_chart.value;
    ctrlValue.year(normalizedYear_chart.year());
    this.date_chart.setValue(ctrlValue);
    datepicker_chart.close();
  }


}
