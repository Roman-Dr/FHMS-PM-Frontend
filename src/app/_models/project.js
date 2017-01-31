"use strict";
var Project = (function () {
    function Project(values) {
        if (values === void 0) { values = {}; }
        this.stakeholders = [];
        this.contributors = [];
        Object.assign(this, values);
    }
    return Project;
}());
exports.Project = Project;
