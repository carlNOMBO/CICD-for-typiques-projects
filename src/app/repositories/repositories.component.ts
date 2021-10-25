import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReposService } from '../services/repos.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  title = "Gestion de dépôts";
  constructor(private route: ActivatedRoute,private router: Router,
              private reposService: ReposService) { }

  ngOnInit(): void {
  }

  onToolbarClicked(value: boolean){
    this.reposService.notifyOther({option: value});
  }

}
