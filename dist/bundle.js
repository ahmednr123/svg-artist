/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Main.ts":
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var PathTool_1 = __webpack_require__(/*! ./Tools/PathTool */ "./src/Tools/PathTool.ts");
PathTool_1["default"].init();


/***/ }),

/***/ "./src/Meta/Point.ts":
/*!***************************!*\
  !*** ./src/Meta/Point.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var GeneralUtils_1 = __webpack_require__(/*! ../Utils/GeneralUtils */ "./src/Utils/GeneralUtils.ts");
function createPoint(x, y) {
    return { id: GeneralUtils_1.makeid(10), x: x, y: y };
}
exports.createPoint = createPoint;


/***/ }),

/***/ "./src/Tools/PathTool.ts":
/*!*******************************!*\
  !*** ./src/Tools/PathTool.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Point_1 = __webpack_require__(/*! ../Meta/Point */ "./src/Meta/Point.ts");
var GeneralUtils_1 = __webpack_require__(/*! ../Utils/GeneralUtils */ "./src/Utils/GeneralUtils.ts");
var PathActionType;
(function (PathActionType) {
    PathActionType["Move"] = "M";
    PathActionType["Line"] = "L";
    PathActionType["Curve"] = "C";
    PathActionType["Smooth"] = "S";
})(PathActionType || (PathActionType = {}));
var PathTool = (function () {
    function PathTool() {
    }
    PathTool.init = function () {
        document.addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("mouseup", this.onMouseUp);
    };
    PathTool.destroy = function () {
        document.removeEventListener("mousedown", this.onMouseDown);
        document.removeEventListener("mousemove", this.onMouseMove);
        document.removeEventListener("mouseup", this.onMouseUp);
    };
    PathTool.onSelect = function (id) {
    };
    PathTool.onMouseDown = function (ev) {
        if (ev.which == 1) {
            var point = Point_1.createPoint(ev.clientX, ev.clientY);
            if (this.ActivePath == null) {
                this.ActivePath = PathHandler.create(point);
            }
            else {
                PathHandler.add(this.ActivePath, point);
            }
        }
    };
    PathTool.onMouseMove = function (ev) {
    };
    PathTool.onMouseUp = function (ev) {
    };
    PathTool.ActivePath = null;
    return PathTool;
}());
exports["default"] = PathTool;
var PathHandler = (function () {
    function PathHandler() {
    }
    PathHandler.create = function (point) {
        var path = this.createPath();
        path.root = this.createActionFragment(PathActionType.Move, [point]);
        path.points[point.id] = point;
        path.curve_points[point.id] = { id: point.id, active: false, x: point.x, y: point.y };
        this.Paths[path.id] = path;
        return path;
    };
    PathHandler.add = function (path, point) {
        var action = PathActionType.Line;
        var point_arr = [point];
        var temp = path.root;
        while (temp.next != null)
            temp = temp.next;
        var prev_point = this.getPoint(temp);
        var curve_point = path.curve_points[point.id];
        var prev_curve_point = path.curve_points[prev_point.id];
        if (prev_curve_point.active) {
            if (temp.action == PathActionType.Move) {
                action = PathActionType.Curve;
                point_arr.unshift(curve_point);
                point_arr.unshift(prev_curve_point);
            }
            else if (temp.action == PathActionType.Curve || temp.action == PathActionType.Smooth) {
                action = PathActionType.Smooth;
                point_arr.unshift(curve_point);
            }
            else if (temp.action == PathActionType.Line) {
                var temp_point_id = temp.point_arr[0].id;
                temp.action = PathActionType.Curve;
                temp.point_arr.unshift(path.curve_points[temp_point_id]);
                temp.point_arr.unshift(path.curve_points[this.getPoint(temp.prev).id]);
                action = PathActionType.Smooth;
                point_arr.unshift(curve_point);
            }
        }
        var ac_fragment = this.createActionFragment(action, point_arr);
        ac_fragment.prev = temp;
        temp.next = ac_fragment;
    };
    PathHandler.update = function (path_id, point) {
        var path = this.Paths[path_id];
        if (point.id.charAt(1) == ':') {
            var curve_point_type = point.id.split(':')[0];
            var curve_point_id = point.id.split(':')[1];
            if (curve_point_type == 'A') {
                path.curve_points[curve_point_id].x = point.x;
                path.curve_points[curve_point_id].y = point.y;
            }
            else if (curve_point_type == 'B') {
                var base_point = path.points[curve_point_id];
                var mirror_point = getMirrorPoint(base_point, point);
                path.curve_points[curve_point_id].x = mirror_point.x;
                path.curve_points[curve_point_id].y = mirror_point.y;
            }
        }
        else {
            var diff_point = { x: point.x - path.points[point.id].x, y: point.y - path.points[point.id].y };
            path.points[point.id].x = point.x;
            path.points[point.id].y = point.y;
            path.curve_points[point.id].x += diff_point.x;
            path.curve_points[point.id].y += diff_point.y;
        }
    };
    PathHandler.getSVG = function (path) {
        var path_data = "";
        var temp = path.root;
        while (temp != null) {
            path_data += temp.action + " ";
            for (var _i = 0, _a = temp.point_arr; _i < _a.length; _i++) {
                var point = _a[_i];
                path_data += point.x + " " + point.y + ", ";
            }
            temp = temp.next;
        }
        return "<path id=\"" + path.id + "\" d=\"" + path_data + "\" stroke=\"black\" fill=\"none\"/>";
    };
    PathHandler.getPoint = function (fragment) {
        switch (fragment.action) {
            case PathActionType.Line:
            case PathActionType.Move:
                return fragment.point_arr[0];
            case PathActionType.Smooth:
                return fragment.point_arr[1];
            case PathActionType.Curve:
                return fragment.point_arr[2];
        }
    };
    PathHandler.createActionFragment = function (type, point_arr) {
        return { action: type, point_arr: point_arr, next: null, prev: null };
    };
    PathHandler.createPath = function () {
        return { id: GeneralUtils_1.makeid(10), root: null, points: {}, curve_points: {} };
    };
    PathHandler.Paths = {};
    return PathHandler;
}());
function getMirrorPoint(base_point, point) {
    var mirror_point = { x: null, y: null };
    mirror_point.x = 2 * base_point.x - point.x;
    mirror_point.y = 2 * base_point.y - point.y;
    return mirror_point;
}


/***/ }),

/***/ "./src/Utils/GeneralUtils.ts":
/*!***********************************!*\
  !*** ./src/Utils/GeneralUtils.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var onlyCharacters = '_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    result += onlyCharacters.charAt(Math.floor(Math.random() * onlyCharacters.length));
    for (var i = 0; i < length - 1; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
exports.makeid = makeid;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01ldGEvUG9pbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Rvb2xzL1BhdGhUb29sLnRzIiwid2VicGFjazovLy8uL3NyYy9VdGlscy9HZW5lcmFsVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLHdGQUF3QztBQUV4QyxxQkFBUSxDQUFDLElBQUksRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0FDRmYscUdBQTZDO0FBUzdDLFNBQWdCLFdBQVcsQ0FBRSxDQUFTLEVBQUUsQ0FBUztJQUM3QyxPQUFPLEVBQUMsRUFBRSxFQUFFLHFCQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFFLENBQUMsS0FBQyxDQUFDO0FBQ2xDLENBQUM7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ZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvTWFpbi50c1wiKTtcbiIsImltcG9ydCBQYXRoVG9vbCBmcm9tICcuL1Rvb2xzL1BhdGhUb29sJztcclxuXHJcblBhdGhUb29sLmluaXQoKSIsImltcG9ydCB7bWFrZWlkfSBmcm9tICcuLi9VdGlscy9HZW5lcmFsVXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW50ZXJmYWNlIFBvaW50IHtcclxuICAgIGlkPzogc3RyaW5nLFxyXG4gICAgYWN0aXZlPzogYm9vbGVhbiwgXHJcbiAgICB4OiBudW1iZXIsIFxyXG4gICAgeTogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQb2ludCAoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBQb2ludCB7XHJcbiAgICByZXR1cm4ge2lkOiBtYWtlaWQoMTApLCB4LCB5fTtcclxufSIsImltcG9ydCBQb2ludCwgeyBjcmVhdGVQb2ludCB9IGZyb20gJy4uL01ldGEvUG9pbnQnO1xyXG5pbXBvcnQge21ha2VpZH0gZnJvbSAnLi4vVXRpbHMvR2VuZXJhbFV0aWxzJztcclxuXHJcbmVudW0gUGF0aEFjdGlvblR5cGUge1xyXG4gICAgTW92ZSA9IFwiTVwiLFxyXG4gICAgTGluZSA9IFwiTFwiLFxyXG4gICAgQ3VydmUgPSBcIkNcIixcclxuICAgIFNtb290aCA9IFwiU1wiXHJcbn1cclxuXHJcbmludGVyZmFjZSBQYXRoIHtcclxuICAgIGlkOiBzdHJpbmcsXHJcbiAgICByb290OiBQYXRoQWN0aW9uRnJhZ21lbnQsXHJcbiAgICBwb2ludHM6IHtbcG9pbnRfaWQ6c3RyaW5nXTogUG9pbnR9LFxyXG4gICAgY3VydmVfcG9pbnRzOiB7W3BvaW50X2lkOnN0cmluZ106IFBvaW50fVxyXG59XHJcblxyXG5pbnRlcmZhY2UgUGF0aEFjdGlvbkZyYWdtZW50IHtcclxuICAgIGFjdGlvbjogUGF0aEFjdGlvblR5cGUsXHJcbiAgICBwb2ludF9hcnI6IEFycmF5PFBvaW50PixcclxuICAgIG5leHQ6IFBhdGhBY3Rpb25GcmFnbWVudCxcclxuICAgIHByZXY6IFBhdGhBY3Rpb25GcmFnbWVudFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXRoVG9vbCB7XHJcbiAgICBzdGF0aWMgQWN0aXZlUGF0aDogUGF0aCA9IG51bGw7XHJcblxyXG4gICAgc3RhdGljIGluaXQgKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5vbk1vdXNlRG93bik7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm9uTW91c2VNb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLm9uTW91c2VVcCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRlc3Ryb3kgKCkge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5vbk1vdXNlRG93bik7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm9uTW91c2VNb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLm9uTW91c2VVcCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG9uU2VsZWN0IChpZDogc3RyaW5nKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBvbk1vdXNlRG93biAoZXY6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICBpZiAoZXYud2hpY2ggPT0gMSkge1xyXG4gICAgICAgICAgICBsZXQgcG9pbnQ6IFBvaW50ID0gY3JlYXRlUG9pbnQoZXYuY2xpZW50WCwgZXYuY2xpZW50WSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkFjdGl2ZVBhdGggPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BY3RpdmVQYXRoID0gUGF0aEhhbmRsZXIuY3JlYXRlKHBvaW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFBhdGhIYW5kbGVyLmFkZCh0aGlzLkFjdGl2ZVBhdGgsIHBvaW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgb25Nb3VzZU1vdmUgKGV2OiBNb3VzZUV2ZW50KSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBvbk1vdXNlVXAgKGV2OiBNb3VzZUV2ZW50KSB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQYXRoSGFuZGxlciB7XHJcbiAgICBzdGF0aWMgUGF0aHM6IHtba2V5OiBzdHJpbmddOiBQYXRofSA9IHt9O1xyXG5cclxuICAgIHN0YXRpYyBjcmVhdGUgKHBvaW50OiBQb2ludCk6IFBhdGgge1xyXG4gICAgICAgIGxldCBwYXRoOiBQYXRoID0gdGhpcy5jcmVhdGVQYXRoKCk7XHJcbiAgICAgICAgcGF0aC5yb290ID0gdGhpcy5jcmVhdGVBY3Rpb25GcmFnbWVudChQYXRoQWN0aW9uVHlwZS5Nb3ZlLCBbcG9pbnRdKTtcclxuICAgICAgICBwYXRoLnBvaW50c1twb2ludC5pZF0gPSBwb2ludDtcclxuICAgICAgICBwYXRoLmN1cnZlX3BvaW50c1twb2ludC5pZF0gPSB7aWQ6IHBvaW50LmlkLCBhY3RpdmU6IGZhbHNlLCB4OiBwb2ludC54LCB5OiBwb2ludC55fTsgLy8gVEhJUyBJUyBET05FIFRPIEFWT0lEIFBPSVRJTkcgVE8gVEhFIHBvaW50IE9CSkVDVFxyXG5cclxuICAgICAgICB0aGlzLlBhdGhzW3BhdGguaWRdID0gcGF0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFkZCAocGF0aDogUGF0aCwgcG9pbnQ6IFBvaW50KSB7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IFBhdGhBY3Rpb25UeXBlLkxpbmU7XHJcbiAgICAgICAgbGV0IHBvaW50X2FyciA9IFtwb2ludF07XHJcblxyXG4gICAgICAgIGxldCB0ZW1wID0gcGF0aC5yb290O1xyXG4gICAgICAgIHdoaWxlICh0ZW1wLm5leHQgIT0gbnVsbClcclxuICAgICAgICAgICAgdGVtcCA9IHRlbXAubmV4dDtcclxuXHJcbiAgICAgICAgbGV0IHByZXZfcG9pbnQgPSB0aGlzLmdldFBvaW50KHRlbXApO1xyXG4gICAgICAgIGxldCBjdXJ2ZV9wb2ludCA9IHBhdGguY3VydmVfcG9pbnRzW3BvaW50LmlkXTtcclxuICAgICAgICBsZXQgcHJldl9jdXJ2ZV9wb2ludCA9IHBhdGguY3VydmVfcG9pbnRzW3ByZXZfcG9pbnQuaWRdO1xyXG4gICAgICAgIGlmIChwcmV2X2N1cnZlX3BvaW50LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBpZiAodGVtcC5hY3Rpb24gPT0gUGF0aEFjdGlvblR5cGUuTW92ZSkge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uID0gUGF0aEFjdGlvblR5cGUuQ3VydmU7XHJcbiAgICAgICAgICAgICAgICBwb2ludF9hcnIudW5zaGlmdChjdXJ2ZV9wb2ludCk7XHJcbiAgICAgICAgICAgICAgICBwb2ludF9hcnIudW5zaGlmdChwcmV2X2N1cnZlX3BvaW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZW1wLmFjdGlvbiA9PSBQYXRoQWN0aW9uVHlwZS5DdXJ2ZSB8fCB0ZW1wLmFjdGlvbiA9PSBQYXRoQWN0aW9uVHlwZS5TbW9vdGgpIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbiA9IFBhdGhBY3Rpb25UeXBlLlNtb290aDtcclxuICAgICAgICAgICAgICAgIHBvaW50X2Fyci51bnNoaWZ0KGN1cnZlX3BvaW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZW1wLmFjdGlvbiA9PSBQYXRoQWN0aW9uVHlwZS5MaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcF9wb2ludF9pZCA9IHRlbXAucG9pbnRfYXJyWzBdLmlkO1xyXG4gICAgICAgICAgICAgICAgdGVtcC5hY3Rpb24gPSBQYXRoQWN0aW9uVHlwZS5DdXJ2ZTtcclxuICAgICAgICAgICAgICAgIHRlbXAucG9pbnRfYXJyLnVuc2hpZnQocGF0aC5jdXJ2ZV9wb2ludHNbdGVtcF9wb2ludF9pZF0pXHJcbiAgICAgICAgICAgICAgICB0ZW1wLnBvaW50X2Fyci51bnNoaWZ0KHBhdGguY3VydmVfcG9pbnRzW3RoaXMuZ2V0UG9pbnQodGVtcC5wcmV2KS5pZF0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGFjdGlvbiA9IFBhdGhBY3Rpb25UeXBlLlNtb290aDtcclxuICAgICAgICAgICAgICAgIHBvaW50X2Fyci51bnNoaWZ0KGN1cnZlX3BvaW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjX2ZyYWdtZW50ID0gdGhpcy5jcmVhdGVBY3Rpb25GcmFnbWVudChhY3Rpb24sIHBvaW50X2Fycik7XHJcbiAgICAgICAgYWNfZnJhZ21lbnQucHJldiA9IHRlbXA7XHJcbiAgICAgICAgdGVtcC5uZXh0ID0gYWNfZnJhZ21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZSAocGF0aF9pZDogc3RyaW5nLCBwb2ludDogUG9pbnQpIHtcclxuICAgICAgICBsZXQgcGF0aCA9IHRoaXMuUGF0aHNbcGF0aF9pZF07XHJcblxyXG4gICAgICAgIGlmIChwb2ludC5pZC5jaGFyQXQoMSkgPT0gJzonKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJ2ZV9wb2ludF90eXBlID0gcG9pbnQuaWQuc3BsaXQoJzonKVswXTtcclxuICAgICAgICAgICAgbGV0IGN1cnZlX3BvaW50X2lkID0gcG9pbnQuaWQuc3BsaXQoJzonKVsxXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChjdXJ2ZV9wb2ludF90eXBlID09ICdBJykge1xyXG4gICAgICAgICAgICAgICAgcGF0aC5jdXJ2ZV9wb2ludHNbY3VydmVfcG9pbnRfaWRdLnggPSBwb2ludC54O1xyXG4gICAgICAgICAgICAgICAgcGF0aC5jdXJ2ZV9wb2ludHNbY3VydmVfcG9pbnRfaWRdLnkgPSBwb2ludC55O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnZlX3BvaW50X3R5cGUgPT0gJ0InKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFzZV9wb2ludCA9IHBhdGgucG9pbnRzW2N1cnZlX3BvaW50X2lkXTtcclxuICAgICAgICAgICAgICAgIGxldCBtaXJyb3JfcG9pbnQgPSBnZXRNaXJyb3JQb2ludChiYXNlX3BvaW50LCBwb2ludCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGF0aC5jdXJ2ZV9wb2ludHNbY3VydmVfcG9pbnRfaWRdLnggPSBtaXJyb3JfcG9pbnQueDtcclxuICAgICAgICAgICAgICAgIHBhdGguY3VydmVfcG9pbnRzW2N1cnZlX3BvaW50X2lkXS55ID0gbWlycm9yX3BvaW50Lnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZGlmZl9wb2ludDogUG9pbnQgPSB7eDogcG9pbnQueCAtIHBhdGgucG9pbnRzW3BvaW50LmlkXS54LCB5OiBwb2ludC55IC0gcGF0aC5wb2ludHNbcG9pbnQuaWRdLnl9O1xyXG5cclxuICAgICAgICAgICAgcGF0aC5wb2ludHNbcG9pbnQuaWRdLnggPSBwb2ludC54O1xyXG4gICAgICAgICAgICBwYXRoLnBvaW50c1twb2ludC5pZF0ueSA9IHBvaW50Lnk7XHJcblxyXG4gICAgICAgICAgICBwYXRoLmN1cnZlX3BvaW50c1twb2ludC5pZF0ueCArPSBkaWZmX3BvaW50Lng7XHJcbiAgICAgICAgICAgIHBhdGguY3VydmVfcG9pbnRzW3BvaW50LmlkXS55ICs9IGRpZmZfcG9pbnQueTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFNWRyAocGF0aDogUGF0aCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHBhdGhfZGF0YSA9IFwiXCJcclxuXHJcbiAgICAgICAgbGV0IHRlbXAgPSBwYXRoLnJvb3Q7XHJcbiAgICAgICAgd2hpbGUgKHRlbXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBwYXRoX2RhdGEgKz0gdGVtcC5hY3Rpb24gKyBcIiBcIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgcG9pbnQgb2YgdGVtcC5wb2ludF9hcnIpXHJcbiAgICAgICAgICAgICAgICBwYXRoX2RhdGEgKz0gYCR7cG9pbnQueH0gJHtwb2ludC55fSwgYDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRlbXAgPSB0ZW1wLm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYDxwYXRoIGlkPVwiJHtwYXRoLmlkfVwiIGQ9XCIke3BhdGhfZGF0YX1cIiBzdHJva2U9XCJibGFja1wiIGZpbGw9XCJub25lXCIvPmA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgXHJcbiAgICBnZXRQb2ludCAoZnJhZ21lbnQ6IFBhdGhBY3Rpb25GcmFnbWVudCk6IFBvaW50XHJcbiAgICB7XHJcbiAgICAgICAgc3dpdGNoIChmcmFnbWVudC5hY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBQYXRoQWN0aW9uVHlwZS5MaW5lOlxyXG4gICAgICAgICAgICBjYXNlIFBhdGhBY3Rpb25UeXBlLk1vdmU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJhZ21lbnQucG9pbnRfYXJyWzBdO1xyXG4gICAgICAgICAgICBjYXNlIFBhdGhBY3Rpb25UeXBlLlNtb290aDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBmcmFnbWVudC5wb2ludF9hcnJbMV07XHJcbiAgICAgICAgICAgIGNhc2UgUGF0aEFjdGlvblR5cGUuQ3VydmU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJhZ21lbnQucG9pbnRfYXJyWzJdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBcclxuICAgIGNyZWF0ZUFjdGlvbkZyYWdtZW50ICh0eXBlOiBQYXRoQWN0aW9uVHlwZSwgcG9pbnRfYXJyOiBBcnJheTxQb2ludD4pOiBQYXRoQWN0aW9uRnJhZ21lbnQgXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHthY3Rpb246IHR5cGUsIHBvaW50X2FyciwgbmV4dDogbnVsbCwgcHJldjogbnVsbH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgXHJcbiAgICBjcmVhdGVQYXRoICgpOiBQYXRoIFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7aWQ6IG1ha2VpZCgxMCksIHJvb3Q6IG51bGwsIHBvaW50czoge30sIGN1cnZlX3BvaW50czoge319O1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRNaXJyb3JQb2ludCAoYmFzZV9wb2ludDogUG9pbnQsIHBvaW50OiBQb2ludCk6IFBvaW50IHtcclxuICAgIGxldCBtaXJyb3JfcG9pbnQ6IFBvaW50ID0ge3g6bnVsbCwgeTpudWxsfVxyXG5cclxuICAgIG1pcnJvcl9wb2ludC54ID0gMiAqIGJhc2VfcG9pbnQueCAtIHBvaW50Lng7XHJcbiAgICBtaXJyb3JfcG9pbnQueSA9IDIgKiBiYXNlX3BvaW50LnkgLSBwb2ludC55O1xyXG5cclxuICAgIHJldHVybiBtaXJyb3JfcG9pbnQ7XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gbWFrZWlkIChsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICB2YXIgcmVzdWx0ICAgICAgICAgID0gICAnJztcclxuICAgIHZhciBjaGFyYWN0ZXJzICAgICAgPSAgICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XHJcbiAgICB2YXIgb25seUNoYXJhY3RlcnMgID0gICAnX0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonXHJcblxyXG4gICAgcmVzdWx0ICs9IG9ubHlDaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvbmx5Q2hhcmFjdGVycy5sZW5ndGgpKTtcclxuXHJcbiAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBsZW5ndGgtMTsgaSsrICkge1xyXG4gICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzLmxlbmd0aCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9