(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-305b8f89"],{"1bec":function(n,t,a){},"64a1":function(n,t,a){"use strict";var e=a("1bec"),c=a.n(e);c.a},d97c:function(n,t,a){"use strict";a.r(t);var e=function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"info"},[n._m(0),a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"nick"},[n._v("昵称："+n._s(n.adminInfo.nickname))]),a("div",{staticClass:"phone"},[n._v("联系方式："+n._s(n.adminInfo.phone))]),a("div",{staticClass:"type"},[n._v("账户类型："+n._s(n.adminInfo.type))])])],1),a("div",{staticClass:"decorate"},[a("el-image",{attrs:{src:n.Img,lazy:""}})],1)])},c=[function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",{staticClass:"icon"},[a("i",{staticClass:"el-icon-s-custom"}),a("span",[n._v("管理员信息")])])}],i=a("e8ec"),s={name:"AdminInfo",data:function(){return{adminInfo:{nickname:"",phone:"无",type:""},Img:"http://ptljizme7.bkt.clouddn.com/important/adminInfo.jpg"}},created:function(){var n=Object(i["b"])("userInfo"),t=n.memberAccountTypeId;this.adminInfo={nickname:n.nickname,phone:n.phone,type:1===t?"超级管理员":2===t?"管理员":"客服"}}},o=s,r=(a("64a1"),a("2877")),d=Object(r["a"])(o,e,c,!1,null,"4cece51f",null);t["default"]=d.exports}}]);