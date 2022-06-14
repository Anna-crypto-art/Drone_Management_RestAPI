(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{245:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-button",{class:t.cls,attrs:{variant:t.variant,type:t.type,disabled:t.isDisabled,size:t.size},on:{click:t.onClick}},[r("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"app-button-loading"},[r("b-spinner",{attrs:{small:""}})],1),t._t("default")],2)},o=[];n._withStripped=!0;var a=r(20),s=r(21),i=r(29),l=r(28),c=r(42),u=(r(66),r(24),r(16)),p=r(32),d=function(t,e,r,n){var o,a=arguments.length,s=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(s=(a<3?o(s):a>3?o(e,r,s):o(e,r))||s);return a>3&&s&&Object.defineProperty(e,r,s),s},m=function(t){Object(i["a"])(r,t);var e=Object(l["a"])(r);function r(){return Object(a["a"])(this,r),e.apply(this,arguments)}return Object(s["a"])(r,[{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"onClick",value:function(t){this.$emit("click",t)}}]),r}(u["default"]);d([Object(p["b"])({default:"button"})],m.prototype,"type",void 0),d([Object(p["b"])({default:""})],m.prototype,"cls",void 0),d([Object(p["b"])({default:"primary"})],m.prototype,"variant",void 0),d([Object(p["b"])({default:!1})],m.prototype,"disabled",void 0),d([Object(p["b"])({default:!1})],m.prototype,"loading",void 0),d([Object(p["b"])({default:""})],m.prototype,"size",void 0),m=d([Object(p["a"])({name:"app-button"})],m);var f=m,b=f,h=(r(247),r(41)),v=Object(h["a"])(b,n,o,!1,null,null,null);v.options.__file="src/app/shared/components/app-button/app-button.vue";e["a"]=v.exports},246:function(t,e,r){},247:function(t,e,r){"use strict";r(246)},249:function(t,e,r){},253:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:"app-table-container "+(t.size?"app-table-container-"+t.size:"")},[t._t("default")],2)},o=[];n._withStripped=!0;var a=r(21),s=r(20),i=r(29),l=r(28),c=r(42),u=(r(66),r(24),r(16)),p=r(32),d=function(t,e,r,n){var o,a=arguments.length,s=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(s=(a<3?o(s):a>3?o(e,r,s):o(e,r))||s);return a>3&&s&&Object.defineProperty(e,r,s),s},m=function(t){Object(i["a"])(r,t);var e=Object(l["a"])(r);function r(){return Object(s["a"])(this,r),e.apply(this,arguments)}return Object(a["a"])(r)}(u["default"]);d([Object(p["b"])({default:""})],m.prototype,"size",void 0),m=d([p["a"]],m);var f=m,b=f,h=(r(255),r(41)),v=Object(h["a"])(b,n,o,!1,null,null,null);v.options.__file="src/app/shared/components/app-table-container/app-table-container.vue";e["a"]=v.exports},254:function(t,e,r){},255:function(t,e,r){"use strict";r(249)},258:function(t,e,r){"use strict";var n=r(18),o=r(60),a=r(43),s=r(22),i=r(132),l=[],c=l.sort,u=s((function(){l.sort(void 0)})),p=s((function(){l.sort(null)})),d=i("sort"),m=u||!p||!d;n({target:"Array",proto:!0,forced:m},{sort:function(t){return void 0===t?c.call(a(this)):c.call(a(this),o(t))}})},262:function(t,e,r){"use strict";r(254)},263:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-modal",{staticClass:"app-modal-form",attrs:{id:t.id,"ok-title":t.okTitle,"no-close-on-backdrop":""},scopedSlots:t._u([{key:"modal-title",fn:function(){return[r("div",{staticClass:"app-modal-form-title"},[t._t("modal-title",[r("h2",[t._v(t._s(t.title))]),t.subtitle?r("div",{staticClass:"app-modal-form-title-subtitle grayed",domProps:{innerHTML:t._s(t.subtitle)}}):t._e()])],2)]},proxy:!0},{key:"modal-footer",fn:function(){return[r("b-button",{attrs:{variant:"secondary"},on:{click:function(e){return t.$bvModal.hide(t.id)}}},[t._v(t._s(t.$t("cancel")))]),r("app-button",{attrs:{loading:t.modalLoading},on:{click:t.onSubmit}},[t._v(t._s(t.okTitle))])]},proxy:!0}],null,!0)},[r("b-alert",{staticClass:"app-modal-form-alert",attrs:{variant:t.alertVariant,dismissible:""},domProps:{innerHTML:t._s(t.alertMsg)},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}}),r("form",{on:{submit:t.onSubmit}},[t._t("default")],2)],1)},o=[];n._withStripped=!0;var a=r(20),s=r(21),i=r(29),l=r(28),c=r(42),u=(r(66),r(24),r(16)),p=r(32),d=r(245),m=function(t,e,r,n){var o,a=arguments.length,s=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(s=(a<3?o(s):a>3?o(e,r,s):o(e,r))||s);return a>3&&s&&Object.defineProperty(e,r,s),s},f=function(t){Object(i["a"])(r,t);var e=Object(l["a"])(r);function r(){var t;return Object(a["a"])(this,r),t=e.apply(this,arguments),t.showAlert=!1,t.alertMsg="",t.alertVariant="default",t}return Object(s["a"])(r,[{key:"show",value:function(){this.$bvModal.show(this.id||"")}},{key:"hide",value:function(){this.hideAlert(),this.$bvModal.hide(this.id||"")}},{key:"alertError",value:function(t){if(this.alertVariant="danger",this.showAlert=!0,console.error(t),"string"===typeof t)this.alertMsg=t;else{this.alertMsg=t.error;var e=t.details||t.message;e&&(this.alertMsg+="<br><small>Details: "+e+"</small>")}}},{key:"alertInfo",value:function(t){this.alertVariant="primary",this.showAlert=!0,this.alertMsg=t}},{key:"onSubmit",value:function(t){this.$emit("submit")}},{key:"hideAlert",value:function(){this.showAlert=!1,this.alertMsg=""}}]),r}(u["default"]);m([Object(p["b"])({required:!0})],f.prototype,"id",void 0),m([Object(p["b"])({default:""})],f.prototype,"title",void 0),m([Object(p["b"])()],f.prototype,"subtitle",void 0),m([Object(p["b"])({required:!0})],f.prototype,"okTitle",void 0),m([Object(p["b"])({default:!1})],f.prototype,"modalLoading",void 0),f=m([Object(p["a"])({name:"app-modal-form",components:{AppButton:d["a"]}})],f);var b=f,h=b,v=(r(262),r(41)),y=Object(v["a"])(h,n,o,!1,null,null,null);y.options.__file="src/app/shared/components/app-modal/app-modal-form.vue";e["a"]=y.exports},295:function(t,e,r){},339:function(t,e,r){"use strict";r(295)},382:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-settings-customers"},[r("div",{staticClass:"app-settings-customers-table-toolbar"},[r("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.edit-customer-modal",modifiers:{"edit-customer-modal":!0}}],attrs:{variant:"primary"},on:{click:t.onCreateCustomerClick}},[t._v(" "+t._s(t.$t("create-customer"))+" ")])],1),r("app-table-container",[r("b-table",{attrs:{fields:t.columns,items:t.rows,"head-variant":"light",hover:"",busy:t.loading},scopedSlots:t._u([{key:"table-busy",fn:function(){return[r("div",{staticClass:"text-center"},[r("b-spinner",{staticClass:"align-middle"})],1)]},proxy:!0},{key:"cell(plants)",fn:function(e){return[r("span",{staticClass:"grayed"},[t._v(" "+t._s(e.item.plants.map((function(t){return t.name})).join(", "))+" ")])]}},{key:"cell(actions)",fn:function(e){return[r("div",{staticClass:"hover-cell pull-right"},[r("b-button",{attrs:{variant:"secondary",size:"sm",title:t.$t("edit-customer")},on:{click:function(r){return t.onEditCustomerClick(e.item)}}},[r("b-icon",{attrs:{icon:"wrench"}})],1),r("b-button",{attrs:{variant:"outline-danger",size:"sm",title:t.$t("delete-customer")},on:{click:function(r){return t.onDeleteCustomerClick(e.item)}}},[r("b-icon",{attrs:{icon:"trash"}})],1)],1)]}}])})],1),r("app-modal-form",{ref:"appCustomerModal",attrs:{id:"edit-customer-modal",title:t.customerModalTitle,"ok-title":t.customerModalOkTitle,modalLoading:t.customerModalLoading},on:{submit:t.onSubmitCustomer}},[t.currentCustomer?r("b-row",[r("b-col",[r("b-form-group",{attrs:{label:t.$t("name"),"label-for":"name"}},[r("b-form-input",{attrs:{id:"customerName",placeholder:t.$t("name"),required:""},model:{value:t.currentCustomer.name,callback:function(e){t.$set(t.currentCustomer,"name",e)},expression:"currentCustomer.name"}})],1)],1),r("b-col",[r("b-form-group",{attrs:{label:t.$t("role"),"label-for":"role"}},[r("b-form-select",{attrs:{id:"role",options:t.roles},model:{value:t.currentCustomer.role,callback:function(e){t.$set(t.currentCustomer,"role",e)},expression:"currentCustomer.role"}})],1)],1)],1):t._e(),r("b-row",[r("b-col",[r("div",[r("b",[t._v(t._s(t.$t("plants")))])]),r("div",{staticClass:"app-settings-customers-plants-selection"},t._l(t.selectPlants,(function(e){return r("div",{key:e.plant.id},[r("b-checkbox",{model:{value:e.selected,callback:function(r){t.$set(e,"selected",r)},expression:"selectPlant.selected"}},[t._v(" "+t._s(e.plant.name)+" "),e.otherCustomers?r("small",{staticClass:"grayed"},[t._v(t._s(e.otherCustomers))]):t._e()])],1)})),0)])],1)],1)],1)},o=[];n._withStripped=!0;var a,s=r(68),i=r(14),l=r(20),c=r(21),u=r(29),p=r(28),d=r(42),m=(r(67),r(66),r(24),r(186),r(101),r(100),r(131),r(258),r(81),r(133),r(130),r(187),r(32)),f=r(253),b=r(263),h=r(80);(function(t){t["SERVICE"]="Service",t["OWNER"]="Owner",t["OPERATOR"]="Operator"})(a||(a={}));var v=r(82),y=function(t,e,r,n){var o,a=arguments.length,s=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(d["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(s=(a<3?o(s):a>3?o(e,r,s):o(e,r))||s);return a>3&&s&&Object.defineProperty(e,r,s),s},g=function(t){Object(u["a"])(r,t);var e=Object(p["a"])(r);function r(){var t;return Object(l["a"])(this,r),t=e.apply(this,arguments),t.columns=[],t.rows=[],t.loading=!1,t.customerModalLoading=!1,t.customerModalTitle="",t.customerModalOkTitle="",t.selectPlants=[],t.currentCustomer=null,t}return Object(c["a"])(r,[{key:"created",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.columns=[{key:"name",label:this.$t("name").toString()},{key:"role",label:this.$t("role").toString()},{key:"plants",label:this.$t("plants").toString()},{key:"actions",label:""}],this.roles=[{value:null,text:""}].concat(Object(s["a"])(Object.keys(a).map((function(t){return{value:a[t],text:a[t]}})))),t.next=4,this.updateCustomerRows();case 4:return t.prev=4,t.next=7,h["a"].getPlants();case 7:this.plants=t.sent.sort((function(t,e){var r=t.name.toLowerCase(),n=e.name.toLowerCase();return r<n?-1:r>n?1:0})),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](4),this.showError(t.t0);case 13:case"end":return t.stop()}}),t,this,[[4,10]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"updateCustomerRows",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.prev=1,t.next=4,h["a"].getCustomers();case 4:this.rows=t.sent.map((function(t){return{id:t.id,name:t.name,role:t.role,plants:t.plants}})).sort((function(t,e){var r=t.name.toLowerCase(),n=e.name.toLowerCase();return r<n?-1:r>n?1:0})),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](1),this.showError(t.t0);case 10:return t.prev=10,this.loading=!1,t.finish(10);case 13:case"end":return t.stop()}}),t,this,[[1,7,10,13]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"onCreateCustomerClick",value:function(){this.currentCustomer={id:null,name:"",role:null,plants:[]},this.selectPlants=this.plants.map((function(t){return{plant:t,selected:!1,otherCustomers:t.customers.map((function(t){return t.name})).join(", ")}})),this.customerModalTitle=this.$t("create-customer").toString(),this.customerModalOkTitle=this.$t("create").toString(),this.appCustomerModal.show()}},{key:"onEditCustomerClick",value:function(t){this.currentCustomer=t,this.selectPlants=this.plants.map((function(e){return{plant:e,selected:!!t.plants.find((function(t){return t.id===e.id})),otherCustomers:e.customers.filter((function(e){return e.id!==t.id})).map((function(t){return t.name})).join(", ")}})),this.customerModalTitle=this.$t("edit-customer").toString()+": "+t.name,this.customerModalOkTitle=this.$t("apply").toString(),this.appCustomerModal.show()}},{key:"onSubmitCustomer",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.customerModalLoading=!0,t.prev=1,e=this.selectPlants.filter((function(t){return t.selected})).map((function(t){return t.plant.id})),null!==this.currentCustomer.id){t.next=9;break}return t.next=6,h["a"].createCustomer({name:this.currentCustomer.name,role:this.currentCustomer.role||void 0,plant_ids:e});case 6:this.showSuccess(this.$t("customer-created-success").toString()),t.next=12;break;case 9:return t.next=11,h["a"].updateCustomer(this.currentCustomer.id,{name:this.currentCustomer.name,role:this.currentCustomer.role||void 0,plant_ids:e});case 11:this.showSuccess(this.$t("customer-updated-success").toString());case 12:return this.appCustomerModal.hide(),t.next=15,this.updateCustomerRows();case 15:t.next=20;break;case 17:t.prev=17,t.t0=t["catch"](1),this.showError(t.t0);case 20:return t.prev=20,this.customerModalLoading=!1,t.finish(20);case 23:case"end":return t.stop()}}),t,this,[[1,17,20,23]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"onDeleteCustomerClick",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.loading=!0,t.prev=1,confirm(this.$t("sure-delete-customer",{customer:e.name}).toString())){t.next=4;break}return t.abrupt("return");case 4:return t.next=6,h["a"].deleteCustomer(e.id);case 6:return this.showSuccess(this.$t("customer-deleted-success",{customer:e.name}).toString()),t.next=9,this.updateCustomerRows();case 9:t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](1),this.showError(t.t0);case 14:return t.prev=14,this.loading=!1,t.finish(14);case 17:case"end":return t.stop()}}),t,this,[[1,11,14,17]])})));function e(e){return t.apply(this,arguments)}return e}()}]),r}(v["a"]);y([Object(m["c"])()],g.prototype,"appCustomerModal",void 0),g=y([Object(m["a"])({name:"app-settings-users",components:{AppTableContainer:f["a"],AppModalForm:b["a"]}})],g);var C=g,k=C,O=(r(339),r(41)),w=Object(O["a"])(k,n,o,!1,null,null,null);w.options.__file="src/app/settings/customers/customers.vue";e["default"]=w.exports}}]);