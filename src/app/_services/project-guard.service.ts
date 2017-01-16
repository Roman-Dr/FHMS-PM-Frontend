import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {ProjectService} from "./project.service";

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private project: ProjectService, private router: Router) {}

  canActivate() {
    if (!this.project.isProjectSelected()) {
      console.log(this.project.isProjectSelected());
      this.router.navigate(['/projects']);
      return false;
    }
    return true;
  }
}
