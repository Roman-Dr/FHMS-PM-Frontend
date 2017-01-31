"use strict";
var Backlog = (function () {
    function Backlog(values) {
        if (values === void 0) { values = {}; }
        // ['New', 'Approved', 'Committed', 'Done', 'Removed']
        this.state = 'New';
        // ['Low', 'Normal', 'High'],
        this.priority = 'Normal';
        Object.assign(this, values);
    }
    Backlog.prototype.humanizePriority = function () {
        if (this.priority == "Low") {
            return "Niedrig";
        }
        else if (this.priority == "Low") {
            return "Normal";
        }
        else {
            return "Hoch";
        }
    };
    Backlog.prototype.humanizeState = function () {
        switch (this.state) {
            case 'New':
            default:
                return 'Neu';
            case 'Approved':
                return 'Bestätigt';
            case 'Committed':
                return 'Hochgeladen';
            case 'Done':
                return 'Abgeschlossen';
            case 'Removed':
                return 'Entfernt';
        }
    };
    return Backlog;
}());
exports.Backlog = Backlog;
