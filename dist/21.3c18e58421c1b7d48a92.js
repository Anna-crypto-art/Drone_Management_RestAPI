(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[21],{314:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"mar-top mar-bottom"},[n("center",[n("app-icon",{attrs:{cls:"font-xl",icon:t.authIcon}})],1)],1),n("b-form-group",{attrs:{label:t.inputLabel}},[n("b-form-input",{ref:"securityCodeInput",attrs:{type:"text",placeholder:t.placeholderText,required:"",pattern:"\\d{6,6}",autocomplete:"off"},on:{change:t.onChange},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1)],1)},o=[];r._withStripped=!0;var a=n(18),c=n(19),i=n(23),u=n(22),s=n(27),p=(n(44),n(24),n(94),n(16)),l=n(17),f=n(117),h=n(156),d=function(t,e,n,r){var o,a=arguments.length,c=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(s["a"])(Reflect))&&"function"===typeof Reflect.decorate)c=Reflect.decorate(t,e,n,r);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(a<3?o(c):a>3?o(e,n,c):o(e,n))||c);return a>3&&c&&Object.defineProperty(e,n,c),c},b=function(t){Object(i["a"])(n,t);var e=Object(u["a"])(n);function n(){var t;return Object(a["a"])(this,n),t=e.apply(this,arguments),t.code=null,t}return Object(c["a"])(n,[{key:"created",value:function(){this.code=this.value}},{key:"mounted",value:function(){this.securityCodeInput.focus()}},{key:"onChange",value:function(){this.$emit("input",this.code)}},{key:"inputLabel",get:function(){switch(this.authMethod){case f["a"].EMAIL:return this.$t("security-code-from-email").toString();case f["a"].TOTP:return this.$t("security-code-from-authenticator").toString()}return""}},{key:"placeholderText",get:function(){switch(this.authMethod){case f["a"].EMAIL:return this.$t("security-code").toString();case f["a"].TOTP:return this.$t("authentication-code").toString()}return""}},{key:"authIcon",get:function(){switch(this.authMethod){case f["a"].EMAIL:return"envelope";case f["a"].TOTP:return"phone"}return""}}]),n}(l["default"]);d([Object(p["b"])({required:!0})],b.prototype,"authMethod",void 0),d([Object(p["b"])({default:null})],b.prototype,"value",void 0),d([Object(p["c"])()],b.prototype,"securityCodeInput",void 0),b=d([Object(p["a"])({name:"app-security-code",components:{AppIcon:h["a"]}})],b);var y=b,v=y,m=n(28),O=Object(m["a"])(v,r,o,!1,null,null,null);O.options.__file="src/app/shared/components/app-security-code/app-security-code.vue";e["a"]=O.exports},341:function(t,e,n){"use strict";n.d(e,"a",(function(){return d}));var r=n(6),o=n(9),a=n(18),c=n(19),i=n(23),u=n(22),s=n(59),p=n(117),l=n(42),f=n(17),h=n(85),d=function(t){Object(i["a"])(n,t);var e=Object(u["a"])(n);function n(){return Object(a["a"])(this,n),e.apply(this,arguments)}return Object(c["a"])(n,[{key:"confirmLogin",value:function(){var t=Object(o["a"])(Object(r["a"])().mark((function t(e){return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,this.loading=!0,e!==p["a"].EMAIL){t.next=7;break}return t.next=5,l["a"].confirmMailLogin(this.$route.params.confirmKey,this.securityCode);case 5:t.next=10;break;case 7:if(e!==p["a"].TOTP){t.next=10;break}return t.next=10,l["a"].confirmTotpLogin(this.$route.params.confirmKey,this.securityCode);case 10:this.$route.query.dest&&"string"===typeof this.$route.query.dest?this.$router.push({path:this.$route.query.dest}):this.$router.push({name:"Home"}),t.next=18;break;case 13:t.prev=13,t.t0=t["catch"](0),t.t0.error&&t.t0.error===s["a"].RESOURCE_NOT_FOUND&&this.$router.push({name:"Login"}),h["a"].showError(t.t0),this.loading=!1;case 18:case"end":return t.stop()}}),t,this,[[0,13]])})));function e(e){return t.apply(this,arguments)}return e}()}]),n}(f["default"])},514:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-auth-confirm-login"},[n("app-auth-container",{attrs:{title:t.$t("mfa"),subtitle:t.$t("mfa-totp_descr")}},[n("b-form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[n("app-security-code",{attrs:{authMethod:1},model:{value:t.securityCode,callback:function(e){t.securityCode=e},expression:"securityCode"}}),n("app-button",{ref:"submitButton",attrs:{type:"submit",cls:"width-100pc",loading:t.loading}},[t._v(t._s(t.$t("verify")))])],1)],1)],1)},o=[];r._withStripped=!0;var a=n(6),c=n(9),i=n(18),u=n(19),s=n(23),p=n(22),l=n(27),f=(n(44),n(24),n(16)),h=n(99),d=n(62),b=n(314),y=n(341),v=n(117),m=function(t,e,n,r){var o,a=arguments.length,c=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(l["a"])(Reflect))&&"function"===typeof Reflect.decorate)c=Reflect.decorate(t,e,n,r);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(a<3?o(c):a>3?o(e,n,c):o(e,n))||c);return a>3&&c&&Object.defineProperty(e,n,c),c},O=function(t){Object(s["a"])(n,t);var e=Object(p["a"])(n);function n(){var t;return Object(i["a"])(this,n),t=e.apply(this,arguments),t.loading=!1,t.securityCode="",t}return Object(u["a"])(n,[{key:"onSubmit",value:function(){var t=Object(c["a"])(Object(a["a"])().mark((function t(e){return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.confirmLogin(v["a"].TOTP);case 2:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()}]),n}(y["a"]);O=m([Object(f["a"])({name:"app-auth-confirm-totp-login",components:{AppAuthContainer:h["a"],AppButton:d["a"],AppSecurityCode:b["a"]}})],O);var j=O,g=j,w=n(28),k=Object(w["a"])(g,r,o,!1,null,null,null);k.options.__file="src/app/auth/login/confirm-totp-login.vue";e["default"]=k.exports}}]);