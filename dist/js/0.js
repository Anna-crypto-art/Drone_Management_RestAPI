(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"499a4f47-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-button/app-button.vue?vue&type=template&id=435cb2ae&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "b-button",
    {
      class: _vm.cls,
      attrs: {
        variant: _vm.variant,
        type: _vm.type,
        disabled: _vm.isDisabled,
        size: _vm.size,
      },
      on: { click: _vm.onClick },
    },
    [
      _c(
        "span",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.loading,
              expression: "loading",
            },
          ],
          staticClass: "app-button-loading",
        },
        [_c("b-spinner", { attrs: { small: "" } })],
        1
      ),
      _vm._t("default"),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/app/shared/components/app-button/app-button.vue?vue&type=template&id=435cb2ae&

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
var es_object_get_own_property_descriptor = __webpack_require__(71);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__(34);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-button/app-button.vue?vue&type=script&lang=ts&








var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var app_buttonvue_type_script_lang_ts_AppButton = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(AppButton, _Vue);

  var _super = Object(createSuper["a" /* default */])(AppButton);

  function AppButton() {
    Object(classCallCheck["a" /* default */])(this, AppButton);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(AppButton, [{
    key: "isDisabled",
    get: function get() {
      return this.loading || this.disabled;
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      this.$emit("click", e);
    }
  }]);

  return AppButton;
}(vue_runtime_esm["default"]);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: "button"
})], app_buttonvue_type_script_lang_ts_AppButton.prototype, "type", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: ""
})], app_buttonvue_type_script_lang_ts_AppButton.prototype, "cls", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: "primary"
})], app_buttonvue_type_script_lang_ts_AppButton.prototype, "variant", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: false
})], app_buttonvue_type_script_lang_ts_AppButton.prototype, "disabled", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: false
})], app_buttonvue_type_script_lang_ts_AppButton.prototype, "loading", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: ""
})], app_buttonvue_type_script_lang_ts_AppButton.prototype, "size", void 0);

app_buttonvue_type_script_lang_ts_AppButton = __decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-button"
})], app_buttonvue_type_script_lang_ts_AppButton);
/* harmony default export */ var app_buttonvue_type_script_lang_ts_ = (app_buttonvue_type_script_lang_ts_AppButton);
// CONCATENATED MODULE: ./src/app/shared/components/app-button/app-button.vue?vue&type=script&lang=ts&
 /* harmony default export */ var app_button_app_buttonvue_type_script_lang_ts_ = (app_buttonvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/app/shared/components/app-button/app-button.vue?vue&type=style&index=0&lang=scss&
var app_buttonvue_type_style_index_0_lang_scss_ = __webpack_require__(256);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(43);

// CONCATENATED MODULE: ./src/app/shared/components/app-button/app-button.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  app_button_app_buttonvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app/shared/components/app-button/app-button.vue"
/* harmony default export */ var app_button = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(255);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ get_get; });

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.get.js
var es_reflect_get = __webpack_require__(285);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(71);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(106);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/superPropBase.js

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = Object(getPrototypeOf["a" /* default */])(object);
    if (object === null) break;
  }

  return object;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/get.js




function get_get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    get_get = Reflect.get.bind();
  } else {
    get_get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }

      return desc.value;
    };
  }

  return get_get.apply(this, arguments);
}

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"499a4f47-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-explanation/app-explanation.vue?vue&type=template&id=e627c376&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    { staticClass: "app-explanation" },
    [
      _c(
        "span",
        { ref: "appExplTarget", staticClass: "app-explanation-container" },
        [_c("b-icon", { attrs: { icon: "question-circle-fill" } })],
        1
      ),
      _c(
        "b-popover",
        {
          attrs: {
            target: function () {
              return _vm.$refs.appExplTarget
            },
            triggers: "hover",
            placement: "top",
          },
        },
        [_vm._t("default")],
        2
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/app/shared/components/app-explanation/app-explanation.vue?vue&type=template&id=e627c376&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(71);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__(34);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-explanation/app-explanation.vue?vue&type=script&lang=ts&








var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var app_explanationvue_type_script_lang_ts_AppExplanation = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(AppExplanation, _Vue);

  var _super = Object(createSuper["a" /* default */])(AppExplanation);

  function AppExplanation() {
    Object(classCallCheck["a" /* default */])(this, AppExplanation);

    return _super.apply(this, arguments);
  }

  return Object(createClass["a" /* default */])(AppExplanation);
}(vue_runtime_esm["default"]);

app_explanationvue_type_script_lang_ts_AppExplanation = __decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-explanation"
})], app_explanationvue_type_script_lang_ts_AppExplanation);
/* harmony default export */ var app_explanationvue_type_script_lang_ts_ = (app_explanationvue_type_script_lang_ts_AppExplanation);
// CONCATENATED MODULE: ./src/app/shared/components/app-explanation/app-explanation.vue?vue&type=script&lang=ts&
 /* harmony default export */ var app_explanation_app_explanationvue_type_script_lang_ts_ = (app_explanationvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/app/shared/components/app-explanation/app-explanation.vue?vue&type=style&index=0&lang=scss&
var app_explanationvue_type_style_index_0_lang_scss_ = __webpack_require__(286);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(43);

// CONCATENATED MODULE: ./src/app/shared/components/app-explanation/app-explanation.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  app_explanation_app_explanationvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app/shared/components/app-explanation/app-explanation.vue"
/* harmony default export */ var app_explanation = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiStates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return apiStateNames; });
/* harmony import */ var _home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55);


var _apiStateNames;

var ApiStates;

(function (ApiStates) {
  ApiStates[ApiStates["UPLOADING"] = 1] = "UPLOADING";
  ApiStates[ApiStates["UPLOAD_FAILED"] = 2] = "UPLOAD_FAILED";
  ApiStates[ApiStates["DATA_INCOMPLETE"] = 3] = "DATA_INCOMPLETE";
  ApiStates[ApiStates["DATA_COMPLETE"] = 4] = "DATA_COMPLETE";
  ApiStates[ApiStates["DATA_COMPLETE_VERIFIED"] = 5] = "DATA_COMPLETE_VERIFIED";
  ApiStates[ApiStates["PROCESSING"] = 6] = "PROCESSING";
  ApiStates[ApiStates["FINISHED"] = 7] = "FINISHED";
})(ApiStates || (ApiStates = {}));

var apiStateNames = (_apiStateNames = {}, Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_apiStateNames, ApiStates.UPLOADING, "UPLOADING"), Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_apiStateNames, ApiStates.UPLOAD_FAILED, "UPLOAD_FAILED"), Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_apiStateNames, ApiStates.DATA_INCOMPLETE, "DATA_INCOMPLETE"), Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_apiStateNames, ApiStates.DATA_COMPLETE, "DATA_COMPLETE"), Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_apiStateNames, ApiStates.DATA_COMPLETE_VERIFIED, "DATA_COMPLETE_VERIFIED"), Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_apiStateNames, ApiStates.PROCESSING, "PROCESSING"), Object(_home_jakry_repos_volateq_volateq_web_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_apiStateNames, ApiStates.FINISHED, "FINISHED"), _apiStateNames);

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalysisEvent; });
var AnalysisEvent;

(function (AnalysisEvent) {
  AnalysisEvent["UPDATE_ANALYSIS"] = "updateAnalysis";
  AnalysisEvent["RUN_ANALYSIS_TASK"] = "runAnalysisTask";
  AnalysisEvent["FINISHED_ANALYSIS_TASK"] = "finishedAnalysisTask";
})(AnalysisEvent || (AnalysisEvent = {}));

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ analysis_event_service_AnalysisEventService; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(105);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(17);

// CONCATENATED MODULE: ./src/app/analysis/shared/analysis-event-bus.ts







var analysis_event_bus_AnalysisEventBus = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(AnalysisEventBus, _Vue);

  var _super = Object(createSuper["a" /* default */])(AnalysisEventBus);

  function AnalysisEventBus() {
    Object(classCallCheck["a" /* default */])(this, AnalysisEventBus);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(AnalysisEventBus, [{
    key: "emit",
    value: function emit(event, args) {
      this.$emit.apply(this, [event].concat(Object(toConsumableArray["a" /* default */])(args)));
    }
  }, {
    key: "on",
    value: function on(event, callbackFn) {
      this.$on(event, callbackFn);
    }
  }]);

  return AnalysisEventBus;
}(vue_runtime_esm["default"]);
// CONCATENATED MODULE: ./src/app/analysis/shared/analysis-event-service.ts



var analysis_event_service_AnalysisEventService = /*#__PURE__*/function () {
  function AnalysisEventService() {
    Object(classCallCheck["a" /* default */])(this, AnalysisEventService);
  }

  Object(createClass["a" /* default */])(AnalysisEventService, null, [{
    key: "getAnalysisEventBus",
    value: function getAnalysisEventBus(analysisId) {
      if (!(analysisId in AnalysisEventService.anaylsisEventBusses)) {
        AnalysisEventService.anaylsisEventBusses[analysisId] = new analysis_event_bus_AnalysisEventBus();
      }

      return AnalysisEventService.anaylsisEventBusses[analysisId];
    }
  }, {
    key: "on",
    value: function on(analysisId, analysisEvent, callbackFn) {
      AnalysisEventService.getAnalysisEventBus(analysisId).on(analysisEvent, callbackFn);
    }
  }, {
    key: "emit",
    value: function emit(analysisId, analysisEvent) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      AnalysisEventService.getAnalysisEventBus(analysisId).emit(analysisEvent, args);
    }
  }]);

  return AnalysisEventService;
}();
analysis_event_service_AnalysisEventService.anaylsisEventBusses = {};

/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(19);
var isObject = __webpack_require__(32);
var anObject = __webpack_require__(35);
var has = __webpack_require__(38);
var getOwnPropertyDescriptorModule = __webpack_require__(65);
var getPrototypeOf = __webpack_require__(109);

// `Reflect.get` method
// https://tc39.github.io/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  if (descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey)) return has(descriptor, 'value')
    ? descriptor.value
    : descriptor.get === undefined
      ? undefined
      : descriptor.get.call(receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

$({ target: 'Reflect', stat: true }, {
  get: get
});


/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_explanation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(281);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_explanation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_explanation_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"499a4f47-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/analysis/shared/analysis-upload.vue?vue&type=template&id=11760b78&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "app-analysis-upload" },
    [
      _c(
        "b-form-checkbox",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.analysis,
              expression: "analysis",
            },
          ],
          attrs: { disabled: !_vm.hasPlantMetadata },
          on: { change: _vm.onChangeDataComplete },
          model: {
            value: _vm.dataComplete,
            callback: function ($$v) {
              _vm.dataComplete = $$v
            },
            expression: "dataComplete",
          },
        },
        [
          _vm._v(" " + _vm._s(_vm.$t("data-complete")) + " "),
          _c("app-explanation", [_vm._v(_vm._s(_vm.dataCompleteMetadataExpl))]),
        ],
        1
      ),
      _vm.uploadService
        ? _c(
            "b-form",
            {
              staticStyle: { margin: "30px 0" },
              on: {
                submit: function ($event) {
                  $event.preventDefault()
                  return _vm.onSubmit($event)
                },
              },
            },
            [
              _vm._t("uploadForm"),
              _c("app-file-upload", {
                ref: "appFileUpload",
                attrs: {
                  uploadService: _vm.uploadService,
                  title: _vm.$t("select-files"),
                },
              }),
              _c(
                "app-button",
                {
                  attrs: {
                    type: "submit",
                    loading: _vm.uploadButtonLoading,
                    disabled: _vm.uploadButtonDisabled,
                    cls: "pull-right",
                  },
                },
                [_vm._v(_vm._s(_vm.uploadButtonTxt))]
              ),
              _c(
                "app-button",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.showCancelButton,
                      expression: "showCancelButton",
                    },
                  ],
                  attrs: {
                    variant: "secondary",
                    loading: _vm.cancelButtonLoading,
                    type: "button",
                  },
                  on: { click: _vm.onCancelUpload },
                },
                [
                  _vm._t("cancelButton", [
                    _vm._v(" " + _vm._s(_vm.$t("cancel")) + " "),
                  ]),
                ],
                2
              ),
              _c("div", { staticClass: "clearfix" }),
            ],
            2
          )
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/app/analysis/shared/analysis-upload.vue?vue&type=template&id=11760b78&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/get.js + 1 modules
var get = __webpack_require__(257);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(106);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(71);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(189);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(105);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__(135);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(190);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__(132);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(104);

// EXTERNAL MODULE: ./src/app/shared/components/app-button/app-button.vue + 4 modules
var app_button = __webpack_require__(254);

// EXTERNAL MODULE: ./src/app/shared/components/app-content/app-content-event-bus.ts
var app_content_event_bus = __webpack_require__(127);

// EXTERNAL MODULE: ./src/app/shared/components/app-content/app-content.vue + 4 modules
var app_content = __webpack_require__(86);

// EXTERNAL MODULE: ./src/app/shared/components/app-explanation/app-explanation.vue + 4 modules
var app_explanation = __webpack_require__(269);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"499a4f47-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-file-upload/app-file-upload.vue?vue&type=template&id=895b7412&
var app_file_uploadvue_type_template_id_895b7412_render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "app-file-upload" }, [
    _c(
      "div",
      {
        staticClass: "app-file-upload-dropzone",
        attrs: { id: "file-upload-dropzone-id" },
      },
      [
        _c(
          "div",
          { staticClass: "app-file-upload-dropzone-content" },
          [
            _vm.title
              ? _c(
                  "h3",
                  { staticClass: "app-file-upload-dropzone-content-title" },
                  [_vm._v(_vm._s(_vm.title))]
                )
              : _vm._e(),
            _vm._t("default"),
          ],
          2
        ),
        _c(
          "div",
          { staticClass: "app-file-upload-dropzone-browsebutton" },
          [
            _c(
              "b-button",
              {
                attrs: {
                  variant: "primary",
                  id: "file-upload-browsebutton-id",
                },
              },
              [_vm._v(_vm._s(_vm.$t("browse...")))]
            ),
          ],
          1
        ),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.keyResumFiles > 0,
                expression: "keyResumFiles > 0",
              },
            ],
            key: _vm.keyResumFiles,
            staticClass: "app-file-upload-dropzone-files",
            staticStyle: { "margin-top": "30px" },
          },
          _vm._l(_vm.files, function (file) {
            return _c("app-file-upload-file", {
              key: file.uniqueIdentifier,
              ref: "uploadFiles",
              refInFor: true,
              attrs: {
                uploadService: _vm.uploadService,
                uploading: _vm.uploading,
                file: file,
              },
            })
          }),
          1
        ),
      ]
    ),
  ])
}
var app_file_uploadvue_type_template_id_895b7412_staticRenderFns = []
app_file_uploadvue_type_template_id_895b7412_render._withStripped = true


// CONCATENATED MODULE: ./src/app/shared/components/app-file-upload/app-file-upload.vue?vue&type=template&id=895b7412&

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__(34);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"499a4f47-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-file-upload/app-file-upload-file.vue?vue&type=template&id=7043bd42&
var app_file_upload_filevue_type_template_id_7043bd42_render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "app-file-upload-file" }, [
    _c("div", { staticClass: "app-file-upload-file-infos" }, [
      _c("div", { staticClass: "app-file-upload-file-name" }, [
        _c("small", { staticClass: "app-file-upload-file-name-size grayed" }, [
          _vm._v(_vm._s(_vm.getFileSize(_vm.file.size))),
        ]),
        _vm._v(" " + _vm._s(_vm.file.fileName) + " "),
        _c(
          "span",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.error,
                expression: "error",
              },
            ],
            staticClass: "app-file-upload-file-name-error",
            class: { "text-danger": !_vm.retry },
          },
          [
            _vm._v(
              " " +
                _vm._s((_vm.retry && _vm.$t("retrying...")) || _vm.error) +
                " "
            ),
          ]
        ),
      ]),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.uploading,
              expression: "!uploading",
            },
          ],
          staticClass: "app-file-upload-file-remove",
          on: { click: _vm.onFileRemove },
        },
        [_c("b-icon", { attrs: { icon: "x" } })],
        1
      ),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.uploading,
              expression: "uploading",
            },
          ],
          staticClass: "app-file-upload-file-progress",
        },
        [
          _c(
            "span",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.success,
                  expression: "!success",
                },
              ],
            },
            [_vm._v(_vm._s(_vm.progress) + "%")]
          ),
          _c("b-icon", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.success,
                expression: "success",
              },
            ],
            staticClass: "text-success",
            attrs: { icon: "check2" },
          }),
        ],
        1
      ),
    ]),
    _c("div", {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.uploading,
          expression: "uploading",
        },
      ],
      ref: "uploadProgressBar",
      staticClass: "app-file-upload-file-progressbar",
    }),
  ])
}
var app_file_upload_filevue_type_template_id_7043bd42_staticRenderFns = []
app_file_upload_filevue_type_template_id_7043bd42_render._withStripped = true


// CONCATENATED MODULE: ./src/app/shared/components/app-file-upload/app-file-upload-file.vue?vue&type=template&id=7043bd42&

// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/api-errors.ts
var api_errors = __webpack_require__(47);

// EXTERNAL MODULE: ./src/app/shared/services/helper/file-helper.ts
var file_helper = __webpack_require__(295);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-file-upload/app-file-upload-file.vue?vue&type=script&lang=ts&








var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var app_file_upload_filevue_type_script_lang_ts_AppFileUploadFile = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(AppFileUploadFile, _Vue);

  var _super = Object(createSuper["a" /* default */])(AppFileUploadFile);

  function AppFileUploadFile() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, AppFileUploadFile);

    _this = _super.apply(this, arguments);
    _this.progress = 0;
    _this.error = "";
    _this.retry = false;
    _this.success = false;
    return _this;
  }

  Object(createClass["a" /* default */])(AppFileUploadFile, [{
    key: "created",
    value: function created() {
      if (this.uploading) {
        this.emitProgress();

        if (this.progress === 100) {
          this.emitSuccess();
        }
      }
    }
  }, {
    key: "uniqueIdentifier",
    get: function get() {
      return this.file.uniqueIdentifier;
    }
  }, {
    key: "getFileSize",
    value: function getFileSize(size) {
      return Object(file_helper["a" /* getReadableFileSize */])(size);
    }
  }, {
    key: "onFileRemove",
    value: function onFileRemove() {
      this.file.cancel();
      this.uploadService.emitFileRemoved(this.file);
    }
  }, {
    key: "emitError",
    value: function emitError(msg) {
      try {
        var erroMsg = JSON.parse(msg);

        if (erroMsg.error) {
          this.error = erroMsg.error;
        }
      } catch (_unused) {
        console.error(msg);
        this.error = api_errors["a" /* ApiErrors */].SOMETHING_WENT_WRONG;
      }

      this.success = false;
      this.retry = false;
    }
  }, {
    key: "emitRetry",
    value: function emitRetry() {
      this.success = false;
      this.retry = true;
    }
  }, {
    key: "emitProgress",
    value: function emitProgress() {
      var newProgress = Math.round(this.file.progress(false) * 100);

      if (newProgress !== this.progress) {
        this.progress = newProgress;
        this.error = "";
        this.retry = false;

        if (this.uploadProgressBar) {
          this.uploadProgressBar.style.width = this.progress + "%";
        }
      }
    }
  }, {
    key: "emitSuccess",
    value: function emitSuccess() {
      this.error = "";
      this.retry = false;
      this.progress = 0;
      this.success = true;

      if (this.uploadProgressBar) {
        this.uploadProgressBar.style.display = "none";
      }
    }
  }]);

  return AppFileUploadFile;
}(vue_runtime_esm["default"]);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  required: true
})], app_file_upload_filevue_type_script_lang_ts_AppFileUploadFile.prototype, "file", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  required: true
})], app_file_upload_filevue_type_script_lang_ts_AppFileUploadFile.prototype, "uploading", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  required: true
})], app_file_upload_filevue_type_script_lang_ts_AppFileUploadFile.prototype, "uploadService", void 0);

__decorate([Object(vue_property_decorator["c" /* Ref */])()], app_file_upload_filevue_type_script_lang_ts_AppFileUploadFile.prototype, "uploadProgressBar", void 0);

app_file_upload_filevue_type_script_lang_ts_AppFileUploadFile = __decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-file-upload-file"
})], app_file_upload_filevue_type_script_lang_ts_AppFileUploadFile);
/* harmony default export */ var app_file_upload_filevue_type_script_lang_ts_ = (app_file_upload_filevue_type_script_lang_ts_AppFileUploadFile);
// CONCATENATED MODULE: ./src/app/shared/components/app-file-upload/app-file-upload-file.vue?vue&type=script&lang=ts&
 /* harmony default export */ var app_file_upload_app_file_upload_filevue_type_script_lang_ts_ = (app_file_upload_filevue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/app/shared/components/app-file-upload/app-file-upload-file.vue?vue&type=style&index=0&lang=scss&
var app_file_upload_filevue_type_style_index_0_lang_scss_ = __webpack_require__(340);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(43);

// CONCATENATED MODULE: ./src/app/shared/components/app-file-upload/app-file-upload-file.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  app_file_upload_app_file_upload_filevue_type_script_lang_ts_,
  app_file_upload_filevue_type_template_id_7043bd42_render,
  app_file_upload_filevue_type_template_id_7043bd42_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app/shared/components/app-file-upload/app-file-upload-file.vue"
/* harmony default export */ var app_file_upload_file = (component.exports);
// CONCATENATED MODULE: ./src/app/shared/services/upload-service/types.ts
var UploadState;

(function (UploadState) {
  UploadState["UNPREPARED"] = "UNPREPARED";
  UploadState["INITIALIZED"] = "INITIALIZED";
  UploadState["UPLOADING"] = "UPLOADING";
  UploadState["FINISHED"] = "FINISHED";
  UploadState["FAILED"] = "FAILED";
  UploadState["RETRYING"] = "RETRYING";
})(UploadState || (UploadState = {}));

var UploadEvent;

(function (UploadEvent) {
  UploadEvent["FILE_SUCCESS"] = "fileSuccess";
  UploadEvent["FILE_PROGRESS"] = "fileProgress";
  UploadEvent["FILE_ERROR"] = "fileError";
  UploadEvent["FILE_RETRY"] = "fileRetry";
  UploadEvent["FILE_ADDED"] = "fileAdded";
  UploadEvent["FILE_REMOVED"] = "fileRemoved";
  UploadEvent["PROGRESS"] = "progress";
  UploadEvent["FAILED"] = "failed";
  UploadEvent["COMPLETED"] = "completed";
})(UploadEvent || (UploadEvent = {}));
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-file-upload/app-file-upload.vue?vue&type=script&lang=ts&









var app_file_uploadvue_type_script_lang_ts_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var app_file_uploadvue_type_script_lang_ts_AppFileUpload = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(AppFileUpload, _Vue);

  var _super = Object(createSuper["a" /* default */])(AppFileUpload);

  function AppFileUpload() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, AppFileUpload);

    _this = _super.apply(this, arguments);
    _this.keyResumFiles = 0; // changing the value forces vue to rerender the element with :key="keyResumFiles"

    _this.uploading = false;
    return _this;
  }

  Object(createClass["a" /* default */])(AppFileUpload, [{
    key: "mounted",
    value: function mounted() {
      this.checkUploadState();
      this.registerUploadEvents();
    }
  }, {
    key: "checkUploadState",
    value: function checkUploadState() {
      if (this.uploadService.hasState(UploadState.UPLOADING)) {
        this.uploading = true;
        this.keyResumFiles = this.uploadService.files.length;
      } else {
        this.uploadService.init("file-upload-dropzone-id", "file-upload-browsebutton-id");
      }
    }
  }, {
    key: "registerUploadEvents",
    value: function registerUploadEvents() {
      var _this2 = this;

      this.uploadService.on(UploadEvent.FILE_SUCCESS, function (file) {
        var uploadFile = _this2.getFileUploadFile(file);

        if (uploadFile) {
          uploadFile.emitSuccess();
        }
      });
      this.uploadService.on(UploadEvent.FILE_ERROR, function (file, msg) {
        var uploadFile = _this2.getFileUploadFile(file);

        if (uploadFile) {
          uploadFile.emitError(msg);
        }
      });
      this.uploadService.on(UploadEvent.FILE_PROGRESS, function (file) {
        var uploadFile = _this2.getFileUploadFile(file);

        if (uploadFile) {
          uploadFile.emitProgress();
        }
      });
      this.uploadService.on(UploadEvent.FILE_RETRY, function (file, retries) {
        var uploadFile = _this2.getFileUploadFile(file);

        if (uploadFile) {
          uploadFile.emitRetry();
        }
      });
      this.uploadService.on(UploadEvent.FILE_ADDED, function (file) {
        _this2.keyResumFiles += 1;
      });
      this.uploadService.on(UploadEvent.FILE_REMOVED, function (file) {
        _this2.keyResumFiles -= 1;
      });
    }
  }, {
    key: "upload",
    value: function upload(target, metadata) {
      this.uploading = true;
      this.keyResumFiles += 100;
      this.uploadService.upload(target, metadata);
    }
  }, {
    key: "files",
    get: function get() {
      return this.uploadService.files;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.uploadService.cancel();
      this.uploading = false;
      this.keyResumFiles -= 100;
    }
  }, {
    key: "getFileUploadFile",
    value: function getFileUploadFile(file) {
      return this.uploadFiles.find(function (uploadFile) {
        return uploadFile.uniqueIdentifier === file.uniqueIdentifier;
      });
    }
  }]);

  return AppFileUpload;
}(vue_runtime_esm["default"]);

app_file_uploadvue_type_script_lang_ts_decorate([Object(vue_property_decorator["c" /* Ref */])()], app_file_uploadvue_type_script_lang_ts_AppFileUpload.prototype, "uploadFiles", void 0);

app_file_uploadvue_type_script_lang_ts_decorate([Object(vue_property_decorator["b" /* Prop */])({
  required: true
})], app_file_uploadvue_type_script_lang_ts_AppFileUpload.prototype, "uploadService", void 0);

app_file_uploadvue_type_script_lang_ts_decorate([Object(vue_property_decorator["b" /* Prop */])()], app_file_uploadvue_type_script_lang_ts_AppFileUpload.prototype, "title", void 0);

app_file_uploadvue_type_script_lang_ts_AppFileUpload = app_file_uploadvue_type_script_lang_ts_decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-file-upload",
  components: {
    AppFileUploadFile: app_file_upload_file
  }
})], app_file_uploadvue_type_script_lang_ts_AppFileUpload);
/* harmony default export */ var app_file_uploadvue_type_script_lang_ts_ = (app_file_uploadvue_type_script_lang_ts_AppFileUpload);
// CONCATENATED MODULE: ./src/app/shared/components/app-file-upload/app-file-upload.vue?vue&type=script&lang=ts&
 /* harmony default export */ var app_file_upload_app_file_uploadvue_type_script_lang_ts_ = (app_file_uploadvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/app/shared/components/app-file-upload/app-file-upload.vue?vue&type=style&index=0&lang=scss&
var app_file_uploadvue_type_style_index_0_lang_scss_ = __webpack_require__(341);

// CONCATENATED MODULE: ./src/app/shared/components/app-file-upload/app-file-upload.vue






/* normalize component */

var app_file_upload_component = Object(componentNormalizer["a" /* default */])(
  app_file_upload_app_file_uploadvue_type_script_lang_ts_,
  app_file_uploadvue_type_template_id_895b7412_render,
  app_file_uploadvue_type_template_id_895b7412_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var app_file_upload_api; }
app_file_upload_component.options.__file = "src/app/shared/components/app-file-upload/app-file-upload.vue"
/* harmony default export */ var app_file_upload = (app_file_upload_component.exports);
// EXTERNAL MODULE: ./src/app/shared/components/base-auth-component/base-auth-component.ts + 1 modules
var base_auth_component = __webpack_require__(62);

// EXTERNAL MODULE: ./src/app/shared/components/fetch-component/storage-keys.ts
var storage_keys = __webpack_require__(298);

// EXTERNAL MODULE: ./src/app/shared/services/app-storage/app-storage.ts
var app_storage = __webpack_require__(111);

// EXTERNAL MODULE: ./node_modules/resumablejs/resumable.js
var resumable = __webpack_require__(342);
var resumable_default = /*#__PURE__*/__webpack_require__.n(resumable);

// EXTERNAL MODULE: ./src/app/app-state.ts + 3 modules
var app_state = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(73);

// CONCATENATED MODULE: ./src/app/shared/services/upload-service/upload-event-bus.ts







var upload_event_bus_UploadEventBus = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(UploadEventBus, _Vue);

  var _super = Object(createSuper["a" /* default */])(UploadEventBus);

  function UploadEventBus() {
    Object(classCallCheck["a" /* default */])(this, UploadEventBus);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(UploadEventBus, [{
    key: "emit",
    value: function emit(event, args) {
      this.$emit.apply(this, [event].concat(Object(toConsumableArray["a" /* default */])(args)));
    }
  }, {
    key: "on",
    value: function on(event, callbackFn) {
      this.$on(event, callbackFn);
    }
  }]);

  return UploadEventBus;
}(vue_runtime_esm["default"]);
// CONCATENATED MODULE: ./src/app/shared/services/upload-service/upload-service.ts








var upload_service_UploadService = /*#__PURE__*/function () {
  function UploadService(id) {
    Object(classCallCheck["a" /* default */])(this, UploadService);

    this.maxRetries = 5;
    this.chunkRetryInterval = 3000; // 3 seconds

    this.failedTimeoutInterval = 4000; // chunkRetryInterval + 1 second

    this.state = UploadState.UNPREPARED;
    this.retries = 0;
    this.currentProgress = 0;
    this.eventsRegistered = false;
    this.resumable = new resumable_default.a({
      chunkSize: 1 * 1024 * 1024 * 10,
      chunkRetryInterval: this.chunkRetryInterval,
      simultaneousUploads: 1,
      maxChunkRetries: this.maxRetries
    });
    this.id = id;
    this.uploadEventBus = new upload_event_bus_UploadEventBus();
  }

  Object(createClass["a" /* default */])(UploadService, [{
    key: "init",
    value: function init(dropzoneId, browseButtonId) {
      this.checkState([UploadState.UNPREPARED, UploadState.INITIALIZED, UploadState.FINISHED]);
      this.initValues();
      this.registerEvents();
      var el = document.getElementById(dropzoneId);

      if (!el) {
        throw new Error("No HTML-Element found with id='".concat(dropzoneId, "'"));
      }

      this.resumable.assignDrop(el);

      if (browseButtonId) {
        var browseBtnEl = document.getElementById(browseButtonId);

        if (!browseBtnEl) {
          throw new Error("No HTML-Element found with id='".concat(browseButtonId, "'"));
        }

        this.resumable.assignBrowse(browseBtnEl, false);
      }

      this.state = UploadState.INITIALIZED;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.checkState([UploadState.FINISHED]);
      this.initValues();
      this.state = UploadState.INITIALIZED;
    }
  }, {
    key: "hasState",
    value: function hasState(state) {
      return this.state === state;
    }
  }, {
    key: "files",
    get: function get() {
      return this.resumable.files;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.checkState([UploadState.FAILED, UploadState.UPLOADING, UploadState.INITIALIZED]);
      this.resumable.cancel();
      this.state = UploadState.FINISHED;
      this.reset();
    }
  }, {
    key: "progress",
    value: function progress() {
      return this.currentProgress;
    }
  }, {
    key: "upload",
    value: function upload(target, metadata) {
      this.checkState([UploadState.INITIALIZED, UploadState.FAILED]);
      this.state = UploadState.UPLOADING;
      this.metadata = metadata;
      this.resumable.opts.target = target;
      this.resumable.upload();
    }
  }, {
    key: "getMetadata",
    value: function getMetadata() {
      return this.metadata;
    }
  }, {
    key: "on",
    value: function on(event, callbackFn) {
      this.uploadEventBus.on(event, callbackFn);
    }
  }, {
    key: "emitFileRemoved",
    value: function emitFileRemoved(file) {
      this.emit(UploadEvent.FILE_REMOVED, file);
    }
  }, {
    key: "getMaxRetries",
    value: function getMaxRetries() {
      return this.files.filter(function (file) {
        return !file.isComplete();
      }).length * this.maxRetries;
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.uploadEventBus.emit(event, args);
    }
  }, {
    key: "initValues",
    value: function initValues() {
      this.resumable.opts.headers = {
        Authorization: "Bearer ".concat(app_state["a" /* default */].state.auth.token)
      };
      this.metadata = undefined;
      this.currentProgress = 0;
    }
  }, {
    key: "checkState",
    value: function checkState(states) {
      if (!Array.isArray(states)) {
        states = [states];
      }

      if (states.indexOf(this.state) === -1) {
        throw new Error("Invalid operation. Resumable is in state: " + this.state);
      }
    }
  }, {
    key: "onProgress",
    value: function onProgress() {
      // Resumable fires progress event after completed event...
      var progress = this.resumable.progress();

      if (this.currentProgress !== progress && !this.hasState(UploadState.FINISHED)) {
        this.currentProgress = progress;
        this.state = UploadState.UPLOADING;
        this.emit(UploadEvent.PROGRESS);
      }
    }
  }, {
    key: "onRetry",
    value: function onRetry(file) {
      if (this.failedTimeout) {
        clearTimeout(this.failedTimeout);
        this.failedTimeout = undefined;
      }

      this.state = UploadState.RETRYING;
      this.emit(UploadEvent.FILE_RETRY, file, ++this.retries);
    }
  }, {
    key: "onFailed",
    value: function onFailed(msg) {
      this.state = UploadState.FAILED;
      this.emit(UploadEvent.FAILED, msg);
    }
  }, {
    key: "onCompleted",
    value: function onCompleted() {
      // Resumable does fire "completed"-Event even if the upload has failed
      if (!this.failedTimeout && !this.hasState(UploadState.FAILED)) {
        this.state = UploadState.FINISHED;
        this.resumable.cancel();
        this.emit(UploadEvent.COMPLETED, this.metadata);
        this.reset();
      }
    }
  }, {
    key: "onFileSuccess",
    value: function onFileSuccess(file) {
      this.emit(UploadEvent.FILE_SUCCESS, file);
    }
  }, {
    key: "onFileProgress",
    value: function onFileProgress(file) {
      this.emit(UploadEvent.FILE_PROGRESS, file);
    }
  }, {
    key: "onFileError",
    value: function onFileError(file, msg) {
      var _this = this;

      // Resumable does not fire "error"-Event reliably
      // So let's use "fileError"-Event additionaly
      this.failedTimeout = setTimeout(function () {
        _this.onFailed(msg);
      }, this.failedTimeoutInterval); // wait for "fileRetry"-Event before fire

      this.emit(UploadEvent.FILE_ERROR, file, msg);
    }
  }, {
    key: "onFileAdded",
    value: function onFileAdded(file) {
      this.emit(UploadEvent.FILE_ADDED, file);
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      var _this2 = this;

      if (this.eventsRegistered) {
        return;
      }

      this.resumable.on("fileSuccess", function (file) {
        _this2.onFileSuccess(file);
      });
      this.resumable.on("fileProgress", function (file) {
        _this2.onFileProgress(file);
      });
      this.resumable.on("fileError", function (file, msg) {
        _this2.onFileError(file, msg);
      });
      this.resumable.on("fileRetry", function (file) {
        _this2.onRetry(file);
      });
      this.resumable.on("fileAdded", function (file) {
        _this2.onFileAdded(file);
      });
      this.resumable.on("progress", function () {
        _this2.onProgress();
      });
      this.resumable.on("complete", function () {
        _this2.onCompleted();
      });
      this.resumable.on("error", function (msg) {
        _this2.onFailed(msg);
      });
      this.eventsRegistered = true;
    }
  }], [{
    key: "findOrCreate",
    value: function findOrCreate(id) {
      // id is most likely an analysis id. But for a new analysis we set it to "0"
      if (id === undefined) {
        id = "0"; // new data upload
      }

      if (!(id in UploadService.instances)) {
        this.instances[id] = new UploadService(id);
      }

      return this.instances[id];
    }
  }]);

  return UploadService;
}();
upload_service_UploadService.instances = {};
// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/api-states.ts
var api_states = __webpack_require__(275);

// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/volateq-api.ts + 2 modules
var volateq_api = __webpack_require__(61);

// EXTERNAL MODULE: ./src/app/analysis/shared/analysis-event-service.ts + 1 modules
var analysis_event_service = __webpack_require__(279);

// EXTERNAL MODULE: ./src/app/analysis/shared/types.ts
var types = __webpack_require__(276);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/analysis/shared/analysis-upload.vue?vue&type=script&lang=ts&


















var analysis_uploadvue_type_script_lang_ts_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var analysis_uploadvue_type_script_lang_ts_AppAnalysisUpload = /*#__PURE__*/function (_BaseAuthComponent) {
  Object(inherits["a" /* default */])(AppAnalysisUpload, _BaseAuthComponent);

  var _super = Object(createSuper["a" /* default */])(AppAnalysisUpload);

  function AppAnalysisUpload() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, AppAnalysisUpload);

    _this = _super.apply(this, arguments);
    _this.storageKey = "";
    _this.dataComplete = false;
    _this.waitForFiles = null;
    _this.uploadService = null;
    _this.uploadButtonDisabled = false;
    _this.uploadButtonLoading = false;
    _this.uploadButtonTxt = "";
    _this.showCancelButton = false;
    _this.cancelButtonLoading = false;
    return _this;
  }

  Object(createClass["a" /* default */])(AppAnalysisUpload, [{
    key: "mounted",
    value: function () {
      var _mounted = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var _this$analysis;

        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.uploadService = upload_service_UploadService.findOrCreate((_this$analysis = this.analysis) === null || _this$analysis === void 0 ? void 0 : _this$analysis.id);
                this.setStorageKey(this.analysis);
                this.dataComplete = this.analysis ? this.analysis.data_complete : false;
                this.registerUploadEvents();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function mounted() {
        return _mounted.apply(this, arguments);
      }

      return mounted;
    }()
  }, {
    key: "created",
    value: function () {
      var _created = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        var data;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Object(get["a" /* default */])(Object(getPrototypeOf["a" /* default */])(AppAnalysisUpload.prototype), "created", this).call(this);

              case 2:
                this.uploadButtonTxt = this.$t("upload").toString();
                data = this.fetchData();

                if (data) {
                  this.waitForFiles = data.fileNames;
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function created() {
        return _created.apply(this, arguments);
      }

      return created;
    }()
  }, {
    key: "onAnalysisChanged",
    value: function onAnalysisChanged() {
      this.dataComplete = this.analysis ? this.analysis.data_complete : false;
    }
  }, {
    key: "updated",
    value: function updated() {
      this.checkUploadState();
    }
  }, {
    key: "registerUploadEvents",
    value: function registerUploadEvents() {
      var _this2 = this;

      this.uploadService.on(UploadEvent.COMPLETED, /*#__PURE__*/function () {
        var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(metadata) {
          var analysis, dataComplete;
          return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return volateq_api["a" /* default */].getAnalysis(_this2.analysis.id);

                case 3:
                  analysis = _context3.sent;
                  dataComplete = analysis.data_complete;
                  _this2.waitForFiles = null;
                  _context3.next = 8;
                  return volateq_api["a" /* default */].updateAnalysisState(metadata.id, {
                    state_id: dataComplete ? api_states["a" /* ApiStates */].DATA_COMPLETE : api_states["a" /* ApiStates */].DATA_INCOMPLETE,
                    do_send_mail: true
                  });

                case 8:
                  analysis_event_service["a" /* AnalysisEventService */].emit(analysis.id, types["a" /* AnalysisEvent */].UPDATE_ANALYSIS);
                  app_storage["a" /* appLocalStorage */].removeItem(_this2.storageKey);

                  _this2.showSuccess(_this2.$t("upload-completed-successfully").toString());

                  _context3.next = 16;
                  break;

                case 13:
                  _context3.prev = 13;
                  _context3.t0 = _context3["catch"](0);

                  _this2.showError(_context3.t0);

                case 16:
                  if (_this2.isCreated) {
                    _this2.uploadButtonLoading = false;
                    _this2.uploadButtonDisabled = false;
                    _this2.uploadButtonTxt = _this2.$t("upload").toString();
                    _this2.showCancelButton = false;
                  }

                case 17:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[0, 13]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
      this.uploadService.on(UploadEvent.FAILED, /*#__PURE__*/function () {
        var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4(message) {
          return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _this2.showError(_this2.$t(api_states["b" /* apiStateNames */][api_states["a" /* ApiStates */].UPLOAD_FAILED]).toString());

                  console.error(message);
                  _context4.prev = 2;
                  _context4.next = 5;
                  return volateq_api["a" /* default */].updateAnalysisState(_this2.uploadService.getMetadata().id, {
                    state_id: api_states["a" /* ApiStates */].UPLOAD_FAILED,
                    message: message
                  });

                case 5:
                  _context4.next = 10;
                  break;

                case 7:
                  _context4.prev = 7;
                  _context4.t0 = _context4["catch"](2);
                  // Well, that is not a surprise...
                  console.error(_context4.t0);

                case 10:
                  if (_this2.isCreated) {
                    _this2.onFailed();
                  }

                case 11:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, null, [[2, 7]]);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
      this.uploadService.on(UploadEvent.FILE_RETRY, function (file, retries) {
        app_content_event_bus["a" /* default */].showWarningAlert("".concat(_this2.$t("upload-error-retry").toString(), " ").concat(retries, "/").concat(_this2.uploadService.getMaxRetries()), "resumable-upload-error-retry");
      });
      this.uploadService.on(UploadEvent.FILE_ADDED, function (file) {
        if (_this2.isCreated) {
          _this2.checkFileCompleteness();
        }
      });
      this.uploadService.on(UploadEvent.FILE_REMOVED, function (file) {
        if (_this2.isCreated) {
          _this2.checkFileCompleteness();
        }
      });
    }
  }, {
    key: "checkUploadState",
    value: function checkUploadState() {
      if (this.uploadService.hasState(UploadState.UPLOADING)) {
        this.uploadButtonLoading = true;
      } else if (this.waitForFiles && this.waitForFiles.length > 0) {
        // Upload has been interrupted
        app_content_event_bus["a" /* default */].showInfoAlert(this.$t("need-files-to-upload_descr").toString() + '<ul style="margin: 5px 0 0 40px;"><li>' + this.waitForFiles.join("</li><li>") + "</li></ul>");
        this.uploadButtonTxt = this.$t("resume-upload").toString();
        this.uploadButtonDisabled = true;
        this.showCancelButton = true;
      }
    }
  }, {
    key: "checkFileCompleteness",
    value: function checkFileCompleteness() {
      var _this3 = this;

      if (this.waitForFiles) {
        this.waitForFiles = this.waitForFiles.filter(function (fileName) {
          return !_this3.appFileUpload.files.find(function (file) {
            return file.fileName === fileName;
          });
        });

        if (this.waitForFiles.length === 0) {
          this.waitForFiles = null;
          app_content_event_bus["a" /* default */].clearAlert();
          this.uploadButtonDisabled = false;
        }
      }
    }
  }, {
    key: "fetchData",
    value: function fetchData() {
      return app_storage["a" /* appLocalStorage */].getItem(this.storageKey);
    }
  }, {
    key: "storeData",
    value: function storeData() {
      var data = this.getStorageData();

      if (data) {
        app_storage["a" /* appLocalStorage */].setItem(this.storageKey, data);
      } else {
        app_storage["a" /* appLocalStorage */].removeItem(this.storageKey);
      }
    }
  }, {
    key: "getStorageData",
    value: function getStorageData() {
      return {
        fileNames: this.appFileUpload.files.map(function (file) {
          return file.fileName;
        })
      };
    }
  }, {
    key: "hasPlantMetadata",
    get: function get() {
      return this.analysis && this.analysis.has_plant_metadata || false;
    }
  }, {
    key: "dataCompleteMetadataExpl",
    get: function get() {
      return !this.hasPlantMetadata && this.$t("missing-plant-metadata").toString() || this.$t("data-complete_expl").toString();
    }
  }, {
    key: "onSubmit",
    value: function () {
      var _onSubmit = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee5() {
        var _this4 = this;

        var resumeUpload, analysis;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.uploadService.hasState(UploadState.FAILED)) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 3;
                return volateq_api["a" /* default */].isLoggedIn();

              case 3:
                if (_context5.sent) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return");

              case 5:
                this.$emit("retryUpload");
                return _context5.abrupt("return");

              case 7:
                _context5.prev = 7;
                resumeUpload = this.uploadButtonTxt === this.$t("resume-upload").toString();
                this.onUploading();
                _context5.next = 12;
                return new Promise(function (resolve) {
                  _this4.$emit("startUpload", _this4.appFileUpload.files.map(function (file) {
                    return file.fileName;
                  }), resumeUpload, function (analysis) {
                    resolve(analysis);
                  });
                });

              case 12:
                analysis = _context5.sent;

                if (analysis) {
                  _context5.next = 16;
                  break;
                }

                this.uploadButtonLoading = false;
                return _context5.abrupt("return");

              case 16:
                this.setStorageKey(analysis);
                this.storeData();
                this.appFileUpload.upload(volateq_api["a" /* default */].getAnalysisFileUploadUrl(analysis.id), {
                  id: analysis.id
                });
                _context5.next = 24;
                break;

              case 21:
                _context5.prev = 21;
                _context5.t0 = _context5["catch"](7);
                this.showError(_context5.t0);

              case 24:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[7, 21]]);
      }));

      function onSubmit() {
        return _onSubmit.apply(this, arguments);
      }

      return onSubmit;
    }()
  }, {
    key: "onFailed",
    value: function onFailed() {
      this.uploadButtonLoading = false;
      this.uploadButtonTxt = this.$t("retry-upload").toString();
      this.showCancelButton = true;
    }
  }, {
    key: "onUploading",
    value: function onUploading() {
      this.uploadButtonLoading = true;
      this.showCancelButton = false;
    }
  }, {
    key: "onCancelUpload",
    value: function () {
      var _onCancelUpload = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee6() {
        var _this5 = this;

        var failed;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.cancelButtonLoading = true;
                _context6.prev = 1;
                _context6.next = 4;
                return new Promise(function (resolve) {
                  _this5.$emit("cancelUpload", function (failed) {
                    return resolve(failed);
                  });
                });

              case 4:
                failed = _context6.sent;

                if (!failed) {
                  this.appFileUpload.cancel();
                  app_storage["a" /* appLocalStorage */].removeItem(this.storageKey);
                  this.uploadButtonLoading = false;
                  this.uploadButtonDisabled = false;
                  this.uploadButtonTxt = this.$t("upload").toString();
                  app_content_event_bus["a" /* default */].clearAlert();
                  this.showCancelButton = false;
                }

              case 6:
                _context6.prev = 6;
                this.cancelButtonLoading = false;
                return _context6.finish(6);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1,, 6, 9]]);
      }));

      function onCancelUpload() {
        return _onCancelUpload.apply(this, arguments);
      }

      return onCancelUpload;
    }()
  }, {
    key: "onChangeDataComplete",
    value: function () {
      var _onChangeDataComplete = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee7() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;

                if (!(!this.analysis.plant.in_setup_phase && this.dataComplete)) {
                  _context7.next = 5;
                  break;
                }

                if (confirm(this.$t("data-complete-sure-quest").toString())) {
                  _context7.next = 5;
                  break;
                }

                this.dataComplete = false;
                return _context7.abrupt("return");

              case 5:
                _context7.next = 7;
                return volateq_api["a" /* default */].updateAnalysis(this.analysis.id, {
                  data_complete: this.dataComplete
                });

              case 7:
                analysis_event_service["a" /* AnalysisEventService */].emit(this.analysis.id, types["a" /* AnalysisEvent */].UPDATE_ANALYSIS);
                _context7.next = 13;
                break;

              case 10:
                _context7.prev = 10;
                _context7.t0 = _context7["catch"](0);
                this.showError(_context7.t0);

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 10]]);
      }));

      function onChangeDataComplete() {
        return _onChangeDataComplete.apply(this, arguments);
      }

      return onChangeDataComplete;
    }()
  }, {
    key: "setStorageKey",
    value: function setStorageKey(analysis) {
      this.storageKey = storage_keys["a" /* UPLOAD_ANALYSIS_STORAGE_KEY */] + (analysis && "-" + analysis.id || "");
    }
  }]);

  return AppAnalysisUpload;
}(base_auth_component["a" /* BaseAuthComponent */]);

analysis_uploadvue_type_script_lang_ts_decorate([Object(vue_property_decorator["c" /* Ref */])()], analysis_uploadvue_type_script_lang_ts_AppAnalysisUpload.prototype, "appFileUpload", void 0);

analysis_uploadvue_type_script_lang_ts_decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: null
})], analysis_uploadvue_type_script_lang_ts_AppAnalysisUpload.prototype, "analysis", void 0);

analysis_uploadvue_type_script_lang_ts_decorate([Object(vue_property_decorator["d" /* Watch */])("analysis")], analysis_uploadvue_type_script_lang_ts_AppAnalysisUpload.prototype, "onAnalysisChanged", null);

analysis_uploadvue_type_script_lang_ts_AppAnalysisUpload = analysis_uploadvue_type_script_lang_ts_decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-analysis-upload",
  components: {
    AppContent: app_content["a" /* default */],
    AppFileUpload: app_file_upload,
    AppButton: app_button["a" /* default */],
    AppExplanation: app_explanation["a" /* default */]
  }
})], analysis_uploadvue_type_script_lang_ts_AppAnalysisUpload);
/* harmony default export */ var analysis_uploadvue_type_script_lang_ts_ = (analysis_uploadvue_type_script_lang_ts_AppAnalysisUpload);
// CONCATENATED MODULE: ./src/app/analysis/shared/analysis-upload.vue?vue&type=script&lang=ts&
 /* harmony default export */ var shared_analysis_uploadvue_type_script_lang_ts_ = (analysis_uploadvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/app/analysis/shared/analysis-upload.vue





/* normalize component */

var analysis_upload_component = Object(componentNormalizer["a" /* default */])(
  shared_analysis_uploadvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var analysis_upload_api; }
analysis_upload_component.options.__file = "src/app/analysis/shared/analysis-upload.vue"
/* harmony default export */ var analysis_upload = __webpack_exports__["a"] = (analysis_upload_component.exports);

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getReadableFileSize; });
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(105);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__);

function getReadableFileSize(size) {
  var sizes = ["KB", "MB", "GB", "TB"];
  var i = 0;

  do {
    size = size / 1024;
  } while (size > 1024 && ++i < sizes.length);

  return "".concat(Math.round(size), " ").concat(sizes[i]);
}

/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UPLOAD_ANALYSIS_STORAGE_KEY; });
var UPLOAD_ANALYSIS_STORAGE_KEY = "upload-analysis-storage-key";

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_file_upload_file_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(296);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_file_upload_file_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_file_upload_file_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_file_upload_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_file_upload_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_file_upload_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

/*
* MIT Licensed
* http://www.23developer.com/opensource
* http://github.com/23/resumable.js
* Steffen Tiedemann Christensen, steffen@23company.com
*/

(function(){
"use strict";

  var Resumable = function(opts){
    if ( !(this instanceof Resumable) ) {
      return new Resumable(opts);
    }
    this.version = 1.0;
    // SUPPORTED BY BROWSER?
    // Check if these features are support by the browser:
    // - File object type
    // - Blob object type
    // - FileList object type
    // - slicing files
    this.support = (
                   (typeof(File)!=='undefined')
                   &&
                   (typeof(Blob)!=='undefined')
                   &&
                   (typeof(FileList)!=='undefined')
                   &&
                   (!!Blob.prototype.webkitSlice||!!Blob.prototype.mozSlice||!!Blob.prototype.slice||false)
                   );
    if(!this.support) return(false);


    // PROPERTIES
    var $ = this;
    $.files = [];
    $.defaults = {
      chunkSize:1*1024*1024,
      forceChunkSize:false,
      simultaneousUploads:3,
      fileParameterName:'file',
      chunkNumberParameterName: 'resumableChunkNumber',
      chunkSizeParameterName: 'resumableChunkSize',
      currentChunkSizeParameterName: 'resumableCurrentChunkSize',
      totalSizeParameterName: 'resumableTotalSize',
      typeParameterName: 'resumableType',
      identifierParameterName: 'resumableIdentifier',
      fileNameParameterName: 'resumableFilename',
      relativePathParameterName: 'resumableRelativePath',
      totalChunksParameterName: 'resumableTotalChunks',
      throttleProgressCallbacks: 0.5,
      query:{},
      headers:{},
      preprocess:null,
      method:'multipart',
      uploadMethod: 'POST',
      testMethod: 'GET',
      prioritizeFirstAndLastChunk:false,
      target:'/',
      testTarget: null,
      parameterNamespace:'',
      testChunks:true,
      generateUniqueIdentifier:null,
      getTarget:null,
      maxChunkRetries:100,
      chunkRetryInterval:undefined,
      permanentErrors:[400, 404, 415, 500, 501],
      maxFiles:undefined,
      withCredentials:false,
      xhrTimeout:0,
      clearInput:true,
      chunkFormat:'blob',
      setChunkTypeFromFile:false,
      maxFilesErrorCallback:function (files, errorCount) {
        var maxFiles = $.getOpt('maxFiles');
        alert('Please upload no more than ' + maxFiles + ' file' + (maxFiles === 1 ? '' : 's') + ' at a time.');
      },
      minFileSize:1,
      minFileSizeErrorCallback:function(file, errorCount) {
        alert(file.fileName||file.name +' is too small, please upload files larger than ' + $h.formatSize($.getOpt('minFileSize')) + '.');
      },
      maxFileSize:undefined,
      maxFileSizeErrorCallback:function(file, errorCount) {
        alert(file.fileName||file.name +' is too large, please upload files less than ' + $h.formatSize($.getOpt('maxFileSize')) + '.');
      },
      fileType: [],
      fileTypeErrorCallback: function(file, errorCount) {
        alert(file.fileName||file.name +' has type not allowed, please upload files of type ' + $.getOpt('fileType') + '.');
      }
    };
    $.opts = opts||{};
    $.getOpt = function(o) {
      var $opt = this;
      // Get multiple option if passed an array
      if(o instanceof Array) {
        var options = {};
        $h.each(o, function(option){
          options[option] = $opt.getOpt(option);
        });
        return options;
      }
      // Otherwise, just return a simple option
      if ($opt instanceof ResumableChunk) {
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }
        else { $opt = $opt.fileObj; }
      }
      if ($opt instanceof ResumableFile) {
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }
        else { $opt = $opt.resumableObj; }
      }
      if ($opt instanceof Resumable) {
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }
        else { return $opt.defaults[o]; }
      }
    };

    // EVENTS
    // catchAll(event, ...)
    // fileSuccess(file), fileProgress(file), fileAdded(file, event), filesAdded(files, filesSkipped), fileRetry(file),
    // fileError(file, message), complete(), progress(), error(message, file), pause()
    $.events = [];
    $.on = function(event,callback){
      $.events.push(event.toLowerCase(), callback);
    };
    $.fire = function(){
      // `arguments` is an object, not array, in FF, so:
      var args = [];
      for (var i=0; i<arguments.length; i++) args.push(arguments[i]);
      // Find event listeners, and support pseudo-event `catchAll`
      var event = args[0].toLowerCase();
      for (var i=0; i<=$.events.length; i+=2) {
        if($.events[i]==event) $.events[i+1].apply($,args.slice(1));
        if($.events[i]=='catchall') $.events[i+1].apply(null,args);
      }
      if(event=='fileerror') $.fire('error', args[2], args[1]);
      if(event=='fileprogress') $.fire('progress');
    };


    // INTERNAL HELPER METHODS (handy, but ultimately not part of uploading)
    var $h = {
      stopEvent: function(e){
        e.stopPropagation();
        e.preventDefault();
      },
      each: function(o,callback){
        if(typeof(o.length)!=='undefined') {
          for (var i=0; i<o.length; i++) {
            // Array or FileList
            if(callback(o[i])===false) return;
          }
        } else {
          for (i in o) {
            // Object
            if(callback(i,o[i])===false) return;
          }
        }
      },
      generateUniqueIdentifier:function(file, event){
        var custom = $.getOpt('generateUniqueIdentifier');
        if(typeof custom === 'function') {
          return custom(file, event);
        }
        var relativePath = file.webkitRelativePath||file.fileName||file.name; // Some confusion in different versions of Firefox
        var size = file.size;
        return(size + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/img, ''));
      },
      contains:function(array,test) {
        var result = false;

        $h.each(array, function(value) {
          if (value == test) {
            result = true;
            return false;
          }
          return true;
        });

        return result;
      },
      formatSize:function(size){
        if(size<1024) {
          return size + ' bytes';
        } else if(size<1024*1024) {
          return (size/1024.0).toFixed(0) + ' KB';
        } else if(size<1024*1024*1024) {
          return (size/1024.0/1024.0).toFixed(1) + ' MB';
        } else {
          return (size/1024.0/1024.0/1024.0).toFixed(1) + ' GB';
        }
      },
      getTarget:function(request, params){
        var target = $.getOpt('target');

        if (request === 'test' && $.getOpt('testTarget')) {
          target = $.getOpt('testTarget') === '/' ? $.getOpt('target') : $.getOpt('testTarget');
        }

        if (typeof target === 'function') {
          return target(params);
        }

        var separator = target.indexOf('?') < 0 ? '?' : '&';
        var joinedParams = params.join('&');

        return target + separator + joinedParams;
      }
    };

    var onDrop = function(event){
      $h.stopEvent(event);

      //handle dropped things as items if we can (this lets us deal with folders nicer in some cases)
      if (event.dataTransfer && event.dataTransfer.items) {
        loadFiles(event.dataTransfer.items, event);
      }
      //else handle them as files
      else if (event.dataTransfer && event.dataTransfer.files) {
        loadFiles(event.dataTransfer.files, event);
      }
    };
    var preventDefault = function(e) {
      e.preventDefault();
    };

    /**
     * processes a single upload item (file or directory)
     * @param {Object} item item to upload, may be file or directory entry
     * @param {string} path current file path
     * @param {File[]} items list of files to append new items to
     * @param {Function} cb callback invoked when item is processed
     */
    function processItem(item, path, items, cb) {
      var entry;
      if(item.isFile){
        // file provided
        return item.file(function(file){
          file.relativePath = path + file.name;
          items.push(file);
          cb();
        });
      }else if(item.isDirectory){
        // item is already a directory entry, just assign
        entry = item;
      }else if(item instanceof File) {
        items.push(item);
      }
      if('function' === typeof item.webkitGetAsEntry){
        // get entry from file object
        entry = item.webkitGetAsEntry();
      }
      if(entry && entry.isDirectory){
        // directory provided, process it
        return processDirectory(entry, path + entry.name + '/', items, cb);
      }
      if('function' === typeof item.getAsFile){
        // item represents a File object, convert it
        item = item.getAsFile();
        if(item instanceof File) {
          item.relativePath = path + item.name;
          items.push(item);
        }
      }
      cb(); // indicate processing is done
    }


    /**
     * cps-style list iteration.
     * invokes all functions in list and waits for their callback to be
     * triggered.
     * @param  {Function[]}   items list of functions expecting callback parameter
     * @param  {Function} cb    callback to trigger after the last callback has been invoked
     */
    function processCallbacks(items, cb){
      if(!items || items.length === 0){
        // empty or no list, invoke callback
        return cb();
      }
      // invoke current function, pass the next part as continuation
      items[0](function(){
        processCallbacks(items.slice(1), cb);
      });
    }

    /**
     * recursively traverse directory and collect files to upload
     * @param  {Object}   directory directory to process
     * @param  {string}   path      current path
     * @param  {File[]}   items     target list of items
     * @param  {Function} cb        callback invoked after traversing directory
     */
    function processDirectory (directory, path, items, cb) {
      var dirReader = directory.createReader();
      dirReader.readEntries(function(entries){
        if(!entries.length){
          // empty directory, skip
          return cb();
        }
        // process all conversion callbacks, finally invoke own one
        processCallbacks(
          entries.map(function(entry){
            // bind all properties except for callback
            return processItem.bind(null, entry, path, items);
          }),
          cb
        );
      });
    }

    /**
     * process items to extract files to be uploaded
     * @param  {File[]} items items to process
     * @param  {Event} event event that led to upload
     */
    function loadFiles(items, event) {
      if(!items.length){
        return; // nothing to do
      }
      $.fire('beforeAdd');
      var files = [];
      processCallbacks(
          Array.prototype.map.call(items, function(item){
            // bind all properties except for callback
            return processItem.bind(null, item, "", files);
          }),
          function(){
            if(files.length){
              // at least one file found
              appendFilesFromFileList(files, event);
            }
          }
      );
    };

    var appendFilesFromFileList = function(fileList, event){
      // check for uploading too many files
      var errorCount = 0;
      var o = $.getOpt(['maxFiles', 'minFileSize', 'maxFileSize', 'maxFilesErrorCallback', 'minFileSizeErrorCallback', 'maxFileSizeErrorCallback', 'fileType', 'fileTypeErrorCallback']);
      if (typeof(o.maxFiles)!=='undefined' && o.maxFiles<(fileList.length+$.files.length)) {
        // if single-file upload, file is already added, and trying to add 1 new file, simply replace the already-added file
        if (o.maxFiles===1 && $.files.length===1 && fileList.length===1) {
          $.removeFile($.files[0]);
        } else {
          o.maxFilesErrorCallback(fileList, errorCount++);
          return false;
        }
      }
      var files = [], filesSkipped = [], remaining = fileList.length;
      var decreaseReamining = function(){
        if(!--remaining){
          // all files processed, trigger event
          if(!files.length && !filesSkipped.length){
            // no succeeded files, just skip
            return;
          }
          window.setTimeout(function(){
            $.fire('filesAdded', files, filesSkipped);
          },0);
        }
      };
      $h.each(fileList, function(file){
        var fileName = file.name;
        if(o.fileType.length > 0){
          var fileTypeFound = false;
          for(var index in o.fileType){
            var extension = '.' + o.fileType[index];
			if(fileName.toLowerCase().indexOf(extension.toLowerCase(), fileName.length - extension.length) !== -1){
              fileTypeFound = true;
              break;
            }
          }
          if (!fileTypeFound) {
            o.fileTypeErrorCallback(file, errorCount++);
            return false;
          }
        }

        if (typeof(o.minFileSize)!=='undefined' && file.size<o.minFileSize) {
          o.minFileSizeErrorCallback(file, errorCount++);
          return false;
        }
        if (typeof(o.maxFileSize)!=='undefined' && file.size>o.maxFileSize) {
          o.maxFileSizeErrorCallback(file, errorCount++);
          return false;
        }

        function addFile(uniqueIdentifier){
          if (!$.getFromUniqueIdentifier(uniqueIdentifier)) {(function(){
            file.uniqueIdentifier = uniqueIdentifier;
            var f = new ResumableFile($, file, uniqueIdentifier);
            $.files.push(f);
            files.push(f);
            f.container = (typeof event != 'undefined' ? event.srcElement : null);
            window.setTimeout(function(){
              $.fire('fileAdded', f, event)
            },0);
          })()} else {
            filesSkipped.push(file);
          };
          decreaseReamining();
        }
        // directories have size == 0
        var uniqueIdentifier = $h.generateUniqueIdentifier(file, event);
        if(uniqueIdentifier && typeof uniqueIdentifier.then === 'function'){
          // Promise or Promise-like object provided as unique identifier
          uniqueIdentifier
          .then(
            function(uniqueIdentifier){
              // unique identifier generation succeeded
              addFile(uniqueIdentifier);
            },
           function(){
              // unique identifier generation failed
              // skip further processing, only decrease file count
              decreaseReamining();
            }
          );
        }else{
          // non-Promise provided as unique identifier, process synchronously
          addFile(uniqueIdentifier);
        }
      });
    };

    // INTERNAL OBJECT TYPES
    function ResumableFile(resumableObj, file, uniqueIdentifier){
      var $ = this;
      $.opts = {};
      $.getOpt = resumableObj.getOpt;
      $._prevProgress = 0;
      $.resumableObj = resumableObj;
      $.file = file;
      $.fileName = file.fileName||file.name; // Some confusion in different versions of Firefox
      $.size = file.size;
      $.relativePath = file.relativePath || file.webkitRelativePath || $.fileName;
      $.uniqueIdentifier = uniqueIdentifier;
      $._pause = false;
      $.container = '';
      var _error = uniqueIdentifier !== undefined;

      // Callback when something happens within the chunk
      var chunkEvent = function(event, message){
        // event can be 'progress', 'success', 'error' or 'retry'
        switch(event){
        case 'progress':
          $.resumableObj.fire('fileProgress', $, message);
          break;
        case 'error':
          $.abort();
          _error = true;
          $.chunks = [];
          $.resumableObj.fire('fileError', $, message);
          break;
        case 'success':
          if(_error) return;
          $.resumableObj.fire('fileProgress', $); // it's at least progress
          if($.isComplete()) {
            $.resumableObj.fire('fileSuccess', $, message);
          }
          break;
        case 'retry':
          $.resumableObj.fire('fileRetry', $);
          break;
        }
      };

      // Main code to set up a file object with chunks,
      // packaged to be able to handle retries if needed.
      $.chunks = [];
      $.abort = function(){
        // Stop current uploads
        var abortCount = 0;
        $h.each($.chunks, function(c){
          if(c.status()=='uploading') {
            c.abort();
            abortCount++;
          }
        });
        if(abortCount>0) $.resumableObj.fire('fileProgress', $);
      };
      $.cancel = function(){
        // Reset this file to be void
        var _chunks = $.chunks;
        $.chunks = [];
        // Stop current uploads
        $h.each(_chunks, function(c){
          if(c.status()=='uploading')  {
            c.abort();
            $.resumableObj.uploadNextChunk();
          }
        });
        $.resumableObj.removeFile($);
        $.resumableObj.fire('fileProgress', $);
      };
      $.retry = function(){
        $.bootstrap();
        var firedRetry = false;
        $.resumableObj.on('chunkingComplete', function(){
          if(!firedRetry) $.resumableObj.upload();
          firedRetry = true;
        });
      };
      $.bootstrap = function(){
        $.abort();
        _error = false;
        // Rebuild stack of chunks from file
        $.chunks = [];
        $._prevProgress = 0;
        var round = $.getOpt('forceChunkSize') ? Math.ceil : Math.floor;
        var maxOffset = Math.max(round($.file.size/$.getOpt('chunkSize')),1);
        for (var offset=0; offset<maxOffset; offset++) {(function(offset){
            window.setTimeout(function(){
                $.chunks.push(new ResumableChunk($.resumableObj, $, offset, chunkEvent));
                $.resumableObj.fire('chunkingProgress',$,offset/maxOffset);
            },0);
        })(offset)}
        window.setTimeout(function(){
            $.resumableObj.fire('chunkingComplete',$);
        },0);
      };
      $.progress = function(){
        if(_error) return(1);
        // Sum up progress across everything
        var ret = 0;
        var error = false;
        $h.each($.chunks, function(c){
          if(c.status()=='error') error = true;
          ret += c.progress(true); // get chunk progress relative to entire file
        });
        ret = (error ? 1 : (ret>0.99999 ? 1 : ret));
        ret = Math.max($._prevProgress, ret); // We don't want to lose percentages when an upload is paused
        $._prevProgress = ret;
        return(ret);
      };
      $.isUploading = function(){
        var uploading = false;
        $h.each($.chunks, function(chunk){
          if(chunk.status()=='uploading') {
            uploading = true;
            return(false);
          }
        });
        return(uploading);
      };
      $.isComplete = function(){
        var outstanding = false;
        $h.each($.chunks, function(chunk){
          var status = chunk.status();
          if(status=='pending' || status=='uploading' || chunk.preprocessState === 1) {
            outstanding = true;
            return(false);
          }
        });
        return(!outstanding);
      };
      $.pause = function(pause){
          if(typeof(pause)==='undefined'){
              $._pause = ($._pause ? false : true);
          }else{
              $._pause = pause;
          }
      };
      $.isPaused = function() {
        return $._pause;
      };


      // Bootstrap and return
      $.resumableObj.fire('chunkingStart', $);
      $.bootstrap();
      return(this);
    }


    function ResumableChunk(resumableObj, fileObj, offset, callback){
      var $ = this;
      $.opts = {};
      $.getOpt = resumableObj.getOpt;
      $.resumableObj = resumableObj;
      $.fileObj = fileObj;
      $.fileObjSize = fileObj.size;
      $.fileObjType = fileObj.file.type;
      $.offset = offset;
      $.callback = callback;
      $.lastProgressCallback = (new Date);
      $.tested = false;
      $.retries = 0;
      $.pendingRetry = false;
      $.preprocessState = 0; // 0 = unprocessed, 1 = processing, 2 = finished

      // Computed properties
      var chunkSize = $.getOpt('chunkSize');
      $.loaded = 0;
      $.startByte = $.offset*chunkSize;
      $.endByte = Math.min($.fileObjSize, ($.offset+1)*chunkSize);
      if ($.fileObjSize-$.endByte < chunkSize && !$.getOpt('forceChunkSize')) {
        // The last chunk will be bigger than the chunk size, but less than 2*chunkSize
        $.endByte = $.fileObjSize;
      }
      $.xhr = null;

      // test() makes a GET request without any data to see if the chunk has already been uploaded in a previous session
      $.test = function(){
        // Set up request and listen for event
        $.xhr = new XMLHttpRequest();

        var testHandler = function(e){
          $.tested = true;
          var status = $.status();
          if(status=='success') {
            $.callback(status, $.message());
            $.resumableObj.uploadNextChunk();
          } else {
            $.send();
          }
        };
        $.xhr.addEventListener('load', testHandler, false);
        $.xhr.addEventListener('error', testHandler, false);
        $.xhr.addEventListener('timeout', testHandler, false);

        // Add data from the query options
        var params = [];
        var parameterNamespace = $.getOpt('parameterNamespace');
        var customQuery = $.getOpt('query');
        if(typeof customQuery == 'function') customQuery = customQuery($.fileObj, $);
        $h.each(customQuery, function(k,v){
          params.push([encodeURIComponent(parameterNamespace+k), encodeURIComponent(v)].join('='));
        });
        // Add extra data to identify chunk
        params = params.concat(
          [
            // define key/value pairs for additional parameters
            ['chunkNumberParameterName', $.offset + 1],
            ['chunkSizeParameterName', $.getOpt('chunkSize')],
            ['currentChunkSizeParameterName', $.endByte - $.startByte],
            ['totalSizeParameterName', $.fileObjSize],
            ['typeParameterName', $.fileObjType],
            ['identifierParameterName', $.fileObj.uniqueIdentifier],
            ['fileNameParameterName', $.fileObj.fileName],
            ['relativePathParameterName', $.fileObj.relativePath],
            ['totalChunksParameterName', $.fileObj.chunks.length]
          ].filter(function(pair){
            // include items that resolve to truthy values
            // i.e. exclude false, null, undefined and empty strings
            return $.getOpt(pair[0]);
          })
          .map(function(pair){
            // map each key/value pair to its final form
            return [
              parameterNamespace + $.getOpt(pair[0]),
              encodeURIComponent(pair[1])
            ].join('=');
          })
        );
        // Append the relevant chunk and send it
        $.xhr.open($.getOpt('testMethod'), $h.getTarget('test', params));
        $.xhr.timeout = $.getOpt('xhrTimeout');
        $.xhr.withCredentials = $.getOpt('withCredentials');
        // Add data from header options
        var customHeaders = $.getOpt('headers');
        if(typeof customHeaders === 'function') {
          customHeaders = customHeaders($.fileObj, $);
        }
        $h.each(customHeaders, function(k,v) {
          $.xhr.setRequestHeader(k, v);
        });
        $.xhr.send(null);
      };

      $.preprocessFinished = function(){
        $.preprocessState = 2;
        $.send();
      };

      // send() uploads the actual data in a POST call
      $.send = function(){
        var preprocess = $.getOpt('preprocess');
        if(typeof preprocess === 'function') {
          switch($.preprocessState) {
          case 0: $.preprocessState = 1; preprocess($); return;
          case 1: return;
          case 2: break;
          }
        }
        if($.getOpt('testChunks') && !$.tested) {
          $.test();
          return;
        }

        // Set up request and listen for event
        $.xhr = new XMLHttpRequest();

        // Progress
        $.xhr.upload.addEventListener('progress', function(e){
          if( (new Date) - $.lastProgressCallback > $.getOpt('throttleProgressCallbacks') * 1000 ) {
            $.callback('progress');
            $.lastProgressCallback = (new Date);
          }
          $.loaded=e.loaded||0;
        }, false);
        $.loaded = 0;
        $.pendingRetry = false;
        $.callback('progress');

        // Done (either done, failed or retry)
        var doneHandler = function(e){
          var status = $.status();
          if(status=='success'||status=='error') {
            $.callback(status, $.message());
            $.resumableObj.uploadNextChunk();
          } else {
            $.callback('retry', $.message());
            $.abort();
            $.retries++;
            var retryInterval = $.getOpt('chunkRetryInterval');
            if(retryInterval !== undefined) {
              $.pendingRetry = true;
              setTimeout($.send, retryInterval);
            } else {
              $.send();
            }
          }
        };
        $.xhr.addEventListener('load', doneHandler, false);
        $.xhr.addEventListener('error', doneHandler, false);
        $.xhr.addEventListener('timeout', doneHandler, false);

        // Set up the basic query data from Resumable
        var query = [
          ['chunkNumberParameterName', $.offset + 1],
          ['chunkSizeParameterName', $.getOpt('chunkSize')],
          ['currentChunkSizeParameterName', $.endByte - $.startByte],
          ['totalSizeParameterName', $.fileObjSize],
          ['typeParameterName', $.fileObjType],
          ['identifierParameterName', $.fileObj.uniqueIdentifier],
          ['fileNameParameterName', $.fileObj.fileName],
          ['relativePathParameterName', $.fileObj.relativePath],
          ['totalChunksParameterName', $.fileObj.chunks.length],
        ].filter(function(pair){
          // include items that resolve to truthy values
          // i.e. exclude false, null, undefined and empty strings
          return $.getOpt(pair[0]);
        })
        .reduce(function(query, pair){
          // assign query key/value
          query[$.getOpt(pair[0])] = pair[1];
          return query;
        }, {});
        // Mix in custom data
        var customQuery = $.getOpt('query');
        if(typeof customQuery == 'function') customQuery = customQuery($.fileObj, $);
        $h.each(customQuery, function(k,v){
          query[k] = v;
        });

        var func = ($.fileObj.file.slice ? 'slice' : ($.fileObj.file.mozSlice ? 'mozSlice' : ($.fileObj.file.webkitSlice ? 'webkitSlice' : 'slice')));
        var bytes = $.fileObj.file[func]($.startByte, $.endByte, $.getOpt('setChunkTypeFromFile') ? $.fileObj.file.type : "");
        var data = null;
        var params = [];

        var parameterNamespace = $.getOpt('parameterNamespace');
                if ($.getOpt('method') === 'octet') {
                    // Add data from the query options
                    data = bytes;
                    $h.each(query, function (k, v) {
                        params.push([encodeURIComponent(parameterNamespace + k), encodeURIComponent(v)].join('='));
                    });
                } else {
                    // Add data from the query options
                    data = new FormData();
                    $h.each(query, function (k, v) {
                        data.append(parameterNamespace + k, v);
                        params.push([encodeURIComponent(parameterNamespace + k), encodeURIComponent(v)].join('='));
                    });
                    if ($.getOpt('chunkFormat') == 'blob') {
                        data.append(parameterNamespace + $.getOpt('fileParameterName'), bytes, $.fileObj.fileName);
                    }
                    else if ($.getOpt('chunkFormat') == 'base64') {
                        var fr = new FileReader();
                        fr.onload = function (e) {
                            data.append(parameterNamespace + $.getOpt('fileParameterName'), fr.result);
                            $.xhr.send(data);
                        }
                        fr.readAsDataURL(bytes);
                    }
                }

        var target = $h.getTarget('upload', params);
        var method = $.getOpt('uploadMethod');

        $.xhr.open(method, target);
        if ($.getOpt('method') === 'octet') {
          $.xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        }
        $.xhr.timeout = $.getOpt('xhrTimeout');
        $.xhr.withCredentials = $.getOpt('withCredentials');
        // Add data from header options
        var customHeaders = $.getOpt('headers');
        if(typeof customHeaders === 'function') {
          customHeaders = customHeaders($.fileObj, $);
        }

        $h.each(customHeaders, function(k,v) {
          $.xhr.setRequestHeader(k, v);
        });

                if ($.getOpt('chunkFormat') == 'blob') {
                    $.xhr.send(data);
                }
      };
      $.abort = function(){
        // Abort and reset
        if($.xhr) $.xhr.abort();
        $.xhr = null;
      };
      $.status = function(){
        // Returns: 'pending', 'uploading', 'success', 'error'
        if($.pendingRetry) {
          // if pending retry then that's effectively the same as actively uploading,
          // there might just be a slight delay before the retry starts
          return('uploading');
        } else if(!$.xhr) {
          return('pending');
        } else if($.xhr.readyState<4) {
          // Status is really 'OPENED', 'HEADERS_RECEIVED' or 'LOADING' - meaning that stuff is happening
          return('uploading');
        } else {
          if($.xhr.status == 200 || $.xhr.status == 201) {
            // HTTP 200, 201 (created)
            return('success');
          } else if($h.contains($.getOpt('permanentErrors'), $.xhr.status) || $.retries >= $.getOpt('maxChunkRetries')) {
            // HTTP 415/500/501, permanent error
            return('error');
          } else {
            // this should never happen, but we'll reset and queue a retry
            // a likely case for this would be 503 service unavailable
            $.abort();
            return('pending');
          }
        }
      };
      $.message = function(){
        return($.xhr ? $.xhr.responseText : '');
      };
      $.progress = function(relative){
        if(typeof(relative)==='undefined') relative = false;
        var factor = (relative ? ($.endByte-$.startByte)/$.fileObjSize : 1);
        if($.pendingRetry) return(0);
        if(!$.xhr || !$.xhr.status) factor*=.95;
        var s = $.status();
        switch(s){
        case 'success':
        case 'error':
          return(1*factor);
        case 'pending':
          return(0*factor);
        default:
          return($.loaded/($.endByte-$.startByte)*factor);
        }
      };
      return(this);
    }

    // QUEUE
    $.uploadNextChunk = function(){
      var found = false;

      // In some cases (such as videos) it's really handy to upload the first
      // and last chunk of a file quickly; this let's the server check the file's
      // metadata and determine if there's even a point in continuing.
      if ($.getOpt('prioritizeFirstAndLastChunk')) {
        $h.each($.files, function(file){
          if(file.chunks.length && file.chunks[0].status()=='pending' && file.chunks[0].preprocessState === 0) {
            file.chunks[0].send();
            found = true;
            return(false);
          }
          if(file.chunks.length>1 && file.chunks[file.chunks.length-1].status()=='pending' && file.chunks[file.chunks.length-1].preprocessState === 0) {
            file.chunks[file.chunks.length-1].send();
            found = true;
            return(false);
          }
        });
        if(found) return(true);
      }

      // Now, simply look for the next, best thing to upload
      $h.each($.files, function(file){
        if(file.isPaused()===false){
         $h.each(file.chunks, function(chunk){
           if(chunk.status()=='pending' && chunk.preprocessState === 0) {
             chunk.send();
             found = true;
             return(false);
           }
          });
        }
        if(found) return(false);
      });
      if(found) return(true);

      // The are no more outstanding chunks to upload, check is everything is done
      var outstanding = false;
      $h.each($.files, function(file){
        if(!file.isComplete()) {
          outstanding = true;
          return(false);
        }
      });
      if(!outstanding) {
        // All chunks have been uploaded, complete
        $.fire('complete');
      }
      return(false);
    };


    // PUBLIC METHODS FOR RESUMABLE.JS
    $.assignBrowse = function(domNodes, isDirectory){
      if(typeof(domNodes.length)=='undefined') domNodes = [domNodes];

      $h.each(domNodes, function(domNode) {
        var input;
        if(domNode.tagName==='INPUT' && domNode.type==='file'){
          input = domNode;
        } else {
          input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.style.display = 'none';
          domNode.addEventListener('click', function(){
            input.style.opacity = 0;
            input.style.display='block';
            input.focus();
            input.click();
            input.style.display='none';
          }, false);
          domNode.appendChild(input);
        }
        var maxFiles = $.getOpt('maxFiles');
        if (typeof(maxFiles)==='undefined'||maxFiles!=1){
          input.setAttribute('multiple', 'multiple');
        } else {
          input.removeAttribute('multiple');
        }
        if(isDirectory){
          input.setAttribute('webkitdirectory', 'webkitdirectory');
        } else {
          input.removeAttribute('webkitdirectory');
        }
        var fileTypes = $.getOpt('fileType');
        if (typeof (fileTypes) !== 'undefined' && fileTypes.length >= 1) {
          input.setAttribute('accept', fileTypes.map(function (e) { return '.' + e }).join(','));
        }
        else {
          input.removeAttribute('accept');
        }
        // When new files are added, simply append them to the overall list
        input.addEventListener('change', function(e){
          appendFilesFromFileList(e.target.files,e);
          var clearInput = $.getOpt('clearInput');
          if (clearInput) {
            e.target.value = '';
          }
        }, false);
      });
    };
    $.assignDrop = function(domNodes){
      if(typeof(domNodes.length)=='undefined') domNodes = [domNodes];

      $h.each(domNodes, function(domNode) {
        domNode.addEventListener('dragover', preventDefault, false);
        domNode.addEventListener('dragenter', preventDefault, false);
        domNode.addEventListener('drop', onDrop, false);
      });
    };
    $.unAssignDrop = function(domNodes) {
      if (typeof(domNodes.length) == 'undefined') domNodes = [domNodes];

      $h.each(domNodes, function(domNode) {
        domNode.removeEventListener('dragover', preventDefault);
        domNode.removeEventListener('dragenter', preventDefault);
        domNode.removeEventListener('drop', onDrop);
      });
    };
    $.isUploading = function(){
      var uploading = false;
      $h.each($.files, function(file){
        if (file.isUploading()) {
          uploading = true;
          return(false);
        }
      });
      return(uploading);
    };
    $.upload = function(){
      // Make sure we don't start too many uploads at once
      if($.isUploading()) return;
      // Kick off the queue
      $.fire('uploadStart');
      for (var num=1; num<=$.getOpt('simultaneousUploads'); num++) {
        $.uploadNextChunk();
      }
    };
    $.pause = function(){
      // Resume all chunks currently being uploaded
      $h.each($.files, function(file){
        file.abort();
      });
      $.fire('pause');
    };
    $.cancel = function(){
      $.fire('beforeCancel');
      for(var i = $.files.length - 1; i >= 0; i--) {
        $.files[i].cancel();
      }
      $.fire('cancel');
    };
    $.progress = function(){
      var totalDone = 0;
      var totalSize = 0;
      // Resume all chunks currently being uploaded
      $h.each($.files, function(file){
        totalDone += file.progress()*file.size;
        totalSize += file.size;
      });
      return(totalSize>0 ? totalDone/totalSize : 0);
    };
    $.addFile = function(file, event){
      appendFilesFromFileList([file], event);
    };
    $.addFiles = function(files, event){
      appendFilesFromFileList(files, event);
    };
    $.removeFile = function(file){
      for(var i = $.files.length - 1; i >= 0; i--) {
        if($.files[i] === file) {
          $.files.splice(i, 1);
        }
      }
    };
    $.getFromUniqueIdentifier = function(uniqueIdentifier){
      var ret = false;
      $h.each($.files, function(f){
        if(f.uniqueIdentifier==uniqueIdentifier) ret = f;
      });
      return(ret);
    };
    $.getSize = function(){
      var totalSize = 0;
      $h.each($.files, function(file){
        totalSize += file.size;
      });
      return(totalSize);
    };
    $.handleDropEvent = function (e) {
      onDrop(e);
    };
    $.handleChangeEvent = function (e) {
      appendFilesFromFileList(e.target.files, e);
      e.target.value = '';
    };
    $.updateQuery = function(query){
        $.opts.query = query;
    };

    return(this);
  };


  // Node.js-style export for Node and Component
  if (true) {
    module.exports = Resumable;
  } else {}

})();


/***/ })

}]);