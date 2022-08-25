(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{265:function(e,t,r){},266:function(e,t,r){},267:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:"app-table-container "+(e.size?"app-table-container-"+e.size:"")},[e._t("default")],2)},i=[];n._withStripped=!0;var a=r(20),o=r(19),s=r(25),l=r(24),c=r(32),u=(r(49),r(22),r(16)),f=r(18),h=function(e,t,r,n){var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o},p=function(e){Object(s["a"])(r,e);var t=Object(l["a"])(r);function r(){return Object(o["a"])(this,r),t.apply(this,arguments)}return Object(a["a"])(r)}(u["default"]);h([Object(f["b"])({default:""})],p.prototype,"size",void 0),p=h([f["a"]],p);var d=p,v=d,m=(r(272),r(33)),b=Object(m["a"])(v,n,i,!1,null,null,null);b.options.__file="src/app/shared/components/app-table-container/app-table-container.vue";t["a"]=b.exports},269:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-modal",{staticClass:"app-modal-form",attrs:{id:e.id,"ok-title":e.okTitle,"no-close-on-backdrop":""},scopedSlots:e._u([{key:"modal-title",fn:function(){return[r("div",{staticClass:"app-modal-form-title"},[e._t("modal-title",[r("h2",[e._v(e._s(e.title)+" "),e.superAdminProtected?r("app-super-admin-marker"):e._e()],1),e.subtitle?r("div",{staticClass:"app-modal-form-title-subtitle grayed",domProps:{innerHTML:e._s(e.subtitle)}}):e._e()])],2)]},proxy:!0},{key:"modal-footer",fn:function(){return[r("b-button",{attrs:{variant:"secondary"},on:{click:function(t){return e.$bvModal.hide(e.id)}}},[e._v(e._s(e.$t("cancel")))]),r("app-button",{attrs:{loading:e.modalLoading},on:{click:e.onSubmit}},[e._v(e._s(e.okTitle))])]},proxy:!0}],null,!0)},[r("b-alert",{staticClass:"app-modal-form-alert",attrs:{variant:e.alertVariant,dismissible:""},domProps:{innerHTML:e._s(e.alertMsg)},model:{value:e.showAlert,callback:function(t){e.showAlert=t},expression:"showAlert"}}),r("form",{on:{submit:e.onSubmit}},[e._t("default")],2)],1)},i=[];n._withStripped=!0;var a=r(19),o=r(20),s=r(25),l=r(24),c=r(32),u=(r(49),r(22),r(18)),f=r(136),h=r(44),p=r(66),d=function(e,t,r,n){var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o},v=function(e){Object(s["a"])(r,e);var t=Object(l["a"])(r);function r(){var e;return Object(a["a"])(this,r),e=t.apply(this,arguments),e.showAlert=!1,e.alertMsg="",e.alertVariant="default",e}return Object(o["a"])(r,[{key:"show",value:function(){this.$bvModal.show(this.id||"")}},{key:"hide",value:function(){this.hideAlert(),this.$bvModal.hide(this.id||"")}},{key:"alertError",value:function(e){if(this.alertVariant="danger",this.showAlert=!0,console.error(e),"string"===typeof e)this.alertMsg=e;else{this.alertMsg=e.error;var t=e.details||e.message;t&&(this.alertMsg+="<br><small>Details: "+t+"</small>")}}},{key:"alertInfo",value:function(e){this.alertVariant="primary",this.showAlert=!0,this.alertMsg=e}},{key:"onSubmit",value:function(e){this.$emit("submit")}},{key:"hideAlert",value:function(){this.showAlert=!1,this.alertMsg=""}}]),r}(h["a"]);d([Object(u["b"])({required:!0})],v.prototype,"id",void 0),d([Object(u["b"])({default:""})],v.prototype,"title",void 0),d([Object(u["b"])()],v.prototype,"subtitle",void 0),d([Object(u["b"])({required:!0})],v.prototype,"okTitle",void 0),d([Object(u["b"])({default:!1})],v.prototype,"modalLoading",void 0),d([Object(u["b"])({default:!1})],v.prototype,"superAdminProtected",void 0),v=d([Object(u["a"])({name:"app-modal-form",components:{AppButton:f["a"],AppSuperAdminMarker:p["a"]}})],v);var m=v,b=m,g=(r(271),r(33)),y=Object(g["a"])(b,n,i,!1,null,null,null);y.options.__file="src/app/shared/components/app-modal/app-modal-form.vue";t["a"]=y.exports},270:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},271:function(e,t,r){"use strict";r(265)},272:function(e,t,r){"use strict";r(266)},274:function(e,t,r){"use strict";var n=r(23),i=r(280).trim,a=r(281);n({target:"String",proto:!0,forced:a("trim")},{trim:function(){return i(this)}})},280:function(e,t,r){var n=r(76),i=r(270),a="["+i+"]",o=RegExp("^"+a+a+"*"),s=RegExp(a+a+"*$"),l=function(e){return function(t){var r=String(n(t));return 1&e&&(r=r.replace(o,"")),2&e&&(r=r.replace(s,"")),r}};e.exports={start:l(1),end:l(2),trim:l(3)}},281:function(e,t,r){var n=r(27),i=r(270),a="​᠎";e.exports=function(e){return n((function(){return!!i[e]()||a[e]()!=a||i[e].name!==e}))}},282:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r(19),i=r(20),a=function(){function e(){Object(n["a"])(this,e)}return Object(i["a"])(e,null,[{key:"download",value:function(e,t){var r=document.createElement("a");r.href=e,r.setAttribute("download",t||e),document.body.appendChild(r),r.click(),document.body.removeChild(r)}},{key:"open",value:function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"_blank";null===(t=window.open(e,r))||void 0===t||t.focus()}}]),e}()},284:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));r(106);function n(e){var t=["KB","MB","GB","TB"],r=0;do{e/=1024}while(e>1024&&++r<t.length);return"".concat(Math.round(e)," ").concat(t[r])}},293:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-simple-file-upload"},[r("b-form-file",{attrs:{accept:e.accept},model:{value:e.modelValue,callback:function(t){e.modelValue=t},expression:"modelValue"}}),e.uploadProgress&&e.modelValue?r("div",{staticClass:"mar-top"},[e._v(" "+e._s(e.$t("uploading"))+" "),r("b-progress",{attrs:{max:e.uploadProgress.total}},[r("b-progress-bar",{attrs:{value:e.uploadProgress.loaded,variant:"success"}},[e.uploadProgress.loaded===e.uploadProgress.total?r("span",[e._v(" "+e._s(e.$t("upload-succes-filename",{filename:e.modelValue.name}))+" ")]):e._e(),e.uploadProgress.loaded<e.uploadProgress.total?r("span",[e._v(" "+e._s(Math.round(e.uploadProgress.loaded/e.uploadProgress.total*100))+"% ")]):e._e()])],1)],1):e._e()],1)},i=[];n._withStripped=!0;var a=r(19),o=r(20),s=r(25),l=r(24),c=r(32),u=(r(49),r(22),r(16)),f=r(18),h=function(e,t,r,n){var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o},p=function(e){Object(s["a"])(r,e);var t=Object(l["a"])(r);function r(){var e;return Object(a["a"])(this,r),e=t.apply(this,arguments),e.modelValue=null,e}return Object(o["a"])(r,[{key:"created",value:function(){this.modelValue=this.value}},{key:"onModelValueChanged",value:function(){this.$emit("input",this.modelValue)}}]),r}(u["default"]);h([Object(f["b"])({required:!0})],p.prototype,"value",void 0),h([Object(f["b"])({required:!0})],p.prototype,"uploadProgress",void 0),h([Object(f["b"])({default:"*"})],p.prototype,"accept",void 0),h([Object(f["d"])("modelValue")],p.prototype,"onModelValueChanged",null),p=h([Object(f["a"])({name:"app-simple-file-upload"})],p);var d=p,v=d,m=r(33),b=Object(m["a"])(v,n,i,!1,null,null,null);b.options.__file="src/app/shared/components/app-simple-file-upload/app-simple-file-upload.vue";t["a"]=b.exports},328:function(e,t,r){var n=r(27),i=r(28),a=r(71),o=i("iterator");e.exports=!n((function(){var e=new URL("b?a=1&b=2&c=3","http://a"),t=e.searchParams,r="";return e.pathname="c%20d",t.forEach((function(e,n){t["delete"]("b"),r+=n+e})),a&&!e.toJSON||!t.sort||"http://a/c%20d?a=1&c=3"!==e.href||"3"!==t.get("c")||"a=1"!==String(new URLSearchParams("?a=1"))||!t[o]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash||"a1c3"!==r||"x"!==new URL("http://x",void 0).host}))},329:function(e,t,r){"use strict";r(148);var n=r(23),i=r(52),a=r(328),o=r(51),s=r(208),l=r(70),c=r(207),u=r(79),f=r(203),h=r(39),p=r(95),d=r(147),v=r(37),m=r(35),b=r(93),g=r(81),y=r(390),w=r(144),k=r(28),j=i("fetch"),O=i("Headers"),F=k("iterator"),S="URLSearchParams",R=S+"Iterator",x=u.set,_=u.getterFor(S),D=u.getterFor(R),A=/\+/g,L=Array(4),P=function(e){return L[e-1]||(L[e-1]=RegExp("((?:%[\\da-f]{2}){"+e+"})","gi"))},C=function(e){try{return decodeURIComponent(e)}catch(t){return e}},U=function(e){var t=e.replace(A," "),r=4;try{return decodeURIComponent(t)}catch(n){while(r)t=t.replace(P(r--),C);return t}},$=/[!'()~]|%20/g,M={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"},E=function(e){return M[e]},q=function(e){return encodeURIComponent(e).replace($,E)},B=function(e,t){if(t){var r,n,i=t.split("&"),a=0;while(a<i.length)r=i[a++],r.length&&(n=r.split("="),e.push({key:U(n.shift()),value:U(n.join("="))}))}},T=function(e){this.entries.length=0,B(this.entries,e)},I=function(e,t){if(e<t)throw TypeError("Not enough arguments")},N=c((function(e,t){x(this,{type:R,iterator:y(_(e).entries),kind:t})}),"Iterator",(function(){var e=D(this),t=e.kind,r=e.iterator.next(),n=r.value;return r.done||(r.value="keys"===t?n.key:"values"===t?n.value:[n.key,n.value]),r})),V=function(){f(this,V,S);var e,t,r,n,i,a,o,s,l,c=arguments.length>0?arguments[0]:void 0,u=this,p=[];if(x(u,{type:S,entries:p,updateURL:function(){},updateSearchParams:T}),void 0!==c)if(m(c))if(e=w(c),"function"===typeof e){t=e.call(c),r=t.next;while(!(n=r.call(t)).done){if(i=y(v(n.value)),a=i.next,(o=a.call(i)).done||(s=a.call(i)).done||!a.call(i).done)throw TypeError("Expected sequence with length 2");p.push({key:o.value+"",value:s.value+""})}}else for(l in c)h(c,l)&&p.push({key:l,value:c[l]+""});else B(p,"string"===typeof c?"?"===c.charAt(0)?c.slice(1):c:c+"")},z=V.prototype;s(z,{append:function(e,t){I(arguments.length,2);var r=_(this);r.entries.push({key:e+"",value:t+""}),r.updateURL()},delete:function(e){I(arguments.length,1);var t=_(this),r=t.entries,n=e+"",i=0;while(i<r.length)r[i].key===n?r.splice(i,1):i++;t.updateURL()},get:function(e){I(arguments.length,1);for(var t=_(this).entries,r=e+"",n=0;n<t.length;n++)if(t[n].key===r)return t[n].value;return null},getAll:function(e){I(arguments.length,1);for(var t=_(this).entries,r=e+"",n=[],i=0;i<t.length;i++)t[i].key===r&&n.push(t[i].value);return n},has:function(e){I(arguments.length,1);var t=_(this).entries,r=e+"",n=0;while(n<t.length)if(t[n++].key===r)return!0;return!1},set:function(e,t){I(arguments.length,1);for(var r,n=_(this),i=n.entries,a=!1,o=e+"",s=t+"",l=0;l<i.length;l++)r=i[l],r.key===o&&(a?i.splice(l--,1):(a=!0,r.value=s));a||i.push({key:o,value:s}),n.updateURL()},sort:function(){var e,t,r,n=_(this),i=n.entries,a=i.slice();for(i.length=0,r=0;r<a.length;r++){for(e=a[r],t=0;t<r;t++)if(i[t].key>e.key){i.splice(t,0,e);break}t===r&&i.push(e)}n.updateURL()},forEach:function(e){var t,r=_(this).entries,n=p(e,arguments.length>1?arguments[1]:void 0,3),i=0;while(i<r.length)t=r[i++],n(t.value,t.key,this)},keys:function(){return new N(this,"keys")},values:function(){return new N(this,"values")},entries:function(){return new N(this,"entries")}},{enumerable:!0}),o(z,F,z.entries),o(z,"toString",(function(){var e,t=_(this).entries,r=[],n=0;while(n<t.length)e=t[n++],r.push(q(e.key)+"="+q(e.value));return r.join("&")}),{enumerable:!0}),l(V,S),n({global:!0,forced:!a},{URLSearchParams:V}),a||"function"!=typeof j||"function"!=typeof O||n({global:!0,enumerable:!0,forced:!0},{fetch:function(e){var t,r,n,i=[e];return arguments.length>1&&(t=arguments[1],m(t)&&(r=t.body,d(r)===S&&(n=t.headers?new O(t.headers):new O,n.has("content-type")||n.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"),t=b(t,{body:g(0,String(r)),headers:g(0,n)}))),i.push(t)),j.apply(this,i)}}),e.exports={URLSearchParams:V,getState:_}},388:function(e,t,r){"use strict";r(45);var n,i=r(23),a=r(40),o=r(328),s=r(29),l=r(206),c=r(51),u=r(203),f=r(39),h=r(209),p=r(210),d=r(150).codeAt,v=r(389),m=r(70),b=r(329),g=r(79),y=s.URL,w=b.URLSearchParams,k=b.getState,j=g.set,O=g.getterFor("URL"),F=Math.floor,S=Math.pow,R="Invalid authority",x="Invalid scheme",_="Invalid host",D="Invalid port",A=/[A-Za-z]/,L=/[\d+-.A-Za-z]/,P=/\d/,C=/^(0x|0X)/,U=/^[0-7]+$/,$=/^\d+$/,M=/^[\dA-Fa-f]+$/,E=/[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,q=/[\u0000\u0009\u000A\u000D #/:?@[\\]]/,B=/^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,T=/[\u0009\u000A\u000D]/g,I=function(e,t){var r,n,i;if("["==t.charAt(0)){if("]"!=t.charAt(t.length-1))return _;if(r=V(t.slice(1,-1)),!r)return _;e.host=r}else if(W(e)){if(t=v(t),E.test(t))return _;if(r=N(t),null===r)return _;e.host=r}else{if(q.test(t))return _;for(r="",n=p(t),i=0;i<n.length;i++)r+=X(n[i],J);e.host=r}},N=function(e){var t,r,n,i,a,o,s,l=e.split(".");if(l.length&&""==l[l.length-1]&&l.pop(),t=l.length,t>4)return e;for(r=[],n=0;n<t;n++){if(i=l[n],""==i)return e;if(a=10,i.length>1&&"0"==i.charAt(0)&&(a=C.test(i)?16:8,i=i.slice(8==a?1:2)),""===i)o=0;else{if(!(10==a?$:8==a?U:M).test(i))return e;o=parseInt(i,a)}r.push(o)}for(n=0;n<t;n++)if(o=r[n],n==t-1){if(o>=S(256,5-t))return null}else if(o>255)return null;for(s=r.pop(),n=0;n<r.length;n++)s+=r[n]*S(256,3-n);return s},V=function(e){var t,r,n,i,a,o,s,l=[0,0,0,0,0,0,0,0],c=0,u=null,f=0,h=function(){return e.charAt(f)};if(":"==h()){if(":"!=e.charAt(1))return;f+=2,c++,u=c}while(h()){if(8==c)return;if(":"!=h()){t=r=0;while(r<4&&M.test(h()))t=16*t+parseInt(h(),16),f++,r++;if("."==h()){if(0==r)return;if(f-=r,c>6)return;n=0;while(h()){if(i=null,n>0){if(!("."==h()&&n<4))return;f++}if(!P.test(h()))return;while(P.test(h())){if(a=parseInt(h(),10),null===i)i=a;else{if(0==i)return;i=10*i+a}if(i>255)return;f++}l[c]=256*l[c]+i,n++,2!=n&&4!=n||c++}if(4!=n)return;break}if(":"==h()){if(f++,!h())return}else if(h())return;l[c++]=t}else{if(null!==u)return;f++,c++,u=c}}if(null!==u){o=c-u,c=7;while(0!=c&&o>0)s=l[c],l[c--]=l[u+o-1],l[u+--o]=s}else if(8!=c)return;return l},z=function(e){for(var t=null,r=1,n=null,i=0,a=0;a<8;a++)0!==e[a]?(i>r&&(t=n,r=i),n=null,i=0):(null===n&&(n=a),++i);return i>r&&(t=n,r=i),t},H=function(e){var t,r,n,i;if("number"==typeof e){for(t=[],r=0;r<4;r++)t.unshift(e%256),e=F(e/256);return t.join(".")}if("object"==typeof e){for(t="",n=z(e),r=0;r<8;r++)i&&0===e[r]||(i&&(i=!1),n===r?(t+=r?":":"::",i=!0):(t+=e[r].toString(16),r<7&&(t+=":")));return"["+t+"]"}return e},J={},G=h({},J,{" ":1,'"':1,"<":1,">":1,"`":1}),Z=h({},G,{"#":1,"?":1,"{":1,"}":1}),K=h({},Z,{"/":1,":":1,";":1,"=":1,"@":1,"[":1,"\\":1,"]":1,"^":1,"|":1}),X=function(e,t){var r=d(e,0);return r>32&&r<127&&!f(t,e)?e:encodeURIComponent(e)},Q={ftp:21,file:null,http:80,https:443,ws:80,wss:443},W=function(e){return f(Q,e.scheme)},Y=function(e){return""!=e.username||""!=e.password},ee=function(e){return!e.host||e.cannotBeABaseURL||"file"==e.scheme},te=function(e,t){var r;return 2==e.length&&A.test(e.charAt(0))&&(":"==(r=e.charAt(1))||!t&&"|"==r)},re=function(e){var t;return e.length>1&&te(e.slice(0,2))&&(2==e.length||"/"===(t=e.charAt(2))||"\\"===t||"?"===t||"#"===t)},ne=function(e){var t=e.path,r=t.length;!r||"file"==e.scheme&&1==r&&te(t[0],!0)||t.pop()},ie=function(e){return"."===e||"%2e"===e.toLowerCase()},ae=function(e){return e=e.toLowerCase(),".."===e||"%2e."===e||".%2e"===e||"%2e%2e"===e},oe={},se={},le={},ce={},ue={},fe={},he={},pe={},de={},ve={},me={},be={},ge={},ye={},we={},ke={},je={},Oe={},Fe={},Se={},Re={},xe=function(e,t,r,i){var a,o,s,l,c=r||oe,u=0,h="",d=!1,v=!1,m=!1;r||(e.scheme="",e.username="",e.password="",e.host=null,e.port=null,e.path=[],e.query=null,e.fragment=null,e.cannotBeABaseURL=!1,t=t.replace(B,"")),t=t.replace(T,""),a=p(t);while(u<=a.length){switch(o=a[u],c){case oe:if(!o||!A.test(o)){if(r)return x;c=le;continue}h+=o.toLowerCase(),c=se;break;case se:if(o&&(L.test(o)||"+"==o||"-"==o||"."==o))h+=o.toLowerCase();else{if(":"!=o){if(r)return x;h="",c=le,u=0;continue}if(r&&(W(e)!=f(Q,h)||"file"==h&&(Y(e)||null!==e.port)||"file"==e.scheme&&!e.host))return;if(e.scheme=h,r)return void(W(e)&&Q[e.scheme]==e.port&&(e.port=null));h="","file"==e.scheme?c=ye:W(e)&&i&&i.scheme==e.scheme?c=ce:W(e)?c=pe:"/"==a[u+1]?(c=ue,u++):(e.cannotBeABaseURL=!0,e.path.push(""),c=Fe)}break;case le:if(!i||i.cannotBeABaseURL&&"#"!=o)return x;if(i.cannotBeABaseURL&&"#"==o){e.scheme=i.scheme,e.path=i.path.slice(),e.query=i.query,e.fragment="",e.cannotBeABaseURL=!0,c=Re;break}c="file"==i.scheme?ye:fe;continue;case ce:if("/"!=o||"/"!=a[u+1]){c=fe;continue}c=de,u++;break;case ue:if("/"==o){c=ve;break}c=Oe;continue;case fe:if(e.scheme=i.scheme,o==n)e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,e.path=i.path.slice(),e.query=i.query;else if("/"==o||"\\"==o&&W(e))c=he;else if("?"==o)e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,e.path=i.path.slice(),e.query="",c=Se;else{if("#"!=o){e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,e.path=i.path.slice(),e.path.pop(),c=Oe;continue}e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,e.path=i.path.slice(),e.query=i.query,e.fragment="",c=Re}break;case he:if(!W(e)||"/"!=o&&"\\"!=o){if("/"!=o){e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,c=Oe;continue}c=ve}else c=de;break;case pe:if(c=de,"/"!=o||"/"!=h.charAt(u+1))continue;u++;break;case de:if("/"!=o&&"\\"!=o){c=ve;continue}break;case ve:if("@"==o){d&&(h="%40"+h),d=!0,s=p(h);for(var b=0;b<s.length;b++){var g=s[b];if(":"!=g||m){var y=X(g,K);m?e.password+=y:e.username+=y}else m=!0}h=""}else if(o==n||"/"==o||"?"==o||"#"==o||"\\"==o&&W(e)){if(d&&""==h)return R;u-=p(h).length+1,h="",c=me}else h+=o;break;case me:case be:if(r&&"file"==e.scheme){c=ke;continue}if(":"!=o||v){if(o==n||"/"==o||"?"==o||"#"==o||"\\"==o&&W(e)){if(W(e)&&""==h)return _;if(r&&""==h&&(Y(e)||null!==e.port))return;if(l=I(e,h),l)return l;if(h="",c=je,r)return;continue}"["==o?v=!0:"]"==o&&(v=!1),h+=o}else{if(""==h)return _;if(l=I(e,h),l)return l;if(h="",c=ge,r==be)return}break;case ge:if(!P.test(o)){if(o==n||"/"==o||"?"==o||"#"==o||"\\"==o&&W(e)||r){if(""!=h){var w=parseInt(h,10);if(w>65535)return D;e.port=W(e)&&w===Q[e.scheme]?null:w,h=""}if(r)return;c=je;continue}return D}h+=o;break;case ye:if(e.scheme="file","/"==o||"\\"==o)c=we;else{if(!i||"file"!=i.scheme){c=Oe;continue}if(o==n)e.host=i.host,e.path=i.path.slice(),e.query=i.query;else if("?"==o)e.host=i.host,e.path=i.path.slice(),e.query="",c=Se;else{if("#"!=o){re(a.slice(u).join(""))||(e.host=i.host,e.path=i.path.slice(),ne(e)),c=Oe;continue}e.host=i.host,e.path=i.path.slice(),e.query=i.query,e.fragment="",c=Re}}break;case we:if("/"==o||"\\"==o){c=ke;break}i&&"file"==i.scheme&&!re(a.slice(u).join(""))&&(te(i.path[0],!0)?e.path.push(i.path[0]):e.host=i.host),c=Oe;continue;case ke:if(o==n||"/"==o||"\\"==o||"?"==o||"#"==o){if(!r&&te(h))c=Oe;else if(""==h){if(e.host="",r)return;c=je}else{if(l=I(e,h),l)return l;if("localhost"==e.host&&(e.host=""),r)return;h="",c=je}continue}h+=o;break;case je:if(W(e)){if(c=Oe,"/"!=o&&"\\"!=o)continue}else if(r||"?"!=o)if(r||"#"!=o){if(o!=n&&(c=Oe,"/"!=o))continue}else e.fragment="",c=Re;else e.query="",c=Se;break;case Oe:if(o==n||"/"==o||"\\"==o&&W(e)||!r&&("?"==o||"#"==o)){if(ae(h)?(ne(e),"/"==o||"\\"==o&&W(e)||e.path.push("")):ie(h)?"/"==o||"\\"==o&&W(e)||e.path.push(""):("file"==e.scheme&&!e.path.length&&te(h)&&(e.host&&(e.host=""),h=h.charAt(0)+":"),e.path.push(h)),h="","file"==e.scheme&&(o==n||"?"==o||"#"==o))while(e.path.length>1&&""===e.path[0])e.path.shift();"?"==o?(e.query="",c=Se):"#"==o&&(e.fragment="",c=Re)}else h+=X(o,Z);break;case Fe:"?"==o?(e.query="",c=Se):"#"==o?(e.fragment="",c=Re):o!=n&&(e.path[0]+=X(o,J));break;case Se:r||"#"!=o?o!=n&&("'"==o&&W(e)?e.query+="%27":e.query+="#"==o?"%23":X(o,J)):(e.fragment="",c=Re);break;case Re:o!=n&&(e.fragment+=X(o,G));break}u++}},_e=function(e){var t,r,n=u(this,_e,"URL"),i=arguments.length>1?arguments[1]:void 0,o=String(e),s=j(n,{type:"URL"});if(void 0!==i)if(i instanceof _e)t=O(i);else if(r=xe(t={},String(i)),r)throw TypeError(r);if(r=xe(s,o,null,t),r)throw TypeError(r);var l=s.searchParams=new w,c=k(l);c.updateSearchParams(s.query),c.updateURL=function(){s.query=String(l)||null},a||(n.href=Ae.call(n),n.origin=Le.call(n),n.protocol=Pe.call(n),n.username=Ce.call(n),n.password=Ue.call(n),n.host=$e.call(n),n.hostname=Me.call(n),n.port=Ee.call(n),n.pathname=qe.call(n),n.search=Be.call(n),n.searchParams=Te.call(n),n.hash=Ie.call(n))},De=_e.prototype,Ae=function(){var e=O(this),t=e.scheme,r=e.username,n=e.password,i=e.host,a=e.port,o=e.path,s=e.query,l=e.fragment,c=t+":";return null!==i?(c+="//",Y(e)&&(c+=r+(n?":"+n:"")+"@"),c+=H(i),null!==a&&(c+=":"+a)):"file"==t&&(c+="//"),c+=e.cannotBeABaseURL?o[0]:o.length?"/"+o.join("/"):"",null!==s&&(c+="?"+s),null!==l&&(c+="#"+l),c},Le=function(){var e=O(this),t=e.scheme,r=e.port;if("blob"==t)try{return new URL(t.path[0]).origin}catch(n){return"null"}return"file"!=t&&W(e)?t+"://"+H(e.host)+(null!==r?":"+r:""):"null"},Pe=function(){return O(this).scheme+":"},Ce=function(){return O(this).username},Ue=function(){return O(this).password},$e=function(){var e=O(this),t=e.host,r=e.port;return null===t?"":null===r?H(t):H(t)+":"+r},Me=function(){var e=O(this).host;return null===e?"":H(e)},Ee=function(){var e=O(this).port;return null===e?"":String(e)},qe=function(){var e=O(this),t=e.path;return e.cannotBeABaseURL?t[0]:t.length?"/"+t.join("/"):""},Be=function(){var e=O(this).query;return e?"?"+e:""},Te=function(){return O(this).searchParams},Ie=function(){var e=O(this).fragment;return e?"#"+e:""},Ne=function(e,t){return{get:e,set:t,configurable:!0,enumerable:!0}};if(a&&l(De,{href:Ne(Ae,(function(e){var t=O(this),r=String(e),n=xe(t,r);if(n)throw TypeError(n);k(t.searchParams).updateSearchParams(t.query)})),origin:Ne(Le),protocol:Ne(Pe,(function(e){var t=O(this);xe(t,String(e)+":",oe)})),username:Ne(Ce,(function(e){var t=O(this),r=p(String(e));if(!ee(t)){t.username="";for(var n=0;n<r.length;n++)t.username+=X(r[n],K)}})),password:Ne(Ue,(function(e){var t=O(this),r=p(String(e));if(!ee(t)){t.password="";for(var n=0;n<r.length;n++)t.password+=X(r[n],K)}})),host:Ne($e,(function(e){var t=O(this);t.cannotBeABaseURL||xe(t,String(e),me)})),hostname:Ne(Me,(function(e){var t=O(this);t.cannotBeABaseURL||xe(t,String(e),be)})),port:Ne(Ee,(function(e){var t=O(this);ee(t)||(e=String(e),""==e?t.port=null:xe(t,e,ge))})),pathname:Ne(qe,(function(e){var t=O(this);t.cannotBeABaseURL||(t.path=[],xe(t,e+"",je))})),search:Ne(Be,(function(e){var t=O(this);e=String(e),""==e?t.query=null:("?"==e.charAt(0)&&(e=e.slice(1)),t.query="",xe(t,e,Se)),k(t.searchParams).updateSearchParams(t.query)})),searchParams:Ne(Te),hash:Ne(Ie,(function(e){var t=O(this);e=String(e),""!=e?("#"==e.charAt(0)&&(e=e.slice(1)),t.fragment="",xe(t,e,Re)):t.fragment=null}))}),c(De,"toJSON",(function(){return Ae.call(this)}),{enumerable:!0}),c(De,"toString",(function(){return Ae.call(this)}),{enumerable:!0}),y){var Ve=y.createObjectURL,ze=y.revokeObjectURL;Ve&&c(_e,"createObjectURL",(function(e){return Ve.apply(y,arguments)})),ze&&c(_e,"revokeObjectURL",(function(e){return ze.apply(y,arguments)}))}m(_e,"URL"),i({global:!0,forced:!o,sham:!a},{URL:_e})},389:function(e,t,r){"use strict";var n=2147483647,i=36,a=1,o=26,s=38,l=700,c=72,u=128,f="-",h=/[^\0-\u007E]/,p=/[.\u3002\uFF0E\uFF61]/g,d="Overflow: input needs wider integers to process",v=i-a,m=Math.floor,b=String.fromCharCode,g=function(e){var t=[],r=0,n=e.length;while(r<n){var i=e.charCodeAt(r++);if(i>=55296&&i<=56319&&r<n){var a=e.charCodeAt(r++);56320==(64512&a)?t.push(((1023&i)<<10)+(1023&a)+65536):(t.push(i),r--)}else t.push(i)}return t},y=function(e){return e+22+75*(e<26)},w=function(e,t,r){var n=0;for(e=r?m(e/l):e>>1,e+=m(e/t);e>v*o>>1;n+=i)e=m(e/v);return m(n+(v+1)*e/(e+s))},k=function(e){var t=[];e=g(e);var r,s,l=e.length,h=u,p=0,v=c;for(r=0;r<e.length;r++)s=e[r],s<128&&t.push(b(s));var k=t.length,j=k;k&&t.push(f);while(j<l){var O=n;for(r=0;r<e.length;r++)s=e[r],s>=h&&s<O&&(O=s);var F=j+1;if(O-h>m((n-p)/F))throw RangeError(d);for(p+=(O-h)*F,h=O,r=0;r<e.length;r++){if(s=e[r],s<h&&++p>n)throw RangeError(d);if(s==h){for(var S=p,R=i;;R+=i){var x=R<=v?a:R>=v+o?o:R-v;if(S<x)break;var _=S-x,D=i-x;t.push(b(y(x+_%D))),S=m(_/D)}t.push(b(y(S))),v=w(p,F,j==k),p=0,++j}}++p,++h}return t.join("")};e.exports=function(e){var t,r,n=[],i=e.toLowerCase().replace(p,".").split(".");for(t=0;t<i.length;t++)r=i[t],n.push(h.test(r)?"xn--"+k(r):r);return n.join(".")}},390:function(e,t,r){var n=r(37),i=r(144);e.exports=function(e){var t=i(e);if("function"!=typeof t)throw TypeError(String(e)+" is not iterable");return n(t.call(e))}},408:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("app-content",{attrs:{title:e.$t("documentation")}},[e.isSuperAdmin?r("div",{staticClass:"app-doc-files-table-toolbar"},[r("app-button",{attrs:{variant:"primary",superAdminProtected:!0},on:{click:e.onCreateDocFileClick}},[e._v(" "+e._s(e.$t("upload-new-doc-file"))+" ")])],1):e._e(),r("app-table-container",[r("b-table",{attrs:{fields:e.columns,items:e.rows,"head-variant":"light",hover:"",busy:e.loading},scopedSlots:e._u([{key:"table-busy",fn:function(){return[r("div",{staticClass:"text-center"},[r("b-spinner",{staticClass:"align-middle"})],1)]},proxy:!0},{key:"cell(fileName)",fn:function(t){return[r("a",{attrs:{href:"#"},on:{click:function(r){return r.preventDefault(),e.onFileClick(t.item)}}},[e._v(e._s(t.item.title||t.item.fileName))]),r("div",{directives:[{name:"show",rawName:"v-show",value:t.item.description,expression:"row.item.description"}],staticClass:"grayed"},[e._v(" "+e._s(t.item.description)+" ")]),r("div",{directives:[{name:"show",rawName:"v-show",value:t.item.title&&e.isSuperAdmin,expression:"row.item.title && isSuperAdmin"}],staticClass:"grayed"},[r("small",[e._v(e._s(t.item.fileName))])])]}},{key:"cell(updatedAtBy)",fn:function(t){return[r("small",{domProps:{innerHTML:e._s(t.item.updatedAtBy)}})]}},{key:"cell(actions)",fn:function(t){return[r("div",{staticClass:"hover-cell pull-right"},[r("app-button",{attrs:{variant:"secondary",size:"sm",title:e.$t("copy-file-link"),icon:"clipboard"},on:{click:function(r){return e.onCopyDocFileClick(t.item)}}}),r("app-button",{attrs:{variant:"secondary",size:"sm",title:e.$t("edit-doc-file"),superAdminProtected:!0,icon:"wrench"},on:{click:function(r){return e.onEditDocFileClick(t.item)}}}),r("app-button",{attrs:{variant:"outline-danger",size:"sm",title:e.$t("delete-doc-file"),superAdminProtected:!0,icon:"trash"},on:{click:function(r){return e.onDeleteDocFileClick(t.item)}}})],1)]}}])})],1),r("app-modal-form",{ref:"appDocFileModal",attrs:{id:"edit-doc-file-modal",title:e.docFileModalTitle,subtitle:e.docFileModalSubtitle,"ok-title":e.docFileModalOkTitle,modalLoading:e.docFileModalLoading,superAdminProtected:!0},on:{submit:e.onSubmitDocFile}},[e.currentDocFile?r("div",[r("b-form-group",{attrs:{label:e.$t("doc-file")}},[r("app-simple-file-upload",{attrs:{uploadProgress:e.uploadProgress},model:{value:e.currentDocFile.file,callback:function(t){e.$set(e.currentDocFile,"file",t)},expression:"currentDocFile.file"}})],1),r("b-form-group",{attrs:{label:e.$t("title")}},[r("b-form-input",{model:{value:e.currentDocFile.title,callback:function(t){e.$set(e.currentDocFile,"title",t)},expression:"currentDocFile.title"}})],1),r("b-form-group",{attrs:{label:e.$t("description")}},[r("b-form-textarea",{attrs:{id:"description"},model:{value:e.currentDocFile.description,callback:function(t){e.$set(e.currentDocFile,"description",t)},expression:"currentDocFile.description"}})],1)],1):e._e()])],1)},i=[];n._withStripped=!0;var a=r(65),o=r(8),s=r(14),l=r(19),c=r(20),u=r(25),f=r(24),h=r(32),p=(r(49),r(22),r(135),r(138),r(137),r(69),r(78),r(45),r(50),r(388),r(329),r(274),r(106),r(18)),d=r(267),v=r(269),m=r(55),b=r(44),g=r(293),y=r(90),w=r(139),k=r(284),j=r(282),O=r(74),F=r(136),S=function(e,t,r,n){var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(h["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o},R=function(e){Object(u["a"])(r,e);var t=Object(f["a"])(r);function r(){var e;return Object(l["a"])(this,r),e=t.apply(this,arguments),e.columns=[],e.rows=[],e.loading=!1,e.docFileModalLoading=!1,e.docFileModalTitle="",e.docFileModalSubtitle="",e.docFileModalOkTitle="",e.currentDocFile=null,e.uploadProgress=null,e}return Object(c["a"])(r,[{key:"created",value:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(){var t,r=this;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.columns=[{key:"fileName",label:this.$t("document").toString()},{key:"updatedAtBy",label:this.$t("changed").toString()},{key:"size",label:this.$t("size").toString()},{key:"actions",label:""}],e.next=3,this.updateDocFileRows();case 3:if(!this.$route.query.fileId){e.next=8;break}if(t=this.rows.find((function(e){return e.id===r.$route.query.fileId})),!t){e.next=8;break}return e.next=8,this.onFileClick(t,"_self");case 8:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"updateDocFileRows",value:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(){var t=this;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.loading=!0,e.prev=1,e.next=4,m["a"].getDocFiles();case 4:this.rows=e.sent.map((function(e){return{id:e.id,file:null,description:e.description||null,title:e.title,fileName:e.file_name,updatedAtBy:t.getChangedText(e),size:Object(k["a"])(e.size)}})),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](1),this.showError(e.t0);case 10:return e.prev=10,this.loading=!1,e.finish(10);case 13:case"end":return e.stop()}}),e,this,[[1,7,10,13]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onFileClick",value:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(t,r){var n;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m["a"].getDocFileUrl(t.id);case 3:n=e.sent,j["a"].open(n.url,r||"_blank"),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.showError(e.t0);case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"onCopyDocFileClick",value:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(t){var r;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r=new URL("doc/files?fileId=".concat(t.id),O["b"]).toString(),e.next=4,navigator.clipboard.writeText(r);case 4:this.showSuccess(this.$t("copy-file-link-success").toString()),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.showError(e.t0);case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onCreateDocFileClick",value:function(){try{this.currentDocFile={file:null,description:null,title:null},this.docFileModalTitle=this.$t("upload-new-doc-file").toString(),this.docFileModalSubtitle="",this.docFileModalOkTitle=this.$t("create").toString(),this.uploadProgress=null,this.appDocFileModal.show()}catch(e){this.showError(e)}}},{key:"onEditDocFileClick",value:function(e){try{this.currentDocFile=e,this.docFileModalTitle=this.$t("edit-doc-file").toString(),this.docFileModalSubtitle=e.fileName||"",this.docFileModalOkTitle=this.$t("apply").toString(),this.uploadProgress=null,this.appDocFileModal.show()}catch(t){this.showError(t)}}},{key:"onSubmitDocFile",value:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(){var t=this;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.docFileModalLoading=!0,e.prev=1,this.currentDocFile){e.next=4;break}throw new Error("Something went wrong! (Detais: currentDocFile is falsy)");case 4:if(!this.currentDocFile.id){e.next=12;break}if(this.currentDocFile.file||null!==this.currentDocFile.description&&void 0!==this.currentDocFile.description){e.next=7;break}throw{error:"MISSING_FILE_OR_DESCRIPTION",message:"Nothing changed..."};case 7:return e.next=9,m["a"].editDocFile(this.currentDocFile.id,this.currentDocFile.file||void 0,this.currentDocFile.title||void 0,this.currentDocFile.description||void 0,(function(e){return t.uploadProgress={total:e.total,loaded:e.loaded}}));case 9:this.showSuccess(this.$t("doc-file-updated-success").toString()),e.next=17;break;case 12:if(this.currentDocFile.file){e.next=14;break}throw{error:"MISSING_FILE",message:"Please select a document to upload"};case 14:return e.next=16,m["a"].createDocFile(this.currentDocFile.file,this.currentDocFile.title||void 0,this.currentDocFile.description||void 0,(function(e){return t.uploadProgress={total:e.total,loaded:e.loaded}}));case 16:this.showSuccess(this.$t("doc-file-created-success").toString());case 17:return this.appDocFileModal.hide(),e.next=20,this.updateDocFileRows();case 20:e.next=25;break;case 22:e.prev=22,e.t0=e["catch"](1),this.showError(e.t0);case 25:return e.prev=25,this.docFileModalLoading=!1,e.finish(25);case 28:case"end":return e.stop()}}),e,this,[[1,22,25,28]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"onDeleteDocFileClick",value:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(t){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.loading=!0,e.prev=1,confirm(this.$t("sure-delete-doc-file",{fileName:t.fileName}).toString())){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,m["a"].deleteDocFile(t.id);case 6:return this.showSuccess(this.$t("doc-file-deleted-success",{fileName:t.fileName}).toString()),e.next=9,this.updateDocFileRows();case 9:e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](1),this.showError(e.t0);case 14:return e.prev=14,this.loading=!1,e.finish(14);case 17:case"end":return e.stop()}}),e,this,[[1,11,14,17]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getChangedText",value:function(e){var t=(e.user.first_name+" "+e.user.last_name).trim()||e.user.email,r="",n="";return e.updated_at?(r=this.$t("updated").toString(),n=this.$t.apply(this,Object(a["a"])(w["a"].getTimeDiff(e.updated_at))).toString()):(r=this.$t("created").toString(),n=this.$t.apply(this,Object(a["a"])(w["a"].getTimeDiff(e.created_at))).toString()),"".concat(r," ").concat(n," ").concat(this.$t("by").toString()," ").concat(t)}}]),r}(b["a"]);S([Object(p["c"])()],R.prototype,"appDocFileModal",void 0),R=S([Object(p["a"])({name:"app-doc-files",components:{AppContent:y["a"],AppTableContainer:d["a"],AppModalForm:v["a"],AppSimpleFileUpload:g["a"],AppButton:F["a"]}})],R);var x=R,_=x,D=r(33),A=Object(D["a"])(_,n,i,!1,null,null,null);A.options.__file="src/app/doc/doc-files.vue";t["default"]=A.exports}}]);