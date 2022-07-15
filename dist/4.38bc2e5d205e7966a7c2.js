(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{254:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-button",{class:"app-button "+t.cls,attrs:{variant:t.variant,type:t.type,disabled:t.isDisabled,size:t.size},on:{click:t.onClick}},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"app-button-loading"},[a("b-spinner",{attrs:{small:""}})],1),t.icon?a("b-icon",{staticClass:"app-button-icon",attrs:{icon:t.icon}}):t._e(),a("span",{class:"app-button-content"+(t.hideText?" text-hidden":"")+(t.icon?" has-icon":"")},[t._t("default")],2)],1)},s=[];n._withStripped=!0;var i=a(21),r=a(22),l=a(31),o=a(30),c=a(40),u=(a(71),a(25),a(17)),p=a(34),d=function(t,e,a,n){var s,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(r=(i<3?s(r):i>3?s(e,a,r):s(e,a))||r);return i>3&&r&&Object.defineProperty(e,a,r),r},f=function(t){Object(l["a"])(a,t);var e=Object(o["a"])(a);function a(){return Object(i["a"])(this,a),e.apply(this,arguments)}return Object(r["a"])(a,[{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"onClick",value:function(t){this.$emit("click",t)}}]),a}(u["default"]);d([Object(p["b"])({default:"button"})],f.prototype,"type",void 0),d([Object(p["b"])({default:""})],f.prototype,"cls",void 0),d([Object(p["b"])({default:"primary"})],f.prototype,"variant",void 0),d([Object(p["b"])({default:!1})],f.prototype,"disabled",void 0),d([Object(p["b"])({default:!1})],f.prototype,"loading",void 0),d([Object(p["b"])({default:""})],f.prototype,"size",void 0),d([Object(p["b"])({default:null})],f.prototype,"icon",void 0),d([Object(p["b"])({default:!1})],f.prototype,"hideText",void 0),f=d([Object(p["a"])({name:"app-button"})],f);var b=f,m=b,h=(a(256),a(43)),v=Object(h["a"])(m,n,s,!1,null,null,null);v.options.__file="src/app/shared/components/app-button/app-button.vue";e["a"]=v.exports},255:function(t,e,a){},256:function(t,e,a){"use strict";a(255)},258:function(t,e,a){},261:function(t,e,a){},263:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:"app-table-container "+(t.size?"app-table-container-"+t.size:"")},[t._t("default")],2)},s=[];n._withStripped=!0;var i=a(22),r=a(21),l=a(31),o=a(30),c=a(40),u=(a(71),a(25),a(17)),p=a(34),d=function(t,e,a,n){var s,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(r=(i<3?s(r):i>3?s(e,a,r):s(e,a))||r);return i>3&&r&&Object.defineProperty(e,a,r),r},f=function(t){Object(l["a"])(a,t);var e=Object(o["a"])(a);function a(){return Object(r["a"])(this,a),e.apply(this,arguments)}return Object(i["a"])(a)}(u["default"]);d([Object(p["b"])({default:""})],f.prototype,"size",void 0),f=d([p["a"]],f);var b=f,m=b,h=(a(265),a(43)),v=Object(h["a"])(m,n,s,!1,null,null,null);v.options.__file="src/app/shared/components/app-table-container/app-table-container.vue";e["a"]=v.exports},264:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},265:function(t,e,a){"use strict";a(258)},266:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-modal",{staticClass:"app-modal-form",attrs:{id:t.id,"ok-title":t.okTitle,"no-close-on-backdrop":""},scopedSlots:t._u([{key:"modal-title",fn:function(){return[a("div",{staticClass:"app-modal-form-title"},[t._t("modal-title",[a("h2",[t._v(t._s(t.title))]),t.subtitle?a("div",{staticClass:"app-modal-form-title-subtitle grayed",domProps:{innerHTML:t._s(t.subtitle)}}):t._e()])],2)]},proxy:!0},{key:"modal-footer",fn:function(){return[a("b-button",{attrs:{variant:"secondary"},on:{click:function(e){return t.$bvModal.hide(t.id)}}},[t._v(t._s(t.$t("cancel")))]),a("app-button",{attrs:{loading:t.modalLoading},on:{click:t.onSubmit}},[t._v(t._s(t.okTitle))])]},proxy:!0}],null,!0)},[a("b-alert",{staticClass:"app-modal-form-alert",attrs:{variant:t.alertVariant,dismissible:""},domProps:{innerHTML:t._s(t.alertMsg)},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}}),a("form",{on:{submit:t.onSubmit}},[t._t("default")],2)],1)},s=[];n._withStripped=!0;var i=a(21),r=a(22),l=a(31),o=a(30),c=a(40),u=(a(71),a(25),a(17)),p=a(34),d=a(254),f=function(t,e,a,n){var s,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(r=(i<3?s(r):i>3?s(e,a,r):s(e,a))||r);return i>3&&r&&Object.defineProperty(e,a,r),r},b=function(t){Object(l["a"])(a,t);var e=Object(o["a"])(a);function a(){var t;return Object(i["a"])(this,a),t=e.apply(this,arguments),t.showAlert=!1,t.alertMsg="",t.alertVariant="default",t}return Object(r["a"])(a,[{key:"show",value:function(){this.$bvModal.show(this.id||"")}},{key:"hide",value:function(){this.hideAlert(),this.$bvModal.hide(this.id||"")}},{key:"alertError",value:function(t){if(this.alertVariant="danger",this.showAlert=!0,console.error(t),"string"===typeof t)this.alertMsg=t;else{this.alertMsg=t.error;var e=t.details||t.message;e&&(this.alertMsg+="<br><small>Details: "+e+"</small>")}}},{key:"alertInfo",value:function(t){this.alertVariant="primary",this.showAlert=!0,this.alertMsg=t}},{key:"onSubmit",value:function(t){this.$emit("submit")}},{key:"hideAlert",value:function(){this.showAlert=!1,this.alertMsg=""}}]),a}(u["default"]);f([Object(p["b"])({required:!0})],b.prototype,"id",void 0),f([Object(p["b"])({default:""})],b.prototype,"title",void 0),f([Object(p["b"])()],b.prototype,"subtitle",void 0),f([Object(p["b"])({required:!0})],b.prototype,"okTitle",void 0),f([Object(p["b"])({default:!1})],b.prototype,"modalLoading",void 0),b=f([Object(p["a"])({name:"app-modal-form",components:{AppButton:d["a"]}})],b);var m=b,h=m,v=(a(269),a(43)),y=Object(v["a"])(h,n,s,!1,null,null,null);y.options.__file="src/app/shared/components/app-modal/app-modal-form.vue";e["a"]=y.exports},269:function(t,e,a){"use strict";a(261)},270:function(t,e,a){"use strict";a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return r}));var n,s,i=a(52);(function(t){t[t["EMPTY"]=0]="EMPTY",t[t["UPLOADING"]=1]="UPLOADING",t[t["UPLOAD_FAILED"]=2]="UPLOAD_FAILED",t[t["DATA_INCOMPLETE"]=3]="DATA_INCOMPLETE",t[t["DATA_COMPLETE"]=4]="DATA_COMPLETE",t[t["DATA_COMPLETE_VERIFIED"]=5]="DATA_COMPLETE_VERIFIED",t[t["PROCESSING"]=6]="PROCESSING",t[t["FINISHED"]=7]="FINISHED"})(s||(s={}));var r=(n={},Object(i["a"])(n,s.EMPTY,"EMPTY"),Object(i["a"])(n,s.UPLOADING,"UPLOADING"),Object(i["a"])(n,s.UPLOAD_FAILED,"UPLOAD_FAILED"),Object(i["a"])(n,s.DATA_INCOMPLETE,"DATA_INCOMPLETE"),Object(i["a"])(n,s.DATA_COMPLETE,"DATA_COMPLETE"),Object(i["a"])(n,s.DATA_COMPLETE_VERIFIED,"DATA_COMPLETE_VERIFIED"),Object(i["a"])(n,s.PROCESSING,"PROCESSING"),Object(i["a"])(n,s.FINISHED,"FINISHED"),n)},274:function(t,e,a){"use strict";var n=a(19),s=a(275).trim,i=a(276);n({target:"String",proto:!0,forced:i("trim")},{trim:function(){return s(this)}})},275:function(t,e,a){var n=a(73),s=a(264),i="["+s+"]",r=RegExp("^"+i+i+"*"),l=RegExp(i+i+"*$"),o=function(t){return function(e){var a=String(n(e));return 1&t&&(a=a.replace(r,"")),2&t&&(a=a.replace(l,"")),a}};t.exports={start:o(1),end:o(2),trim:o(3)}},276:function(t,e,a){var n=a(23),s=a(264),i="​᠎";t.exports=function(t){return n((function(){return!!s[t]()||i[t]()!=i||s[t].name!==t}))}},293:function(t,e,a){},294:function(t,e,a){},338:function(t,e,a){"use strict";a(293)},339:function(t,e,a){"use strict";a(294)},388:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("app-content",{attrs:{title:t.$t("analysis-overview"),subtitle:t.$t("analysis-overview_descr")}},[a("div",{staticClass:"app-analysis"},[t.hasIncompleteAnalysis?t._e():a("router-link",{attrs:{to:{name:"AnalysisNew"}}},[a("b-button",{attrs:{variant:"primary"}},[t._v(" "+t._s(t.$t("new-data-upload"))+" ")])],1),t.incompleteAnalysis?a("router-link",{attrs:{to:{name:"EditAnalysis",params:{id:t.incompleteAnalysis.id}}}},[a("b-button",{attrs:{variant:"primary"}},[t._v(" "+t._s(t.$t("upload-data-for-analysis",{analysis:t.incompleteAnalysis.name}))+" ")])],1):t._e(),a("div",{directives:[{name:"show",rawName:"v-show",value:t.plantSelection,expression:"plantSelection"}],staticClass:"app-analysis-plants-filter pull-right"},[a("b-form-select",{staticClass:"app-analysis-plants-filter-select",attrs:{id:"plants",options:t.plantSelection},on:{change:t.onPlantSelectionChanged},model:{value:t.selectedPlantId,callback:function(e){t.selectedPlantId=e},expression:"selectedPlantId"}}),a("label",{staticClass:"app-analysis-plants-filter-label",attrs:{for:"plants"}},[t._v(t._s(t.$t("plant")))])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.customers,expression:"customers"}],staticClass:"app-analysis-customer-filter pull-right"},[a("b-form-select",{staticClass:"app-analysis-customers-filter-select",attrs:{id:"customers",options:t.customers},on:{change:t.onCustomerSelectionChanged},model:{value:t.selectedCustomerId,callback:function(e){t.selectedCustomerId=e},expression:"selectedCustomerId"}}),a("label",{staticClass:"app-analysis-customers-filter-label",attrs:{for:"customers"}},[t._v(t._s(t.$t("customer")))])],1),a("div",{staticClass:"clear"}),a("app-table-container",[a("b-table",{attrs:{hover:"",fields:t.columns,items:t.analysisRows,"head-variant":"light","show-empty":"",emptyText:t.$t("no-data"),busy:t.isLoading},scopedSlots:t._u([{key:"table-busy",fn:function(){return[a("div",{staticClass:"text-center"},[a("b-spinner",{staticClass:"align-middle"})],1)]},proxy:!0},{key:"empty",fn:function(e){return[a("span",{staticClass:"grayed"},[t._v(t._s(e.emptyText))])]}},{key:"head(actions)",fn:function(){return[a("span",{staticClass:"hidden"},[t._v(t._s(t.$t("actions")))])]},proxy:!0},{key:"cell(name)",fn:function(e){return[a("router-link",{attrs:{to:{name:"EditAnalysis",params:{id:e.item.id}}}},[t._v(t._s(e.item.name))])]}},{key:"cell(plant)",fn:function(e){return[t._v(" "+t._s(e.item.plant)),a("br"),a("small",{staticClass:"grayed"},[t._v(t._s(e.item.customer))])]}},{key:"cell(user)",fn:function(e){return[e.item.user.userName?a("span",[t._v(" "+t._s(e.item.user.userName)),a("br"),a("small",{staticClass:"grayed"},[t._v(t._s(e.item.user.email))])]):a("span",[t._v(t._s(e.item.user.email))])]}},{key:"cell(state)",fn:function(e){return[e.item.state?a("div",[t._v(" "+t._s(t.$t(e.item.state.state.name))+" "),a("br"),a("small",{staticClass:"grayed"},[t._v(t._s(t.trans(t.getTimeDiff(e.item.state.started_at))))])]):a("div",[t._v("UNKNOWN")])]}},{key:"cell(hasResults)",fn:function(t){return[a("b-icon",{directives:[{name:"show",rawName:"v-show",value:t.item.analysisResultId,expression:"row.item.analysisResultId"}],staticClass:"font-xl text-success",attrs:{icon:"check"}})]}},{key:"cell(actions)",fn:function(e){return[a("div",{staticClass:"hover-cell pull-right"},[e.item.analysisResultId?a("router-link",{attrs:{title:t.$t("show-results"),to:{name:"Plant",params:{id:e.item.plantId},query:{view:"table",result:e.item.analysisResultId}}}},[a("b-button",{attrs:{variant:"primary",size:"sm"}},[a("b-icon",{attrs:{icon:"graph-up"}})],1)],1):t._e()],1),a("div",{staticClass:"clearfix"})]}}])})],1)],1)])},s=[];n._withStripped=!0;var i=a(72),r=a(10),l=a(14),o=a(21),c=a(22),u=a(31),p=a(30),d=a(40),f=(a(71),a(25),a(189),a(132),a(103),a(131),a(85),a(190),a(274),a(86)),b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-modal-form-info-area"},[t._t("default")],2)},m=[];b._withStripped=!0;var h=a(17),v=a(34),y=function(t,e,a,n){var s,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(d["a"])(Reflect))&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(r=(i<3?s(r):i>3?s(e,a,r):s(e,a))||r);return i>3&&r&&Object.defineProperty(e,a,r),r},O=function(t){Object(u["a"])(a,t);var e=Object(p["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return Object(c["a"])(a)}(h["default"]);O=y([Object(v["a"])({name:"app-modal-form-info-area"})],O);var _=O,j=_,g=(a(338),a(43)),w=Object(g["a"])(j,b,m,!1,null,null,null);w.options.__file="src/app/shared/components/app-modal/app-modal-form-info-area.vue";var A=w.exports,E=a(266),k=a(263),C=a(62),I=a(270),P=a(61),x=function(t,e,a,n){var s,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(d["a"])(Reflect))&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(r=(i<3?s(r):i>3?s(e,a,r):s(e,a))||r);return i>3&&r&&Object.defineProperty(e,a,r),r},D=function(t){Object(u["a"])(a,t);var e=Object(p["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.columns=[],t.plantSelection=null,t.selectedPlantId=null,t.customers=null,t.selectedCustomerId=null,t.analysisRows=null,t.isLoading=!0,t.createNewAnalysisBtnText="",t.uploadStateProcess="",t}return Object(c["a"])(a,[{key:"created",value:function(){var t=Object(l["a"])(Object(r["a"])().mark((function t(){return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.createNewAnalysisBtnText=this.$t("new-data-upload").toString(),this.columns=[{key:"name",label:this.$t("name").toString(),sortable:!0},{key:"plant",label:this.$t("plant").toString(),sortable:!0},{key:"date",label:this.$t("acquisition-date").toString(),sortable:!0,formatter:function(t){return new Date(Date.parse(t)).toLocaleDateString()}},{key:"user",label:this.$t("created-by").toString(),sortable:!0},{key:"state",label:this.$t("state").toString(),sortable:!0},{key:"hasResults",label:this.$t("has-results").toString()},{key:"actions"}],t.next=4,this.getPlants();case 4:return t.next=6,this.updateAnalysisRows();case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"trans",value:function(t){return this.$t.apply(this,Object(i["a"])(t)).toString()}},{key:"onPlantSelectionChanged",value:function(){var t=Object(l["a"])(Object(r["a"])().mark((function t(){var e,a=this;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.selectedPlantId?(e=this.plants.find((function(t){return t.id===a.selectedPlantId})),e.customers&&e.customers.length>1?this.customers=[{value:null,text:""}].concat(Object(i["a"])(e.customers.map((function(t){return{value:t.id,text:t.name}})))):this.customers=null):this.customers=null,t.next=3,this.updateAnalysisRows();case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"onCustomerSelectionChanged",value:function(){var t=Object(l["a"])(Object(r["a"])().mark((function t(){return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.updateAnalysisRows();case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"hasIncompleteAnalysis",get:function(){var t;return!(null===(t=this.analysisRows)||void 0===t||!t.find((function(t){return t.state&&t.state.state.id<=I["a"].DATA_INCOMPLETE})))}},{key:"incompleteAnalysis",get:function(){var t,e=null===(t=this.analysisRows)||void 0===t?void 0:t.filter((function(t){return t.state&&t.state.state.id<=I["a"].DATA_INCOMPLETE}));return!e||e.length>1?null:e[0]}},{key:"updateAnalysisRows",value:function(){var t=Object(l["a"])(Object(r["a"])().mark((function t(){var e,a=this;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.isLoading=!0,t.prev=1,e={},this.selectedPlantId&&(e.plant_id=this.selectedPlantId),this.selectedCustomerId&&(e.customer_id=this.selectedCustomerId),t.next=7,P["a"].getAllAnalysis(e);case 7:this.analysisRows=t.sent.map((function(t){var e={id:t.id,name:t.name,date:t.flown_at,user:t.user&&{userName:((t.user.first_name||"")+" "+(t.user.last_name||"")).trim(),email:t.user.email}||"",analysisResultId:t.analysis_result&&(a.isSuperAdmin||t.analysis_result.released)&&t.analysis_result.id||void 0,state:t.current_state,files:t.files,plantId:t.plant.id,plant:t.plant.name,customer:t.customer.name};return e})),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](1),this.showError(t.t0);case 13:return t.prev=13,this.isLoading=!1,t.finish(13);case 16:case"end":return t.stop()}}),t,this,[[1,10,13,16]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"getPlants",value:function(){var t=Object(l["a"])(Object(r["a"])().mark((function t(){return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,P["a"].getPlants();case 3:this.plants=t.sent,this.plants.length>1&&(this.plantSelection=this.plants.map((function(t){return{value:t.id,text:t.name}})),this.plantSelection.unshift({value:null,text:""})),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),this.showError(t.t0);case 10:case"end":return t.stop()}}),t,this,[[0,7]])})));function e(){return t.apply(this,arguments)}return e}()}]),a}(C["a"]);D=x([Object(v["a"])({name:"app-analysis",components:{AppContent:f["a"],AppTableContainer:k["a"],AppModalForm:E["a"],AppModalFormInfoArea:A}})],D);var R=D,S=R,T=(a(339),Object(g["a"])(S,n,s,!1,null,null,null));T.options.__file="src/app/analysis/analysis.vue";e["default"]=T.exports}}]);