(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{277:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(6),i=a(11),r=a(45);function s(e){return Object(r["a"])((function(t,a){if("created"===a){var r=t.created;t.created=Object(i["a"])(Object(n["a"])().mark((function t(){return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e&&(this[e]=!0),t.prev=1,t.next=4,r.apply(this);case 4:t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](1),this.showError(t.t0);case 9:return t.prev=9,e&&(this[e]=!1),t.finish(9);case 12:case"end":return t.stop()}}),t,this,[[1,6,9,12]])})))}else{t.methods=t.methods||{};var s=t.methods[a];t.methods[a]=Object(i["a"])(Object(n["a"])().mark((function t(){var a,i,r,l=arguments;return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(e&&(this[e]=!0),t.prev=1,a=l.length,i=new Array(a),r=0;r<a;r++)i[r]=l[r];return t.next=5,s.apply(this,i);case 5:t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](1),this.showError(t.t0);case 10:return t.prev=10,e&&(this[e]=!1),t.finish(10);case 13:case"end":return t.stop()}}),t,this,[[1,7,10,13]])})))}}))}},291:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var n=a(19),i=a(20),r=a(276),s=a(113),l=a(23),o=a(22),c=(a(95),a(323)),u=function(e){Object(l["a"])(a,e);var t=Object(o["a"])(a);function a(){return Object(n["a"])(this,a),t.apply(this,arguments)}return Object(i["a"])(a,[{key:"on",value:function(e,t,n){Object(r["a"])(Object(s["a"])(a.prototype),"on",this).call(this,e,t,n)}},{key:"emit",value:function(e,t){for(var n,i=arguments.length,l=new Array(i>2?i-2:0),o=2;o<i;o++)l[o-2]=arguments[o];return(n=Object(r["a"])(Object(s["a"])(a.prototype),"emit",this)).call.apply(n,[this,e,t].concat(l))}}]),a}(c["a"]),p=new u},292:function(e,t,a){"use strict";var n;a.d(t,"a",(function(){return n})),function(e){e["UPDATE_ANALYSIS"]="updateAnalysis",e["RUN_ANALYSIS_TASK"]="runAnalysisTask",e["FINISHED_ANALYSIS_TASK"]="finishedAnalysisTask",e["QFLY_SERVER_STATE_CHANGED"]="qflyServerStateChanged"}(n||(n={}))},312:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a(95);function n(e){var t=["KB","MB","GB","TB"],a=0;do{e/=1024}while(e>1024&&++a<t.length);return"".concat(Math.round(e)," ").concat(t[a])}},332:function(e,t,a){},333:function(e,t,a){},334:function(e,t,a){},370:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-analysis-upload"},[a("div",{staticClass:"mar-bottom-2x"},[a("b-form-checkbox",{attrs:{disabled:!e.hasPlantMetadata},on:{change:e.onChangeDataComplete},model:{value:e.dataComplete,callback:function(t){e.dataComplete=t},expression:"dataComplete"}},[e._v(" "+e._s(e.$t("data-complete"))+" "),a("app-explanation",[e._v(e._s(e.dataCompleteMetadataExpl))])],1)],1),e.uploaderService?a("app-uploader",{attrs:{uploaderService:e.uploaderService,title:e.$t("browse-or-drag-drop-files"),disableAfterUpload:!e.analysis}}):e._e(),e.gotoNewAnalysis?a("div",{staticClass:"pull-right mar-top mar-bottom"},[a("app-button",{on:{click:e.onGotoNewAnalysisClick}},[e._v(e._s(e.$t("goto-analysis",{analysis:e.gotoNewAnalysis.name})))])],1):e._e()],1)},i=[];n._withStripped=!0;var r=a(6),s=a(11),l=a(19),o=a(20),c=a(276),u=a(113),p=a(23),d=a(22),f=a(27),h=(a(46),a(21),a(112),a(71)),v=a(118),b=a(97),m=a(288),y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-file-upload"},[a("b-alert",{attrs:{variant:"danger"},model:{value:e.showErrorAlert,callback:function(t){e.showErrorAlert=t},expression:"showErrorAlert"}},[e.error?a("div",[e._v(" "+e._s(e.$t("error-occured-retrying"))+" "),a("span",{staticClass:"pad-left"},[a("b-spinner",{attrs:{small:""}}),e._v(" ("+e._s(e.errorTrials)+" "+e._s(e.$t("trials"))+") ")],1),e.errorTrials>10?a("div",{staticClass:"mar-top"},[a("app-button",{attrs:{variant:"secondary",size:"sm",loading:e.cancelLoading},on:{click:e.onCancelUploadClick}},[e._v(" "+e._s(e.$t("cancel-upload"))+" ")])],1):e._e(),a("div",{staticClass:"mar-top font-xs"},[e._v(" "+e._s(e.$t("details"))+": "),a("b",[e._v(e._s(e.error.error))]),a("br"),e._v(" "+e._s(e.error.message)+" ")])]):e._e()]),a("app-files-selection",{attrs:{disabled:e.disableFilesSelection},on:{filesSelected:e.onFilesSelected},scopedSlots:e._u([{key:"files",fn:function(){return[a("div",{directives:[{name:"show",rawName:"v-show",value:e.files.length>0,expression:"files.length > 0"}],staticClass:"app-file-upload-files mar-top"},e._l(e.files,(function(t){return a("app-file-uploader",{key:t.fileName,attrs:{uploaderService:e.uploaderService,uploading:e.uploading,file:t}})})),1)]},proxy:!0}])},[a("div",{staticClass:"app-file-upload-content mar-bottom"},[e.title?a("h3",{staticClass:"app-file-upload-content-title"},[e._v(e._s(e.title))]):e._e(),e._t("default")],2)]),a("app-button",{directives:[{name:"show",rawName:"v-show",value:e.showUploadButton,expression:"showUploadButton"}],attrs:{loading:e.uploading,disabled:e.uploadButtonDisabled,cls:"pull-right mar-top mar-bottom"},on:{click:e.onStartUpload}},[e._v(" "+e._s(e.$t("upload"))+" ")])],1)},O=[];y._withStripped=!0;var g=a(16),k=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-file-upload-file mar-bottom-half"},[a("div",{staticClass:"app-file-upload-file-infos"},[a("div",{staticClass:"app-file-upload-file-name"},[a("small",{staticClass:"grayed"},[e._v(e._s(e.fileSize))]),a("span",{staticClass:"pad-left"},[e._v(e._s(e.file.fileName))]),e.file.description?a("span",{staticClass:"pad-left font-xs",domProps:{innerHTML:e._s(e.file.description)}}):e._e()]),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.uploading,expression:"!uploading"}],staticClass:"app-file-upload-file-remove",on:{click:e.onFileRemove}},[a("b-icon",{attrs:{icon:"x"}})],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.uploading,expression:"uploading"}],staticClass:"app-file-upload-file-progress"},[a("span",{directives:[{name:"show",rawName:"v-show",value:!e.success,expression:"!success"}]},[e._v(e._s(e.progress)+"%")]),a("b-icon",{directives:[{name:"show",rawName:"v-show",value:e.success,expression:"success"}],staticClass:"text-success",attrs:{icon:"check2"}})],1)]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.uploading,expression:"uploading"}],ref:"uploadProgressBar",staticClass:"app-file-upload-file-progressbar"})])},w=[];k._withStripped=!0;var j=a(17),E=a(312),_=function(e,t,a,n){var i,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(f["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(s=(r<3?i(s):r>3?i(t,a,s):i(t,a))||s);return r>3&&s&&Object.defineProperty(t,a,s),s},C=function(e){Object(p["a"])(a,e);var t=Object(d["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e.progress=0,e.success=!1,e}return Object(o["a"])(a,[{key:"created",value:function(){var e=this;this.file.onProgress((function(t){e.progress=t,e.uploadProgressBar&&(e.uploadProgressBar.style.width=e.progress+"%")})),this.file.onComplete((function(){e.success=!0,e.uploadProgressBar&&(e.uploadProgressBar.style.display="none"),e.progress=0}))}},{key:"fileSize",get:function(){return Object(E["a"])(this.file.size)}},{key:"onFileRemove",value:function(){this.uploading||this.uploaderService.removeFile(this.file.fileName)}}]),a}(j["default"]);_([Object(g["b"])({required:!0})],C.prototype,"file",void 0),_([Object(g["b"])({required:!0})],C.prototype,"uploading",void 0),_([Object(g["b"])({required:!0})],C.prototype,"uploaderService",void 0),_([Object(g["c"])()],C.prototype,"uploadProgressBar",void 0),C=_([Object(g["a"])({name:"app-file-uploader"})],C);var S=C,A=S,x=(a(413),a(32)),U=Object(x["a"])(A,k,w,!1,null,null,null);U.options.__file="src/app/shared/components/app-file-upload/app-file-uploader.vue";var I=U.exports,R=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-file-selection mar-bottom",class:{dragging:e.dragging},on:{drop:e.onDrop,dragover:e.onDragOver,dragleave:e.onDragLeave}},[e._t("default"),a("div",{staticClass:"app-file-selection-button"},[a("app-file-input",{attrs:{disabled:e.disabled},model:{value:e.fileButtonSelection,callback:function(t){e.fileButtonSelection=t},expression:"fileButtonSelection"}})],1),e._t("files")],2)},N=[];R._withStripped=!0;var P=a(59),L=(a(148),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("label",{staticClass:"app-file-input btn btn-primary",class:{disabled:e.disabled}},[a("input",{ref:"fileInputElement",staticClass:"app-file-input-file",attrs:{type:"file",disabled:e.disabled,accept:e.accept,multiple:e.multiple},on:{click:e.onClick,change:e.onChange}}),e._v(" "+e._s(e.$t("browse"))+" ")])}),D=[];L._withStripped=!0;var F=function(e,t,a,n){var i,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(f["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(s=(r<3?i(s):r>3?i(t,a,s):i(t,a))||s);return r>3&&s&&Object.defineProperty(t,a,s),s},T=function(e){Object(p["a"])(a,e);var t=Object(d["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e.modelValue=null,e}return Object(o["a"])(a,[{key:"created",value:function(){this.modelValue=this.value}},{key:"onModelValueChanged",value:function(){this.$emit("input",this.modelValue)}},{key:"onClick",value:function(){this.fileInputElement.value=""}},{key:"onChange",value:function(){this.setFiles()}},{key:"setFiles",value:function(){if(this.fileInputElement.files&&0!==this.fileInputElement.files.length){for(var e=[],t=0;t<this.fileInputElement.files.length;t++)e.push(this.fileInputElement.files[t]);this.modelValue=e}else this.modelValue=null}}]),a}(j["default"]);F([Object(g["b"])({required:!0})],T.prototype,"value",void 0),F([Object(g["b"])({default:!0})],T.prototype,"multiple",void 0),F([Object(g["b"])({default:"*"})],T.prototype,"accept",void 0),F([Object(g["b"])({default:!1})],T.prototype,"disabled",void 0),F([Object(g["c"])()],T.prototype,"fileInputElement",void 0),F([Object(g["d"])("modelValue")],T.prototype,"onModelValueChanged",null),T=F([Object(g["a"])({name:"app-file-input"})],T);var M=T,B=M,G=(a(414),Object(x["a"])(B,L,D,!1,null,null,null));G.options.__file="src/app/shared/components/app-file-upload/app-file-input.vue";var $=G.exports,z=function(e,t,a,n){var i,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(f["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(s=(r<3?i(s):r>3?i(t,a,s):i(t,a))||s);return r>3&&s&&Object.defineProperty(t,a,s),s},V=function(e){Object(p["a"])(a,e);var t=Object(d["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e.fileButtonSelection=null,e.fileDropSelection=null,e.dragging=!1,e}return Object(o["a"])(a,[{key:"emitFiles",value:function(){this.disabled||this.$emit("filesSelected",this.fileDropSelection||this.fileButtonSelection)}},{key:"onFileButtonSelectionChanged",value:function(){this.fileButtonSelection&&(this.fileDropSelection=null),this.emitFiles()}},{key:"onDrop",value:function(e){e.preventDefault(),this.dragging=!1;var t=[];Object(P["a"])(e.dataTransfer.files).forEach((function(e){t.push(e)})),this.fileButtonSelection=null,t.length>0?this.fileDropSelection=t:this.fileDropSelection=null,this.emitFiles()}},{key:"onDragOver",value:function(e){e.preventDefault(),this.dragging=!0}},{key:"onDragLeave",value:function(){this.dragging=!1}}]),a}(j["default"]);z([Object(g["b"])({default:!1})],V.prototype,"disabled",void 0),z([Object(g["d"])("fileButtonSelection")],V.prototype,"onFileButtonSelectionChanged",null),V=z([Object(g["a"])({name:"app-files-selection",components:{AppFileInput:$}})],V);var Y=V,q=Y,H=(a(415),Object(x["a"])(q,R,N,!1,null,null,null));H.options.__file="src/app/shared/components/app-file-upload/app-files-selection.vue";var K,J=H.exports;(function(e){e[e["SELECTING"]=0]="SELECTING",e[e["UPLOADING"]=10]="UPLOADING",e[e["RETRYING"]=11]="RETRYING",e[e["COMPLETED"]=20]="COMPLETED",e[e["CANCELED"]=21]="CANCELED"})(K||(K={}));var Q=a(277),W=a(42),X=function(e,t,a,n){var i,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(f["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(s=(r<3?i(s):r>3?i(t,a,s):i(t,a))||s);return r>3&&s&&Object.defineProperty(t,a,s),s},Z=function(e){Object(p["a"])(a,e);var t=Object(d["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e.uploaderState=K.SELECTING,e.uploading=!1,e.error=null,e.showErrorAlert=!1,e.showUploadButton=!0,e.cancelLoading=!1,e}return Object(o["a"])(a,[{key:"created",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.registerUploaderEvents();case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"hasStateSelecting",get:function(){return this.uploaderState===K.SELECTING}},{key:"hasStateUploading",get:function(){return this.uploaderState===K.UPLOADING}},{key:"hasStateRetrying",get:function(){return this.uploaderState===K.RETRYING}},{key:"hasStateCompleted",get:function(){return this.uploaderState===K.COMPLETED}},{key:"hasStateCanceled",get:function(){return this.uploaderState===K.CANCELED}},{key:"onFilesSelected",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(t){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.uploaderService.fileUploaders=[],!t){e.next=4;break}return e.next=4,this.uploaderService.addFiles(t);case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onStartUpload",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.uploaderService.doUpload();case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onCancelUploadClick",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(confirm(this.$t("sure-to-cancel-upload").toString())){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,this.uploaderService.cancelUpload();case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"files",get:function(){return this.uploaderService.fileUploaders}},{key:"uploadButtonDisabled",get:function(){return 0===this.files.length||this.uploading}},{key:"disableFilesSelection",get:function(){return this.uploading||!this.showUploadButton}},{key:"errorTrials",get:function(){return this.uploaderService.getTrials()}},{key:"registerUploaderEvents",value:function(){var e=this;this.uploaderService.onStartUpload((function(){e.uploaderState=K.UPLOADING,e.uploading=!0,e.error=null,e.showErrorAlert=!1})),this.uploaderService.onResume((function(){e.uploaderState=K.UPLOADING,e.error=null,e.showErrorAlert=!1})),this.uploaderService.onError((function(t){e.uploaderState=K.RETRYING,e.uploading=!0,e.error=t,e.showErrorAlert=!0})),this.uploaderService.onUploadComplete((function(){e.uploaderState=K.COMPLETED,e.showUploadButton=!e.disableAfterUpload,e.uploading=!1,e.showSuccess(e.$t("upload-completed-successfully").toString(),!1)})),this.uploaderService.onUploadCanceled((function(){e.uploaderState=K.CANCELED,e.showUploadButton=!e.disableAfterUpload,e.uploading=!1,e.error=null,e.showErrorAlert=!1}))}}]),a}(W["a"]);X([Object(g["b"])({required:!0})],Z.prototype,"uploaderService",void 0),X([Object(g["b"])()],Z.prototype,"title",void 0),X([Object(g["b"])({default:!1})],Z.prototype,"disableAfterUpload",void 0),X([Object(Q["a"])()],Z.prototype,"onFilesSelected",null),X([Object(Q["a"])()],Z.prototype,"onStartUpload",null),X([Object(Q["a"])("cancelLoading")],Z.prototype,"onCancelUploadClick",null),Z=X([Object(g["a"])({name:"app-uploader",components:{AppFileUploader:I,AppFilesSelection:J,AppButton:h["a"]}})],Z);var ee=Z,te=ee,ae=Object(x["a"])(te,y,O,!1,null,null,null);ae.options.__file="src/app/shared/components/app-file-upload/app-uploader.vue";var ne,ie=ae.exports,re=a(67),se=(a(116),a(95),a(73),a(82),a(47)),le=(a(94),a(72),a(144),a(214),a(215),a(145),a(301)),oe=a(335);a(43),a(50),a(121);(function(e){e["FILE_PROGRESS"]="UPLOAD_FILE_PROGRESS",e["FILE_COMPLETE"]="FILE_COMPLETE",e["FILE_CHUNK_COMPLETE"]="FILE_CHUNK_COMPLETE",e["ERROR"]="UPLOAD_ERROR",e["START_UPLOAD"]="START_UPLOAD",e["UPLOAD_COMPLETE"]="UPLOAD_COMPLETE",e["UPLOAD_CANCELED"]="UPLOAD_CANCELED",e["RESUME_UPLOAD_AFTER_ERROR"]="RESUME_UPLOAD_AFTER_ERROR"})(ne||(ne={}));var ce=function(){function e(t,a,n){Object(l["a"])(this,e),this.file=t,this.fileName=a,this.chunkSizeInMB=n,this.event=new le["EventEmitter"],this.complete=!1,this.uploadId=null,this.fileId=null,this.missingChunkNumbers=[],this.description=""}return Object(o["a"])(e,[{key:"onProgress",value:function(e){this.event.on(ne.FILE_PROGRESS,e)}},{key:"onChunkComplete",value:function(e){this.event.on(ne.FILE_CHUNK_COMPLETE,e)}},{key:"onComplete",value:function(e){this.event.on(ne.FILE_COMPLETE,e)}},{key:"onError",value:function(e){this.event.on(ne.ERROR,e)}},{key:"emitProgress",value:function(e){this.event.emit(ne.FILE_PROGRESS,e)}},{key:"emitComplete",value:function(){this.event.emit(ne.FILE_COMPLETE)}},{key:"emitError",value:function(){this.event.emit(ne.ERROR)}},{key:"emitChunkComplete",value:function(){this.event.emit(ne.FILE_CHUNK_COMPLETE)}},{key:"fileUploadCompleted",value:function(){this.complete=!0,this.emitComplete()}},{key:"size",get:function(){return this.file.size}},{key:"upload",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(){var t,a,n,i,s,l,o=this;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.complete){e.next=3;break}return this.fileUploadCompleted(),e.abrupt("return");case 3:t=1024*this.chunkSizeInMB*1024,a=this.file.size,n=0,i=!1,s=Object(r["a"])().mark((function e(){var s,l,c,u;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(s=o.getNextChunkNumber(n),!1!==s){e.next=3;break}return e.abrupt("return","break");case 3:return n=s-1,l=n*t,c=s*t,c>=a&&(i=!0,c=a),u=o.file.slice(l,c),e.next=10,se["a"].uploadFileChunk(o.uploadId,u,o.fileId,n+1,(function(e){var i=t/a*n,r=e.loaded/e.total,s=(c-l)/a,u=Math.round(100*(i+r*s));o.emitProgress(u)}));case 10:o.emitChunkComplete(),o.removeChunkNumber(),n++;case 13:case"end":return e.stop()}}),e)}));case 8:if(i){e.next=15;break}return e.delegateYield(s(),"t0",10);case 10:if(l=e.t0,"break"!==l){e.next=13;break}return e.abrupt("break",15);case 13:e.next=8;break;case 15:this.fileUploadCompleted();case 16:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"unregisterEvents",value:function(){this.event.removeAllListeners()}},{key:"getNextChunkNumber",value:function(e){if(this.missingChunkNumbers.length>0){var t=this.missingChunkNumbers[0];if(-1===t){if(t=e+1,t>this.maxChunks)return!1;this.missingChunkNumbers.unshift(t)}return t}return!1}},{key:"removeChunkNumber",value:function(){if(this.missingChunkNumbers.length>0){var e=this.missingChunkNumbers[0];-1!==e&&this.missingChunkNumbers.splice(0,1)}}},{key:"maxChunks",get:function(){var e=1024*this.chunkSizeInMB*1024,t=this.file.size;return Math.ceil(t/e)}}]),e}(),ue=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100;Object(l["a"])(this,e),this.chunkSizeInMB=t,this.event=new le["EventEmitter"],this.fileUploaders=[],this.upload=null,this.trials=0}return Object(o["a"])(e,[{key:"addFiles",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(t){var a,n,i,s,l=this;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,se["a"].getSecuredFilenames(t.map((function(e){return e.name})));case 2:a=e.sent,n=Object(re["a"])(a);try{for(s=function(){var e=i.value,a=t.find((function(t){return t.name===e.original_name}));if(!a)throw new Error("File mapping error");var n=new ce(a,e.secured_name,l.chunkSizeInMB);n.onChunkComplete((function(){l.emitResume()})),l.fileUploaders.push(n)},n.s();!(i=n.n()).done;)s()}catch(r){n.e(r)}finally{n.f()}case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"removeFile",value:function(e){var t=this.fileUploaders.findIndex((function(t){return t.fileName===e}));-1!==t&&this.fileUploaders.splice(t,1)}},{key:"onError",value:function(e){this.event.on(ne.ERROR,e)}},{key:"onStartUpload",value:function(e){this.event.on(ne.START_UPLOAD,e)}},{key:"onResume",value:function(e){this.event.on(ne.RESUME_UPLOAD_AFTER_ERROR,e)}},{key:"onUploadComplete",value:function(e){this.event.on(ne.UPLOAD_COMPLETE,e)}},{key:"onUploadCanceled",value:function(e){this.event.on(ne.UPLOAD_CANCELED,e)}},{key:"getTrials",value:function(){return this.trials}},{key:"emitError",value:function(e){this.event.emit(ne.ERROR,e),this.trials+=1}},{key:"emitResume",value:function(){this.trials=0,this.event.emit(ne.RESUME_UPLOAD_AFTER_ERROR)}},{key:"emitCancel",value:function(){this.trials=0,this.event.emit(ne.UPLOAD_CANCELED)}},{key:"getCreateUploadFiles",value:function(){return this.fileUploaders.map((function(e){return{name:e.fileName,size:e.file.size}}))}},{key:"prepareFileUploaders",value:function(){var e=this;if(!this.upload)throw new Error("Upload is undefined. Missing upload object");var t,a=Object(re["a"])(this.fileUploaders);try{var n=function(){var a=t.value,n=e.upload.files.find((function(e){return e.name==a.fileName}));if(!n)throw new Error("File mapping error");a.uploadId=e.upload.upload_id,a.fileId=n.id,a.complete=n.complete,a.missingChunkNumbers=n.missing_chunks};for(a.s();!(t=a.n()).done;)n()}catch(i){a.e(i)}finally{a.f()}}},{key:"setUpload",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(t){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("string"!==typeof t){e.next=6;break}return e.next=3,se["a"].getUpload(t);case 3:this.upload=e.sent,e.next=7;break;case 6:this.upload=t;case 7:this.prepareFileUploaders();case 8:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"startUpload",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(){var t,a,n,i,s,l;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.upload){e.next=2;break}throw new Error("No upload created or resumed");case 2:if(0!==this.fileUploaders.length){e.next=4;break}throw new Error("No files to upload");case 4:if(!this.fileUploaders.find((function(e){return!e.fileId}))){e.next=6;break}throw new Error("Files not prepared for upload");case 6:if(t=this.getInvalidUploadFilesSelection(),!(t.missingFiles.length>0||t.unknownFiles.length>0)){e.next=9;break}throw new Error("Missing upload files or unknown upload files for resume upload");case 9:window.onbeforeunload=function(){return!0},this.event.emit(ne.START_UPLOAD);case 11:if(void 0===(a=this.fileUploaders.find((function(e){return!e.complete})))){e.next=53;break}return e.prev=12,e.next=15,this.tryUpload(a);case 15:e.next=51;break;case 17:e.prev=17,e.t0=e["catch"](12),n=3;case 20:if(!(n>0)){e.next=35;break}return e.prev=21,e.next=24,this.tryUpload(a);case 24:return e.abrupt("break",35);case 27:return e.prev=27,e.t1=e["catch"](21),n--,i=1e3*Math.abs(n-3),e.next=33,Object(oe["b"])(i);case 33:e.next=20;break;case 35:s=!0;case 36:if(!s||!this.upload){e.next=51;break}return e.prev=37,e.next=40,this.refreshUpload();case 40:s=!1,e.next=49;break;case 43:return e.prev=43,e.t2=e["catch"](37),this.emitError(e.t2),l=this.trials<100?1e4:6e4,e.next=49,Object(oe["b"])(l);case 49:e.next=36;break;case 51:e.next=11;break;case 53:window.onbeforeunload=null;case 54:case"end":return e.stop()}}),e,this,[[12,17],[21,27],[37,43]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"cancelUpload",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return window.onbeforeunload=null,e.next=3,se["a"].cancelUpload(this.upload.upload_id);case 3:this.reset(),this.emitCancel();case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getInvalidUploadFilesSelection",value:function(){var e=this;if(!this.upload)throw new Error("upload is undefined");var t={missingFiles:this.upload.files.filter((function(t){return!e.fileUploaders.find((function(e){return e.fileName===t.name}))})).map((function(e){return e.name})),unknownFiles:this.fileUploaders.filter((function(t){return!e.upload.files.find((function(e){return e.name===t.fileName}))})).map((function(e){return e.fileName}))};return t}},{key:"tryUpload",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(t){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.upload();case 3:this.isUploadComplete()&&(this.event.emit(ne.UPLOAD_COMPLETE),this.reset()),e.next=11;break;case 6:throw e.prev=6,e.t0=e["catch"](0),t.emitError(),this.emitError(e.t0),e.t0;case 11:case"end":return e.stop()}}),e,this,[[0,6]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"refreshUpload",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.upload){e.next=2;break}throw new Error("Upload is undefined");case 2:return e.next=4,this.setUpload(this.upload.upload_id);case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"isUploadComplete",value:function(){return!this.fileUploaders.find((function(e){return!e.complete}))}},{key:"reset",value:function(){this.upload=null;var e,t=Object(re["a"])(this.fileUploaders);try{for(t.s();!(e=t.n()).done;){var a=e.value;a.unregisterEvents()}}catch(n){t.e(n)}finally{t.f()}this.fileUploaders=[]}}]),e}(),pe=a(223),de=a(291),fe=a(292),he=function(e){Object(p["a"])(a,e);var t=Object(d["a"])(a);function a(e,n,i){var r;return Object(l["a"])(this,a),r=t.call(this,i),r.plantId=e,r.analysisId=n,r}return Object(o["a"])(a,[{key:"addFiles",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(t){var n,i,s,l,o,p,d,f,h;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["a"])(Object(u["a"])(a.prototype),"addFiles",this).call(this,t);case 2:if(this.analysisId){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,se["a"].getAnalysis(this.analysisId);case 6:if(n=e.sent,!n.files){e.next=15;break}for(i=[],s=0,l=Object.keys(n.files);s<l.length;s++)o=l[s],i=i.concat(n.files[o]);return e.next=12,se["a"].getAnalysisFiles(n.id,i);case 12:p=e.sent,d=Object(re["a"])(this.fileUploaders);try{for(d.s();!(f=d.n()).done;)h=f.value,p[h.fileName]&&(h.description=pe["i18n"].t("file-exists-and-overide").toString())}catch(r){d.e(r)}finally{d.f()}case 15:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"doUpload",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.analysisId){e.next=5;break}if(this.flownAt){e.next=3;break}throw{error:"INVALID_OR_MISSING_PARAMS",message:pe["i18n"].t("missing").toString()+" "+pe["i18n"].t("acquisition-date").toString()};case 3:if(this.plantId){e.next=5;break}throw{error:"INVALID_OR_MISSING_PARAMS",message:pe["i18n"].t("missing").toString()+" "+pe["i18n"].t("plant").toString()};case 5:return e.next=7,this.createAnalysisUpload();case 7:return this.analysisId&&de["a"].emit(this.analysisId,fe["a"].UPDATE_ANALYSIS),e.next=10,this.startUpload();case 10:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"setFlownAt",value:function(e){this.flownAt=e}},{key:"setAnalysisId",value:function(e){this.analysisId=e}},{key:"setPlantId",value:function(e){this.plantId=e}},{key:"createAnalysisUpload",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(){var t;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.upload){e.next=7;break}return e.next=3,se["a"].createAnalysisUpload({chunk_size_in_mb:this.chunkSizeInMB,files:this.getCreateUploadFiles(),analysis_id:this.analysisId,create_analysis:!this.analysisId&&{flown_at:this.flownAt,plant_id:this.plantId}||void 0});case 3:return t=e.sent,this.analysisId||(this.analysisId=t.analysis_id),e.next=7,this.setUpload(t);case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),a}(ue),ve=function(e,t,a,n){var i,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(f["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(s=(r<3?i(s):r>3?i(t,a,s):i(t,a))||s);return r>3&&s&&Object.defineProperty(t,a,s),s},be=function(e){Object(p["a"])(a,e);var t=Object(d["a"])(a);function a(){var e;return Object(l["a"])(this,a),e=t.apply(this,arguments),e.dataComplete=!1,e.hasPlantMetadata=!1,e.uploaderService=null,e.gotoNewAnalysis=null,e.appContentEventId="newAnalysis",e}return Object(o["a"])(a,[{key:"created",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(){var t;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["a"])(Object(u["a"])(a.prototype),"created",this).call(this);case 2:this.uploaderService=new he(this.plantId||void 0,null===(t=this.analysis)||void 0===t?void 0:t.id),this.dataComplete=!!this.analysis&&this.analysis.data_complete,this.hasPlantMetadata=this.analysis&&this.analysis.has_plant_metadata||!1,this.analysis&&(this.appContentEventId=this.analysis.id),this.registerUploadEvents();case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onAnalysisChanged",value:function(){this.dataComplete=!!this.analysis&&this.analysis.data_complete,this.hasPlantMetadata=this.analysis&&this.analysis.has_plant_metadata||!1}},{key:"onPlantIdChanged",value:function(){this.plantId&&this.uploaderService.setPlantId(this.plantId)}},{key:"onFlownAtChanged",value:function(){this.flownAt&&this.uploaderService.setFlownAt(this.flownAt)}},{key:"registerUploadEvents",value:function(){var e=this;this.uploaderService.onStartUpload(Object(s["a"])(Object(r["a"])().mark((function t(){var a;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.t0=e.analysis,t.t0){t.next=5;break}return t.next=4,se["a"].getAnalysis(e.uploaderService.analysisId);case 4:t.t0=t.sent;case 5:a=t.t0,e.hasPlantMetadata=a.has_plant_metadata||!1;case 7:case"end":return t.stop()}}),t)})))),this.uploaderService.onUploadComplete(Object(s["a"])(Object(r["a"])().mark((function t(){var a;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,se["a"].getAnalysis(e.uploaderService.analysisId);case 2:a=t.sent,a.has_plant_metadata&&a.data_complete&&v["a"].showInfo(e.appContentEventId,e.$t("analysis-with-metdata-data-complete_quest").toString()),e.hasPlantMetadata=a.has_plant_metadata||!1,e.analysis||(e.gotoNewAnalysis=a);case 6:case"end":return t.stop()}}),t)})))),this.uploaderService.onUploadCanceled(Object(s["a"])(Object(r["a"])().mark((function t(){return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.analysis){t.next=4;break}return t.next=3,se["a"].getAnalysis(e.uploaderService.analysisId);case 3:e.gotoNewAnalysis=t.sent;case 4:case"end":return t.stop()}}),t)}))))}},{key:"dataCompleteMetadataExpl",get:function(){return!this.hasPlantMetadata&&this.$t("missing-plant-metadata").toString()||this.$t("data-complete_expl").toString()}},{key:"onChangeDataComplete",value:function(){var e=Object(s["a"])(Object(r["a"])().mark((function e(){var t;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,se["a"].getAnalysis(this.uploaderService.analysisId);case 2:if(t=e.sent,!t.plant.in_setup_phase||!this.dataComplete){e.next=7;break}if(confirm(this.$t("data-complete-sure-quest").toString())){e.next=7;break}return this.dataComplete=!1,e.abrupt("return");case 7:return e.next=9,se["a"].updateAnalysis(t.id,{data_complete:this.dataComplete});case 9:de["a"].emit(t.id,fe["a"].UPDATE_ANALYSIS);case 10:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onGotoNewAnalysisClick",value:function(){this.$router.push({name:"EditAnalysis",params:{id:this.gotoNewAnalysis.id}})}}]),a}(W["a"]);ve([Object(g["b"])({default:null})],be.prototype,"plantId",void 0),ve([Object(g["b"])({default:null})],be.prototype,"flownAt",void 0),ve([Object(g["b"])({default:null})],be.prototype,"analysis",void 0),ve([Object(g["d"])("analysis")],be.prototype,"onAnalysisChanged",null),ve([Object(g["d"])("plantId")],be.prototype,"onPlantIdChanged",null),ve([Object(g["d"])("flownAt")],be.prototype,"onFlownAtChanged",null),ve([Object(Q["a"])()],be.prototype,"onChangeDataComplete",null),ve([Object(Q["a"])()],be.prototype,"onGotoNewAnalysisClick",null),be=ve([Object(g["a"])({name:"app-analysis-uploader",components:{AppContent:b["a"],AppUploader:ie,AppButton:h["a"],AppExplanation:m["a"]}})],be);var me=be,ye=me,Oe=Object(x["a"])(ye,n,i,!1,null,null,null);Oe.options.__file="src/app/analysis/shared/analysis-uploader.vue";t["a"]=Oe.exports},413:function(e,t,a){"use strict";a(332)},414:function(e,t,a){"use strict";a(333)},415:function(e,t,a){"use strict";a(334)}}]);