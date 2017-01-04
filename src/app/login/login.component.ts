import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Headers} from '@angular/http';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})


export class LoginComponent {
  private headers: Headers;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  onSubmit(email, password) {
    this.authenticationService.login(email, password).subscribe((result) => {
      if (result) {
        this.router.navigate(['landing']);
      }
    });
  }
}
