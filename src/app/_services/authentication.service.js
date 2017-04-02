"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var AuthenticationService = (function () {
    function AuthenticationService(http, projectService) {
        this.http = http;
        this.projectService = projectService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this._apiUrl = 'https://scrumjs.herokuapp.com/api/user/';
        this._canActivate = false;
    }
    AuthenticationService.prototype.canActivate = function () {
        return this._canActivate;
    };
    AuthenticationService.prototype.login = function (email, password) {
        var _this = this;
        return this.http
            .post(this._apiUrl + 'login', JSON.stringify({ email: email, password: password }), { withCredentials: true, headers: this.headers })
            .map(function (res) {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                _this._canActivate = true;
                sessionStorage.setItem('user_id', res.json());
                return res.json();
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        return this.http.get(this._apiUrl + 'logout', { headers: this.headers })
            .map(function (res) {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                _this._canActivate = false;
                sessionStorage.removeItem('user_id');
                sessionStorage.removeItem('project_id');
                sessionStorage.removeItem('project_url');
                _this.projectService.setProjectSelectedFalse();
                console.log("Logout successful");
                return res.json();
            }
        });
    };
    AuthenticationService.prototype.registerUser = function (email, password) {
        return this.http.post(this._apiUrl + 'signup', JSON.stringify({ email: email, password: password }), { headers: this.headers })
            .map(function (res) {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                console.log("Register successful");
                return res.json();
            }
        });
    };
    AuthenticationService = __decorate([
        core_1.Injectable()
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
