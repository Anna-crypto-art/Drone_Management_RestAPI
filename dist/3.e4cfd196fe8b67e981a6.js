(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{278:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n(6),o=n(10),i=n(45);function a(t){return Object(i["a"])((function(e,n){if("created"===n){var i=e.created;e.created=Object(o["a"])(Object(r["a"])().mark((function e(){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t&&(this[t]=!0),e.prev=1,e.next=4,i.apply(this);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](1),this.showError(e.t0);case 9:return e.prev=9,t&&(this[t]=!1),e.finish(9);case 12:case"end":return e.stop()}}),e,this,[[1,6,9,12]])})))}else{e.methods=e.methods||{};var a=e.methods[n];e.methods[n]=Object(o["a"])(Object(r["a"])().mark((function e(){var n,o,i,s=arguments;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(t&&(this[t]=!0),e.prev=1,n=s.length,o=new Array(n),i=0;i<n;i++)o[i]=s[i];return e.next=5,a.apply(this,o);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](1),this.showError(e.t0);case 10:return e.prev=10,t&&(this[t]=!1),e.finish(10);case 13:case"end":return e.stop()}}),e,this,[[1,7,10,13]])})))}}))}},302:function(t,e){let n;const r=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];e.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return 4*t+17},e.getSymbolTotalCodewords=function(t){return r[t]},e.getBCHDigit=function(t){let e=0;while(0!==t)e++,t>>>=1;return e},e.setToSJISFunction=function(t){if("function"!==typeof t)throw new Error('"toSJISFunc" is not a valid function.');n=t},e.isKanjiModeEnabled=function(){return"undefined"!==typeof n},e.toSJIS=function(t){return n(t)}},303:function(t,e,n){const r=n(352),o=n(353);function i(t){if("string"!==typeof t)throw new Error("Param is not a string");const n=t.toLowerCase();switch(n){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+t)}}e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(t,e){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!r.isValid(e))throw new Error("Invalid version: "+e);return e>=1&&e<10?t.ccBits[0]:e<27?t.ccBits[1]:t.ccBits[2]},e.getBestModeForData=function(t){return o.testNumeric(t)?e.NUMERIC:o.testAlphanumeric(t)?e.ALPHANUMERIC:o.testKanji(t)?e.KANJI:e.BYTE},e.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},e.isValid=function(t){return t&&t.bit&&t.ccBits},e.from=function(t,n){if(e.isValid(t))return t;try{return i(t)}catch(r){return n}}},312:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"mar-top mar-bottom"},[n("center",[n("app-icon",{attrs:{cls:"font-xl",icon:t.authIcon}})],1)],1),n("b-form-group",{attrs:{label:t.inputLabel}},[n("b-form-input",{ref:"securityCodeInput",attrs:{type:"text",placeholder:t.placeholderText,required:"",pattern:"\\d{6,6}",autocomplete:"off"},on:{change:t.onChange},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1)],1)},o=[];r._withStripped=!0;var i=n(19),a=n(20),s=n(25),u=n(24),c=n(27),l=(n(46),n(22),n(94),n(16)),f=n(17),h=n(115),d=n(153),p=function(t,e,n,r){var o,i=arguments.length,a=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(t,e,n,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(i<3?o(a):i>3?o(e,n,a):o(e,n))||a);return i>3&&a&&Object.defineProperty(e,n,a),a},g=function(t){Object(s["a"])(n,t);var e=Object(u["a"])(n);function n(){var t;return Object(i["a"])(this,n),t=e.apply(this,arguments),t.code=null,t}return Object(a["a"])(n,[{key:"created",value:function(){this.code=this.value}},{key:"mounted",value:function(){this.securityCodeInput.focus()}},{key:"onChange",value:function(){this.$emit("input",this.code)}},{key:"inputLabel",get:function(){switch(this.authMethod){case h["a"].EMAIL:return this.$t("security-code-from-email").toString();case h["a"].TOTP:return this.$t("security-code-from-authenticator").toString()}return""}},{key:"placeholderText",get:function(){switch(this.authMethod){case h["a"].EMAIL:return this.$t("security-code").toString();case h["a"].TOTP:return this.$t("authentication-code").toString()}return""}},{key:"authIcon",get:function(){switch(this.authMethod){case h["a"].EMAIL:return"envelope";case h["a"].TOTP:return"phone"}return""}}]),n}(f["default"]);p([Object(l["b"])({required:!0})],g.prototype,"authMethod",void 0),p([Object(l["b"])({default:null})],g.prototype,"value",void 0),p([Object(l["c"])()],g.prototype,"securityCodeInput",void 0),g=p([Object(l["a"])({name:"app-security-code",components:{AppIcon:d["a"]}})],g);var m=g,w=m,y=n(32),v=Object(y["a"])(w,r,o,!1,null,null,null);v.options.__file="src/app/shared/components/app-security-code/app-security-code.vue";e["a"]=v.exports},338:function(t,e){function n(t){if("string"!==typeof t)throw new Error("Param is not a string");const n=t.toLowerCase();switch(n){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw new Error("Unknown EC Level: "+t)}}e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2},e.isValid=function(t){return t&&"undefined"!==typeof t.bit&&t.bit>=0&&t.bit<4},e.from=function(t,r){if(e.isValid(t))return t;try{return n(t)}catch(o){return r}}},351:function(t,e,n){const r=n(338),o=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],i=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];e.getBlocksCount=function(t,e){switch(e){case r.L:return o[4*(t-1)+0];case r.M:return o[4*(t-1)+1];case r.Q:return o[4*(t-1)+2];case r.H:return o[4*(t-1)+3];default:return}},e.getTotalCodewordsCount=function(t,e){switch(e){case r.L:return i[4*(t-1)+0];case r.M:return i[4*(t-1)+1];case r.Q:return i[4*(t-1)+2];case r.H:return i[4*(t-1)+3];default:return}}},352:function(t,e){e.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}},353:function(t,e){const n="[0-9]+",r="[A-Z $%*+\\-./:]+";let o="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";o=o.replace(/u/g,"\\u");const i="(?:(?![A-Z0-9 $%*+\\-./:]|"+o+")(?:.|[\r\n]))+";e.KANJI=new RegExp(o,"g"),e.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),e.BYTE=new RegExp(i,"g"),e.NUMERIC=new RegExp(n,"g"),e.ALPHANUMERIC=new RegExp(r,"g");const a=new RegExp("^"+o+"$"),s=new RegExp("^"+n+"$"),u=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");e.testKanji=function(t){return a.test(t)},e.testNumeric=function(t){return s.test(t)},e.testAlphanumeric=function(t){return u.test(t)}},354:function(t,e){function n(t){if("number"===typeof t&&(t=t.toString()),"string"!==typeof t)throw new Error("Color should be defined as hex string");let e=t.slice().replace("#","").split("");if(e.length<3||5===e.length||e.length>8)throw new Error("Invalid hex color: "+t);3!==e.length&&4!==e.length||(e=Array.prototype.concat.apply([],e.map((function(t){return[t,t]})))),6===e.length&&e.push("F","F");const n=parseInt(e.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:255&n,hex:"#"+e.slice(0,6).join("")}}e.getOptions=function(t){t||(t={}),t.color||(t.color={});const e="undefined"===typeof t.margin||null===t.margin||t.margin<0?4:t.margin,r=t.width&&t.width>=21?t.width:void 0,o=t.scale||4;return{width:r,scale:r?4:o,margin:e,color:{dark:n(t.color.dark||"#000000ff"),light:n(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},e.getScale=function(t,e){return e.width&&e.width>=t+2*e.margin?e.width/(t+2*e.margin):e.scale},e.getImageWidth=function(t,n){const r=e.getScale(t,n);return Math.floor((t+2*n.margin)*r)},e.qrToImageData=function(t,n,r){const o=n.modules.size,i=n.modules.data,a=e.getScale(o,r),s=Math.floor((o+2*r.margin)*a),u=r.margin*a,c=[r.color.light,r.color.dark];for(let e=0;e<s;e++)for(let n=0;n<s;n++){let l=4*(e*s+n),f=r.color.light;if(e>=u&&n>=u&&e<s-u&&n<s-u){const t=Math.floor((e-u)/a),r=Math.floor((n-u)/a);f=c[i[t*o+r]?1:0]}t[l++]=f.r,t[l++]=f.g,t[l++]=f.b,t[l]=f.a}}},355:function(t,e,n){},402:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-setup-totp"},[n("h3",[t._v(t._s(t.$t("mfa-totp-setup")))]),n("span",{domProps:{innerHTML:t._s(t.$t("mfa-totp-setup-instructions"))}}),t._m(0),n("div",{staticClass:"mar-top"},[n("b-spinner",{directives:[{name:"show",rawName:"v-show",value:t.loadingQRCode,expression:"loadingQRCode"}],staticClass:"align-middle"}),n("div",{directives:[{name:"show",rawName:"v-show",value:t.totpSecret,expression:"totpSecret"}]},[n("b-row",[n("b-col",[n("canvas",{ref:"qrCodeCanvas"})]),n("b-col",[n("b-form-group",{staticClass:"mar-top-half",attrs:{label:t.$t("secret-token")}},[n("b-form-input",{attrs:{readonly:"",size:"sm"},model:{value:t.totpSecret,callback:function(e){t.totpSecret=e},expression:"totpSecret"}})],1)],1)],1)],1)],1),n("div",{staticClass:"mar-top"},[n("app-security-code",{attrs:{authMethod:1},on:{input:t.onChangeSecurityCode},model:{value:t.securityCode,callback:function(e){t.securityCode=e},expression:"securityCode"}})],1)])},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[t._v("FreeOTP Authenticator ("),n("a",{attrs:{href:"https://play.google.com/store/apps/details?id=org.fedorahosted.freeotp"}},[t._v("Android")]),t._v(" | "),n("a",{attrs:{href:"https://apps.apple.com/de/app/freeotp-authenticator/id872559395"}},[t._v("Apple")]),t._v(")")]),n("li",[t._v("Microsoft Authenticator ("),n("a",{attrs:{href:"https://play.google.com/store/apps/details?id=com.azure.authenticator"}},[t._v("Android")]),t._v(" | "),n("a",{attrs:{href:"https://apps.apple.com/de/app/microsoft-authenticator/id983156458"}},[t._v("Apple")]),t._v(")")]),n("li",[t._v("Google Authenticator ("),n("a",{attrs:{href:"https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"}},[t._v("Android")]),t._v(" | "),n("a",{attrs:{href:"https://apps.apple.com/de/app/google-authenticator/id388497605"}},[t._v("Apple")]),t._v(")")])])}];r._withStripped=!0;var i=n(6),a=n(10),s=n(19),u=n(20),c=n(25),l=n(24),f=n(27),h=(n(46),n(22),n(16)),d=n(416),p=n.n(d),g=n(278),m=n(312),w=n(74),y=n(47),v=n(158),b=function(t,e,n,r){var o,i=arguments.length,a=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(f["a"])(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(t,e,n,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(i<3?o(a):i>3?o(e,n,a):o(e,n))||a);return i>3&&a&&Object.defineProperty(e,n,a),a},E=function(t){Object(c["a"])(n,t);var e=Object(l["a"])(n);function n(){var t;return Object(s["a"])(this,n),t=e.apply(this,arguments),t.loadingQRCode=!0,t.totpSecret=null,t.securityCode=null,t}return Object(u["a"])(n,[{key:"created",value:function(){var t=Object(a["a"])(Object(i["a"])().mark((function t(){var e;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,y["a"].getTotpSecrets(this.confirmationKey);case 2:return e=t.sent,t.next=5,this.loadQRCode(e.url);case 5:this.totpSecret=e.secret,this.securityCode=this.value;case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"onChangeSecurityCode",value:function(){this.$emit("input",this.securityCode)}},{key:"loadQRCode",value:function(){var t=Object(a["a"])(Object(i["a"])().mark((function t(e){var n=this;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t,r){p.a.toCanvas(n.qrCodeCanvas,e,(function(e){e?r(e):t()}))}));case 2:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()}]),n}(v["a"]);b([Object(h["b"])({default:null})],E.prototype,"value",void 0),b([Object(h["b"])({required:!0})],E.prototype,"confirmationKey",void 0),b([Object(h["c"])()],E.prototype,"qrCodeCanvas",void 0),b([Object(g["a"])("loadingQRCode")],E.prototype,"created",null),E=b([Object(h["a"])({name:"app-setup-totp",components:{AppSecurityCode:m["a"],AppButton:w["a"]}})],E);var C=E,A=C,I=(n(438),n(32)),M=Object(I["a"])(A,r,o,!1,null,null,null);M.options.__file="src/app/shared/components/app-setup-totp/app-setup-totp.vue";e["a"]=M.exports},416:function(t,e,n){const r=n(417),o=n(418),i=n(436),a=n(437);function s(t,e,n,i,a){const s=[].slice.call(arguments,1),u=s.length,c="function"===typeof s[u-1];if(!c&&!r())throw new Error("Callback required as last argument");if(!c){if(u<1)throw new Error("Too few arguments provided");return 1===u?(n=e,e=i=void 0):2!==u||e.getContext||(i=n,n=e,e=void 0),new Promise((function(r,a){try{const a=o.create(n,i);r(t(a,e,i))}catch(s){a(s)}}))}if(u<2)throw new Error("Too few arguments provided");2===u?(a=n,n=e,e=i=void 0):3===u&&(e.getContext&&"undefined"===typeof a?(a=i,i=void 0):(a=i,i=n,n=e,e=void 0));try{const r=o.create(n,i);a(null,t(r,e,i))}catch(l){a(l)}}e.create=o.create,e.toCanvas=s.bind(null,i.render),e.toDataURL=s.bind(null,i.renderToDataURL),e.toString=s.bind(null,(function(t,e,n){return a.render(t,n)}))},417:function(t,e){t.exports=function(){return"function"===typeof Promise&&Promise.prototype&&Promise.prototype.then}},418:function(t,e,n){const r=n(302),o=n(338),i=n(419),a=n(420),s=n(421),u=n(422),c=n(423),l=n(351),f=n(424),h=n(427),d=n(428),p=n(303),g=n(429);function m(t,e){const n=t.size,r=u.getPositions(e);for(let o=0;o<r.length;o++){const e=r[o][0],i=r[o][1];for(let r=-1;r<=7;r++)if(!(e+r<=-1||n<=e+r))for(let o=-1;o<=7;o++)i+o<=-1||n<=i+o||(r>=0&&r<=6&&(0===o||6===o)||o>=0&&o<=6&&(0===r||6===r)||r>=2&&r<=4&&o>=2&&o<=4?t.set(e+r,i+o,!0,!0):t.set(e+r,i+o,!1,!0))}}function w(t){const e=t.size;for(let n=8;n<e-8;n++){const e=n%2===0;t.set(n,6,e,!0),t.set(6,n,e,!0)}}function y(t,e){const n=s.getPositions(e);for(let r=0;r<n.length;r++){const e=n[r][0],o=n[r][1];for(let n=-2;n<=2;n++)for(let r=-2;r<=2;r++)-2===n||2===n||-2===r||2===r||0===n&&0===r?t.set(e+n,o+r,!0,!0):t.set(e+n,o+r,!1,!0)}}function v(t,e){const n=t.size,r=h.getEncodedBits(e);let o,i,a;for(let s=0;s<18;s++)o=Math.floor(s/3),i=s%3+n-8-3,a=1===(r>>s&1),t.set(o,i,a,!0),t.set(i,o,a,!0)}function b(t,e,n){const r=t.size,o=d.getEncodedBits(e,n);let i,a;for(i=0;i<15;i++)a=1===(o>>i&1),i<6?t.set(i,8,a,!0):i<8?t.set(i+1,8,a,!0):t.set(r-15+i,8,a,!0),i<8?t.set(8,r-i-1,a,!0):i<9?t.set(8,15-i-1+1,a,!0):t.set(8,15-i-1,a,!0);t.set(r-8,8,1,!0)}function E(t,e){const n=t.size;let r=-1,o=n-1,i=7,a=0;for(let s=n-1;s>0;s-=2){6===s&&s--;while(1){for(let n=0;n<2;n++)if(!t.isReserved(o,s-n)){let r=!1;a<e.length&&(r=1===(e[a]>>>i&1)),t.set(o,s-n,r),i--,-1===i&&(a++,i=7)}if(o+=r,o<0||n<=o){o-=r,r=-r;break}}}}function C(t,e,n){const o=new i;n.forEach((function(e){o.put(e.mode.bit,4),o.put(e.getLength(),p.getCharCountIndicator(e.mode,t)),e.write(o)}));const a=r.getSymbolTotalCodewords(t),s=l.getTotalCodewordsCount(t,e),u=8*(a-s);o.getLengthInBits()+4<=u&&o.put(0,4);while(o.getLengthInBits()%8!==0)o.putBit(0);const c=(u-o.getLengthInBits())/8;for(let r=0;r<c;r++)o.put(r%2?17:236,8);return A(o,t,e)}function A(t,e,n){const o=r.getSymbolTotalCodewords(e),i=l.getTotalCodewordsCount(e,n),a=o-i,s=l.getBlocksCount(e,n),u=o%s,c=s-u,h=Math.floor(o/s),d=Math.floor(a/s),p=d+1,g=h-d,m=new f(g);let w=0;const y=new Array(s),v=new Array(s);let b=0;const E=new Uint8Array(t.buffer);for(let r=0;r<s;r++){const t=r<c?d:p;y[r]=E.slice(w,w+t),v[r]=m.encode(y[r]),w+=t,b=Math.max(b,t)}const C=new Uint8Array(o);let A,I,M=0;for(A=0;A<b;A++)for(I=0;I<s;I++)A<y[I].length&&(C[M++]=y[I][A]);for(A=0;A<g;A++)for(I=0;I<s;I++)C[M++]=v[I][A];return C}function I(t,e,n,o){let i;if(Array.isArray(t))i=g.fromArray(t);else{if("string"!==typeof t)throw new Error("Invalid data");{let r=e;if(!r){const e=g.rawSplit(t);r=h.getBestVersionForData(e,n)}i=g.fromString(t,r||40)}}const s=h.getBestVersionForData(i,n);if(!s)throw new Error("The amount of data is too big to be stored in a QR Code");if(e){if(e<s)throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+s+".\n")}else e=s;const u=C(e,n,i),l=r.getSymbolSize(e),f=new a(l);return m(f,e),w(f),y(f,e),b(f,n,0),e>=7&&v(f,e),E(f,u),isNaN(o)&&(o=c.getBestMask(f,b.bind(null,f,n))),c.applyMask(o,f),b(f,n,o),{modules:f,version:e,errorCorrectionLevel:n,maskPattern:o,segments:i}}e.create=function(t,e){if("undefined"===typeof t||""===t)throw new Error("No input text");let n,i,a=o.M;return"undefined"!==typeof e&&(a=o.from(e.errorCorrectionLevel,o.M),n=h.from(e.version),i=c.from(e.maskPattern),e.toSJISFunc&&r.setToSJISFunction(e.toSJISFunc)),I(t,n,a,i)}},419:function(t,e){function n(){this.buffer=[],this.length=0}n.prototype={get:function(t){const e=Math.floor(t/8);return 1===(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(let n=0;n<e;n++)this.putBit(1===(t>>>e-n-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},t.exports=n},420:function(t,e){function n(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}n.prototype.set=function(t,e,n,r){const o=t*this.size+e;this.data[o]=n,r&&(this.reservedBit[o]=!0)},n.prototype.get=function(t,e){return this.data[t*this.size+e]},n.prototype.xor=function(t,e,n){this.data[t*this.size+e]^=n},n.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},t.exports=n},421:function(t,e,n){const r=n(302).getSymbolSize;e.getRowColCoords=function(t){if(1===t)return[];const e=Math.floor(t/7)+2,n=r(t),o=145===n?26:2*Math.ceil((n-13)/(2*e-2)),i=[n-7];for(let r=1;r<e-1;r++)i[r]=i[r-1]-o;return i.push(6),i.reverse()},e.getPositions=function(t){const n=[],r=e.getRowColCoords(t),o=r.length;for(let e=0;e<o;e++)for(let t=0;t<o;t++)0===e&&0===t||0===e&&t===o-1||e===o-1&&0===t||n.push([r[e],r[t]]);return n}},422:function(t,e,n){const r=n(302).getSymbolSize,o=7;e.getPositions=function(t){const e=r(t);return[[0,0],[e-o,0],[0,e-o]]}},423:function(t,e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const n={N1:3,N2:3,N3:40,N4:10};function r(t,n,r){switch(t){case e.Patterns.PATTERN000:return(n+r)%2===0;case e.Patterns.PATTERN001:return n%2===0;case e.Patterns.PATTERN010:return r%3===0;case e.Patterns.PATTERN011:return(n+r)%3===0;case e.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(r/3))%2===0;case e.Patterns.PATTERN101:return n*r%2+n*r%3===0;case e.Patterns.PATTERN110:return(n*r%2+n*r%3)%2===0;case e.Patterns.PATTERN111:return(n*r%3+(n+r)%2)%2===0;default:throw new Error("bad maskPattern:"+t)}}e.isValid=function(t){return null!=t&&""!==t&&!isNaN(t)&&t>=0&&t<=7},e.from=function(t){return e.isValid(t)?parseInt(t,10):void 0},e.getPenaltyN1=function(t){const e=t.size;let r=0,o=0,i=0,a=null,s=null;for(let u=0;u<e;u++){o=i=0,a=s=null;for(let c=0;c<e;c++){let e=t.get(u,c);e===a?o++:(o>=5&&(r+=n.N1+(o-5)),a=e,o=1),e=t.get(c,u),e===s?i++:(i>=5&&(r+=n.N1+(i-5)),s=e,i=1)}o>=5&&(r+=n.N1+(o-5)),i>=5&&(r+=n.N1+(i-5))}return r},e.getPenaltyN2=function(t){const e=t.size;let r=0;for(let n=0;n<e-1;n++)for(let o=0;o<e-1;o++){const e=t.get(n,o)+t.get(n,o+1)+t.get(n+1,o)+t.get(n+1,o+1);4!==e&&0!==e||r++}return r*n.N2},e.getPenaltyN3=function(t){const e=t.size;let r=0,o=0,i=0;for(let n=0;n<e;n++){o=i=0;for(let a=0;a<e;a++)o=o<<1&2047|t.get(n,a),a>=10&&(1488===o||93===o)&&r++,i=i<<1&2047|t.get(a,n),a>=10&&(1488===i||93===i)&&r++}return r*n.N3},e.getPenaltyN4=function(t){let e=0;const r=t.data.length;for(let n=0;n<r;n++)e+=t.data[n];const o=Math.abs(Math.ceil(100*e/r/5)-10);return o*n.N4},e.applyMask=function(t,e){const n=e.size;for(let o=0;o<n;o++)for(let i=0;i<n;i++)e.isReserved(i,o)||e.xor(i,o,r(t,i,o))},e.getBestMask=function(t,n){const r=Object.keys(e.Patterns).length;let o=0,i=1/0;for(let a=0;a<r;a++){n(a),e.applyMask(a,t);const r=e.getPenaltyN1(t)+e.getPenaltyN2(t)+e.getPenaltyN3(t)+e.getPenaltyN4(t);e.applyMask(a,t),r<i&&(i=r,o=a)}return o}},424:function(t,e,n){const r=n(425);function o(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}o.prototype.initialize=function(t){this.degree=t,this.genPoly=r.generateECPolynomial(this.degree)},o.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const e=new Uint8Array(t.length+this.degree);e.set(t);const n=r.mod(e,this.genPoly),o=this.degree-n.length;if(o>0){const t=new Uint8Array(this.degree);return t.set(n,o),t}return n},t.exports=o},425:function(t,e,n){const r=n(426);e.mul=function(t,e){const n=new Uint8Array(t.length+e.length-1);for(let o=0;o<t.length;o++)for(let i=0;i<e.length;i++)n[o+i]^=r.mul(t[o],e[i]);return n},e.mod=function(t,e){let n=new Uint8Array(t);while(n.length-e.length>=0){const t=n[0];for(let i=0;i<e.length;i++)n[i]^=r.mul(e[i],t);let o=0;while(o<n.length&&0===n[o])o++;n=n.slice(o)}return n},e.generateECPolynomial=function(t){let n=new Uint8Array([1]);for(let o=0;o<t;o++)n=e.mul(n,new Uint8Array([1,r.exp(o)]));return n}},426:function(t,e){const n=new Uint8Array(512),r=new Uint8Array(256);(function(){let t=1;for(let e=0;e<255;e++)n[e]=t,r[t]=e,t<<=1,256&t&&(t^=285);for(let e=255;e<512;e++)n[e]=n[e-255]})(),e.log=function(t){if(t<1)throw new Error("log("+t+")");return r[t]},e.exp=function(t){return n[t]},e.mul=function(t,e){return 0===t||0===e?0:n[r[t]+r[e]]}},427:function(t,e,n){const r=n(302),o=n(351),i=n(338),a=n(303),s=n(352),u=7973,c=r.getBCHDigit(u);function l(t,n,r){for(let o=1;o<=40;o++)if(n<=e.getCapacity(o,r,t))return o}function f(t,e){return a.getCharCountIndicator(t,e)+4}function h(t,e){let n=0;return t.forEach((function(t){const r=f(t.mode,e);n+=r+t.getBitsLength()})),n}function d(t,n){for(let r=1;r<=40;r++){const o=h(t,r);if(o<=e.getCapacity(r,n,a.MIXED))return r}}e.from=function(t,e){return s.isValid(t)?parseInt(t,10):e},e.getCapacity=function(t,e,n){if(!s.isValid(t))throw new Error("Invalid QR Code version");"undefined"===typeof n&&(n=a.BYTE);const i=r.getSymbolTotalCodewords(t),u=o.getTotalCodewordsCount(t,e),c=8*(i-u);if(n===a.MIXED)return c;const l=c-f(n,t);switch(n){case a.NUMERIC:return Math.floor(l/10*3);case a.ALPHANUMERIC:return Math.floor(l/11*2);case a.KANJI:return Math.floor(l/13);case a.BYTE:default:return Math.floor(l/8)}},e.getBestVersionForData=function(t,e){let n;const r=i.from(e,i.M);if(Array.isArray(t)){if(t.length>1)return d(t,r);if(0===t.length)return 1;n=t[0]}else n=t;return l(n.mode,n.getLength(),r)},e.getEncodedBits=function(t){if(!s.isValid(t)||t<7)throw new Error("Invalid QR Code version");let e=t<<12;while(r.getBCHDigit(e)-c>=0)e^=u<<r.getBCHDigit(e)-c;return t<<12|e}},428:function(t,e,n){const r=n(302),o=1335,i=21522,a=r.getBCHDigit(o);e.getEncodedBits=function(t,e){const n=t.bit<<3|e;let s=n<<10;while(r.getBCHDigit(s)-a>=0)s^=o<<r.getBCHDigit(s)-a;return(n<<10|s)^i}},429:function(t,e,n){const r=n(303),o=n(430),i=n(431),a=n(432),s=n(434),u=n(353),c=n(302),l=n(435);function f(t){return unescape(encodeURIComponent(t)).length}function h(t,e,n){const r=[];let o;while(null!==(o=t.exec(n)))r.push({data:o[0],index:o.index,mode:e,length:o[0].length});return r}function d(t){const e=h(u.NUMERIC,r.NUMERIC,t),n=h(u.ALPHANUMERIC,r.ALPHANUMERIC,t);let o,i;c.isKanjiModeEnabled()?(o=h(u.BYTE,r.BYTE,t),i=h(u.KANJI,r.KANJI,t)):(o=h(u.BYTE_KANJI,r.BYTE,t),i=[]);const a=e.concat(n,o,i);return a.sort((function(t,e){return t.index-e.index})).map((function(t){return{data:t.data,mode:t.mode,length:t.length}}))}function p(t,e){switch(e){case r.NUMERIC:return o.getBitsLength(t);case r.ALPHANUMERIC:return i.getBitsLength(t);case r.KANJI:return s.getBitsLength(t);case r.BYTE:return a.getBitsLength(t)}}function g(t){return t.reduce((function(t,e){const n=t.length-1>=0?t[t.length-1]:null;return n&&n.mode===e.mode?(t[t.length-1].data+=e.data,t):(t.push(e),t)}),[])}function m(t){const e=[];for(let n=0;n<t.length;n++){const o=t[n];switch(o.mode){case r.NUMERIC:e.push([o,{data:o.data,mode:r.ALPHANUMERIC,length:o.length},{data:o.data,mode:r.BYTE,length:o.length}]);break;case r.ALPHANUMERIC:e.push([o,{data:o.data,mode:r.BYTE,length:o.length}]);break;case r.KANJI:e.push([o,{data:o.data,mode:r.BYTE,length:f(o.data)}]);break;case r.BYTE:e.push([{data:o.data,mode:r.BYTE,length:f(o.data)}])}}return e}function w(t,e){const n={},o={start:{}};let i=["start"];for(let a=0;a<t.length;a++){const s=t[a],u=[];for(let t=0;t<s.length;t++){const c=s[t],l=""+a+t;u.push(l),n[l]={node:c,lastCount:0},o[l]={};for(let t=0;t<i.length;t++){const a=i[t];n[a]&&n[a].node.mode===c.mode?(o[a][l]=p(n[a].lastCount+c.length,c.mode)-p(n[a].lastCount,c.mode),n[a].lastCount+=c.length):(n[a]&&(n[a].lastCount=c.length),o[a][l]=p(c.length,c.mode)+4+r.getCharCountIndicator(c.mode,e))}}i=u}for(let r=0;r<i.length;r++)o[i[r]].end=0;return{map:o,table:n}}function y(t,e){let n;const u=r.getBestModeForData(t);if(n=r.from(e,u),n!==r.BYTE&&n.bit<u.bit)throw new Error('"'+t+'" cannot be encoded with mode '+r.toString(n)+".\n Suggested mode is: "+r.toString(u));switch(n!==r.KANJI||c.isKanjiModeEnabled()||(n=r.BYTE),n){case r.NUMERIC:return new o(t);case r.ALPHANUMERIC:return new i(t);case r.KANJI:return new s(t);case r.BYTE:return new a(t)}}e.fromArray=function(t){return t.reduce((function(t,e){return"string"===typeof e?t.push(y(e,null)):e.data&&t.push(y(e.data,e.mode)),t}),[])},e.fromString=function(t,n){const r=d(t,c.isKanjiModeEnabled()),o=m(r),i=w(o,n),a=l.find_path(i.map,"start","end"),s=[];for(let e=1;e<a.length-1;e++)s.push(i.table[a[e]].node);return e.fromArray(g(s))},e.rawSplit=function(t){return e.fromArray(d(t,c.isKanjiModeEnabled()))}},430:function(t,e,n){const r=n(303);function o(t){this.mode=r.NUMERIC,this.data=t.toString()}o.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(t){let e,n,r;for(e=0;e+3<=this.data.length;e+=3)n=this.data.substr(e,3),r=parseInt(n,10),t.put(r,10);const o=this.data.length-e;o>0&&(n=this.data.substr(e),r=parseInt(n,10),t.put(r,3*o+1))},t.exports=o},431:function(t,e,n){const r=n(303),o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function i(t){this.mode=r.ALPHANUMERIC,this.data=t}i.getBitsLength=function(t){return 11*Math.floor(t/2)+t%2*6},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){let e;for(e=0;e+2<=this.data.length;e+=2){let n=45*o.indexOf(this.data[e]);n+=o.indexOf(this.data[e+1]),t.put(n,11)}this.data.length%2&&t.put(o.indexOf(this.data[e]),6)},t.exports=i},432:function(t,e,n){const r=n(433),o=n(303);function i(t){this.mode=o.BYTE,"string"===typeof t&&(t=r(t)),this.data=new Uint8Array(t)}i.getBitsLength=function(t){return 8*t},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){for(let e=0,n=this.data.length;e<n;e++)t.put(this.data[e],8)},t.exports=i},433:function(t,e,n){"use strict";t.exports=function(t){for(var e=[],n=t.length,r=0;r<n;r++){var o=t.charCodeAt(r);if(o>=55296&&o<=56319&&n>r+1){var i=t.charCodeAt(r+1);i>=56320&&i<=57343&&(o=1024*(o-55296)+i-56320+65536,r+=1)}o<128?e.push(o):o<2048?(e.push(o>>6|192),e.push(63&o|128)):o<55296||o>=57344&&o<65536?(e.push(o>>12|224),e.push(o>>6&63|128),e.push(63&o|128)):o>=65536&&o<=1114111?(e.push(o>>18|240),e.push(o>>12&63|128),e.push(o>>6&63|128),e.push(63&o|128)):e.push(239,191,189)}return new Uint8Array(e).buffer}},434:function(t,e,n){const r=n(303),o=n(302);function i(t){this.mode=r.KANJI,this.data=t}i.getBitsLength=function(t){return 13*t},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let n=o.toSJIS(this.data[e]);if(n>=33088&&n<=40956)n-=33088;else{if(!(n>=57408&&n<=60351))throw new Error("Invalid SJIS character: "+this.data[e]+"\nMake sure your charset is UTF-8");n-=49472}n=192*(n>>>8&255)+(255&n),t.put(n,13)}},t.exports=i},435:function(t,e,n){"use strict";var r={single_source_shortest_paths:function(t,e,n){var o={},i={};i[e]=0;var a,s,u,c,l,f,h,d,p,g=r.PriorityQueue.make();g.push(e,0);while(!g.empty())for(u in a=g.pop(),s=a.value,c=a.cost,l=t[s]||{},l)l.hasOwnProperty(u)&&(f=l[u],h=c+f,d=i[u],p="undefined"===typeof i[u],(p||d>h)&&(i[u]=h,g.push(u,h),o[u]=s));if("undefined"!==typeof n&&"undefined"===typeof i[n]){var m=["Could not find a path from ",e," to ",n,"."].join("");throw new Error(m)}return o},extract_shortest_path_from_predecessor_list:function(t,e){var n=[],r=e;while(r)n.push(r),t[r],r=t[r];return n.reverse(),n},find_path:function(t,e,n){var o=r.single_source_shortest_paths(t,e,n);return r.extract_shortest_path_from_predecessor_list(o,n)},PriorityQueue:{make:function(t){var e,n=r.PriorityQueue,o={};for(e in t=t||{},n)n.hasOwnProperty(e)&&(o[e]=n[e]);return o.queue=[],o.sorter=t.sorter||n.default_sorter,o},default_sorter:function(t,e){return t.cost-e.cost},push:function(t,e){var n={value:t,cost:e};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=r},436:function(t,e,n){const r=n(354);function o(t,e,n){t.clearRect(0,0,e.width,e.height),e.style||(e.style={}),e.height=n,e.width=n,e.style.height=n+"px",e.style.width=n+"px"}function i(){try{return document.createElement("canvas")}catch(t){throw new Error("You need to specify a canvas element")}}e.render=function(t,e,n){let a=n,s=e;"undefined"!==typeof a||e&&e.getContext||(a=e,e=void 0),e||(s=i()),a=r.getOptions(a);const u=r.getImageWidth(t.modules.size,a),c=s.getContext("2d"),l=c.createImageData(u,u);return r.qrToImageData(l.data,t,a),o(c,s,u),c.putImageData(l,0,0),s},e.renderToDataURL=function(t,n,r){let o=r;"undefined"!==typeof o||n&&n.getContext||(o=n,n=void 0),o||(o={});const i=e.render(t,n,o),a=o.type||"image/png",s=o.rendererOpts||{};return i.toDataURL(a,s.quality)}},437:function(t,e,n){const r=n(354);function o(t,e){const n=t.a/255,r=e+'="'+t.hex+'"';return n<1?r+" "+e+'-opacity="'+n.toFixed(2).slice(1)+'"':r}function i(t,e,n){let r=t+e;return"undefined"!==typeof n&&(r+=" "+n),r}function a(t,e,n){let r="",o=0,a=!1,s=0;for(let u=0;u<t.length;u++){const c=Math.floor(u%e),l=Math.floor(u/e);c||a||(a=!0),t[u]?(s++,u>0&&c>0&&t[u-1]||(r+=a?i("M",c+n,.5+l+n):i("m",o,0),o=0,a=!1),c+1<e&&t[u+1]||(r+=i("h",s),s=0)):o++}return r}e.render=function(t,e,n){const i=r.getOptions(e),s=t.modules.size,u=t.modules.data,c=s+2*i.margin,l=i.color.light.a?"<path "+o(i.color.light,"fill")+' d="M0 0h'+c+"v"+c+'H0z"/>':"",f="<path "+o(i.color.dark,"stroke")+' d="'+a(u,s,i.margin)+'"/>',h='viewBox="0 0 '+c+" "+c+'"',d=i.width?'width="'+i.width+'" height="'+i.width+'" ':"",p='<svg xmlns="http://www.w3.org/2000/svg" '+d+h+' shape-rendering="crispEdges">'+l+f+"</svg>\n";return"function"===typeof n&&n(null,p),p}},438:function(t,e,n){"use strict";n(355)}}]);