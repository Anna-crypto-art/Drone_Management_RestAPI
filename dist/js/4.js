(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{244:function(t,e,a){"use strict";var n=a(48),r=a(34),s=a(20),i=a(186),l="toString",o=RegExp.prototype,c=o[l],u=s((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),p=c.name!=l;(u||p)&&n(RegExp.prototype,l,(function(){var t=r(this),e=String(t.source),a=t.flags,n=String(void 0===a&&t instanceof RegExp&&!("flags"in o)?i.call(t):a);return"/"+e+"/"+n}),{unsafe:!0})},245:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-button",{class:t.cls,attrs:{variant:t.variant,type:t.type,disabled:t.isDisabled},on:{click:t.onClick}},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"app-button-loading"},[a("b-spinner",{attrs:{small:""}})],1),t._t("default")],2)},r=[];n._withStripped=!0;var s=a(22),i=a(23),l=a(31),o=a(30),c=a(41),u=(a(66),a(26),a(15)),p=a(32),f=function(t,e,a,n){var r,s=arguments.length,i=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(i=(s<3?r(i):s>3?r(e,a,i):r(e,a))||i);return s>3&&i&&Object.defineProperty(e,a,i),i},d=function(t){Object(l["a"])(a,t);var e=Object(o["a"])(a);function a(){return Object(s["a"])(this,a),e.apply(this,arguments)}return Object(i["a"])(a,[{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"onClick",value:function(t){this.$emit("click",t)}}]),a}(u["default"]);f([Object(p["b"])({default:"button"})],d.prototype,"type",void 0),f([Object(p["b"])({default:""})],d.prototype,"cls",void 0),f([Object(p["b"])({default:"primary"})],d.prototype,"variant",void 0),f([Object(p["b"])({default:!1})],d.prototype,"disabled",void 0),f([Object(p["b"])({default:!1})],d.prototype,"loading",void 0),d=f([Object(p["a"])({name:"app-button"})],d);var b=d,m=b,v=(a(247),a(40)),h=Object(v["a"])(m,n,r,!1,null,null,null);h.options.__file="src/app/shared/components/app-button/app-button.vue";e["a"]=h.exports},246:function(t,e,a){},247:function(t,e,a){"use strict";a(246)},251:function(t,e,a){},253:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:"app-table-container "+(t.size?"app-table-container-"+t.size:"")},[t._t("default")],2)},r=[];n._withStripped=!0;var s=a(23),i=a(22),l=a(31),o=a(30),c=a(41),u=(a(66),a(26),a(15)),p=a(32),f=function(t,e,a,n){var r,s=arguments.length,i=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(i=(s<3?r(i):s>3?r(e,a,i):r(e,a))||i);return s>3&&i&&Object.defineProperty(e,a,i),i},d=function(t){Object(l["a"])(a,t);var e=Object(o["a"])(a);function a(){return Object(i["a"])(this,a),e.apply(this,arguments)}return Object(s["a"])(a)}(u["default"]);f([Object(p["b"])({default:""})],d.prototype,"size",void 0),d=f([p["a"]],d);var b=d,m=b,v=(a(255),a(40)),h=Object(v["a"])(m,n,r,!1,null,null,null);h.options.__file="src/app/shared/components/app-table-container/app-table-container.vue";e["a"]=h.exports},255:function(t,e,a){"use strict";a(251)},258:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},259:function(t,e,a){},260:function(t,e,a){"use strict";var n=a(18),r=a(261).trim,s=a(266);n({target:"String",proto:!0,forced:s("trim")},{trim:function(){return r(this)}})},261:function(t,e,a){var n=a(83),r=a(258),s="["+r+"]",i=RegExp("^"+s+s+"*"),l=RegExp(s+s+"*$"),o=function(t){return function(e){var a=String(n(e));return 1&t&&(a=a.replace(i,"")),2&t&&(a=a.replace(l,"")),a}};t.exports={start:o(1),end:o(2),trim:o(3)}},262:function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return i}));var n,r,s=a(85);(function(t){t[t["UPLOADING"]=1]="UPLOADING",t[t["UPLOAD_FAILED"]=2]="UPLOAD_FAILED",t[t["DATA_INCOMPLETE"]=3]="DATA_INCOMPLETE",t[t["DATA_COMPLETE"]=4]="DATA_COMPLETE",t[t["DATA_COMPLETE_VERIFIED"]=5]="DATA_COMPLETE_VERIFIED",t[t["PROCESSING"]=6]="PROCESSING",t[t["FINISHED"]=7]="FINISHED"})(r||(r={}));var i=(n={},Object(s["a"])(n,r.UPLOADING,"UPLOADING"),Object(s["a"])(n,r.UPLOAD_FAILED,"UPLOAD_FAILED"),Object(s["a"])(n,r.DATA_INCOMPLETE,"DATA_INCOMPLETE"),Object(s["a"])(n,r.DATA_COMPLETE,"DATA_COMPLETE"),Object(s["a"])(n,r.DATA_COMPLETE_VERIFIED,"DATA_COMPLETE_VERIFIED"),Object(s["a"])(n,r.PROCESSING,"PROCESSING"),Object(s["a"])(n,r.FINISHED,"FINISHED"),n)},266:function(t,e,a){var n=a(20),r=a(258),s="​᠎";t.exports=function(t){return n((function(){return!!r[t]()||s[t]()!=s||r[t].name!==t}))}},267:function(t,e,a){"use strict";a(259)},269:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-modal",{staticClass:"app-modal-form",attrs:{id:t.id,"ok-title":t.okTitle,"no-close-on-backdrop":""},scopedSlots:t._u([{key:"modal-title",fn:function(){return[a("div",{staticClass:"app-modal-form-title"},[a("h2",[t._v(t._s(t.title))]),t.subtitle?a("div",{staticClass:"app-modal-form-title-subtitle grayed",domProps:{innerHTML:t._s(t.subtitle)}}):t._e()])]},proxy:!0},{key:"modal-footer",fn:function(){return[a("b-button",{attrs:{variant:"secondary"},on:{click:function(e){return t.$bvModal.hide(t.id)}}},[t._v(t._s(t.$t("cancel")))]),a("app-button",{attrs:{loading:t.modalLoading},on:{click:t.onSubmit}},[t._v(t._s(t.okTitle))])]},proxy:!0}])},[a("b-alert",{staticClass:"app-modal-form-alert",attrs:{variant:t.alertVariant,dismissible:""},domProps:{innerHTML:t._s(t.alertMsg)},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}}),a("form",{on:{submit:t.onSubmit}},[t._t("default")],2)],1)},r=[];n._withStripped=!0;var s=a(22),i=a(23),l=a(31),o=a(30),c=a(41),u=(a(66),a(26),a(15)),p=a(32),f=a(245),d=function(t,e,a,n){var r,s=arguments.length,i=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(i=(s<3?r(i):s>3?r(e,a,i):r(e,a))||i);return s>3&&i&&Object.defineProperty(e,a,i),i},b=function(t){Object(l["a"])(a,t);var e=Object(o["a"])(a);function a(){var t;return Object(s["a"])(this,a),t=e.apply(this,arguments),t.showAlert=!1,t.alertMsg="",t.alertVariant="default",t}return Object(i["a"])(a,[{key:"show",value:function(){this.$bvModal.show(this.id||"")}},{key:"hide",value:function(){this.hideAlert(),this.$bvModal.hide(this.id||"")}},{key:"alertError",value:function(t){if(this.alertVariant="danger",this.showAlert=!0,console.error(t),"string"===typeof t)this.alertMsg=t;else{this.alertMsg=t.error;var e=t.details||t.message;e&&(this.alertMsg+="<br><small>Details: "+e+"</small>")}}},{key:"alertInfo",value:function(t){this.alertVariant="primary",this.showAlert=!0,this.alertMsg=t}},{key:"onSubmit",value:function(t){this.$emit("submit")}},{key:"hideAlert",value:function(){this.showAlert=!1,this.alertMsg=""}}]),a}(u["default"]);d([Object(p["b"])({required:!0})],b.prototype,"id",void 0),d([Object(p["b"])({required:!0})],b.prototype,"title",void 0),d([Object(p["b"])()],b.prototype,"subtitle",void 0),d([Object(p["b"])({required:!0})],b.prototype,"okTitle",void 0),d([Object(p["b"])({default:!1})],b.prototype,"modalLoading",void 0),b=d([Object(p["a"])({name:"app-modal-form",components:{AppButton:f["a"]}})],b);var m=b,v=m,h=(a(267),a(40)),y=Object(h["a"])(v,n,r,!1,null,null,null);y.options.__file="src/app/shared/components/app-modal/app-modal-form.vue";e["a"]=y.exports},280:function(t,e,a){},281:function(t,e,a){},318:function(t,e,a){"use strict";a(280)},319:function(t,e,a){"use strict";a(281)},361:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("app-content",{attrs:{title:t.$t("analysis-overview"),subtitle:t.$t("analysis-overview_descr")}},[a("div",{staticClass:"app-analysis"},[a("router-link",{attrs:{to:{name:"AnalysisNew"}}},[a("b-button",{attrs:{variant:"primary",disabled:!!t.incompleteAnalysisName,title:t.incompleteAnalysisName&&t.$t("no-new-upload-allowed",{name:t.incompleteAnalysisName})||""}},[t._v(" "+t._s(t.createNewAnalysisBtnText)+" ")])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.plants,expression:"plants"}],staticClass:"app-analysis-plants-filter pull-right"},[a("b-form-select",{staticClass:"app-analysis-plants-filter-select",attrs:{id:"plants",options:t.plants},on:{change:t.onPlantSelectionChanged},model:{value:t.selectedPlantId,callback:function(e){t.selectedPlantId=e},expression:"selectedPlantId"}}),a("label",{staticClass:"app-analysis-plants-filter-label",attrs:{for:"plants"}},[t._v(t._s(t.$t("plant")))])],1),a("div",{staticClass:"clear"}),a("app-table-container",[a("b-table",{attrs:{hover:"",fields:t.columns,items:t.analysisRows,"head-variant":"light","show-empty":"",emptyText:t.$t("no-data"),busy:t.isLoading},scopedSlots:t._u([{key:"table-busy",fn:function(){return[a("div",{staticClass:"text-center"},[a("b-spinner",{staticClass:"align-middle"})],1)]},proxy:!0},{key:"empty",fn:function(e){return[a("span",{staticClass:"grayed"},[t._v(t._s(e.emptyText))])]}},{key:"head(actions)",fn:function(){return[a("span",{staticClass:"hidden"},[t._v(t._s(t.$t("actions")))])]},proxy:!0},{key:"cell(name)",fn:function(e){return[a("router-link",{attrs:{to:{name:"EditAnalysis",params:{id:e.item.id}}}},[t._v(t._s(e.item.name))])]}},{key:"cell(user)",fn:function(e){return[e.item.user.userName?a("span",[t._v(" "+t._s(e.item.user.userName)),a("br"),a("small",{staticClass:"grayed"},[t._v(t._s(e.item.user.email))])]):a("span",[t._v(t._s(e.item.user.email))])]}},{key:"cell(state)",fn:function(e){return[e.item.state?a("div",[t._v(" "+t._s(t.$t(e.item.state.state.name))+" "),a("br"),a("small",{staticClass:"grayed"},[t._v(t._s(t.trans(t.getTimeDiff(e.item.state.started_at))))])]):a("div",[t._v("UNKNOWN")])]}},{key:"cell(hasResults)",fn:function(t){return[a("b-icon",{directives:[{name:"show",rawName:"v-show",value:t.item.analysisResultId,expression:"row.item.analysisResultId"}],staticClass:"font-xl text-success",attrs:{icon:"check"}})]}},{key:"cell(actions)",fn:function(e){return[a("div",{staticClass:"hover-cell pull-right"},[e.item.analysisResultId?a("router-link",{attrs:{title:t.$t("show-results"),to:{name:"Plant",params:{id:e.item.plantId},query:{view:"table",result:e.item.analysisResultId}}}},[a("b-button",{attrs:{variant:"primary",size:"sm"}},[a("b-icon",{attrs:{icon:"graph-up"}})],1)],1):t._e()],1),a("div",{staticClass:"clearfix"})]}}])})],1)],1)])},r=[];n._withStripped=!0;var s=a(69),i=a(16),l=a(22),o=a(23),c=a(31),u=a(30),p=a(41),f=(a(67),a(66),a(26),a(244),a(130),a(81),a(101),a(260),a(84)),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-modal-form-info-area"},[t._t("default")],2)},b=[];d._withStripped=!0;var m=a(15),v=a(32),h=function(t,e,a,n){var r,s=arguments.length,i=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(p["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(i=(s<3?r(i):s>3?r(e,a,i):r(e,a))||i);return s>3&&i&&Object.defineProperty(e,a,i),i},y=function(t){Object(c["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(l["a"])(this,a),e.apply(this,arguments)}return Object(o["a"])(a)}(m["default"]);y=h([Object(v["a"])({name:"app-modal-form-info-area"})],y);var O=y,_=O,g=(a(318),a(40)),j=Object(g["a"])(_,d,b,!1,null,null,null);j.options.__file="src/app/shared/components/app-modal/app-modal-form-info-area.vue";var w=j.exports,A=a(269),E=a(253),k=a(68),R=a(82),P=a(262),I=a(80),D=function(t,e,a,n){var r,s=arguments.length,i=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(p["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(i=(s<3?r(i):s>3?r(e,a,i):r(e,a))||i);return s>3&&i&&Object.defineProperty(e,a,i),i},x=function(t){Object(c["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(l["a"])(this,a),t=e.apply(this,arguments),t.columns=[],t.plants=null,t.selectedPlantId=null,t.analysisRows=null,t.isLoading=!0,t.createNewAnalysisBtnText="",t.uploadStateProcess="",t}return Object(o["a"])(a,[{key:"created",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.createNewAnalysisBtnText=this.$t("new-data-upload").toString(),this.columns=[{key:"name",label:this.$t("name").toString(),sortable:!0},{key:"plant",label:this.$t("plant").toString(),sortable:!0},{key:"date",label:this.$t("acquisition-date").toString(),sortable:!0,formatter:function(t){return new Date(Date.parse(t)).toLocaleDateString()}},{key:"user",label:this.$t("created-by").toString(),sortable:!0},{key:"state",label:this.$t("state").toString(),sortable:!0},{key:"hasResults",label:this.$t("has-results").toString()},{key:"actions"}],t.next=4,this.getPlants();case 4:return t.next=6,this.updateAnalysisRows();case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"trans",value:function(t){return this.$t.apply(this,Object(s["a"])(t)).toString()}},{key:"onPlantSelectionChanged",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.updateAnalysisRows();case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"incompleteAnalysisName",get:function(){var t,e,a=null===(t=this.analysisRows)||void 0===t||null===(e=t.find((function(t){return t.state&&t.state.state.id<=P["a"].DATA_INCOMPLETE})))||void 0===e?void 0:e.name;return a||null}},{key:"updateAnalysisRows",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.isLoading=!0,t.prev=1,e=this.selectedPlantId&&{plant_id:this.selectedPlantId}||void 0,t.next=5,I["a"].getAllAnalysis(e);case 5:this.analysisRows=t.sent.map((function(t){var e={id:t.id,name:t.name,date:t.flown_at,user:t.user&&{userName:((t.user.first_name||"")+" "+(t.user.last_name||"")).trim(),email:t.user.email}||"",analysisResultId:t.analysis_result&&(a.isSuperAdmin||t.analysis_result.released)&&t.analysis_result.id||void 0,state:t.current_state,files:t.files,plantId:t.plant.id,plant:t.plant.name};return e})),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](1),k["a"].showError(t.t0);case 11:return t.prev=11,this.isLoading=!1,t.finish(11);case 14:case"end":return t.stop()}}),t,this,[[1,8,11,14]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"getPlants",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,I["a"].getAllPlants();case 2:e=t.sent,e.length>1&&(this.plants=e.map((function(t){return{value:t.id,text:t.name}})),this.plants.unshift({value:null,text:""}));case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}]),a}(R["a"]);x=D([Object(v["a"])({name:"app-analysis",components:{AppContent:f["a"],AppTableContainer:E["a"],AppModalForm:A["a"],AppModalFormInfoArea:w}})],x);var C=x,S=C,T=(a(319),Object(g["a"])(S,n,r,!1,null,null,null));T.options.__file="src/app/analysis/analysis.vue";e["default"]=T.exports}}]);