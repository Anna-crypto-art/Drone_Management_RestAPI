(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{243:function(t,e,a){"use strict";var n=a(46),r=a(34),i=a(20),o=a(184),s="toString",l=RegExp.prototype,c=l[s],u=i((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),d=c.name!=s;(u||d)&&n(RegExp.prototype,s,(function(){var t=r(this),e=String(t.source),a=t.flags,n=String(void 0===a&&t instanceof RegExp&&!("flags"in l)?o.call(t):a);return"/"+e+"/"+n}),{unsafe:!0})},244:function(t,e,a){},245:function(t,e,a){"use strict";var n,r=a(24),i=a(25),o=a(31),s=a(30),l=a(15);(function(t){t["stopLoading"]="stop-loading",t["startLoading"]="start-loading"})(n||(n={}));var c=function(t){Object(o["a"])(a,t);var e=Object(s["a"])(a);function a(){return Object(r["a"])(this,a),e.apply(this,arguments)}return Object(i["a"])(a,[{key:"onStopLoading",value:function(t){this.$on(n.stopLoading,t)}},{key:"onStartLoading",value:function(t){this.$on(n.startLoading,t)}},{key:"stopLoading",value:function(){this.$emit(n.stopLoading)}},{key:"startLoading",value:function(){this.$emit(n.startLoading)}}]),a}(l["default"]),u=new c;e["a"]=u},246:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-button",{class:t.cls,attrs:{variant:t.variant,type:t.type,disabled:t.isDisabled},on:{click:t.onClick}},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"app-button-loading"},[a("b-spinner",{attrs:{small:""}})],1),t._t("default")],2)},r=[];n._withStripped=!0;var i=a(24),o=a(25),s=a(31),l=a(30),c=a(40),u=(a(61),a(26),a(15)),d=a(33),p=a(245),f=function(t,e,a,n){var r,i=arguments.length,o=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(t,e,a,n);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(o=(i<3?r(o):i>3?r(e,a,o):r(e,a))||o);return i>3&&o&&Object.defineProperty(e,a,o),o},b=function(t){Object(s["a"])(a,t);var e=Object(l["a"])(a);function a(){var t;return Object(i["a"])(this,a),t=e.apply(this,arguments),t.loading=!1,t.disabled=!1,t}return Object(o["a"])(a,[{key:"created",value:function(){var t=this;p["a"].onStopLoading((function(){t.stopLoading()})),p["a"].onStartLoading((function(){t.startLoading()}))}},{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"stopLoading",value:function(){this.loading=!1}},{key:"startLoading",value:function(){this.loading=!0}},{key:"disable",value:function(){this.disabled=!0}},{key:"enable",value:function(){this.disabled=!1}},{key:"onClick",value:function(t){this.$emit("click",t)}}]),a}(u["default"]);f([Object(d["b"])({default:"button"})],b.prototype,"type",void 0),f([Object(d["b"])({default:""})],b.prototype,"cls",void 0),f([Object(d["b"])({default:"primary"})],b.prototype,"variant",void 0),b=f([Object(d["a"])({name:"app-button"})],b);var h=b,m=h,v=(a(247),a(39)),g=Object(v["a"])(m,n,r,!1,null,null,null);g.options.__file="src/app/shared/components/app-button/app-button.vue";e["a"]=g.exports},247:function(t,e,a){"use strict";a(244)},251:function(t,e,a){},254:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:"app-table-container "+(t.size?"app-table-container-"+t.size:"")},[t._t("default")],2)},r=[];n._withStripped=!0;var i=a(25),o=a(24),s=a(31),l=a(30),c=a(40),u=(a(61),a(26),a(15)),d=a(33),p=function(t,e,a,n){var r,i=arguments.length,o=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(t,e,a,n);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(o=(i<3?r(o):i>3?r(e,a,o):r(e,a))||o);return i>3&&o&&Object.defineProperty(e,a,o),o},f=function(t){Object(s["a"])(a,t);var e=Object(l["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return Object(i["a"])(a)}(u["default"]);p([Object(d["b"])({default:""})],f.prototype,"size",void 0),f=p([d["a"]],f);var b=f,h=b,m=(a(258),a(39)),v=Object(m["a"])(h,n,r,!1,null,null,null);v.options.__file="src/app/shared/components/app-table-container/app-table-container.vue";e["a"]=v.exports},256:function(t,e,a){},258:function(t,e,a){"use strict";a(251)},262:function(t,e,a){"use strict";a(256)},263:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-modal",{staticClass:"app-modal-form",attrs:{id:t.id,"ok-title":t.okTitle,"no-close-on-backdrop":""},scopedSlots:t._u([{key:"modal-title",fn:function(){return[a("div",{staticClass:"app-modal-form-title"},[a("h2",[t._v(t._s(t.title))]),t.subtitle?a("div",{staticClass:"app-modal-form-title-subtitle grayed",domProps:{innerHTML:t._s(t.subtitle)}}):t._e()])]},proxy:!0},{key:"modal-footer",fn:function(){return[a("b-button",{attrs:{variant:"secondary"},on:{click:function(e){return t.$bvModal.hide(t.id)}}},[t._v(t._s(t.$t("cancel")))]),a("app-button",{on:{click:t.onSubmit}},[t._v(t._s(t.okTitle))])]},proxy:!0}])},[a("b-alert",{staticClass:"app-modal-form-alert",attrs:{variant:t.alertVariant,dismissible:""},domProps:{innerHTML:t._s(t.alertMsg)},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}}),a("form",{on:{submit:t.onSubmit}},[t._t("default")],2)],1)},r=[];n._withStripped=!0;var i=a(24),o=a(25),s=a(31),l=a(30),c=a(40),u=(a(61),a(26),a(15)),d=a(33),p=a(246),f=function(t,e,a,n){var r,i=arguments.length,o=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(t,e,a,n);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(o=(i<3?r(o):i>3?r(e,a,o):r(e,a))||o);return i>3&&o&&Object.defineProperty(e,a,o),o},b=function(t){Object(s["a"])(a,t);var e=Object(l["a"])(a);function a(){var t;return Object(i["a"])(this,a),t=e.apply(this,arguments),t.showAlert=!1,t.alertMsg="",t.alertVariant="default",t}return Object(o["a"])(a,[{key:"show",value:function(){this.$bvModal.show(this.id||"")}},{key:"hide",value:function(){this.hideAlert(),this.$bvModal.hide(this.id||"")}},{key:"alertError",value:function(t){if(this.alertVariant="danger",this.showAlert=!0,console.error(t),"string"===typeof t)this.alertMsg=t;else{this.alertMsg=t.error;var e=t.details||t.message;e&&(this.alertMsg+="<br><small>Details: "+e+"</small>")}}},{key:"alertInfo",value:function(t){this.alertVariant="primary",this.showAlert=!0,this.alertMsg=t}},{key:"onSubmit",value:function(t){this.$emit("submit")}},{key:"hideAlert",value:function(){this.showAlert=!1,this.alertMsg=""}}]),a}(u["default"]);f([Object(d["b"])({required:!0})],b.prototype,"id",void 0),f([Object(d["b"])({required:!0})],b.prototype,"title",void 0),f([Object(d["b"])()],b.prototype,"subtitle",void 0),f([Object(d["b"])({required:!0})],b.prototype,"okTitle",void 0),b=f([Object(d["a"])({name:"app-modal-form",components:{AppButton:p["a"]}})],b);var h=b,m=h,v=(a(262),a(39)),g=Object(v["a"])(m,n,r,!1,null,null,null);g.options.__file="src/app/shared/components/app-modal/app-modal-form.vue";e["a"]=g.exports},351:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("app-content",{attrs:{title:t.$t("plants-overview"),subtitle:t.$t("plants-overview_descr")}},[a("app-table-container",[a("b-table",{attrs:{hover:"",fields:t.columns,items:t.plants,"head-variant":"light","show-empty":"",emptyText:t.$t("no-data"),busy:t.tableLoading},scopedSlots:t._u([{key:"head(actions)",fn:function(){return[a("span",{staticClass:"hidden"},[t._v(t._s(t.$t("actions")))])]},proxy:!0},{key:"cell(name)",fn:function(e){return[a("router-link",{directives:[{name:"show",rawName:"v-show",value:e.item.digitized,expression:"row.item.digitized"}],attrs:{to:{name:"Plant",params:{id:e.item.id}}}},[t._v(" "+t._s(e.item.name)+" ")]),e.item.digitized?t._e():a("span",[t._v(t._s(e.item.name))])]}},{key:"cell(digitized)",fn:function(t){return[a("b-icon",{class:t.item.digitized?"green":"red",attrs:{icon:t.item.digitized?"check2":"x"}})]}},{key:"cell(actions)",fn:function(e){return[a("div",{staticClass:"hover-cell pull-right"},[a("b-button",{directives:[{name:"show",rawName:"v-show",value:t.isSuperAdmin,expression:"isSuperAdmin"}],attrs:{variant:"secondary",size:"sm",title:t.$t("upload-dt")},on:{click:function(a){return t.onManagePlantClick(e.item)}}},[a("b-icon",{attrs:{icon:"hammer"}})],1)],1),a("div",{staticClass:"clearfix"})]}}])})],1),a("app-modal-form",{ref:"managePlantModal",attrs:{id:"manage-plant-modal",title:t.$t("upload-dt"),subtitle:t.$t("upload-dt_descr"),"ok-title":t.$t("apply")},on:{submit:t.saveManagePlant}},[a("b-form-group",[a("b-form-checkbox",{attrs:{id:"clear-before-checkbox"},model:{value:t.managePlantModel.clearBefore,callback:function(e){t.$set(t.managePlantModel,"clearBefore",e)},expression:"managePlantModel.clearBefore"}},[t._v(" "+t._s(t.$t("clear-before"))+" ")])],1),a("b-form-group",{attrs:{label:t.$t("select-dt-json-file")}},[a("b-form-file",{attrs:{required:"",accept:".json"},model:{value:t.managePlantModel.file,callback:function(e){t.$set(t.managePlantModel,"file",e)},expression:"managePlantModel.file"}})],1)],1)],1)},r=[];n._withStripped=!0;var i=a(76),o=a(16),s=a(24),l=a(25),c=a(31),u=a(30),d=a(40),p=(a(62),a(61),a(26),a(243),a(124),a(95),a(33)),f=a(79),b=a(254),h=a(74),m=a(78),v=a(263),g=a(63),y=a(245),k=function(t,e,a,n){var r,i=arguments.length,o=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(d["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(t,e,a,n);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(o=(i<3?r(o):i>3?r(e,a,o):r(e,a))||o);return i>3&&o&&Object.defineProperty(e,a,o),o},j=function(t){Object(c["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(s["a"])(this,a),t=e.apply(this,arguments),t.columns=null,t.plants=null,t.tableLoading=!1,t.managePlantModel={plant:null,clearBefore:!0,file:null},t}return Object(l["a"])(a,[{key:"created",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.columns=[{key:"name",label:this.$t("name").toString()},{key:"digitized",label:this.$t("digitized").toString()},{key:"analysesCount",label:this.$t("number-of-analyses").toString()}],this.isSuperAdmin&&this.columns.push({key:"actions"}),t.next=4,this.updatePlants();case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"updatePlants",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,a,n,r,o,s,l,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,this.tableLoading=!0,e=[],!this.isSuperAdmin){t.next=29;break}return t.next=6,h["a"].getCustomers();case 6:a=t.sent,n=Object(i["a"])(a),t.prev=8,n.s();case 10:if((r=n.n()).done){t.next=19;break}return o=r.value,t.t0=e,t.next=15,h["a"].getPlants(o.id);case 15:t.t1=t.sent,e=t.t0.concat.call(t.t0,t.t1);case 17:t.next=10;break;case 19:t.next=24;break;case 21:t.prev=21,t.t2=t["catch"](8),n.e(t.t2);case 24:return t.prev=24,n.f(),t.finish(24);case 27:t.next=32;break;case 29:return t.next=31,h["a"].getPlants();case 31:e=t.sent;case 32:this.plants=[],s=Object(i["a"])(e),t.prev=34,s.s();case 36:if((l=s.n()).done){t.next=50;break}return c=l.value,t.t3=this.plants,t.t4=c.id,t.t5=c.customer_id,t.t6=c.name,t.t7=!!c.fieldgeometry,t.next=45,h["a"].getAnalysisResults(c.id);case 45:t.t8=t.sent.length,t.t9={id:t.t4,customerId:t.t5,name:t.t6,digitized:t.t7,analysesCount:t.t8},t.t3.push.call(t.t3,t.t9);case 48:t.next=36;break;case 50:t.next=55;break;case 52:t.prev=52,t.t10=t["catch"](34),s.e(t.t10);case 55:return t.prev=55,s.f(),t.finish(55);case 58:t.next=63;break;case 60:t.prev=60,t.t11=t["catch"](0),g["a"].showError(t.t11);case 63:return t.prev=63,this.tableLoading=!1,t.finish(63);case 66:case"end":return t.stop()}}),t,this,[[0,60,63,66],[8,21,24,27],[34,52,55,58]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"saveManagePlant",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,y["a"].startLoading(),t.next=4,h["a"].importFieldgeometry(this.managePlantModel.file,this.managePlantModel.plant.customerId,this.managePlantModel.plant.id,this.managePlantModel.clearBefore);case 4:e=t.sent,h["a"].waitForTask(e.id,function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(y["a"].stopLoading(),"SUCCESS"!==e.state){t.next=8;break}return a.managePlantModal.hide(),g["a"].showSuccessAlert(a.$t("dt-imported-successfully").toString()),t.next=6,a.updatePlants();case 6:t.next=9;break;case 8:"FAILURE"===e.state&&a.managePlantModal.alertError({error:"SOMETHING_WENT_WRONG",details:e.result});case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),(function(t){a.managePlantModal.alertInfo(t)})),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),this.managePlantModal.alertError(t.t0);case 11:case"end":return t.stop()}}),t,this,[[0,8]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"onManagePlantClick",value:function(t){this.managePlantModel.plant=t,this.managePlantModel.clearBefore=!0,this.managePlantModel.file=null,this.managePlantModal.show()}}]),a}(m["a"]);k([Object(p["c"])()],j.prototype,"managePlantModal",void 0),j=k([Object(p["a"])({name:"app-analysis",components:{AppContent:f["a"],AppTableContainer:b["a"],AppModalForm:v["a"]}})],j);var O=j,w=O,_=a(39),x=Object(_["a"])(w,n,r,!1,null,null,null);x.options.__file="src/app/plant/plants.vue";e["default"]=x.exports}}]);