(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{244:function(e,t,a){"use strict";var n=a(46),r=a(34),i=a(20),l=a(184),o="toString",s=RegExp.prototype,c=s[o],u=i((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),d=c.name!=o;(u||d)&&n(RegExp.prototype,o,(function(){var e=r(this),t=String(e.source),a=e.flags,n=String(void 0===a&&e instanceof RegExp&&!("flags"in s)?l.call(e):a);return"/"+t+"/"+n}),{unsafe:!0})},245:function(e,t,a){},246:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-button",{class:e.cls,attrs:{variant:e.variant,type:e.type,disabled:e.isDisabled},on:{click:e.onClick}},[a("span",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"app-button-loading"},[a("b-spinner",{attrs:{small:""}})],1),e._t("default")],2)},r=[];n._withStripped=!0;var i=a(22),l=a(23),o=a(31),s=a(30),c=a(40),u=(a(62),a(26),a(16)),d=a(32),p=function(e,t,a,n){var r,i=arguments.length,l=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)l=Reflect.decorate(e,t,a,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(l=(i<3?r(l):i>3?r(t,a,l):r(t,a))||l);return i>3&&l&&Object.defineProperty(t,a,l),l},f=function(e){Object(o["a"])(a,e);var t=Object(s["a"])(a);function a(){return Object(i["a"])(this,a),t.apply(this,arguments)}return Object(l["a"])(a,[{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"onClick",value:function(e){this.$emit("click",e)}}]),a}(u["default"]);p([Object(d["b"])({default:"button"})],f.prototype,"type",void 0),p([Object(d["b"])({default:""})],f.prototype,"cls",void 0),p([Object(d["b"])({default:"primary"})],f.prototype,"variant",void 0),p([Object(d["b"])({default:!1})],f.prototype,"disabled",void 0),p([Object(d["b"])({default:!1})],f.prototype,"loading",void 0),f=p([Object(d["a"])({name:"app-button"})],f);var m=f,b=m,h=(a(247),a(39)),v=Object(h["a"])(b,n,r,!1,null,null,null);v.options.__file="src/app/shared/components/app-button/app-button.vue";t["a"]=v.exports},247:function(e,t,a){"use strict";a(245)},250:function(e,t,a){},252:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:"app-table-container "+(e.size?"app-table-container-"+e.size:"")},[e._t("default")],2)},r=[];n._withStripped=!0;var i=a(23),l=a(22),o=a(31),s=a(30),c=a(40),u=(a(62),a(26),a(16)),d=a(32),p=function(e,t,a,n){var r,i=arguments.length,l=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)l=Reflect.decorate(e,t,a,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(l=(i<3?r(l):i>3?r(t,a,l):r(t,a))||l);return i>3&&l&&Object.defineProperty(t,a,l),l},f=function(e){Object(o["a"])(a,e);var t=Object(s["a"])(a);function a(){return Object(l["a"])(this,a),t.apply(this,arguments)}return Object(i["a"])(a)}(u["default"]);p([Object(d["b"])({default:""})],f.prototype,"size",void 0),f=p([d["a"]],f);var m=f,b=m,h=(a(255),a(39)),v=Object(h["a"])(b,n,r,!1,null,null,null);v.options.__file="src/app/shared/components/app-table-container/app-table-container.vue";t["a"]=v.exports},255:function(e,t,a){"use strict";a(250)},258:function(e,t,a){},263:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a(22),r=a(23),i=function(){function e(){Object(n["a"])(this,e)}return Object(r["a"])(e,null,[{key:"download",value:function(e,t){var a=document.createElement("a");a.href=e,a.setAttribute("download",t||e),document.body.appendChild(a),a.click()}}]),e}()},267:function(e,t,a){"use strict";a(258)},269:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-modal",{staticClass:"app-modal-form",attrs:{id:e.id,"ok-title":e.okTitle,"no-close-on-backdrop":""},scopedSlots:e._u([{key:"modal-title",fn:function(){return[a("div",{staticClass:"app-modal-form-title"},[a("h2",[e._v(e._s(e.title))]),e.subtitle?a("div",{staticClass:"app-modal-form-title-subtitle grayed",domProps:{innerHTML:e._s(e.subtitle)}}):e._e()])]},proxy:!0},{key:"modal-footer",fn:function(){return[a("b-button",{attrs:{variant:"secondary"},on:{click:function(t){return e.$bvModal.hide(e.id)}}},[e._v(e._s(e.$t("cancel")))]),a("app-button",{attrs:{loading:e.modalLoading},on:{click:e.onSubmit}},[e._v(e._s(e.okTitle))])]},proxy:!0}])},[a("b-alert",{staticClass:"app-modal-form-alert",attrs:{variant:e.alertVariant,dismissible:""},domProps:{innerHTML:e._s(e.alertMsg)},model:{value:e.showAlert,callback:function(t){e.showAlert=t},expression:"showAlert"}}),a("form",{on:{submit:e.onSubmit}},[e._t("default")],2)],1)},r=[];n._withStripped=!0;var i=a(22),l=a(23),o=a(31),s=a(30),c=a(40),u=(a(62),a(26),a(16)),d=a(32),p=a(246),f=function(e,t,a,n){var r,i=arguments.length,l=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)l=Reflect.decorate(e,t,a,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(l=(i<3?r(l):i>3?r(t,a,l):r(t,a))||l);return i>3&&l&&Object.defineProperty(t,a,l),l},m=function(e){Object(o["a"])(a,e);var t=Object(s["a"])(a);function a(){var e;return Object(i["a"])(this,a),e=t.apply(this,arguments),e.showAlert=!1,e.alertMsg="",e.alertVariant="default",e}return Object(l["a"])(a,[{key:"show",value:function(){this.$bvModal.show(this.id||"")}},{key:"hide",value:function(){this.hideAlert(),this.$bvModal.hide(this.id||"")}},{key:"alertError",value:function(e){if(this.alertVariant="danger",this.showAlert=!0,console.error(e),"string"===typeof e)this.alertMsg=e;else{this.alertMsg=e.error;var t=e.details||e.message;t&&(this.alertMsg+="<br><small>Details: "+t+"</small>")}}},{key:"alertInfo",value:function(e){this.alertVariant="primary",this.showAlert=!0,this.alertMsg=e}},{key:"onSubmit",value:function(e){this.$emit("submit")}},{key:"hideAlert",value:function(){this.showAlert=!1,this.alertMsg=""}}]),a}(u["default"]);f([Object(d["b"])({required:!0})],m.prototype,"id",void 0),f([Object(d["b"])({required:!0})],m.prototype,"title",void 0),f([Object(d["b"])()],m.prototype,"subtitle",void 0),f([Object(d["b"])({required:!0})],m.prototype,"okTitle",void 0),f([Object(d["b"])({default:!1})],m.prototype,"modalLoading",void 0),m=f([Object(d["a"])({name:"app-modal-form",components:{AppButton:p["a"]}})],m);var b=m,h=b,v=(a(267),a(39)),g=Object(v["a"])(h,n,r,!1,null,null,null);g.options.__file="src/app/shared/components/app-modal/app-modal-form.vue";t["a"]=g.exports},353:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("app-content",{attrs:{title:e.$t("plants-overview"),subtitle:e.$t("plants-overview_descr")}},[a("app-table-container",[a("b-table",{attrs:{hover:"",fields:e.columns,items:e.plants,"head-variant":"light","show-empty":"",emptyText:e.$t("no-data"),busy:e.tableLoading},scopedSlots:e._u([{key:"head(actions)",fn:function(){return[a("span",{staticClass:"hidden"},[e._v(e._s(e.$t("actions")))])]},proxy:!0},{key:"cell(name)",fn:function(t){return[a("router-link",{directives:[{name:"show",rawName:"v-show",value:t.item.digitized,expression:"row.item.digitized"}],attrs:{to:{name:"Plant",params:{id:t.item.id}}}},[e._v(" "+e._s(t.item.name)+" ")]),t.item.digitized?e._e():a("span",[e._v(e._s(t.item.name))])]}},{key:"cell(digitized)",fn:function(e){return[a("b-icon",{class:e.item.digitized?"green":"red",attrs:{icon:e.item.digitized?"check2":"x"}})]}},{key:"cell(established)",fn:function(e){return[a("b-icon",{class:e.item.established?"green":"red",attrs:{icon:e.item.established?"check2":"x"}})]}},{key:"cell(actions)",fn:function(t){return[a("div",{staticClass:"hover-cell pull-right"},[a("b-button",{directives:[{name:"show",rawName:"v-show",value:e.isSuperAdmin,expression:"isSuperAdmin"}],attrs:{variant:"secondary",size:"sm",title:e.$t("upload-dt")},on:{click:function(a){return e.onManagePlantClick(t.item)}}},[a("b-icon",{attrs:{icon:"hammer"}})],1)],1),a("div",{staticClass:"clearfix"})]}}])})],1),a("app-modal-form",{ref:"managePlantModal",attrs:{id:"manage-plant-modal",title:e.$t("upload-dt"),subtitle:e.$t("upload-dt_descr"),"ok-title":e.$t("apply"),modalLoading:e.plantModalLoading},on:{submit:e.saveManagePlant}},[e.managePlantModel.plant?a("b-form-group",{directives:[{name:"show",rawName:"v-show",value:e.managePlantModel.plant.fieldgeometry,expression:"managePlantModel.plant.fieldgeometry"}]},[a("a",{attrs:{href:"#"},on:{click:function(t){return e.onFileClick(e.managePlantModel.plant.fieldgeometry)}}},[e._v(" "+e._s(e.managePlantModel.plant.fieldgeometry&&e.managePlantModel.plant.fieldgeometry.file_name)+" ")])]):e._e(),a("b-form-group",[a("b-form-checkbox",{attrs:{id:"clear-before-checkbox"},model:{value:e.managePlantModel.clearBefore,callback:function(t){e.$set(e.managePlantModel,"clearBefore",t)},expression:"managePlantModel.clearBefore"}},[e._v(" "+e._s(e.$t("clear-before"))+" ")])],1),a("b-form-group",{attrs:{label:e.$t("select-dt-json-file")}},[a("b-form-file",{attrs:{required:"",accept:".json"},model:{value:e.managePlantModel.file,callback:function(t){e.$set(e.managePlantModel,"file",t)},expression:"managePlantModel.file"}})],1)],1)],1)},r=[];n._withStripped=!0;var i=a(78),l=a(15),o=a(22),s=a(23),c=a(31),u=a(30),d=a(40),p=(a(63),a(62),a(26),a(244),a(98),a(96),a(32)),f=a(80),m=a(252),b=a(75),h=a(76),v=a(269),g=a(64),y=a(263),k=function(e,t,a,n){var r,i=arguments.length,l=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(d["a"])(Reflect))&&"function"===typeof Reflect.decorate)l=Reflect.decorate(e,t,a,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(l=(i<3?r(l):i>3?r(t,a,l):r(t,a))||l);return i>3&&l&&Object.defineProperty(t,a,l),l},j=function(e){Object(c["a"])(a,e);var t=Object(u["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.plantModalLoading=!1,e.columns=null,e.plants=null,e.tableLoading=!1,e.managePlantModel={plant:null,clearBefore:!0,file:null},e}return Object(s["a"])(a,[{key:"created",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.columns=[{key:"name",label:this.$t("name").toString()},{key:"digitized",label:this.$t("digitized").toString()},{key:"established",label:this.$t("established").toString()},{key:"analysesCount",label:this.$t("number-of-analyses").toString()}],this.isSuperAdmin&&this.columns.push({key:"actions"}),e.next=4,this.updatePlants();case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"updatePlants",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){var t,a,n,r,l,o,s,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,this.tableLoading=!0,t=[],!this.isSuperAdmin){e.next=29;break}return e.next=6,b["a"].getCustomers();case 6:a=e.sent,n=Object(i["a"])(a),e.prev=8,n.s();case 10:if((r=n.n()).done){e.next=19;break}return l=r.value,e.t0=t,e.next=15,b["a"].getPlants(l.id);case 15:e.t1=e.sent,t=e.t0.concat.call(e.t0,e.t1);case 17:e.next=10;break;case 19:e.next=24;break;case 21:e.prev=21,e.t2=e["catch"](8),n.e(e.t2);case 24:return e.prev=24,n.f(),e.finish(24);case 27:e.next=32;break;case 29:return e.next=31,b["a"].getPlants();case 31:t=e.sent;case 32:this.plants=[],o=Object(i["a"])(t),e.prev=34,o.s();case 36:if((s=o.n()).done){e.next=52;break}return c=s.value,e.t3=this.plants,e.t4=c.id,e.t5=c.customer_id,e.t6=c.name,e.t7=!!c.fieldgeometry,e.next=45,b["a"].getAnalysisResults(c.id);case 45:e.t8=e.sent.length,e.t9=!c.in_setup_phase,e.t10=c.fieldgeometry,e.t11={id:e.t4,customerId:e.t5,name:e.t6,digitized:e.t7,analysesCount:e.t8,established:e.t9,fieldgeometry:e.t10},e.t3.push.call(e.t3,e.t11);case 50:e.next=36;break;case 52:e.next=57;break;case 54:e.prev=54,e.t12=e["catch"](34),o.e(e.t12);case 57:return e.prev=57,o.f(),e.finish(57);case 60:e.next=65;break;case 62:e.prev=62,e.t13=e["catch"](0),g["a"].showError(e.t13);case 65:return e.prev=65,this.tableLoading=!1,e.finish(65);case 68:case"end":return e.stop()}}),e,this,[[0,62,65,68],[8,21,24,27],[34,54,57,60]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"saveManagePlant",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){var t,a=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.plantModalLoading=!0,e.next=4,b["a"].importFieldgeometry(this.managePlantModel.file,this.managePlantModel.plant.customerId,this.managePlantModel.plant.id,this.managePlantModel.clearBefore);case 4:t=e.sent,b["a"].waitForTask(t.id,function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a.plantModalLoading=!1,"SUCCESS"!==t.state){e.next=8;break}return a.managePlantModal.hide(),g["a"].showSuccessAlert(a.$t("dt-imported-successfully").toString()),e.next=6,a.updatePlants();case 6:e.next=9;break;case 8:"FAILURE"===t.state&&a.managePlantModal.alertError({error:"SOMETHING_WENT_WRONG",details:t.result});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),(function(e){a.managePlantModal.alertInfo(e)})),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),this.managePlantModal.alertError(e.t0);case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onManagePlantClick",value:function(e){this.managePlantModel.plant=e,this.managePlantModel.clearBefore=!0,this.managePlantModel.file=null,this.managePlantModal.show()}},{key:"onFileClick",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b["a"].getFieldgeometryFileUrl(t.id);case 3:a=e.sent,y["a"].download(a.url,t.file_name),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),g["a"].showError(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));function t(t){return e.apply(this,arguments)}return t}()}]),a}(h["a"]);k([Object(p["c"])()],j.prototype,"managePlantModal",void 0),j=k([Object(p["a"])({name:"app-analysis",components:{AppContent:f["a"],AppTableContainer:m["a"],AppModalForm:v["a"]}})],j);var w=j,O=w,_=a(39),x=Object(_["a"])(O,n,r,!1,null,null,null);x.options.__file="src/app/plant/plants.vue";t["default"]=x.exports}}]);