(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{285:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},289:function(e,t,a){"use strict";var n=a(25),s=a(291).trim,r=a(294);n({target:"String",proto:!0,forced:r("trim")},{trim:function(){return s(this)}})},291:function(e,t,a){var n=a(82),s=a(285),r="["+s+"]",i=RegExp("^"+r+r+"*"),l=RegExp(r+r+"*$"),o=function(e){return function(t){var a=String(n(t));return 1&e&&(a=a.replace(i,"")),2&e&&(a=a.replace(l,"")),a}};e.exports={start:o(1),end:o(2),trim:o(3)}},294:function(e,t,a){var n=a(29),s=a(285),r="​᠎";e.exports=function(e){return n((function(){return!!s[e]()||r[e]()!=r||s[e].name!==e}))}},295:function(e,t,a){},296:function(e,t,a){},297:function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return i}));var n,s,r=a(47);(function(e){e[e["EMPTY"]=0]="EMPTY",e[e["UPLOADING"]=1]="UPLOADING",e[e["UPLOAD_FAILED"]=2]="UPLOAD_FAILED",e[e["DATA_INCOMPLETE"]=3]="DATA_INCOMPLETE",e[e["DATA_COMPLETE"]=4]="DATA_COMPLETE",e[e["DATA_COMPLETE_VERIFIED"]=5]="DATA_COMPLETE_VERIFIED",e[e["PROCESSING"]=6]="PROCESSING",e[e["FINISHED"]=7]="FINISHED"})(s||(s={}));var i=(n={},Object(r["a"])(n,s.EMPTY,"EMPTY"),Object(r["a"])(n,s.UPLOADING,"UPLOADING"),Object(r["a"])(n,s.UPLOAD_FAILED,"UPLOAD_FAILED"),Object(r["a"])(n,s.DATA_INCOMPLETE,"DATA_INCOMPLETE"),Object(r["a"])(n,s.DATA_COMPLETE,"DATA_COMPLETE"),Object(r["a"])(n,s.DATA_COMPLETE_VERIFIED,"DATA_COMPLETE_VERIFIED"),Object(r["a"])(n,s.PROCESSING,"PROCESSING"),Object(r["a"])(n,s.FINISHED,"FINISHED"),n)},301:function(e,t,a){},306:function(e,t,a){"use strict";a(295)},307:function(e,t,a){"use strict";a(296)},309:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:"app-modal-form-info-area "+e.cls},[e._t("default")],2)},s=[];n._withStripped=!0;var r=a(19),i=a(18),l=a(23),o=a(22),c=a(27),u=(a(44),a(24),a(17)),p=a(16),d=function(e,t,a,n){var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(r<3?s(i):r>3?s(t,a,i):s(t,a))||i);return r>3&&i&&Object.defineProperty(t,a,i),i},f=function(e){Object(l["a"])(a,e);var t=Object(o["a"])(a);function a(){return Object(i["a"])(this,a),t.apply(this,arguments)}return Object(r["a"])(a)}(u["default"]);d([Object(p["b"])({default:""})],f.prototype,"cls",void 0),f=d([Object(p["a"])({name:"app-modal-form-info-area"})],f);var v=f,h=v,m=(a(306),a(28)),b=Object(m["a"])(h,n,s,!1,null,null,null);b.options.__file="src/app/shared/components/app-modal/app-modal-form-info-area.vue";t["a"]=b.exports},310:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:"app-order-pps-view"+(e.lefted?" lefted":"")},[e._l(e.innerOrderPPs,(function(t){return a("div",{key:t.id,class:"app-order-pps-view-item "+(t.quantity?"primary":"secondary")},[a("b",[e._v(e._s(t.product_package.name))]),t.quantity?a("i",[e._v(" Yearly "+e._s(t.quantity))]):e._e(),t.quantity?e._e():a("i",[e._v(" Setup")]),t.disabled_key_figures_count?a("small",{staticClass:"app-order-pps-view-item-badge"},[e._v(" -"+e._s(t.disabled_key_figures_count))]):e._e()])})),e.lefted?a("div",{staticClass:"clear"}):e._e()],2)},s=[];n._withStripped=!0;var r=a(18),i=a(19),l=a(23),o=a(22),c=a(27),u=(a(44),a(24),a(149),a(17)),p=a(16),d=function(e,t,a,n){var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(r<3?s(i):r>3?s(t,a,i):s(t,a))||i);return r>3&&i&&Object.defineProperty(t,a,i),i},f=function(e){Object(l["a"])(a,e);var t=Object(o["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.innerOrderPPs=[],e}return Object(i["a"])(a,[{key:"created",value:function(){this.onOrderPPsChanged()}},{key:"onOrderPPsChanged",value:function(){this.innerOrderPPs=this.orderProductPackages.filter((function(e){return 1!==e.product_package.id}))}}]),a}(u["default"]);d([Object(p["b"])({default:[]})],f.prototype,"orderProductPackages",void 0),d([Object(p["b"])({default:!1})],f.prototype,"lefted",void 0),d([Object(p["d"])("orderProductPackages")],f.prototype,"onOrderPPsChanged",null),f=d([Object(p["a"])({name:"app-order-pps-view"})],f);var v=f,h=v,m=(a(307),a(28)),b=Object(m["a"])(h,n,s,!1,null,null,null);b.options.__file="src/app/shared/components/app-order-pps-view/app-order-pps-view.vue";t["a"]=b.exports},318:function(e,t,a){"use strict";a(301)},324:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-table-filter"},[e._t("default")],2)},s=[];n._withStripped=!0;var r=a(19),i=a(18),l=a(23),o=a(22),c=a(27),u=(a(44),a(24),a(17)),p=a(16),d=function(e,t,a,n){var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(r<3?s(i):r>3?s(t,a,i):s(t,a))||i);return r>3&&i&&Object.defineProperty(t,a,i),i},f=function(e){Object(l["a"])(a,e);var t=Object(o["a"])(a);function a(){return Object(i["a"])(this,a),t.apply(this,arguments)}return Object(r["a"])(a)}(u["default"]);f=d([p["a"]],f);var v=f,h=v,m=(a(318),a(28)),b=Object(m["a"])(h,n,s,!1,null,null,null);b.options.__file="src/app/shared/components/app-table-filter/app-table-filter.vue";t["a"]=b.exports},352:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-iconstack",{class:e.cls},[a("b-icon",{attrs:{stacked:"",icon:"search",scale:"1.2"}}),a("b-icon",{attrs:{stacked:"",icon:e.fill?"bar-chart-fill":"bar-chart","shift-v":"2","shift-h":"-2",scale:"0.5"}})],1)},s=[];n._withStripped=!0;var r=a(19),i=a(18),l=a(23),o=a(22),c=a(27),u=(a(44),a(24),a(17)),p=a(16),d=function(e,t,a,n){var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(r<3?s(i):r>3?s(t,a,i):s(t,a))||i);return r>3&&i&&Object.defineProperty(t,a,i),i},f=function(e){Object(l["a"])(a,e);var t=Object(o["a"])(a);function a(){return Object(i["a"])(this,a),t.apply(this,arguments)}return Object(r["a"])(a)}(u["default"]);d([Object(p["b"])({default:""})],f.prototype,"cls",void 0),d([Object(p["b"])({default:!0})],f.prototype,"fill",void 0),f=d([Object(p["a"])({name:"app-icon-analysis"})],f);var v=f,h=v,m=a(28),b=Object(m["a"])(h,n,s,!1,null,null,null);b.options.__file="src/app/shared/components/app-icon/app-icon-analysis.vue";t["a"]=b.exports},360:function(e,t,a){},443:function(e,t,a){"use strict";a(360)},515:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("app-content",{attrs:{title:e.$t("analysis-overview"),subtitle:e.$t("analysis-overview_descr")}},[a("div",{staticClass:"app-analysis"},[e.hasCompleteAnalysesOnly?a("app-button",{attrs:{variant:"primary"},on:{click:e.onNewDataUploadClick}},[e._v(" "+e._s(e.$t("create-new-analysis"))+" ")]):e._e(),a("b-alert",{staticClass:"mar-bottom-2x",attrs:{show:!!e.incompleteAnalysis,variant:"info"}},[e.incompleteAnalysis?a("span",{domProps:{innerHTML:e._s(e.$t("new-upload-not-allowed_descr",{analysis:e.incompleteAnalysis.name}))}}):e._e()]),e.incompleteAnalysis?a("router-link",{attrs:{to:{name:"UploadForAnalysis",params:{id:e.incompleteAnalysis.id}}}},[a("app-button",{attrs:{variant:"primary"}},[e._v(" "+e._s(e.$t("upload-data-for-analysis",{analysis:e.incompleteAnalysis.name}))+" ")])],1):e._e(),a("app-table-filter",{directives:[{name:"show",rawName:"v-show",value:e.plantSelection,expression:"plantSelection"}]},[a("label",{attrs:{for:"plants"}},[e._v(e._s(e.$t("plant")))]),a("b-form-select",{attrs:{id:"plants",options:e.plantSelection},on:{change:e.onPlantSelectionChanged},model:{value:e.selectedPlantId,callback:function(t){e.selectedPlantId=t},expression:"selectedPlantId"}})],1),a("div",{staticClass:"clear"}),a("app-table-container",[a("app-table",{attrs:{columns:e.columns,rows:e.analysisRows,loading:e.isLoading,hoverActions:!0},scopedSlots:e._u([{key:"cell(name)",fn:function(t){return[a("router-link",{attrs:{to:{name:"EditAnalysis",params:{id:t.item.id}}}},[e._v(e._s(t.item.name))]),a("div",[a("small",{staticClass:"grayed"},[e._v(e._s(t.item.user.userName||t.item.user.email))])])]}},{key:"cell(state)",fn:function(t){return[t.item.state?a("div",[e._v(" "+e._s(e.$t(t.item.state.state.name))+" "),a("b-icon",{directives:[{name:"show",rawName:"v-show",value:e.hasReleasedResult(t.item),expression:"hasReleasedResult(row.item)"},{name:"b-popover",rawName:"v-b-popover.hover.top",value:e.$t("results-available"),expression:"$t('results-available')",modifiers:{hover:!0,top:!0}}],staticClass:"text-success",attrs:{icon:"check"}}),a("b-icon",{directives:[{name:"show",rawName:"v-show",value:e.isSuperAdmin&&e.hasResult(t.item)&&!e.hasReleasedResult(t.item),expression:"isSuperAdmin && hasResult(row.item) && !hasReleasedResult(row.item)"},{name:"b-popover",rawName:"v-b-popover.hover.top",value:e.$t("results-available-super-admin-only"),expression:"$t('results-available-super-admin-only')",modifiers:{hover:!0,top:!0}}],staticClass:"text-success",attrs:{icon:"shield-check"}}),a("br"),a("small",{staticClass:"grayed"},[e._v(e._s(e.trans(e.getTimeDiff(t.item.state.started_at))))])],1):a("div",[e._v("UNKNOWN")])]}},{key:"cell(productPackages)",fn:function(e){return[a("app-order-pps-view",{attrs:{orderProductPackages:e.item.productPackages}})]}},{key:"hoverActions",fn:function(t){return[e.hasReadableResult(t.item)?a("router-link",{attrs:{title:e.$t("show-results"),to:{name:"Plant",params:{id:t.item.plantId},query:{view:"map",result:t.item.id}}}},[a("app-button",{attrs:{variant:"primary",size:"sm"}},[a("app-icon-analysis")],1)],1):e._e()]}}])})],1)],1)])},s=[];n._withStripped=!0;var r=a(49),i=a(6),l=a(9),o=a(18),c=a(19),u=a(23),p=a(22),d=a(27),f=(a(44),a(24),a(94),a(149),a(95),a(75),a(289),a(150),a(98)),v=a(309),h=a(152),m=a(288),b=a(287),y=a(324),O=a(310),_=a(16),P=a(45),A=a(158),j=a(151),w=a(297),g=a(64),R=a(352),E=a(42),k=a(148),I=a(62),S=a(68),D=function(e,t,a,n){var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(d["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(r<3?s(i):r>3?s(t,a,i):s(t,a))||i);return r>3&&i&&Object.defineProperty(t,a,i),i},C="app-analysis:selectedPlantId",T=function(e){Object(u["a"])(a,e);var t=Object(p["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.columns=[],e.plantSelection=null,e.selectedPlantId=null,e.analysisRows=null,e.isLoading=!0,e.createNewAnalysisBtnText="",e.uploadStateProcess="",e}return Object(c["a"])(a,[{key:"created",value:function(){var e=Object(l["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.createNewAnalysisBtnText=this.$t("new-data-upload").toString(),this.columns=[{key:"name",label:this.$t("name").toString(),sortable:!0},{key:"date",label:this.$t("acquisition-date").toString(),sortable:!0,formatter:function(e){return j["a"].toDate(e)}},{key:"state",label:this.$t("state").toString(),sortable:!0},{key:"productPackages",label:this.$t("product-packages").toString()}],this.isSuperAdmin&&this.columns.push({key:"customer",label:this.$t("customer").toString(),sortable:!0,superAdminOnly:!0}),e.next=5,this.getPlants();case 5:return e.next=7,this.updateAnalysisRows();case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"trans",value:function(e){return this.$t.apply(this,Object(r["a"])(e)).toString()}},{key:"onPlantSelectionChanged",value:function(){var e=Object(l["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return S["a"].setItem(C,this.selectedPlantId),e.next=3,this.updateAnalysisRows();case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"hasCompleteAnalysesOnly",get:function(){return this.analysisRows&&0===this.incompleteAnalyses.length||!1}},{key:"incompleteAnalysis",get:function(){var e=this.incompleteAnalyses;return 1===e.length?e[0]:null}},{key:"incompleteAnalyses",get:function(){return this.analysisRows?this.analysisRows.filter((function(e){return e.state&&e.state.state.id<=w["a"].DATA_INCOMPLETE})):[]}},{key:"hasResult",value:function(e){return!!e.analysisResult}},{key:"hasReleasedResult",value:function(e){var t;return(null===(t=e.analysisResult)||void 0===t?void 0:t.released)||!1}},{key:"hasReadableResult",value:function(e){return this.hasReleasedResult(e)||this.isSuperAdmin&&this.hasResult(e)}},{key:"onNewDataUploadClick",value:function(){if(this.hasCompleteAnalysesOnly){var e=this.selectedPlantId?{plantId:this.selectedPlantId}:void 0;this.$router.push({name:"AnalysisNew",query:e})}}},{key:"updateAnalysisRows",value:function(){var e=Object(l["a"])(Object(i["a"])().mark((function e(){var t;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t={},this.selectedPlantId&&(t.plant_id=this.selectedPlantId),e.next=4,E["a"].getAllAnalysis(t);case 4:this.analysisRows=e.sent.map((function(e){var t={id:e.id,name:e.name,date:e.flown_at,user:e.user&&{userName:((e.user.first_name||"")+" "+(e.user.last_name||"")).trim(),email:e.user.email}||"",analysisResult:e.analysis_result,state:e.current_state,files:e.files,plantId:e.plant.id,plant:e.plant.name,customer:e.customer.name,productPackages:e.order_product_packages};return t}));case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getPlants",value:function(){var e=Object(l["a"])(Object(i["a"])().mark((function e(){var t;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=A["a"],e.next=3,E["a"].getPlants();case 3:e.t1=e.sent,this.plants=(0,e.t0)(e.t1,"name"),this.plants.length>1&&(this.plantSelection=this.plants.map((function(e){return{value:e.id,text:e.name}})),this.plantSelection.unshift({value:null,text:""}),t=S["a"].getItem(C),t&&this.plantSelection.find((function(e){return e.value===t}))&&(this.selectedPlantId=t));case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),a}(P["a"]);D([Object(k["a"])("isLoading")],T.prototype,"updateAnalysisRows",null),D([Object(k["a"])()],T.prototype,"getPlants",null),T=D([Object(_["a"])({name:"app-analysis",components:{AppContent:f["a"],AppTableContainer:m["a"],AppModalForm:h["a"],AppModalFormInfoArea:v["a"],AppTableFilter:y["a"],AppOrderPpsView:O["a"],AppSuperAdminMarker:g["a"],AppIconAnalysis:R["a"],AppTable:b["a"],AppButton:I["a"]}})],T);var x=T,N=x,L=(a(443),a(28)),$=Object(L["a"])(N,n,s,!1,null,null,null);$.options.__file="src/app/analysis/analysis.vue";t["default"]=$.exports}}]);