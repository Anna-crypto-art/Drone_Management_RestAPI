(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{253:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));a(26),a(265),a(61);var i=a(97);function n(e,t){while(!Object.prototype.hasOwnProperty.call(e,t))if(e=Object(i["a"])(e),null===e)break;return e}function s(){return s="undefined"!==typeof Reflect&&Reflect.get?Reflect.get:function(e,t,a){var i=n(e,t);if(i){var s=Object.getOwnPropertyDescriptor(i,t);return s.get?s.get.call(arguments.length<3?e:a):s.value}},s.apply(this,arguments)}},265:function(e,t,a){var i=a(18),n=a(29),s=a(34),r=a(35),o=a(56),l=a(99);function c(e,t){var a,i,u=arguments.length<3?e:arguments[2];return s(e)===u?e[t]:(a=o.f(e,t))?r(a,"value")?a.value:void 0===a.get?void 0:a.get.call(u):n(i=l(e))?c(i,t,u):void 0}i({target:"Reflect",stat:!0},{get:c})},266:function(e,t,a){},267:function(e,t,a){},269:function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return n})),function(e){e["UPLOADING"]="UPLOADING",e["UPLOAD_FAILED"]="UPLOAD_FAILED",e["PICK_ME_UP"]="PICK_ME_UP",e["PROCESSING"]="PROCESSING",e["PROCESS_FAILED"]="PROCESS_FAILED",e["ABANDONED"]="ABANDONED",e["FINISHED"]="FINISHED"}(i||(i={}));var n={UPLOADING:[i.PICK_ME_UP,i.UPLOAD_FAILED,i.ABANDONED],UPLOAD_FAILED:[i.UPLOADING,i.ABANDONED,i.PICK_ME_UP],PICK_ME_UP:[i.PROCESSING,i.ABANDONED],PROCESSING:[i.FINISHED,i.ABANDONED,i.PROCESS_FAILED],PROCESS_FAILED:[i.PROCESSING,i.ABANDONED],ABANDONED:[],FINISHED:[]}},271:function(e,t,a){var i=a(29),n=a(53),s=a(22),r=s("match");e.exports=function(e){var t;return i(e)&&(void 0!==(t=e[r])?!!t:"RegExp"==n(e))}},272:function(e,t,a){"use strict";a(266)},273:function(e,t,a){"use strict";a(267)},274:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var i="new-analysis-storage-key"},278:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-file-upload"},[a("div",{staticClass:"app-file-upload-dropzone",attrs:{id:"file-upload-dropzone-id"}},[a("div",{staticClass:"app-file-upload-dropzone-content"},[e.title?a("h3",{staticClass:"app-file-upload-dropzone-content-title"},[e._v(e._s(e.title))]):e._e(),e._t("default")],2),a("div",{staticClass:"app-file-upload-dropzone-browsebutton"},[a("b-button",{attrs:{variant:"primary",id:"file-upload-browsebutton-id"}},[e._v(e._s(e.$t("browse...")))])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.keyResumFiles>0,expression:"keyResumFiles > 0"}],key:e.keyResumFiles,staticClass:"app-file-upload-dropzone-files",staticStyle:{"margin-top":"30px"}},e._l(e.files,(function(t){return a("app-file-upload-file",{key:t.uniqueIdentifier,ref:"uploadFiles",refInFor:!0,attrs:{uploading:e.uploading,file:t}})})),1)])])},n=[];i._withStripped=!0;var s=a(24),r=a(25),o=a(31),l=a(30),c=a(40),u=(a(61),a(26),a(125),a(15)),p=a(33),d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-file-upload-file"},[a("div",{staticClass:"app-file-upload-file-infos"},[a("div",{staticClass:"app-file-upload-file-name"},[a("small",{staticClass:"app-file-upload-file-name-size grayed"},[e._v(e._s(e.getFileSize(e.file.size)))]),e._v(" "+e._s(e.file.fileName)+" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.error,expression:"error"}],staticClass:"app-file-upload-file-name-error",class:{"text-danger":!e.retry}},[e._v(" "+e._s(e.retry&&e.$t("retrying...")||e.error)+" ")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.uploading,expression:"!uploading"}],staticClass:"app-file-upload-file-remove",on:{click:e.onFileRemove}},[a("b-icon",{attrs:{icon:"x"}})],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.uploading,expression:"uploading"}],staticClass:"app-file-upload-file-progress"},[a("span",{directives:[{name:"show",rawName:"v-show",value:!e.success,expression:"!success"}]},[e._v(e._s(e.progress)+"%")]),a("b-icon",{directives:[{name:"show",rawName:"v-show",value:e.success,expression:"success"}],staticClass:"text-success",attrs:{icon:"check2"}})],1)]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.uploading,expression:"uploading"}],ref:"uploadProgressBar",staticClass:"app-file-upload-file-progressbar"})])},h=[];d._withStripped=!0;a(124);var f=a(49),v=a(259),y=function(e,t,a,i){var n,s=arguments.length,r=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,a,i);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(r=(s<3?n(r):s>3?n(t,a,r):n(t,a))||r);return s>3&&r&&Object.defineProperty(t,a,r),r},g=function(e){Object(o["a"])(a,e);var t=Object(l["a"])(a);function a(){var e;return Object(s["a"])(this,a),e=t.apply(this,arguments),e.progress=0,e.error="",e.retry=!1,e.success=!1,e}return Object(r["a"])(a,[{key:"created",value:function(){this.uploading&&(this.emitProgress(),100===this.progress&&this.emitSuccess())}},{key:"uniqueIdentifier",get:function(){return this.file.uniqueIdentifier}},{key:"getFileSize",value:function(e){var t=["KB","MB","GB","TB"],a=0;do{e/=1024}while(e>1024&&++a<t.length);return"".concat(Math.round(e)," ").concat(t[a])}},{key:"onFileRemove",value:function(){this.file.cancel(),v["a"].emitFileRemoved(this.file)}},{key:"emitError",value:function(e){try{var t=JSON.parse(e);t.error&&(this.error=t.error)}catch(a){console.error(e),this.error=f["a"].SOMETHING_WENT_WRONG}this.success=!1,this.retry=!1}},{key:"emitRetry",value:function(){this.success=!1,this.retry=!0}},{key:"emitProgress",value:function(){var e=Math.round(100*this.file.progress(!1));e!==this.progress&&(this.progress=e,this.error="",this.retry=!1,this.uploadProgressBar&&(this.uploadProgressBar.style.width=this.progress+"%"))}},{key:"emitSuccess",value:function(){this.error="",this.retry=!1,this.progress=0,this.success=!0,this.uploadProgressBar&&(this.uploadProgressBar.style.display="none")}}]),a}(u["default"]);y([Object(p["b"])({required:!0})],g.prototype,"file",void 0),y([Object(p["b"])({required:!0})],g.prototype,"uploading",void 0),y([Object(p["c"])()],g.prototype,"uploadProgressBar",void 0),g=y([Object(p["a"])({name:"app-file-upload-file"})],g);var m=g,b=m,w=(a(272),a(39)),k=Object(w["a"])(b,d,h,!1,null,null,null);k.options.__file="src/app/shared/components/app-file-upload/app-file-upload-file.vue";var O=k.exports,F=a(261),_=function(e,t,a,i){var n,s=arguments.length,r=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,a,i);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(r=(s<3?n(r):s>3?n(t,a,r):n(t,a))||r);return s>3&&r&&Object.defineProperty(t,a,r),r},E=function(e){Object(o["a"])(a,e);var t=Object(l["a"])(a);function a(){var e;return Object(s["a"])(this,a),e=t.apply(this,arguments),e.keyResumFiles=0,e.uploading=!1,e}return Object(r["a"])(a,[{key:"mounted",value:function(){this.checkUploadState(),this.registerUploadEvents()}},{key:"checkUploadState",value:function(){v["a"].hasState(F["b"].UPLOADING)?(this.uploading=!0,this.keyResumFiles=v["a"].files.length):v["a"].init("file-upload-dropzone-id","file-upload-browsebutton-id")}},{key:"registerUploadEvents",value:function(){var e=this;v["a"].on(F["a"].FILE_SUCCESS,(function(t){var a=e.getFileUploadFile(t);a&&a.emitSuccess()})),v["a"].on(F["a"].FILE_ERROR,(function(t,a){var i=e.getFileUploadFile(t);i&&i.emitError(a)})),v["a"].on(F["a"].FILE_PROGRESS,(function(t){var a=e.getFileUploadFile(t);a&&a.emitProgress()})),v["a"].on(F["a"].FILE_RETRY,(function(t,a){var i=e.getFileUploadFile(t);i&&i.emitRetry()})),v["a"].on(F["a"].FILE_ADDED,(function(t){e.keyResumFiles+=1})),v["a"].on(F["a"].FILE_REMOVED,(function(t){e.keyResumFiles-=1}))}},{key:"upload",value:function(e,t){this.uploading=!0,this.keyResumFiles+=100,v["a"].upload(e,t)}},{key:"files",get:function(){return v["a"].files}},{key:"cancel",value:function(){v["a"].cancel(),this.uploading=!1,this.keyResumFiles-=100}},{key:"getFileUploadFile",value:function(e){return this.uploadFiles.find((function(t){return t.uniqueIdentifier===e.uniqueIdentifier}))}}]),a}(u["default"]);_([Object(p["c"])()],E.prototype,"uploadFiles",void 0),_([Object(p["b"])()],E.prototype,"title",void 0),E=_([Object(p["a"])({name:"app-file-upload",components:{AppFileUploadFile:O}})],E);var I=E,A=I,R=(a(273),Object(w["a"])(A,i,n,!1,null,null,null));R.options.__file="src/app/shared/components/app-file-upload/app-file-upload.vue";t["a"]=R.exports},281:function(e,t,a){},282:function(e,t,a){},315:function(e,t,a){"use strict";var i=a(186),n=a(271),s=a(34),r=a(77),o=a(131),l=a(188),c=a(47),u=a(187),p=a(104),d=a(20),h=[].push,f=Math.min,v=4294967295,y=!d((function(){return!RegExp(v,"y")}));i("split",2,(function(e,t,a){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,a){var i=String(r(this)),s=void 0===a?v:a>>>0;if(0===s)return[];if(void 0===e)return[i];if(!n(e))return t.call(i,e,s);var o,l,c,u=[],d=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),f=0,y=new RegExp(e.source,d+"g");while(o=p.call(y,i)){if(l=y.lastIndex,l>f&&(u.push(i.slice(f,o.index)),o.length>1&&o.index<i.length&&h.apply(u,o.slice(1)),c=o[0].length,f=l,u.length>=s))break;y.lastIndex===o.index&&y.lastIndex++}return f===i.length?!c&&y.test("")||u.push(""):u.push(i.slice(f)),u.length>s?u.slice(0,s):u}:"0".split(void 0,0).length?function(e,a){return void 0===e&&0===a?[]:t.call(this,e,a)}:t,[function(t,a){var n=r(this),s=void 0==t?void 0:t[e];return void 0!==s?s.call(t,n,a):i.call(String(n),t,a)},function(e,n){var r=a(i,e,this,n,i!==t);if(r.done)return r.value;var p=s(e),d=String(this),h=o(p,RegExp),g=p.unicode,m=(p.ignoreCase?"i":"")+(p.multiline?"m":"")+(p.unicode?"u":"")+(y?"y":"g"),b=new h(y?p:"^(?:"+p.source+")",m),w=void 0===n?v:n>>>0;if(0===w)return[];if(0===d.length)return null===u(b,d)?[d]:[];var k=0,O=0,F=[];while(O<d.length){b.lastIndex=y?O:0;var _,E=u(b,y?d:d.slice(O));if(null===E||(_=f(c(b.lastIndex+(y?0:O)),d.length))===k)O=l(d,O,g);else{if(F.push(d.slice(k,O)),F.length===w)return F;for(var I=1;I<=E.length-1;I++)if(F.push(E[I]),F.length===w)return F;O=k=_}}return F.push(d.slice(k)),F}]}),!y)},316:function(e,t,a){"use strict";a(281)},317:function(e,t,a){"use strict";a(282)},348:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("app-content",{attrs:{title:e.$t("new-data-upload"),navback:!0,subtitle:e.$t("create-new-analysis_descr")}},[a("div",{staticClass:"app-new-analysis"},[a("b-form",{staticStyle:{"margin-bottom":"50px"},on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[a("b-row",{staticStyle:{"margin-bottom":"25px"}},[a("b-col",{attrs:{sm:"4"}},[a("b-form-group",{attrs:{"label-cols":"auto",label:e.$t("plant")}},[a("b-form-select",{attrs:{required:"",options:e.plantOptions},model:{value:e.newAnalysis.plant_id,callback:function(t){e.$set(e.newAnalysis,"plant_id",t)},expression:"newAnalysis.plant_id"}})],1)],1)],1),a("app-file-upload",{ref:"appFileUpload",attrs:{title:e.$t("upload-your-files")}},[a("app-checklist",[a("app-checklist-item",{attrs:{checked:e.checkListItems.videoFiles}},[e._v(e._s(e.$t("video-files_descr")))]),a("app-checklist-item",{attrs:{checked:e.checkListItems.droneMetaFile}},[e._v(e._s(e.$t("drone-metadata-file_descr")))]),a("app-checklist-item",{attrs:{checked:e.checkListItems.plantMetaFile}},[e._v(e._s(e.$t("plant-metadata-file_descr")))])],1)],1),a("app-button",{ref:"uploadButton",attrs:{type:"submit",cls:"pull-right"}},[e._v(e._s(e.uploadButtonTxt))]),a("app-button",{directives:[{name:"show",rawName:"v-show",value:e.showCancelButton,expression:"showCancelButton"}],ref:"cancelUploadButton",attrs:{variant:"secondary",type:"button"},on:{click:e.onCancelUpload}},[e._v(e._s(e.$t("cancel")))]),a("div",{staticClass:"clearfix"})],1)],1)])},n=[];i._withStripped=!0;var s=a(76),r=a(16),o=a(24),l=a(25),c=a(253),u=a(97),p=a(31),d=a(30),h=a(40),f=(a(62),a(61),a(26),a(243),a(96),a(95),a(124),a(129),a(183),a(125),a(78),a(315),a(33)),v=a(75),y=a(79),g=a(63),m=a(74),b=a(278),w=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",{staticClass:"app-checklist"},[e._t("default")],2)},k=[];w._withStripped=!0;var O=a(15),F=function(e,t,a,i){var n,s=arguments.length,r=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"===("undefined"===typeof Reflect?"undefined":Object(h["a"])(Reflect))&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,a,i);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(r=(s<3?n(r):s>3?n(t,a,r):n(t,a))||r);return s>3&&r&&Object.defineProperty(t,a,r),r},_=function(e){Object(p["a"])(a,e);var t=Object(d["a"])(a);function a(){return Object(o["a"])(this,a),t.apply(this,arguments)}return Object(l["a"])(a)}(O["default"]);_=F([Object(f["a"])({name:"app-checklist"})],_);var E=_,I=E,A=(a(316),a(39)),R=Object(A["a"])(I,w,k,!1,null,null,null);R.options.__file="src/app/shared/components/app-checklist/app-checklist.vue";var j=R.exports,S=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",{staticClass:"app-checklist-item",class:{grayed:e.checked}},[a("b-icon",{directives:[{name:"show",rawName:"v-show",value:e.checked,expression:"checked"}],staticClass:"app-checklist-item-symbol",attrs:{icon:"check2"}}),a("span",{directives:[{name:"show",rawName:"v-show",value:!e.checked,expression:"!checked"}],staticClass:"app-checklist-item-symbol"},[e._v("·")]),e._t("default")],2)},x=[];S._withStripped=!0;var D=function(e,t,a,i){var n,s=arguments.length,r=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"===("undefined"===typeof Reflect?"undefined":Object(h["a"])(Reflect))&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,a,i);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(r=(s<3?n(r):s>3?n(t,a,r):n(t,a))||r);return s>3&&r&&Object.defineProperty(t,a,r),r},C=function(e){Object(p["a"])(a,e);var t=Object(d["a"])(a);function a(){return Object(o["a"])(this,a),t.apply(this,arguments)}return Object(l["a"])(a)}(O["default"]);D([Object(f["b"])({default:!1})],C.prototype,"checked",void 0),C=D([Object(f["a"])({name:"app-checklist-item"})],C);var L=C,P=L,U=(a(317),Object(A["a"])(P,S,x,!1,null,null,null));U.options.__file="src/app/shared/components/app-checklist/app-checklist-item.vue";var N=U.exports,B=a(246),M=a(269),$=a(259),G=a(261),K=a(274),T=a(119),z=function(e,t,a,i){var n,s=arguments.length,r=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"===("undefined"===typeof Reflect?"undefined":Object(h["a"])(Reflect))&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,a,i);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(r=(s<3?n(r):s>3?n(t,a,r):n(t,a))||r);return s>3&&r&&Object.defineProperty(t,a,r),r},q=function(e){Object(p["a"])(a,e);var t=Object(d["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.uploadButtonTxt="",e.showCancelButton=!1,e.plantOptions=[],e.newAnalysis={files:[],plant_id:""},e.checkListItems={videoFiles:!1,droneMetaFile:!1,plantMetaFile:!1},e.storageKey=K["a"],e}return Object(l["a"])(a,[{key:"mounted",value:function(){this.registerUploadEvents()}},{key:"created",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["a"])(Object(u["a"])(a.prototype),"created",this).call(this);case 2:return this.uploadButtonTxt=this.$t("upload").toString(),e.prev=3,e.next=6,m["a"].getAllPlants();case 6:t=e.sent,this.plantOptions=t.map((function(e){return{value:e.id,text:e.name}})),1===t.length&&(this.newAnalysis.plant_id=t[0].id),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](3),g["a"].showError(e.t0);case 14:i=this.fetchData(),i&&(this.analysis=i.analysis,this.newAnalysis=i.newAnalysis,this.waitForFiles=i.fileNames);case 16:case"end":return e.stop()}}),e,this,[[3,11]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"updated",value:function(){this.checkUploadState()}},{key:"registerUploadEvents",value:function(){var e=this;$["a"].on(G["a"].COMPLETED,function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m["a"].updateAnalysisState(a.id,{state:M["b"].PICK_ME_UP});case 3:T["a"].removeItem(K["a"]),g["a"].showSuccessAlert(e.$t("upload-completed-successfully").toString()),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),g["a"].showError(t.t0);case 10:e.isCreated&&(e.uploadButton.stopLoading(),e.uploadButton.disable(),e.analysis=void 0,e.showCancelButton=!1);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()),$["a"].on(G["a"].FAILED,function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return g["a"].showErrorAlert(e.$t(M["b"].UPLOAD_FAILED).toString()),console.error(a),t.prev=2,t.next=5,m["a"].updateAnalysisState($["a"].getMetadata().id,{state:M["b"].UPLOAD_FAILED,message:a});case 5:t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](2),console.error(t.t0);case 10:e.isCreated&&e.onFailed();case 11:case"end":return t.stop()}}),t,null,[[2,7]])})));return function(e){return t.apply(this,arguments)}}()),$["a"].on(G["a"].FILE_RETRY,(function(t,a){g["a"].showWarningAlert("".concat(e.$t("upload-error-retry").toString()," ").concat(a,"/").concat($["a"].getMaxRetries()),"resumable-upload-error-retry")})),$["a"].on(G["a"].FILE_ADDED,(function(t){e.isCreated&&e.checkFileCompleteness()})),$["a"].on(G["a"].FILE_REMOVED,(function(t){e.isCreated&&e.checkFileCompleteness()}))}},{key:"checkUploadState",value:function(){$["a"].hasState(G["b"].UPLOADING)?this.uploadButton.startLoading():$["a"].hasState(G["b"].FAILED)?this.onFailed():this.analysis&&this.waitForFiles&&(this.checkFileCompleteness(),this.waitForFiles.length>0&&(g["a"].showInfoAlert(this.$t("need-files-to-upload_descr").toString()+'<ul style="margin: 5px 0 0 40px;"><li>'+this.waitForFiles.join("</li><li>")+"</li></ul>"),this.uploadButtonTxt=this.$t("resume-upload").toString(),this.uploadButton.disable(),this.showCancelButton=!0))}},{key:"fetchData",value:function(){return T["a"].getItem(this.storageKey)}},{key:"storeData",value:function(){var e=this.getStorageData();e?T["a"].setItem(this.storageKey,e):T["a"].removeItem(this.storageKey)}},{key:"getStorageData",value:function(){return this.analysis&&{newAnalysis:{files:[],plant_id:this.newAnalysis.plant_id},analysis:this.analysis,fileNames:this.appFileUpload.files.map((function(e){return e.fileName}))}||void 0}},{key:"checkFileCompleteness",value:function(){var e=this;if(this.waitForFiles&&(this.waitForFiles=this.waitForFiles.filter((function(t){return!e.appFileUpload.files.find((function(e){return e.fileName===t}))})),0===this.waitForFiles.length&&(this.waitForFiles=void 0,g["a"].clearAlert(),this.uploadButton.enable())),this.checkListItems.droneMetaFile=!1,this.checkListItems.videoFiles=!1,this.checkListItems.plantMetaFile=!1,this.appFileUpload){this.newAnalysis.files=this.appFileUpload.files.map((function(e){return e.fileName}));var t,a=Object(s["a"])(this.newAnalysis.files);try{for(a.s();!(t=a.n()).done;){var i=t.value,n=(i.split(".").pop()||"").toLowerCase();"mp4"===n||"mov"==n?this.checkListItems.videoFiles=!0:"srt"===n?this.checkListItems.droneMetaFile=!0:"xslx"!==n&&"mdb"!==n||(this.checkListItems.plantMetaFile=!0)}}catch(r){a.e(r)}finally{a.f()}}}},{key:"onSubmit",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!$["a"].hasState(G["b"].FAILED)){e.next=3;break}return this.$router.go(0),e.abrupt("return");case 3:if(this.checkFileCompleteness(),this.checkListItems.droneMetaFile&&this.checkListItems.videoFiles){e.next=8;break}return g["a"].showErrorAlert("MISSING_FILES"),this.uploadButton.stopLoading(),e.abrupt("return");case 8:if(e.prev=8,this.onUploading(),this.analysis){e.next=14;break}return e.next=13,m["a"].createAnalysis(this.newAnalysis);case 13:this.analysis=e.sent;case 14:this.storeData(),this.appFileUpload.upload(m["a"].getAnalysisFileUploadUrl(this.analysis.id),{id:this.analysis.id}),e.next=22;break;case 18:e.prev=18,e.t0=e["catch"](8),g["a"].showError(e.t0),this.uploadButton.stopLoading();case 22:case"end":return e.stop()}}),e,this,[[8,18]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onFailed",value:function(){this.uploadButton.stopLoading(),this.uploadButtonTxt=this.$t("retry-upload").toString(),this.showCancelButton=!0}},{key:"onUploading",value:function(){this.uploadButton.startLoading(),this.showCancelButton=!1}},{key:"onCancelUpload",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.analysis){e.next=2;break}return e.abrupt("return");case 2:return this.cancelUploadButton.startLoading(),this.appFileUpload.cancel(),T["a"].removeItem(this.storageKey),this.uploadButton.stopLoading(),this.uploadButton.enable(),this.uploadButtonTxt=this.$t("upload").toString(),g["a"].clearAlert(),e.prev=9,e.next=12,m["a"].cancelAnalysisUpload(this.analysis.id);case 12:e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](9),console.error(e.t0);case 17:return e.prev=17,this.analysis=void 0,this.checkFileCompleteness(),this.cancelUploadButton.stopLoading(),this.showCancelButton=!1,this.$router.go(0),e.finish(17);case 24:case"end":return e.stop()}}),e,this,[[9,14,17,24]])})));function t(){return e.apply(this,arguments)}return t}()}]),a}(v["a"]);z([Object(f["c"])()],q.prototype,"appFileUpload",void 0),z([Object(f["c"])()],q.prototype,"uploadButton",void 0),z([Object(f["c"])()],q.prototype,"cancelUploadButton",void 0),q=z([Object(f["a"])({name:"app-new-analysis",components:{AppContent:y["a"],AppFileUpload:b["a"],AppChecklist:j,AppChecklistItem:N,AppButton:B["a"]}})],q);var H=q,J=H,W=Object(A["a"])(J,i,n,!1,null,null,null);W.options.__file="src/app/analysis/new-analysis/new-analysis.vue";t["default"]=W.exports}}]);