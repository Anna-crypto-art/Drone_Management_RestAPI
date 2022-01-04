(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{267:function(e,t,n){"use strict";var r,i;n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return i})),function(e){e["UNPREPARED"]="UNPREPARED",e["INITIALIZED"]="INITIALIZED",e["UPLOADING"]="UPLOADING",e["FINISHED"]="FINISHED",e["FAILED"]="FAILED",e["RETRYING"]="RETRYING"}(r||(r={})),function(e){e["FILE_SUCCESS"]="fileSuccess",e["FILE_PROGRESS"]="fileProgress",e["FILE_ERROR"]="fileError",e["FILE_RETRY"]="fileRetry",e["FILE_ADDED"]="fileAdded",e["FILE_REMOVED"]="fileRemoved",e["PROGRESS"]="progress",e["FAILED"]="failed",e["COMPLETED"]="completed"}(i||(i={}))},268:function(e,t,n){"use strict";var r=n(24),i=n(25),a=(n(185),n(312)),s=n.n(a),o=n(267),u=n(27),l=n(64),f=n(29),c=n(28),h=(n(124),n(15)),p=function(e){Object(f["a"])(n,e);var t=Object(c["a"])(n);function n(){return Object(r["a"])(this,n),t.apply(this,arguments)}return Object(i["a"])(n,[{key:"emit",value:function(e,t){this.$emit.apply(this,[e].concat(Object(l["a"])(t)))}},{key:"on",value:function(e,t){this.$on(e,t)}}]),n}(h["default"]),d=new p,m=d,g=function(){function e(){Object(r["a"])(this,e),this.maxRetries=5,this.chunkRetryInterval=3e3,this.failedTimeoutInterval=4e3,this.state=o["b"].UNPREPARED,this.retries=0,this.currentProgress=0,this.eventsRegistered=!1,this.resumable=new s.a({chunkSize:10485760,chunkRetryInterval:this.chunkRetryInterval,simultaneousUploads:1,maxChunkRetries:this.maxRetries})}return Object(i["a"])(e,[{key:"init",value:function(e,t){this.checkState([o["b"].UNPREPARED,o["b"].INITIALIZED,o["b"].FINISHED]),this.initValues(),this.registerEvents();var n=document.getElementById(e);if(!n)throw new Error("No HTML-Element found with id='".concat(e,"'"));if(this.resumable.assignDrop(n),t){var r=document.getElementById(t);if(!r)throw new Error("No HTML-Element found with id='".concat(t,"'"));this.resumable.assignBrowse(r,!1)}this.state=o["b"].INITIALIZED}},{key:"reset",value:function(){this.checkState([o["b"].FINISHED]),this.initValues(),this.state=o["b"].INITIALIZED}},{key:"hasState",value:function(e){return this.state===e}},{key:"files",get:function(){return this.resumable.files}},{key:"cancel",value:function(){this.checkState([o["b"].FAILED,o["b"].UPLOADING,o["b"].INITIALIZED]),this.resumable.cancel(),this.state=o["b"].FINISHED,this.reset()}},{key:"progress",value:function(){return this.currentProgress}},{key:"upload",value:function(e,t){this.checkState([o["b"].INITIALIZED,o["b"].FAILED]),this.state=o["b"].UPLOADING,this.metadata=t,this.resumable.opts.target=e,this.resumable.upload()}},{key:"getMetadata",value:function(){return this.metadata}},{key:"on",value:function(e,t){m.on(e,t)}},{key:"emitFileRemoved",value:function(e){this.emit(o["a"].FILE_REMOVED,e)}},{key:"getMaxRetries",value:function(){return this.files.filter((function(e){return!e.isComplete()})).length*this.maxRetries}},{key:"emit",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];m.emit(e,n)}},{key:"initValues",value:function(){this.resumable.opts.headers={Authorization:"Bearer ".concat(u["a"].state.auth.token)},this.metadata=void 0,this.currentProgress=0}},{key:"checkState",value:function(e){if(Array.isArray(e)||(e=[e]),-1===e.indexOf(this.state))throw new Error("Invalid operation. Resumable is in state: "+this.state)}},{key:"onProgress",value:function(){var e=this.resumable.progress();this.currentProgress===e||this.hasState(o["b"].FINISHED)||(this.currentProgress=e,this.state=o["b"].UPLOADING,this.emit(o["a"].PROGRESS))}},{key:"onRetry",value:function(e){this.failedTimeout&&(clearTimeout(this.failedTimeout),this.failedTimeout=void 0),this.state=o["b"].RETRYING,this.emit(o["a"].FILE_RETRY,e,++this.retries)}},{key:"onFailed",value:function(e){this.state=o["b"].FAILED,this.emit(o["a"].FAILED,e)}},{key:"onCompleted",value:function(){this.failedTimeout||this.hasState(o["b"].FAILED)||(this.state=o["b"].FINISHED,this.resumable.cancel(),this.emit(o["a"].COMPLETED,this.metadata),this.reset())}},{key:"onFileSuccess",value:function(e){this.emit(o["a"].FILE_SUCCESS,e)}},{key:"onFileProgress",value:function(e){this.emit(o["a"].FILE_PROGRESS,e)}},{key:"onFileError",value:function(e,t){var n=this;this.failedTimeout=setTimeout((function(){n.onFailed(t)}),this.failedTimeoutInterval),this.emit(o["a"].FILE_ERROR,e,t)}},{key:"onFileAdded",value:function(e){this.emit(o["a"].FILE_ADDED,e)}},{key:"registerEvents",value:function(){var e=this;this.eventsRegistered||(this.resumable.on("fileSuccess",(function(t){e.onFileSuccess(t)})),this.resumable.on("fileProgress",(function(t){e.onFileProgress(t)})),this.resumable.on("fileError",(function(t,n){e.onFileError(t,n)})),this.resumable.on("fileRetry",(function(t){e.onRetry(t)})),this.resumable.on("fileAdded",(function(t){e.onFileAdded(t)})),this.resumable.on("progress",(function(){e.onProgress()})),this.resumable.on("complete",(function(){e.onCompleted()})),this.resumable.on("error",(function(t){e.onFailed(t)})),this.eventsRegistered=!0)}}]),e}(),b=new g;t["a"]=b},277:function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return i})),function(e){e["UPLOADING"]="UPLOADING",e["UPLOAD_FAILED"]="UPLOAD_FAILED",e["PICK_ME_UP"]="PICK_ME_UP",e["PROCESSING"]="PROCESSING",e["PROCESS_FAILED"]="PROCESS_FAILED",e["ABANDONED"]="ABANDONED",e["FINISHED"]="FINISHED"}(r||(r={}));var i={UPLOADING:[r.PICK_ME_UP,r.UPLOAD_FAILED,r.ABANDONED],UPLOAD_FAILED:[r.UPLOADING,r.ABANDONED,r.PICK_ME_UP],PICK_ME_UP:[r.PROCESSING,r.ABANDONED],PROCESSING:[r.FINISHED,r.ABANDONED,r.PROCESS_FAILED],PROCESS_FAILED:[r.PROCESSING,r.ABANDONED],ABANDONED:[],FINISHED:[]}},312:function(e,t,n){(function(){"use strict";var t=function(e){if(!(this instanceof t))return new t(e);if(this.version=1,this.support="undefined"!==typeof File&&"undefined"!==typeof Blob&&"undefined"!==typeof FileList&&(!!Blob.prototype.webkitSlice||!!Blob.prototype.mozSlice||!!Blob.prototype.slice||!1),!this.support)return!1;var n=this;n.files=[],n.defaults={chunkSize:1048576,forceChunkSize:!1,simultaneousUploads:3,fileParameterName:"file",chunkNumberParameterName:"resumableChunkNumber",chunkSizeParameterName:"resumableChunkSize",currentChunkSizeParameterName:"resumableCurrentChunkSize",totalSizeParameterName:"resumableTotalSize",typeParameterName:"resumableType",identifierParameterName:"resumableIdentifier",fileNameParameterName:"resumableFilename",relativePathParameterName:"resumableRelativePath",totalChunksParameterName:"resumableTotalChunks",throttleProgressCallbacks:.5,query:{},headers:{},preprocess:null,method:"multipart",uploadMethod:"POST",testMethod:"GET",prioritizeFirstAndLastChunk:!1,target:"/",testTarget:null,parameterNamespace:"",testChunks:!0,generateUniqueIdentifier:null,getTarget:null,maxChunkRetries:100,chunkRetryInterval:void 0,permanentErrors:[400,404,415,500,501],maxFiles:void 0,withCredentials:!1,xhrTimeout:0,clearInput:!0,chunkFormat:"blob",setChunkTypeFromFile:!1,maxFilesErrorCallback:function(e,t){var r=n.getOpt("maxFiles");alert("Please upload no more than "+r+" file"+(1===r?"":"s")+" at a time.")},minFileSize:1,minFileSizeErrorCallback:function(e,t){alert(e.fileName||e.name+" is too small, please upload files larger than "+r.formatSize(n.getOpt("minFileSize"))+".")},maxFileSize:void 0,maxFileSizeErrorCallback:function(e,t){alert(e.fileName||e.name+" is too large, please upload files less than "+r.formatSize(n.getOpt("maxFileSize"))+".")},fileType:[],fileTypeErrorCallback:function(e,t){alert(e.fileName||e.name+" has type not allowed, please upload files of type "+n.getOpt("fileType")+".")}},n.opts=e||{},n.getOpt=function(e){var n=this;if(e instanceof Array){var i={};return r.each(e,(function(e){i[e]=n.getOpt(e)})),i}if(n instanceof h){if("undefined"!==typeof n.opts[e])return n.opts[e];n=n.fileObj}if(n instanceof c){if("undefined"!==typeof n.opts[e])return n.opts[e];n=n.resumableObj}if(n instanceof t)return"undefined"!==typeof n.opts[e]?n.opts[e]:n.defaults[e]},n.events=[],n.on=function(e,t){n.events.push(e.toLowerCase(),t)},n.fire=function(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);var r=e[0].toLowerCase();for(t=0;t<=n.events.length;t+=2)n.events[t]==r&&n.events[t+1].apply(n,e.slice(1)),"catchall"==n.events[t]&&n.events[t+1].apply(null,e);"fileerror"==r&&n.fire("error",e[2],e[1]),"fileprogress"==r&&n.fire("progress")};var r={stopEvent:function(e){e.stopPropagation(),e.preventDefault()},each:function(e,t){if("undefined"!==typeof e.length){for(var n=0;n<e.length;n++)if(!1===t(e[n]))return}else for(n in e)if(!1===t(n,e[n]))return},generateUniqueIdentifier:function(e,t){var r=n.getOpt("generateUniqueIdentifier");if("function"===typeof r)return r(e,t);var i=e.webkitRelativePath||e.fileName||e.name,a=e.size;return a+"-"+i.replace(/[^0-9a-zA-Z_-]/gim,"")},contains:function(e,t){var n=!1;return r.each(e,(function(e){return e!=t||(n=!0,!1)})),n},formatSize:function(e){return e<1024?e+" bytes":e<1048576?(e/1024).toFixed(0)+" KB":e<1073741824?(e/1024/1024).toFixed(1)+" MB":(e/1024/1024/1024).toFixed(1)+" GB"},getTarget:function(e,t){var r=n.getOpt("target");if("test"===e&&n.getOpt("testTarget")&&(r="/"===n.getOpt("testTarget")?n.getOpt("target"):n.getOpt("testTarget")),"function"===typeof r)return r(t);var i=r.indexOf("?")<0?"?":"&",a=t.join("&");return r+i+a}},i=function(e){r.stopEvent(e),e.dataTransfer&&e.dataTransfer.items?l(e.dataTransfer.items,e):e.dataTransfer&&e.dataTransfer.files&&l(e.dataTransfer.files,e)},a=function(e){e.preventDefault()};function s(e,t,n,r){var i;return e.isFile?e.file((function(e){e.relativePath=t+e.name,n.push(e),r()})):(e.isDirectory?i=e:e instanceof File&&n.push(e),"function"===typeof e.webkitGetAsEntry&&(i=e.webkitGetAsEntry()),i&&i.isDirectory?u(i,t+i.name+"/",n,r):("function"===typeof e.getAsFile&&(e=e.getAsFile(),e instanceof File&&(e.relativePath=t+e.name,n.push(e))),void r()))}function o(e,t){if(!e||0===e.length)return t();e[0]((function(){o(e.slice(1),t)}))}function u(e,t,n,r){var i=e.createReader();i.readEntries((function(e){if(!e.length)return r();o(e.map((function(e){return s.bind(null,e,t,n)})),r)}))}function l(e,t){if(e.length){n.fire("beforeAdd");var r=[];o(Array.prototype.map.call(e,(function(e){return s.bind(null,e,"",r)})),(function(){r.length&&f(r,t)}))}}var f=function(e,t){var i=0,a=n.getOpt(["maxFiles","minFileSize","maxFileSize","maxFilesErrorCallback","minFileSizeErrorCallback","maxFileSizeErrorCallback","fileType","fileTypeErrorCallback"]);if("undefined"!==typeof a.maxFiles&&a.maxFiles<e.length+n.files.length){if(1!==a.maxFiles||1!==n.files.length||1!==e.length)return a.maxFilesErrorCallback(e,i++),!1;n.removeFile(n.files[0])}var s=[],o=[],u=e.length,l=function(){if(!--u){if(!s.length&&!o.length)return;window.setTimeout((function(){n.fire("filesAdded",s,o)}),0)}};r.each(e,(function(e){var u=e.name;if(a.fileType.length>0){var f=!1;for(var h in a.fileType){var p="."+a.fileType[h];if(-1!==u.toLowerCase().indexOf(p.toLowerCase(),u.length-p.length)){f=!0;break}}if(!f)return a.fileTypeErrorCallback(e,i++),!1}if("undefined"!==typeof a.minFileSize&&e.size<a.minFileSize)return a.minFileSizeErrorCallback(e,i++),!1;if("undefined"!==typeof a.maxFileSize&&e.size>a.maxFileSize)return a.maxFileSizeErrorCallback(e,i++),!1;function d(r){n.getFromUniqueIdentifier(r)?o.push(e):function(){e.uniqueIdentifier=r;var i=new c(n,e,r);n.files.push(i),s.push(i),i.container="undefined"!=typeof t?t.srcElement:null,window.setTimeout((function(){n.fire("fileAdded",i,t)}),0)}(),l()}var m=r.generateUniqueIdentifier(e,t);m&&"function"===typeof m.then?m.then((function(e){d(e)}),(function(){l()})):d(m)}))};function c(e,t,n){var i=this;i.opts={},i.getOpt=e.getOpt,i._prevProgress=0,i.resumableObj=e,i.file=t,i.fileName=t.fileName||t.name,i.size=t.size,i.relativePath=t.relativePath||t.webkitRelativePath||i.fileName,i.uniqueIdentifier=n,i._pause=!1,i.container="";var a=void 0!==n,s=function(e,t){switch(e){case"progress":i.resumableObj.fire("fileProgress",i,t);break;case"error":i.abort(),a=!0,i.chunks=[],i.resumableObj.fire("fileError",i,t);break;case"success":if(a)return;i.resumableObj.fire("fileProgress",i),i.isComplete()&&i.resumableObj.fire("fileSuccess",i,t);break;case"retry":i.resumableObj.fire("fileRetry",i);break}};return i.chunks=[],i.abort=function(){var e=0;r.each(i.chunks,(function(t){"uploading"==t.status()&&(t.abort(),e++)})),e>0&&i.resumableObj.fire("fileProgress",i)},i.cancel=function(){var e=i.chunks;i.chunks=[],r.each(e,(function(e){"uploading"==e.status()&&(e.abort(),i.resumableObj.uploadNextChunk())})),i.resumableObj.removeFile(i),i.resumableObj.fire("fileProgress",i)},i.retry=function(){i.bootstrap();var e=!1;i.resumableObj.on("chunkingComplete",(function(){e||i.resumableObj.upload(),e=!0}))},i.bootstrap=function(){i.abort(),a=!1,i.chunks=[],i._prevProgress=0;for(var e=i.getOpt("forceChunkSize")?Math.ceil:Math.floor,t=Math.max(e(i.file.size/i.getOpt("chunkSize")),1),n=0;n<t;n++)(function(e){window.setTimeout((function(){i.chunks.push(new h(i.resumableObj,i,e,s)),i.resumableObj.fire("chunkingProgress",i,e/t)}),0)})(n);window.setTimeout((function(){i.resumableObj.fire("chunkingComplete",i)}),0)},i.progress=function(){if(a)return 1;var e=0,t=!1;return r.each(i.chunks,(function(n){"error"==n.status()&&(t=!0),e+=n.progress(!0)})),e=t||e>.99999?1:e,e=Math.max(i._prevProgress,e),i._prevProgress=e,e},i.isUploading=function(){var e=!1;return r.each(i.chunks,(function(t){if("uploading"==t.status())return e=!0,!1})),e},i.isComplete=function(){var e=!1;return r.each(i.chunks,(function(t){var n=t.status();if("pending"==n||"uploading"==n||1===t.preprocessState)return e=!0,!1})),!e},i.pause=function(e){i._pause="undefined"===typeof e?!i._pause:e},i.isPaused=function(){return i._pause},i.resumableObj.fire("chunkingStart",i),i.bootstrap(),this}function h(e,t,n,i){var a=this;a.opts={},a.getOpt=e.getOpt,a.resumableObj=e,a.fileObj=t,a.fileObjSize=t.size,a.fileObjType=t.file.type,a.offset=n,a.callback=i,a.lastProgressCallback=new Date,a.tested=!1,a.retries=0,a.pendingRetry=!1,a.preprocessState=0;var s=a.getOpt("chunkSize");return a.loaded=0,a.startByte=a.offset*s,a.endByte=Math.min(a.fileObjSize,(a.offset+1)*s),a.fileObjSize-a.endByte<s&&!a.getOpt("forceChunkSize")&&(a.endByte=a.fileObjSize),a.xhr=null,a.test=function(){a.xhr=new XMLHttpRequest;var e=function(e){a.tested=!0;var t=a.status();"success"==t?(a.callback(t,a.message()),a.resumableObj.uploadNextChunk()):a.send()};a.xhr.addEventListener("load",e,!1),a.xhr.addEventListener("error",e,!1),a.xhr.addEventListener("timeout",e,!1);var t=[],n=a.getOpt("parameterNamespace"),i=a.getOpt("query");"function"==typeof i&&(i=i(a.fileObj,a)),r.each(i,(function(e,r){t.push([encodeURIComponent(n+e),encodeURIComponent(r)].join("="))})),t=t.concat([["chunkNumberParameterName",a.offset+1],["chunkSizeParameterName",a.getOpt("chunkSize")],["currentChunkSizeParameterName",a.endByte-a.startByte],["totalSizeParameterName",a.fileObjSize],["typeParameterName",a.fileObjType],["identifierParameterName",a.fileObj.uniqueIdentifier],["fileNameParameterName",a.fileObj.fileName],["relativePathParameterName",a.fileObj.relativePath],["totalChunksParameterName",a.fileObj.chunks.length]].filter((function(e){return a.getOpt(e[0])})).map((function(e){return[n+a.getOpt(e[0]),encodeURIComponent(e[1])].join("=")}))),a.xhr.open(a.getOpt("testMethod"),r.getTarget("test",t)),a.xhr.timeout=a.getOpt("xhrTimeout"),a.xhr.withCredentials=a.getOpt("withCredentials");var s=a.getOpt("headers");"function"===typeof s&&(s=s(a.fileObj,a)),r.each(s,(function(e,t){a.xhr.setRequestHeader(e,t)})),a.xhr.send(null)},a.preprocessFinished=function(){a.preprocessState=2,a.send()},a.send=function(){var e=a.getOpt("preprocess");if("function"===typeof e)switch(a.preprocessState){case 0:return a.preprocessState=1,void e(a);case 1:return;case 2:break}if(!a.getOpt("testChunks")||a.tested){a.xhr=new XMLHttpRequest,a.xhr.upload.addEventListener("progress",(function(e){new Date-a.lastProgressCallback>1e3*a.getOpt("throttleProgressCallbacks")&&(a.callback("progress"),a.lastProgressCallback=new Date),a.loaded=e.loaded||0}),!1),a.loaded=0,a.pendingRetry=!1,a.callback("progress");var t=function(e){var t=a.status();if("success"==t||"error"==t)a.callback(t,a.message()),a.resumableObj.uploadNextChunk();else{a.callback("retry",a.message()),a.abort(),a.retries++;var n=a.getOpt("chunkRetryInterval");void 0!==n?(a.pendingRetry=!0,setTimeout(a.send,n)):a.send()}};a.xhr.addEventListener("load",t,!1),a.xhr.addEventListener("error",t,!1),a.xhr.addEventListener("timeout",t,!1);var n=[["chunkNumberParameterName",a.offset+1],["chunkSizeParameterName",a.getOpt("chunkSize")],["currentChunkSizeParameterName",a.endByte-a.startByte],["totalSizeParameterName",a.fileObjSize],["typeParameterName",a.fileObjType],["identifierParameterName",a.fileObj.uniqueIdentifier],["fileNameParameterName",a.fileObj.fileName],["relativePathParameterName",a.fileObj.relativePath],["totalChunksParameterName",a.fileObj.chunks.length]].filter((function(e){return a.getOpt(e[0])})).reduce((function(e,t){return e[a.getOpt(t[0])]=t[1],e}),{}),i=a.getOpt("query");"function"==typeof i&&(i=i(a.fileObj,a)),r.each(i,(function(e,t){n[e]=t}));var s=a.fileObj.file.slice?"slice":a.fileObj.file.mozSlice?"mozSlice":a.fileObj.file.webkitSlice?"webkitSlice":"slice",o=a.fileObj.file[s](a.startByte,a.endByte,a.getOpt("setChunkTypeFromFile")?a.fileObj.file.type:""),u=null,l=[],f=a.getOpt("parameterNamespace");if("octet"===a.getOpt("method"))u=o,r.each(n,(function(e,t){l.push([encodeURIComponent(f+e),encodeURIComponent(t)].join("="))}));else if(u=new FormData,r.each(n,(function(e,t){u.append(f+e,t),l.push([encodeURIComponent(f+e),encodeURIComponent(t)].join("="))})),"blob"==a.getOpt("chunkFormat"))u.append(f+a.getOpt("fileParameterName"),o,a.fileObj.fileName);else if("base64"==a.getOpt("chunkFormat")){var c=new FileReader;c.onload=function(e){u.append(f+a.getOpt("fileParameterName"),c.result),a.xhr.send(u)},c.readAsDataURL(o)}var h=r.getTarget("upload",l),p=a.getOpt("uploadMethod");a.xhr.open(p,h),"octet"===a.getOpt("method")&&a.xhr.setRequestHeader("Content-Type","application/octet-stream"),a.xhr.timeout=a.getOpt("xhrTimeout"),a.xhr.withCredentials=a.getOpt("withCredentials");var d=a.getOpt("headers");"function"===typeof d&&(d=d(a.fileObj,a)),r.each(d,(function(e,t){a.xhr.setRequestHeader(e,t)})),"blob"==a.getOpt("chunkFormat")&&a.xhr.send(u)}else a.test()},a.abort=function(){a.xhr&&a.xhr.abort(),a.xhr=null},a.status=function(){return a.pendingRetry?"uploading":a.xhr?a.xhr.readyState<4?"uploading":200==a.xhr.status||201==a.xhr.status?"success":r.contains(a.getOpt("permanentErrors"),a.xhr.status)||a.retries>=a.getOpt("maxChunkRetries")?"error":(a.abort(),"pending"):"pending"},a.message=function(){return a.xhr?a.xhr.responseText:""},a.progress=function(e){"undefined"===typeof e&&(e=!1);var t=e?(a.endByte-a.startByte)/a.fileObjSize:1;if(a.pendingRetry)return 0;a.xhr&&a.xhr.status||(t*=.95);var n=a.status();switch(n){case"success":case"error":return 1*t;case"pending":return 0*t;default:return a.loaded/(a.endByte-a.startByte)*t}},this}return n.uploadNextChunk=function(){var e=!1;if(n.getOpt("prioritizeFirstAndLastChunk")&&(r.each(n.files,(function(t){return t.chunks.length&&"pending"==t.chunks[0].status()&&0===t.chunks[0].preprocessState?(t.chunks[0].send(),e=!0,!1):t.chunks.length>1&&"pending"==t.chunks[t.chunks.length-1].status()&&0===t.chunks[t.chunks.length-1].preprocessState?(t.chunks[t.chunks.length-1].send(),e=!0,!1):void 0})),e))return!0;if(r.each(n.files,(function(t){if(!1===t.isPaused()&&r.each(t.chunks,(function(t){if("pending"==t.status()&&0===t.preprocessState)return t.send(),e=!0,!1})),e)return!1})),e)return!0;var t=!1;return r.each(n.files,(function(e){if(!e.isComplete())return t=!0,!1})),t||n.fire("complete"),!1},n.assignBrowse=function(e,t){"undefined"==typeof e.length&&(e=[e]),r.each(e,(function(e){var r;"INPUT"===e.tagName&&"file"===e.type?r=e:(r=document.createElement("input"),r.setAttribute("type","file"),r.style.display="none",e.addEventListener("click",(function(){r.style.opacity=0,r.style.display="block",r.focus(),r.click(),r.style.display="none"}),!1),e.appendChild(r));var i=n.getOpt("maxFiles");"undefined"===typeof i||1!=i?r.setAttribute("multiple","multiple"):r.removeAttribute("multiple"),t?r.setAttribute("webkitdirectory","webkitdirectory"):r.removeAttribute("webkitdirectory");var a=n.getOpt("fileType");"undefined"!==typeof a&&a.length>=1?r.setAttribute("accept",a.map((function(e){return"."+e})).join(",")):r.removeAttribute("accept"),r.addEventListener("change",(function(e){f(e.target.files,e);var t=n.getOpt("clearInput");t&&(e.target.value="")}),!1)}))},n.assignDrop=function(e){"undefined"==typeof e.length&&(e=[e]),r.each(e,(function(e){e.addEventListener("dragover",a,!1),e.addEventListener("dragenter",a,!1),e.addEventListener("drop",i,!1)}))},n.unAssignDrop=function(e){"undefined"==typeof e.length&&(e=[e]),r.each(e,(function(e){e.removeEventListener("dragover",a),e.removeEventListener("dragenter",a),e.removeEventListener("drop",i)}))},n.isUploading=function(){var e=!1;return r.each(n.files,(function(t){if(t.isUploading())return e=!0,!1})),e},n.upload=function(){if(!n.isUploading()){n.fire("uploadStart");for(var e=1;e<=n.getOpt("simultaneousUploads");e++)n.uploadNextChunk()}},n.pause=function(){r.each(n.files,(function(e){e.abort()})),n.fire("pause")},n.cancel=function(){n.fire("beforeCancel");for(var e=n.files.length-1;e>=0;e--)n.files[e].cancel();n.fire("cancel")},n.progress=function(){var e=0,t=0;return r.each(n.files,(function(n){e+=n.progress()*n.size,t+=n.size})),t>0?e/t:0},n.addFile=function(e,t){f([e],t)},n.addFiles=function(e,t){f(e,t)},n.removeFile=function(e){for(var t=n.files.length-1;t>=0;t--)n.files[t]===e&&n.files.splice(t,1)},n.getFromUniqueIdentifier=function(e){var t=!1;return r.each(n.files,(function(n){n.uniqueIdentifier==e&&(t=n)})),t},n.getSize=function(){var e=0;return r.each(n.files,(function(t){e+=t.size})),e},n.handleDropEvent=function(e){i(e)},n.handleChangeEvent=function(e){f(e.target.files,e),e.target.value=""},n.updateQuery=function(e){n.opts.query=e},this};e.exports=t})()}}]);