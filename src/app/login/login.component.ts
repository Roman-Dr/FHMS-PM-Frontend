import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  private headers: Headers;

  constructor(public router: Router, public http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  private _apiUrl = 'http://10.60.67.20:3000/api/users/';

  login(event, username, password) {
    event.preventDefault();
    let body = JSON.stringify({username, password});
    this.http.post(this._apiUrl, body, { headers: this.headers})
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          this.router.navigate(['home']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['register']);
  }
}
