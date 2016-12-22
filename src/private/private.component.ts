import {Component} from '@angular/core';
import {AuthenticationService} from '../app/_services/authentication.service'

@Component({
  selector: 'login-form',
  providers: [AuthenticationService],
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css'],
})

export class PrivateComponent {

  constructor(
    private _service:AuthenticationService){}

  ngOnInit(){
    this._service.checkCredentials();
  }

  logout() {
    this._service.logout();
  }
}
