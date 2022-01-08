(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[0],{242:function(e,t,n){"use strict";var i=n(46),r=n(33),a=n(21),s=n(185),o="toString",u=RegExp.prototype,l=u[o],f=a((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),c=l.name!=o;(f||c)&&i(RegExp.prototype,o,(function(){var e=r(this),t=String(e.source),n=e.flags,i=String(void 0===n&&e instanceof RegExp&&!("flags"in u)?s.call(e):n);return"/"+t+"/"+i}),{unsafe:!0})},243:function(e,t,n){},244:function(e,t,n){"use strict";var i,r=n(24),a=n(25),s=n(29),o=n(28),u=n(15);(function(e){e["stopLoading"]="stop-loading",e["startLoading"]="start-loading"})(i||(i={}));var l=function(e){Object(s["a"])(n,e);var t=Object(o["a"])(n);function n(){return Object(r["a"])(this,n),t.apply(this,arguments)}return Object(a["a"])(n,[{key:"onStopLoading",value:function(e){this.$on(i.stopLoading,e)}},{key:"onStartLoading",value:function(e){this.$on(i.startLoading,e)}},{key:"stopLoading",value:function(){this.$emit(i.stopLoading)}},{key:"startLoading",value:function(){this.$emit(i.startLoading)}}]),n}(u["default"]),f=new l;t["a"]=f},245:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-button",{class:e.cls,attrs:{variant:e.variant,type:e.type,disabled:e.isDisabled},on:{click:e.onClick}},[n("span",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"app-button-loading"},[n("b-spinner",{attrs:{small:""}})],1),e._t("default")],2)},r=[];i._withStripped=!0;var a=n(24),s=n(25),o=n(29),u=n(28),l=n(45),f=(n(61),n(15)),c=n(32),p=n(244),h=function(e,t,n,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===("undefined"===typeof Reflect?"undefined":Object(l["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a<3?r(s):a>3?r(t,n,s):r(t,n))||s);return a>3&&s&&Object.defineProperty(t,n,s),s},d=function(e){Object(o["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(a["a"])(this,n),e=t.apply(this,arguments),e.loading=!1,e.disabled=!1,e}return Object(s["a"])(n,[{key:"created",value:function(){var e=this;p["a"].onStopLoading((function(){e.stopLoading()})),p["a"].onStartLoading((function(){e.startLoading()}))}},{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"stopLoading",value:function(){this.loading=!1}},{key:"startLoading",value:function(){this.loading=!0}},{key:"disable",value:function(){this.disabled=!0}},{key:"enable",value:function(){this.disabled=!1}},{key:"onClick",value:function(e){this.$emit("click",e)}}]),n}(f["default"]);h([Object(c["b"])({default:"button"})],d.prototype,"type",void 0),h([Object(c["b"])({default:""})],d.prototype,"cls",void 0),h([Object(c["b"])({default:"primary"})],d.prototype,"variant",void 0),d=h([Object(c["a"])({name:"app-button"})],d);var m=d,g=m,b=(n(246),n(39)),v=Object(b["a"])(g,i,r,!1,null,null,null);v.options.__file="src/app/shared/components/app-button/app-button.vue";t["a"]=v.exports},246:function(e,t,n){"use strict";n(243)},263:function(e,t,n){"use strict";var i,r;n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return r})),function(e){e["UNPREPARED"]="UNPREPARED",e["INITIALIZED"]="INITIALIZED",e["UPLOADING"]="UPLOADING",e["FINISHED"]="FINISHED",e["FAILED"]="FAILED",e["RETRYING"]="RETRYING"}(i||(i={})),function(e){e["FILE_SUCCESS"]="fileSuccess",e["FILE_PROGRESS"]="fileProgress",e["FILE_ERROR"]="fileError",e["FILE_RETRY"]="fileRetry",e["FILE_ADDED"]="fileAdded",e["FILE_REMOVED"]="fileRemoved",e["PROGRESS"]="progress",e["FAILED"]="failed",e["COMPLETED"]="completed"}(r||(r={}))},264:function(e,t,n){"use strict";var i=n(24),r=n(25),a=(n(184),n(304)),s=n.n(a),o=n(263),u=n(27),l=n(64),f=n(29),c=n(28),p=(n(122),n(15)),h=function(e){Object(f["a"])(n,e);var t=Object(c["a"])(n);function n(){return Object(i["a"])(this,n),t.apply(this,arguments)}return Object(r["a"])(n,[{key:"emit",value:function(e,t){this.$emit.apply(this,[e].concat(Object(l["a"])(t)))}},{key:"on",value:function(e,t){this.$on(e,t)}}]),n}(p["default"]),d=new h,m=d,g=function(){function e(){Object(i["a"])(this,e),this.maxRetries=5,this.chunkRetryInterval=3e3,this.failedTimeoutInterval=4e3,this.state=o["b"].UNPREPARED,this.retries=0,this.currentProgress=0,this.eventsRegistered=!1,this.resumable=new s.a({chunkSize:10485760,chunkRetryInterval:this.chunkRetryInterval,simultaneousUploads:1,maxChunkRetries:this.maxRetries})}return Object(r["a"])(e,[{key:"init",value:function(e,t){this.checkState([o["b"].UNPREPARED,o["b"].INITIALIZED,o["b"].FINISHED]),this.initValues(),this.registerEvents();var n=document.getElementById(e);if(!n)throw new Error("No HTML-Element found with id='".concat(e,"'"));if(this.resumable.assignDrop(n),t){var i=document.getElementById(t);if(!i)throw new Error("No HTML-Element found with id='".concat(t,"'"));this.resumable.assignBrowse(i,!1)}this.state=o["b"].INITIALIZED}},{key:"reset",value:function(){this.checkState([o["b"].FINISHED]),this.initValues(),this.state=o["b"].INITIALIZED}},{key:"hasState",value:function(e){return this.state===e}},{key:"files",get:function(){return this.resumable.files}},{key:"cancel",value:function(){this.checkState([o["b"].FAILED,o["b"].UPLOADING,o["b"].INITIALIZED]),this.resumable.cancel(),this.state=o["b"].FINISHED,this.reset()}},{key:"progress",value:function(){return this.currentProgress}},{key:"upload",value:function(e,t){this.checkState([o["b"].INITIALIZED,o["b"].FAILED]),this.state=o["b"].UPLOADING,this.metadata=t,this.resumable.opts.target=e,this.resumable.upload()}},{key:"getMetadata",value:function(){return this.metadata}},{key:"on",value:function(e,t){m.on(e,t)}},{key:"emitFileRemoved",value:function(e){this.emit(o["a"].FILE_REMOVED,e)}},{key:"getMaxRetries",value:function(){return this.files.filter((function(e){return!e.isComplete()})).length*this.maxRetries}},{key:"emit",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];m.emit(e,n)}},{key:"initValues",value:function(){this.resumable.opts.headers={Authorization:"Bearer ".concat(u["a"].state.auth.token)},this.metadata=void 0,this.currentProgress=0}},{key:"checkState",value:function(e){if(Array.isArray(e)||(e=[e]),-1===e.indexOf(this.state))throw new Error("Invalid operation. Resumable is in state: "+this.state)}},{key:"onProgress",value:function(){var e=this.resumable.progress();this.currentProgress===e||this.hasState(o["b"].FINISHED)||(this.currentProgress=e,this.state=o["b"].UPLOADING,this.emit(o["a"].PROGRESS))}},{key:"onRetry",value:function(e){this.failedTimeout&&(clearTimeout(this.failedTimeout),this.failedTimeout=void 0),this.state=o["b"].RETRYING,this.emit(o["a"].FILE_RETRY,e,++this.retries)}},{key:"onFailed",value:function(e){this.state=o["b"].FAILED,this.emit(o["a"].FAILED,e)}},{key:"onCompleted",value:function(){this.failedTimeout||this.hasState(o["b"].FAILED)||(this.state=o["b"].FINISHED,this.resumable.cancel(),this.emit(o["a"].COMPLETED,this.metadata),this.reset())}},{key:"onFileSuccess",value:function(e){this.emit(o["a"].FILE_SUCCESS,e)}},{key:"onFileProgress",value:function(e){this.emit(o["a"].FILE_PROGRESS,e)}},{key:"onFileError",value:function(e,t){var n=this;this.failedTimeout=setTimeout((function(){n.onFailed(t)}),this.failedTimeoutInterval),this.emit(o["a"].FILE_ERROR,e,t)}},{key:"onFileAdded",value:function(e){this.emit(o["a"].FILE_ADDED,e)}},{key:"registerEvents",value:function(){var e=this;this.eventsRegistered||(this.resumable.on("fileSuccess",(function(t){e.onFileSuccess(t)})),this.resumable.on("fileProgress",(function(t){e.onFileProgress(t)})),this.resumable.on("fileError",(function(t,n){e.onFileError(t,n)})),this.resumable.on("fileRetry",(function(t){e.onRetry(t)})),this.resumable.on("fileAdded",(function(t){e.onFileAdded(t)})),this.resumable.on("progress",(function(){e.onProgress()})),this.resumable.on("complete",(function(){e.onCompleted()})),this.resumable.on("error",(function(t){e.onFailed(t)})),this.eventsRegistered=!0)}}]),e}(),b=new g;t["a"]=b},270:function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return r})),function(e){e["UPLOADING"]="UPLOADING",e["UPLOAD_FAILED"]="UPLOAD_FAILED",e["PICK_ME_UP"]="PICK_ME_UP",e["PROCESSING"]="PROCESSING",e["PROCESS_FAILED"]="PROCESS_FAILED",e["ABANDONED"]="ABANDONED",e["FINISHED"]="FINISHED"}(i||(i={}));var r={UPLOADING:[i.PICK_ME_UP,i.UPLOAD_FAILED,i.ABANDONED],UPLOAD_FAILED:[i.UPLOADING,i.ABANDONED,i.PICK_ME_UP],PICK_ME_UP:[i.PROCESSING,i.ABANDONED],PROCESSING:[i.FINISHED,i.ABANDONED,i.PROCESS_FAILED],PROCESS_FAILED:[i.PROCESSING,i.ABANDONED],ABANDONED:[],FINISHED:[]}},304:function(e,t,n){(function(){"use strict";var t=function(e){if(!(this instanceof t))return new t(e);if(this.version=1,this.support="undefined"!==typeof File&&"undefined"!==typeof Blob&&"undefined"!==typeof FileList&&(!!Blob.prototype.webkitSlice||!!Blob.prototype.mozSlice||!!Blob.prototype.slice||!1),!this.support)return!1;var n=this;n.files=[],n.defaults={chunkSize:1048576,forceChunkSize:!1,simultaneousUploads:3,fileParameterName:"file",chunkNumberParameterName:"resumableChunkNumber",chunkSizeParameterName:"resumableChunkSize",currentChunkSizeParameterName:"resumableCurrentChunkSize",totalSizeParameterName:"resumableTotalSize",typeParameterName:"resumableType",identifierParameterName:"resumableIdentifier",fileNameParameterName:"resumableFilename",relativePathParameterName:"resumableRelativePath",totalChunksParameterName:"resumableTotalChunks",throttleProgressCallbacks:.5,query:{},headers:{},preprocess:null,method:"multipart",uploadMethod:"POST",testMethod:"GET",prioritizeFirstAndLastChunk:!1,target:"/",testTarget:null,parameterNamespace:"",testChunks:!0,generateUniqueIdentifier:null,getTarget:null,maxChunkRetries:100,chunkRetryInterval:void 0,permanentErrors:[400,404,415,500,501],maxFiles:void 0,withCredentials:!1,xhrTimeout:0,clearInput:!0,chunkFormat:"blob",setChunkTypeFromFile:!1,maxFilesErrorCallback:function(e,t){var i=n.getOpt("maxFiles");alert("Please upload no more than "+i+" file"+(1===i?"":"s")+" at a time.")},minFileSize:1,minFileSizeErrorCallback:function(e,t){alert(e.fileName||e.name+" is too small, please upload files larger than "+i.formatSize(n.getOpt("minFileSize"))+".")},maxFileSize:void 0,maxFileSizeErrorCallback:function(e,t){alert(e.fileName||e.name+" is too large, please upload files less than "+i.formatSize(n.getOpt("maxFileSize"))+".")},fileType:[],fileTypeErrorCallback:function(e,t){alert(e.fileName||e.name+" has type not allowed, please upload files of type "+n.getOpt("fileType")+".")}},n.opts=e||{},n.getOpt=function(e){var n=this;if(e instanceof Array){var r={};return i.each(e,(function(e){r[e]=n.getOpt(e)})),r}if(n instanceof p){if("undefined"!==typeof n.opts[e])return n.opts[e];n=n.fileObj}if(n instanceof c){if("undefined"!==typeof n.opts[e])return n.opts[e];n=n.resumableObj}if(n instanceof t)return"undefined"!==typeof n.opts[e]?n.opts[e]:n.defaults[e]},n.events=[],n.on=function(e,t){n.events.push(e.toLowerCase(),t)},n.fire=function(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);var i=e[0].toLowerCase();for(t=0;t<=n.events.length;t+=2)n.events[t]==i&&n.events[t+1].apply(n,e.slice(1)),"catchall"==n.events[t]&&n.events[t+1].apply(null,e);"fileerror"==i&&n.fire("error",e[2],e[1]),"fileprogress"==i&&n.fire("progress")};var i={stopEvent:function(e){e.stopPropagation(),e.preventDefault()},each:function(e,t){if("undefined"!==typeof e.length){for(var n=0;n<e.length;n++)if(!1===t(e[n]))return}else for(n in e)if(!1===t(n,e[n]))return},generateUniqueIdentifier:function(e,t){var i=n.getOpt("generateUniqueIdentifier");if("function"===typeof i)return i(e,t);var r=e.webkitRelativePath||e.fileName||e.name,a=e.size;return a+"-"+r.replace(/[^0-9a-zA-Z_-]/gim,"")},contains:function(e,t){var n=!1;return i.each(e,(function(e){return e!=t||(n=!0,!1)})),n},formatSize:function(e){return e<1024?e+" bytes":e<1048576?(e/1024).toFixed(0)+" KB":e<1073741824?(e/1024/1024).toFixed(1)+" MB":(e/1024/1024/1024).toFixed(1)+" GB"},getTarget:function(e,t){var i=n.getOpt("target");if("test"===e&&n.getOpt("testTarget")&&(i="/"===n.getOpt("testTarget")?n.getOpt("target"):n.getOpt("testTarget")),"function"===typeof i)return i(t);var r=i.indexOf("?")<0?"?":"&",a=t.join("&");return i+r+a}},r=function(e){i.stopEvent(e),e.dataTransfer&&e.dataTransfer.items?l(e.dataTransfer.items,e):e.dataTransfer&&e.dataTransfer.files&&l(e.dataTransfer.files,e)},a=function(e){e.preventDefault()};function s(e,t,n,i){var r;return e.isFile?e.file((function(e){e.relativePath=t+e.name,n.push(e),i()})):(e.isDirectory?r=e:e instanceof File&&n.push(e),"function"===typeof e.webkitGetAsEntry&&(r=e.webkitGetAsEntry()),r&&r.isDirectory?u(r,t+r.name+"/",n,i):("function"===typeof e.getAsFile&&(e=e.getAsFile(),e instanceof File&&(e.relativePath=t+e.name,n.push(e))),void i()))}function o(e,t){if(!e||0===e.length)return t();e[0]((function(){o(e.slice(1),t)}))}function u(e,t,n,i){var r=e.createReader();r.readEntries((function(e){if(!e.length)return i();o(e.map((function(e){return s.bind(null,e,t,n)})),i)}))}function l(e,t){if(e.length){n.fire("beforeAdd");var i=[];o(Array.prototype.map.call(e,(function(e){return s.bind(null,e,"",i)})),(function(){i.length&&f(i,t)}))}}var f=function(e,t){var r=0,a=n.getOpt(["maxFiles","minFileSize","maxFileSize","maxFilesErrorCallback","minFileSizeErrorCallback","maxFileSizeErrorCallback","fileType","fileTypeErrorCallback"]);if("undefined"!==typeof a.maxFiles&&a.maxFiles<e.length+n.files.length){if(1!==a.maxFiles||1!==n.files.length||1!==e.length)return a.maxFilesErrorCallback(e,r++),!1;n.removeFile(n.files[0])}var s=[],o=[],u=e.length,l=function(){if(!--u){if(!s.length&&!o.length)return;window.setTimeout((function(){n.fire("filesAdded",s,o)}),0)}};i.each(e,(function(e){var u=e.name;if(a.fileType.length>0){var f=!1;for(var p in a.fileType){var h="."+a.fileType[p];if(-1!==u.toLowerCase().indexOf(h.toLowerCase(),u.length-h.length)){f=!0;break}}if(!f)return a.fileTypeErrorCallback(e,r++),!1}if("undefined"!==typeof a.minFileSize&&e.size<a.minFileSize)return a.minFileSizeErrorCallback(e,r++),!1;if("undefined"!==typeof a.maxFileSize&&e.size>a.maxFileSize)return a.maxFileSizeErrorCallback(e,r++),!1;function d(i){n.getFromUniqueIdentifier(i)?o.push(e):function(){e.uniqueIdentifier=i;var r=new c(n,e,i);n.files.push(r),s.push(r),r.container="undefined"!=typeof t?t.srcElement:null,window.setTimeout((function(){n.fire("fileAdded",r,t)}),0)}(),l()}var m=i.generateUniqueIdentifier(e,t);m&&"function"===typeof m.then?m.then((function(e){d(e)}),(function(){l()})):d(m)}))};function c(e,t,n){var r=this;r.opts={},r.getOpt=e.getOpt,r._prevProgress=0,r.resumableObj=e,r.file=t,r.fileName=t.fileName||t.name,r.size=t.size,r.relativePath=t.relativePath||t.webkitRelativePath||r.fileName,r.uniqueIdentifier=n,r._pause=!1,r.container="";var a=void 0!==n,s=function(e,t){switch(e){case"progress":r.resumableObj.fire("fileProgress",r,t);break;case"error":r.abort(),a=!0,r.chunks=[],r.resumableObj.fire("fileError",r,t);break;case"success":if(a)return;r.resumableObj.fire("fileProgress",r),r.isComplete()&&r.resumableObj.fire("fileSuccess",r,t);break;case"retry":r.resumableObj.fire("fileRetry",r);break}};return r.chunks=[],r.abort=function(){var e=0;i.each(r.chunks,(function(t){"uploading"==t.status()&&(t.abort(),e++)})),e>0&&r.resumableObj.fire("fileProgress",r)},r.cancel=function(){var e=r.chunks;r.chunks=[],i.each(e,(function(e){"uploading"==e.status()&&(e.abort(),r.resumableObj.uploadNextChunk())})),r.resumableObj.removeFile(r),r.resumableObj.fire("fileProgress",r)},r.retry=function(){r.bootstrap();var e=!1;r.resumableObj.on("chunkingComplete",(function(){e||r.resumableObj.upload(),e=!0}))},r.bootstrap=function(){r.abort(),a=!1,r.chunks=[],r._prevProgress=0;for(var e=r.getOpt("forceChunkSize")?Math.ceil:Math.floor,t=Math.max(e(r.file.size/r.getOpt("chunkSize")),1),n=0;n<t;n++)(function(e){window.setTimeout((function(){r.chunks.push(new p(r.resumableObj,r,e,s)),r.resumableObj.fire("chunkingProgress",r,e/t)}),0)})(n);window.setTimeout((function(){r.resumableObj.fire("chunkingComplete",r)}),0)},r.progress=function(){if(a)return 1;var e=0,t=!1;return i.each(r.chunks,(function(n){"error"==n.status()&&(t=!0),e+=n.progress(!0)})),e=t||e>.99999?1:e,e=Math.max(r._prevProgress,e),r._prevProgress=e,e},r.isUploading=function(){var e=!1;return i.each(r.chunks,(function(t){if("uploading"==t.status())return e=!0,!1})),e},r.isComplete=function(){var e=!1;return i.each(r.chunks,(function(t){var n=t.status();if("pending"==n||"uploading"==n||1===t.preprocessState)return e=!0,!1})),!e},r.pause=function(e){r._pause="undefined"===typeof e?!r._pause:e},r.isPaused=function(){return r._pause},r.resumableObj.fire("chunkingStart",r),r.bootstrap(),this}function p(e,t,n,r){var a=this;a.opts={},a.getOpt=e.getOpt,a.resumableObj=e,a.fileObj=t,a.fileObjSize=t.size,a.fileObjType=t.file.type,a.offset=n,a.callback=r,a.lastProgressCallback=new Date,a.tested=!1,a.retries=0,a.pendingRetry=!1,a.preprocessState=0;var s=a.getOpt("chunkSize");return a.loaded=0,a.startByte=a.offset*s,a.endByte=Math.min(a.fileObjSize,(a.offset+1)*s),a.fileObjSize-a.endByte<s&&!a.getOpt("forceChunkSize")&&(a.endByte=a.fileObjSize),a.xhr=null,a.test=function(){a.xhr=new XMLHttpRequest;var e=function(e){a.tested=!0;var t=a.status();"success"==t?(a.callback(t,a.message()),a.resumableObj.uploadNextChunk()):a.send()};a.xhr.addEventListener("load",e,!1),a.xhr.addEventListener("error",e,!1),a.xhr.addEventListener("timeout",e,!1);var t=[],n=a.getOpt("parameterNamespace"),r=a.getOpt("query");"function"==typeof r&&(r=r(a.fileObj,a)),i.each(r,(function(e,i){t.push([encodeURIComponent(n+e),encodeURIComponent(i)].join("="))})),t=t.concat([["chunkNumberParameterName",a.offset+1],["chunkSizeParameterName",a.getOpt("chunkSize")],["currentChunkSizeParameterName",a.endByte-a.startByte],["totalSizeParameterName",a.fileObjSize],["typeParameterName",a.fileObjType],["identifierParameterName",a.fileObj.uniqueIdentifier],["fileNameParameterName",a.fileObj.fileName],["relativePathParameterName",a.fileObj.relativePath],["totalChunksParameterName",a.fileObj.chunks.length]].filter((function(e){return a.getOpt(e[0])})).map((function(e){return[n+a.getOpt(e[0]),encodeURIComponent(e[1])].join("=")}))),a.xhr.open(a.getOpt("testMethod"),i.getTarget("test",t)),a.xhr.timeout=a.getOpt("xhrTimeout"),a.xhr.withCredentials=a.getOpt("withCredentials");var s=a.getOpt("headers");"function"===typeof s&&(s=s(a.fileObj,a)),i.each(s,(function(e,t){a.xhr.setRequestHeader(e,t)})),a.xhr.send(null)},a.preprocessFinished=function(){a.preprocessState=2,a.send()},a.send=function(){var e=a.getOpt("preprocess");if("function"===typeof e)switch(a.preprocessState){case 0:return a.preprocessState=1,void e(a);case 1:return;case 2:break}if(!a.getOpt("testChunks")||a.tested){a.xhr=new XMLHttpRequest,a.xhr.upload.addEventListener("progress",(function(e){new Date-a.lastProgressCallback>1e3*a.getOpt("throttleProgressCallbacks")&&(a.callback("progress"),a.lastProgressCallback=new Date),a.loaded=e.loaded||0}),!1),a.loaded=0,a.pendingRetry=!1,a.callback("progress");var t=function(e){var t=a.status();if("success"==t||"error"==t)a.callback(t,a.message()),a.resumableObj.uploadNextChunk();else{a.callback("retry",a.message()),a.abort(),a.retries++;var n=a.getOpt("chunkRetryInterval");void 0!==n?(a.pendingRetry=!0,setTimeout(a.send,n)):a.send()}};a.xhr.addEventListener("load",t,!1),a.xhr.addEventListener("error",t,!1),a.xhr.addEventListener("timeout",t,!1);var n=[["chunkNumberParameterName",a.offset+1],["chunkSizeParameterName",a.getOpt("chunkSize")],["currentChunkSizeParameterName",a.endByte-a.startByte],["totalSizeParameterName",a.fileObjSize],["typeParameterName",a.fileObjType],["identifierParameterName",a.fileObj.uniqueIdentifier],["fileNameParameterName",a.fileObj.fileName],["relativePathParameterName",a.fileObj.relativePath],["totalChunksParameterName",a.fileObj.chunks.length]].filter((function(e){return a.getOpt(e[0])})).reduce((function(e,t){return e[a.getOpt(t[0])]=t[1],e}),{}),r=a.getOpt("query");"function"==typeof r&&(r=r(a.fileObj,a)),i.each(r,(function(e,t){n[e]=t}));var s=a.fileObj.file.slice?"slice":a.fileObj.file.mozSlice?"mozSlice":a.fileObj.file.webkitSlice?"webkitSlice":"slice",o=a.fileObj.file[s](a.startByte,a.endByte,a.getOpt("setChunkTypeFromFile")?a.fileObj.file.type:""),u=null,l=[],f=a.getOpt("parameterNamespace");if("octet"===a.getOpt("method"))u=o,i.each(n,(function(e,t){l.push([encodeURIComponent(f+e),encodeURIComponent(t)].join("="))}));else if(u=new FormData,i.each(n,(function(e,t){u.append(f+e,t),l.push([encodeURIComponent(f+e),encodeURIComponent(t)].join("="))})),"blob"==a.getOpt("chunkFormat"))u.append(f+a.getOpt("fileParameterName"),o,a.fileObj.fileName);else if("base64"==a.getOpt("chunkFormat")){var c=new FileReader;c.onload=function(e){u.append(f+a.getOpt("fileParameterName"),c.result),a.xhr.send(u)},c.readAsDataURL(o)}var p=i.getTarget("upload",l),h=a.getOpt("uploadMethod");a.xhr.open(h,p),"octet"===a.getOpt("method")&&a.xhr.setRequestHeader("Content-Type","application/octet-stream"),a.xhr.timeout=a.getOpt("xhrTimeout"),a.xhr.withCredentials=a.getOpt("withCredentials");var d=a.getOpt("headers");"function"===typeof d&&(d=d(a.fileObj,a)),i.each(d,(function(e,t){a.xhr.setRequestHeader(e,t)})),"blob"==a.getOpt("chunkFormat")&&a.xhr.send(u)}else a.test()},a.abort=function(){a.xhr&&a.xhr.abort(),a.xhr=null},a.status=function(){return a.pendingRetry?"uploading":a.xhr?a.xhr.readyState<4?"uploading":200==a.xhr.status||201==a.xhr.status?"success":i.contains(a.getOpt("permanentErrors"),a.xhr.status)||a.retries>=a.getOpt("maxChunkRetries")?"error":(a.abort(),"pending"):"pending"},a.message=function(){return a.xhr?a.xhr.responseText:""},a.progress=function(e){"undefined"===typeof e&&(e=!1);var t=e?(a.endByte-a.startByte)/a.fileObjSize:1;if(a.pendingRetry)return 0;a.xhr&&a.xhr.status||(t*=.95);var n=a.status();switch(n){case"success":case"error":return 1*t;case"pending":return 0*t;default:return a.loaded/(a.endByte-a.startByte)*t}},this}return n.uploadNextChunk=function(){var e=!1;if(n.getOpt("prioritizeFirstAndLastChunk")&&(i.each(n.files,(function(t){return t.chunks.length&&"pending"==t.chunks[0].status()&&0===t.chunks[0].preprocessState?(t.chunks[0].send(),e=!0,!1):t.chunks.length>1&&"pending"==t.chunks[t.chunks.length-1].status()&&0===t.chunks[t.chunks.length-1].preprocessState?(t.chunks[t.chunks.length-1].send(),e=!0,!1):void 0})),e))return!0;if(i.each(n.files,(function(t){if(!1===t.isPaused()&&i.each(t.chunks,(function(t){if("pending"==t.status()&&0===t.preprocessState)return t.send(),e=!0,!1})),e)return!1})),e)return!0;var t=!1;return i.each(n.files,(function(e){if(!e.isComplete())return t=!0,!1})),t||n.fire("complete"),!1},n.assignBrowse=function(e,t){"undefined"==typeof e.length&&(e=[e]),i.each(e,(function(e){var i;"INPUT"===e.tagName&&"file"===e.type?i=e:(i=document.createElement("input"),i.setAttribute("type","file"),i.style.display="none",e.addEventListener("click",(function(){i.style.opacity=0,i.style.display="block",i.focus(),i.click(),i.style.display="none"}),!1),e.appendChild(i));var r=n.getOpt("maxFiles");"undefined"===typeof r||1!=r?i.setAttribute("multiple","multiple"):i.removeAttribute("multiple"),t?i.setAttribute("webkitdirectory","webkitdirectory"):i.removeAttribute("webkitdirectory");var a=n.getOpt("fileType");"undefined"!==typeof a&&a.length>=1?i.setAttribute("accept",a.map((function(e){return"."+e})).join(",")):i.removeAttribute("accept"),i.addEventListener("change",(function(e){f(e.target.files,e);var t=n.getOpt("clearInput");t&&(e.target.value="")}),!1)}))},n.assignDrop=function(e){"undefined"==typeof e.length&&(e=[e]),i.each(e,(function(e){e.addEventListener("dragover",a,!1),e.addEventListener("dragenter",a,!1),e.addEventListener("drop",r,!1)}))},n.unAssignDrop=function(e){"undefined"==typeof e.length&&(e=[e]),i.each(e,(function(e){e.removeEventListener("dragover",a),e.removeEventListener("dragenter",a),e.removeEventListener("drop",r)}))},n.isUploading=function(){var e=!1;return i.each(n.files,(function(t){if(t.isUploading())return e=!0,!1})),e},n.upload=function(){if(!n.isUploading()){n.fire("uploadStart");for(var e=1;e<=n.getOpt("simultaneousUploads");e++)n.uploadNextChunk()}},n.pause=function(){i.each(n.files,(function(e){e.abort()})),n.fire("pause")},n.cancel=function(){n.fire("beforeCancel");for(var e=n.files.length-1;e>=0;e--)n.files[e].cancel();n.fire("cancel")},n.progress=function(){var e=0,t=0;return i.each(n.files,(function(n){e+=n.progress()*n.size,t+=n.size})),t>0?e/t:0},n.addFile=function(e,t){f([e],t)},n.addFiles=function(e,t){f(e,t)},n.removeFile=function(e){for(var t=n.files.length-1;t>=0;t--)n.files[t]===e&&n.files.splice(t,1)},n.getFromUniqueIdentifier=function(e){var t=!1;return i.each(n.files,(function(n){n.uniqueIdentifier==e&&(t=n)})),t},n.getSize=function(){var e=0;return i.each(n.files,(function(t){e+=t.size})),e},n.handleDropEvent=function(e){r(e)},n.handleChangeEvent=function(e){f(e.target.files,e),e.target.value=""},n.updateQuery=function(e){n.opts.query=e},this};e.exports=t})()}}]);