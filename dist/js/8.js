(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1a28fa34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-button/app-button.vue?vue&type=template&id=435cb2ae&
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

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1a28fa34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-table-container/app-table-container.vue?vue&type=template&id=4f352817&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class:
        "app-table-container " +
        (_vm.size ? "app-table-container-" + _vm.size : ""),
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/app/shared/components/app-table-container/app-table-container.vue?vue&type=template&id=4f352817&

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
var es_object_get_own_property_descriptor = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__(34);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-table-container/app-table-container.vue?vue&type=script&lang=ts&








var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var app_table_containervue_type_script_lang_ts_AppTableContainer = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(AppTableContainer, _Vue);

  var _super = Object(createSuper["a" /* default */])(AppTableContainer);

  function AppTableContainer() {
    Object(classCallCheck["a" /* default */])(this, AppTableContainer);

    return _super.apply(this, arguments);
  }

  return Object(createClass["a" /* default */])(AppTableContainer);
}(vue_runtime_esm["default"]);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: ""
})], app_table_containervue_type_script_lang_ts_AppTableContainer.prototype, "size", void 0);

app_table_containervue_type_script_lang_ts_AppTableContainer = __decorate([vue_property_decorator["a" /* Component */]], app_table_containervue_type_script_lang_ts_AppTableContainer);
/* harmony default export */ var app_table_containervue_type_script_lang_ts_ = (app_table_containervue_type_script_lang_ts_AppTableContainer);
// CONCATENATED MODULE: ./src/app/shared/components/app-table-container/app-table-container.vue?vue&type=script&lang=ts&
 /* harmony default export */ var app_table_container_app_table_containervue_type_script_lang_ts_ = (app_table_containervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/app/shared/components/app-table-container/app-table-container.vue?vue&type=style&index=0&lang=scss&
var app_table_containervue_type_style_index_0_lang_scss_ = __webpack_require__(264);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(43);

// CONCATENATED MODULE: ./src/app/shared/components/app-table-container/app-table-container.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  app_table_container_app_table_containervue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app/shared/components/app-table-container/app-table-container.vue"
/* harmony default export */ var app_table_container = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_table_container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(258);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_table_container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_table_container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(19);
var aFunction = __webpack_require__(62);
var toObject = __webpack_require__(44);
var fails = __webpack_require__(23);
var arrayMethodIsStrict = __webpack_require__(134);

var test = [];
var nativeSort = test.sort;

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD;

// `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_modal_form_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(263);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_modal_form_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_modal_form_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1a28fa34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-modal/app-modal-form.vue?vue&type=template&id=54acf358&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "b-modal",
    {
      staticClass: "app-modal-form",
      attrs: {
        id: _vm.id,
        "ok-title": _vm.okTitle,
        "no-close-on-backdrop": "",
      },
      scopedSlots: _vm._u(
        [
          {
            key: "modal-title",
            fn: function () {
              return [
                _c(
                  "div",
                  { staticClass: "app-modal-form-title" },
                  [
                    _vm._t("modal-title", [
                      _c("h2", [_vm._v(_vm._s(_vm.title))]),
                      _vm.subtitle
                        ? _c("div", {
                            staticClass: "app-modal-form-title-subtitle grayed",
                            domProps: { innerHTML: _vm._s(_vm.subtitle) },
                          })
                        : _vm._e(),
                    ]),
                  ],
                  2
                ),
              ]
            },
            proxy: true,
          },
          {
            key: "modal-footer",
            fn: function () {
              return [
                _c(
                  "b-button",
                  {
                    attrs: { variant: "secondary" },
                    on: {
                      click: function ($event) {
                        return _vm.$bvModal.hide(_vm.id)
                      },
                    },
                  },
                  [_vm._v(_vm._s(_vm.$t("cancel")))]
                ),
                _c(
                  "app-button",
                  {
                    attrs: { loading: _vm.modalLoading },
                    on: { click: _vm.onSubmit },
                  },
                  [_vm._v(_vm._s(_vm.okTitle))]
                ),
              ]
            },
            proxy: true,
          },
        ],
        null,
        true
      ),
    },
    [
      _c("b-alert", {
        staticClass: "app-modal-form-alert",
        attrs: { variant: _vm.alertVariant, dismissible: "" },
        domProps: { innerHTML: _vm._s(_vm.alertMsg) },
        model: {
          value: _vm.showAlert,
          callback: function ($$v) {
            _vm.showAlert = $$v
          },
          expression: "showAlert",
        },
      }),
      _c("form", { on: { submit: _vm.onSubmit } }, [_vm._t("default")], 2),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/app/shared/components/app-modal/app-modal-form.vue?vue&type=template&id=54acf358&

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

// EXTERNAL MODULE: ./src/app/shared/components/app-button/app-button.vue + 4 modules
var app_button = __webpack_require__(254);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/shared/components/app-modal/app-modal-form.vue?vue&type=script&lang=ts&








var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var app_modal_formvue_type_script_lang_ts_AppModalForm = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(AppModalForm, _Vue);

  var _super = Object(createSuper["a" /* default */])(AppModalForm);

  function AppModalForm() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, AppModalForm);

    _this = _super.apply(this, arguments);
    _this.showAlert = false;
    _this.alertMsg = "";
    _this.alertVariant = "default";
    return _this;
  }

  Object(createClass["a" /* default */])(AppModalForm, [{
    key: "show",
    value: function show() {
      this.$bvModal.show(this.id || "");
    }
  }, {
    key: "hide",
    value: function hide() {
      this.hideAlert();
      this.$bvModal.hide(this.id || "");
    }
  }, {
    key: "alertError",
    value: function alertError(msg) {
      this.alertVariant = "danger";
      this.showAlert = true;
      console.error(msg);

      if (typeof msg === "string") {
        this.alertMsg = msg;
      } else {
        this.alertMsg = msg.error;
        var details = msg.details || msg.message;

        if (details) {
          this.alertMsg += "<br><small>Details: " + details + "</small>";
        }
      }
    }
  }, {
    key: "alertInfo",
    value: function alertInfo(msg) {
      this.alertVariant = "primary";
      this.showAlert = true;
      this.alertMsg = msg;
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(e) {
      this.$emit("submit");
    }
  }, {
    key: "hideAlert",
    value: function hideAlert() {
      this.showAlert = false;
      this.alertMsg = "";
    }
  }]);

  return AppModalForm;
}(vue_runtime_esm["default"]);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  required: true
})], app_modal_formvue_type_script_lang_ts_AppModalForm.prototype, "id", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: ""
})], app_modal_formvue_type_script_lang_ts_AppModalForm.prototype, "title", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])()], app_modal_formvue_type_script_lang_ts_AppModalForm.prototype, "subtitle", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  required: true
})], app_modal_formvue_type_script_lang_ts_AppModalForm.prototype, "okTitle", void 0);

__decorate([Object(vue_property_decorator["b" /* Prop */])({
  default: false
})], app_modal_formvue_type_script_lang_ts_AppModalForm.prototype, "modalLoading", void 0);

app_modal_formvue_type_script_lang_ts_AppModalForm = __decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-modal-form",
  components: {
    AppButton: app_button["a" /* default */]
  }
})], app_modal_formvue_type_script_lang_ts_AppModalForm);
/* harmony default export */ var app_modal_formvue_type_script_lang_ts_ = (app_modal_formvue_type_script_lang_ts_AppModalForm);
// CONCATENATED MODULE: ./src/app/shared/components/app-modal/app-modal-form.vue?vue&type=script&lang=ts&
 /* harmony default export */ var app_modal_app_modal_formvue_type_script_lang_ts_ = (app_modal_formvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/app/shared/components/app-modal/app-modal-form.vue?vue&type=style&index=0&lang=scss&
var app_modal_formvue_type_style_index_0_lang_scss_ = __webpack_require__(271);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(43);

// CONCATENATED MODULE: ./src/app/shared/components/app-modal/app-modal-form.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  app_modal_app_modal_formvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app/shared/components/app-modal/app-modal-form.vue"
/* harmony default export */ var app_modal_form = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_customers_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(301);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_customers_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_customers_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1a28fa34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/settings/customers/customers.vue?vue&type=template&id=029567b6&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "app-settings-customers" },
    [
      _c(
        "div",
        { staticClass: "app-settings-customers-table-toolbar" },
        [
          _c(
            "b-button",
            {
              directives: [
                {
                  name: "b-modal",
                  rawName: "v-b-modal.edit-customer-modal",
                  modifiers: { "edit-customer-modal": true },
                },
              ],
              attrs: { variant: "primary" },
              on: { click: _vm.onCreateCustomerClick },
            },
            [_vm._v(" " + _vm._s(_vm.$t("create-customer")) + " ")]
          ),
        ],
        1
      ),
      _c(
        "app-table-container",
        [
          _c("b-table", {
            attrs: {
              fields: _vm.columns,
              items: _vm.rows,
              "head-variant": "light",
              hover: "",
              busy: _vm.loading,
            },
            scopedSlots: _vm._u([
              {
                key: "table-busy",
                fn: function () {
                  return [
                    _c(
                      "div",
                      { staticClass: "text-center" },
                      [_c("b-spinner", { staticClass: "align-middle" })],
                      1
                    ),
                  ]
                },
                proxy: true,
              },
              {
                key: "cell(plants)",
                fn: function (row) {
                  return [
                    _c("span", { staticClass: "grayed" }, [
                      _vm._v(
                        " " +
                          _vm._s(
                            row.item.plants
                              .map(function (plant) {
                                return plant.name
                              })
                              .join(", ")
                          ) +
                          " "
                      ),
                    ]),
                  ]
                },
              },
              {
                key: "cell(actions)",
                fn: function (row) {
                  return [
                    _c(
                      "div",
                      { staticClass: "hover-cell pull-right" },
                      [
                        _c(
                          "b-button",
                          {
                            attrs: {
                              variant: "secondary",
                              size: "sm",
                              title: _vm.$t("edit-customer"),
                            },
                            on: {
                              click: function ($event) {
                                return _vm.onEditCustomerClick(row.item)
                              },
                            },
                          },
                          [_c("b-icon", { attrs: { icon: "wrench" } })],
                          1
                        ),
                        _c(
                          "b-button",
                          {
                            attrs: {
                              variant: "outline-danger",
                              size: "sm",
                              title: _vm.$t("delete-customer"),
                            },
                            on: {
                              click: function ($event) {
                                return _vm.onDeleteCustomerClick(row.item)
                              },
                            },
                          },
                          [_c("b-icon", { attrs: { icon: "trash" } })],
                          1
                        ),
                      ],
                      1
                    ),
                  ]
                },
              },
            ]),
          }),
        ],
        1
      ),
      _c(
        "app-modal-form",
        {
          ref: "appCustomerModal",
          attrs: {
            id: "edit-customer-modal",
            title: _vm.customerModalTitle,
            "ok-title": _vm.customerModalOkTitle,
            modalLoading: _vm.customerModalLoading,
          },
          on: { submit: _vm.onSubmitCustomer },
        },
        [
          _vm.currentCustomer
            ? _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    [
                      _c(
                        "b-form-group",
                        {
                          attrs: { label: _vm.$t("name"), "label-for": "name" },
                        },
                        [
                          _c("b-form-input", {
                            attrs: {
                              id: "customerName",
                              placeholder: _vm.$t("name"),
                              required: "",
                            },
                            model: {
                              value: _vm.currentCustomer.name,
                              callback: function ($$v) {
                                _vm.$set(_vm.currentCustomer, "name", $$v)
                              },
                              expression: "currentCustomer.name",
                            },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _c(
                    "b-col",
                    [
                      _c(
                        "b-form-group",
                        {
                          attrs: { label: _vm.$t("role"), "label-for": "role" },
                        },
                        [
                          _c("b-form-select", {
                            attrs: { id: "role", options: _vm.roles },
                            model: {
                              value: _vm.currentCustomer.role,
                              callback: function ($$v) {
                                _vm.$set(_vm.currentCustomer, "role", $$v)
                              },
                              expression: "currentCustomer.role",
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
              )
            : _vm._e(),
          _c(
            "b-row",
            [
              _c("b-col", [
                _c("div", [_c("b", [_vm._v(_vm._s(_vm.$t("plants")))])]),
                _c(
                  "div",
                  { staticClass: "app-settings-customers-plants-selection" },
                  _vm._l(_vm.selectPlants, function (selectPlant) {
                    return _c(
                      "div",
                      { key: selectPlant.plant.id },
                      [
                        _c(
                          "b-checkbox",
                          {
                            model: {
                              value: selectPlant.selected,
                              callback: function ($$v) {
                                _vm.$set(selectPlant, "selected", $$v)
                              },
                              expression: "selectPlant.selected",
                            },
                          },
                          [
                            _vm._v(" " + _vm._s(selectPlant.plant.name) + " "),
                            selectPlant.otherCustomers
                              ? _c("small", { staticClass: "grayed" }, [
                                  _vm._v(_vm._s(selectPlant.otherCustomers)),
                                ])
                              : _vm._e(),
                          ]
                        ),
                      ],
                      1
                    )
                  }),
                  0
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


// CONCATENATED MODULE: ./src/app/settings/customers/customers.vue?vue&type=template&id=029567b6&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(71);

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

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(189);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(105);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(104);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(136);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__(267);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__(135);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__(132);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(190);

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__(34);

// EXTERNAL MODULE: ./src/app/shared/components/app-table-container/app-table-container.vue + 4 modules
var app_table_container = __webpack_require__(262);

// EXTERNAL MODULE: ./src/app/shared/components/app-modal/app-modal-form.vue + 4 modules
var app_modal_form = __webpack_require__(272);

// EXTERNAL MODULE: ./src/app/shared/services/volateq-api/volateq-api.ts + 2 modules
var volateq_api = __webpack_require__(84);

// CONCATENATED MODULE: ./src/app/shared/services/volateq-api/api-schemas/customer-schemas.ts
var CustomerRole;

(function (CustomerRole) {
  CustomerRole["SERVICE"] = "Service";
  CustomerRole["OWNER"] = "Owner";
  CustomerRole["OPERATOR"] = "Operator";
})(CustomerRole || (CustomerRole = {}));
// EXTERNAL MODULE: ./src/app/shared/components/base-auth-component/base-auth-component.ts + 1 modules
var base_auth_component = __webpack_require__(85);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/settings/customers/customers.vue?vue&type=script&lang=ts&




















var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var customersvue_type_script_lang_ts_AppSettingsCustomers = /*#__PURE__*/function (_BaseAuthComponent) {
  Object(inherits["a" /* default */])(AppSettingsCustomers, _BaseAuthComponent);

  var _super = Object(createSuper["a" /* default */])(AppSettingsCustomers);

  function AppSettingsCustomers() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, AppSettingsCustomers);

    _this = _super.apply(this, arguments);
    _this.columns = [];
    _this.rows = [];
    _this.loading = false;
    _this.customerModalLoading = false;
    _this.customerModalTitle = "";
    _this.customerModalOkTitle = "";
    _this.selectPlants = [];
    _this.currentCustomer = null;
    return _this;
  }

  Object(createClass["a" /* default */])(AppSettingsCustomers, [{
    key: "created",
    value: function () {
      var _created = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.columns = [{
                  key: "name",
                  label: this.$t("name").toString()
                }, {
                  key: "role",
                  label: this.$t("role").toString()
                }, {
                  key: "plants",
                  label: this.$t("plants").toString()
                }, {
                  key: "actions",
                  label: ""
                }];
                this.roles = [{
                  value: null,
                  text: ""
                }].concat(Object(toConsumableArray["a" /* default */])(Object.keys(CustomerRole).map(function (roleKey) {
                  return {
                    value: CustomerRole[roleKey],
                    text: CustomerRole[roleKey]
                  };
                })));
                _context.next = 4;
                return this.updateCustomerRows();

              case 4:
                _context.prev = 4;
                _context.next = 7;
                return volateq_api["a" /* default */].getPlants();

              case 7:
                this.plants = _context.sent.sort(function (a, b) {
                  var nameA = a.name.toLowerCase();
                  var nameB = b.name.toLowerCase();

                  if (nameA < nameB) {
                    return -1;
                  }

                  if (nameA > nameB) {
                    return 1;
                  }

                  return 0;
                });
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                this.showError(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 10]]);
      }));

      function created() {
        return _created.apply(this, arguments);
      }

      return created;
    }()
  }, {
    key: "updateCustomerRows",
    value: function () {
      var _updateCustomerRows = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee2() {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.loading = true;
                _context2.prev = 1;
                _context2.next = 4;
                return volateq_api["a" /* default */].getCustomers();

              case 4:
                this.rows = _context2.sent.map(function (customer) {
                  return {
                    id: customer.id,
                    name: customer.name,
                    role: customer.role,
                    plants: customer.plants
                  };
                }).sort(function (a, b) {
                  var nameA = a.name.toLowerCase();
                  var nameB = b.name.toLowerCase();

                  if (nameA < nameB) {
                    return -1;
                  }

                  if (nameA > nameB) {
                    return 1;
                  }

                  return 0;
                });
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](1);
                this.showError(_context2.t0);

              case 10:
                _context2.prev = 10;
                this.loading = false;
                return _context2.finish(10);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 7, 10, 13]]);
      }));

      function updateCustomerRows() {
        return _updateCustomerRows.apply(this, arguments);
      }

      return updateCustomerRows;
    }()
  }, {
    key: "onCreateCustomerClick",
    value: function onCreateCustomerClick() {
      this.currentCustomer = {
        id: null,
        name: "",
        role: null,
        plants: []
      };
      this.selectPlants = this.plants.map(function (plant) {
        return {
          plant: plant,
          selected: false,
          otherCustomers: plant.customers.map(function (customer) {
            return customer.name;
          }).join(", ")
        };
      });
      this.customerModalTitle = this.$t("create-customer").toString();
      this.customerModalOkTitle = this.$t("create").toString();
      this.appCustomerModal.show();
    }
  }, {
    key: "onEditCustomerClick",
    value: function onEditCustomerClick(customerItem) {
      this.currentCustomer = customerItem;
      this.selectPlants = this.plants.map(function (plant) {
        return {
          plant: plant,
          selected: !!customerItem.plants.find(function (customerPlant) {
            return customerPlant.id === plant.id;
          }),
          otherCustomers: plant.customers.filter(function (customer) {
            return customer.id !== customerItem.id;
          }).map(function (customer) {
            return customer.name;
          }).join(", ")
        };
      });
      this.customerModalTitle = this.$t("edit-customer").toString() + ": " + customerItem.name;
      this.customerModalOkTitle = this.$t("apply").toString();
      this.appCustomerModal.show();
    }
  }, {
    key: "onSubmitCustomer",
    value: function () {
      var _onSubmitCustomer = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee3() {
        var selectedPlantIds;
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.customerModalLoading = true;
                _context3.prev = 1;
                selectedPlantIds = this.selectPlants.filter(function (selectPlant) {
                  return selectPlant.selected;
                }).map(function (selectPlant) {
                  return selectPlant.plant.id;
                });

                if (!(this.currentCustomer.id === null)) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 6;
                return volateq_api["a" /* default */].createCustomer({
                  name: this.currentCustomer.name,
                  role: this.currentCustomer.role || undefined,
                  plant_ids: selectedPlantIds
                });

              case 6:
                this.showSuccess(this.$t("customer-created-success").toString());
                _context3.next = 12;
                break;

              case 9:
                _context3.next = 11;
                return volateq_api["a" /* default */].updateCustomer(this.currentCustomer.id, {
                  name: this.currentCustomer.name,
                  role: this.currentCustomer.role || undefined,
                  plant_ids: selectedPlantIds
                });

              case 11:
                this.showSuccess(this.$t("customer-updated-success").toString());

              case 12:
                this.appCustomerModal.hide();
                _context3.next = 15;
                return this.updateCustomerRows();

              case 15:
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](1);
                this.showError(_context3.t0);

              case 20:
                _context3.prev = 20;
                this.customerModalLoading = false;
                return _context3.finish(20);

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 17, 20, 23]]);
      }));

      function onSubmitCustomer() {
        return _onSubmitCustomer.apply(this, arguments);
      }

      return onSubmitCustomer;
    }()
  }, {
    key: "onDeleteCustomerClick",
    value: function () {
      var _onDeleteCustomerClick = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/Object(regeneratorRuntime["a" /* default */])().mark(function _callee4(customerItem) {
        return Object(regeneratorRuntime["a" /* default */])().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.loading = true;
                _context4.prev = 1;

                if (confirm(this.$t("sure-delete-customer", {
                  customer: customerItem.name
                }).toString())) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt("return");

              case 4:
                _context4.next = 6;
                return volateq_api["a" /* default */].deleteCustomer(customerItem.id);

              case 6:
                this.showSuccess(this.$t("customer-deleted-success", {
                  customer: customerItem.name
                }).toString());
                _context4.next = 9;
                return this.updateCustomerRows();

              case 9:
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](1);
                this.showError(_context4.t0);

              case 14:
                _context4.prev = 14;
                this.loading = false;
                return _context4.finish(14);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 11, 14, 17]]);
      }));

      function onDeleteCustomerClick(_x) {
        return _onDeleteCustomerClick.apply(this, arguments);
      }

      return onDeleteCustomerClick;
    }()
  }]);

  return AppSettingsCustomers;
}(base_auth_component["a" /* BaseAuthComponent */]);

__decorate([Object(vue_property_decorator["c" /* Ref */])()], customersvue_type_script_lang_ts_AppSettingsCustomers.prototype, "appCustomerModal", void 0);

customersvue_type_script_lang_ts_AppSettingsCustomers = __decorate([Object(vue_property_decorator["a" /* Component */])({
  name: "app-settings-users",
  components: {
    AppTableContainer: app_table_container["a" /* default */],
    AppModalForm: app_modal_form["a" /* default */]
  }
})], customersvue_type_script_lang_ts_AppSettingsCustomers);
/* harmony default export */ var customersvue_type_script_lang_ts_ = (customersvue_type_script_lang_ts_AppSettingsCustomers);
// CONCATENATED MODULE: ./src/app/settings/customers/customers.vue?vue&type=script&lang=ts&
 /* harmony default export */ var customers_customersvue_type_script_lang_ts_ = (customersvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/app/settings/customers/customers.vue?vue&type=style&index=0&lang=scss&
var customersvue_type_style_index_0_lang_scss_ = __webpack_require__(344);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(43);

// CONCATENATED MODULE: ./src/app/settings/customers/customers.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  customers_customersvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app/settings/customers/customers.vue"
/* harmony default export */ var customers = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);