import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Headers} from '@angular/http';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  private headers: Headers;

  constructor(private userService: UserService, private router: Router) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  onSubmit(email, password) {
    this.userService.login(email, password).subscribe((result) => {
      if (result) {
        this.router.navigate(['']);
      }
    });
  }
}
