"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[199],{4171:function(e,t,s){s.r(t),s.d(t,{default:function(){return U}});var r=s(2781),a=s(375),l=s(7210),i=s(8834),o=s(3882),n=s(1526),c=s(6278),u=s(1373),d=s(4155),m=s(1770),p=s(8230),f=s(9456),h=s(8412),v=s(1556),g=s(3021),b=s(7410),y=s(9093),A=s(9940),w=s(7043),k=s(4794),x=function(){var e=this,t=e._self._c;return t(c.A,[t(l.A,{attrs:{elevation:"2"}},[t(i.ri,{staticClass:"d-flex align-center py-3 px-4"},[t("h2",{staticClass:"text-h5 font-weight-bold mb-0"},[e._v("User Management")]),t(b.A),t(a.A,{staticClass:"px-4",attrs:{color:"primary","prepend-icon":"mdi-plus"},on:{click:e.openCreateModal}},[e._v(" Create New User ")])],1),t(m.A),t(u.A,{staticClass:"elevation-0",attrs:{headers:e.dynamicHeaders,items:e.users,loading:e.loading,search:e.search,"items-per-page":10,"footer-props":{"items-per-page-options":[5,10,15,20],showFirstLastPage:!0}},scopedSlots:e._u([{key:"top",fn:function(){return[t(w.A,{staticClass:"px-4 d-flex justify-end",attrs:{flat:""}},[t(A.A,{staticClass:"mt-6",class:{"focused-field":e.isFocused},attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search users...","hide-details":"",dense:"",outlined:"",rounded:"",clearable:""},on:{"click:clear":function(t){e.search=""},focus:function(t){e.isFocused=!0},blur:function(t){e.isFocused=!1}},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)]},proxy:!0},{key:"item.fullName",fn:function({item:s}){return[t("div",{staticClass:"font-weight-medium"},[e._v(" "+e._s(s.firstName&&s.lastName?`${s.firstName} ${s.lastName}`:"Admin")+" ")])]}},{key:"item.department",fn:function({item:s}){return[t("div",[e._v(e._s(s.department?.name))])]}},{key:"item.role",fn:function({item:s}){return[t(o.A,{attrs:{small:"",label:"",color:"primary","text-color":"white"}},[e._v(" "+e._s(s.role?.name)+" ")])]}},{key:"item.isActive",fn:function({item:s}){return[t(o.A,{attrs:{color:s.isActive?"success":"grey","text-color":s.isActive?"white":"",small:"",label:""}},[e._v(" "+e._s(s.isActive?"Active":"Inactive")+" ")])]}},{key:"item.actions",fn:function({item:s}){return["admin@app.dev"!==s.email?t(k.A,{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:r,attrs:l}){return[t(a.A,e._g(e._b({staticClass:"mr-2",attrs:{icon:"",small:"",color:"primary"},on:{click:function(t){return e.openEditModal(s)}}},"v-btn",l,!1),r),[t(f.A,{attrs:{small:""}},[e._v("mdi-pencil")])],1)]}}],null,!0)},[t("span",[e._v("Edit User")])]):e._e(),"admin@app.dev"!==s.email?t(k.A,{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:r,attrs:l}){return[t(a.A,e._g(e._b({attrs:{icon:"",small:"",color:"error"},on:{click:function(t){return e.confirmDelete(s._id)}}},"v-btn",l,!1),r),[t(f.A,{attrs:{small:""}},[e._v("mdi-delete")])],1)]}}],null,!0)},[t("span",[e._v("Delete User")])]):e._e()]}},{key:"no-data",fn:function(){return[t(r.A,{staticClass:"ma-4",attrs:{type:"info",text:""}},[e._v("No users found")])]},proxy:!0}],null,!0)})],1),t(d.A,{attrs:{"max-width":"600px",persistent:""},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[t(l.A,[t(i.ri,{staticClass:"py-3 px-4"},[t("span",{staticClass:"text-h5"},[e._v(e._s(e.isEditing?"Edit User":"Create User"))]),t(b.A),t(a.A,{attrs:{icon:""},on:{click:e.closeModal}},[t(f.A,[e._v("mdi-close")])],1)],1),t(m.A),t(i.OQ,{staticClass:"pt-4"},[t(p.A,{ref:"form",on:{submit:function(t){return t.preventDefault(),e.handleSubmit.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(v.A,{attrs:{items:e.roles,"item-text":"name","item-value":"_id",label:"Role",required:"",outlined:"",dense:"",rules:[e=>!!e||"Please select a role first"]},on:{change:e.handleRoleChange},model:{value:e.userForm.role,callback:function(t){e.$set(e.userForm,"role",t)},expression:"userForm.role"}}),e.userForm.role?[t(h.A,[t(n.A,{attrs:{cols:"6"}},[t(A.A,{attrs:{label:"First Name",required:"",outlined:"",dense:"",rules:[e=>!!e||"First name is required"]},model:{value:e.userForm.firstName,callback:function(t){e.$set(e.userForm,"firstName",t)},expression:"userForm.firstName"}})],1),t(n.A,{attrs:{cols:"6"}},[t(A.A,{attrs:{label:"Last Name",required:"",outlined:"",dense:"",rules:[e=>!!e||"Last name is required"]},model:{value:e.userForm.lastName,callback:function(t){e.$set(e.userForm,"lastName",t)},expression:"userForm.lastName"}})],1)],1),t(A.A,{attrs:{label:"Email",type:"email",required:"",outlined:"",dense:"",rules:e.emailRules},model:{value:e.userForm.email,callback:function(t){e.$set(e.userForm,"email",t)},expression:"userForm.email"}}),e.isEditing?e._e():t(A.A,{attrs:{label:"Password",type:"password",required:"",outlined:"",dense:"",rules:e.passwordRules},model:{value:e.userForm.password,callback:function(t){e.$set(e.userForm,"password",t)},expression:"userForm.password"}}),e.isAdminRole?e._e():t(A.A,{attrs:{label:"Employee ID",outlined:"",dense:""},model:{value:e.userForm.employeeId,callback:function(t){e.$set(e.userForm,"employeeId",t)},expression:"userForm.employeeId"}}),e.isAdminRole?e._e():[t(v.A,{attrs:{items:e.departments,"item-text":"name","item-value":"_id",label:"Department",required:"",outlined:"",dense:"",rules:[e=>!!e||"Department is required"]},model:{value:e.userForm.department,callback:function(t){e.$set(e.userForm,"department",t)},expression:"userForm.department"}}),t(A.A,{attrs:{label:"Position",required:"",outlined:"",dense:"",rules:[e=>!!e||"Position is required"]},model:{value:e.userForm.position,callback:function(t){e.$set(e.userForm,"position",t)},expression:"userForm.position"}})],t(y.A,{staticClass:"mt-2",attrs:{label:"Active Status",color:"success","hide-details":""},model:{value:e.userForm.isActive,callback:function(t){e.$set(e.userForm,"isActive",t)},expression:"userForm.isActive"}})]:e._e()],2)],1),t(m.A),t(i.SL,{staticClass:"py-3 px-4"},[t(b.A),t(a.A,{attrs:{text:"",color:"grey darken-1",disabled:e.loading},on:{click:e.closeModal}},[e._v(" Cancel ")]),t(a.A,{attrs:{color:"primary",loading:e.loading,disabled:!e.valid},on:{click:e.handleSubmit}},[e._v(" "+e._s(e.isEditing?"Update":"Create")+" ")])],1)],1)],1),t(d.A,{attrs:{"max-width":"400"},model:{value:e.showDeleteDialog,callback:function(t){e.showDeleteDialog=t},expression:"showDeleteDialog"}},[t(l.A,[t(i.ri,{staticClass:"py-3 px-4"},[t("span",{staticClass:"text-h6"},[e._v("Delete User")])]),t(i.OQ,{staticClass:"pt-3"},[e._v(" Are you sure you want to delete this user? This action cannot be undone. ")]),t(i.SL,{staticClass:"py-3 px-4"},[t(b.A),t(a.A,{attrs:{text:"",color:"grey darken-1",disabled:e.loading},on:{click:function(t){e.showDeleteDialog=!1}}},[e._v(" Cancel ")]),t(a.A,{attrs:{color:"error",loading:e.loading},on:{click:e.handleDelete}},[e._v(" Delete ")])],1)],1)],1),t(g.A,{attrs:{color:e.snackbar.color,timeout:3e3,top:"",right:""},scopedSlots:e._u([{key:"action",fn:function({attrs:s}){return[t(a.A,e._b({attrs:{text:""},on:{click:function(t){e.snackbar.show=!1}}},"v-btn",s,!1),[e._v(" Close ")])]}}]),model:{value:e.snackbar.show,callback:function(t){e.$set(e.snackbar,"show",t)},expression:"snackbar.show"}},[e._v(" "+e._s(e.snackbar.text)+" ")])],1)},_=[],F=s(5353),C={name:"UserManagement",data(){return{search:"",isFocused:!1,valid:!0,showModal:!1,showDeleteDialog:!1,isEditing:!1,isAdminRole:!1,currentUserId:null,userForm:{role:null,firstName:"",lastName:"",email:"",password:"",employeeId:"",department:null,position:"",isActive:!0},baseHeaders:[{text:"Name",value:"fullName"},{text:"Email",value:"email"},{text:"Role",value:"role.name"},{text:"Status",value:"isActive"},{text:"Actions",value:"actions",sortable:!1}],nonAdminHeaders:[{text:"Employee ID",value:"employeeId"},{text:"Department",value:"department.name"},{text:"Position",value:"position"}],emailRules:[e=>!!e||"Email is required",e=>/.+@.+\..+/.test(e)||"Email must be valid"],passwordRules:[e=>!!e||"Password is required",e=>e.length>=8||"Password must be at least 8 characters"],snackbar:{show:!1,text:"",color:""}}},computed:{...(0,F.aH)({loading:e=>e.users.loading,error:e=>e.users.error,users:e=>e.users.users,roles:e=>e.roles.roles,departments:e=>e.departments.departments}),dynamicHeaders(){const e=this.users.some((e=>"admin"===e.role?.name.toLowerCase()));return e?[...this.baseHeaders]:[...this.baseHeaders.slice(0,2),...this.nonAdminHeaders,...this.baseHeaders.slice(2)]}},methods:{...(0,F.i0)({fetchUsers:"users/fetchUsers",createUser:"users/createUser",updateUser:"users/updateUser",deleteUser:"users/deleteUser",fetchRoles:"roles/fetchRoles",fetchDepartments:"departments/fetchDepartments"}),showSnackbar(e,t="success"){this.snackbar={show:!0,text:e,color:t}},handleRoleChange(e){const t=this.roles.find((t=>t._id===e));this.isAdminRole="admin"===t?.name.toLowerCase(),this.isAdminRole&&(this.userForm.employeeId="",this.userForm.department=null,this.userForm.position="")},openCreateModal(){this.isEditing=!1,this.userForm={role:null,firstName:"",lastName:"",email:"",password:"",employeeId:"",department:null,position:"",isActive:!0},this.isAdminRole=!1,this.showModal=!0},openEditModal(e){this.isEditing=!0,this.currentUserId=e._id,this.userForm={role:e.role?._id,firstName:e.firstName,lastName:e.lastName,email:e.email,employeeId:e.employeeId,department:e.department?._id,position:e.position,isActive:e.isActive},this.handleRoleChange(e.role?._id),this.showModal=!0},closeModal(){this.showModal=!1,this.$refs.form.reset(),this.isAdminRole=!1},async handleSubmit(){if(this.$refs.form.validate())try{const e={...this.userForm};this.isAdminRole&&(delete e.employeeId,delete e.department,delete e.position),this.isEditing?(await this.updateUser({id:this.currentUserId,userData:e}),this.showSnackbar("User updated successfully")):(await this.createUser(e),this.showSnackbar("User created successfully")),this.closeModal(),await this.fetchUsers()}catch(e){this.showSnackbar(e.message||"An error occurred","error")}},confirmDelete(e){this.currentUserId=e,this.showDeleteDialog=!0},async handleDelete(){try{await this.deleteUser(this.currentUserId),this.showSnackbar("User deleted successfully"),this.showDeleteDialog=!1,await this.fetchUsers()}catch(e){this.showSnackbar(e.message||"An error occurred","error")}}},async created(){try{await Promise.all([this.fetchUsers(),this.fetchRoles(),this.fetchDepartments()])}catch(e){this.showSnackbar(e.message||"Failed to fetch data","error")}},watch:{"userForm.role"(e){e||(this.userForm.employeeId="",this.userForm.department=null,this.userForm.position="")}}},S=C,D=s(1656),N=(0,D.A)(S,x,_,!1,null,"3f481410",null),U=N.exports},1526:function(e,t,s){s(4114),s(125);var r=s(5471),a=s(4961),l=s(6960);const i=["sm","md","lg","xl"],o=(()=>i.reduce(((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e)),{}))(),n=(()=>i.reduce(((e,t)=>(e["offset"+(0,l.Zb)(t)]={type:[String,Number],default:null},e)),{}))(),c=(()=>i.reduce(((e,t)=>(e["order"+(0,l.Zb)(t)]={type:[String,Number],default:null},e)),{}))(),u={col:Object.keys(o),offset:Object.keys(n),order:Object.keys(c)};function d(e,t,s){let r=e;if(null!=s&&!1!==s){if(t){const s=t.replace(e,"");r+=`-${s}`}return"col"!==e||""!==s&&!0!==s?(r+=`-${s}`,r.toLowerCase()):r.toLowerCase()}}const m=new Map;t.A=r.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...o,offset:{type:[String,Number],default:null},...n,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:e=>["auto","start","end","center","baseline","stretch"].includes(e)},tag:{type:String,default:"div"}},render(e,{props:t,data:s,children:r,parent:l}){let i="";for(const a in t)i+=String(t[a]);let o=m.get(i);if(!o){let e;for(e in o=[],u)u[e].forEach((s=>{const r=t[s],a=d(e,s,r);a&&o.push(a)}));const s=o.some((e=>e.startsWith("col-")));o.push({col:!s||!t.cols,[`col-${t.cols}`]:t.cols,[`offset-${t.offset}`]:t.offset,[`order-${t.order}`]:t.order,[`align-self-${t.alignSelf}`]:t.alignSelf}),m.set(i,o)}return e(t.tag,(0,a.Ay)(s,{class:o}),r)}})},8412:function(e,t,s){s(4114),s(125);var r=s(5471),a=s(4961),l=s(6960);const i=["sm","md","lg","xl"],o=["start","end","center"];function n(e,t){return i.reduce(((s,r)=>(s[e+(0,l.Zb)(r)]=t(),s)),{})}const c=e=>[...o,"baseline","stretch"].includes(e),u=n("align",(()=>({type:String,default:null,validator:c}))),d=e=>[...o,"space-between","space-around"].includes(e),m=n("justify",(()=>({type:String,default:null,validator:d}))),p=e=>[...o,"space-between","space-around","stretch"].includes(e),f=n("alignContent",(()=>({type:String,default:null,validator:p}))),h={align:Object.keys(u),justify:Object.keys(m),alignContent:Object.keys(f)},v={align:"align",justify:"justify",alignContent:"align-content"};function g(e,t,s){let r=v[e];if(null!=s){if(t){const s=t.replace(e,"");r+=`-${s}`}return r+=`-${s}`,r.toLowerCase()}}const b=new Map;t.A=r.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...u,justify:{type:String,default:null,validator:d},...m,alignContent:{type:String,default:null,validator:p},...f},render(e,{props:t,data:s,children:r}){let l="";for(const a in t)l+=String(t[a]);let i=b.get(l);if(!i){let e;for(e in i=[],h)h[e].forEach((s=>{const r=t[s],a=g(e,s,r);a&&i.push(a)}));i.push({"no-gutters":t.noGutters,"row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),b.set(l,i)}return e(t.tag,(0,a.Ay)(s,{staticClass:"row",class:i}),r)}})}}]);
//# sourceMappingURL=199.4f558466.js.map