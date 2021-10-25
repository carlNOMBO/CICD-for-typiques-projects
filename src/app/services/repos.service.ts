import { Injectable } from '@angular/core';
import { Repo } from '../models/repos/repo';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/repos/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReposService {

  repos: Repo[];
  repoSubject = new Subject<Repo[]>();

  private notify = new Subject<any>();
  /**
   * Observable string streams
   */
  notifyObservable$ = this.notify.asObservable();

  constructor(private http: HttpClient) {
    this.loadAllRepos()
   }

  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

  emitRepos(){
    this.repoSubject.next(this.repos.slice())
  }

  addRepo(repo: Repo){
    console.log("Dans le service")
    let added = false;
    this.http.post<boolean>("http://localhost:8081/depots/create",repo).subscribe(data => {added = data});
    if(added) this.loadAllRepos();
    return added;
  }

  loadAllRepos(){
    this.http.get<Repo[]>("http://localhost:8081/depots").subscribe((data: Repo[]) => {
      this.repos = data;
      this.emitRepos();
      console.log(this.repos);
    });
  }

  getRepos(): Repo[]{
    return this.repos;
  }

  getContributors(reponame: string){
    return this.http.get<User[]>("http://localhost:8081/depots/contributeurs/{"+reponame+"}")
  }

  getRepo(reponame: string){
    return this.http.get<Repo>("http://localhost:8081/depots/{"+reponame+"}")
  }

  deleteRepot(reponame: string){

  }

  filterReposByName(name: string) {
    const repos: Repo[] = new Array();

    this.repos.forEach( (repo) => {
      if (repo.name.includes(name)) {
        repos.push(repo);
      }
    });
    return repos;
  }
}
