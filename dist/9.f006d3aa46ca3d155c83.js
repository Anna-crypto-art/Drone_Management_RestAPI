(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{273:function(e,t,r){},275:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:"app-table-container "+(e.size?"app-table-container-"+e.size:"")},[e._t("default")],2)},s=[];n._withStripped=!0;var i=r(20),a=r(19),o=r(25),c=r(24),u=r(30),l=(r(48),r(23),r(17)),d=r(16),p=function(e,t,r,n){var s,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(a=(i<3?s(a):i>3?s(t,r,a):s(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a},m=function(e){Object(o["a"])(r,e);var t=Object(c["a"])(r);function r(){return Object(a["a"])(this,r),t.apply(this,arguments)}return Object(i["a"])(r)}(l["default"]);p([Object(d["b"])({default:""})],m.prototype,"size",void 0),m=p([d["a"]],m);var f=m,v=f,h=(r(277),r(34)),b=Object(h["a"])(v,n,s,!1,null,null,null);b.options.__file="src/app/shared/components/app-table-container/app-table-container.vue";t["a"]=b.exports},276:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},277:function(e,t,r){"use strict";r(273)},278:function(e,t,r){"use strict";var n=r(21),s=r(73),i=r(49),a=r(28),o=r(148),c=[],u=c.sort,l=a((function(){c.sort(void 0)})),d=a((function(){c.sort(null)})),p=o("sort"),m=l||!d||!p;n({target:"Array",proto:!0,forced:m},{sort:function(e){return void 0===e?u.call(i(this)):u.call(i(this),s(e))}})},280:function(e,t,r){"use strict";var n=r(21),s=r(281).trim,i=r(282);n({target:"String",proto:!0,forced:i("trim")},{trim:function(){return s(this)}})},281:function(e,t,r){var n=r(81),s=r(276),i="["+s+"]",a=RegExp("^"+i+i+"*"),o=RegExp(i+i+"*$"),c=function(e){return function(t){var r=String(n(t));return 1&e&&(r=r.replace(a,"")),2&e&&(r=r.replace(o,"")),r}};e.exports={start:c(1),end:c(2),trim:c(3)}},282:function(e,t,r){var n=r(28),s=r(276),i="​᠎";e.exports=function(e){return n((function(){return!!s[e]()||i[e]()!=i||s[e].name!==e}))}},301:function(e,t,r){var n=r(21),s=r(310).values;n({target:"Object",stat:!0},{values:function(e){return s(e)}})},310:function(e,t,r){var n=r(39),s=r(98),i=r(51),a=r(116).f,o=function(e){return function(t){var r,o=i(t),c=s(o),u=c.length,l=0,d=[];while(u>l)r=c[l++],n&&!a.call(o,r)||d.push(e?[r,o[r]]:o[r]);return d}};e.exports={entries:o(!0),values:o(!1)}},326:function(e,t,r){},375:function(e,t,r){"use strict";r(326)},418:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-settings-users"},[r("div",{staticClass:"app-settings-users-table-toolbar"},[r("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.invite-modal",modifiers:{"invite-modal":!0}}],staticClass:"btn-invite",attrs:{variant:"primary"},on:{click:function(t){return e.showInviteUserModal()}}},[e._v(" "+e._s(e.$t("invite"))+" ")])],1),r("div",{staticClass:"clearfix"}),r("app-table-container",[r("b-table",{attrs:{fields:e.columns,items:e.rows,"head-variant":"light",hover:"",busy:e.loading},scopedSlots:e._u([{key:"table-busy",fn:function(){return[r("div",{staticClass:"text-center"},[r("b-spinner",{staticClass:"align-middle"})],1)]},proxy:!0},{key:"cell(name)",fn:function(t){return[t.item.name.userName?r("span",[e._v(" "+e._s(t.item.name.userName)),r("br"),r("small",{staticClass:"grayed"},[e._v(e._s(t.item.name.email))])]):r("span",[e._v(e._s(t.item.name.email))])]}},{key:"cell(state)",fn:function(t){return[e._v(" "+e._s(e.$t(t.item.state.userState))+" "),t.item.state.date?r("span",[r("br"),r("small",{staticClass:"grayed"},[e._v(e._s(t.item.state.date))])]):e._e()]}},{key:"cell(role)",fn:function(t){return[e._v(" "+e._s(t.item.role.name)+" "),t.item.customer.id?r("span",[r("br"),r("small",{staticClass:"grayed"},[e._v(e._s(t.item.customer.name))])]):e._e()]}},{key:"cell(plants)",fn:function(t){return e._l(t.item.plants,(function(t){return r("div",{key:t.id},[e._v(" "+e._s(t.name)+" ")])}))}},{key:"cell(actions)",fn:function(t){return[r("div",{staticClass:"hover-cell pull-right"},[r("b-button",{directives:[{name:"show",rawName:"v-show",value:"SUPER_ADMIN"!==t.item.role,expression:"row.item.role !== 'SUPER_ADMIN'"}],attrs:{variant:"secondary",size:"sm",title:e.$t("edit-user")},on:{click:function(r){return e.onEditUserClick(t.item)}}},[r("b-icon",{attrs:{icon:"wrench"}})],1),r("b-button",{directives:[{name:"show",rawName:"v-show",value:"pending"==t.item.state.userState,expression:"row.item.state.userState == 'pending'"}],attrs:{variant:"secondary",size:"sm",title:e.$t("resend-invitation")},on:{click:function(r){return e.onResendInvitationClick(t.item)}}},[r("b-icon",{attrs:{icon:"envelope"}})],1),r("b-button",{attrs:{variant:"secondary",size:"sm",title:e.$t("locked"===t.item.state.userState?"unlock":"lock")},on:{click:function(r){return e.onUnLockClick(t.item)}}},[r("b-icon",{attrs:{icon:"locked"===t.item.state.userState?"unlock":"lock"}})],1),r("b-button",{attrs:{variant:"outline-danger",size:"sm",title:e.$t("delete-user")},on:{click:function(r){return e.onDeleteUserClick(t.item)}}},[r("b-icon",{attrs:{icon:"trash"}})],1)],1)]}}])})],1),r("app-modal-form",{ref:"appInviteModal",attrs:{id:"inivite-modal",title:e.$t("invite-new-user"),subtitle:e.$t("invite-new-user_descr"),"ok-title":e.$t("invite"),modalLoading:e.inviteLoading},on:{submit:e.inviteUser}},[r("b-form-group",{attrs:{label:e.$t("email"),"label-for":"email"}},[r("b-form-input",{attrs:{id:"email",type:"email",placeholder:e.$t("email"),required:""},model:{value:e.newUser.email,callback:function(t){e.$set(e.newUser,"email",t)},expression:"newUser.email"}})],1),r("b-row",[r("b-col",[r("b-form-group",{attrs:{label:e.$t("role"),"label-for":"role"}},[r("b-form-select",{attrs:{id:"role",options:e.roles},model:{value:e.newUser.role_id,callback:function(t){e.$set(e.newUser,"role_id",t)},expression:"newUser.role_id"}})],1)],1),r("b-col",[r("b-form-group",{attrs:{label:e.$t("customer"),"label-for":"customer"}},[r("b-form-select",{attrs:{id:"customer",options:e.customers},on:{change:e.onCustomerChanged},model:{value:e.newUser.customer_id,callback:function(t){e.$set(e.newUser,"customer_id",t)},expression:"newUser.customer_id"}})],1)],1)],1),r("b-row",[r("b-col",{directives:[{name:"show",rawName:"v-show",value:e.newUser.customer_id,expression:"newUser.customer_id"}]},[r("div",[r("b",[e._v(e._s(e.$t("plants")))])]),e._l(e.inviteUserCustomerPlants,(function(t){return r("div",{key:t.plant.id},[r("b-checkbox",{model:{value:t.selected,callback:function(r){e.$set(t,"selected",r)},expression:"customerPlant.selected"}},[e._v(" "+e._s(t.plant.name)+" "),t.otherCustomers?r("small",{staticClass:"grayed"},[e._v(e._s(t.otherCustomers))]):e._e()])],1)}))],2)],1)],1),r("app-modal-form",{ref:"appEditUserModal",attrs:{id:"edit-user-modal","ok-title":e.$t("apply"),modalLoading:e.editUserLoading},on:{submit:e.updateUser},scopedSlots:e._u([{key:"modal-title",fn:function(){return[r("h4",[e._v(e._s(e.$t("update-user",{user:e.editUser&&e.editUser.email||""})))])]},proxy:!0}])},[e.editUser?r("b-row",[r("b-col",[r("b-form-group",{attrs:{label:e.$t("role"),"label-for":"role"}},[r("b-form-select",{attrs:{id:"role",options:e.roles},model:{value:e.editUser.roleId,callback:function(t){e.$set(e.editUser,"roleId",t)},expression:"editUser.roleId"}})],1)],1),r("b-col",[r("div",[r("b",[e._v(e._s(e.$t("plants")))])]),e._l(e.editUser.customerPlants,(function(t){return r("div",{key:t.plant.id},[r("b-checkbox",{model:{value:t.selected,callback:function(r){e.$set(t,"selected",r)},expression:"customerPlant.selected"}},[e._v(" "+e._s(t.plant.name)+" "),t.otherCustomers?r("small",{staticClass:"grayed"},[e._v(e._s(t.otherCustomers))]):e._e()])],1)}))],2)],1):e._e()],1)],1)},s=[];n._withStripped=!0;var i,a=r(7),o=r(11),c=r(19),u=r(20),l=r(25),d=r(24),p=r(30),m=(r(48),r(23),r(112),r(94),r(71),r(278),r(280),r(143),r(144),r(149),r(96),r(217),r(209),r(210),r(301),r(16)),f=r(275),v=r(146),h=r(45);(function(e){e["REGISTERED"]="REGISTERED",e["PENDING"]="PENDING",e["UNKNOWN"]="UNKNOWN"})(i||(i={}));var b=r(26),w=r(42),U=r(145),_=function(e,t,r,n){var s,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(p["a"])(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(a=(i<3?s(a):i>3?s(t,r,a):s(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a},k=10,g=function(e){Object(l["a"])(r,e);var t=Object(d["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.columns=[],e.rows=[],e.loading=!1,e.inviteLoading=!1,e.customers=[],e.roles=[{value:b["a"].CUSTOMER_ADMIN,text:b["b"][b["a"].CUSTOMER_ADMIN]},{value:b["a"].PILOT,text:b["b"][b["a"].PILOT]},{value:b["a"].ASSISTANT,text:b["b"][b["a"].ASSISTANT]}],e.newUser=e.initialInviteUser(),e.inviteUserCustomerPlants=[],e.editUserLoading=!1,e.editUser=null,e}return Object(u["a"])(r,[{key:"created",value:function(){var e=Object(o["a"])(Object(a["a"])().mark((function e(){return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.columns=[{key:"name",label:this.$t("name").toString()},{key:"state",label:this.$t("state").toString()},{key:"role",label:this.$t("role").toString()},{key:"plants",label:this.$t("plants").toString()},{key:"actions",label:""}],e.next=3,this.updateUserRows();case 3:return e.prev=3,e.next=6,h["a"].getCustomers();case 6:return this.customers=e.sent.map((function(e){return{value:e.id,text:e.name}})),this.customers.unshift({value:null,text:""}),e.next=10,h["a"].getAllPlants();case 10:this.plants=e.sent,e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](3),this.showError(e.t0);case 16:case"end":return e.stop()}}),e,this,[[3,13]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"updateUserRows",value:function(){var e=Object(o["a"])(Object(a["a"])().mark((function e(){var t,r,n=this;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=[],this.loading=!0,e.prev=2,e.next=5,h["a"].getUsers(null===(r=this.selectedCustomer)||void 0===r?void 0:r.id);case 5:t=e.sent,this.rows=t.map((function(e){var t="",r=e.state.toLowerCase();return e.is_locked?r="locked":e.state===i.REGISTERED?t=n.$t("registered-at").toString()+" "+U["a"].toDateTime(e.registered_at):e.state===i.PENDING&&(t=n.$t("invited-at").toString()+" "+U["a"].toDateTime(e.invited_at)),{id:e.id,name:{userName:((e.first_name||"")+" "+(e.last_name||"")).trim(),email:e.email},state:{date:t,userState:r},customer:{name:e.customer?e.customer.name:null,id:e.customer?e.customer.id:null},role:e.role,plants:e.plants||[]}})).sort((function(e,t){if(e.role.id===b["a"].SUPER_ADMIN&&t.role.id!==b["a"].SUPER_ADMIN)return-1;if(t.role.id===b["a"].SUPER_ADMIN&&e.role.id!==b["a"].SUPER_ADMIN)return 1;var r=e.name.email.toLowerCase(),n=t.name.email.toLowerCase();return r<n?-1:r>n?1:0})),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](2),this.showError(e.t0);case 12:return e.prev=12,this.loading=!1,e.finish(12);case 15:case"end":return e.stop()}}),e,this,[[2,9,12,15]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"showInviteUserModal",value:function(){var e=Object(o["a"])(Object(a["a"])().mark((function e(){return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.newUser=this.initialInviteUser(),this.setInviteUserCustomerPlants(),this.appInviteModal.show();case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"inviteUser",value:function(){var e=Object(o["a"])(Object(a["a"])().mark((function e(){var t;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=this.getErrorInviteUserForm(),!t){e.next=5;break}return this.showError(t),this.inviteLoading=!1,e.abrupt("return");case 5:return this.inviteLoading=!0,e.prev=6,this.newUser.plant_ids=this.inviteUserCustomerPlants.filter((function(e){return e.selected})).map((function(e){return e.plant.id})),e.next=10,h["a"].inviteUser(this.newUser);case 10:return this.appInviteModal.hide(),this.showSuccess(this.$t("user-invited-successfully").toString()),e.next=14,this.updateUserRows();case 14:e.next=19;break;case 16:e.prev=16,e.t0=e["catch"](6),this.showError(e.t0);case 19:return e.prev=19,this.inviteLoading=!1,e.finish(19);case 22:case"end":return e.stop()}}),e,this,[[6,16,19,22]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"initialInviteUser",value:function(){var e;return{email:"",role_id:null,customer_id:(null===(e=this.selectedCustomer)||void 0===e?void 0:e.id)||null}}},{key:"onResendInvitationClick",value:function(){var e=Object(o["a"])(Object(a["a"])().mark((function e(t){return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h["a"].resendUserInvitation(t.id);case 3:this.showSuccess(this.$t("user-invitation-sent-successfully").toString()),e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),this.showError(e.t0);case 9:case"end":return e.stop()}}),e,this,[[0,6]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onUnLockClick",value:function(){var e=Object(o["a"])(Object(a["a"])().mark((function e(t){var r,n;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,r="locked"!==t.state.userState,n=this.$t("sure-un-lock-user",{lock:r?"Lock":"Unlock",user:t.name.email}).toString(),confirm(n)){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,h["a"].unLockUser(t.id,r);case 7:return this.showSuccess(this.$t(r?"user-locked-successfully":"user-unlocked-successfully").toString()),e.next=10,this.updateUserRows();case 10:e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](0),this.showError(e.t0);case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onDeleteUserClick",value:function(){var e=Object(o["a"])(Object(a["a"])().mark((function e(t){var r;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.loading=!0,e.prev=1,r=this.$t("sure-delete-user",{user:t.name.email}).toString(),confirm(r)){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,h["a"].deleteUser(t.id);case 7:return this.showSuccess(this.$t("user-deleted-successfully",{user:t.name.email}).toString()),e.next=10,this.updateUserRows();case 10:e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](1),this.showError(e.t0);case 15:return e.prev=15,this.loading=!1,e.finish(15);case 18:case"end":return e.stop()}}),e,this,[[1,12,15,18]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onCustomerChanged",value:function(){var e=this;if(this.newUser.customer_id){var t=this.rows.filter((function(t){return t.customer.id===e.newUser.customer_id})).length;t>=k&&this.appInviteModal.alertInfo(this.$t("user-limit-for-customer-reached").toString())}this.setInviteUserCustomerPlants()}},{key:"onEditUserClick",value:function(e){this.editUser={id:e.id,email:e.name.email,roleId:e.role.id,customerPlants:this.getEditUserCustomerPlants(e)},this.appEditUserModal.hideAlert(),this.appEditUserModal.show()}},{key:"setInviteUserCustomerPlants",value:function(){var e,t=this;null!==(e=this.newUser)&&void 0!==e&&e.customer_id?this.inviteUserCustomerPlants=this.plants.filter((function(e){return e.customers.find((function(e){return e.id===t.newUser.customer_id}))})).map((function(e){return{plant:e,selected:!1,otherCustomers:e.customers.filter((function(e){return e.id!==t.newUser.customer_id})).map((function(e){return e.name})).join(", ")}})):this.inviteUserCustomerPlants=[]}},{key:"updateUser",value:function(){var e=Object(o["a"])(Object(a["a"])().mark((function e(){var t;return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.editUserLoading=!0,e.prev=1,t=this.editUser.customerPlants.filter((function(e){return e.selected})).map((function(e){return e.plant.id})),e.next=5,h["a"].assignPlantsToUser(this.editUser.id,t);case 5:return e.next=7,h["a"].changeUserRole(this.editUser.id,this.editUser.roleId);case 7:return this.appEditUserModal.hide(),this.showSuccess(this.$t("user-edited-successfully").toString()),e.next=11,this.updateUserRows();case 11:e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](1),this.showError(e.t0);case 16:return e.prev=16,this.editUserLoading=!1,e.finish(16);case 19:case"end":return e.stop()}}),e,this,[[1,13,16,19]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"getEditUserCustomerPlants",value:function(e){return null!==e&&void 0!==e&&e.customer.id?this.plants.filter((function(t){return t.customers.find((function(t){return t.id===e.customer.id}))})).map((function(t){return{plant:t,selected:!!e.plants.find((function(e){return e.id===t.id})),otherCustomers:t.customers.filter((function(t){return t.id!==e.customer.id})).map((function(e){return e.name})).join(", ")}})):[]}},{key:"getErrorInviteUserForm",value:function(){return/^\S+@\S+$/.test(this.newUser.email.trim())?null!==this.newUser.role_id&&Object.values(b["a"]).includes(this.newUser.role_id)?this.newUser.customer_id?"":"MISSING_CUSTOMER":"INVALID_OR_MISSING_ROLE":"INVALID_OR_MISSING_EMAIL"}}]),r}(w["a"]);_([Object(m["c"])()],g.prototype,"appInviteModal",void 0),_([Object(m["c"])()],g.prototype,"appEditUserModal",void 0),g=_([Object(m["a"])({name:"app-settings-users",components:{AppTableContainer:f["a"],AppModalForm:v["a"]}})],g);var y=g,x=y,O=(r(375),r(34)),S=Object(O["a"])(x,n,s,!1,null,null,null);S.options.__file="src/app/settings/users/users.vue";t["default"]=S.exports}}]);