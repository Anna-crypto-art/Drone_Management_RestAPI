(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{280:function(e,t,r){"use strict";var n=r(24),a=r(74),i=r(50),s=r(29),o=r(148),c=[],d=c.sort,u=s((function(){c.sort(void 0)})),l=s((function(){c.sort(null)})),p=o("sort"),f=u||!l||!p;n({target:"Array",proto:!0,forced:f},{sort:function(e){return void 0===e?d.call(i(this)):d.call(i(this),a(e))}})},285:function(e,t,r){},302:function(e,t,r){"use strict";r(285)},303:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:"app-order-pps-view"+(e.lefted?" lefted":"")},[e._l(e.innerOrderPPs,(function(t){return r("div",{key:t.id,class:"app-order-pps-view-item "+(t.quantity?"primary":"secondary")},[r("b",[e._v(e._s(t.product_package.name))]),t.quantity?r("i",[e._v(" Yearly "+e._s(t.quantity))]):e._e(),t.quantity?e._e():r("i",[e._v(" Setup")]),t.disabled_key_figures_count?r("small",{staticClass:"app-order-pps-view-item-badge"},[e._v(" -"+e._s(t.disabled_key_figures_count))]):e._e()])})),e.lefted?r("div",{staticClass:"clear"}):e._e()],2)},a=[];n._withStripped=!0;var i=r(19),s=r(20),o=r(22),c=r(21),d=r(27),u=(r(46),r(23),r(144),r(17)),l=r(16),p=function(e,t,r,n){var a,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(d["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(s=(i<3?a(s):i>3?a(t,r,s):a(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},f=function(e){Object(o["a"])(r,e);var t=Object(c["a"])(r);function r(){var e;return Object(i["a"])(this,r),e=t.apply(this,arguments),e.innerOrderPPs=[],e}return Object(s["a"])(r,[{key:"created",value:function(){this.onOrderPPsChanged()}},{key:"onOrderPPsChanged",value:function(){this.innerOrderPPs=this.orderProductPackages.filter((function(e){return 1!==e.product_package.id}))}}]),r}(u["default"]);p([Object(l["b"])({default:[]})],f.prototype,"orderProductPackages",void 0),p([Object(l["b"])({default:!1})],f.prototype,"lefted",void 0),p([Object(l["d"])("orderProductPackages")],f.prototype,"onOrderPPsChanged",null),f=p([Object(l["a"])({name:"app-order-pps-view"})],f);var h=f,O=h,g=(r(302),r(32)),b=Object(g["a"])(O,n,a,!1,null,null,null);b.options.__file="src/app/shared/components/app-order-pps-view/app-order-pps-view.vue";t["a"]=b.exports},308:function(e,t,r){},309:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));r(280);function n(e,t){return e.sort((function(e,r){var n=e[t].toLowerCase(),a=r[t].toLowerCase();return n<a?-1:n>a?1:0}))}},318:function(e,t,r){"use strict";r(308)},324:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-table-filter"},[e._t("default")],2)},a=[];n._withStripped=!0;var i=r(20),s=r(19),o=r(22),c=r(21),d=r(27),u=(r(46),r(23),r(17)),l=r(16),p=function(e,t,r,n){var a,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(d["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(s=(i<3?a(s):i>3?a(t,r,s):a(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},f=function(e){Object(o["a"])(r,e);var t=Object(c["a"])(r);function r(){return Object(s["a"])(this,r),t.apply(this,arguments)}return Object(i["a"])(r)}(u["default"]);f=p([l["a"]],f);var h=f,O=h,g=(r(318),r(32)),b=Object(g["a"])(O,n,a,!1,null,null,null);b.options.__file="src/app/shared/components/app-table-filter/app-table-filter.vue";t["a"]=b.exports},346:function(e,t,r){},424:function(e,t,r){"use strict";var n=r(216),a=r(221),i=r(37),s=r(82),o=r(159),c=r(219),d=r(61),u=r(217),l=r(122),p=r(29),f=[].push,h=Math.min,O=4294967295,g=!p((function(){return!RegExp(O,"y")}));n("split",2,(function(e,t,r){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,r){var n=String(s(this)),i=void 0===r?O:r>>>0;if(0===i)return[];if(void 0===e)return[n];if(!a(e))return t.call(n,e,i);var o,c,d,u=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),h=0,g=new RegExp(e.source,p+"g");while(o=l.call(g,n)){if(c=g.lastIndex,c>h&&(u.push(n.slice(h,o.index)),o.length>1&&o.index<n.length&&f.apply(u,o.slice(1)),d=o[0].length,h=c,u.length>=i))break;g.lastIndex===o.index&&g.lastIndex++}return h===n.length?!d&&g.test("")||u.push(""):u.push(n.slice(h)),u.length>i?u.slice(0,i):u}:"0".split(void 0,0).length?function(e,r){return void 0===e&&0===r?[]:t.call(this,e,r)}:t,[function(t,r){var a=s(this),i=void 0==t?void 0:t[e];return void 0!==i?i.call(t,a,r):n.call(String(a),t,r)},function(e,a){var s=r(n,e,this,a,n!==t);if(s.done)return s.value;var l=i(e),p=String(this),f=o(l,RegExp),b=l.unicode,y=(l.ignoreCase?"i":"")+(l.multiline?"m":"")+(l.unicode?"u":"")+(g?"y":"g"),v=new f(g?l:"^(?:"+l.source+")",y),m=void 0===a?O:a>>>0;if(0===m)return[];if(0===p.length)return null===u(v,p)?[p]:[];var k=0,_=0,P=[];while(_<p.length){v.lastIndex=g?_:0;var C,j=u(v,g?p:p.slice(_));if(null===j||(C=h(d(v.lastIndex+(g?0:_)),p.length))===k)_=c(p,_,b);else{if(P.push(p.slice(k,_)),P.length===m)return P;for(var w=1;w<=j.length-1;w++)if(P.push(j[w]),P.length===m)return P;_=k=C}}return P.push(p.slice(k)),P}]}),!g)},425:function(e,t,r){"use strict";r(346)},471:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-settings-orders"},[r("div",{staticClass:"app-settings-orders-table-toolbar"},[r("app-button",{attrs:{variant:"primary"},on:{click:e.onCreateOrderClick}},[e._v(" "+e._s(e.$t("create-order"))+" ")]),r("app-table-filter",[r("label",{attrs:{for:"plants"}},[e._v(e._s(e.$t("plant")))]),r("b-form-select",{attrs:{id:"plants",options:e.plantFilterOptions},on:{change:e.onPlantSelectionChanged},model:{value:e.selectedPlantId,callback:function(t){e.selectedPlantId=t},expression:"selectedPlantId"}})],1),r("app-table-filter",[r("label",{attrs:{for:"customers"}},[e._v(e._s(e.$t("customer")))]),r("b-form-select",{attrs:{id:"customers",options:e.customerFilterOptions},on:{change:e.onCustomerSelectionChanged},model:{value:e.selectedCustomerId,callback:function(t){e.selectedCustomerId=t},expression:"selectedCustomerId"}})],1)],1),r("app-table-container",{attrs:{size:"sm"}},[r("app-table",{attrs:{columns:e.columns,rows:e.rows,loading:e.loading,hoverActions:!0},scopedSlots:e._u([{key:"cell(orderType)",fn:function(t){return[e._v(" "+e._s(e.orderTypes[t.item.orderType])+" ")]}},{key:"cell(productPackages)",fn:function(e){return[r("app-order-pps-view",{attrs:{orderProductPackages:e.item.productPackages}})]}},{key:"cell(userCreatedUpdated)",fn:function(t){return[r("small",{staticClass:"text-grey",domProps:{innerHTML:e._s(t.item.userCreatedUpdated)}})]}},{key:"hoverActions",fn:function(t){return[r("app-button",{attrs:{variant:"secondary",size:"sm",title:e.$t("edit-order"),icon:"wrench"},on:{click:function(r){return e.onEditOrderClick(t.item)}}}),r("app-button",{attrs:{variant:"outline-danger",size:"sm",title:e.$t("delete-order"),icon:"trash"},on:{click:function(r){return e.onDeleteOrderClick(t.item)}}})]}}])})],1),r("app-modal-form",{ref:"appOrderModal",attrs:{id:"edit-order-modal",title:e.orderModalTitle,subtitle:e.orderModalSubTitle,"ok-title":e.orderModalOkTitle,modalLoading:e.orderModalLoading},on:{submit:e.onSubmitOrder}},[e.currentOrder?r("div",[e.currentOrder.id?e._e():r("b-row",[r("b-col",[r("b-form-group",{attrs:{label:e.$t("plant")}},[r("b-form-select",{attrs:{options:e.createOrderPlantOptions,required:""},on:{change:e.onCreateOrderPlantSelectionChanged},model:{value:e.currentOrder.plantId,callback:function(t){e.$set(e.currentOrder,"plantId",t)},expression:"currentOrder.plantId"}})],1)],1),r("b-col",[r("b-form-group",{attrs:{label:e.$t("customer")}},[r("b-form-select",{attrs:{options:e.createOrderCustomerOptions,disabled:!e.currentOrder.plantId,required:""},model:{value:e.currentOrder.customerId,callback:function(t){e.$set(e.currentOrder,"customerId",t)},expression:"currentOrder.customerId"}})],1)],1)],1),e.currentOrder.id?e._e():r("b-form-group",{attrs:{label:e.$t("type")}},[r("b-form-select",{attrs:{options:e.createOrderTypeOptions,required:""},on:{change:e.onCreateOrderTypeChanged},model:{value:e.currentOrder.orderType,callback:function(t){e.$set(e.currentOrder,"orderType",t)},expression:"currentOrder.orderType"}})],1),r("b-form-group",{attrs:{label:e.$t("product-packages")}},[r("app-multiselect",{attrs:{options:e.productPackagesOptions,disabled:!e.currentOrder.orderType},model:{value:e.currentOrder.productPackages,callback:function(t){e.$set(e.currentOrder,"productPackages",t)},expression:"currentOrder.productPackages"}}),r("app-button",{attrs:{cls:"mar-top",size:"sm",variant:"secondary",loading:e.loadingOrderPPKFDisabled},on:{click:e.onOpenKeyFigureDisable}},[e._v(" "+e._s(e.$t("disable-key-figures-for-product-packages"))+" ")])],1),r("b-form-group",{attrs:{label:e.$t("start-date")}},[r("b-datepicker",{attrs:{required:""},model:{value:e.currentOrder.startDate,callback:function(t){e.$set(e.currentOrder,"startDate",t)},expression:"currentOrder.startDate"}})],1),r("b-form-group",{attrs:{label:e.$t("end-date")}},[r("b-datepicker",{attrs:{required:""},model:{value:e.currentOrder.endDate,callback:function(t){e.$set(e.currentOrder,"endDate",t)},expression:"currentOrder.endDate"}})],1)],1):e._e()]),r("app-modal-form",{ref:"orderPPKFDisabledModal",attrs:{id:"edit-order-pp-key-figures-disabled",title:e.$t("disable-key-figures-for-product-packages"),"ok-title":e.$t("apply")},on:{submit:e.onSubmitKeyFigureDisable}},[e.disabledKeyFigures?r("div",e._l(e.disabledKeyFigures,(function(t){return r("b-form-group",{key:t.id,attrs:{label:t.name}},[r("app-multiselect",{attrs:{options:t.keyFigureOptions},model:{value:t.key_figure_ids,callback:function(r){e.$set(t,"key_figure_ids",r)},expression:"pp.key_figure_ids"}})],1)})),1):e._e()])],1)},a=[];n._withStripped=!0;var i,s=r(59),o=r(67),c=r(6),d=r(44),u=r(11),l=r(19),p=r(20),f=r(22),h=r(21),O=r(27),g=(r(46),r(23),r(112),r(94),r(116),r(72),r(144),r(145),r(96),r(424),r(95),r(290),r(16)),b=r(283),y=r(147),v=r(326),m=r(324),k=r(303),_=r(47),P=r(42),C=r(309),j=r(276),w=r(146);(function(e){e[e["SETUP"]=1]="SETUP",e[e["SUBSCRIPTION"]=2]="SUBSCRIPTION"})(i||(i={}));var S=r(71),x=r(281),I=function(e,t,r,n){var a,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(O["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(s=(i<3?a(s):i>3?a(t,r,s):a(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},T=function(e){Object(f["a"])(r,e);var t=Object(h["a"])(r);function r(){var e;return Object(l["a"])(this,r),e=t.apply(this,arguments),e.columns=[],e.rows=[],e.orderTypes=null,e.productPackagesOptions=[],e.plantFilterOptions=[],e.customerFilterOptions=[],e.createOrderPlantOptions=[],e.createOrderCustomerOptions=[],e.createOrderTypeOptions=[],e.selectedPlantId=null,e.selectedCustomerId=null,e.loading=!1,e.orderModalLoading=!1,e.orderModalTitle="",e.orderModalSubTitle="",e.orderModalOkTitle="",e.currentOrder=null,e.loadingOrderPPKFDisabled=!1,e.disabledKeyFigures=[],e}return Object(p["a"])(r,[{key:"created",value:function(){var e=Object(u["a"])(Object(c["a"])().mark((function e(){var t,r=this;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.columns=[{key:"name",label:this.$t("name").toString()},{key:"orderType",label:this.$t("type").toString()},{key:"customer",label:this.$t("customer").toString()},{key:"plant",label:this.$t("plant").toString()},{key:"startDate",label:this.$t("start-date").toString()},{key:"endDate",label:this.$t("end-date").toString()},{key:"productPackages",label:this.$t("product-packages").toString()},{key:"userCreatedUpdated",label:this.$t("last-changed").toString()}],e.next=3,_["a"].getProductPackagesWithKeyFigures();case 3:return this.productPackages=e.sent,this.orderTypes=(t={},Object(d["a"])(t,i.SETUP,this.$t("setup").toString()),Object(d["a"])(t,i.SUBSCRIPTION,this.$t("subscription").toString()),t),this.createOrderTypeOptions=Object.keys(this.orderTypes).map((function(e){return{value:e,text:r.orderTypes[e]}})),e.t0=C["a"],e.next=9,_["a"].getAllPlants();case 9:return e.t1=e.sent,this.plants=(0,e.t0)(e.t1,"name"),e.t2=C["a"],e.next=14,_["a"].getCustomers();case 14:return e.t3=e.sent,this.customers=(0,e.t2)(e.t3,"name"),this.selectedCustomer&&(this.selectedCustomerId=this.selectedCustomer.id),this.createOrderPlantOptions=this.plants.map((function(e){return{value:e.id,text:e.name}})),this.updatePlantFilterOptions(),this.updateCustomerFilterOptions(),e.next=22,this.updateOrderRows();case 22:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"updateOrderRows",value:function(){var e=Object(u["a"])(Object(c["a"])().mark((function e(){var t=this;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.loading=!0,e.prev=1,e.next=4,_["a"].getOrders(this.selectedPlantId,this.selectedCustomerId);case 4:this.rows=e.sent.map((function(e){return{id:e.id,name:e.name,orderType:e.order_type,customer:e.customer.name,plant:e.plant.name,startDate:w["a"].toDate(e.start_date),endDate:w["a"].toDate(e.end_date),productPackages:e.order_product_packages.filter((function(e){return 1!==e.product_package.id})),userCreatedUpdated:t.getUserCreatedUpdated(e)}}));case 5:return e.prev=5,this.loading=!1,e.finish(5);case 8:case"end":return e.stop()}}),e,this,[[1,,5,8]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onCreateOrderClick",value:function(){this.currentOrder={id:null,orderType:null,startDate:null,endDate:null,productPackages:[],plantId:this.selectedPlantId,customerId:this.selectedPlantId&&this.selectedCustomerId},this.orderModalTitle=this.$t("create-order").toString(),this.orderModalOkTitle=this.$t("create").toString(),this.orderModalSubTitle="",this.appOrderModal.show()}},{key:"onEditOrderClick",value:function(e){this.currentOrder={id:e.id,startDate:e.startDate,endDate:e.endDate,productPackages:this.concatProductPackagesWithYearly(e.productPackages),orderType:e.orderType},this.updateProductPackagesOptions(),this.orderModalTitle=this.$t("edit-order").toString(),this.orderModalOkTitle=this.$t("apply").toString(),this.orderModalSubTitle=e.name,this.appOrderModal.show()}},{key:"onSubmitOrder",value:function(){var e=Object(u["a"])(Object(c["a"])().mark((function e(){var t,r,n;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=this.unchainProductPackagesWithYearly(this.currentOrder.productPackages),!this.currentOrder.id){e.next=7;break}return e.next=4,_["a"].updateOrder(this.currentOrder.id,{product_packages:t.productPackages,quantities:t.quantities,start_date:this.currentOrder.startDate,end_date:this.currentOrder.endDate,key_figures_disabled:null===(r=this.currentOrder.disabledKeyFigures)||void 0===r?void 0:r.map((function(e){return{product_package_id:e.product_package_id,key_figure_ids:e.key_figure_ids}}))});case 4:this.showSuccess(this.$t("order-updated-success").toString()),e.next=10;break;case 7:return e.next=9,_["a"].createOrder({order_type:this.currentOrder.orderType,customer_id:this.currentOrder.customerId,plant_id:this.currentOrder.plantId,product_packages:t.productPackages,quantities:t.quantities,start_date:this.currentOrder.startDate,end_date:this.currentOrder.endDate,key_figures_disabled:null===(n=this.currentOrder.disabledKeyFigures)||void 0===n?void 0:n.map((function(e){return{product_package_id:e.product_package_id,key_figure_ids:e.key_figure_ids}}))});case 9:this.showSuccess(this.$t("order-created-success").toString());case 10:return this.appOrderModal.hide(),e.next=13,this.updateOrderRows();case 13:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onOpenKeyFigureDisable",value:function(){var e=Object(u["a"])(Object(c["a"])().mark((function e(){var t,r,n,a,i,s=this;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=this.currentOrder.disabledKeyFigures,t){e.next=7;break}if(t=[],!this.currentOrder.id){e.next=7;break}return e.next=6,_["a"].getOrderPPDisabledKeyFigures(this.currentOrder.id);case 6:t=e.sent.map((function(e){return{product_package_id:e.product_package_id,key_figure_ids:e.key_figures_disabled.map((function(e){return e.id}))}}));case 7:r=[],n=Object(o["a"])(this.currentOrder.productPackages);try{for(i=function(){var e,n=a.value,i=s.productPackagesOptions.find((function(e){return e.id===n})).label,o=parseInt(n.split("_")[0]),c=(null===(e=t.find((function(e){return e.product_package_id===o})))||void 0===e?void 0:e.key_figure_ids)||[];r.push({id:n,name:i,product_package_id:o,key_figure_ids:c,keyFigureOptions:s.productPackages.find((function(e){return e.id===o})).key_figures.map((function(e){return{id:e.id,label:e.name}}))})},n.s();!(a=n.n()).done;)i()}catch(c){n.e(c)}finally{n.f()}this.disabledKeyFigures=r,this.orderPPKFDisabledModal.show();case 12:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onSubmitKeyFigureDisable",value:function(){this.currentOrder.disabledKeyFigures=this.disabledKeyFigures,this.orderPPKFDisabledModal.hide()}},{key:"onDeleteOrderClick",value:function(){var e=Object(u["a"])(Object(c["a"])().mark((function e(t){return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(confirm(this.$t("sure-delete-order").toString())){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,_["a"].deleteOrder(t.id);case 4:return this.showSuccess(this.$t("order-deleted-success").toString()),e.next=7,this.updateOrderRows();case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onPlantSelectionChanged",value:function(){var e=Object(u["a"])(Object(c["a"])().mark((function e(){return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.updateCustomerFilterOptions(),e.next=3,this.updateOrderRows();case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onCustomerSelectionChanged",value:function(){var e=Object(u["a"])(Object(c["a"])().mark((function e(){return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.updatePlantFilterOptions(),e.next=3,this.updateOrderRows();case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onCreateOrderPlantSelectionChanged",value:function(){this.updateCreateOrderCustomerOptions(),1===this.createOrderCustomerOptions.length?this.currentOrder.customerId=this.createOrderCustomerOptions[0].value:this.currentOrder.customerId=null}},{key:"onCreateOrderTypeChanged",value:function(){this.updateProductPackagesOptions()}},{key:"updateProductPackagesOptions",value:function(){var e,t=[];if(null!==(e=this.currentOrder)&&void 0!==e&&e.orderType){var r=[],n="";parseInt(this.currentOrder.orderType)===i.SETUP?r=[0]:parseInt(this.currentOrder.orderType)===i.SUBSCRIPTION&&(r=[1,4,12],n=" - Yearly ");var a,s=Object(o["a"])(this.productPackages);try{for(s.s();!(a=s.n()).done;){var c=a.value;if(1!==c.id){var d,u=Object(o["a"])(r);try{for(u.s();!(d=u.n()).done;){var l=d.value;t.push({id:c.id+"_"+l,label:c.name+(n?n+l:"")})}}catch(p){u.e(p)}finally{u.f()}}}}catch(p){s.e(p)}finally{s.f()}this.productPackagesOptions=t}}},{key:"updatePlantFilterOptions",value:function(){var e=this;this.plantFilterOptions=[{value:null,text:""}].concat(Object(s["a"])(this.plants.filter((function(t){return!e.selectedCustomerId||t.customers.find((function(t){return t.id===e.selectedCustomerId}))})).map((function(e){return{value:e.id,text:e.name}}))))}},{key:"updateCustomerFilterOptions",value:function(){var e=this;this.customerFilterOptions=[{value:null,text:""}].concat(Object(s["a"])(this.customers.filter((function(t){return!e.selectedPlantId||e.plants.find((function(t){return t.id===e.selectedPlantId})).customers.find((function(e){return e.id===t.id}))})).map((function(e){return{value:e.id,text:e.name}}))))}},{key:"updateCreateOrderCustomerOptions",value:function(){var e,t=this;null!==(e=this.currentOrder)&&void 0!==e&&e.plantId?this.createOrderCustomerOptions=this.plants.find((function(e){return e.id===t.currentOrder.plantId})).customers.map((function(e){return{value:e.id,text:e.name}})):this.createOrderCustomerOptions=[]}},{key:"getUserCreatedUpdated",value:function(e){var t=this.$t(e.updated_at?"changed-by":"created-by").toString(),r=e.user_updated||e.user_created,n=(r.first_name+" "+r.last_name).trim()||r.email,a=this.$t.apply(this,Object(s["a"])(w["a"].getTimeDiff(e.updated_at||e.created_at))).toString();return"".concat(t,"<br>").concat(n,"<br>").concat(a)}},{key:"concatProductPackagesWithYearly",value:function(e){return e.map((function(e){return"".concat(e.product_package.id,"_").concat(e.quantity)}))}},{key:"unchainProductPackagesWithYearly",value:function(e){var t,r={productPackages:[],quantities:[]},n=Object(o["a"])(e);try{for(n.s();!(t=n.n()).done;){var a=t.value,i=a.split("_");r.productPackages.push(parseInt(i[0])),r.quantities.push(parseInt(i[1]))}}catch(s){n.e(s)}finally{n.f()}return r}}]),r}(P["a"]);I([Object(g["c"])()],T.prototype,"appOrderModal",void 0),I([Object(g["c"])()],T.prototype,"orderPPKFDisabledModal",void 0),I([Object(j["a"])("loading")],T.prototype,"created",null),I([Object(j["a"])()],T.prototype,"onCreateOrderClick",null),I([Object(j["a"])()],T.prototype,"onEditOrderClick",null),I([Object(j["a"])("orderModalLoading")],T.prototype,"onSubmitOrder",null),I([Object(j["a"])("loadingOrderPPKFDisabled")],T.prototype,"onOpenKeyFigureDisable",null),I([Object(j["a"])()],T.prototype,"onSubmitKeyFigureDisable",null),I([Object(j["a"])()],T.prototype,"onDeleteOrderClick",null),I([Object(j["a"])("loading")],T.prototype,"onPlantSelectionChanged",null),I([Object(j["a"])("loading")],T.prototype,"onCustomerSelectionChanged",null),I([Object(j["a"])()],T.prototype,"onCreateOrderPlantSelectionChanged",null),I([Object(j["a"])()],T.prototype,"onCreateOrderTypeChanged",null),T=I([Object(g["a"])({name:"app-settings-orders",components:{AppTableContainer:b["a"],AppModalForm:y["a"],AppMultiselect:v["a"],AppTableFilter:m["a"],AppOrderPpsView:k["a"],AppButton:S["a"],AppTable:x["a"]}})],T);var $=T,D=$,F=(r(425),r(32)),M=Object(F["a"])(D,n,a,!1,null,null,null);M.options.__file="src/app/settings/orders/orders.vue";t["default"]=M.exports}}]);