import {Component} from '@angular/core';
import {Router} from "@angular/router";

import { AuthenticationService, AuthGuard, ProjectGuard} from "./_services/index";
import {Project} from "./_models/index";
import {ProjectService} from "./_services/project.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService, AuthGuard]

})
export class AppComponent {

  currentProject: Project;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private authGuard: AuthGuard,
              private projectService: ProjectService,
              private projectGuard: ProjectGuard) {
  }


  ngOnInit() {
    this.projectService.projectChosen
      .subscribe(project => {
        console.log('App: ' + JSON.stringify(project));
        this.currentProject = project;
      });
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(
        success => {
          this.currentProject = null;
          this.router.navigate(['/login'])
        }
      )
  }

  isLoggedIn(){
    return this.authGuard.isLoggedIn();
  }

  isProjectSelected(){
    return this.projectGuard.isProjectSelected();
  }
}
