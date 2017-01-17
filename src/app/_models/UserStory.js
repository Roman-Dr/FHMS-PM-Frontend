"use strict";
var UserStory = (function () {
    function UserStory(values) {
        if (values === void 0) { values = {}; }
        this.title = '';
        this.complete = false;
        this.author = '';
        this.timestamp = new Date();
        Object.assign(this, values);
    }
    return UserStory;
}());
exports.UserStory = UserStory;
