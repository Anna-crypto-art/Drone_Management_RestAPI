(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{288:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},291:function(e,t,r){"use strict";var n=r(25),a=r(294).trim,i=r(295);n({target:"String",proto:!0,forced:i("trim")},{trim:function(){return a(this)}})},294:function(e,t,r){var n=r(84),a=r(288),i="["+a+"]",s=RegExp("^"+i+i+"*"),o=RegExp(i+i+"*$"),c=function(e){return function(t){var r=String(n(t));return 1&e&&(r=r.replace(s,"")),2&e&&(r=r.replace(o,"")),r}};e.exports={start:c(1),end:c(2),trim:c(3)}},295:function(e,t,r){var n=r(29),a=r(288),i="​᠎";e.exports=function(e){return n((function(){return!!a[e]()||i[e]()!=i||a[e].name!==e}))}},297:function(e,t,r){},306:function(e,t,r){},312:function(e,t,r){"use strict";r(297)},315:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:"app-order-pps-view"+(e.lefted?" lefted":"")},[e._l(e.innerOrderPPs,(function(t){return r("div",{key:t.id,class:"app-order-pps-view-item "+(t.quantity?"primary":"secondary")},[r("b",[e._v(e._s(t.product_package.name))]),t.quantity?r("i",[e._v(" Yearly "+e._s(t.quantity))]):e._e(),t.quantity?e._e():r("i",[e._v(" Setup")]),t.disabled_key_figures_count?r("small",{staticClass:"app-order-pps-view-item-badge"},[e._v(" -"+e._s(t.disabled_key_figures_count))]):e._e()])})),e.lefted?r("div",{staticClass:"clear"}):e._e()],2)},a=[];n._withStripped=!0;var i=r(18),s=r(19),o=r(23),c=r(22),u=r(27),d=(r(44),r(24),r(149),r(17)),l=r(15),p=function(e,t,r,n){var a,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(s=(i<3?a(s):i>3?a(t,r,s):a(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},f=function(e){Object(o["a"])(r,e);var t=Object(c["a"])(r);function r(){var e;return Object(i["a"])(this,r),e=t.apply(this,arguments),e.innerOrderPPs=[],e}return Object(s["a"])(r,[{key:"created",value:function(){this.onOrderPPsChanged()}},{key:"onOrderPPsChanged",value:function(){this.innerOrderPPs=this.orderProductPackages.filter((function(e){return 1!==e.product_package.id}))}}]),r}(d["default"]);p([Object(l["b"])({default:[]})],f.prototype,"orderProductPackages",void 0),p([Object(l["b"])({default:!1})],f.prototype,"lefted",void 0),p([Object(l["d"])("orderProductPackages")],f.prototype,"onOrderPPsChanged",null),f=p([Object(l["a"])({name:"app-order-pps-view"})],f);var h=f,O=h,b=(r(312),r(28)),g=Object(b["a"])(O,n,a,!1,null,null,null);g.options.__file="src/app/shared/components/app-order-pps-view/app-order-pps-view.vue";t["a"]=g.exports},316:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-datepicker"},[r("b-datepicker",{staticClass:"app-datepicker-date",attrs:{required:e.required},model:{value:e.innerValue,callback:function(t){e.innerValue=t},expression:"innerValue"}}),r("b-form-input",{staticClass:"app-datepicker-text",attrs:{placeholder:"YYYY-MM-DD"},model:{value:e.innerValue,callback:function(t){e.innerValue=t},expression:"innerValue"}})],1)},a=[];n._withStripped=!0;var i=r(18),s=r(19),o=r(23),c=r(22),u=r(27),d=(r(44),r(24),r(99),r(317),r(15)),l=r(97),p=r(98),f=function(e,t,r,n){var a,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(s=(i<3?a(s):i>3?a(t,r,s):a(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},h=function(e){Object(o["a"])(r,e);var t=Object(c["a"])(r);function r(){var e;return Object(i["a"])(this,r),e=t.apply(this,arguments),e.innerValue="",e}return Object(s["a"])(r,[{key:"created",value:function(){this.updateInnerDate()}},{key:"onValueChanged",value:function(){this.updateInnerDate()}},{key:"onInnerValueChanged",value:function(){this.updateDate()}},{key:"isValidDate",value:function(e){return e&&!!e.match(/^[0-4]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)||!1}},{key:"updateInnerDate",value:function(){this.isValidDate(this.value)&&(this.innerValue=this.value)}},{key:"updateDate",value:function(){this.isValidDate(this.innerValue)&&this.$emit("input",this.innerValue)}}]),r}(p["a"]);f([Object(d["b"])({default:""})],h.prototype,"value",void 0),f([Object(d["b"])({default:!1})],h.prototype,"required",void 0),f([Object(l["a"])()],h.prototype,"created",null),f([Object(d["d"])("value")],h.prototype,"onValueChanged",null),f([Object(d["d"])("innerValue")],h.prototype,"onInnerValueChanged",null),h=f([Object(d["a"])({name:"app-datepicker"})],h);var O=h,b=O,g=(r(348),r(28)),v=Object(g["a"])(b,n,a,!1,null,null,null);v.options.__file="src/app/shared/components/app-datepicker/app-datepicker.vue";t["a"]=v.exports},317:function(e,t,r){"use strict";var n=r(224),a=r(37),i=r(64),s=r(84),o=r(226),c=r(225);n("match",1,(function(e,t,r){return[function(t){var r=s(this),n=void 0==t?void 0:t[e];return void 0!==n?n.call(t,r):new RegExp(t)[e](String(r))},function(e){var n=r(t,e,this);if(n.done)return n.value;var s=a(e),u=String(this);if(!s.global)return c(s,u);var d=s.unicode;s.lastIndex=0;var l,p=[],f=0;while(null!==(l=c(s,u))){var h=String(l[0]);p[f]=h,""===h&&(s.lastIndex=o(u,i(s.lastIndex),d)),f++}return 0===f?null:p}]}))},323:function(e,t,r){"use strict";r(306)},325:function(e,t,r){},330:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-table-filter"},[e._t("default")],2)},a=[];n._withStripped=!0;var i=r(19),s=r(18),o=r(23),c=r(22),u=r(27),d=(r(44),r(24),r(17)),l=r(15),p=function(e,t,r,n){var a,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(s=(i<3?a(s):i>3?a(t,r,s):a(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},f=function(e){Object(o["a"])(r,e);var t=Object(c["a"])(r);function r(){return Object(s["a"])(this,r),t.apply(this,arguments)}return Object(i["a"])(r)}(d["default"]);f=p([l["a"]],f);var h=f,O=h,b=(r(323),r(28)),g=Object(b["a"])(O,n,a,!1,null,null,null);g.options.__file="src/app/shared/components/app-table-filter/app-table-filter.vue";t["a"]=g.exports},348:function(e,t,r){"use strict";r(325)},376:function(e,t,r){},488:function(e,t,r){"use strict";var n=r(224),a=r(230),i=r(37),s=r(84),o=r(169),c=r(226),u=r(64),d=r(225),l=r(128),p=r(29),f=[].push,h=Math.min,O=4294967295,b=!p((function(){return!RegExp(O,"y")}));n("split",2,(function(e,t,r){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,r){var n=String(s(this)),i=void 0===r?O:r>>>0;if(0===i)return[];if(void 0===e)return[n];if(!a(e))return t.call(n,e,i);var o,c,u,d=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),h=0,b=new RegExp(e.source,p+"g");while(o=l.call(b,n)){if(c=b.lastIndex,c>h&&(d.push(n.slice(h,o.index)),o.length>1&&o.index<n.length&&f.apply(d,o.slice(1)),u=o[0].length,h=c,d.length>=i))break;b.lastIndex===o.index&&b.lastIndex++}return h===n.length?!u&&b.test("")||d.push(""):d.push(n.slice(h)),d.length>i?d.slice(0,i):d}:"0".split(void 0,0).length?function(e,r){return void 0===e&&0===r?[]:t.call(this,e,r)}:t,[function(t,r){var a=s(this),i=void 0==t?void 0:t[e];return void 0!==i?i.call(t,a,r):n.call(String(a),t,r)},function(e,a){var s=r(n,e,this,a,n!==t);if(s.done)return s.value;var l=i(e),p=String(this),f=o(l,RegExp),g=l.unicode,v=(l.ignoreCase?"i":"")+(l.multiline?"m":"")+(l.unicode?"u":"")+(b?"y":"g"),y=new f(b?l:"^(?:"+l.source+")",v),m=void 0===a?O:a>>>0;if(0===m)return[];if(0===p.length)return null===d(y,p)?[p]:[];var k=0,_=0,P=[];while(_<p.length){y.lastIndex=b?_:0;var C,j=d(y,b?p:p.slice(_));if(null===j||(C=h(u(y.lastIndex+(b?0:_)),p.length))===k)_=c(p,_,g);else{if(P.push(p.slice(k,_)),P.length===m)return P;for(var x=1;x<=j.length-1;x++)if(P.push(j[x]),P.length===m)return P;_=k=C}}return P.push(p.slice(k)),P}]}),!b)},489:function(e,t,r){"use strict";r(376)},558:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-settings-orders"},[r("div",{staticClass:"app-settings-orders-table-toolbar"},[r("app-button",{attrs:{variant:"primary"},on:{click:e.onCreateOrderClick}},[e._v(" "+e._s(e.$t("create-order"))+" ")]),r("app-table-filter",[r("label",{attrs:{for:"plants"}},[e._v(e._s(e.$t("plant")))]),r("b-form-select",{attrs:{id:"plants",options:e.plantFilterOptions},on:{change:e.onPlantSelectionChanged},model:{value:e.selectedPlantId,callback:function(t){e.selectedPlantId=t},expression:"selectedPlantId"}})],1),r("app-table-filter",[r("label",{attrs:{for:"customers"}},[e._v(e._s(e.$t("customer")))]),r("b-form-select",{attrs:{id:"customers",options:e.customerFilterOptions},on:{change:e.onCustomerSelectionChanged},model:{value:e.selectedCustomerId,callback:function(t){e.selectedCustomerId=t},expression:"selectedCustomerId"}})],1)],1),r("app-table-container",{attrs:{size:"sm"}},[r("app-table",{attrs:{columns:e.columns,rows:e.rows,loading:e.loading,hoverActions:!0},scopedSlots:e._u([{key:"cell(orderType)",fn:function(t){return[e._v(" "+e._s(e.orderTypes[t.item.orderType])+" ")]}},{key:"cell(productPackages)",fn:function(e){return[r("app-order-pps-view",{attrs:{orderProductPackages:e.item.productPackages}})]}},{key:"cell(userCreatedUpdated)",fn:function(t){return[r("small",{staticClass:"text-grey",domProps:{innerHTML:e._s(t.item.userCreatedUpdated)}})]}},{key:"hoverActions",fn:function(t){return[r("app-button",{attrs:{variant:"secondary",size:"sm",title:e.$t("edit-order"),icon:"wrench"},on:{click:function(r){return e.onEditOrderClick(t.item)}}}),r("app-button",{attrs:{variant:"outline-danger",size:"sm",title:e.$t("delete-order"),icon:"trash"},on:{click:function(r){return e.onDeleteOrderClick(t.item)}}})]}}])})],1),r("app-modal-form",{ref:"appOrderModal",attrs:{id:"edit-order-modal",title:e.orderModalTitle,subtitle:e.orderModalSubTitle,"ok-title":e.orderModalOkTitle,"cancel-title":e.$t("cancel"),modalLoading:e.orderModalLoading},on:{submit:e.onSubmitOrder}},[e.currentOrder?r("div",[e.currentOrder.id?e._e():r("b-row",[r("b-col",[r("b-form-group",{attrs:{label:e.$t("plant")}},[r("b-form-select",{attrs:{options:e.createOrderPlantOptions,required:""},on:{change:e.onCreateOrderPlantSelectionChanged},model:{value:e.currentOrder.plantId,callback:function(t){e.$set(e.currentOrder,"plantId",t)},expression:"currentOrder.plantId"}})],1)],1),r("b-col",[r("b-form-group",{attrs:{label:e.$t("customer")}},[r("b-form-select",{attrs:{options:e.createOrderCustomerOptions,disabled:!e.currentOrder.plantId,required:""},model:{value:e.currentOrder.customerId,callback:function(t){e.$set(e.currentOrder,"customerId",t)},expression:"currentOrder.customerId"}})],1)],1)],1),e.currentOrder.id?e._e():r("b-form-group",{attrs:{label:e.$t("type")}},[r("b-form-select",{attrs:{options:e.createOrderTypeOptions,required:""},on:{change:e.onCreateOrderTypeChanged},model:{value:e.currentOrder.orderType,callback:function(t){e.$set(e.currentOrder,"orderType",t)},expression:"currentOrder.orderType"}})],1),r("b-form-group",{attrs:{label:e.$t("product-packages")}},[r("app-multiselect",{attrs:{options:e.productPackagesOptions,disabled:!e.currentOrder.orderType},model:{value:e.currentOrder.productPackages,callback:function(t){e.$set(e.currentOrder,"productPackages",t)},expression:"currentOrder.productPackages"}}),r("app-button",{attrs:{cls:"mar-top",size:"sm",variant:"secondary",loading:e.loadingOrderPPKFDisabled},on:{click:e.onOpenKeyFigureDisable}},[e._v(" "+e._s(e.$t("disable-key-figures-for-product-packages"))+" ")])],1),r("b-form-group",{attrs:{label:e.$t("start-date")}},[r("app-datepicker",{attrs:{required:""},model:{value:e.currentOrder.startDate,callback:function(t){e.$set(e.currentOrder,"startDate",t)},expression:"currentOrder.startDate"}})],1),r("b-form-group",{attrs:{label:e.$t("end-date")}},[r("app-datepicker",{attrs:{required:""},model:{value:e.currentOrder.endDate,callback:function(t){e.$set(e.currentOrder,"endDate",t)},expression:"currentOrder.endDate"}})],1)],1):e._e()]),r("app-modal-form",{ref:"orderPPKFDisabledModal",attrs:{id:"edit-order-pp-key-figures-disabled",title:e.$t("disable-key-figures-for-product-packages"),"ok-title":e.$t("apply"),"cancel-title":e.$t("cancel")},on:{submit:e.onSubmitKeyFigureDisable}},[e.disabledKeyFigures?r("div",e._l(e.disabledKeyFigures,(function(t){return r("b-form-group",{key:t.id,attrs:{label:t.name}},[r("app-multiselect",{attrs:{options:t.keyFigureOptions},model:{value:t.key_figure_ids,callback:function(r){e.$set(t,"key_figure_ids",r)},expression:"pp.key_figure_ids"}})],1)})),1):e._e()])],1)},a=[];n._withStripped=!0;var i,s=r(49),o=r(58),c=r(6),u=r(47),d=r(9),l=r(18),p=r(19),f=r(23),h=r(22),O=r(27),b=(r(44),r(24),r(82),r(96),r(118),r(75),r(149),r(150),r(99),r(488),r(83),r(291),r(15)),g=r(290),v=r(152),y=r(308),m=r(330),k=r(315),_=r(42),P=r(45),C=r(158),j=r(97),x=r(151);(function(e){e[e["SETUP"]=1]="SETUP",e[e["SUBSCRIPTION"]=2]="SUBSCRIPTION"})(i||(i={}));var S=r(62),w=r(287),I=r(316),D=function(e,t,r,n){var a,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(O["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(s=(i<3?a(s):i>3?a(t,r,s):a(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},T=function(e){Object(f["a"])(r,e);var t=Object(h["a"])(r);function r(){var e;return Object(l["a"])(this,r),e=t.apply(this,arguments),e.columns=[],e.rows=[],e.orderTypes=null,e.productPackagesOptions=[],e.plantFilterOptions=[],e.customerFilterOptions=[],e.createOrderPlantOptions=[],e.createOrderCustomerOptions=[],e.createOrderTypeOptions=[],e.selectedPlantId=null,e.selectedCustomerId=null,e.loading=!1,e.orderModalLoading=!1,e.orderModalTitle="",e.orderModalSubTitle="",e.orderModalOkTitle="",e.currentOrder=null,e.loadingOrderPPKFDisabled=!1,e.disabledKeyFigures=[],e}return Object(p["a"])(r,[{key:"created",value:function(){var e=Object(d["a"])(Object(c["a"])().mark((function e(){var t,r=this;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.columns=[{key:"name",label:this.$t("name").toString()},{key:"orderType",label:this.$t("type").toString()},{key:"customer",label:this.$t("customer").toString()},{key:"plant",label:this.$t("plant").toString()},{key:"startDate",label:this.$t("start-date").toString()},{key:"endDate",label:this.$t("end-date").toString()},{key:"productPackages",label:this.$t("product-packages").toString()},{key:"userCreatedUpdated",label:this.$t("last-changed").toString()}],e.next=3,_["a"].getProductPackagesWithKeyFigures();case 3:return this.productPackages=e.sent,this.orderTypes=(t={},Object(u["a"])(t,i.SETUP,this.$t("setup").toString()),Object(u["a"])(t,i.SUBSCRIPTION,this.$t("subscription").toString()),t),this.createOrderTypeOptions=Object.keys(this.orderTypes).map((function(e){return{value:e,text:r.orderTypes[e]}})),e.t0=C["a"],e.next=9,_["a"].getAllPlants();case 9:return e.t1=e.sent,this.plants=(0,e.t0)(e.t1,"name"),e.t2=C["a"],e.next=14,_["a"].getCustomers();case 14:return e.t3=e.sent,this.customers=(0,e.t2)(e.t3,"name"),this.selectedCustomer&&(this.selectedCustomerId=this.selectedCustomer.id),this.createOrderPlantOptions=this.plants.map((function(e){return{value:e.id,text:e.name}})),this.updatePlantFilterOptions(),this.updateCustomerFilterOptions(),e.next=22,this.updateOrderRows();case 22:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"updateOrderRows",value:function(){var e=Object(d["a"])(Object(c["a"])().mark((function e(){var t=this;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.loading=!0,e.prev=1,e.next=4,_["a"].getOrders(this.selectedPlantId,this.selectedCustomerId);case 4:this.rows=e.sent.map((function(e){return{id:e.id,name:e.name,orderType:e.order_type,customer:e.customer.name,plant:e.plant.name,startDate:x["a"].toDate(e.start_date),endDate:x["a"].toDate(e.end_date),productPackages:e.order_product_packages.filter((function(e){return 1!==e.product_package.id})),userCreatedUpdated:t.getUserCreatedUpdated(e)}}));case 5:return e.prev=5,this.loading=!1,e.finish(5);case 8:case"end":return e.stop()}}),e,this,[[1,,5,8]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onCreateOrderClick",value:function(){this.currentOrder={id:null,orderType:null,startDate:null,endDate:null,productPackages:[],plantId:this.selectedPlantId,customerId:this.selectedPlantId&&this.selectedCustomerId},this.updateCreateOrderCustomerOptions(),this.selectedCustomerId||1!==this.createOrderCustomerOptions.length||(this.currentOrder.customerId=this.createOrderCustomerOptions[0].value),this.orderModalTitle=this.$t("create-order").toString(),this.orderModalOkTitle=this.$t("create").toString(),this.orderModalSubTitle="",this.appOrderModal.show()}},{key:"onEditOrderClick",value:function(e){this.currentOrder={id:e.id,startDate:e.startDate,endDate:e.endDate,productPackages:this.concatProductPackagesWithYearly(e.productPackages),orderType:e.orderType},this.updateProductPackagesOptions(),this.orderModalTitle=this.$t("edit-order").toString(),this.orderModalOkTitle=this.$t("apply").toString(),this.orderModalSubTitle=e.name,this.appOrderModal.show()}},{key:"onSubmitOrder",value:function(){var e=Object(d["a"])(Object(c["a"])().mark((function e(){var t,r,n;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=this.unchainProductPackagesWithYearly(this.currentOrder.productPackages),!this.currentOrder.id){e.next=7;break}return e.next=4,_["a"].updateOrder(this.currentOrder.id,{product_packages:t.productPackages,quantities:t.quantities,start_date:this.currentOrder.startDate,end_date:this.currentOrder.endDate,key_figures_disabled:null===(r=this.currentOrder.disabledKeyFigures)||void 0===r?void 0:r.map((function(e){return{product_package_id:e.product_package_id,key_figure_ids:e.key_figure_ids}}))});case 4:this.showSuccess(this.$t("order-updated-success").toString()),e.next=10;break;case 7:return e.next=9,_["a"].createOrder({order_type:this.currentOrder.orderType,customer_id:this.currentOrder.customerId,plant_id:this.currentOrder.plantId,product_packages:t.productPackages,quantities:t.quantities,start_date:this.currentOrder.startDate,end_date:this.currentOrder.endDate,key_figures_disabled:null===(n=this.currentOrder.disabledKeyFigures)||void 0===n?void 0:n.map((function(e){return{product_package_id:e.product_package_id,key_figure_ids:e.key_figure_ids}}))});case 9:this.showSuccess(this.$t("order-created-success").toString());case 10:return this.appOrderModal.hide(),e.next=13,this.updateOrderRows();case 13:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onOpenKeyFigureDisable",value:function(){var e=Object(d["a"])(Object(c["a"])().mark((function e(){var t,r,n,a,i,s=this;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=this.currentOrder.disabledKeyFigures,t){e.next=7;break}if(t=[],!this.currentOrder.id){e.next=7;break}return e.next=6,_["a"].getOrderPPDisabledKeyFigures(this.currentOrder.id);case 6:t=e.sent.map((function(e){return{product_package_id:e.product_package_id,key_figure_ids:e.key_figures_disabled.map((function(e){return e.id}))}}));case 7:r=[],n=Object(o["a"])(this.currentOrder.productPackages);try{for(i=function(){var e,n=a.value,i=s.productPackagesOptions.find((function(e){return e.id===n})).label,o=parseInt(n.split("_")[0]),c=(null===(e=t.find((function(e){return e.product_package_id===o})))||void 0===e?void 0:e.key_figure_ids)||[];r.push({id:n,name:i,product_package_id:o,key_figure_ids:c,keyFigureOptions:s.productPackages.find((function(e){return e.id===o})).key_figures.map((function(e){return{id:e.id,label:e.name}}))})},n.s();!(a=n.n()).done;)i()}catch(c){n.e(c)}finally{n.f()}this.disabledKeyFigures=r,this.orderPPKFDisabledModal.show();case 12:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onSubmitKeyFigureDisable",value:function(){this.currentOrder.disabledKeyFigures=this.disabledKeyFigures,this.orderPPKFDisabledModal.hide()}},{key:"onDeleteOrderClick",value:function(){var e=Object(d["a"])(Object(c["a"])().mark((function e(t){return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(confirm(this.$t("sure-delete-order").toString())){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,_["a"].deleteOrder(t.id);case 4:return this.showSuccess(this.$t("order-deleted-success").toString()),e.next=7,this.updateOrderRows();case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onPlantSelectionChanged",value:function(){var e=Object(d["a"])(Object(c["a"])().mark((function e(){return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.updateCustomerFilterOptions(),e.next=3,this.updateOrderRows();case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onCustomerSelectionChanged",value:function(){var e=Object(d["a"])(Object(c["a"])().mark((function e(){return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.updatePlantFilterOptions(),e.next=3,this.updateOrderRows();case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onCreateOrderPlantSelectionChanged",value:function(){this.updateCreateOrderCustomerOptions(),1===this.createOrderCustomerOptions.length?this.currentOrder.customerId=this.createOrderCustomerOptions[0].value:this.currentOrder.customerId=null}},{key:"onCreateOrderTypeChanged",value:function(){this.updateProductPackagesOptions()}},{key:"updateProductPackagesOptions",value:function(){var e,t=[];if(null!==(e=this.currentOrder)&&void 0!==e&&e.orderType){var r=[],n="";parseInt(this.currentOrder.orderType)===i.SETUP?r=[0]:parseInt(this.currentOrder.orderType)===i.SUBSCRIPTION&&(r=[1,4,12],n=" - Yearly ");var a,s=Object(o["a"])(this.productPackages);try{for(s.s();!(a=s.n()).done;){var c=a.value;if(1!==c.id){var u,d=Object(o["a"])(r);try{for(d.s();!(u=d.n()).done;){var l=u.value;t.push({id:c.id+"_"+l,label:c.name+(n?n+l:"")})}}catch(p){d.e(p)}finally{d.f()}}}}catch(p){s.e(p)}finally{s.f()}this.productPackagesOptions=t}}},{key:"updatePlantFilterOptions",value:function(){var e=this;this.plantFilterOptions=[{value:null,text:""}].concat(Object(s["a"])(this.plants.filter((function(t){return!e.selectedCustomerId||t.customers.find((function(t){return t.id===e.selectedCustomerId}))})).map((function(e){return{value:e.id,text:e.name}}))))}},{key:"updateCustomerFilterOptions",value:function(){var e=this;this.customerFilterOptions=[{value:null,text:""}].concat(Object(s["a"])(this.customers.filter((function(t){return!e.selectedPlantId||e.plants.find((function(t){return t.id===e.selectedPlantId})).customers.find((function(e){return e.id===t.id}))})).map((function(e){return{value:e.id,text:e.name}}))))}},{key:"updateCreateOrderCustomerOptions",value:function(){var e,t=this;null!==(e=this.currentOrder)&&void 0!==e&&e.plantId?this.createOrderCustomerOptions=this.plants.find((function(e){return e.id===t.currentOrder.plantId})).customers.map((function(e){return{value:e.id,text:e.name}})):this.createOrderCustomerOptions=[]}},{key:"getUserCreatedUpdated",value:function(e){var t=this.$t(e.updated_at?"changed-by":"created-by").toString(),r=e.user_updated||e.user_created,n=(r.first_name+" "+r.last_name).trim()||r.email,a=this.$t.apply(this,Object(s["a"])(x["a"].getTimeDiff(e.updated_at||e.created_at))).toString();return"".concat(t,"<br>").concat(n,"<br>").concat(a)}},{key:"concatProductPackagesWithYearly",value:function(e){return e.map((function(e){return"".concat(e.product_package.id,"_").concat(e.quantity)}))}},{key:"unchainProductPackagesWithYearly",value:function(e){var t,r={productPackages:[],quantities:[]},n=Object(o["a"])(e);try{for(n.s();!(t=n.n()).done;){var a=t.value,i=a.split("_");r.productPackages.push(parseInt(i[0])),r.quantities.push(parseInt(i[1]))}}catch(s){n.e(s)}finally{n.f()}return r}}]),r}(P["a"]);D([Object(b["c"])()],T.prototype,"appOrderModal",void 0),D([Object(b["c"])()],T.prototype,"orderPPKFDisabledModal",void 0),D([Object(j["a"])("loading")],T.prototype,"created",null),D([Object(j["a"])()],T.prototype,"onCreateOrderClick",null),D([Object(j["a"])()],T.prototype,"onEditOrderClick",null),D([Object(j["a"])("orderModalLoading")],T.prototype,"onSubmitOrder",null),D([Object(j["a"])("loadingOrderPPKFDisabled")],T.prototype,"onOpenKeyFigureDisable",null),D([Object(j["a"])()],T.prototype,"onSubmitKeyFigureDisable",null),D([Object(j["a"])()],T.prototype,"onDeleteOrderClick",null),D([Object(j["a"])("loading")],T.prototype,"onPlantSelectionChanged",null),D([Object(j["a"])("loading")],T.prototype,"onCustomerSelectionChanged",null),D([Object(j["a"])()],T.prototype,"onCreateOrderPlantSelectionChanged",null),D([Object(j["a"])()],T.prototype,"onCreateOrderTypeChanged",null),T=D([Object(b["a"])({name:"app-settings-orders",components:{AppTableContainer:g["a"],AppModalForm:v["a"],AppMultiselect:y["a"],AppTableFilter:m["a"],AppOrderPpsView:k["a"],AppButton:S["a"],AppTable:w["a"],AppDatepicker:I["a"]}})],T);var $=T,F=$,R=(r(489),r(28)),M=Object(R["a"])(F,n,a,!1,null,null,null);M.options.__file="src/app/settings/orders/orders.vue";t["default"]=M.exports}}]);