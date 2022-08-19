(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{256:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-button",{class:"app-button "+e.cls,attrs:{variant:e.variant,type:e.type,disabled:e.isDisabled,size:e.size},on:{click:e.onClick}},[r("span",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"app-button-loading"},[r("b-spinner",{attrs:{small:""}})],1),e.icon?r("b-icon",{staticClass:"app-button-icon",attrs:{icon:e.icon}}):e._e(),r("span",{class:"app-button-content"+(e.hideText?" text-hidden":"")+(e.icon?" has-icon":"")},[e._t("default")],2)],1)},i=[];n._withStripped=!0;var a=r(21),o=r(22),s=r(31),l=r(30),c=r(40),u=(r(74),r(23),r(17)),f=r(34),p=function(e,t,r,n){var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o},h=function(e){Object(s["a"])(r,e);var t=Object(l["a"])(r);function r(){return Object(a["a"])(this,r),t.apply(this,arguments)}return Object(o["a"])(r,[{key:"isDisabled",get:function(){return this.loading||this.disabled}},{key:"onClick",value:function(e){this.$emit("click",e)}}]),r}(u["default"]);p([Object(f["b"])({default:"button"})],h.prototype,"type",void 0),p([Object(f["b"])({default:""})],h.prototype,"cls",void 0),p([Object(f["b"])({default:"primary"})],h.prototype,"variant",void 0),p([Object(f["b"])({default:!1})],h.prototype,"disabled",void 0),p([Object(f["b"])({default:!1})],h.prototype,"loading",void 0),p([Object(f["b"])({default:""})],h.prototype,"size",void 0),p([Object(f["b"])({default:null})],h.prototype,"icon",void 0),p([Object(f["b"])({default:!1})],h.prototype,"hideText",void 0),h=p([Object(f["a"])({name:"app-button"})],h);var d=h,v=d,b=(r(258),r(43)),m=Object(b["a"])(v,n,i,!1,null,null,null);m.options.__file="src/app/shared/components/app-button/app-button.vue";t["a"]=m.exports},257:function(e,t,r){},258:function(e,t,r){"use strict";r(257)},260:function(e,t,r){},261:function(e,t,r){},262:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:"app-table-container "+(e.size?"app-table-container-"+e.size:"")},[e._t("default")],2)},i=[];n._withStripped=!0;var a=r(22),o=r(21),s=r(31),l=r(30),c=r(40),u=(r(74),r(23),r(17)),f=r(34),p=function(e,t,r,n){var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o},h=function(e){Object(s["a"])(r,e);var t=Object(l["a"])(r);function r(){return Object(o["a"])(this,r),t.apply(this,arguments)}return Object(a["a"])(r)}(u["default"]);p([Object(f["b"])({default:""})],h.prototype,"size",void 0),h=p([f["a"]],h);var d=h,v=d,b=(r(269),r(43)),m=Object(b["a"])(v,n,i,!1,null,null,null);m.options.__file="src/app/shared/components/app-table-container/app-table-container.vue";t["a"]=m.exports},266:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-modal",{staticClass:"app-modal-form",attrs:{id:e.id,"ok-title":e.okTitle,"no-close-on-backdrop":""},scopedSlots:e._u([{key:"modal-title",fn:function(){return[r("div",{staticClass:"app-modal-form-title"},[e._t("modal-title",[r("h2",[e._v(e._s(e.title))]),e.subtitle?r("div",{staticClass:"app-modal-form-title-subtitle grayed",domProps:{innerHTML:e._s(e.subtitle)}}):e._e()])],2)]},proxy:!0},{key:"modal-footer",fn:function(){return[r("b-button",{attrs:{variant:"secondary"},on:{click:function(t){return e.$bvModal.hide(e.id)}}},[e._v(e._s(e.$t("cancel")))]),r("app-button",{attrs:{loading:e.modalLoading},on:{click:e.onSubmit}},[e._v(e._s(e.okTitle))])]},proxy:!0}],null,!0)},[r("b-alert",{staticClass:"app-modal-form-alert",attrs:{variant:e.alertVariant,dismissible:""},domProps:{innerHTML:e._s(e.alertMsg)},model:{value:e.showAlert,callback:function(t){e.showAlert=t},expression:"showAlert"}}),r("form",{on:{submit:e.onSubmit}},[e._t("default")],2)],1)},i=[];n._withStripped=!0;var a=r(21),o=r(22),s=r(31),l=r(30),c=r(40),u=(r(74),r(23),r(17)),f=r(34),p=r(256),h=function(e,t,r,n){var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o},d=function(e){Object(s["a"])(r,e);var t=Object(l["a"])(r);function r(){var e;return Object(a["a"])(this,r),e=t.apply(this,arguments),e.showAlert=!1,e.alertMsg="",e.alertVariant="default",e}return Object(o["a"])(r,[{key:"show",value:function(){this.$bvModal.show(this.id||"")}},{key:"hide",value:function(){this.hideAlert(),this.$bvModal.hide(this.id||"")}},{key:"alertError",value:function(e){if(this.alertVariant="danger",this.showAlert=!0,console.error(e),"string"===typeof e)this.alertMsg=e;else{this.alertMsg=e.error;var t=e.details||e.message;t&&(this.alertMsg+="<br><small>Details: "+t+"</small>")}}},{key:"alertInfo",value:function(e){this.alertVariant="primary",this.showAlert=!0,this.alertMsg=e}},{key:"onSubmit",value:function(e){this.$emit("submit")}},{key:"hideAlert",value:function(){this.showAlert=!1,this.alertMsg=""}}]),r}(u["default"]);h([Object(f["b"])({required:!0})],d.prototype,"id",void 0),h([Object(f["b"])({default:""})],d.prototype,"title",void 0),h([Object(f["b"])()],d.prototype,"subtitle",void 0),h([Object(f["b"])({required:!0})],d.prototype,"okTitle",void 0),h([Object(f["b"])({default:!1})],d.prototype,"modalLoading",void 0),d=h([Object(f["a"])({name:"app-modal-form",components:{AppButton:p["a"]}})],d);var v=d,b=v,m=(r(268),r(43)),g=Object(m["a"])(b,n,i,!1,null,null,null);g.options.__file="src/app/shared/components/app-modal/app-modal-form.vue";t["a"]=g.exports},267:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},268:function(e,t,r){"use strict";r(260)},269:function(e,t,r){"use strict";r(261)},271:function(e,t,r){"use strict";var n=r(19),i=r(279).trim,a=r(280);n({target:"String",proto:!0,forced:a("trim")},{trim:function(){return i(this)}})},279:function(e,t,r){var n=r(75),i=r(267),a="["+i+"]",o=RegExp("^"+a+a+"*"),s=RegExp(a+a+"*$"),l=function(e){return function(t){var r=String(n(t));return 1&e&&(r=r.replace(o,"")),2&e&&(r=r.replace(s,"")),r}};e.exports={start:l(1),end:l(2),trim:l(3)}},280:function(e,t,r){var n=r(24),i=r(267),a="​᠎";e.exports=function(e){return n((function(){return!!i[e]()||a[e]()!=a||i[e].name!==e}))}},281:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r(21),i=r(22),a=function(){function e(){Object(n["a"])(this,e)}return Object(i["a"])(e,null,[{key:"download",value:function(e,t){var r=document.createElement("a");r.href=e,r.setAttribute("download",t||e),document.body.appendChild(r),r.click(),document.body.removeChild(r)}},{key:"open",value:function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"_blank";null===(t=window.open(e,r))||void 0===t||t.focus()}}]),e}()},283:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));r(104);function n(e){var t=["KB","MB","GB","TB"],r=0;do{e/=1024}while(e>1024&&++r<t.length);return"".concat(Math.round(e)," ").concat(t[r])}},292:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-simple-file-upload"},[r("b-form-file",{attrs:{accept:e.accept},model:{value:e.modelValue,callback:function(t){e.modelValue=t},expression:"modelValue"}}),e.uploadProgress&&e.modelValue?r("div",{staticClass:"mar-top"},[e._v(" "+e._s(e.$t("uploading"))+" "),r("b-progress",{attrs:{max:e.uploadProgress.total}},[r("b-progress-bar",{attrs:{value:e.uploadProgress.loaded,variant:"success"}},[e.uploadProgress.loaded===e.uploadProgress.total?r("span",[e._v(" "+e._s(e.$t("upload-succes-filename",{filename:e.modelValue.name}))+" ")]):e._e(),e.uploadProgress.loaded<e.uploadProgress.total?r("span",[e._v(" "+e._s(Math.round(e.uploadProgress.loaded/e.uploadProgress.total*100))+"% ")]):e._e()])],1)],1):e._e()],1)},i=[];n._withStripped=!0;var a=r(21),o=r(22),s=r(31),l=r(30),c=r(40),u=(r(74),r(23),r(17)),f=r(34),p=function(e,t,r,n){var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o},h=function(e){Object(s["a"])(r,e);var t=Object(l["a"])(r);function r(){var e;return Object(a["a"])(this,r),e=t.apply(this,arguments),e.modelValue=null,e}return Object(o["a"])(r,[{key:"created",value:function(){this.modelValue=this.value}},{key:"onModelValueChanged",value:function(){this.$emit("input",this.modelValue)}}]),r}(u["default"]);p([Object(f["b"])({required:!0})],h.prototype,"value",void 0),p([Object(f["b"])({required:!0})],h.prototype,"uploadProgress",void 0),p([Object(f["b"])({default:"*"})],h.prototype,"accept",void 0),p([Object(f["d"])("modelValue")],h.prototype,"onModelValueChanged",null),h=p([Object(f["a"])({name:"app-simple-file-upload"})],h);var d=h,v=d,b=r(43),m=Object(b["a"])(v,n,i,!1,null,null,null);m.options.__file="src/app/shared/components/app-simple-file-upload/app-simple-file-upload.vue";t["a"]=m.exports},327:function(e,t,r){var n=r(24),i=r(25),a=r(69),o=i("iterator");e.exports=!n((function(){var e=new URL("b?a=1&b=2&c=3","http://a"),t=e.searchParams,r="";return e.pathname="c%20d",t.forEach((function(e,n){t["delete"]("b"),r+=n+e})),a&&!e.toJSON||!t.sort||"http://a/c%20d?a=1&c=3"!==e.href||"3"!==t.get("c")||"a=1"!==String(new URLSearchParams("?a=1"))||!t[o]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash||"a1c3"!==r||"x"!==new URL("http://x",void 0).host}))},328:function(e,t,r){"use strict";r(143);var n=r(19),i=r(50),a=r(327),o=r(49),s=r(202),l=r(68),c=r(201),u=r(78),f=r(196),p=r(37),h=r(93),d=r(142),v=r(35),b=r(32),m=r(91),g=r(80),y=r(389),w=r(139),k=r(25),j=i("fetch"),O=i("Headers"),S=k("iterator"),F="URLSearchParams",R=F+"Iterator",_=u.set,x=u.getterFor(F),D=u.getterFor(R),L=/\+/g,A=Array(4),C=function(e){return A[e-1]||(A[e-1]=RegExp("((?:%[\\da-f]{2}){"+e+"})","gi"))},P=function(e){try{return decodeURIComponent(e)}catch(t){return e}},U=function(e){var t=e.replace(L," "),r=4;try{return decodeURIComponent(t)}catch(n){while(r)t=t.replace(C(r--),P);return t}},$=/[!'()~]|%20/g,M={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"},E=function(e){return M[e]},q=function(e){return encodeURIComponent(e).replace($,E)},B=function(e,t){if(t){var r,n,i=t.split("&"),a=0;while(a<i.length)r=i[a++],r.length&&(n=r.split("="),e.push({key:U(n.shift()),value:U(n.join("="))}))}},T=function(e){this.entries.length=0,B(this.entries,e)},I=function(e,t){if(e<t)throw TypeError("Not enough arguments")},N=c((function(e,t){_(this,{type:R,iterator:y(x(e).entries),kind:t})}),"Iterator",(function(){var e=D(this),t=e.kind,r=e.iterator.next(),n=r.value;return r.done||(r.value="keys"===t?n.key:"values"===t?n.value:[n.key,n.value]),r})),z=function(){f(this,z,F);var e,t,r,n,i,a,o,s,l,c=arguments.length>0?arguments[0]:void 0,u=this,h=[];if(_(u,{type:F,entries:h,updateURL:function(){},updateSearchParams:T}),void 0!==c)if(b(c))if(e=w(c),"function"===typeof e){t=e.call(c),r=t.next;while(!(n=r.call(t)).done){if(i=y(v(n.value)),a=i.next,(o=a.call(i)).done||(s=a.call(i)).done||!a.call(i).done)throw TypeError("Expected sequence with length 2");h.push({key:o.value+"",value:s.value+""})}}else for(l in c)p(c,l)&&h.push({key:l,value:c[l]+""});else B(h,"string"===typeof c?"?"===c.charAt(0)?c.slice(1):c:c+"")},V=z.prototype;s(V,{append:function(e,t){I(arguments.length,2);var r=x(this);r.entries.push({key:e+"",value:t+""}),r.updateURL()},delete:function(e){I(arguments.length,1);var t=x(this),r=t.entries,n=e+"",i=0;while(i<r.length)r[i].key===n?r.splice(i,1):i++;t.updateURL()},get:function(e){I(arguments.length,1);for(var t=x(this).entries,r=e+"",n=0;n<t.length;n++)if(t[n].key===r)return t[n].value;return null},getAll:function(e){I(arguments.length,1);for(var t=x(this).entries,r=e+"",n=[],i=0;i<t.length;i++)t[i].key===r&&n.push(t[i].value);return n},has:function(e){I(arguments.length,1);var t=x(this).entries,r=e+"",n=0;while(n<t.length)if(t[n++].key===r)return!0;return!1},set:function(e,t){I(arguments.length,1);for(var r,n=x(this),i=n.entries,a=!1,o=e+"",s=t+"",l=0;l<i.length;l++)r=i[l],r.key===o&&(a?i.splice(l--,1):(a=!0,r.value=s));a||i.push({key:o,value:s}),n.updateURL()},sort:function(){var e,t,r,n=x(this),i=n.entries,a=i.slice();for(i.length=0,r=0;r<a.length;r++){for(e=a[r],t=0;t<r;t++)if(i[t].key>e.key){i.splice(t,0,e);break}t===r&&i.push(e)}n.updateURL()},forEach:function(e){var t,r=x(this).entries,n=h(e,arguments.length>1?arguments[1]:void 0,3),i=0;while(i<r.length)t=r[i++],n(t.value,t.key,this)},keys:function(){return new N(this,"keys")},values:function(){return new N(this,"values")},entries:function(){return new N(this,"entries")}},{enumerable:!0}),o(V,S,V.entries),o(V,"toString",(function(){var e,t=x(this).entries,r=[],n=0;while(n<t.length)e=t[n++],r.push(q(e.key)+"="+q(e.value));return r.join("&")}),{enumerable:!0}),l(z,F),n({global:!0,forced:!a},{URLSearchParams:z}),a||"function"!=typeof j||"function"!=typeof O||n({global:!0,enumerable:!0,forced:!0},{fetch:function(e){var t,r,n,i=[e];return arguments.length>1&&(t=arguments[1],b(t)&&(r=t.body,d(r)===F&&(n=t.headers?new O(t.headers):new O,n.has("content-type")||n.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"),t=m(t,{body:g(0,String(r)),headers:g(0,n)}))),i.push(t)),j.apply(this,i)}}),e.exports={URLSearchParams:z,getState:x}},387:function(e,t,r){"use strict";r(44);var n,i=r(19),a=r(38),o=r(327),s=r(26),l=r(200),c=r(49),u=r(196),f=r(37),p=r(203),h=r(204),d=r(145).codeAt,v=r(388),b=r(68),m=r(328),g=r(78),y=s.URL,w=m.URLSearchParams,k=m.getState,j=g.set,O=g.getterFor("URL"),S=Math.floor,F=Math.pow,R="Invalid authority",_="Invalid scheme",x="Invalid host",D="Invalid port",L=/[A-Za-z]/,A=/[\d+-.A-Za-z]/,C=/\d/,P=/^(0x|0X)/,U=/^[0-7]+$/,$=/^\d+$/,M=/^[\dA-Fa-f]+$/,E=/[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,q=/[\u0000\u0009\u000A\u000D #/:?@[\\]]/,B=/^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,T=/[\u0009\u000A\u000D]/g,I=function(e,t){var r,n,i;if("["==t.charAt(0)){if("]"!=t.charAt(t.length-1))return x;if(r=z(t.slice(1,-1)),!r)return x;e.host=r}else if(W(e)){if(t=v(t),E.test(t))return x;if(r=N(t),null===r)return x;e.host=r}else{if(q.test(t))return x;for(r="",n=h(t),i=0;i<n.length;i++)r+=X(n[i],J);e.host=r}},N=function(e){var t,r,n,i,a,o,s,l=e.split(".");if(l.length&&""==l[l.length-1]&&l.pop(),t=l.length,t>4)return e;for(r=[],n=0;n<t;n++){if(i=l[n],""==i)return e;if(a=10,i.length>1&&"0"==i.charAt(0)&&(a=P.test(i)?16:8,i=i.slice(8==a?1:2)),""===i)o=0;else{if(!(10==a?$:8==a?U:M).test(i))return e;o=parseInt(i,a)}r.push(o)}for(n=0;n<t;n++)if(o=r[n],n==t-1){if(o>=F(256,5-t))return null}else if(o>255)return null;for(s=r.pop(),n=0;n<r.length;n++)s+=r[n]*F(256,3-n);return s},z=function(e){var t,r,n,i,a,o,s,l=[0,0,0,0,0,0,0,0],c=0,u=null,f=0,p=function(){return e.charAt(f)};if(":"==p()){if(":"!=e.charAt(1))return;f+=2,c++,u=c}while(p()){if(8==c)return;if(":"!=p()){t=r=0;while(r<4&&M.test(p()))t=16*t+parseInt(p(),16),f++,r++;if("."==p()){if(0==r)return;if(f-=r,c>6)return;n=0;while(p()){if(i=null,n>0){if(!("."==p()&&n<4))return;f++}if(!C.test(p()))return;while(C.test(p())){if(a=parseInt(p(),10),null===i)i=a;else{if(0==i)return;i=10*i+a}if(i>255)return;f++}l[c]=256*l[c]+i,n++,2!=n&&4!=n||c++}if(4!=n)return;break}if(":"==p()){if(f++,!p())return}else if(p())return;l[c++]=t}else{if(null!==u)return;f++,c++,u=c}}if(null!==u){o=c-u,c=7;while(0!=c&&o>0)s=l[c],l[c--]=l[u+o-1],l[u+--o]=s}else if(8!=c)return;return l},V=function(e){for(var t=null,r=1,n=null,i=0,a=0;a<8;a++)0!==e[a]?(i>r&&(t=n,r=i),n=null,i=0):(null===n&&(n=a),++i);return i>r&&(t=n,r=i),t},H=function(e){var t,r,n,i;if("number"==typeof e){for(t=[],r=0;r<4;r++)t.unshift(e%256),e=S(e/256);return t.join(".")}if("object"==typeof e){for(t="",n=V(e),r=0;r<8;r++)i&&0===e[r]||(i&&(i=!1),n===r?(t+=r?":":"::",i=!0):(t+=e[r].toString(16),r<7&&(t+=":")));return"["+t+"]"}return e},J={},G=p({},J,{" ":1,'"':1,"<":1,">":1,"`":1}),Z=p({},G,{"#":1,"?":1,"{":1,"}":1}),K=p({},Z,{"/":1,":":1,";":1,"=":1,"@":1,"[":1,"\\":1,"]":1,"^":1,"|":1}),X=function(e,t){var r=d(e,0);return r>32&&r<127&&!f(t,e)?e:encodeURIComponent(e)},Q={ftp:21,file:null,http:80,https:443,ws:80,wss:443},W=function(e){return f(Q,e.scheme)},Y=function(e){return""!=e.username||""!=e.password},ee=function(e){return!e.host||e.cannotBeABaseURL||"file"==e.scheme},te=function(e,t){var r;return 2==e.length&&L.test(e.charAt(0))&&(":"==(r=e.charAt(1))||!t&&"|"==r)},re=function(e){var t;return e.length>1&&te(e.slice(0,2))&&(2==e.length||"/"===(t=e.charAt(2))||"\\"===t||"?"===t||"#"===t)},ne=function(e){var t=e.path,r=t.length;!r||"file"==e.scheme&&1==r&&te(t[0],!0)||t.pop()},ie=function(e){return"."===e||"%2e"===e.toLowerCase()},ae=function(e){return e=e.toLowerCase(),".."===e||"%2e."===e||".%2e"===e||"%2e%2e"===e},oe={},se={},le={},ce={},ue={},fe={},pe={},he={},de={},ve={},be={},me={},ge={},ye={},we={},ke={},je={},Oe={},Se={},Fe={},Re={},_e=function(e,t,r,i){var a,o,s,l,c=r||oe,u=0,p="",d=!1,v=!1,b=!1;r||(e.scheme="",e.username="",e.password="",e.host=null,e.port=null,e.path=[],e.query=null,e.fragment=null,e.cannotBeABaseURL=!1,t=t.replace(B,"")),t=t.replace(T,""),a=h(t);while(u<=a.length){switch(o=a[u],c){case oe:if(!o||!L.test(o)){if(r)return _;c=le;continue}p+=o.toLowerCase(),c=se;break;case se:if(o&&(A.test(o)||"+"==o||"-"==o||"."==o))p+=o.toLowerCase();else{if(":"!=o){if(r)return _;p="",c=le,u=0;continue}if(r&&(W(e)!=f(Q,p)||"file"==p&&(Y(e)||null!==e.port)||"file"==e.scheme&&!e.host))return;if(e.scheme=p,r)return void(W(e)&&Q[e.scheme]==e.port&&(e.port=null));p="","file"==e.scheme?c=ye:W(e)&&i&&i.scheme==e.scheme?c=ce:W(e)?c=he:"/"==a[u+1]?(c=ue,u++):(e.cannotBeABaseURL=!0,e.path.push(""),c=Se)}break;case le:if(!i||i.cannotBeABaseURL&&"#"!=o)return _;if(i.cannotBeABaseURL&&"#"==o){e.scheme=i.scheme,e.path=i.path.slice(),e.query=i.query,e.fragment="",e.cannotBeABaseURL=!0,c=Re;break}c="file"==i.scheme?ye:fe;continue;case ce:if("/"!=o||"/"!=a[u+1]){c=fe;continue}c=de,u++;break;case ue:if("/"==o){c=ve;break}c=Oe;continue;case fe:if(e.scheme=i.scheme,o==n)e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,e.path=i.path.slice(),e.query=i.query;else if("/"==o||"\\"==o&&W(e))c=pe;else if("?"==o)e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,e.path=i.path.slice(),e.query="",c=Fe;else{if("#"!=o){e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,e.path=i.path.slice(),e.path.pop(),c=Oe;continue}e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,e.path=i.path.slice(),e.query=i.query,e.fragment="",c=Re}break;case pe:if(!W(e)||"/"!=o&&"\\"!=o){if("/"!=o){e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,c=Oe;continue}c=ve}else c=de;break;case he:if(c=de,"/"!=o||"/"!=p.charAt(u+1))continue;u++;break;case de:if("/"!=o&&"\\"!=o){c=ve;continue}break;case ve:if("@"==o){d&&(p="%40"+p),d=!0,s=h(p);for(var m=0;m<s.length;m++){var g=s[m];if(":"!=g||b){var y=X(g,K);b?e.password+=y:e.username+=y}else b=!0}p=""}else if(o==n||"/"==o||"?"==o||"#"==o||"\\"==o&&W(e)){if(d&&""==p)return R;u-=h(p).length+1,p="",c=be}else p+=o;break;case be:case me:if(r&&"file"==e.scheme){c=ke;continue}if(":"!=o||v){if(o==n||"/"==o||"?"==o||"#"==o||"\\"==o&&W(e)){if(W(e)&&""==p)return x;if(r&&""==p&&(Y(e)||null!==e.port))return;if(l=I(e,p),l)return l;if(p="",c=je,r)return;continue}"["==o?v=!0:"]"==o&&(v=!1),p+=o}else{if(""==p)return x;if(l=I(e,p),l)return l;if(p="",c=ge,r==me)return}break;case ge:if(!C.test(o)){if(o==n||"/"==o||"?"==o||"#"==o||"\\"==o&&W(e)||r){if(""!=p){var w=parseInt(p,10);if(w>65535)return D;e.port=W(e)&&w===Q[e.scheme]?null:w,p=""}if(r)return;c=je;continue}return D}p+=o;break;case ye:if(e.scheme="file","/"==o||"\\"==o)c=we;else{if(!i||"file"!=i.scheme){c=Oe;continue}if(o==n)e.host=i.host,e.path=i.path.slice(),e.query=i.query;else if("?"==o)e.host=i.host,e.path=i.path.slice(),e.query="",c=Fe;else{if("#"!=o){re(a.slice(u).join(""))||(e.host=i.host,e.path=i.path.slice(),ne(e)),c=Oe;continue}e.host=i.host,e.path=i.path.slice(),e.query=i.query,e.fragment="",c=Re}}break;case we:if("/"==o||"\\"==o){c=ke;break}i&&"file"==i.scheme&&!re(a.slice(u).join(""))&&(te(i.path[0],!0)?e.path.push(i.path[0]):e.host=i.host),c=Oe;continue;case ke:if(o==n||"/"==o||"\\"==o||"?"==o||"#"==o){if(!r&&te(p))c=Oe;else if(""==p){if(e.host="",r)return;c=je}else{if(l=I(e,p),l)return l;if("localhost"==e.host&&(e.host=""),r)return;p="",c=je}continue}p+=o;break;case je:if(W(e)){if(c=Oe,"/"!=o&&"\\"!=o)continue}else if(r||"?"!=o)if(r||"#"!=o){if(o!=n&&(c=Oe,"/"!=o))continue}else e.fragment="",c=Re;else e.query="",c=Fe;break;case Oe:if(o==n||"/"==o||"\\"==o&&W(e)||!r&&("?"==o||"#"==o)){if(ae(p)?(ne(e),"/"==o||"\\"==o&&W(e)||e.path.push("")):ie(p)?"/"==o||"\\"==o&&W(e)||e.path.push(""):("file"==e.scheme&&!e.path.length&&te(p)&&(e.host&&(e.host=""),p=p.charAt(0)+":"),e.path.push(p)),p="","file"==e.scheme&&(o==n||"?"==o||"#"==o))while(e.path.length>1&&""===e.path[0])e.path.shift();"?"==o?(e.query="",c=Fe):"#"==o&&(e.fragment="",c=Re)}else p+=X(o,Z);break;case Se:"?"==o?(e.query="",c=Fe):"#"==o?(e.fragment="",c=Re):o!=n&&(e.path[0]+=X(o,J));break;case Fe:r||"#"!=o?o!=n&&("'"==o&&W(e)?e.query+="%27":e.query+="#"==o?"%23":X(o,J)):(e.fragment="",c=Re);break;case Re:o!=n&&(e.fragment+=X(o,G));break}u++}},xe=function(e){var t,r,n=u(this,xe,"URL"),i=arguments.length>1?arguments[1]:void 0,o=String(e),s=j(n,{type:"URL"});if(void 0!==i)if(i instanceof xe)t=O(i);else if(r=_e(t={},String(i)),r)throw TypeError(r);if(r=_e(s,o,null,t),r)throw TypeError(r);var l=s.searchParams=new w,c=k(l);c.updateSearchParams(s.query),c.updateURL=function(){s.query=String(l)||null},a||(n.href=Le.call(n),n.origin=Ae.call(n),n.protocol=Ce.call(n),n.username=Pe.call(n),n.password=Ue.call(n),n.host=$e.call(n),n.hostname=Me.call(n),n.port=Ee.call(n),n.pathname=qe.call(n),n.search=Be.call(n),n.searchParams=Te.call(n),n.hash=Ie.call(n))},De=xe.prototype,Le=function(){var e=O(this),t=e.scheme,r=e.username,n=e.password,i=e.host,a=e.port,o=e.path,s=e.query,l=e.fragment,c=t+":";return null!==i?(c+="//",Y(e)&&(c+=r+(n?":"+n:"")+"@"),c+=H(i),null!==a&&(c+=":"+a)):"file"==t&&(c+="//"),c+=e.cannotBeABaseURL?o[0]:o.length?"/"+o.join("/"):"",null!==s&&(c+="?"+s),null!==l&&(c+="#"+l),c},Ae=function(){var e=O(this),t=e.scheme,r=e.port;if("blob"==t)try{return new URL(t.path[0]).origin}catch(n){return"null"}return"file"!=t&&W(e)?t+"://"+H(e.host)+(null!==r?":"+r:""):"null"},Ce=function(){return O(this).scheme+":"},Pe=function(){return O(this).username},Ue=function(){return O(this).password},$e=function(){var e=O(this),t=e.host,r=e.port;return null===t?"":null===r?H(t):H(t)+":"+r},Me=function(){var e=O(this).host;return null===e?"":H(e)},Ee=function(){var e=O(this).port;return null===e?"":String(e)},qe=function(){var e=O(this),t=e.path;return e.cannotBeABaseURL?t[0]:t.length?"/"+t.join("/"):""},Be=function(){var e=O(this).query;return e?"?"+e:""},Te=function(){return O(this).searchParams},Ie=function(){var e=O(this).fragment;return e?"#"+e:""},Ne=function(e,t){return{get:e,set:t,configurable:!0,enumerable:!0}};if(a&&l(De,{href:Ne(Le,(function(e){var t=O(this),r=String(e),n=_e(t,r);if(n)throw TypeError(n);k(t.searchParams).updateSearchParams(t.query)})),origin:Ne(Ae),protocol:Ne(Ce,(function(e){var t=O(this);_e(t,String(e)+":",oe)})),username:Ne(Pe,(function(e){var t=O(this),r=h(String(e));if(!ee(t)){t.username="";for(var n=0;n<r.length;n++)t.username+=X(r[n],K)}})),password:Ne(Ue,(function(e){var t=O(this),r=h(String(e));if(!ee(t)){t.password="";for(var n=0;n<r.length;n++)t.password+=X(r[n],K)}})),host:Ne($e,(function(e){var t=O(this);t.cannotBeABaseURL||_e(t,String(e),be)})),hostname:Ne(Me,(function(e){var t=O(this);t.cannotBeABaseURL||_e(t,String(e),me)})),port:Ne(Ee,(function(e){var t=O(this);ee(t)||(e=String(e),""==e?t.port=null:_e(t,e,ge))})),pathname:Ne(qe,(function(e){var t=O(this);t.cannotBeABaseURL||(t.path=[],_e(t,e+"",je))})),search:Ne(Be,(function(e){var t=O(this);e=String(e),""==e?t.query=null:("?"==e.charAt(0)&&(e=e.slice(1)),t.query="",_e(t,e,Fe)),k(t.searchParams).updateSearchParams(t.query)})),searchParams:Ne(Te),hash:Ne(Ie,(function(e){var t=O(this);e=String(e),""!=e?("#"==e.charAt(0)&&(e=e.slice(1)),t.fragment="",_e(t,e,Re)):t.fragment=null}))}),c(De,"toJSON",(function(){return Le.call(this)}),{enumerable:!0}),c(De,"toString",(function(){return Le.call(this)}),{enumerable:!0}),y){var ze=y.createObjectURL,Ve=y.revokeObjectURL;ze&&c(xe,"createObjectURL",(function(e){return ze.apply(y,arguments)})),Ve&&c(xe,"revokeObjectURL",(function(e){return Ve.apply(y,arguments)}))}b(xe,"URL"),i({global:!0,forced:!o,sham:!a},{URL:xe})},388:function(e,t,r){"use strict";var n=2147483647,i=36,a=1,o=26,s=38,l=700,c=72,u=128,f="-",p=/[^\0-\u007E]/,h=/[.\u3002\uFF0E\uFF61]/g,d="Overflow: input needs wider integers to process",v=i-a,b=Math.floor,m=String.fromCharCode,g=function(e){var t=[],r=0,n=e.length;while(r<n){var i=e.charCodeAt(r++);if(i>=55296&&i<=56319&&r<n){var a=e.charCodeAt(r++);56320==(64512&a)?t.push(((1023&i)<<10)+(1023&a)+65536):(t.push(i),r--)}else t.push(i)}return t},y=function(e){return e+22+75*(e<26)},w=function(e,t,r){var n=0;for(e=r?b(e/l):e>>1,e+=b(e/t);e>v*o>>1;n+=i)e=b(e/v);return b(n+(v+1)*e/(e+s))},k=function(e){var t=[];e=g(e);var r,s,l=e.length,p=u,h=0,v=c;for(r=0;r<e.length;r++)s=e[r],s<128&&t.push(m(s));var k=t.length,j=k;k&&t.push(f);while(j<l){var O=n;for(r=0;r<e.length;r++)s=e[r],s>=p&&s<O&&(O=s);var S=j+1;if(O-p>b((n-h)/S))throw RangeError(d);for(h+=(O-p)*S,p=O,r=0;r<e.length;r++){if(s=e[r],s<p&&++h>n)throw RangeError(d);if(s==p){for(var F=h,R=i;;R+=i){var _=R<=v?a:R>=v+o?o:R-v;if(F<_)break;var x=F-_,D=i-_;t.push(m(y(_+x%D))),F=b(x/D)}t.push(m(y(F))),v=w(h,S,j==k),h=0,++j}}++h,++p}return t.join("")};e.exports=function(e){var t,r,n=[],i=e.toLowerCase().replace(h,".").split(".");for(t=0;t<i.length;t++)r=i[t],n.push(p.test(r)?"xn--"+k(r):r);return n.join(".")}},389:function(e,t,r){var n=r(35),i=r(139);e.exports=function(e){var t=i(e);if("function"!=typeof t)throw TypeError(String(e)+" is not iterable");return n(t.call(e))}},408:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("app-content",{attrs:{title:e.$t("documentation")}},[e.isSuperAdmin?r("div",{staticClass:"app-doc-files-table-toolbar"},[r("b-button",{attrs:{variant:"primary"},on:{click:e.onCreateDocFileClick}},[e._v(" "+e._s(e.$t("upload-new-doc-file"))+" ")])],1):e._e(),r("app-table-container",[r("b-table",{attrs:{fields:e.columns,items:e.rows,"head-variant":"light",hover:"",busy:e.loading},scopedSlots:e._u([{key:"table-busy",fn:function(){return[r("div",{staticClass:"text-center"},[r("b-spinner",{staticClass:"align-middle"})],1)]},proxy:!0},{key:"cell(fileName)",fn:function(t){return[r("a",{attrs:{href:"#"},on:{click:function(r){return r.preventDefault(),e.onFileClick(t.item)}}},[e._v(e._s(t.item.fileName))]),r("div",{directives:[{name:"show",rawName:"v-show",value:t.item.description,expression:"row.item.description"}],staticClass:"grayed"},[e._v(" "+e._s(t.item.description)+" ")])]}},{key:"cell(updatedAtBy)",fn:function(t){return[r("small",{domProps:{innerHTML:e._s(t.item.updatedAtBy)}})]}},{key:"cell(actions)",fn:function(t){return[r("div",{staticClass:"hover-cell pull-right"},[r("b-button",{attrs:{variant:"secondary",size:"sm",title:e.$t("copy-file-link")},on:{click:function(r){return e.onCopyDocFileClick(t.item)}}},[r("b-icon",{attrs:{icon:"clipboard"}})],1),e.isSuperAdmin?r("b-button",{attrs:{variant:"secondary",size:"sm",title:e.$t("edit-doc-file")},on:{click:function(r){return e.onEditDocFileClick(t.item)}}},[r("b-icon",{attrs:{icon:"wrench"}})],1):e._e(),e.isSuperAdmin?r("b-button",{attrs:{variant:"outline-danger",size:"sm",title:e.$t("delete-doc-file")},on:{click:function(r){return e.onDeleteDocFileClick(t.item)}}},[r("b-icon",{attrs:{icon:"trash"}})],1):e._e()],1)]}}])})],1),r("app-modal-form",{ref:"appDocFileModal",attrs:{id:"edit-doc-file-modal",title:e.docFileModalTitle,subtitle:e.docFileModalSubtitle,"ok-title":e.docFileModalOkTitle,modalLoading:e.docFileModalLoading},on:{submit:e.onSubmitDocFile}},[e.currentDocFile?r("div",[r("b-form-group",{attrs:{label:e.$t("doc-file")}},[r("app-simple-file-upload",{attrs:{uploadProgress:e.uploadProgress},model:{value:e.currentDocFile.file,callback:function(t){e.$set(e.currentDocFile,"file",t)},expression:"currentDocFile.file"}})],1),r("b-form-group",{attrs:{label:e.$t("description")}},[r("b-form-textarea",{attrs:{id:"description"},model:{value:e.currentDocFile.description,callback:function(t){e.$set(e.currentDocFile,"description",t)},expression:"currentDocFile.description"}})],1)],1):e._e()])],1)},i=[];n._withStripped=!0;var a=r(64),o=r(8),s=r(14),l=r(21),c=r(22),u=r(31),f=r(30),p=r(40),h=(r(74),r(23),r(191),r(134),r(133),r(67),r(77),r(44),r(48),r(387),r(328),r(271),r(104),r(34)),d=r(262),v=r(266),b=r(61),m=r(62),g=r(292),y=r(88),w=r(135),k=r(283),j=r(281),O=r(72),S=function(e,t,r,n){var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(p["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o},F=function(e){Object(u["a"])(r,e);var t=Object(f["a"])(r);function r(){var e;return Object(l["a"])(this,r),e=t.apply(this,arguments),e.columns=[],e.rows=[],e.loading=!1,e.docFileModalLoading=!1,e.docFileModalTitle="",e.docFileModalSubtitle="",e.docFileModalOkTitle="",e.currentDocFile=null,e.uploadProgress=null,e}return Object(c["a"])(r,[{key:"created",value:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(){var t,r=this;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.columns=[{key:"fileName",label:this.$t("file-name").toString()},{key:"updatedAtBy",label:this.$t("changed").toString()},{key:"size",label:this.$t("size").toString()},{key:"actions",label:""}],e.next=3,this.updateDocFileRows();case 3:if(!this.$route.query.fileId){e.next=8;break}if(t=this.rows.find((function(e){return e.id===r.$route.query.fileId})),!t){e.next=8;break}return e.next=8,this.onFileClick(t,"_self");case 8:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"updateDocFileRows",value:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(){var t=this;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.loading=!0,e.prev=1,e.next=4,b["a"].getDocFiles();case 4:this.rows=e.sent.map((function(e){return{id:e.id,file:null,description:e.description||null,fileName:e.file_name,updatedAtBy:t.getChangedText(e),size:Object(k["a"])(e.size)}})),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](1),this.showError(e.t0);case 10:return e.prev=10,this.loading=!1,e.finish(10);case 13:case"end":return e.stop()}}),e,this,[[1,7,10,13]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onFileClick",value:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(t,r){var n;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b["a"].getDocFileUrl(t.id);case 3:n=e.sent,j["a"].open(n.url,r||"_blank"),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.showError(e.t0);case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"onCopyDocFileClick",value:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(t){var r;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r=new URL("doc/files?fileId=".concat(t.id),O["b"]).toString(),e.next=4,navigator.clipboard.writeText(r);case 4:this.showSuccess(this.$t("copy-file-link-success").toString()),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.showError(e.t0);case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onCreateDocFileClick",value:function(){try{this.currentDocFile={file:null,description:null},this.docFileModalTitle=this.$t("upload-new-doc-file").toString(),this.docFileModalSubtitle="",this.docFileModalOkTitle=this.$t("create").toString(),this.uploadProgress=null,this.appDocFileModal.show()}catch(e){this.showError(e)}}},{key:"onEditDocFileClick",value:function(e){try{this.currentDocFile=e,this.docFileModalTitle=this.$t("edit-doc-file").toString(),this.docFileModalSubtitle=e.fileName||"",this.docFileModalOkTitle=this.$t("apply").toString(),this.uploadProgress=null,this.appDocFileModal.show()}catch(t){this.showError(t)}}},{key:"onSubmitDocFile",value:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(){var t=this;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.docFileModalLoading=!0,e.prev=1,this.currentDocFile){e.next=4;break}throw new Error("Something went wrong! (Detais: currentDocFile is falsy)");case 4:if(!this.currentDocFile.id){e.next=12;break}if(this.currentDocFile.file||null!==this.currentDocFile.description&&void 0!==this.currentDocFile.description){e.next=7;break}throw{error:"MISSING_FILE_OR_DESCRIPTION",message:"Nothing changed..."};case 7:return e.next=9,b["a"].editDocFile(this.currentDocFile.id,this.currentDocFile.file||void 0,this.currentDocFile.description||void 0,(function(e){return t.uploadProgress={total:e.total,loaded:e.loaded}}));case 9:this.showSuccess(this.$t("doc-file-updated-success").toString()),e.next=17;break;case 12:if(this.currentDocFile.file){e.next=14;break}throw{error:"MISSING_FILE",message:"Please select a document to upload"};case 14:return e.next=16,b["a"].createDocFile(this.currentDocFile.file,this.currentDocFile.description||void 0,(function(e){return t.uploadProgress={total:e.total,loaded:e.loaded}}));case 16:this.showSuccess(this.$t("doc-file-created-success").toString());case 17:return this.appDocFileModal.hide(),e.next=20,this.updateDocFileRows();case 20:e.next=25;break;case 22:e.prev=22,e.t0=e["catch"](1),this.showError(e.t0);case 25:return e.prev=25,this.docFileModalLoading=!1,e.finish(25);case 28:case"end":return e.stop()}}),e,this,[[1,22,25,28]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onDeleteDocFileClick",value:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(t){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.loading=!0,e.prev=1,confirm(this.$t("sure-delete-doc-file",{fileName:t.fileName}).toString())){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,b["a"].deleteDocFile(t.id);case 6:return this.showSuccess(this.$t("doc-file-deleted-success",{fileName:t.fileName}).toString()),e.next=9,this.updateDocFileRows();case 9:e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](1),this.showError(e.t0);case 14:return e.prev=14,this.loading=!1,e.finish(14);case 17:case"end":return e.stop()}}),e,this,[[1,11,14,17]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getChangedText",value:function(e){var t=(e.user.first_name+" "+e.user.last_name).trim()||e.user.email,r="",n="";return e.updated_at?(r=this.$t("updated").toString(),n=this.$t.apply(this,Object(a["a"])(w["a"].getTimeDiff(e.updated_at))).toString()):(r=this.$t("created").toString(),n=this.$t.apply(this,Object(a["a"])(w["a"].getTimeDiff(e.created_at))).toString()),"".concat(r," ").concat(n," ").concat(this.$t("by").toString()," ").concat(t)}}]),r}(m["a"]);S([Object(h["c"])()],F.prototype,"appDocFileModal",void 0),F=S([Object(h["a"])({name:"app-doc-files",components:{AppContent:y["a"],AppTableContainer:d["a"],AppModalForm:v["a"],AppSimpleFileUpload:g["a"]}})],F);var R=F,_=R,x=r(43),D=Object(x["a"])(_,n,i,!1,null,null,null);D.options.__file="src/app/doc/doc-files.vue";t["default"]=D.exports}}]);