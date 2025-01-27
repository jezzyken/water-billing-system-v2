"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[768],{5768:function(t,e,i){i.r(e),i.d(e,{default:function(){return et}});var s=i(3740),a=i(3698),n=i(2938),o=i(3180),r=i(4414),l=i(3449),c=i(3064),d=i(9991),u=i(6930),h=i(8907),m=i(1554),p=i(3497),g=i(2756),v=i(7150),f=i(1034),b=i(3307),y=i(72),A=i(7515),x=i(2699),w=i(4152),D=i(5803);const C=(0,D.A)(y.A,(0,A.P)("windowGroup","v-window-item","v-window"));var _=C.extend().extend().extend({name:"v-window-item",directives:{Touch:x.A},props:{disabled:Boolean,reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},value:{required:!1}},data(){return{isActive:!1,inTransition:!1}},computed:{classes(){return this.groupClasses},computedTransition(){return this.windowGroup.internalReverse?"undefined"!==typeof this.reverseTransition?this.reverseTransition||"":this.windowGroup.computedTransition:"undefined"!==typeof this.transition?this.transition||"":this.windowGroup.computedTransition}},methods:{genDefaultSlot(){return(0,w.$c)(this)},genWindowItem(){return this.$createElement("div",{staticClass:"v-window-item",class:this.classes,directives:[{name:"show",value:this.isActive}],on:this.$listeners},this.genDefaultSlot())},onAfterTransition(){this.inTransition&&(this.inTransition=!1,this.windowGroup.transitionCount>0&&(this.windowGroup.transitionCount--,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=void 0)))},onBeforeTransition(){this.inTransition||(this.inTransition=!0,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=(0,w.Dg)(this.windowGroup.$el.clientHeight)),this.windowGroup.transitionCount++)},onTransitionCancelled(){this.onAfterTransition()},onEnter(t){this.inTransition&&this.$nextTick((()=>{this.computedTransition&&this.inTransition&&(this.windowGroup.transitionHeight=(0,w.Dg)(t.clientHeight))}))}},render(t){return t("transition",{props:{name:this.computedTransition},on:{beforeEnter:this.onBeforeTransition,afterEnter:this.onAfterTransition,enterCancelled:this.onTransitionCancelled,beforeLeave:this.onBeforeTransition,afterLeave:this.onAfterTransition,leaveCancelled:this.onTransitionCancelled,enter:this.onEnter}},this.showLazyContent((()=>[this.genWindowItem()])))}}),k=_.extend({name:"v-tab-item",props:{id:String},methods:{genWindowItem(){const t=_.options.methods.genWindowItem.call(this);return t.data.domProps=t.data.domProps||{},t.data.domProps.id=this.id||this.value,t}}}),T=i(723),$=i(8943),S=i(7112),B=i(7270),M=function(){var t=this,e=t._self._c;return e(l.A,[e(h.A,{attrs:{value:t.loading}},[e(m.A,{attrs:{indeterminate:"",color:"primary"}})],1),e(a.A,{staticClass:"mb-6 profile-card",attrs:{elevation:"2"}},[e(n.ri,{staticClass:"text-subtitle-1 text-uppercase font-weight-bold primary white--text py-4"},[e(u.A,{attrs:{left:"",color:"white"}},[t._v("mdi-account")]),t._v(" Consumer Profile ")],1),e(n.OQ,{staticClass:"py-4"},[e(g.A,[e(r.A,{attrs:{cols:"12",sm:"6"}},[e("div",{staticClass:"profile-field"},[e("div",{staticClass:"text-subtitle-2 grey--text"},[t._v("Full Name")]),e("div",{staticClass:"text-body-1 font-weight-medium"},[t._v(" "+t._s(t.consumerInfo.fullName)+" ")])]),e("div",{staticClass:"profile-field mt-4"},[e("div",{staticClass:"text-subtitle-2 grey--text"},[t._v("Address")]),e("div",{staticClass:"text-body-1"},[t._v(t._s(t.consumerInfo.fullAddress))])])]),e(r.A,{attrs:{cols:"12",sm:"6"}},[e("div",{staticClass:"profile-field"},[e("div",{staticClass:"text-subtitle-2 grey--text"},[t._v("Contact Number")]),e("div",{staticClass:"text-body-1"},[t._v(t._s(t.consumerInfo.contactNo))])]),e("div",{staticClass:"profile-field mt-4"},[e("div",{staticClass:"text-subtitle-2 grey--text"},[t._v("Account Status")]),e(o.A,{staticClass:"mt-1",attrs:{color:t.consumer.isActive?"success":"error",label:"",small:""}},[e(u.A,{attrs:{left:"",small:""}},[t._v(" "+t._s(t.consumer.isActive?"mdi-check-circle":"mdi-alert-circle")+" ")]),t._v(" "+t._s(t.consumer.isActive?"Active":"Inactive")+" ")],1)],1)])],1)],1)],1),e(g.A,{staticClass:"mb-6"},[e(r.A,{attrs:{cols:"12",sm:"4"}},[e(a.A,{staticClass:"summary-card",attrs:{height:"100%"}},[e(n.OQ,[e("div",{staticClass:"d-flex flex-column justify-center align-center"},[e("div",{staticClass:"text-overline mb-2"},[t._v("Total Consumption")]),e(u.A,{staticClass:"mb-2",attrs:{color:"primary",size:"36"}},[t._v("mdi-water")]),e("div",{staticClass:"text-h4 primary--text font-weight-bold"},[t._v(" "+t._s(t.totalConsumption)+" m³ ")])],1)])],1)],1),e(r.A,{attrs:{cols:"12",sm:"4"}},[e(a.A,{staticClass:"summary-card",attrs:{height:"100%"}},[e(n.OQ,[e("div",{staticClass:"d-flex flex-column justify-center align-center"},[e("div",{staticClass:"text-overline mb-2"},[t._v("Outstanding Balance")]),e(u.A,{staticClass:"mb-2",attrs:{color:t.outstandingBalance>0?"error":"success",size:"36"}},[t._v(" "+t._s(t.outstandingBalance>0?"mdi-cash-remove":"mdi-cash-check")+" ")]),e("div",{staticClass:"text-h4 font-weight-bold",class:t.outstandingBalance>0?"red--text":"success--text"},[t._v(" ₱"+t._s(t.outstandingBalance.toFixed(2))+" ")])],1)])],1)],1),e(r.A,{attrs:{cols:"12",sm:"4"}},[e(a.A,{staticClass:"summary-card",attrs:{height:"100%"}},[e(n.OQ,[e("div",{staticClass:"d-flex flex-column justify-center align-center"},[e("div",{staticClass:"text-overline mb-2"},[t._v("Last Payment")]),e(u.A,{staticClass:"mb-2",attrs:{color:"primary",size:"36"}},[t._v("mdi-receipt")]),e("div",{staticClass:"text-h4 primary--text font-weight-bold"},[t._v(" ₱"+t._s(t.lastPayment?t.lastPayment.totalBill.toFixed(2):"0.00")+" ")]),e("div",{staticClass:"text-caption grey--text text--darken-1 mt-1"},[t._v(" "+t._s(t.formatLastPaymentDate())+" ")])],1)])],1)],1)],1),e(a.A,{attrs:{elevation:"2"}},[e(T.A,{attrs:{"fixed-tabs":"","background-color":"primary",dark:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[e(b.A,{staticClass:"px-6"},[e(u.A,{attrs:{left:""}},[t._v("mdi-file-document")]),t._v(" Consumption Records ")],1),e(b.A,{staticClass:"px-6"},[e(u.A,{attrs:{left:""}},[t._v("mdi-cash")]),t._v(" Payment History ")],1)],1),e($.A,{staticClass:"pa-2",model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[e(k,[e(a.A,{attrs:{flat:""}},[e(n.ri,[e("div",{staticClass:"text-h6"},[t._v("Billing Records")]),e(f.A),e(S.A,{staticClass:"mx-4",attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":"",outlined:"",dense:""},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),e(p.A,{staticClass:"d-flex"},[e(s.A,{staticClass:"hidden-sm-and-down",attrs:{color:"primary",disabled:!t.consumer.isActive},on:{click:t.onShowDialog}},[e(u.A,{attrs:{left:""}},[t._v("mdi-plus")]),t._v(" Create Billing ")],1),e(s.A,{staticClass:"hidden-md-and-up fab-button",attrs:{color:"primary",disabled:!t.consumer.isActive,fab:"",fixed:"",bottom:"",right:""},on:{click:t.onShowDialog}},[e(u.A,[t._v("mdi-plus")])],1)],1)],1),e(c.A,{attrs:{headers:t.billingHeaders,items:t.consumers,search:t.filter,"items-per-page":10,loading:t.loading,"loading-text":"Loading billing records..."},scopedSlots:t._u([{key:"item.billingDate",fn:function({item:e}){return[t._v(" "+t._s(t.formatDate(e.billingDate))+" ")]}},{key:"item.consumption",fn:function({item:e}){return[t._v(" "+t._s(e.consumption)+" m³ ")]}},{key:"item.status",fn:function({item:i}){return[e(o.A,{attrs:{color:t.getStatusColor(i.status),small:"",label:"","text-color":"white"}},[t._v(" "+t._s(i.status)+" ")])]}},{key:"item.actions",fn:function({item:i}){return[e(B.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:n}){return[e(s.A,t._g(t._b({staticClass:"mr-2",attrs:{icon:"",small:"",color:"primary"},on:{click:function(e){return t.onViewItem(i)}}},"v-btn",n,!1),a),[e(u.A,{attrs:{small:""}},[t._v("mdi-eye")])],1)]}}],null,!0)},[e("span",[t._v("View Details")])]),e(B.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:n}){return[e(s.A,t._g(t._b({attrs:{icon:"",small:"",color:"error",disabled:"Paid"===i.status},on:{click:function(e){return t.confirmDelete(i)}}},"v-btn",n,!1),a),[e(u.A,{attrs:{small:""}},[t._v("mdi-delete")])],1)]}}],null,!0)},[e("span",[t._v("Delete Record")])])]}}],null,!0)})],1)],1),e(k,[e(a.A,{attrs:{flat:""}},[e(n.ri,[e("div",{staticClass:"text-h6"},[t._v("Payment History")]),e(f.A),e(S.A,{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":"",outlined:"",dense:""},model:{value:t.collectionFilter,callback:function(e){t.collectionFilter=e},expression:"collectionFilter"}})],1),e(c.A,{attrs:{headers:t.collectionHeaders,items:t.collections,search:t.collectionFilter,"items-per-page":10,loading:t.loading,"loading-text":"Loading payment history..."},scopedSlots:t._u([{key:"item.paymentDate",fn:function({item:e}){return[t._v(" "+t._s(t.formatDateTime(e.paymentDate))+" ")]}},{key:"item.totalBill",fn:function({item:e}){return[t._v(" ₱"+t._s(t.formatAmount(e.totalBill))+" ")]}},{key:"item.amountPaid",fn:function({item:e}){return[t._v(" ₱"+t._s(t.formatAmount(e.amountPaid))+" ")]}}],null,!0)})],1)],1)],1)],1),e("consumer-billing-dialog",{ref:"billing",attrs:{"billing-data":t.item,update:t.update,fullscreen:t.$vuetify.breakpoint.smAndDown},on:{"update:billings":t.fetch},model:{value:t.showDialog,callback:function(e){t.showDialog=e},expression:"showDialog"}}),e(d.A,{attrs:{"max-width":"400"},model:{value:t.showDeleteDialog,callback:function(e){t.showDeleteDialog=e},expression:"showDeleteDialog"}},[e(a.A,[e(n.ri,{staticClass:"headline"},[t._v("Delete Billing Record")]),e(n.OQ,[t._v(" Are you sure you want to delete this billing record? This action cannot be undone. ")]),e(n.SL,[e(f.A),e(s.A,{attrs:{color:"grey darken-1",text:""},on:{click:function(e){t.showDeleteDialog=!1}}},[t._v("Cancel")]),e(s.A,{attrs:{color:"error",text:""},on:{click:t.deleteRecord}},[t._v("Delete")])],1)],1)],1),e(v.A,{attrs:{color:"error",timeout:"3000"},scopedSlots:t._u([{key:"action",fn:function({attrs:i}){return[e(s.A,t._b({attrs:{text:""},on:{click:function(e){t.showError=!1}}},"v-btn",i,!1),[t._v("Close")])]}}]),model:{value:t.showError,callback:function(e){t.showError=e},expression:"showError"}},[t._v(" "+t._s(t.errorMessage)+" ")])],1)},Y=[],P=i(1988),R=i(1446),I=i(9483),L=i(6237),E=i(4312),F=(i(4114),i(3251)),H=i(7282),O=i(3381),N=(0,D.A)(F.A,H.A,O.A).extend({name:"VSkeletonLoader",props:{boilerplate:Boolean,loading:Boolean,loadingText:{type:String,default:"$vuetify.loading"},tile:Boolean,transition:String,type:String,types:{type:Object,default:()=>({})}},computed:{attrs(){return this.isLoading?{"aria-busy":!this.boilerplate||void 0,"aria-live":this.boilerplate?void 0:"polite","aria-label":this.boilerplate?void 0:this.$vuetify.lang.t(this.loadingText),role:this.boilerplate?void 0:"alert",...this.$attrs}:this.$attrs},classes(){return{"v-skeleton-loader--boilerplate":this.boilerplate,"v-skeleton-loader--is-loading":this.isLoading,"v-skeleton-loader--tile":this.tile,...this.themeClasses,...this.elevationClasses}},isLoading(){return!("default"in this.$scopedSlots)||this.loading},rootTypes(){return{actions:"button@2",article:"heading, paragraph",avatar:"avatar",button:"button",card:"image, card-heading","card-avatar":"image, list-item-avatar","card-heading":"heading",chip:"chip","date-picker":"list-item, card-heading, divider, date-picker-options, date-picker-days, actions","date-picker-options":"text, avatar@2","date-picker-days":"avatar@28",heading:"heading",image:"image","list-item":"text","list-item-avatar":"avatar, text","list-item-two-line":"sentences","list-item-avatar-two-line":"avatar, sentences","list-item-three-line":"paragraph","list-item-avatar-three-line":"avatar, paragraph",paragraph:"text@3",sentences:"text@2",table:"table-heading, table-thead, table-tbody, table-tfoot","table-heading":"heading, text","table-thead":"heading@6","table-tbody":"table-row-divider@6","table-row-divider":"table-row, divider","table-row":"table-cell@6","table-cell":"text","table-tfoot":"text@2, avatar@2",text:"text",...this.types}}},methods:{genBone(t,e){return this.$createElement("div",{staticClass:`v-skeleton-loader__${t} v-skeleton-loader__bone`},e)},genBones(t){const[e,i]=t.split("@"),s=()=>this.genStructure(e);return Array.from({length:i}).map(s)},genStructure(t){let e=[];t=t||this.type||"";const i=this.rootTypes[t]||"";if(t===i);else{if(t.indexOf(",")>-1)return this.mapBones(t);if(t.indexOf("@")>-1)return this.genBones(t);i.indexOf(",")>-1?e=this.mapBones(i):i.indexOf("@")>-1?e=this.genBones(i):i&&e.push(this.genStructure(i))}return[this.genBone(t,e)]},genSkeleton(){const t=[];return this.isLoading?t.push(this.genStructure()):t.push((0,w.$c)(this)),this.transition?this.$createElement("transition",{props:{name:this.transition},on:{afterEnter:this.resetStyles,beforeEnter:this.onBeforeEnter,beforeLeave:this.onBeforeLeave,leaveCancelled:this.resetStyles}},t):t},mapBones(t){return t.replace(/\s/g,"").split(",").map(this.genStructure)},onBeforeEnter(t){this.resetStyles(t),this.isLoading&&(t._initialStyle={display:t.style.display,transition:t.style.transition},t.style.setProperty("transition","none","important"))},onBeforeLeave(t){t.style.setProperty("display","none","important")},resetStyles(t){t._initialStyle&&(t.style.display=t._initialStyle.display||"",t.style.transition=t._initialStyle.transition,delete t._initialStyle)}},render(t){return t("div",{staticClass:"v-skeleton-loader",attrs:this.attrs,on:this.$listeners,class:this.classes,style:this.isLoading?this.measurableStyles:void 0},[this.genSkeleton()])}}),G=i(6513),z=function(){var t=this,e=t._self._c;return e(d.A,{staticClass:"billing-dialog",attrs:{persistent:"","max-width":"700",fullscreen:t.$vuetify.breakpoint.smAndDown},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(a.A,[e(n.ri,{staticClass:"text-h6 d-flex align-center pa-4"},[e("span",{staticClass:"billing-title"},[t._v(t._s(t.update?"Update":"Create New")+" Billing")]),e(f.A),e(s.A,{attrs:{icon:""},on:{click:function(e){t.dialog=!1}}},[e(u.A,[t._v("mdi-close")])],1)],1),e(I.A),e(n.OQ,{staticClass:"pt-4"},[t.isLoading?e(N,{staticClass:"mx-auto",attrs:{type:"article"}}):e(l.A,{staticClass:"px-2 px-sm-4"},[e(g.A,[e(r.A,{attrs:{cols:"12",sm:"6"}},[e(E.A,{attrs:{items:t.months,label:"Present Date",outlined:"",dense:"",required:"",disabled:t.update},model:{value:t.items.month,callback:function(e){t.$set(t.items,"month",e)},expression:"items.month"}})],1),e(r.A,{attrs:{cols:"12",sm:"3"}},[e(E.A,{attrs:{items:t.years,label:"Year",outlined:"",dense:"",required:"",disabled:t.update},model:{value:t.items.year,callback:function(e){t.$set(t.items,"year",e)},expression:"items.year"}})],1)],1),e(g.A,[e(r.A,{attrs:{cols:"12",sm:"4"}},[e(L.A,{ref:"dateMenu",attrs:{"close-on-content-click":!1,transition:"scale-transition","min-width":"290px","nudge-right":40},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:s}){return[e(S.A,t._g(t._b({attrs:{label:"Billing Date",readonly:"",outlined:"",dense:"",disabled:t.update,"prepend-icon":"mdi-calendar"},model:{value:t.formattedBillingDate,callback:function(e){t.formattedBillingDate=e},expression:"formattedBillingDate"}},"v-text-field",s,!1),i))]}}],null,!1,2253396362),model:{value:t.dateMenu,callback:function(e){t.dateMenu=e},expression:"dateMenu"}},[e(R.A,{attrs:{scrollable:""},on:{input:function(e){t.dateMenu=!1}},model:{value:t.items.billingDate,callback:function(e){t.$set(t.items,"billingDate",e)},expression:"items.billingDate"}})],1)],1),e(r.A,{attrs:{cols:"12",sm:"4",md:"2"}},[e(S.A,{attrs:{label:"Previous Read",outlined:"",dense:"",disabled:""},model:{value:t.items.previousRead,callback:function(e){t.$set(t.items,"previousRead",e)},expression:"items.previousRead"}})],1),e(r.A,{attrs:{cols:"12",sm:"4",md:"3"}},[e(S.A,{attrs:{label:"Present Read",outlined:"",dense:"",type:"number",rules:[e=>e>=t.items.previousRead||"Present read must be greater than previous read"]},model:{value:t.items.presentRead,callback:function(e){t.$set(t.items,"presentRead",e)},expression:"items.presentRead"}})],1),e(r.A,{attrs:{cols:"12",sm:"4",md:"3"}},[e(S.A,{attrs:{label:"Consumption",outlined:"",dense:"",disabled:""},model:{value:t.consumption,callback:function(e){t.consumption=e},expression:"consumption"}})],1)],1),e(g.A,[e(r.A,{attrs:{cols:"12",sm:"6"}},[e(E.A,{attrs:{items:t.readTypes,label:"Read Type",outlined:"",dense:""},model:{value:t.items.readType,callback:function(e){t.$set(t.items,"readType",e)},expression:"items.readType"}})],1),e(r.A,{attrs:{cols:"12",sm:"6"}},[e(E.A,{attrs:{items:t.meterDescriptions,label:"Meter Description",outlined:"",dense:""},model:{value:t.items.meterDescription,callback:function(e){t.$set(t.items,"meterDescription",e)},expression:"items.meterDescription"}})],1),e(r.A,{attrs:{cols:"12"}},[e(G.A,{staticClass:"billing-notes",attrs:{label:"Notes",outlined:"","auto-grow":"",rows:"3","row-height":"15"},model:{value:t.items.notes,callback:function(e){t.$set(t.items,"notes",e)},expression:"items.notes"}})],1)],1)],1)],1),e(I.A),e(n.SL,{staticClass:"pa-4"},[e(f.A),e(s.A,{staticClass:"px-4",attrs:{text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Cancel ")]),e(s.A,{staticClass:"px-6",attrs:{color:"primary"},on:{click:t.onAddItem}},[t._v(" "+t._s(t.buttonLabel)+" ")])],1)],1)],1)},W=[],j=i(5093),Q=i.n(j),V={name:"ConsumerBillingDialog",props:{value:Boolean,billingData:{type:Object,default:()=>({})},update:Boolean},data(){return{dialog:this.value,dateMenu:!1,months:["January","February","March","April","May","June","July","August","September","October","November","December"],readTypes:["Actual"],meterDescriptions:["Water"],years:[],items:{readType:"Actual",meterDescription:"Water",billingDate:null,previousRead:0,presentRead:0,month:"",year:null},billing:{},isLoading:!1}},computed:{consumption(){const t=this.items.presentRead-this.items.previousRead;return t>=0?t:0},buttonLabel(){return this.update?"Update":"Save"},formattedBillingDate(){return this.items.billingDate?Q()(this.items.billingDate).format("YYYY-MM-DD"):""}},methods:{async onAddItem(){try{const t=Q()(`${this.items.month} ${this.items.year}`,"MMMM YYYY").format("YYYY-MM-DD"),e=Q()(`${this.items.month} ${this.items.year}`,"MMMM YYYY").subtract(1,"month").format("YYYY-MM-DD"),i={...this.items,consumerId:this.$route.params.id,previousDate:e,presentDate:t,billingDate:Q()(this.items.billingDate).format("YYYY-MM-DD")};this.update?await P.A.put(`/billing/${this.billingData._id}`,i):await P.A.post("/billing",i),this.dialog=!1,this.$emit("update:billings")}catch(t){console.error("Error saving billing:",t)}},async getItem(){this.isLoading=!0;try{const t=await P.A.get(`/billing/consumer/latest/${this.$route.params.id}`);this.billing=t.data,console.log(t),this.items={readType:"Actual",meterDescription:"Water",billingDate:null,previousRead:this.billing.presentRead||0,presentRead:0,month:Q()().format("MMMM"),year:Q()().year(),notes:""}}catch(t){404!==t.response?.status&&console.error("Error fetching billing:",t),this.clearForm()}finally{this.isLoading=!1}},getPreviousMonthAndYear(t,e){return Q()(`${t} ${e}`,"MMMM YYYY").subtract(1,"month").toDate()},clearForm(){this.items={readType:"Actual",meterDescription:"Water",billingDate:null,previousRead:0,presentRead:0,month:"",year:null}},initializeYears(){const t=(new Date).getFullYear(),e=2e3;for(let i=t;i>=e;i--)this.years.push(i)}},watch:{value(t){this.dialog=t,t&&(this.update?this.billingData&&Object.keys(this.billingData).length&&(this.items={readType:this.billingData.readType||"Actual",meterDescription:this.billingData.meterDescription||"Water",billingDate:this.billingData.billingDate,previousRead:this.billingData.previousRead,presentRead:this.billingData.presentRead,month:Q()(this.billingData.presentDate).format("MMMM"),year:parseInt(Q()(this.billingData.presentDate).format("YYYY")),notes:this.billingData.notes||""}):this.getItem())},dialog(t){this.$emit("input",t),t||this.clearForm()}},created(){this.initializeYears()}},J=V,q=i(1656),U=(0,q.A)(J,z,W,!1,null,"535ecd12",null),X=U.exports,K={name:"ConsumerView",components:{ConsumerBillingDialog:X},data(){return{tab:0,consumers:[],collections:[],filter:"",collectionFilter:"",showDialog:!1,showDeleteDialog:!1,showError:!1,errorMessage:"",item:{},itemToDelete:null,update:!1,consumer:{},loading:!1,billingHeaders:[{text:"Billing Date",value:"billingDate"},{text:"Previous Read",value:"previousRead"},{text:"Present Read",value:"presentRead"},{text:"Consumption",value:"consumption"},{text:"Payment Status",value:"status"},{text:"Actions",value:"actions",sortable:!1}],collectionHeaders:[{text:"Payment Date",value:"paymentDate"},{text:"Total Bill",value:"totalBill"},{text:"Amount Paid",value:"amountPaid"},{text:"Payment Method",value:"paymentMethod"},{text:"Collection Type",value:"collectionType"}]}},computed:{consumerInfo(){const t=`${this.consumer.firstName} ${this.consumer.middleName} ${this.consumer.lastName}`.toUpperCase(),e=`${this.consumer.purok} ${this.consumer.address}`;return{...this.consumer,fullName:t,fullAddress:e}},totalConsumption(){return this.consumers.reduce(((t,e)=>t+e.consumption),0)},outstandingBalance(){return this.consumers.filter((t=>"Paid"!==t.status)).reduce(((t,e)=>t+e.presentBill),0)},lastPayment(){return this.collections.length>0?this.collections[0]:null}},methods:{async fetch(){this.loading=!0;try{const t=this.$route.params.id,[e,i,s]=await Promise.all([P.A.get(`/consumer/${t}`),P.A.get(`/billing/consumer/all/${t}`),P.A.get(`/collection/consumer/${t}`)]);this.consumer=e.data,this.consumers=i.data,this.collections=Array.isArray(s.data)?s.data:[]}catch(t){console.error("Error fetching data:",t),this.errorMessage="Failed to load consumer data. Please try again.",this.showError=!0}finally{this.loading=!1}},formatLastPaymentDate(){return this.lastPayment?Q()(this.lastPayment.paymentDate).format("MMM DD, YYYY"):"No payments yet"},formatDate(t){return Q()(t).format("YYYY-MM-DD")},formatDateTime(t){return Q()(t).format("YYYY-MM-DD hh:mm A")},formatAmount(t){return parseFloat(t).toFixed(2)},getStatusColor(t){return"Paid"===t?"success":"error"},onViewItem(t){this.item=JSON.parse(JSON.stringify(t)),this.update=!0,this.showDialog=!0},onShowDialog(){this.item={},this.update=!1,this.showDialog=!0,this.$refs.billing.getItem()},confirmDelete(t){this.itemToDelete=t,this.showDeleteDialog=!0},async deleteRecord(){try{this.itemToDelete&&(await P.A.delete(`/billing/${this.itemToDelete.id}`),await this.fetch(),this.showDeleteDialog=!1)}catch(t){console.error("Error deleting record:",t),this.errorMessage="Failed to delete billing record. Please try again.",this.showError=!0}}},created(){this.fetch()}},Z=K,tt=(0,q.A)(Z,M,Y,!1,null,"526d1d47",null),et=tt.exports},6513:function(t,e,i){i.d(e,{A:function(){return o}});var s=i(7112),a=i(5803);const n=(0,a.A)(s.A);var o=n.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:t=>!isNaN(parseFloat(t))},rows:{type:[Number,String],default:5,validator:t=>!isNaN(parseInt(t,10))}},computed:{classes(){return{"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle,...s.A.options.computed.classes.call(this)}},noResizeHandle(){return this.noResize||this.autoGrow}},watch:{autoGrow(t){this.$nextTick((()=>{var e;t?this.calculateInputHeight():null===(e=this.$refs.input)||void 0===e||e.style.removeProperty("height")}))},lazyValue(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted(){setTimeout((()=>{this.autoGrow&&this.calculateInputHeight()}),0)},methods:{calculateInputHeight(){const t=this.$refs.input;if(!t)return;t.style.height="0";const e=t.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(i,e)+"px"},genInput(){const t=s.A.options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput(t){s.A.options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},7270:function(t,e,i){i.d(e,{A:function(){return u}});var s=i(5030),a=i(8743),n=i(7391),o=i(2031),r=i(9975),l=i(4152),c=i(6988),d=i(5803),u=(0,d.A)(a.A,n.A,o.A,r.A).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},openOnFocus:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:()=>({calculatedMinWidth:0,closeDependents:!1}),computed:{calculatedLeft(){const{activator:t,content:e}=this.dimensions,i=!this.bottom&&!this.left&&!this.top&&!this.right,s=!1!==this.attach?t.offsetLeft:t.left;let a=0;return this.top||this.bottom||i?a=s+t.width/2-e.width/2:(this.left||this.right)&&(a=s+(this.right?t.width:-e.width)+(this.right?10:-10)),this.nudgeLeft&&(a-=parseInt(this.nudgeLeft)),this.nudgeRight&&(a+=parseInt(this.nudgeRight)),`${this.calcXOverflow(a,this.dimensions.content.width)}px`},calculatedTop(){const{activator:t,content:e}=this.dimensions,i=!1!==this.attach?t.offsetTop:t.top;let s=0;return this.top||this.bottom?s=i+(this.bottom?t.height:-e.height)+(this.bottom?10:-10):(this.left||this.right)&&(s=i+t.height/2-e.height/2),this.nudgeTop&&(s-=parseInt(this.nudgeTop)),this.nudgeBottom&&(s+=parseInt(this.nudgeBottom)),!1===this.attach&&(s+=this.pageYOffset),`${this.calcYOverflow(s)}px`},classes(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY(){return this.top||this.bottom},offsetX(){return this.left||this.right},styles(){return{left:this.calculatedLeft,maxWidth:(0,l.Dg)(this.maxWidth),minWidth:(0,l.Dg)(this.minWidth),top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount(){this.$nextTick((()=>{this.value&&this.callActivate()}))},mounted(){"v-slot"===(0,l.fo)(this,"activator",!0)&&(0,c.yA)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate(){this.runDelay("close")},genActivatorListeners(){const t=s.A.options.methods.genActivatorListeners.call(this);return this.openOnFocus&&(t.focus=t=>{this.getActivator(t),this.runDelay("open")},t.blur=t=>{this.getActivator(t),this.runDelay("close")}),t.keydown=t=>{t.keyCode===l.uP.esc&&(this.getActivator(t),this.runDelay("close"))},t},genActivatorAttributes(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition(){const t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:{[this.contentClass]:!0,menuable__content__active:this.isActive,"v-tooltip__content--fixed":this.activatorFixed},style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render(t){return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((()=>[this.genTransition()])),this.genActivator()])}})}}]);
//# sourceMappingURL=768.8aac6462.js.map