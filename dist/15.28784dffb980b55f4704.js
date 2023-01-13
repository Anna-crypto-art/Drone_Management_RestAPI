(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{303:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"mar-top mar-bottom"},[r("center",[r("app-icon",{attrs:{cls:"font-xl",icon:e.authIcon}})],1)],1),r("b-form-group",{attrs:{label:e.inputLabel}},[r("b-form-input",{attrs:{type:"text",placeholder:e.placeholderText,required:"",pattern:"\\d{6,6}",autocomplete:"off"},on:{change:e.onChange},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}})],1)],1)},a=[];n._withStripped=!0;var o=r(19),c=r(20),i=r(23),u=r(22),s=r(27),p=(r(46),r(21),r(112),r(16)),l=r(17),d=r(114),h=r(152),f=function(e,t,r,n){var a,o=arguments.length,c=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(s["a"])(Reflect))&&"function"===typeof Reflect.decorate)c=Reflect.decorate(e,t,r,n);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(c=(o<3?a(c):o>3?a(t,r,c):a(t,r))||c);return o>3&&c&&Object.defineProperty(t,r,c),c},b=function(e){Object(i["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(o["a"])(this,r),e=t.apply(this,arguments),e.code=null,e}return Object(c["a"])(r,[{key:"created",value:function(){this.code=this.value}},{key:"onChange",value:function(){this.$emit("input",this.code)}},{key:"inputLabel",get:function(){switch(this.authMethod){case d["a"].EMAIL:return this.$t("security-code-from-email").toString();case d["a"].TOTP:return this.$t("security-code-from-authenticator").toString()}return""}},{key:"placeholderText",get:function(){switch(this.authMethod){case d["a"].EMAIL:return this.$t("security-code").toString();case d["a"].TOTP:return this.$t("authentication-code").toString()}return""}},{key:"authIcon",get:function(){switch(this.authMethod){case d["a"].EMAIL:return"envelope";case d["a"].TOTP:return"phone"}return""}}]),r}(l["default"]);f([Object(p["b"])({required:!0})],b.prototype,"authMethod",void 0),f([Object(p["b"])({default:null})],b.prototype,"value",void 0),b=f([Object(p["a"])({name:"app-security-code",components:{AppIcon:h["a"]}})],b);var y=b,v=y,m=r(32),O=Object(m["a"])(v,n,a,!1,null,null,null);O.options.__file="src/app/shared/components/app-security-code/app-security-code.vue";t["a"]=O.exports},314:function(e,t,r){"use strict";r.d(t,"a",(function(){return f}));var n=r(6),a=r(11),o=r(19),c=r(20),i=r(23),u=r(22),s=r(56),p=r(114),l=r(47),d=r(17),h=r(84),f=function(e){Object(i["a"])(r,e);var t=Object(u["a"])(r);function r(){return Object(o["a"])(this,r),t.apply(this,arguments)}return Object(c["a"])(r,[{key:"confirmLogin",value:function(){var e=Object(a["a"])(Object(n["a"])().mark((function e(t){return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,this.loading=!0,t!==p["a"].EMAIL){e.next=7;break}return e.next=5,l["a"].confirmMailLogin(this.$route.params.confirmKey,this.securityCode);case 5:e.next=10;break;case 7:if(t!==p["a"].TOTP){e.next=10;break}return e.next=10,l["a"].confirmTotpLogin(this.$route.params.confirmKey,this.securityCode);case 10:this.$route.query.dest&&"string"===typeof this.$route.query.dest?this.$router.push({path:this.$route.query.dest}):this.$router.push({name:"Home"}),e.next=18;break;case 13:e.prev=13,e.t0=e["catch"](0),e.t0.error&&e.t0.error===s["a"].RESOURCE_NOT_FOUND&&this.$router.push({name:"Login"}),h["a"].showError(e.t0),this.loading=!1;case 18:case"end":return e.stop()}}),e,this,[[0,13]])})));function t(t){return e.apply(this,arguments)}return t}()}]),r}(d["default"])},471:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-auth-confirm-mail-login"},[r("app-auth-container",{attrs:{title:e.$t("mfa"),subtitle:e.$t("mfa-email_descr")}},[r("b-form",{on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[r("app-security-code",{attrs:{authMethod:0},model:{value:e.securityCode,callback:function(t){e.securityCode=t},expression:"securityCode"}}),r("app-button",{ref:"submitButton",attrs:{type:"submit",cls:"width-100pc",loading:e.loading}},[e._v(e._s(e.$t("verify")))])],1),r("hr"),r("app-button",{attrs:{type:"button",cls:"width-100pc",variant:"secondary",loading:e.resendCodeLoading},on:{click:e.resendSecurityCode}},[e._v(e._s(e.$t("resend-security-code")))])],1)],1)},a=[];n._withStripped=!0;var o=r(6),c=r(11),i=r(19),u=r(20),s=r(23),p=r(22),l=r(27),d=(r(46),r(21),r(112),r(16)),h=r(151),f=r(72),b=r(303),y=r(47),v=r(84),m=r(314),O=r(114),g=function(e,t,r,n){var a,o=arguments.length,c=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(l["a"])(Reflect))&&"function"===typeof Reflect.decorate)c=Reflect.decorate(e,t,r,n);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(c=(o<3?a(c):o>3?a(t,r,c):a(t,r))||c);return o>3&&c&&Object.defineProperty(t,r,c),c},j=function(e){Object(s["a"])(r,e);var t=Object(p["a"])(r);function r(){var e;return Object(i["a"])(this,r),e=t.apply(this,arguments),e.loading=!1,e.resendCodeLoading=!1,e.securityCode="",e}return Object(u["a"])(r,[{key:"onSubmit",value:function(){var e=Object(c["a"])(Object(o["a"])().mark((function e(){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.confirmLogin(O["a"].EMAIL);case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"resendSecurityCode",value:function(){var e=Object(c["a"])(Object(o["a"])().mark((function e(){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.resendCodeLoading=!0,e.next=4,y["a"].resendSecurityCode(this.$route.params.confirmKey);case 4:v["a"].showSuccessAlert(this.$t("resend-security-code-success").toString()),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),v["a"].showError(e.t0);case 10:return e.prev=10,this.resendCodeLoading=!1,e.finish(10);case 13:case"end":return e.stop()}}),e,this,[[0,7,10,13]])})));function t(){return e.apply(this,arguments)}return t}()}]),r}(m["a"]);j=g([Object(d["a"])({name:"app-auth-confirm-mail-login",components:{AppAuthContainer:h["a"],AppButton:f["a"],AppSecurityCode:b["a"]}})],j);var w=j,k=w,$=r(32),x=Object($["a"])(k,n,a,!1,null,null,null);x.options.__file="src/app/auth/login/confirm-mail-login.vue";t["default"]=x.exports}}]);