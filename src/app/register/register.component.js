"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var user_1 = require("../_models/user");
var authentication_service_1 = require("../_services/authentication.service");
var RegisterComponent = (function () {
    function RegisterComponent(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.newUser = new user_1.User();
    }
    RegisterComponent.prototype.onSubmit = function (email, password) {
        var _this = this;
        var success = this.authenticationService.registerUser(email, password);
        if (success) {
            console.log(this.router);
            success.subscribe(function (user) { return _this.newUser = user; }, function (error) { return _this.errorMessage = error; });
            this.router.navigate(['/login']);
        }
        else {
            console.log("Register failed, display error to user");
        }
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css'],
            providers: [authentication_service_1.AuthenticationService]
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
