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
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
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
    staticClass: "vue_ahead__control_input_shield",
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
    inject("data-v-015c00ea_0", { source: "\n.vue_ahead__control_input_shield {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tz-index: 100000;\n}\r\n", map: {"version":3,"sources":["F:\\Github\\react-ahead\\vue-ahead\\src\\components\\shield.vue"],"names":[],"mappings":";AAuCA;CACA,WAAA;CACA,YAAA;CACA,kBAAA;CACA,MAAA;CACA,OAAA;CACA,eAAA;AACA","file":"shield.vue","sourcesContent":["<template>\r\n<div\r\n\tclass=\"vue_ahead__control_input_shield\"\r\n\t:style=\"style\"\r\n\t@mousedown=\"$emit('mousedown', $event)\"\r\n>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nconst style = {\r\n\tdisplay: \"none\",\r\n\tbackgroundColor: \"transparent\",\r\n\twidth: \"100%\",\r\n\theight: \"100%\",\r\n\tposition: \"absolute\",\r\n\ttop: 0,\r\n\tleft: 0,\r\n\tzIndex: 100000,\r\n};\r\n\r\nexport default {\r\n\tprops: {\r\n\t\ton: Boolean,\r\n\t},\r\n\tdata: function () {\r\n\t\treturn {\r\n\t\t\tstyle: Object.assign({}, style),\r\n\t\t};\r\n\t},\r\n\twatch: {\r\n\t\ton: function () {\r\n\t\t\tthis.style.display = this.on ? \"inherit\" : \"none\";\r\n\t\t},\r\n\t},\r\n};\r\n</script>\r\n\r\n<style>\r\n.vue_ahead__control_input_shield {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tz-index: 100000;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
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
			type: Number,
			default: 16,
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
    inject("data-v-56f02854_0", { source: "\n.icon[data-v-56f02854] {\r\n\tdisplay: inline-block;\r\n\tfill: currentcolor;\r\n\tline-height: 1;\r\n\tstroke: currentcolor;\r\n\tstroke-width: 0;\n}\r\n", map: {"version":3,"sources":["F:\\Github\\react-ahead\\vue-ahead\\src\\components\\controlIcon.vue"],"names":[],"mappings":";AA0CA;CACA,qBAAA;CACA,kBAAA;CACA,cAAA;CACA,oBAAA;CACA,eAAA;AACA","file":"controlIcon.vue","sourcesContent":["<template>\r\n<div\r\n\taria-hidden=\"true\"\r\n\ttabIndex=\"0\"\r\n\t@click=\"$emit('click', $event)\"\r\n\t@keydown=\"$emit('keydown', $event)\"\r\n>\r\n\t<svg\r\n\t\tx=\"0px\" \r\n\t\ty=\"0px\"\r\n\t\tfocusable=\"false\"\r\n\t\taria-hidden=\"true\"\r\n\t\tclass=\"icon\"\r\n\t\t:width=\"size\"\r\n\t\t:height=\"size\"\r\n\t\t:viewBox=\"viewBox\"\r\n\t>\r\n\t\t<path :d=\"path\" />\r\n\t</svg>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n\tprops: {\r\n\t\tpath: {\r\n\t\t\ttype: String,\r\n\t\t\trequired: true,\r\n\t\t},\r\n\t\tsize: {\r\n\t\t\ttype: Number,\r\n\t\t\tdefault: 16,\r\n\t\t},\r\n\t\tviewBox: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: \"0 0 18 18\",\r\n\t\t},\r\n\t},\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.icon {\r\n\tdisplay: inline-block;\r\n\tfill: currentcolor;\r\n\tline-height: 1;\r\n\tstroke: currentcolor;\r\n\tstroke-width: 0;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = "data-v-56f02854";
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
		label = display(label, item['src'], type);
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

var clearIconPath = "M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z";

var script$2 = {
	props: {
		display: Function,
		item: Object,
		itemRenderer: Object,
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
			var text = utils_1(this.item, this.display, 'multi-selection');

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
    { staticClass: "vue_ahead__selection_container" },
    [
      _c(
        "div",
        {
          staticClass: "vue_ahead__selection_content",
          attrs: { title: _vm.title }
        },
        [
          !_vm.itemRenderer
            ? _c("span", [_vm._v(_vm._s(_vm.text))])
            : _c(_vm.itemRenderer, {
                tag: "component",
                attrs: {
                  item: _vm.item,
                  display: _vm.display,
                  defaultText: _vm.text
                }
              })
        ],
        1
      ),
      _vm._v(" "),
      _c("ControlIcon", {
        staticClass: "vue_ahead__selection_removal",
        attrs: { title: "remove " + _vm.title, path: _vm.iconPath },
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
    inject("data-v-72c033e8_0", { source: "\n.vue_ahead__selection_container {\r\n\tbackground-color: rgb(230, 230, 230);\r\n\tdisplay: flex;\r\n\tmin-width: 0px;\r\n\tbox-sizing: border-box;\r\n\tborder-radius: 2px;\r\n\tmargin: 2px 3px 2px 1px;\n}\n.vue_ahead__selection_content {\r\n\tcolor: rgb(51, 51, 51);\r\n\tfont-size: 80%;\r\n\ttext-overflow: ellipsis;\r\n\twhite-space: nowrap;\r\n\tbox-sizing: border-box;\r\n\toverflow: hidden;\r\n\tpadding: 1px 2px 1px 4px;\n}\n.vue_ahead__selection_removal {\r\n\t-webkit-box-align: center;\r\n\talign-items: center;\r\n\tcursor: pointer;\r\n\tdisplay: flex;\r\n\tpadding: 0 2px 2px 0;\r\n\tbox-sizing: border-box;\r\n\tborder-radius: 2px;\n}\n.vue_ahead__selection_removal:hover {\r\n\tbackground-color: rgb(255, 189, 173);\r\n\tcolor: rgb(222, 53, 11);\n}\r\n", map: {"version":3,"sources":["F:\\Github\\react-ahead\\vue-ahead\\src\\components\\selectionItem.vue"],"names":[],"mappings":";AAkFA;CACA,oCAAA;CACA,aAAA;CACA,cAAA;CACA,sBAAA;CACA,kBAAA;CACA,uBAAA;AACA;AAEA;CACA,sBAAA;CACA,cAAA;CACA,uBAAA;CACA,mBAAA;CACA,sBAAA;CACA,gBAAA;CACA,wBAAA;AACA;AAEA;CACA,yBAAA;CACA,mBAAA;CACA,eAAA;CACA,aAAA;CACA,oBAAA;CACA,sBAAA;CACA,kBAAA;AACA;AAEA;CACA,oCAAA;CACA,uBAAA;AACA","file":"selectionItem.vue","sourcesContent":["<template>\r\n<div class=\"vue_ahead__selection_container\">\r\n\t<div class=\"vue_ahead__selection_content\" :title=\"title\">\r\n\t\t<span v-if=\"!itemRenderer\">{{ text }}</span>\r\n\t\t<component\r\n\t\t\tv-else\r\n\t\t\t:is=\"itemRenderer\"\r\n\t\t\t:item=\"item\"\r\n\t\t\t:display=\"display\"\r\n\t\t\t:defaultText=\"text\"\r\n\t\t/>\r\n\t</div>\r\n\t<ControlIcon\r\n\t\tclass=\"vue_ahead__selection_removal\"\r\n\t\t:title=\"'remove ' + title\"\r\n\t\t:path=\"iconPath\"\r\n\t\t@mousedown.native.stop=\"$emit('item-removal', $event)\"\r\n\t\t@keydown.stop=\"handleRemovalKeydown($event)\"\r\n\t/>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport ControlIcon from './controlIcon.vue';\r\nimport { getDisplay } from '../helpers/utils';\r\n\r\nconst clearIconPath = \"M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z\";\r\n\r\nexport default {\r\n\tprops: {\r\n\t\tdisplay: Function,\r\n\t\titem: Object,\r\n\t\titemRenderer: Object,\r\n\t\tindex: Number,\r\n\t},\r\n\tcomponents: {\r\n\t\tControlIcon,\r\n\t},\r\n\tdata: function () {\r\n\t\tconst { text, title } = this.getDisplayText();\r\n\r\n\t\treturn {\r\n\t\t\ttext,\r\n\t\t\ttitle,\r\n\t\t\ticonPath: clearIconPath,\r\n\t\t};\r\n\t},\r\n\tmethods: {\r\n\t\tgetDisplayText: function () {\r\n\t\t\tconst title = this.item.label || \"...\";\r\n\t\t\tlet text = getDisplay(this.item, this.display, 'multi-selection');\r\n\r\n\t\t\tif (text && text.length > 8) {\r\n\t\t\t\ttext = text.substr(0, 6) + \"...\";\r\n\t\t\t}\r\n\r\n\t\t\treturn {\r\n\t\t\t\ttext,\r\n\t\t\t\ttitle,\r\n\t\t\t};\r\n\t\t},\r\n\t\thandleRemovalKeydown: function (evt, key) {\r\n\t\t\tif (!evt) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tconst { keyCode } = evt;\r\n\r\n\t\t\tif (keyCode === 13 || keyCode === 32) {\r\n\t\t\t\tthis.$emit('item-removal', evt, key);\r\n\t\t\t\tevt.preventDefault();\r\n\t\t\t}\r\n\r\n\t\t\tif (this.index === 0 && keyCode === 9 && evt.shiftKey) {\r\n\t\t\t\tthis.$emit('special-key');\r\n\t\t\t}\r\n\t\t},\r\n\t},\r\n};\r\n</script>\r\n\r\n<style>\r\n.vue_ahead__selection_container {\r\n\tbackground-color: rgb(230, 230, 230);\r\n\tdisplay: flex;\r\n\tmin-width: 0px;\r\n\tbox-sizing: border-box;\r\n\tborder-radius: 2px;\r\n\tmargin: 2px 3px 2px 1px;\r\n}\r\n\r\n.vue_ahead__selection_content {\r\n\tcolor: rgb(51, 51, 51);\r\n\tfont-size: 80%;\r\n\ttext-overflow: ellipsis;\r\n\twhite-space: nowrap;\r\n\tbox-sizing: border-box;\r\n\toverflow: hidden;\r\n\tpadding: 1px 2px 1px 4px;\r\n}\r\n\r\n.vue_ahead__selection_removal {\r\n\t-webkit-box-align: center;\r\n\talign-items: center;\r\n\tcursor: pointer;\r\n\tdisplay: flex;\r\n\tpadding: 0 2px 2px 0;\r\n\tbox-sizing: border-box;\r\n\tborder-radius: 2px;\r\n}\r\n\r\n.vue_ahead__selection_removal:hover {\r\n\tbackground-color: rgb(255, 189, 173);\r\n\tcolor: rgb(222, 53, 11);\r\n}\r\n</style>\r\n"]}, media: undefined });

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
	padding: "0",
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
	padding: "0 0 0 1px",
};

var clearIconPath$1 = "M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z";

var dropdownIconPath = "M 4.516 7.548 c 0.436 -0.446 1.043 -0.481 1.576 0 l 3.908 3.747 l 3.908 -3.747 c 0.533 -0.481 1.141 -0.446 1.574 0 c 0.436 0.445 0.408 1.197 0 1.615 c -0.406 0.418 -4.695 4.502 -4.695 4.502 c -0.217 0.223 -0.502 0.335 -0.787 0.335 s -0.57 -0.112 -0.789 -0.335 c 0 0 -4.287 -4.084 -4.695 -4.502 s -0.436 -1.17 0 -1.615 Z";

var script$3 = {
	props: {
		active: Boolean,
		customClassNames: Object,
		display: Function,
		isMulti: Boolean,
		multiSelRenderer: Object,
		placeholder: {
			type: String,
			default: '',
		},
		singleSelRenderer: Object,
		selection: Array,
		theme: String,
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
			classes: {
				wrapper: this.getWrapperClassName(),
				placeholder: placeholder,
			},
			path: {
				clear: clearIconPath$1,
				dropdown: dropdownIconPath,
			},
			phContent: phContent,
			styles: {
				container: contentHolderStyle,
				input: Object.assign({}, inputStyle),
				field: fieldStyle,
			},
			width: 2,
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
			var wrapperClassName = !this.theme
				? "vue_ahead__control_wrapper vue_ahead__regular_theme"
				: "vue_ahead__control_wrapper form-control";

			// console.log(this.theme);

			if (this.customClassNames && this.customClassNames.input) {
				wrapperClassName += " " + this.customClassNames.input;
			}

			if (this.active) {
				if (this.customClassNames && this.customClassNames.active) {
					wrapperClassName += " " + this.customClassNames.active;
				} else {
					wrapperClassName += !this.theme
						? " vue_ahead__control_active"
						: " vue_ahead__themed_control_active";
				}
			}

			return wrapperClassName;
		},
		getSelectionKey: function (item, index) {
			return index.toString() + '#' + utils_3(item).substr(0, 5);
		},
		getPlaceholder: function () {
			var ph = {
				placeholder: "vue_ahead__plain_text",
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
				ph.placeholder += " vue_ahead__plain_text_values";
				ph.phContent.content =
					utils_1(this.selection[0], this.display, 'selection');
			} else if (this.selection.length === 0) {
				ph.phContent.content = this.placeholder || '';
			}

			// the selection renderer shall take care of the title (i.e. the
			// hover over tip)
			ph.phContent.title = ph.phContent.content;

			if (ph.phContent.content && ph.phContent.content.length > 32) {
				ph.phContent.content = ph.phContent.content.substr(0, 30) + " ...";
			}

			return ph;
		},
		getItemClass: function (item) {
			if (!item) {
				return null;
			}

			return item["src"]["class"] || null;
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
					this.$emit('special-key', type, type === 'clear');
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
	computed: {
		singleValClass: function () {
			if (this.selection && this.selection.length === 1) {
				return this.getItemClass(this.selection[0]);
			}

			return null;
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
          staticClass: "vue_ahead__input_container",
          attrs: { title: _vm.phContent.title }
        },
        [
          _vm.phContent.content !== ""
            ? _c(
                "div",
                { class: _vm.classes.placeholder },
                [
                  !_vm.singleSelRenderer || !_vm.selection.length
                    ? _c("div", { class: _vm.singleValClass }, [
                        _vm._v(
                          "\r\n\t\t\t\t" +
                            _vm._s(_vm.phContent.content) +
                            "\r\n\t\t\t"
                        )
                      ])
                    : _c(_vm.singleSelRenderer, {
                        tag: "component",
                        class: _vm.singleValClass,
                        attrs: {
                          defaultText: _vm.phContent.content,
                          display: _vm.display,
                          item: _vm.selection[0]["src"]
                        }
                      })
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.selection, function(item, index) {
            return _c(
              "div",
              { key: _vm.getSelectionKey(item, index) },
              [
                _vm.isMulti
                  ? _c("SelectionItem", {
                      class: _vm.getItemClass(item),
                      attrs: {
                        item: item,
                        itemRenderer: _vm.multiSelRenderer,
                        index: index
                      },
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
        { staticClass: "vue_ahead__icons_container" },
        [
          _c("ControlIcon", {
            staticClass: "vue_ahead__action_icon vue_ahead__clear_icon",
            attrs: { title: "clear all", path: _vm.path.clear, size: 18 },
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
          _c("span", { staticClass: "vue_ahead__action_icon_separator" }),
          _vm._v(" "),
          _c("ControlIcon", {
            staticClass: "vue_ahead__action_icon vue_ahead__dropdown_icon",
            attrs: {
              title: "dropdown menu",
              path: _vm.path.dropdown,
              size: 18
            },
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
    inject("data-v-7e07cd3e_0", { source: "\n.vue_ahead__control_wrapper {\r\n\t-webkit-box-align: center;\r\n\t-webkit-box-pack: justify;\r\n\tposition: relative;\r\n\tdisplay: flex;\r\n\tflex-wrap: wrap;\r\n\talign-items: center;\r\n\tbox-sizing: border-box;\r\n\tjustify-content: space-between;\n}\n.vue_ahead__regular_theme {\r\n\tpadding: 0 6px;\r\n\tbackground-color: rgb(255, 255, 255);\r\n\tborder: 1px solid rgb(204, 204, 204);\r\n\tborder-radius: 2px;\r\n\ttransition: all 100ms ease 0s;\n}\r\n\r\n/* Theme accommodations */\n.vue_ahead__control_wrapper.form-control {\r\n\tpadding-right: 6px;\r\n\tpadding-top: 4px;\n}\n.vue_ahead__control_wrapper.vue_ahead__control_active {\r\n\tborder: 1px solid blue;\n}\r\n\r\n/* Theme accommodations */\n.vue_ahead__control_wrapper.vue_ahead__themed_control_active {\r\n\tcolor: #495057;\r\n\tbackground-color: #fff;\r\n\tborder-color: #80bdff;\r\n\toutline: 0;\r\n\tbox-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);\n}\n.vue_ahead__input_container {\r\n\tpadding: 2px 0;\r\n\tcolor: rgb(51, 51, 51);\r\n\tposition: relative;\r\n\tdisplay: flex;\r\n\tflex: 1 1 0;\r\n\tflex-wrap: wrap;\r\n\tbox-sizing: border-box;\r\n\toverflow: hidden;\r\n\tvisibility: visible;\r\n\tcursor: text;\r\n\twidth: 100%;\n}\n.vue_ahead__plain_text {\r\n\tposition: absolute;\r\n\ttop: 50%;\r\n\tcolor: rgb(128, 128, 128);\r\n\tmargin: 0;\r\n\tpadding: 0 1px;\r\n\ttransform: translateY(-50%);\r\n\tbox-sizing: border-box;\r\n\toverflow: hidden;\r\n\ttext-overflow: ellipsis;\r\n\t-ms-user-select: none;\r\n\tuser-select: none;\n}\n.vue_ahead__plain_text.vue_ahead__plain_text_values {\r\n\tcolor: inherit;\n}\n.vue_ahead__icons_container {\r\n\t-webkit-box-align: center;\r\n\talign-items: center;\r\n\talign-self: stretch;\r\n\tdisplay: flex;\r\n\tflex-shrink: 0;\r\n\tbox-sizing: border-box;\r\n\tpadding-bottom: 1px;\n}\r\n\r\n/* Theme accommodations */\n.form-control > .vue_ahead__icons_container {\r\n\tpadding-bottom: 2px;\n}\n.vue_ahead__action_icon {\r\n\tcolor: rgb(204, 204, 204);\r\n\tdisplay: flex;\r\n\tbox-sizing: border-box;\r\n\tpadding: 4px 2px;\r\n\ttransition: color 150ms ease 0s;\n}\n.vue_ahead__action_icon.vue_ahead__clear_icon {\r\n\tpadding-right: 4px;\n}\n.vue_ahead__action_icon.vue_ahead__dropdown_icon {\r\n\tmargin-bottom: 1px;\n}\n.vue_ahead__action_icon:hover {\r\n\tcursor: pointer;\r\n\tcolor: rgb(153, 153, 153);\n}\n.vue_ahead__action_icon:active {\r\n\toutline: none !important;\r\n\tcolor: rgb(92, 92, 92);\n}\n.vue_ahead__action_icon:focus {\r\n\tcolor: rgb(153, 153, 153);\r\n\toutline: 2px dotted gray;\n}\n.vue_ahead__action_icon_separator {\r\n\talign-self: stretch;\r\n\tbackground-color: rgb(204, 204, 204);\r\n\tmargin: 6px 2px;\r\n\twidth: 1px;\r\n\tbox-sizing: border-box;\n}\r\n", map: {"version":3,"sources":["F:\\Github\\react-ahead\\vue-ahead\\src\\components\\input.vue"],"names":[],"mappings":";AAyZA;CACA,yBAAA;CACA,yBAAA;CACA,kBAAA;CACA,aAAA;CACA,eAAA;CACA,mBAAA;CACA,sBAAA;CACA,8BAAA;AACA;AAEA;CACA,cAAA;CACA,oCAAA;CACA,oCAAA;CACA,kBAAA;CACA,6BAAA;AACA;;AAEA,yBAAA;AACA;CACA,kBAAA;CACA,gBAAA;AACA;AAEA;CACA,sBAAA;AACA;;AAEA,yBAAA;AACA;CACA,cAAA;CACA,sBAAA;CACA,qBAAA;CACA,UAAA;CACA,4CAAA;AACA;AAEA;CACA,cAAA;CACA,sBAAA;CACA,kBAAA;CACA,aAAA;CACA,WAAA;CACA,eAAA;CACA,sBAAA;CACA,gBAAA;CACA,mBAAA;CACA,YAAA;CACA,WAAA;AACA;AAEA;CACA,kBAAA;CACA,QAAA;CACA,yBAAA;CACA,SAAA;CACA,cAAA;CACA,2BAAA;CACA,sBAAA;CACA,gBAAA;CACA,uBAAA;CACA,qBAAA;CACA,iBAAA;AACA;AAEA;CACA,cAAA;AACA;AAEA;CACA,yBAAA;CACA,mBAAA;CACA,mBAAA;CACA,aAAA;CACA,cAAA;CACA,sBAAA;CACA,mBAAA;AACA;;AAEA,yBAAA;AACA;CACA,mBAAA;AACA;AAEA;CACA,yBAAA;CACA,aAAA;CACA,sBAAA;CACA,gBAAA;CACA,+BAAA;AACA;AAEA;CACA,kBAAA;AACA;AAEA;CACA,kBAAA;AACA;AAEA;CACA,eAAA;CACA,yBAAA;AACA;AAEA;CACA,wBAAA;CACA,sBAAA;AACA;AAEA;CACA,yBAAA;CACA,wBAAA;AACA;AAEA;CACA,mBAAA;CACA,oCAAA;CACA,eAAA;CACA,UAAA;CACA,sBAAA;AACA","file":"input.vue","sourcesContent":["<template>\r\n<div\r\n\t:class=\"classes.wrapper\"\r\n\t@dblclick.capture.stop=\"$emit('dblclick', $event)\"\r\n\t@mousedown.stop=\"$emit('mousedown', $event)\"\r\n\t@focus.capture=\"handleFocus\"\r\n\t@blur.capture=\"$emit('blur', $event)\"\r\n>\r\n\t<div\r\n\t\tclass=\"vue_ahead__input_container\"\r\n\t\t:title=\"phContent.title\"\r\n\t>\r\n\t\t<div\r\n\t\t\tv-if=\"phContent.content !== ''\"\r\n\t\t\t:class=\"classes.placeholder\"\r\n\t\t>\r\n\t\t\t<div \r\n\t\t\t\tv-if=\"!singleSelRenderer || !selection.length\"\r\n\t\t\t\t:class=\"singleValClass\"\r\n\t\t\t>\r\n\t\t\t\t{{ phContent.content }}\r\n\t\t\t</div>\r\n\t\t\t<component\r\n\t\t\t\tv-else\r\n\t\t\t\t:is=\"singleSelRenderer\"\r\n\t\t\t\t:class=\"singleValClass\"\r\n\t\t\t\t:defaultText=\"phContent.content\"\r\n\t\t\t\t:display=\"display\"\r\n\t\t\t\t:item=\"selection[0]['src']\"\r\n\t\t\t/>\r\n\t\t</div>\r\n\r\n\t\t<div\r\n\t\t\tv-for=\"(item, index) in selection\"\r\n\t\t\t:key=\"getSelectionKey(item, index)\"\r\n\t\t>\r\n\t\t\t<SelectionItem\r\n\t\t\t\tv-if=\"isMulti\"\r\n\t\t\t\t:class=\"getItemClass(item)\"\r\n\t\t\t\t:item=\"item\"\r\n\t\t\t\t:itemRenderer=\"multiSelRenderer\"\r\n\t\t\t\t:index=\"index\"\r\n\t\t\t\t@item-removal=\"$emit('item-removal', $event, item)\"\r\n\t\t\t\t@special-key=\"$emit('special-key', 'tab-out')\"\r\n\t\t\t/>\r\n\t\t</div>\r\n\r\n\t\t<div :style=\"styles.field\">\r\n\t\t\t<input\r\n\t\t\t\tautoCapitalize=\"none\"\r\n\t\t\t\tautoComplete=\"off\"\r\n\t\t\t\tautoCorrect=\"off\"\r\n\t\t\t\tspellCheck=\"false\"\r\n\t\t\t\ttype=\"text\"\r\n\t\t\t\tref=\"input\"\r\n\t\t\t\t:value=\"value\"\r\n\t\t\t\t:style=\"styles.input\"\r\n\t\t\t\t@keydown=\"handleKeydown\"\r\n\t\t\t\t@input=\"handleInput\"\r\n\t\t\t/>\r\n\t\t\t<div\r\n\t\t\t\tref=\"contentHolder\"\r\n\t\t\t\t:style=\"styles.container\"\r\n\t\t\t>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class=\"vue_ahead__icons_container\">\r\n\t\t<ControlIcon\r\n\t\t\tclass=\"vue_ahead__action_icon vue_ahead__clear_icon\"\r\n\t\t\ttitle=\"clear all\"\r\n\t\t\t:path=\"path.clear\"\r\n\t\t\t:size=\"18\"\r\n\t\t\t@mousedown.native.stop=\"$emit('icon-event', $event, 'clear')\"\r\n\t\t\t@keydown.stop=\"handleIconKeydown($event, 'clear')\"\r\n\t\t/>\r\n\t\t<span class=\"vue_ahead__action_icon_separator\"></span>\r\n\t\t<ControlIcon\r\n\t\t\tclass=\"vue_ahead__action_icon vue_ahead__dropdown_icon\"\r\n\t\t\ttitle=\"dropdown menu\"\r\n\t\t\t:path=\"path.dropdown\"\r\n\t\t\t:size=\"18\"\r\n\t\t\t@mousedown.native.stop=\"$emit('icon-event', $event, 'dropdown')\"\r\n\t\t\t@keydown.stop=\"handleIconKeydown($event, 'dropdown')\"\r\n\t\t/>\r\n\t</div>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport SelectionItem from './selectionItem.vue';\r\nimport ControlIcon from './controlIcon.vue';\r\nimport { getItemLabel, getDisplay } from '../helpers/utils';\r\n\r\nconst inputStyle = {\r\n\tboxSizing: \"content-box\",\r\n\tcolor: \"inherit\",\r\n\tfontSize: \"inherit\",\r\n\tfontFamily: \"inherit\",\r\n\tfontWeight: \"inherit\",\r\n\tminWidth: \"1px\",\r\n\twidth: \"2px\",\r\n\theight: \"100%\",\r\n\toutline: \"none\",\r\n\tborder: 0,\r\n\tpadding: \"0\",\r\n};\r\n\r\nconst contentHolderStyle = {\r\n\tposition: \"absolute\",\r\n\ttop: \"0\",\r\n\tleft: \"0\",\r\n\tvisibility: \"hidden\",\r\n\theight: \"0\",\r\n\twidth: \"min-content\",\r\n\toverflow: \"auto\",\r\n\twhiteSpace: \"pre\",\r\n\tfontSize: \"inherit\",\r\n\tfontFamily: \"inherit\",\r\n\tfontWeight: \"inherit\",\r\n\tfontStyle: \"normal\",\r\n\tletterSpacing: \"normal\",\r\n\ttextTransform: \"none\",\r\n};\r\n\r\nconst fieldStyle = {\r\n\tdisplay: \"inline-block\",\r\n\tpadding: \"0 0 0 1px\",\r\n};\r\n\r\nconst clearIconPath = \"M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z\";\r\n\r\nconst dropdownIconPath = \"M 4.516 7.548 c 0.436 -0.446 1.043 -0.481 1.576 0 l 3.908 3.747 l 3.908 -3.747 c 0.533 -0.481 1.141 -0.446 1.574 0 c 0.436 0.445 0.408 1.197 0 1.615 c -0.406 0.418 -4.695 4.502 -4.695 4.502 c -0.217 0.223 -0.502 0.335 -0.787 0.335 s -0.57 -0.112 -0.789 -0.335 c 0 0 -4.287 -4.084 -4.695 -4.502 s -0.436 -1.17 0 -1.615 Z\";\r\n\r\nexport default {\r\n\tprops: {\r\n\t\tactive: Boolean,\r\n\t\tcustomClassNames: Object,\r\n\t\tdisplay: Function,\r\n\t\tisMulti: Boolean,\r\n\t\tmultiSelRenderer: Object,\r\n\t\tplaceholder: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: '',\r\n\t\t},\r\n\t\tsingleSelRenderer: Object,\r\n\t\tselection: Array,\r\n\t\ttheme: String,\r\n\t\tvalue: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: '',\r\n\t\t},\r\n\t},\r\n\tcomponents: {\r\n\t\tControlIcon,\r\n\t\tSelectionItem,\r\n\t},\r\n\tdata: function () {\r\n\t\tconst { placeholder, phContent } = this.getPlaceholder();\r\n\r\n\t\treturn {\r\n\t\t\tclasses: {\r\n\t\t\t\twrapper: this.getWrapperClassName(),\r\n\t\t\t\tplaceholder,\r\n\t\t\t},\r\n\t\t\tpath: {\r\n\t\t\t\tclear: clearIconPath,\r\n\t\t\t\tdropdown: dropdownIconPath,\r\n\t\t\t},\r\n\t\t\tphContent,\r\n\t\t\tstyles: {\r\n\t\t\t\tcontainer: contentHolderStyle,\r\n\t\t\t\tinput: Object.assign({}, inputStyle),\r\n\t\t\t\tfield: fieldStyle,\r\n\t\t\t},\r\n\t\t\twidth: 2,\r\n\t\t};\r\n\t},\r\n\tmethods: {\r\n\t\tclear: function () {\r\n\t\t\tthis.$refs.contentHolder.innerText = '';\r\n\t\t\tthis.styles.input.width = \"2px\";\r\n\t\t},\r\n\t\tfocus: function () {\r\n\t\t\tthis.$refs.input.focus();\r\n\t\t},\r\n\t\tselect: function () {\r\n\t\t\tif (this.value === '') {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tconst { input } = this.$refs;\r\n\t\t\tconst start = input.selectionStart;\r\n\t\t\tconst end = input.selectionEnd;\r\n\r\n\t\t\tif (start < end) {\r\n\t\t\t\tinput.setSelectionRange(this.value.length, this.value.length);\r\n\t\t\t} else {\r\n\t\t\t\tinput.select();\r\n\t\t\t}\r\n\t\t},\r\n\t\tgetWrapperClassName: function () {\r\n\t\t\tlet wrapperClassName = !this.theme\r\n\t\t\t\t? \"vue_ahead__control_wrapper vue_ahead__regular_theme\"\r\n\t\t\t\t: \"vue_ahead__control_wrapper form-control\";\r\n\r\n\t\t\t// console.log(this.theme);\r\n\r\n\t\t\tif (this.customClassNames && this.customClassNames.input) {\r\n\t\t\t\twrapperClassName += \" \" + this.customClassNames.input;\r\n\t\t\t}\r\n\r\n\t\t\tif (this.active) {\r\n\t\t\t\tif (this.customClassNames && this.customClassNames.active) {\r\n\t\t\t\t\twrapperClassName += \" \" + this.customClassNames.active;\r\n\t\t\t\t} else {\r\n\t\t\t\t\twrapperClassName += !this.theme\r\n\t\t\t\t\t\t? \" vue_ahead__control_active\"\r\n\t\t\t\t\t\t: \" vue_ahead__themed_control_active\";\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\treturn wrapperClassName;\r\n\t\t},\r\n\t\tgetSelectionKey: function (item, index) {\r\n\t\t\treturn index.toString() + '#' + getItemLabel(item).substr(0, 5);\r\n\t\t},\r\n\t\tgetPlaceholder: function () {\r\n\t\t\tconst ph = {\r\n\t\t\t\tplaceholder: \"vue_ahead__plain_text\",\r\n\t\t\t\tphContent: {\r\n\t\t\t\t\tcontent: '',\r\n\t\t\t\t\ttitle: '',\r\n\t\t\t\t},\r\n\t\t\t};\r\n\r\n\t\t\tif (this.value !== '') {\r\n\t\t\t\tph.phContent.content = '';\r\n\t\t\t\tph.phContent.title = this.value;\r\n\r\n\t\t\t\treturn ph;\r\n\t\t\t}\r\n\r\n\t\t\tif (!this.isMulti && this.selection.length === 1) {\r\n\t\t\t\tph.placeholder += \" vue_ahead__plain_text_values\";\r\n\t\t\t\tph.phContent.content =\r\n\t\t\t\t\tgetDisplay(this.selection[0], this.display, 'selection');\r\n\t\t\t} else if (this.selection.length === 0) {\r\n\t\t\t\tph.phContent.content = this.placeholder || '';\r\n\t\t\t}\r\n\r\n\t\t\t// the selection renderer shall take care of the title (i.e. the\r\n\t\t\t// hover over tip)\r\n\t\t\tph.phContent.title = ph.phContent.content;\r\n\r\n\t\t\tif (ph.phContent.content && ph.phContent.content.length > 32) {\r\n\t\t\t\tph.phContent.content = ph.phContent.content.substr(0, 30) + \" ...\";\r\n\t\t\t}\r\n\r\n\t\t\treturn ph;\r\n\t\t},\r\n\t\tgetItemClass: function (item) {\r\n\t\t\tif (!item) {\r\n\t\t\t\treturn null;\r\n\t\t\t}\r\n\r\n\t\t\treturn item[\"src\"][\"class\"] || null;\r\n\t\t},\r\n\t\thandleFocus: function (evt) {\r\n\t\t\t// check if it's the icons that get the focus\r\n\t\t\tlet focusInput = evt && evt.target && evt.target.nodeName === \"INPUT\";\r\n\r\n\t\t\t// bubble up the icon focus information\r\n\t\t\tthis.$emit('focus', evt, focusInput ? 'input' : 'icon');\r\n\t\t},\r\n\t\thandleInput: function (evt) {\r\n\t\t\tconst val = evt && evt.target && evt.target.value || '';\r\n\r\n\t\t\tthis.$refs.contentHolder.innerText = val;\r\n\t\t\tthis.styles.input.width = `${this.$refs.contentHolder.offsetWidth + 2}px`;\r\n\r\n\t\t\tthis.$emit('change', evt, val);\r\n\t\t},\r\n\t\thandleKeydown: function (evt, keyCode) {\r\n\t\t\tif (!keyCode) {\r\n\t\t\t\tif (!evt) {\r\n\t\t\t\t\treturn;\r\n\t\t\t\t}\r\n\r\n\t\t\t\tkeyCode = evt.keyCode || 0;\r\n\t\t\t}\r\n\r\n\t\t\tswitch (keyCode) {\r\n\t\t\t\tcase 8:\r\n\t\t\t\t\t// backspace\r\n\t\t\t\t\tif (this.isMulti && this.value === '' && this.selection.length > 0) {\r\n\t\t\t\t\t\t// this.$emit('special-key', 'backspace');\r\n\t\t\t\t\t\tconst item = this.selection[this.selection.length - 1];\r\n\t\t\t\t\t\tthis.$emit('item-removal', evt, item);\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 9:\r\n\t\t\t\t\t// tab\r\n\t\t\t\t\tif (!evt.shiftKey) {\r\n\t\t\t\t\t\tthis.$emit('special-key', 'tab');\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 13:\r\n\t\t\t\t\t// enter: selection\r\n\t\t\t\t\tevt.preventDefault();\r\n\t\t\t\t\tthis.$emit('special-key', 'enter');\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 27:\r\n\t\t\t\t\t// esc\r\n\t\t\t\t\tevt.preventDefault();\r\n\t\t\t\t\tthis.$emit('special-key', 'esc');\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 38:\r\n\t\t\t\t\t// arrow up\r\n\t\t\t\tcase 40:\r\n\t\t\t\t\t// arrow down\r\n\t\t\t\t\tevt.preventDefault();\r\n\t\t\t\t\tthis.$emit('special-key', keyCode === 38 ? 'up' : 'down');\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tdefault:\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t},\r\n\t\thandleIconKeydown: function (evt, type) {\r\n\t\t\tconst {keyCode} = evt;\r\n\r\n\t\t\tswitch (keyCode) {\r\n\t\t\t\tcase 13:\r\n\t\t\t\t\t// space\r\n\t\t\t\tcase 32:\r\n\t\t\t\t\t// enter\r\n\t\t\t\t\tthis.$emit('special-key', type, type === 'clear');\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 38:\r\n\t\t\t\t\t// up\r\n\t\t\t\tcase 40:\r\n\t\t\t\t\t// down\r\n\t\t\t\t\tthis.$emit('special-key', keyCode === 38 ? 'up' : 'down', true);\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 9:\r\n\t\t\t\t\t// tab\r\n\t\t\t\t\tif (type === 'dropdown' && !evt.shiftKey) {\r\n\t\t\t\t\t\tthis.$emit('special-key', 'tab-out');\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tdefault:\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t},\r\n\t},\r\n\tcomputed: {\r\n\t\tsingleValClass: function () {\r\n\t\t\tif (this.selection && this.selection.length === 1) {\r\n\t\t\t\treturn this.getItemClass(this.selection[0]);\r\n\t\t\t}\r\n\r\n\t\t\treturn null;\r\n\t\t},\r\n\t},\r\n\twatch: {\r\n\t\tvalue: function () {\r\n\t\t\tif (this.value === '') {\r\n\t\t\t\t// reset the input control width\r\n\t\t\t\tthis.clear();\r\n\t\t\t}\r\n\r\n\t\t\t// update the display style and/or content\r\n\t\t\tconst { placeholder, phContent } = this.getPlaceholder();\r\n\r\n\t\t\tthis.classes.placeholder = placeholder;\r\n\t\t\tthis.phContent = phContent;\r\n\t\t},\r\n\t\tselection: function () {\r\n\t\t\tconst { placeholder, phContent } = this.getPlaceholder();\r\n\r\n\t\t\tthis.classes.placeholder = placeholder;\r\n\t\t\tthis.phContent = phContent;\r\n\t\t},\r\n\t\tactive: function () {\r\n\t\t\tthis.classes.wrapper = this.getWrapperClassName();\r\n\t\t},\r\n\t\tcustomClassNames: function () {\r\n\t\t\tthis.classes.wrapper = this.getWrapperClassName();\r\n\t\t},\r\n\t}\r\n};\r\n</script>\r\n\r\n<style>\r\n.vue_ahead__control_wrapper {\r\n\t-webkit-box-align: center;\r\n\t-webkit-box-pack: justify;\r\n\tposition: relative;\r\n\tdisplay: flex;\r\n\tflex-wrap: wrap;\r\n\talign-items: center;\r\n\tbox-sizing: border-box;\r\n\tjustify-content: space-between;\r\n}\r\n\r\n.vue_ahead__regular_theme {\r\n\tpadding: 0 6px;\r\n\tbackground-color: rgb(255, 255, 255);\r\n\tborder: 1px solid rgb(204, 204, 204);\r\n\tborder-radius: 2px;\r\n\ttransition: all 100ms ease 0s;\r\n}\r\n\r\n/* Theme accommodations */\r\n.vue_ahead__control_wrapper.form-control {\r\n\tpadding-right: 6px;\r\n\tpadding-top: 4px;\r\n}\r\n\r\n.vue_ahead__control_wrapper.vue_ahead__control_active {\r\n\tborder: 1px solid blue;\r\n}\r\n\r\n/* Theme accommodations */\r\n.vue_ahead__control_wrapper.vue_ahead__themed_control_active {\r\n\tcolor: #495057;\r\n\tbackground-color: #fff;\r\n\tborder-color: #80bdff;\r\n\toutline: 0;\r\n\tbox-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);\r\n}\r\n\r\n.vue_ahead__input_container {\r\n\tpadding: 2px 0;\r\n\tcolor: rgb(51, 51, 51);\r\n\tposition: relative;\r\n\tdisplay: flex;\r\n\tflex: 1 1 0;\r\n\tflex-wrap: wrap;\r\n\tbox-sizing: border-box;\r\n\toverflow: hidden;\r\n\tvisibility: visible;\r\n\tcursor: text;\r\n\twidth: 100%;\r\n}\r\n\r\n.vue_ahead__plain_text {\r\n\tposition: absolute;\r\n\ttop: 50%;\r\n\tcolor: rgb(128, 128, 128);\r\n\tmargin: 0;\r\n\tpadding: 0 1px;\r\n\ttransform: translateY(-50%);\r\n\tbox-sizing: border-box;\r\n\toverflow: hidden;\r\n\ttext-overflow: ellipsis;\r\n\t-ms-user-select: none;\r\n\tuser-select: none;\r\n}\r\n\r\n.vue_ahead__plain_text.vue_ahead__plain_text_values {\r\n\tcolor: inherit;\r\n}\r\n\r\n.vue_ahead__icons_container {\r\n\t-webkit-box-align: center;\r\n\talign-items: center;\r\n\talign-self: stretch;\r\n\tdisplay: flex;\r\n\tflex-shrink: 0;\r\n\tbox-sizing: border-box;\r\n\tpadding-bottom: 1px;\r\n}\r\n\r\n/* Theme accommodations */\r\n.form-control > .vue_ahead__icons_container {\r\n\tpadding-bottom: 2px;\r\n}\r\n\r\n.vue_ahead__action_icon {\r\n\tcolor: rgb(204, 204, 204);\r\n\tdisplay: flex;\r\n\tbox-sizing: border-box;\r\n\tpadding: 4px 2px;\r\n\ttransition: color 150ms ease 0s;\r\n}\r\n\r\n.vue_ahead__action_icon.vue_ahead__clear_icon {\r\n\tpadding-right: 4px;\r\n}\r\n\r\n.vue_ahead__action_icon.vue_ahead__dropdown_icon {\r\n\tmargin-bottom: 1px;\r\n}\r\n\r\n.vue_ahead__action_icon:hover {\r\n\tcursor: pointer;\r\n\tcolor: rgb(153, 153, 153);\r\n}\r\n\r\n.vue_ahead__action_icon:active {\r\n\toutline: none !important;\r\n\tcolor: rgb(92, 92, 92);\r\n}\r\n\r\n.vue_ahead__action_icon:focus {\r\n\tcolor: rgb(153, 153, 153);\r\n\toutline: 2px dotted gray;\r\n}\r\n\r\n.vue_ahead__action_icon_separator {\r\n\talign-self: stretch;\r\n\tbackground-color: rgb(204, 204, 204);\r\n\tmargin: 6px 2px;\r\n\twidth: 1px;\r\n\tbox-sizing: border-box;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = undefined;
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
		created: Boolean,
		highlightSource: String,
		item: Object,
		index: Number,
	},
	data: function () {
		return {
			className: this.getClassName(),
			content: this.getDisplay(),
			styles: {
				prefix: {
					paddingRight: "2px",
					opacity: 0.8,
					fontWeight: 600,
				},
				text: {
					padding: 0,
					margin: 0,
					opacity: this.highlightSource ? 0.8 : 1,
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
			var base = this.active ? "vue_ahead__menu_option vue_ahead__menu_option_active" : "vue_ahead__menu_option";

			if (this.class && this.active) {
				base += " " + this.class;
			}

			return base;
		},
		getDisplay: function () {
			var base = utils_3(this.item);

			if (this.highlightSource && !this.created && base) {
				var src = base.trim().toLowerCase();
				var tgt = this.highlightSource.trim().toLowerCase();
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
				var scrollHeight = ref.scrollHeight;
				this.$emit('item-activated', offsetTop, scrollHeight);
			}
		},
		highlightSource: function () {
			this.content = this.getDisplay();
			this.styles.text['opacity'] = this.highlightSource ? 0.8 : 1;
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
      _vm.created
        ? _c("span", { style: _vm.styles.prefix }, [_vm._v("Create: ")])
        : _vm._e(),
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
    inject("data-v-1d79defb_0", { source: "\n.vue_ahead__menu_option {\r\n\tbackground-color: transparent;\r\n\tcolor: inherit;\r\n\tcursor: default;\r\n\tdisplay: block;\r\n\tfont-size: inherit;\r\n\twidth: 100%;\r\n\tuser-select: none;\r\n\tbox-sizing: border-box;\r\n\tpadding: 6px 12px;\n}\n.vue_ahead__menu_option.vue_ahead__menu_option_active {\r\n\tbackground-color: rgb(222, 235, 255);\n}\r\n", map: {"version":3,"sources":["F:\\Github\\react-ahead\\vue-ahead\\src\\components\\dropdownItem.vue"],"names":[],"mappings":";AA8FA;CACA,6BAAA;CACA,cAAA;CACA,eAAA;CACA,cAAA;CACA,kBAAA;CACA,WAAA;CACA,iBAAA;CACA,sBAAA;CACA,iBAAA;AACA;AAEA;CACA,oCAAA;AACA","file":"dropdownItem.vue","sourcesContent":["<template>\r\n<div\r\n\tref=\"elem\"\r\n\t:class=\"className\"\r\n\t@mouseover.capture=\"$emit('mouseover', $event, index)\"\r\n\t@mousedown=\"$emit('mousedown', $event, index)\"\r\n>\r\n\t<span v-if=\"created\" :style=\"styles.prefix\">Create: </span><span :style=\"styles.text\">{{ content[0] }}</span><span v-if=\"content[1]\" :style=\"styles.hl\">{{ content[1] }}</span><span v-if=\"content[2]\" :style=\"styles.text\">{{ content[2] }}</span>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport { getItemLabel } from '../helpers/utils';\r\n\r\nexport default {\r\n\tprops: {\r\n\t\tactive: Boolean,\r\n\t\tcreated: Boolean,\r\n\t\thighlightSource: String,\r\n\t\titem: Object,\r\n\t\tindex: Number,\r\n\t},\r\n\tdata: function () {\r\n\t\treturn {\r\n\t\t\tclassName: this.getClassName(),\r\n\t\t\tcontent: this.getDisplay(),\r\n\t\t\tstyles: {\r\n\t\t\t\tprefix: {\r\n\t\t\t\t\tpaddingRight: \"2px\",\r\n\t\t\t\t\topacity: 0.8,\r\n\t\t\t\t\tfontWeight: 600,\r\n\t\t\t\t},\r\n\t\t\t\ttext: {\r\n\t\t\t\t\tpadding: 0,\r\n\t\t\t\t\tmargin: 0,\r\n\t\t\t\t\topacity: this.highlightSource ? 0.8 : 1,\r\n\t\t\t\t},\r\n\t\t\t\thl: {\r\n\t\t\t\t\tpadding: 0,\r\n\t\t\t\t\tmargin: 0,\r\n\t\t\t\t\tfontWeight: 600,\r\n\t\t\t\t\ttextDecoration: \"underline\",\r\n\t\t\t\t},\r\n\t\t\t}\r\n\t\t};\r\n\t},\r\n\tmethods: {\r\n\t\tgetClassName: function () {\r\n\t\t\tlet base = this.active ? \"vue_ahead__menu_option vue_ahead__menu_option_active\" : \"vue_ahead__menu_option\";\r\n\r\n\t\t\tif (this.class && this.active) {\r\n\t\t\t\tbase += \" \" + this.class;\r\n\t\t\t}\r\n\r\n\t\t\treturn base;\r\n\t\t},\r\n\t\tgetDisplay: function () {\r\n\t\t\tconst base = getItemLabel(this.item);\r\n\r\n\t\t\tif (this.highlightSource && !this.created && base) {\r\n\t\t\t\tconst src = base.trim().toLowerCase();\r\n\t\t\t\tconst tgt = this.highlightSource.trim().toLowerCase();\r\n\t\t\t\tconst pos = src.indexOf(tgt);\r\n\r\n\t\t\t\tif (pos >= 0) {\r\n\t\t\t\t\treturn [\r\n\t\t\t\t\t\tpos === 0 ? null : base.substring(0, pos),\r\n\t\t\t\t\t\tbase.substring(pos, pos + tgt.length),\r\n\t\t\t\t\t\tbase.substring(pos + tgt.length),\r\n\t\t\t\t\t];\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\treturn [base, null, null];\r\n\t\t},\r\n\t},\r\n\twatch: {\r\n\t\tactive: function () {\r\n\t\t\tthis.className = this.getClassName();\r\n\r\n\t\t\tif (this.active) {\r\n\t\t\t\tconst { offsetTop, scrollHeight } = this.$refs.elem;\r\n\t\t\t\tthis.$emit('item-activated', offsetTop, scrollHeight);\r\n\t\t\t}\r\n\t\t},\r\n\t\thighlightSource: function () {\r\n\t\t\tthis.content = this.getDisplay();\r\n\t\t\tthis.styles.text['opacity'] = this.highlightSource ? 0.8 : 1;\r\n\t\t},\r\n\t},\r\n};\r\n</script>\r\n\r\n<style>\r\n.vue_ahead__menu_option {\r\n\tbackground-color: transparent;\r\n\tcolor: inherit;\r\n\tcursor: default;\r\n\tdisplay: block;\r\n\tfont-size: inherit;\r\n\twidth: 100%;\r\n\tuser-select: none;\r\n\tbox-sizing: border-box;\r\n\tpadding: 6px 12px;\r\n}\r\n\r\n.vue_ahead__menu_option.vue_ahead__menu_option_active {\r\n\tbackground-color: rgb(222, 235, 255);\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = undefined;
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
      staticClass: "vue_ahead__group_label",
      on: {
        mousedown: function($event) {
          return _vm.$emit("mousedown", $event)
        }
      }
    },
    [
      _c("span", [
        _vm._v("\r\n\t\t\t" + _vm._s(_vm.data.label || "Default") + "\r\n\t\t")
      ]),
      _vm._v(" "),
      _c("span", { staticClass: "vue_ahead__group_label_icon" }, [
        _vm._v("\r\n\t\t\t" + _vm._s(_vm.data.count || 0) + "\r\n\t\t")
      ])
    ]
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-0bf6c292_0", { source: "\n.vue_ahead__group_label {\r\n\tcolor: rgb(153, 153, 153);\r\n\tcursor: default;\r\n\tdisplay: block;\r\n\tfont-size: 75%;\r\n\tfont-weight: 500;\r\n\tmargin-bottom: 0.25em;\r\n\tpadding: 2px 12px;\r\n\ttext-transform: uppercase;\r\n\tbox-sizing: border-box;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: space-between;\n}\n.vue_ahead__group_label_icon {\r\n\tbackground-color: #EBECF0;\r\n\tborder-radius: 0.75em;\r\n\tcolor: #172B4D;\r\n\tdisplay: inline-block;\r\n\tfont-size: 10;\r\n\tfont-weight: normal;\r\n\tline-height: 1;\r\n\ttext-align: center;\r\n\tmin-width: 1;\r\n\tpadding: 0.16666666666667em 0.5em;\n}\r\n", map: {"version":3,"sources":["F:\\Github\\react-ahead\\vue-ahead\\src\\components\\dropdownLabel.vue"],"names":[],"mappings":";AAoBA;CACA,yBAAA;CACA,eAAA;CACA,cAAA;CACA,cAAA;CACA,gBAAA;CACA,qBAAA;CACA,iBAAA;CACA,yBAAA;CACA,sBAAA;CACA,aAAA;CACA,mBAAA;CACA,8BAAA;AACA;AAEA;CACA,yBAAA;CACA,qBAAA;CACA,cAAA;CACA,qBAAA;CACA,aAAA;CACA,mBAAA;CACA,cAAA;CACA,kBAAA;CACA,YAAA;CACA,iCAAA;AACA","file":"dropdownLabel.vue","sourcesContent":["<template>\r\n<div class=\"vue_ahead__group_label\" @mousedown=\"$emit('mousedown', $event)\">\r\n\t\t<span>\r\n\t\t\t{{ data.label || \"Default\" }}\r\n\t\t</span>\r\n\t\t<span class=\"vue_ahead__group_label_icon\">\r\n\t\t\t{{ data.count || 0 }}\r\n\t\t</span>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n\tprops: {\r\n\t\tdata: Object,\r\n\t}\r\n};\r\n</script>\r\n\r\n<style>\r\n.vue_ahead__group_label {\r\n\tcolor: rgb(153, 153, 153);\r\n\tcursor: default;\r\n\tdisplay: block;\r\n\tfont-size: 75%;\r\n\tfont-weight: 500;\r\n\tmargin-bottom: 0.25em;\r\n\tpadding: 2px 12px;\r\n\ttext-transform: uppercase;\r\n\tbox-sizing: border-box;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: space-between;\r\n}\r\n\r\n.vue_ahead__group_label_icon {\r\n\tbackground-color: #EBECF0;\r\n\tborder-radius: 0.75em;\r\n\tcolor: #172B4D;\r\n\tdisplay: inline-block;\r\n\tfont-size: 10;\r\n\tfont-weight: normal;\r\n\tline-height: 1;\r\n\ttext-align: center;\r\n\tmin-width: 1;\r\n\tpadding: 0.16666666666667em 0.5em;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = undefined;
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
	display: 'default',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	textAlign: 'center',
	justifyContent: 'center',
	zIndex: 65535,
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
		autoScroll: Boolean,
		createable: Boolean,
		customClassNames: Object,
		groups: Object,
		highlightSource: String,
		isRemoteInit: Boolean,
		optionRenderer: Object,
		options: {
			type: Array,
			default: new Array(),
		},
		// Enum:
		// 0 -- new results;
		// 1 -- selection/removal;
		reason: Number,
		shield: Boolean,
	},
	components: {
		GroupLabel: __vue_component__$5,
		Item: __vue_component__$4,
	},
	data: function () {
		this._manualMove = "";
		this._moveDebounceId = null;
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
			var className = "vue_ahead__dropdown_wrapper";

			if (this.customClassNames && this.customClassNames.dropdown) {
				className += " " + this.customClassNames.dropdown;
			}

			return className;
		},
		getEmptyText: function () {
			if (this.isRemoteInit) {
				return "Type to search";
			}

			if (this.createable) {
				return "No option and unable to create";
			}

			return "No option";
		},
		getMenuItem: function (item) {
			if (item['type'] === 'created') {
				return item;
			}

			return item['src'];
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

			// console.log('scroll:', offsetTop, offsetHeight, this._manualMove);

			if (this.options.length < 4 || !this._manualMove) {
				return;
			}

			var wrapper = this.$refs.contentWrapper;
			// const { height } = wrapper.getBoundingClientRect();
			var scrollTop = wrapper.scrollTop;
			var clientHeight = wrapper.clientHeight;

			var target = scrollTop;

			if (
				offsetTop + offsetHeight > scrollTop + clientHeight // height
				&& this._manualMove === 'down'
			) {
				target = scrollTop + offsetHeight;
			} else if (
				offsetTop < scrollTop + 5
				&& this._manualMove === 'up'
			) {
				target = scrollTop - offsetHeight;
			}

			if (target !== scrollTop) {
				if (this._moveDebounceId) {
					clearTimeout(this._moveDebounceId);
				}

				if (this._moveDelay > 0) {
					this._moveDebounceId = setTimeout(function () { return wrapper.scrollTo(0, target); }, this._moveDelay);
				} else {
					wrapper.scrollTo(0, target);
				}
			}

			this._manualMove = '';
			this._moveDelay = 0;
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
		activeIdx: function (_, oldVal) {
			if (this.autoScroll && !this._manualMove) {
				this._manualMove = this.activeIdx > oldVal ? "down" : "up";
				this._moveDelay = 200;
			}

			if (!this.optionRenderer) {
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
		isRemoteInit: function (val) {
			if (val) {
				// only update the empty text here when resetting to the remote init
				// the search results will be updated when the shield is down.
				this.emptyText = this.getEmptyText();
			}
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
					this$1.styles.shield['opacity'] = 0.75;
					this$1.styles.shield['backdrop-filter'] = 'blur(3px)';
					this$1.styles.shield['backgroundColor'] = '#F5F5F5';
				}, 300);
			} else {
				clearTimeout(this._debounceId);
				this._debounceId = null;

				this.shieldVisible = false;
				this.styles.shield['opacity'] = 1;
				this.styles.shield['backdrop-filter'] = '';
				this.styles.shield['backgroundColor'] = 'transparent';

				// the shield is done and the results are out, update the empty text
				this.emptyText = this.getEmptyText();
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
              "h5",
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
              [_vm._v("\r\n\t\t\tLoading ...\r\n\t\t")]
            )
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { ref: "contentWrapper", staticClass: "vue_ahead__dropdown_container" },
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
              !_vm.optionRenderer
                ? _c("Item", {
                    class:
                      (_vm.customClassNames &&
                        _vm.customClassNames.activeItem) ||
                      "",
                    attrs: {
                      active: _vm.activeIdx === idx,
                      created: item["type"] === "created",
                      highlightSource: _vm.highlightSource,
                      item: _vm.getMenuItem(item),
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
                      attrs: { created: item["type"] === "created" },
                      on: {
                        mouseover: function($event) {
                          return _vm.handleMouseOver($event, idx)
                        },
                        mousedown: function($event) {
                          $event.stopPropagation();
                          return _vm.$emit("item-selection", $event, item.key)
                        }
                      }
                    },
                    [
                      _c(_vm.optionRenderer, {
                        tag: "component",
                        attrs: {
                          active: _vm.activeIdx === idx,
                          highlightSource: _vm.highlightSource,
                          item: _vm.getMenuItem(item),
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
          ? _c("div", { staticClass: "vue_ahead__dropdown_empty_options" }, [
              _vm._v("\r\n\t\t\t" + _vm._s(_vm.emptyText) + "\r\n\t\t")
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
    inject("data-v-9b424d44_0", { source: "\n.vue_ahead__dropdown_wrapper {\r\n\ttop: 100%;\r\n\tbackground-color: rgb(255, 255, 255);\r\n\tbox-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;\r\n\tmargin: 8px 0;\r\n\tposition: absolute;\r\n\twidth: 100%;\r\n\tz-index: 1000;\r\n\tbox-sizing: border-box;\r\n\tborder-radius: 2px;\r\n\tanimation: vue_ahead__menu_appear 50ms;\n}\n@keyframes vue_ahead__menu_appear {\nfrom { opacity: 0;\n}\nto   { opacity: 1;\n}\n}\n.vue_ahead__dropdown_container {\r\n\tmax-height: 300px;\r\n\toverflow-y: auto;\r\n\tpadding: 6px 0;\r\n\tposition: relative;\r\n\tbox-sizing: border-box;\r\n\ttext-align: start;\n}\n.vue_ahead__dropdown_empty_options {\r\n\tcolor: rgb(153, 153, 153);\r\n\tcursor: default;\r\n\ttext-align: center;\r\n\tbox-sizing: border-box;\r\n\tpadding: 6px 12px;\n}\r\n", map: {"version":3,"sources":["F:\\Github\\react-ahead\\vue-ahead\\src\\components\\dropdown.vue"],"names":[],"mappings":";AAsTA;CACA,SAAA;CACA,oCAAA;CACA,+EAAA;CACA,aAAA;CACA,kBAAA;CACA,WAAA;CACA,aAAA;CACA,sBAAA;CACA,kBAAA;CACA,sCAAA;AACA;AAEA;AACA,OAAA,UAAA;AAAA;AACA,OAAA,UAAA;AAAA;AACA;AAEA;CACA,iBAAA;CACA,gBAAA;CACA,cAAA;CACA,kBAAA;CACA,sBAAA;CACA,iBAAA;AACA;AAEA;CACA,yBAAA;CACA,eAAA;CACA,kBAAA;CACA,sBAAA;CACA,iBAAA;AACA","file":"dropdown.vue","sourcesContent":["<template>\r\n<div :class=\"className\">\r\n\t<div\r\n\t\tv-if=\"shield\"\r\n\t\t:style=\"styles.shield\"\r\n\t\t@mousedown.capture.stop=\"$emit('shield-click', $event)\"\r\n\t>\r\n\t\t<h5 v-show=\"shieldVisible\" :style=\"styles.title\">\r\n\t\t\tLoading ...\r\n\t\t</h5>\r\n\t</div>\r\n\t<div\r\n\t\tclass=\"vue_ahead__dropdown_container\"\r\n\t\tref=\"contentWrapper\"\r\n\t>\r\n\t\t<div v-for=\"(item, idx) in options\" :key=\"item.key\">\r\n\t\t\t<GroupLabel\r\n\t\t\t\tv-if=\"groups && groups.hasOwnProperty(idx)\"\r\n\t\t\t\t:data=\"groups[idx]\"\r\n\t\t\t\t@mousedown.stop=\"handleLabelClicked\"\r\n\t\t\t/>\r\n\t\t\t<Item\r\n\t\t\t\tv-if=\"!optionRenderer\"\r\n\t\t\t\t:active=\"activeIdx === idx\"\r\n\t\t\t\t:class=\"(customClassNames && customClassNames.activeItem) || ''\"\r\n\t\t\t\t:created=\"item['type'] === 'created'\"\r\n\t\t\t\t:highlightSource=\"highlightSource\"\r\n\t\t\t\t:item=\"getMenuItem(item)\"\r\n\t\t\t\t:index=\"idx\"\r\n\t\t\t\t@mouseover=\"handleMouseOver\"\r\n\t\t\t\t@mousedown.stop=\"$emit('item-selection', $event, item.key)\"\r\n\t\t\t\t@item-activated=\"handleItemActivated\"\r\n\t\t\t/>\r\n\t\t\t<div\r\n\t\t\t\tv-else\r\n\t\t\t\t:class=\"(customClassNames && customClassNames.activeItem) || ''\"\r\n\t\t\t\t:created=\"item['type'] === 'created'\"\r\n\t\t\t\t:ref=\"'item_' + idx.toString()\"\r\n\t\t\t\t@mouseover=\"handleMouseOver($event, idx)\"\r\n\t\t\t\t@mousedown.stop=\"$emit('item-selection', $event, item.key)\"\r\n\t\t\t>\r\n\t\t\t\t<component\r\n\t\t\t\t\t:is=\"optionRenderer\"\r\n\t\t\t\t\t:active=\"activeIdx === idx\"\r\n\t\t\t\t\t:highlightSource=\"highlightSource\"\r\n\t\t\t\t\t:item=\"getMenuItem(item)\"\r\n\t\t\t\t\t:index=\"idx\"\r\n\t\t\t\t/>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div\r\n\t\t\tv-if=\"!options || options.length === 0\"\r\n\t\t\tclass=\"vue_ahead__dropdown_empty_options\"\r\n\t\t>\r\n\t\t\t{{ emptyText }}\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport Item from \"./dropdownItem.vue\";\r\nimport GroupLabel from './dropdownLabel.vue';\r\n\r\nconst shieldStyle = {\r\n\tposition: 'absolute',\r\n\tdisplay: 'default',\r\n\ttop: 0,\r\n\tleft: 0,\r\n\twidth: '100%',\r\n\theight: '100%',\r\n\ttextAlign: 'center',\r\n\tjustifyContent: 'center',\r\n\tzIndex: 65535,\r\n\tbackgroundColor: 'transparent',\r\n\tuserSelect: 'none',\r\n};\r\n\r\nconst shieldTitleStyle = {\r\n\tposition: 'absolute',\r\n\ttop: '50%',\r\n\tleft: '0',\r\n\ttextAlign: 'center',\r\n\tmargin: '-12px 0 0 0',\r\n\tpadding: 0,\r\n\twidth: '100%',\r\n\theight: '100%',\r\n\topacity: 1,\r\n};\r\n\r\nexport default {\r\n\tprops: {\r\n\t\tautoScroll: Boolean,\r\n\t\tcreateable: Boolean,\r\n\t\tcustomClassNames: Object,\r\n\t\tgroups: Object,\r\n\t\thighlightSource: String,\r\n\t\tisRemoteInit: Boolean,\r\n\t\toptionRenderer: Object,\r\n\t\toptions: {\r\n\t\t\ttype: Array,\r\n\t\t\tdefault: new Array(),\r\n\t\t},\r\n\t\t// Enum:\r\n\t\t// 0 -- new results;\r\n\t\t// 1 -- selection/removal;\r\n\t\treason: Number,\r\n\t\tshield: Boolean,\r\n\t},\r\n\tcomponents: {\r\n\t\tGroupLabel,\r\n\t\tItem,\r\n\t},\r\n\tdata: function () {\r\n\t\tthis._manualMove = \"\";\r\n\t\tthis._moveDebounceId = null;\r\n\t\tthis._debounceId = null;\r\n\r\n\t\treturn {\r\n\t\t\tactiveIdx: 0,\r\n\t\t\tclassName: this.getClassName(),\r\n\t\t\tshieldVisible: false,\r\n\t\t\tstyles: {\r\n\t\t\t\tshield: shieldStyle,\r\n\t\t\t\ttitle: shieldTitleStyle,\r\n\t\t\t},\r\n\t\t\temptyText: this.getEmptyText(),\r\n\t\t};\r\n\t},\r\n\tmethods: {\r\n\t\tgetClassName: function () {\r\n\t\t\tlet className = \"vue_ahead__dropdown_wrapper\";\r\n\r\n\t\t\tif (this.customClassNames && this.customClassNames.dropdown) {\r\n\t\t\t\tclassName += \" \" + this.customClassNames.dropdown;\r\n\t\t\t}\r\n\r\n\t\t\treturn className;\r\n\t\t},\r\n\t\tgetEmptyText: function () {\r\n\t\t\tif (this.isRemoteInit) {\r\n\t\t\t\treturn \"Type to search\";\r\n\t\t\t}\r\n\r\n\t\t\tif (this.createable) {\r\n\t\t\t\treturn \"No option and unable to create\";\r\n\t\t\t}\r\n\r\n\t\t\treturn \"No option\";\r\n\t\t},\r\n\t\tgetMenuItem: function (item) {\r\n\t\t\tif (item['type'] === 'created') {\r\n\t\t\t\treturn item;\r\n\t\t\t}\r\n\r\n\t\t\treturn item['src'];\r\n\t\t},\r\n\t\tmove: function (dir) {\r\n\t\t\tlet { activeIdx } = this;\r\n\r\n\t\t\tif (dir === 'down') {\r\n\t\t\t\tactiveIdx++;\r\n\t\t\t} else {\r\n\t\t\t\tactiveIdx--;\r\n\t\t\t}\r\n\r\n\t\t\tif (activeIdx >= this.options.length) {\r\n\t\t\t\tactiveIdx = this.options.length - 1;\r\n\t\t\t}\r\n\r\n\t\t\tif (activeIdx < 0) {\r\n\t\t\t\tactiveIdx = 0;\r\n\t\t\t}\r\n\r\n\t\t\tif (activeIdx !== this.activeIdx) {\r\n\t\t\t\tthis._manualMove = dir;\r\n\t\t\t\tthis.activeIdx = activeIdx;\r\n\t\t\t}\r\n\t\t},\r\n\t\tselect: function () {\r\n\t\t\tif (this.activeIdx < 0 || this.activeIdx >= this.options.length) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tconst item = this.options[this.activeIdx];\r\n\t\t\tthis.$emit('item-selection', null, item.key);\r\n\t\t},\r\n\t\thandleLabelClicked: function (evt) {\r\n\t\t\tconst item = this.options[this.activeIdx];\r\n\t\t\tthis.$emit('item-selection', evt, item.key);\r\n\t\t},\r\n\t\thandleItemActivated: function (offsetTop, offsetHeight = 30) {\r\n\t\t\t// console.log('scroll:', offsetTop, offsetHeight, this._manualMove);\r\n\r\n\t\t\tif (this.options.length < 4 || !this._manualMove) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tconst wrapper = this.$refs.contentWrapper;\r\n\t\t\t// const { height } = wrapper.getBoundingClientRect();\r\n\t\t\tconst { scrollTop, clientHeight } = wrapper;\r\n\r\n\t\t\tlet target = scrollTop;\r\n\r\n\t\t\tif (\r\n\t\t\t\toffsetTop + offsetHeight > scrollTop + clientHeight // height\r\n\t\t\t\t&& this._manualMove === 'down'\r\n\t\t\t) {\r\n\t\t\t\ttarget = scrollTop + offsetHeight;\r\n\t\t\t} else if (\r\n\t\t\t\toffsetTop < scrollTop + 5\r\n\t\t\t\t&& this._manualMove === 'up'\r\n\t\t\t) {\r\n\t\t\t\ttarget = scrollTop - offsetHeight;\r\n\t\t\t}\r\n\r\n\t\t\tif (target !== scrollTop) {\r\n\t\t\t\tif (this._moveDebounceId) {\r\n\t\t\t\t\tclearTimeout(this._moveDebounceId);\r\n\t\t\t\t}\r\n\r\n\t\t\t\tif (this._moveDelay > 0) {\r\n\t\t\t\t\tthis._moveDebounceId = setTimeout(() => wrapper.scrollTo(0, target), this._moveDelay);\r\n\t\t\t\t} else {\r\n\t\t\t\t\twrapper.scrollTo(0, target);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\tthis._manualMove = '';\r\n\t\t\tthis._moveDelay = 0;\r\n\t\t},\r\n\t\thandleMouseOver: function (_evt, idx) {\r\n\t\t\t// console.log('mouse over:', idx);\r\n\r\n\t\t\tif (idx < this.options.length) {\r\n\t\t\t\tthis.activeIdx = idx;\r\n\t\t\t} else {\r\n\t\t\t\tthis.activeIdx = this.options.length - 1;\r\n\t\t\t}\r\n\r\n\t\t\tif (this.activeIdx < 0) {\r\n\t\t\t\tthis.activeIdx = 0;\r\n\t\t\t}\r\n\t\t},\r\n\t},\r\n\twatch: {\r\n\t\tactiveIdx: function (_, oldVal) {\r\n\t\t\tif (this.autoScroll && !this._manualMove) {\r\n\t\t\t\tthis._manualMove = this.activeIdx > oldVal ? \"down\" : \"up\";\r\n\t\t\t\tthis._moveDelay = 200;\r\n\t\t\t}\r\n\r\n\t\t\tif (!this.optionRenderer) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tconst itemKey = `item_${this.activeIdx}`;\r\n\t\t\tif (this.$refs[itemKey] && this.$refs[itemKey].length === 1) {\r\n\t\t\t\tconst { offsetTop, offsetHeight } = this.$refs[itemKey][0];\r\n\t\t\t\tthis.handleItemActivated(offsetTop, offsetHeight);\r\n\t\t\t}\r\n\t\t},\r\n\t\tclassName: function () {\r\n\t\t\tthis.className = this.getClassName();\r\n\t\t},\r\n\t\tisRemoteInit: function (val) {\r\n\t\t\tif (val) {\r\n\t\t\t\t// only update the empty text here when resetting to the remote init\r\n\t\t\t\t// the search results will be updated when the shield is down.\r\n\t\t\t\tthis.emptyText = this.getEmptyText();\r\n\t\t\t}\r\n\t\t},\r\n\t\toptions: function () {\r\n\t\t\tif (this.reason === 0) {\r\n\t\t\t\tthis.activeIdx = 0;\r\n\t\t\t\tthis.$refs.contentWrapper.scrollTo(0, 0);\r\n\t\t\t} else if (this.activeIdx >= this.options.length) {\r\n\t\t\t\tthis.activeIdx = this.options.length - 1;\r\n\t\t\t}\r\n\t\t},\r\n\t\tshield: function () {\r\n\t\t\tif (this.shield) {\r\n\t\t\t\tif (this._debounceId) {\r\n\t\t\t\t\tclearTimeout(this._debounceId);\r\n\t\t\t\t}\r\n\r\n\t\t\t\tthis._debounceId = setTimeout(() => {\r\n\t\t\t\t\tthis.shieldVisible = true;\r\n\t\t\t\t\tthis.styles.shield['opacity'] = 0.75;\r\n\t\t\t\t\tthis.styles.shield['backdrop-filter'] = 'blur(3px)';\r\n\t\t\t\t\tthis.styles.shield['backgroundColor'] = '#F5F5F5';\r\n\t\t\t\t}, 300);\r\n\t\t\t} else {\r\n\t\t\t\tclearTimeout(this._debounceId);\r\n\t\t\t\tthis._debounceId = null;\r\n\r\n\t\t\t\tthis.shieldVisible = false;\r\n\t\t\t\tthis.styles.shield['opacity'] = 1;\r\n\t\t\t\tthis.styles.shield['backdrop-filter'] = '';\r\n\t\t\t\tthis.styles.shield['backgroundColor'] = 'transparent';\r\n\r\n\t\t\t\t// the shield is done and the results are out, update the empty text\r\n\t\t\t\tthis.emptyText = this.getEmptyText();\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n};\r\n</script>\r\n\r\n<style>\r\n.vue_ahead__dropdown_wrapper {\r\n\ttop: 100%;\r\n\tbackground-color: rgb(255, 255, 255);\r\n\tbox-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;\r\n\tmargin: 8px 0;\r\n\tposition: absolute;\r\n\twidth: 100%;\r\n\tz-index: 1000;\r\n\tbox-sizing: border-box;\r\n\tborder-radius: 2px;\r\n\tanimation: vue_ahead__menu_appear 50ms;\r\n}\r\n\r\n@keyframes vue_ahead__menu_appear {\r\n\tfrom { opacity: 0; }\r\n\tto   { opacity: 1; }\r\n}\r\n\r\n.vue_ahead__dropdown_container {\r\n\tmax-height: 300px;\r\n\toverflow-y: auto;\r\n\tpadding: 6px 0;\r\n\tposition: relative;\r\n\tbox-sizing: border-box;\r\n\ttext-align: start;\r\n}\r\n\r\n.vue_ahead__dropdown_empty_options {\r\n\tcolor: rgb(153, 153, 153);\r\n\tcursor: default;\r\n\ttext-align: center;\r\n\tbox-sizing: border-box;\r\n\tpadding: 6px 12px;\r\n}\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$6 = undefined;
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

var buildItem = function (item, idx, keys, grouped) {
	var controlItem = { src: item, };

	if (!hasProperty(item, 'key')) {
		item['key'] = idx.toString() + "#" + randomSuffix();
	}

	var key = item['key'];
	if (typeof key !== 'string') {
		key = (key === null || key === undefined)
			? randomSuffix()
			: key.toString();
	}

	var finalKey = key;
	while (hasProperty(keys, finalKey)) {
		finalKey = key + randomSuffix();
	}

	controlItem['key'] = finalKey;

	var label = item['label'];
	if (typeof label !== 'string') {
		label = (label === null || label === undefined)
			? ''
			: label.toString();
	}

	controlItem['label'] = label;

	if (grouped) {
		var groupKey = item['group'];
		if (typeof groupKey !== 'string') {
			groupKey = (groupKey === null || groupKey === undefined)
				? "default"
				: groupKey.toString();
		}

		controlItem['group'] = groupKey;
	}

	return controlItem;
};

var hasProperty = function (tgt, name) {
	return Object.prototype.hasOwnProperty.call(tgt, name);
};

var randomSuffix = function () {
	return Math.random().toString(36).substring(2, 8);
};

var common = {
	buildItem: buildItem,
	hasProperty: hasProperty,
	randomSuffix: randomSuffix,
};
var common_1 = common.buildItem;
var common_2 = common.hasProperty;
var common_3 = common.randomSuffix;

var NativeEngine = function NativeEngine(props) {
	if (props && props.remote && !axios && !props.remote.proxy) {
		throw new Error("expecting `axios` module or a proxy settings to be provided before the control, found none ... ");
	}

	if (props && props.remote && props.remote.proxy && typeof props.remote.proxy !== 'function') {
		throw new Error("expecting `remote`'s proxy to be a function returning a Promise, but found wrong primitive type ... ");
	}

	this._props = props || {};

	this._store = [];
	this._cache = {
		last: [],
		data: {},
	};

	this._transport = props.proxy ? props.proxy : axios;

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
	if (common_2(this._cache.data, val)) {
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
		var ref = this._props.remote;
			var dataParser = ref.dataParser;
			var settings = ref.settings;

		var remoteSettings = Object.assign({}, settings);

		if (remoteSettings['params']) {
			remoteSettings['params']['q'] = val;
		} else {
			remoteSettings['params'] = { q: val, };
		}

		return this._transport(remoteSettings)
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

	return this._transport(Object.assign({}, settings, { params: params }))
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

var debounceShort = 20;
var debounceLong = 100;
var shieldTimeout = 10;

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
		createable: Boolean,
		customClassNames: Object,
		display: Function,
		dropdownAutoScroll: Boolean,
		grouped: Boolean,
		highlight: Boolean,
		initOptions: Array,
		initSelections: Array,
		isMulti: Boolean,
		multiSelRenderer: {
			type: Object,
			defualt: null,
		},
		optionRenderer: {
			type: Object,
			default: null,
		},
		placeholder: String,
		remote: Object,
		singleSelRenderer: {
			type: Object,
			default: null,
		},
		theme: String,
	},
	data: function data() {
		if (this.remote && (!this.remote.settings && !this.remote.proxy)) {
			throw new Error("the remote expects the remote object to have a 'settings' property, but found nothing ... ");
		}

		this._keys = null;
		this._shieldId = null;
		this._debounceId = null;

		var ref = this.init();
		var source = ref.source;
		var options = ref.options;
		var selection = ref.selection;
		var groups = ref.groups;

		this._engine = new NativeEngine({ remote: this.remote || null });
		this._engine.add(source);

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
				if (typeof this.remote["prefetch"] === 'function') {
					this.runPrefetcher(this.remote["prefetch"]);
				}
			} else {
				source = this.prepareOptions(this.initOptions);
				if (this.initSelections && this.initSelections.length > 0) {
					initState = this.prepareInitState(source, this.initSelections);
				}
			}

			var initOptions = initState ? initState['options'] : source;
			var selection = initState ? initState['selection'] : { items: [], indices: {}, };

			var ref = this.grouped ? this.buildOptionGroups(initOptions) : { options: initOptions, groups: null };
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
			var className = "vue_ahead__control_container";

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
		buildOptionGroups: function (options) {
			if (!options || options.length === 0) {
				return { options: options, groups: null };
			}

			options = options.sort(function (a, b) {
				if (a.type === "created") {
					return 1;
				}

				if (b.type === "created") {
					return -1;
				}

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

			var result = source.filter(function (item) { return !common_2(indices, item.key); });

			if (this.grouped) {
				var ref$1 = this.buildOptionGroups(result);
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

			this._keys = {};

			var result =
				options
					.filter(function (item) { return typeof item === "object" && !!item; })
					.map(function (item, idx) {
						var controlItem = common_1(item, idx, this$1._keys, this$1.grouped);

						this$1._keys[controlItem.key] = null;

						return controlItem;
					});

			// console.log('keys:', this._keys, result);

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
					common_2(indices, options[i$1]['key'])
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
		notify: function (content) {
			if (!content) {
				return;
			}

			this.$emit("selection", content, this.updateSelections);
		},
		updateSelections: function (selections) {
			if (!Array.isArray(selections) || !selections.length) {
				throw new Error(
					"illegal action on updating selections: wanted an array, find:",
					selections
				);
			}

			if (!this.isMulti && selections.length > 1) {
				selections = [selections[0]];
			}

			var indices = {};
			for (var i = 0; i < selections.length; i++) {
				indices[selections[i].key] = null;
			}

			this.selection = {
				items: selections,
				indices: indices,
			};

			// set the reason
			this.reason = 1;
			this.options = this.getOptions();
		},
		clear: function (force) {
			var oldItems = this.selection.items;

			this.selection = {
				items: [],
				indices: {},
			};

			this.value = '';
			this.reason = 1;

			if (!this.remote) {
				this.options = this.getOptions();
			} else {
				if (typeof this.remote.prefetch === "function") {
					this.runPrefetcher(this.remote.prefetch);
				} else {
					this.source = [];
					this.options = this.getOptions();
				}
			}

			if (!force && oldItems && oldItems.length > 0) {
				this.notify({
					type: "clear",
					items: [],
					removed: oldItems.map(function (item) { return item; }),
				});
			}
		},
		reset: function () {
			var oldItems = this.selection.items;
			var ref = this.init();
			var options = ref.options;
			var selection = ref.selection;
			var groups = ref.groups;

			this.value = '';
			this.reason = 1;
			this.options = options;
			this.groups = groups;
			this.selection = selection;

			if (oldItems && oldItems.length > 0) {
				this.notify({
					type: "clear",
					items: [],
					removed: oldItems.map(function (item) { return item; }),
				});
			}
		},
		isValueCreateable: function (value, options) {
			if ( value === void 0 ) value = '';
			if ( options === void 0 ) options = [];

			if (value === '') {
				return false;
			}

			if (options.length === 0) {
				return true;
			}

			value = value.trim().toLowerCase();

			for (var i = 0; i < options.length; i++) {
				var label = options[i]['label'];

				if (label.trim().toLowerCase() === value) {
					return false;
				}
			}

			if (this.selection.items && this.selection.items.length > 0) {
				for (var i$1 = 0; i$1 < this.selection.items.length; i$1++) {
					var key = this.selection.items[i$1]['label'];

					if (key.trim().toLowerCase() === value) {
						return false;
					}
				}
			}

			return true;
		},
		runPrefetcher: function (prefetcher, keepSelections) {
			var this$1 = this;

			/*
			 * The prefetcher is used to fetch default menu options, it should
			 * not need interaction with the `createable` features.
			 */
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

					var ref = this$1.grouped ? this$1.buildOptionGroups(initOptions) : { options: initOptions, groups: null };
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
				this._shieldId = setTimeout(function () { return this$1.shield = true; }, shieldTimeout);
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
		handleShieldClick: function () {
			// move the cursor back to the input field
			this.focusStatus = focusStatus.Shield;
			this.focusInput();
		},
		handleDbClick: function () {
			var this$1 = this;

			setTimeout(function () {
				this$1.$refs.inputControl.select();
			}, 0);
		},
		handleInputClick: function () {
			this.focusStatus = focusStatus.Container;
			this.focusInput();
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

			var timeout = this.remote ? debounceLong : debounceShort;
			this._debounceId = setTimeout(function () {
				this$1._engine.query(value, function (data) {
					if ( data === void 0 ) data = [];

					// console.log(data);
					var source;

					// for remote search, the source change every time on a search
					// term, hence we need to update the source all the time
					if (this$1.remote) {
						this$1.source = this$1.prepareOptions(data);
						source = this$1.source;
					} else {
						source = data;
					}

					if (this$1.createable && this$1.isValueCreateable(value, source)) {
						var key = value.trim().toLowerCase();

						while (common_2(this$1._keys, key)) {
							key += common_3();
						}

						source.push({
							label: value,
							key: key,
							src: { label: value, class: "vue_ahead__created_item" },
							group: "new",
							type: "created",
						});
					}

					this$1.reason = 0;
					this$1.options = this$1.getOptions(source);

					this$1.shieldAction(false);
					this$1._debounceId = null;
				});
			}, timeout);
		},
		handleItemSelection: function (evt, key) {
			if (common_2(this.selection.indices, key)) {
				return;
			}

			var ref = this.selection;
			var items = ref.items;
			var indices = ref.indices;
			var last = null;

			if (!this.isMulti) {
				if (items && items.length > 0) {
					last = items[0]["type"] === "created" ? items[0] : items[0]["src"];
				}

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

			this.notify({
				type: "add",
				items: this.selection.items.map(function (item) { return item; }),
				replaced: last,
				value: this.value,
			});

			// reset the value to empty after a selection
			if (this.value !== '') {
				this.value = '';
			}

			this.reason = 1;
			this.options = this.getOptions();

			// console.log('item selection', key, this.selection.items, this.selection.indices);

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

			this.notify({
				type: "remove",
				items: this.selection.items.map(function (item) { return item; }),
				removed: [deleted],
			});

			// filter the options against the original list
			this.reason = 1;
			this.options =
				this.getOptions().filter(function (item) { return !common_2(indices, item.key); });

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
          display: _vm.display,
          multiSelRenderer: _vm.multiSelRenderer,
          isMulti: _vm.isMulti,
          placeholder: _vm.placeholder,
          selection: _vm.selection.items,
          singleSelRenderer: _vm.singleSelRenderer,
          theme: _vm.theme,
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
              autoScroll: _vm.dropdownAutoScroll,
              createable: _vm.createable,
              customClassNames: _vm.customClassNames,
              groups: _vm.groups,
              highlightSource: _vm.highlight ? _vm.value.trim() : null,
              isRemoteInit: _vm.remote && _vm.value === "",
              optionRenderer: _vm.optionRenderer,
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
    inject("data-v-773daf01_0", { source: "\n.vue_ahead__control_container {\r\n\tposition: relative;\r\n\tbox-sizing: border-box;\n}\r\n", map: {"version":3,"sources":["F:\\Github\\react-ahead\\vue-ahead\\src\\control.vue"],"names":[],"mappings":";AAkwBA;CACA,kBAAA;CACA,sBAAA;AACA","file":"control.vue","sourcesContent":["<template>\r\n<div :class=\"className\">\r\n\t<Shield\r\n\t\t:on=\"shield\"\r\n\t\t@mousedown.capture.stop=\"handleShieldClick\"\r\n\t/>\r\n\t<Input\r\n\t\tref=\"inputControl\"\r\n\t\t:active=\"focusStatus !== 0\"\r\n\t\t:customClassNames=\"customClassNames\"\r\n\t\t:display=\"display\"\r\n\t\t:multiSelRenderer=\"multiSelRenderer\"\r\n\t\t:isMulti=\"isMulti\"\r\n\t\t:placeholder=\"placeholder\"\r\n\t\t:selection=\"selection.items\"\r\n\t\t:singleSelRenderer=\"singleSelRenderer\"\r\n\t\t:theme=\"theme\"\r\n\t\t:value=\"value\"\r\n\t\t@dblclick=\"handleDbClick\"\r\n\t\t@change=\"handleInputChange\"\r\n\t\t@blur=\"handleInputBlur\"\r\n\t\t@focus=\"handleFocus\"\r\n\t\t@mousedown=\"handleInputClick\"\r\n\t\t@icon-event=\"handleIconEvent\"\r\n\t\t@special-key=\"handleSpecialKey\"\r\n\t\t@item-removal=\"handleItemRemoval\"\r\n\t/>\r\n\t<Dropdown\r\n\t\tv-if=\"open\"\r\n\t\tref=\"dropdownControl\"\r\n\t\t:autoScroll=\"dropdownAutoScroll\"\r\n\t\t:createable=\"createable\"\r\n\t\t:customClassNames=\"customClassNames\"\r\n\t\t:groups=\"groups\"\r\n\t\t:highlightSource=\"highlight ? value.trim() : null\"\r\n\t\t:isRemoteInit=\"remote && value === ''\"\r\n\t\t:optionRenderer=\"optionRenderer\"\r\n\t\t:open=\"open\"\r\n\t\t:options=\"options\"\r\n\t\t:reason=\"reason\"\r\n\t\t:shield=\"shield\"\r\n\t\t@item-selection=\"handleItemSelection\"\r\n\t/>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport Shield from './components/shield.vue';\r\nimport Input from './components/input.vue';\r\nimport Dropdown from './components/dropdown.vue';\r\nimport { buildItem, hasProperty, randomSuffix } from './helpers/common';\r\nimport Engine from './helpers/engine';\r\n\r\nconst focusStatus = {\r\n\tNone: 0,\r\n\tInput: 1,\r\n\tIcon: 2,\r\n\tContainer: 3,\r\n\tDropdown: 4,\r\n\tShield: 5,\r\n\tPending: -1,\r\n};\r\n\r\nconst debounceShort = 20;\r\nconst debounceLong = 100;\r\nconst shieldTimeout = 10;\r\n\r\nexport default {\r\n\tinheritAttrs: false,\r\n\tname: \"VueAhead\",\r\n\tcomponents: {\r\n\t\tShield,\r\n\t\tInput,\r\n\t\tDropdown,\r\n\t},\r\n\tbeforeMount: function () {\r\n\t},\r\n\tbeforeDestroy: function () {\r\n\t\t//todo: send any remainder data to remote, if configured\r\n\t},\r\n\tprops: {\r\n\t\tcreateable: Boolean,\r\n\t\tcustomClassNames: Object,\r\n\t\tdisplay: Function,\r\n\t\tdropdownAutoScroll: Boolean,\r\n\t\tgrouped: Boolean,\r\n\t\thighlight: Boolean,\r\n\t\tinitOptions: Array,\r\n\t\tinitSelections: Array,\r\n\t\tisMulti: Boolean,\r\n\t\tmultiSelRenderer: {\r\n\t\t\ttype: Object,\r\n\t\t\tdefualt: null,\r\n\t\t},\r\n\t\toptionRenderer: {\r\n\t\t\ttype: Object,\r\n\t\t\tdefault: null,\r\n\t\t},\r\n\t\tplaceholder: String,\r\n\t\tremote: Object,\r\n\t\tsingleSelRenderer: {\r\n\t\t\ttype: Object,\r\n\t\t\tdefault: null,\r\n\t\t},\r\n\t\ttheme: String,\r\n\t},\r\n\tdata() {\r\n\t\tif (this.remote && (!this.remote.settings && !this.remote.proxy)) {\r\n\t\t\tthrow new Error(\"the remote expects the remote object to have a 'settings' property, but found nothing ... \");\r\n\t\t}\r\n\r\n\t\tthis._keys = null;\r\n\t\tthis._shieldId = null;\r\n\t\tthis._debounceId = null;\r\n\r\n\t\tconst { source, options, selection, groups } = this.init();\r\n\r\n\t\tthis._engine = new Engine({ remote: this.remote || null });\r\n\t\tthis._engine.add(source);\r\n\r\n\t\treturn {\r\n\t\t\tclassName: this.getClassName(),\r\n\t\t\tfocusStatus: focusStatus.None,\r\n\t\t\tgroups,\r\n\t\t\topen: false,\r\n\t\t\toptions,\r\n\t\t\treason: 0,\r\n\t\t\tselection,\r\n\t\t\tsource,\r\n\t\t\tshield: false,\r\n\t\t\tshieldDisplay: \"none\",\r\n\t\t\tvalue: '',\r\n\t\t};\r\n\t},\r\n\tmethods: {\r\n\t\tinit: function () {\r\n\t\t\tlet source = [];\r\n\t\t\tlet initState = null;\r\n\r\n\t\t\tif (this.remote) {\r\n\t\t\t\tif (typeof this.remote[\"prefetch\"] === 'function') {\r\n\t\t\t\t\tthis.runPrefetcher(this.remote[\"prefetch\"]);\r\n\t\t\t\t}\r\n\t\t\t} else {\r\n\t\t\t\tsource = this.prepareOptions(this.initOptions);\r\n\t\t\t\tif (this.initSelections && this.initSelections.length > 0) {\r\n\t\t\t\t\tinitState = this.prepareInitState(source, this.initSelections);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\tconst initOptions = initState ? initState['options'] : source;\r\n\t\t\tconst selection = initState ? initState['selection'] : { items: [], indices: {}, };\r\n\r\n\t\t\tconst { options, groups } = this.grouped ? this.buildOptionGroups(initOptions) : { options: initOptions, groups: null };\r\n\r\n\t\t\treturn { source, options, selection, groups, };\r\n\t\t},\r\n\t\tfocusInput: function (dropdownState = null) {\r\n\t\t\tsetTimeout(() => {\r\n\t\t\t\t// console.log('moving focus to the input, before:', this.focusStatus);\r\n\r\n\t\t\t\tif (this.focusStatus !== focusStatus.Input) {\r\n\t\t\t\t\tthis.$refs.inputControl.focus();\r\n\t\t\t\t\tthis.open = dropdownState === null ? true : dropdownState;\r\n\t\t\t\t}\r\n\r\n\t\t\t\tthis.focusStatus = focusStatus.Input;\r\n\t\t\t}, 0);\r\n\t\t},\r\n\t\tfocuseReset: function () {\r\n\t\t\tthis.focusStatus = focusStatus.None;\r\n\t\t\tthis.open = false;\r\n\r\n\t\t\tthis.value = '';\r\n\t\t\tthis.resetOptions();\r\n\t\t},\r\n\t\tgetClassName: function () {\r\n\t\t\tlet className = \"vue_ahead__control_container\";\r\n\r\n\t\t\tif (this.class) {\r\n\t\t\t\tclassName += \" \" + this.class;\r\n\t\t\t}\r\n\r\n\t\t\tif (this.customClassNames && this.customClassNames.control) {\r\n\t\t\t\tclassName += \" \" + this.customClassNames.control;\r\n\t\t\t}\r\n\r\n\t\t\treturn className;\r\n\t\t},\r\n\t\tresetOptions: function () {\r\n\t\t\tthis.reason = 0;\r\n\r\n\t\t\tif (this.remote) {\r\n\t\t\t\tif (typeof this.remote.prefetch === 'function') {\r\n\t\t\t\t\tthis.runPrefetcher(this.remote.prefetch, true);\r\n\t\t\t\t} else {\r\n\t\t\t\t\tthis.source = [];\r\n\t\t\t\t\tthis.options = this.getOptions();\r\n\t\t\t\t}\r\n\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tthis.options = this.getOptions();\r\n\t\t},\r\n\t\tbuildOptionGroups: function (options) {\r\n\t\t\tif (!options || options.length === 0) {\r\n\t\t\t\treturn { options, groups: null };\r\n\t\t\t}\r\n\r\n\t\t\toptions = options.sort((a, b) => {\r\n\t\t\t\tif (a.type === \"created\") {\r\n\t\t\t\t\treturn 1;\r\n\t\t\t\t}\r\n\r\n\t\t\t\tif (b.type === \"created\") {\r\n\t\t\t\t\treturn -1;\r\n\t\t\t\t}\r\n\r\n\t\t\t\tif (a.group === \"default\") {\r\n\t\t\t\t\treturn -1;\r\n\t\t\t\t}\r\n\r\n\t\t\t\tif (b.group === \"default\") {\r\n\t\t\t\t\treturn 1;\r\n\t\t\t\t}\r\n\r\n\t\t\t\tif (a.group === b.group) {\r\n\t\t\t\t\treturn 0;\r\n\t\t\t\t}\r\n\r\n\t\t\t\treturn a.group > b.group ? 1 : -1;\r\n\t\t\t});\r\n\r\n\t\t\tconst groups = {};\r\n\t\t\tlet currKey = '';\r\n\t\t\tlet lastIdx = -1;\r\n\t\t\tlet count = 0;\r\n\r\n\t\t\tfor (let i = 0; i < options.length; i++) {\r\n\t\t\t\tif (options[i].group !== currKey) {\r\n\t\t\t\t\tif (lastIdx >= 0) {\r\n\t\t\t\t\t\tgroups[lastIdx] = { label: currKey, count, };\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tlastIdx = i;\r\n\t\t\t\t\tcurrKey = options[i].group;\r\n\t\t\t\t\tcount = 0;\r\n\t\t\t\t}\r\n\r\n\t\t\t\tcount++;\r\n\t\t\t}\r\n\r\n\t\t\tif (currKey !== '' && lastIdx >= 0) {\r\n\t\t\t\t// push the last group into the store\r\n\t\t\t\tgroups[lastIdx] = { label: currKey, count, };\r\n\t\t\t}\r\n\r\n\t\t\t// console.log('groups:', groups, options);\r\n\r\n\t\t\treturn { options, groups, };\r\n\t\t},\r\n\t\tgetOptions: function (source) {\r\n\t\t\tif (!source) {\r\n\t\t\t\tsource = this.source || [];\r\n\t\t\t}\r\n\r\n\t\t\tconst { indices } = this.selection || {};\r\n\t\t\tif (!indices) {\r\n\t\t\t\treturn source;\r\n\t\t\t}\r\n\r\n\t\t\t// console.log('filtering:', indices, source);\r\n\r\n\t\t\tlet result = source.filter(item => !hasProperty(indices, item.key));\r\n\r\n\t\t\tif (this.grouped) {\r\n\t\t\t\tconst { options, groups } = this.buildOptionGroups(result);\r\n\t\t\t\tresult = options;\r\n\t\t\t\tthis.groups = groups;\r\n\t\t\t}\r\n\r\n\t\t\treturn result;\r\n\t\t},\r\n\t\tprepareOptions: function (options = []) {\r\n\t\t\tthis._keys = {};\r\n\r\n\t\t\tconst result =\r\n\t\t\t\toptions\r\n\t\t\t\t\t.filter(item => typeof item === \"object\" && !!item)\r\n\t\t\t\t\t.map((item, idx) => {\r\n\t\t\t\t\t\tconst controlItem = buildItem(item, idx, this._keys, this.grouped);\r\n\r\n\t\t\t\t\t\tthis._keys[controlItem.key] = null;\r\n\r\n\t\t\t\t\t\treturn controlItem;\r\n\t\t\t\t\t});\r\n\r\n\t\t\t// console.log('keys:', this._keys, result);\r\n\r\n\t\t\treturn result || [];\r\n\t\t},\r\n\t\tprepareInitState: function (options, selections) {\r\n\t\t\tconst indices = {};\r\n\t\t\tconst remainder = [];\r\n\t\t\tconst items = [];\r\n\r\n\t\t\tfor (let i = 0; i < selections.length; i++) {\r\n\t\t\t\tlet key = selections[i];\r\n\t\t\t\tif (typeof key !== 'string') {\r\n\t\t\t\t\tkey = key.toString();\r\n\t\t\t\t}\r\n\r\n\t\t\t\tindices[key] = null;\r\n\r\n\t\t\t\tif (!this.isMulti) {\r\n\t\t\t\t\tbreak;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\tfor (let i = 0; i < options.length; i++) {\r\n\t\t\t\tif (\r\n\t\t\t\t\thasProperty(indices, options[i]['key'])\r\n\t\t\t\t\t&& (this.isMulti || items.length === 0)\r\n\t\t\t\t) {\r\n\t\t\t\t\titems.push(options[i]);\r\n\t\t\t\t} else {\r\n\t\t\t\t\tremainder.push(options[i]);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\treturn {\r\n\t\t\t\toptions: remainder,\r\n\t\t\t\tselection: {\r\n\t\t\t\t\titems,\r\n\t\t\t\t\tindices,\r\n\t\t\t\t}\r\n\t\t\t};\r\n\t\t},\r\n\t\tnotify: function (content) {\r\n\t\t\tif (!content) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tthis.$emit(\"selection\", content, this.updateSelections);\r\n\t\t},\r\n\t\tupdateSelections: function (selections) {\r\n\t\t\tif (!Array.isArray(selections) || !selections.length) {\r\n\t\t\t\tthrow new Error(\r\n\t\t\t\t\t\"illegal action on updating selections: wanted an array, find:\",\r\n\t\t\t\t\tselections\r\n\t\t\t\t);\r\n\t\t\t}\r\n\r\n\t\t\tif (!this.isMulti && selections.length > 1) {\r\n\t\t\t\tselections = [selections[0]];\r\n\t\t\t}\r\n\r\n\t\t\tlet indices = {};\r\n\t\t\tfor (let i = 0; i < selections.length; i++) {\r\n\t\t\t\tindices[selections[i].key] = null;\r\n\t\t\t}\r\n\r\n\t\t\tthis.selection = {\r\n\t\t\t\titems: selections,\r\n\t\t\t\tindices,\r\n\t\t\t};\r\n\r\n\t\t\t// set the reason\r\n\t\t\tthis.reason = 1;\r\n\t\t\tthis.options = this.getOptions();\r\n\t\t},\r\n\t\tclear: function (force) {\r\n\t\t\tconst oldItems = this.selection.items;\r\n\r\n\t\t\tthis.selection = {\r\n\t\t\t\titems: [],\r\n\t\t\t\tindices: {},\r\n\t\t\t};\r\n\r\n\t\t\tthis.value = '';\r\n\t\t\tthis.reason = 1;\r\n\r\n\t\t\tif (!this.remote) {\r\n\t\t\t\tthis.options = this.getOptions();\r\n\t\t\t} else {\r\n\t\t\t\tif (typeof this.remote.prefetch === \"function\") {\r\n\t\t\t\t\tthis.runPrefetcher(this.remote.prefetch);\r\n\t\t\t\t} else {\r\n\t\t\t\t\tthis.source = [];\r\n\t\t\t\t\tthis.options = this.getOptions();\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\tif (!force && oldItems && oldItems.length > 0) {\r\n\t\t\t\tthis.notify({\r\n\t\t\t\t\ttype: \"clear\",\r\n\t\t\t\t\titems: [],\r\n\t\t\t\t\tremoved: oldItems.map(item => item),\r\n\t\t\t\t});\r\n\t\t\t}\r\n\t\t},\r\n\t\treset: function () {\r\n\t\t\tconst oldItems = this.selection.items;\r\n\t\t\tconst { options, selection, groups } = this.init();\r\n\r\n\t\t\tthis.value = '';\r\n\t\t\tthis.reason = 1;\r\n\t\t\tthis.options = options;\r\n\t\t\tthis.groups = groups;\r\n\t\t\tthis.selection = selection;\r\n\r\n\t\t\tif (oldItems && oldItems.length > 0) {\r\n\t\t\t\tthis.notify({\r\n\t\t\t\t\ttype: \"clear\",\r\n\t\t\t\t\titems: [],\r\n\t\t\t\t\tremoved: oldItems.map(item => item),\r\n\t\t\t\t});\r\n\t\t\t}\r\n\t\t},\r\n\t\tisValueCreateable: function (value = '', options = []) {\r\n\t\t\tif (value === '') {\r\n\t\t\t\treturn false;\r\n\t\t\t}\r\n\r\n\t\t\tif (options.length === 0) {\r\n\t\t\t\treturn true;\r\n\t\t\t}\r\n\r\n\t\t\tvalue = value.trim().toLowerCase();\r\n\r\n\t\t\tfor (let i = 0; i < options.length; i++) {\r\n\t\t\t\tconst label = options[i]['label'];\r\n\r\n\t\t\t\tif (label.trim().toLowerCase() === value) {\r\n\t\t\t\t\treturn false;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\tif (this.selection.items && this.selection.items.length > 0) {\r\n\t\t\t\tfor (let i = 0; i < this.selection.items.length; i++) {\r\n\t\t\t\t\tconst key = this.selection.items[i]['label'];\r\n\r\n\t\t\t\t\tif (key.trim().toLowerCase() === value) {\r\n\t\t\t\t\t\treturn false;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\treturn true;\r\n\t\t},\r\n\t\trunPrefetcher: function (prefetcher, keepSelections) {\r\n\t\t\t/*\r\n\t\t\t * The prefetcher is used to fetch default menu options, it should\r\n\t\t\t * not need interaction with the `createable` features.\r\n\t\t\t */\r\n\t\t\tprefetcher((data, selections = []) => {\r\n\t\t\t\tsetTimeout(() => {\r\n\r\n\t\t\t\t\tlet source = this.prepareOptions(data);\r\n\t\t\t\t\tlet initOptions = source;\r\n\t\t\t\t\tlet selection = this.selection;\r\n\r\n\t\t\t\t\tif (\r\n\t\t\t\t\t\tselections\r\n\t\t\t\t\t\t&& selections.length > 0\r\n\t\t\t\t\t\t&& (!keepSelections || !this.selection.items.length)\r\n\t\t\t\t\t) {\r\n\t\t\t\t\t\tconst initState = this.prepareInitState(source, selections);\r\n\t\t\t\t\t\tselection = initState.selection;\r\n\t\t\t\t\t\tinitOptions = initState.options;\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tconst { options, groups } = this.grouped ? this.buildOptionGroups(initOptions) : { options: initOptions, groups: null };\r\n\r\n\t\t\t\t\tthis.source = source;\r\n\t\t\t\t\tthis.options = options;\r\n\t\t\t\t\tthis.selection = selection;\r\n\t\t\t\t\tthis.groups = groups;\r\n\t\t\t\t}, 0);\r\n\t\t\t});\r\n\t\t},\r\n\t\tshieldAction: function (up) {\r\n\t\t\tif (this._shieldId) {\r\n\t\t\t\tclearTimeout(this._shieldId);\r\n\t\t\t}\r\n\r\n\t\t\tif (up) {\r\n\t\t\t\tthis._shieldId = setTimeout(() => this.shield = true, shieldTimeout);\r\n\t\t\t} else {\r\n\t\t\t\tthis._shieldId = null;\r\n\t\t\t\tthis.shield = false;\r\n\t\t\t}\r\n\t\t},\r\n\t\thandleFocus: function (evt, targetType) {\r\n\t\t\tthis.focusStatus = targetType === \"input\" ? focusStatus.Input : focusStatus.Icon;\r\n\r\n\t\t\tif (this.focusStatus === focusStatus.Input) {\r\n\t\t\t\tthis.open = true;\r\n\t\t\t}\r\n\r\n\t\t\t// console.log('control get focus ... ', this.focusStatus, targetType);\r\n\t\t},\r\n\t\thandleShieldClick: function () {\r\n\t\t\t// move the cursor back to the input field\r\n\t\t\tthis.focusStatus = focusStatus.Shield;\r\n\t\t\tthis.focusInput();\r\n\t\t},\r\n\t\thandleDbClick: function () {\r\n\t\t\tsetTimeout(() => {\r\n\t\t\t\tthis.$refs.inputControl.select();\r\n\t\t\t}, 0);\r\n\t\t},\r\n\t\thandleInputClick: function () {\r\n\t\t\tthis.focusStatus = focusStatus.Container;\r\n\t\t\tthis.focusInput();\r\n\t\t},\r\n\t\thandleIconEvent: function (evt, type) {\r\n\t\t\t// handle icon's click event, this event will NOT be bubbled up and thus\r\n\t\t\t// we need to work on state setups we should do from the\r\n\t\t\t// 'handleInputClick' handler.\r\n\t\t\tthis.focusStatus = focusStatus.Container;\r\n\r\n\t\t\tswitch (type) {\r\n\t\t\t\tcase \"clear\":\r\n\t\t\t\t\tthis.clear();\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase \"dropdown\":\r\n\t\t\t\t\tthis.open = !this.open;\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tdefault:\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\r\n\t\t\t// if the dropdown icon is clicked, toggle the dropdown menu, otherwise,\r\n\t\t\t// keep it open.\r\n\t\t\tthis.focusInput(type === \"dropdown\" ? this.open : null);\r\n\t\t},\r\n\t\thandleInputBlur: function (evt, force) {\r\n\t\t\tif (this.focusStatus <= focusStatus.Icon || force) {\r\n\t\t\t\tthis.focusStatus = focusStatus.Pending;\r\n\r\n\t\t\t\tsetTimeout(() => {\r\n\t\t\t\t\t// if some other control has grabbed the focus, we're done\r\n\t\t\t\t\tif (this.focusStatus !== focusStatus.Pending) {\r\n\t\t\t\t\t\treturn;\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tthis.focuseReset();\r\n\t\t\t\t}, 0);\r\n\t\t\t}\r\n\t\t},\r\n\t\thandleInputChange: function (evt, value) {\r\n\t\t\tthis.value = value;\r\n\t\t\tthis.open = true;\r\n\r\n\t\t\tif (value === '' || value.trim() === '') {\r\n\t\t\t\tthis.resetOptions();\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tthis.shieldAction(true);\r\n\r\n\t\t\tif (this._debounceId) {\r\n\t\t\t\tclearTimeout(this._debounceId);\r\n\t\t\t}\r\n\r\n\t\t\tconst timeout = this.remote ? debounceLong : debounceShort;\r\n\t\t\tthis._debounceId = setTimeout(() => {\r\n\t\t\t\tthis._engine.query(value, (data = []) => {\r\n\t\t\t\t\t// console.log(data);\r\n\t\t\t\t\tlet source;\r\n\r\n\t\t\t\t\t// for remote search, the source change every time on a search\r\n\t\t\t\t\t// term, hence we need to update the source all the time\r\n\t\t\t\t\tif (this.remote) {\r\n\t\t\t\t\t\tthis.source = this.prepareOptions(data);\r\n\t\t\t\t\t\tsource = this.source;\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\tsource = data;\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tif (this.createable && this.isValueCreateable(value, source)) {\r\n\t\t\t\t\t\tlet key = value.trim().toLowerCase();\r\n\r\n\t\t\t\t\t\twhile (hasProperty(this._keys, key)) {\r\n\t\t\t\t\t\t\tkey += randomSuffix();\r\n\t\t\t\t\t\t}\r\n\r\n\t\t\t\t\t\tsource.push({\r\n\t\t\t\t\t\t\tlabel: value,\r\n\t\t\t\t\t\t\tkey,\r\n\t\t\t\t\t\t\tsrc: { label: value, class: \"vue_ahead__created_item\" },\r\n\t\t\t\t\t\t\tgroup: \"new\",\r\n\t\t\t\t\t\t\ttype: \"created\",\r\n\t\t\t\t\t\t});\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tthis.reason = 0;\r\n\t\t\t\t\tthis.options = this.getOptions(source);\r\n\r\n\t\t\t\t\tthis.shieldAction(false);\r\n\t\t\t\t\tthis._debounceId = null;\r\n\t\t\t\t});\r\n\t\t\t}, timeout);\r\n\t\t},\r\n\t\thandleItemSelection: function (evt, key) {\r\n\t\t\tif (hasProperty(this.selection.indices, key)) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tlet { items, indices } = this.selection;\r\n\t\t\tlet last = null;\r\n\r\n\t\t\tif (!this.isMulti) {\r\n\t\t\t\tif (items && items.length > 0) {\r\n\t\t\t\t\tlast = items[0][\"type\"] === \"created\" ? items[0] : items[0][\"src\"];\r\n\t\t\t\t}\r\n\r\n\t\t\t\titems = [];\r\n\t\t\t\tindices = {};\r\n\t\t\t}\r\n\r\n\t\t\tfor (let i = 0; i < this.options.length; i++) {\r\n\t\t\t\tif (this.options[i].key !== key) {\r\n\t\t\t\t\tcontinue;\r\n\t\t\t\t}\r\n\r\n\t\t\t\titems.push(this.options[i]);\r\n\t\t\t\tindices[key] = null;\r\n\r\n\t\t\t\tbreak;\r\n\t\t\t}\r\n\r\n\t\t\tthis.selection = {\r\n\t\t\t\titems,\r\n\t\t\t\tindices,\r\n\t\t\t};\r\n\r\n\t\t\tthis.notify({\r\n\t\t\t\ttype: \"add\",\r\n\t\t\t\titems: this.selection.items.map(item => item),\r\n\t\t\t\treplaced: last,\r\n\t\t\t\tvalue: this.value,\r\n\t\t\t});\r\n\r\n\t\t\t// reset the value to empty after a selection\r\n\t\t\tif (this.value !== '') {\r\n\t\t\t\tthis.value = '';\r\n\t\t\t}\r\n\r\n\t\t\tthis.reason = 1;\r\n\t\t\tthis.options = this.getOptions();\r\n\r\n\t\t\t// console.log('item selection', key, this.selection.items, this.selection.indices);\r\n\r\n\t\t\tthis.focusStatus = focusStatus.Dropdown;\r\n\t\t\tthis.focusInput();\r\n\t\t},\r\n\t\thandleItemRemoval: function (evt, item) {\r\n\t\t\t// console.log('item removal: ', item);\r\n\r\n\t\t\t// invalid item removal\r\n\t\t\tif (!this.isMulti || !item || !item.key) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tconst { key } = item;\r\n\t\t\tlet { items, indices } = this.selection;\r\n\t\t\tlet deleted = null;\r\n\r\n\t\t\tdelete indices[key];\r\n\t\t\titems = items.filter(item => {\r\n\t\t\t\tif (item.key === key) {\r\n\t\t\t\t\tdeleted = item;\r\n\t\t\t\t\treturn false;\r\n\t\t\t\t}\r\n\r\n\t\t\t\treturn true;\r\n\t\t\t});\r\n\r\n\t\t\tthis.selection = {\r\n\t\t\t\titems,\r\n\t\t\t\tindices,\r\n\t\t\t};\r\n\r\n\t\t\tthis.notify({\r\n\t\t\t\ttype: \"remove\",\r\n\t\t\t\titems: this.selection.items.map(item => item),\r\n\t\t\t\tremoved: [deleted],\r\n\t\t\t});\r\n\r\n\t\t\t// filter the options against the original list\r\n\t\t\tthis.reason = 1;\r\n\t\t\tthis.options =\r\n\t\t\t\tthis.getOptions().filter(item => !hasProperty(indices, item.key));\r\n\r\n\t\t\tthis.focusStatus = focusStatus.Icon;\r\n\t\t\tthis.focusInput();\r\n\t\t},\r\n\t\thandleSpecialKey: function (key, focusInput) {\r\n\t\t\t// console.log('getting special key: ', key);\r\n\r\n\t\t\tswitch (key) {\r\n\t\t\t\tcase 'enter':\r\n\t\t\t\t\tthis.$refs.dropdownControl\r\n\t\t\t\t\t\t&& this.$refs.dropdownControl.select();\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 'esc':\r\n\t\t\t\t\tthis.open = false;\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 'clear':\r\n\t\t\t\t\tthis.clear();\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 'dropdown':\r\n\t\t\t\t\tthis.open = !this.open;\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 'up':\r\n\t\t\t\tcase 'down':\r\n\t\t\t\t\tif (!this.open) {\r\n\t\t\t\t\t\tthis.open = true;\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\tthis.$refs.dropdownControl\r\n\t\t\t\t\t\t\t&& this.$refs.dropdownControl.move(key);\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 'tab':\r\n\t\t\t\t\tthis.focusStatus = focusStatus.Icon;\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase 'tab-out':\r\n\t\t\t\t\tthis.focuseReset();\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tdefault:\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\r\n\t\t\tif (focusInput) {\r\n\t\t\t\tthis.focusInput();\r\n\t\t\t}\r\n\t\t},\r\n\t},\r\n\twatch: {\r\n\t\tclass: function () {\r\n\t\t\tthis.className = this.getClassName();\r\n\t\t},\r\n\t\tcustomClasses: function () {\r\n\t\t\tthis.className = this.getClassName();\r\n\t\t},\r\n\t\tinitOptions: function () {\r\n\t\t\tthis.reset();\r\n\t\t},\r\n\t\tinitSelections: function () {\r\n\t\t\tthis.reset();\r\n\t\t},\r\n\t},\r\n};\r\n</script>\r\n\r\n<style>\r\n.vue_ahead__control_container {\r\n\tposition: relative;\r\n\tbox-sizing: border-box;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$7 = undefined;
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
	if (install.installed) {
		return;
	}

	install.installed = true;

	Vue.component('vue-ahead', __vue_component__$7);
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
