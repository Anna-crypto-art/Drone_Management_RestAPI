(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_monitoring_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(300);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_monitoring_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_monitoring_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"67b56802-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/analysis/monitoring/monitoring.vue?vue&type=template&id=4cb697c3&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "app-content",
    {
      attrs: {
        title: _vm.$t("QFly Analysis Monitoring"),
        subtitle: _vm.$t("Overview about all currently running evaluations."),
      },
    },
    [
      _c(
        "div",
        { staticClass: "monitoring-toolbar" },
        [
          _c(
            "b-button",
            {
              on: {
                click: function ($event) {
                  return _vm.loadAnalysisStatus()
                },
              },
            },
            [_vm._v(_vm._s(_vm.$t("Reload")))]
          ),
          _c(
            "div",
            { staticClass: "monitoring-toolbar-loading" },
            [_vm.loading ? _c("b-spinner") : _vm._e()],
            1
          ),
          _c(
            "b-checkbox",
            {
              attrs: { switch: "" },
              on: { change: _vm.changeAutoReload },
              model: {
                value: _vm.autoReload,
                callback: function ($$v) {
                  _vm.autoReload = $$v
                },
                expression: "autoReload",
              },
            },
            [_vm._v(" " + _vm._s(_vm.$t("Auto reload")) + " ")]
          ),
        ],
        1
      ),
      _c(
        "div",
        { staticClass: "app-analysis-monitoring" },
        _vm._l(_vm.monitoring_json, function (states, analysisName) {
          return _c(
            "div",
            { key: analysisName },
            [
              _c(
                "b-card",
                {
                  class: {
                    "app-analysis-monitoring-title": true,
                    closed: !_vm.collapsed_states[analysisName],
                  },
                },
                [
                  _c("span", [_vm._v(_vm._s(analysisName))]),
                  _c("b-icon", {
                    staticClass: "app-analysis-monitoring-toggle",
                    attrs: {
                      icon: "chevron-down",
                      "font-scale": "1.5",
                      variant: "secondary",
                    },
                    on: {
                      click: function ($event) {
                        return _vm.toggleAnalysis(analysisName)
                      },
                    },
                  }),
                ],
                1
              ),
              _c(
                "b-collapse",
                {
                  model: {
                    value: _vm.collapsed_states[analysisName],
                    callback: function ($$v) {
                      _vm.$set(_vm.collapsed_states, analysisName, $$v)
                    },
                    expression: "collapsed_states[analysisName]",
                  },
                },
                _vm._l(states, function (state, name) {
                  return _c(
                    "div",
                    {
                      key: name,
                      staticClass: "app-analysis-monitoring-states",
                    },
                    [
                      _c("b-card", { attrs: { "no-body": "" } }, [
                        _c(
                          "div",
                          {
                            class:
                              "app-analysis-monitoring-state app-analysis-monitoring-state-" +
                              state.state.toLowerCase(),
                            attrs: { title: state.state },
                          },
                          [
                            _c("span", { staticClass: "monitoring-project" }, [
                              _vm._v(_vm._s(name)),
                            ]),
                            _c(
                              "span",
                              { staticClass: "monitoring-state grayed" },
                              [_vm._v(_vm._s(state.state))]
                            ),
                            _c(
                              "span",
                              { staticClass: "monitoring-action grayed" },
                              [_vm._v(_vm._s(state.current_action))]
                            ),
                          ]
                        ),
                      ]),
                    ],
                    1
                  )
                }),
                0
              ),
            ],
            1
          )
        }),
        0
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/app/analysis/monitoring/monitoring.vue?vue&type=template&id=4cb697c3&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(55);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(75);

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

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__(34);

// EXTERNAL MODULE: ./src/app/shared/components/base-auth-component/base-auth-component.ts + 1 modules
var base_auth_component = __webpack_require__(62);

// EXTERNAL MODULE: ./src/app/shared/components/app-content/app-content.vue + 4 modules
var app_content = __webpack_require__(86);

// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/volateq-api.ts + 2 modules
var volateq_api = __webpack_require__(61);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/analysis/monitoring/monitoring.vue?vue&type=script&lang=ts&












var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AUTORELOAD_INTERVAL = 10e3;

var monitoringvue_type_script_lang_ts_AppAnalysisMonitoring = /*#__PURE__*/function (_BaseAuthComponent) {
  Object(inherits["a" /* default */])(AppAnalysisMonitoring, _BaseAuthComponent);

  var _super = Object(createSuper["a" /* default */])(AppAnalysisMonitoring);

  function AppAnalysisMonitoring() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, AppAnalysisMonitoring);

    _this = _super.apply(this, arguments);
    _this.monitoring_json = null;
    _this.collapsed_states = {};
    _this.loading = true;
    _this.autoReload = false;
    return _this;
  }

  Object(createClass["a" /* default */])(AppAnalysisMonitoring, [{
    key: "changeAutoReload",
    value: function changeAutoReload(autoReload) {
      if (autoReload) {
        this.reloadInterval = setInterval(this.loadAnalysisStatus, AUTORELOAD_INTERVAL);
      } else {
        this.reloadInterval != undefined && clearInterval(this.reloadInterval);
      }
    }
  }, {
    key: "toggleAnalysis",
    value: function toggleAnalysis(name) {
      this.collapsed_states = Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, this.collapsed_states), {}, Object(defineProperty["a" /* default */])({}, name, !this.collapsed_states[name])); // assigning to this.collapsed_states[name] breaks reactivity
    }
  }, {
    key: "loadAnalysisStatus",
    value: function () {
      var _loadAnalysisStatus = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var current_analyses, analysisName;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                this.loading = true;
                _context.next = 4;
                return volateq_api["a" /* default */].getAnalysisMonitoring();

              case 4:
                current_analyses = _context.sent;

                for (analysisName in current_analyses) {
                  if (this.collapsed_states[analysisName] === undefined) {
                    this.collapsed_states[analysisName] = true;
                  }
                }

                this.monitoring_json = current_analyses;
                this.loading = false;
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                this.showError(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function loadAnalysisStatus() {
        return _loadAnalysisStatus.apply(this, arguments);
      }

      return loadAnalysisStatus;
    }()
  }, {
    key: "created",
    value: function () {
      var _created = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.loadAnalysisStatus();

              case 1:
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
  }]);

  return AppAnalysisMonitoring;
}(base_auth_component["a" /* BaseAuthComponent */]);

monitoringvue_type_script_lang_ts_AppAnalysisMonitoring = __decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-analysis-monitoring",
  components: {
    AppContent: app_content["a" /* default */]
  }
})], monitoringvue_type_script_lang_ts_AppAnalysisMonitoring);
/* harmony default export */ var monitoringvue_type_script_lang_ts_ = (monitoringvue_type_script_lang_ts_AppAnalysisMonitoring);
// CONCATENATED MODULE: ./src/app/analysis/monitoring/monitoring.vue?vue&type=script&lang=ts&
 /* harmony default export */ var monitoring_monitoringvue_type_script_lang_ts_ = (monitoringvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/app/analysis/monitoring/monitoring.vue?vue&type=style&index=0&lang=scss&
var monitoringvue_type_style_index_0_lang_scss_ = __webpack_require__(344);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(43);

// CONCATENATED MODULE: ./src/app/analysis/monitoring/monitoring.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  monitoring_monitoringvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app/analysis/monitoring/monitoring.vue"
/* harmony default export */ var monitoring = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);