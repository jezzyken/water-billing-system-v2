"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[330],{6330:function(t,e,r){r.r(e),r.d(e,{default:function(){return $}});var s=r(1965),i=r(4112),o=r(3740),n=r(3698),a=r(2938),l=r(4414),d=r(3449),c=r(174),u=r(6930),h=r(2756),p=r(7112),f=function(){var t=this,e=t._self._c;return e(d.A,{staticClass:"fill-height",attrs:{fluid:""}},[e(h.A,{attrs:{align:"center",justify:"center"}},[e(l.A,{attrs:{cols:"12",sm:"8",md:"6",lg:"4"}},[e(n.A,{staticClass:"login-card",attrs:{elevation:"8"}},[e(a.OQ,{staticClass:"text-center pt-8"},[e(i.A,{staticClass:"mb-4",attrs:{size:"80",color:"primary"}},[e(u.A,{attrs:{size:"40",color:"white"}},[t._v("mdi-account")])],1),e("h1",{staticClass:"text-h4 font-weight-bold primary--text mb-2"},[t._v("Welcome Back")]),e("p",{staticClass:"text-subtitle-1 grey--text"},[t._v("Please sign in to continue")])],1),e(a.OQ,{staticClass:"pt-4"},[e(c.A,{ref:"loginForm",on:{submit:function(e){return e.preventDefault(),t.handleLogin.apply(null,arguments)}}},[e(p.A,{staticClass:"mb-4",attrs:{label:"Email",type:"email",filled:"",rounded:"",dense:"",color:"primary","prepend-inner-icon":"mdi-email",rules:t.emailRules,required:""},model:{value:t.formData.email,callback:function(e){t.$set(t.formData,"email",e)},expression:"formData.email"}}),e(p.A,{staticClass:"mb-2",attrs:{label:"Password",type:t.showPassword?"text":"password",filled:"",rounded:"",dense:"",color:"primary","prepend-inner-icon":"mdi-lock","append-icon":t.showPassword?"mdi-eye":"mdi-eye-off",rules:t.passwordRules,required:""},on:{"click:append":function(e){t.showPassword=!t.showPassword}},model:{value:t.formData.password,callback:function(e){t.$set(t.formData,"password",e)},expression:"formData.password"}}),t.error?e(s.A,{staticClass:"mb-4",attrs:{type:"error",dense:"",text:""}},[t._v(" "+t._s(t.error)+" ")]):t._e(),e(o.A,{staticClass:"mb-6",attrs:{block:"","x-large":"",rounded:"",color:"primary",height:"50",loading:t.loading,disabled:t.loading},on:{click:t.handleLogin}},[e(u.A,{attrs:{left:""}},[t._v("mdi-login")]),t._v(" Sign In ")],1)],1)],1)],1)],1)],1)],1)},g=[],m=(r(4114),r(5353)),y={name:"LoginForm",data(){return{formData:{email:"",password:""},loading:!1,error:null,showPassword:!1,rememberMe:!1,emailRules:[t=>!!t||"Email is required",t=>/.+@.+\..+/.test(t)||"Email must be valid"],passwordRules:[t=>!!t||"Password is required",t=>t.length>=6||"Password must be at least 6 characters"],socialLogins:[{name:"google",icon:"mdi-google",color:"red"},{name:"facebook",icon:"mdi-facebook",color:"blue"},{name:"twitter",icon:"mdi-twitter",color:"light-blue"}]}},methods:{...(0,m.i0)("users",["login"]),async handleLogin(){if(this.$refs.loginForm.validate()){this.loading=!0,this.error=null;try{const t=await this.login(this.formData);t.success?this.$router.push("/admin/dashboard"):this.error=t.message||"Login failed"}catch(t){this.error=t.response?.data?.message||"An error occurred"}finally{this.loading=!1}}},forgotPassword(){this.$router.push("/forgot-password")},goToSignup(){this.$router.push("/signup")},socialLogin(t){console.log(`Logging in with ${t}`)}},created(){this.$store.getters["users/isAuthenticated"]&&this.$router.push("/dashboard")}},v=y,b=r(1656),w=(0,b.A)(v,f,g,!1,null,"6f47bdbd",null),$=w.exports},1965:function(t,e,r){r.d(e,{A:function(){return p}});var s=r(9375),i=r(4728),o=r(569),n=r(428),a=r(3381),l=r(5471),d=l.Ay.extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),c=r(5803),u=r(6988),h=r(4152),p=(0,c.A)(s.A,n.A,d).extend({name:"v-alert",props:{border:{type:String,validator(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator(t){return"string"===typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder(){if(!this.border)return null;let t={staticClass:"v-alert__border",class:{[`v-alert__border--${this.border}`]:!0}};return this.coloredBorder&&(t=this.setBackgroundColor(this.computedColor,t),t.class["v-alert__border--has-color"]=!0),this.$createElement("div",t)},__cachedDismissible(){if(!this.dismissible)return null;const t=this.iconColor;return this.$createElement(i.A,{staticClass:"v-alert__dismissible",props:{color:t,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:()=>this.isActive=!1}},[this.$createElement(o.A,{props:{color:t}},this.closeIcon)])},__cachedIcon(){return this.computedIcon?this.$createElement(o.A,{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes(){const t={...s.A.options.computed.classes.call(this),"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text};return this.border&&(t[`v-alert--border-${this.border}`]=!0),t},computedColor(){return this.color||this.type},computedIcon(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&`$${this.type}`)},hasColoredIcon(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText(){return this.text||this.outlined},iconColor(){return this.hasColoredIcon?this.computedColor:void 0},isDark(){return!(!this.type||this.coloredBorder||this.outlined)||a.A.options.computed.isDark.call(this)}},created(){this.$attrs.hasOwnProperty("outline")&&(0,u.q4)("outline","outlined",this)},methods:{genWrapper(){const t=[(0,h.$c)(this,"prepend")||this.__cachedIcon,this.genContent(),this.__cachedBorder,(0,h.$c)(this,"append"),this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],e={staticClass:"v-alert__wrapper"};return this.$createElement("div",e,t)},genContent(){return this.$createElement("div",{staticClass:"v-alert__content"},(0,h.$c)(this))},genAlert(){let t={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){const e=this.hasText?this.setTextColor:this.setBackgroundColor;t=e(this.computedColor,t)}return this.$createElement("div",t,[this.genWrapper()])},toggle(){this.isActive=!this.isActive}},render(t){const e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}})},4728:function(t,e,r){var s=r(3740);e.A=s.A},174:function(t,e,r){r(4114);var s=r(5803),i=r(7717),o=r(7540),n=r(4152);e.A=(0,s.A)(i.A,(0,o.G)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>t.$watch("hasError",(e=>{this.$set(this.errorBag,t._uid,e)}),{immediate:!0}),r={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?r.shouldValidate=t.$watch("shouldValidate",(s=>{s&&(this.errorBag.hasOwnProperty(t._uid)||(r.valid=e(t)))})):r.valid=e(t),r},validate(){return 0===this.inputs.filter((t=>!t.validate(!0))).length},reset(){this.inputs.forEach((t=>t.reset())),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout((()=>{this.errorBag={}}),0)},resetValidation(){this.inputs.forEach((t=>t.resetValidation())),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find((e=>e._uid===t._uid));if(!e)return;const r=this.watchers.find((t=>t._uid===e._uid));r&&(r.valid(),r.shouldValidate()),this.watchers=this.watchers.filter((t=>t._uid!==e._uid)),this.inputs=this.inputs.filter((t=>t._uid!==e._uid)),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},(0,n.$c)(this))}})},4414:function(t,e,r){r(4114),r(125);var s=r(5471),i=r(8041),o=r(4152);const n=["sm","md","lg","xl"],a=(()=>n.reduce(((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t)),{}))(),l=(()=>n.reduce(((t,e)=>(t["offset"+(0,o.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),d=(()=>n.reduce(((t,e)=>(t["order"+(0,o.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),c={col:Object.keys(a),offset:Object.keys(l),order:Object.keys(d)};function u(t,e,r){let s=t;if(null!=r&&!1!==r){if(e){const r=e.replace(t,"");s+=`-${r}`}return"col"!==t||""!==r&&!0!==r?(s+=`-${r}`,s.toLowerCase()):s.toLowerCase()}}const h=new Map;e.A=s.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...a,offset:{type:[String,Number],default:null},...l,order:{type:[String,Number],default:null},...d,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:r,children:s,parent:o}){let n="";for(const i in e)n+=String(e[i]);let a=h.get(n);if(!a){let t;for(t in a=[],c)c[t].forEach((r=>{const s=e[r],i=u(t,r,s);i&&a.push(i)}));const r=a.some((t=>t.startsWith("col-")));a.push({col:!r||!e.cols,[`col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),h.set(n,a)}return t(e.tag,(0,i.Ay)(r,{class:a}),s)}})},3449:function(t,e,r){r.d(e,{A:function(){return n}});r(158),r(125);var s=r(5471);function i(t){return s.Ay.extend({name:`v-${t}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(e,{props:r,data:s,children:i}){s.staticClass=`${t} ${s.staticClass||""}`.trim();const{attrs:o}=s;if(o){s.attrs={};const t=Object.keys(o).filter((t=>{if("slot"===t)return!1;const e=o[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}));t.length&&(s.staticClass+=` ${t.join(" ")}`)}return r.id&&(s.domProps=s.domProps||{},s.domProps.id=r.id),e(r.tag,s,i)}})}var o=r(8041),n=i("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:e,data:r,children:s}){let i;const{attrs:n}=r;return n&&(r.attrs={},i=Object.keys(n).filter((t=>{if("slot"===t)return!1;const e=n[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}))),e.id&&(r.domProps=r.domProps||{},r.domProps.id=e.id),t(e.tag,(0,o.Ay)(r,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(i||[])}),s)}})},2756:function(t,e,r){r(4114),r(125);var s=r(5471),i=r(8041),o=r(4152);const n=["sm","md","lg","xl"],a=["start","end","center"];function l(t,e){return n.reduce(((r,s)=>(r[t+(0,o.Zb)(s)]=e(),r)),{})}const d=t=>[...a,"baseline","stretch"].includes(t),c=l("align",(()=>({type:String,default:null,validator:d}))),u=t=>[...a,"space-between","space-around"].includes(t),h=l("justify",(()=>({type:String,default:null,validator:u}))),p=t=>[...a,"space-between","space-around","stretch"].includes(t),f=l("alignContent",(()=>({type:String,default:null,validator:p}))),g={align:Object.keys(c),justify:Object.keys(h),alignContent:Object.keys(f)},m={align:"align",justify:"justify",alignContent:"align-content"};function y(t,e,r){let s=m[t];if(null!=r){if(e){const r=e.replace(t,"");s+=`-${r}`}return s+=`-${r}`,s.toLowerCase()}}const v=new Map;e.A=s.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d},...c,justify:{type:String,default:null,validator:u},...h,alignContent:{type:String,default:null,validator:p},...f},render(t,{props:e,data:r,children:s}){let o="";for(const i in e)o+=String(e[i]);let n=v.get(o);if(!n){let t;for(t in n=[],g)g[t].forEach((r=>{const s=e[r],i=y(t,r,s);i&&n.push(i)}));n.push({"no-gutters":e.noGutters,"row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),v.set(o,n)}return t(e.tag,(0,i.Ay)(r,{staticClass:"row",class:n}),s)}})},158:function(){}}]);
//# sourceMappingURL=330.4b2d7968.js.map