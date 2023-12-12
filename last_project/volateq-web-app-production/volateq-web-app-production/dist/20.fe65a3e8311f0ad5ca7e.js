(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{408:function(t,e,r){},510:function(t,e,r){"use strict";r(408)},577:function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-settings-customers"},[r("div",{staticClass:"app-settings-customers-table-toolbar"},[r("app-button",{directives:[{name:"b-modal",rawName:"v-b-modal.edit-customer-modal",modifiers:{"edit-customer-modal":!0}}],attrs:{variant:"primary"},on:{click:t.onCreateCustomerClick}},[t._v(" "+t._s(t.$t("create-customer"))+" ")])],1),r("app-table-container",[r("app-table",{attrs:{columns:t.columns,rows:t.rows,loading:t.loading,hoverActions:!0},scopedSlots:t._u([{key:"cell(plants)",fn:function(e){return[r("span",{staticClass:"grayed"},[t._v(" "+t._s(e.item.plants.map((function(t){return t.name})).join(", "))+" ")])]}},{key:"hoverActions",fn:function(e){return[r("app-button",{attrs:{variant:"secondary",size:"sm",title:t.$t("edit-customer"),icon:"wrench"},on:{click:function(r){return t.onEditCustomerClick(e.item)}}}),r("app-button",{attrs:{variant:"outline-danger",size:"sm",title:t.$t("delete-customer"),icon:"trash"},on:{click:function(r){return t.onDeleteCustomerClick(e.item)}}})]}}])})],1),r("app-modal-form",{ref:"appCustomerModal",attrs:{id:"edit-customer-modal",title:t.customerModalTitle,"ok-title":t.customerModalOkTitle,"cancel-title":t.$t("cancel"),modalLoading:t.customerModalLoading},on:{submit:t.onSubmitCustomer}},[t.currentCustomer?r("b-row",[r("b-col",[r("b-form-group",{attrs:{label:t.$t("name"),"label-for":"name"}},[r("b-form-input",{attrs:{id:"customerName",placeholder:t.$t("name"),required:""},model:{value:t.currentCustomer.name,callback:function(e){t.$set(t.currentCustomer,"name",e)},expression:"currentCustomer.name"}})],1)],1),r("b-col",[r("b-form-group",{attrs:{label:t.$t("role"),"label-for":"role"}},[r("b-form-select",{attrs:{id:"role",options:t.roles},model:{value:t.currentCustomer.role,callback:function(e){t.$set(t.currentCustomer,"role",e)},expression:"currentCustomer.role"}})],1)],1)],1):t._e(),r("b-row",[r("b-col",[r("div",[r("b",[t._v(t._s(t.$t("plants")))])]),r("div",{staticClass:"app-settings-customers-plants-selection"},t._l(t.selectPlants,(function(e){return r("div",{key:e.plant.id},[r("b-checkbox",{model:{value:e.selected,callback:function(r){t.$set(e,"selected",r)},expression:"selectPlant.selected"}},[t._v(" "+t._s(e.plant.name)+" "),e.otherCustomers?r("small",{staticClass:"grayed"},[t._v(t._s(e.otherCustomers))]):t._e()])],1)})),0)])],1)],1)],1)},n=[];s._withStripped=!0;var o,a=r(6),c=r(49),i=r(9),u=r(18),l=r(19),m=r(23),p=r(22),d=r(27),h=(r(44),r(24),r(83),r(76),r(96),r(118),r(223),r(75),r(156),r(151),r(150),r(15)),f=r(288),b=r(284),v=r(63),C=r(153),w=r(42);(function(t){t["SERVICE"]="Service",t["OWNER"]="Owner",t["OPERATOR"]="Operator"})(o||(o={}));var k=r(45),g=function(t,e,r,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,r):s;if("object"===("undefined"===typeof Reflect?"undefined":Object(d["a"])(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(t,e,r,s);else for(var c=t.length-1;c>=0;c--)(n=t[c])&&(a=(o<3?n(a):o>3?n(e,r,a):n(e,r))||a);return o>3&&a&&Object.defineProperty(e,r,a),a},O=function(t){Object(m["a"])(r,t);var e=Object(p["a"])(r);function r(){var t;return Object(u["a"])(this,r),t=e.apply(this,arguments),t.columns=[],t.rows=[],t.loading=!1,t.customerModalLoading=!1,t.customerModalTitle="",t.customerModalOkTitle="",t.selectPlants=[],t.currentCustomer=null,t}return Object(l["a"])(r,[{key:"created",value:function(){var t=Object(i["a"])(Object(a["a"])().mark((function t(){return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.columns=[{key:"name",label:this.$t("name").toString()},{key:"role",label:this.$t("role").toString()},{key:"plants",label:this.$t("plants").toString()}],this.roles=[{value:null,text:""}].concat(Object(c["a"])(Object.keys(o).map((function(t){return{value:o[t],text:o[t]}})))),t.next=4,this.updateCustomerRows();case 4:return t.prev=4,t.next=7,w["a"].getAllPlants();case 7:this.plants=t.sent.sort((function(t,e){var r=t.name.toLowerCase(),s=e.name.toLowerCase();return r<s?-1:r>s?1:0})),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](4),this.showError(t.t0);case 13:case"end":return t.stop()}}),t,this,[[4,10]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"updateCustomerRows",value:function(){var t=Object(i["a"])(Object(a["a"])().mark((function t(){return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.prev=1,t.next=4,w["a"].getCustomers();case 4:this.rows=t.sent.map((function(t){return{id:t.id,name:t.name,role:t.role,plants:t.plants}})).sort((function(t,e){var r=t.name.toLowerCase(),s=e.name.toLowerCase();return r<s?-1:r>s?1:0})),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](1),this.showError(t.t0);case 10:return t.prev=10,this.loading=!1,t.finish(10);case 13:case"end":return t.stop()}}),t,this,[[1,7,10,13]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"onCreateCustomerClick",value:function(){this.currentCustomer={id:null,name:"",role:null,plants:[]},this.selectPlants=this.plants.map((function(t){return{plant:t,selected:!1,otherCustomers:t.customers.map((function(t){return t.name})).join(", ")}})),this.customerModalTitle=this.$t("create-customer").toString(),this.customerModalOkTitle=this.$t("create").toString(),this.appCustomerModal.show()}},{key:"onEditCustomerClick",value:function(t){this.currentCustomer=t,this.selectPlants=this.plants.map((function(e){return{plant:e,selected:!!t.plants.find((function(t){return t.id===e.id})),otherCustomers:e.customers.filter((function(e){return e.id!==t.id})).map((function(t){return t.name})).join(", ")}})),this.customerModalTitle=this.$t("edit-customer").toString()+": "+t.name,this.customerModalOkTitle=this.$t("apply").toString(),this.appCustomerModal.show()}},{key:"onSubmitCustomer",value:function(){var t=Object(i["a"])(Object(a["a"])().mark((function t(){var e;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.customerModalLoading=!0,t.prev=1,e=this.selectPlants.filter((function(t){return t.selected})).map((function(t){return t.plant.id})),null!==this.currentCustomer.id){t.next=9;break}return t.next=6,w["a"].createCustomer({name:this.currentCustomer.name,role:this.currentCustomer.role||void 0,plant_ids:e});case 6:this.showSuccess(this.$t("customer-created-success").toString()),t.next=12;break;case 9:return t.next=11,w["a"].updateCustomer(this.currentCustomer.id,{name:this.currentCustomer.name,role:this.currentCustomer.role||void 0,plant_ids:e});case 11:this.showSuccess(this.$t("customer-updated-success").toString());case 12:return this.appCustomerModal.hide(),t.next=15,this.updateCustomerRows();case 15:t.next=20;break;case 17:t.prev=17,t.t0=t["catch"](1),this.showError(t.t0);case 20:return t.prev=20,this.customerModalLoading=!1,t.finish(20);case 23:case"end":return t.stop()}}),t,this,[[1,17,20,23]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"onDeleteCustomerClick",value:function(){var t=Object(i["a"])(Object(a["a"])().mark((function t(e){return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.loading=!0,t.prev=1,confirm(this.$t("sure-delete-customer",{customer:e.name}).toString())){t.next=4;break}return t.abrupt("return");case 4:return t.next=6,w["a"].deleteCustomer(e.id);case 6:return this.showSuccess(this.$t("customer-deleted-success",{customer:e.name}).toString()),t.next=9,this.updateCustomerRows();case 9:t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](1),this.showError(t.t0);case 14:return t.prev=14,this.loading=!1,t.finish(14);case 17:case"end":return t.stop()}}),t,this,[[1,11,14,17]])})));function e(e){return t.apply(this,arguments)}return e}()}]),r}(k["a"]);g([Object(h["c"])()],O.prototype,"appCustomerModal",void 0),O=g([Object(h["a"])({name:"app-settings-customers",components:{AppTableContainer:f["a"],AppModalForm:C["a"],AppTable:b["a"],AppButton:v["a"]}})],O);var j=O,y=j,x=(r(510),r(28)),$=Object(x["a"])(y,s,n,!1,null,null,null);$.options.__file="src/app/settings/customers/customers.vue";e["default"]=$.exports}}]);