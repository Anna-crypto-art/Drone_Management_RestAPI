(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{243:function(t,e,n){"use strict";var a=n(46),r=n(34),o=n(20),i=n(184),s="toString",c=RegExp.prototype,u=c[s],l=o((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),p=u.name!=s;(l||p)&&a(RegExp.prototype,s,(function(){var t=r(this),e=String(t.source),n=t.flags,a=String(void 0===n&&t instanceof RegExp&&!("flags"in c)?i.call(t):n);return"/"+e+"/"+a}),{unsafe:!0})},244:function(t,e,n){},245:function(t,e,n){"use strict";var a,r=n(24),o=n(25),i=n(31),s=n(30),c=n(15);(function(t){t["stopLoading"]="stop-loading",t["startLoading"]="start-loading"})(a||(a={}));var u=function(t){Object(i["a"])(n,t);var e=Object(s["a"])(n);function n(){return Object(r["a"])(this,n),e.apply(this,arguments)}return Object(o["a"])(n,[{key:"onStopLoading",value:function(t){this.$on(a.stopLoading,t)}},{key:"onStartLoading",value:function(t){this.$on(a.startLoading,t)}},{key:"stopLoading",value:function(){this.$emit(a.stopLoading)}},{key:"startLoading",value:function(){this.$emit(a.startLoading)}}]),n}(c["default"]),l=new u;e["a"]=l},246:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-button",{class:t.cls,attrs:{variant:t.variant,type:t.type,disabled:t.isDisabled},on:{click:t.onClick}},[n("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"app-button-loading"},[n("b-spinner",{attrs:{small:""}})],1),t._t("default")],2)},r=[];a._withStripped=!0;var o=n(24),i=n(25),s=n(31),c=n(30),u=n(40),l=(n(61),n(26),n(15)),p=n(33),d=n(245),f=function(t,e,n,a){var r,o=arguments.length,i=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,n,a);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(i=(o<3?r(i):o>3?r(e,n,i):r(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i},b=function(t){Object(s["a"])(n,t);var e=Object(c["a"])(n);function n(){var t;return Object(o["a"])(this,n),t=e.apply(this,arguments),t.loading=!1,t}return Object(i["a"])(n,[{key:"created",value:function(){var t=this;d["a"].onStopLoading((function(){t.stopLoading()})),d["a"].onStartLoading((function(){t.startLoading()}))}},{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"stopLoading",value:function(){this.loading=!1}},{key:"startLoading",value:function(){this.loading=!0}},{key:"disable",value:function(){this.disabled=!0}},{key:"enable",value:function(){this.disabled=!1}},{key:"onClick",value:function(t){this.$emit("click",t)}}]),n}(l["default"]);f([Object(p["b"])({default:"button"})],b.prototype,"type",void 0),f([Object(p["b"])({default:""})],b.prototype,"cls",void 0),f([Object(p["b"])({default:"primary"})],b.prototype,"variant",void 0),f([Object(p["b"])({default:!1})],b.prototype,"disabled",void 0),b=f([Object(p["a"])({name:"app-button"})],b);var h=b,v=h,g=(n(247),n(39)),y=Object(g["a"])(v,a,r,!1,null,null,null);y.options.__file="src/app/shared/components/app-button/app-button.vue";e["a"]=y.exports},247:function(t,e,n){"use strict";n(244)},248:function(t,e,n){"use strict";var a=n(128),r=new a["a"];e["a"]=r},249:function(t,e,n){},254:function(t,e,n){"use strict";n(249)},256:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-auth-container"},[n("b-container",[n("b-row",{staticClass:"justify-content-md-center"},[n("b-col",{attrs:{cols:"12",md:"auto"}},[n("img",{staticClass:"logo-img",attrs:{src:"/images/logos/logo_default.png",srcset:"/images/logos/logo_default.webp, /images/logos/logo_default.svg, /images/logos/logo_default.png",alt:"Volateq"}}),n("div",{staticClass:"app-auth-box"},[t.title?n("div",{staticClass:"app-auth-box-title"},[n("h1",[t._v(t._s(t.title))]),t.subtitle?n("div",{staticClass:"app-auth-box-subtitle grayed",domProps:{innerHTML:t._s(t.subtitle)}}):t._e()]):t._e(),t._t("default"),n("b-alert",{staticClass:"app-auth-container-alert",attrs:{variant:t.alert.variant,dismissible:""},domProps:{innerHTML:t._s(t.alert.msg)},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}})],2)])],1)],1)],1)},r=[];a._withStripped=!0;var o=n(24),i=n(25),s=n(31),c=n(30),u=n(40),l=(n(61),n(26),n(15)),p=n(33),d=n(248),f=function(t,e,n,a){var r,o=arguments.length,i=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,n,a);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(i=(o<3?r(i):o>3?r(e,n,i):r(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i},b=function(t){Object(s["a"])(n,t);var e=Object(c["a"])(n);function n(){var t;return Object(o["a"])(this,n),t=e.apply(this,arguments),t.alert={msg:"",variant:"success"},t.showAlert=!1,t}return Object(i["a"])(n,[{key:"created",value:function(){var t=this;d["a"].onShowAlert((function(e){t.alert=e,t.showAlert=!0})),d["a"].onClearAlert((function(){t.showAlert=!1}))}}]),n}(l["default"]);f([Object(p["b"])({default:""})],b.prototype,"title",void 0),f([Object(p["b"])({default:""})],b.prototype,"subtitle",void 0),b=f([Object(p["a"])({name:"app-auth-container"})],b);var h=b,v=h,g=(n(254),n(39)),y=Object(g["a"])(v,a,r,!1,null,null,null);y.options.__file="src/app/auth/shared/components/auth-container.vue";e["a"]=y.exports},354:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-auth-confirm-login"},[n("app-auth-container",{attrs:{title:t.$t("mfa"),subtitle:t.$t("mfa-email_descr")}},[n("b-form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[n("b-form-group",{attrs:{label:t.$t("security-code"),"label-for":"securityCode"}},[n("b-form-input",{attrs:{id:"securityCode",type:"text",placeholder:t.$t("security-code"),required:""},model:{value:t.securityCode,callback:function(e){t.securityCode=e},expression:"securityCode"}})],1),n("app-button",{ref:"submitButton",attrs:{type:"submit",cls:"width-100pc"}},[t._v(t._s(t.$t("login")))])],1),n("hr"),n("app-button",{ref:"resendSecurityCodeButton",attrs:{type:"button",cls:"width-100pc",variant:"secondary"},on:{click:t.resendSecurityCode}},[t._v(t._s(t.$t("resend-security-code")))])],1)],1)},r=[];a._withStripped=!0;var o=n(16),i=n(24),s=n(25),c=n(31),u=n(30),l=n(40),p=(n(62),n(61),n(26),n(243),n(15)),d=n(33),f=n(256),b=n(246),h=n(74),v=n(248),g=n(49),y=function(t,e,n,a){var r,o=arguments.length,i=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===("undefined"===typeof Reflect?"undefined":Object(l["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,n,a);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(i=(o<3?r(i):o>3?r(e,n,i):r(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i},m=function(t){Object(c["a"])(n,t);var e=Object(u["a"])(n);function n(){var t;return Object(i["a"])(this,n),t=e.apply(this,arguments),t.securityCode="",t}return Object(s["a"])(n,[{key:"onSubmit",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.submitButton.startLoading(),t.next=4,h["a"].confirmLogin(this.$route.params.confirmKey,this.securityCode);case 4:this.$router.push({name:"Home"}),t.next=12;break;case 7:t.prev=7,t.t0=t["catch"](0),t.t0.error&&t.t0.error===g["a"].RESOURCE_NOT_FOUND&&this.$router.push({name:"Login"}),v["a"].showError(t.t0),this.submitButton.stopLoading();case 12:case"end":return t.stop()}}),t,this,[[0,7]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"resendSecurityCode",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.resendSecurityCodeButton.startLoading(),t.next=4,h["a"].resendSecurityCode(this.$route.params.confirmKey);case 4:v["a"].showSuccessAlert(this.$t("resend-security-code-success").toString()),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),v["a"].showError(t.t0);case 10:return t.prev=10,this.resendSecurityCodeButton.stopLoading(),t.finish(10);case 13:case"end":return t.stop()}}),t,this,[[0,7,10,13]])})));function e(e){return t.apply(this,arguments)}return e}()}]),n}(p["default"]);y([Object(d["c"])()],m.prototype,"resendSecurityCodeButton",void 0),y([Object(d["c"])()],m.prototype,"submitButton",void 0),m=y([Object(d["a"])({name:"app-auth-confirm-login",components:{AppAuthContainer:f["a"],AppButton:b["a"]}})],m);var O=m,j=O,w=n(39),_=Object(w["a"])(j,a,r,!1,null,null,null);_.options.__file="src/app/auth/login/confirm-login.vue";e["default"]=_.exports}}]);