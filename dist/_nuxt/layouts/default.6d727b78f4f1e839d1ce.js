webpackJsonp([0],{"+c6G":function(t,a,e){a=t.exports=e("FZ+f")(!1),a.push([t.i,"",""])},"+wX2":function(t,a,e){"use strict";function r(t){e("c2Dk")}var s=e("I6pu"),n=e("0bHa"),i=e("VU/8"),o=r,l=i(s.a,n.a,!1,o,"data-v-10c8ed9c",null);a.a=l.exports},"0bHa":function(t,a,e){"use strict";var r=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{staticClass:"appfooter"},[r("v-footer",{staticClass:"pa-3 white",attrs:{"elevation-2":"",light:""}},[r("h6",{attrs:{headline:""}},[t._v("QUANTi © "+t._s((new Date).getFullYear())+" ")]),r("v-spacer"),r("img",{staticClass:"pwrdbystrava",attrs:{src:e("3Wxq")}})],1)],1)},s=[],n={render:r,staticRenderFns:s};a.a=n},"3Wxq":function(t,a,e){t.exports=e.p+"img/api_logo_pwrdBy_strava_horiz_gray.02a52be.svg"},"9SAf":function(t,a,e){var r=e("+c6G");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);e("rjj0")("01d77bbd",r,!0)},AYCZ:function(t,a,e){var r=e("Tv2v");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);e("rjj0")("56ffb896",r,!0)},Elsf:function(t,a,e){"use strict";function r(t){e("AYCZ")}var s=e("VqxT"),n=e("pQ2Z"),i=e("VU/8"),o=r,l=i(s.a,n.a,!1,o,"data-v-31fb518e",null);a.a=l.exports},I6pu:function(t,a,e){"use strict";a.a={name:"appfooter"}},Ma2J:function(t,a,e){"use strict";function r(t){e("9SAf")}Object.defineProperty(a,"__esModule",{value:!0});var s=e("puxl"),n=e("yWNW"),i=e("VU/8"),o=r,l=i(s.a,n.a,!1,o,"data-v-c51c527e",null);a.default=l.exports},Tv2v:function(t,a,e){a=t.exports=e("FZ+f")(!1),a.push([t.i,".appheader[data-v-31fb518e]{z-index:999}.center[data-v-31fb518e]{width:100%;text-align:center}.nav_text[data-v-31fb518e]{color:#000}.nav_link[data-v-31fb518e]{text-decoration:none}.nav_mobile_link[data-v-31fb518e]{text-decoration:none;margin:50px}.logout_mobile_button[data-v-31fb518e]{margin:60px}",""])},VqxT:function(t,a,e){"use strict";a.a={name:"appheader",data:function(){return{drawer:null,right:null}}}},c2Dk:function(t,a,e){var r=e("hL6f");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);e("rjj0")("08c95abc",r,!0)},hL6f:function(t,a,e){a=t.exports=e("FZ+f")(!1),a.push([t.i,"h6[data-v-10c8ed9c]{margin-top:20px}.pwrdbystrava[data-v-10c8ed9c]{width:auto;height:50px}@media (max-width:600px){.pwrdbystrava[data-v-10c8ed9c]{width:auto;height:25px}}",""])},jEK0:function(t,a,e){t.exports=e.p+"img/btn_strava_connectwith_orange.aa0d255.svg"},pQ2Z:function(t,a,e){"use strict";var r=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{staticClass:"appheader"},[r("v-toolbar",{staticClass:"hidden-sm-and-up white",attrs:{fixed:"",dark:""}},[r("v-toolbar-side-icon",{attrs:{light:""},on:{click:function(a){a.stopPropagation(),t.drawer=!t.drawer}}}),r("span",{staticClass:"center nav_text"},[r("v-toolbar-title",[t._v("CARLESS")])],1)],1),r("v-navigation-drawer",{staticClass:"hidden-sm-and-up",attrs:{temporary:"",light:""},model:{value:t.drawer,callback:function(a){t.drawer=a},expression:"drawer"}},[r("v-toolbar",{attrs:{flat:"",color:"white"}}),r("v-list",{staticClass:"pt-0",attrs:{dense:""}},[r("v-list-tile",[r("nuxt-link",{staticClass:"nav_mobile_link",attrs:{to:"/"}},[r("v-btn",{attrs:{color:"black",flat:"",dark:""}},[r("span",{staticClass:"headline"},[t._v("Početna")])])],1)],1),r("v-list-tile",[t.$store.state.authUser?r("nuxt-link",{staticClass:"nav_mobile_link",attrs:{to:"/profile"}},[r("v-btn",{attrs:{color:"black",flat:"",dark:""}},[r("span",{staticClass:"headline"},[t._v("Profil")])])],1):r("span")],1),r("v-toolbar",{attrs:{height:"20",color:"white",flat:""}}),r("div",{staticClass:"divider"}),r("v-toolbar",{attrs:{height:"20",color:"white",flat:""}}),r("v-list-tile",[t.$store.state.authUser?r("v-btn",{staticClass:"logout_mobile_button",attrs:{href:"/logout",color:"black",flat:"",dark:""}},[r("span",{staticClass:"subheading"},[t._v("Logout")])]):r("v-btn",{staticClass:"center",attrs:{href:"/auth/strava",flat:"",dark:"",large:""}},[r("img",{attrs:{src:e("jEK0")}})])],1)],1)],1),r("v-toolbar",{staticClass:"hidden-xs-only white",attrs:{fixed:"",dark:""}},[r("v-toolbar-title",[r("span",{staticClass:"nav_text"},[t._v("CARLESS")])]),r("nuxt-link",{staticClass:"nav_link",attrs:{to:"/"}},[r("v-btn",{attrs:{color:"black",flat:"",dark:""}},[t._v("Početna")])],1),t.$store.state.authUser?r("nuxt-link",{staticClass:"nav_link",attrs:{to:"/profile"}},[r("v-btn",{attrs:{color:"black",flat:"",dark:""}},[t._v("Profil")])],1):r("span"),r("v-spacer"),t.$store.state.authUser?r("v-btn",{attrs:{href:"/logout",color:"black",flat:"",dark:""}},[r("span",[t._v("Logout")])]):r("v-btn",{attrs:{flat:"",dark:"",large:"",href:"/auth/strava"}},[r("img",{attrs:{src:e("jEK0")}})])],1)],1)},s=[],n={render:r,staticRenderFns:s};a.a=n},puxl:function(t,a,e){"use strict";var r=e("Elsf"),s=e("+wX2");a.a={components:{myHeader:r.a,myFooter:s.a}}},yWNW:function(t,a,e){"use strict";var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-app",[e("myHeader"),e("main",[e("v-content",[e("nuxt")],1)],1),e("myFooter")],1)},s=[],n={render:r,staticRenderFns:s};a.a=n}});
//# sourceMappingURL=default.6d727b78f4f1e839d1ce.js.map