"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[12],{3634:function(t,e,s){s.r(e),s.d(e,{default:function(){return D}});var i=s(3740),a=s(3698),n=s(2938),o=s(4414),r=s(3449),l=s(3064),c=s(1446),d=s(9991),h=s(6930),p=s(6237),u=s(2756),m=s(4312),g=s(7150),f=s(1034),v=s(7112),x=s(6513),b=s(198),y=function(){var t=this,e=t._self._c;return e(r.A,[e(a.A,[e(n.ri,{staticClass:"d-flex align-center py-3 px-4"},[e("h2",{staticClass:"text-h5 font-weight-bold mb-0"},[t._v("Expenses")]),e(f.A),e(i.A,{staticClass:"px-4",attrs:{color:"primary","prepend-icon":"mdi-plus"},on:{click:t.openDialog}},[t._v(" Add Expense ")])],1),e(n.OQ,[e(l.A,{attrs:{items:t.expenses,headers:t.headers,search:t.search,loading:t.loading,"items-per-page":10},scopedSlots:t._u([{key:"top",fn:function(){return[e(b.A,{staticClass:"px-4 d-flex justify-end",attrs:{flat:""}},[e(v.A,{staticClass:"mt-6",class:{"focused-field":t.isFocused},attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search expenses...","hide-details":"",dense:"",outlined:"",rounded:"",clearable:""},on:{"click:clear":function(e){t.search=""},focus:function(e){t.isFocused=!0},blur:function(e){t.isFocused=!1}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)]},proxy:!0},{key:"item.date",fn:function({item:e}){return[t._v(" "+t._s(t.formatDate(e.date))+" ")]}},{key:"item.amount",fn:function({item:e}){return[t._v(" ₱"+t._s(e.amount.toFixed(2))+" ")]}},{key:"item.actions",fn:function({item:s}){return[e(i.A,{staticClass:"mr-2",attrs:{small:"",color:"primary",icon:""},on:{click:function(e){return t.openDialog(s)}}},[e(h.A,{attrs:{small:""}},[t._v("mdi-pencil")])],1),e(i.A,{attrs:{small:"",color:"error",icon:""},on:{click:function(e){return t.confirmDelete(s)}}},[e(h.A,{attrs:{small:""}},[t._v("mdi-delete")])],1)]}}],null,!0)})],1)],1),e(d.A,{attrs:{"max-width":"500px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(a.A,[e(n.ri,[t._v(" "+t._s(t.formTitle)+" ")]),e(n.OQ,[e(r.A,[e(u.A,[e(o.A,{attrs:{cols:"12"}},[e(p.A,{ref:"dateMenu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:i}){return[e(v.A,t._g(t._b({attrs:{label:"Date","prepend-icon":"mdi-calendar",readonly:""},model:{value:t.editedItem.date,callback:function(e){t.$set(t.editedItem,"date",e)},expression:"editedItem.date"}},"v-text-field",i,!1),s))]}}]),model:{value:t.dateMenu,callback:function(e){t.dateMenu=e},expression:"dateMenu"}},[e(c.A,{on:{input:function(e){t.dateMenu=!1}},model:{value:t.editedItem.date,callback:function(e){t.$set(t.editedItem,"date",e)},expression:"editedItem.date"}})],1)],1),e(o.A,{attrs:{cols:"12"}},[e(v.A,{attrs:{label:"Amount",type:"number",prefix:"₱"},model:{value:t.editedItem.amount,callback:function(e){t.$set(t.editedItem,"amount",t._n(e))},expression:"editedItem.amount"}})],1),e(o.A,{attrs:{cols:"12"}},[e(m.A,{attrs:{items:t.expenseTypes,label:"Expense Type"},model:{value:t.editedItem.expenseType,callback:function(e){t.$set(t.editedItem,"expenseType",e)},expression:"editedItem.expenseType"}})],1),e(o.A,{attrs:{cols:"12"}},[e(x.A,{attrs:{label:"Description",rows:"3"},model:{value:t.editedItem.description,callback:function(e){t.$set(t.editedItem,"description",e)},expression:"editedItem.description"}})],1)],1)],1)],1),e(n.SL,[e(f.A),e(i.A,{attrs:{color:"grey darken-1",text:""},on:{click:t.closeDialog}},[t._v(" Cancel ")]),e(i.A,{attrs:{color:"primary",loading:t.saving},on:{click:t.saveExpense}},[t._v(" Save ")])],1)],1)],1),e(d.A,{attrs:{"max-width":"400px"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[e(a.A,[e(n.ri,[t._v("Delete Expense")]),e(n.OQ,[t._v(" Are you sure you want to delete this expense? ")]),e(n.SL,[e(f.A),e(i.A,{attrs:{color:"grey darken-1",text:""},on:{click:function(e){t.deleteDialog=!1}}},[t._v(" Cancel ")]),e(i.A,{attrs:{color:"error",loading:t.deleting},on:{click:t.deleteExpense}},[t._v(" Delete ")])],1)],1)],1),e(g.A,{attrs:{color:t.snackbar.color,top:""},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(i.A,t._b({attrs:{text:""},on:{click:function(e){t.snackbar.show=!1}}},"v-btn",s,!1),[t._v(" Close ")])]}}]),model:{value:t.snackbar.show,callback:function(e){t.$set(t.snackbar,"show",e)},expression:"snackbar.show"}},[t._v(" "+t._s(t.snackbar.text)+" ")])],1)},S=[],A=s(1988),k=s(5093),w=s.n(k),_={name:"ExpensesPage",data:()=>({search:"",loading:!1,saving:!1,deleting:!1,dialog:!1,deleteDialog:!1,dateMenu:!1,expenses:[],headers:[{text:"Date",value:"date"},{text:"Amount",value:"amount"},{text:"Type",value:"expenseType"},{text:"Description",value:"description"},{text:"Actions",value:"actions",sortable:!1}],expenseTypes:["Salary","Utilities","Supplies","Maintenance","Other"],editedItem:{date:(new Date).toISOString().substr(0,10),amount:0,expenseType:"",description:""},defaultItem:{date:(new Date).toISOString().substr(0,10),amount:0,expenseType:"",description:""},snackbar:{show:!1,text:"",color:""}}),computed:{formTitle(){return this.editedItem._id?"Edit Expense":"New Expense"}},methods:{formatDate(t){return w()(t).format("YYYY-MM-DD")},showSnackbar(t,e="success"){this.snackbar={show:!0,text:t,color:e}},async fetchExpenses(){this.loading=!0;try{const t=await A.A.get("/expense");this.expenses=t.data}catch(t){this.showSnackbar(t.response?.data?.message||"Failed to fetch expenses","error")}this.loading=!1},openDialog(t=null){this.editedItem=t?{...t}:{...this.defaultItem},this.dialog=!0},closeDialog(){this.dialog=!1,this.$nextTick((()=>{this.editedItem={...this.defaultItem}}))},async saveExpense(){this.saving=!0;try{this.editedItem._id?(await A.A.put(`/expense/${this.editedItem._id}`,this.editedItem),this.showSnackbar("Expense updated successfully")):(await A.A.post("/expense",this.editedItem),this.showSnackbar("Expense added successfully")),this.closeDialog(),this.fetchExpenses()}catch(t){this.showSnackbar(t.response?.data?.message||"Failed to save expense","error")}this.saving=!1},confirmDelete(t){this.editedItem={...t},this.deleteDialog=!0},async deleteExpense(){this.deleting=!0;try{await A.A.delete(`/expense/${this.editedItem._id}`),this.showSnackbar("Expense deleted successfully"),this.deleteDialog=!1,this.fetchExpenses()}catch(t){this.showSnackbar(t.response?.data?.message||"Failed to delete expense","error")}this.deleting=!1}},created(){this.fetchExpenses()}},I=_,$=s(1656),E=(0,$.A)(I,y,S,!1,null,null,null),D=E.exports},9873:function(t,e,s){s.d(e,{A:function(){return p}});s(4114);var i=s(1677),a=s(3497),n=a.A,o=s(3381),r=s(5803),l=s(8041),c=s(6988),d=s(4152);const h="undefined"!==typeof window&&"IntersectionObserver"in window;var p=(0,r.A)(n,o.A).extend({name:"v-img",directives:{intersect:i.A},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc(){return this.src&&"object"===typeof this.src?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];const t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push(`linear-gradient(${this.gradient})`),e&&t.push(`url("${e}")`);const s=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[s]):s}},watch:{src(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted(){this.init()},methods:{init(t,e,s){if(!h||s||this.eager){if(this.normalisedSrc.lazySrc){const t=new Image;t.src=this.normalisedSrc.lazySrc,this.pollForSize(t,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src),this.image&&(this.normalisedSrc.src.endsWith(".svg")||this.normalisedSrc.src.startsWith("data:image/svg+xml"))&&(this.image.naturalHeight&&this.image.naturalWidth?(this.naturalWidth=this.image.naturalWidth,this.calculatedAspectRatio=this.image.naturalWidth/this.image.naturalHeight):this.calculatedAspectRatio=1)},onError(){this.hasError=!0,this.$emit("error",this.src)},getSrc(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage(){const t=new Image;this.image=t,t.onload=()=>{t.decode?t.decode().catch((t=>{(0,c.OP)(`Failed to decode image, trying to render anyway\n\nsrc: ${this.normalisedSrc.src}`+(t.message?`\nOriginal error: ${t.message}`:""),this)})).then(this.onLoad):this.onLoad()},t.onerror=this.onError,this.hasError=!1,this.sizes&&(t.sizes=this.sizes),this.normalisedSrc.srcset&&(t.srcset=this.normalisedSrc.srcset),t.src=this.normalisedSrc.src,this.$emit("loadstart",this.normalisedSrc.src),this.aspectRatio||this.pollForSize(t),this.getSrc()},pollForSize(t,e=100){const s=()=>{const{naturalHeight:i,naturalWidth:a}=t;i||a?(this.naturalWidth=a,this.calculatedAspectRatio=a/i):t.complete||!this.isLoading||this.hasError||null==e||setTimeout(s,e)};s()},genContent(){const t=n.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:`${this.naturalWidth}px`}}),t},__genPlaceholder(){const t=(0,d.$c)(this,"placeholder");if(t){const e=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},t)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},e):e[0]}}},render(t){const e=n.options.render.call(this,t),s=(0,l.Ay)(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:h?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,s,e.children)}})},6513:function(t,e,s){s.d(e,{A:function(){return o}});var i=s(7112),a=s(5803);const n=(0,a.A)(i.A);var o=n.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:t=>!isNaN(parseFloat(t))},rows:{type:[Number,String],default:5,validator:t=>!isNaN(parseInt(t,10))}},computed:{classes(){return{"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle,...i.A.options.computed.classes.call(this)}},noResizeHandle(){return this.noResize||this.autoGrow}},watch:{autoGrow(t){this.$nextTick((()=>{var e;t?this.calculateInputHeight():null===(e=this.$refs.input)||void 0===e||e.style.removeProperty("height")}))},lazyValue(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted(){setTimeout((()=>{this.autoGrow&&this.calculateInputHeight()}),0)},methods:{calculateInputHeight(){const t=this.$refs.input;if(!t)return;t.style.height="0";const e=t.scrollHeight,s=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(s,e)+"px"},genInput(){const t=i.A.options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput(t){i.A.options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},198:function(t,e,s){s.d(e,{A:function(){return r}});s(4114);var i=s(8184),a=s(9873),n=s(4152),o=s(6988),r=i.A.extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"}},data:()=>({isExtended:!1}),computed:{computedHeight(){const t=this.computedContentHeight;if(!this.isExtended)return t;const e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes(){return{...i.A.options.computed.classes.call(this),"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent}},isCollapsed(){return this.collapse},isProminent(){return this.prominent},styles(){return{...this.measurableStyles,height:(0,n.Dg)(this.computedHeight)}}},created(){const t=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];t.forEach((([t,e])=>{this.$attrs.hasOwnProperty(t)&&(0,o.q4)(t,e,this)}))},methods:{genBackground(){const t={height:(0,n.Dg)(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(a.A,{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:(0,n.Dg)(this.computedContentHeight)}},(0,n.$c)(this))},genExtension(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:(0,n.Dg)(this.extensionHeight)}},(0,n.$c)(this,"extension"))}},render(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;const e=[this.genContent()],s=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,s,e)}})}}]);
//# sourceMappingURL=12.e5991665.js.map