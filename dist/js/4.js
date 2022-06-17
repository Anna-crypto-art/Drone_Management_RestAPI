(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{250:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-button",{class:t.cls,attrs:{variant:t.variant,type:t.type,disabled:t.isDisabled,size:t.size},on:{click:t.onClick}},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"app-button-loading"},[a("b-spinner",{attrs:{small:""}})],1),t._t("default")],2)},s=[];n._withStripped=!0;var r=a(20),i=a(21),l=a(31),o=a(30),c=a(42),u=(a(67),a(25),a(16)),p=a(33),d=function(t,e,a,n){var s,r=arguments.length,i=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(r<3?s(i):r>3?s(e,a,i):s(e,a))||i);return r>3&&i&&Object.defineProperty(e,a,i),i},f=function(t){Object(l["a"])(a,t);var e=Object(o["a"])(a);function a(){return Object(r["a"])(this,a),e.apply(this,arguments)}return Object(i["a"])(a,[{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"onClick",value:function(t){this.$emit("click",t)}}]),a}(u["default"]);d([Object(p["b"])({default:"button"})],f.prototype,"type",void 0),d([Object(p["b"])({default:""})],f.prototype,"cls",void 0),d([Object(p["b"])({default:"primary"})],f.prototype,"variant",void 0),d([Object(p["b"])({default:!1})],f.prototype,"disabled",void 0),d([Object(p["b"])({default:!1})],f.prototype,"loading",void 0),d([Object(p["b"])({default:""})],f.prototype,"size",void 0),f=d([Object(p["a"])({name:"app-button"})],f);var m=f,b=m,h=(a(252),a(41)),v=Object(h["a"])(b,n,s,!1,null,null,null);v.options.__file="src/app/shared/components/app-button/app-button.vue";e["a"]=v.exports},251:function(t,e,a){},252:function(t,e,a){"use strict";a(251)},254:function(t,e,a){},258:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:"app-table-container "+(t.size?"app-table-container-"+t.size:"")},[t._t("default")],2)},s=[];n._withStripped=!0;var r=a(21),i=a(20),l=a(31),o=a(30),c=a(42),u=(a(67),a(25),a(16)),p=a(33),d=function(t,e,a,n){var s,r=arguments.length,i=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(r<3?s(i):r>3?s(e,a,i):s(e,a))||i);return r>3&&i&&Object.defineProperty(e,a,i),i},f=function(t){Object(l["a"])(a,t);var e=Object(o["a"])(a);function a(){return Object(i["a"])(this,a),e.apply(this,arguments)}return Object(r["a"])(a)}(u["default"]);d([Object(p["b"])({default:""})],f.prototype,"size",void 0),f=d([p["a"]],f);var m=f,b=m,h=(a(260),a(41)),v=Object(h["a"])(b,n,s,!1,null,null,null);v.options.__file="src/app/shared/components/app-table-container/app-table-container.vue";e["a"]=v.exports},259:function(t,e,a){},260:function(t,e,a){"use strict";a(254)},266:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},267:function(t,e,a){"use strict";a(259)},268:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-modal",{staticClass:"app-modal-form",attrs:{id:t.id,"ok-title":t.okTitle,"no-close-on-backdrop":""},scopedSlots:t._u([{key:"modal-title",fn:function(){return[a("div",{staticClass:"app-modal-form-title"},[t._t("modal-title",[a("h2",[t._v(t._s(t.title))]),t.subtitle?a("div",{staticClass:"app-modal-form-title-subtitle grayed",domProps:{innerHTML:t._s(t.subtitle)}}):t._e()])],2)]},proxy:!0},{key:"modal-footer",fn:function(){return[a("b-button",{attrs:{variant:"secondary"},on:{click:function(e){return t.$bvModal.hide(t.id)}}},[t._v(t._s(t.$t("cancel")))]),a("app-button",{attrs:{loading:t.modalLoading},on:{click:t.onSubmit}},[t._v(t._s(t.okTitle))])]},proxy:!0}],null,!0)},[a("b-alert",{staticClass:"app-modal-form-alert",attrs:{variant:t.alertVariant,dismissible:""},domProps:{innerHTML:t._s(t.alertMsg)},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}}),a("form",{on:{submit:t.onSubmit}},[t._t("default")],2)],1)},s=[];n._withStripped=!0;var r=a(20),i=a(21),l=a(31),o=a(30),c=a(42),u=(a(67),a(25),a(16)),p=a(33),d=a(250),f=function(t,e,a,n){var s,r=arguments.length,i=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(r<3?s(i):r>3?s(e,a,i):s(e,a))||i);return r>3&&i&&Object.defineProperty(e,a,i),i},m=function(t){Object(l["a"])(a,t);var e=Object(o["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.showAlert=!1,t.alertMsg="",t.alertVariant="default",t}return Object(i["a"])(a,[{key:"show",value:function(){this.$bvModal.show(this.id||"")}},{key:"hide",value:function(){this.hideAlert(),this.$bvModal.hide(this.id||"")}},{key:"alertError",value:function(t){if(this.alertVariant="danger",this.showAlert=!0,console.error(t),"string"===typeof t)this.alertMsg=t;else{this.alertMsg=t.error;var e=t.details||t.message;e&&(this.alertMsg+="<br><small>Details: "+e+"</small>")}}},{key:"alertInfo",value:function(t){this.alertVariant="primary",this.showAlert=!0,this.alertMsg=t}},{key:"onSubmit",value:function(t){this.$emit("submit")}},{key:"hideAlert",value:function(){this.showAlert=!1,this.alertMsg=""}}]),a}(u["default"]);f([Object(p["b"])({required:!0})],m.prototype,"id",void 0),f([Object(p["b"])({default:""})],m.prototype,"title",void 0),f([Object(p["b"])()],m.prototype,"subtitle",void 0),f([Object(p["b"])({required:!0})],m.prototype,"okTitle",void 0),f([Object(p["b"])({default:!1})],m.prototype,"modalLoading",void 0),m=f([Object(p["a"])({name:"app-modal-form",components:{AppButton:d["a"]}})],m);var b=m,h=b,v=(a(267),a(41)),y=Object(v["a"])(h,n,s,!1,null,null,null);y.options.__file="src/app/shared/components/app-modal/app-modal-form.vue";e["a"]=y.exports},269:function(t,e,a){"use strict";var n=a(18),s=a(270).trim,r=a(276);n({target:"String",proto:!0,forced:r("trim")},{trim:function(){return s(this)}})},270:function(t,e,a){var n=a(70),s=a(266),r="["+s+"]",i=RegExp("^"+r+r+"*"),l=RegExp(r+r+"*$"),o=function(t){return function(e){var a=String(n(e));return 1&t&&(a=a.replace(i,"")),2&t&&(a=a.replace(l,"")),a}};t.exports={start:o(1),end:o(2),trim:o(3)}},271:function(t,e,a){"use strict";a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return i}));var n,s,r=a(53);(function(t){t[t["UPLOADING"]=1]="UPLOADING",t[t["UPLOAD_FAILED"]=2]="UPLOAD_FAILED",t[t["DATA_INCOMPLETE"]=3]="DATA_INCOMPLETE",t[t["DATA_COMPLETE"]=4]="DATA_COMPLETE",t[t["DATA_COMPLETE_VERIFIED"]=5]="DATA_COMPLETE_VERIFIED",t[t["PROCESSING"]=6]="PROCESSING",t[t["FINISHED"]=7]="FINISHED"})(s||(s={}));var i=(n={},Object(r["a"])(n,s.UPLOADING,"UPLOADING"),Object(r["a"])(n,s.UPLOAD_FAILED,"UPLOAD_FAILED"),Object(r["a"])(n,s.DATA_INCOMPLETE,"DATA_INCOMPLETE"),Object(r["a"])(n,s.DATA_COMPLETE,"DATA_COMPLETE"),Object(r["a"])(n,s.DATA_COMPLETE_VERIFIED,"DATA_COMPLETE_VERIFIED"),Object(r["a"])(n,s.PROCESSING,"PROCESSING"),Object(r["a"])(n,s.FINISHED,"FINISHED"),n)},276:function(t,e,a){var n=a(22),s=a(266),r="​᠎";t.exports=function(t){return n((function(){return!!s[t]()||r[t]()!=r||s[t].name!==t}))}},289:function(t,e,a){},290:function(t,e,a){},333:function(t,e,a){"use strict";a(289)},334:function(t,e,a){"use strict";a(290)},380:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("app-content",{attrs:{title:t.$t("analysis-overview"),subtitle:t.$t("analysis-overview_descr")}},[a("div",{staticClass:"app-analysis"},[a("router-link",{attrs:{to:{name:"AnalysisNew"}}},[a("b-button",{attrs:{variant:"primary",disabled:!!t.incompleteAnalysisName,title:t.incompleteAnalysisName&&t.$t("no-new-upload-allowed",{name:t.incompleteAnalysisName})||""}},[t._v(" "+t._s(t.createNewAnalysisBtnText)+" ")])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.plantSelection,expression:"plantSelection"}],staticClass:"app-analysis-plants-filter pull-right"},[a("b-form-select",{staticClass:"app-analysis-plants-filter-select",attrs:{id:"plants",options:t.plantSelection},on:{change:t.onPlantSelectionChanged},model:{value:t.selectedPlantId,callback:function(e){t.selectedPlantId=e},expression:"selectedPlantId"}}),a("label",{staticClass:"app-analysis-plants-filter-label",attrs:{for:"plants"}},[t._v(t._s(t.$t("plant")))])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.customers,expression:"customers"}],staticClass:"app-analysis-customer-filter pull-right"},[a("b-form-select",{staticClass:"app-analysis-customers-filter-select",attrs:{id:"customers",options:t.customers},on:{change:t.onCustomerSelectionChanged},model:{value:t.selectedCustomerId,callback:function(e){t.selectedCustomerId=e},expression:"selectedCustomerId"}}),a("label",{staticClass:"app-analysis-customers-filter-label",attrs:{for:"customers"}},[t._v(t._s(t.$t("customer")))])],1),a("div",{staticClass:"clear"}),a("app-table-container",[a("b-table",{attrs:{hover:"",fields:t.columns,items:t.analysisRows,"head-variant":"light","show-empty":"",emptyText:t.$t("no-data"),busy:t.isLoading},scopedSlots:t._u([{key:"table-busy",fn:function(){return[a("div",{staticClass:"text-center"},[a("b-spinner",{staticClass:"align-middle"})],1)]},proxy:!0},{key:"empty",fn:function(e){return[a("span",{staticClass:"grayed"},[t._v(t._s(e.emptyText))])]}},{key:"head(actions)",fn:function(){return[a("span",{staticClass:"hidden"},[t._v(t._s(t.$t("actions")))])]},proxy:!0},{key:"cell(name)",fn:function(e){return[a("router-link",{attrs:{to:{name:"EditAnalysis",params:{id:e.item.id}}}},[t._v(t._s(e.item.name))])]}},{key:"cell(plant)",fn:function(e){return[t._v(" "+t._s(e.item.plant)),a("br"),a("small",{staticClass:"grayed"},[t._v(t._s(e.item.customer))])]}},{key:"cell(user)",fn:function(e){return[e.item.user.userName?a("span",[t._v(" "+t._s(e.item.user.userName)),a("br"),a("small",{staticClass:"grayed"},[t._v(t._s(e.item.user.email))])]):a("span",[t._v(t._s(e.item.user.email))])]}},{key:"cell(state)",fn:function(e){return[e.item.state?a("div",[t._v(" "+t._s(t.$t(e.item.state.state.name))+" "),a("br"),a("small",{staticClass:"grayed"},[t._v(t._s(t.trans(t.getTimeDiff(e.item.state.started_at))))])]):a("div",[t._v("UNKNOWN")])]}},{key:"cell(hasResults)",fn:function(t){return[a("b-icon",{directives:[{name:"show",rawName:"v-show",value:t.item.analysisResultId,expression:"row.item.analysisResultId"}],staticClass:"font-xl text-success",attrs:{icon:"check"}})]}},{key:"cell(actions)",fn:function(e){return[a("div",{staticClass:"hover-cell pull-right"},[e.item.analysisResultId?a("router-link",{attrs:{title:t.$t("show-results"),to:{name:"Plant",params:{id:e.item.plantId},query:{view:"table",result:e.item.analysisResultId}}}},[a("b-button",{attrs:{variant:"primary",size:"sm"}},[a("b-icon",{attrs:{icon:"graph-up"}})],1)],1):t._e()],1),a("div",{staticClass:"clearfix"})]}}])})],1)],1)])},s=[];n._withStripped=!0;var r=a(69),i=a(14),l=a(20),o=a(21),c=a(31),u=a(30),p=a(42),d=(a(68),a(67),a(25),a(187),a(130),a(101),a(100),a(82),a(269),a(84)),f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-modal-form-info-area"},[t._t("default")],2)},m=[];f._withStripped=!0;var b=a(16),h=a(33),v=function(t,e,a,n){var s,r=arguments.length,i=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(p["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(r<3?s(i):r>3?s(e,a,i):s(e,a))||i);return r>3&&i&&Object.defineProperty(e,a,i),i},y=function(t){Object(c["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(l["a"])(this,a),e.apply(this,arguments)}return Object(o["a"])(a)}(b["default"]);y=v([Object(h["a"])({name:"app-modal-form-info-area"})],y);var O=y,_=O,g=(a(333),a(41)),w=Object(g["a"])(_,f,m,!1,null,null,null);w.options.__file="src/app/shared/components/app-modal/app-modal-form-info-area.vue";var j=w.exports,A=a(268),k=a(258),C=a(83),E=a(271),I=a(81),R=function(t,e,a,n){var s,r=arguments.length,i=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(p["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(r<3?s(i):r>3?s(e,a,i):s(e,a))||i);return r>3&&i&&Object.defineProperty(e,a,i),i},P=function(t){Object(c["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(l["a"])(this,a),t=e.apply(this,arguments),t.columns=[],t.plantSelection=null,t.selectedPlantId=null,t.customers=null,t.selectedCustomerId=null,t.analysisRows=null,t.isLoading=!0,t.createNewAnalysisBtnText="",t.uploadStateProcess="",t}return Object(o["a"])(a,[{key:"created",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.createNewAnalysisBtnText=this.$t("new-data-upload").toString(),this.columns=[{key:"name",label:this.$t("name").toString(),sortable:!0},{key:"plant",label:this.$t("plant").toString(),sortable:!0},{key:"date",label:this.$t("acquisition-date").toString(),sortable:!0,formatter:function(t){return new Date(Date.parse(t)).toLocaleDateString()}},{key:"user",label:this.$t("created-by").toString(),sortable:!0},{key:"state",label:this.$t("state").toString(),sortable:!0},{key:"hasResults",label:this.$t("has-results").toString()},{key:"actions"}],t.next=4,this.getPlants();case 4:return t.next=6,this.updateAnalysisRows();case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"trans",value:function(t){return this.$t.apply(this,Object(r["a"])(t)).toString()}},{key:"onPlantSelectionChanged",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.selectedPlantId?(e=this.plants.find((function(t){return t.id===a.selectedPlantId})),e.customers&&e.customers.length>1?this.customers=[{value:null,text:""}].concat(Object(r["a"])(e.customers.map((function(t){return{value:t.id,text:t.name}})))):this.customers=null):this.customers=null,t.next=3,this.updateAnalysisRows();case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"onCustomerSelectionChanged",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.updateAnalysisRows();case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"incompleteAnalysisName",get:function(){var t,e,a=null===(t=this.analysisRows)||void 0===t||null===(e=t.find((function(t){return t.state&&t.state.state.id<=E["a"].DATA_INCOMPLETE})))||void 0===e?void 0:e.name;return a||null}},{key:"updateAnalysisRows",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.isLoading=!0,t.prev=1,e={},this.selectedPlantId&&(e.plant_id=this.selectedPlantId),this.selectedCustomerId&&(e.customer_id=this.selectedCustomerId),t.next=7,I["a"].getAllAnalysis(e);case 7:this.analysisRows=t.sent.map((function(t){var e={id:t.id,name:t.name,date:t.flown_at,user:t.user&&{userName:((t.user.first_name||"")+" "+(t.user.last_name||"")).trim(),email:t.user.email}||"",analysisResultId:t.analysis_result&&(a.isSuperAdmin||t.analysis_result.released)&&t.analysis_result.id||void 0,state:t.current_state,files:t.files,plantId:t.plant.id,plant:t.plant.name,customer:t.customer.name};return e})),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](1),this.showError(t.t0);case 13:return t.prev=13,this.isLoading=!1,t.finish(13);case 16:case"end":return t.stop()}}),t,this,[[1,10,13,16]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"getPlants",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,I["a"].getPlants();case 3:this.plants=t.sent,this.plants.length>1&&(this.plantSelection=this.plants.map((function(t){return{value:t.id,text:t.name}})),this.plantSelection.unshift({value:null,text:""})),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),this.showError(t.t0);case 10:case"end":return t.stop()}}),t,this,[[0,7]])})));function e(){return t.apply(this,arguments)}return e}()}]),a}(C["a"]);P=R([Object(h["a"])({name:"app-analysis",components:{AppContent:d["a"],AppTableContainer:k["a"],AppModalForm:A["a"],AppModalFormInfoArea:j}})],P);var x=P,D=x,S=(a(334),Object(g["a"])(D,n,s,!1,null,null,null));S.options.__file="src/app/analysis/analysis.vue";e["default"]=S.exports}}]);