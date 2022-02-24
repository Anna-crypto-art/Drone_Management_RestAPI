(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{244:function(t,e,a){"use strict";var n=a(47),r=a(34),o=a(20),i=a(184),s="toString",l=RegExp.prototype,c=l[s],u=o((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),p=c.name!=s;(u||p)&&n(RegExp.prototype,s,(function(){var t=r(this),e=String(t.source),a=t.flags,n=String(void 0===a&&t instanceof RegExp&&!("flags"in l)?i.call(t):a);return"/"+e+"/"+n}),{unsafe:!0})},245:function(t,e,a){},246:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-button",{class:t.cls,attrs:{variant:t.variant,type:t.type,disabled:t.isDisabled},on:{click:t.onClick}},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"app-button-loading"},[a("b-spinner",{attrs:{small:""}})],1),t._t("default")],2)},r=[];n._withStripped=!0;var o=a(22),i=a(23),s=a(31),l=a(30),c=a(41),u=(a(66),a(26),a(15)),p=a(32),f=function(t,e,a,n){var r,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(i=(o<3?r(i):o>3?r(e,a,i):r(e,a))||i);return o>3&&i&&Object.defineProperty(e,a,i),i},d=function(t){Object(s["a"])(a,t);var e=Object(l["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return Object(i["a"])(a,[{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"onClick",value:function(t){this.$emit("click",t)}}]),a}(u["default"]);f([Object(p["b"])({default:"button"})],d.prototype,"type",void 0),f([Object(p["b"])({default:""})],d.prototype,"cls",void 0),f([Object(p["b"])({default:"primary"})],d.prototype,"variant",void 0),f([Object(p["b"])({default:!1})],d.prototype,"disabled",void 0),f([Object(p["b"])({default:!1})],d.prototype,"loading",void 0),d=f([Object(p["a"])({name:"app-button"})],d);var b=d,v=b,h=(a(247),a(40)),g=Object(h["a"])(v,n,r,!1,null,null,null);g.options.__file="src/app/shared/components/app-button/app-button.vue";e["a"]=g.exports},247:function(t,e,a){"use strict";a(245)},248:function(t,e,a){"use strict";var n=a(56),r=new n["a"];e["a"]=r},249:function(t,e,a){},254:function(t,e,a){"use strict";a(249)},256:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-auth-container"},[a("b-container",[a("b-row",{staticClass:"justify-content-md-center"},[a("b-col",{attrs:{cols:"12",md:"auto"}},[a("img",{staticClass:"logo-img",attrs:{src:"/images/logos/logo_default.png",srcset:"/images/logos/logo_default.webp, /images/logos/logo_default.svg, /images/logos/logo_default.png",alt:"Volateq"}}),a("div",{staticClass:"app-auth-box"},[t.title?a("div",{staticClass:"app-auth-box-title"},[a("h1",[t._v(t._s(t.title))]),t.subtitle?a("div",{staticClass:"app-auth-box-subtitle grayed",domProps:{innerHTML:t._s(t.subtitle)}}):t._e()]):t._e(),t._t("default"),a("b-alert",{staticClass:"app-auth-container-alert",attrs:{variant:t.alert.variant,dismissible:""},domProps:{innerHTML:t._s(t.alert.msg)},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}})],2)])],1)],1)],1)},r=[];n._withStripped=!0;var o=a(22),i=a(23),s=a(31),l=a(30),c=a(41),u=(a(66),a(26),a(15)),p=a(32),f=a(248),d=function(t,e,a,n){var r,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(i=(o<3?r(i):o>3?r(e,a,i):r(e,a))||i);return o>3&&i&&Object.defineProperty(e,a,i),i},b=function(t){Object(s["a"])(a,t);var e=Object(l["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.alert={msg:"",variant:"success"},t.showAlert=!1,t}return Object(i["a"])(a,[{key:"created",value:function(){var t=this;f["a"].onShowAlert((function(e){t.alert=e,t.showAlert=!0})),f["a"].onClearAlert((function(){t.showAlert=!1}))}}]),a}(u["default"]);d([Object(p["b"])({default:""})],b.prototype,"title",void 0),d([Object(p["b"])({default:""})],b.prototype,"subtitle",void 0),b=d([Object(p["a"])({name:"app-auth-container"})],b);var v=b,h=v,g=(a(254),a(40)),m=Object(g["a"])(h,n,r,!1,null,null,null);m.options.__file="src/app/auth/shared/components/auth-container.vue";e["a"]=m.exports},348:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-auth-forgot-password"},[a("app-auth-container",{attrs:{title:t.$t("forgot-password"),subtitle:t.$t("forgot-password_descr")}},[a("b-form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[a("b-form-group",{attrs:{label:t.$t("email"),"label-for":"email"}},[a("b-form-input",{attrs:{id:"email",type:"email",required:"",placeholder:t.$t("email")},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),a("app-button",{attrs:{type:"submit",cls:"width-100pc",loading:t.loading}},[t._v(t._s(t.$t("send")))])],1)],1)],1)},r=[];n._withStripped=!0;var o=a(16),i=a(22),s=a(23),l=a(31),c=a(30),u=a(41),p=(a(67),a(66),a(26),a(244),a(15)),f=a(32),d=a(256),b=a(246),v=a(248),h=a(80),g=function(t,e,a,n){var r,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(i=(o<3?r(i):o>3?r(e,a,i):r(e,a))||i);return o>3&&i&&Object.defineProperty(e,a,i),i},m=function(t){Object(l["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(i["a"])(this,a),t=e.apply(this,arguments),t.email="",t.loading=!1,t}return Object(s["a"])(a,[{key:"onSubmit",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.loading=!0,t.next=4,h["a"].forgotPassword(this.email);case 4:v["a"].showSuccessAlert(this.$t("request-sent").toString()),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),v["a"].showErrorAlert(t.t0.message);case 10:return t.prev=10,this.loading=!1,t.finish(10);case 13:case"end":return t.stop()}}),t,this,[[0,7,10,13]])})));function e(){return t.apply(this,arguments)}return e}()}]),a}(p["default"]);m=g([Object(f["a"])({name:"app-auth-forgot-password",components:{AppAuthContainer:d["a"],AppButton:b["a"]}})],m);var j=m,w=j,O=a(40),y=Object(O["a"])(w,n,r,!1,null,null,null);y.options.__file="src/app/auth/reset-password/forgot-password.vue";e["default"]=y.exports}}]);