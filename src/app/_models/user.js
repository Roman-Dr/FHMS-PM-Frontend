"use strict";
var User = (function () {
    function User(values) {
        if (values === void 0) { values = {}; }
        Object.assign(this, values);
    }
    User.prototype.displayName = function () {
        return this.firstname + ", " + this.lastname;
    };
    User.prototype.displayNameWithMail = function () {
        return this.firstname + ", " + this.lastname + " (" + this.email + ")";
    };
    return User;
}());
exports.User = User;
