import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { DashbordMenuComponent } from './dashbord-menu/dashbord-menu.component';


import {SharedModules} from '../shread_modules/shared-modules';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsTitleComponent } from './contacts/header/contacts-title/contacts-title.component';
import { ContactsToolbarComponent } from './contacts/header/contacts-toolbar/contacts-toolbar.component';
import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { ContactsItemsNumberComponent } from './contacts/actions/contacts-items-number/contacts-items-number.component';
import { ContactsQuickActionsComponent } from './contacts/actions/contacts-quick-actions/contacts-quick-actions.component';
import { ContactsSearchbarComponent } from './contacts/actions/contacts-searchbar/contacts-searchbar.component';
import { SingleContactComponent } from './contacts/contacts-list/single-contact/single-contact.component'
import { CompteComponent } from './compte/compte.component';
import { ContactsAddClientComponent } from './contacts/contacts-add-client/contacts-add-client.component';
import { ContactsAddFournisseurComponent } from './contacts/contacts-add-fournisseur/contacts-add-fournisseur.component';
import { ContactsDisplayClientsComponent } from './contacts/contacts-display-clients/contacts-display-clients.component';
import { ContactsDisplayFournisseursComponent } from './contacts/contacts-display-fournisseurs/contacts-display-fournisseurs.component'
import { ContactsService } from './services/contacts.service';
import { PaginatorComponent } from './contacts/contacts-list/paginator/paginator.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { RepoFormComponent } from './repositories/repo-form/repo-form.component';
import { RepoDetailsComponent } from './repositories/repo-details/repo-details.component';
import { RepoItemComponent } from './repositories/repo-item/repo-item.component';
import { ReposListComponent } from './repositories/repos-list/repos-list.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    DashbordMenuComponent,
    ContactsComponent,
    ContactsTitleComponent,
    ContactsToolbarComponent,
    ContactsListComponent,
    ContactsItemsNumberComponent,
    ContactsQuickActionsComponent,
    ContactsSearchbarComponent,
    SingleContactComponent,
    CompteComponent,
    ContactsAddClientComponent,
    ContactsAddFournisseurComponent,
    ContactsDisplayClientsComponent,
    ContactsDisplayFournisseursComponent,
    PaginatorComponent,
    RepositoriesComponent,
    RepoFormComponent,
    RepoDetailsComponent,
    RepoItemComponent,
    ReposListComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,

    SharedModules,
    HttpClientModule

  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
