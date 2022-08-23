(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{257:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-button",{class:"app-button "+e.cls,attrs:{"v-if":!e.superAdminProtected||e.superAdminProtected&&e.isSuperAdmin,variant:e.variant,type:e.type,disabled:e.isDisabled,size:e.size,title:e.realTitle},on:{click:e.onClick}},[r("span",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"app-button-loading"},[r("b-spinner",{attrs:{small:""}})],1),e.icon?r("b-icon",{staticClass:"app-button-icon",attrs:{icon:e.icon}}):e._e(),r("div",{directives:[{name:"show",rawName:"v-show",value:e.showSuperAdminShaded,expression:"showSuperAdminShaded"}],staticClass:"app-button-super-admin-shaded"},[r("div")]),r("span",{class:"app-button-content"+(e.hideText?" text-hidden":"")+(e.icon?" has-icon":"")},[e._t("default")],2),e.showSuperAdminIcon?r("app-super-admin-marker"):e._e()],1)},s=[];a._withStripped=!0;var n=r(8),i=r(14),o=r(20),c=r(21),l=r(30),u=r(29),p=r(35),d=(r(61),r(22),r(192),r(32)),f=r(62),b=r(88),m=function(e,t,r,a){var s,n=arguments.length,i=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"===("undefined"===typeof Reflect?"undefined":Object(p["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,r,a);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(i=(n<3?s(i):n>3?s(t,r,i):s(t,r))||i);return n>3&&i&&Object.defineProperty(t,r,i),i},h=function(e){Object(l["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(o["a"])(this,r),e=t.apply(this,arguments),e.realTitle="",e}return Object(c["a"])(r,[{key:"created",value:function(){var e=Object(i["a"])(Object(n["a"])().mark((function e(){return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.realTitle=this.title,this.superAdminProtected&&(this.realTitle+=" ("+this.$t("protected-super-admin-only").toString()+")");case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"onClick",value:function(e){this.$emit("click",e)}},{key:"showSuperAdminShaded",get:function(){return this.superAdminProtected&&!!this.icon&&(this.hideText||!this.$slots.default)}},{key:"showSuperAdminIcon",get:function(){return this.superAdminProtected&&!!this.$slots.default}}]),r}(f["a"]);m([Object(d["b"])({default:"button"})],h.prototype,"type",void 0),m([Object(d["b"])({default:""})],h.prototype,"cls",void 0),m([Object(d["b"])({default:"primary"})],h.prototype,"variant",void 0),m([Object(d["b"])({default:!1})],h.prototype,"disabled",void 0),m([Object(d["b"])({default:!1})],h.prototype,"loading",void 0),m([Object(d["b"])({default:""})],h.prototype,"size",void 0),m([Object(d["b"])({default:""})],h.prototype,"title",void 0),m([Object(d["b"])({default:null})],h.prototype,"icon",void 0),m([Object(d["b"])({default:!1})],h.prototype,"hideText",void 0),m([Object(d["b"])({default:!1})],h.prototype,"superAdminProtected",void 0),h=m([Object(d["a"])({name:"app-button",components:{AppSuperAdminMarker:b["a"]}})],h);var v=h,w=v,O=(r(259),r(41)),y=Object(O["a"])(w,a,s,!1,null,null,null);y.options.__file="src/app/shared/components/app-button/app-button.vue";t["a"]=y.exports},258:function(e,t,r){},259:function(e,t,r){"use strict";r(258)},265:function(e,t,r){"use strict";var a=r(60),s=new a["a"];t["a"]=s},266:function(e,t,r){},274:function(e,t,r){"use strict";r(266)},277:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-auth-container"},[r("b-container",[r("b-row",{staticClass:"justify-content-md-center"},[r("b-col",{attrs:{cols:"12",md:"auto"}},[r("img",{staticClass:"logo-img",attrs:{src:"/images/logos/logo_default.png",srcset:"/images/logos/logo_default.webp, /images/logos/logo_default.svg, /images/logos/logo_default.png",alt:"Volateq"}}),r("div",{staticClass:"app-auth-box"},[e.title?r("div",{staticClass:"app-auth-box-title"},[r("h1",[e._v(e._s(e.title))]),e.subtitle?r("div",{staticClass:"app-auth-box-subtitle grayed",domProps:{innerHTML:e._s(e.subtitle)}}):e._e()]):e._e(),e._t("default"),r("b-alert",{staticClass:"app-auth-container-alert",attrs:{variant:e.alert.variant,dismissible:""},domProps:{innerHTML:e._s(e.alert.msg)},model:{value:e.showAlert,callback:function(t){e.showAlert=t},expression:"showAlert"}})],2)])],1)],1)],1)},s=[];a._withStripped=!0;var n=r(20),i=r(21),o=r(30),c=r(29),l=r(35),u=(r(61),r(22),r(17)),p=r(32),d=r(265),f=function(e,t,r,a){var s,n=arguments.length,i=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"===("undefined"===typeof Reflect?"undefined":Object(l["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,r,a);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(i=(n<3?s(i):n>3?s(t,r,i):s(t,r))||i);return n>3&&i&&Object.defineProperty(t,r,i),i},b=function(e){Object(o["a"])(r,e);var t=Object(c["a"])(r);function r(){var e;return Object(n["a"])(this,r),e=t.apply(this,arguments),e.alert={msg:"",variant:"success"},e.showAlert=!1,e}return Object(i["a"])(r,[{key:"created",value:function(){var e=this;d["a"].onShowAlert((function(t){e.alert=t,e.showAlert=!0})),d["a"].onClearAlert((function(){e.showAlert=!1}))}}]),r}(u["default"]);f([Object(p["b"])({default:""})],b.prototype,"title",void 0),f([Object(p["b"])({default:""})],b.prototype,"subtitle",void 0),b=f([Object(p["a"])({name:"app-auth-container"})],b);var m=b,h=m,v=(r(274),r(41)),w=Object(v["a"])(h,a,s,!1,null,null,null);w.options.__file="src/app/auth/shared/components/auth-container.vue";t["a"]=w.exports},401:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-auth-register"},[r("app-auth-container",{attrs:{title:""}},[e.hasUser?r("div",[r("b-form",{attrs:{autocomplete:"off"},on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.company,expression:"company"}]},[r("b-form-group",{attrs:{label:e.$t("company"),"label-for":"company"}},[r("b-form-input",{attrs:{id:"company",disabled:""},model:{value:e.company,callback:function(t){e.company=t},expression:"company"}})],1)],1),r("b-form-group",{attrs:{label:e.$t("email"),"label-for":"email"}},[r("b-form-input",{attrs:{id:"email",type:"email",disabled:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),r("b-form-group",{attrs:{label:e.$t("first-name"),"label-for":"first-name"}},[r("b-form-input",{attrs:{id:"first-name",required:""},model:{value:e.user.first_name,callback:function(t){e.$set(e.user,"first_name",t)},expression:"user.first_name"}})],1),r("b-form-group",{attrs:{label:e.$t("last-name"),"label-for":"last-name"}},[r("b-form-input",{attrs:{id:"last-name",required:""},model:{value:e.user.last_name,callback:function(t){e.$set(e.user,"last_name",t)},expression:"user.last_name"}})],1),r("b-form-group",{attrs:{label:e.$t("password"),"label-for":"password"}},[r("b-form-input",{attrs:{id:"password",type:"password",placeholder:e.$t("password"),required:""},model:{value:e.user.password,callback:function(t){e.$set(e.user,"password",t)},expression:"user.password"}})],1),r("b-form-group",{attrs:{label:e.$t("repeat-password"),"label-for":"repeat-password"}},[r("b-form-input",{attrs:{id:"repeat-password",type:"password",placeholder:e.$t("repeat-password"),required:""},model:{value:e.user.repeat_password,callback:function(t){e.$set(e.user,"repeat_password",t)},expression:"user.repeat_password"}})],1),r("div",[r("b-form-checkbox",{attrs:{id:"terms-of-service",required:""},model:{value:e.checkedTermsOfService,callback:function(t){e.checkedTermsOfService=t},expression:"checkedTermsOfService"}},[r("span",{domProps:{innerHTML:e._s(e.$t("accept-terms-of-service"))}})])],1),r("app-button",{attrs:{type:"submit",cls:"width-100pc",disabled:!e.checkedTermsOfService,loading:e.loading}},[e._v(e._s(e.$t("register")))])],1)],1):e._e()])],1)},s=[];a._withStripped=!0;var n=r(8),i=r(14),o=r(20),c=r(21),l=r(30),u=r(29),p=r(35),d=(r(61),r(22),r(87),r(17)),f=r(32),b=r(277),m=r(257),h=r(63),v=r(56),w=r(265),O=function(e,t,r,a){var s,n=arguments.length,i=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"===("undefined"===typeof Reflect?"undefined":Object(p["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,r,a);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(i=(n<3?s(i):n>3?s(t,r,i):s(t,r))||i);return n>3&&i&&Object.defineProperty(t,r,i),i},y=function(e){Object(l["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(o["a"])(this,r),e=t.apply(this,arguments),e.hasUser=!1,e.email="",e.company="",e.checkedTermsOfService=!1,e.loading=!1,e}return Object(c["a"])(r,[{key:"created",value:function(){var e=Object(i["a"])(Object(n["a"])().mark((function e(){var t;return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h["a"].getInvitedUser(this.$route.params.confirmKey);case 3:t=e.sent,this.user={user_id:t.id,first_name:t.first_name,last_name:t.last_name,password:"",repeat_password:""},this.email=t.email,this.company=t.customer&&t.customer.name||"",this.hasUser=!0,e.next=14;break;case 10:e.prev=10,e.t0=e["catch"](0),e.t0.error===v["a"].RESOURCE_NOT_FOUND&&this.$router.push({name:"Login"}),this.showAlert(e.t0.error);case 14:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onSubmit",value:function(){var e=Object(i["a"])(Object(n["a"])().mark((function e(t){return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.user.password===this.user.repeat_password){e.next=3;break}return this.showAlert("PASSWORDS_DONT_MATCH"),e.abrupt("return");case 3:if(this.checkedTermsOfService){e.next=6;break}return this.showAlert("ACCEPT_TERMS_OF_SERVICE"),e.abrupt("return");case 6:return e.prev=6,this.loading=!0,e.next=10,h["a"].registerUser(this.$route.params.confirmKey,this.user);case 10:this.$router.push({name:"Login"}),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](6),this.showAlert(e.t0.error);case 16:case"end":return e.stop()}}),e,this,[[6,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"showAlert",value:function(e){w["a"].showErrorAlert(e),this.loading=!1}}]),r}(d["default"]);y=O([Object(f["a"])({name:"app-auth-register",components:{AppAuthContainer:b["a"],AppButton:m["a"]}})],y);var g=y,_=g,j=r(41),k=Object(j["a"])(_,a,s,!1,null,null,null);k.options.__file="src/app/auth/register/register.vue";t["default"]=k.exports}}]);