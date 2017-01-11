import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';

@Injectable()
export class HeaderService {

  createAuthorizationHeader(headers: Headers) {
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
  }

  setContentTypeHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
  }

  setHeadersForGet(){
    let headers = new Headers;
    this.createAuthorizationHeader(headers);
    return headers;
  }

  setHeadersForPost(){
    let headers = new Headers;
    this.createAuthorizationHeader(headers);
    this.setContentTypeHeader(headers);
    return headers;
  }
}
