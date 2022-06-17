(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{388:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("app-content",{attrs:{title:t.$t("new-data-upload"),navback:!0,subtitle:t.$t("create-new-analysis_descr")}},[n("div",{staticClass:"app-new-analysis"},[n("app-analysis-upload",{attrs:{analysis:t.analysis},on:{startUpload:t.onStartUpload,cancelUpload:t.onCancelUpload,retryUpload:t.onRetryUpload},scopedSlots:t._u([{key:"uploadForm",fn:function(){return[n("b-row",{staticStyle:{"margin-bottom":"25px"}},[t.plantOptions.length>1?n("b-col",{attrs:{sm:"4"}},[n("b-form-group",{attrs:{"label-cols":"auto",label:t.$t("plant")}},[n("b-form-select",{attrs:{required:"",options:t.plantOptions},on:{change:t.onPlantSelectionChanged},model:{value:t.selectedPlantId,callback:function(e){t.selectedPlantId=e},expression:"selectedPlantId"}})],1)],1):t._e(),t.customerOptions.length>1?n("b-col",{attrs:{sm:"4"}},[n("b-form-group",{attrs:{"label-cols":"auto",label:t.$t("customer")}},[n("b-form-select",{attrs:{required:"",options:t.customerOptions},model:{value:t.selectedCustomerId,callback:function(e){t.selectedCustomerId=e},expression:"selectedCustomerId"}})],1)],1):t._e(),n("b-col",{attrs:{sm:"4"}},[n("b-form-group",{attrs:{"label-cols":"auto",label:t.$t("acquisition-date")}},[n("b-datepicker",{attrs:{required:""},model:{value:t.flownAt,callback:function(e){t.flownAt=e},expression:"flownAt"}})],1)],1)],1)]},proxy:!0},{key:"cancelButton",fn:function(){return[t._v(" "+t._s(t.$t("cancel-and-delete-all-files"))+" ")]},proxy:!0}])})],1)])},s=[];a._withStripped=!0;var r=n(14),l=n(20),o=n(21),i=n(31),c=n(30),u=n(42),p=(n(68),n(67),n(25),n(100),n(82),n(130),n(33)),d=n(83),f=n(84),h=n(81),m=n(250),b=n(288),y=function(t,e,n,a){var s,r=arguments.length,l=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)l=Reflect.decorate(t,e,n,a);else for(var o=t.length-1;o>=0;o--)(s=t[o])&&(l=(r<3?s(l):r>3?s(e,n,l):s(e,n))||l);return r>3&&l&&Object.defineProperty(e,n,l),l},v=function(t){Object(i["a"])(n,t);var e=Object(c["a"])(n);function n(){var t;return Object(l["a"])(this,n),t=e.apply(this,arguments),t.selectedPlantId=null,t.plantOptions=[],t.selectedCustomerId=null,t.customerOptions=[],t.flownAt=null,t.analysis=null,t}return Object(o["a"])(n,[{key:"created",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,h["a"].getPlants();case 3:this.plants=t.sent,this.plantOptions=this.plants.map((function(t){return{value:t.id,text:t.name}})),1===this.plants.length&&(this.selectedPlantId=this.plants[0].id),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),this.showError(t.t0);case 11:case"end":return t.stop()}}),t,this,[[0,8]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"onPlantSelectionChanged",value:function(){var t=this,e=this.plants.find((function(e){return e.id===t.selectedPlantId}));e&&e.customers&&e.customers.length>1?this.customerOptions=e.customers.map((function(t){return{value:t.id,text:t.name}})):this.customerOptions=[]}},{key:"onStartUpload",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e,n,a){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,!n){t.next=4;break}return a(this.analysis),t.abrupt("return");case 4:return t.next=6,h["a"].createAnalysis({plant_id:this.selectedPlantId,files:e,flown_at:this.flownAt,customer_id:this.selectedCustomerId||void 0});case 6:return s=t.sent,t.next=9,h["a"].getAnalysis(s.id);case 9:this.analysis=t.sent,a(this.analysis),t.next=17;break;case 13:t.prev=13,t.t0=t["catch"](0),this.showError(t.t0),a(null);case 17:case"end":return t.stop()}}),t,this,[[0,13]])})));function e(e,n,a){return t.apply(this,arguments)}return e}()},{key:"onCancelUpload",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.analysis){t.next=2;break}return t.abrupt("return");case 2:return t.prev=2,t.next=5,h["a"].cancelAnalysisUpload(this.analysis.id);case 5:return t.next=7,h["a"].deleteAnalysis(this.analysis.id);case 7:e(!1),t.next=14;break;case 10:t.prev=10,t.t0=t["catch"](2),this.showError(t.t0),e(!0);case 14:case"end":return t.stop()}}),t,this,[[2,10]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"onRetryUpload",value:function(){this.$router.push({name:"EditAnalysis",params:{id:this.analysis.id}})}}]),n}(d["a"]);v=y([Object(p["a"])({name:"app-new-analysis",components:{AppContent:f["a"],AppButton:m["a"],AppAnalysisUpload:b["a"]}})],v);var w=v,g=w,k=n(41),x=Object(k["a"])(g,a,s,!1,null,null,null);x.options.__file="src/app/analysis/new-analysis/new-analysis.vue";e["default"]=x.exports}}]);