import {Component} from '@angular/core';
import {Router} from "@angular/router";

import {ProjectService, AuthenticationService, AuthGuard} from "./_services/index";
import {Project} from "./_models/index";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService, AuthGuard]

})
export class AppComponent {

  projectName: string = sessionStorage.getItem('project_name');

  currentProject: Project;

  constructor(private authenticationService: AuthenticationService,
              private projectService: ProjectService,
              private router: Router,
              private authGuard: AuthGuard) {
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
}
