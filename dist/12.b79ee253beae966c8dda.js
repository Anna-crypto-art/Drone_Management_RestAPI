(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{323:function(e,t,n){var r=n(36),a=n(162);e.exports=function(e,t,n){var s,i;return a&&"function"==typeof(s=t.constructor)&&s!==n&&r(i=s.prototype)&&i!==n.prototype&&a(e,i),e}},328:function(e,t,n){"use strict";var r,a;n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return a})),function(e){e["UNALLOCATED"]="UNALLOCATED",e["STOPPED"]="STOPPED",e["RUNNING"]="RUNNING"}(r||(r={})),function(e){e["ALLOCATE"]="ALLOCATE",e["ALLOCATE_AND_START"]="ALLOCATE_AND_START",e["START"]="START",e["RELEASE"]="RELEASE",e["SET_SERVER_SIZE_SMALL"]="SET_SERVER_SIZE_SMALL",e["SET_SERVER_SIZE_MEDIUM"]="SET_SERVER_SIZE_MEDIUM",e["SET_SERVER_SIZE_LARGE"]="SET_SERVER_SIZE_LARGE",e["STOP"]="STOP",e["STOP_AND_RELEASE"]="STOP_AND_RELEASE",e["INCREASE_EBS_SIZE_100GB"]="INCREASE_EBS_SIZE_100GB",e["INCREASE_EBS_SIZE_250GB"]="INCREASE_EBS_SIZE_250GB",e["INCREASE_EBS_SIZE_500GB"]="INCREASE_EBS_SIZE_500GB"}(a||(a={}))},346:function(e,t,n){"use strict";var r;n.d(t,"a",(function(){return r})),function(e){e["import_analysis_results"]="import_analysis_results",e["run_qfly_wizard"]="run_qfly_wizard",e["download_analysis_files"]="download_analysis_files"}(r||(r={}))},376:function(e,t,n){var r=n(103),a=n(36),s=n(38),i=n(50).f,o=n(124),l=n(464),c=o("meta"),u=0,v=Object.isExtensible||function(){return!0},p=function(e){i(e,c,{value:{objectID:"O"+ ++u,weakData:{}}})},d=function(e,t){if(!a(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!s(e,c)){if(!v(e))return"F";if(!t)return"E";p(e)}return e[c].objectID},f=function(e,t){if(!s(e,c)){if(!v(e))return!0;if(!t)return!1;p(e)}return e[c].weakData},y=function(e){return l&&_.REQUIRED&&v(e)&&!s(e,c)&&p(e),e},_=e.exports={REQUIRED:!1,fastKey:d,getWeakData:f,onFreeze:y};r[c]=!0},377:function(e,t,n){},462:function(e,t,n){"use strict";var r=n(463),a=n(465);e.exports=r("Map",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),a)},463:function(e,t,n){"use strict";var r=n(25),a=n(33),s=n(161),i=n(51),o=n(376),l=n(226),c=n(122),u=n(36),v=n(29),p=n(167),d=n(66),f=n(323);e.exports=function(e,t,n){var y=-1!==e.indexOf("Map"),_=-1!==e.indexOf("Weak"),S=y?"set":"add",h=a[e],m=h&&h.prototype,g=h,b={},k=function(e){var t=m[e];i(m,e,"add"==e?function(e){return t.call(this,0===e?0:e),this}:"delete"==e?function(e){return!(_&&!u(e))&&t.call(this,0===e?0:e)}:"get"==e?function(e){return _&&!u(e)?void 0:t.call(this,0===e?0:e)}:"has"==e?function(e){return!(_&&!u(e))&&t.call(this,0===e?0:e)}:function(e,n){return t.call(this,0===e?0:e,n),this})};if(s(e,"function"!=typeof h||!(_||m.forEach&&!v((function(){(new h).entries().next()})))))g=n.getConstructor(t,e,y,S),o.REQUIRED=!0;else if(s(e,!0)){var E=new g,A=E[S](_?{}:-0,1)!=E,O=v((function(){E.has(1)})),w=p((function(e){new h(e)})),x=!_&&v((function(){var e=new h,t=5;while(t--)e[S](t,t);return!e.has(-0)}));w||(g=t((function(t,n){c(t,g,e);var r=f(new h,t,g);return void 0!=n&&l(n,r[S],r,y),r})),g.prototype=m,m.constructor=g),(O||x)&&(k("delete"),k("has"),y&&k("get")),(x||A)&&k(S),_&&m.clear&&delete m.clear}return b[e]=g,r({global:!0,forced:g!=h},b),d(g,e),_||n.setStrong(g,e,y),g}},464:function(e,t,n){var r=n(29);e.exports=!r((function(){return Object.isExtensible(Object.preventExtensions({}))}))},465:function(e,t,n){"use strict";var r=n(50).f,a=n(85),s=n(166),i=n(88),o=n(122),l=n(226),c=n(165),u=n(227),v=n(39),p=n(376).fastKey,d=n(72),f=d.set,y=d.getterFor;e.exports={getConstructor:function(e,t,n,c){var u=e((function(e,r){o(e,u,t),f(e,{type:t,index:a(null),first:void 0,last:void 0,size:0}),v||(e.size=0),void 0!=r&&l(r,e[c],e,n)})),d=y(t),_=function(e,t,n){var r,a,s=d(e),i=S(e,t);return i?i.value=n:(s.last=i={index:a=p(t,!0),key:t,value:n,previous:r=s.last,next:void 0,removed:!1},s.first||(s.first=i),r&&(r.next=i),v?s.size++:e.size++,"F"!==a&&(s.index[a]=i)),e},S=function(e,t){var n,r=d(e),a=p(t);if("F"!==a)return r.index[a];for(n=r.first;n;n=n.next)if(n.key==t)return n};return s(u.prototype,{clear:function(){var e=this,t=d(e),n=t.index,r=t.first;while(r)r.removed=!0,r.previous&&(r.previous=r.previous.next=void 0),delete n[r.index],r=r.next;t.first=t.last=void 0,v?t.size=0:e.size=0},delete:function(e){var t=this,n=d(t),r=S(t,e);if(r){var a=r.next,s=r.previous;delete n.index[r.index],r.removed=!0,s&&(s.next=a),a&&(a.previous=s),n.first==r&&(n.first=a),n.last==r&&(n.last=s),v?n.size--:t.size--}return!!r},forEach:function(e){var t,n=d(this),r=i(e,arguments.length>1?arguments[1]:void 0,3);while(t=t?t.next:n.first){r(t.value,t.key,this);while(t&&t.removed)t=t.previous}},has:function(e){return!!S(this,e)}}),s(u.prototype,n?{get:function(e){var t=S(this,e);return t&&t.value},set:function(e,t){return _(this,0===e?0:e,t)}}:{add:function(e){return _(this,e=0===e?0:e,e)}}),v&&r(u.prototype,"size",{get:function(){return d(this).size}}),u},setStrong:function(e,t,n){var r=t+" Iterator",a=y(t),s=y(r);c(e,t,(function(e,t){f(this,{type:r,target:e,state:a(e),kind:t,last:void 0})}),(function(){var e=s(this),t=e.kind,n=e.last;while(n&&n.removed)n=n.previous;return e.target&&(e.last=n=n?n.next:e.state.first)?"keys"==t?{value:n.key,done:!1}:"values"==t?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(e.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),u(t)}}},466:function(e,t,n){"use strict";n(377)},519:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-operations-monitoring"},[n("div",{staticClass:"monitoring-toolbar"},[n("app-button",{on:{click:function(t){return e.updateOperationsStatus()}}},[e._v(e._s(e.$t("reload")))]),n("div",{staticClass:"monitoring-toolbar-loading"},[e.loading?n("b-spinner"):e._e()],1),n("b-checkbox",{attrs:{switch:""},on:{change:e.changeAutoReload},model:{value:e.autoReload,callback:function(t){e.autoReload=t},expression:"autoReload"}},[e._v(" "+e._s(e.$t("auto-reload"))+" ")])],1),n("b-tabs",{attrs:{align:"center"}},[n("b-tab",{staticClass:"app-analysis-monitoring-tab",scopedSlots:e._u([{key:"title",fn:function(){return[n("b-icon",{attrs:{icon:"graph-up"}}),n("span",{staticClass:"pad-left"},[e._v(e._s(e.$t("analysis-progress")))])]},proxy:!0}])},[n("div",{staticClass:"app-analysis-monitoring"},e._l(e.monitoring_json,(function(t,r){return n("div",{key:r},[n("b-card",{class:{"app-analysis-monitoring-title":!0,closed:!e.collapsed_states[r]}},[e.qfly_servery_by_analysis_name.has(r)?n("span",[e._v(e._s(r+" ("+e.qfly_servery_by_analysis_name.get(r)+")"))]):n("span",[e._v(e._s(r))]),n("b-icon",{staticClass:"app-analysis-monitoring-toggle",attrs:{icon:"chevron-down","font-scale":"1.5",variant:"secondary"},on:{click:function(t){return e.toggleAnalysis(r)}}})],1),n("b-collapse",{model:{value:e.collapsed_states[r],callback:function(t){e.$set(e.collapsed_states,r,t)},expression:"collapsed_states[analysisName]"}},[e.hasError(t)?n("div",[n("div",{staticClass:"app-analysis-monitoring-states"},[n("b-card",{attrs:{"no-body":""}},[n("div",{class:"app-analysis-monitoring-state app-analysis-monitoring-state-crashed",attrs:{title:"CRASHED"}},[e._v(" "+e._s(t.error)+" ")])])],1)]):e._e(),!e.hasError(t)&&e.hasProjects(t)?n("div",e._l(t.output.projects,(function(t,r){return n("div",{key:r,staticClass:"app-analysis-monitoring-states"},[n("b-card",{attrs:{"no-body":""}},[n("div",{class:"app-analysis-monitoring-state app-analysis-monitoring-state-"+t.state.toLowerCase(),attrs:{title:t.state}},[n("span",{staticClass:"monitoring-project"},[e._v(e._s(r))]),n("span",{staticClass:"monitoring-state grayed"},[e._v(e._s(t.state))]),n("span",{staticClass:"monitoring-action grayed"},[e._v(e._s(t.current_action))])])])],1)})),0):e._e(),!e.hasError(t)&&e.hasInfo(t)?n("div",[n("div",{staticClass:"app-analysis-monitoring-states"},[n("b-card",{attrs:{"no-body":""}},[n("div",{class:"app-analysis-monitoring-state app-analysis-monitoring-state-running",attrs:{title:t.name}},[n("span",{domProps:{innerHTML:e._s(e.getAnalysisStateInfos(t))}})])])],1)]):e._e()])],1)})),0)]),n("b-tab",{staticClass:"app-server-monitoring-tab",scopedSlots:e._u([{key:"title",fn:function(){return[n("b-icon",{attrs:{icon:"server"}}),n("span",{staticClass:"pad-left"},[e._v(e._s(e.$t("qfly-servers")))])]},proxy:!0}])},[n("app-table-container",[n("app-table",{attrs:{columns:e.columns,rows:e.rows,hoverActions:!0},scopedSlots:e._u([{key:"cell(state)",fn:function(t){return[n("span",{class:e.serverIsRunning(t.item)?"blue":"grayed"},[e._v(" "+e._s(t.item.state)+" ")])]}},{key:"cell(volume_size)",fn:function(t){return[e._v(" "+e._s(e.$t("volume-size-with-gb",{volume_size:t.item.volume_size}))+" ")]}},{key:"hoverActions",fn:function(t){return[e.serverIsRunning(t.item)?e._e():n("app-button",{attrs:{variant:"secondary",size:"sm",title:e.$t("start-server",{product_package:t.item.name}),icon:"play-fill"},on:{click:function(n){return e.onStartServerClick(t.item)}}}),e.serverIsRunning(t.item)?n("app-button",{attrs:{variant:"danger",size:"sm",title:e.$t("stop-server",{product_package:t.item.name}),icon:"stop-fill"},on:{click:function(n){return e.onStopServerClick(t.item)}}}):e._e(),n("app-button",{attrs:{variant:"secondary",size:"sm",title:e.$t("edit-server",{product_package:t.item.name}),icon:"wrench"},on:{click:function(n){return e.onEditServerClick(t.item)}}})]}}])})],1),n("app-modal-form",{ref:"appQFlyServerModal",attrs:{id:"qfly-server-modal",title:e.qflyServerModalTitle,"ok-title":e.qflyServerModalOkTitle,modalLoading:e.qflyServerModalLoading},on:{submit:e.onSubmitQFlyServer}},[n("b-row",[n("b-col",[n("b-form-group",{attrs:{label:e.$t("name")}},[n("b-form-input",{attrs:{id:"new-qfly-server-name",required:"",placeholder:e.$t("name")},on:{change:e.onTagChanged},model:{value:e.currentQFlyServer.server.name,callback:function(t){e.$set(e.currentQFlyServer.server,"name",t)},expression:"currentQFlyServer.server.name"}})],1),n("b-form-group",{attrs:{label:e.$t("current-analysis")}},[n("b-form-input",{attrs:{id:"new-qfly-server-name"},on:{change:e.onTagChanged},model:{value:e.currentQFlyServer.analysis_name,callback:function(t){e.$set(e.currentQFlyServer,"analysis_name",t)},expression:"currentQFlyServer.analysis_name"}})],1),n("b-form-group",{attrs:{label:e.$t("notes")}},[n("b-form-textarea",{attrs:{id:"new-qfly-server-notes",rows:"4"},on:{change:e.onTagChanged},model:{value:e.currentQFlyServer.notes,callback:function(t){e.$set(e.currentQFlyServer,"notes",t)},expression:"currentQFlyServer.notes"}})],1),n("b-form-group",{attrs:{label:e.$t("run-server-action")}},[n("b-form-select",{attrs:{options:e.qFlyServerActionSelection},model:{value:e.selectedServerAction,callback:function(t){e.selectedServerAction=t},expression:"selectedServerAction"}})],1),n("b-form-group",{attrs:{label:e.$t("run-task")}},[n("b-form-select",{attrs:{options:e.runTaskSelection,disabled:e.taskSelectionDisabled},model:{value:e.selectedTask,callback:function(t){e.selectedTask=t},expression:"selectedTask"}})],1)],1)],1)],1)],1)],1)],1)},a=[];r._withStripped=!0;var s=n(49),i=n(6),o=n(9),l=n(47),c=n(71),u=n(18),v=n(19),p=n(23),d=n(22),f=n(27),y=(n(44),n(24),n(462),n(46),n(53),n(95),n(155),n(75),n(96),n(150),n(82),n(16)),_=n(45),S=n(98),h=n(62),m=n(42),g=n(328),b=n(287),k=n(288),E=n(148),A=n(152),O=n(346),w=n(158),x=function(e,t,n,r){var a,s=arguments.length,i=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(f["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(i=(s<3?a(i):s>3?a(t,n,i):a(t,n))||i);return s>3&&i&&Object.defineProperty(t,n,i),i},R=1e4,C=function(e){Object(p["a"])(n,e);var t=Object(d["a"])(n);function n(){var e;return Object(u["a"])(this,n),e=t.apply(this,arguments),e.columns=[],e.rows=[],e.monitoring_json=null,e.collapsed_states={},e.qfly_servers=null,e.qfly_servery_by_analysis_name=new Map,e.loading=!0,e.qflyServerModalLoading=!1,e.qflyServerModalTitle=e.$t("edit-server").toString(),e.qflyServerModalOkTitle=e.$t("apply").toString(),e.currentQFlyServer={server:{id:"",name:"",tags:[],instance_type:"",volume_size:0},analysis_name:"",state:g["b"].UNALLOCATED,actions:[],notes:""},e.qFlyServerActionSelection=[],e.runTaskSelection=[],e.selectedServerAction=null,e.selectedTask=null,e.taskSelectionDisabled=!1,e.tagsChanged=!1,e.autoReload=!1,e}return Object(v["a"])(n,[{key:"changeAutoReload",value:function(e){e?this.reloadInterval=setInterval(this.updateOperationsStatus,R):void 0!=this.reloadInterval&&clearInterval(this.reloadInterval)}},{key:"toggleAnalysis",value:function(e){this.collapsed_states=Object(c["a"])(Object(c["a"])({},this.collapsed_states),{},Object(l["a"])({},e,!this.collapsed_states[e]))}},{key:"updateOperationsStatus",value:function(){this.loadAnalysisStatus(),this.loadQFlyServerStatus()}},{key:"loadAnalysisStatus",value:function(){var e=Object(o["a"])(Object(i["a"])().mark((function e(){var t,n;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,m["a"].getAnalysisMonitoring();case 2:for(n in t=e.sent,t)void 0===this.collapsed_states[n]&&(this.collapsed_states[n]=!0);this.monitoring_json=t;case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"loadQFlyServerStatus",value:function(){var e=Object(o["a"])(Object(i["a"])().mark((function e(){var t=this;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,m["a"].getQFlyServers();case 2:this.qfly_servers=e.sent,this.qfly_servers.forEach((function(e){e.server&&t.qfly_servery_by_analysis_name.set(e.analysis_name,e.server.name)})),this.rows=Object(w["a"])(this.qfly_servers.map((function(e){return{name:e.server.name,server:e.server,analysis_name:e.analysis_name,state:e.state,instance_type:e.server.instance_type,volume_size:e.server.volume_size,tags:e.server.tags,git_branch:e.server.tags.find((function(e){return"GitBranch"===e.Key})).Value,git_pull_on_startup:e.server.tags.find((function(e){return"GitPullOnStartup"===e.Key})).Value,start_worker_on_startup:e.server.tags.find((function(e){return"StartWorkerOnStartup"===e.Key})).Value,actions:e.actions,instance_id:e.server.id,notes:e.notes}})),"name");case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"created",value:function(){var e=Object(o["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.columns=[{key:"name",label:this.$t("name").toString()},{key:"analysis_name",label:this.$t("current-analysis").toString(),labelExpl:this.$t("current-analysis_expl").toString()},{key:"notes",label:this.$t("notes").toString()},{key:"state",label:this.$t("state").toString()},{key:"instance_type",label:this.$t("instance-type").toString()},{key:"volume_size",label:this.$t("volume-size").toString()},{key:"git_branch",label:this.$t("git-branch").toString()}],this.updateOperationsStatus();case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"hasError",value:function(e){var t;return!(null===(t=e.output)||void 0===t||!t.error)}},{key:"hasInfo",value:function(e){var t;return!!(null!==(t=e.output)&&void 0!==t&&t.infos&&e.output.infos.length>0)}},{key:"hasProjects",value:function(e){var t;return!(null===(t=e.output)||void 0===t||!t.projects)}},{key:"getAnalysisStateInfos",value:function(e){return m["a"].getTaskOutputAsMessage(e)}},{key:"serverIsRunning",value:function(e){return e.state==g["b"].RUNNING}},{key:"serverHasCurrentAnalysis",value:function(e){return""!==e.analysis_name}},{key:"onStartServerClick",value:function(){var e=Object(o["a"])(Object(i["a"])().mark((function e(t){var n,r;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=this.$t("sure-start-server",{server_name:t.name}).toString(),confirm(n)){e.next=3;break}return e.abrupt("return");case 3:return r={instance_id:t.instance_id,server_name:t.server.name,analysis_name:t.analysis_name,new_tags:void 0,action:void 0,task:void 0},e.abrupt("return",m["a"].startQFlyServer(r));case 5:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onStopServerClick",value:function(){var e=Object(o["a"])(Object(i["a"])().mark((function e(t){var n,r;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=this.$t("sure-stop-server",{server_name:t.name}).toString(),confirm(n)){e.next=3;break}return e.abrupt("return");case 3:return r={instance_id:t.instance_id,server_name:t.server.name,analysis_name:t.analysis_name,new_tags:void 0,action:void 0,task:void 0},e.abrupt("return",m["a"].stopQFlyServer(r));case 5:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onEditServerClick",value:function(e){var t=this;this.currentQFlyServer={server:e.server,analysis_name:e.analysis_name,state:e.state,actions:e.actions,notes:e.notes},this.selectedServerAction=null,this.selectedTask=null,this.qFlyServerActionSelection=[{value:null,text:""}].concat(Object(s["a"])(this.currentQFlyServer.actions.map((function(e){return{value:e,text:t.$t("SERVER_ACTION_".concat(e)).toString()}})))),this.runTaskSelection=[{value:null,text:""},{text:this.$t("download-analysis-files").toString(),value:O["a"].download_analysis_files},{text:this.$t("run-qfly-wizard").toString(),value:O["a"].run_qfly_wizard}],this.appQFlyServerModal.show()}},{key:"onSubmitQFlyServer",value:function(){var e=Object(o["a"])(Object(i["a"])().mark((function e(){var t,n;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=[{Key:"Name",Value:this.currentQFlyServer.server.name},{Key:"CurrentAnalysis",Value:this.currentQFlyServer.analysis_name},{Key:"Notes",Value:this.currentQFlyServer.notes}],n={instance_id:this.currentQFlyServer.server.id,server_name:this.currentQFlyServer.server.name,analysis_name:this.currentQFlyServer.analysis_name,new_tags:this.tagsChanged?t:void 0,action:this.selectedServerAction&&g["a"][this.selectedServerAction]||void 0,task:this.selectedTask&&O["a"][this.selectedTask]||void 0},e.next=4,m["a"].updateQFlyServer(n);case 4:this.showSuccess(this.$t("qfly-server-edited-successfully",{server_name:this.currentQFlyServer.server.name}).toString()),this.appQFlyServerModal.hide(),this.loadQFlyServerStatus(),this.tagsChanged=!1;case 8:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onTagChanged",value:function(){this.tagsChanged=!0}}]),n}(_["a"]);x([Object(y["c"])()],C.prototype,"appQFlyServerModal",void 0),x([Object(E["a"])("loading")],C.prototype,"loadAnalysisStatus",null),x([Object(E["a"])("loading")],C.prototype,"loadQFlyServerStatus",null),x([Object(E["a"])()],C.prototype,"onStartServerClick",null),x([Object(E["a"])()],C.prototype,"onStopServerClick",null),x([Object(E["a"])("qflyServerModalLoading")],C.prototype,"onSubmitQFlyServer",null),C=x([Object(y["a"])({name:"app-settings-monitoring",components:{AppContent:S["a"],AppButton:h["a"],AppTableContainer:k["a"],AppTable:b["a"],AppModalForm:A["a"]}})],C);var j=C,T=j,F=(n(466),n(28)),I=Object(F["a"])(T,r,a,!1,null,null,null);I.options.__file="src/app/settings/monitoring/monitoring.vue";t["default"]=I.exports}}]);