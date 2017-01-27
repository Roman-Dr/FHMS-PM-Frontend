import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ProjectService} from "./project.service";
import {Observable} from "rxjs";

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private projectService: ProjectService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkProject(url);
  }
  checkProject(url){
    if (sessionStorage.getItem('project_id')) { return true; }
    // Store the attempted URL for redirecting
    this.projectService.redirectUrl = url;


    this.router.navigate(['/projects']);
    return false;
  }

}
