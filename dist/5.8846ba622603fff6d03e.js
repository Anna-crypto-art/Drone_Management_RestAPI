(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{274:function(e,t,a){},276:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:"app-table-container "+(e.size?"app-table-container-"+e.size:"")},[e._t("default")],2)},r=[];n._withStripped=!0;var s=a(20),i=a(19),l=a(25),o=a(24),c=a(30),u=(a(48),a(23),a(17)),p=a(16),d=function(e,t,a,n){var r,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(i=(s<3?r(i):s>3?r(t,a,i):r(t,a))||i);return s>3&&i&&Object.defineProperty(t,a,i),i},f=function(e){Object(l["a"])(a,e);var t=Object(o["a"])(a);function a(){return Object(i["a"])(this,a),t.apply(this,arguments)}return Object(s["a"])(a)}(u["default"]);d([Object(p["b"])({default:""})],f.prototype,"size",void 0),f=d([p["a"]],f);var v=f,h=v,m=(a(278),a(34)),b=Object(m["a"])(h,n,r,!1,null,null,null);b.options.__file="src/app/shared/components/app-table-container/app-table-container.vue";t["a"]=b.exports},277:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},278:function(e,t,a){"use strict";a(274)},279:function(e,t,a){"use strict";var n=a(21),r=a(73),s=a(49),i=a(28),l=a(148),o=[],c=o.sort,u=i((function(){o.sort(void 0)})),p=i((function(){o.sort(null)})),d=l("sort"),f=u||!p||!d;n({target:"Array",proto:!0,forced:f},{sort:function(e){return void 0===e?c.call(s(this)):c.call(s(this),r(e))}})},281:function(e,t,a){"use strict";var n=a(21),r=a(282).trim,s=a(283);n({target:"String",proto:!0,forced:s("trim")},{trim:function(){return r(this)}})},282:function(e,t,a){var n=a(81),r=a(277),s="["+r+"]",i=RegExp("^"+s+s+"*"),l=RegExp(s+s+"*$"),o=function(e){return function(t){var a=String(n(t));return 1&e&&(a=a.replace(i,"")),2&e&&(a=a.replace(l,"")),a}};e.exports={start:o(1),end:o(2),trim:o(3)}},283:function(e,t,a){var n=a(28),r=a(277),s="​᠎";e.exports=function(e){return n((function(){return!!r[e]()||s[e]()!=s||r[e].name!==e}))}},284:function(e,t,a){},285:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return i}));var n,r,s=a(55);(function(e){e[e["EMPTY"]=0]="EMPTY",e[e["UPLOADING"]=1]="UPLOADING",e[e["UPLOAD_FAILED"]=2]="UPLOAD_FAILED",e[e["DATA_INCOMPLETE"]=3]="DATA_INCOMPLETE",e[e["DATA_COMPLETE"]=4]="DATA_COMPLETE",e[e["DATA_COMPLETE_VERIFIED"]=5]="DATA_COMPLETE_VERIFIED",e[e["PROCESSING"]=6]="PROCESSING",e[e["FINISHED"]=7]="FINISHED"})(r||(r={}));var i=(n={},Object(s["a"])(n,r.EMPTY,"EMPTY"),Object(s["a"])(n,r.UPLOADING,"UPLOADING"),Object(s["a"])(n,r.UPLOAD_FAILED,"UPLOAD_FAILED"),Object(s["a"])(n,r.DATA_INCOMPLETE,"DATA_INCOMPLETE"),Object(s["a"])(n,r.DATA_COMPLETE,"DATA_COMPLETE"),Object(s["a"])(n,r.DATA_COMPLETE_VERIFIED,"DATA_COMPLETE_VERIFIED"),Object(s["a"])(n,r.PROCESSING,"PROCESSING"),Object(s["a"])(n,r.FINISHED,"FINISHED"),n)},291:function(e,t,a){"use strict";a(284)},292:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:"app-order-pps-view"+(e.lefted?" lefted":"")},[e._l(e.innerOrderPPs,(function(t){return a("div",{key:t.id,class:"app-order-pps-view-item "+(t.quantity?"primary":"secondary")},[a("b",[e._v(e._s(t.product_package.name))]),t.quantity?a("i",[e._v(" Yearly "+e._s(t.quantity))]):e._e(),t.quantity?e._e():a("i",[e._v(" Setup")])])})),e.lefted?a("div",{staticClass:"clear"}):e._e()],2)},r=[];n._withStripped=!0;var s=a(19),i=a(20),l=a(25),o=a(24),c=a(30),u=(a(48),a(23),a(144),a(17)),p=a(16),d=function(e,t,a,n){var r,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(i=(s<3?r(i):s>3?r(t,a,i):r(t,a))||i);return s>3&&i&&Object.defineProperty(t,a,i),i},f=function(e){Object(l["a"])(a,e);var t=Object(o["a"])(a);function a(){var e;return Object(s["a"])(this,a),e=t.apply(this,arguments),e.innerOrderPPs=[],e}return Object(i["a"])(a,[{key:"created",value:function(){this.onOrderPPsChanged()}},{key:"onOrderPPsChanged",value:function(){this.innerOrderPPs=this.orderProductPackages.filter((function(e){return 1!==e.product_package.id}))}}]),a}(u["default"]);d([Object(p["b"])({default:[]})],f.prototype,"orderProductPackages",void 0),d([Object(p["b"])({default:!1})],f.prototype,"lefted",void 0),d([Object(p["d"])("orderProductPackages")],f.prototype,"onOrderPPsChanged",null),f=d([Object(p["a"])({name:"app-order-pps-view"})],f);var v=f,h=v,m=(a(291),a(34)),b=Object(m["a"])(h,n,r,!1,null,null,null);b.options.__file="src/app/shared/components/app-order-pps-view/app-order-pps-view.vue";t["a"]=b.exports},294:function(e,t,a){},295:function(e,t,a){},296:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a(279);function n(e,t){return e.sort((function(e,a){var n=e[t].toLowerCase(),r=a[t].toLowerCase();return n<r?-1:n>r?1:0}))}},304:function(e,t,a){"use strict";a(294)},305:function(e,t,a){"use strict";a(295)},313:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-modal-form-info-area"},[e._t("default")],2)},r=[];n._withStripped=!0;var s=a(20),i=a(19),l=a(25),o=a(24),c=a(30),u=(a(48),a(23),a(17)),p=a(16),d=function(e,t,a,n){var r,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(i=(s<3?r(i):s>3?r(t,a,i):r(t,a))||i);return s>3&&i&&Object.defineProperty(t,a,i),i},f=function(e){Object(l["a"])(a,e);var t=Object(o["a"])(a);function a(){return Object(i["a"])(this,a),t.apply(this,arguments)}return Object(s["a"])(a)}(u["default"]);f=d([Object(p["a"])({name:"app-modal-form-info-area"})],f);var v=f,h=v,m=(a(304),a(34)),b=Object(m["a"])(h,n,r,!1,null,null,null);b.options.__file="src/app/shared/components/app-modal/app-modal-form-info-area.vue";t["a"]=b.exports},314:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-table-filter"},[e._t("default")],2)},r=[];n._withStripped=!0;var s=a(20),i=a(19),l=a(25),o=a(24),c=a(30),u=(a(48),a(23),a(17)),p=a(16),d=function(e,t,a,n){var r,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(i=(s<3?r(i):s>3?r(t,a,i):r(t,a))||i);return s>3&&i&&Object.defineProperty(t,a,i),i},f=function(e){Object(l["a"])(a,e);var t=Object(o["a"])(a);function a(){return Object(i["a"])(this,a),t.apply(this,arguments)}return Object(s["a"])(a)}(u["default"]);f=d([p["a"]],f);var v=f,h=v,m=(a(305),a(34)),b=Object(m["a"])(h,n,r,!1,null,null,null);b.options.__file="src/app/shared/components/app-table-filter/app-table-filter.vue";t["a"]=b.exports},317:function(e,t,a){},364:function(e,t,a){"use strict";a(317)},424:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("app-content",{attrs:{title:e.$t("analysis-overview"),subtitle:e.$t("analysis-overview_descr")}},[a("div",{staticClass:"app-analysis"},[e.hasCompleteAnalysesOnly?a("b-button",{attrs:{variant:"primary"},on:{click:e.onNewDataUploadClick}},[e._v(" "+e._s(e.$t("new-data-upload"))+" ")]):e._e(),a("b-alert",{staticClass:"mar-bottom-2x",attrs:{show:!!e.incompleteAnalysis,variant:"info"}},[e.incompleteAnalysis?a("span",{domProps:{innerHTML:e._s(e.$t("new-upload-not-allowed_descr",{analysis:e.incompleteAnalysis.name}))}}):e._e()]),e.incompleteAnalysis?a("router-link",{attrs:{to:{name:"EditAnalysis",params:{id:e.incompleteAnalysis.id}}}},[a("b-button",{attrs:{variant:"primary"}},[e._v(" "+e._s(e.$t("upload-data-for-analysis",{analysis:e.incompleteAnalysis.name}))+" ")])],1):e._e(),a("app-table-filter",{directives:[{name:"show",rawName:"v-show",value:e.plantSelection,expression:"plantSelection"}]},[a("label",{attrs:{for:"plants"}},[e._v(e._s(e.$t("plant")))]),a("b-form-select",{attrs:{id:"plants",options:e.plantSelection},on:{change:e.onPlantSelectionChanged},model:{value:e.selectedPlantId,callback:function(t){e.selectedPlantId=t},expression:"selectedPlantId"}})],1),a("div",{staticClass:"clear"}),a("app-table-container",[a("b-table",{attrs:{hover:"",fields:e.columns,items:e.analysisRows,"head-variant":"light","show-empty":"",emptyText:e.$t("no-data"),busy:e.isLoading},scopedSlots:e._u([{key:"table-busy",fn:function(){return[a("div",{staticClass:"text-center"},[a("b-spinner",{staticClass:"align-middle"})],1)]},proxy:!0},{key:"empty",fn:function(t){return[a("span",{staticClass:"grayed"},[e._v(e._s(t.emptyText))])]}},{key:"head(actions)",fn:function(){return[a("span",{staticClass:"hidden"},[e._v(e._s(e.$t("actions")))])]},proxy:!0},{key:"head(customer)",fn:function(){return[e._v(" "+e._s(e.$t("customer"))+" "),a("app-super-admin-marker")]},proxy:!0},{key:"cell(name)",fn:function(t){return[a("router-link",{attrs:{to:{name:"EditAnalysis",params:{id:t.item.id}}}},[e._v(e._s(t.item.name))]),a("div",[a("small",{staticClass:"grayed"},[e._v(e._s(t.item.user.userName||t.item.user.email))])])]}},{key:"cell(state)",fn:function(t){return[t.item.state?a("div",[e._v(" "+e._s(e.$t(t.item.state.state.name))+" "),a("b-icon",{directives:[{name:"show",rawName:"v-show",value:e.hasReleasedResult(t.item),expression:"hasReleasedResult(row.item)"},{name:"b-popover",rawName:"v-b-popover.hover.top",value:e.$t("results-available"),expression:"$t('results-available')",modifiers:{hover:!0,top:!0}}],staticClass:"text-success",attrs:{icon:"check"}}),a("b-icon",{directives:[{name:"show",rawName:"v-show",value:e.isSuperAdmin&&e.hasResult(t.item)&&!e.hasReleasedResult(t.item),expression:"isSuperAdmin && hasResult(row.item) && !hasReleasedResult(row.item)"},{name:"b-popover",rawName:"v-b-popover.hover.top",value:e.$t("results-available-super-admin-only"),expression:"$t('results-available-super-admin-only')",modifiers:{hover:!0,top:!0}}],staticClass:"text-success",attrs:{icon:"shield-check"}}),a("br"),a("small",{staticClass:"grayed"},[e._v(e._s(e.trans(e.getTimeDiff(t.item.state.started_at))))])],1):a("div",[e._v("UNKNOWN")])]}},{key:"cell(productPackages)",fn:function(e){return[a("app-order-pps-view",{attrs:{orderProductPackages:e.item.productPackages}})]}},{key:"cell(actions)",fn:function(t){return[a("div",{staticClass:"hover-cell pull-right"},[e.hasReadableResult(t.item)?a("router-link",{attrs:{title:e.$t("show-results"),to:{name:"Plant",params:{id:t.item.plantId},query:{view:"table",result:t.item.analysisResult.id}}}},[a("b-button",{attrs:{variant:"primary",size:"sm"}},[a("b-icon",{attrs:{icon:"graph-up"}})],1)],1):e._e()],1),a("div",{staticClass:"clearfix"})]}}])})],1)],1)])},r=[];n._withStripped=!0;var s=a(58),i=a(7),l=a(12),o=a(19),c=a(20),u=a(25),p=a(24),d=a(30),f=(a(48),a(23),a(112),a(144),a(94),a(70),a(281),a(97)),v=a(313),h=a(147),m=a(276),b=a(314),y=a(292),O=a(16),_=a(42),P=a(296),w=a(146),A=a(285),j=a(64),g=a(45),R=function(e,t,a,n){var r,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(d["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(i=(s<3?r(i):s>3?r(t,a,i):r(t,a))||i);return s>3&&i&&Object.defineProperty(t,a,i),i},E=function(e){Object(u["a"])(a,e);var t=Object(p["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.columns=[],e.plantSelection=null,e.selectedPlantId=null,e.analysisRows=null,e.isLoading=!0,e.createNewAnalysisBtnText="",e.uploadStateProcess="",e}return Object(c["a"])(a,[{key:"created",value:function(){var e=Object(l["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.createNewAnalysisBtnText=this.$t("new-data-upload").toString(),this.columns=[{key:"name",label:this.$t("name").toString(),sortable:!0},{key:"date",label:this.$t("acquisition-date").toString(),sortable:!0,formatter:function(e){return w["a"].toDate(e)}},{key:"state",label:this.$t("state").toString(),sortable:!0},{key:"productPackages",label:this.$t("product-packages").toString()},{key:"actions"}],this.isSuperAdmin&&this.columns.push({key:"customer",label:this.$t("customer").toString(),sortable:!0}),e.next=5,this.getPlants();case 5:return e.next=7,this.updateAnalysisRows();case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"trans",value:function(e){return this.$t.apply(this,Object(s["a"])(e)).toString()}},{key:"onPlantSelectionChanged",value:function(){var e=Object(l["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.updateAnalysisRows();case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"hasCompleteAnalysesOnly",get:function(){return this.analysisRows&&0===this.incompleteAnalyses.length||!1}},{key:"incompleteAnalysis",get:function(){var e=this.incompleteAnalyses;return 1===e.length?e[0]:null}},{key:"incompleteAnalyses",get:function(){return this.analysisRows?this.analysisRows.filter((function(e){return e.state&&e.state.state.id<=A["a"].DATA_INCOMPLETE})):[]}},{key:"hasResult",value:function(e){return!!e.analysisResult}},{key:"hasReleasedResult",value:function(e){var t;return(null===(t=e.analysisResult)||void 0===t?void 0:t.released)||!1}},{key:"hasReadableResult",value:function(e){return this.hasReleasedResult(e)||this.isSuperAdmin&&this.hasResult(e)}},{key:"onNewDataUploadClick",value:function(){if(this.hasCompleteAnalysesOnly){var e=this.selectedPlantId?{plantId:this.selectedPlantId}:void 0;this.$router.push({name:"AnalysisNew",query:e})}}},{key:"updateAnalysisRows",value:function(){var e=Object(l["a"])(Object(i["a"])().mark((function e(){var t;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.isLoading=!0,e.prev=1,t={},this.selectedPlantId&&(t.plant_id=this.selectedPlantId),e.next=6,g["a"].getAllAnalysis(t);case 6:this.analysisRows=e.sent.map((function(e){var t={id:e.id,name:e.name,date:e.flown_at,user:e.user&&{userName:((e.user.first_name||"")+" "+(e.user.last_name||"")).trim(),email:e.user.email}||"",analysisResult:e.analysis_result,state:e.current_state,files:e.files,plantId:e.plant.id,plant:e.plant.name,customer:e.customer.name,productPackages:e.order_product_packages};return t})),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](1),this.showError(e.t0);case 12:return e.prev=12,this.isLoading=!1,e.finish(12);case 15:case"end":return e.stop()}}),e,this,[[1,9,12,15]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"getPlants",value:function(){var e=Object(l["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.t0=P["a"],e.next=4,g["a"].getPlants();case 4:e.t1=e.sent,this.plants=(0,e.t0)(e.t1,"name"),this.plants.length>1&&(this.plantSelection=this.plants.map((function(e){return{value:e.id,text:e.name}})),this.plantSelection.unshift({value:null,text:""})),e.next=12;break;case 9:e.prev=9,e.t2=e["catch"](0),this.showError(e.t2);case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));function t(){return e.apply(this,arguments)}return t}()}]),a}(_["a"]);E=R([Object(O["a"])({name:"app-analysis",components:{AppContent:f["a"],AppTableContainer:m["a"],AppModalForm:h["a"],AppModalFormInfoArea:v["a"],AppTableFilter:b["a"],AppOrderPpsView:y["a"],AppSuperAdminMarker:j["a"]}})],E);var k=E,C=k,I=(a(364),a(34)),D=Object(I["a"])(C,n,r,!1,null,null,null);D.options.__file="src/app/analysis/analysis.vue";t["default"]=D.exports}}]);