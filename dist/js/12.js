(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{243:function(e,t,a){},244:function(e,t,a){"use strict";var r,s=a(25),n=a(26),o=a(31),i=a(30),c=a(15);(function(e){e["stopLoading"]="stop-loading",e["startLoading"]="start-loading"})(r||(r={}));var l=function(e){Object(o["a"])(a,e);var t=Object(i["a"])(a);function a(){return Object(s["a"])(this,a),t.apply(this,arguments)}return Object(n["a"])(a,[{key:"onStopLoading",value:function(e){this.$on(r.stopLoading,e)}},{key:"onStartLoading",value:function(e){this.$on(r.startLoading,e)}},{key:"stopLoading",value:function(){this.$emit(r.stopLoading)}},{key:"startLoading",value:function(){this.$emit(r.startLoading)}}]),a}(c["default"]),u=new l;t["a"]=u},245:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-button",{class:e.cls,attrs:{variant:e.variant,type:e.type,disabled:e.isDisabled},on:{click:e.onClick}},[a("span",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"app-button-loading"},[a("b-spinner",{attrs:{small:""}})],1),e._t("default")],2)},s=[];r._withStripped=!0;var n=a(25),o=a(26),i=a(31),c=a(30),l=a(40),u=(a(64),a(24),a(15)),p=a(33),d=a(244),f=function(e,t,a,r){var s,n=arguments.length,o=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(l["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,a,r);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(o=(n<3?s(o):n>3?s(t,a,o):s(t,a))||o);return n>3&&o&&Object.defineProperty(t,a,o),o},b=function(e){Object(i["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(n["a"])(this,a),e=t.apply(this,arguments),e.loading=!1,e}return Object(o["a"])(a,[{key:"created",value:function(){var e=this;d["a"].onStopLoading((function(){e.stopLoading()})),d["a"].onStartLoading((function(){e.startLoading()}))}},{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"stopLoading",value:function(){this.loading=!1}},{key:"startLoading",value:function(){this.loading=!0}},{key:"disable",value:function(){this.disabled=!0}},{key:"enable",value:function(){this.disabled=!1}},{key:"onClick",value:function(e){this.$emit("click",e)}}]),a}(u["default"]);f([Object(p["b"])({default:"button"})],b.prototype,"type",void 0),f([Object(p["b"])({default:""})],b.prototype,"cls",void 0),f([Object(p["b"])({default:"primary"})],b.prototype,"variant",void 0),f([Object(p["b"])({default:!1})],b.prototype,"disabled",void 0),b=f([Object(p["a"])({name:"app-button"})],b);var m=b,h=m,v=(a(246),a(39)),g=Object(v["a"])(h,r,s,!1,null,null,null);g.options.__file="src/app/shared/components/app-button/app-button.vue";t["a"]=g.exports},246:function(e,t,a){"use strict";a(243)},247:function(e,t,a){"use strict";var r=a(129),s=new r["a"];t["a"]=s},248:function(e,t,a){},253:function(e,t,a){"use strict";a(248)},255:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-auth-container"},[a("b-container",[a("b-row",{staticClass:"justify-content-md-center"},[a("b-col",{attrs:{cols:"12",md:"auto"}},[a("img",{staticClass:"logo-img",attrs:{src:"/images/logos/logo_default.png",srcset:"/images/logos/logo_default.webp, /images/logos/logo_default.svg, /images/logos/logo_default.png",alt:"Volateq"}}),a("div",{staticClass:"app-auth-box"},[e.title?a("div",{staticClass:"app-auth-box-title"},[a("h1",[e._v(e._s(e.title))]),e.subtitle?a("div",{staticClass:"app-auth-box-subtitle grayed",domProps:{innerHTML:e._s(e.subtitle)}}):e._e()]):e._e(),e._t("default"),a("b-alert",{staticClass:"app-auth-container-alert",attrs:{variant:e.alert.variant,dismissible:""},domProps:{innerHTML:e._s(e.alert.msg)},model:{value:e.showAlert,callback:function(t){e.showAlert=t},expression:"showAlert"}})],2)])],1)],1)],1)},s=[];r._withStripped=!0;var n=a(25),o=a(26),i=a(31),c=a(30),l=a(40),u=(a(64),a(24),a(15)),p=a(33),d=a(247),f=function(e,t,a,r){var s,n=arguments.length,o=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(l["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,a,r);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(o=(n<3?s(o):n>3?s(t,a,o):s(t,a))||o);return n>3&&o&&Object.defineProperty(t,a,o),o},b=function(e){Object(i["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(n["a"])(this,a),e=t.apply(this,arguments),e.alert={msg:"",variant:"success"},e.showAlert=!1,e}return Object(o["a"])(a,[{key:"created",value:function(){var e=this;d["a"].onShowAlert((function(t){e.alert=t,e.showAlert=!0})),d["a"].onClearAlert((function(){e.showAlert=!1}))}}]),a}(u["default"]);f([Object(p["b"])({default:""})],b.prototype,"title",void 0),f([Object(p["b"])({default:""})],b.prototype,"subtitle",void 0),b=f([Object(p["a"])({name:"app-auth-container"})],b);var m=b,h=m,v=(a(253),a(39)),g=Object(v["a"])(h,r,s,!1,null,null,null);g.options.__file="src/app/auth/shared/components/auth-container.vue";t["a"]=g.exports},351:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-auth-register"},[a("app-auth-container",{attrs:{title:""}},[e.hasUser?a("div",[a("b-form",{attrs:{autocomplete:"off"},on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.company,expression:"company"}]},[a("b-form-group",{attrs:{label:e.$t("company"),"label-for":"company"}},[a("b-form-input",{attrs:{id:"company",disabled:""},model:{value:e.company,callback:function(t){e.company=t},expression:"company"}})],1)],1),a("b-form-group",{attrs:{label:e.$t("email"),"label-for":"email"}},[a("b-form-input",{attrs:{id:"email",type:"email",disabled:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),a("b-form-group",{attrs:{label:e.$t("first-name"),"label-for":"first-name"}},[a("b-form-input",{attrs:{id:"first-name",required:""},model:{value:e.user.first_name,callback:function(t){e.$set(e.user,"first_name",t)},expression:"user.first_name"}})],1),a("b-form-group",{attrs:{label:e.$t("last-name"),"label-for":"last-name"}},[a("b-form-input",{attrs:{id:"last-name",required:""},model:{value:e.user.last_name,callback:function(t){e.$set(e.user,"last_name",t)},expression:"user.last_name"}})],1),a("b-form-group",{attrs:{label:e.$t("password"),"label-for":"password"}},[a("b-form-input",{attrs:{id:"password",type:"password",placeholder:e.$t("password"),required:""},model:{value:e.user.password,callback:function(t){e.$set(e.user,"password",t)},expression:"user.password"}})],1),a("b-form-group",{attrs:{label:e.$t("repeat-password"),"label-for":"repeat-password"}},[a("b-form-input",{attrs:{id:"repeat-password",type:"password",placeholder:e.$t("repeat-password"),required:""},model:{value:e.user.repeat_password,callback:function(t){e.$set(e.user,"repeat_password",t)},expression:"user.repeat_password"}})],1),a("div",[a("b-form-checkbox",{attrs:{id:"terms-of-service",required:""},model:{value:e.checkedTermsOfService,callback:function(t){e.checkedTermsOfService=t},expression:"checkedTermsOfService"}},[a("span",{domProps:{innerHTML:e._s(e.$t("accept-terms-of-service"))}})])],1),a("app-button",{attrs:{type:"submit",cls:"width-100pc",disabled:!e.checkedTermsOfService}},[e._v(e._s(e.$t("register")))])],1)],1):e._e()])],1)},s=[];r._withStripped=!0;var n=a(16),o=a(25),i=a(26),c=a(31),l=a(30),u=a(40),p=(a(65),a(64),a(24),a(78),a(15)),d=a(33),f=a(255),b=a(245),m=a(79),h=a(49),v=a(244),g=a(247),w=function(e,t,a,r){var s,n=arguments.length,o=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,a,r);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(o=(n<3?s(o):n>3?s(t,a,o):s(t,a))||o);return n>3&&o&&Object.defineProperty(t,a,o),o},y=function(e){Object(c["a"])(a,e);var t=Object(l["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.hasUser=!1,e.email="",e.company="",e.checkedTermsOfService=!1,e}return Object(i["a"])(a,[{key:"created",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m["a"].getInvitedUser(this.$route.params.confirmKey);case 3:t=e.sent,this.user={user_id:t.id,first_name:t.first_name,last_name:t.last_name,password:"",repeat_password:""},this.email=t.email,this.company=t.customer&&t.customer.name||"",this.hasUser=!0,e.next=14;break;case 10:e.prev=10,e.t0=e["catch"](0),e.t0.error===h["a"].RESOURCE_NOT_FOUND&&this.$router.push({name:"Login"}),this.showAlert(e.t0.error);case 14:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onSubmit",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.user.password===this.user.repeat_password){e.next=3;break}return this.showAlert("PASSWORDS_DONT_MATCH"),e.abrupt("return");case 3:if(this.checkedTermsOfService){e.next=6;break}return this.showAlert("ACCEPT_TERMS_OF_SERVICE"),e.abrupt("return");case 6:return e.prev=6,v["a"].startLoading(),e.next=10,m["a"].registerUser(this.$route.params.confirmKey,this.user);case 10:this.$router.push({name:"Login"}),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](6),this.showAlert(e.t0.error);case 16:case"end":return e.stop()}}),e,this,[[6,13]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"showAlert",value:function(e){g["a"].showErrorAlert(e),v["a"].stopLoading()}}]),a}(p["default"]);y=w([Object(d["a"])({name:"app-auth-register",components:{AppAuthContainer:f["a"],AppButton:b["a"]}})],y);var O=y,_=O,j=a(39),k=Object(j["a"])(_,r,s,!1,null,null,null);k.options.__file="src/app/auth/register/register.vue";t["default"]=k.exports}}]);