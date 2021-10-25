import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompteComponent } from './compte/compte.component';
import { ContactsDisplayClientsComponent } from './contacts/contacts-display-clients/contacts-display-clients.component';
import { ContactsDisplayFournisseursComponent } from './contacts/contacts-display-fournisseurs/contacts-display-fournisseurs.component';
import { ContactsAddFournisseurComponent } from './contacts/contacts-add-fournisseur/contacts-add-fournisseur.component';
import { ContactsAddClientComponent } from './contacts/contacts-add-client/contacts-add-client.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { RepoFormComponent } from './repositories/repo-form/repo-form.component';


const routes: Routes = [
  { path: 'repositories', component: RepositoriesComponent },
  { path: 'repositories/create', component: RepoFormComponent },
  { path: 'dashboard', component: RepositoriesComponent },
  { path: 'contacts', component: ContactsDisplayClientsComponent},
  { path: 'contacts/clients', component: ContactsDisplayClientsComponent},
  { path: 'contacts/fournisseurs', component: ContactsDisplayFournisseursComponent},
  { path: 'contacts/ajout/client', component: ContactsAddClientComponent},
  { path: 'contacts/ajout/client/:ref', component: ContactsAddClientComponent},
  { path: 'contacts/ajout/fournisseur', component: ContactsAddFournisseurComponent},
  { path: 'contacts/ajout/fournisseur/:ref', component: ContactsAddFournisseurComponent},
  { path: 'compte', component: CompteComponent },
  { path: '**', redirectTo: 'repositories' , pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
