(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{245:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-button",{class:t.cls,attrs:{variant:t.variant,type:t.type,disabled:t.isDisabled,size:t.size},on:{click:t.onClick}},[r("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"app-button-loading"},[r("b-spinner",{attrs:{small:""}})],1),t._t("default")],2)},a=[];n._withStripped=!0;var o=r(20),i=r(21),s=r(29),c=r(28),u=r(42),l=(r(66),r(24),r(16)),p=r(32),d=function(t,e,r,n){var a,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(i=(o<3?a(i):o>3?a(e,r,i):a(e,r))||i);return o>3&&i&&Object.defineProperty(e,r,i),i},f=function(t){Object(s["a"])(r,t);var e=Object(c["a"])(r);function r(){return Object(o["a"])(this,r),e.apply(this,arguments)}return Object(i["a"])(r,[{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"onClick",value:function(t){this.$emit("click",t)}}]),r}(l["default"]);d([Object(p["b"])({default:"button"})],f.prototype,"type",void 0),d([Object(p["b"])({default:""})],f.prototype,"cls",void 0),d([Object(p["b"])({default:"primary"})],f.prototype,"variant",void 0),d([Object(p["b"])({default:!1})],f.prototype,"disabled",void 0),d([Object(p["b"])({default:!1})],f.prototype,"loading",void 0),d([Object(p["b"])({default:""})],f.prototype,"size",void 0),f=d([Object(p["a"])({name:"app-button"})],f);var b=f,h=b,v=(r(247),r(41)),g=Object(v["a"])(h,n,a,!1,null,null,null);g.options.__file="src/app/shared/components/app-button/app-button.vue";e["a"]=g.exports},246:function(t,e,r){},247:function(t,e,r){"use strict";r(246)},250:function(t,e,r){"use strict";var n=r(58),a=new n["a"];e["a"]=a},251:function(t,e,r){},257:function(t,e,r){"use strict";r(251)},259:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-auth-container"},[r("b-container",[r("b-row",{staticClass:"justify-content-md-center"},[r("b-col",{attrs:{cols:"12",md:"auto"}},[r("img",{staticClass:"logo-img",attrs:{src:"/images/logos/logo_default.png",srcset:"/images/logos/logo_default.webp, /images/logos/logo_default.svg, /images/logos/logo_default.png",alt:"Volateq"}}),r("div",{staticClass:"app-auth-box"},[t.title?r("div",{staticClass:"app-auth-box-title"},[r("h1",[t._v(t._s(t.title))]),t.subtitle?r("div",{staticClass:"app-auth-box-subtitle grayed",domProps:{innerHTML:t._s(t.subtitle)}}):t._e()]):t._e(),t._t("default"),r("b-alert",{staticClass:"app-auth-container-alert",attrs:{variant:t.alert.variant,dismissible:""},domProps:{innerHTML:t._s(t.alert.msg)},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}})],2)])],1)],1)],1)},a=[];n._withStripped=!0;var o=r(20),i=r(21),s=r(29),c=r(28),u=r(42),l=(r(66),r(24),r(16)),p=r(32),d=r(250),f=function(t,e,r,n){var a,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(i=(o<3?a(i):o>3?a(e,r,i):a(e,r))||i);return o>3&&i&&Object.defineProperty(e,r,i),i},b=function(t){Object(s["a"])(r,t);var e=Object(c["a"])(r);function r(){var t;return Object(o["a"])(this,r),t=e.apply(this,arguments),t.alert={msg:"",variant:"success"},t.showAlert=!1,t}return Object(i["a"])(r,[{key:"created",value:function(){var t=this;d["a"].onShowAlert((function(e){t.alert=e,t.showAlert=!0})),d["a"].onClearAlert((function(){t.showAlert=!1}))}}]),r}(l["default"]);f([Object(p["b"])({default:""})],b.prototype,"title",void 0),f([Object(p["b"])({default:""})],b.prototype,"subtitle",void 0),b=f([Object(p["a"])({name:"app-auth-container"})],b);var h=b,v=h,g=(r(257),r(41)),m=Object(g["a"])(v,n,a,!1,null,null,null);m.options.__file="src/app/auth/shared/components/auth-container.vue";e["a"]=m.exports},387:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-auth-confirm-login"},[r("app-auth-container",{attrs:{title:t.$t("mfa"),subtitle:t.$t("mfa-email_descr")}},[r("b-form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[r("b-form-group",{attrs:{label:t.$t("security-code"),"label-for":"securityCode"}},[r("b-form-input",{attrs:{id:"securityCode",type:"text",placeholder:t.$t("security-code"),required:""},model:{value:t.securityCode,callback:function(e){t.securityCode=e},expression:"securityCode"}})],1),r("app-button",{ref:"submitButton",attrs:{type:"submit",cls:"width-100pc",loading:t.loading}},[t._v(t._s(t.$t("login")))])],1),r("hr"),r("app-button",{attrs:{type:"button",cls:"width-100pc",variant:"secondary",loading:t.resendCodeLoading},on:{click:t.resendSecurityCode}},[t._v(t._s(t.$t("resend-security-code")))])],1)],1)},a=[];n._withStripped=!0;var o=r(14),i=r(20),s=r(21),c=r(29),u=r(28),l=r(42),p=(r(67),r(66),r(24),r(186),r(16)),d=r(32),f=r(259),b=r(245),h=r(80),v=r(250),g=r(46),m=function(t,e,r,n){var a,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(l["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(i=(o<3?a(i):o>3?a(e,r,i):a(e,r))||i);return o>3&&i&&Object.defineProperty(e,r,i),i},y=function(t){Object(c["a"])(r,t);var e=Object(u["a"])(r);function r(){var t;return Object(i["a"])(this,r),t=e.apply(this,arguments),t.loading=!1,t.resendCodeLoading=!1,t.securityCode="",t}return Object(s["a"])(r,[{key:"onSubmit",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.loading=!0,t.next=4,h["a"].confirmLogin(this.$route.params.confirmKey,this.securityCode);case 4:this.$router.push({name:"Home"}),t.next=12;break;case 7:t.prev=7,t.t0=t["catch"](0),t.t0.error&&t.t0.error===g["a"].RESOURCE_NOT_FOUND&&this.$router.push({name:"Login"}),v["a"].showError(t.t0),this.loading=!1;case 12:case"end":return t.stop()}}),t,this,[[0,7]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"resendSecurityCode",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.resendCodeLoading=!0,t.next=4,h["a"].resendSecurityCode(this.$route.params.confirmKey);case 4:v["a"].showSuccessAlert(this.$t("resend-security-code-success").toString()),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),v["a"].showError(t.t0);case 10:return t.prev=10,this.resendCodeLoading=!1,t.finish(10);case 13:case"end":return t.stop()}}),t,this,[[0,7,10,13]])})));function e(e){return t.apply(this,arguments)}return e}()}]),r}(p["default"]);y=m([Object(d["a"])({name:"app-auth-confirm-login",components:{AppAuthContainer:f["a"],AppButton:b["a"]}})],y);var O=y,j=O,w=r(41),_=Object(w["a"])(j,n,a,!1,null,null,null);_.options.__file="src/app/auth/login/confirm-login.vue";e["default"]=_.exports}}]);