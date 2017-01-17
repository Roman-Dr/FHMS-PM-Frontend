import {Component} from '@angular/core';
import {ProjectNavComponent} from './project-nav/project-nav.component'
import {AuthenticationService} from "./_services/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]

})
export class AppComponent {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }



  ngOnInit() {


  }



  logout() {
    this.authenticationService.logout()
      .subscribe(
        success => this.router.navigate(['/login'])
      )
  }


}
