define(["jquery","services/husky/util"],function(a,b){"use strict";var c="/admin/api/products",d=function(a,b,d){var e=c,f=[];return a.id&&(e+="/"+a.id),b&&f.push("locale="+b),d&&f.push("action="+d),e+"?"+f.join("&")};return{save:function(a,c,e,f){return f||(f=a.id?"PUT":"POST"),b.save(d(a,c,e),f,a)},saveStatus:function(a,c){return b.save(d({id:a}),"PATCH",{status:c})},"delete":function(a){return b.save(d({id:a}),"DELETE")}}});