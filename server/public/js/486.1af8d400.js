"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[486],{6128:function(t,e,i){i.r(e),i.d(e,{default:function(){return L}});var s=i(375),n=i(7210),a=i(8834),l=i(1526),o=i(6278),r=i(4155),c=i(1770),d=i(5063),u=i(9748),m=i(3507),h=i(5604),f=(0,m.A)(d.A,u.A).extend({name:"v-hover",props:{disabled:{type:Boolean,default:!1},value:{type:Boolean,default:void 0}},methods:{onMouseEnter(){this.runDelay("open")},onMouseLeave(){this.runDelay("close")}},render(){if(!this.$scopedSlots.default&&void 0===this.value)return(0,h.OP)("v-hover is missing a default scopedSlot or bound value",this),null;let t;return this.$scopedSlots.default&&(t=this.$scopedSlots.default({hover:this.isActive})),Array.isArray(t)&&1===t.length&&(t=t[0]),t&&!Array.isArray(t)&&t.tag?(this.disabled||(t.data=t.data||{},this._g(t.data,{mouseenter:this.onMouseEnter,mouseleave:this.onMouseLeave})),t):((0,h.OP)("v-hover should only contain a single element",this),t)}}),g=i(9456),p=i(2987),v=i(1075),y=i(7313),A=i(3422),b=i(2585),C=i(8412),x=i(1556),w=i(7410),_=i(9940),k=i(7043),D=i(1735),S=function(){var t=this,e=t._self._c;return e(o.A,{staticClass:"pa-6",attrs:{fluid:""}},[e(n.A,{staticClass:"mb-6 rounded-lg",attrs:{elevation:"3"}},[e(a.OQ,[e(C.A,{staticClass:"mx-2",attrs:{align:"center",justify:"center"}},[e(l.A,{attrs:{cols:"12",md:"6",lg:"4"}},[e(_.A,{staticClass:"rounded-lg",attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search documents",outlined:"",dense:"","hide-details":"",clearable:"","background-color":"grey lighten-4"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),e(l.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(x.A,{staticClass:"rounded-lg",attrs:{items:t.departments,label:"Department",outlined:"",dense:"","hide-details":"",clearable:"","background-color":"grey lighten-4","prepend-inner-icon":"mdi-domain"},model:{value:t.departmentFilter,callback:function(e){t.departmentFilter=e},expression:"departmentFilter"}})],1),e(l.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(x.A,{staticClass:"rounded-lg",attrs:{items:t.statuses,label:"Status",outlined:"",dense:"","hide-details":"",clearable:"","background-color":"grey lighten-4","prepend-inner-icon":"mdi-filter-variant"},model:{value:t.statusFilter,callback:function(e){t.statusFilter=e},expression:"statusFilter"}})],1)],1)],1)],1),t.loading?e("div",{staticClass:"d-flex justify-center align-center",staticStyle:{height:"400px"}},[e(b.A,{attrs:{indeterminate:"",color:"primary",size:"64"}})],1):e(C.A,t._l(t.filteredDocuments,(function(i){return e(l.A,{key:i._id,attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[e(f,{scopedSlots:t._u([{key:"default",fn:function({hover:l}){return[e(n.A,{staticClass:"mx-auto document-card transition-swing",class:{"on-hover":l},attrs:{elevation:l?8:2}},[e(a.ri,{staticClass:"py-2 px-4 d-flex align-center primary"},[e(g.A,{staticClass:"mr-2",attrs:{large:"",color:"white"}},[t._v(" "+t._s(t.getDocumentIcon(i.fileUrl))+" ")]),e("span",{staticClass:"white--text text-truncate"},[t._v(t._s(i.name))])],1),e(a.OQ,{staticClass:"pa-4"},[e("div",{staticClass:"document-info"},[e("div",{staticClass:"d-flex align-center mb-2"},[e(g.A,{staticClass:"mr-2",attrs:{small:"",color:"grey darken-1"}},[t._v("mdi-domain")]),e("span",{staticClass:"body-2"},[t._v(t._s(i.department))])],1),e("div",{staticClass:"d-flex align-center mb-2"},[e(g.A,{staticClass:"mr-2",attrs:{small:"",color:"grey darken-1"}},[t._v("mdi-account")]),e("span",{staticClass:"body-2"},[t._v(t._s(i.uploadedBy?.username))])],1),e("div",{staticClass:"d-flex align-center"},[e(g.A,{staticClass:"mr-2",attrs:{small:"",color:"grey darken-1"}},[t._v("mdi-calendar")]),e("span",{staticClass:"body-2"},[t._v(t._s(t.formatDate(i.createdAt)))])],1)])]),e(c.A),e(a.SL,{staticClass:"pa-4"},[e(s.A,{staticClass:"px-2",attrs:{text:"",small:"",color:"primary"},on:{click:function(e){return t.downloadDocument(i.fileUrl)}}},[e(g.A,{attrs:{left:"",size:"18"}},[t._v("mdi-download")]),t._v(" Download ")],1),e(w.A),e(s.A,{staticClass:"px-2",attrs:{text:"",small:""},on:{click:function(e){return t.showDetails(i)}}},[e(g.A,{attrs:{left:"",size:"18"}},[t._v("mdi-information")]),t._v(" Details ")],1)],1)],1)]}}],null,!0)})],1)})),1),t.loading||0!==t.filteredDocuments.length?t._e():e(n.A,{staticClass:"text-center pa-8 mt-4",attrs:{outlined:""}},[e(g.A,{attrs:{size:"64",color:"grey lighten-1"}},[t._v("mdi-file-search-outline")]),e("h3",{staticClass:"text-h6 grey--text mt-4"},[t._v("No documents found")]),e("p",{staticClass:"text-body-2 grey--text text--darken-1"},[t._v(" Try adjusting your search criteria or filters ")])],1),e(r.A,{attrs:{"max-width":"500",scrollable:""},model:{value:t.detailsDialog,callback:function(e){t.detailsDialog=e},expression:"detailsDialog"}},[t.selectedDocument?e(n.A,[e(k.A,{attrs:{flat:"",dense:"",color:"primary",dark:""}},[e(D.sw,[t._v("Document Details")]),e(w.A),e(s.A,{attrs:{icon:""},on:{click:function(e){t.detailsDialog=!1}}},[e(g.A,[t._v("mdi-close")])],1)],1),e(a.OQ,{staticClass:"pt-4"},[e(p.A,{attrs:{dense:""}},[e(v.A,[e(y.A,{staticClass:"mr-3",attrs:{color:"primary"}},[e(g.A,{attrs:{dark:""}},[t._v("mdi-file")])],1),e(A.pr,[e(A.w,{staticClass:"text-subtitle-2 mb-1"},[t._v("Name")]),e(A.UZ,[t._v(t._s(t.selectedDocument.name))])],1)],1),e(c.A,{staticClass:"my-2"}),e(v.A,[e(y.A,{staticClass:"mr-3",attrs:{color:"primary"}},[e(g.A,{attrs:{dark:""}},[t._v("mdi-domain")])],1),e(A.pr,[e(A.w,{staticClass:"text-subtitle-2 mb-1"},[t._v("Department")]),e(A.UZ,[t._v(t._s(t.selectedDocument.department))])],1)],1),e(c.A,{staticClass:"my-2"}),e(v.A,[e(y.A,{staticClass:"mr-3",attrs:{color:"primary"}},[e(g.A,{attrs:{dark:""}},[t._v("mdi-account")])],1),e(A.pr,[e(A.w,{staticClass:"text-subtitle-2 mb-1"},[t._v("Uploaded By")]),e(A.UZ,[t._v(t._s(t.selectedDocument.uploadedBy?.username))])],1)],1),t.selectedDocument.remarks?[e(c.A,{staticClass:"my-2"}),e(v.A,[e(y.A,{staticClass:"mr-3",attrs:{color:"primary"}},[e(g.A,{attrs:{dark:""}},[t._v("mdi-comment-text")])],1),e(A.pr,[e(A.w,{staticClass:"text-subtitle-2 mb-1"},[t._v("Remarks")]),e(A.UZ,[t._v(t._s(t.selectedDocument.remarks))])],1)],1)]:t._e()],2)],1),e(c.A),e(a.SL,{staticClass:"pa-4"},[e(w.A),e(s.A,{attrs:{color:"primary",outlined:""},on:{click:function(e){return t.downloadDocument(t.selectedDocument.fileUrl)}}},[e(g.A,{attrs:{left:""}},[t._v("mdi-download")]),t._v(" Download ")],1),e(s.A,{attrs:{color:"grey",text:""},on:{click:function(e){t.detailsDialog=!1}}},[t._v(" Close ")])],1)],1):t._e()],1)],1)},$=[],O=i(5353),B={name:"DocumentLibrary",data(){return{search:"",departmentFilter:null,statusFilter:null,detailsDialog:!1,selectedDocument:null,departments:["HR","Finance","IT"],statuses:["incoming","processing","completed"]}},computed:{...(0,O.aH)("documents",["documents","loading","error"]),filteredDocuments(){return this.documents.filter((t=>{const e=!this.search||t.name.toLowerCase().includes(this.search.toLowerCase()),i=!this.departmentFilter||t.department===this.departmentFilter,s=!this.statusFilter||t.status===this.statusFilter;return e&&i&&s}))}},methods:{...(0,O.i0)("documents",["fetchDocuments"]),formatDate(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})},getStatusColor(t){return{incoming:"#1976D2",processing:"#FB8C00",completed:"#43A047"}[t]||"grey"},getDocumentIcon(t){const e=t.split(".").pop().toLowerCase();return{pdf:"mdi-file-pdf-box",doc:"mdi-file-word-box",txt:"mdi-file-word-box",docx:"mdi-file-word-box",xls:"mdi-file-excel-box",xlsx:"mdi-file-excel-box",ppt:"mdi-file-powerpoint-box",pptx:"mdi-file-powerpoint-box",jpg:"mdi-file-image-box",jpeg:"mdi-file-image-box",png:"mdi-file-image-box",zip:"mdi-folder-zip",rar:"mdi-folder-zip","7z":"mdi-folder-zip",tar:"mdi-folder-zip",gz:"mdi-folder-zip"}[e]||"mdi-file-document-box"},downloadDocument(t){window.open(t,"_blank")},showDetails(t){this.selectedDocument=t,this.detailsDialog=!0}},created(){this.fetchDocuments()}},j=B,F=i(1656),E=(0,F.A)(j,S,$,!1,null,"06a6ce80",null),L=E.exports},4155:function(t,e,i){i.d(e,{A:function(){return g}});var s=i(9084),n=i(4462),a=i(9623),l=i(103),o=i(123),r=i(326),c=i(7768),d=i(8734),u=i(3507),m=i(5604),h=i(6960);const f=(0,u.A)(a.A,l.A,o.A,r.A,c.A,n.A);var g=f.extend({name:"v-dialog",directives:{ClickOutside:d.A},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:[String,Number],noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:[String,Number]},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[`v-dialog ${this.contentClass}`.trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null===(e=this.previousActiveElement)||void 0===e||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,m.rq)("full-width",this)},beforeMount(){this.$nextTick((()=>{this.isBooted=this.isActive,this.isActive&&this.show()}))},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick((()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout((()=>this.animate=!1),150)}))},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):o.A.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((()=>{this.$nextTick((()=>{var t,e;(null===(t=this.$refs.dialog)||void 0===t?void 0:t.contains(document.activeElement))||(this.previousActiveElement=document.activeElement,null===(e=this.$refs.dialog)||void 0===e||e.focus()),this.bind()}))}))},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===h.uP.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick((()=>t&&t.focus()))}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&this.$refs.dialog&&![document,this.$refs.dialog].includes(e)&&!this.$refs.dialog.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((t=>t.contains(e)))){const t=this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'),e=[...t].find((t=>!t.hasAttribute("disabled")&&!t.matches('[tabindex="-1"]')));e&&e.focus()}},genContent(){return this.showLazyContent((()=>[this.$createElement(s.A,{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"dialog","aria-modal":this.hideOverlay?void 0:"true",...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])]))},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,attrs:{tabindex:this.isActive?0:void 0},ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:(0,h.Dg)(this.maxWidth),width:(0,h.Dg)(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},[this.genActivator(),this.genContent()])}})},1526:function(t,e,i){i(4114),i(125);var s=i(5471),n=i(4961),a=i(6960);const l=["sm","md","lg","xl"],o=(()=>l.reduce(((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t)),{}))(),r=(()=>l.reduce(((t,e)=>(t["offset"+(0,a.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),c=(()=>l.reduce(((t,e)=>(t["order"+(0,a.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),d={col:Object.keys(o),offset:Object.keys(r),order:Object.keys(c)};function u(t,e,i){let s=t;if(null!=i&&!1!==i){if(e){const i=e.replace(t,"");s+=`-${i}`}return"col"!==t||""!==i&&!0!==i?(s+=`-${i}`,s.toLowerCase()):s.toLowerCase()}}const m=new Map;e.A=s.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...o,offset:{type:[String,Number],default:null},...r,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:i,children:s,parent:a}){let l="";for(const n in e)l+=String(e[n]);let o=m.get(l);if(!o){let t;for(t in o=[],d)d[t].forEach((i=>{const s=e[i],n=u(t,i,s);n&&o.push(n)}));const i=o.some((t=>t.startsWith("col-")));o.push({col:!i||!e.cols,[`col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),m.set(l,o)}return t(e.tag,(0,n.Ay)(i,{class:o}),s)}})},8412:function(t,e,i){i(4114),i(125);var s=i(5471),n=i(4961),a=i(6960);const l=["sm","md","lg","xl"],o=["start","end","center"];function r(t,e){return l.reduce(((i,s)=>(i[t+(0,a.Zb)(s)]=e(),i)),{})}const c=t=>[...o,"baseline","stretch"].includes(t),d=r("align",(()=>({type:String,default:null,validator:c}))),u=t=>[...o,"space-between","space-around"].includes(t),m=r("justify",(()=>({type:String,default:null,validator:u}))),h=t=>[...o,"space-between","space-around","stretch"].includes(t),f=r("alignContent",(()=>({type:String,default:null,validator:h}))),g={align:Object.keys(d),justify:Object.keys(m),alignContent:Object.keys(f)},p={align:"align",justify:"justify",alignContent:"align-content"};function v(t,e,i){let s=p[t];if(null!=i){if(e){const i=e.replace(t,"");s+=`-${i}`}return s+=`-${i}`,s.toLowerCase()}}const y=new Map;e.A=s.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...d,justify:{type:String,default:null,validator:u},...m,alignContent:{type:String,default:null,validator:h},...f},render(t,{props:e,data:i,children:s}){let a="";for(const n in e)a+=String(e[n]);let l=y.get(a);if(!l){let t;for(t in l=[],g)g[t].forEach((i=>{const s=e[i],n=v(t,i,s);n&&l.push(n)}));l.push({"no-gutters":e.noGutters,"row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),y.set(a,l)}return t(e.tag,(0,n.Ay)(i,{staticClass:"row",class:l}),s)}})},1735:function(t,e,i){i.d(e,{sw:function(){return a}});var s=i(7043),n=i(6960);const a=(0,n.Gn)("v-toolbar__title"),l=(0,n.Gn)("v-toolbar__items");s.A}}]);
//# sourceMappingURL=486.1af8d400.js.map