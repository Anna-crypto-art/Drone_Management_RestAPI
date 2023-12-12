(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[26],{582:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-auth-reset-password"},[r("app-auth-container",{attrs:{title:e.$t("reset-password")}},[r("b-form",{on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[r("b-form-group",{attrs:{label:e.$t("password"),"label-for":"password"}},[r("b-form-input",{attrs:{id:"password",type:"password",required:"",placeholder:e.$t("password")},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),r("b-form-group",{attrs:{label:e.$t("repeat-password"),"label-for":"repeat-password"}},[r("b-form-input",{attrs:{id:"repeat-password",type:"password",required:"",placeholder:e.$t("repeat-password")},model:{value:e.repeatPassword,callback:function(t){e.repeatPassword=t},expression:"repeatPassword"}})],1),r("app-button",{attrs:{type:"submit",cls:"width-100pc",loading:e.loading}},[e._v(e._s(e.$t("apply")))])],1)],1)],1)},s=[];a._withStripped=!0;var o=r(6),n=r(9),p=r(18),c=r(19),i=r(23),u=r(22),l=r(27),d=(r(44),r(24),r(17)),w=r(15),f=r(101),h=r(63),b=r(88),m=r(42),v=r(60),O=function(e,t,r,a){var s,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"===("undefined"===typeof Reflect?"undefined":Object(l["a"])(Reflect))&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,a);else for(var p=e.length-1;p>=0;p--)(s=e[p])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n},j=function(e){Object(i["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(p["a"])(this,r),e=t.apply(this,arguments),e.password="",e.repeatPassword="",e.loading=!1,e}return Object(c["a"])(r,[{key:"created",value:function(){var e=Object(n["a"])(Object(o["a"])().mark((function e(){var t;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m["a"].confirmPasswordReset(this.$route.params.confirmKey);case 3:e.next=9;break;case 5:e.prev=5,e.t0=e["catch"](0),e.t0.error!==v["a"].RESOURCE_NOT_FOUND&&e.t0.error!==v["a"].TOKEN_EXPIRED||(t=void 0,e.t0.error===v["a"].TOKEN_EXPIRED&&(t={error:e.t0.error,message:e.t0.message}),this.$router.push({name:"Login",query:t})),b["a"].showErrorAlert(e.t0.error);case 9:case"end":return e.stop()}}),e,this,[[0,5]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onSubmit",value:function(){var e=Object(n["a"])(Object(o["a"])().mark((function e(){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.loading=!0,e.next=4,m["a"].resetPassword(this.$route.params.confirmKey,this.password,this.repeatPassword);case 4:this.$router.push({name:"Login"}),e.next=11;break;case 7:e.prev=7,e.t0=e["catch"](0),b["a"].showErrorAlert(e.t0.message),this.loading=!1;case 11:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(){return e.apply(this,arguments)}return t}()}]),r}(d["default"]);j=O([Object(w["a"])({name:"app-auth-reset-password",components:{AppAuthContainer:f["a"],AppButton:h["a"]}})],j);var y=j,g=y,E=r(28),P=Object(E["a"])(g,a,s,!1,null,null,null);P.options.__file="src/app/auth/reset-password/reset-password.vue";t["default"]=P.exports}}]);