import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Repo } from 'src/app/models/repos/repo';
import { RepoTypes } from 'src/app/models/repos/repo-types.enum';
import { ReposService } from 'src/app/services/repos.service';

interface repoType{
  value: string;
  viewValue: string;
}

interface project{
  value: string;
  viewValue: string;
}

interface pipeline{
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
  selector: 'app-repo-form',
  templateUrl: './repo-form.component.html',
  styleUrls: ['./repo-form.component.css']
})
export class RepoFormComponent implements OnInit {

  title="Gestion de dépôts";
  subtitle="Création d'un dépôt";
  submitText = 'CREER DEPOT';

  nameFormControl = new FormControl('', [
    Validators.required

  ]);
  typeFormControl = new FormControl('', [
    Validators.required

  ]);

  projectNameFormControl = new FormControl('', [

  ]);

  pipelineNameFormControl = new FormControl('', [

  ]);

  types: repoType[] = [
    {value: "LARAVEL", viewValue: "LARAVEL"},
    {value: "ANGULAR", viewValue: "ANGULAR"},
    {value: "IONIC", viewValue: "IONIC"},
    {value: "PROCESSWIRE", viewValue: "PROCESSWIRE"},
    {value: "SPRINGBOOT", viewValue: "SPRINGBOOT"},
    {value: "WORDPRESS", viewValue: "WORDPRESS"},
  ];

  projects: project[]=[{value: "LRV1",viewValue:"LRV1-test"}];
  pipelines: pipeline[]=[{value: "PIP1",viewValue:"PIP1-test"}];

  matcher = new MyErrorStateMatcher();
  repoForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private reposService: ReposService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.repoForm = this.formBuilder.group({
      name: "",
      link: "",
      repoType: {label:"LARAVEL"},
      pipelineID: ""
    });
  }

  onSubmitForm(){
    if(this.repoForm.valid){
      const newRepo = new Repo();
      newRepo.name = this.nameFormControl.value;
      newRepo.repoType = {label:this.typeFormControl.value};
      //newRepo.repoType.label = this.typeFormControl.value;
      newRepo.projectID = this.projectNameFormControl.value;
      newRepo.pipelineID = this.pipelineNameFormControl.value;

      console.log("newRepo :"+ JSON.stringify(newRepo));
      this.reposService.addRepo(newRepo)//.subscribe(data=> {console.log(data)});
      //this.reposService.getAllRepos().subscribe(data=> {console.log(data)})
      //console.log("all :"+ JSON.stringify(this.reposService.getAllRepos()));
      this.router.navigate(['repositories']);
    }
  }

}
