var Validate={defaults:{invalidMessage:"Invalid field value.",afterValidate:null,beforeValidate:null,onValid:null,onInvalid:null},handlers:[],init:function(){var self=this;document.addEventListener("submit",function(e){var form=e.target.closest("form");self.validate(form)||(e.preventDefault(),e.stopPropagation())}),document.addEventListener("change",function(e){self.validate(e.target)})},attach:function(selector,options){this.handlers.push({selector:selector,options:options})},options:function(element,append){var options=Object.assign({},this.defaults,append||{});return this.handlers.map(function(handler){element.matches(handler.selector)&&Object.assign(options,handler.options)}),options},check:function(name){if("FORM"===name.nodeName){var type=Array.from(name.querySelectorAll("[required]")),self=this;return 0===type.filter(function(field){return!self.validate(field)}).length}if(name.disabled)return!0;if(!name.required)return!0;var value=name.value,type=name.getAttribute("type");if("SELECT"===name.nodeName)return""!==value;if("checkbox"!=type&&"radio"!=type)return name.setCustomValidity(""),""!==value&&name.checkValidity();name=name.getAttribute("name");return 0!=document.querySelectorAll('input[name="'+name+'"]:checked').length},decorate:function(name,valid,options){var type=name.getAttribute("type"),parent=name.closest(".select, label"),elements=[name,parent];!type||"checkbox"!=type&&"radio"!=type||(name=name.getAttribute("name"),document.querySelectorAll('input[name="'+name+'"]').forEach(function(item){elements.push(item,item.closest(".select, label"))})),elements=elements.filter(Boolean),(elements=Array.from(new Set(elements))).map(function(item){item.setCustomValidity&&item.setCustomValidity(valid?"":options.invalidMessage),item.classList.add(valid?"valid":"invalid"),item.classList.remove(valid?"invalid":"valid")})},validate:function(element,valid){function runCallback(callback){"function"==typeof callback&&callback.apply(element,new Array(element,_options))}var _options=this.options(element,valid);runCallback(_options.beforeValidate);valid=this.check(element);return this.decorate(element,valid,_options),runCallback(valid?_options.onValid:_options.onInvalid),runCallback(_options.afterValidate),valid},form:function(form,options){return this.validate(form,options)},field:function(field,options){return this.validate(field,options)}};Validate.init();
//# sourceMappingURL=validate.js.map