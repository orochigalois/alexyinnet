Number.prototype.map = function (istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((this - istart) / (istop - istart));
};
Number.prototype.limit = function (min, max) {
    return Math.min(max, Math.max(min, this));
};
Number.prototype.round = function (precision) {
    precision = Math.pow(10, precision || 0);
    return Math.round(this * precision) / precision;
};
Number.prototype.floor = function () {
    return Math.floor(this);
};
Number.prototype.ceil = function () {
    return Math.ceil(this);
};
Number.prototype.toInt = function () {
    return (this | 0);
};
Array.prototype.erase = function (item) {
    for (var i = this.length; i--; i) {
        if (this[i] === item) this.splice(i, 1);
    }
    return this;
};
Array.prototype.random = function () {
    return this[(Math.random() * this.length).floor()];
};
Function.prototype.bind = function (bind) {
    var self = this;
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return self.apply(bind || null, args);
    };
};

var yinxin = function (window) {
    window.L = {
        game: null,
        version: '1.16',
        global: window,
        modules: {},
        resources: [],
        ready: false,
        baked: false,
        nocache: '',
        ua: {},
        lib: 'lib/',
        _current: null,
        _loadQueue: [],
        _waitForOnload: 0,
        $: function (selector) {
            return selector.charAt(0) == '#' ? document.getElementById(selector.substr(1)) : document.getElementsByTagName(selector);
        },
        $new: function (name) {
            return document.createElement(name);
        },
        copy: function (object) {
            if (!object || typeof (object) != 'object' || object instanceof HTMLElement || object instanceof L.Class) {
                return object;
            } else if (object instanceof Array) {
                var c = [];
                for (var i = 0,
                        l = object.length; i < l; i++) {
                    c[i] = L.copy(object[i]);
                }
                return c;
            } else {
                var c = {};
                for (var i in object) {
                    c[i] = L.copy(object[i]);
                }
                return c;
            }
        },
        merge: function (original, extended) {
            for (var key in extended) {
                var ext = extended[key];
                if (typeof (ext) != 'object' || ext instanceof HTMLElement || ext instanceof L.Class) {
                    original[key] = ext;
                } else {
                    if (!original[key] || typeof (original[key]) != 'object') {
                        original[key] = {};
                    }
                    L.merge(original[key], ext);
                }
            }
            return original;
        },
        ksort: function (obj) {
            if (!obj || typeof (obj) != 'object') {
                return [];
            }
            var keys = [],
                values = [];
            for (var i in obj) {
                keys.push(i);
            }
            keys.sort();
            for (var i = 0; i < keys.length; i++) {
                values.push(obj[keys[i]]);
            }
            return values;
        },
        module: function (name) {
            if (L._current) {
                throw ("Module '" + L._current.name + "' defines nothing");
            }
            if (L.modules[name] && L.modules[name].body) {
                throw ("Module '" + name + "' is already defined");
            }
            L._current = {
                name: name,
                requires: [],
                loaded: false,
                body: null
            };
            L.modules[name] = L._current;
            L._loadQueue.push(L._current);
            L._initDOMReady();
            return L;
        },
        requires: function () {
            L._current.requires = Array.prototype.slice.call(arguments);
            return L;
        },
        defines: function (body) {
            name = L._current.name;
            L._current.body = body;
            L._current = null;
            L._execModules();
        },
        addResource: function (resource) {
            L.resources.push(resource);
        },
        setNocache: function (set) {
            L.nocache = set ? '?' + Date.now() : '';
        },
        _loadScript: function (name, requiredFrom) {
            L.modules[name] = {
                name: name,
                requires: [],
                loaded: false,
                body: null
            };
            L._waitForOnload++;
            var path = L.lib + name.replace(/\./g, '/') + '.js' + L.nocache;
            var script = L.$new('script');
            script.type = 'text/javascript';
            script.src = path;
            script.onload = function () {
                L._waitForOnload--;
                L._execModules();
            };
            script.onerror = function () {
                throw ('Failed to load module ' + name + ' at ' + path + ' ' + 'required from ' + requiredFrom);
            };
            L.$('head')[0].appendChild(script);
        },
        _execModules: function () {
            var modulesLoaded = false;
            for (var i = 0; i < L._loadQueue.length; i++) {
                var m = L._loadQueue[i];
                var dependenciesLoaded = true;
                for (var j = 0; j < m.requires.length; j++) {
                    var name = m.requires[j];
                    if (!L.modules[name]) {
                        dependenciesLoaded = false;
                        L._loadScript(name, m.name);
                    } else if (!L.modules[name].loaded) {
                        dependenciesLoaded = false;
                    }
                }
                if (dependenciesLoaded && m.body) {
                    L._loadQueue.splice(i, 1);
                    m.loaded = true;
                    m.body();
                    modulesLoaded = true;
                    i--;
                }
            }
            if (modulesLoaded) {
                L._execModules();
            } else if (!L.baked && L._waitForOnload == 0 && L._loadQueue.length != 0) {
                var unresolved = [];
                for (var i = 0; i < L._loadQueue.length; i++) {
                    var unloaded = [];
                    var requires = L._loadQueue[i].requires;
                    for (var j = 0; j < requires.length; j++) {
                        var m = L.modules[requires[j]];
                        if (!m || !m.loaded) {
                            unloaded.push(requires[j]);
                        }
                    }
                    unresolved.push(L._loadQueue[i].name + ' (requires: ' + unloaded.join(', ') + ')');
                }
                throw ('Unresolved (circular?) dependencies. ' + "Most likely there's a name/path mismatch for one of the listed modules:\n" + unresolved.join('\n'));
            }
        },
        _DOMReady: function () {
            if (!L.modules['dom.ready'].loaded) {
                if (!document.body) {
                    return setTimeout(L._DOMReady, 13);
                }
                L.modules['dom.ready'].loaded = true;
                L._waitForOnload--;
                L._execModules();
            }
            return 0;
        },
        _boot: function () {
            if (document.location.href.match(/\?nocache/)) {
                L.setNocache(true);
            }
            L.ua.pixelRatio = window.devicePixelRatio || 1;
            L.ua.viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            L.ua.screen = {
                width: window.screen.availWidth * L.ua.pixelRatio,
                height: window.screen.availHeight * L.ua.pixelRatio
            };
            L.ua.iPhone = /iPhone/i.test(navigator.userAgent);
            L.ua.iPhone4 = (L.ua.iPhone && L.ua.pixelRatio == 2);
            L.ua.iPad = /iPad/i.test(navigator.userAgent);
            L.ua.android = /android/i.test(navigator.userAgent);
            L.ua.iOS = L.ua.iPhone || L.ua.iPad;
            L.ua.mobile = L.ua.iOS || L.ua.android;
        },
        _initDOMReady: function () {
            if (L.modules['dom.ready']) {
                return;
            }
            L._boot();
            L.modules['dom.ready'] = {
                requires: [],
                loaded: false,
                body: null
            };
            L._waitForOnload++;
            if (document.readyState === 'complete') {
                L._DOMReady();
            } else {
                document.addEventListener('DOMContentLoaded', L._DOMReady, false);
                window.addEventListener('load', L._DOMReady, false);
            }
        }
    };
    var initializing = false,
        fnTest = /xyz/.test(function () {
            xyz;
        }) ? /\bparent\b/ : /.*/;
    window.L.Class = function () {};
    window.L.Class.extend = function (prop) {
        var parent = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            if (typeof (prop[name]) == "function" && typeof (parent[name]) == "function" && fnTest.test(prop[name])) {
                prototype[name] = (function (name, fn) {
                    return function () {
                        var tmp = this.parent;
                        this.parent = parent[name];
                        var ret = fn.apply(this, arguments);
                        this.parent = tmp;
                        return ret;
                    };
                })(name, prop[name])
            } else {
                prototype[name] = prop[name];
            }
        }

        function Class() {
            if (!initializing) {
                if (this.staticInstantiate) {
                    var obj = this.staticInstantiate.apply(this, arguments);
                    if (obj) {
                        return obj;
                    }
                }
                for (var p in this) {
                    this[p] = L.copy(this[p]);
                }
                if (this.init) {
                    this.init.apply(this, arguments);
                }
            }
            return this;
        };
        Class.prototype = prototype;
        Class.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
}

yinxin(window);

L.baked = true;
L.module('impact.image').defines(function () {
    L.Image = L.Class.extend({
        data: null,
        width: 0,
        height: 0,
        loaded: false,
        failed: false,
        loadCallback: null,
        path: '',
        staticInstantiate: function (path) {
            return L.Image.cache[path] || null;
        },
        init: function (path) {
            this.path = path;
            this.load();
        },
        load: function (loadCallback) {
            if (this.loaded) {
                if (loadCallback) {
                    loadCallback(this.path, true);
                }
                return;
            } else if (!this.loaded && L.ready) {
                this.loadCallback = loadCallback || null;
                this.data = new Image();
                this.data.onload = this.onload.bind(this);
                this.data.onerror = this.onerror.bind(this);
                this.data.src = this.path + L.nocache;
            } else {
                L.addResource(this);
            }
            L.Image.cache[this.path] = this;
        },
        reload: function () {
            this.loaded = false;
            this.data = new Image();
            this.data.onload = this.onload.bind(this);
            this.data.src = this.path + '?' + Date.now();
        },
        onload: function (event) {
            this.width = this.data.width;
            this.height = this.data.height;
            if (L.system.scale != 1) {
                this.resize(L.system.scale);
            }
            this.loaded = true;
            if (this.loadCallback) {
                this.loadCallback(this.path, true);
            }
        },
        onerror: function (event) {
            this.failed = true;
            if (this.loadCallback) {
                this.loadCallback(this.path, false);
            }
        },
        resize: function (scale) {
            var widthScaled = this.width * scale;
            var heightScaled = this.height * scale;
            var orig = L.$new('canvas');
            orig.width = this.width;
            orig.height = this.height;
            var origCtx = orig.getContext('2d');
            origCtx.drawImage(this.data, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
            var origPixels = origCtx.getImageData(0, 0, this.width, this.height);
            var scaled = L.$new('canvas');
            scaled.width = widthScaled;
            scaled.height = heightScaled;
            var scaledCtx = scaled.getContext('2d');
            var scaledPixels = scaledCtx.getImageData(0, 0, widthScaled, heightScaled);
            for (var y = 0; y < heightScaled; y++) {
                for (var x = 0; x < widthScaled; x++) {
                    var index = ((y / scale).floor() * this.width + (x / scale).floor()) * 4;
                    var indexScaled = (y * widthScaled + x) * 4;
                    scaledPixels.data[indexScaled] = origPixels.data[index];
                    scaledPixels.data[indexScaled + 1] = origPixels.data[index + 1];
                    scaledPixels.data[indexScaled + 2] = origPixels.data[index + 2];
                    scaledPixels.data[indexScaled + 3] = origPixels.data[index + 3];
                }
            }
            scaledCtx.putImageData(scaledPixels, 0, 0);
            this.data = scaled;
        },
        draw: function (targetX, targetY, sourceX, sourceY, width, height) {
            if (!this.loaded) {
                return;
            }
            var scale = L.system.scale;
            sourceX = sourceX ? sourceX * scale : 0;
            sourceY = sourceY ? sourceY * scale : 0;
            width = (width ? width : this.width) * scale;
            height = (height ? height : this.height) * scale;
            L.system.context.drawImage(this.data, sourceX, sourceY, width, height, L.system.getDrawPos(targetX), L.system.getDrawPos(targetY), width, height);
        },
        drawTile: function (targetX, targetY, tile, tileWidth, tileHeight, flipX, flipY) {
            tileHeight = tileHeight ? tileHeight : tileWidth;
            if (!this.loaded || tileWidth > this.width || tileHeight > this.height) {
                return;
            }
            var scale = L.system.scale;
            var tileWidthScaled = tileWidth * scale;
            var tileHeightScaled = tileHeight * scale;
            var scaleX = flipX ? -1 : 1;
            var scaleY = flipY ? -1 : 1;
            if (flipX || flipY) {
                L.system.context.save();
                L.system.context.scale(scaleX, scaleY);
            }
            L.system.context.drawImage(this.data, ((tile * tileWidth).floor() % this.width) * scale, ((tile * tileWidth / this.width).floor() * tileHeight) * scale, tileWidthScaled, tileHeightScaled, L.system.getDrawPos(targetX) * scaleX - (flipX ? tileWidthScaled : 0), L.system.getDrawPos(targetY) * scaleY - (flipY ? tileHeightScaled : 0), tileWidthScaled, tileHeightScaled);
            if (flipX || flipY) {
                L.system.context.restore();
            }
        }
    });
    L.Image.cache = {};
    L.Image.reloadCache = function () {
        for (path in L.Image.cache) {
            L.Image.cache[path].reload();
        }
    };
});
L.baked = true;
L.module('impact.font').requires('impact.image').defines(function () {
    L.Font = L.Image.extend({
        widthMap: [],
        indices: [],
        firstChar: 32,
        height: 0,
        onload: function (ev) {
            this._loadMetrics(this.data);
            this.parent(ev);
        },
        widthForString: function (s) {
            var width = 0;
            for (var i = 0; i < s.length; i++) {
                width += this.widthMap[s.charCodeAt(i) - this.firstChar] + 1;
            }
            return width;
        },
        draw: function (text, x, y, align) {
            if (typeof (text) != 'string') {
                text = text.toString();
            }
            if (align == L.Font.ALIGN.RIGHT || align == L.Font.ALIGN.CENTER) {
                var width = 0;
                for (var i = 0; i < text.length; i++) {
                    var c = text.charCodeAt(i);
                    width += this.widthMap[c - this.firstChar] + 1;
                }
                x -= align == L.Font.ALIGN.CENTER ? width / 2 : width;
            }
            for (var i = 0; i < text.length; i++) {
                var c = text.charCodeAt(i);
                x += this._drawChar(c - this.firstChar, x, y);
            }
        },
        _drawChar: function (c, targetX, targetY) {
            if (!this.loaded || c < 0 || c >= this.indices.length) {
                return 0;
            }
            var scale = L.system.scale;
            var charX = this.indices[c] * scale;
            var charY = 0;
            var charWidth = this.widthMap[c] * scale;
            var charHeight = (this.height - 2) * scale;
            L.system.context.drawImage(this.data, charX, charY, charWidth, charHeight, L.system.getDrawPos(targetX), L.system.getDrawPos(targetY), charWidth, charHeight);
            return this.widthMap[c] + 1;
        },
        _loadMetrics: function (image) {
            this.height = image.height - 1;
            this.widthMap = [];
            this.indices = [];
            var canvas = L.$new('canvas');
            canvas.width = image.width;
            canvas.height = 1;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, image.height - 1, image.width, 1, 0, 0, image.width, 1);
            var px = ctx.getImageData(0, 0, image.width, 1);
            var currentChar = 0;
            var currentWidth = 0;
            for (var x = 0; x < image.width; x++) {
                var index = x * 4 + 3;
                if (px.data[index] != 0) {
                    currentWidth++;
                } else if (px.data[index] == 0 && currentWidth) {
                    this.widthMap.push(currentWidth);
                    this.indices.push(x - currentWidth);
                    currentChar++;
                    currentWidth = 0;
                }
            }
            this.widthMap.push(currentWidth);
            this.indices.push(x - currentWidth);
        }
    });
    L.Font.ALIGN = {
        LEFT: 0,
        RIGHT: 1,
        CENTER: 2
    };
});
L.baked = true;
L.module('impact.sound').defines(function () {
    L.SoundManager = L.Class.extend({
        clips: {},
        volume: 1,
        channels: 8,
        format: 'mp3',
        init: function () {
            this.format = L.$new('audio').canPlayType('audio/mpeg') ? 'mp3' : 'ogg';
        },
        load: function (path, multiChannel, loadCallback) {
            if (this.clips[path]) {
                if (multiChannel && this.clips[path].length < this.channels) {
                    for (var i = this.clips[path].length; i < this.channels; i++) {
                        this.clips[path].push(this.clips[path][0].cloneNode(true));
                    }
                }
                return this.clips[path][0];
            }
            var realPath = path.match(/^(.*)\.[^\.]+$/)[1] + '.' + this.format + L.nocache;
            var clip = L.$new('audio');
            if (loadCallback) {
                clip.addEventListener('canplaythrough',
                    function (ev) {
                        this.removeEventListener('canplaythrough', arguments.callee, false);
                        loadCallback(path, true, ev);
                    },
                    false);
                clip.addEventListener('error',
                    function (ev) {
                        loadCallback(path, true, ev);
                    },
                    false);
            }
            clip.autobuffer = true;
            clip.preload = 'auto';
            clip.src = realPath;
            clip.load();
            this.clips[path] = [clip];
            if (multiChannel) {
                for (var i = 1; i < this.channels; i++) {
                    this.clips[path].push(clip.cloneNode(true));
                }
            }
            return clip;
        },
        get: function (path) {
            var channels = this.clips[path];
            for (var i = 0,
                    clip; clip = channels[i++];) {
                if (clip.paused || clip.ended) {
                    if (clip.ended) {
                        clip.currentTime = 0;
                    }
                    return clip;
                }
            }
            channels[0].pause();
            channels[0].currentTime = 0;
            return channels[0];
        }
    });
    L.Music = L.Class.extend({
        tracks: [],
        currentTrack: null,
        currentIndex: 0,
        random: false,
        _volume: 1,
        _loop: true,
        _fadeInterval: 0,
        _fadeTimer: null,
        _endedCallbackBound: null,
        init: function () {
            this._endedCallbackBound = this._endedCallback.bind(this);
            if (Object.defineProperty) {
                Object.defineProperty(this, "volume", {
                    get: this.getVolume.bind(this),
                    set: this.setVolume.bind(this)
                });
                Object.defineProperty(this, "loop", {
                    get: this.getLooping.bind(this),
                    set: this.setLooping.bind(this)
                });
            } else if (this.__defineGetter__) {
                this.__defineGetter__('volume', this.getVolume.bind(this));
                this.__defineSetter__('volume', this.setVolume.bind(this));
                this.__defineGetter__('loop', this.getLooping.bind(this));
                this.__defineSetter__('loop', this.setLooping.bind(this));
            }
        },
        add: function (music) {
            if (!L.Sound.enabled) {
                return;
            }
            var path = music instanceof L.Sound ? music.path : music;
            var track = L.soundManager.load(path, false);
            track.loop = this._loop;
            track.volume = this._volume;
            track.addEventListener('ended', this._endedCallbackBound, false);
            this.tracks.push(track);
            if (!this.currentTrack) {
                this.currentTrack = track;
            }
        },
        prev: function () {
            if (!this.tracks.length) {
                return;
            }
            this.stop();
            this.currentIndex = this.random ? (Math.random() * this.tracks.length).floor() : (this.currentIndex - 1) % this.tracks.length;
            this.currentTrack = this.tracks[this.currentIndex];
            this.play();
        },
        next: function () {
            if (!this.tracks.length) {
                return;
            }
            this.stop();
            this.currentIndex = this.random ? (Math.random() * this.tracks.length).floor() : (this.currentIndex + 1) % this.tracks.length;
            this.currentTrack = this.tracks[this.currentIndex];
            this.play();
        },
        pause: function () {
            if (!this.currentTrack) {
                return;
            }
            this.currentTrack.pause();
        },
        stop: function () {
            if (!this.currentTrack) {
                return;
            }
            this.currentTrack.pause();
            this.currentTrack.currentTime = 0;
        },
        play: function () {
            if (!this.currentTrack) {
                return;
            }
            this.currentTrack.play();
        },
        getLooping: function () {
            return this._loop;
        },
        setLooping: function (l) {
            this._loop = l;
            for (var i in this.tracks) {
                this.tracks[i].loop = l;
            }
        },
        getVolume: function () {
            return this._volume;
        },
        setVolume: function (v) {
            this._volume = v.limit(0, 1);
            for (var i in this.tracks) {
                this.tracks[i].volume = this._volume;
            }
        },
        fadeOut: function (time) {
            if (!this.currentTrack) {
                return;
            }
            clearInterval(this._fadeInterval);
            this.fadeTimer = new L.Timer(time);
            this._fadeInterval = setInterval(this._fadeStep.bind(this), 50);
        },
        _fadeStep: function () {
            var v = this.fadeTimer.delta().map(-this.fadeTimer.target, 0, 1, 0).limit(0, 1) * this._volume;
            if (v <= 0.01) {
                this.stop();
                this.currentTrack.volume = this._volume;
                clearInterval(this._fadeInterval);
            } else {
                this.currentTrack.volume = v;
            }
        },
        _endedCallback: function () {
            if (this._loop) {
                this.play();
            } else {
                this.next();
            }
        }
    });
    L.Sound = L.Class.extend({
        path: '',
        volume: 1,
        currentClip: null,
        multiChannel: true,
        init: function (path, multiChannel) {
            this.path = path;
            this.multiChannel = (multiChannel !== false);
            this.load();
        },
        load: function (loadCallback) {
            if (!L.Sound.enabled) {
                if (loadCallback) {
                    loadCallback(this.path, true);
                }
                return;
            }
            if (L.ready) {
                L.soundManager.load(this.path, this.multiChannel, loadCallback);
            } else {
                L.addResource(this);
            }
        },
        play: function () {
            if (!L.Sound.enabled) {
                return;
            }
            this.currentClip = L.soundManager.get(this.path);
            this.currentClip.volume = L.soundManager.volume * this.volume;
            this.currentClip.play();
        },
        stop: function () {
            if (this.currentClip) {
                this.currentClip.pause();
                this.currentClip.currentTime = 0;
            }
        }
    });
    L.Sound.enabled = true;
});
L.baked = true;
L.module('impact.loader').requires('impact.image', 'impact.font', 'impact.sound').defines(function () {
    L.Loader = L.Class.extend({
        resources: [],
        gameClass: null,
        status: 0,
        done: false,
        _unloaded: [],
        _drawStatus: 0,
        _intervalId: 0,
        _intervalId1: 0,
        _loadCallbackBound: null,
        init: function (gameClass, resources) {
            this.gameClass = gameClass;
            this.resources = resources;
            this._loadCallbackBound = this._loadCallback.bind(this);
            for (var i = 0; i < this.resources.length; i++) {
                this._unloaded.push(this.resources[i].path);
            }
        },
        load: function () {
            L.system.clear('#000');

            if (!this.resources.length) {
                this.end();
                return;
            }
            for (var i = 0; i < this.resources.length; i++) {
                this.loadResource(this.resources[i]);
            }
            this._intervalId = setInterval(this.draw.bind(this), 16);
        },
        loadResource: function (res) {
            res.load(this._loadCallbackBound);
        },
        end: function () {
            if (this.done) {
                return;
            }
            this.done = true;
            this._intervalId1 = setInterval(this.countword.bind(this), 50);

        },
        countword: function () {

            this.status = 0.5 + LoadWordCount / TotalWordCount * 0.5;
            if (LoadWordCount == TotalWordCount) {
                clearInterval(this._intervalId);
                clearInterval(this._intervalId1);
                L.system.setGame(this.gameClass);
                L.system.setDelegate(L.game);
            }
        },
        draw: function () {
            this._drawStatus += (this.status - this._drawStatus) / 5;
            var s = L.system.scale;
            var w = L.system.width * 0.6;
            var h = L.system.height * 0.1;
            var x = L.system.width * 0.5 - w / 2;
            var y = L.system.height * 0.5 - h / 2;
            L.system.context.fillStyle = '#000';
            L.system.context.fillRect(0, 0, 480, 320);
            L.system.context.fillStyle = '#fff';
            L.system.context.fillRect(x * s, y * s, w * s, h * s);
            L.system.context.fillStyle = '#000';
            L.system.context.fillRect(x * s + s, y * s + s, w * s - s - s, h * s - s - s);
            L.system.context.fillStyle = '#fff';
            L.system.context.fillRect(x * s, y * s, w * s * this._drawStatus, h * s);
        },
        _loadCallback: function (path, status) {
            if (status) {
                this._unloaded.erase(path);
            } else {
                throw ('Failed to load resource: ' + path);
            }
            this.status = 1 - (this._unloaded.length / this.resources.length);
            if (this._unloaded.length == 0) {
                setTimeout(this.end.bind(this), 250);
            }
        }
    });
});
L.baked = true;
L.module('impact.timer').defines(function () {
    L.Timer = L.Class.extend({
        target: 0,
        base: 0,
        last: 0,
        init: function (seconds) {
            this.base = L.Timer.time;
            this.last = L.Timer.time;
            this.target = seconds || 0;
        },
        set: function (seconds) {
            this.target = seconds || 0;
            this.base = L.Timer.time;
        },
        reset: function () {
            this.base = L.Timer.time;
        },
        tick: function () {
            var delta = L.Timer.time - this.last;
            this.last = L.Timer.time;
            return delta;
        },
        delta: function () {
            return L.Timer.time - this.base - this.target;
        }
    });
    L.Timer._last = 0;
    L.Timer.time = 0;
    L.Timer.timeScale = 1;
    L.Timer.maxStep = 0.05;
    L.Timer.step = function () {
        var current = Date.now();
        var delta = (current - L.Timer._last) / 1000;
        L.Timer.time += Math.min(delta, L.Timer.maxStep) * L.Timer.timeScale;
        L.Timer._last = current;
    };
});
L.baked = true;
L.module('impact.system').requires('impact.timer', 'impact.image').defines(function () {
    L.System = L.Class.extend({
        fps: 30,
        width: 320,
        height: 240,
        realWidth: 320,
        realHeight: 240,
        scale: 1,
        tick: 0,
        intervalId: 0,
        newGameClass: null,
        running: false,
        delegate: null,
        clock: null,
        canvas: null,
        context: null,
        smoothPositioning: true,
        init: function (canvasId, fps, width, height, scale) {
            this.fps = fps;
            this.width = width;
            this.height = height;
            this.scale = scale;
            this.realWidth = width * scale;
            this.realHeight = height * scale;
            this.clock = new L.Timer();
            this.canvas = L.$(canvasId);
            this.canvas.width = this.realWidth;
            this.canvas.height = this.realHeight;
            this.context = this.canvas.getContext('2d');
        },
        setGame: function (gameClass) {
            if (this.running) {
                this.newGameClass = gameClass;
            } else {
                this.setGameNow(gameClass);
            }
        },
        setGameNow: function (gameClass) {
            L.game = new(gameClass)();
            L.system.setDelegate(L.game);
        },
        setDelegate: function (object) {
            if (typeof (object.run) == 'function') {
                this.delegate = object;
                this.startRunLoop();
            } else {
                throw ('System.setDelegate: No run() function in object');
            }
        },
        stopRunLoop: function () {
            clearInterval(this.intervalId);
            this.running = false;
        },
        startRunLoop: function () {
            this.stopRunLoop();
            this.intervalId = setInterval(this.run.bind(this), 1000 / this.fps);
            this.running = true;
        },
        clear: function (color) {
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.realWidth, this.realHeight);
        },
        run: function () {
            L.Timer.step();
            this.tick = this.clock.tick();
            this.delegate.run();
            L.input.clearPressed();
            if (this.newGameClass) {
                this.setGameNow(this.newGameClass);
                this.newGameClass = null;
            }
        },
        getDrawPos: function (p) {
            return this.smoothPositioning ? (p * this.scale).round() : p.round() * this.scale;
        }
    });
});
L.baked = true;
L.module('impact.input').defines(function () {
    L.KEY = {
        'MOUSE1': -1,
        'MOUSE2': -3,
        'MWHEEL_UP': -4,
        'MWHEEL_DOWN': -5,
        'BACKSPACE': 8,
        'TAB': 9,
        'ENTER': 13,
        'PAUSE': 19,
        'CAPS': 20,
        'ESC': 27,
        'SPACE': 32,
        'PAGE_UP': 33,
        'PAGE_DOWN': 34,
        'END': 35,
        'HOME': 36,
        'LEFT_ARROW': 37,
        'UP_ARROW': 38,
        'RIGHT_ARROW': 39,
        'DOWN_ARROW': 40,
        'INSERT': 45,
        'DELETE': 46,
        'D0': 48,
        'D1': 49,
        'D2': 50,
        'D3': 51,
        'D4': 52,
        'D5': 53,
        'D6': 54,
        'D7': 55,
        'D8': 56,
        'D9': 57,
        'A': 65,
        'B': 66,
        'C': 67,
        'D': 68,
        'E': 69,
        'F': 70,
        'G': 71,
        'H': 72,
        'I': 73,
        'J': 74,
        'K': 75,
        'L': 76,
        'M': 77,
        'N': 78,
        'O': 79,
        'P': 80,
        'Q': 81,
        'R': 82,
        'S': 83,
        'T': 84,
        'U': 85,
        'V': 86,
        'W': 87,
        'X': 88,
        'Y': 89,
        'Z': 90,
        'NUMPAD_0': 96,
        'NUMPAD_1': 97,
        'NUMPAD_2': 98,
        'NUMPAD_3': 99,
        'NUMPAD_4': 100,
        'NUMPAD_5': 101,
        'NUMPAD_6': 102,
        'NUMPAD_7': 103,
        'NUMPAD_8': 104,
        'NUMPAD_9': 105,
        'MULTIPLY': 106,
        'ADD': 107,
        'SUBSTRACT': 109,
        'DECIMAL': 110,
        'DIVIDE': 111,
        'F1': 112,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        'F11': 122,
        'F12': 123,
        'SHIFT': 16,
        'CTRL': 17,
        'ALT': 18,
        'PLUS': 187,
        'MINUS': 189,
        'S1': 186,
        'S2': 222,
        'S3': 188,
        'S4': 190,
        'S5': 191
    };
    L.Input = L.Class.extend({
        bindings: {},
        actions: {},
        presses: {},
        locks: {},
        delayedKeyup: [],
        isUsingMouse: false,
        isUsingKeyboard: false,
        mouse: {
            x: 0,
            y: 0
        },
        initMouse: function () {
            if (this.isUsingMouse) {
                return;
            }
            this.isUsingMouse = true;
            window.addEventListener('mousewheel', this.mousewheel.bind(this), false);
            L.system.canvas.addEventListener('contextmenu', this.contextmenu.bind(this), false);
            L.system.canvas.addEventListener('mousedown', this.keydown.bind(this), false);
            L.system.canvas.addEventListener('mouseup', this.keyup.bind(this), false);
            L.system.canvas.addEventListener('mousemove', this.mousemove.bind(this), false);
            L.system.canvas.addEventListener('touchstart', this.keydown.bind(this), false);
            L.system.canvas.addEventListener('touchend', this.keyup.bind(this), false);
            L.system.canvas.addEventListener('touchmove', this.mousemove.bind(this), false);
        },
        initKeyboard: function () {
            if (this.isUsingKeyboard) {
                return;
            }
            this.isUsingKeyboard = true;
            window.addEventListener('keydown', this.keydown.bind(this), false);
            window.addEventListener('keyup', this.keyup.bind(this), false);
        },
        mousewheel: function (event) {
            var code = event.wheel > 0 ? L.KEY.MWHEEL_UP : L.KEY.MWHEEL_DOWN;
            var action = this.bindings[code];
            if (action) {
                this.actions[action] = true;
                this.presses[action] = true;
                event.stopPropagation();
                this.delayedKeyup.push(action);
            }
        },
        mousemove: function (event) {
            var el = L.system.canvas;
            var pos = {
                left: 0,
                top: 0
            };
            while (el != null) {
                pos.left += el.offsetLeft;
                pos.top += el.offsetTop;
                el = el.offsetParent;
            }
            var tx = event.pageX;
            var ty = event.pageY;
            if (event.touches) {
                tx = event.touches[0].clientX;
                ty = event.touches[0].clientY;
            }
            this.mouse.x = (tx - pos.left) / L.system.scale;
            this.mouse.y = (ty - pos.top) / L.system.scale;
        },
        contextmenu: function (event) {
            if (this.bindings[L.KEY.MOUSE2]) {
                event.stopPropagation();
                event.preventDefault();
            }
        },
        keydown: function (event) {
            if (event.target.type == 'text') {
                return;
            }
            var code = event.type == 'keydown' ? event.keyCode : (event.button == 2 ? L.KEY.MOUSE2 : L.KEY.MOUSE1);
            if (event.type == 'touchstart') {
                this.mousemove(event);
            }
            var action = this.bindings[code];
            if (action) {
                this.actions[action] = true;
                if (!this.locks[action]) {
                    this.presses[action] = true;
                    this.locks[action] = true;
                }
                event.stopPropagation();
                event.preventDefault();
            }
        },
        keyup: function (event) {
            if (event.target.type == 'text') {
                return;
            }
            var code = event.type == 'keyup' ? event.keyCode : (event.button == 2 ? L.KEY.MOUSE2 : L.KEY.MOUSE1);
            var action = this.bindings[code];
            if (action) {
                this.delayedKeyup.push(action);
                event.stopPropagation();
                event.preventDefault();
            }
        },
        bind: function (key, action) {
            if (key < 0) {
                this.initMouse();
            } else if (key > 0) {
                this.initKeyboard();
            }
            this.bindings[key] = action;
        },
        bindTouch: function (selector, action) {
            var element = L.$(selector);
            var that = this;
            element.addEventListener('touchstart',
                function (ev) {
                    that.touchStart(ev, action);
                },
                false);
            element.addEventListener('touchend',
                function (ev) {
                    that.touchEnd(ev, action);
                },
                false);
        },
        unbind: function (key) {
            this.bindings[key] = null;
        },
        unbindAll: function () {
            this.bindings = [];
        },
        state: function (action) {
            return this.actions[action];
        },
        pressed: function (action) {
            return this.presses[action];
        },
        clearPressed: function () {
            for (var i = 0; i < this.delayedKeyup.length; i++) {
                var action = this.delayedKeyup[i];
                this.actions[action] = false;
                this.locks[action] = false;
            }
            this.delayedKeyup = [];
            this.presses = {};
        },
        touchStart: function (event, action) {
            this.actions[action] = true;
            this.presses[action] = true;
            event.stopPropagation();
            event.preventDefault();
            return false;
        },
        touchEnd: function (event, action) {
            this.delayedKeyup.push(action);
            event.stopPropagation();
            event.preventDefault();
            return false;
        }
    });
});
L.baked = true;
L.module('impact.impact').requires('dom.ready', 'impact.loader', 'impact.system', 'impact.input', 'impact.sound').defines(function () {
    L.main = function (canvasId, gameClass, fps, width, height, scale, loaderClass) {
        L.system = new L.System(canvasId, fps, width, height, scale || 1);
        L.input = new L.Input();
        L.soundManager = new L.SoundManager();
        L.music = new L.Music();
        L.ready = true;
        var loader = new(loaderClass || L.Loader)(gameClass, L.resources);
        loader.load();
    };
});
L.baked = true;
L.module('plugins.impact-splash-loader').requires('impact.loader').defines(function () {
    L.ImpactSplashLoader = L.Loader.extend({
        endTime: 0,
        fadeToWhiteTime: 200,
        fadeToGameTime: 800,
        logoWidth: 340,
        logoHeight: 120,
        end: function () {
            this.parent();
            this.endTime = Date.now();
            //L.system.setDelegate(this);
        },
        run: function () {
            var t = Date.now() - this.endTime;
            var alpha = 1;
            if (t < this.fadeToWhiteTime) {
                this.draw();
                alpha = t.map(0, this.fadeToWhiteTime, 0, 1);
            } else if (t < this.fadeToGameTime) {
                //L.game.run();
                alpha = t.map(this.fadeToWhiteTime, this.fadeToGameTime, 1, 0);
            } else {
                //L.system.setDelegate(L.game);
                return;
            }
            L.system.context.fillStyle = 'rgba(255,255,255,' + alpha + ')';
            L.system.context.fillRect(0, 0, L.system.realWidth, L.system.realHeight);
        },
        draw: function () {
            this._drawStatus += (this.status - this._drawStatus) / 5;
            var ctx = L.system.context;
            var w = L.system.realWidth;
            var h = L.system.realHeight;
            var scale = w / this.logoWidth / 3;
            var center = (w - this.logoWidth * scale) / 2;
            ctx.fillStyle = 'rgba(0,0,0,0.8)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = 'rgb(128,128,128)';
            ctx.textAlign = 'right';
            ctx.font = '30px';
            ctx.fillText('Have a good day,' + CurrentUser, w - 10, h - 10);
            ctx.textAlign = 'left';
            ctx.save();
            ctx.translate(center, h / 2.5);
            ctx.scale(scale, scale);
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'rgb(255,255,255)';
            ctx.strokeRect(25, this.logoHeight + 40, 300, 20);
            ctx.fillStyle = 'rgb(255,255,255)';
            ctx.fillRect(30, this.logoHeight + 45, 290 * this._drawStatus, 10);
            //this.drawPaths('rgb(255,255,255)', L.ImpactSplashLoader.PATHS_IMPACT);
            ctx.font = "normal 50px arial";
            //ctx.fillStyle='#00f';
            ctx.fillText("  Loading", 100, 100);
            var comet = L.ImpactSplashLoader.PATHS_COMET;
            comet[5][0] = 3 - Math.random() * this._drawStatus * 7;
            comet[5][1] = 3 - Math.random() * this._drawStatus * 10;
            comet[7][0] = 29.5 - Math.random() * this._drawStatus * 10;
            comet[7][1] = 40.4 - Math.random() * this._drawStatus * 10;
            comet[9][0] = 16.1 - Math.random() * this._drawStatus * 10;
            comet[9][1] = 36.1 - Math.random() * this._drawStatus * 5;
            ctx.translate(-Math.random() * this._drawStatus * 7, -Math.random() * this._drawStatus * 5);
            this.drawPaths('rgb(243,120,31)', comet);
            ctx.restore();
        },
        drawPaths: function (color, paths) {
            var ctx = L.system.context;
            ctx.fillStyle = color;
            for (var i = 0; i < paths.length; i += 2) {
                ctx[L.ImpactSplashLoader.OPS[paths[i]]].apply(ctx, paths[i + 1]);
            }
        }
    });
    L.ImpactSplashLoader.OPS = {
        bp: 'beginPath',
        cp: 'closePath',
        f: 'fill',
        m: 'moveTo',
        l: 'lineTo',
        bc: 'bezierCurveTo'
    };
    L.ImpactSplashLoader.PATHS_COMET = ['bp', [], 'm', [85.1, 58.3], 'l', [0.0, 0.0], 'l', [29.5, 40.4], 'l', [16.1, 36.1], 'l', [54.6, 91.6], 'bc', [65.2, 106.1, 83.4, 106.7, 93.8, 95.7], 'bc', [103.9, 84.9, 98.6, 67.6, 85.1, 58.3], 'cp', [], 'm', [76.0, 94.3], 'bc', [68.5, 94.3, 62.5, 88.2, 62.5, 80.8], 'bc', [62.5, 73.3, 68.5, 67.2, 76.0, 67.2], 'bc', [83.5, 67.2, 89.6, 73.3, 89.6, 80.8], 'bc', [89.6, 88.2, 83.5, 94.3, 76.0, 94.3], 'cp', [], 'f', []];
    L.ImpactSplashLoader.PATHS_IMPACT = ['bp', [], 'm', [128.8, 98.7], 'l', [114.3, 98.7], 'l', [114.3, 26.3], 'l', [128.8, 26.3], 'l', [128.8, 98.7], 'cp', [], 'f', [], 'bp', [], 'm', [159.2, 70.1], 'l', [163.6, 26.3], 'l', [184.6, 26.3], 'l', [184.6, 98.7], 'l', [170.3, 98.7], 'l', [170.3, 51.2], 'l', [164.8, 98.7], 'l', [151.2, 98.7], 'l', [145.7, 50.7], 'l', [145.7, 98.7], 'l', [134.1, 98.7], 'l', [134.1, 26.3], 'l', [155.0, 26.3], 'l', [159.2, 70.1], 'cp', [], 'f', [], 'bp', [], 'm', [204.3, 98.7], 'l', [189.8, 98.7], 'l', [189.8, 26.3], 'l', [211.0, 26.3], 'bc', [220.0, 26.3, 224.5, 30.7, 224.5, 39.7], 'l', [224.5, 60.1], 'bc', [224.5, 69.1, 220.0, 73.6, 211.0, 73.6], 'l', [204.3, 73.6], 'l', [204.3, 98.7], 'cp', [], 'm', [207.4, 38.7], 'l', [204.3, 38.7], 'l', [204.3, 61.2], 'l', [207.4, 61.2], 'bc', [209.1, 61.2, 210.0, 60.3, 210.0, 58.6], 'l', [210.0, 41.3], 'bc', [210.0, 39.5, 209.1, 38.7, 207.4, 38.7], 'cp', [], 'f', [], 'bp', [], 'm', [262.7, 98.7], 'l', [248.3, 98.7], 'l', [247.1, 88.2], 'l', [238.0, 88.2], 'l', [237.0, 98.7], 'l', [223.8, 98.7], 'l', [233.4, 26.3], 'l', [253.1, 26.3], 'l', [262.7, 98.7], 'cp', [], 'm', [239.4, 75.5], 'l', [245.9, 75.5], 'l', [242.6, 43.9], 'l', [239.4, 75.5], 'cp', [], 'f', [], 'bp', [], 'm', [300.9, 66.7], 'l', [300.9, 85.9], 'bc', [300.9, 94.9, 296.4, 99.4, 287.4, 99.4], 'l', [278.5, 99.4], 'bc', [269.5, 99.4, 265.1, 94.9, 265.1, 85.9], 'l', [265.1, 39.1], 'bc', [265.1, 30.1, 269.5, 25.6, 278.5, 25.6], 'l', [287.2, 25.6], 'bc', [296.2, 25.6, 300.7, 30.1, 300.7, 39.1], 'l', [300.7, 56.1], 'l', [286.4, 56.1], 'l', [286.4, 40.7], 'bc', [286.4, 38.9, 285.6, 38.1, 283.8, 38.1], 'l', [282.1, 38.1], 'bc', [280.4, 38.1, 279.5, 38.9, 279.5, 40.7], 'l', [279.5, 84.3], 'bc', [279.5, 86.1, 280.4, 86.9, 282.1, 86.9], 'l', [284.0, 86.9], 'bc', [285.8, 86.9, 286.6, 86.1, 286.6, 84.3], 'l', [286.6, 66.7], 'l', [300.9, 66.7], 'cp', [], 'f', [], 'bp', [], 'm', [312.5, 98.7], 'l', [312.5, 39.2], 'l', [303.7, 39.2], 'l', [303.7, 26.3], 'l', [335.8, 26.3], 'l', [335.8, 39.2], 'l', [327.0, 39.2], 'l', [327.0, 98.7], 'l', [312.5, 98.7], 'cp', [], 'f', []];
});
L.baked = true;
L.module('impact.animation').requires('impact.timer', 'impact.image').defines(function () {
    L.AnimationSheet = L.Class.extend({
        width: 8,
        height: 8,
        image: null,
        init: function (path, width, height) {
            this.width = width;
            this.height = height;
            this.image = new L.Image(path);
        }
    });
    L.Animation = L.Class.extend({
        sheet: null,
        timer: null,
        sequence: [],
        flip: {
            x: false,
            y: false
        },
        pivot: {
            x: 0,
            y: 0
        },
        frame: 0,
        tile: 0,
        loopCount: 0,
        alpha: 1,
        angle: 0,
        init: function (sheet, frameTime, sequence, stop) {
            this.sheet = sheet;
            this.pivot = {
                x: sheet.width / 2,
                y: sheet.height / 2
            };
            this.timer = new L.Timer();
            this.frameTime = frameTime;
            this.sequence = sequence;
            this.stop = !!stop;
        },
        rewind: function () {
            this.timer.reset();
            this.loopCount = 0;
            this.tile = this.sequence[0];
            return this;
        },
        gotoFrame: function (f) {
            this.timer.set(this.frameTime * -f);
            this.update();
        },
        gotoRandomFrame: function () {
            this.gotoFrame((Math.random() * this.sequence.length).floor())
        },
        update: function () {
            var frameTotal = (this.timer.delta() / this.frameTime).floor();
            this.loopCount = (frameTotal / this.sequence.length).floor();
            if (this.stop && this.loopCount > 0) {
                this.frame = this.sequence.length - 1;
            } else {
                this.frame = frameTotal % this.sequence.length;
            }
            this.tile = this.sequence[this.frame];
        },
        draw: function (targetX, targetY) {
            var bbsize = Math.max(this.sheet.width, this.sheet.height);
            if (targetX > L.system.width || targetY > L.system.height || targetX + bbsize < 0 || targetY + bbsize < 0) {
                return;
            }
            if (this.alpha != 1) {
                L.system.context.globalAlpha = this.alpha;
            }
            if (this.angle == 0) {
                this.sheet.image.drawTile(targetX, targetY, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y);
            } else {
                L.system.context.save();
                L.system.context.translate(L.system.getDrawPos(targetX + this.pivot.x), L.system.getDrawPos(targetY + this.pivot.y));
                L.system.context.rotate(this.angle);
                this.sheet.image.drawTile(-this.pivot.x, -this.pivot.y, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y);
                L.system.context.restore();
            }
            if (this.alpha != 1) {
                L.system.context.globalAlpha = 1;
            }
        }
    });
});
L.baked = true;
L.module('impact.entity').requires('impact.animation', 'impact.font', 'impact.impact').defines(function () {
    L.Entity = L.Class.extend({
        id: 0,
        settings: {},
        size: {
            x: 16,
            y: 16
        },
        offset: {
            x: 0,
            y: 0
        },
        pos: {
            x: 0,
            y: 0
        },
        last: {
            x: 0,
            y: 0
        },
        vel: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0
        },
        friction: {
            x: 0,
            y: 0
        },
        maxVel: {
            x: 100,
            y: 100
        },
        zIndex: 0,
        gravityFactor: 1,
        standing: false,
        bounciness: 0,
        minBounceVelocity: 40,
        anims: {},
        animSheet: null,
        currentAnim: null,
        health: 10,
        type: 0,
        checkAgainst: 0,
        collides: 0,
        _killed: false,
        font: new L.Font('././pic/tungsten-18.png'),
        init: function (x, y, settings) {
            this.id = ++L.Entity._lastId;
            this.pos.x = x;
            this.pos.y = y;
            L.merge(this, settings);
        },
        addAnim: function (name, frameTime, sequence, stop) {
            if (!this.animSheet) {
                throw ('No animSheet to add the animation ' + name + ' to.');
            }
            var a = new L.Animation(this.animSheet, frameTime, sequence, stop);
            this.anims[name] = a;
            if (!this.currentAnim) {
                this.currentAnim = a;
            }
            return a;
        },
        update: function () {
            this.last.x = this.pos.x;
            this.last.y = this.pos.y;
            this.vel.y += L.game.gravity * L.system.tick * this.gravityFactor;
            this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x, this.maxVel.x);
            this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
            var mx = this.vel.x * L.system.tick;
            var my = this.vel.y * L.system.tick;
            var res = L.game.collisionMap.trace(this.pos.x, this.pos.y, mx, my, this.size.x, this.size.y);
            this.handleMovementTrace(res);
            if (this.currentAnim) {
                this.currentAnim.update();
            }
        },
        getNewVelocity: function (vel, accel, friction, max) {
            if (accel) {
                return (vel + accel * L.system.tick).limit(-max, max);
            } else if (friction) {
                var delta = friction * L.system.tick;
                if (vel - delta > 0) {
                    return vel - delta;
                } else if (vel + delta < 0) {
                    return vel + delta;
                } else {
                    return 0;
                }
            }
            return vel.limit(-max, max);
        },
        handleMovementTrace: function (res) {
            this.standing = false;
            if (res.collision.y) {
                if (this.bounciness > 0 && Math.abs(this.vel.y) > this.minBounceVelocity) {
                    this.vel.y *= -this.bounciness;
                } else {
                    if (this.vel.y > 0) {
                        this.standing = true;
                    }
                    this.vel.y = 0;
                }
            }
            if (res.collision.x) {
                if (this.bounciness > 0 && Math.abs(this.vel.x) > this.minBounceVelocity) {
                    this.vel.x *= -this.bounciness;
                } else {
                    this.vel.x = 0;
                }
            }
            this.pos = res.pos;
        },
        draw: function () {
            if (this.currentAnim) {
                this.currentAnim.draw(this.pos.x.round() - this.offset.x - L.game.screen.x, this.pos.y.round() - this.offset.y - L.game.screen.y);
            }
        },
        kill: function () {
            L.game.removeEntity(this);
        },
        receiveDamage: function (word, amount, from) {
            CurrentWord = word;

            this.health -= amount;
            if (this.health <= 0) {

                for (var i = 2; i <= 23; i++) {
                    for (var j = 0; j < WORDS[i].length; j++) {
                        if (WORDS[i][j] == word) {
                            CurrentSentence = SENTENCES[i][j];
                            break;
                        }
                    }
                }



                CurrentSound = new L.Sound('./userdata/' + CurrentUser + '/word/' + word + '.ogg');
                CurrentSound.play();
                CurrentUserScore += 1;
                $.post("m4_X_update_score_in_game.php", {
                    score: CurrentUserScore,
                    user: CurrentUser
                });
                L.game.ShowSentenceNow = 1;
                this.kill();

            }
        },
        touches: function (other) {
            return !(this.pos.x >= other.pos.x + other.size.x || this.pos.x + this.size.x <= other.pos.x || this.pos.y >= other.pos.y + other.size.y || this.pos.y + this.size.y <= other.pos.y);
        },
        distanceTo: function (other) {
            var xd = (this.pos.x + this.size.x / 2) - (other.pos.x + other.size.x / 2);
            var yd = (this.pos.y + this.size.y / 2) - (other.pos.y + other.size.y / 2);
            return Math.sqrt(xd * xd + yd * yd);
        },
        angleTo: function (other) {
            return Math.atan2((other.pos.y + other.size.y / 2) - (this.pos.y + this.size.y / 2), (other.pos.x + other.size.x / 2) - (this.pos.x + this.size.x / 2));
        },
        check: function (other) {},
        collideWith: function (other, axis) {}
    });
    L.Entity._lastId = 0;
    L.Entity.COLLIDES = {
        NEVER: 0,
        LITE: 1,
        PASSIVE: 2,
        ACTIVE: 4,
        FIXED: 8
    };
    L.Entity.TYPE = {
        NONE: 0,
        A: 1,
        B: 2,
        BOTH: 3
    };
    L.Entity.checkPair = function (a, b) {
        if (a.checkAgainst & b.type) {
            a.check(b);
        }
        if (b.checkAgainst & a.type) {
            b.check(a);
        }
        if (a.collides && b.collides && a.collides + b.collides > L.Entity.COLLIDES.ACTIVE) {
            L.Entity.solveCollision(a, b);
        }
    };
    L.Entity.solveCollision = function (a, b) {
        var weak = null;
        if (a.collides == L.Entity.COLLIDES.LITE || b.collides == L.Entity.COLLIDES.FIXED) {
            weak = a;
        } else if (b.collides == L.Entity.COLLIDES.LITE || a.collides == L.Entity.COLLIDES.FIXED) {
            weak = b;
        }
        if (a.last.x + a.size.x > b.last.x && a.last.x < b.last.x + b.size.x) {
            if (a.last.y < b.last.y) {
                L.Entity.seperateOnYAxis(a, b, weak);
            } else {
                L.Entity.seperateOnYAxis(b, a, weak);
            }
            a.collideWith(b, 'y');
            b.collideWith(a, 'y');
        } else if (a.last.y + a.size.y > b.last.y && a.last.y < b.last.y + b.size.y) {
            if (a.last.x < b.last.x) {
                L.Entity.seperateOnXAxis(a, b, weak);
            } else {
                L.Entity.seperateOnXAxis(b, a, weak);
            }
            a.collideWith(b, 'x');
            b.collideWith(a, 'x');
        }
    };
    L.Entity.seperateOnXAxis = function (left, right, weak) {
        var nudge = (left.pos.x + left.size.x - right.pos.x);
        if (weak) {
            var strong = left === weak ? right : left;
            weak.vel.x = -weak.vel.x * weak.bounciness + strong.vel.x;
            var resWeak = L.game.collisionMap.trace(weak.pos.x, weak.pos.y, weak == left ? -nudge : nudge, 0, weak.size.x, weak.size.y);
            weak.pos.x = resWeak.pos.x;
        } else {
            var v2 = (left.vel.x - right.vel.x) / 2;
            left.vel.x = -v2;
            right.vel.x = v2;
            var resLeft = L.game.collisionMap.trace(left.pos.x, left.pos.y, -nudge / 2, 0, left.size.x, left.size.y);
            left.pos.x = resLeft.pos.x.floor();
            var resRight = L.game.collisionMap.trace(right.pos.x, right.pos.y, nudge / 2, 0, right.size.x, right.size.y);
            right.pos.x = resRight.pos.x.ceil();
        }
    };
    L.Entity.seperateOnYAxis = function (top, bottom, weak) {
        var nudge = (top.pos.y + top.size.y - bottom.pos.y);
        if (weak) {
            var strong = top === weak ? bottom : top;
            weak.vel.y = -weak.vel.y * weak.bounciness + strong.vel.y;
            var nudgeX = 0;
            if (weak == top && Math.abs(weak.vel.y - strong.vel.y) < weak.minBounceVelocity) {
                weak.standing = true;
                nudgeX = strong.vel.x * L.system.tick;
            }
            var resWeak = L.game.collisionMap.trace(weak.pos.x, weak.pos.y, nudgeX, weak == top ? -nudge : nudge, weak.size.x, weak.size.y);
            weak.pos.y = resWeak.pos.y;
            weak.pos.x = resWeak.pos.x;
        } else if (L.game.gravity && (bottom.standing || top.vel.y > 0)) {
            var resTop = L.game.collisionMap.trace(top.pos.x, top.pos.y, 0, -(top.pos.y + top.size.y - bottom.pos.y), top.size.x, top.size.y);
            top.pos.y = resTop.pos.y;
            if (top.bounciness > 0 && top.vel.y > top.minBounceVelocity) {
                top.vel.y *= -top.bounciness;
            } else {
                top.standing = true;
                top.vel.y = 0;
            }
        } else {
            var v2 = (top.vel.y - bottom.vel.y) / 2;
            top.vel.y = -v2;
            bottom.vel.y = v2;
            var nudgeX = bottom.vel.x * L.system.tick;
            var resTop = L.game.collisionMap.trace(top.pos.x, top.pos.y, nudgeX, -nudge / 2, top.size.x, top.size.y);
            top.pos.y = resTop.pos.y;
            var resBottom = L.game.collisionMap.trace(bottom.pos.x, bottom.pos.y, 0, nudge / 2, bottom.size.x, bottom.size.y);
            bottom.pos.y = resBottom.pos.y;
        }
    };
});
L.baked = true;
L.module('impact.map').defines(function () {
    L.Map = L.Class.extend({
        tilesize: 8,
        width: 1,
        height: 1,
        data: [[]],
        init: function (tilesize, data) {
            this.tilesize = tilesize;
            this.data = data;
            this.height = data.length;
            this.width = data[0].length;
        },
        getTile: function (x, y) {
            var tx = (x / this.tilesize).floor();
            var ty = (y / this.tilesize).floor();
            if ((tx >= 0 && tx < this.width) && (ty >= 0 && ty < this.height)) {
                return this.data[ty][tx];
            } else {
                return 0;
            }
        },
        setTile: function (x, y, tile) {
            var tx = (x / this.tilesize).floor();
            var ty = (y / this.tilesize).floor();
            if ((tx >= 0 && tx < this.width) && (ty >= 0 && ty < this.height)) {
                this.data[ty][tx] = tile;
            }
        }
    });
});
L.baked = true;
L.module('impact.collision-map').requires('impact.map').defines(function () {
    L.CollisionMap = L.Map.extend({
        firstSolidTile: 1,
        lastSolidTile: 255,
        init: function (tilesize, data) {
            this.parent(tilesize, data);
        },
        trace: function (x, y, vx, vy, objectWidth, objectHeight) {
            var res = {
                collision: {
                    x: false,
                    y: false
                },
                pos: {
                    x: x,
                    y: y
                },
                tile: {
                    x: 0,
                    y: 0
                }
            };
            var steps = (Math.max(Math.abs(vx), Math.abs(vy)) / this.tilesize).ceil();
            if (steps > 1) {
                var sx = vx / steps;
                var sy = vy / steps;
                for (var i = 0; i < steps && (sx || sy); i++) {
                    this._traceStep(res, x, y, sx, sy, objectWidth, objectHeight);
                    x = res.pos.x;
                    y = res.pos.y;
                    if (res.collision.x) {
                        sx = 0;
                    }
                    if (res.collision.y) {
                        sy = 0;
                    }
                }
            } else {
                this._traceStep(res, x, y, vx, vy, objectWidth, objectHeight);
            }
            return res;
        },
        _traceStep: function (res, x, y, vx, vy, width, height) {
            res.pos.x += vx;
            res.pos.y += vy;
            if (vx) {
                var pxOffsetX = (vx > 0 ? width : 0);
                var tileOffsetX = (vx < 0 ? this.tilesize : 0);
                var firstTileY = (y / this.tilesize).floor();
                var lastTileY = ((y + height) / this.tilesize).ceil();
                var tileX = ((x + vx + pxOffsetX) / this.tilesize).floor();
                if (lastTileY >= 0 && firstTileY < this.height && tileX >= 0 && tileX < this.width) {
                    for (var tileY = firstTileY; tileY < lastTileY; tileY++) {
                        var t = this.data[tileY] && this.data[tileY][tileX];
                        if (t >= this.firstSolidTile && t <= this.lastSolidTile) {
                            res.collision.x = true;
                            res.tile.x = t;
                            res.pos.x = tileX * this.tilesize - pxOffsetX + tileOffsetX;
                            break;
                        }
                    }
                }
            }
            if (vy) {
                var pxOffsetY = (vy > 0 ? height : 0);
                var tileOffsetY = (vy < 0 ? this.tilesize : 0);
                var firstTileX = (res.pos.x / this.tilesize).floor();
                var lastTileX = ((res.pos.x + width) / this.tilesize).ceil();
                var tileY = ((y + vy + pxOffsetY) / this.tilesize).floor();
                if (lastTileX >= 0 && firstTileX < this.width && tileY >= 0 && tileY < this.height) {
                    for (var tileX = firstTileX; tileX < lastTileX; tileX++) {
                        var t = this.data[tileY] && this.data[tileY][tileX];
                        if (t >= this.firstSolidTile && t <= this.lastSolidTile) {
                            res.collision.y = true;
                            res.tile.y = t;
                            res.pos.y = tileY * this.tilesize - pxOffsetY + tileOffsetY;
                            break;
                        }
                    }
                }
            }
        }
    });
    L.CollisionMap.staticNoCollision = {
        trace: function (x, y, vx, vy) {
            return {
                collision: {
                    x: false,
                    y: false
                },
                pos: {
                    x: x + vx,
                    y: y + vy
                },
                tile: {
                    x: 0,
                    y: 0
                }
            };
        }
    };
});
L.baked = true;
L.module('impact.background-map').requires('impact.map', 'impact.image').defines(function () {
    L.BackgroundMap = L.Map.extend({
        tiles: null,
        scroll: {
            x: 0,
            y: 0
        },
        distance: 1,
        repeat: false,
        tilesetName: '',
        preRender: false,
        preRenderedChunks: null,
        chunkSize: 512,
        debugChunks: false,
        anims: {},
        init: function (tilesize, data, tileset) {
            this.parent(tilesize, data);
            this.setTileset(tileset);
        },
        setTileset: function (tileset) {
            this.tilesetName = tileset instanceof L.Image ? tileset.path : tileset;
            this.tiles = new L.Image(this.tilesetName);
            this.preRenderedChunks = null;
        },
        setScreenPos: function (x, y) {
            this.scroll.x = x / this.distance;
            this.scroll.y = y / this.distance;
        },
        preRenderMapToChunks: function () {
            var totalWidth = this.width * this.tilesize * L.system.scale,
                totalHeight = this.height * this.tilesize * L.system.scale;
            var chunkCols = (totalWidth / this.chunkSize).ceil(),
                chunkRows = (totalHeight / this.chunkSize).ceil();
            this.preRenderedChunks = [];
            for (var y = 0; y < chunkRows; y++) {
                this.preRenderedChunks[y] = [];
                for (var x = 0; x < chunkCols; x++) {
                    var chunkWidth = (x == chunkCols - 1) ? totalWidth - x * this.chunkSize : this.chunkSize;
                    var chunkHeight = (y == chunkRows - 1) ? totalHeight - y * this.chunkSize : this.chunkSize;
                    this.preRenderedChunks[y][x] = this.preRenderChunk(x, y, chunkWidth, chunkHeight);
                }
            }
        },
        preRenderChunk: function (cx, cy, w, h) {
            var tw = w / this.tilesize / L.system.scale + 1;
            th = h / this.tilesize / L.system.scale + 1;
            var nx = (cx * this.chunkSize / L.system.scale) % this.tilesize,
                ny = (cy * this.chunkSize / L.system.scale) % this.tilesize;
            var tx = (cx * this.chunkSize / this.tilesize / L.system.scale).floor(),
                ty = (cy * this.chunkSize / this.tilesize / L.system.scale).floor();
            var chunk = L.$new('canvas');
            chunk.width = w;
            chunk.height = h;
            var oldContext = L.system.context;
            L.system.context = chunk.getContext("2d");
            for (var x = 0; x < tw; x++) {
                for (var y = 0; y < th; y++) {
                    if (x + tx < this.width && y + ty < this.height) {
                        var tile = this.data[y + ty][x + tx];
                        if (tile) {
                            this.tiles.drawTile(x * this.tilesize - nx, y * this.tilesize - ny, tile - 1, this.tilesize);
                        }
                    }
                }
            }
            L.system.context = oldContext;
            return chunk;
        },
        draw: function () {
            if (!this.tiles.loaded) {
                return;
            }
            if (this.preRender) {
                this.drawPreRendered();
            } else {
                this.drawTiled();
            }
        },
        drawPreRendered: function () {
            if (!this.preRenderedChunks) {
                this.preRenderMapToChunks();
            }
            var dx = L.system.getDrawPos(this.scroll.x),
                dy = L.system.getDrawPos(this.scroll.y);
            if (this.repeat) {
                dx %= this.width * this.tilesize * L.system.scale;
                dy %= this.height * this.tilesize * L.system.scale;
            }
            var minChunkX = Math.max((dx / this.chunkSize).floor(), 0),
                minChunkY = Math.max((dy / this.chunkSize).floor(), 0),
                maxChunkX = ((dx + L.system.realWidth) / this.chunkSize).ceil(),
                maxChunkY = ((dy + L.system.realHeight) / this.chunkSize).ceil(),
                maxRealChunkX = this.preRenderedChunks[0].length,
                maxRealChunkY = this.preRenderedChunks.length;
            if (!this.repeat) {
                maxChunkX = Math.min(maxChunkX, maxRealChunkX);
                maxChunkY = Math.min(maxChunkY, maxRealChunkY);
            }
            var nudgeY = 0;
            for (var cy = minChunkY; cy < maxChunkY; cy++) {
                var nudgeX = 0;
                for (var cx = minChunkX; cx < maxChunkX; cx++) {
                    var chunk = this.preRenderedChunks[cy % maxRealChunkY][cx % maxRealChunkX];
                    var x = -dx + cx * this.chunkSize - nudgeX;
                    var y = -dy + cy * this.chunkSize - nudgeY;
                    L.system.context.drawImage(chunk, x, y);
                    if (this.debugChunks) {
                        L.system.context.strokeStyle = '#f0f';
                        L.system.context.strokeRect(x, y, this.chunkSize, this.chunkSize);
                    }
                    if (this.repeat && chunk.width < this.chunkSize && x + chunk.width < L.system.realWidth) {
                        nudgeX = this.chunkSize - chunk.width;
                        maxChunkX++;
                    }
                }
                if (this.repeat && chunk.height < this.chunkSize && y + chunk.height < L.system.realHeight) {
                    nudgeY = this.chunkSize - chunk.height;
                    maxChunkY++;
                }
            }
        },
        drawTiled: function () {
            var tile = 0,
                anim = null,
                tileOffsetX = (this.scroll.x / this.tilesize).toInt(),
                tileOffsetY = (this.scroll.y / this.tilesize).toInt(),
                pxOffsetX = this.scroll.x % this.tilesize,
                pxOffsetY = this.scroll.y % this.tilesize,
                pxMinX = -pxOffsetX - this.tilesize,
                pxMinY = -pxOffsetY - this.tilesize,
                pxMaxX = L.system.width + this.tilesize - pxOffsetX,
                pxMaxY = L.system.height + this.tilesize - pxOffsetY;
            for (var mapY = -1,
                    pxY = pxMinY; pxY < pxMaxY; mapY++, pxY += this.tilesize) {
                var tileY = mapY + tileOffsetY;
                if (tileY >= this.height || tileY < 0) {
                    if (!this.repeat) {
                        continue;
                    }
                    tileY = tileY > 0 ? tileY % this.height : ((tileY + 1) % this.height) + this.height - 1;
                }
                for (var mapX = -1,
                        pxX = pxMinX; pxX < pxMaxX; mapX++, pxX += this.tilesize) {
                    var tileX = mapX + tileOffsetX;
                    if (tileX >= this.width || tileX < 0) {
                        if (!this.repeat) {
                            continue;
                        }
                        tileX = tileX > 0 ? tileX % this.width : ((tileX + 1) % this.width) + this.width - 1;
                    }
                    if ((tile = this.data[tileY][tileX])) {
                        if ((anim = this.anims[tile - 1])) {
                            anim.draw(pxX, pxY);
                        } else {
                            this.tiles.drawTile(pxX, pxY, tile - 1, this.tilesize);
                        }
                    }
                }
            }
        }
    });
});
L.baked = true;
L.module('impact.game').requires('impact.impact', 'impact.entity', 'impact.collision-map', 'impact.background-map').defines(function () {
    L.Game = L.Class.extend({
        clearColor: '#000000',
        gravity: 0,
        screen: {
            x: 0,
            y: 0
        },
        entities: [],
        namedEntities: {},
        collisionMap: L.CollisionMap.staticNoCollision,
        backgroundMaps: [],
        backgroundAnims: {},
        cellSize: 64,
        _deferredKill: [],
        _levelToLoad: null,
        loadLevel: function (data) {
            this.screen = {
                x: 0,
                y: 0
            };
            this.entities = [];
            this.namedEntities = {};
            for (var i = 0; i < data.entities.length; i++) {
                var ent = data.entities[i];
                this.spawnEntity(ent.type, ent.x, ent.y, ent.settings);
            }
            this.sortEntities();
            this.collisionMap = null;
            this.backgroundMaps = [];
            for (var i = 0; i < data.layer.length; i++) {
                var ld = data.layer[i];
                if (ld.name == 'collision') {
                    this.collisionMap = new L.CollisionMap(ld.tilesize, ld.data);
                } else {
                    var newMap = new L.BackgroundMap(ld.tilesize, ld.data, ld.tilesetName);
                    newMap.anims = this.backgroundAnims[ld.tilesetName] || {};
                    newMap.repeat = ld.repeat;
                    newMap.distance = ld.distance;
                    this.backgroundMaps.push(newMap);
                }
            }
        },
        loadLevelDeferred: function (data) {
            this._levelToLoad = data;
        },
        getEntityByName: function (name) {
            return this.namedEntities[name];
        },
        getEntitiesByType: function (type) {
            var entityClass = typeof (type) === 'string' ? L.global[type] : type;
            var a = [];
            for (var i = 0; i < this.entities.length; i++) {
                var ent = this.entities[i];
                if (ent instanceof entityClass && !ent._killed) {
                    a.push(ent);
                }
            }
            return a;
        },
        spawnEntity: function (type, x, y, settings) {
            var entityClass = typeof (type) === 'string' ? L.global[type] : type;
            if (!entityClass) {
                throw ("Can't spawn entity of type " + type);
            }
            var ent = new(entityClass)(x, y, settings || {});
            this.entities.push(ent);
            if (ent.name) {
                this.namedEntities[ent.name] = ent;
            }
            return ent;
        },
        sortEntities: function () {
            this.entities.sort(function (a, b) {
                return a.zIndex - b.zIndex;
            });
        },
        removeEntity: function (ent) {
            if (ent.name) {
                delete this.namedEntities[ent.name];
            }
            ent._killed = true;
            ent.checkAgainst = L.Entity.TYPE.NONE;
            ent.collides = L.Entity.COLLIDES.NEVER;
            this._deferredKill.push(ent);
        },
        run: function () {
            this.update();
            this.draw();
        },
        update: function () {
            if (this._levelToLoad) {
                this.loadLevel(this._levelToLoad);
                this._levelToLoad = null;
            }
            for (var i = 0; i < this.entities.length; i++) {
                var ent = this.entities[i];
                if (!ent._killed) {
                    ent.update();
                }
            }
            this.checkEntities();
            for (var i = 0; i < this._deferredKill.length; i++) {
                this.entities.erase(this._deferredKill[i]);
            }
            this._deferredKill = [];
            for (var tileset in this.backgroundAnims) {
                var anims = this.backgroundAnims[tileset];
                for (var a in anims) {
                    anims[a].update();
                }
            }
            for (var i = 0; i < this.backgroundMaps.length; i++) {
                this.backgroundMaps[i].setScreenPos(this.screen.x, this.screen.y);
            }
        },
        draw: function () {
            L.system.clear(this.clearColor);
            for (var i = 0; i < this.backgroundMaps.length; i++) {
                this.backgroundMaps[i].draw();
            }
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].draw();
            }
        },
        checkEntities: function () {
            var hash = {};
            for (var e = 0; e < this.entities.length; e++) {
                var entity = this.entities[e];
                if (e.type == L.Entity.TYPE.NONE && e.checkAgainst == L.Entity.TYPE.NONE && e.collides == L.Entity.COLLIDES.NEVER) {
                    continue;
                }
                var checked = {},
                    xmin = (entity.pos.x / this.cellSize).floor(),
                    ymin = (entity.pos.y / this.cellSize).floor(),
                    xmax = ((entity.pos.x + entity.size.x) / this.cellSize).floor() + 1,
                    ymax = ((entity.pos.y + entity.size.y) / this.cellSize).floor() + 1;
                for (var x = xmin; x < xmax; x++) {
                    for (var y = ymin; y < ymax; y++) {
                        if (!hash[x]) {
                            hash[x] = {};
                            hash[x][y] = [entity];
                        } else if (!hash[x][y]) {
                            hash[x][y] = [entity];
                        } else {
                            var cell = hash[x][y];
                            for (var c = 0; c < cell.length; c++) {
                                if (entity.touches(cell[c]) && !checked[cell[c].id]) {
                                    checked[cell[c].id] = true;
                                    L.Entity.checkPair(entity, cell[c]);
                                }
                            }
                            cell.push(entity);
                        }
                    }
                }
            }
        }
    });
});
L.baked = true;
L.module('game.MyGlobalVar').defines(function () {

    LoadWordCount = 0;
    TotalWordCount = -1;

    CurrentWord = '';
    CurrentSentence = '';
    CurrentPicture = null;
    CurrentSound = null;
    CurrentSentenceSound = null;
    CurrentShootSentenceSound = null;
    CurrentUser = document.getElementById("user").innerHTML;

    CurrentUserScore = parseInt(document.getElementById("score").innerHTML);
    CurrentUserVSize = parseInt(document.getElementById("vsize").innerHTML);
    CurrentUserRanking = parseInt(document.getElementById("ranking").innerHTML);

});
L.baked = true;
L.module('game.words').defines(function () {


    WORDS = {
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
        12: [],
        13: [],
        14: [],
        15: [],
        16: [],
        17: [],
        18: [],
        19: [],
        20: [],
        21: [],
        22: [],
        23: []

    };
    SENTENCES = {
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
        12: [],
        13: [],
        14: [],
        15: [],
        16: [],
        17: [],
        18: [],
        19: [],
        20: [],
        21: [],
        22: [],
        23: []

    };


    TotalWordCount = 3;
    LoadWordCount = 3;
    var word1 = "visteon";
    var sentence1 = "Visteon Corporation,Leading Automotive Global Supplier"
    WORDS[word1.length].push(word1);
    SENTENCES[word1.length].push(sentence1);

    var word2 = "infotainment";
    var sentence2 = "Integrated infotainment systems in automobiles"
    WORDS[word2.length].push(word2);
    SENTENCES[word2.length].push(sentence2);

    var word3 = "phoenix";
    var sentence3 = "Phoenix helps you create apps based on open web standards"
    WORDS[word3.length].push(word3);
    SENTENCES[word3.length].push(sentence3);

});
L.baked = true;
L.module('game.entities.particle').requires('impact.entity').defines(function () {
    EntityParticle = L.Entity.extend({
        size: {
            x: 4,
            y: 4
        },
        offset: {
            x: 0,
            y: 0
        },
        maxVel: {
            x: 160,
            y: 160
        },
        minBounceVelocity: 0,
        type: L.Entity.TYPE.NONE,
        checkAgainst: L.Entity.TYPE.NONE,
        collides: L.Entity.COLLIDES.LITE,
        lifetime: 5,
        fadetime: 1,
        bounciness: 0.6,
        friction: {
            x: 20,
            y: 0
        },
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
            this.currentAnim.flip.x = (Math.random() > 0.5);
            this.currentAnim.flip.y = (Math.random() > 0.5);
            this.currentAnim.gotoRandomFrame();
            this.idleTimer = new L.Timer();
        },
        update: function () {
            if (this.idleTimer.delta() > this.lifetime) {
                this.kill();
                return;
            }
            this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1, 0);
            this.parent();
        }
    });
});
L.baked = true;
L.module('game.entities.enemy').requires('impact.entity', 'impact.font', 'game.words', 'game.entities.particle').defines(function () {
    EntityEnemy = L.Entity.extend({
        word: 'none',
        remainingWord: 'none',
        health: 8,
        currentLetter: 0,
        targeted: false,
        font: new L.Font('././pic/tungsten-18.png'),
        fontActive: new L.Font('././pic/tungsten-18-orange.png'),
        speed: 10,
        friction: {
            x: 100,
            y: 100
        },
        hitTimer: null,
        dead: false,
        angle: 0,
        soundHit: new L.Sound('./sound/__hit.ogg'),
        type: L.Entity.TYPE.B,
        checkAgainst: L.Entity.TYPE.A,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.word = this.getWordWithLength(this.health);
            this.remainingWord = this.word;
            this.hitTimer = new L.Timer(0);
            this.dieTimer = new L.Timer(0);
            L.game.registerTarget(this.word.charAt(0), this);
            this.angle = this.angleTo(L.game.player);
        },
        getWordWithLength: function (length) {

            var w;
            w = WORDS[length].random();
            if (w)
                return w;
            else
                return 'Errrrrrrrrrr';
        },
        target: function () {
            this.targeted = true;
            L.game.currentTarget = this;
            L.game.unregisterTarget(this.word.charAt(0), this);
            L.game.entities.erase(this);
            L.game.entities.push(this);
        },
        draw: function () {
            L.system.context.globalCompositeOperation = 'lighter';
            this.parent();
            L.system.context.globalCompositeOperation = 'source-over';
        },
        drawLabel: function () {
            if (!this.remainingWord.length) {
                return;
            }
            var w = this.font.widthForString(this.word);
            var x = (this.pos.x - 6).limit(w + 2, L.system.width - 1);
            var y = (this.pos.y + this.size.y - 10).limit(2, L.system.height - 19);
            var bx = L.system.getDrawPos(x - w - 2);
            var by = L.system.getDrawPos(y - 1);
            L.system.context.fillStyle = 'rgba(0,0,0,0.5)';
            L.system.context.fillRect(bx, by, w + 3, 19);
            if (this.targeted) {
                this.fontActive.draw(this.remainingWord, x, y, L.Font.ALIGN.RIGHT);
            } else {
                this.font.draw(this.remainingWord, x, y, L.Font.ALIGN.RIGHT);
            }
        },
        kill: function () {
            L.game.unregisterTarget(this.word.charAt(0), this);
            if (L.game.currentTarget == this) {
                L.game.currentTarget = null;
            }
            this.parent();
        },
        update: function () {
            if (this.hitTimer.delta() > 0) {
                this.vel.x = Math.cos(this.angle) * this.speed;
                this.vel.y = Math.sin(this.angle) * this.speed;
            }
            this.parent();
            if (this.pos.x < -this.animSheet.width || this.pos.x > L.system.width + 10 || this.pos.y > L.system.height + 10 || this.pos.y < -this.animSheet.height - 30) {
                this.kill();
            }
        },
        hit: function () {
            var numParticles = this.health <= 1 ? 10 : 4;
            for (var i = 0; i < numParticles; i++) {
                L.game.spawnEntity(EntityExplosionParticle, this.pos.x, this.pos.y);
            }
            this.vel.x = -Math.cos(this.angle) * 20;
            this.vel.y = -Math.sin(this.angle) * 20;
            this.hitTimer.set(0.3);
            this.receiveDamage(this.word, 1);
            L.game.lastKillTimer.set(0.3);
            this.soundHit.play();
        },
        isHitBy: function (letter) {
            if (this.remainingWord.charAt(0) == letter) {
                this.remainingWord = this.remainingWord.substr(1);
                if (this.remainingWord.length == 0) {
                    L.game.currentTarget = null;
                    L.game.unregisterTarget(this.word.charAt(0), this);
                    this.dead = true;
                }
                return true;
            } else {
                return false;
            }
        },
        check: function (other) {
            other.kill();
            this.kill();
        }
    });
    EntityExplosionParticle = EntityParticle.extend({
        lifetime: 0.5,
        fadetime: 0.5,
        vel: {
            x: 60,
            y: 60
        },
        animSheet: new L.AnimationSheet('./pic/explosion.png', 32, 32),
        init: function (x, y, settings) {
            this.addAnim('idle', 5, [0, 1, 2]);
            this.parent(x, y, settings);
        },
        draw: function () {
            L.system.context.globalCompositeOperation = 'lighter';
            this.parent();
            L.system.context.globalCompositeOperation = 'source-over';
        },
        update: function () {
            this.currentAnim.angle += 0.1 * L.system.tick;
            this.parent();
        }
    });
});
L.baked = true;
L.module('game.entities.enemy-missle').requires('game.entities.enemy').defines(function () {
    EntityEnemyMissle = EntityEnemy.extend({
        size: {
            x: 8,
            y: 15
        },
        offset: {
            x: 6,
            y: 7
        },
        animSheet: new L.AnimationSheet('./pic/missle.png', 20, 26),
        health: 4,
        speed: 35,
        targetTimer: null,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.angle = settings.angle;
            this.currentAnim.angle = this.angle - Math.PI / 2;
            this.targetTimer = new L.Timer(1);
        },
        update: function () {
            var d = this.targetTimer.delta();
            if (d > 0 && d < 0.7) {
                var ad = this.angle - this.angleTo(L.game.player);
                this.angle -= ad * L.system.tick * 2;
                this.currentAnim.angle = this.angle - Math.PI / 2;
            }
            this.parent();
        }
    });
});
L.baked = true;
L.module('game.entities.enemy-mine2').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine2 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 30,
        health: 2,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine3').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine3 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 30,
        health: 3,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine4').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine4 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 30,
        health: 4,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine5').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine5 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 30,
        health: 5,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine6').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine6 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 6,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});


L.baked = true;
L.module('game.entities.enemy-mine7').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine7 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 7,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine8').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine8 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 8,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});


L.baked = true;
L.module('game.entities.enemy-mine9').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine9 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 9,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine10').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine10 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 10,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});
L.baked = true;
L.module('game.entities.enemy-mine11').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine11 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 11,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine12').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine12 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 12,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine13').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine13 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 13,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine14').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine14 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 14,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine15').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine15 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 15,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine16').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine16 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 16,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine17').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine17 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 17,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine18').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine18 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 18,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine19').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine19 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 19,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine20').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine20 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 20,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine21').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine21 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 21,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine22').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine22 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 22,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});

L.baked = true;
L.module('game.entities.enemy-mine23').requires('game.entities.enemy').defines(function () {
    EntityEnemyMine23 = EntityEnemy.extend({
        size: {
            x: 12,
            y: 12
        },
        offset: {
            x: 10,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/mine.png', 32, 32),
        speed: 20,
        health: 23,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        update: function () {
            this.angle = this.angleTo(L.game.player);
            this.parent();
            this.currentAnim.angle += 2 * L.system.tick;


        }
    });
});
L.baked = true;
L.module('game.entities.enemy-destroyer').requires('game.entities.enemy').defines(function () {
    EntityEnemyDestroyer = EntityEnemy.extend({
        size: {
            x: 24,
            y: 34
        },
        offset: {
            x: 10,
            y: 8
        },
        animSheet: new L.AnimationSheet('./pic/destroyer.png', 43, 58),
        health: 8,
        speed: 20,
        shootTimer: null,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.shootTimer = new L.Timer(5);
            this.angle = (Math.random().map(0, 1, 67, 90) + (this.pos.x > L.system.width / 2 ? 22.5 : 0)) * Math.PI / 180;
            this.currentAnim.angle = this.angle - Math.PI / 2;
        },
        update: function () {
            this.parent();
            if (this.shootTimer.delta() > 0) {
                this.shootTimer.reset();
                L.game.spawnEntity(EntityEnemyMissle, this.pos.x + 12, this.pos.y + 22, {
                    angle: this.angle
                });
            }
        }
    });
});
L.baked = true;
L.module('game.entities.enemy-oppressor').requires('game.entities.enemy').defines(function () {
    EntityEnemyOppressor = EntityEnemy.extend({
        size: {
            x: 36,
            y: 58
        },
        offset: {
            x: 16,
            y: 10
        },
        animSheet: new L.AnimationSheet('./pic/oppressor.png', 68, 88),
        health: 10,
        speed: 15,
        shootTimer: null,
        bullets: 16,
        init: function (x, y, settings) {
            this.parent(x, y - 18, settings);
            this.addAnim('idle', 1, [0]);
            this.shootTimer = new L.Timer(7);
            this.angle = Math.PI / 2;
        },
        update: function () {
            this.parent();
            if (this.shootTimer.delta() > 0) {
                var inc = 140 / (this.bullets - 1);
                var a = 20;
                var radius = 21;
                for (var i = 0; i < this.bullets; i++) {
                    var angle = a * Math.PI / 180;
                    var x = this.pos.x + 18 + Math.cos(angle) * radius;
                    var y = this.pos.y + 48 + Math.sin(angle) * radius;
                    L.game.spawnEntity(EntityEnemyBullet, x, y, {
                        angle: angle
                    });
                    a += inc;
                }
                this.shootTimer.reset();
            }
        }
    });
    EntityEnemyBullet = EntityEnemy.extend({
        size: {
            x: 2,
            y: 2
        },
        offset: {
            x: 8,
            y: 11
        },
        animSheet: new L.AnimationSheet('./pic/bullet.png', 20, 24),
        health: 1,
        speed: 50,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.angle = settings.angle;
            this.currentAnim.angle = this.angle - Math.PI / 2;
        }
    });
});
L.baked = true;
L.module('game.entities.player').requires('impact.entity', 'game.entities.particle').defines(function () {
    EntityPlayer = L.Entity.extend({
        animSheet: new L.AnimationSheet('./pic/ship.png', 24, 24),
        targetAngle: 0,
        size: {
            x: 8,
            y: 8
        },
        offset: {
            x: 8,
            y: 8
        },
        angle: 0,
        targetAngle: 0,
        soundShoot: new L.Sound('./sound/__plasma.ogg'),
        soundMiss: new L.Sound('./sound/__click.ogg'),
        soundExplode: new L.Sound('./sound/__explosion.ogg'),
        type: L.Entity.TYPE.A,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 60, [0]);
            this.addAnim('shoot', 0.05, [3, 2, 1, 0], true);
            this.addAnim('miss', 0.05, [4, 5, 6], true);
        },
        draw: function () {
            L.system.context.globalCompositeOperation = 'lighter';
            this.parent();
            L.system.context.globalCompositeOperation = 'source-over';
        },
        update: function () {
            if (this.currentAnim.loopCount > 0) {
                this.currentAnim = this.anims.idle;
            }
            var ad = this.angle - this.targetAngle;
            if (Math.abs(ad) < 0.02) {
                this.angle = this.targetAngle;
            } else {
                this.angle -= ad * L.system.tick * 10;
            }
            this.currentAnim.angle = this.angle;
            this.parent();
        },
        kill: function () {
            L.game.setGameOver();
            this.soundExplode.play();
            for (var i = 0; i < 50; i++) {
                L.game.spawnEntity(EntityExplosionParticleFast, this.pos.x, this.pos.y);
            }
            this.pos.y = L.system.height + 300;
            this.parent();
        },
        shoot: function (target) {
            this.currentAnim = this.anims.shoot.rewind();
            var ent = L.game.spawnEntity(EntityPlasma, this.pos.x + 6, this.pos.y + 4);
            ent.target = target;
            var angle = this.angleTo(target);
            this.targetAngle = angle + Math.PI / 2;
            this.soundShoot.play();
        },
        miss: function () {
            this.currentAnim = this.anims.miss.rewind();
            this.soundMiss.play();
        }
    });
    EntityPlasma = L.Entity.extend({
        speed: 800,
        maxVel: {
            x: 1000,
            y: 1000
        },
        animSheet: new L.AnimationSheet('./pic/plasma.png', 96, 96),
        size: {
            x: 4,
            y: 4
        },
        offset: {
            x: 46,
            y: 46
        },
        distance: 100000,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },
        draw: function () {
            L.system.context.globalCompositeOperation = 'lighter';
            this.parent();
            L.system.context.globalCompositeOperation = 'source-over';
        },
        update: function () {
            if (this.target) {
                var currentDistance = this.distanceTo(this.target);
                if (currentDistance > this.distance || currentDistance < this.target.size.y) {
                    this.target.hit();
                    this.kill();
                    return;
                } else {
                    var angle = this.angleTo(this.target);
                    this.currentAnim.angle = angle + Math.PI / 2;
                    this.vel.x = Math.cos(angle) * this.speed;
                    this.vel.y = Math.sin(angle) * this.speed;
                }
                this.distance = currentDistance;
                this.parent();
            } else {
                this.kill();
            }
        }
    });
    EntityExplosionParticleFast = EntityParticle.extend({
        lifetime: 2,
        fadetime: 2,
        maxVel: {
            x: 1000,
            y: 1000
        },
        vel: {
            x: 100,
            y: 100
        },
        animSheet: new L.AnimationSheet('./pic/explosion.png', 32, 32),
        init: function (x, y, settings) {
            this.addAnim('idle', 5, [0, 1, 2]);
            this.parent(x, y, settings);
        },
        draw: function () {
            L.system.context.globalCompositeOperation = 'lighter';
            this.parent();
            L.system.context.globalCompositeOperation = 'source-over';
        },
        update: function () {
            this.currentAnim.angle += 0.1 * L.system.tick;
            this.parent();
        }
    });
});
L.baked = true;
L.module('game.main').requires('plugins.impact-splash-loader', 'impact.game', 'impact.font', 'game.entities.enemy-missle', 'game.entities.enemy-mine2', 'game.entities.enemy-mine3', 'game.entities.enemy-mine4', 'game.entities.enemy-mine5', 'game.entities.enemy-mine6', 'game.entities.enemy-mine7', 'game.entities.enemy-mine8', 'game.entities.enemy-mine9', 'game.entities.enemy-mine10', 'game.entities.enemy-mine11', 'game.entities.enemy-mine12', 'game.entities.enemy-mine13', 'game.entities.enemy-mine14', 'game.entities.enemy-mine15', 'game.entities.enemy-mine16', 'game.entities.enemy-mine17', 'game.entities.enemy-mine18', 'game.entities.enemy-mine19', 'game.entities.enemy-mine20', 'game.entities.enemy-mine21', 'game.entities.enemy-mine22', 'game.entities.enemy-mine23', 'game.entities.enemy-destroyer', 'game.entities.enemy-oppressor', 'game.entities.player').defines(function () {
    Number.zeroes = '000000000000';
    Number.prototype.zeroFill = function (d) {
        var s = this.toString();
        return Number.zeroes.substr(0, d - s.length) + s;
    };
    R = L.Game.extend({
        font: new L.Font('./pic/tungsten-18.png'),
        fontScore: new L.Font('./pic/04b03-mono-digits.png'),
        fontTitle: new L.Font('./pic/tungsten-48.png'),
        spawnTimer: null,
        targets: {},
        currentTarget: null,
        yScroll: 0,
        backpic1: new L.Image('./pic/backpic1.jpg'),
        backpic2: new L.Image('./pic/backpic2.jpg'),
        backpic3: new L.Image('./pic/backpic3.jpg'),
        backpic4: new L.Image('./pic/backpic4.jpg'),
        backpic5: new L.Image('./pic/backpic5.jpg'),
        backpic6: new L.Image('./pic/backpic6.jpg'),
        backpic7: new L.Image('./pic/backpic7.jpg'),
        backpic8: new L.Image('./pic/backpic8.jpg'),
        backpic9: new L.Image('./pic/backpic9.jpg'),
        backpic10: new L.Image('./pic/backpic10.jpg'),
        backpic11: new L.Image('./pic/backpic11.jpg'),
        backpic12: new L.Image('./pic/backpic12.jpg'),
        backpic13: new L.Image('./pic/backpic13.jpg'),
        backpic14: new L.Image('./pic/backpic14.jpg'),
        backpic15: new L.Image('./pic/backpic15.jpg'),
        backpic16: new L.Image('./pic/backpic16.jpg'),
        backpic17: new L.Image('./pic/backpic17.jpg'),
        backpic18: new L.Image('./pic/backpic18.jpg'),
        backpic19: new L.Image('./pic/backpic19.jpg'),
        backpic20: new L.Image('./pic/backpic20.jpg'),
        backpic21: new L.Image('./pic/backpic21.jpg'),
        backpic22: new L.Image('./pic/backpic22.jpg'),
        backpic23: new L.Image('./pic/backpic23.jpg'),
        backpic24: new L.Image('./pic/backpic24.jpg'),
        backpic25: new L.Image('./pic/backpic25.jpg'),
        backpic26: new L.Image('./pic/backpic26.jpg'),
        backpic27: new L.Image('./pic/backpic27.jpg'),
        backpic28: new L.Image('./pic/backpic28.jpg'),
        backpic29: new L.Image('./pic/backpic29.jpg'),
        backpic30: new L.Image('./pic/backpic30.jpg'),
        allbackpic: [],
        currentbackpic: null,
        grid: new L.Image('./pic/grid.png'),
        music1: new L.Sound('./sound/__music1.ogg', false),
        music2: new L.Sound('./sound/__music2.ogg', false),
        music3: new L.Sound('./sound/__music3.ogg', false),
        menu: null,
        sentence: null,
        MusicIndex: 1,
        ShouldShowSentence: 1,
        ShouldTypeSentence: 0,
        ShowSentenceNow: 0,
        mode: 0,
        score: 0,
        streak: 0,
        hits: 0,
        misses: 0,
        multiplier: 1,
        multiplierTiers: {
            25: true,
            50: true,
            100: true
        },
        wave: {},
        init: function () {
            var bgmap = new L.BackgroundMap(62, [[1]], this.grid);
            bgmap.repeat = true;
            this.backgroundMaps.push(bgmap);
            L.music.add(this.music1);
            L.music.add(this.music2);
            L.music.add(this.music3);
            L.music.volume = 0.3;
            this.allbackpic.push(this.backpic1);
            this.allbackpic.push(this.backpic2);
            this.allbackpic.push(this.backpic3);
            this.allbackpic.push(this.backpic4);
            this.allbackpic.push(this.backpic5);
            this.allbackpic.push(this.backpic6);
            this.allbackpic.push(this.backpic7);
            this.allbackpic.push(this.backpic8);
            this.allbackpic.push(this.backpic9);
            this.allbackpic.push(this.backpic10);
            this.allbackpic.push(this.backpic11);
            this.allbackpic.push(this.backpic12);
            this.allbackpic.push(this.backpic13);
            this.allbackpic.push(this.backpic14);
            this.allbackpic.push(this.backpic15);
            this.allbackpic.push(this.backpic16);
            this.allbackpic.push(this.backpic17);
            this.allbackpic.push(this.backpic18);
            this.allbackpic.push(this.backpic19);
            this.allbackpic.push(this.backpic20);
            this.allbackpic.push(this.backpic21);
            this.allbackpic.push(this.backpic22);
            this.allbackpic.push(this.backpic23);
            this.allbackpic.push(this.backpic24);
            this.allbackpic.push(this.backpic25);
            this.allbackpic.push(this.backpic26);
            this.allbackpic.push(this.backpic27);
            this.allbackpic.push(this.backpic28);
            this.allbackpic.push(this.backpic29);
            this.allbackpic.push(this.backpic30);
            this.currentbackpic = this.allbackpic.random();
            window.addEventListener('keydown', this.keydown.bind(this), false);
            L.input.bind(L.KEY.ENTER, 'ok');
            L.input.bind(L.KEY.BACKSPACE, 'void');
            L.input.bind(L.KEY.ESC, 'menu');
            L.input.bind(L.KEY.UP_ARROW, 'up');
            L.input.bind(L.KEY.DOWN_ARROW, 'down');
            L.input.bind(L.KEY.LEFT_ARROW, 'left');
            L.input.bind(L.KEY.RIGHT_ARROW, 'right');
            L.input.bind(L.KEY.SPACE, 'space');
            L.input.bind(L.KEY.A, 'a');
            L.input.bind(L.KEY.B, 'b');
            L.input.bind(L.KEY.C, 'c');
            L.input.bind(L.KEY.D, 'd');
            L.input.bind(L.KEY.E, 'e');
            L.input.bind(L.KEY.F, 'f');
            L.input.bind(L.KEY.G, 'g');
            L.input.bind(L.KEY.H, 'h');
            L.input.bind(L.KEY.I, 'i');
            L.input.bind(L.KEY.J, 'j');
            L.input.bind(L.KEY.K, 'k');
            L.input.bind(L.KEY.L, 'l');
            L.input.bind(L.KEY.M, 'm');
            L.input.bind(L.KEY.N, 'n');
            L.input.bind(L.KEY.O, 'o');
            L.input.bind(L.KEY.P, 'p');
            L.input.bind(L.KEY.Q, 'q');
            L.input.bind(L.KEY.R, 'r');
            L.input.bind(L.KEY.S, 's');
            L.input.bind(L.KEY.T, 't');
            L.input.bind(L.KEY.U, 'u');
            L.input.bind(L.KEY.V, 'v');
            L.input.bind(L.KEY.W, 'w');
            L.input.bind(L.KEY.X, 'x');
            L.input.bind(L.KEY.Y, 'y');
            L.input.bind(L.KEY.Z, 'z');
            L.input.bind(L.KEY.D0, '0');
            L.input.bind(L.KEY.D1, '1');
            L.input.bind(L.KEY.D2, '2');
            L.input.bind(L.KEY.D3, '3');
            L.input.bind(L.KEY.D4, '4');
            L.input.bind(L.KEY.D5, '5');
            L.input.bind(L.KEY.D6, '6');
            L.input.bind(L.KEY.D7, '7');
            L.input.bind(L.KEY.D8, '8');
            L.input.bind(L.KEY.D9, '9');
            L.input.bind(L.KEY.S1, 's1');
            L.input.bind(L.KEY.S2, 's2');
            L.input.bind(L.KEY.S3, 's3');
            L.input.bind(L.KEY.S4, 's4');
            L.input.bind(L.KEY.S5, 's5');
            L.input.bind(L.KEY.MINUS, 's6');


            this.setTitle();
        },
        reset: function () {
            this.entities = [];
            this.currentTarget = null;
            this.wave = {
                wave: 0,
                spawn: [],
                spawnWait: 1,
                healthBoost: 0,
                types: [
                        /*
                        {
                    type: EntityEnemyOppressor,
                    count: 0,
                    incEvery: 13
                },
                {
                    type: EntityEnemyDestroyer,
                    count: 0,
                    incEvery: 5
                },
                */
                    {
                        type: EntityEnemyMine2,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine3,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine4,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine5,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine6,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine7,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine8,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine9,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine10,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine11,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine12,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine13,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine14,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine15,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine16,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine17,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine18,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine19,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine20,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine21,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine22,
                        count: 1,
                        incEvery: 2
                },
                    {
                        type: EntityEnemyMine23,
                        count: 1,
                        incEvery: 2
                }]
            };
            var first = 'a'.charCodeAt(0),
                last = 'z'.charCodeAt(0);
            for (var i = first; i <= last; i++) {
                this.targets[String.fromCharCode(i)] = [];
            }
            this.score = 0;

            this.streak = 0;
            this.hits = 0;
            this.misses = 0;
            this.multiplier = 1;
            this.multiplierTiers = {
                25: true,
                50: true,
                100: true
            };
            this.lastKillTimer = new L.Timer();
            this.spawnTimer = new L.Timer();
            this.waveEndTimer = null;
        },
        nextWave: function () {
            this.wave.wave++;
            this.wave.spawn = [];
            this.currentbackpic = this.allbackpic.random();
            for (var t = 0; t < this.wave.types.length; t++) {
                var type = this.wave.types[t];

                type.count++;

                for (var s = 0; s < type.count; s++) {
                    if (WORDS[t + 2].length != 0)
                        this.wave.spawn.push(t);
                }
            }
            this.wave.spawn.sort(function () {
                return Math.random() - 0.5;
            });
        },
        spawnCurrentWave: function () {
            if (!this.wave.spawn.length) {
                if (this.entities.length <= 1 && !this.waveEndTimer) {
                    this.waveEndTimer = new L.Timer(2);
                } else if (this.waveEndTimer && this.waveEndTimer.delta() > 0) {
                    this.waveEndTimer = null;
                    this.nextWave();
                }
            } else if (this.spawnTimer.delta() > this.wave.spawnWait) {
                this.spawnTimer.reset();
                var type = this.wave.types[this.wave.spawn.pop()].type;
                var x = Math.random().map(0, 1, 10, L.system.width - 10);
                var y = -30;
                this.spawnEntity(type, x, y, {
                    healthBoost: this.wave.healthBoost
                });
            }
        },
        registerTarget: function (letter, ent) {
            this.targets[letter].push(ent);
        },
        unregisterTarget: function (letter, ent) {
            this.targets[letter].erase(ent);
        },
        keydown: function (event) {
            if (event.target.type == 'text' || event.ctrlKey || event.shiftKey || event.altKey || this.mode != R.MODE.GAME || this.menu || this.sentence) {
                return true;
            }
            var c = event.which;
            if (!((c > 64 && c < 91) || (c > 96 && c < 123))) {
                return true;
            }
            event.stopPropagation();
            event.preventDefault();
            var letter = String.fromCharCode(c).toLowerCase();
            if (!this.currentTarget) {
                var potentialTargets = this.targets[letter];
                var nearestDistance = -1;
                var nearestTarget = null;
                for (var i = 0; i < potentialTargets.length; i++) {
                    var distance = this.player.distanceTo(potentialTargets[i]);
                    if (distance < nearestDistance || !nearestTarget) {
                        nearestDistance = distance;
                        nearestTarget = potentialTargets[i];
                    }
                }
                if (nearestTarget) {
                    nearestTarget.target();
                } else {
                    this.player.miss();
                    this.multiplier = 1;
                    this.streak = 0;
                    this.misses++;
                }
            }
            if (this.currentTarget) {
                var c = this.currentTarget;
                var hit = this.currentTarget.isHitBy(letter);
                if (hit) {
                    this.player.shoot(c);
                    this.score += this.multiplier;
                    this.hits++;
                    this.streak++;
                    if (this.multiplierTiers[this.streak]) {
                        this.multiplier += 1;
                    }
                } else {
                    this.player.miss();
                    this.multiplier = 1;
                    this.streak = 0;
                    this.misses++;
                }
            }
            return false;
        },
        setGame: function () {
            this.player = this.spawnEntity(EntityPlayer, L.system.width / 2 - 4, L.system.height - 50);
            this.mode = R.MODE.GAME;
            this.nextWave();
            L.music.play();
        },
        setGameOver: function () {
            this.mode = R.MODE.GAME_OVER;
        },
        setTitle: function () {
            this.reset();
            this.mode = R.MODE.TITLE;
        },

        toggleMenu: function () {
            if (this.menu) {
                this.menu = null;
            } else {
                this.menu = new Menu();
            }
        },
        toggleSentence: function () {
            if (this.sentence) {
                this.sentence = null;
            } else {
                this.sentence = new Sentence();
            }
        },
        update: function () {
            if (L.input.pressed('menu') && !this.sentence) {
                this.toggleMenu();
            }
            if (this.menu) {
                this.menu.update();
                return;
            }

            if (L.game.ShouldShowSentence) {
                if (L.game.ShowSentenceNow) {
                    this.toggleSentence();
                    L.game.ShowSentenceNow = 0;
                }
                if (this.sentence) {
                    this.sentence.update();
                    return;
                }


            }

            this.parent();
            if (this.mode == R.MODE.GAME) {
                this.spawnCurrentWave();
            } else if (L.input.pressed('ok')) {
                if (this.mode == R.MODE.TITLE) {
                    this.setGame();
                } else {
                    this.setTitle();
                }
            }
            this.yScroll -= 100 * L.system.tick;
            this.backgroundMaps[0].scroll.y += this.yScroll;
        },
        draw: function () {
            this.currentbackpic.draw(0, 0);
            var d = this.lastKillTimer.delta();
            L.system.context.globalAlpha = d < 0 ? d * -2 + 0.3 : 0.3;
            for (var i = 0; i < this.backgroundMaps.length; i++) {
                this.backgroundMaps[i].draw();
            }
            L.system.context.globalAlpha = 1;
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].draw();
            }
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].drawLabel && this.entities[i].drawLabel();
            }
            if (this.mode == R.MODE.GAME) {
                this.drawUI();
            } else if (this.mode == R.MODE.TITLE) {
                this.drawTitle();
            } else if (this.mode == R.MODE.GAME_OVER) {
                this.drawGameOver();
            }
            if (this.menu) {
                this.menu.draw();
            }
            if (this.sentence) {
                this.sentence.draw();
            }
        },

        drawUI: function () {
            var s = 'Total Killed: ' + CurrentUserScore.zeroFill(8);
            this.fontScore.draw(s, L.system.width - 4, L.system.height - 12, L.Font.ALIGN.RIGHT);
            if (this.waveEndTimer) {
                var d = -this.waveEndTimer.delta();
                var a = d > 1.7 ? d.map(2, 1.7, 0, 1) : d < 1 ? d.map(1, 0, 1, 0) : 1;
                var xs = L.system.width / 2;
                var ys = L.system.height / 3 + (d < 1 ? Math.cos(1 - d).map(1, 0, 0, 250) : 0);
                var w = this.wave.wave.zeroFill(3);
                L.system.context.globalAlpha = a;
                this.fontTitle.draw('Wave ' + w + ' Clear', xs, ys, L.Font.ALIGN.CENTER);
                L.system.context.globalAlpha = 1;
            }
        },
        drawTitle: function () {
            var xs = L.system.width / 2;
            var ys = L.system.height / 4;
            this.fontTitle.draw('HELP', xs, ys - 40, L.Font.ALIGN.CENTER);
            this.font.draw('Type to shoot', xs, ys + 50, L.Font.ALIGN.CENTER);
            this.font.draw('a word or a sentence', xs, ys + 80, L.Font.ALIGN.CENTER);
            this.font.draw('*******Normal Screen*******', xs, ys + 150, L.Font.ALIGN.CENTER);
            this.font.draw('ENTER: Start Game', xs, ys + 180, L.Font.ALIGN.CENTER);
            this.font.draw('ESC: Menu/Pause', xs, ys + 210, L.Font.ALIGN.CENTER);

            this.font.draw('*******Sentence Screen*******', xs, ys + 240, L.Font.ALIGN.CENTER);
            this.font.draw('ENTER: Next Word', xs, ys + 270, L.Font.ALIGN.CENTER);
            this.font.draw('SPACE: Read Sentence', xs, ys + 300, L.Font.ALIGN.CENTER);
            var xc = 8;
            var yc = L.system.height - 40;
            L.system.context.globalAlpha = 0.6;
            this.font.draw('', xc, yc);
            this.font.draw('Have fun!', xc, yc + 20);
            L.system.context.globalAlpha = 1;
        },
        drawGameOver: function () {
            var xs = L.system.width / 2;
            var ys = L.system.height / 4;
            var acc = this.hits ? this.hits / (this.hits + this.misses) * 100 : 0;
            this.fontTitle.draw('Game Over', xs, ys, L.Font.ALIGN.CENTER);
            this.font.draw('Total Killed: ' + CurrentUserScore, xs, ys + 90, L.Font.ALIGN.CENTER);
            this.font.draw('Vocabulary Size: ' + CurrentUserVSize, xs, ys + 114, L.Font.ALIGN.CENTER);
            this.font.draw('Your Final Score: ' + CurrentUserVSize * CurrentUserScore, xs, ys + 138, L.Font.ALIGN.CENTER);
            this.font.draw('Your Ranking: ' + CurrentUserRanking, xs, ys + 162, L.Font.ALIGN.CENTER);
            this.font.draw('Press ENTER to Continue', xs, ys + 214, L.Font.ALIGN.CENTER);
        }
    });
    MenuItem = L.Class.extend({
        getText: function () {
            return 'none'
        },
        left: function () {},
        right: function () {},
        ok: function () {}
    });
    MenuItemIfShowSentence = MenuItem.extend({
        getText: function () {
            if (L.game.ShouldShowSentence)
                return 'Show Sentence: < Yes >';
            else
                return 'Show Sentence: < No >';
        },
        left: function () {
            L.game.ShouldShowSentence = 0;
        },
        right: function () {
            L.game.ShouldShowSentence = 1;
        }
    });

    MenuItemIfTypeSentence = MenuItem.extend({
        getText: function () {
            if (!L.game.ShouldShowSentence)
                return 'Type Sentence: < No >';
            if (L.game.ShouldTypeSentence)
                return 'Type Sentence: < Yes >';
            else
                return 'Type Sentence: < No >';
        },
        left: function () {
            L.game.ShouldTypeSentence = 0;
        },
        right: function () {
            if (L.game.ShouldShowSentence)
                L.game.ShouldTypeSentence = 1;
            else
                L.game.ShouldTypeSentence = 0;
        }
    });

    MenuItemSoundVolume = MenuItem.extend({
        getText: function () {
            return 'Sound Volume: < ' + (L.soundManager.volume * 100).round() + '% >';
        },
        left: function () {
            L.soundManager.volume = (L.soundManager.volume - 0.1).limit(0, 1);
        },
        right: function () {
            L.soundManager.volume = (L.soundManager.volume + 0.1).limit(0, 1);
        }
    });
    MenuItemMusicVolume = MenuItem.extend({
        getText: function () {
            return 'Music Volume: < ' + (L.music.volume * 100).round() + '% >';
        },
        left: function () {
            L.music.volume = (L.music.volume - 0.1).limit(0, 1);
        },
        right: function () {
            L.music.volume = (L.music.volume + 0.1).limit(0, 1);
        }
    });
    MenuItemMusicIndex = MenuItem.extend({
        getText: function () {
            return 'Music Index: < ' + L.game.MusicIndex + ' >';
        },
        left: function () {
            if (L.game.MusicIndex > 1) {
                L.game.MusicIndex--;
                L.music.prev();
            }

        },
        right: function () {
            if (L.game.MusicIndex < 3) {
                L.game.MusicIndex++;
                L.music.next();
            }
        }
    });
    MenuItemResume = MenuItem.extend({
        getText: function () {
            return 'Resume';
        },
        ok: function () {
            L.game.toggleMenu();
        }
    });
    MenuItemReturnToHome = MenuItem.extend({
        getText: function () {
            return 'Return Home';
        },
        ok: function () {
            //history.go(-1);
            window.location.href = "../index.html#/work_sg";
        }
    });
    Menu = L.Class.extend({
        font: new L.Font('./pic/tungsten-18.png'),
        fontSelected: new L.Font('./pic/tungsten-18-orange.png'),
        fontTitle: new L.Font('./pic/tungsten-48.png'),
        current: 0,
        itemClasses: [MenuItemResume, MenuItemIfShowSentence, MenuItemIfTypeSentence, MenuItemSoundVolume, MenuItemMusicVolume, MenuItemMusicIndex, MenuItemReturnToHome],
        items: [],
        init: function () {
            for (var i = 0; i < this.itemClasses.length; i++) {
                this.items.push(new this.itemClasses[i]());
            }
        },
        update: function () {
            if (L.input.pressed('up')) {
                this.current--;
            }
            if (L.input.pressed('down')) {
                this.current++;
            }
            this.current = this.current.limit(0, this.items.length - 1);
            if (L.input.pressed('left')) {
                this.items[this.current].left();
            }
            if (L.input.pressed('right')) {
                this.items[this.current].right();
            }
            if (L.input.pressed('ok')) {
                this.items[this.current].ok();
            }
        },
        draw: function () {
            L.system.context.fillStyle = 'rgba(0,0,0,0.9)';
            L.system.context.fillRect(0, 0, L.system.width, L.system.height);
            var xs = L.system.width / 2;
            var ys = L.system.height / 4;
            this.fontTitle.draw('Menu', xs, ys, L.Font.ALIGN.CENTER);
            ys += 160;
            for (var i = 0; i < this.items.length; i++) {
                var t = this.items[i].getText();
                if (i == this.current) {
                    this.fontSelected.draw(t, xs, ys, L.Font.ALIGN.CENTER);
                } else {
                    this.font.draw(t, xs, ys, L.Font.ALIGN.CENTER);
                }
                ys += 30;
            }
        }
    });
    Sentence = L.Class.extend({
        font: new L.Font('./pic/tungsten-18.png'),
        fontSelected: new L.Font('./pic/tungsten-18-orange.png'),
        fontTitle: new L.Font('./pic/tungsten-48.png'),
        current: 0,


        update: function () {
            CurrentPicture = new L.Image('./userdata/' + CurrentUser + '/picture/' + CurrentWord);
            if (!L.game.ShouldTypeSentence) {
                if (L.input.pressed('space')) {
                    CurrentSentenceSound = new L.Sound('./userdata/' + CurrentUser + '/sentence/' + CurrentWord + '.ogg');
                    CurrentSentenceSound.play();

                }
                if (L.input.pressed('ok')) {
                    L.game.toggleSentence();
                }
            } else {
                sc = '~';
                sc1 = '~';
                if (L.input.pressed('a'))
                    sc = 'a';
                if (L.input.pressed('b'))
                    sc = 'b';
                if (L.input.pressed('c'))
                    sc = 'c';
                if (L.input.pressed('d'))
                    sc = 'd';
                if (L.input.pressed('e'))
                    sc = 'e';
                if (L.input.pressed('f'))
                    sc = 'f';
                if (L.input.pressed('g'))
                    sc = 'g';
                if (L.input.pressed('h'))
                    sc = 'h';
                if (L.input.pressed('i'))
                    sc = 'i';
                if (L.input.pressed('j'))
                    sc = 'j';
                if (L.input.pressed('k'))
                    sc = 'k';
                if (L.input.pressed('l'))
                    sc = 'l';
                if (L.input.pressed('m'))
                    sc = 'm';
                if (L.input.pressed('n'))
                    sc = 'n';
                if (L.input.pressed('o'))
                    sc = 'o';
                if (L.input.pressed('p'))
                    sc = 'p';
                if (L.input.pressed('q'))
                    sc = 'q';
                if (L.input.pressed('r'))
                    sc = 'r';
                if (L.input.pressed('s'))
                    sc = 's';
                if (L.input.pressed('t'))
                    sc = 't';
                if (L.input.pressed('u'))
                    sc = 'u';
                if (L.input.pressed('v'))
                    sc = 'v';
                if (L.input.pressed('w'))
                    sc = 'w';
                if (L.input.pressed('x'))
                    sc = 'x';
                if (L.input.pressed('y'))
                    sc = 'y';
                if (L.input.pressed('z'))
                    sc = 'z';
                if (L.input.pressed('space'))
                    sc = ' ';
                if (L.input.pressed('s1')) {
                    sc = ';';
                    sc1 = ':';
                }
                if (L.input.pressed('s2')) {
                    sc = '\'';
                    sc1 = '"';
                }
                if (L.input.pressed('s3')) {
                    sc = ',';
                    sc1 = '<';
                }
                if (L.input.pressed('s4')) {
                    sc = '.';
                    sc1 = '>';
                }
                if (L.input.pressed('s5')) {
                    sc = '/';
                    sc1 = '?';
                }
                if (L.input.pressed('s6')) {
                    sc = '-';
                    sc1 = '_';
                }
                if (L.input.pressed('0')) {
                    sc = '0';
                    sc1 = ')';
                }
                if (L.input.pressed('1')) {
                    sc = '1';
                    sc1 = '!';
                }
                if (L.input.pressed('2')) {
                    sc = '2';
                    sc1 = '@';
                }
                if (L.input.pressed('3')) {
                    sc = '3';
                    sc1 = '#';
                }
                if (L.input.pressed('4')) {
                    sc = '4';
                    sc1 = '$';
                }
                if (L.input.pressed('5')) {
                    sc = '5';
                    sc1 = '%';
                }
                if (L.input.pressed('6')) {
                    sc = '6';
                    sc1 = '^';
                }
                if (L.input.pressed('7')) {
                    sc = '7';
                    sc1 = '&';
                }
                if (L.input.pressed('8')) {
                    sc = '8';
                    sc1 = '*';
                }
                if (L.input.pressed('9')) {
                    sc = '9';
                    sc1 = '(';
                }



                if (CurrentSentence.charAt(0).toLowerCase() == sc || CurrentSentence.charAt(0).toLowerCase() == sc1) {
                    CurrentSentence = CurrentSentence.substr(1);
                    CurrentShootSentenceSound = new L.Sound('./sound/__plasma.ogg');
                    CurrentShootSentenceSound.play();
                }
                if (CurrentSentence.length == 0) {
                    CurrentSentenceSound = new L.Sound('./userdata/' + CurrentUser + '/sentence/' + CurrentWord + '.ogg');
                    CurrentSentenceSound.play();
                    L.game.toggleSentence();
                }
            }


        },
        draw: function () {

            L.system.context.fillStyle = 'rgba(0,0,0,0.9)';
            L.system.context.fillRect(0, 0, L.system.width, L.system.height);

            var xs = L.system.width / 2;
            var ys = L.system.height / 2;

            CurrentPicture.draw((L.system.width - CurrentPicture.width) / 2, 100);
            this.fontTitle.draw(CurrentWord, xs, ys, L.Font.ALIGN.CENTER);
            ys += 160;
            var szLine = CurrentSentence;
            var ilen = szLine.length;

            while (ilen > 40) {
                var ich = 0;
                while (szLine[40 + ich] != " ") {
                    ich = ich + 1;
                    if (ich + 40 == ilen)
                        break
                }
                this.fontSelected.draw(szLine.slice(0, 40 + ich), xs, ys, L.Font.ALIGN.CENTER);
                szLine = szLine.slice(40 + ich);

                ilen = ilen - 40 - ich;
                ys += 40;

            }
            this.fontSelected.draw(szLine, xs, ys, L.Font.ALIGN.CENTER);





        }
    });
    R.MODE = {
        TITLE: 0,
        GAME: 1,
        GAME_OVER: 2
    };
    R.StartGame = function () {
        L.main('#canvas', R, 60, 360, 640, 1, L.ImpactSplashLoader);
    }
});