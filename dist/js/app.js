/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		1: 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"0":1,"3":1,"4":1,"5":1,"6":1,"7":1,"8":1,"9":1,"10":1,"11":1,"12":1,"13":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "css/" + ({}[chunkId]||chunkId) + "." + {"0":"a1059e04","3":"85192b57","4":"87c0612c","5":"c1a3462b","6":"9dd58c67","7":"8a2232d1","8":"3a5ba00a","9":"6d55a8f2","10":"6d55a8f2","11":"6d55a8f2","12":"6d55a8f2","13":"6d55a8f2","14":"e3b0c442","15":"e3b0c442","16":"e3b0c442"}[chunkId] + ".css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([200,2]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiKeyFigure; });
/**
 * All Perfomance indicators
 */
var ApiKeyFigure;

(function (ApiKeyFigure) {
  ApiKeyFigure[ApiKeyFigure["IR_INTENSITY_ID"] = 1] = "IR_INTENSITY_ID";
  ApiKeyFigure[ApiKeyFigure["SCE_ORIENTATION_ID"] = 2] = "SCE_ORIENTATION_ID";
  ApiKeyFigure[ApiKeyFigure["SCA_ORIENTATION_ID"] = 3] = "SCA_ORIENTATION_ID";
  ApiKeyFigure[ApiKeyFigure["SCA_FRICTION_ID"] = 4] = "SCA_FRICTION_ID";
  ApiKeyFigure[ApiKeyFigure["MISSING_GLASS_TUBE_ID"] = 5] = "MISSING_GLASS_TUBE_ID";
  ApiKeyFigure[ApiKeyFigure["COATING_DEGRADATION_ID"] = 6] = "COATING_DEGRADATION_ID";
  ApiKeyFigure[ApiKeyFigure["HIGH_HYDROGEN_CONCENTRATION_ID"] = 7] = "HIGH_HYDROGEN_CONCENTRATION_ID";
  ApiKeyFigure[ApiKeyFigure["SCA_SDX_ID"] = 8] = "SCA_SDX_ID";
  ApiKeyFigure[ApiKeyFigure["GLASS_TUBE_TEMPERATURE_ID"] = 9] = "GLASS_TUBE_TEMPERATURE_ID";
  ApiKeyFigure[ApiKeyFigure["HCE_RECOMMENDED_ACTION_CLASS_ID"] = 10] = "HCE_RECOMMENDED_ACTION_CLASS_ID";
  ApiKeyFigure[ApiKeyFigure["MISSING_MIRROR_ID"] = 11] = "MISSING_MIRROR_ID";
  ApiKeyFigure[ApiKeyFigure["OXYGEN_PENETRATION_ID"] = 12] = "OXYGEN_PENETRATION_ID";
  ApiKeyFigure[ApiKeyFigure["SCE_SDX_ID"] = 13] = "SCE_SDX_ID";
  ApiKeyFigure[ApiKeyFigure["SCA_ORTHO_IMAGES_RGB_ID"] = 14] = "SCA_ORTHO_IMAGES_RGB_ID";
  ApiKeyFigure[ApiKeyFigure["SCA_ORTHO_IMAGES_IR_ID"] = 15] = "SCA_ORTHO_IMAGES_IR_ID";
  ApiKeyFigure[ApiKeyFigure["SCA_ORTHO_IMAGES_SDX_ID"] = 16] = "SCA_ORTHO_IMAGES_SDX_ID";
  ApiKeyFigure[ApiKeyFigure["SCE_ALIGNMENT_ID"] = 17] = "SCE_ALIGNMENT_ID";
  ApiKeyFigure[ApiKeyFigure["SCA_TRACKING_DEVIATION_ID"] = 18] = "SCA_TRACKING_DEVIATION_ID";
  ApiKeyFigure[ApiKeyFigure["HCE_POSITION_ID"] = 19] = "HCE_POSITION_ID";
})(ApiKeyFigure || (ApiKeyFigure = {}));

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AppStorage */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return appLocalStorage; });
/* unused harmony export appSessionStorage */
/* harmony import */ var _home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(172);
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2__);




/**
 * App Storage class
 * @description This will be responsible for storing data into the application.
 * Commonly, people use LocalStorage or SessionStorage. This is just a wrapper over them
 * because to restrict the usage of Global window storage throughtout the application
 * Default, this is just using the LocalStorage
 */
var AppStorage = /*#__PURE__*/function () {
  function AppStorage(storage) {
    Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, AppStorage);

    this.storage = storage || window.localStorage;
    /** Is storage is supported or not */

    if (!this.isSupported()) {
      throw new Error("Storage is not supported by browser!");
    }
  }

  Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(AppStorage, [{
    key: "setItem",
    value: function setItem(key, value) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      var item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      this.storage.removeItem(key);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.storage.clear();
    }
    /**
     * @description Check for storage support
     * @returns {boolean} supported
     * */

  }, {
    key: "isSupported",
    value: function isSupported() {
      var supported = true;

      if (!this.storage) {
        supported = false;
      }

      return supported;
    }
  }]);

  return AppStorage;
}();
/**
 * Creating the instance of storage. Default will be localStorage
 * but if you want to create instance for session storage then pass window.sessionStorage as parameter
 */

var appLocalStorage = new AppStorage();
var appSessionStorage = new AppStorage(window.sessionStorage);


/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _app_shared_services_app_alert_app_alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60);

var appContentEventBus = new _app_shared_services_app_alert_app_alert__WEBPACK_IMPORTED_MODULE_0__[/* AppAlertEventBus */ "a"]();
/* harmony default export */ __webpack_exports__["a"] = (appContentEventBus);

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppContentEventService; });
/* harmony import */ var _home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _services_app_alert_app_alert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(60);



var AppContentEventService = /*#__PURE__*/function () {
  function AppContentEventService() {
    Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, AppContentEventService);
  }

  Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(AppContentEventService, null, [{
    key: "getAppContentEventBus",
    value: function getAppContentEventBus(id) {
      if (!(id in AppContentEventService.appContentEventBusses)) {
        AppContentEventService.appContentEventBusses[id] = new _services_app_alert_app_alert__WEBPACK_IMPORTED_MODULE_2__[/* AppAlertEventBus */ "a"]();
      }

      return AppContentEventService.appContentEventBusses[id];
    }
  }, {
    key: "on",
    value: function on(id, alertEvent, callbackFn) {
      AppContentEventService.getAppContentEventBus(id).on(alertEvent, callbackFn);
    }
  }, {
    key: "emit",
    value: function emit(id, alertEvent) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      AppContentEventService.getAppContentEventBus(id).emit(alertEvent, args);
    }
  }, {
    key: "showError",
    value: function showError(id, error) {
      AppContentEventService.getAppContentEventBus(id).showError(error);
    }
  }, {
    key: "showInfo",
    value: function showInfo(id, msg) {
      AppContentEventService.getAppContentEventBus(id).showInfoAlert(msg);
    }
  }, {
    key: "showSuccess",
    value: function showSuccess(id, msg) {
      AppContentEventService.getAppContentEventBus(id).showSuccessAlert(msg);
    }
  }]);

  return AppContentEventService;
}();
AppContentEventService.appContentEventBusses = {};

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(101);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["a"] = ({
  getTimeDiff: function getTimeDiff(date) {
    var elapsed = Date.now() - Date.parse(date);
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var txt = "";
    var time = 0;

    if (elapsed < msPerMinute) {
      txt = "seconds-ago";
      time = Math.round(elapsed / 1000);
    } else if (elapsed < msPerHour) {
      txt = "minutes-ago";
      time = Math.round(elapsed / msPerMinute);
    } else if (elapsed < msPerDay) {
      txt = "hours-ago";
      time = Math.round(elapsed / msPerHour);
    } else if (elapsed < msPerMonth) {
      txt = "days-ago";
      time = Math.round(elapsed / msPerDay);
    } else if (elapsed < msPerYear) {
      txt = "months-ago";
      time = Math.round(elapsed / msPerMonth);
    } else {
      txt = "years-ago";
      time = Math.round(elapsed / msPerYear);
    }

    return [txt, {
      time: time
    }];
  },
  toDateTime: function toDateTime(d) {
    return ("0" + d.getDate()).slice(-2) + ("0" + (d.getMonth() + 1)).slice(-2) + d.getFullYear() + ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2);
  }
});

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1a28fa34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-header/app-header.vue?vue&type=template&id=39aa006e&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "b-navbar",
    {
      staticClass: "app-header",
      attrs: { toggleable: "lg", type: "dark", sticky: "" },
    },
    [
      _c(
        "b-navbar-brand",
        { attrs: { href: "#" } },
        [
          _c("b-link", { attrs: { to: "/" } }, [
            _c("img", {
              staticClass: "app-header-logo float-left",
              attrs: {
                src: "/images/logos/logo_white.png",
                srcset:
                  "/images/logos/logo_white.webp" +
                  ", " +
                  "/images/logos/logo_white.png",
                alt: "volateq",
              },
            }),
          ]),
        ],
        1
      ),
      _c("b-navbar-toggle", { attrs: { target: "nav-collapse" } }),
      _c(
        "b-collapse",
        {
          staticClass: "app-header-menu",
          attrs: { id: "nav-collapse", "is-nav": "" },
        },
        [
          _c(
            "b-navbar-nav",
            [
              !_vm.isPilot
                ? _c(
                    "b-nav-item",
                    {
                      staticClass: "link",
                      attrs: {
                        href: "/plants",
                        active: _vm.isActiveRoute(["/plants", "/plant/*"]),
                      },
                    },
                    [
                      _c("span", { staticClass: "nav-item-text" }, [
                        _vm._v(_vm._s(_vm.$t("plants"))),
                      ]),
                    ]
                  )
                : _vm._e(),
              _c(
                "b-nav-item",
                {
                  staticClass: "link",
                  attrs: {
                    href: "/analyses",
                    active: _vm.isActiveRoute(["/analyses", "/analysis/new"]),
                  },
                },
                [
                  _c("span", { staticClass: "nav-item-text" }, [
                    _vm._v(_vm._s(_vm.$t("analysis"))),
                  ]),
                ]
              ),
            ],
            1
          ),
          _c(
            "b-navbar-nav",
            { staticClass: "ml-auto" },
            [
              _c(
                "b-nav-item-dropdown",
                {
                  attrs: {
                    "toggle-class": "app-header-nav-dropdown",
                    right: "",
                  },
                  scopedSlots: _vm._u([
                    {
                      key: "button-content",
                      fn: function () {
                        return [
                          _c("b-icon", {
                            attrs: { icon: "gear-fill", "font-scale": "1.5" },
                          }),
                        ]
                      },
                      proxy: true,
                    },
                  ]),
                },
                [
                  _vm.isSuperAdmin
                    ? _c(
                        "b-dropdown-item",
                        {
                          staticClass: "link",
                          attrs: { href: "/settings/users" },
                        },
                        [_vm._v(_vm._s(_vm.$t("users")))]
                      )
                    : _vm._e(),
                  _vm.isSuperAdmin
                    ? _c(
                        "b-dropdown-item",
                        {
                          staticClass: "link",
                          attrs: { href: "/settings/customers" },
                        },
                        [_vm._v(_vm._s(_vm.$t("customers")))]
                      )
                    : _vm._e(),
                  _vm.isSuperAdmin
                    ? _c(
                        "b-dropdown-item",
                        {
                          staticClass: "link",
                          attrs: { href: "/analysis-monitoring" },
                        },
                        [_vm._v(_vm._s(_vm.$t("monitoring")))]
                      )
                    : _vm._e(),
                  _vm.isSuperAdmin ? _c("b-dropdown-divider") : _vm._e(),
                  _c(
                    "b-dropdown-form",
                    [
                      _c(
                        "b-button",
                        {
                          staticClass: "width-100pc",
                          on: { click: _vm.logout },
                        },
                        [_vm._v(_vm._s(_vm.$t("logout")))]
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/app/shared/components/app-header/app-header.vue?vue&type=template&id=39aa006e&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__(132);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(87);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(198);

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__(34);

// EXTERNAL MODULE: ./src/app/shared/components/base-auth-component/base-auth-component.ts + 1 modules
var base_auth_component = __webpack_require__(85);

// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/volateq-api.ts + 2 modules
var volateq_api = __webpack_require__(84);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-header/app-header.vue?vue&type=script&lang=ts&













var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var app_headervue_type_script_lang_ts_AppHeader = /*#__PURE__*/function (_BaseAuthComponent) {
  Object(inherits["a" /* default */])(AppHeader, _BaseAuthComponent);

  var _super = Object(createSuper["a" /* default */])(AppHeader);

  function AppHeader() {
    Object(classCallCheck["a" /* default */])(this, AppHeader);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(AppHeader, [{
    key: "logout",
    value: function () {
      var _logout = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return volateq_api["a" /* default */].logout();

              case 3:
                this.$router.push({
                  name: "Login"
                });
                this.$router.go(0); // Reload the page to refresh the js cache

                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function logout() {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
  }, {
    key: "isActiveRoute",
    value: function isActiveRoute(routes) {
      var _this = this;

      return !!routes.find(function (route) {
        return route.indexOf("*") != -1 ? _this.$router.currentRoute.path.replace(route.replace("*", ""), "").indexOf("/") == -1 : _this.$router.currentRoute.path === route;
      });
    }
  }]);

  return AppHeader;
}(base_auth_component["a" /* BaseAuthComponent */]);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: true
})], app_headervue_type_script_lang_ts_AppHeader.prototype, "fluid", void 0);

app_headervue_type_script_lang_ts_AppHeader = __decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-header"
})], app_headervue_type_script_lang_ts_AppHeader);
/* harmony default export */ var app_headervue_type_script_lang_ts_ = (app_headervue_type_script_lang_ts_AppHeader);
// CONCATENATED MODULE: ./src/app/shared/components/app-header/app-header.vue?vue&type=script&lang=ts&
 /* harmony default export */ var app_header_app_headervue_type_script_lang_ts_ = (app_headervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/app/shared/components/app-header/app-header.vue?vue&type=style&index=0&lang=scss&
var app_headervue_type_style_index_0_lang_scss_ = __webpack_require__(248);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(43);

// CONCATENATED MODULE: ./src/app/shared/components/app-header/app-header.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  app_header_app_headervue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app/shared/components/app-header/app-header.vue"
/* harmony default export */ var app_header = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(252);


/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_header_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(181);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_header_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_header_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_content_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(182);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_content_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_content_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_page_not_found_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(183);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_page_not_found_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_page_not_found_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 251:
/***/ (function(module) {

module.exports = JSON.parse("{\"email\":\"E-Mail\",\"password\":\"Password\",\"login\":\"Login\",\"logout\":\"Logout\",\"profile\":\"Profile\",\"overview\":\"Overview\",\"back-to-overview\":\"Back to overview\",\"analysis-overview_descr\":\"Manage all your analyses.\",\"users\":\"Users\",\"users_descr\":\"Manage your users.\",\"name\":\"Name\",\"state\":\"State\",\"role\":\"Role\",\"registered\":\"Registered\",\"unknown\":\"Unknown\",\"pending\":\"Pending\",\"registered-at\":\"registered at\",\"invited-at\":\"invited at\",\"invite\":\"Invite\",\"invite-new-user\":\"Invite new user\",\"invite-new-user_descr\":\"The invited user will receives an E-Mail with a confirmation link to register\",\"cancel\":\"Cancel\",\"customer\":\"Customer\",\"register\":\"Register\",\"company\":\"Company\",\"first-name\":\"First name\",\"last-name\":\"Last name\",\"repeat-password\":\"Repeat password\",\"browse...\":\"Browse...\",\"create-new-analysis\":\"Create new analysis\",\"create-new-analysis_descr\":\"A new analysis will be created and processed after the data upload has been finished.\",\"route\":\"Route\",\"upload-your-files\":\"Upload your files\",\"video-files_descr\":\"Video files (*.mp4, *.mov)\",\"drone-metadata-file_descr\":\"Drone metadata file (*.srt)\",\"plant-metadata-file_descr\":\"(Optional) Metadata of the state of your plant (*.xslx, *.mdb)\",\"upload\":\"Upload\",\"retrying...\":\"Retrying...\",\"ERROR\":\"ERROR\",\"upload-completed-successfully\":\"Upload completed successfully\",\"resume-upload\":\"Resume upload\",\"date\":\"Date\",\"need-files-to-upload_descr\":\"The upload has been interrupted. To resume the upload please select the following files: \",\"return-to-upload\":\"Return to upload\",\"no-data\":\"No data\",\"actions\":\"Actions\",\"download...\":\"Download...\",\"pause\":\"Pause\",\"upload-error-retry\":\"Upload error occured! Retrying...\",\"retry-upload\":\"Retry upload\",\"created-at\":\"Created at\",\"created-by\":\"Created by\",\"seconds-ago\":\"{time} seconds ago\",\"minutes-ago\":\"{time} minutes ago\",\"hours-ago\":\"{time} hours ago\",\"days-ago\":\"{time} days ago\",\"months-ago\":\"{time} months ago\",\"years-ago\":\"{time} years ago\",\"update-analysis-state\":\"Update state of analysis\",\"update\":\"Update\",\"update-analysis-state_descr\":\"The responsible user receives an E-Mail with your message\",\"message\":\"Message\",\"update-analysis-state-to\":\"Update state of analysis to <b>{state}</b>\",\"update-analysis-state-success\":\"State of analysis successfully updated\",\"forgot-password\":\"Forgot your password?\",\"forgot-password_descr\":\"Enter your E-mail to receive a message with a link to reset your password\",\"send\":\"send\",\"request-sent\":\"Request sent\",\"apply\":\"Apply\",\"reset-password\":\"Reset password\",\"user-invited-successfully\":\"User invited successfully\",\"results-of-analysis\":\"Results of the analysis\",\"results-of-analysis_descr\":\"Oil temperature in the absorber tube: <b>257°</b><br>Ambient temperature: <b>23°</b><br>Time: <b>17:14</b>\",\"oil-temp-of-absorber-tube\":\"HTF temperature\",\"ambient-temperature\":\"Ambient temperature\",\"time\":\"Time\",\"absorber-tubes\":\"Absorber tubes\",\"single-collector-elements\":\"SCE\",\"mirrors\":\"Mirrors\",\"search-pcs\":\"Search PCS code\",\"export-csv\":\"Export CSV\",\"kks\":\"KKS\",\"ir-intensity\":\"IR Intensity\",\"ir-intensity-class\":\"IR Intensity classification\",\"ir-intensity-class_expl\":\"Classification of the infrared intensity. <br>Class. <b>1</b>: Good<br>Class. <b>2</b>: Vacuum loss starts<br>Class. <b>3</b>: Severe heat loss\",\"ir-intensity-class-1\":\"Good\",\"ir-intensity-class-2\":\"Vacuum loss starts\",\"ir-intensity-class-3\":\"Severe heat loss\",\"glass-tube-temperature\":\"Glass tube temperature\",\"glass-tube-temperature-class\":\"Glass tube temperature classification\",\"glass-tube-temperature-class_expl\":\"Classification of the Glass tube temperature. <br>Class. <b>1</b>: Good<br>Class. <b>2</b>: Vacuum loss starts<br>Class. <b>3</b>: Severe heat loss\",\"glass-tube-temperature-class-1\":\"Good\",\"glass-tube-temperature-class-2\":\"Vacuum loss starts\",\"glass-tube-temperature-class-3\":\"Moderate heat loss\",\"glass-tube-temperature-class-4\":\"Severe heat loss\",\"select-result-data-files\":\"Select result data files\",\"absorber-temperature\":\"HTF temperature\",\"pcs\":\"PCS\",\"pcs_expl\":\"Powerplant coding system\",\"ir-intensity_expl\":\"The Infrared luminous intensity of the absorber. The greater the value the more heat is lost.\",\"set-angle\":\"Target value (°)\",\"angle-value\":\"Encoder value\",\"actual-angle\":\"Measured orientation\",\"alignment-offset\":\"Alignment offset\",\"sce-alignment-offset\":\"Alignment offset\",\"tracking-offset\":\"Tracking encoder offset\",\"sce-alignment-offset_expl\":\"Deviation of the SCE orientation to the mean value of both SCEs at drive pylon. <br> SCEs with offset values less than 0 point to the east.\",\"tracking-offset_expl\":\"Tracking offset of the SCA to the 'encoder value' (usually about 90°). <br> SCAs with offset values less than 0 point to the east.\",\"angle-value_expl\":\"Alignment of the SCE according to plant data\",\"actual-angle_expl\":\"Measured alignment due to video data\",\"sce_expl\":\"Single collector element - One module\",\"per-page\":\"Per page\",\"total\":\"Total\",\"successfully-imported\":\"successfully imported\",\"import-failed-for\":\"import failed for\",\"manage-result-files\":\"Manage result files\",\"manage-result-files_descr\":\"Select further JSON result files to import or remove imported result files\",\"import\":\"Import\",\"success-managing-result-files\":\"Result files successfully managed\",\"accept-terms-of-service\":\"I agree to the <a href='https://www.volateq.de/privacy-policy/' target='_blank'>terms of service</a>\",\"remove-result-files\":\"Remove all imported results\",\"select-json-result-file-import\":\"Select JSON result file to import\",\"uncertainty\":\"Measurment uncertainty\",\"deviation-to-drive\":\"Alignment error\",\"uncertainty_expl\":\"Uncertainty of the measured orientation\",\"deviation-to-drive_expl\":\"Internal misalignment between SCE and drive\",\"solar-collector-assembly\":\"SCA\",\"sca_expl\":\"Solar collector assembly\",\"orientation-at-drive\":\"Orientation at drive\",\"torsion-caused-friction-mean\":\"Torsion caused by friction\",\"torsion-caused-friction-mean_expl\":\"Averaged torsion caused by friction between two operating states (measure of hysteresis when moving collector into zenith from west and east, respectively)\",\"mfa\":\"Multi-Factor Authentication\",\"mfa-email_descr\":\"We did send you an E-Mail with the security code to enter.\",\"security-code\":\"Security code\",\"resend-security-code\":\"Resend security code\",\"resend-security-code-success\":\"Successfully resent security code\",\"components\":\"Components\",\"world-map\":\"World map\",\"performance-indicators\":\"Performance indicators\",\"pi\":\"PI\",\"missing-gct\":\"Broken glass\",\"missing-gct_expl\":\"Missing glass tube\",\"view\":\"View\",\"view-analysed-data-of-your-plant\":\"View analysed data of your plant\",\"analysis-overview\":\"Overview of analyses\",\"new-data-upload\":\"New data upload\",\"plants\":\"Plants\",\"plants-overview\":\"Overview of plants\",\"plants-overview_descr\":\"Select a digitized power plant in order to determine its condition on the basis of the analyzed data.\",\"digitized\":\"Digitized\",\"number-of-analyses\":\"Number of analyses\",\"upload-dt\":\"Upload digital twin\",\"upload-dt_descr\":\"Select a valid json file with the fieldgeometry of the plant\",\"clear-before\":\"Clear before\",\"select-dt-json-file\":\"Select Digital twin JSON file\",\"dt-imported-successfully\":\"Digital twin successfully imported\",\"plant\":\"Plant\",\"analysis\":\"Analyses\",\"coating-degration\":\"Coating degradation\",\"coating-degration_expl\":\"Coating degradation in percentage. Indicates oxygen penetration.\",\"oxygen-penetration\":\"Oxygen penetration\",\"oxygen-penetration_expl\":\"HCE shows degradation of the coating, indicating oxygen penetration.\",\"high-hydrogen-concentration\":\"High hydrogen concentration\",\"high-hydrogen-concentration_expl\":\"Increased probability of high hydrogen concentration. Indicators are intact coating and intact glass tube, but very high infrared intensity.\",\"no-analysis-result-selected\":\"Select an analysis to see table data\",\"show-results\":\"Show results\",\"select-result-image-files\":\"Select images files related to result file (optional)\",\"locked\":\"Locked\",\"resend-invitation\":\"Resend invitation\",\"user-invitation-sent-successfully\":\"User invitation sent successfully\",\"user-unlocked-successfully\":\"User unlocked successfully\",\"user-locked-successfully\":\"User locked successfully\",\"wind-speed\":\"Wind speed\",\"recommended-action\":\"Recommended action\",\"recommended-action_expl\":\"Recommended action. <br> <b>1</b>: No action required. <br> <b>2</b>: Observe. <br> <b>3</b>: Fix it.\",\"recommended-action-class-1\":\"No action required\",\"recommended-action-class-2\":\"Observe\",\"recommended-action-class-3\":\"Fix it\",\"recommended-action-class-1_expl\":\"Low glass tube temperature and no other indication of damage or malfunction.\",\"recommended-action-class-2_expl\":\"Low or elevated glass tube temperature, intact glass tube, and either indication of oxygen penetration or high hydrogen concentration.\",\"recommended-action-class-3_expl\":\"&bull; All HCEs with missing glass tube, regardless of measured temperature.<br>&bull; HCEs with high temperature, intact glass tube, and either indication of oxygen penetration or high hydrogen concentration.\",\"loop\":\"Loop\",\"layers\":\"Layers\",\"not-measured\":\"Could not be measured\",\"invisible-for-customer\":\"Invisible for customer\",\"released\":\"Released\",\"is-missing-mirror\":\"Mirror is missing\",\"missing-mirror\":\"Missing mirror\",\"sca-tracking-angle\":\"Tracking angle of SCA\",\"select-files\":\"Browse or drag & drop files\",\"glass-tube-temperature-class-limits\":\"Classification limits of glass tube temperature\",\"alignment-offset-class-3\":\"Exceeds ±{limit1}°\",\"alignment-offset-class-2\":\"In between  ±{limit0}° and ±{limit1}°\",\"alignment-offset-class-1\":\"Fall short of ±{limit0}°\",\"sca-torsion-class-3\":\"Significant torsion\",\"sca-torsion-class-2\":\"Moderate torsion\",\"sca-torsion-class-1\":\"Minimal torsion\",\"slope-deviation\":\"Slope deviation\",\"slope-deviation_expl\":\"Effective mirror slope deviations (SDXeff): This quantity comprises all effects including mirror slope deviations (SDX), absorber tube deviation from the focal line (ΔXAbs/ΔZAbs), and relative misalignment of SCEs within a single SCA (Δθ). All these parameters leave characteristic traces in SDXeff –maps, but the individual contributions cannot be measured independently from each other. \",\"slope-deviation-class-3\":\"Significant slope deviation\",\"slope-deviation-class-2\":\"Moderate slope deviation\",\"slope-deviation-class-1\":\"Minimal slope deviation\",\"ortho-image-rgb\":\"RGB ortho image\",\"ortho-image-ir\":\"IR ortho image\",\"ortho-image-sdx\":\"SDX ortho image\",\"history\":\"history\",\"admin-panel\":\"Admin panel\",\"analysis-visibility-of\":\"Visibility of {analysisName}\",\"digital-twin\":\"Digital twin\",\"multi-selection\":\"Multiple selection\",\"multi-selection-overlapping_expl\":\"Keeps all PIs selected and changes their colors. Warning: PIs can overlap each other\",\"has-results\":\"Has results\",\"download\":\"Download\",\"download-selected-files\":\"Download selected files\",\"select-new-analysis-state\":\"Select new analysis state\",\"download-existing-result-files\":\"Download existing result files\",\"size\":\"Size\",\"missing\":\"Missing\",\"send-notification\":\"Send notification\",\"data-complete\":\"Uploaded data complete\",\"data-complete_expl\":\"Select me, if you are uploading all data needed for the analysis\",\"cancel-and-delete-all-files\":\"Cancel & Delete all files\",\"delete-analysis\":\"Delete analysis\",\"delete\":\"Delete\",\"no-new-upload-allowed\":\"Please complete the upload of analysis {name}\",\"edit\":\"Edit\",\"acquisition-date\":\"Acquisition date\",\"analysis-updated-successfully\":\"Analysis updated successfully\",\"edit-analysis\":\"Edit analysis\",\"missing-plant-metadata\":\"Missing plant metadata (.csv, .mdb, .xls, .xlsx)\",\"analysis-result-released-success\":\"Analysis result released successfully\",\"analysis-result-locked-success\":\"Analysis result locked successfully\",\"edit-plant\":\"Edit plant\",\"plant-updated-successfully\":\"Plant updated successfully\",\"in-setup-phase\":\"In setup phase\",\"uploaded-data-complete-success\":\"Success! Uploaded data is complete!\",\"evaluation-finished-success\":\"Evaluation successfully finished\",\"run-qfly-server\":\"Run QFly server\",\"validate-file-completeness\":\"Validate file completeness\",\"run-qfly-wizard\":\"Run QFly wizard\",\"attention-state-update-starts-evaulation_expl\":\"The plant of this analysis is not in setup phase anymore. If you change the state to <b>DATA_COMPLETE</b> or <b>DATA_COMPLETE_VERIFIED</b>, the according QFly server will start and run!\",\"data-complete-sure-quest\":\"This will start the data evaluation. Are you sure that the uploaded data is complete?\",\"established\":\"Established\",\"enabled-if-data-complete-only\":\"Enabled only if state of analysis is DATA_COMPLETE\",\"enabled-if-data-complete-verfified-only\":\"Enabled only if state of analysis is DATA_COMPLETE_VERIFIED\",\"start-qlfy-server\":\"Start QFly server\",\"average-tracking-offset\":\"Average tracking offset\",\"average-tracking-offset_expl\":\"PI tracking deviation: Average deviation of entire SCA (average Deviation of all SCEs of an SCA) to encoder / inclinometer\",\"position-in-loop\":\"Position in loop\",\"display-settings\":\"Display settings\",\"show-could-not-be-measured\":\"Show \\\"Could not be measured\\\"\",\"satellite-view\":\"Satellite view\",\"not-measured-glass-tube-temp\":\"Temperature of all tubes with missing glass cannot be measured\",\"filter\":\"Filter\",\"filter-by-component\":\"Filter by component\",\"filter-by-pi\":\"Filter by PIs\",\"reset\":\"Reset\",\"subfield\":\"Subfield\",\"add-pi-filter\":\"Add PI filter\",\"show-sum-avg\":\"Show sums/average values\",\"hce-position-lateral-offset\":\"HCE position lateral offset\",\"hce-position-vertical-offset\":\"HCE position vertical offset\",\"hce-position-total-offset\":\"HCE position total offset\",\"hce-position-offset_expl\":\"Deviation of HCE from focal line. Positive: Above focal line. Negative: Below focal line\",\"select-component\":\"Select component\",\"select-order-and-limit\":\"Select order and limit\",\"order-and-limit-selection-text\":\"First {limit} {order}\",\"select-pi\":\"Select PI\",\"compare-mode\":\"Compare two analyses\",\"fixed\":\"Fixed\",\"of-which-are-new\":\"Of which are new\",\"create-a-diagram\":\"Create a diagram\",\"overview-of-pis\":\"Overview of all Performance Indicators\",\"show-ortho-image\":\"Show ortho image\",\"clear-ortho-images\":\"Clear ortho images\",\"monitoring\":\"Monitoring\",\"customers\":\"Customers\",\"sure-un-lock-user\":\"{lock} {user}. Are you sure?\",\"user-deleted-successfully\":\"User \\\"{user}\\\" deleted successfully\",\"delete-user\":\"Delete user\",\"sure-delete-user\":\"Delete user {user}. This cannot be undone. Are you sure?\",\"lock\":\"Lock\",\"unlock\":\"Unlock\",\"user-edited-successfully\":\"User edited successfully\",\"edit-user\":\"Edit user\",\"assign-plants\":\"Assign plants\",\"update-user\":\"Update user {user}\",\"user-limit-for-customer-reached\":\"User limit (10) for customer reached!\",\"create-customer\":\"Create customer\",\"edit-customer\":\"Edit customer\",\"delete-customer\":\"Delete customer\",\"sure-delete-customer\":\"Delete customer \\\"{customer}\\\". This cannot be undone! Are you sure?\",\"customers_descr\":\"Manage all customers\",\"customer-created-success\":\"Customer created successfully\",\"customer-updated-success\":\"Customer updated successfully\",\"customer-deleted-success\":\"Customer \\\"{customer}\\\" deleted successfully\",\"technology\":\"Technology\",\"create-plant\":\"Create plant\",\"plant-created-success\":\"Plant created successfully\",\"plant-deleted-success\":\"Plant \\\"{plant}\\\" deleted successfully\",\"plant-updated-success\":\"Plant \\\"{plant}\\\" updated successfully\",\"delete-plant\":\"Delete plant\",\"sure-delete-plant\":\"Delete plant \\\"{plant}\\\". This cannot be undone. Are you sure?\",\"load-file-size\":\"Load file size\",\"not-found\":\"Not found\",\"greater-than\":\"Greater than {limit}\",\"between-and\":\"Between {limit1} and {limit2}\",\"less-than\":\"Less than {limit}\",\"compare-mode_descr\":\"The younger analysis is the starting point (the left number in the substraction), always. In the table view the difference values will be used for sorting and filtering\",\"of-which-are-new-but-improved\":\"Of which are new, but improved\",\"improved-not-fixed\":\"Improved, but not fixed\",\"close\":\"Close\",\"show-history-diagram\":\"Show history diagram\",\"show-areas-diagram\":\"Show component area based diagram\",\"component-area\":\"Area\",\"order-by\":\"Order by\",\"show-in-map\":\"Show in map\",\"create\":\"Create\",\"pi-not-found\":\"PI does not exist\",\"UPLOADING\":\"Uploading...\",\"UPLOAD_FAILED\":\"Upload failed\",\"DATA_INCOMPLETE\":\"Data incomplete\",\"DATA_COMPLETE\":\"Data complete\",\"DATA_COMPLETE_VERIFIED\":\"Data complete verified\",\"PROCESSING\":\"Processing\",\"FINISHED\":\"Finished\",\"CSP_PTC_Absorber\":\"Absorber tubes\",\"CSP_PTC_SCA\":\"SCA\",\"CSP_PTC_Mirror\":\"Mirrors\",\"CSP_PTC_SCE\":\"SCE\",\"CSP_PTC_Loop\":\"Loop\"}");

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(154);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(209);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__(217);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__(219);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(67);

// EXTERNAL MODULE: ./node_modules/vue-i18n/dist/vue-i18n.esm.js
var vue_i18n_esm = __webpack_require__(131);

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/index.js + 269 modules
var esm = __webpack_require__(188);

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/icons/plugin.js
var icons_plugin = __webpack_require__(129);

// EXTERNAL MODULE: ./src/main.scss
var main = __webpack_require__(220);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1a28fa34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/app.vue?vue&type=template&id=5d87e7ea&
var appvue_type_template_id_5d87e7ea_render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_c("router-view")], 1)
}
var staticRenderFns = []
appvue_type_template_id_5d87e7ea_render._withStripped = true


// CONCATENATED MODULE: ./src/app/app.vue?vue&type=template&id=5d87e7ea&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/app.vue?vue&type=script&lang=js&
//
//
//
//
//
//
/* harmony default export */ var appvue_type_script_lang_js_ = ({
  name: "app"
});
// CONCATENATED MODULE: ./src/app/app.vue?vue&type=script&lang=js&
 /* harmony default export */ var app_appvue_type_script_lang_js_ = (appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(43);

// CONCATENATED MODULE: ./src/app/app.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  app_appvue_type_script_lang_js_,
  appvue_type_template_id_5d87e7ea_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app/app.vue"
/* harmony default export */ var app = (component.exports);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(71);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(105);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(104);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(191);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__(192);

// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__(130);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(48);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(52);

// CONCATENATED MODULE: ./src/app/auth/auth-routes.ts




var AppAuthLogin = function AppAuthLogin() {
  return __webpack_require__.e(/* import() */ 10).then(__webpack_require__.bind(null, 387));
};

var AppAuthRegister = function AppAuthRegister() {
  return __webpack_require__.e(/* import() */ 11).then(__webpack_require__.bind(null, 388));
};

var AppAuthForgotPassword = function AppAuthForgotPassword() {
  return __webpack_require__.e(/* import() */ 12).then(__webpack_require__.bind(null, 389));
};

var AppAuthResetPassword = function AppAuthResetPassword() {
  return __webpack_require__.e(/* import() */ 13).then(__webpack_require__.bind(null, 390));
};

var AppAuthConfirmLogin = function AppAuthConfirmLogin() {
  return __webpack_require__.e(/* import() */ 9).then(__webpack_require__.bind(null, 391));
};

var authRoutes = [{
  name: "Login",
  path: "/login",
  component: AppAuthLogin
}, {
  name: "ConfirmLogin",
  path: "/confirm-login/:confirmKey",
  component: AppAuthConfirmLogin
}, {
  name: "Register",
  path: "/confirm/:confirmKey",
  component: AppAuthRegister
}, {
  name: "ForgotPassword",
  path: "/forgot-password",
  component: AppAuthForgotPassword
}, {
  name: "ResetPassword",
  path: "/reset-password/:confirmKey",
  component: AppAuthResetPassword
}];
/* harmony default export */ var auth_routes = (authRoutes);
// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/api-roles.ts
var api_roles = __webpack_require__(29);

// CONCATENATED MODULE: ./src/app/analysis/analysis-routes.ts




var AppAnalysis = function AppAnalysis() {
  return __webpack_require__.e(/* import() */ 4).then(__webpack_require__.bind(null, 384));
};

var AppNewAnalysis = function AppNewAnalysis() {
  return Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(15)]).then(__webpack_require__.bind(null, 392));
};

var AppEditAnalysis = function AppEditAnalysis() {
  return Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(6)]).then(__webpack_require__.bind(null, 383));
};

var AppAnalysisMonitoring = function AppAnalysisMonitoring() {
  return __webpack_require__.e(/* import() */ 14).then(__webpack_require__.bind(null, 393));
};


var anaylsisRoutes = [{
  name: "Analyses",
  path: "/analyses",
  component: AppAnalysis,
  meta: {
    role: [api_roles["a" /* ApiRoles */].CUSTOMER_ADMIN, api_roles["a" /* ApiRoles */].PILOT]
  }
}, {
  name: "AnalysisNew",
  path: "/analysis/new",
  component: AppNewAnalysis,
  meta: {
    role: [api_roles["a" /* ApiRoles */].CUSTOMER_ADMIN, api_roles["a" /* ApiRoles */].PILOT]
  }
}, {
  name: "EditAnalysis",
  path: "/analysis/:id",
  component: AppEditAnalysis,
  meta: {
    role: [api_roles["a" /* ApiRoles */].CUSTOMER_ADMIN, api_roles["a" /* ApiRoles */].PILOT]
  }
}, {
  name: "AnalysisMonitoring",
  path: "/analysis-monitoring",
  component: AppAnalysisMonitoring,
  meta: {
    role: api_roles["a" /* ApiRoles */].SUPER_ADMIN,
    title: "monitoring",
    subtitle: "analysis_monitoring"
  }
}];
/* harmony default export */ var analysis_routes = (anaylsisRoutes);
// CONCATENATED MODULE: ./src/app/settings/settings-routes.ts




var AppSettingsUsers = function AppSettingsUsers() {
  return __webpack_require__.e(/* import() */ 5).then(__webpack_require__.bind(null, 385));
};

var AppSettingsCustomers = function AppSettingsCustomers() {
  return __webpack_require__.e(/* import() */ 8).then(__webpack_require__.bind(null, 386));
};

var AppSettings = function AppSettings() {
  return __webpack_require__.e(/* import() */ 16).then(__webpack_require__.bind(null, 394));
};


var settingsRoutes = [{
  path: "/settings/",
  component: AppSettings,
  children: [{
    path: "users",
    name: "Users",
    component: AppSettingsUsers,
    meta: {
      role: api_roles["a" /* ApiRoles */].SUPER_ADMIN,
      title: "users",
      subtitle: "users_descr"
    }
  }, {
    path: "customers",
    name: "Customers",
    component: AppSettingsCustomers,
    meta: {
      role: api_roles["a" /* ApiRoles */].SUPER_ADMIN,
      title: "customers",
      subtitle: "customers_descr"
    }
  }]
}];
/* harmony default export */ var settings_routes = (settingsRoutes);
// CONCATENATED MODULE: ./src/app/plant/plant-routes.ts





var AppPlantView = function AppPlantView() {
  return __webpack_require__.e(/* import() */ 3).then(__webpack_require__.bind(null, 382));
};

var AppPlants = function AppPlants() {
  return __webpack_require__.e(/* import() */ 7).then(__webpack_require__.bind(null, 395));
};

var plantRoutes = [{
  name: "Plants",
  path: "/plants",
  component: AppPlants,
  meta: {
    role: api_roles["a" /* ApiRoles */].CUSTOMER_ADMIN
  }
}, {
  name: "Plant",
  path: "/plant/:id",
  component: AppPlantView,
  meta: {
    role: api_roles["a" /* ApiRoles */].CUSTOMER_ADMIN
  }
}];
/* harmony default export */ var plant_routes = (plantRoutes);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1a28fa34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/page-not-found/page-not-found.vue?vue&type=template&id=a36f02ae&
var page_not_foundvue_type_template_id_a36f02ae_render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "app-content",
    {
      attrs: {
        title: "Page not found",
        subtitle: "Where am I?",
        showHeader: _vm.isAuthenticated,
      },
    },
    [
      _c("div", { staticClass: "page-not-found" }, [
        _c("img", {
          attrs: {
            src: "/images/brdrone.png",
            srcset: "/images/brdrone.webp" + ", " + "/images/brdrone.png",
            alt: "page not found",
          },
        }),
      ]),
    ]
  )
}
var page_not_foundvue_type_template_id_a36f02ae_staticRenderFns = []
page_not_foundvue_type_template_id_a36f02ae_render._withStripped = true


// CONCATENATED MODULE: ./src/app/shared/components/page-not-found/page-not-found.vue?vue&type=template&id=a36f02ae&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(69);

// EXTERNAL MODULE: ./src/app/app-state.ts + 3 modules
var app_state = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__(34);

// EXTERNAL MODULE: ./src/app/shared/components/app-content/app-content.vue + 4 modules
var app_content = __webpack_require__(86);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/page-not-found/page-not-found.vue?vue&type=script&lang=ts&








var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var page_not_foundvue_type_script_lang_ts_AppPageNotFound = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(AppPageNotFound, _Vue);

  var _super = Object(createSuper["a" /* default */])(AppPageNotFound);

  function AppPageNotFound() {
    Object(classCallCheck["a" /* default */])(this, AppPageNotFound);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(AppPageNotFound, [{
    key: "isAuthenticated",
    get: function get() {
      return app_state["a" /* default */].getters.auth.isAuthenticated;
    }
  }]);

  return AppPageNotFound;
}(vue_runtime_esm["default"]);

page_not_foundvue_type_script_lang_ts_AppPageNotFound = __decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-page-not-found",
  components: {
    AppContent: app_content["a" /* default */]
  }
})], page_not_foundvue_type_script_lang_ts_AppPageNotFound);
/* harmony default export */ var page_not_foundvue_type_script_lang_ts_ = (page_not_foundvue_type_script_lang_ts_AppPageNotFound);
// CONCATENATED MODULE: ./src/app/shared/components/page-not-found/page-not-found.vue?vue&type=script&lang=ts&
 /* harmony default export */ var page_not_found_page_not_foundvue_type_script_lang_ts_ = (page_not_foundvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/app/shared/components/page-not-found/page-not-found.vue?vue&type=style&index=0&lang=scss&
var page_not_foundvue_type_style_index_0_lang_scss_ = __webpack_require__(250);

// CONCATENATED MODULE: ./src/app/shared/components/page-not-found/page-not-found.vue






/* normalize component */

var page_not_found_component = Object(componentNormalizer["a" /* default */])(
  page_not_found_page_not_foundvue_type_script_lang_ts_,
  page_not_foundvue_type_template_id_a36f02ae_render,
  page_not_foundvue_type_template_id_a36f02ae_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var page_not_found_api; }
page_not_found_component.options.__file = "src/app/shared/components/page-not-found/page-not-found.vue"
/* harmony default export */ var page_not_found = (page_not_found_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1a28fa34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/home.vue?vue&type=template&id=19023b34&
var homevue_type_template_id_19023b34_render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("app-content", { attrs: { title: "" } }, [
    _vm._v(" redirecting... "),
  ])
}
var homevue_type_template_id_19023b34_staticRenderFns = []
homevue_type_template_id_19023b34_render._withStripped = true


// CONCATENATED MODULE: ./src/app/home.vue?vue&type=template&id=19023b34&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(15);

// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/volateq-api.ts + 2 modules
var volateq_api = __webpack_require__(84);

// EXTERNAL MODULE: ./src/app/shared/components/base-auth-component/base-auth-component.ts + 1 modules
var base_auth_component = __webpack_require__(85);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/home.vue?vue&type=script&lang=ts&










var homevue_type_script_lang_ts_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var homevue_type_script_lang_ts_AppHome = /*#__PURE__*/function (_BaseAuthComponent) {
  Object(inherits["a" /* default */])(AppHome, _BaseAuthComponent);

  var _super = Object(createSuper["a" /* default */])(AppHome);

  function AppHome() {
    Object(classCallCheck["a" /* default */])(this, AppHome);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(AppHome, [{
    key: "created",
    value: function () {
      var _created = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var plants;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!this.isSuperAdmin) {
                  _context.next = 5;
                  break;
                }

                this.$router.push({
                  name: "Plants"
                });
                _context.next = 13;
                break;

              case 5:
                if (!this.isPilot) {
                  _context.next = 9;
                  break;
                }

                this.$router.push({
                  name: "Analyses"
                });
                _context.next = 13;
                break;

              case 9:
                _context.next = 11;
                return volateq_api["a" /* default */].getPlants();

              case 11:
                plants = _context.sent;

                if (plants.length > 1) {
                  this.$router.push({
                    name: "Plants"
                  });
                } else if (plants.length === 0) {
                  this.$router.push({
                    name: "Analyses"
                  });
                } else {
                  this.$router.push({
                    name: "Plant",
                    params: {
                      id: plants[0].id
                    }
                  });
                }

              case 13:
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](0);
                this.showError(_context.t0);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 15]]);
      }));

      function created() {
        return _created.apply(this, arguments);
      }

      return created;
    }()
  }]);

  return AppHome;
}(base_auth_component["a" /* BaseAuthComponent */]);

homevue_type_script_lang_ts_AppHome = homevue_type_script_lang_ts_decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-home",
  components: {
    AppContent: app_content["a" /* default */]
  }
})], homevue_type_script_lang_ts_AppHome);
/* harmony default export */ var homevue_type_script_lang_ts_ = (homevue_type_script_lang_ts_AppHome);
// CONCATENATED MODULE: ./src/app/home.vue?vue&type=script&lang=ts&
 /* harmony default export */ var app_homevue_type_script_lang_ts_ = (homevue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/app/home.vue





/* normalize component */

var home_component = Object(componentNormalizer["a" /* default */])(
  app_homevue_type_script_lang_ts_,
  homevue_type_template_id_19023b34_render,
  homevue_type_template_id_19023b34_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var home_api; }
home_component.options.__file = "src/app/home.vue"
/* harmony default export */ var home = (home_component.exports);
// CONCATENATED MODULE: ./src/app/app-routes.ts















vue_runtime_esm["default"].use(vue_router_esm["a" /* default */]);
var appRoutes = [{
  path: "*",
  name: "page-not-found",
  component: page_not_found
}, {
  path: "/",
  name: "Home",
  component: home
}];
var router = new vue_router_esm["a" /* default */]({
  mode: "history",
  routes: [].concat(appRoutes, Object(toConsumableArray["a" /* default */])(auth_routes), Object(toConsumableArray["a" /* default */])(analysis_routes), Object(toConsumableArray["a" /* default */])(settings_routes), Object(toConsumableArray["a" /* default */])(plant_routes))
}); // well... I admit this naming is confusing!
// authRoutes are necessery for the authoriation. There are not auth protected!

var nonAuthProtectRoutes = auth_routes.map(function (a) {
  return a.name;
});
router.beforeEach(function (to, from, next) {
  if (!app_state["a" /* default */].getters.auth.isAuthenticated) {
    if (nonAuthProtectRoutes.indexOf(to.name || "") === -1) {
      next({
        name: "Login"
      });
      return;
    }
  } else {
    var _to$meta;

    if (to.name === "Login") {
      next({
        name: "Home"
      });
      return;
    }

    if ((_to$meta = to.meta) !== null && _to$meta !== void 0 && _to$meta.role && !app_state["a" /* default */].getters.auth.isSuperAdmin) {
      var roles = Array.isArray(to.meta.role) ? to.meta.role : [to.meta.role];

      if (!roles.includes(app_state["a" /* default */].state.auth.role)) {
        next({
          name: "page-not-found"
        });
        return;
      }
    }
  }

  next();
});
/* harmony default export */ var app_routes = (router);
// EXTERNAL MODULE: ./src/app/shared/services/helper/date-helper.ts
var date_helper = __webpack_require__(184);

// CONCATENATED MODULE: ./src/main.ts














vue_runtime_esm["default"].use(esm["a" /* BootstrapVue */]);
vue_runtime_esm["default"].use(icons_plugin["a" /* IconsPlugin */]);
vue_runtime_esm["default"].use(vue_i18n_esm["a" /* default */]);
vue_runtime_esm["default"].use(vuex_esm["a" /* default */]);
vue_runtime_esm["default"].config.productionTip = false;
vue_runtime_esm["default"].mixin({
  methods: Object(objectSpread2["a" /* default */])({}, date_helper["a" /* default */])
});
var i18n = new vue_i18n_esm["a" /* default */]({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: __webpack_require__(251)
  }
});
new vue_runtime_esm["default"]({
  router: app_routes,
  store: app_state["a" /* default */].original,
  i18n: i18n,
  render: function render(h) {
    return h(app);
  }
}).$mount("#app");

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return apiRoleNames; });
/* harmony import */ var _home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55);


var _apiRoleNames;

var ApiRoles;

(function (ApiRoles) {
  ApiRoles[ApiRoles["SUPER_ADMIN"] = 1] = "SUPER_ADMIN";
  ApiRoles[ApiRoles["CUSTOMER_ADMIN"] = 2] = "CUSTOMER_ADMIN";
  ApiRoles[ApiRoles["PILOT"] = 3] = "PILOT";
})(ApiRoles || (ApiRoles = {}));

var apiRoleNames = (_apiRoleNames = {}, Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_apiRoleNames, ApiRoles.SUPER_ADMIN, "SUPER_ADMIN"), Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_apiRoleNames, ApiRoles.CUSTOMER_ADMIN, "CUSTOMER_ADMIN"), Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_apiRoleNames, ApiRoles.PILOT, "PILOT"), _apiRoleNames);

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ moduleActionContext; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ moduleGetterContext; });

// UNUSED EXPORTS: rootActionContext, rootGetterContext

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(67);

// EXTERNAL MODULE: ./node_modules/direct-vuex/dist/direct-vuex.esm.js
var direct_vuex_esm = __webpack_require__(57);

// EXTERNAL MODULE: ./src/app/shared/services/app-storage/app-storage.ts
var app_storage = __webpack_require__(111);

// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/api-roles.ts
var api_roles = __webpack_require__(29);

// CONCATENATED MODULE: ./src/app/auth/auth-state.ts




var key = "auth_token";
var authStore = Object(direct_vuex_esm["b" /* defineModule */])({
  namespaced: true,
  state: function state() {
    return app_storage["a" /* appLocalStorage */].getItem(key) || {
      token: ""
    };
  },
  getters: {
    isAuthenticated: function isAuthenticated() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _moduleGetterContext = moduleGetterContext(args, authStore),
          state = _moduleGetterContext.state;

      return !!state.token;
    },
    isSuperAdmin: function isSuperAdmin() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var _moduleGetterContext2 = moduleGetterContext(args, authStore),
          state = _moduleGetterContext2.state;

      return state.role === api_roles["a" /* ApiRoles */].SUPER_ADMIN;
    },
    isCustomerAdmin: function isCustomerAdmin() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var _moduleGetterContext3 = moduleGetterContext(args, authStore),
          state = _moduleGetterContext3.state;

      return state.role === api_roles["a" /* ApiRoles */].CUSTOMER_ADMIN;
    },
    isPilot: function isPilot() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var _moduleGetterContext4 = moduleGetterContext(args, authStore),
          state = _moduleGetterContext4.state;

      return state.role === api_roles["a" /* ApiRoles */].PILOT;
    }
  },
  mutations: {
    updateToken: function updateToken(state, newState) {
      state.token = newState.token;
      state.role = newState.role;
      state.customer_id = newState.customer_id;
      app_storage["a" /* appLocalStorage */].setItem(key, newState);
    }
  },
  actions: {
    updateToken: function updateToken(context, payload) {
      var _moduleActionContext = moduleActionContext(context, authStore),
          commit = _moduleActionContext.commit;

      commit.updateToken(payload);
    }
  }
});
/* harmony default export */ var auth_state = (authStore);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(55);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(70);

// CONCATENATED MODULE: ./src/app/shared/stores/sidebar.ts








var sidebars = ["analysis", "layer-switcher"];
var SidebarModule = Object(direct_vuex_esm["b" /* defineModule */])({
  state: sidebars.reduce(function (acc, name) {
    return Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, acc), {}, Object(defineProperty["a" /* default */])({}, name, true));
  }, {}),
  mutations: {
    toggle: function toggle(state, _ref) {
      var name = _ref.name;
      SidebarModule.mutations.set(state, {
        name: name,
        state: !state[name]
      });
    },
    set: function set(state, _ref2) {
      var name = _ref2.name,
          sidebarState = _ref2.state;

      if (app_state.state.mobile.mobile) {
        var otherName = sidebars[Math.abs(sidebars.indexOf(name) - 1)];
        state[otherName] = false;
        emit(otherName, false);
      }

      state[name] = sidebarState;
      emit(name, sidebarState);
    },
    setAll: function setAll(state, sidebarState) {
      var _iterator = Object(createForOfIteratorHelper["a" /* default */])(sidebars),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var sidebarName = _step.value;
          SidebarModule.mutations.set(state, {
            name: sidebarName,
            state: sidebarState
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    restore: function restore(state, oldState) {
      state = oldState;
      SidebarEvents.$emit("restore", oldState);
    }
  },
  namespaced: true
});
var SidebarEvents = new vue_runtime_esm["default"]();

var emit = function emit(name, state) {
  return SidebarEvents.$emit("change", {
    name: name,
    state: state
  });
};

/* harmony default export */ var sidebar = (SidebarModule);
// CONCATENATED MODULE: ./src/app/shared/stores/mobile.ts


var query = window.matchMedia("screen and (max-width: 1000px)");
var MobileModule = Object(direct_vuex_esm["b" /* defineModule */])({
  state: {
    mobile: query.matches
  },
  mutations: {
    setMobile_DONTINVOKETHISMANUALLY: function setMobile_DONTINVOKETHISMANUALLY(state, newState) {
      state.mobile = newState;
    }
  },
  namespaced: true
});
query.addEventListener("change", function (e) {
  return app_state.commit.mobile.setMobile_DONTINVOKETHISMANUALLY(e.matches);
});
/* harmony default export */ var mobile = (MobileModule);
// CONCATENATED MODULE: ./src/app/app-state.ts






vue_runtime_esm["default"].use(vuex_esm["a" /* default */]);

var _createDirectStore = Object(direct_vuex_esm["a" /* createDirectStore */])({
  modules: {
    auth: auth_state,
    sidebar: sidebar,
    mobile: mobile
  }
}),
    store = _createDirectStore.store,
    rootActionContext = _createDirectStore.rootActionContext,
    moduleActionContext = _createDirectStore.moduleActionContext,
    rootGetterContext = _createDirectStore.rootGetterContext,
    moduleGetterContext = _createDirectStore.moduleGetterContext; // Export the direct-store instead of the classic Vuex store.


/* harmony default export */ var app_state = __webpack_exports__["a"] = (store);
 // The following lines enable types in the injected store "$store".

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiErrors; });
var ApiErrors;

(function (ApiErrors) {
  ApiErrors["INVALID_TOKEN"] = "INVALID_TOKEN";
  ApiErrors["TOKEN_EXPIRED"] = "TOKEN_EXPIRED";
  ApiErrors["PERMISSION_DENIED"] = "PERMISSION_DENIED";
  ApiErrors["INVALID_CREDENTIALS"] = "INVALID_CREDENTIALS";
  ApiErrors["SOMETHING_WENT_WRONG"] = "SOMETHING_WENT_WRONG";
  ApiErrors["EMAIL_ALREADY_EXISTS"] = "EMAIL_ALREADY_EXISTS";
  ApiErrors["RESOURCE_NOT_FOUND"] = "RESOURCE_NOT_FOUND";
  ApiErrors["BAD_REQUEST"] = "BAD_REQUEST";
})(ApiErrors || (ApiErrors = {}));

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppAlertEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppAlertEventBus; });
/* harmony import */ var _home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31);
/* harmony import */ var _home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(105);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
/* harmony import */ var _volateq_api_api_errors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(47);







var AppAlertEvents;

(function (AppAlertEvents) {
  AppAlertEvents["showAlert"] = "show-alert";
  AppAlertEvents["clearAlert"] = "clear-alert";
})(AppAlertEvents || (AppAlertEvents = {}));

var AppAlertEventBus = /*#__PURE__*/function (_Vue) {
  Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(AppAlertEventBus, _Vue);

  var _super = Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(AppAlertEventBus);

  function AppAlertEventBus() {
    Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, AppAlertEventBus);

    return _super.apply(this, arguments);
  }

  Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(AppAlertEventBus, [{
    key: "on",
    value: function on(alertEvent, callbackFn) {
      this.$on(alertEvent, callbackFn);
    }
  }, {
    key: "emit",
    value: function emit(alertEvent) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.$emit.apply(this, [alertEvent].concat(args));
    }
  }, {
    key: "onShowAlert",
    value: function onShowAlert(callbackFn) {
      this.$on(AppAlertEvents.showAlert, callbackFn);
    }
  }, {
    key: "onClearAlert",
    value: function onClearAlert(callbackFn) {
      this.$on(AppAlertEvents.clearAlert, callbackFn);
    }
  }, {
    key: "showErrorAlert",
    value: function showErrorAlert(msg, id) {
      this.showAlert({
        msg: msg,
        variant: "danger",
        id: id
      });
    }
  }, {
    key: "showSuccessAlert",
    value: function showSuccessAlert(msg, id) {
      this.showAlert({
        msg: msg,
        variant: "success",
        id: id
      });
    }
  }, {
    key: "showInfoAlert",
    value: function showInfoAlert(msg, id) {
      this.showAlert({
        msg: msg,
        variant: "info",
        id: id
      });
    }
  }, {
    key: "showWarningAlert",
    value: function showWarningAlert(msg, id) {
      this.showAlert({
        msg: msg,
        variant: "warning",
        id: id
      });
    }
  }, {
    key: "showAlert",
    value: function showAlert(appAlert) {
      this.$emit(AppAlertEvents.showAlert, appAlert);
    }
  }, {
    key: "showError",
    value: function showError(error) {
      console.error(error);

      if (error && error.error) {
        this.showErrorAlert(error.error + (error.message && "<br><small>" + error.message + "</small>" || ""));
      } else {
        this.showErrorAlert(_volateq_api_api_errors__WEBPACK_IMPORTED_MODULE_6__[/* ApiErrors */ "a"].SOMETHING_WENT_WRONG);
      }
    }
  }, {
    key: "clearAlert",
    value: function clearAlert() {
      this.$emit(AppAlertEvents.clearAlert);
    }
  }]);

  return AppAlertEventBus;
}(vue__WEBPACK_IMPORTED_MODULE_5__["default"]);

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: VolateqAPI

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(105);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(104);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(101);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__(196);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__(172);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__(135);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find-index.js
var es_array_find_index = __webpack_require__(193);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__(132);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(25);

// EXTERNAL MODULE: ./src/app/app-state.ts + 3 modules
var app_state = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(136);

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(186);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./src/environment/environment.ts
var _process$env = Object({"VUE_APP_BASE_URL":"https://app.volateq.de","VUE_APP_API_BASE_URL":"https://api.volateq.de","NODE_ENV":"PRODUCTION","BASE_URL":"/"}),
    VUE_APP_BASE_URL = _process$env.VUE_APP_BASE_URL,
    VUE_APP_API_BASE_URL = _process$env.VUE_APP_API_BASE_URL,
    _process$env$NODE_ENV = _process$env.NODE_ENV,
    NODE_ENV = _process$env$NODE_ENV === void 0 ? "" : _process$env$NODE_ENV;
var environment = NODE_ENV.toLowerCase();
var baseUrl = VUE_APP_BASE_URL;
var apiBaseUrl = VUE_APP_API_BASE_URL;

// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/api-errors.ts
var api_errors = __webpack_require__(47);

// CONCATENATED MODULE: ./src/app/shared/services/volateq-api/http-client-base.ts













var http_client_base_HttpClientBase = /*#__PURE__*/function () {
  function HttpClientBase() {
    Object(classCallCheck["a" /* default */])(this, HttpClientBase);

    this.baseURL = apiBaseUrl;
    this.httpClient = HttpClientBase.createAuthHttpClient(this.baseURL);
    this.httpClient.interceptors.response.use(function (response) {
      return response.data;
    }, function (error) {
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error === api_errors["a" /* ApiErrors */].INVALID_TOKEN || error.response.data.error === api_errors["a" /* ApiErrors */].TOKEN_EXPIRED) {
          app_state["a" /* default */].dispatch.auth.updateToken({
            token: "",
            role: undefined,
            customer_id: undefined
          });
          location.reload();
        }

        return Promise.reject(error.response.data);
      }

      console.error("FATAL");
      console.error(error);
      return Promise.reject({
        error: api_errors["a" /* ApiErrors */].SOMETHING_WENT_WRONG,
        message: "Ooops! Something went horribly wrong!"
      });
    });
  }

  Object(createClass["a" /* default */])(HttpClientBase, [{
    key: "postForm",
    value: function () {
      var _postForm = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(url, data) {
        var formData, key, value, _iterator, _step, item;

        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                formData = new FormData();

                for (key in data) {
                  value = data[key];

                  if (Array.isArray(value)) {
                    _iterator = Object(createForOfIteratorHelper["a" /* default */])(value);

                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        item = _step.value;
                        formData.append(key, item);
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }
                  } else {
                    formData.append(key, value);
                  }
                }

                return _context.abrupt("return", this.httpClient.post(url, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function postForm(_x, _x2) {
        return _postForm.apply(this, arguments);
      }

      return postForm;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(url, data, config, params) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.httpClient.post(this.getUrl(url, params), data, config));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function post(_x3, _x4, _x5, _x6) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(url, params, config) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.httpClient.get(this.getUrl(url, params), config));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function get(_x7, _x8, _x9) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4(url, config) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.httpClient.delete(url, config));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _delete(_x10, _x11) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "getUrl",
    value: function getUrl(url, params) {
      return url + (params && this.getQueryParams(params) || "");
    }
  }, {
    key: "getQueryParams",
    value: function getQueryParams(params) {
      return "?" + Object.keys(params).map(function (key) {
        return key + "=" + encodeURIComponent(params[key]);
      }).join("&");
    }
  }], [{
    key: "createAuthHttpClient",
    value: function createAuthHttpClient(baseURL) {
      var httpClient = axios_default.a.create({
        baseURL: baseURL
      });
      httpClient.interceptors.request.use(function (config) {
        if (app_state["a" /* default */].getters.auth.isAuthenticated) {
          config.headers = {
            Authorization: "Bearer ".concat(app_state["a" /* default */].state.auth.token)
          };
        }

        return config;
      });
      return httpClient;
    }
  }]);

  return HttpClientBase;
}();
// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/api-key-figures.ts
var api_key_figures = __webpack_require__(107);

// CONCATENATED MODULE: ./src/app/shared/services/volateq-api/volateq-api.ts






















var volateq_api_VolateqAPI = /*#__PURE__*/function (_HttpClientBase) {
  Object(inherits["a" /* default */])(VolateqAPI, _HttpClientBase);

  var _super = Object(createSuper["a" /* default */])(VolateqAPI);

  function VolateqAPI() {
    Object(classCallCheck["a" /* default */])(this, VolateqAPI);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(VolateqAPI, [{
    key: "login",
    value:
    /**
     * @returns confirmation_key if user logs in with an unkown host, else undefined.
     */
    function () {
      var _login = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee(email, password) {
        var confirmLoginResult;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.post("/auth/login", {}, {
                  auth: {
                    username: email,
                    password: password
                  }
                });

              case 2:
                confirmLoginResult = _context.sent;
                return _context.abrupt("return", confirmLoginResult.confirmation_key);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "isLoggedIn",
    value: function () {
      var _isLoggedIn = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        var pong;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!app_state["a" /* default */].getters.auth.isAuthenticated) {
                  _context2.next = 12;
                  break;
                }

                _context2.prev = 1;
                _context2.next = 4;
                return this.get("/auth/ping");

              case 4:
                pong = _context2.sent;

                if (!pong.pong) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", true);

              case 7:
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", false);

              case 12:
                return _context2.abrupt("return", false);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 9]]);
      }));

      function isLoggedIn() {
        return _isLoggedIn.apply(this, arguments);
      }

      return isLoggedIn;
    }()
  }, {
    key: "confirmLogin",
    value: function () {
      var _confirmLogin = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(confirmationKey, securityCode) {
        var tokenResult;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.post("/confirm-login/".concat(confirmationKey), {
                  security_code: securityCode
                });

              case 2:
                tokenResult = _context3.sent;
                _context3.next = 5;
                return app_state["a" /* default */].dispatch.auth.updateToken({
                  token: tokenResult.token,
                  role: tokenResult.role,
                  customer_id: tokenResult.customer_id
                });

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function confirmLogin(_x3, _x4) {
        return _confirmLogin.apply(this, arguments);
      }

      return confirmLogin;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.post("/auth/logout");

              case 2:
                _context4.next = 4;
                return app_state["a" /* default */].dispatch.auth.updateToken({
                  token: "",
                  role: undefined,
                  customer_id: undefined
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function logout() {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
  }, {
    key: "getUsers",
    value: function () {
      var _getUsers = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5(customerId) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.get("/auth/users", customerId ? {
                  customer_id: customerId
                } : undefined));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getUsers(_x5) {
        return _getUsers.apply(this, arguments);
      }

      return getUsers;
    }()
  }, {
    key: "inviteUser",
    value: function () {
      var _inviteUser = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee6(user) {
        var confirmKey;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.post("/auth/user", user);

              case 2:
                confirmKey = _context6.sent.confirmation_key;
                return _context6.abrupt("return", "".concat(baseUrl, "/confirm/").concat(confirmKey));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function inviteUser(_x6) {
        return _inviteUser.apply(this, arguments);
      }

      return inviteUser;
    }()
  }, {
    key: "assignPlantsToUser",
    value: function () {
      var _assignPlantsToUser = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee7(userId, plantIds) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.post("/auth/user/".concat(userId, "/assign-plants"), {
                  plant_ids: plantIds
                });

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function assignPlantsToUser(_x7, _x8) {
        return _assignPlantsToUser.apply(this, arguments);
      }

      return assignPlantsToUser;
    }()
  }, {
    key: "changeUserRole",
    value: function () {
      var _changeUserRole = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee8(userId, roleId) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.post("/auth/user/".concat(userId, "/change-role"), {
                  role_id: roleId
                });

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function changeUserRole(_x9, _x10) {
        return _changeUserRole.apply(this, arguments);
      }

      return changeUserRole;
    }()
  }, {
    key: "getInvitedUser",
    value: function () {
      var _getInvitedUser = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee9(confirmKey) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", this.get("/confirm/".concat(confirmKey)));

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getInvitedUser(_x11) {
        return _getInvitedUser.apply(this, arguments);
      }

      return getInvitedUser;
    }()
  }, {
    key: "registerUser",
    value: function () {
      var _registerUser = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee10(confirmKey, user) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.post("/confirm/".concat(confirmKey), user);

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function registerUser(_x12, _x13) {
        return _registerUser.apply(this, arguments);
      }

      return registerUser;
    }()
  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee11(userId) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.delete("/auth/user/".concat(userId, "/delete"));

              case 2:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function deleteUser(_x14) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }()
  }, {
    key: "getRoutes",
    value: function () {
      var _getRoutes = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee12() {
        var params,
            _args12 = arguments;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                params = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : undefined;
                return _context12.abrupt("return", this.get("/auth/routes", params));

              case 2:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getRoutes() {
        return _getRoutes.apply(this, arguments);
      }

      return getRoutes;
    }()
  }, {
    key: "createAnalysis",
    value: function () {
      var _createAnalysis = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee13(newAnalyis) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                return _context13.abrupt("return", this.post("/auth/analysis", newAnalyis));

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function createAnalysis(_x15) {
        return _createAnalysis.apply(this, arguments);
      }

      return createAnalysis;
    }()
  }, {
    key: "getAllAnalysis",
    value: function () {
      var _getAllAnalysis = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee14(queryParams) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                return _context14.abrupt("return", this.get("/auth/analysis", queryParams));

              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function getAllAnalysis(_x16) {
        return _getAllAnalysis.apply(this, arguments);
      }

      return getAllAnalysis;
    }()
  }, {
    key: "getAnalysis",
    value: function getAnalysis(analysisId) {
      return this.get("/auth/analysis/".concat(analysisId));
    }
  }, {
    key: "getAnalysisFileUploadUrl",
    value: function getAnalysisFileUploadUrl(analysisId) {
      return "".concat(this.baseURL, "/auth/analysis/").concat(analysisId, "/file");
    }
  }, {
    key: "updateAnalysisState",
    value: function () {
      var _updateAnalysisState = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee15(analysisId, analysisState) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return this.post("/auth/analysis/".concat(analysisId, "/state"), analysisState);

              case 2:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function updateAnalysisState(_x17, _x18) {
        return _updateAnalysisState.apply(this, arguments);
      }

      return updateAnalysisState;
    }()
  }, {
    key: "deleteAnalysis",
    value: function () {
      var _deleteAnalysis = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee16(analysisId) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return this.delete("/auth/analysis/".concat(analysisId));

              case 2:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function deleteAnalysis(_x19) {
        return _deleteAnalysis.apply(this, arguments);
      }

      return deleteAnalysis;
    }()
  }, {
    key: "getAnalysisFileDownloadUrl",
    value: function getAnalysisFileDownloadUrl(analysisId, fileName) {
      return this.get("/auth/analysis/".concat(analysisId, "/file/").concat(fileName));
    }
  }, {
    key: "forgotPassword",
    value: function forgotPassword(email) {
      return this.post("/forgot-password", {
        email: email
      });
    }
  }, {
    key: "confirmPasswordReset",
    value: function confirmPasswordReset(confirmationKey) {
      return this.get("/reset-password/".concat(confirmationKey));
    }
  }, {
    key: "resetPassword",
    value: function resetPassword(confirmationKey, new_password, new_password_repeat) {
      return this.post("/reset-password/".concat(confirmationKey), {
        new_password: new_password,
        new_password_repeat: new_password_repeat
      });
    }
  }, {
    key: "importAnalysisResult",
    value: function () {
      var _importAnalysisResult = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee17(jsonFile, analysisId, imageFiles, uploadProgressCallback) {
        var fileData, task;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                fileData = {
                  json_file: jsonFile
                };

                if (imageFiles) {
                  fileData["image_filenames"] = imageFiles.map(function (file) {
                    return file.name;
                  });
                }

                _context17.next = 4;
                return this.postForm("/auth/import-analysis-result/".concat(analysisId), fileData);

              case 4:
                task = _context17.sent;

                if (!imageFiles) {
                  _context17.next = 15;
                  break;
                }

                _context17.prev = 6;
                _context17.next = 9;
                return this.uploadImportAnalysisResultImageFiles(analysisId, imageFiles, uploadProgressCallback);

              case 9:
                _context17.next = 15;
                break;

              case 11:
                _context17.prev = 11;
                _context17.t0 = _context17["catch"](6);

                if (!(!_context17.t0.error || _context17.t0.error !== api_errors["a" /* ApiErrors */].BAD_REQUEST)) {
                  _context17.next = 15;
                  break;
                }

                throw _context17.t0;

              case 15:
                return _context17.abrupt("return", task);

              case 16:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[6, 11]]);
      }));

      function importAnalysisResult(_x20, _x21, _x22, _x23) {
        return _importAnalysisResult.apply(this, arguments);
      }

      return importAnalysisResult;
    }()
  }, {
    key: "prepareAnalysisUpload",
    value: function () {
      var _prepareAnalysisUpload = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee18(analysisId, fileNames) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return this.post("/auth/analysis/".concat(analysisId, "/prepare-upload"), {
                  files: fileNames
                });

              case 2:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function prepareAnalysisUpload(_x24, _x25) {
        return _prepareAnalysisUpload.apply(this, arguments);
      }

      return prepareAnalysisUpload;
    }()
  }, {
    key: "cancelAnalysisUpload",
    value: function () {
      var _cancelAnalysisUpload = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee19(analysisId) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return this.post("/auth/analysis/".concat(analysisId, "/cancel-upload"));

              case 2:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function cancelAnalysisUpload(_x26) {
        return _cancelAnalysisUpload.apply(this, arguments);
      }

      return cancelAnalysisUpload;
    }()
  }, {
    key: "updateAnalysis",
    value: function () {
      var _updateAnalysis = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee20(analysisId, updateData) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return this.post("/auth/analysis/".concat(analysisId), updateData);

              case 2:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function updateAnalysis(_x27, _x28) {
        return _updateAnalysis.apply(this, arguments);
      }

      return updateAnalysis;
    }()
  }, {
    key: "uploadImportAnalysisResultImageFiles",
    value: function () {
      var _uploadImportAnalysisResultImageFiles = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee21(analysisId, imageFiles, uploadProgressCallback) {
        var imagesFilesToUpload;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                imagesFilesToUpload = imageFiles.slice();

              case 1:
                if (!(imagesFilesToUpload.length > 0)) {
                  _context21.next = 7;
                  break;
                }

                _context21.next = 4;
                return this.postForm("/auth/import-analysis-result/".concat(analysisId, "/upload-images"), {
                  // Only upload 50 files simultaneously to avoid 504 (Gateway timout)
                  image_files: imagesFilesToUpload.splice(0, 50)
                });

              case 4:
                uploadProgressCallback && uploadProgressCallback(Math.round((imageFiles.length - imagesFilesToUpload.length) / imageFiles.length * 100));
                _context21.next = 1;
                break;

              case 7:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function uploadImportAnalysisResultImageFiles(_x29, _x30, _x31) {
        return _uploadImportAnalysisResultImageFiles.apply(this, arguments);
      }

      return uploadImportAnalysisResultImageFiles;
    }()
  }, {
    key: "getAnalysisResult",
    value: function () {
      var _getAnalysisResult = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee22(analysisResultId) {
        var analysisResults;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return this.get("/auth/analysis-result/".concat(analysisResultId));

              case 2:
                _context22.t0 = _context22.sent;
                analysisResults = [_context22.t0];
                this.filterKeyFigures(analysisResults);
                return _context22.abrupt("return", analysisResults[0]);

              case 6:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function getAnalysisResult(_x32) {
        return _getAnalysisResult.apply(this, arguments);
      }

      return getAnalysisResult;
    }()
  }, {
    key: "getAllSpecificAnalysisResult",
    value: function getAllSpecificAnalysisResult(analysisResultId, componentId) {
      return this.get("/auth/analysis-result/".concat(analysisResultId, "/").concat(componentId));
    }
  }, {
    key: "getEncodedAnalysisResultFilterParams",
    value: function getEncodedAnalysisResultFilterParams(filterParams) {
      var encodedFilterParams = "";

      if (filterParams) {
        if (filterParams.filters) {
          encodedFilterParams += "&filters=".concat(encodeURIComponent(JSON.stringify(filterParams.filters)));
        }

        if (filterParams.component_filter) {
          encodedFilterParams += "&component_filter=".concat(encodeURIComponent(JSON.stringify(filterParams.component_filter)));
        }

        if (filterParams.columns_selection) {
          encodedFilterParams += "&columns_selection=".concat(encodeURIComponent(JSON.stringify(filterParams.columns_selection)));
        }
      }

      return encodedFilterParams;
    }
  }, {
    key: "getSpecificAnalysisResult",
    value: function getSpecificAnalysisResult(analysisResultId, componentId, params, filterParams) {
      return this.get("/auth/analysis-result/".concat(analysisResultId, "/").concat(componentId).concat(this.getQueryParams(params)).concat(this.getEncodedAnalysisResultFilterParams(filterParams)));
    }
  }, {
    key: "getSpecificAnalysisResultCsvUrl",
    value: function getSpecificAnalysisResultCsvUrl(analysisResultId, componentId, params, filterParams, csvMappings) {
      var encodedCsvMappings = csvMappings && "&csv_mappings=".concat(encodeURIComponent(this.getQueryParams(csvMappings).substring(1))) || "";
      return "".concat(apiBaseUrl, "/auth/analysis-result/").concat(analysisResultId, "/").concat(componentId).concat(this.getQueryParams(params), "&csv=1").concat(encodedCsvMappings).concat(this.getEncodedAnalysisResultFilterParams(filterParams));
    }
  }, {
    key: "getSpecificAnalysisResultCompared",
    value: function getSpecificAnalysisResultCompared(analysisResultId, componentId, compareAnalysisResultId, params, filterParams) {
      return this.get("/auth/analysis-result/compare/".concat(analysisResultId, "/").concat(componentId, "/").concat(compareAnalysisResultId).concat(this.getQueryParams(params)).concat(this.getEncodedAnalysisResultFilterParams(filterParams)));
    }
  }, {
    key: "getAnalysisResultHistory",
    value: function getAnalysisResultHistory(plantId, componentId, params, filterParams) {
      return this.get("/auth/analysis-results/history/".concat(plantId, "/").concat(componentId).concat(this.getQueryParams(params), "\n      ").concat(this.getEncodedAnalysisResultFilterParams(filterParams)));
    }
  }, {
    key: "generateDownloadUrl",
    value: function () {
      var _generateDownloadUrl = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee23(downloadUrl) {
        var encodedUrl, urlTokenResponse;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                encodedUrl = encodeURIComponent(encodeURIComponent(downloadUrl));
                _context23.next = 3;
                return this.get("/auth/user/generate-url-token/".concat(encodedUrl));

              case 3:
                urlTokenResponse = _context23.sent;
                return _context23.abrupt("return", "".concat(downloadUrl, "&url_token=").concat(encodeURIComponent(urlTokenResponse.url_token)));

              case 5:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function generateDownloadUrl(_x33) {
        return _generateDownloadUrl.apply(this, arguments);
      }

      return generateDownloadUrl;
    }()
  }, {
    key: "getTask",
    value: function getTask(taskId) {
      return this.get("/auth/task/".concat(taskId));
    }
  }, {
    key: "getAnalysisResultFiles",
    value: function getAnalysisResultFiles(analysisResultId) {
      return this.get("/auth/analysis-result/".concat(analysisResultId, "/files"));
    }
  }, {
    key: "deleteAnalysisResult",
    value: function deleteAnalysisResult(analysisResultId) {
      return this.delete("/auth/analysis-result/".concat(analysisResultId));
    }
  }, {
    key: "resendSecurityCode",
    value: function () {
      var _resendSecurityCode = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee24(confirmationKey) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return this.post("/confirm-login-resend/".concat(confirmationKey), {});

              case 2:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function resendSecurityCode(_x34) {
        return _resendSecurityCode.apply(this, arguments);
      }

      return resendSecurityCode;
    }()
  }, {
    key: "getPlant",
    value: function getPlant(plantId) {
      return this.get("/auth/plant/".concat(plantId));
    }
  }, {
    key: "getComponentsGeoVisual",
    value: function getComponentsGeoVisual(plantId, componentIds) {
      return this.get("/auth/geo-visual/".concat(plantId, "/components"), {
        ids: componentIds
      });
    }
  }, {
    key: "getKeyFiguresGeoVisual",
    value: function getKeyFiguresGeoVisual(plantId, analysisResultId, keyFiguresId, query_params) {
      return this.get("/auth/geo-visual/".concat(plantId, "/").concat(analysisResultId, "/key-figure/").concat(keyFiguresId), query_params);
    }
  }, {
    key: "getKeyFiguresGeoVisualCompare",
    value: function getKeyFiguresGeoVisualCompare(plantId, analysisResultId, compareAnalysisResultId, keyFiguresId, query_params) {
      return this.get("/auth/geo-visual/compare/".concat(plantId, "/").concat(analysisResultId, "/").concat(compareAnalysisResultId, "/key-figure/").concat(keyFiguresId), query_params);
    }
  }, {
    key: "getAnalysisResults",
    value: function () {
      var _getAnalysisResults = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee25(plantId) {
        var analysisResults;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return this.get("/auth/plant/".concat(plantId, "/analysis-results"));

              case 2:
                analysisResults = _context25.sent;
                this.filterKeyFigures(analysisResults);
                return _context25.abrupt("return", analysisResults);

              case 5:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function getAnalysisResults(_x35) {
        return _getAnalysisResults.apply(this, arguments);
      }

      return getAnalysisResults;
    }()
  }, {
    key: "importFieldgeometry",
    value: function importFieldgeometry(file, plantId, clearBefore) {
      return this.postForm("/auth/fieldgeometry/".concat(plantId, "?clear_before=").concat(clearBefore), {
        file: file
      });
    }
  }, {
    key: "waitForTask",
    value: function waitForTask(taskId, finished, info) {
      var _this = this;

      var interval = setInterval( /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee26() {
        var task, infoMessage;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return _this.getTask(taskId);

              case 2:
                task = _context26.sent;

                if (task.state === "SUCCESS" || task.state === "FAILURE") {
                  clearInterval(interval);
                  finished(task);
                } else {
                  if (info) {
                    if (task.info && task.info.infos && task.info.infos.length > 0) {
                      infoMessage = ">" + task.info.infos.join("<br>>") + (task.info.max_steps && "... (".concat(task.info.current_step, "/").concat(task.info.max_steps, ")") || "...");
                      info(infoMessage, task);
                    } else {
                      info("Wait for start...", task);
                    }
                  }
                }

              case 4:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26);
      })), 3000);
    }
  }, {
    key: "resendUserInvitation",
    value: function resendUserInvitation(userId) {
      return this.post("/auth/user/".concat(userId, "/resend-invitation"));
    }
  }, {
    key: "unLockUser",
    value: function unLockUser(userId, lock) {
      return this.post("/auth/user/".concat(userId, "/un-lock"), {
        lock: lock
      });
    }
  }, {
    key: "updateAnalysisResult",
    value: function updateAnalysisResult(analysisResultId, updates) {
      return this.post("/auth/analysis-result/".concat(analysisResultId), updates);
    }
  }, {
    key: "getPlants",
    value: function getPlants() {
      var withAnalysisResultsCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var customerId = arguments.length > 1 ? arguments[1] : undefined;
      return this.get("/auth/plants", {
        with_analysis_results_count: withAnalysisResultsCount ? 1 : 0,
        customer_id: customerId
      });
    }
  }, {
    key: "getAnalysisResultFileUrl",
    value: function getAnalysisResultFileUrl(analysisResultFileId) {
      return this.get("/auth/analysis-result/result-file/".concat(analysisResultFileId));
    }
  }, {
    key: "getFieldgeometryFileUrl",
    value: function getFieldgeometryFileUrl(fieldgeometryId) {
      return this.get("/auth/fieldgeometry/".concat(fieldgeometryId, "/file-url"));
    }
  }, {
    key: "downloadMultipleAnalysisFilesUrl",
    value: function downloadMultipleAnalysisFilesUrl(analysisId, filenames) {
      return this.getUrl("".concat(apiBaseUrl, "/auth/analysis/").concat(analysisId, "/files-download"), {
        filenames: filenames
      });
    }
  }, {
    key: "getAnalysisFilesInfo",
    value: function getAnalysisFilesInfo(analysisId, filenames) {
      return this.get("/auth/analysis/".concat(analysisId, "/files-info"), {
        filenames: filenames
      });
    }
  }, {
    key: "getStates",
    value: function getStates() {
      return this.get("/auth/states");
    }
  }, {
    key: "updatePlant",
    value: function updatePlant(plantId, updatePlantRequest) {
      return this.post("/auth/plant/".concat(plantId), updatePlantRequest);
    }
  }, {
    key: "validatePlantMetadata",
    value: function validatePlantMetadata(analysisId) {
      var startServer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return this.get("/auth/analysis/".concat(analysisId, "/validate-plant-metadata"), {
        start_server: startServer ? 1 : 0
      });
    }
  }, {
    key: "runQFlyWizard",
    value: function runQFlyWizard(analysisId) {
      var startServer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return this.get("/auth/analysis/".concat(analysisId, "/run-qfly-wizard"), {
        start_server: startServer ? 1 : 0
      });
    }
  }, {
    key: "getAnalysisMonitoring",
    value: function getAnalysisMonitoring() {
      return this.get("/auth/analysis-monitoring");
    }
  }, {
    key: "getFieldgeometryComponentCodes",
    value: function getFieldgeometryComponentCodes(fieldgeometryId, componentId) {
      return this.get("/auth/fieldgeometry/".concat(fieldgeometryId, "/").concat(componentId, "/component-codes"));
    }
  }, {
    key: "getCustomers",
    value: function getCustomers() {
      return this.get("/auth/customers");
    }
  }, {
    key: "createCustomer",
    value: function () {
      var _createCustomer = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee27(customerRequest) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.next = 2;
                return this.post("/auth/customer", customerRequest);

              case 2:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function createCustomer(_x36) {
        return _createCustomer.apply(this, arguments);
      }

      return createCustomer;
    }()
  }, {
    key: "updateCustomer",
    value: function () {
      var _updateCustomer = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee28(customerId, customerRequest) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _context28.next = 2;
                return this.post("/auth/customer/".concat(customerId), customerRequest);

              case 2:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function updateCustomer(_x37, _x38) {
        return _updateCustomer.apply(this, arguments);
      }

      return updateCustomer;
    }()
  }, {
    key: "deleteCustomer",
    value: function () {
      var _deleteCustomer = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee29(customerId) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return this.delete("/auth/customer/".concat(customerId));

              case 2:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));

      function deleteCustomer(_x39) {
        return _deleteCustomer.apply(this, arguments);
      }

      return deleteCustomer;
    }()
  }, {
    key: "getTechnologies",
    value: function () {
      var _getTechnologies = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee30() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                _context30.next = 2;
                return this.get("/auth/technologies");

              case 2:
                return _context30.abrupt("return", _context30.sent);

              case 3:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      function getTechnologies() {
        return _getTechnologies.apply(this, arguments);
      }

      return getTechnologies;
    }()
  }, {
    key: "createPlant",
    value: function () {
      var _createPlant = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee31(createPlantRequest) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.next = 2;
                return this.post("/auth/plant", createPlantRequest);

              case 2:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));

      function createPlant(_x40) {
        return _createPlant.apply(this, arguments);
      }

      return createPlant;
    }()
  }, {
    key: "deletePlant",
    value: function () {
      var _deletePlant = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee32(plantId) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.next = 2;
                return this.delete("/auth/plant/".concat(plantId));

              case 2:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));

      function deletePlant(_x41) {
        return _deletePlant.apply(this, arguments);
      }

      return deletePlant;
    }()
  }, {
    key: "filterKeyFigures",
    value: function filterKeyFigures(analysisResults) {
      // Temporary special case for IR_INTENSITY: Replaced by GLASS_TUBE_TEMPERATURE
      var _iterator = Object(createForOfIteratorHelper["a" /* default */])(analysisResults),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var analysisResult = _step.value;
          var ir_intensity_index = analysisResult.key_figures.findIndex(function (keyFigure) {
            return keyFigure.id === api_key_figures["a" /* ApiKeyFigure */].IR_INTENSITY_ID;
          });

          if (ir_intensity_index != -1 && analysisResult.key_figures.find(function (keyFigure) {
            return keyFigure.id === api_key_figures["a" /* ApiKeyFigure */].GLASS_TUBE_TEMPERATURE_ID;
          })) {
            analysisResult.key_figures.splice(ir_intensity_index, 1);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return VolateqAPI;
}(http_client_base_HttpClientBase);
var volateqApi = new volateq_api_VolateqAPI();
/* harmony default export */ var volateq_api = __webpack_exports__["a"] = (volateqApi);

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ base_auth_component_BaseAuthComponent; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(189);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(17);

// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/api-errors.ts
var api_errors = __webpack_require__(47);

// CONCATENATED MODULE: ./src/app/shared/components/base-component/base-component.ts








var base_component_BaseComponent = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(BaseComponent, _Vue);

  var _super = Object(createSuper["a" /* default */])(BaseComponent);

  function BaseComponent() {
    Object(classCallCheck["a" /* default */])(this, BaseComponent);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(BaseComponent, [{
    key: "showError",
    value: function showError(e) {
      console.error(e);
      var toastContent;

      if (e.error) {
        var error = e;
        toastContent = this.$createElement("p", {}, [error.error, this.$createElement("br"), error.message && this.$createElement("small", {}, error.message) || ""]);
      } else if (e instanceof Error) {
        toastContent = this.$createElement("p", {}, e.toString());
      } else if (typeof e === "string") {
        toastContent = e;
      } else {
        toastContent = this.$createElement("p", {}, api_errors["a" /* ApiErrors */].SOMETHING_WENT_WRONG);
      }

      this.$bvToast.toast(" ", {
        title: toastContent,
        variant: "danger",
        bodyClass: "base-toast-body",
        headerClass: "base-toast-header",
        toaster: "b-toaster-bottom-center",
        solid: true,
        noAutoHide: true
      });
    }
  }, {
    key: "showSuccess",
    value: function showSuccess(msg) {
      this.$bvToast.toast(" ", {
        title: msg,
        variant: "success",
        bodyClass: "base-toast-body",
        headerClass: "base-toast-header",
        toaster: "b-toaster-bottom-center",
        solid: true
      });
    }
  }]);

  return BaseComponent;
}(vue_runtime_esm["default"]);
// CONCATENATED MODULE: ./src/app/shared/components/base-auth-component/base-auth-component.ts







var base_auth_component_BaseAuthComponent = /*#__PURE__*/function (_BaseComponent) {
  Object(inherits["a" /* default */])(BaseAuthComponent, _BaseComponent);

  var _super = Object(createSuper["a" /* default */])(BaseAuthComponent);

  function BaseAuthComponent() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, BaseAuthComponent);

    _this = _super.apply(this, arguments);
    _this.isCreated = false;
    return _this;
  }

  Object(createClass["a" /* default */])(BaseAuthComponent, [{
    key: "created",
    value: function () {
      var _created = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.isCreated = true;

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function created() {
        return _created.apply(this, arguments);
      }

      return created;
    }()
  }, {
    key: "isSuperAdmin",
    get: function get() {
      return this.$store.getters["auth/isSuperAdmin"];
    }
  }, {
    key: "isCustomerAdmin",
    get: function get() {
      return this.$store.getters["auth/isCustomerAdmin"];
    }
  }, {
    key: "isPilot",
    get: function get() {
      return this.$store.getters["auth/isPilot"];
    }
  }]);

  return BaseAuthComponent;
}(base_component_BaseComponent);

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1a28fa34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-content/app-content.vue?vue&type=template&id=ff1d1ff6&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.showHeader ? _c("app-header") : _vm._e(),
      _c(
        "div",
        { staticClass: "app-content" },
        [
          _c("b-container", [
            _vm.navback
              ? _c(
                  "div",
                  { staticClass: "app-content-navback" },
                  [
                    _c(
                      "router-link",
                      { staticClass: "link", attrs: { to: "/analyses" } },
                      [
                        _c("b-icon", { attrs: { icon: "chevron-left" } }),
                        _vm._v(" " + _vm._s(_vm.$t("back-to-overview")) + " "),
                      ],
                      1
                    ),
                  ],
                  1
                )
              : _vm._e(),
            _c("div", { staticClass: "app-content-title" }, [
              _c("h1", { domProps: { innerHTML: _vm._s(_vm.title) } }),
              _vm.subtitle
                ? _c("div", {
                    staticClass: "app-content-subtitle grayed",
                    domProps: { innerHTML: _vm._s(_vm.subtitle) },
                  })
                : _vm._e(),
              !_vm.subtitle
                ? _c(
                    "div",
                    { staticClass: "app-content-subtitle grayed" },
                    [_vm._t("subtitle")],
                    2
                  )
                : _vm._e(),
            ]),
            _c(
              "div",
              { staticClass: "app-content-content" },
              [
                _c(
                  "div",
                  { staticClass: "app-content-content-alert" },
                  [
                    _c(
                      "b-alert",
                      {
                        attrs: {
                          variant: _vm.alert.variant,
                          dismissible: "",
                          fade: "",
                        },
                        model: {
                          value: _vm.showAlert,
                          callback: function ($$v) {
                            _vm.showAlert = $$v
                          },
                          expression: "showAlert",
                        },
                      },
                      [
                        _c("div", {
                          domProps: { innerHTML: _vm._s(_vm.alert.msg) },
                        }),
                      ]
                    ),
                  ],
                  1
                ),
                _c(
                  "div",
                  { staticClass: "app-content-content-alert" },
                  [
                    _c(
                      "b-alert",
                      {
                        attrs: {
                          variant: _vm.alertId.variant,
                          dismissible: "",
                          fade: "",
                        },
                        model: {
                          value: _vm.showAlertId,
                          callback: function ($$v) {
                            _vm.showAlertId = $$v
                          },
                          expression: "showAlertId",
                        },
                      },
                      [
                        _c("div", {
                          domProps: { innerHTML: _vm._s(_vm.alertId.msg) },
                        }),
                      ]
                    ),
                  ],
                  1
                ),
                _vm._t("default"),
              ],
              2
            ),
          ]),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/app/shared/components/app-content/app-content.vue?vue&type=template&id=ff1d1ff6&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__(34);

// EXTERNAL MODULE: ./src/app/shared/components/app-header/app-header.vue + 4 modules
var app_header = __webpack_require__(185);

// EXTERNAL MODULE: ./src/app/shared/components/app-content/app-content-event-bus.ts
var app_content_event_bus = __webpack_require__(127);

// EXTERNAL MODULE: ./src/app/shared/services/app-alert/app-alert.ts
var app_alert = __webpack_require__(60);

// EXTERNAL MODULE: ./src/app/shared/components/app-content/app-content-event-service.ts
var app_content_event_service = __webpack_require__(128);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-content/app-content.vue?vue&type=script&lang=ts&








var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var app_contentvue_type_script_lang_ts_AppContent = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(AppContent, _Vue);

  var _super = Object(createSuper["a" /* default */])(AppContent);

  function AppContent() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, AppContent);

    _this = _super.apply(this, arguments);
    _this.alert = {
      msg: "",
      variant: "info"
    };
    _this.alertId = {
      msg: "",
      variant: "info"
    };
    _this.showAlert = false;
    _this.showAlertId = false;
    return _this;
  }

  Object(createClass["a" /* default */])(AppContent, [{
    key: "created",
    value: function created() {
      var _this2 = this;

      if (this.eventId) {
        app_content_event_service["a" /* AppContentEventService */].on(this.eventId, app_alert["b" /* AppAlertEvents */].showAlert, function (alert) {
          _this2.alertId = alert;
          _this2.showAlertId = true;
        });
        app_content_event_service["a" /* AppContentEventService */].on(this.eventId, app_alert["b" /* AppAlertEvents */].clearAlert, function () {
          _this2.showAlertId = false;
        });
      }

      app_content_event_bus["a" /* default */].onShowAlert(function (newAlert) {
        _this2.alert = newAlert;
        _this2.showAlert = true;
      });
      app_content_event_bus["a" /* default */].onClearAlert(function () {
        _this2.showAlert = false;
      });
    }
  }]);

  return AppContent;
}(vue_runtime_esm["default"]);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  required: true
})], app_contentvue_type_script_lang_ts_AppContent.prototype, "title", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])()], app_contentvue_type_script_lang_ts_AppContent.prototype, "subtitle", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: false
})], app_contentvue_type_script_lang_ts_AppContent.prototype, "navback", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: true
})], app_contentvue_type_script_lang_ts_AppContent.prototype, "showHeader", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: null
})], app_contentvue_type_script_lang_ts_AppContent.prototype, "eventId", void 0);

app_contentvue_type_script_lang_ts_AppContent = __decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-content",
  components: {
    AppHeader: app_header["a" /* default */]
  }
})], app_contentvue_type_script_lang_ts_AppContent);
/* harmony default export */ var app_contentvue_type_script_lang_ts_ = (app_contentvue_type_script_lang_ts_AppContent);
// CONCATENATED MODULE: ./src/app/shared/components/app-content/app-content.vue?vue&type=script&lang=ts&
 /* harmony default export */ var app_content_app_contentvue_type_script_lang_ts_ = (app_contentvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/app/shared/components/app-content/app-content.vue?vue&type=style&index=0&lang=scss&
var app_contentvue_type_style_index_0_lang_scss_ = __webpack_require__(249);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(43);

// CONCATENATED MODULE: ./src/app/shared/components/app-content/app-content.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  app_content_app_contentvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app/shared/components/app-content/app-content.vue"
/* harmony default export */ var app_content = __webpack_exports__["a"] = (component.exports);

/***/ })

/******/ });