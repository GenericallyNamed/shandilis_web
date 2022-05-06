"use strict";
exports.__esModule = true;
console.log("map: code run");
function isNull(node) {
    return (node == null) ? true : node.left == null && node.right == null && node.value == null;
}
var map = /** @class */ (function () {
    function map() {
        this.root = {
            left: null,
            right: null,
            value: null
        };
    }
    map.prototype.insert = function (value) {
    };
    map.prototype.insert_impl = function (value) {
    };
    map.prototype.contains = function (value) {
        if (isNull(this.root)) {
            return false;
        }
        return this.contains_impl(this.root, value);
    };
    map.prototype.contains_impl = function (node, value) {
        if (node == null || node.value == null) {
            return false;
        }
        else {
            if (node.value == value) {
                return true;
            }
            if (node.value > value) {
                return this.contains_impl(node.left, value);
            }
            else {
                return this.contains_impl(node.right, value);
            }
        }
    };
    return map;
}());
;
console.log("");
