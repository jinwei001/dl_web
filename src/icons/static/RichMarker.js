/**
 * 自定义样式marker
 * @author 
 * @version 1.0
 * 
 */

var BMapLib = window.BMapLib = BMapLib || {};

(function () {
	
	 var baidu = baidu || {
	        guid: "$BAIDU$"
	 };
	 
	 (function() {
		 
		 window[baidu.guid] = {};
		 
		 baidu.extend = function (target, source) {
	            for (var p in source) {
	                if (source.hasOwnProperty(p)) {
	                    target[p] = source[p];
	                }
	            }
	            return target;
	     };
	     
	     baidu.lang = baidu.lang || {};
	     
	     baidu.lang.guid = function () {
            return "TANGRAM__" + (window[baidu.guid]._counter++).toString(36);
        };

        window[baidu.guid]._counter = window[baidu.guid]._counter || 1;
        
        window[baidu.guid]._instances = window[baidu.guid]._instances || {};
        
        baidu.lang.Class = function (guid) {
            this.guid = guid || baidu.lang.guid();
            window[baidu.guid]._instances[this.guid] = this;
        };

        window[baidu.guid]._instances = window[baidu.guid]._instances || {};
        
        baidu.lang.isString = function (source) {
            return '[object String]' == Object.prototype.toString.call(source);
        };
        baidu.isString = baidu.lang.isString;
        
        baidu.lang.isFunction = function (source) {
            return '[object Function]' == Object.prototype.toString.call(source);
        };
        
        baidu.lang.Event = function (type, target) {
            this.type = type;
            this.returnValue = true;
            this.target = target || null;
            this.currentTarget = null;
        };
        
        baidu.lang.Class.prototype.addEventListener = function (type, handler, key) {
            if (!baidu.lang.isFunction(handler)) {
                return;
            }!this.__listeners && (this.__listeners = {});
            var t = this.__listeners,
                id;
            if (typeof key == "string" && key) {
                if (/[^\w\-]/.test(key)) {
                    throw ("nonstandard key:" + key);
                } else {
                    handler.hashCode = key;
                    id = key;
                }
            }
            type.indexOf("on") != 0 && (type = "on" + type);
            typeof t[type] != "object" && (t[type] = {});
            id = id || baidu.lang.guid();
            handler.hashCode = id;
            t[type][id] = handler;
        };
        
        baidu.lang.Class.prototype.removeEventListener = function (type, handler) {
            if (baidu.lang.isFunction(handler)) {
                handler = handler.hashCode;
            } else if (!baidu.lang.isString(handler)) {
                return;
            }!this.__listeners && (this.__listeners = {});
            type.indexOf("on") != 0 && (type = "on" + type);
            var t = this.__listeners;
            if (!t[type]) {
                return;
            }
            t[type][handler] && delete t[type][handler];
        };
        
        baidu.lang.Class.prototype.dispatchEvent = function (event, options) {
            if (baidu.lang.isString(event)) {
                event = new baidu.lang.Event(event);
            }!this.__listeners && (this.__listeners = {});
            options = options || {};
            for (var i in options) {
                event[i] = options[i];
            }
            var i, t = this.__listeners,
                p = event.type;
            event.target = event.target || this;
            event.currentTarget = this;
            p.indexOf("on") != 0 && (p = "on" + p);
            baidu.lang.isFunction(this[p]) && this[p].apply(this, arguments);
            if (typeof t[p] == "object") {
                for (i in t[p]) {
                    t[p][i].apply(this, arguments);
                }
            }
            return event.returnValue;
        };
        
        baidu.dom = baidu.dom || {};
        
        baidu.dom._g = function (id) {
            if (baidu.lang.isString(id)) {
                return document.getElementById(id);
            }
            return id;
        };
        baidu._g = baidu.dom._g;
        
        baidu.event = baidu.event || {};
        
        baidu.event._listeners = baidu.event._listeners || [];
        
        baidu.event.on = function (element, type, listener) {
            type = type.replace(/^on/i, '');
            element = baidu.dom._g(element);

            var realListener = function (ev) {
                    listener.call(element, ev);
                },
                lis = baidu.event._listeners,
                filter = baidu.event._eventFilter,
                afterFilter, realType = type;
            type = type.toLowerCase();
            if (filter && filter[type]) {
                afterFilter = filter[type](element, type, realListener);
                realType = afterFilter.type;
                realListener = afterFilter.listener;
            }
            if (element.addEventListener) {
                element.addEventListener(realType, realListener, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + realType, realListener);
            }
            lis[lis.length] = [element, type, listener, realListener, realType];
            return element;
        };
        baidu.on = baidu.event.on;
        
        baidu.event.un = function (element, type, listener) {
            element = baidu.dom._g(element);
            type = type.replace(/^on/i, '').toLowerCase();

            var lis = baidu.event._listeners,
                len = lis.length,
                isRemoveAll = !listener,
                item, realType, realListener;
            while (len--) {
                item = lis[len];
                if (item[1] === type && item[0] === element && (isRemoveAll || item[2] === listener)) {
                    realType = item[4];
                    realListener = item[3];
                    if (element.removeEventListener) {
                        element.removeEventListener(realType, realListener, false);
                    } else if (element.detachEvent) {
                        element.detachEvent('on' + realType, realListener);
                    }
                    lis.splice(len, 1);
                }
            }

            return element;
        };
        baidu.un = baidu.event.un;
        
        baidu.preventDefault = baidu.event.preventDefault = function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        };
        
	 })();
	 
	 var RichMarker = BMapLib.RichMarker = function (content, position, opts) {
		 
		 if (!content || !position || !(position instanceof BMap.Point)) {
             return;
         }
		 
		 this._map = null;
		 this._content = content;
		 this._position = position;
		 this._container = null;
		 this._size = null;
		 opts = opts || {};
		 
		 this._opts = baidu.extend(
            baidu.extend(this._opts || {}, {

                enableDragging: false,

                anchor: new BMap.Size(0, 0)
            }), opts);
	 };
	 
	 RichMarker.prototype = new BMap.Overlay();
	 
	 RichMarker.prototype.initialize = function (map) {
		 
		 this._map = map;
	     var div = this._container = document.createElement("div");
	     baidu.extend(div.style, {
	            position: "absolute",
	            zIndex: BMap.Overlay.getZIndex(this._position.lat),
	            background: "#FFF",
	            cursor: "pointer"
	        });
	        
	    map.getPanes().labelPane.appendChild(div);
	    this._appendContent();
	    this._setEventDispath();
	    
	    return div;
	 }
	 
	 RichMarker.prototype._appendContent = function () {
        var content = this._content;
        if (typeof content == "string") {
            var div = document.createElement('DIV');
            div.innerHTML = content;
            if (div.childNodes.length == 1) {
                content = (div.removeChild(div.firstChild));
            } else {
                var fragment = document.createDocumentFragment();
                while (div.firstChild) {
                    fragment.appendChild(div.firstChild);
                }
                content = fragment;
            }
        }
        this._container.innerHTML = "";
        this._container.appendChild(content);
    }
	 
	RichMarker.prototype.draw = function () {
        var map = this._map,
            anchor = this._opts.anchor,
            pixel = map.pointToOverlayPixel(this._position);
        this._container.style.left = pixel.x + anchor.width + "px";
        this._container.style.top = pixel.y + anchor.height + "px";
    }
	
	RichMarker.prototype.getPosition = function () {
        return this._position;
    }
	
	RichMarker.prototype.getContent = function () {
        return this._content;
    }
	
	RichMarker.prototype.setContent = function (content) {
        if (!content) {
            return;
        }
        
        this._content = content;
        this._appendContent();
    }
	
	RichMarker.prototype._setEventDispath = function () {
		
		var that = this;
		
		baidu.on(this._container, "onclick", function (e) {
			 
			 _dispatchEvent(that, "onclick");
	          _stopAndPrevent(e);
		});
	}
	
	RichMarker.prototype.getMap = function() {
	    	
    	return this._map;
    }
    
    RichMarker.prototype.setLabel = function() {}
    
    RichMarker.prototype.getLabel = function() {}
    
    
   function _dispatchEvent(instance, type, opts) {
        type.indexOf("on") != 0 && (type = "on" + type);
        var event = new baidu.lang.Event(type);
        if ( !! opts) {
            for (var p in opts) {
                event[p] = opts[p];
            }
        }
        instance.dispatchEvent(event);
   }
    
   function _stopAndPrevent(e) {
        var e = window.event || e;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        return baidu.preventDefault(e);
   }
})();