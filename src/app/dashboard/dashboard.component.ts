import { Component, OnInit } from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment} from 'moment';

const moment =   _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',

    dateA11yLabel: 'LL',

  },
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'], providers: [

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class DashboardComponent implements OnInit {

  typeDgr: any  ;
  e: any  ;
  date_chart = new FormControl(moment());
  date_statistique = new FormControl(moment());
  Ventes: any = 0;
  Achats: any = 0;
  Marge1: any = 0;
  Marge2: any = 0;

  year: any = '2020';

  VentesElement: any = (0).toFixed(2);
  AchatsElement: any = (0).toFixed(2);
  Marge1Element: any = (0).toFixed(2);
  Marge2Element: any = (0).toFixed(2);



  constructor() {

  }






  ngOnInit(): void {
    var num = 4552;  // typeof num is "Number"


console.log(num.toFixed(2))

    this.getChart();
    this.TableauBordFilter();
  }


  async getChart(){

    // tslint:disable-next-line:prefer-const
    let ctx = document.getElementById('myChart');
    // tslint:disable-next-line:prefer-const
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Jan', 'Fev', 'Mar' , 'Apr', 'May', 'Jun', 'Jul' , 'Out' , 'Sep' , 'Oct' , 'Nov' , 'Dec'],
          datasets: [{
              label: 'Achat',
              fill: false,
              data: [60 , 150, 200 , 260, 278 , 280 , 500 , 200 , 366 , 390 , 420 , 550],
              backgroundColor: [
                'rgb(245, 89, 82 ,0)',


              ],
              borderColor: [
                'rgb(245, 89, 82 ,1)',


              ],
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: '5',
              pointBackgroundColor: 'rgb(245, 89, 82 ,1)',
              pointBorderColor: 'rgb(245, 89, 82 ,1)'
          },
          
          
          {
            label: 'Vente',
            fill: true,
            data: [120, 190, 230 , 160, 296 , 380 , 356 , 420 , 386 , 410 , 486 , 530],
            backgroundColor: [
                'rgb(210, 34, 84,0)',


            ],
            borderColor: [
                'rgb(210, 34, 84 ,1)',

            ],
            borderWidth: 1,
            pointStyle: 'circle',
            pointRadius: '5',
            pointBackgroundColor: 'rgb(210, 34, 84,1)',
            pointBorderColor: 'rgb(210, 34, 84 ,1)'
        }
        ]
      },
      options: {
        tooltips: {
          custom: function(tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;
          },
          callbacks: {
            title: function(tooltipItem, data) {
              return data['labels'][tooltipItem[0]['index']];
            },label: function(tooltipItem, data) {
              return data['datasets'][tooltipItem.datasetIndex]['label']+":" +data['datasets'][tooltipItem.datasetIndex]['data'][tooltipItem['index']]+'€';
            
            },
            
           
          },
          
          yAlign: 'bottom',
          backgroundColor: 'rgb(50, 61, 65)',
           
      },
        layout: {
          padding: {
              left: 10,
              right: 0,
              top: 0,
              bottom: 0
          },
    
      },
        legend: {
          display: true,
          position: 'left',
          align: 'start',

          labels: {
          
            usePointStyle: true,


          }
      },
          scales: {

            xAxes: [{
              ticks: {
                padding: 30
              },
              gridLines: {
                display: false,
                drawOnChartArea: false,
                drawTicks: false,

              }
            }],
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      display: false,


                  },
                  gridLines: {
                    display: false,
                    drawOnChartArea: false,
                    drawTicks: false
                  }
              }]
          }
      }
  });



   }


   chosenYearHandler_chart(normalizedYear_chart: Moment , datepicker_chart: MatDatepicker<Moment>) {
    const ctrlValue = this.date_chart.value;
    ctrlValue.year(normalizedYear_chart.year());
    this.date_chart.setValue(ctrlValue);
    datepicker_chart.close();
  }



  async chosenYearHandler_statistique(normalizedYear_statistique: Moment , datepicker_statistique: MatDatepicker<Moment>) {



    this.VentesElement = (0).toFixed(2);
    this.AchatsElement = (0).toFixed(2);
    this.Marge1Element = (0).toFixed(2);
    this.Marge2Element = (0).toFixed(2);

    const ctrlValue1 = this.date_statistique.value;
    ctrlValue1.year(normalizedYear_statistique.year());
    this.date_statistique.setValue(ctrlValue1);
    console.log(this.date_statistique.setValue(ctrlValue1));
    this.year = ctrlValue1._d.toString().split(' ')[3];
    console.log(this.year);
    datepicker_statistique.close();

    const url = 'https://api.github.com/search/repositories?q=created:%3E2019-06-21&sort=stars&order=desc&page=';

    // tslint:disable-next-line:no-shadowed-variable
    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();
      console.log(json);

      // tslint:disable-next-line:only-arrow-functions
      this.TableauBordFilter = await json.items.filter(function(TableauBordFilterelement) {

        if (TableauBordFilterelement.created_at.split('-')[0] === this.year) {

         return TableauBordFilterelement.created_at.split('-')[0].includes(this.year);
        }

      }.bind(this));

      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < this.TableauBordFilter.length; index++) {
       const element = this.TableauBordFilter[index];

       this.Ventes += element.forks;
       this.Achats += element.watchers;
       this.Marge1 += element.open_issues;
       this.Marge2 += element.open_issues_count;

       this.VentesElement = this.Ventes.toFixed(2);
       this.AchatsElement = this.Achats.toFixed(2);
       this.Marge1Element = this.Marge1.toFixed(2);
       this.Marge2Element = this.Marge2.toFixed(2);

     }

      } else {
        // tslint:disable-next-line:quotemark
        alert("HTTP-Error: " + response.status);


    }



  }


  async  TableauBordFilter(){
    const url = 'https://api.github.com/search/repositories?q=created:%3E2019-06-21&sort=stars&order=desc&page=';

    // tslint:disable-next-line:no-shadowed-variable
    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();
      console.log(json);

      // tslint:disable-next-line:only-arrow-functions
      this.TableauBordFilter = await json.items.filter(function(TableauBordFilterelement) {

        if (TableauBordFilterelement.created_at.split('-')[0] === this.year) {

         return TableauBordFilterelement.created_at.split('-')[0].includes(this.year);
        }

      }.bind(this));





      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < this.TableauBordFilter.length; index++) {
       const element = this.TableauBordFilter[index];

       this.Ventes += element.forks;
       this.Achats += element.watchers;
       this.Marge1 += element.open_issues;
       this.Marge2 += element.open_issues_count;

       this.VentesElement = this.Ventes.toFixed(2);
       this.AchatsElement = this.Achats.toFixed(2);
       this.Marge1Element = this.Marge1.toFixed(2);
       this.Marge2Element = this.Marge2.toFixed(2);


     }

      console.log(this.Ventes);
      } else {
        // tslint:disable-next-line:quotemark
        alert("HTTP-Error: " + response.status);


    }

  }




}
