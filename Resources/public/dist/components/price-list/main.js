define([],function(){"use strict";var a={instanceName:null,data:[],translations:{}},b="sulu.products.price-list.",c=function(a){return b+(this.options.instanceName?this.options.instanceName+".":"")+a},d=function(){return c.call(this,"initialized")},e=function(a){var b=[];return this.sandbox.util.foreach(a,function(a){b[a.currency.name]||(b[a.currency.name]=[]),b[a.currency.name].push(a)}.bind(this)),b};return{initialize:function(){this.options=this.sandbox.util.extend({},a,this.options),this.groupedPrices=e.call(this,this.options.data),this.initializeBulkPriceComponents(),this.sandbox.emit(d.call(this))},initializeBulkPriceComponents:function(){var a=[];this.sandbox.util.foreach(this.groupedPrices,function(b){var c=this.sandbox.dom.createElement(),d={el:c,data:b,instanceName:b[0].currency.code};a.push({name:"bulk-price@suluproduct",options:d}),this.sandbox.dom.append(this.options.el,c)}.bind(this)),this.sandbox.start(a)}}});