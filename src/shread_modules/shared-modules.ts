import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule  } from '@angular/material/datepicker';
import {  MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

@NgModule({

  exports: [
            FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule, MatDatepickerModule,
            MatNativeDateModule,
            BrowserAnimationsModule,
            MatIconModule,
            MatCheckboxModule,
            MatButtonModule,
            MatMenuModule,
            MatDividerModule,
            MatTableModule,
            MatSelectModule
          ]
})

export class SharedModules {
}
