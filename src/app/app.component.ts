import {Component} from '@angular/core';
import {AuthenticationService} from "./_services/authentication.service";
import {Router} from "@angular/router";
import {AuthGuard} from "./_services/auth-guard.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService, AuthGuard]

})
export class AppComponent {

  projectName: string = sessionStorage.getItem('project_name');

  constructor(private authenticationService: AuthenticationService, private router: Router, private authGuard: AuthGuard) {
  }



  ngOnInit() {

  }

  logout() {
    this.authenticationService.logout()
      .subscribe(
        success => this.router.navigate(['/login'])
      )
  }

  isLoggedIn(){
    return this.authGuard.isLoggedIn();
  }



}
