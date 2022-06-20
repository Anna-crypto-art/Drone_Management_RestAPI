(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

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
var es_object_get_own_property_descriptor = __webpack_require__(69);

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

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _app_shared_services_app_alert_app_alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60);

var authContainerEventBus = new _app_shared_services_app_alert_app_alert__WEBPACK_IMPORTED_MODULE_0__[/* AppAlertEventBus */ "a"]();
/* harmony default export */ __webpack_exports__["a"] = (authContainerEventBus);

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_auth_container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(260);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_auth_container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_auth_container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"499a4f47-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/auth/shared/components/auth-container.vue?vue&type=template&id=623e9bca&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "app-auth-container" },
    [
      _c(
        "b-container",
        [
          _c(
            "b-row",
            { staticClass: "justify-content-md-center" },
            [
              _c("b-col", { attrs: { cols: "12", md: "auto" } }, [
                _c("img", {
                  staticClass: "logo-img",
                  attrs: {
                    src: "/images/logos/logo_default.png",
                    srcset:
                      "/images/logos/logo_default.webp" +
                      ", " +
                      "/images/logos/logo_default.svg" +
                      ", " +
                      "/images/logos/logo_default.png",
                    alt: "Volateq",
                  },
                }),
                _c(
                  "div",
                  { staticClass: "app-auth-box" },
                  [
                    _vm.title
                      ? _c("div", { staticClass: "app-auth-box-title" }, [
                          _c("h1", [_vm._v(_vm._s(_vm.title))]),
                          _vm.subtitle
                            ? _c("div", {
                                staticClass: "app-auth-box-subtitle grayed",
                                domProps: { innerHTML: _vm._s(_vm.subtitle) },
                              })
                            : _vm._e(),
                        ])
                      : _vm._e(),
                    _vm._t("default"),
                    _c("b-alert", {
                      staticClass: "app-auth-container-alert",
                      attrs: { variant: _vm.alert.variant, dismissible: "" },
                      domProps: { innerHTML: _vm._s(_vm.alert.msg) },
                      model: {
                        value: _vm.showAlert,
                        callback: function ($$v) {
                          _vm.showAlert = $$v
                        },
                        expression: "showAlert",
                      },
                    }),
                  ],
                  2
                ),
              ]),
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


// CONCATENATED MODULE: ./src/app/auth/shared/components/auth-container.vue?vue&type=template&id=623e9bca&

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

// EXTERNAL MODULE: ./src/app/auth/shared/components/auth-container-event-bus.ts
var auth_container_event_bus = __webpack_require__(259);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/auth/shared/components/auth-container.vue?vue&type=script&lang=ts&








var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var auth_containervue_type_script_lang_ts_AppAuthContainer = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(AppAuthContainer, _Vue);

  var _super = Object(createSuper["a" /* default */])(AppAuthContainer);

  function AppAuthContainer() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, AppAuthContainer);

    _this = _super.apply(this, arguments);
    _this.alert = {
      msg: "",
      variant: "success"
    };
    _this.showAlert = false;
    return _this;
  }

  Object(createClass["a" /* default */])(AppAuthContainer, [{
    key: "created",
    value: function created() {
      var _this2 = this;

      auth_container_event_bus["a" /* default */].onShowAlert(function (newAlert) {
        _this2.alert = newAlert;
        _this2.showAlert = true;
      });
      auth_container_event_bus["a" /* default */].onClearAlert(function () {
        _this2.showAlert = false;
      });
    }
  }]);

  return AppAuthContainer;
}(vue_runtime_esm["default"]);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: ""
})], auth_containervue_type_script_lang_ts_AppAuthContainer.prototype, "title", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: ""
})], auth_containervue_type_script_lang_ts_AppAuthContainer.prototype, "subtitle", void 0);

auth_containervue_type_script_lang_ts_AppAuthContainer = __decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-auth-container"
})], auth_containervue_type_script_lang_ts_AppAuthContainer);
/* harmony default export */ var auth_containervue_type_script_lang_ts_ = (auth_containervue_type_script_lang_ts_AppAuthContainer);
// CONCATENATED MODULE: ./src/app/auth/shared/components/auth-container.vue?vue&type=script&lang=ts&
 /* harmony default export */ var components_auth_containervue_type_script_lang_ts_ = (auth_containervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/app/auth/shared/components/auth-container.vue?vue&type=style&index=0&lang=scss&
var auth_containervue_type_style_index_0_lang_scss_ = __webpack_require__(266);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(43);

// CONCATENATED MODULE: ./src/app/auth/shared/components/auth-container.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_auth_containervue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app/auth/shared/components/auth-container.vue"
/* harmony default export */ var auth_container = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"499a4f47-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/auth/register/register.vue?vue&type=template&id=6f1b932f&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "app-auth-register" },
    [
      _c("app-auth-container", { attrs: { title: "" } }, [
        _vm.hasUser
          ? _c(
              "div",
              [
                _c(
                  "b-form",
                  {
                    attrs: { autocomplete: "off" },
                    on: {
                      submit: function ($event) {
                        $event.preventDefault()
                        return _vm.onSubmit($event)
                      },
                    },
                  },
                  [
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.company,
                            expression: "company",
                          },
                        ],
                      },
                      [
                        _c(
                          "b-form-group",
                          {
                            attrs: {
                              label: _vm.$t("company"),
                              "label-for": "company",
                            },
                          },
                          [
                            _c("b-form-input", {
                              attrs: { id: "company", disabled: "" },
                              model: {
                                value: _vm.company,
                                callback: function ($$v) {
                                  _vm.company = $$v
                                },
                                expression: "company",
                              },
                            }),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                    _c(
                      "b-form-group",
                      {
                        attrs: { label: _vm.$t("email"), "label-for": "email" },
                      },
                      [
                        _c("b-form-input", {
                          attrs: { id: "email", type: "email", disabled: "" },
                          model: {
                            value: _vm.email,
                            callback: function ($$v) {
                              _vm.email = $$v
                            },
                            expression: "email",
                          },
                        }),
                      ],
                      1
                    ),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: _vm.$t("first-name"),
                          "label-for": "first-name",
                        },
                      },
                      [
                        _c("b-form-input", {
                          attrs: { id: "first-name", required: "" },
                          model: {
                            value: _vm.user.first_name,
                            callback: function ($$v) {
                              _vm.$set(_vm.user, "first_name", $$v)
                            },
                            expression: "user.first_name",
                          },
                        }),
                      ],
                      1
                    ),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: _vm.$t("last-name"),
                          "label-for": "last-name",
                        },
                      },
                      [
                        _c("b-form-input", {
                          attrs: { id: "last-name", required: "" },
                          model: {
                            value: _vm.user.last_name,
                            callback: function ($$v) {
                              _vm.$set(_vm.user, "last_name", $$v)
                            },
                            expression: "user.last_name",
                          },
                        }),
                      ],
                      1
                    ),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: _vm.$t("password"),
                          "label-for": "password",
                        },
                      },
                      [
                        _c("b-form-input", {
                          attrs: {
                            id: "password",
                            type: "password",
                            placeholder: _vm.$t("password"),
                            required: "",
                          },
                          model: {
                            value: _vm.user.password,
                            callback: function ($$v) {
                              _vm.$set(_vm.user, "password", $$v)
                            },
                            expression: "user.password",
                          },
                        }),
                      ],
                      1
                    ),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: _vm.$t("repeat-password"),
                          "label-for": "repeat-password",
                        },
                      },
                      [
                        _c("b-form-input", {
                          attrs: {
                            id: "repeat-password",
                            type: "password",
                            placeholder: _vm.$t("repeat-password"),
                            required: "",
                          },
                          model: {
                            value: _vm.user.repeat_password,
                            callback: function ($$v) {
                              _vm.$set(_vm.user, "repeat_password", $$v)
                            },
                            expression: "user.repeat_password",
                          },
                        }),
                      ],
                      1
                    ),
                    _c(
                      "div",
                      [
                        _c(
                          "b-form-checkbox",
                          {
                            attrs: { id: "terms-of-service", required: "" },
                            model: {
                              value: _vm.checkedTermsOfService,
                              callback: function ($$v) {
                                _vm.checkedTermsOfService = $$v
                              },
                              expression: "checkedTermsOfService",
                            },
                          },
                          [
                            _c("span", {
                              domProps: {
                                innerHTML: _vm._s(
                                  _vm.$t("accept-terms-of-service")
                                ),
                              },
                            }),
                          ]
                        ),
                      ],
                      1
                    ),
                    _c(
                      "app-button",
                      {
                        attrs: {
                          type: "submit",
                          cls: "width-100pc",
                          disabled: !_vm.checkedTermsOfService,
                          loading: _vm.loading,
                        },
                      },
                      [_vm._v(_vm._s(_vm.$t("register")))]
                    ),
                  ],
                  1
                ),
              ],
              1
            )
          : _vm._e(),
      ]),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/app/auth/register/register.vue?vue&type=template&id=6f1b932f&

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

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__(34);

// EXTERNAL MODULE: ./src/app/auth/shared/components/auth-container.vue + 4 modules
var auth_container = __webpack_require__(268);

// EXTERNAL MODULE: ./src/app/shared/components/app-button/app-button.vue + 4 modules
var app_button = __webpack_require__(254);

// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/volateq-api.ts + 2 modules
var volateq_api = __webpack_require__(84);

// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/api-errors.ts
var api_errors = __webpack_require__(47);

// EXTERNAL MODULE: ./src/app/auth/shared/components/auth-container-event-bus.ts
var auth_container_event_bus = __webpack_require__(259);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/auth/register/register.vue?vue&type=script&lang=ts&











var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var registervue_type_script_lang_ts_AppAuthRegister = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(AppAuthRegister, _Vue);

  var _super = Object(createSuper["a" /* default */])(AppAuthRegister);

  function AppAuthRegister() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, AppAuthRegister);

    _this = _super.apply(this, arguments);
    _this.hasUser = false;
    _this.email = "";
    _this.company = "";
    _this.checkedTermsOfService = false;
    _this.loading = false;
    return _this;
  }

  Object(createClass["a" /* default */])(AppAuthRegister, [{
    key: "created",
    value: function () {
      var _created = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        var user;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return volateq_api["a" /* default */].getInvitedUser(this.$route.params.confirmKey);

              case 3:
                user = _context.sent;
                this.user = {
                  user_id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  password: "",
                  repeat_password: ""
                };
                this.email = user.email;
                this.company = user.customer && user.customer.name || "";
                this.hasUser = true;
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);

                if (_context.t0.error === api_errors["a" /* ApiErrors */].RESOURCE_NOT_FOUND) {
                  this.$router.push({
                    name: "Login"
                  });
                }

                this.showAlert(_context.t0.error);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function created() {
        return _created.apply(this, arguments);
      }

      return created;
    }()
  }, {
    key: "onSubmit",
    value: function () {
      var _onSubmit = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2(e) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.user.password !== this.user.repeat_password)) {
                  _context2.next = 3;
                  break;
                }

                this.showAlert("PASSWORDS_DONT_MATCH");
                return _context2.abrupt("return");

              case 3:
                if (this.checkedTermsOfService) {
                  _context2.next = 6;
                  break;
                }

                this.showAlert("ACCEPT_TERMS_OF_SERVICE");
                return _context2.abrupt("return");

              case 6:
                _context2.prev = 6;
                this.loading = true;
                _context2.next = 10;
                return volateq_api["a" /* default */].registerUser(this.$route.params.confirmKey, this.user);

              case 10:
                this.$router.push({
                  name: "Login"
                });
                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](6);
                this.showAlert(_context2.t0.error);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 13]]);
      }));

      function onSubmit(_x) {
        return _onSubmit.apply(this, arguments);
      }

      return onSubmit;
    }()
  }, {
    key: "showAlert",
    value: function showAlert(msg) {
      auth_container_event_bus["a" /* default */].showErrorAlert(msg);
      this.loading = false;
    }
  }]);

  return AppAuthRegister;
}(vue_runtime_esm["default"]);

registervue_type_script_lang_ts_AppAuthRegister = __decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-auth-register",
  components: {
    AppAuthContainer: auth_container["a" /* default */],
    AppButton: app_button["a" /* default */]
  }
})], registervue_type_script_lang_ts_AppAuthRegister);
/* harmony default export */ var registervue_type_script_lang_ts_ = (registervue_type_script_lang_ts_AppAuthRegister);
// CONCATENATED MODULE: ./src/app/auth/register/register.vue?vue&type=script&lang=ts&
 /* harmony default export */ var register_registervue_type_script_lang_ts_ = (registervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(43);

// CONCATENATED MODULE: ./src/app/auth/register/register.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  register_registervue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app/auth/register/register.vue"
/* harmony default export */ var register = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);