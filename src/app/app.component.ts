import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./_services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]

})
export class AppComponent {

  constructor(private authenticationService: AuthenticationService) {
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(
        success => {
        });

  }
}
