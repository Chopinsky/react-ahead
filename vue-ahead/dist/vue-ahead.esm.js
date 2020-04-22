import axios from 'axios';

//
//
//
//
//
//
//
//
//

var style = {
	display: "none",
	backgroundColor: "transparent",
	width: "100%",
	height: "100%",
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: 100000,
};

var script = {
	props: {
		on: Boolean,
	},
	data: function () {
		return {
			style: Object.assign({}, style),
		};
	},
	watch: {
		on: function () {
			this.style.display = this.on ? "inherit" : "none";
		},
	},
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    Buffer.from(unescape(encodeURIComponent(JSON.stringify(css.map))).toString('base64')) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "control_input_shield",
    style: _vm.style,
    on: {
      mousedown: function($event) {
        return _vm.$emit("mousedown", $event)
      }
    }
  })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-238feabd_0", { source: "\n.control_input_shield[data-v-238feabd] {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tz-index: 100000;\n}\r\n\r\n", map: {"version":3,"sources":["F:\\GitHub\\react-ahead\\vue-ahead\\src\\components\\shield.vue"],"names":[],"mappings":";AAuCA;CACA,WAAA;CACA,YAAA;CACA,kBAAA;CACA,MAAA;CACA,OAAA;CACA,eAAA;AACA","file":"shield.vue","sourcesContent":["<template>\r\n<div\r\n  class=\"control_input_shield\" \r\n  :style=\"style\"\r\n  @mousedown=\"$emit('mousedown', $event)\"\r\n>  \r\n</div>\r\n</template>\r\n\r\n<script>\r\nconst style = {\r\n\tdisplay: \"none\",\r\n\tbackgroundColor: \"transparent\",\r\n\twidth: \"100%\",\r\n\theight: \"100%\",\r\n\tposition: \"absolute\",\r\n\ttop: 0,\r\n\tleft: 0,\r\n\tzIndex: 100000,\r\n};\r\n\r\nexport default {\r\n\tprops: {\r\n\t\ton: Boolean,\r\n\t},\r\n\tdata: function () {\r\n\t\treturn {\r\n\t\t\tstyle: Object.assign({}, style),\r\n\t\t};\r\n\t},\r\n\twatch: {\r\n\t\ton: function () {\r\n\t\t\tthis.style.display = this.on ? \"inherit\" : \"none\";\r\n\t\t},\r\n\t},\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.control_input_shield {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tz-index: 100000;\r\n}\r\n\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-238feabd";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
	props: {
		path: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			default: "16",
		},
		viewBox: {
			type: String,
			default: "0 0 18 18",
		},
	},
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      attrs: { "aria-hidden": "true", tabIndex: "0" },
      on: {
        click: function($event) {
          return _vm.$emit("click", $event)
        },
        keydown: function($event) {
          return _vm.$emit("keydown", $event)
        }
      }
    },
    [
      _c(
        "svg",
        {
          staticClass: "icon",
          attrs: {
            x: "0px",
            y: "0px",
            focusable: "false",
            "aria-hidden": "true",
            width: _vm.size,
            height: _vm.size,
            viewBox: _vm.viewBox
          }
        },
        [_c("path", { attrs: { d: _vm.path } })]
      )
    ]
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-5b244c58_0", { source: "\n.icon[data-v-5b244c58] {\r\n  display: inline-block;\r\n  fill: currentcolor;\r\n  line-height: 1;\r\n  stroke: currentcolor;\r\n  stroke-width: 0;\n}\r\n", map: {"version":3,"sources":["F:\\GitHub\\react-ahead\\vue-ahead\\src\\components\\controlIcon.vue"],"names":[],"mappings":";AA0CA;EACA,qBAAA;EACA,kBAAA;EACA,cAAA;EACA,oBAAA;EACA,eAAA;AACA","file":"controlIcon.vue","sourcesContent":["<template>\r\n<div\r\n  aria-hidden=\"true\"\r\n  tabIndex=\"0\"\r\n  @click=\"$emit('click', $event)\"\r\n  @keydown=\"$emit('keydown', $event)\"\r\n>\r\n  <svg\r\n    x=\"0px\" \r\n    y=\"0px\"\r\n    focusable=\"false\"\r\n    aria-hidden=\"true\"\r\n    class=\"icon\"\r\n    :width=\"size\"\r\n    :height=\"size\"\r\n    :viewBox=\"viewBox\"\r\n  >\r\n    <path :d=\"path\" />\r\n  </svg>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n\tprops: {\r\n\t\tpath: {\r\n\t\t\ttype: String,\r\n\t\t\trequired: true,\r\n\t\t},\r\n\t\tsize: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: \"16\",\r\n\t\t},\r\n\t\tviewBox: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: \"0 0 18 18\",\r\n\t\t},\r\n\t},\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.icon {\r\n  display: inline-block;\r\n  fill: currentcolor;\r\n  line-height: 1;\r\n  stroke: currentcolor;\r\n  stroke-width: 0;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = "data-v-5b244c58";
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var clearIconPath = "M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z";

var script$2 = {
	props: {
		display: Function,
		item: Object,
		index: Number,
	},
	components: {
		ControlIcon: __vue_component__$1,
	},
	data: function () {
		var ref = this.getDisplayText();
		var text = ref.text;
		var title = ref.title;
		return {
			text: text,
			title: title,
			iconPath: clearIconPath,
		};
	},
	methods: {
		getDisplayText: function () {
			var title = this.item.label || "...";
			var text = title;

			if (text && text.length > 8) {
				text = text.substr(0, 6) + "...";
			}

			return {
				text: text,
				title: title,
			};
		},
		handleRemovalKeydown: function (evt, key) {
			if (!evt) {
				return;
			}

			var keyCode = evt.keyCode;

			if (keyCode === 13 || keyCode === 32) {
				this.$emit('item-removal', evt, key);
				evt.preventDefault();
			}
      
			if (this.index === 0 && keyCode === 9 && evt.shiftKey) {
				this.$emit('special-key');
			}
		},
	},
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "selection_container" },
    [
      _c(
        "div",
        { staticClass: "selection_content", attrs: { title: _vm.title } },
        [_vm._v("\r\n    " + _vm._s(_vm.text) + "\r\n  ")]
      ),
      _vm._v(" "),
      _c("ControlIcon", {
        staticClass: "selection_removal",
        attrs: { title: "remove selection", path: _vm.iconPath },
        on: {
          keydown: function($event) {
            $event.stopPropagation();
            return _vm.handleRemovalKeydown($event)
          }
        },
        nativeOn: {
          mousedown: function($event) {
            $event.stopPropagation();
            return _vm.$emit("item-removal", $event)
          }
        }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-2db152f0_0", { source: "\n.selection_container {\r\n  background-color: rgb(230, 230, 230);\r\n  display: flex;\r\n  min-width: 0px;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  margin: 2px;\n}\n.selection_content {\r\n  color: rgb(51, 51, 51);\r\n  font-size: 85%;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  overflow: hidden;\r\n  padding: 2px 2px 2px 4px;\n}\n.selection_removal {\r\n  -webkit-box-align: center;\r\n  align-items: center;\r\n  cursor: pointer;\r\n  display: flex;\r\n  padding-left: 0;\r\n  padding-right: 2px;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\n}\n.selection_removal:hover {\r\n  background-color: rgb(255, 189, 173);\r\n  color: rgb(222, 53, 11);\n}\r\n", map: {"version":3,"sources":["F:\\GitHub\\react-ahead\\vue-ahead\\src\\components\\selectionItem.vue"],"names":[],"mappings":";AAwEA;EACA,oCAAA;EACA,aAAA;EACA,cAAA;EACA,sBAAA;EACA,kBAAA;EACA,WAAA;AACA;AAEA;EACA,sBAAA;EACA,cAAA;EACA,uBAAA;EACA,mBAAA;EACA,sBAAA;EACA,kBAAA;EACA,gBAAA;EACA,wBAAA;AACA;AAEA;EACA,yBAAA;EACA,mBAAA;EACA,eAAA;EACA,aAAA;EACA,eAAA;EACA,kBAAA;EACA,sBAAA;EACA,kBAAA;AACA;AAEA;EACA,oCAAA;EACA,uBAAA;AACA","file":"selectionItem.vue","sourcesContent":["<template>\r\n<div class=\"selection_container\">\r\n  <div class=\"selection_content\" :title=\"title\">\r\n    {{ text }}\r\n  </div>\r\n  <ControlIcon\r\n    class=\"selection_removal\"\r\n    title=\"remove selection\"\r\n    :path=\"iconPath\"\r\n    @mousedown.native.stop=\"$emit('item-removal', $event)\"\r\n    @keydown.stop=\"handleRemovalKeydown($event)\"\r\n  />\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport ControlIcon from './controlIcon.vue';\r\n\r\nconst clearIconPath = \"M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z\";\r\n\r\nexport default {\r\n\tprops: {\r\n\t\tdisplay: Function,\r\n\t\titem: Object,\r\n\t\tindex: Number,\r\n\t},\r\n\tcomponents: {\r\n\t\tControlIcon,\r\n\t},\r\n\tdata: function () {\r\n\t\tconst { text, title } = this.getDisplayText();\r\n\t\treturn {\r\n\t\t\ttext,\r\n\t\t\ttitle,\r\n\t\t\ticonPath: clearIconPath,\r\n\t\t};\r\n\t},\r\n\tmethods: {\r\n\t\tgetDisplayText: function () {\r\n\t\t\tconst title = this.item.label || \"...\";\r\n\t\t\tlet text = title;\r\n\r\n\t\t\tif (text && text.length > 8) {\r\n\t\t\t\ttext = text.substr(0, 6) + \"...\";\r\n\t\t\t}\r\n\r\n\t\t\treturn {\r\n\t\t\t\ttext,\r\n\t\t\t\ttitle,\r\n\t\t\t};\r\n\t\t},\r\n\t\thandleRemovalKeydown: function (evt, key) {\r\n\t\t\tif (!evt) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tconst { keyCode } = evt;\r\n\r\n\t\t\tif (keyCode === 13 || keyCode === 32) {\r\n\t\t\t\tthis.$emit('item-removal', evt, key);\r\n\t\t\t\tevt.preventDefault();\r\n\t\t\t}\r\n      \r\n\t\t\tif (this.index === 0 && keyCode === 9 && evt.shiftKey) {\r\n\t\t\t\tthis.$emit('special-key');\r\n\t\t\t}\r\n\t\t},\r\n\t},\r\n};\r\n</script>\r\n\r\n<style>\r\n.selection_container {\r\n  background-color: rgb(230, 230, 230);\r\n  display: flex;\r\n  min-width: 0px;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  margin: 2px;\r\n}\r\n\r\n.selection_content {\r\n  color: rgb(51, 51, 51);\r\n  font-size: 85%;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  overflow: hidden;\r\n  padding: 2px 2px 2px 4px;\r\n}\r\n\r\n.selection_removal {\r\n  -webkit-box-align: center;\r\n  align-items: center;\r\n  cursor: pointer;\r\n  display: flex;\r\n  padding-left: 0;\r\n  padding-right: 2px;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n}\r\n\r\n.selection_removal:hover {\r\n  background-color: rgb(255, 189, 173);\r\n  color: rgb(222, 53, 11);\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

var defaultGroupName = 'default';

var getItemLabel = function (item) {
	var src = typeof item === 'object' ? item['label'] : item;

	if (typeof src !== 'string') {
		src = src.toString();
	}

	return src;
};

var getDisplay = function (item, display, type) {
	var label = getItemLabel(item);

	if (display) {
		label = display(label, item, type);
	}

	if (typeof label !== 'string') {
		return "...";
	}

	return label;
};

var getGroupKey = function (item) {
	var groupKey =
    typeof item === 'object' ? item['group'] : defaultGroupName;

	if (typeof groupKey !== 'string' && typeof groupKey !== 'number') {
		groupKey = defaultGroupName;
	}

	groupKey = (groupKey.toString() || defaultGroupName);
	return groupKey.toUpperCase();
};

var utils = {
	getDisplay: getDisplay,
	getGroupKey: getGroupKey,
	getItemLabel: getItemLabel,
};
var utils_1 = utils.getDisplay;
var utils_3 = utils.getItemLabel;

//

var inputStyle = {
	boxSizing: "content-box",
	color: "inherit",
	fontSize: "inherit",
	fontFamily: "inherit",
	fontWeight: "inherit",
	minWidth: "1px",
	width: "2px",
	height: "100%",
	outline: "none",
	border: 0,
};

var contentHolderStyle = {
	position: "absolute",
	top: "0",
	left: "0",
	visibility: "hidden",
	height: "0",
	width: "min-content",
	overflow: "auto",
	whiteSpace: "pre",
	fontSize: "inherit",
	fontFamily: "inherit",
	fontWeight: "inherit",
	fontStyle: "normal",
	letterSpacing: "normal",
	textTransform: "none",
};

var fieldStyle = {
	display: "inline-block",
	padding: "0 0 1px 1px",
};

var clearIconPath$1 = "M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z";
var dropdownIconPath = "M 4.516 7.548 c 0.436 -0.446 1.043 -0.481 1.576 0 l 3.908 3.747 l 3.908 -3.747 c 0.533 -0.481 1.141 -0.446 1.574 0 c 0.436 0.445 0.408 1.197 0 1.615 c -0.406 0.418 -4.695 4.502 -4.695 4.502 c -0.217 0.223 -0.502 0.335 -0.787 0.335 s -0.57 -0.112 -0.789 -0.335 c 0 0 -4.287 -4.084 -4.695 -4.502 s -0.436 -1.17 0 -1.615 Z";

var script$3 = {
	props: {
		active: Boolean,
		customClassNames: Object,
		display: Function,
		isMulti: Boolean,
		placeholder: {
			type: String,
			default: '',
		},
		selection: Array,
		value: {
			type: String,
			default: '',
		},
	},
	components: {
		ControlIcon: __vue_component__$1,
		SelectionItem: __vue_component__$2,
	},
	data: function () {
		var ref = this.getPlaceholder();
		var placeholder = ref.placeholder;
		var phContent = ref.phContent;

		return {
			styles: {
				container: contentHolderStyle,
				input: Object.assign({}, inputStyle),
				field: fieldStyle,
			},
			classes: {
				wrapper: this.getWrapperClassName(),
				placeholder: placeholder,
			},
			path: {
				clear: clearIconPath$1,
				dropdown: dropdownIconPath,
			},
			width: 2,
			phContent: phContent,
		};
	},
	methods: {
		clear: function () {
			this.$refs.contentHolder.innerText = '';
			this.styles.input.width = "2px";
		},
		focus: function () {
			this.$refs.input.focus();
		},
		select: function () {
			if (this.value === '') {
				return;
			}

			var ref = this.$refs;
			var input = ref.input;
			var start = input.selectionStart;
			var end = input.selectionEnd;

			if (start < end) {
				input.setSelectionRange(this.value.length, this.value.length);
			} else {
				input.select();
			}
		},
		getWrapperClassName: function () {
			var wrapperClassName = "control_wrapper";
			 
			if (this.customClassNames && this.customClassNames.input) {
				wrapperClassName += " " + this.customClassNames.input;
			}

			if (this.active) {
				if (this.customClassNames && this.customClassNames.active) {
					wrapperClassName += " " + this.customClassNames.active;
				} else {
					wrapperClassName += " control_active";
				}
			}

			return wrapperClassName;
		},
		getSelectionKey: function (item, index) {
			return index.toString() + '#' + utils_3(item).substr(0, 5);
		},
		getPlaceholder: function () {
			var ph = {
				placeholder: "placeholder",
				phContent: {
					content: '',
					title: '',
				},
			};

			if (this.value !== '') {
				ph.phContent.content = '';
				ph.phContent.title = this.value;

				return ph;
			}

			if (!this.isMulti && this.selection.length === 1) {
				ph.placeholder += " placeholder_values";
				ph.phContent.content = utils_1(this.selection[0], this.display, 'selection');
			} else if (this.selection.length === 0) {
				ph.phContent.content = this.placeholder || '';
			}

			ph.phContent.title = ph.phContent.content;

			if (ph.phContent.content && ph.phContent.content.length > 24) {
				ph.phContent.content = ph.phContent.content.substr(0, 21) + " ...";
			}

			return ph;
		},
		handleFocus: function (evt) {
			// check if it's the icons that get the focus
			var focusInput = evt && evt.target && evt.target.nodeName === "INPUT";

			// bubble up the icon focus information
			this.$emit('focus', evt, focusInput ? 'input' : 'icon');
		},
		handleInput: function (evt) {
			var val = evt && evt.target && evt.target.value || '';

			this.$refs.contentHolder.innerText = val;
			this.styles.input.width = (this.$refs.contentHolder.offsetWidth + 2) + "px";

			this.$emit('change', evt, val);
		},
		handleKeydown: function (evt, keyCode) {
			if (!keyCode) {
				if (!evt) {
					return;
				}

				keyCode = evt.keyCode || 0;        
			}
      
			switch (keyCode) {
				case 8:
					// backspace
					if (this.isMulti && this.value === '' && this.selection.length > 0) {
						// this.$emit('special-key', 'backspace');
						var item = this.selection[this.selection.length - 1];
						this.$emit('item-removal', evt, item);
					}

					break;

				case 9:
					// tab
					if (!evt.shiftKey) {
						this.$emit('special-key', 'tab');
					}

					break;

				case 13:
					// enter: selection
					evt.preventDefault();
					this.$emit('special-key', 'enter');

					break;

				case 27:
					// esc
					evt.preventDefault();
					this.$emit('special-key', 'esc');

					break;          
          
				case 38:
					// arrow up
				case 40:
					// arrow down
					evt.preventDefault();
					this.$emit('special-key', keyCode === 38 ? 'up' : 'down');

					break;
			}
		},
		handleIconKeydown: function (evt, type) {
			var keyCode = evt.keyCode;

			switch (keyCode) {
				case 13:
					// space
				case 32:
					// enter
					this.$emit('special-key', type, type === 'clear' ? true : false);
					break;

				case 38:
					// up
				case 40:
					// down
					this.$emit('special-key', keyCode === 38 ? 'up' : 'down', true);
					break;
      
				case 9:
					// tab
					if (type === 'dropdown' && !evt.shiftKey) {
						this.$emit('special-key', 'tab-out');
					}

					break;
			}
		},
	},
	watch: {
		value: function () {
			if (this.value === '') {
				// reset the input control width
				this.clear();
			}

			// update the display style and/or content
			var ref = this.getPlaceholder();
			var placeholder = ref.placeholder;
			var phContent = ref.phContent;

			this.classes.placeholder = placeholder;
			this.phContent = phContent;
		},
		selection: function () {
			var ref = this.getPlaceholder();
			var placeholder = ref.placeholder;
			var phContent = ref.phContent;

			this.classes.placeholder = placeholder;
			this.phContent = phContent;
		},
		active: function () {
			this.classes.wrapper = this.getWrapperClassName();
		},
		customClassNames: function () {
			this.classes.wrapper = this.getWrapperClassName();
		},
	}
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: _vm.classes.wrapper,
      on: {
        "!dblclick": function($event) {
          $event.stopPropagation();
          return _vm.$emit("dblclick", $event)
        },
        mousedown: function($event) {
          $event.stopPropagation();
          return _vm.$emit("mousedown", $event)
        },
        "!focus": function($event) {
          return _vm.handleFocus($event)
        },
        "!blur": function($event) {
          return _vm.$emit("blur", $event)
        }
      }
    },
    [
      _c(
        "div",
        {
          staticClass: "input_container",
          attrs: { title: _vm.phContent.title }
        },
        [
          _vm.phContent.content !== ""
            ? _c("div", { class: _vm.classes.placeholder }, [
                _vm._v(
                  "\r\n      " + _vm._s(_vm.phContent.content) + "\r\n    "
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.selection, function(item, index) {
            return _c(
              "div",
              { key: _vm.getSelectionKey(item, index) },
              [
                _vm.isMulti
                  ? _c("SelectionItem", {
                      attrs: { item: item, index: index },
                      on: {
                        "item-removal": function($event) {
                          return _vm.$emit("item-removal", $event, item)
                        },
                        "special-key": function($event) {
                          return _vm.$emit("special-key", "tab-out")
                        }
                      }
                    })
                  : _vm._e()
              ],
              1
            )
          }),
          _vm._v(" "),
          _c("div", { style: _vm.styles.field }, [
            _c("input", {
              ref: "input",
              style: _vm.styles.input,
              attrs: {
                autoCapitalize: "none",
                autoComplete: "off",
                autoCorrect: "off",
                spellCheck: "false",
                type: "text"
              },
              domProps: { value: _vm.value },
              on: { keydown: _vm.handleKeydown, input: _vm.handleInput }
            }),
            _vm._v(" "),
            _c("div", { ref: "contentHolder", style: _vm.styles.container })
          ])
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "icons_container" },
        [
          _c("ControlIcon", {
            staticClass: "action_icon clear_icon",
            attrs: { title: "clear all", path: _vm.path.clear },
            on: {
              keydown: function($event) {
                $event.stopPropagation();
                return _vm.handleIconKeydown($event, "clear")
              }
            },
            nativeOn: {
              mousedown: function($event) {
                $event.stopPropagation();
                return _vm.$emit("icon-event", $event, "clear")
              }
            }
          }),
          _vm._v(" "),
          _c("span", { staticClass: "action_icon_separator" }),
          _vm._v(" "),
          _c("ControlIcon", {
            staticClass: "action_icon",
            attrs: { title: "dropdown menu", path: _vm.path.dropdown },
            on: {
              keydown: function($event) {
                $event.stopPropagation();
                return _vm.handleIconKeydown($event, "dropdown")
              }
            },
            nativeOn: {
              mousedown: function($event) {
                $event.stopPropagation();
                return _vm.$emit("icon-event", $event, "dropdown")
              }
            }
          })
        ],
        1
      )
    ]
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-113a64dd_0", { source: "\n.control_wrapper[data-v-113a64dd] {\r\n  -webkit-box-align: center;\r\n  -webkit-box-pack: justify;\r\n  padding-left: 6px;\r\n  padding-right: 4px;\r\n  min-height: 18px;\r\n  align-items: center;\r\n  background-color: rgb(255, 255, 255);\r\n  border-radius: 2px;\r\n  border: 1px solid rgb(204, 204, 204);\r\n  cursor: text;\r\n  position: relative;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: space-between;\r\n  transition: all 100ms ease 0s;\r\n  outline: 0px !important;\n}\n.control_wrapper.control_active[data-v-113a64dd] {\r\n  border: 1px solid blue;\n}\n.input_container[data-v-113a64dd] {\r\n  padding: 2px 0;\r\n  color: rgb(51, 51, 51);\r\n  position: relative;\r\n  display: flex;\r\n  flex: 1 1 0%;\r\n  flex-wrap: wrap;\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n  visibility: visible;\r\n  box-sizing: border-box;\r\n  width: 100%;\n}\n.placeholder[data-v-113a64dd] {\r\n  position: absolute;\r\n  top: 50%;\r\n  color: rgb(128, 128, 128);\r\n\tmargin: 0;\r\n\tpadding: 0 1px;\r\n  transform: translateY(-50%);\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\n}\n.placeholder.placeholder_values[data-v-113a64dd] {\r\n  color: inherit;\n}\n.icons_container[data-v-113a64dd] {\r\n  -webkit-box-align: center;\r\n  align-items: center;\r\n  align-self: stretch;\r\n  display: flex;\r\n  flex-shrink: 0;\r\n  box-sizing: border-box;\n}\n.action_icon[data-v-113a64dd] {\r\n  color: rgb(204, 204, 204);\r\n  display: flex;\r\n  box-sizing: border-box;\r\n  padding: 4px 2px;\r\n  transition: color 150ms ease 0s;\n}\n.action_icon.clear_icon[data-v-113a64dd] {\r\n  padding-right: 4px;\n}\n.action_icon[data-v-113a64dd]:hover {\r\n  cursor: pointer;\r\n  color: rgb(153, 153, 153);\n}\n.action_icon[data-v-113a64dd]:active {\r\n  outline: none !important;\r\n  color: rgb(92, 92, 92);\n}\n.action_icon[data-v-113a64dd]:focus {\r\n  color: rgb(153, 153, 153);\r\n  outline: 2px dotted gray;\n}\n.action_icon_separator[data-v-113a64dd] {\r\n  align-self: stretch;\r\n  background-color: rgb(204, 204, 204);\r\n  margin: 8px 2px;\r\n  width: 1px;\r\n  box-sizing: border-box;\n}\r\n", map: {"version":3,"sources":["F:\\GitHub\\react-ahead\\vue-ahead\\src\\components\\input.vue"],"names":[],"mappings":";AA0WA;EACA,yBAAA;EACA,yBAAA;EACA,iBAAA;EACA,kBAAA;EACA,gBAAA;EACA,mBAAA;EACA,oCAAA;EACA,kBAAA;EACA,oCAAA;EACA,YAAA;EACA,kBAAA;EACA,sBAAA;EACA,aAAA;EACA,eAAA;EACA,8BAAA;EACA,6BAAA;EACA,uBAAA;AACA;AAEA;EACA,sBAAA;AACA;AAEA;EACA,cAAA;EACA,sBAAA;EACA,kBAAA;EACA,aAAA;EACA,YAAA;EACA,eAAA;EACA,sBAAA;EACA,gBAAA;EACA,mBAAA;EACA,sBAAA;EACA,WAAA;AACA;AAEA;EACA,kBAAA;EACA,QAAA;EACA,yBAAA;CACA,SAAA;CACA,cAAA;EACA,2BAAA;EACA,sBAAA;EACA,gBAAA;EACA,uBAAA;AACA;AAEA;EACA,cAAA;AACA;AAEA;EACA,yBAAA;EACA,mBAAA;EACA,mBAAA;EACA,aAAA;EACA,cAAA;EACA,sBAAA;AACA;AAEA;EACA,yBAAA;EACA,aAAA;EACA,sBAAA;EACA,gBAAA;EACA,+BAAA;AACA;AAEA;EACA,kBAAA;AACA;AAEA;EACA,eAAA;EACA,yBAAA;AACA;AAEA;EACA,wBAAA;EACA,sBAAA;AACA;AAEA;EACA,yBAAA;EACA,wBAAA;AACA;AAEA;EACA,mBAAA;EACA,oCAAA;EACA,eAAA;EACA,UAAA;EACA,sBAAA;AACA","file":"input.vue","sourcesContent":["<template>\r\n<div \r\n  :class=\"classes.wrapper\"\r\n\t@dblclick.capture.stop=\"$emit('dblclick', $event)\"\r\n  @mousedown.stop=\"$emit('mousedown', $event)\"\r\n  @focus.capture=\"handleFocus\"\r\n  @blur.capture=\"$emit('blur', $event)\"\r\n>\r\n  <div \r\n    class=\"input_container\"\r\n    :title=\"phContent.title\"\r\n  >\r\n    <div \r\n      v-if=\"phContent.content !== ''\"\r\n      :class=\"classes.placeholder\"\r\n    >\r\n      {{ phContent.content }}\r\n    </div>\r\n\r\n    <div\r\n      v-for=\"(item, index) in selection\"\r\n      :key=\"getSelectionKey(item, index)\"\r\n    >\r\n      <SelectionItem \r\n        v-if=\"isMulti\"\r\n        :item=\"item\"\r\n        :index=\"index\"\r\n        @item-removal=\"$emit('item-removal', $event, item)\"\r\n        @special-key=\"$emit('special-key', 'tab-out')\"\r\n      />\r\n    </div>\r\n\r\n    <div :style=\"styles.field\">\r\n      <input           \r\n        autoCapitalize=\"none\"\r\n        autoComplete=\"off\"\r\n        autoCorrect=\"off\"\r\n        spellCheck=\"false\"\r\n        type=\"text\" \r\n        ref=\"input\"\r\n        :value=\"value\"\r\n        :style=\"styles.input\"\r\n        @keydown=\"handleKeydown\"\r\n        @input=\"handleInput\"\r\n      />\r\n      <div \r\n        ref=\"contentHolder\"\r\n        :style=\"styles.container\"\r\n      >\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"icons_container\">\r\n    <ControlIcon \r\n      class=\"action_icon clear_icon\"\r\n      title=\"clear all\"\r\n      :path=\"path.clear\"\r\n      @mousedown.native.stop=\"$emit('icon-event', $event, 'clear')\"\r\n      @keydown.stop=\"handleIconKeydown($event, 'clear')\"\r\n    />\r\n    <span class=\"action_icon_separator\"></span>\r\n    <ControlIcon\r\n      class=\"action_icon\" \r\n      title=\"dropdown menu\"\r\n      :path=\"path.dropdown\"\r\n      @mousedown.native.stop=\"$emit('icon-event', $event, 'dropdown')\"\r\n      @keydown.stop=\"handleIconKeydown($event, 'dropdown')\"\r\n    />\r\n  </div>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport SelectionItem from './selectionItem.vue';\r\nimport ControlIcon from './controlIcon.vue';\r\nimport { getItemLabel, getDisplay } from '../helpers/utils';\r\n\r\nconst inputStyle = {\r\n\tboxSizing: \"content-box\",\r\n\tcolor: \"inherit\",\r\n\tfontSize: \"inherit\",\r\n\tfontFamily: \"inherit\",\r\n\tfontWeight: \"inherit\",\r\n\tminWidth: \"1px\",\r\n\twidth: \"2px\",\r\n\theight: \"100%\",\r\n\toutline: \"none\",\r\n\tborder: 0,\r\n};\r\n\r\nconst contentHolderStyle = {\r\n\tposition: \"absolute\",\r\n\ttop: \"0\",\r\n\tleft: \"0\",\r\n\tvisibility: \"hidden\",\r\n\theight: \"0\",\r\n\twidth: \"min-content\",\r\n\toverflow: \"auto\",\r\n\twhiteSpace: \"pre\",\r\n\tfontSize: \"inherit\",\r\n\tfontFamily: \"inherit\",\r\n\tfontWeight: \"inherit\",\r\n\tfontStyle: \"normal\",\r\n\tletterSpacing: \"normal\",\r\n\ttextTransform: \"none\",\r\n};\r\n\r\nconst fieldStyle = {\r\n\tdisplay: \"inline-block\",\r\n\tpadding: \"0 0 1px 1px\",\r\n};\r\n\r\nconst clearIconPath = \"M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z\";\r\nconst dropdownIconPath = \"M 4.516 7.548 c 0.436 -0.446 1.043 -0.481 1.576 0 l 3.908 3.747 l 3.908 -3.747 c 0.533 -0.481 1.141 -0.446 1.574 0 c 0.436 0.445 0.408 1.197 0 1.615 c -0.406 0.418 -4.695 4.502 -4.695 4.502 c -0.217 0.223 -0.502 0.335 -0.787 0.335 s -0.57 -0.112 -0.789 -0.335 c 0 0 -4.287 -4.084 -4.695 -4.502 s -0.436 -1.17 0 -1.615 Z\";\r\n\r\nexport default {\r\n\tprops: {\r\n\t\tactive: Boolean,\r\n\t\tcustomClassNames: Object,\r\n\t\tdisplay: Function,\r\n\t\tisMulti: Boolean,\r\n\t\tplaceholder: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: '',\r\n\t\t},\r\n\t\tselection: Array,\r\n\t\tvalue: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: '',\r\n\t\t},\r\n\t},\r\n\tcomponents: {\r\n\t\tControlIcon,\r\n\t\tSelectionItem,\r\n\t},\r\n\tdata: function () {\r\n\t\tconst { placeholder, phContent } = this.getPlaceholder();\r\n\r\n\t\treturn {\r\n\t\t\tstyles: {\r\n\t\t\t\tcontainer: contentHolderStyle,\r\n\t\t\t\tinput: Object.assign({}, inputStyle),\r\n\t\t\t\tfield: fieldStyle,\r\n\t\t\t},\r\n\t\t\tclasses: {\r\n\t\t\t\twrapper: this.getWrapperClassName(),\r\n\t\t\t\tplaceholder,\r\n\t\t\t},\r\n\t\t\tpath: {\r\n\t\t\t\tclear: clearIconPath,\r\n\t\t\t\tdropdown: dropdownIconPath,\r\n\t\t\t},\r\n\t\t\twidth: 2,\r\n\t\t\tphContent,\r\n\t\t};\r\n\t},\r\n\tmethods: {\r\n\t\tclear: function () {\r\n\t\t\tthis.$refs.contentHolder.innerText = '';\r\n\t\t\tthis.styles.input.width = \"2px\";\r\n\t\t},\r\n\t\tfocus: function () {\r\n\t\t\tthis.$refs.input.focus();\r\n\t\t},\r\n\t\tselect: function () {\r\n\t\t\tif (this.value === '') {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tconst { input } = this.$refs;\r\n\t\t\tconst start = input.selectionStart;\r\n\t\t\tconst end = input.selectionEnd;\r\n\r\n\t\t\tif (start < end) {\r\n\t\t\t\tinput.setSelectionRange(this.value.length, this.value.length);\r\n\t\t\t} else {\r\n\t\t\t\tinput.select();\r\n\t\t\t}\r\n\t\t},\r\n\t\tgetWrapperClassName: function () {\r\n\t\t\tlet wrapperClassName = \"control_wrapper\";\r\n\t\t\t \r\n\t\t\tif (this.customClassNames && this.customClassNames.input) {\r\n\t\t\t\twrapperClassName += \" \" + this.customClassNames.input;\r\n\t\t\t}\r\n\r\n\t\t\tif (this.active) {\r\n\t\t\t\tif (this.customClassNames && this.customClassNames.active) {\r\n\t\t\t\t\twrapperClassName += \" \" + this.customClassNames.active;\r\n\t\t\t\t} else {\r\n\t\t\t\t\twrapperClassName += \" control_active\";\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\treturn wrapperClassName;\r\n\t\t},\r\n\t\tgetSelectionKey: function (item, index) {\r\n\t\t\treturn index.toString() + '#' + getItemLabel(item).substr(0, 5);\r\n\t\t},\r\n\t\tgetPlaceholder: function () {\r\n\t\t\tconst ph = {\r\n\t\t\t\tplaceholder: \"placeholder\",\r\n\t\t\t\tphContent: {\r\n\t\t\t\t\tcontent: '',\r\n\t\t\t\t\ttitle: '',\r\n\t\t\t\t},\r\n\t\t\t};\r\n\r\n\t\t\tif (this.value !== '') {\r\n\t\t\t\tph.phContent.content = '';\r\n\t\t\t\tph.phContent.title = this.value;\r\n\r\n\t\t\t\treturn ph;\r\n\t\t\t}\r\n\r\n\t\t\tif (!this.isMulti && this.selection.length === 1) {\r\n\t\t\t\tph.placeholder += \" placeholder_values\";\r\n\t\t\t\tph.phContent.content = getDisplay(this.selection[0], this.display, 'selection');\r\n\t\t\t} else if (this.selection.length === 0) {\r\n\t\t\t\tph.phContent.content = this.placeholder || '';\r\n\t\t\t}\r\n\r\n\t\t\tph.phContent.title = ph.phContent.content;\r\n\r\n\t\t\tif (ph.phContent.content && ph.phContent.content.length > 24) {\r\n\t\t\t\tph.phContent.content = ph.phContent.content.substr(0, 21) + \" ...\";\r\n\t\t\t}\r\n\r\n\t\t\treturn ph;\r\n\t\t},\r\n\t\thandleFocus: function (evt) {\r\n\t\t\t// check if it's the icons that get the focus\r\n\t\t\tlet focusInput = evt && evt.target && evt.target.nodeName === \"INPUT\";\r\n\r\n\t\t\t// bubble up the icon focus information\r\n\t\t\tthis.$emit('focus', evt, focusInput ? 'input' : 'icon');\r\n\t\t},\r\n\t\thandleInput: function (evt) {\r\n\t\t\tconst val = evt && evt.target && evt.target.value || '';\r\n\r\n\t\t\tthis.$refs.contentHolder.innerText = val;\r\n\t\t\tthis.styles.input.width = `${this.$refs.contentHolder.offsetWidth + 2}px`;\r\n\r\n\t\t\tthis.$emit('change', evt, val);\r\n\t\t},\r\n\t\thandleKeydown: function (evt, keyCode) {\r\n\t\t\tif (!keyCode) {\r\n\t\t\t\tif (!evt) {\r\n\t\t\t\t\treturn;\r\n\t\t\t\t}\r\n\r\n\t\t\t\tkeyCode = evt.keyCode || 0;        \r\n\t\t\t}\r\n      \r\n\t\t\tswitch (keyCode) {\r\n\t\t\t\tcase 8:\r\n\t\t\t\t\t// backspace\r\n\t\t\t\t\tif (this.isMulti && this.value === '' && this.selection.length > 0) {\r\n\t\t\t\t\t\t// this.$emit('special-key', 'backspace');\r\n\t\t\t\t\t\tconst item = this.selection[this.selection.length - 1];\r\n\t\t\t\t\t\tthis.$emit('item-removal', evt, item);\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 9:\r\n\t\t\t\t\t// tab\r\n\t\t\t\t\tif (!evt.shiftKey) {\r\n\t\t\t\t\t\tthis.$emit('special-key', 'tab');\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 13:\r\n\t\t\t\t\t// enter: selection\r\n\t\t\t\t\tevt.preventDefault();\r\n\t\t\t\t\tthis.$emit('special-key', 'enter');\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 27:\r\n\t\t\t\t\t// esc\r\n\t\t\t\t\tevt.preventDefault();\r\n\t\t\t\t\tthis.$emit('special-key', 'esc');\r\n\r\n\t\t\t\t\tbreak;          \r\n          \r\n\t\t\t\tcase 38:\r\n\t\t\t\t\t// arrow up\r\n\t\t\t\tcase 40:\r\n\t\t\t\t\t// arrow down\r\n\t\t\t\t\tevt.preventDefault();\r\n\t\t\t\t\tthis.$emit('special-key', keyCode === 38 ? 'up' : 'down');\r\n\r\n\t\t\t\t\tbreak;\r\n      \r\n\t\t\t\tdefault:\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t},\r\n\t\thandleIconKeydown: function (evt, type) {\r\n\t\t\tconst {keyCode} = evt;\r\n\r\n\t\t\tswitch (keyCode) {\r\n\t\t\t\tcase 13:\r\n\t\t\t\t\t// space\r\n\t\t\t\tcase 32:\r\n\t\t\t\t\t// enter\r\n\t\t\t\t\tthis.$emit('special-key', type, type === 'clear' ? true : false);\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 38:\r\n\t\t\t\t\t// up\r\n\t\t\t\tcase 40:\r\n\t\t\t\t\t// down\r\n\t\t\t\t\tthis.$emit('special-key', keyCode === 38 ? 'up' : 'down', true);\r\n\t\t\t\t\tbreak;\r\n      \r\n\t\t\t\tcase 9:\r\n\t\t\t\t\t// tab\r\n\t\t\t\t\tif (type === 'dropdown' && !evt.shiftKey) {\r\n\t\t\t\t\t\tthis.$emit('special-key', 'tab-out');\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tdefault:\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t},\r\n\t},\r\n\twatch: {\r\n\t\tvalue: function () {\r\n\t\t\tif (this.value === '') {\r\n\t\t\t\t// reset the input control width\r\n\t\t\t\tthis.clear();\r\n\t\t\t}\r\n\r\n\t\t\t// update the display style and/or content\r\n\t\t\tconst { placeholder, phContent } = this.getPlaceholder();\r\n\r\n\t\t\tthis.classes.placeholder = placeholder;\r\n\t\t\tthis.phContent = phContent;\r\n\t\t},\r\n\t\tselection: function () {\r\n\t\t\tconst { placeholder, phContent } = this.getPlaceholder();\r\n\r\n\t\t\tthis.classes.placeholder = placeholder;\r\n\t\t\tthis.phContent = phContent;\r\n\t\t},\r\n\t\tactive: function () {\r\n\t\t\tthis.classes.wrapper = this.getWrapperClassName();\r\n\t\t},\r\n\t\tcustomClassNames: function () {\r\n\t\t\tthis.classes.wrapper = this.getWrapperClassName();\r\n\t\t},\r\n\t}\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.control_wrapper {\r\n  -webkit-box-align: center;\r\n  -webkit-box-pack: justify;\r\n  padding-left: 6px;\r\n  padding-right: 4px;\r\n  min-height: 18px;\r\n  align-items: center;\r\n  background-color: rgb(255, 255, 255);\r\n  border-radius: 2px;\r\n  border: 1px solid rgb(204, 204, 204);\r\n  cursor: text;\r\n  position: relative;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: space-between;\r\n  transition: all 100ms ease 0s;\r\n  outline: 0px !important;\r\n}\r\n\r\n.control_wrapper.control_active {\r\n  border: 1px solid blue;\r\n}\r\n\r\n.input_container {\r\n  padding: 2px 0;\r\n  color: rgb(51, 51, 51);\r\n  position: relative;\r\n  display: flex;\r\n  flex: 1 1 0%;\r\n  flex-wrap: wrap;\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n  visibility: visible;\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n}\r\n\r\n.placeholder {\r\n  position: absolute;\r\n  top: 50%;\r\n  color: rgb(128, 128, 128);\r\n\tmargin: 0;\r\n\tpadding: 0 1px;\r\n  transform: translateY(-50%);\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.placeholder.placeholder_values {\r\n  color: inherit;\r\n}\r\n\r\n.icons_container {\r\n  -webkit-box-align: center;\r\n  align-items: center;\r\n  align-self: stretch;\r\n  display: flex;\r\n  flex-shrink: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.action_icon {\r\n  color: rgb(204, 204, 204);\r\n  display: flex;\r\n  box-sizing: border-box;\r\n  padding: 4px 2px;\r\n  transition: color 150ms ease 0s;\r\n}\r\n\r\n.action_icon.clear_icon {\r\n  padding-right: 4px;\r\n}\r\n\r\n.action_icon:hover {\r\n  cursor: pointer;\r\n  color: rgb(153, 153, 153);\r\n}\r\n\r\n.action_icon:active {\r\n  outline: none !important;\r\n  color: rgb(92, 92, 92);\r\n}\r\n\r\n.action_icon:focus {\r\n  color: rgb(153, 153, 153);\r\n  outline: 2px dotted gray;\r\n}\r\n\r\n.action_icon_separator {\r\n  align-self: stretch;\r\n  background-color: rgb(204, 204, 204);\r\n  margin: 8px 2px;\r\n  width: 1px;\r\n  box-sizing: border-box;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = "data-v-113a64dd";
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$4 = {
	props: {
		active: Boolean,
		highlight: String,
		item: Object,
		index: Number,
	},
	data: function () {
		return {
			className: this.getClassName(),
			content: this.getDisplay(),
			styles: {
				text: {
					padding: 0,
					margin: 0,
					opacity: this.highlight ? 0.8 : 1,
				},
				hl: {
					padding: 0,
					margin: 0,
					fontWeight: 600,
					textDecoration: "underline",
				},
			}
		};
	},
	methods: {
		getClassName: function () {
			var base = this.active ? "menu_option menu_option_active" : "menu_option";

			if (this.class && this.active) {
				base += " " + this.class;
			}

			return base;
		},
		getDisplay: function () {
			var base = utils_3(this.item);

			if (this.highlight && base) {
				var src = base.trim().toLowerCase();
				var tgt = this.highlight.trim().toLowerCase();
				var pos = src.indexOf(tgt);

				if (pos >= 0) {
					return [
						pos === 0 ? null : base.substring(0, pos),
						base.substring(pos, pos + tgt.length),
						base.substring(pos + tgt.length) ];
				}
			}

			return [base, null, null];
		},
	},
	watch: {
		active: function () {
			this.className = this.getClassName();

			if (this.active) {
				var ref = this.$refs.elem;
				var offsetTop = ref.offsetTop;
				var offsetHeight = ref.offsetHeight;
				this.$emit('item-activated', offsetTop, offsetHeight);
			}
		},
		highlight: function () {
			this.content = this.getDisplay();
			this.styles.text['opacity'] = this.highlight ? 0.8 : 1;
		},
	},
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      ref: "elem",
      class: _vm.className,
      on: {
        "!mouseover": function($event) {
          return _vm.$emit("mouseover", $event, _vm.index)
        },
        mousedown: function($event) {
          return _vm.$emit("mousedown", $event, _vm.index)
        }
      }
    },
    [
      _c("span", { style: _vm.styles.text }, [_vm._v(_vm._s(_vm.content[0]))]),
      _vm.content[1]
        ? _c("span", { style: _vm.styles.hl }, [_vm._v(_vm._s(_vm.content[1]))])
        : _vm._e(),
      _vm.content[2]
        ? _c("span", { style: _vm.styles.text }, [
            _vm._v(_vm._s(_vm.content[2]))
          ])
        : _vm._e()
    ]
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-943d9294_0", { source: "\n.menu_option[data-v-943d9294] {\r\n  background-color: transparent;\r\n  color: inherit;\r\n  cursor: default;\r\n  display: block;\r\n  font-size: inherit;\r\n  width: 100%;\r\n  user-select: none;\r\n  box-sizing: border-box;\r\n  padding: 6px 12px;\n}\n.menu_option.menu_option_active[data-v-943d9294] {\r\n  background-color: rgb(222, 235, 255);\n}\r\n", map: {"version":3,"sources":["F:\\GitHub\\react-ahead\\vue-ahead\\src\\components\\dropdownItem.vue"],"names":[],"mappings":";AAwFA;EACA,6BAAA;EACA,cAAA;EACA,eAAA;EACA,cAAA;EACA,kBAAA;EACA,WAAA;EACA,iBAAA;EACA,sBAAA;EACA,iBAAA;AACA;AAEA;EACA,oCAAA;AACA","file":"dropdownItem.vue","sourcesContent":["<template>\r\n<div\r\n\tref=\"elem\"\r\n  :class=\"className\"\r\n  @mouseover.capture=\"$emit('mouseover', $event, index)\"\r\n  @mousedown=\"$emit('mousedown', $event, index)\"\r\n>\r\n  <span :style=\"styles.text\">{{ content[0] }}</span><span v-if=\"content[1]\" :style=\"styles.hl\">{{ content[1] }}</span><span v-if=\"content[2]\" :style=\"styles.text\">{{ content[2] }}</span>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport { getItemLabel } from '../helpers/utils';\r\n\r\nexport default {\r\n\tprops: {\r\n\t\tactive: Boolean,\r\n\t\thighlight: String,\r\n\t\titem: Object,\r\n\t\tindex: Number,\r\n\t},\r\n\tdata: function () {\r\n\t\treturn {\r\n\t\t\tclassName: this.getClassName(),\r\n\t\t\tcontent: this.getDisplay(),\r\n\t\t\tstyles: {\r\n\t\t\t\ttext: {\r\n\t\t\t\t\tpadding: 0,\r\n\t\t\t\t\tmargin: 0,\r\n\t\t\t\t\topacity: this.highlight ? 0.8 : 1,\r\n\t\t\t\t},\r\n\t\t\t\thl: {\r\n\t\t\t\t\tpadding: 0,\r\n\t\t\t\t\tmargin: 0,\r\n\t\t\t\t\tfontWeight: 600,\r\n\t\t\t\t\ttextDecoration: \"underline\",\r\n\t\t\t\t},\r\n\t\t\t}\r\n\t\t};\r\n\t},\r\n\tmethods: {\r\n\t\tgetClassName: function () {\r\n\t\t\tlet base = this.active ? \"menu_option menu_option_active\" : \"menu_option\";\r\n\r\n\t\t\tif (this.class && this.active) {\r\n\t\t\t\tbase += \" \" + this.class;\r\n\t\t\t}\r\n\r\n\t\t\treturn base;\r\n\t\t},\r\n\t\tgetDisplay: function () {\r\n\t\t\tconst base = getItemLabel(this.item);\r\n\r\n\t\t\tif (this.highlight && base) {\r\n\t\t\t\tconst src = base.trim().toLowerCase();\r\n\t\t\t\tconst tgt = this.highlight.trim().toLowerCase();\r\n\t\t\t\tconst pos = src.indexOf(tgt);\r\n\r\n\t\t\t\tif (pos >= 0) {\r\n\t\t\t\t\treturn [\r\n\t\t\t\t\t\tpos === 0 ? null : base.substring(0, pos),\r\n\t\t\t\t\t\tbase.substring(pos, pos + tgt.length),\r\n\t\t\t\t\t\tbase.substring(pos + tgt.length),\r\n\t\t\t\t\t];\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\treturn [base, null, null];\r\n\t\t},\r\n\t},\r\n\twatch: {\r\n\t\tactive: function () {\r\n\t\t\tthis.className = this.getClassName();\r\n\r\n\t\t\tif (this.active) {\r\n\t\t\t\tconst { offsetTop, offsetHeight } = this.$refs.elem;\r\n\t\t\t\tthis.$emit('item-activated', offsetTop, offsetHeight);\r\n\t\t\t}\r\n\t\t},\r\n\t\thighlight: function () {\r\n\t\t\tthis.content = this.getDisplay();\r\n\t\t\tthis.styles.text['opacity'] = this.highlight ? 0.8 : 1;\r\n\t\t},\r\n\t},\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.menu_option {\r\n  background-color: transparent;\r\n  color: inherit;\r\n  cursor: default;\r\n  display: block;\r\n  font-size: inherit;\r\n  width: 100%;\r\n  user-select: none;\r\n  box-sizing: border-box;\r\n  padding: 6px 12px;\r\n}\r\n\r\n.menu_option.menu_option_active {\r\n  background-color: rgb(222, 235, 255);\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = "data-v-943d9294";
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//

var script$5 = {
	props: {
		data: Object,
	}
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "group_label",
      on: {
        mousedown: function($event) {
          return _vm.$emit("mousedown", $event)
        }
      }
    },
    [
      _c("span", [
        _vm._v("\r\n      " + _vm._s(_vm.data.label || "Default") + "\r\n    ")
      ]),
      _vm._v(" "),
      _c("span", { staticClass: "group_label_icon" }, [
        _vm._v("\r\n      " + _vm._s(_vm.data.count || 0) + "\r\n    ")
      ])
    ]
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-ec4e17ca_0", { source: "\n.group_label[data-v-ec4e17ca] {\r\n  color: rgb(153, 153, 153);\r\n  cursor: default;\r\n  display: block;\r\n  font-size: 75%;\r\n  font-weight: 500;\r\n  margin-bottom: 0.25em;\r\n  padding: 2px 12px;\r\n  text-transform: uppercase;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\n}\n.group_label_icon[data-v-ec4e17ca] {\r\n  background-color: #EBECF0;\r\n  border-radius: 0.75em;\r\n  color: #172B4D;\r\n  display: inline-block;\r\n  font-size: 10;\r\n  font-weight: normal;\r\n  line-height: 1;\r\n  text-align: center;\r\n  min-width: 1;\r\n  padding: 0.16666666666667em 0.5em;\n}\r\n", map: {"version":3,"sources":["F:\\GitHub\\react-ahead\\vue-ahead\\src\\components\\dropdownLabel.vue"],"names":[],"mappings":";AAoBA;EACA,yBAAA;EACA,eAAA;EACA,cAAA;EACA,cAAA;EACA,gBAAA;EACA,qBAAA;EACA,iBAAA;EACA,yBAAA;EACA,sBAAA;EACA,aAAA;EACA,mBAAA;EACA,8BAAA;AACA;AAEA;EACA,yBAAA;EACA,qBAAA;EACA,cAAA;EACA,qBAAA;EACA,aAAA;EACA,mBAAA;EACA,cAAA;EACA,kBAAA;EACA,YAAA;EACA,iCAAA;AACA","file":"dropdownLabel.vue","sourcesContent":["<template>\r\n<div class=\"group_label\" @mousedown=\"$emit('mousedown', $event)\">\r\n    <span>\r\n      {{ data.label || \"Default\" }}\r\n    </span>\r\n    <span class=\"group_label_icon\">\r\n      {{ data.count || 0 }}\r\n    </span>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n\tprops: {\r\n\t\tdata: Object,\r\n\t}\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.group_label {\r\n  color: rgb(153, 153, 153);\r\n  cursor: default;\r\n  display: block;\r\n  font-size: 75%;\r\n  font-weight: 500;\r\n  margin-bottom: 0.25em;\r\n  padding: 2px 12px;\r\n  text-transform: uppercase;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n}\r\n\r\n.group_label_icon {\r\n  background-color: #EBECF0;\r\n  border-radius: 0.75em;\r\n  color: #172B4D;\r\n  display: inline-block;\r\n  font-size: 10;\r\n  font-weight: normal;\r\n  line-height: 1;\r\n  text-align: center;\r\n  min-width: 1;\r\n  padding: 0.16666666666667em 0.5em;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = "data-v-ec4e17ca";
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var shieldStyle = {
	position: 'absolute',
	display:  'default',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	textAlign: 'center',
	justifyContent: 'center',
	zIndex: 1000000,
	backgroundColor: 'transparent',
	userSelect: 'none',
};

var shieldTitleStyle = {
	position: 'absolute',
	top: '50%',
	left: '0',
	textAlign: 'center',
	margin: '-12px 0 0 0',
	padding: 0,
	width: '100%',
	height: '100%',
	opacity: 1,
};

var script$6 = {
	props: {
		customClassNames: Object,
		groups: Object,
		highlight: String,
		isRemoteInit: Boolean,
		itemRenderer: Object,
		options: {
			type: Array,
			default: new Array(),
		},
		reason: Number,  // 0 -- new results; 1 -- selection/removal;
		shield: Boolean,
	},
	components: {
		GroupLabel: __vue_component__$5,
		Item: __vue_component__$4,
	},
	beforeMount: function beforeMount() {
		if (this.itemRenderer) {
			this.updateCustomItem();
		}
	},
	data: function () {
		this._manualMove = "";
		this._debounceId = null;

		return {
			activeIdx: 0,
			className: this.getClassName(),
			shieldVisible: false,
			styles: {
				shield: shieldStyle,
				title: shieldTitleStyle,
			},
			emptyText: this.getEmptyText(),
		};
	},
	methods: {
		getClassName: function () {
			var className = "dropdown_wrapper";

			if (this.customClassNames && this.customClassNames.dropdown) {
				className += " " + this.customClassNames.dropdown;
			}

			return className;
		},
		getEmptyText: function () {
			return this.isRemoteInit ? "Type to search" : "No option";
		},
		updateCustomItem: function () {
			this.$options.components.CustomItem = this.itemRenderer;
		},
		move: function (dir) {
			var ref = this;
			var activeIdx = ref.activeIdx;

			if (dir === 'down') {
				activeIdx++;
			} else {
				activeIdx--;
			}

			if (activeIdx >= this.options.length) {
				activeIdx = this.options.length - 1;
			}

			if (activeIdx < 0) {
				activeIdx = 0;
			}

			if (activeIdx !== this.activeIdx) {
				this._manualMove = dir;
				this.activeIdx = activeIdx;
			}
		},
		select: function () {
			if (this.activeIdx < 0 || this.activeIdx >= this.options.length) {
				return;
			}

			var item = this.options[this.activeIdx];
			this.$emit('item-selection', null, item.key);
		},
		handleLabelClicked: function (evt) {
			var item = this.options[this.activeIdx];
			this.$emit('item-selection', evt, item.key);
		},
		handleItemActivated: function (offsetTop, offsetHeight) {
			if ( offsetHeight === void 0 ) offsetHeight = 30;

			// console.log('offset top: ', offsetTop, offsetHeight);

			if (this.options.length < 4 || !this._manualMove) {
				return;
			}

			var wrapper = this.$refs.contentWrapper;
			var ref = wrapper.getBoundingClientRect();
			var height = ref.height;
			var adjustedHeight = offsetHeight + 10;

			if (offsetTop > height - adjustedHeight && this._manualMove === 'down') {
				wrapper.scrollTo(0, offsetTop + adjustedHeight - height);
			} else if (offsetTop < wrapper.scrollTop && this._manualMove === 'up') {
				wrapper.scrollTo(0, wrapper.scrollTop - offsetHeight);
			}

			this._manualMove = '';
		},
		handleMouseOver: function (_evt, idx) {
			// console.log('mouse over:', idx);

			if (idx < this.options.length) {
				this.activeIdx = idx;        
			} else {
				this.activeIdx = this.options.length - 1;
			}
      
			if (this.activeIdx < 0) {
				this.activeIdx = 0;
			}
		},
	},
	watch: {
		activeIdx: function () {
			if (!this.itemRenderer) {
				return;
			}

			var itemKey = "item_" + (this.activeIdx);

			if (this.$refs[itemKey] && this.$refs[itemKey].length === 1) {
				var ref = this.$refs[itemKey][0];
				var offsetTop = ref.offsetTop;
				var offsetHeight = ref.offsetHeight;
				this.handleItemActivated(offsetTop, offsetHeight);
			}
		},
		className: function () {
			this.className = this.getClassName();
		},
		isRemoteInit: function () {
			this.emptyText = this.getEmptyText();
		},
		itemRenderer: function () {
			this.updateCustomItem();
		},
		options: function () {
			if (this.reason === 0) {
				this.activeIdx = 0;
				this.$refs.contentWrapper.scrollTo(0, 0);
			} else if (this.activeIdx >= this.options.length) {
				this.activeIdx = this.options.length - 1;
			}      
		},
		shield: function () {
			var this$1 = this;

			if (this.shield) {
				if (this._debounceId) {
					clearTimeout(this._debounceId);
				}

				this._debounceId = setTimeout(function () {
					this$1.shieldVisible = true;
					this$1.styles.shield['opacity'] = 0.7;
					this$1.styles.shield['backgroundColor'] = '#F5F5F5';
				}, 200);				
			} else {
				clearTimeout(this._debounceId);
				this._debounceId = null;

				this.shieldVisible = false;
				this.styles.shield['opacity'] = 1;
				this.styles.shield['backgroundColor'] = 'transparent';
			}
		}
	}
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.className }, [
    _vm.shield
      ? _c(
          "div",
          {
            style: _vm.styles.shield,
            on: {
              "!mousedown": function($event) {
                $event.stopPropagation();
                return _vm.$emit("shield-click", $event)
              }
            }
          },
          [
            _c(
              "h3",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.shieldVisible,
                    expression: "shieldVisible"
                  }
                ],
                style: _vm.styles.title
              },
              [_vm._v("\r\n      Loading ...\r\n    ")]
            )
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { ref: "contentWrapper", staticClass: "dropdown_container" },
      [
        _vm._l(_vm.options, function(item, idx) {
          return _c(
            "div",
            { key: item.key },
            [
              _vm.groups && _vm.groups.hasOwnProperty(idx)
                ? _c("GroupLabel", {
                    attrs: { data: _vm.groups[idx] },
                    on: {
                      mousedown: function($event) {
                        $event.stopPropagation();
                        return _vm.handleLabelClicked($event)
                      }
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              !_vm.itemRenderer
                ? _c("Item", {
                    class:
                      (_vm.customClassNames &&
                        _vm.customClassNames.activeItem) ||
                      "",
                    attrs: {
                      active: _vm.activeIdx === idx,
                      highlight: _vm.highlight,
                      item: item,
                      index: idx
                    },
                    on: {
                      mouseover: _vm.handleMouseOver,
                      mousedown: function($event) {
                        $event.stopPropagation();
                        return _vm.$emit("item-selection", $event, item.key)
                      },
                      "item-activated": _vm.handleItemActivated
                    }
                  })
                : _c(
                    "div",
                    {
                      ref: "item_" + idx.toString(),
                      refInFor: true,
                      class:
                        (_vm.customClassNames &&
                          _vm.customClassNames.activeItem) ||
                        "",
                      on: {
                        mouseover: function($event) {
                          return _vm.handleMouseOver($event, idx)
                        },
                        mousedown: function($event) {
                          $event.stopPropagation();
                          return _vm.$emit("item-selection", $event, item.key)
                        },
                        "item-activated": _vm.handleItemActivated
                      }
                    },
                    [
                      _c("CustomItem", {
                        attrs: {
                          active: _vm.activeIdx === idx,
                          highlight: _vm.highlight,
                          item: item,
                          index: idx
                        }
                      })
                    ],
                    1
                  )
            ],
            1
          )
        }),
        _vm._v(" "),
        !_vm.options || _vm.options.length === 0
          ? _c("div", { staticClass: "dropdown_empty_options" }, [
              _vm._v("\r\n      " + _vm._s(_vm.emptyText) + "\r\n    ")
            ])
          : _vm._e()
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  var __vue_inject_styles__$6 = function (inject) {
    if (!inject) { return }
    inject("data-v-5d027a3e_0", { source: "\n.dropdown_wrapper[data-v-5d027a3e] {\r\n  top: 100%;\r\n  background-color: rgb(255, 255, 255);\r\n  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;\r\n  margin: 4px 0;\r\n  position: absolute;\r\n  width: 100%;\r\n  z-index: 1000;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  animation: menu-appear-data-v-5d027a3e 50ms;\n}\n@keyframes menu-appear-data-v-5d027a3e {\nfrom { opacity: 0;\n}\nto   { opacity: 1;\n}\n}\n.dropdown_container[data-v-5d027a3e] {\r\n  max-height: 300px;\r\n  overflow-y: auto;\r\n  padding: 6px 0;\r\n  position: relative;\r\n  box-sizing: border-box;\r\n  text-align: start;\n}\n.dropdown_empty_options[data-v-5d027a3e] {\r\n  color: rgb(153, 153, 153);\r\n  cursor: default;\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n  padding: 6px 12px;\n}\r\n", map: {"version":3,"sources":["F:\\GitHub\\react-ahead\\vue-ahead\\src\\components\\dropdown.vue"],"names":[],"mappings":";AAwQA;EACA,SAAA;EACA,oCAAA;EACA,+EAAA;EACA,aAAA;EACA,kBAAA;EACA,WAAA;EACA,aAAA;EACA,sBAAA;EACA,kBAAA;EACA,2CAAA;AACA;AAEA;AACA,OAAA,UAAA;AAAA;AACA,OAAA,UAAA;AAAA;AACA;AAEA;EACA,iBAAA;EACA,gBAAA;EACA,cAAA;EACA,kBAAA;EACA,sBAAA;EACA,iBAAA;AACA;AAEA;EACA,yBAAA;EACA,eAAA;EACA,kBAAA;EACA,sBAAA;EACA,iBAAA;AACA","file":"dropdown.vue","sourcesContent":["<template>\r\n<div :class=\"className\">\r\n  <div\r\n    v-if=\"shield\"\r\n    :style=\"styles.shield\"\r\n    @mousedown.capture.stop=\"$emit('shield-click', $event)\"\r\n  >\r\n    <h3 v-show=\"shieldVisible\" :style=\"styles.title\">\r\n      Loading ...\r\n    </h3>\r\n  </div>\r\n  <div \r\n    class=\"dropdown_container\"\r\n    ref=\"contentWrapper\"\r\n  >\r\n    <div v-for=\"(item, idx) in options\" :key=\"item.key\">\r\n      <GroupLabel\r\n        v-if=\"groups && groups.hasOwnProperty(idx)\"\r\n        :data=\"groups[idx]\"\r\n\t\t\t\t@mousedown.stop=\"handleLabelClicked\"\r\n      />\r\n      <Item\r\n        v-if=\"!itemRenderer\"\r\n        :active=\"activeIdx === idx\"\r\n\t\t\t\t:class=\"(customClassNames && customClassNames.activeItem) || ''\"\r\n\t\t\t\t:highlight=\"highlight\"\r\n        :item=\"item\"\r\n        :index=\"idx\"\r\n        @mouseover=\"handleMouseOver\"\r\n        @mousedown.stop=\"$emit('item-selection', $event, item.key)\"\r\n        @item-activated=\"handleItemActivated\"\r\n      />\r\n      <div \r\n        v-else\r\n\t\t\t\t:class=\"(customClassNames && customClassNames.activeItem) || ''\"\r\n        :ref=\"'item_' + idx.toString()\"\r\n        @mouseover=\"handleMouseOver($event, idx)\"\r\n        @mousedown.stop=\"$emit('item-selection', $event, item.key)\"\r\n        @item-activated=\"handleItemActivated\"\r\n      >\r\n        <CustomItem\r\n          :active=\"activeIdx === idx\"\r\n\t\t\t\t\t:highlight=\"highlight\"\r\n          :item=\"item\"\r\n          :index=\"idx\"\r\n        />\r\n      </div>\r\n    </div>\r\n    <div\r\n      v-if=\"!options || options.length === 0\"\r\n      class=\"dropdown_empty_options\"\r\n    >\r\n      {{ emptyText }}\r\n    </div>\r\n  </div>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport Item from \"./dropdownItem.vue\";\r\nimport GroupLabel from './dropdownLabel.vue';\r\n\r\nconst shieldStyle = {\r\n\tposition: 'absolute',\r\n\tdisplay:  'default',\r\n\ttop: 0,\r\n\tleft: 0,\r\n\twidth: '100%',\r\n\theight: '100%',\r\n\ttextAlign: 'center',\r\n\tjustifyContent: 'center',\r\n\tzIndex: 1000000,\r\n\tbackgroundColor: 'transparent',\r\n\tuserSelect: 'none',\r\n};\r\n\r\nconst shieldTitleStyle = {\r\n\tposition: 'absolute',\r\n\ttop: '50%',\r\n\tleft: '0',\r\n\ttextAlign: 'center',\r\n\tmargin: '-12px 0 0 0',\r\n\tpadding: 0,\r\n\twidth: '100%',\r\n\theight: '100%',\r\n\topacity: 1,\r\n};\r\n\r\nexport default {\r\n\tprops: {\r\n\t\tcustomClassNames: Object,\r\n\t\tgroups: Object,\r\n\t\thighlight: String,\r\n\t\tisRemoteInit: Boolean,\r\n\t\titemRenderer: Object,\r\n\t\toptions: {\r\n\t\t\ttype: Array,\r\n\t\t\tdefault: new Array(),\r\n\t\t},\r\n\t\treason: Number,  // 0 -- new results; 1 -- selection/removal;\r\n\t\tshield: Boolean,\r\n\t},\r\n\tcomponents: {\r\n\t\tGroupLabel,\r\n\t\tItem,\r\n\t},\r\n\tbeforeMount() {\r\n\t\tif (this.itemRenderer) {\r\n\t\t\tthis.updateCustomItem();\r\n\t\t}\r\n\t},\r\n\tdata: function () {\r\n\t\tthis._manualMove = \"\";\r\n\t\tthis._debounceId = null;\r\n\r\n\t\treturn {\r\n\t\t\tactiveIdx: 0,\r\n\t\t\tclassName: this.getClassName(),\r\n\t\t\tshieldVisible: false,\r\n\t\t\tstyles: {\r\n\t\t\t\tshield: shieldStyle,\r\n\t\t\t\ttitle: shieldTitleStyle,\r\n\t\t\t},\r\n\t\t\temptyText: this.getEmptyText(),\r\n\t\t};\r\n\t},\r\n\tmethods: {\r\n\t\tgetClassName: function () {\r\n\t\t\tlet className = \"dropdown_wrapper\";\r\n\r\n\t\t\tif (this.customClassNames && this.customClassNames.dropdown) {\r\n\t\t\t\tclassName += \" \" + this.customClassNames.dropdown;\r\n\t\t\t}\r\n\r\n\t\t\treturn className;\r\n\t\t},\r\n\t\tgetEmptyText: function () {\r\n\t\t\treturn this.isRemoteInit ? \"Type to search\" : \"No option\";\r\n\t\t},\r\n\t\tupdateCustomItem: function () {\r\n\t\t\tthis.$options.components.CustomItem = this.itemRenderer;\r\n\t\t},\r\n\t\tmove: function (dir) {\r\n\t\t\tlet { activeIdx } = this;\r\n\r\n\t\t\tif (dir === 'down') {\r\n\t\t\t\tactiveIdx++;\r\n\t\t\t} else {\r\n\t\t\t\tactiveIdx--;\r\n\t\t\t}\r\n\r\n\t\t\tif (activeIdx >= this.options.length) {\r\n\t\t\t\tactiveIdx = this.options.length - 1;\r\n\t\t\t}\r\n\r\n\t\t\tif (activeIdx < 0) {\r\n\t\t\t\tactiveIdx = 0;\r\n\t\t\t}\r\n\r\n\t\t\tif (activeIdx !== this.activeIdx) {\r\n\t\t\t\tthis._manualMove = dir;\r\n\t\t\t\tthis.activeIdx = activeIdx;\r\n\t\t\t}\r\n\t\t},\r\n\t\tselect: function () {\r\n\t\t\tif (this.activeIdx < 0 || this.activeIdx >= this.options.length) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tconst item = this.options[this.activeIdx];\r\n\t\t\tthis.$emit('item-selection', null, item.key);\r\n\t\t},\r\n\t\thandleLabelClicked: function (evt) {\r\n\t\t\tconst item = this.options[this.activeIdx];\r\n\t\t\tthis.$emit('item-selection', evt, item.key);\r\n\t\t},\r\n\t\thandleItemActivated: function (offsetTop, offsetHeight = 30) {\r\n\t\t\t// console.log('offset top: ', offsetTop, offsetHeight);\r\n\r\n\t\t\tif (this.options.length < 4 || !this._manualMove) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tconst wrapper = this.$refs.contentWrapper;\r\n\t\t\tconst { height } = wrapper.getBoundingClientRect();\r\n\t\t\tconst adjustedHeight = offsetHeight + 10;\r\n\r\n\t\t\tif (offsetTop > height - adjustedHeight && this._manualMove === 'down') {\r\n\t\t\t\twrapper.scrollTo(0, offsetTop + adjustedHeight - height);\r\n\t\t\t} else if (offsetTop < wrapper.scrollTop && this._manualMove === 'up') {\r\n\t\t\t\twrapper.scrollTo(0, wrapper.scrollTop - offsetHeight);\r\n\t\t\t}\r\n\r\n\t\t\tthis._manualMove = '';\r\n\t\t},\r\n\t\thandleMouseOver: function (_evt, idx) {\r\n\t\t\t// console.log('mouse over:', idx);\r\n\r\n\t\t\tif (idx < this.options.length) {\r\n\t\t\t\tthis.activeIdx = idx;        \r\n\t\t\t} else {\r\n\t\t\t\tthis.activeIdx = this.options.length - 1;\r\n\t\t\t}\r\n      \r\n\t\t\tif (this.activeIdx < 0) {\r\n\t\t\t\tthis.activeIdx = 0;\r\n\t\t\t}\r\n\t\t},\r\n\t},\r\n\twatch: {\r\n\t\tactiveIdx: function () {\r\n\t\t\tif (!this.itemRenderer) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tconst itemKey = `item_${this.activeIdx}`;\r\n\r\n\t\t\tif (this.$refs[itemKey] && this.$refs[itemKey].length === 1) {\r\n\t\t\t\tconst { offsetTop, offsetHeight } = this.$refs[itemKey][0];\r\n\t\t\t\tthis.handleItemActivated(offsetTop, offsetHeight);\r\n\t\t\t}\r\n\t\t},\r\n\t\tclassName: function () {\r\n\t\t\tthis.className = this.getClassName();\r\n\t\t},\r\n\t\tisRemoteInit: function () {\r\n\t\t\tthis.emptyText = this.getEmptyText();\r\n\t\t},\r\n\t\titemRenderer: function () {\r\n\t\t\tthis.updateCustomItem();\r\n\t\t},\r\n\t\toptions: function () {\r\n\t\t\tif (this.reason === 0) {\r\n\t\t\t\tthis.activeIdx = 0;\r\n\t\t\t\tthis.$refs.contentWrapper.scrollTo(0, 0);\r\n\t\t\t} else if (this.activeIdx >= this.options.length) {\r\n\t\t\t\tthis.activeIdx = this.options.length - 1;\r\n\t\t\t}      \r\n\t\t},\r\n\t\tshield: function () {\r\n\t\t\tif (this.shield) {\r\n\t\t\t\tif (this._debounceId) {\r\n\t\t\t\t\tclearTimeout(this._debounceId);\r\n\t\t\t\t}\r\n\r\n\t\t\t\tthis._debounceId = setTimeout(() => {\r\n\t\t\t\t\tthis.shieldVisible = true;\r\n\t\t\t\t\tthis.styles.shield['opacity'] = 0.7;\r\n\t\t\t\t\tthis.styles.shield['backgroundColor'] = '#F5F5F5';\r\n\t\t\t\t}, 200);\t\t\t\t\r\n\t\t\t} else {\r\n\t\t\t\tclearTimeout(this._debounceId);\r\n\t\t\t\tthis._debounceId = null;\r\n\r\n\t\t\t\tthis.shieldVisible = false;\r\n\t\t\t\tthis.styles.shield['opacity'] = 1;\r\n\t\t\t\tthis.styles.shield['backgroundColor'] = 'transparent';\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.dropdown_wrapper {\r\n  top: 100%;\r\n  background-color: rgb(255, 255, 255);\r\n  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;\r\n  margin: 4px 0;\r\n  position: absolute;\r\n  width: 100%;\r\n  z-index: 1000;\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  animation: menu-appear 50ms;\r\n}\r\n\r\n@keyframes menu-appear {\r\n  from { opacity: 0; }\r\n  to   { opacity: 1; }\r\n}\r\n\r\n.dropdown_container {\r\n  max-height: 300px;\r\n  overflow-y: auto;\r\n  padding: 6px 0;\r\n  position: relative;\r\n  box-sizing: border-box;\r\n  text-align: start;\r\n}\r\n\r\n.dropdown_empty_options {\r\n  color: rgb(153, 153, 153);\r\n  cursor: default;\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n  padding: 6px 12px;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$6 = "data-v-5d027a3e";
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    createInjector,
    undefined,
    undefined
  );

var hasProperty = function (tgt, name) {
	return Object.prototype.hasOwnProperty.call(tgt, name);
};

var randomSuffix = function () {
	return Math.random().toString(36).substring(2, 6);
};

var common = {
	hasProperty: hasProperty,
	randomSuffix: randomSuffix,
};
var common_1 = common.hasProperty;
var common_2 = common.randomSuffix;

var NativeEngine = function NativeEngine(props) {
	this._props = props || {};

	this._store = [];
	this._cache = {
		last: [],
		data: {},
	};

	if (!this._props['cacheSize']) {
		this._props['cacheSize'] = 10;
	}
};

NativeEngine.prototype.add = function add (data) {
		var ref;

		if ( data === void 0 ) data = [];
	if (data.length === 0) {
		return;
	}

	if (Array.isArray(data)) {
		(ref = this._store).push.apply(ref, data);
		return;
	}

	var label = data.toString();
	this._store.push({ label: label, key: label });
};

NativeEngine.prototype.query = function query (val, cb) {
		var this$1 = this;

	if (typeof val !== 'string') {
		val = val.toString();
	}

	val = val.trim().toLowerCase();

	//TODO: implement load more option

	// cache hit
	if (common_1(this._cache.data, val)) {
		var data$1 = this._cache.data[val];

		var index = this._cache.last.indexOf(val);
		if (index >= 0) {
			this._cache.last.splice(index, 1);
			this._cache.last.push(val);
		}

		return cb(data$1, val);
	}
    
	// remote search 
	if (this._props.remote) {
		var params = {
			q: val,
		};

		var ref = this._props.remote;
			var dataParser = ref.dataParser;
			var settings = ref.settings;

		return axios(Object.assign({}, settings, { params: params }))
			.then(function (resp) {
				// format data if a formatter is passed
				var data =
            typeof dataParser === 'function'
						? dataParser(resp.data)
						: resp.data;

				if (this$1._store.length > 0) {
					var extra = this$1._localSearch(val);
					extra && extra.length > 0 && data.push.apply(data, extra);
				}

				this$1._updateCache(val, data);

				return cb(data, val);
			})
			.catch(function (err) {
				console.error(
					"[error] failed to fetch data from the remote server:",
					err,
					"\nremote settings:",
					settings
				);

				return cb([], val);
			});
	}

	if (val === '') {
		return cb(this._store, val);
	}

	var data = this._localSearch(val);
	this._updateCache(val, data);

	return cb(data, val);
};

NativeEngine.prototype.prefetch = function prefetch (cb) {
	if (!this._props.remote) {
		return;
	}

	var params = {
		q: '',
		t: 'prefetch',
	};

	var ref = this._props.remote;
		var dataParser = ref.dataParser;
		var settings = ref.settings;

	axios(Object.assign({}, settings, { params: params }))
		.then(function (resp) {
			// format data if a formatter is passed
			var data =
				typeof dataParser === 'function'
					? dataParser(resp.data)
					: resp.data;

			cb(data);
		})
		.catch(function (err) {
			console.error("[error] failed to fetch data from remote server:", err);
		});
};

NativeEngine.prototype.setOptions = function setOptions (options) {
	this._props = options;
};

NativeEngine.prototype.setOption = function setOption (name, option) {
	this._props[name] = option;
};

NativeEngine.prototype._updateCache = function _updateCache (data, val) {
	this._cache.last.push(val);
	this._cache.data[val] = data;

	if (this._cache.last.length > this._props.cacheSize) {
		var ref = this._cache.last.splice(0, 1);
			var delKey = ref[0];
		delete this._cache.data[delKey];
	}
};

NativeEngine.prototype._localSearch = function _localSearch (val) {
	// normal search workflow
	var ref = this._props;
		var matchEval = ref.matchEval;
	if (typeof matchEval !== 'function') {
		matchEval = null;
	}
    
	return this._store.filter(
		function (item) {
			if (matchEval) {
				return matchEval(val, item);
			}

			var label = item.label.toLowerCase();
			return label && label.indexOf(val) >= 0;
		}
	);
};

//

var focusStatus = {
	None: 0,
	Input: 1,
	Icon: 2,
	Container: 3,
	Dropdown: 4,
	Shield: 5,
	Pending: -1,
};

var debounceTimeout = 120;

var script$7 = {
	inheritAttrs: false,
	name: "VueAhead",
	components: {
		Shield: __vue_component__,
		Input: __vue_component__$3,
		Dropdown: __vue_component__$6,
	},
	beforeMount: function () {
	},
	beforeDestroy: function () {
		//todo: send any remainder data to remote, if configured
	},
	props: {
		customClassNames: Object,
		grouped: Boolean,
		highlight: Boolean,
		initOptions: Array,
		initSelections: Array,
		isMulti: Boolean,
		itemRenderer: {
			type: Object,
			default: null,
		},
		placeholder: String,
		remote: Object,
	},
	data: function data() {
		var ref = this.init();
		var source = ref.source;
		var options = ref.options;
		var selection = ref.selection;
		var groups = ref.groups;

		this._engine = new NativeEngine({ remote: this.remote || null });
		this._engine.add(source);
		
		this._shieldId = null;
		this._debounceId = null;

		return {
			className: this.getClassName(),
			focusStatus: focusStatus.None,
			groups: groups,
			open: false,
			options: options,
			reason: 0,
			selection: selection,
			source: source,
			shield: false,
			shieldDisplay: "none",
			value: '',
		};
	},
	methods: {
		init: function () {
			var source = [];
			var initState = null;

			if (this.remote) {
				if (typeof this.remote.prefetch === 'function') {
					this.runPrefetcher(this.remote.prefetch);
				}
			} else {
				source = this.prepareOptions(this.initOptions);
				if (this.initSelections && this.initSelections.length > 0) {
					initState = this.prepareInitState(source, this.initSelections);
				}
			}

			var initOptions = initState ? initState.options : source;
			var selection = initState ? initState.selection : { items: [], indices: {}, };

			var ref = this.grouped ? this.buildGroupOptions(initOptions) : { options: initOptions, groups: null };
			var options = ref.options;
			var groups = ref.groups;

			return { source: source, options: options, selection: selection, groups: groups, };
		},
		focusInput: function (dropdownState) {
			var this$1 = this;
			if ( dropdownState === void 0 ) dropdownState = null;

			setTimeout(function () {
				// console.log('moving focus to the input, before:', this.focusStatus);

				if (this$1.focusStatus !== focusStatus.Input) {
					this$1.$refs.inputControl.focus();
					this$1.open = dropdownState === null ? true : dropdownState;
				}

				this$1.focusStatus = focusStatus.Input;
			}, 0);
		},
		focuseReset: function () {
			this.focusStatus = focusStatus.None;
			this.open = false;

			this.value = '';
			this.resetOptions();
		},
		getClassName: function () {
			var className = "control_container";

			if (this.class) {
				className += " " + this.class;
			}

			if (this.customClassNames && this.customClassNames.control) {
				className += " " + this.customClassNames.control;
			}

			return className;
		},
		resetOptions: function () {
			this.reason = 0;

			if (this.remote) {
				if (typeof this.remote.prefetch === 'function') {
					this.runPrefetcher(this.remote.prefetch, true);
				} else {
					this.source = [];
					this.options = this.getOptions();
				}

				return;
			}

			this.options = this.getOptions();
		},
		buildGroupOptions: function (options) {
			if (!options || options.length === 0) {
				return { options: options, groups: null };
			}

			options = options.sort(function (a, b) { 
				if (a.group === "default") {
					return -1;
				}

				if (b.group === "default") {
					return 1;
				}

				if (a.group === b.group) {
					return 0;
				}

				return a.group > b.group ? 1 : -1;
			});

			var groups = {};
			var currKey = '';
			var lastIdx = -1;
			var count = 0;

			for (var i = 0; i < options.length; i++) {
				if (options[i].group !== currKey) {
					if (lastIdx >= 0) {
						groups[lastIdx] = { label: currKey, count: count, };
					}

					lastIdx = i;
					currKey = options[i].group;
					count = 0;
				}

				count++;
			}

			if (currKey !== '' && lastIdx >= 0) {
				// push the last group into the store
				groups[lastIdx] = { label: currKey, count: count, };
			}

			// console.log('groups:', groups, options);

			return { options: options, groups: groups, };
		},
		getOptions: function (source) {
			if (!source) {
				source = this.source || [];
			}

			var ref = this.selection || {};
			var indices = ref.indices;
			if (!indices) {
				return source;
			}

			// console.log('filtering:', indices, source);

			var result = source.filter(function (item) { return !common_1(indices, item.key); });

			if (this.grouped) {
				var ref$1 = this.buildGroupOptions(result);
				var options = ref$1.options;
				var groups = ref$1.groups;
				result = options;
				this.groups = groups;
			}

			return result;
		},
		prepareOptions: function (options) {
			var this$1 = this;
			if ( options === void 0 ) options = [];

			var keys = {};

			var result = 
				options
					.filter(function (item) { return typeof item === "object" && !!item; })
					.map(function (item, idx) {
						if (!common_1(item, 'key')) {
							item['key'] = idx.toString() + "#" + common_2();
						}

						var key = item['key'];
						if (typeof key !== 'string') {
							key = (key === null || key === undefined) 
								? common_2()
								: key.toString();
						}

						while (common_1(keys, key)) {
							key += common_2();
						}

						item['key'] = key;
						keys[key] = null;

						var label = item['label'];
						if (typeof label !== 'string') {
							label = (label === null || label === undefined) 
								? ''
								: label.toString();
						}

						item['label'] = label;

						if (this$1.grouped) {
							var groupKey = item['group'];
							if (typeof groupKey !== 'string') {
								groupKey = (groupKey === null || groupKey === undefined) 
									? "default"
									: groupKey.toString();
							}

							item['group'] = groupKey;
						}

						return item;
					});

			return result || [];
		},
		prepareInitState: function (options, selections) {
			var indices = {};
			var remainder = [];
			var items = [];

			for (var i = 0; i < selections.length; i++) {
				var key = selections[i];
				if (typeof key !== 'string') {
					key = key.toString();
				}

				indices[key] = null;

				if (!this.isMulti) {
					break;
				}
			}

			for (var i$1 = 0; i$1 < options.length; i$1++) {
				if (
					common_1(indices, options[i$1]['key']) 
					&& (this.isMulti || items.length === 0)
				) {
					items.push(options[i$1]);
				} else {
					remainder.push(options[i$1]);
				}
			}

			return {
				options: remainder,
				selection: {
					items: items,
					indices: indices,
				}
			};
		},
		clear: function () {
			this.selection = {
				items: [],
				indices: {},
			};

			this.value = '';
			this.reason = 1;

			if (!this.remote) {
				this.options = this.getOptions();
			} else {
				if (typeof this.remote.prefetch === 'function') {
					this.runPrefetcher(this.remote.prefetch);
				} else {
					this.source = [];
					this.options = this.getOptions();
				}
			}
		},
		reset: function () {
			var ref = this.init();
			var options = ref.options;
			var selection = ref.selection;
			var groups = ref.groups;

			this.value = '';
			this.reason = 1;
			this.options = options;
			this.groups = groups;
			this.selection = selection;
		},
		runPrefetcher: function (prefetcher, keepSelections) {
			var this$1 = this;

			prefetcher(function (data, selections) {
				if ( selections === void 0 ) selections = [];

				setTimeout(function () {
					var source = this$1.prepareOptions(data);
					var initOptions = source;
					var selection = this$1.selection;

					if (
						selections
						&& selections.length > 0
						&& (!keepSelections || !this$1.selection.items.length) 
					) {
						var initState = this$1.prepareInitState(source, selections);
						selection = initState.selection;
						initOptions = initState.options;
					}

					var ref = this$1.grouped ? this$1.buildGroupOptions(initOptions) : { options: initOptions, groups: null };
					var options = ref.options;
					var groups = ref.groups;

					this$1.source = source;
					this$1.options = options;
					this$1.selection = selection;
					this$1.groups = groups;
				}, 0);
			});
		},
		shieldAction: function (up) {
			var this$1 = this;

			if (this._shieldId) {
				clearTimeout(this._shieldId);
			}

			if (up) {
				this._shieldId = setTimeout(function () {
					this$1.shield = true;
				}, 10);
			} else {
				this._shieldId = null;
				this.shield = false;
			}
		},
		handleFocus: function (evt, targetType) {
			this.focusStatus = targetType === "input" ? focusStatus.Input : focusStatus.Icon;

			if (this.focusStatus === focusStatus.Input) {
				this.open = true;
			}

			// console.log('control get focus ... ', this.focusStatus, targetType);
		},
		handleShieldClick: function (_evt) {
			// move the cursor back to the input field
			this.focusStatus = focusStatus.Shield;
			this.focusInput();
			
			// console.log("shield clicked ... ", evt);
		},
		handleDbClick: function (_evt) {
			var this$1 = this;

			// console.log('double click');

			setTimeout(function () {
				this$1.$refs.inputControl.select();
			}, 0);
		},
		handleInputClick: function (_evt) {
			this.focusStatus = focusStatus.Container;
			this.focusInput();

			// console.log('input clicked ...', evt);
		},
		handleIconEvent: function (evt, type) {
			// handle icon's click event, this event will NOT be bubbled up and thus
			// we need to work on state setups we should do from the 
			// 'handleInputClick' handler.
			this.focusStatus = focusStatus.Container;

			switch (type) {
				case "clear":
					this.clear();
					break;

				case "dropdown":
					this.open = !this.open;
					break;
			}

			// if the dropdown icon is clicked, toggle the dropdown menu, otherwise,
			// keep it open.
			this.focusInput(type === "dropdown" ? this.open : null);
		},
		handleInputBlur: function (evt, force) {
			var this$1 = this;

			// console.log('blur?', this.focusStatus);

			if (this.focusStatus <= focusStatus.Icon || force) {
				this.focusStatus = focusStatus.Pending;

				setTimeout(function () {
					// if some other control has grabbed the focus, we're done
					if (this$1.focusStatus !== focusStatus.Pending) {
						return;
					}

					this$1.focuseReset();
				}, 0);
			}
		},
		handleInputChange: function (evt, value) {
			var this$1 = this;

			this.value = value;
			this.open = true;

			if (value === '' || value.trim() === '') {
				this.resetOptions();
				return;
			}

			this.shieldAction(true);

			if (this._debounceId) {
				clearTimeout(this._debounceId);
			}

			this._debounceId = setTimeout(function () {
				this$1._engine.query(value, function (data) {
					if ( data === void 0 ) data = [];

					// console.log(data);

					// for remote search, the source change every time on a search
					// term, hence we need to update the source all the time
					if (this$1.remote) {
						this$1.source = this$1.prepareOptions(data);
						this$1.options = this$1.getOptions();
					} else {
						this$1.options = this$1.getOptions(data);
					}

					this$1.reason = 0;
					
					this$1.shieldAction(false);
					this$1._debounceId = null;
				});
			}, debounceTimeout);
		},
		handleItemSelection: function (evt, key) {
			// console.log('item selection ...', key, this.selection.indices);
			
			if (common_1(this.selection.indices, key)) {
				return;
			}

			var ref = this.selection;
			var items = ref.items;
			var indices = ref.indices;

			if (!this.isMulti) {
				items = [];
				indices = {};
			}

			for (var i = 0; i < this.options.length; i++) {
				if (this.options[i].key !== key) {
					continue;
				}
			
				items.push(this.options[i]);
				indices[key] = null;

				break;
			}

			this.selection = {
				items: items,
				indices: indices,
			};

			this.$emit("selection", {
				type: "add",
				items: this.selection.items,
				value: this.value,
			});

			// reset the value to empty after a selection
			if (this.value !== '') {
				this.value = '';
			}

			this.reason = 1;
			this.options = this.getOptions();

			// console.log(key, this.selection.items, this.selection.indices);

			this.focusStatus = focusStatus.Dropdown;
			this.focusInput();
		},
		handleItemRemoval: function (evt, item) {
			// console.log('item removal: ', item);

			// invalid item removal
			if (!this.isMulti || !item || !item.key) {
				return;
			}

			var key = item.key;
			var ref = this.selection;
			var items = ref.items;
			var indices = ref.indices;
			var deleted = null;

			delete indices[key];
			items = items.filter(function (item) {
				if (item.key === key) {
					deleted = item;
					return false;
				} 

				return true;
			});

			this.selection = {
				items: items,
				indices: indices,
			};

			this.$emit("selection", {
				type: "remove",
				items: this.selection.items,
				deleted: deleted,
			});

			// filter the options against the original list
			this.reason = 1;
			this.options = 
				this.getOptions().filter(function (item) { return !common_1(indices, item.key); });

			this.focusStatus = focusStatus.Icon;
			this.focusInput();
		},
		handleSpecialKey: function (key, focusInput) {
			// console.log('getting special key: ', key);

			switch (key) {
				case 'enter':
					this.$refs.dropdownControl
						&& this.$refs.dropdownControl.select();

					break;

				case 'esc':
					this.open = false;
					break;

				case 'clear':
					this.clear();
					break;

				case 'dropdown':
					this.open = !this.open;
					break;

				case 'up':
				case 'down':
					if (!this.open) {
						this.open = true;
					} else {
						this.$refs.dropdownControl
							&& this.$refs.dropdownControl.move(key);
					}

					break;

				case 'tab':
					this.focusStatus = focusStatus.Icon;
					break;

				case 'tab-out':
					this.focuseReset();
					break;
			}

			if (focusInput) {
				this.focusInput();
			}
		},
	},
	watch: {
		class: function () {
			this.className = this.getClassName();
		},
		customClasses: function () {
			this.className = this.getClassName();
		},
		initOptions: function () {
			this.reset();
		},
		initSelections: function () {
			this.reset();
		},
	},
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.className },
    [
      _c("Shield", {
        attrs: { on: _vm.shield },
        on: {
          "!mousedown": function($event) {
            $event.stopPropagation();
            return _vm.handleShieldClick($event)
          }
        }
      }),
      _vm._v(" "),
      _c("Input", {
        ref: "inputControl",
        attrs: {
          active: _vm.focusStatus !== 0,
          customClassNames: _vm.customClassNames,
          isMulti: _vm.isMulti,
          placeholder: _vm.placeholder,
          selection: _vm.selection.items,
          value: _vm.value
        },
        on: {
          dblclick: _vm.handleDbClick,
          change: _vm.handleInputChange,
          blur: _vm.handleInputBlur,
          focus: _vm.handleFocus,
          mousedown: _vm.handleInputClick,
          "icon-event": _vm.handleIconEvent,
          "special-key": _vm.handleSpecialKey,
          "item-removal": _vm.handleItemRemoval
        }
      }),
      _vm._v(" "),
      _vm.open
        ? _c("Dropdown", {
            ref: "dropdownControl",
            attrs: {
              customClassNames: _vm.customClassNames,
              groups: _vm.groups,
              highlight: _vm.highlight ? _vm.value.trim() : null,
              isRemoteInit: _vm.remote && _vm.value === "",
              itemRenderer: _vm.itemRenderer,
              open: _vm.open,
              options: _vm.options,
              reason: _vm.reason,
              shield: _vm.shield
            },
            on: { "item-selection": _vm.handleItemSelection }
          })
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  var __vue_inject_styles__$7 = function (inject) {
    if (!inject) { return }
    inject("data-v-97a50f50_0", { source: "\n.control_container[data-v-97a50f50] {  \r\n\tposition: relative;\r\n  box-sizing: border-box;\n}\n.control_active[data-v-97a50f50] {\r\n  border: 1px solid blue;\n}\n.input_container[data-v-97a50f50] {\r\n  padding: 0 2px;\r\n  color: rgb(51, 51, 51);\r\n  position: relative;\r\n  display: flex;\r\n  flex: 1 1 0%;\r\n  flex-wrap: wrap;\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n  visibility: visible;\r\n  box-sizing: border-box;\r\n  width: 100%;\n}\r\n", map: {"version":3,"sources":["F:\\GitHub\\react-ahead\\vue-ahead\\src\\control.vue"],"names":[],"mappings":";AA4pBA;CACA,kBAAA;EACA,sBAAA;AACA;AAEA;EACA,sBAAA;AACA;AAEA;EACA,cAAA;EACA,sBAAA;EACA,kBAAA;EACA,aAAA;EACA,YAAA;EACA,eAAA;EACA,sBAAA;EACA,gBAAA;EACA,mBAAA;EACA,sBAAA;EACA,WAAA;AACA","file":"control.vue","sourcesContent":["<template>\r\n<div :class=\"className\">\r\n\t<Shield \r\n\t\t:on=\"shield\" \r\n\t\t@mousedown.capture.stop=\"handleShieldClick\" \r\n\t/>\r\n\t<Input \r\n\t\tref=\"inputControl\"\r\n\t\t:active=\"focusStatus !== 0\"\r\n\t\t:customClassNames=\"customClassNames\"\r\n\t\t:isMulti=\"isMulti\"\r\n\t\t:placeholder=\"placeholder\"\r\n\t\t:selection=\"selection.items\"\r\n\t\t:value=\"value\"\r\n\t\t@dblclick=\"handleDbClick\"\r\n\t\t@change=\"handleInputChange\"\r\n\t\t@blur=\"handleInputBlur\"\r\n\t\t@focus=\"handleFocus\"\r\n\t\t@mousedown=\"handleInputClick\"\r\n\t\t@icon-event=\"handleIconEvent\"\r\n\t\t@special-key=\"handleSpecialKey\"\r\n\t\t@item-removal=\"handleItemRemoval\"\r\n\t/>\r\n\t<Dropdown\r\n\t\tv-if=\"open\"\r\n\t\tref=\"dropdownControl\"\r\n\t\t:customClassNames=\"customClassNames\"\r\n\t\t:groups=\"groups\"\r\n\t\t:highlight=\"highlight ? value.trim() : null\"\r\n\t\t:isRemoteInit=\"remote && value === ''\"\r\n\t\t:itemRenderer=\"itemRenderer\"\r\n\t\t:open=\"open\"\r\n\t\t:options=\"options\"\r\n\t\t:reason=\"reason\"\r\n\t\t:shield=\"shield\"\r\n\t\t@item-selection=\"handleItemSelection\"\r\n\t/>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport Shield from './components/shield.vue';\r\nimport Input from './components/input.vue';\r\nimport Dropdown from './components/dropdown.vue';\r\nimport { hasProperty, randomSuffix } from './helpers/common';\r\nimport Engine from './helpers/engine';\r\n\r\nconst focusStatus = {\r\n\tNone: 0,\r\n\tInput: 1,\r\n\tIcon: 2,\r\n\tContainer: 3,\r\n\tDropdown: 4,\r\n\tShield: 5,\r\n\tPending: -1,\r\n};\r\n\r\nconst debounceTimeout = 120;\r\n\r\nexport default {\r\n\tinheritAttrs: false,\r\n\tname: \"VueAhead\",\r\n\tcomponents: {\r\n\t\tShield,\r\n\t\tInput,\r\n\t\tDropdown,\r\n\t},\r\n\tbeforeMount: function () {\r\n\t},\r\n\tbeforeDestroy: function () {\r\n\t\t//todo: send any remainder data to remote, if configured\r\n\t},\r\n\tprops: {\r\n\t\tcustomClassNames: Object,\r\n\t\tgrouped: Boolean,\r\n\t\thighlight: Boolean,\r\n\t\tinitOptions: Array,\r\n\t\tinitSelections: Array,\r\n\t\tisMulti: Boolean,\r\n\t\titemRenderer: {\r\n\t\t\ttype: Object,\r\n\t\t\tdefault: null,\r\n\t\t},\r\n\t\tplaceholder: String,\r\n\t\tremote: Object,\r\n\t},\r\n\tdata() {\r\n\t\tconst { source, options, selection, groups } = this.init();\r\n\r\n\t\tthis._engine = new Engine({ remote: this.remote || null });\r\n\t\tthis._engine.add(source);\r\n\t\t\r\n\t\tthis._shieldId = null;\r\n\t\tthis._debounceId = null;\r\n\r\n\t\treturn {\r\n\t\t\tclassName: this.getClassName(),\r\n\t\t\tfocusStatus: focusStatus.None,\r\n\t\t\tgroups,\r\n\t\t\topen: false,\r\n\t\t\toptions,\r\n\t\t\treason: 0,\r\n\t\t\tselection,\r\n\t\t\tsource,\r\n\t\t\tshield: false,\r\n\t\t\tshieldDisplay: \"none\",\r\n\t\t\tvalue: '',\r\n\t\t};\r\n\t},\r\n\tmethods: {\r\n\t\tinit: function () {\r\n\t\t\tlet source = [];\r\n\t\t\tlet initState = null;\r\n\r\n\t\t\tif (this.remote) {\r\n\t\t\t\tif (typeof this.remote.prefetch === 'function') {\r\n\t\t\t\t\tthis.runPrefetcher(this.remote.prefetch);\r\n\t\t\t\t}\r\n\t\t\t} else {\r\n\t\t\t\tsource = this.prepareOptions(this.initOptions);\r\n\t\t\t\tif (this.initSelections && this.initSelections.length > 0) {\r\n\t\t\t\t\tinitState = this.prepareInitState(source, this.initSelections);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\tconst initOptions = initState ? initState.options : source;\r\n\t\t\tconst selection = initState ? initState.selection : { items: [], indices: {}, };\r\n\r\n\t\t\tconst { options, groups } = this.grouped ? this.buildGroupOptions(initOptions) : { options: initOptions, groups: null };\r\n\r\n\t\t\treturn { source, options, selection, groups, };\r\n\t\t},\r\n\t\tfocusInput: function (dropdownState = null) {\r\n\t\t\tsetTimeout(() => {\r\n\t\t\t\t// console.log('moving focus to the input, before:', this.focusStatus);\r\n\r\n\t\t\t\tif (this.focusStatus !== focusStatus.Input) {\r\n\t\t\t\t\tthis.$refs.inputControl.focus();\r\n\t\t\t\t\tthis.open = dropdownState === null ? true : dropdownState;\r\n\t\t\t\t}\r\n\r\n\t\t\t\tthis.focusStatus = focusStatus.Input;\r\n\t\t\t}, 0);\r\n\t\t},\r\n\t\tfocuseReset: function () {\r\n\t\t\tthis.focusStatus = focusStatus.None;\r\n\t\t\tthis.open = false;\r\n\r\n\t\t\tthis.value = '';\r\n\t\t\tthis.resetOptions();\r\n\t\t},\r\n\t\tgetClassName: function () {\r\n\t\t\tlet className = \"control_container\";\r\n\r\n\t\t\tif (this.class) {\r\n\t\t\t\tclassName += \" \" + this.class;\r\n\t\t\t}\r\n\r\n\t\t\tif (this.customClassNames && this.customClassNames.control) {\r\n\t\t\t\tclassName += \" \" + this.customClassNames.control;\r\n\t\t\t}\r\n\r\n\t\t\treturn className;\r\n\t\t},\r\n\t\tresetOptions: function () {\r\n\t\t\tthis.reason = 0;\r\n\r\n\t\t\tif (this.remote) {\r\n\t\t\t\tif (typeof this.remote.prefetch === 'function') {\r\n\t\t\t\t\tthis.runPrefetcher(this.remote.prefetch, true);\r\n\t\t\t\t} else {\r\n\t\t\t\t\tthis.source = [];\r\n\t\t\t\t\tthis.options = this.getOptions();\r\n\t\t\t\t}\r\n\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tthis.options = this.getOptions();\r\n\t\t},\r\n\t\tbuildGroupOptions: function (options) {\r\n\t\t\tif (!options || options.length === 0) {\r\n\t\t\t\treturn { options, groups: null };\r\n\t\t\t}\r\n\r\n\t\t\toptions = options.sort((a, b) => { \r\n\t\t\t\tif (a.group === \"default\") {\r\n\t\t\t\t\treturn -1;\r\n\t\t\t\t}\r\n\r\n\t\t\t\tif (b.group === \"default\") {\r\n\t\t\t\t\treturn 1;\r\n\t\t\t\t}\r\n\r\n\t\t\t\tif (a.group === b.group) {\r\n\t\t\t\t\treturn 0;\r\n\t\t\t\t}\r\n\r\n\t\t\t\treturn a.group > b.group ? 1 : -1;\r\n\t\t\t});\r\n\r\n\t\t\tconst groups = {};\r\n\t\t\tlet currKey = '';\r\n\t\t\tlet lastIdx = -1;\r\n\t\t\tlet count = 0;\r\n\r\n\t\t\tfor (let i = 0; i < options.length; i++) {\r\n\t\t\t\tif (options[i].group !== currKey) {\r\n\t\t\t\t\tif (lastIdx >= 0) {\r\n\t\t\t\t\t\tgroups[lastIdx] = { label: currKey, count, };\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tlastIdx = i;\r\n\t\t\t\t\tcurrKey = options[i].group;\r\n\t\t\t\t\tcount = 0;\r\n\t\t\t\t}\r\n\r\n\t\t\t\tcount++;\r\n\t\t\t}\r\n\r\n\t\t\tif (currKey !== '' && lastIdx >= 0) {\r\n\t\t\t\t// push the last group into the store\r\n\t\t\t\tgroups[lastIdx] = { label: currKey, count, };\r\n\t\t\t}\r\n\r\n\t\t\t// console.log('groups:', groups, options);\r\n\r\n\t\t\treturn { options, groups, };\r\n\t\t},\r\n\t\tgetOptions: function (source) {\r\n\t\t\tif (!source) {\r\n\t\t\t\tsource = this.source || [];\r\n\t\t\t}\r\n\r\n\t\t\tconst { indices } = this.selection || {};\r\n\t\t\tif (!indices) {\r\n\t\t\t\treturn source;\r\n\t\t\t}\r\n\r\n\t\t\t// console.log('filtering:', indices, source);\r\n\r\n\t\t\tlet result = source.filter(item => !hasProperty(indices, item.key));\r\n\r\n\t\t\tif (this.grouped) {\r\n\t\t\t\tconst { options, groups } = this.buildGroupOptions(result);\r\n\t\t\t\tresult = options;\r\n\t\t\t\tthis.groups = groups;\r\n\t\t\t}\r\n\r\n\t\t\treturn result;\r\n\t\t},\r\n\t\tprepareOptions: function (options = []) {\r\n\t\t\tconst keys = {};\r\n\r\n\t\t\tconst result = \r\n\t\t\t\toptions\r\n\t\t\t\t\t.filter(item => typeof item === \"object\" && !!item)\r\n\t\t\t\t\t.map((item, idx) => {\r\n\t\t\t\t\t\tif (!hasProperty(item, 'key')) {\r\n\t\t\t\t\t\t\titem['key'] = idx.toString() + \"#\" + randomSuffix();\r\n\t\t\t\t\t\t}\r\n\r\n\t\t\t\t\t\tlet key = item['key'];\r\n\t\t\t\t\t\tif (typeof key !== 'string') {\r\n\t\t\t\t\t\t\tkey = (key === null || key === undefined) \r\n\t\t\t\t\t\t\t\t? randomSuffix()\r\n\t\t\t\t\t\t\t\t: key.toString();\r\n\t\t\t\t\t\t}\r\n\r\n\t\t\t\t\t\twhile (hasProperty(keys, key)) {\r\n\t\t\t\t\t\t\tkey += randomSuffix();\r\n\t\t\t\t\t\t}\r\n\r\n\t\t\t\t\t\titem['key'] = key;\r\n\t\t\t\t\t\tkeys[key] = null;\r\n\r\n\t\t\t\t\t\tlet label = item['label'];\r\n\t\t\t\t\t\tif (typeof label !== 'string') {\r\n\t\t\t\t\t\t\tlabel = (label === null || label === undefined) \r\n\t\t\t\t\t\t\t\t? ''\r\n\t\t\t\t\t\t\t\t: label.toString();\r\n\t\t\t\t\t\t}\r\n\r\n\t\t\t\t\t\titem['label'] = label;\r\n\r\n\t\t\t\t\t\tif (this.grouped) {\r\n\t\t\t\t\t\t\tlet groupKey = item['group'];\r\n\t\t\t\t\t\t\tif (typeof groupKey !== 'string') {\r\n\t\t\t\t\t\t\t\tgroupKey = (groupKey === null || groupKey === undefined) \r\n\t\t\t\t\t\t\t\t\t? \"default\"\r\n\t\t\t\t\t\t\t\t\t: groupKey.toString();\r\n\t\t\t\t\t\t\t}\r\n\r\n\t\t\t\t\t\t\titem['group'] = groupKey;\r\n\t\t\t\t\t\t}\r\n\r\n\t\t\t\t\t\treturn item;\r\n\t\t\t\t\t});\r\n\r\n\t\t\treturn result || [];\r\n\t\t},\r\n\t\tprepareInitState: function (options, selections) {\r\n\t\t\tconst indices = {};\r\n\t\t\tconst remainder = [];\r\n\t\t\tconst items = [];\r\n\r\n\t\t\tfor (let i = 0; i < selections.length; i++) {\r\n\t\t\t\tlet key = selections[i];\r\n\t\t\t\tif (typeof key !== 'string') {\r\n\t\t\t\t\tkey = key.toString();\r\n\t\t\t\t}\r\n\r\n\t\t\t\tindices[key] = null;\r\n\r\n\t\t\t\tif (!this.isMulti) {\r\n\t\t\t\t\tbreak;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\tfor (let i = 0; i < options.length; i++) {\r\n\t\t\t\tif (\r\n\t\t\t\t\thasProperty(indices, options[i]['key']) \r\n\t\t\t\t\t&& (this.isMulti || items.length === 0)\r\n\t\t\t\t) {\r\n\t\t\t\t\titems.push(options[i]);\r\n\t\t\t\t} else {\r\n\t\t\t\t\tremainder.push(options[i]);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\treturn {\r\n\t\t\t\toptions: remainder,\r\n\t\t\t\tselection: {\r\n\t\t\t\t\titems,\r\n\t\t\t\t\tindices,\r\n\t\t\t\t}\r\n\t\t\t};\r\n\t\t},\r\n\t\tclear: function () {\r\n\t\t\tthis.selection = {\r\n\t\t\t\titems: [],\r\n\t\t\t\tindices: {},\r\n\t\t\t};\r\n\r\n\t\t\tthis.value = '';\r\n\t\t\tthis.reason = 1;\r\n\r\n\t\t\tif (!this.remote) {\r\n\t\t\t\tthis.options = this.getOptions();\r\n\t\t\t} else {\r\n\t\t\t\tif (typeof this.remote.prefetch === 'function') {\r\n\t\t\t\t\tthis.runPrefetcher(this.remote.prefetch);\r\n\t\t\t\t} else {\r\n\t\t\t\t\tthis.source = [];\r\n\t\t\t\t\tthis.options = this.getOptions();\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t},\r\n\t\treset: function () {\r\n\t\t\tconst { options, selection, groups } = this.init();\r\n\r\n\t\t\tthis.value = '';\r\n\t\t\tthis.reason = 1;\r\n\t\t\tthis.options = options;\r\n\t\t\tthis.groups = groups;\r\n\t\t\tthis.selection = selection;\r\n\t\t},\r\n\t\trunPrefetcher: function (prefetcher, keepSelections) {\r\n\t\t\tprefetcher((data, selections = []) => {\r\n\t\t\t\tsetTimeout(() => {\r\n\t\t\t\t\tlet source = this.prepareOptions(data);\r\n\t\t\t\t\tlet initOptions = source;\r\n\t\t\t\t\tlet selection = this.selection;\r\n\r\n\t\t\t\t\tif (\r\n\t\t\t\t\t\tselections\r\n\t\t\t\t\t\t&& selections.length > 0\r\n\t\t\t\t\t\t&& (!keepSelections || !this.selection.items.length) \r\n\t\t\t\t\t) {\r\n\t\t\t\t\t\tconst initState = this.prepareInitState(source, selections);\r\n\t\t\t\t\t\tselection = initState.selection;\r\n\t\t\t\t\t\tinitOptions = initState.options;\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tconst { options, groups } = this.grouped ? this.buildGroupOptions(initOptions) : { options: initOptions, groups: null };\r\n\r\n\t\t\t\t\tthis.source = source;\r\n\t\t\t\t\tthis.options = options;\r\n\t\t\t\t\tthis.selection = selection;\r\n\t\t\t\t\tthis.groups = groups;\r\n\t\t\t\t}, 0);\r\n\t\t\t});\r\n\t\t},\r\n\t\tshieldAction: function (up) {\r\n\t\t\tif (this._shieldId) {\r\n\t\t\t\tclearTimeout(this._shieldId);\r\n\t\t\t}\r\n\r\n\t\t\tif (up) {\r\n\t\t\t\tthis._shieldId = setTimeout(() => {\r\n\t\t\t\t\tthis.shield = true;\r\n\t\t\t\t}, 10);\r\n\t\t\t} else {\r\n\t\t\t\tthis._shieldId = null;\r\n\t\t\t\tthis.shield = false;\r\n\t\t\t}\r\n\t\t},\r\n\t\thandleFocus: function (evt, targetType) {\r\n\t\t\tthis.focusStatus = targetType === \"input\" ? focusStatus.Input : focusStatus.Icon;\r\n\r\n\t\t\tif (this.focusStatus === focusStatus.Input) {\r\n\t\t\t\tthis.open = true;\r\n\t\t\t}\r\n\r\n\t\t\t// console.log('control get focus ... ', this.focusStatus, targetType);\r\n\t\t},\r\n\t\thandleShieldClick: function (_evt) {\r\n\t\t\t// move the cursor back to the input field\r\n\t\t\tthis.focusStatus = focusStatus.Shield;\r\n\t\t\tthis.focusInput();\r\n\t\t\t\r\n\t\t\t// console.log(\"shield clicked ... \", evt);\r\n\t\t},\r\n\t\thandleDbClick: function (_evt) {\r\n\t\t\t// console.log('double click');\r\n\r\n\t\t\tsetTimeout(() => {\r\n\t\t\t\tthis.$refs.inputControl.select();\r\n\t\t\t}, 0);\r\n\t\t},\r\n\t\thandleInputClick: function (_evt) {\r\n\t\t\tthis.focusStatus = focusStatus.Container;\r\n\t\t\tthis.focusInput();\r\n\r\n\t\t\t// console.log('input clicked ...', evt);\r\n\t\t},\r\n\t\thandleIconEvent: function (evt, type) {\r\n\t\t\t// handle icon's click event, this event will NOT be bubbled up and thus\r\n\t\t\t// we need to work on state setups we should do from the \r\n\t\t\t// 'handleInputClick' handler.\r\n\t\t\tthis.focusStatus = focusStatus.Container;\r\n\r\n\t\t\tswitch (type) {\r\n\t\t\t\tcase \"clear\":\r\n\t\t\t\t\tthis.clear();\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase \"dropdown\":\r\n\t\t\t\t\tthis.open = !this.open;\r\n\t\t\t\t\tbreak;\r\n\t\t\t\r\n\t\t\t\tdefault:\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\r\n\t\t\t// if the dropdown icon is clicked, toggle the dropdown menu, otherwise,\r\n\t\t\t// keep it open.\r\n\t\t\tthis.focusInput(type === \"dropdown\" ? this.open : null);\r\n\t\t},\r\n\t\thandleInputBlur: function (evt, force) {\r\n\t\t\t// console.log('blur?', this.focusStatus);\r\n\r\n\t\t\tif (this.focusStatus <= focusStatus.Icon || force) {\r\n\t\t\t\tthis.focusStatus = focusStatus.Pending;\r\n\r\n\t\t\t\tsetTimeout(() => {\r\n\t\t\t\t\t// if some other control has grabbed the focus, we're done\r\n\t\t\t\t\tif (this.focusStatus !== focusStatus.Pending) {\r\n\t\t\t\t\t\treturn;\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tthis.focuseReset();\r\n\t\t\t\t}, 0);\r\n\t\t\t}\r\n\t\t},\r\n\t\thandleInputChange: function (evt, value) {\r\n\t\t\tthis.value = value;\r\n\t\t\tthis.open = true;\r\n\r\n\t\t\tif (value === '' || value.trim() === '') {\r\n\t\t\t\tthis.resetOptions();\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tthis.shieldAction(true);\r\n\r\n\t\t\tif (this._debounceId) {\r\n\t\t\t\tclearTimeout(this._debounceId);\r\n\t\t\t}\r\n\r\n\t\t\tthis._debounceId = setTimeout(() => {\r\n\t\t\t\tthis._engine.query(value, (data = []) => {\r\n\t\t\t\t\t// console.log(data);\r\n\r\n\t\t\t\t\t// for remote search, the source change every time on a search\r\n\t\t\t\t\t// term, hence we need to update the source all the time\r\n\t\t\t\t\tif (this.remote) {\r\n\t\t\t\t\t\tthis.source = this.prepareOptions(data);\r\n\t\t\t\t\t\tthis.options = this.getOptions();\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\tthis.options = this.getOptions(data);\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tthis.reason = 0;\r\n\t\t\t\t\t\r\n\t\t\t\t\tthis.shieldAction(false);\r\n\t\t\t\t\tthis._debounceId = null;\r\n\t\t\t\t});\r\n\t\t\t}, debounceTimeout);\r\n\t\t},\r\n\t\thandleItemSelection: function (evt, key) {\r\n\t\t\t// console.log('item selection ...', key, this.selection.indices);\r\n\t\t\t\r\n\t\t\tif (hasProperty(this.selection.indices, key)) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tlet { items, indices } = this.selection;\r\n\r\n\t\t\tif (!this.isMulti) {\r\n\t\t\t\titems = [];\r\n\t\t\t\tindices = {};\r\n\t\t\t}\r\n\r\n\t\t\tfor (let i = 0; i < this.options.length; i++) {\r\n\t\t\t\tif (this.options[i].key !== key) {\r\n\t\t\t\t\tcontinue;\r\n\t\t\t\t}\r\n\t\t\t\r\n\t\t\t\titems.push(this.options[i]);\r\n\t\t\t\tindices[key] = null;\r\n\r\n\t\t\t\tbreak;\r\n\t\t\t}\r\n\r\n\t\t\tthis.selection = {\r\n\t\t\t\titems,\r\n\t\t\t\tindices,\r\n\t\t\t};\r\n\r\n\t\t\tthis.$emit(\"selection\", {\r\n\t\t\t\ttype: \"add\",\r\n\t\t\t\titems: this.selection.items,\r\n\t\t\t\tvalue: this.value,\r\n\t\t\t});\r\n\r\n\t\t\t// reset the value to empty after a selection\r\n\t\t\tif (this.value !== '') {\r\n\t\t\t\tthis.value = '';\r\n\t\t\t}\r\n\r\n\t\t\tthis.reason = 1;\r\n\t\t\tthis.options = this.getOptions();\r\n\r\n\t\t\t// console.log(key, this.selection.items, this.selection.indices);\r\n\r\n\t\t\tthis.focusStatus = focusStatus.Dropdown;\r\n\t\t\tthis.focusInput();\r\n\t\t},\r\n\t\thandleItemRemoval: function (evt, item) {\r\n\t\t\t// console.log('item removal: ', item);\r\n\r\n\t\t\t// invalid item removal\r\n\t\t\tif (!this.isMulti || !item || !item.key) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tconst { key } = item;\r\n\t\t\tlet { items, indices } = this.selection;\r\n\t\t\tlet deleted = null;\r\n\r\n\t\t\tdelete indices[key];\r\n\t\t\titems = items.filter(item => {\r\n\t\t\t\tif (item.key === key) {\r\n\t\t\t\t\tdeleted = item;\r\n\t\t\t\t\treturn false;\r\n\t\t\t\t} \r\n\r\n\t\t\t\treturn true;\r\n\t\t\t});\r\n\r\n\t\t\tthis.selection = {\r\n\t\t\t\titems,\r\n\t\t\t\tindices,\r\n\t\t\t};\r\n\r\n\t\t\tthis.$emit(\"selection\", {\r\n\t\t\t\ttype: \"remove\",\r\n\t\t\t\titems: this.selection.items,\r\n\t\t\t\tdeleted,\r\n\t\t\t});\r\n\r\n\t\t\t// filter the options against the original list\r\n\t\t\tthis.reason = 1;\r\n\t\t\tthis.options = \r\n\t\t\t\tthis.getOptions().filter(item => !hasProperty(indices, item.key));\r\n\r\n\t\t\tthis.focusStatus = focusStatus.Icon;\r\n\t\t\tthis.focusInput();\r\n\t\t},\r\n\t\thandleSpecialKey: function (key, focusInput) {\r\n\t\t\t// console.log('getting special key: ', key);\r\n\r\n\t\t\tswitch (key) {\r\n\t\t\t\tcase 'enter':\r\n\t\t\t\t\tthis.$refs.dropdownControl\r\n\t\t\t\t\t\t&& this.$refs.dropdownControl.select();\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 'esc':\r\n\t\t\t\t\tthis.open = false;\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 'clear':\r\n\t\t\t\t\tthis.clear();\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 'dropdown':\r\n\t\t\t\t\tthis.open = !this.open;\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 'up':\r\n\t\t\t\tcase 'down':\r\n\t\t\t\t\tif (!this.open) {\r\n\t\t\t\t\t\tthis.open = true;\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\tthis.$refs.dropdownControl\r\n\t\t\t\t\t\t\t&& this.$refs.dropdownControl.move(key);\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 'tab':\r\n\t\t\t\t\tthis.focusStatus = focusStatus.Icon;\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 'tab-out':\r\n\t\t\t\t\tthis.focuseReset();\r\n\t\t\t\t\tbreak;\r\n\t\t\t\r\n\t\t\t\tdefault:\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\r\n\t\t\tif (focusInput) {\r\n\t\t\t\tthis.focusInput();\r\n\t\t\t}\r\n\t\t},\r\n\t},\r\n\twatch: {\r\n\t\tclass: function () {\r\n\t\t\tthis.className = this.getClassName();\r\n\t\t},\r\n\t\tcustomClasses: function () {\r\n\t\t\tthis.className = this.getClassName();\r\n\t\t},\r\n\t\tinitOptions: function () {\r\n\t\t\tthis.reset();\r\n\t\t},\r\n\t\tinitSelections: function () {\r\n\t\t\tthis.reset();\r\n\t\t},\r\n\t},\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.control_container {  \r\n\tposition: relative;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.control_active {\r\n  border: 1px solid blue;\r\n}\r\n\r\n.input_container {\r\n  padding: 0 2px;\r\n  color: rgb(51, 51, 51);\r\n  position: relative;\r\n  display: flex;\r\n  flex: 1 1 0%;\r\n  flex-wrap: wrap;\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n  visibility: visible;\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$7 = "data-v-97a50f50";
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    createInjector,
    undefined,
    undefined
  );

// Declare install function executed by Vue.use()
var install = function (Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('VueAhead', __vue_component__$7);
};

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;

if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}

if (GlobalVue) {
	GlobalVue.use(plugin);
}

export default __vue_component__$7;
//# sourceMappingURL=vue-ahead.esm.js.map