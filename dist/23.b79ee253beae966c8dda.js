(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[23],{510:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-auth-register"},[t.confirmationKey?n("app-auth-container",[n("b-form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[n("app-setup-totp",{attrs:{confirmationKey:t.confirmationKey},model:{value:t.securityCode,callback:function(e){t.securityCode=e},expression:"securityCode"}}),n("app-button",{attrs:{type:"submit",loading:t.loading}},[t._v(t._s(t.$t("verify")))]),n("hr"),n("app-button",{attrs:{type:"button",variant:"secondary",loading:t.cancelLoading},on:{click:t.onCancelMfaClick}},[t._v(" "+t._s(t.$t("cancel-and-use-mfa-with-email-instead"))+" ")])],1)],1):t._e()],1)},r=[];a._withStripped=!0;var i=n(6),o=n(9),c=n(18),u=n(19),s=n(23),p=n(22),l=n(27),f=(n(44),n(24),n(95),n(16)),h=n(99),d=n(62),y=n(404),b=n(42),m=n(148),v=n(100),g=function(t,e,n,a){var r,i=arguments.length,o=i<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===("undefined"===typeof Reflect?"undefined":Object(l["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(t,e,n,a);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(o=(i<3?r(o):i>3?r(e,n,o):r(e,n))||o);return i>3&&o&&Object.defineProperty(e,n,o),o},j=function(t){Object(s["a"])(n,t);var e=Object(p["a"])(n);function n(){var t;return Object(c["a"])(this,n),t=e.apply(this,arguments),t.confirmationKey=null,t.securityCode=null,t.loading=!1,t.cancelLoading=!1,t}return Object(u["a"])(n,[{key:"created",value:function(){this.confirmationKey=this.$route.params.confirmKey}},{key:"onSubmit",value:function(){var t=Object(o["a"])(Object(i["a"])().mark((function t(){return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b["a"].verifyTotpCode(this.confirmationKey,this.securityCode);case 2:this.showSuccess(this.$t("totp-verify-success").toString()),this.$router.push({name:"Login"});case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"onCancelMfaClick",value:function(){var t=Object(o["a"])(Object(i["a"])().mark((function t(){return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(confirm(this.$t("apply-are-you-sure").toString())){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,b["a"].cancelSetupTotpMfa(this.confirmationKey);case 4:this.$router.push({name:"Login"});case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}]),n}(v["a"]);g([Object(m["a"])("loading")],j.prototype,"onSubmit",null),g([Object(m["a"])("cancelLoading")],j.prototype,"onCancelMfaClick",null),j=g([Object(f["a"])({name:"app-register-setup-totp",components:{AppAuthContainer:h["a"],AppButton:d["a"],AppSetupTotp:y["a"]}})],j);var O=j,w=O,C=n(28),k=Object(C["a"])(w,a,r,!1,null,null,null);k.options.__file="src/app/auth/register/register-setup-totp.vue";e["default"]=k.exports}}]);