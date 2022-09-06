(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{270:function(e,t,i){},271:function(e,t,i){},272:function(e,t,i){"use strict";var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:"app-table-container "+(e.size?"app-table-container-"+e.size:"")},[e._t("default")],2)},o=[];r._withStripped=!0;var n=i(20),a=i(19),l=i(25),c=i(24),s=i(32),u=(i(53),i(23),i(16)),d=i(18),p=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(s["a"])(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a},f=function(e){Object(l["a"])(i,e);var t=Object(c["a"])(i);function i(){return Object(a["a"])(this,i),t.apply(this,arguments)}return Object(n["a"])(i)}(u["default"]);p([Object(d["b"])({default:""})],f.prototype,"size",void 0),f=p([d["a"]],f);var h=f,b=h,m=(i(278),i(34)),v=Object(m["a"])(b,r,o,!1,null,null,null);v.options.__file="src/app/shared/components/app-table-container/app-table-container.vue";t["a"]=v.exports},274:function(e,t,i){"use strict";var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("b-modal",{staticClass:"app-modal-form",attrs:{id:e.id,"ok-title":e.okTitle,"no-close-on-backdrop":""},scopedSlots:e._u([{key:"modal-title",fn:function(){return[i("div",{staticClass:"app-modal-form-title"},[e._t("modal-title",[i("h2",[e._v(e._s(e.title)+" "),e.superAdminProtected?i("app-super-admin-marker"):e._e()],1),e.subtitle?i("div",{staticClass:"app-modal-form-title-subtitle grayed",domProps:{innerHTML:e._s(e.subtitle)}}):e._e()])],2)]},proxy:!0},{key:"modal-footer",fn:function(){return[i("b-button",{attrs:{variant:"secondary"},on:{click:function(t){return e.$bvModal.hide(e.id)}}},[e._v(e._s(e.$t("cancel")))]),i("app-button",{attrs:{loading:e.modalLoading},on:{click:e.onSubmit}},[e._v(e._s(e.okTitle))])]},proxy:!0}],null,!0)},[i("b-alert",{staticClass:"app-modal-form-alert",attrs:{variant:e.alertVariant,dismissible:""},domProps:{innerHTML:e._s(e.alertMsg)},model:{value:e.showAlert,callback:function(t){e.showAlert=t},expression:"showAlert"}}),i("form",{on:{submit:e.onSubmit}},[e._t("default")],2)],1)},o=[];r._withStripped=!0;var n=i(19),a=i(20),l=i(25),c=i(24),s=i(32),u=(i(53),i(23),i(18)),d=i(142),p=i(46),f=i(69),h=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(s["a"])(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a},b=function(e){Object(l["a"])(i,e);var t=Object(c["a"])(i);function i(){var e;return Object(n["a"])(this,i),e=t.apply(this,arguments),e.showAlert=!1,e.alertMsg="",e.alertVariant="default",e}return Object(a["a"])(i,[{key:"show",value:function(){this.$bvModal.show(this.id||"")}},{key:"hide",value:function(){this.hideAlert(),this.$bvModal.hide(this.id||"")}},{key:"alertError",value:function(e){if(this.alertVariant="danger",this.showAlert=!0,console.error(e),"string"===typeof e)this.alertMsg=e;else{this.alertMsg=e.error;var t=e.details||e.message;t&&(this.alertMsg+="<br><small>Details: "+t+"</small>")}}},{key:"alertInfo",value:function(e){this.alertVariant="primary",this.showAlert=!0,this.alertMsg=e}},{key:"onSubmit",value:function(e){this.$emit("submit")}},{key:"hideAlert",value:function(){this.showAlert=!1,this.alertMsg=""}}]),i}(p["a"]);h([Object(u["b"])({required:!0})],b.prototype,"id",void 0),h([Object(u["b"])({default:""})],b.prototype,"title",void 0),h([Object(u["b"])()],b.prototype,"subtitle",void 0),h([Object(u["b"])({required:!0})],b.prototype,"okTitle",void 0),h([Object(u["b"])({default:!1})],b.prototype,"modalLoading",void 0),h([Object(u["b"])({default:!1})],b.prototype,"superAdminProtected",void 0),b=h([Object(u["a"])({name:"app-modal-form",components:{AppButton:d["a"],AppSuperAdminMarker:f["a"]}})],b);var m=b,v=m,g=(i(277),i(34)),y=Object(g["a"])(v,r,o,!1,null,null,null);y.options.__file="src/app/shared/components/app-modal/app-modal-form.vue";t["a"]=y.exports},276:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},277:function(e,t,i){"use strict";i(270)},278:function(e,t,i){"use strict";i(271)},280:function(e,t,i){"use strict";var r=i(21),o=i(285).trim,n=i(286);r({target:"String",proto:!0,forced:n("trim")},{trim:function(){return o(this)}})},285:function(e,t,i){var r=i(78),o=i(276),n="["+o+"]",a=RegExp("^"+n+n+"*"),l=RegExp(n+n+"*$"),c=function(e){return function(t){var i=String(r(t));return 1&e&&(i=i.replace(a,"")),2&e&&(i=i.replace(l,"")),i}};e.exports={start:c(1),end:c(2),trim:c(3)}},286:function(e,t,i){var r=i(27),o=i(276),n="​᠎";e.exports=function(e){return r((function(){return!!o[e]()||n[e]()!=n||o[e].name!==e}))}},287:function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));var r=i(19),o=i(20),n=function(){function e(){Object(r["a"])(this,e)}return Object(o["a"])(e,null,[{key:"download",value:function(e,t){var i=document.createElement("a");i.href=e,i.setAttribute("download",t||e),document.body.appendChild(i),i.click(),document.body.removeChild(i)}},{key:"open",value:function(e){var t,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"_blank";null===(t=window.open(e,i))||void 0===t||t.focus()}}]),e}()},290:function(e,t,i){"use strict";i.d(t,"a",(function(){return r}));i(110);function r(e){var t=["KB","MB","GB","TB"],i=0;do{e/=1024}while(e>1024&&++i<t.length);return"".concat(Math.round(e)," ").concat(t[i])}},298:function(e,t,i){"use strict";var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-simple-file-upload"},[i("b-form-file",{attrs:{accept:e.accept},model:{value:e.modelValue,callback:function(t){e.modelValue=t},expression:"modelValue"}}),e.uploadProgress&&e.modelValue?i("div",{staticClass:"mar-top"},[e._v(" "+e._s(e.$t("uploading"))+" "),i("b-progress",{attrs:{max:e.uploadProgress.total}},[i("b-progress-bar",{attrs:{value:e.uploadProgress.loaded,variant:"success"}},[e.uploadProgress.loaded===e.uploadProgress.total?i("span",[e._v(" "+e._s(e.$t("upload-succes-filename",{filename:e.modelValue.name}))+" ")]):e._e(),e.uploadProgress.loaded<e.uploadProgress.total?i("span",[e._v(" "+e._s(Math.round(e.uploadProgress.loaded/e.uploadProgress.total*100))+"% ")]):e._e()])],1)],1):e._e()],1)},o=[];r._withStripped=!0;var n=i(19),a=i(20),l=i(25),c=i(24),s=i(32),u=(i(53),i(23),i(16)),d=i(18),p=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(s["a"])(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a},f=function(e){Object(l["a"])(i,e);var t=Object(c["a"])(i);function i(){var e;return Object(n["a"])(this,i),e=t.apply(this,arguments),e.modelValue=null,e}return Object(a["a"])(i,[{key:"created",value:function(){this.modelValue=this.value}},{key:"onModelValueChanged",value:function(){this.$emit("input",this.modelValue)}}]),i}(u["default"]);p([Object(d["b"])({required:!0})],f.prototype,"value",void 0),p([Object(d["b"])({required:!0})],f.prototype,"uploadProgress",void 0),p([Object(d["b"])({default:"*"})],f.prototype,"accept",void 0),p([Object(d["d"])("modelValue")],f.prototype,"onModelValueChanged",null),f=p([Object(d["a"])({name:"app-simple-file-upload"})],f);var h=f,b=h,m=i(34),v=Object(m["a"])(b,r,o,!1,null,null,null);v.options.__file="src/app/shared/components/app-simple-file-upload/app-simple-file-upload.vue";t["a"]=v.exports},410:function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("app-content",{attrs:{title:e.$t("documentation")}},[e.isSuperAdmin?i("div",{staticClass:"app-doc-files-table-toolbar"},[i("app-button",{attrs:{variant:"primary",superAdminProtected:!0},on:{click:e.onCreateDocFileClick}},[e._v(" "+e._s(e.$t("upload-new-doc-file"))+" ")])],1):e._e(),i("app-table-container",[i("b-table",{attrs:{fields:e.columns,items:e.rows,"head-variant":"light",hover:"",busy:e.loading},scopedSlots:e._u([{key:"table-busy",fn:function(){return[i("div",{staticClass:"text-center"},[i("b-spinner",{staticClass:"align-middle"})],1)]},proxy:!0},{key:"cell(fileName)",fn:function(t){return[i("a",{attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),e.onFileClick(t.item)}}},[e._v(e._s(t.item.title||t.item.fileName))]),i("div",{directives:[{name:"show",rawName:"v-show",value:t.item.description,expression:"row.item.description"}],staticClass:"grayed"},[e._v(" "+e._s(t.item.description)+" ")]),i("div",{directives:[{name:"show",rawName:"v-show",value:t.item.title&&e.isSuperAdmin,expression:"row.item.title && isSuperAdmin"}],staticClass:"grayed"},[i("small",[e._v(e._s(t.item.fileName))])])]}},{key:"cell(updatedAtBy)",fn:function(t){return[i("small",{domProps:{innerHTML:e._s(t.item.updatedAtBy)}})]}},{key:"cell(actions)",fn:function(t){return[i("div",{staticClass:"hover-cell pull-right"},[i("app-button",{attrs:{variant:"secondary",size:"sm",title:e.$t("copy-file-link"),icon:"clipboard"},on:{click:function(i){return e.onCopyDocFileClick(t.item)}}}),i("app-button",{attrs:{variant:"secondary",size:"sm",title:e.$t("edit-doc-file"),superAdminProtected:!0,icon:"wrench"},on:{click:function(i){return e.onEditDocFileClick(t.item)}}}),i("app-button",{attrs:{variant:"outline-danger",size:"sm",title:e.$t("delete-doc-file"),superAdminProtected:!0,icon:"trash"},on:{click:function(i){return e.onDeleteDocFileClick(t.item)}}})],1)]}}])})],1),i("app-modal-form",{ref:"appDocFileModal",attrs:{id:"edit-doc-file-modal",title:e.docFileModalTitle,subtitle:e.docFileModalSubtitle,"ok-title":e.docFileModalOkTitle,modalLoading:e.docFileModalLoading,superAdminProtected:!0},on:{submit:e.onSubmitDocFile}},[e.currentDocFile?i("div",[i("b-form-group",{attrs:{label:e.$t("doc-file")}},[i("app-simple-file-upload",{attrs:{uploadProgress:e.uploadProgress},model:{value:e.currentDocFile.file,callback:function(t){e.$set(e.currentDocFile,"file",t)},expression:"currentDocFile.file"}})],1),i("b-form-group",{attrs:{label:e.$t("title")}},[i("b-form-input",{model:{value:e.currentDocFile.title,callback:function(t){e.$set(e.currentDocFile,"title",t)},expression:"currentDocFile.title"}})],1),i("b-form-group",{attrs:{label:e.$t("description")}},[i("b-form-textarea",{attrs:{id:"description"},model:{value:e.currentDocFile.description,callback:function(t){e.$set(e.currentDocFile,"description",t)},expression:"currentDocFile.description"}})],1)],1):e._e()])],1)},o=[];r._withStripped=!0;var n=i(68),a=i(8),l=i(14),c=i(19),s=i(20),u=i(25),d=i(24),p=i(32),f=(i(53),i(23),i(109),i(144),i(143),i(70),i(80),i(42),i(47),i(215),i(156),i(280),i(110),i(18)),h=i(272),b=i(274),m=i(56),v=i(46),g=i(298),y=i(93),k=i(145),w=i(290),O=i(287),j=i(76),F=i(142),_=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(p["a"])(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a},D=function(e){Object(u["a"])(i,e);var t=Object(d["a"])(i);function i(){var e;return Object(c["a"])(this,i),e=t.apply(this,arguments),e.columns=[],e.rows=[],e.loading=!1,e.docFileModalLoading=!1,e.docFileModalTitle="",e.docFileModalSubtitle="",e.docFileModalOkTitle="",e.currentDocFile=null,e.uploadProgress=null,e}return Object(s["a"])(i,[{key:"created",value:function(){var e=Object(l["a"])(Object(a["a"])().mark((function e(){var t,i=this;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.columns=[{key:"fileName",label:this.$t("document").toString()},{key:"updatedAtBy",label:this.$t("changed").toString()},{key:"size",label:this.$t("size").toString()},{key:"actions",label:""}],e.next=3,this.updateDocFileRows();case 3:if(!this.$route.query.fileId){e.next=8;break}if(t=this.rows.find((function(e){return e.id===i.$route.query.fileId})),!t){e.next=8;break}return e.next=8,this.onFileClick(t,"_self");case 8:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"updateDocFileRows",value:function(){var e=Object(l["a"])(Object(a["a"])().mark((function e(){var t=this;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.loading=!0,e.prev=1,e.next=4,m["a"].getDocFiles();case 4:this.rows=e.sent.map((function(e){return{id:e.id,file:null,description:e.description||null,title:e.title,fileName:e.file_name,updatedAtBy:t.getChangedText(e),size:Object(w["a"])(e.size)}})),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](1),this.showError(e.t0);case 10:return e.prev=10,this.loading=!1,e.finish(10);case 13:case"end":return e.stop()}}),e,this,[[1,7,10,13]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onFileClick",value:function(){var e=Object(l["a"])(Object(a["a"])().mark((function e(t,i){var r;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m["a"].getDocFileUrl(t.id);case 3:r=e.sent,O["a"].open(r.url,i||"_blank"),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.showError(e.t0);case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(t,i){return e.apply(this,arguments)}return t}()},{key:"onCopyDocFileClick",value:function(){var e=Object(l["a"])(Object(a["a"])().mark((function e(t){var i;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,i=new URL("doc/files?fileId=".concat(t.id),j["b"]).toString(),e.next=4,navigator.clipboard.writeText(i);case 4:this.showSuccess(this.$t("copy-file-link-success").toString()),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.showError(e.t0);case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onCreateDocFileClick",value:function(){try{this.currentDocFile={file:null,description:null,title:null},this.docFileModalTitle=this.$t("upload-new-doc-file").toString(),this.docFileModalSubtitle="",this.docFileModalOkTitle=this.$t("create").toString(),this.uploadProgress=null,this.appDocFileModal.show()}catch(e){this.showError(e)}}},{key:"onEditDocFileClick",value:function(e){try{this.currentDocFile=e,this.docFileModalTitle=this.$t("edit-doc-file").toString(),this.docFileModalSubtitle=e.fileName||"",this.docFileModalOkTitle=this.$t("apply").toString(),this.uploadProgress=null,this.appDocFileModal.show()}catch(t){this.showError(t)}}},{key:"onSubmitDocFile",value:function(){var e=Object(l["a"])(Object(a["a"])().mark((function e(){var t=this;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.docFileModalLoading=!0,e.prev=1,this.currentDocFile){e.next=4;break}throw new Error("Something went wrong! (Detais: currentDocFile is falsy)");case 4:if(!this.currentDocFile.id){e.next=12;break}if(this.currentDocFile.file||null!==this.currentDocFile.description&&void 0!==this.currentDocFile.description){e.next=7;break}throw{error:"MISSING_FILE_OR_DESCRIPTION",message:"Nothing changed..."};case 7:return e.next=9,m["a"].editDocFile(this.currentDocFile.id,this.currentDocFile.file||void 0,this.currentDocFile.title||void 0,this.currentDocFile.description||void 0,(function(e){return t.uploadProgress={total:e.total,loaded:e.loaded}}));case 9:this.showSuccess(this.$t("doc-file-updated-success").toString()),e.next=17;break;case 12:if(this.currentDocFile.file){e.next=14;break}throw{error:"MISSING_FILE",message:"Please select a document to upload"};case 14:return e.next=16,m["a"].createDocFile(this.currentDocFile.file,this.currentDocFile.title||void 0,this.currentDocFile.description||void 0,(function(e){return t.uploadProgress={total:e.total,loaded:e.loaded}}));case 16:this.showSuccess(this.$t("doc-file-created-success").toString());case 17:return this.appDocFileModal.hide(),e.next=20,this.updateDocFileRows();case 20:e.next=25;break;case 22:e.prev=22,e.t0=e["catch"](1),this.showError(e.t0);case 25:return e.prev=25,this.docFileModalLoading=!1,e.finish(25);case 28:case"end":return e.stop()}}),e,this,[[1,22,25,28]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onDeleteDocFileClick",value:function(){var e=Object(l["a"])(Object(a["a"])().mark((function e(t){return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.loading=!0,e.prev=1,confirm(this.$t("sure-delete-doc-file",{fileName:t.fileName}).toString())){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,m["a"].deleteDocFile(t.id);case 6:return this.showSuccess(this.$t("doc-file-deleted-success",{fileName:t.fileName}).toString()),e.next=9,this.updateDocFileRows();case 9:e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](1),this.showError(e.t0);case 14:return e.prev=14,this.loading=!1,e.finish(14);case 17:case"end":return e.stop()}}),e,this,[[1,11,14,17]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getChangedText",value:function(e){var t=(e.user.first_name+" "+e.user.last_name).trim()||e.user.email,i="",r="";return e.updated_at?(i=this.$t("updated").toString(),r=this.$t.apply(this,Object(n["a"])(k["a"].getTimeDiff(e.updated_at))).toString()):(i=this.$t("created").toString(),r=this.$t.apply(this,Object(n["a"])(k["a"].getTimeDiff(e.created_at))).toString()),"".concat(i," ").concat(r," ").concat(this.$t("by").toString()," ").concat(t)}}]),i}(v["a"]);_([Object(f["c"])()],D.prototype,"appDocFileModal",void 0),D=_([Object(f["a"])({name:"app-doc-files",components:{AppContent:y["a"],AppTableContainer:h["a"],AppModalForm:b["a"],AppSimpleFileUpload:g["a"],AppButton:F["a"]}})],D);var x=D,S=x,M=i(34),$=Object(M["a"])(S,r,o,!1,null,null,null);$.options.__file="src/app/doc/doc-files.vue";t["default"]=$.exports}}]);