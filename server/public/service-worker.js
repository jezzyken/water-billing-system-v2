if(!self.define){let s,l={};const e=(e,n)=>(e=new URL(e+".js",n).href,l[e]||new Promise((l=>{if("document"in self){const s=document.createElement("script");s.src=e,s.onload=l,document.head.appendChild(s)}else s=e,importScripts(e),l()})).then((()=>{let s=l[e];if(!s)throw new Error(`Module ${e} didn’t register its module`);return s})));self.define=(n,i)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(l[r])return;let u={};const o=s=>e(s,r),c={module:{uri:r},exports:u,require:o};l[r]=Promise.all(n.map((s=>c[s]||o(s)))).then((s=>(i(...s),u)))}}define(["./workbox-6567b62a"],(function(s){"use strict";s.setCacheNameDetails({prefix:"client"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/12.f6da4dd1.css",revision:null},{url:"/css/121.5978fe8e.css",revision:null},{url:"/css/147.65d58444.css",revision:null},{url:"/css/171.70620e42.css",revision:null},{url:"/css/259.98e5f025.css",revision:null},{url:"/css/270.52cc9bde.css",revision:null},{url:"/css/293.afaeae30.css",revision:null},{url:"/css/315.6afe80bb.css",revision:null},{url:"/css/323.67c79e35.css",revision:null},{url:"/css/330.3cc0b253.css",revision:null},{url:"/css/373.fa047bc4.css",revision:null},{url:"/css/384.bb7a0804.css",revision:null},{url:"/css/398.51b84c10.css",revision:null},{url:"/css/491.eab99a1f.css",revision:null},{url:"/css/556.42af775a.css",revision:null},{url:"/css/589.1bedb099.css",revision:null},{url:"/css/719.d66ab3a7.css",revision:null},{url:"/css/753.9b3814a1.css",revision:null},{url:"/css/768.25664422.css",revision:null},{url:"/css/803.12eefe6f.css",revision:null},{url:"/css/860.1eb5bac1.css",revision:null},{url:"/css/chunk-vendors.ca977ff1.css",revision:null},{url:"/fonts/materialdesignicons-webfont.0766edc9.eot",revision:null},{url:"/fonts/materialdesignicons-webfont.714a4eee.ttf",revision:null},{url:"/fonts/materialdesignicons-webfont.e659bf56.woff",revision:null},{url:"/fonts/materialdesignicons-webfont.fbaef2a9.woff2",revision:null},{url:"/img/404.4e081c7a.svg",revision:null},{url:"/img/default-avatar.d952ee3e.png",revision:null},{url:"/index.html",revision:"df5a85307c0a85b4873e68a1a2ea1c2f"},{url:"/js/12.e5991665.js",revision:null},{url:"/js/121.954c6b36.js",revision:null},{url:"/js/147.a6f2c8eb.js",revision:null},{url:"/js/166.b9fe308f.js",revision:null},{url:"/js/171.19e0eac7.js",revision:null},{url:"/js/237.b8cfac6c.js",revision:null},{url:"/js/259.d8390ec2.js",revision:null},{url:"/js/270.6addffd2.js",revision:null},{url:"/js/293.5872af7d.js",revision:null},{url:"/js/312.2fde1d70.js",revision:null},{url:"/js/315.ef6db583.js",revision:null},{url:"/js/323.3e294d43.js",revision:null},{url:"/js/330.50d254ac.js",revision:null},{url:"/js/356.73c689d1.js",revision:null},{url:"/js/373.327e0d7c.js",revision:null},{url:"/js/384.3fd609ae.js",revision:null},{url:"/js/398.35adeb69.js",revision:null},{url:"/js/491.347b600a.js",revision:null},{url:"/js/556.fc943593.js",revision:null},{url:"/js/589.4c638fc6.js",revision:null},{url:"/js/719.570169b6.js",revision:null},{url:"/js/753.b9872750.js",revision:null},{url:"/js/768.a329c29d.js",revision:null},{url:"/js/803.5e812961.js",revision:null},{url:"/js/860.2e3b9da1.js",revision:null},{url:"/js/896.da1e829b.js",revision:null},{url:"/js/93.dcf85a84.js",revision:null},{url:"/js/app.6d944dde.js",revision:null},{url:"/js/chunk-vendors.ebe03ae2.js",revision:null},{url:"/manifest.json",revision:"8eff00fb23e5046e8587fb699e79e093"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
