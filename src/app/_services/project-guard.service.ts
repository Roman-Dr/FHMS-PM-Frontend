import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ProjectService} from "./project.service";

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private projectService: ProjectService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkProject(url);
  }
  checkProject(url){
    if (this.projectService.projectSelected) { console.log(this.projectService.projectSelected); return true; }

    console.log(this.projectService.projectSelected);
    // Store the attempted URL for redirecting
    this.projectService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/projects']);
    return false;
  }
}
