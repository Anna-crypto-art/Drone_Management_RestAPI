(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{243:function(t,e,a){"use strict";var n=a(46),o=a(34),i=a(20),r=a(184),s="toString",l=RegExp.prototype,c=l[s],u=i((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),p=c.name!=s;(u||p)&&n(RegExp.prototype,s,(function(){var t=o(this),e=String(t.source),a=t.flags,n=String(void 0===a&&t instanceof RegExp&&!("flags"in l)?r.call(t):a);return"/"+e+"/"+n}),{unsafe:!0})},244:function(t,e,a){},245:function(t,e,a){"use strict";var n,o=a(24),i=a(25),r=a(31),s=a(30),l=a(15);(function(t){t["stopLoading"]="stop-loading",t["startLoading"]="start-loading"})(n||(n={}));var c=function(t){Object(r["a"])(a,t);var e=Object(s["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return Object(i["a"])(a,[{key:"onStopLoading",value:function(t){this.$on(n.stopLoading,t)}},{key:"onStartLoading",value:function(t){this.$on(n.startLoading,t)}},{key:"stopLoading",value:function(){this.$emit(n.stopLoading)}},{key:"startLoading",value:function(){this.$emit(n.startLoading)}}]),a}(l["default"]),u=new c;e["a"]=u},246:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-button",{class:t.cls,attrs:{variant:t.variant,type:t.type,disabled:t.isDisabled},on:{click:t.onClick}},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"app-button-loading"},[a("b-spinner",{attrs:{small:""}})],1),t._t("default")],2)},o=[];n._withStripped=!0;var i=a(24),r=a(25),s=a(31),l=a(30),c=a(40),u=(a(61),a(26),a(15)),p=a(33),f=a(245),d=function(t,e,a,n){var o,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,a,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(r=(i<3?o(r):i>3?o(e,a,r):o(e,a))||r);return i>3&&r&&Object.defineProperty(e,a,r),r},b=function(t){Object(s["a"])(a,t);var e=Object(l["a"])(a);function a(){var t;return Object(i["a"])(this,a),t=e.apply(this,arguments),t.loading=!1,t}return Object(r["a"])(a,[{key:"created",value:function(){var t=this;f["a"].onStopLoading((function(){t.stopLoading()})),f["a"].onStartLoading((function(){t.startLoading()}))}},{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"stopLoading",value:function(){this.loading=!1}},{key:"startLoading",value:function(){this.loading=!0}},{key:"disable",value:function(){this.disabled=!0}},{key:"enable",value:function(){this.disabled=!1}},{key:"onClick",value:function(t){this.$emit("click",t)}}]),a}(u["default"]);d([Object(p["b"])({default:"button"})],b.prototype,"type",void 0),d([Object(p["b"])({default:""})],b.prototype,"cls",void 0),d([Object(p["b"])({default:"primary"})],b.prototype,"variant",void 0),d([Object(p["b"])({default:!1})],b.prototype,"disabled",void 0),b=d([Object(p["a"])({name:"app-button"})],b);var v=b,g=v,h=(a(247),a(39)),m=Object(h["a"])(g,n,o,!1,null,null,null);m.options.__file="src/app/shared/components/app-button/app-button.vue";e["a"]=m.exports},247:function(t,e,a){"use strict";a(244)},248:function(t,e,a){"use strict";var n=a(127),o=new n["a"];e["a"]=o},249:function(t,e,a){},254:function(t,e,a){"use strict";a(249)},256:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-auth-container"},[a("b-container",[a("b-row",{staticClass:"justify-content-md-center"},[a("b-col",{attrs:{cols:"12",md:"auto"}},[a("img",{staticClass:"logo-img",attrs:{src:"/images/logos/logo_default.png",srcset:"/images/logos/logo_default.webp, /images/logos/logo_default.svg, /images/logos/logo_default.png",alt:"Volateq"}}),a("div",{staticClass:"app-auth-box"},[t.title?a("div",{staticClass:"app-auth-box-title"},[a("h1",[t._v(t._s(t.title))]),t.subtitle?a("div",{staticClass:"app-auth-box-subtitle grayed",domProps:{innerHTML:t._s(t.subtitle)}}):t._e()]):t._e(),t._t("default"),a("b-alert",{staticClass:"app-auth-container-alert",attrs:{variant:t.alert.variant,dismissible:""},domProps:{innerHTML:t._s(t.alert.msg)},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}})],2)])],1)],1)],1)},o=[];n._withStripped=!0;var i=a(24),r=a(25),s=a(31),l=a(30),c=a(40),u=(a(61),a(26),a(15)),p=a(33),f=a(248),d=function(t,e,a,n){var o,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,a,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(r=(i<3?o(r):i>3?o(e,a,r):o(e,a))||r);return i>3&&r&&Object.defineProperty(e,a,r),r},b=function(t){Object(s["a"])(a,t);var e=Object(l["a"])(a);function a(){var t;return Object(i["a"])(this,a),t=e.apply(this,arguments),t.alert={msg:"",variant:"success"},t.showAlert=!1,t}return Object(r["a"])(a,[{key:"created",value:function(){var t=this;f["a"].onShowAlert((function(e){t.alert=e,t.showAlert=!0})),f["a"].onClearAlert((function(){t.showAlert=!1}))}}]),a}(u["default"]);d([Object(p["b"])({default:""})],b.prototype,"title",void 0),d([Object(p["b"])({default:""})],b.prototype,"subtitle",void 0),b=d([Object(p["a"])({name:"app-auth-container"})],b);var v=b,g=v,h=(a(254),a(39)),m=Object(h["a"])(g,n,o,!1,null,null,null);m.options.__file="src/app/auth/shared/components/auth-container.vue";e["a"]=m.exports},353:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-auth-forgot-password"},[a("app-auth-container",{attrs:{title:t.$t("forgot-password"),subtitle:t.$t("forgot-password_descr")}},[a("b-form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[a("b-form-group",{attrs:{label:t.$t("email"),"label-for":"email"}},[a("b-form-input",{attrs:{id:"email",type:"email",required:"",placeholder:t.$t("email")},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),a("app-button",{attrs:{type:"submit",cls:"width-100pc"}},[t._v(t._s(t.$t("send")))])],1)],1)],1)},o=[];n._withStripped=!0;var i=a(16),r=a(24),s=a(25),l=a(31),c=a(30),u=a(40),p=(a(62),a(61),a(26),a(243),a(15)),f=a(33),d=a(256),b=a(246),v=a(245),g=a(248),h=a(74),m=function(t,e,a,n){var o,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,a,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(r=(i<3?o(r):i>3?o(e,a,r):o(e,a))||r);return i>3&&r&&Object.defineProperty(e,a,r),r},y=function(t){Object(l["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.email="",t}return Object(s["a"])(a,[{key:"onSubmit",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,v["a"].startLoading(),t.next=4,h["a"].forgotPassword(this.email);case 4:g["a"].showSuccessAlert(this.$t("request-sent").toString()),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),g["a"].showErrorAlert(t.t0.message);case 10:return t.prev=10,v["a"].stopLoading(),t.finish(10);case 13:case"end":return t.stop()}}),t,this,[[0,7,10,13]])})));function e(){return t.apply(this,arguments)}return e}()}]),a}(p["default"]);y=m([Object(f["a"])({name:"app-auth-forgot-password",components:{AppAuthContainer:d["a"],AppButton:b["a"]}})],y);var j=y,O=j,w=a(39),_=Object(w["a"])(O,n,o,!1,null,null,null);_.options.__file="src/app/auth/reset-password/forgot-password.vue";e["default"]=_.exports}}]);