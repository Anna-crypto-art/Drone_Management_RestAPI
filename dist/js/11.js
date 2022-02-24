(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{245:function(e,t,r){},246:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-button",{class:e.cls,attrs:{variant:e.variant,type:e.type,disabled:e.isDisabled},on:{click:e.onClick}},[r("span",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"app-button-loading"},[r("b-spinner",{attrs:{small:""}})],1),e._t("default")],2)},s=[];a._withStripped=!0;var n=r(22),o=r(23),i=r(31),l=r(30),c=r(41),u=(r(66),r(26),r(15)),p=r(32),d=function(e,t,r,a){var s,n=arguments.length,o=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,r,a);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(o=(n<3?s(o):n>3?s(t,r,o):s(t,r))||o);return n>3&&o&&Object.defineProperty(t,r,o),o},f=function(e){Object(i["a"])(r,e);var t=Object(l["a"])(r);function r(){return Object(n["a"])(this,r),t.apply(this,arguments)}return Object(o["a"])(r,[{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"onClick",value:function(e){this.$emit("click",e)}}]),r}(u["default"]);d([Object(p["b"])({default:"button"})],f.prototype,"type",void 0),d([Object(p["b"])({default:""})],f.prototype,"cls",void 0),d([Object(p["b"])({default:"primary"})],f.prototype,"variant",void 0),d([Object(p["b"])({default:!1})],f.prototype,"disabled",void 0),d([Object(p["b"])({default:!1})],f.prototype,"loading",void 0),f=d([Object(p["a"])({name:"app-button"})],f);var b=f,m=b,h=(r(247),r(40)),v=Object(h["a"])(m,a,s,!1,null,null,null);v.options.__file="src/app/shared/components/app-button/app-button.vue";t["a"]=v.exports},247:function(e,t,r){"use strict";r(245)},248:function(e,t,r){"use strict";var a=r(57),s=new a["a"];t["a"]=s},249:function(e,t,r){},254:function(e,t,r){"use strict";r(249)},256:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-auth-container"},[r("b-container",[r("b-row",{staticClass:"justify-content-md-center"},[r("b-col",{attrs:{cols:"12",md:"auto"}},[r("img",{staticClass:"logo-img",attrs:{src:"/images/logos/logo_default.png",srcset:"/images/logos/logo_default.webp, /images/logos/logo_default.svg, /images/logos/logo_default.png",alt:"Volateq"}}),r("div",{staticClass:"app-auth-box"},[e.title?r("div",{staticClass:"app-auth-box-title"},[r("h1",[e._v(e._s(e.title))]),e.subtitle?r("div",{staticClass:"app-auth-box-subtitle grayed",domProps:{innerHTML:e._s(e.subtitle)}}):e._e()]):e._e(),e._t("default"),r("b-alert",{staticClass:"app-auth-container-alert",attrs:{variant:e.alert.variant,dismissible:""},domProps:{innerHTML:e._s(e.alert.msg)},model:{value:e.showAlert,callback:function(t){e.showAlert=t},expression:"showAlert"}})],2)])],1)],1)],1)},s=[];a._withStripped=!0;var n=r(22),o=r(23),i=r(31),l=r(30),c=r(41),u=(r(66),r(26),r(15)),p=r(32),d=r(248),f=function(e,t,r,a){var s,n=arguments.length,o=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,r,a);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(o=(n<3?s(o):n>3?s(t,r,o):s(t,r))||o);return n>3&&o&&Object.defineProperty(t,r,o),o},b=function(e){Object(i["a"])(r,e);var t=Object(l["a"])(r);function r(){var e;return Object(n["a"])(this,r),e=t.apply(this,arguments),e.alert={msg:"",variant:"success"},e.showAlert=!1,e}return Object(o["a"])(r,[{key:"created",value:function(){var e=this;d["a"].onShowAlert((function(t){e.alert=t,e.showAlert=!0})),d["a"].onClearAlert((function(){e.showAlert=!1}))}}]),r}(u["default"]);f([Object(p["b"])({default:""})],b.prototype,"title",void 0),f([Object(p["b"])({default:""})],b.prototype,"subtitle",void 0),b=f([Object(p["a"])({name:"app-auth-container"})],b);var m=b,h=m,v=(r(254),r(40)),w=Object(v["a"])(h,a,s,!1,null,null,null);w.options.__file="src/app/auth/shared/components/auth-container.vue";t["a"]=w.exports},347:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-auth-register"},[r("app-auth-container",{attrs:{title:""}},[e.hasUser?r("div",[r("b-form",{attrs:{autocomplete:"off"},on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.company,expression:"company"}]},[r("b-form-group",{attrs:{label:e.$t("company"),"label-for":"company"}},[r("b-form-input",{attrs:{id:"company",disabled:""},model:{value:e.company,callback:function(t){e.company=t},expression:"company"}})],1)],1),r("b-form-group",{attrs:{label:e.$t("email"),"label-for":"email"}},[r("b-form-input",{attrs:{id:"email",type:"email",disabled:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),r("b-form-group",{attrs:{label:e.$t("first-name"),"label-for":"first-name"}},[r("b-form-input",{attrs:{id:"first-name",required:""},model:{value:e.user.first_name,callback:function(t){e.$set(e.user,"first_name",t)},expression:"user.first_name"}})],1),r("b-form-group",{attrs:{label:e.$t("last-name"),"label-for":"last-name"}},[r("b-form-input",{attrs:{id:"last-name",required:""},model:{value:e.user.last_name,callback:function(t){e.$set(e.user,"last_name",t)},expression:"user.last_name"}})],1),r("b-form-group",{attrs:{label:e.$t("password"),"label-for":"password"}},[r("b-form-input",{attrs:{id:"password",type:"password",placeholder:e.$t("password"),required:""},model:{value:e.user.password,callback:function(t){e.$set(e.user,"password",t)},expression:"user.password"}})],1),r("b-form-group",{attrs:{label:e.$t("repeat-password"),"label-for":"repeat-password"}},[r("b-form-input",{attrs:{id:"repeat-password",type:"password",placeholder:e.$t("repeat-password"),required:""},model:{value:e.user.repeat_password,callback:function(t){e.$set(e.user,"repeat_password",t)},expression:"user.repeat_password"}})],1),r("div",[r("b-form-checkbox",{attrs:{id:"terms-of-service",required:""},model:{value:e.checkedTermsOfService,callback:function(t){e.checkedTermsOfService=t},expression:"checkedTermsOfService"}},[r("span",{domProps:{innerHTML:e._s(e.$t("accept-terms-of-service"))}})])],1),r("app-button",{attrs:{type:"submit",cls:"width-100pc",disabled:!e.checkedTermsOfService,loading:e.loading}},[e._v(e._s(e.$t("register")))])],1)],1):e._e()])],1)},s=[];a._withStripped=!0;var n=r(16),o=r(22),i=r(23),l=r(31),c=r(30),u=r(41),p=(r(67),r(66),r(26),r(81),r(15)),d=r(32),f=r(256),b=r(246),m=r(80),h=r(50),v=r(248),w=function(e,t,r,a){var s,n=arguments.length,o=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,r,a);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(o=(n<3?s(o):n>3?s(t,r,o):s(t,r))||o);return n>3&&o&&Object.defineProperty(t,r,o),o},g=function(e){Object(l["a"])(r,e);var t=Object(c["a"])(r);function r(){var e;return Object(o["a"])(this,r),e=t.apply(this,arguments),e.hasUser=!1,e.email="",e.company="",e.checkedTermsOfService=!1,e.loading=!1,e}return Object(i["a"])(r,[{key:"created",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m["a"].getInvitedUser(this.$route.params.confirmKey);case 3:t=e.sent,this.user={user_id:t.id,first_name:t.first_name,last_name:t.last_name,password:"",repeat_password:""},this.email=t.email,this.company=t.customer&&t.customer.name||"",this.hasUser=!0,e.next=14;break;case 10:e.prev=10,e.t0=e["catch"](0),e.t0.error===h["a"].RESOURCE_NOT_FOUND&&this.$router.push({name:"Login"}),this.showAlert(e.t0.error);case 14:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onSubmit",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.user.password===this.user.repeat_password){e.next=3;break}return this.showAlert("PASSWORDS_DONT_MATCH"),e.abrupt("return");case 3:if(this.checkedTermsOfService){e.next=6;break}return this.showAlert("ACCEPT_TERMS_OF_SERVICE"),e.abrupt("return");case 6:return e.prev=6,this.loading=!0,e.next=10,m["a"].registerUser(this.$route.params.confirmKey,this.user);case 10:this.$router.push({name:"Login"}),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](6),this.showAlert(e.t0.error);case 16:case"end":return e.stop()}}),e,this,[[6,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"showAlert",value:function(e){v["a"].showErrorAlert(e),this.loading=!1}}]),r}(p["default"]);g=w([Object(d["a"])({name:"app-auth-register",components:{AppAuthContainer:f["a"],AppButton:b["a"]}})],g);var _=g,y=_,O=r(40),j=Object(O["a"])(y,a,s,!1,null,null,null);j.options.__file="src/app/auth/register/register.vue";t["default"]=j.exports}}]);