(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1a28fa34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/analysis/new-analysis/new-analysis.vue?vue&type=template&id=5d1639a3&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "app-content",
    {
      attrs: {
        title: _vm.$t("new-data-upload"),
        navback: true,
        subtitle: _vm.$t("create-new-analysis_descr"),
      },
    },
    [
      _c(
        "div",
        { staticClass: "app-new-analysis" },
        [
          _c("app-analysis-upload", {
            attrs: { analysis: _vm.analysis },
            on: {
              startUpload: _vm.onStartUpload,
              cancelUpload: _vm.onCancelUpload,
              retryUpload: _vm.onRetryUpload,
            },
            scopedSlots: _vm._u([
              {
                key: "uploadForm",
                fn: function () {
                  return [
                    _c(
                      "b-row",
                      { staticStyle: { "margin-bottom": "25px" } },
                      [
                        _vm.plantOptions.length > 1
                          ? _c(
                              "b-col",
                              { attrs: { sm: "4" } },
                              [
                                _c(
                                  "b-form-group",
                                  {
                                    attrs: {
                                      "label-cols": "auto",
                                      label: _vm.$t("plant"),
                                    },
                                  },
                                  [
                                    _c("b-form-select", {
                                      attrs: {
                                        required: "",
                                        options: _vm.plantOptions,
                                      },
                                      on: {
                                        change: _vm.onPlantSelectionChanged,
                                      },
                                      model: {
                                        value: _vm.selectedPlantId,
                                        callback: function ($$v) {
                                          _vm.selectedPlantId = $$v
                                        },
                                        expression: "selectedPlantId",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm.customerOptions.length > 1
                          ? _c(
                              "b-col",
                              { attrs: { sm: "4" } },
                              [
                                _c(
                                  "b-form-group",
                                  {
                                    attrs: {
                                      "label-cols": "auto",
                                      label: _vm.$t("customer"),
                                    },
                                  },
                                  [
                                    _c("b-form-select", {
                                      attrs: {
                                        required: "",
                                        options: _vm.customerOptions,
                                      },
                                      model: {
                                        value: _vm.selectedCustomerId,
                                        callback: function ($$v) {
                                          _vm.selectedCustomerId = $$v
                                        },
                                        expression: "selectedCustomerId",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                              ],
                              1
                            )
                          : _vm._e(),
                        _c(
                          "b-col",
                          { attrs: { sm: "4" } },
                          [
                            _c(
                              "b-form-group",
                              {
                                attrs: {
                                  "label-cols": "auto",
                                  label: _vm.$t("acquisition-date"),
                                },
                              },
                              [
                                _c("b-datepicker", {
                                  attrs: { required: "" },
                                  model: {
                                    value: _vm.flownAt,
                                    callback: function ($$v) {
                                      _vm.flownAt = $$v
                                    },
                                    expression: "flownAt",
                                  },
                                }),
                              ],
                              1
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                  ]
                },
                proxy: true,
              },
              {
                key: "cancelButton",
                fn: function () {
                  return [
                    _vm._v(
                      " " + _vm._s(_vm.$t("cancel-and-delete-all-files")) + " "
                    ),
                  ]
                },
                proxy: true,
              },
            ]),
          }),
        ],
        1
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/app/analysis/new-analysis/new-analysis.vue?vue&type=template&id=5d1639a3&

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

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(104);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__(132);

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__(34);

// EXTERNAL MODULE: ./src/app/shared/components/base-auth-component/base-auth-component.ts + 1 modules
var base_auth_component = __webpack_require__(85);

// EXTERNAL MODULE: ./src/app/shared/components/app-content/app-content.vue + 4 modules
var app_content = __webpack_require__(86);

// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/volateq-api.ts + 2 modules
var volateq_api = __webpack_require__(84);

// EXTERNAL MODULE: ./src/app/shared/components/app-button/app-button.vue + 4 modules
var app_button = __webpack_require__(254);

// EXTERNAL MODULE: ./src/app/analysis/shared/analysis-upload.vue + 17 modules
var analysis_upload = __webpack_require__(292);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/analysis/new-analysis/new-analysis.vue?vue&type=script&lang=ts&













var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var new_analysisvue_type_script_lang_ts_AppNewAnalysis = /*#__PURE__*/function (_BaseAuthComponent) {
  Object(inherits["a" /* default */])(AppNewAnalysis, _BaseAuthComponent);

  var _super = Object(createSuper["a" /* default */])(AppNewAnalysis);

  function AppNewAnalysis() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, AppNewAnalysis);

    _this = _super.apply(this, arguments);
    _this.selectedPlantId = null;
    _this.plantOptions = [];
    _this.selectedCustomerId = null;
    _this.customerOptions = [];
    _this.flownAt = null;
    _this.analysis = null;
    return _this;
  }

  Object(createClass["a" /* default */])(AppNewAnalysis, [{
    key: "created",
    value: function () {
      var _created = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return volateq_api["a" /* default */].getPlants();

              case 3:
                this.plants = _context.sent;
                this.plantOptions = this.plants.map(function (plant) {
                  return {
                    value: plant.id,
                    text: plant.name
                  };
                });

                if (this.plants.length === 1) {
                  this.selectedPlantId = this.plants[0].id;
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                this.showError(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function created() {
        return _created.apply(this, arguments);
      }

      return created;
    }()
  }, {
    key: "onPlantSelectionChanged",
    value: function onPlantSelectionChanged() {
      var _this2 = this;

      var plant = this.plants.find(function (plant) {
        return plant.id === _this2.selectedPlantId;
      });

      if (plant && plant.customers && plant.customers.length > 1) {
        this.customerOptions = plant.customers.map(function (customer) {
          return {
            value: customer.id,
            text: customer.name
          };
        });
      } else {
        this.customerOptions = [];
      }
    }
  }, {
    key: "onStartUpload",
    value: function () {
      var _onStartUpload = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(files, resume, done) {
        var analysisIdObj;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!resume) {
                  _context2.next = 4;
                  break;
                }

                done(this.analysis);
                return _context2.abrupt("return");

              case 4:
                _context2.next = 6;
                return volateq_api["a" /* default */].createAnalysis({
                  plant_id: this.selectedPlantId,
                  files: files,
                  flown_at: this.flownAt,
                  customer_id: this.selectedCustomerId || undefined
                });

              case 6:
                analysisIdObj = _context2.sent;
                _context2.next = 9;
                return volateq_api["a" /* default */].getAnalysis(analysisIdObj.id);

              case 9:
                this.analysis = _context2.sent;
                done(this.analysis);
                _context2.next = 17;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                this.showError(_context2.t0);
                done(null);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 13]]);
      }));

      function onStartUpload(_x, _x2, _x3) {
        return _onStartUpload.apply(this, arguments);
      }

      return onStartUpload;
    }()
  }, {
    key: "onCancelUpload",
    value: function () {
      var _onCancelUpload = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3(done) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.analysis) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                _context3.prev = 2;
                _context3.next = 5;
                return volateq_api["a" /* default */].cancelAnalysisUpload(this.analysis.id);

              case 5:
                _context3.next = 7;
                return volateq_api["a" /* default */].deleteAnalysis(this.analysis.id);

              case 7:
                done(false);
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](2);
                this.showError(_context3.t0);
                done(true);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 10]]);
      }));

      function onCancelUpload(_x4) {
        return _onCancelUpload.apply(this, arguments);
      }

      return onCancelUpload;
    }()
  }, {
    key: "onRetryUpload",
    value: function onRetryUpload() {
      // Forward to existing analysis
      this.$router.push({
        name: "EditAnalysis",
        params: {
          id: this.analysis.id
        }
      });
    }
  }]);

  return AppNewAnalysis;
}(base_auth_component["a" /* BaseAuthComponent */]);

new_analysisvue_type_script_lang_ts_AppNewAnalysis = __decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-new-analysis",
  components: {
    AppContent: app_content["a" /* default */],
    AppButton: app_button["a" /* default */],
    AppAnalysisUpload: analysis_upload["a" /* default */]
  }
})], new_analysisvue_type_script_lang_ts_AppNewAnalysis);
/* harmony default export */ var new_analysisvue_type_script_lang_ts_ = (new_analysisvue_type_script_lang_ts_AppNewAnalysis);
// CONCATENATED MODULE: ./src/app/analysis/new-analysis/new-analysis.vue?vue&type=script&lang=ts&
 /* harmony default export */ var new_analysis_new_analysisvue_type_script_lang_ts_ = (new_analysisvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(43);

// CONCATENATED MODULE: ./src/app/analysis/new-analysis/new-analysis.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  new_analysis_new_analysisvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app/analysis/new-analysis/new-analysis.vue"
/* harmony default export */ var new_analysis = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);