"use strict";
var Backlog = (function () {
    function Backlog(values) {
        if (values === void 0) { values = {}; }
        this.title = '';
        this.status = '';
        this.author = '';
        Object.assign(this, values);
    }
    return Backlog;
}());
exports.Backlog = Backlog;
