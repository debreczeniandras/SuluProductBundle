define([],function(){"use strict";var a="#attribute-form",b=60;return{name:"Sulu Attribute Form",view:!0,templates:["/admin/product/template/attribute/form"],header:function(){return{toolbar:{template:"default",languageChanger:{preSelected:this.options.locale}}}},initialize:function(){this.saved=!0,this.initializeValidation(),this.bindCustomEvents(),this.setHeaderBar(!0),this.render(),this.listenForChange()},bindCustomEvents:function(){this.sandbox.on("sulu.header.toolbar.save",function(){this.save()}.bind(this)),this.sandbox.on("sulu.header.toolbar.delete",function(){this.sandbox.emit("sulu.product.attributes.delete",this.sandbox.dom.val("#id"))}.bind(this)),this.sandbox.on("sulu.products.attributes.saved",function(a){this.options.data.id=a,this.setHeaderBar(!0),this.setHeaderInformation()},this),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.product.attributes.list")},this),this.sandbox.on("sulu.header.initialized",function(){this.setHeaderInformation()},this)},initializeValidation:function(){this.sandbox.form.create(a)},save:function(){if(this.sandbox.form.validate(a)){var b=this.sandbox.form.getData(a);""===b.id&&delete b.id,b.type={id:1},this.sandbox.emit("sulu.product.attributes.save",b)}},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/product/template/attribute/form")),this.valuesList=this.sandbox.dom.find("#attribute-values-list",this.$el),this.valuesList.addClass("hidden");var a=this.options.data.id,b="/admin/api/attributes/"+a+"/values?flat=true";this.sandbox.start([{name:"datagrid@husky",options:{el:this.sandbox.dom.find("#attribute-values-list",this.$el),url:b,pagination:!1,instanceName:"product-attributes",resultKey:"attributeValues",view:"table",matchings:"/admin/api/attributes/values/fields",contentFilters:{selected:"radio"},viewOptions:{table:{showHead:!0,editable:!0,validation:!0,fullWidth:!1},selectItem:{type:"checkbox",inFirstCell:!0}}}}]),this.setHeaderInformation(),this.initForm(this.options.data)},initForm:function(b){var c=this.sandbox.form.create(a);c.initialized.then(function(){this.setFormData(b)}.bind(this))},setFormData:function(b){this.sandbox.form.setData(a,b).then(function(){this.sandbox.start(a)}.bind(this)).fail(function(a){this.sandbox.logger.error("An error occured when setting data!",a)}.bind(this))},setHeaderInformation:function(){var a="pim.attribute.title",c=[{title:"navigation.pim"},{title:"pim.attribute.title"}];this.options.data&&this.options.data.name&&(a=this.options.data.name),a=this.sandbox.util.cropTail(a,b),this.sandbox.emit("sulu.header.set-title",a),this.options.data&&this.options.data.id&&c.push({title:"#"+this.options.data.id}),this.sandbox.emit("sulu.header.set-breadcrumb",c)},setHeaderBar:function(a){if(a!==this.saved){var b=this.options.data&&this.options.data.id?"edit":"add";this.sandbox.emit("sulu.header.toolbar.state.change",b,a,!0)}this.saved=a},listenForChange:function(){this.sandbox.dom.on("#attribute-form","change",function(){this.setHeaderBar(!1)}.bind(this),"select"),this.sandbox.dom.on("#attribute-form","keyup",function(){this.setHeaderBar(!1)}.bind(this),"input, textarea"),this.sandbox.on("sulu.content.changed",function(){this.setHeaderBar(!1)}.bind(this)),this.sandbox.on("husky.select.attribute-types.selected.item",function(a){this.toggleValuesList(a),this.setHeaderBar(!1)}.bind(this))},toggleValuesList:function(){}}});