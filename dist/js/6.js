(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{250:function(t,e,a){},252:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:"app-table-container "+(t.size?"app-table-container-"+t.size:"")},[t._t("default")],2)},s=[];n._withStripped=!0;var r=a(25),i=a(24),l=a(31),o=a(30),c=a(40),u=(a(61),a(26),a(15)),p=a(33),d=function(t,e,a,n){var s,r=arguments.length,i=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(r<3?s(i):r>3?s(e,a,i):s(e,a))||i);return r>3&&i&&Object.defineProperty(e,a,i),i},f=function(t){Object(l["a"])(a,t);var e=Object(o["a"])(a);function a(){return Object(i["a"])(this,a),e.apply(this,arguments)}return Object(r["a"])(a)}(u["default"]);d([Object(p["b"])({default:""})],f.prototype,"size",void 0),f=d([p["a"]],f);var h=f,m=h,v=(a(255),a(39)),b=Object(v["a"])(m,n,s,!1,null,null,null);b.options.__file="src/app/shared/components/app-table-container/app-table-container.vue";e["a"]=b.exports},255:function(t,e,a){"use strict";a(250)},257:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},258:function(t,e,a){},260:function(t,e,a){"use strict";var n=a(18),s=a(262).trim,r=a(263);n({target:"String",proto:!0,forced:r("trim")},{trim:function(){return s(this)}})},262:function(t,e,a){var n=a(77),s=a(257),r="["+s+"]",i=RegExp("^"+r+r+"*"),l=RegExp(r+r+"*$"),o=function(t){return function(e){var a=String(n(e));return 1&t&&(a=a.replace(i,"")),2&t&&(a=a.replace(l,"")),a}};t.exports={start:o(1),end:o(2),trim:o(3)}},263:function(t,e,a){var n=a(20),s=a(257),r="​᠎";t.exports=function(t){return n((function(){return!!s[t]()||r[t]()!=r||s[t].name!==t}))}},264:function(t,e,a){"use strict";a(258)},268:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-modal",{staticClass:"app-modal-form",attrs:{id:t.id,"ok-title":t.okTitle,"no-close-on-backdrop":""},scopedSlots:t._u([{key:"modal-title",fn:function(){return[a("div",{staticClass:"app-modal-form-title"},[a("h2",[t._v(t._s(t.title))]),t.subtitle?a("div",{staticClass:"app-modal-form-title-subtitle grayed",domProps:{innerHTML:t._s(t.subtitle)}}):t._e()])]},proxy:!0},{key:"modal-footer",fn:function(){return[a("b-button",{attrs:{variant:"secondary"},on:{click:function(e){return t.$bvModal.hide(t.id)}}},[t._v(t._s(t.$t("cancel")))]),a("app-button",{on:{click:t.onSubmit}},[t._v(t._s(t.okTitle))])]},proxy:!0}])},[a("b-alert",{staticClass:"app-modal-form-alert",attrs:{variant:t.alertVariant,dismissible:""},domProps:{innerHTML:t._s(t.alertMsg)},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}}),a("form",{on:{submit:t.onSubmit}},[t._t("default")],2)],1)},s=[];n._withStripped=!0;var r=a(24),i=a(25),l=a(31),o=a(30),c=a(40),u=(a(61),a(26),a(15)),p=a(33),d=a(246),f=function(t,e,a,n){var s,r=arguments.length,i=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(r<3?s(i):r>3?s(e,a,i):s(e,a))||i);return r>3&&i&&Object.defineProperty(e,a,i),i},h=function(t){Object(l["a"])(a,t);var e=Object(o["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.showAlert=!1,t.alertMsg="",t.alertVariant="default",t}return Object(i["a"])(a,[{key:"show",value:function(){this.$bvModal.show(this.id||"")}},{key:"hide",value:function(){this.hideAlert(),this.$bvModal.hide(this.id||"")}},{key:"alertError",value:function(t){if(this.alertVariant="danger",this.showAlert=!0,console.error(t),"string"===typeof t)this.alertMsg=t;else{this.alertMsg=t.error;var e=t.details||t.message;e&&(this.alertMsg+="<br><small>Details: "+e+"</small>")}}},{key:"alertInfo",value:function(t){this.alertVariant="primary",this.showAlert=!0,this.alertMsg=t}},{key:"onSubmit",value:function(t){this.$emit("submit")}},{key:"hideAlert",value:function(){this.showAlert=!1,this.alertMsg=""}}]),a}(u["default"]);f([Object(p["b"])({required:!0})],h.prototype,"id",void 0),f([Object(p["b"])({required:!0})],h.prototype,"title",void 0),f([Object(p["b"])()],h.prototype,"subtitle",void 0),f([Object(p["b"])({required:!0})],h.prototype,"okTitle",void 0),h=f([Object(p["a"])({name:"app-modal-form",components:{AppButton:d["a"]}})],h);var m=h,v=m,b=(a(264),a(39)),y=Object(b["a"])(v,n,s,!1,null,null,null);y.options.__file="src/app/shared/components/app-modal/app-modal-form.vue";e["a"]=y.exports},279:function(t,e,a){},280:function(t,e,a){},313:function(t,e,a){"use strict";a(279)},314:function(t,e,a){"use strict";a(280)},349:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("app-content",{attrs:{title:t.$t("analysis-overview"),subtitle:t.$t("analysis-overview_descr")}},[a("div",{staticClass:"app-analysis"},[a("router-link",{attrs:{to:{name:"AnalysisNew"}}},[a("b-button",{attrs:{variant:"primary"}},[t._v(t._s(t.createNewAnalysisBtnText))])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.plants,expression:"plants"}],staticClass:"app-analysis-plants-filter pull-right"},[a("b-form-select",{staticClass:"app-analysis-plants-filter-select",attrs:{id:"plants",options:t.plants},on:{change:t.onPlantSelectionChanged},model:{value:t.selectedPlantId,callback:function(e){t.selectedPlantId=e},expression:"selectedPlantId"}}),a("label",{staticClass:"app-analysis-plants-filter-label",attrs:{for:"plants"}},[t._v(t._s(t.$t("plant")))])],1),a("div",{staticClass:"clear"}),a("app-table-container",[a("b-table",{attrs:{hover:"",fields:t.columns,items:t.analysisRows,"head-variant":"light","show-empty":"",emptyText:t.$t("no-data"),busy:t.isLoading},scopedSlots:t._u([{key:"table-busy",fn:function(){return[a("div",{staticClass:"text-center"},[a("b-spinner",{staticClass:"align-middle"})],1)]},proxy:!0},{key:"empty",fn:function(e){return[a("span",{staticClass:"grayed"},[t._v(t._s(e.emptyText))])]}},{key:"head(actions)",fn:function(){return[a("span",{staticClass:"hidden"},[t._v(t._s(t.$t("actions")))])]},proxy:!0},{key:"cell(name)",fn:function(e){return[a("router-link",{attrs:{to:{name:"EditAnalysis",params:{id:e.item.id}}}},[t._v(t._s(e.item.name))])]}},{key:"cell(user)",fn:function(e){return[e.item.user.userName?a("span",[t._v(" "+t._s(e.item.user.userName)),a("br"),a("small",{staticClass:"grayed"},[t._v(t._s(e.item.user.email))])]):a("span",[t._v(t._s(e.item.user.email))])]}},{key:"cell(state)",fn:function(e){return[e.item.state?a("div",[t._v(" "+t._s(t.$t(e.item.state.state.name))+" "),"UPLOADING"===e.item.state.state.name?a("span",[t._v(" "+t._s(t.uploadStateProcess))]):t._e(),a("br"),a("small",{staticClass:"grayed"},[t._v(t._s(t.trans(t.getTimeDiff(e.item.state.started_at))))])]):a("div",[t._v("UNKNOWN")])]}},{key:"cell(hasResults)",fn:function(t){return[a("b-icon",{directives:[{name:"show",rawName:"v-show",value:t.item.analysisResultId,expression:"row.item.analysisResultId"}],staticClass:"font-xl text-success",attrs:{icon:"check"}})]}},{key:"cell(actions)",fn:function(e){return[a("div",{staticClass:"hover-cell pull-right"},[e.item.analysisResultId?a("router-link",{attrs:{title:t.$t("show-results"),to:{name:"Plant",params:{id:e.item.plantId},query:{view:"table",result:e.item.analysisResultId}}}},[a("b-button",{attrs:{variant:"primary",size:"sm"}},[a("b-icon",{attrs:{icon:"graph-up"}})],1)],1):t._e()],1),a("div",{staticClass:"clearfix"})]}}])})],1)],1)])},s=[];n._withStripped=!0;var r=a(64),i=a(16),l=a(24),o=a(25),c=a(31),u=a(30),p=a(40),d=(a(62),a(61),a(26),a(243),a(96),a(95),a(260),a(33)),f=a(79),h=a(252),m=a(74),v=a(63),b=a(259),y=a(75),g=a(261),_=a(268),w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-modal-form-info-area"},[t._t("default")],2)},k=[];w._withStripped=!0;var O=a(15),j=function(t,e,a,n){var s,r=arguments.length,i=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(p["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(r<3?s(i):r>3?s(e,a,i):s(e,a))||i);return r>3&&i&&Object.defineProperty(e,a,i),i},R=function(t){Object(c["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(l["a"])(this,a),e.apply(this,arguments)}return Object(o["a"])(a)}(O["default"]);R=j([Object(d["a"])({name:"app-modal-form-info-area"})],R);var S=R,x=S,A=(a(313),a(39)),P=Object(A["a"])(x,w,k,!1,null,null,null);P.options.__file="src/app/shared/components/app-modal/app-modal-form-info-area.vue";var $=P.exports,C=function(t,e,a,n){var s,r=arguments.length,i=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(p["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(r<3?s(i):r>3?s(e,a,i):s(e,a))||i);return r>3&&i&&Object.defineProperty(e,a,i),i},T=function(t){Object(c["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(l["a"])(this,a),t=e.apply(this,arguments),t.columns=[],t.plants=null,t.selectedPlantId=null,t.analysisRows=[],t.isLoading=!0,t.createNewAnalysisBtnText="",t.uploadStateProcess="",t}return Object(o["a"])(a,[{key:"created",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.createNewAnalysisBtnText=this.$t("new-data-upload").toString(),this.columns=[{key:"name",label:this.$t("name").toString(),sortable:!0},{key:"plant",label:this.$t("plant").toString(),sortable:!0},{key:"date",label:this.$t("created-at").toString(),sortable:!0},{key:"user",label:this.$t("created-by").toString(),sortable:!0},{key:"state",label:this.$t("state").toString(),sortable:!0},{key:"hasResults",label:this.$t("has-results").toString()},{key:"actions"}],t.next=4,this.getPlants();case 4:return t.next=6,this.updateAnalysisRows();case 6:this.checkUploadState();case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"mounted",value:function(){this.registerUploadEvents()}},{key:"registerUploadEvents",value:function(){var t=this;b["a"].on(g["a"].PROGRESS,(function(){t.updateToUploadState()})),b["a"].on(g["a"].COMPLETED,(function(){t.createNewAnalysisBtnText=t.$t("new-data-upload").toString(),t.updateTableRowState(t.$t("PICK_ME_UP").toString())})),b["a"].on(g["a"].FAILED,(function(){t.updateTableRowState(t.$t("UPLOAD_FAILED").toString())}))}},{key:"checkUploadState",value:function(){b["a"].hasState(g["b"].UPLOADING)&&this.updateToUploadState()}},{key:"trans",value:function(t){return this.$t.apply(this,Object(r["a"])(t)).toString()}},{key:"onPlantSelectionChanged",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.updateAnalysisRows();case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"updateToUploadState",value:function(){this.updateTableRowState(Math.round(100*b["a"].progress())+"%")&&(this.createNewAnalysisBtnText=this.$t("return-to-upload").toString())}},{key:"updateTableRowState",value:function(t){var e=b["a"].getMetadata();return!(!this.analysisRows||!e)&&(this.uploadStateProcess=t,!0)}},{key:"updateAnalysisRows",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.isLoading=!0,t.prev=1,e=this.selectedPlantId&&{plant_id:this.selectedPlantId}||void 0,t.next=5,m["a"].getAllAnalysis(e);case 5:this.analysisRows=t.sent.map((function(t){var e={id:t.id,name:t.name,date:new Date(Date.parse(t.created_at)).toLocaleString(),user:t.user&&{userName:((t.user.first_name||"")+" "+(t.user.last_name||"")).trim(),email:t.user.email}||"",analysisResultId:t.analysis_result&&(a.isSuperAdmin||t.analysis_result.released)&&t.analysis_result.id||void 0,state:t.current_state,files:t.files,plantId:t.plant.id,plant:t.plant.name};return e})),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](1),v["a"].showError(t.t0);case 11:return t.prev=11,this.isLoading=!1,t.finish(11);case 14:case"end":return t.stop()}}),t,this,[[1,8,11,14]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"getPlants",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,m["a"].getAllPlants();case 2:e=t.sent,e.length>1&&(this.plants=e.map((function(t){return{value:t.id,text:t.name}})),this.plants.unshift({value:null,text:""}));case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}]),a}(y["a"]);T=C([Object(d["a"])({name:"app-analysis",components:{AppContent:f["a"],AppTableContainer:h["a"],AppModalForm:_["a"],AppModalFormInfoArea:$}})],T);var I=T,M=I,E=(a(314),Object(A["a"])(M,n,s,!1,null,null,null));E.options.__file="src/app/analysis/analysis.vue";e["default"]=E.exports}}]);