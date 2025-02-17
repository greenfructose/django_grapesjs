// Copyright (c) 2016, Artur Arseniev
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification,
// are permitted provided that the following conditions are met:
//
// - Redistributions of source code must retain the above copyright notice, this
//   list of conditions and the following disclaimer.
// - Redistributions in binary form must reproduce the above copyright notice, this
//   list of conditions and the following disclaimer in the documentation and/or
//   other materials provided with the distribution.
// - Neither the name "GrapesJS" nor the names of its contributors may be
//   used to endorse or promote products derived from this software without
//   specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
! function(AV, window, document) {
    AV.build = {
        contentShouldUseStaging: !1,
        version: "4.3.1",
        bundled: !1,
        feather_baseURL: "http://feather.aviary.com/csdk/4.3.1.35/",
        feather_baseURL_SSL: "https://dme0ih8comzn4.cloudfront.net/csdk/4.3.1.35/",
        feather_stickerURL: "http://feather.aviary.com/stickers/",
        feather_stickerURL_SSL: "https://dme0ih8comzn4.cloudfront.net/stickers/",
        imgrecvBase: "https://featherservices.aviary.com/",
        imgrecvBase_SSL: "https://featherservices.aviary.com/",
        featherTargetAnnounce: "https://featherservices.aviary.com/feather_target_announce_v3.html",
        featherTargetAnnounce_SSL: "https://featherservices.aviary.com/feather_target_announce_v3.html",
        imgrecvServer: "https://featherservices.aviary.com/FeatherReceiver.aspx",
        imgrecvServer_SSL: "https://featherservices.aviary.com/FeatherReceiver.aspx",
        imageToBase64Endpoint: "https://api-ag.aviary.com/utilities/image-to-data-uri?url=",
        jsonp_imgserver: "https://featherservices.aviary.com/imgjsonpserver.aspx",
        jsonp_imgserver_SSL: "https://featherservices.aviary.com/imgjsonpserver.aspx",
        s3SignedURLGenerator: "https://api-ag.aviary.com/utilities/signed-s3-url?type=feather&content_type=image/png",
        proxyServer: "https://featherservices.aviary.com/proxy.aspx",
        proxyServer_SSL: "https://featherservices.aviary.com/proxy.aspx",
        asyncImgrecvBase: "http://cc-api-aviary-cds.adobe.io/",
        asyncImgrecvBase_SSL: "https://cc-api-aviary-cds.adobe.io/",
        manifestURL: "http://cd.aviary.com",
        manifestURL_SSL: "https://d42hh4005hpu.cloudfront.net",
        gatewayAssetURL: "http://cc-api-aviary-cds.adobe.io",
        gatewayAssetURL_SSL: "https://cc-api-aviary-cds.adobe.io",
        cdsContentURL: "http://cd.aviary.com",
        cdsContentURL_SSL: "https://d42hh4005hpu.cloudfront.net",
        asyncFeatherTargetAnnounce: "http://cc-api-aviary-cds.adobe.io/feather_target_announce_v3.html",
        asyncFeatherTargetAnnounce_SSL: "https://cc-api-aviary-cds.adobe.io/feather_target_announce_v3.html",
        asyncImgrecvCreateJob: "http://cc-api-aviary-cds.adobe.io/v2/createjob",
        asyncImgrecvCreateJob_SSL: "https://cc-api-aviary-cds.adobe.io/v2/createjob",
        asyncImgrecvGetJobStatus: "http://cc-api-aviary-cds.adobe.io/v2/getjobstatus",
        asyncImgrecvGetJobStatus_SSL: "https://cc-api-aviary-cds.adobe.io/v2/getjobstatus",
        googleTracker: "UA-84575-22",
        inAppPurchaseFrameURL: "http://purchases.viary.com/gateway.aspx?p=flickr"
    };
    var eventSplitter = /\s+/,
        Events = AV.Events = {
            on: function(e, t, a) {
                var n, o, i;
                if (!t) return this;
                for (e = e.split(eventSplitter), n = this._callbacks || (this._callbacks = {}); o = e.shift();) i = n[o] || (n[o] = []), i.push(t, a);
                return this
            },
            off: function(e, t, a) {
                var n, o, i, r;
                if (!(o = this._callbacks)) return this;
                if (!(e || t || a)) return delete this._callbacks, this;
                for (e = e ? e.split(eventSplitter) : _.keys(o); n = e.shift();)
                    if ((i = o[n]) && (t || a))
                        for (r = i.length - 2; r >= 0; r -= 2) t && i[r] !== t || a && i[r + 1] !== a || i.splice(r, 2);
                    else delete o[n];
                return this
            },
            trigger: function(e) {
                var t, a, n, o, i, r, s, l;
                if (!(a = this._callbacks)) return this;
                for (l = [], e = e.split(eventSplitter), o = 1, i = arguments.length; i > o; o++) l[o - 1] = arguments[o];
                for (; t = e.shift();) {
                    if ((s = a.all) && (s = s.slice()), (n = a[t]) && (n = n.slice()), n)
                        for (o = 0, i = n.length; i > o; o += 2) n[o].apply(n[o + 1] || this, l);
                    if (s)
                        for (r = [t].concat(l), o = 0, i = s.length; i > o; o += 2) s[o].apply(s[o + 1] || this, r)
                }
                return this
            }
        };
    "undefined" == typeof AV && (AV = {}), AV.JSON = {},
        function() {
            "use strict";

            function f(e) {
                return 10 > e ? "0" + e : e
            }

            function quote(e) {
                return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                    var t = meta[e];
                    return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + e + '"'
            }

            function str(e, t) {
                var a, n, o, i, r, s = gap,
                    l = t[e];
                switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(e)), "function" == typeof rep && (l = rep.call(t, e, l)), typeof l) {
                    case "string":
                        return quote(l);
                    case "number":
                        return isFinite(l) ? String(l) : "null";
                    case "boolean":
                    case "null":
                        return String(l);
                    case "object":
                        if (!l) return "null";
                        if (gap += indent, r = [], "[object Array]" === Object.prototype.toString.apply(l)) {
                            for (i = l.length, a = 0; i > a; a += 1) r[a] = str(a, l) || "null";
                            return o = 0 === r.length ? "[]" : gap ? "[\n" + gap + r.join(",\n" + gap) + "\n" + s + "]" : "[" + r.join(",") + "]", gap = s, o
                        }
                        if (rep && "object" == typeof rep)
                            for (i = rep.length, a = 0; i > a; a += 1) n = rep[a], "string" == typeof n && (o = str(n, l), o && r.push(quote(n) + (gap ? ": " : ":") + o));
                        else
                            for (n in l) Object.hasOwnProperty.call(l, n) && (o = str(n, l), o && r.push(quote(n) + (gap ? ": " : ":") + o));
                        return o = 0 === r.length ? "{}" : gap ? "{\n" + gap + r.join(",\n" + gap) + "\n" + s + "}" : "{" + r.join(",") + "}", gap = s, o
                }
            }
            "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function(e) {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
            }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
                return this.valueOf()
            });
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap, indent, meta = {
                    "\b": "\\b",
                    "	": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                },
                rep;
            "function" != typeof AV.JSON.stringify && (AV.JSON.stringify = function(e, t, a) {
                var n;
                if (gap = "", indent = "", "number" == typeof a)
                    for (n = 0; a > n; n += 1) indent += " ";
                else "string" == typeof a && (indent = a);
                if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("AV.JSON.stringify");
                return str("", {
                    "": e
                })
            }), "function" != typeof AV.JSON.parse && (AV.JSON.parse = function(text, reviver) {
                function walk(e, t) {
                    var a, n, o = e[t];
                    if (o && "object" == typeof o)
                        for (a in o) Object.hasOwnProperty.call(o, a) && (n = walk(o, a), void 0 !== n ? o[a] = n : delete o[a]);
                    return reviver.call(e, t, o)
                }
                var j;
                if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                        return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                    "": j
                }, "") : j;
                throw new SyntaxError("AV.JSON.parse")
            })
        }(), AV.validLanguages = {
            en: !0,
            bg: !0,
            ca: !0,
            zh_hans: !0,
            zh_hant: !0,
            cs: !0,
            da: !0,
            nl: !0,
            fi: !0,
            fr: !0,
            de: !0,
            he: !0,
            id: !0,
            it: !0,
            ja: !0,
            ko: !0,
            lv: !0,
            lt: !0,
            pl: !0,
            pt: !0,
            pt_br: !0,
            ru: !0,
            es: !0,
            sv: !0,
            tr: !0,
            vi: !0,
            el: !0,
            hu: !0,
            no: !0,
            sk: !0,
            uk: !0
        }, AV.util = {
            getScaledDims: function(e, t, a, n) {
                n = n || a;
                var o = e,
                    i = t,
                    r = e / t;
                return (e > a || t > n) && (e - a > r * (t - n) ? (o = a, i = a * t / e + .5 | 0) : (o = n * r + .5 | 0, i = n)), {
                    width: o,
                    height: i
                }
            },
            getTouch: function(e) {
                var t;
                return e.originalEvent && (e = e.originalEvent), t = e.changedTouches && 1 == e.changedTouches.length ? e.changedTouches[0] : e.touches && 1 == e.touches.length ? e.touches[0] : !1
            },
            nextFrame: function(e) {
                setTimeout(e, 1)
            },
            getDomain: function(e, t) {
                var a, n, o, i, r, s, l;
                return a = "http://" == e.substr(0, 7) ? 7 : "https://" == e.substr(0, 8) ? 8 : "ftp://" == e.substr(0, 6) ? 6 : 0, o = e.indexOf("/", a), -1 == o && (o = e.length), t ? n = a : (s = e, l = e.lastIndexOf(":"), s = l > a ? e.substring(a, l) : e.substring(a, o), s.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/) ? n = a : (i = e.lastIndexOf(".", o), r = e.lastIndexOf(".", i - 1), n = -1 == r ? a : r + 1)), e.substring(n, o)
            },
            extend: function() {
                var e, t, a, n, o, i, r = arguments[0] || {},
                    s = 1,
                    l = arguments.length,
                    c = !1;
                for ("boolean" == typeof r && (c = r, r = arguments[1] || {}, s = 2), "object" == typeof r || jQuery.isFunction(r) || (r = {}), l === s && (r = this, --s); l > s; s++)
                    if (null != (e = arguments[s]))
                        for (t in e) a = r[t], n = e[t], r !== n && (c && n && (jQuery.isPlainObject(n) || (o = jQuery.isArray(n))) ? (o ? (o = !1, i = a && jQuery.isArray(a) ? a : []) : i = a && jQuery.isPlainObject(a) ? a : {}, r[t] = jQuery.extend(c, i, n)) : void 0 !== n && (r[t] = n));
                return r
            },
            findItemByKeyValueFromArray: function(e, t, a) {
                {
                    var n, o;
                    a.length
                }
                for (n = 0; n < a.length; n++)
                    if (a[n] && a[n][e] && a[n][e] === t) {
                        o = a[n];
                        break
                    } return o
            },
            loadFile: function() {
                var e, t, a, n, o = 0,
                    i = function(e, t) {
                        function a(e) {
                            (4 == this.readyState || "complete" == this.readyState || "loaded" == this.readyState) && t(e)
                        }
                        t && ("Microsoft Internet Explorer" == navigator.appName ? e.onreadystatechange = a : e.onload = t)
                    };
                return e = i,
                    function(i, r, s) {
                        var l;
                        return "js" == r ? (l = document.createElement("script"), l.setAttribute("type", "text/javascript"), e(l, s), l.setAttribute("src", i)) : "css" == r ? document.createStyleSheet ? document.createStyleSheet(i, o++) : (l = document.createElement("link"), l.setAttribute("rel", "stylesheet"), l.setAttribute("type", "text/css"), l.setAttribute("href", i)) : "img" == r && (l = document.createElement("img"), e(l, s), l.setAttribute("src", i)), l && (t = t || document.getElementsByTagName("head")[0], "js" == r ? t.appendChild(l) : "css" == r && (a = a || document.createDocumentFragment(), a.appendChild(l), t.insertBefore(l, n))), l
                    }
            }(),
            getImageElem: function(e) {
                return "string" == typeof e ? document.getElementById(e) : e.length ? e[0] : e
            },
            getImageId: function(e) {
                return "string" == typeof e ? e : e.id
            },
            imgOnLoad: function(e, t) {
                var a = avpw$(e);
                a.load(t), (1 == a[0].complete || 4 == a[0].readyState || "complete" == a[0].readyState || "loaded" == a[0].readyState) && a.trigger("load")
            },
            color_is_white: function(e) {
                return e = e.toLowerCase(), "#fff" == e || "#ffffff" == e || "white" == e || "rgb(255,255,255)" == e || "rgb(255, 255, 255)" == e
            },
            color_is_light: function(e) {
                var t, a, n, o, i;
                return t = a = n = 0, i = AV.util.color_to_array(e), t = i[0], a = i[1], n = i[2], o = .2 * t + .7 * a + .1 * n, o > 127.5
            },
            color_expand: function(e) {
                var t, a, n;
                return 4 == e.length && (t = e.charAt(1), a = e.charAt(2), n = e.charAt(3), e = "#" + t + t + a + a + n + n), e
            },
            color_to_array: function(e) {
                var t, a, n;
                return "#" == e.charAt(0) ? (e = AV.util.color_expand(e), t = parseInt(e.substr(1, 2), 16), a = parseInt(e.substr(3, 2), 16), n = parseInt(e.substr(5, 2), 16)) : "r" == e.charAt(0).toLowerCase() && (e = AV.util.rgb_to_color(e), t = parseInt(e.substr(1, 2), 16), a = parseInt(e.substr(3, 2), 16), n = parseInt(e.substr(5, 2), 16)), e = [t, a, n, 1]
            },
            array_to_color: function(e) {
                var t = AV.util.array_to_rgb(e);
                return t = AV.util.rgb_to_color(t)
            },
            array_to_rgb: function(e) {
                var t = "rgb(0,0,0)";
                return e.join && (e.length > 3 && (e = e.slice(0, 3)), t = "rgb(" + e.join(",") + ")"), t
            },
            color_to_rgb: function(e) {
                return e = AV.util.color_to_array(e), e = AV.util.array_to_rgb(e)
            },
            rgb_to_color: function(e) {
                var t, a, n, o = /\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/,
                    i = e.match(o);
                return i ? (t = parseInt(i[1]).toString(16), 1 == t.length && (t = "0" + t), a = parseInt(i[2]).toString(16), 1 == a.length && (a = "0" + a), n = parseInt(i[3]).toString(16), 1 == n.length && (n = "0" + n), "#" + t + a + n) : e
            },
            color_to_int: function(e) {
                return e = AV.util.color_expand(e), e = AV.util.rgb_to_color(e), parseInt(e.substr(1), 16)
            },
            getSafeAssetBaseURL: function(e) {
                return e = e.replace("http://cd-test.aviary.com:1338", AV.build.cdsContentURL), "https:" == window.location.protocol && (e = AV.build.contentShouldUseStaging ? e.replace("http://testassets.aviary.com.s3.amazonaws.com", "https://s3.amazonaws.com/testassets.aviary.com") : e.replace("http://assets.aviary.com", "https://assets.aviary.com")), e
            },
            loadImagesSync: function(e, t, a) {
                var n = 0,
                    o = e.length,
                    i = function() {
                        t && n == e.length && AV.util.nextFrame(t)
                    },
                    r = avpw$.support.cors && !("Microsoft Internet Explorer" == navigator.appName) || a; - 1 !== navigator.userAgent.indexOf("Safari") && -1 === navigator.userAgent.indexOf("Chrome") && (r = !1);
                for (var s = 0; o > s; s++) ! function(t) {
                    var a = e[t].img,
                        o = e[t].src;
                    a.onload = function() {
                        e[t].mappingObject && (e[t].mappingObject.w = a.width, e[t].mappingObject.h = a.height), n++, i()
                    }, r ? (a.crossOrigin = "Anonymous", a.src = o) : avpw$.ajax({
                        type: "GET",
                        dataType: "json",
                        url: AV.build.jsonp_imgserver + "?callback=?",
                        data: {
                            url: escape(o)
                        },
                        success: function(e) {
                            a.src = e.data
                        }
                    })
                }(s)
            },
            getApiVersion: function(e) {
                return e && e.apiVersion ? parseInt(e.apiVersion, 10) : 1
            },
            getUserFriendlyToolName: function(e) {
                var t = {
                        overlay: "Stickers",
                        drawing: "Draw",
                        textwithfont: "Text",
                        colorsplash: "Splash",
                        tiltshift: "Tilt Shift",
                        forcecrop: "Crop"
                    },
                    a = "";
                return e && (a = t[e] || e.substr(0, 1).toUpperCase() + e.substr(1)), a
            },
            keyDownHandlerNumber: function(e, t) {
                9 == e.keyCode || 27 == e.keyCode || 65 == e.keyCode && (e.ctrlKey === !0 || e.metaKey === !0) || e.keyCode >= 35 && e.keyCode <= 39 || ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && 46 !== e.keyCode && 8 !== e.keyCode ? e.preventDefault() : t && t.apply(this, [e]))
            },
            getBrowserVersion: function() {
                var e, t = navigator.userAgent,
                    a = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                return /trident/i.test(a[1]) ? (e = /\brv[ :]+(\d+)/g.exec(t) || [], "IE " + (e[1] || "")) : "Chrome" === a[1] && (e = t.match(/\bOPR\/(\d+)/), null != e) ? "Opera " + e[1] : (a = a[2] ? [a[1], a[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = t.match(/version\/(\d+)/i)) && a.splice(1, 1, e[1]), a[1])
            },
            generatePointList: function(e, t) {
                var a, n = function(e, t, a, o, i, r, s, l) {
                        var c = (o - t) * (o - t) + (i - a) * (i - a);
                        if (l * l > c) return null;
                        var u, d, g, p, h, f;
                        void 0 !== r ? (u = (r + t) / 2, d = (r + o) / 2, g = (s + a) / 2, p = (s + i) / 2, h = (u + d) / 2, f = (g + p) / 2) : (h = (t + o) / 2, f = (a + i) / 2), n(e, t, a, h, f, u, g, l), e.push([0 | h, 0 | f]), n(e, h, f, o, i, d, p, l)
                    },
                    o = Math.floor(.2 * t),
                    i = 0,
                    r = [];
                for (i = 0; i < e.length - 1; ++i) {
                    var s = e[i],
                        l = e[i + 1],
                        c = [(s[0] + l[0]) / 2 | 0, (s[1] + l[1]) / 2 | 0];
                    0 === i ? n(r, s[0], s[1], c[0], c[1], void 0, void 0, o) : n(r, a[0], a[1], c[0], c[1], s[0], s[1], void 0, void 0, o), a = c, r.push(c), i === e.length - 2 && (n(r, c[0], c[1], l[0], l[1], void 0, void 0, o), r.push(l))
                }
                return r
            },
            isURLSameDomain: function(e) {
                var t = window.location,
                    a = document.createElement("a");
                return a.href = e, a.hostname == t.hostname && a.port == t.port && a.protocol == t.protocol
            },
            doesSupportImageCORS: function() {
                return avpw$.support.cors && !("Microsoft Internet Explorer" == navigator.appName)
            },
            isIE11: function() {
                return !window.ActiveXObject && "ActiveXObject" in window || /Edge\/([0-9]+)./i.test(navigator.userAgent)
            }
        },
        function(e, t, a) {
            e.AV = e.AV || {};
            var n = e.AV;
            return n.ImageSizeTracker = function(e) {
                var t = this;
                t.setImageScaledIndicator = function() {
                    n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "updateImageScaledIndicator")
                }, t.setOrigSize = function(e, a, o) {
                    var i, r;
                    if (e.hiresWidth && e.hiresHeight) i = parseInt(e.hiresWidth, 10), r = parseInt(e.hiresHeight, 10);
                    else if (e.hiresUrl) i = a.width, r = a.height;
                    else {
                        if (!e.displayImageSize) return null;
                        i = o.width, r = o.height
                    }
                    return n.paintWidgetInstance.actions.setOrigSize(i, r), t.setImageScaledIndicator(), {
                        width: i,
                        height: r
                    }
                }, t.isDisplayingImageSize = function(e) {
                    return e.hiresWidth || e.hiresHeight || e.displayImageSize
                }, t.isUsingHiResDimensions = function(e) {
                    return e.hiresWidth || e.hiresHeight || e.displayImageSize && e.hiresUrl
                }
            }, e
        }(this, "undefined" != typeof window ? window : {}, "undefined" != typeof document ? document : {});
    var mediator = AV.Events;
    AV.ToolManager = function(e) {
            var t = null,
                a = function(t) {
                    var a, n, o = e.activeTools,
                        i = !1;
                    if (o)
                        for (n = o.length, a = 0; n > a; a++)
                            if (o[a] === t) {
                                i = !0;
                                break
                            } return "forcecrop" === t && AV.launchData.forceCropPreset ? !0 : (i || AV.errorNotify("UNSUPPORTED_TOOL", [t]), i)
                },
                n = function(t, a, n) {
                    return e.objectNotify("tool", t, a, n)
                },
                o = function(e) {
                    null != e && (avpw$(".avpw_controlpanel").each(function() {
                        avpw$(this).hide()
                    }), avpw$("#avpw_controlpanel_" + e).show())
                },
                i = function() {
                    var a, i = function(i) {
                        n(t, "panelWillClose"), n(i, "panelWillOpen"), mediator.trigger("canvas:activate", e.panelMode2WidgetMode(i)), o(i), n(i, "resetUI"), window.setTimeout(function(e) {
                            return function() {
                                n(e, "panelDidClose"), t = i, n(i, "panelDidOpen"), a = !1
                            }
                        }(t), 200), t = i, e.layoutNotify(AV.launchData.openType, "disableZoomMode")
                    };
                    return function(e) {
                        a || (a = !0, i(e))
                    }
                }(),
                r = function(t) {
                    if (!e.paintWidget || !e.paintWidget.busy) {
                        if (e.layoutNotify(AV.launchData.openType, "showView", ["editpanel"]), i(t), AV.controlsWidgetInstance.onEggWaitThrobber.stop(), "mobile" == AV.launchData.openType) {
                            var a, n = document.getElementById("avpw_main_" + t);
                            n && (a = n.getAttribute("data-header"), a && (document.getElementById("avpw_control_toolname").innerHTML = a))
                        }
                        AV.usageTracker.addUsage(t)
                    }
                },
                s = function() {
                    mediator.on("tool:open", d), mediator.on("tool:close", u), mediator.on("tool:init", g), mediator.on("tool:shutdown", f), mediator.on("tool:commit", p), mediator.on("tool:cancel", h), mediator.on("tool:undo", y), mediator.on("tool:redo", w), mediator.on("actions:clear_uncommited_changes", l)
                },
                l = function() {
                    e.paintWidget.hasUncommittedChanges && (e.paintWidget.actions.undo(), e.paintWidget.hasUncommittedChanges = !1, e.paintWidget.actions.truncate(!0))
                },
                c = function() {
                    mediator.off("tool:open", d), mediator.off("tool:close", u), mediator.off("tool:init", g), mediator.off("tool:shutdown", f), mediator.off("tool:commit", p), mediator.off("tool:cancel", h), mediator.off("tool:undo", y), mediator.off("tool:redo", w), mediator.off("actions:clear_uncommited_changes", l)
                },
                u = function() {
                    e.layoutNotify(AV.launchData.openType, "showView", ["main"]), i(null)
                },
                d = function(t, n) {
                    function o(e) {
                        AV.util.nextFrame(function() {
                            r(e)
                        })
                    }
                    t = AV.publicName2PanelMode(t), (a(t) || AV.launchData.forceCropPreset) && e.paintWidget && !e.paintWidget.moduleLoaded(t, o) && n && (e.onEggWaitThrobber.stop(), e.onEggWaitThrobber.spin(avpw$(n).children(".avpw_icon_waiter")[0])), mediator.trigger("usage:tool", t, "opened"), mediator.trigger("usage:firstclick", t)
                },
                g = function(t) {
                    n(t, "init", [e])
                },
                p = function() {
                    var e, a = t;
                    a && (e = n(t, "commit"), e !== !1 && (mediator.trigger("usage:tool", a, "applied", e !== !0 ? e : ""), mediator.trigger("tool:commitDone")))
                },
                h = function() {
                    n(t, "cancel"), mediator.trigger("usage:tool", t, "canceled"), mediator.trigger("actions:clear_uncommited_changes")
                },
                f = function(e) {
                    n(e, "shutdown")
                },
                m = function() {
                    return e.paintWidget.busy ? !1 : n(t, "onUndo") === !1 ? !1 : (e.paintWidget.actions.undo(), n(t, "onUndoComplete"), !1)
                },
                v = function() {
                    return e.paintWidget.busy ? !1 : n(t, "onRedo") === !1 ? !1 : (e.paintWidget.actions.redo(!1, !0), n(t, "onRedoComplete"), !1)
                },
                y = function() {
                    mediator.trigger("usage:tool", "undo", "applied", t || ""), m()
                },
                w = function() {
                    mediator.trigger("usage:tool", "redo", "applied", t || ""), v()
                },
                b = this;
            return b.init = s, b.shutdown = c, b.notify = n, b.getActiveTool = function() {
                return t
            }, s(), b
        }, AV.AssetManager = function(e, t) {
            "use strict";
            var a, n = {
                    EFFECT: "effects",
                    STICKER: "stickers",
                    IMAGEBORDER: "frames",
                    OVERLAYS: "overlays",
                    PERMISSION: "permissions",
                    FONTPACK: "fontpack"
                },
                o = {},
                i = function(e) {
                    return a[n[e]] || []
                },
                r = function(e, t) {
                    a ? t && t.apply(this, [i(e), n[e]]) : (o.getPartnerAssets || (o.getPartnerAssets = [], u.authenticate()), o.getPartnerAssets.push(function(o) {
                        o && o.status && "Ok" === o.status ? a = o : (AV.errorNotify("ERROR_AUTHENTICATING"), s()), AV.util.nextFrame(function() {
                            a && t && t.apply(this, [i(e), n[e]])
                        })
                    }))
                },
                s = function(e, t) {
                    return a = [{
                        needsPurchase: !1,
                        assetId: "default_effects",
                        assetType: "effect",
                        displayName: "Default",
                        resourceUrl: "js/proclist_default_effects.js"
                    }, {
                        needsPurchase: !1,
                        assetId: "original_effects",
                        assetType: "effect",
                        displayName: "Original",
                        resourceUrl: "js/proclist_original_effects.js"
                    }, {
                        needsPurchase: !1,
                        assetId: "original_stickers",
                        assetType: "sticker",
                        displayName: "Original",
                        resourceUrl: "js/stickers_original_stickers.js"
                    }, {
                        needsPurchase: !1,
                        assetId: "borders",
                        assetType: "imageborder",
                        displayName: "Default Image Borders",
                        resourceUrl: "js/borders_original.js"
                    }], t && AV.util.nextFrame(function() {
                        t.apply(this, [i(e)])
                    }), !0
                },
                l = function(e) {
                    var t, a, n;
                    if (e.messageName && (n = o[e.messageName])) {
                        if ("function" == typeof n) n.apply(this, [e.data]);
                        else
                            for (a = n.length, t = 0; a > t; t++) n[t].apply(this, [e.data]);
                        n = null
                    }
                },
                c = e ? r : s,
                u = this;
            return u.getAssets = c, u.getById = function(e) {
                for (var t = 0; t < a.length; t++)
                    if (a[t].assetId === e) return a[t]
            }, u.gatherContentAssetsHelper = function(e, t) {
                return u.getAssets(e, function(e) {
                    for (var a = {}, n = e, o = {}, i = function() {
                            s === n.length && t(o, n)
                        }, r = function(e, t) {
                            return AV.controlsWidgetInstance.serverMessaging.sendMessage({
                                id: "avpw_get_assetssticker",
                                action: t,
                                method: "GET",
                                dataType: "json",
                                announcer: AV.build.asyncFeatherTargetAnnounce,
                                origin: AV.build.asyncImgrecvBase,
                                callback: function(n) {
                                    o[e] = n, a[t] = !0, s++, i()
                                }
                            })
                        }, s = 0, l = 0; l < n.length; l++) {
                        var c = n[l].identifier,
                            u = AV.controlsWidgetInstance.assetManager.getContentURLByVersionKey(n[l].versionKey);
                        a[u] ? (s++, i()) : !o[c] && u && r(c, u)
                    }
                })
            }, u.getManifestURL = function() {
                var e, t, a = AV.build.contentShouldUseStaging;
                return AV.launchData.apiKey && AV.launchData.timestamp && AV.launchData.signature && AV.launchData.salt && AV.launchData.encryptionMethod ? (e = AV.build.gatewayAssetURL, t = ["&timestamp=", AV.launchData.timestamp, "&signature=", AV.launchData.signature, "&salt=", AV.launchData.salt, "&encryptionMethod=", AV.launchData.encryptionMethod].join("")) : e = AV.build.manifestURL, [e, "/hires/assets", "?platform=web", "&apiKey=", AV.launchData.apiKey || "", "&resolution=", window.devicePixelRatio > 1 ? "high" : "low", "&sdkVersion=" + AV.build.version, a ? "&staging=2" : "", t ? t : ""].join("")
            }, u.getContentURLByVersionKey = function(e) {
                var t = AV.build.contentShouldUseStaging;
                return AV.build.cdsContentURL + "/v1/content?versionKey=" + e + (t ? "&staging=2" : "")
            }, u.authenticate = function() {
                var e = function(e) {
                    var t = {
                        messageName: "getPartnerAssets",
                        data: e
                    };
                    l(t)
                };
                return function() {
                    return AV.controlsWidgetInstance.serverMessaging.sendMessage({
                        id: "avpw_auth_form",
                        action: u.getManifestURL(),
                        method: "GET",
                        dataType: "json",
                        announcer: AV.build.asyncFeatherTargetAnnounce,
                        origin: AV.build.asyncImgrecvBase,
                        callback: e,
                        onError: function(e) {
                            AV.errorNotify(e.status && 403 == e.status ? "ERROR_AUTHENTICATING" : "ERROR_GET_ASSETS")
                        }
                    })
                }
            }(), u.types = n, u
        }, AV.ServerMessaging = function(e) {
            var t = [],
                a = function(e, a) {
                    var n, o, i = !0,
                        r = t.shift();
                    if (r && (a && r.origin && (i = a === AV.util.getDomain(r.origin)), r.id && (n = avpw$("#" + r.id), o = n.attr("target"), avpw$("#" + o).unbind("load"), avpw$("#" + r.id + "_target_holder").empty(), n.remove()), i && r.callback)) {
                        if (r.dataType && "json" === r.dataType && "string" == typeof e) try {
                            e = AV.JSON.parse(e)
                        } catch (s) {}
                        r.callback.call(this, e)
                    }
                    t.length > 0 && d()
                },
                n = function(e, t, a, n, o, i) {
                    return avpw$.ajax({
                        url: e,
                        type: t,
                        data: a,
                        dataType: n,
                        error: function(t) {
                            i ? i.call(this, t) : AV.errorNotify("ERROR_SERVER_MESSAGING", [e])
                        },
                        success: o
                    })
                },
                o = function(e, t, a, n, o, i) {
                    var r = new XDomainRequest;
                    r.onload = function() {
                        var e = r.responseText;
                        window.setTimeout(function() {
                            var t;
                            try {
                                t = AV.JSON.parse(e), o(t)
                            } catch (a) {
                                o(e)
                            }
                        }, 0)
                    }, r.onerror = function(t) {
                        i ? i.call(this, t) : AV.errorNotify("ERROR_SERVER_MESSAGING", [e]), AV.errorNotify("ERROR_SERVER_MESSAGING", [e])
                    }, r.ontimeout = function() {}, r.onprogress = function() {}, r.open(t, e), a ? r.send(avpw$.param(a)) : r.send()
                },
                i = function(e, t, a, n, o) {
                    var i = avpw$("<form></form>").attr({
                            id: e,
                            action: t,
                            target: a,
                            method: n || "POST"
                        }).css({
                            display: "none"
                        }),
                        r = document.createDocumentFragment();
                    for (var s in o) o.hasOwnProperty(s) && r.appendChild(avpw$("<input></input>").attr({
                        name: s,
                        value: o[s],
                        type: "hidden"
                    })[0]);
                    return i.html(r), i.appendTo("#avpw_holder"), i
                },
                r = function(e, t, a) {
                    return a || (a = AV.build.feather_baseURL + "blank.html"), t || (t = e), ['<iframe width="1" height="1" ', 'style="position:absolute;left:-9999px;" ', 'id="' + e + '" name="' + t + '" src="' + a + '">', "</iframe>"].join("")
                },
                s = function(e, t, a) {
                    if (!e) return null;
                    var n = e + "_target_holder",
                        o = Math.floor(4294967295 * Math.random()).toString(16),
                        i = "avpw_form_target_" + o,
                        s = avpw$("#" + n);
                    return s && s.length || (s = avpw$('<div id="' + n + '"></div>').css({
                        position: "absolute",
                        top: 0,
                        left: 0
                    }).appendTo("#avpw_holder")), s.html(r(i)), avpw$("#" + i).load(t ? function() {
                        c(i, e, t)
                    } : a), i
                },
                l = function(e, t, a, n, o, r, l) {
                    var c = s(e, r, l);
                    t += "?responsecontenttypeheader=" + escape("text/html");
                    var u = i(e, t, c, a, o);
                    return u.submit(), u
                },
                c = function(e, t, n) {
                    var o, i = t + "_announcer";
                    if (window.postMessage) window[i] ? window[i].postMessage("avpw_load:" + e, "*") : (o = avpw$(r(i, i, n)), o.load(function() {
                        AV.util.nextFrame(function() {
                            window[i].postMessage("avpw_load:" + e, "*")
                        })
                    }), avpw$("#avpw_holder").append(o));
                    else {
                        var s, l = function() {
                                avpw$(s).unbind().remove()
                            },
                            c = t + "_observer",
                            u = c,
                            d = 0,
                            g = function() {
                                var e;
                                try {
                                    if ("about:blank" == s.contentWindow.location) return
                                } catch (t) {}
                                2 === d && (e = s.contentWindow.name, e && (d = 3, e !== u && e.substr && "avpw:" == e.substr(0, 5) ? (e = e.substr(5), a(e)) : (AV.errorNotify("ERROR_SAVING", [AV.build.imgrecvServer]), a()), l())), 1 === d && (d = 2, s.contentWindow.location = ""), d || (d = 1)
                            };
                        s = avpw$(r(c, u, n + "#" + e))[0], avpw$(s).load(g), avpw$(s).appendTo("#avpw_holder")
                    }
                },
                u = function(e) {
                    var t = e.data,
                        n = AV.util.getDomain(e.origin);
                    t.substr && "avpw:" == t.substr(0, 5) && (t = t.substr(5), a(t, n))
                },
                d = function() {
                    var e = t[0];
                    e && l(e.id, e.action, e.method, e.origin, e.keyValues, e.announcer)
                },
                g = function(e) {
                    e.announcer ? (t.push(e), 1 === t.length && d()) : l(e.id, e.action, e.method, e.origin, e.keyValues, e.announcer, e.callback)
                },
                p = function(e) {
                    var t, a = e.transport || "xhr";
                    "xhr" === a && avpw$.support.cors && (!AV.firefox || AV.firefox >= 4) ? (t = n(e.action, e.method, e.keyValues, e.dataType, e.callback, e.onError), t || g(e)) : "function" == typeof XDomainRequest ? o(e.action, e.method, e.keyValues, e.dataType, e.callback, e.onError) : g(e)
                },
                h = function() {
                    window.addEventListener ? window.addEventListener("message", u, !1) : window.attachEvent && window.attachEvent("onmessage", u)
                },
                f = this;
            return f.shutdown = function() {
                window.removeEventListener ? window.removeEventListener("message", u, !1) : window.detachEvent && window.detachEvent("onmessage", u), t = []
            }, f.sendMessage = p, h(), f
        },
        function(e, t, a) {
            e.AV = e.AV || {};
            var n = e.AV,
                o = n.Events;
            n.usageTracker = function() {
                var e, i = null,
                    r = {},
                    s = 0,
                    l = [],
                    c = 0,
                    u = -1,
                    d = !1,
                    g = {},
                    p = function() {
                        n.controlsWidgetInstance && g.submit("close")
                    },
                    h = function() {
                        d || (! function(e, t, a, n, o, i, r) {
                            e.GoogleAnalyticsObject = o, e[o] = e[o] || function() {
                                (e[o].q = e[o].q || []).push(arguments)
                            }, e[o].l = 1 * new Date, i = t.createElement(a), r = t.getElementsByTagName(a)[0], i.async = 1, i.src = n, r.parentNode.insertBefore(i, r)
                        }(t, a, "script", "https://www.google-analytics.com/analytics.js", "AV_ga"), AV_ga("create", n.build.googleTracker, "auto", {
                            allowLinker: !0
                        }), AV_ga("set", "dimension1", n.launchData.apiKey), AV_ga("set", "dimension2", n.build.version), AV_ga("set", "dimension3", this.getUUID()), AV_ga("set", "dimension4", n.launchData.language), AV_ga("set", "dimension5", n.launchData.apiVersion + ""), d = !0, AV_ga("send", "event", "editor", "isWebGLUsed", n.featherGLEnabled.toString()))
                    },
                    f = function(e, t, a) {
                        AV_ga("send", "event", "tool", e + ":" + t, a ? a + "" : "")
                    },
                    m = function(e, t, a) {
                        AV_ga("send", "event", "interaction", e + ":" + t, a ? a + "" : "")
                    },
                    v = function(e) {
                        g.submit("firstclick", e), o.off("usage:firstclick")
                    };
                return g.setup = function() {
                    avpw$(t).bind("unload", p), o.on("usage:submit", g.submit, g), o.on("usage:tool", f, g), o.on("usage:firstclick", v, g), o.on("usage:interact", m)
                }, g.shutdown = function() {
                    avpw$(t).unbind("unload", p), o.off("usage:submit", g.submit), o.off("usage:tool", f), o.off("usage:firstclick", v), o.off("usage:interact", m)
                }, g.clear = function() {
                    i = null, r = {}, s = 0, l = [], c = 0, u = -1
                }, g.getUUID = function() {
                    return i ? i : i = Math.floor(4294967295 * Math.random()).toString(16) + Math.floor(4294967295 * Math.random()).toString(16)
                }, g.addUsage = function(e, t) {
                    t || (t = 1), void 0 === r[e] ? r[e] = t : r[e] += t, s += t
                }, g.setPageCount = function(e) {
                    var t;
                    for (c = e, l = new Array(e), t = 0; e > t; t++) l[t] = 0
                }, g.addPageHit = function(t) {
                    t !== e && l[t]++, e = t
                }, g.submit = function(e, a) {
                    h.call(this), "launch" === e ? AV_ga("send", "pageview", (t.location || "").toString()) : AV_ga("send", "event", "submit", e, a)
                }, g
            }();
            var i = {
                lighting: {
                    brightness: !0,
                    contrast: !0
                },
                color: {
                    saturation: !0,
                    warmth: !0
                }
            };
            return n.getActiveTools = function(e) {
                var t = n.featherUseFlash ? n.flashSupportedTools : n.featherGLEnabled ? n.glSupportedTools : n.defaultTools,
                    a = e;
                a && "all" !== a && "All" !== a && "ALL" !== a && "" !== a || (a = t), "string" == typeof a && (a = e.split(","));
                var o, r, s = [],
                    l = {},
                    c = {};
                for (r = 0; r < t.length; r++) o = t[r], c[o] = !0;
                var u = !0;
                for (r = 0; r < a.length; r++) {
                    if (n.launchData.forceCropPreset) {
                        if ("resize" === a[r] || "orientation" === a[r] || "crop" === a[r] || "overlays" === a[r]) continue
                    } else if ("orientation" === a[r] && avpw$.browser.msie && 9 === parseInt(avpw$.browser.version)) continue;
                    o = n.publicName2PanelMode(a[r]), o in c ? (s.push(o), u = !1, l[o] = !0) : !l.lighting && i.lighting[o] ? (s.push("lighting"), l.lighting = !0, u = !1) : !l.color && i.color[o] && (s.push("color"), l.color = !0, u = !1)
                }
                return n.launchData.forceCropPreset && u && n.errorNotify("BAD_FORCECROP_TOOLS"), s
            }, n.paintWidgetGetPopupEmbedDiv = function(e) {
                var t = avpw$("#avpw_canvas_embed_popup");
                if (e) {
                    var n, o, i, r = avpw$(e),
                        s = ["top", "left", "bottom", "right", "margin-top", "margin-right", "margin-bottom", "margin-left", "border-top", "border-right", "border-bottom", "border-left", "padding-top", "padding-right", "padding-bottom", "padding-left"],
                        l = {
                            position: "relative"
                        };
                    for (o = 0; o < s.length; o++) i = s[o], l[i] = r.css(i);
                    n = avpw$(e).css("display"), ("" == n || "inline" == n) && (n = "inline-block"), l.display = n, 0 == t.length && (t = a.createElement("div"), t.id = "avpw_canvas_embed_popup"), avpw$(t).hide().css(l).insertBefore(e)
                }
                return t
            }, n.paintWidgetLauncher = function(e, t) {
                return n.paintWidgetInstance ? void 0 : (n.usageTracker.clear(), n.paintWidgetLauncher_HTML(e, t))
            }, n.paintWidgetLauncher_HTML = function(e, t) {
                var o, i, r, s, l, c = n.launchData.launchDelay,
                    u = n.util.getImageElem(e);
                return s = n.getActiveTools(n.launchData.tools), n.isRelaunched && "undefined" != typeof u.avpw_prevURL && (t = u.avpw_prevURL), l = new n.AssetManager(n.launchData.isPremiumPartner, n.launchData.allowInAppPurchase), n.controlsWidgetInstance = new n.ControlsWidget(null, e, s, l, new n.ServerMessaging), n.launchData.image instanceof HTMLImageElement && !t && (t = e.src), t && 0 === t.indexOf("//") && (t = a.location.protocol + t), n.controlsWidgetInstance.origURL = t ? t : avpw$(u).attr("src"), n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "placeControls", [n.util.getApiVersion(n.launchData) > 1 ? n.launchData.appendTo : void 0]), n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "enableControls"), n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "bindEvents"), avpw$("#avpw_controls").fadeIn(c), n.util.nextFrame(function() {
                    n.controlsWidgetInstance.setupScrollPanels()
                }), n.launchData.noCloseButton && avpw$("#avpw_control_cancel_pane").css("display", "none"), u && "canvas" === u.nodeName.toLowerCase() ? void n.mockLauncher(u) : (i = n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "getEmbedElement", [u]), o = a.createElement("img"), o.id = "avpw_temp_loading_image", n.tempLoadingImageSrc = o.src, avpw$(o).load(function() {
                    r = n.controlsWidgetInstance.getScaledDims(avpw$(u).width(), avpw$(u).height()), o.width = r.width, o.height = r.height, n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "getScaledImageDims", [o]), avpw$(o).unbind(), o.style.display = "block", avpw$(i).append(o), n.controlsWidgetInstance.showWaitThrobber(!0), n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "hideOriginalImage", [u]), avpw$(i).show(), n.util.nextFrame(function() {
                        n.paintWidgetLauncher_stage2(e, t)
                    })
                }).error(function() {
                    n.paintWidgetCloser(!0), n.errorNotify("BAD_IMAGE", [t])
                }), o.src = u.src, !1)
            }, n.resetImageControls = function() {
                var e = n.paintWidgetInstance.imgElementClean,
                    t = n.controlsWidgetInstance.getScaledDims(e.width, e.height);
                n.controlsWidgetInstance.imageSizeTracker.setOrigSize(n.launchData, e, t), n.paintWidgetInstance.setDimensions(t.width, t.height), n.paintWidgetInstance.setBackground(e), n.paintWidgetInstance.setOrigSize(t.width, t.height)
            }, n.paintWidgetLauncher_stage2 = function(e, t) {
                var a, i, r = n.util.getImageElem(e),
                    s = function(e) {
                        n.controlsWidgetInstance && n.paintWidgetInstance && (a = new Image, avpw$.support.cors && n.launchData.enableCORS && -1 === e.indexOf("data:") && (a.crossOrigin = "Anonymous"), avpw$(a).load(function(e) {
                            if (n.controlsWidgetInstance && n.paintWidgetInstance) {
                                if (i = n.controlsWidgetInstance.getScaledDims(a.width, a.height), n.controlsWidgetInstance.imageSizeTracker.setOrigSize(n.launchData, a, i), a.width = i.width, a.height = i.height, n.paintWidgetInstance.setDimensions(i.width, i.height), !n.paintWidgetInstance.setBackground(a)) return n.paintWidgetCloser(!0), n.errorNotify("IMAGE_NOT_CLEAN", [t]), !1;
                                n.paintWidgetInstance.setOrigSize(i.width, i.height), r.src !== t && n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "scaleCanvas"), avpw$(n.paintWidgetInstance.canvas).insertBefore("#avpw_temp_loading_image"), l.remove(), n.tempLoadingImageSrc = t, n.controlsWidgetInstance.showWaitThrobber(!1), n.controlsWidgetInstance.loaderPhase = 2, n.launchData.actionListJSON && n.paintWidgetInstance.actions.importJSON(n.launchData.actionListJSON, n.fireLaunchComplete)
                            }
                        }).attr("src", e))
                    };
                i = n.controlsWidgetInstance.getScaledDims(avpw$(r).width(), avpw$(r).height()), n.controlsWidgetInstance.loaderPhase = 1, n.paintWidgetInstance = new n.PaintWidget(i.width, i.height, new n.Actions, new n.ModeManager, new n.FilterManager, new n.OverlayRegistry, new n.ImageBorderManager), n.controlsWidgetInstance.canvasUI = new n.PaintUI(n.paintWidgetInstance.canvas, n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "getEmbedElement")), n.controlsWidgetInstance.initWithPaintWidget(n.paintWidgetInstance), n.paintWidgetInstance.setOrigSize(i.width, i.height), n.controlsWidgetInstance.imageSizeTracker.setOrigSize(n.launchData, r, i);
                var l = avpw$("#avpw_temp_loading_image");
                if (n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "scaleCanvas"), null != t)
                    if (!n.launchData.enableCORS || !avpw$.support.cors || avpw$.browser.msie || avpw$.browser.safari && -1 === navigator.userAgent.indexOf("Chrome") && parseInt(n.util.getBrowserVersion()) < 7)
                        if (-1 === t.indexOf("data:")) {
                            if (!t || !t.match(/^http(s|):\/\//)) return void n.errorNotify("BAD_URL", [t]);
                            n.util.isURLSameDomain(t) ? s(t) : avpw$.ajax({
                                type: "GET",
                                dataType: "json",
                                url: n.build.jsonp_imgserver + "?callback=?",
                                data: {
                                    url: escape(t)
                                },
                                success: function(e) {
                                    s(e.data)
                                },
                                error: function(e, a, o) {
                                    200 === e.status && "parsererror" === a ? n.controlsWidgetInstance && (n.controlsWidgetInstance.showWaitThrobber(!1), n.util.nextFrame(function() {
                                        n.paintWidgetCloser(!0), n.errorNotify("BAD_URL", [t])
                                    })) : n.controlsWidgetInstance && (n.controlsWidgetInstance.showWaitThrobber(!1), n.paintWidgetCloser(!0), n.errorNotify("ERROR_SERVER_MESSAGING", [t]))
                                }
                            })
                        } else s(t);
                else s(t);
                else {
                    if (!n.paintWidgetInstance.setBackground(r)) return n.paintWidgetCloser(!0), n.launchData.enableCORS && avpw$.support.cors ? n.errorNotify("ERROR_BAD_IMAGE_WITHOUT_CORS") : n.errorNotify("IMAGE_NOT_CLEAN", [t]), !1;
                    avpw$("#avpw_controls").insertAfter(n.paintWidgetInstance.canvas), avpw$(n.paintWidgetInstance.canvas).insertBefore(l), l.remove(), n.tempLoadingImageSrc = r.src, n.controlsWidgetInstance.showWaitThrobber(!1), n.controlsWidgetInstance.loaderPhase = 2, n.launchData.actionListJSON && n.paintWidgetInstance.actions.importJSON(n.launchData.actionListJSON, n.fireLaunchComplete)
                }
                return o.trigger("usage:submit", "launch"), n.launchData.actionListJSON || n.fireLaunchComplete(), !1
            }, n.fireLaunchComplete = function() {
                var e = n.launchData.initTool;
                n.Events.trigger("layout:resize"), e && (n.util.nextFrame(function() {
                    o.trigger("tool:open", e)
                }), n.paintWidgetInstance.moduleLoaded(e, function(e) {
                    n.util.nextFrame(function() {
                        avpw$("#avpw_holder").removeClass("avpw_init_hide")
                    })
                })), "function" == typeof n.launchData.onReady && n.launchData.onReady()
            }, n.paintWidgetShutdown = function() {
                if (o.trigger("usage:submit", "close"), n.controlsWidgetInstance && (n.controlsWidgetInstance.serverMessaging && (n.controlsWidgetInstance.serverMessaging.shutdown(), n.controlsWidgetInstance.serverMessaging = null), n.controlsWidgetInstance.shutdown()), avpw$("#avpw_controls").hide(), n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "onShutdown"), "function" == typeof n.launchData.onClose) {
                    var e = !1;
                    n.paintWidgetInstance && n.paintWidgetInstance.actions.hasMadeChanges() && (e = !0), n.launchData.onClose(e)
                }
                n.paintWidgetInstance && n.paintWidgetInstance.shutdown(), n.paintWidgetInstance = null, n.controlsWidgetInstance = null, n.tempLoadingImageSrc = null
            }, n.paintWidgetCloser = function(e) {
                var t = n.launchData.closeDelay;
                n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "onClose", [e]), e || 0 === t ? (avpw$("#avpw_controls").hide(), n.paintWidgetShutdown()) : avpw$("#avpw_controls").fadeOut(t, function() {
                    n.paintWidgetInstance && n.paintWidgetShutdown()
                })
            }, n.controlsWidget_saveResponder = function(e, t, i) {
                "https:" === a.location.protocol && ("string" == typeof t && (t = t.replace("http:", "https:")), "string" == typeof i && (i = i.replace("http:", "https:")));
                var r;
                if ("function" == typeof e && (r = e.apply(n.launchData, [n.util.getImageId(n.controlsWidgetInstance.paintImgIdElem), t, i])), n.controlsWidgetInstance) {
                    var s = n.util.getImageElem(n.controlsWidgetInstance.paintImgIdElem);
                    s.avpw_prevURL = t, o.trigger("tool:close"), r && n.controlsWidgetInstance.messager.show("avpw_aviary_beensaved", !0), n.controlsWidgetInstance.paintWidget.dirty = !1, n.controlsWidgetInstance.saving = !1
                }
            }, n.controlsWidget_onImageSaved = function(e, t) {
                n.controlsWidget_saveResponder(n.launchData.onSave, e, t)
            }, n.controlsWidget_onHiResImageSaved = function(e) {
                n.controlsWidget_saveResponder(n.launchData.onSaveHiRes, e)
            }, n.ControlsWidget = function(e, t, a, i, r) {
                this.maxWidth = parseInt(n.launchData.maxSize), this.maxHeight = this.maxWidth, this.saving = !1, this.origURL = null, this.activeTools = a, this.quitCount = 0, n.usageTracker.setup(), this.paintImgIdElem = t, o.on("layout:resize", this.setupScrollPanels, this), this.layoutNotify(n.launchData.openType, "showView", ["main"]), e && this.initWithPaintWidget(e);
                var s = {
                        className: "avpw_canvas_spinner",
                        lines: 12,
                        length: 6,
                        width: 2,
                        radius: 6,
                        color: "#fff",
                        speed: .5,
                        trail: 70
                    },
                    l = {
                        className: "avpw_tool_spinner",
                        lines: 12,
                        length: 6,
                        width: 2,
                        radius: 6,
                        color: "#fff",
                        speed: .5,
                        trail: 70
                    };
                "mobile" != n.launchData.openType && (l.color = "#555", l.length = 4), this.waitThrobber = new n.Spinner(s), this.onEggWaitThrobber = new n.Spinner(l), this.toolManager = new n.ToolManager(this), this.assetManager = i, this.serverMessaging = r
            }, n.ControlsWidget.prototype.tool = {}, n.ControlsWidget.prototype.layout = {}, n.ControlsWidget.prototype.layoutNotify = function(e, t, a) {
                return this.objectNotify("layout", e, t, a)
            }, n.ControlsWidget.prototype.objectNotify = function(e, t, a, n) {
                if ("object" == typeof this[e][t]) {
                    var o = this[e][t];
                    if ("function" == typeof o[a]) {
                        var i = o[a];
                        return n || (n = []), i.apply(o, n)
                    }
                }
                return !0
            }, n.ControlsWidget.prototype.shutdown = function() {
                this.canvasUI && this.canvasUI.shutdown(), this.messager && this.messager.hide(), o.off("layout:resize", this.setupScrollPanels), this.shutdownAllTools(), this.unbindControls(), this.toolsPager && (this.toolsPager.shutdown(), this.toolsPager = null), this.paintWidget && (this.paintWidget.showWaitThrobber = null), n.usageTracker.shutdown(), this.waitThrobber.stop(), this.onEggWaitThrobber.stop(), this.waitThrobber = null, this.onEggWaitThrobber = null, this.showPanel(null), this.toolManager.shutdown(), this.toolManager = null
            }, n.ControlsWidget.prototype.initAllTools = function() {
                for (var e in this.activeTools) {
                    var t = this.activeTools[e];
                    this.tool.hasOwnProperty(t) && n.paintWidgetInstance.moduleLoaded(t, function(e) {
                        o.trigger("tool:init", e)
                    }.AV_bindInst(this))
                }
                n.launchData.forceCropPreset && n.paintWidgetInstance.moduleLoaded("forcecrop", function(e) {
                    o.trigger("tool:init", "forcecrop")
                }.AV_bindInst(this))
            }, n.ControlsWidget.prototype.shutdownAllTools = function() {
                for (var e in this.activeTools) {
                    var t = this.activeTools[e];
                    o.trigger("tool:shutdown", t)
                }
                n.launchData && n.launchData.forceCropPreset && o.trigger("tool:shutdown", "forcecrop")
            }, n.ControlsWidget.prototype.bindControls = function() {}, n.ControlsWidget.prototype.unbindControls = function() {}, n.ControlsWidget.prototype.initWithPaintWidget = function(e) {
                this.paintWidget = e, this.imageSizeTracker = new n.ImageSizeTracker(e.actions), n.featherUseFlash || this.initAllTools(), this.bindControls(), this.paintWidget.showWaitThrobber = this.showWaitThrobber.AV_bindInst(this)
            }, n.ControlsWidget.prototype.showWaitThrobber = function(e, a) {
                var o = 300,
                    i = this;
                if (e) {
                    var r = this.layoutNotify(n.launchData.openType, "getEmbedElement");
                    r.is(":visible") && (this.waitThrobber.spin(r[0]), avpw$(this.waitThrobber).fadeIn(o))
                } else avpw$(i.waitThrobber.el).fadeOut(o, i.waitThrobber.stop);
                a && t.setTimeout(a, 5)
            }, n.publicName2PanelMode = function(e) {
                return "stickers" === e && (e = "overlay"), "draw" === e && (e = "drawing"), "text" !== e || n.featherUseFlash || (e = "textwithfont"), e
            }, n.ControlsWidget.prototype.panelMode2WidgetMode = function(e) {
                switch (e) {
                    case "rotate":
                        return "rotate90";
                    case "greeneye":
                        return "redeye";
                    case "pinch":
                        return "bulge"
                }
                return e
            }, n.ControlsWidget.prototype.setupScrollPanels = function() {
                if (this.activeTools && this.activeTools.length) {
                    var e, t, a, o = this,
                        i = {},
                        r = this.layoutNotify(n.launchData.openType, "getDims").TOOLS_BROWSER_WIDTH,
                        s = function() {
                            o.toolsPager = new n.Pager(l), o.toolsPager.changePage()
                        },
                        l = {
                            itemCount: this.activeTools.length,
                            itemsPerPage: this.layoutNotify(n.launchData.openType, "getToolsPerPage"),
                            pageWidth: r,
                            leftArrow: avpw$("#avpw_lftArrow"),
                            rightArrow: avpw$("#avpw_rghtArrow"),
                            itemBuilder: function(a) {
                                return e = o.activeTools[a], t = n.util.getUserFriendlyToolName(e), t = n.getLocalizedString(t), n.template[n.launchData.layout].eggIcon({
                                    optionName: e,
                                    capOptionName: t
                                })
                            },
                            pageTemplate: n.template[n.launchData.layout].genericScrollPanel,
                            pipTemplate: n.template[n.launchData.layout].scrollPanelPip,
                            lastPageTemplate: a,
                            lastPageContents: i,
                            pageContainer: avpw$("#avpw_control_main_scrolling_region"),
                            pipContainer: avpw$("#avpw_tools_pager ul"),
                            onPageChange: function(e) {
                                n.usageTracker.addPageHit(e)
                            }
                        };
                    s(), avpw$("#avpw_control_main_scrolling_region").css("width", o.toolsPager.getPageCount() * r + "px"), this.assetManager.getAssets("PERMISSION", function(e) {
                        var t = !0;
                        if (e)
                            for (var a = 0; a < e.length; a++)
                                if ("whitelabel" === e[a]) {
                                    t = !1;
                                    break
                                } t ? (avpw$("#avpw_powered_branding").html(n.template[n.launchData.layout].poweredByFooterLogo).find("a").css("cursor", "default"), o.toolsPager.shutdown(), s(), avpw$("#avpw_control_main_scrolling_region").css("width", o.toolsPager.getPageCount() * r + "px"), o.toolsPager.changePage()) : avpw$("#avpw_controls").addClass("avpw_white_label")
                    }), n.usageTracker.setPageCount(o.toolsPager.getPageCount())
                }
            }, n.ControlsWidget.prototype.messager = function() {
                var e, a, i, r = {},
                    s = 1e3,
                    l = {
                        show: function(o, i, l) {
                            e = e || avpw$("#avpw_messaging"), a = a || avpw$("#avpw_messaging_inner");
                            var c = r[o] || (r[o] = avpw$("#" + o));
                            a.append(c), e.fadeIn(150), i ? (e.data("needsConfirmation", !0), n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "disableControls")) : (e.data("needsConfirmation", !1), l || t.setTimeout(this.hide, s))
                        },
                        hide: function(a, o) {
                            if (e = e || avpw$("#avpw_messaging"), i = i || avpw$("#avpw_messages"), a) {
                                var s = r[a];
                                s && i.append(s)
                            } else avpw$.each(r, function(e, t) {
                                i.append(t)
                            });
                            e.data("needsConfirmation") ? (t.setTimeout(function() {
                                o && o()
                            }, 400), n.controlsWidgetInstance && n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "enableControls")) : (e.hide(), o && o())
                        },
                        addMessage: function(e) {
                            i = i || avpw$("#avpw_messages"), e && (i[0].innerHTML += e)
                        }
                    };
                return o.on("modal:show", l.show), o.on("modal:hide", l.hide), l
            }(), n.ControlsWidget.prototype.orientationChanged = function(e) {}, n.ControlsWidget.prototype.windowResized = function() {
                var e = null;
                return function(a) {
                    t.clearTimeout(e), e = t.setTimeout(function() {
                        o.trigger("layout:resize"), e = null
                    }, 500)
                }
            }(), n.ControlsWidget.prototype.Slider = function(e) {
                var t = !1,
                    a = function(a, n) {
                        !t && e.onstart && e.onstart.apply(this, [a, n])
                    },
                    n = function(a, n) {
                        !t && e.onchange && e.onchange.apply(this, [a, n])
                    },
                    o = function(a, n) {
                        !t && e.onslide && e.onslide.apply(this, [a, n])
                    },
                    i = avpw$(e.element).slider({
                        range: "min",
                        max: e.max,
                        min: e.min,
                        value: e.defaultValue || e.max / 2,
                        delay: e.delay
                    });
                return this.getValue = function() {
                    return i.slider("value")
                }, this.setValue = function(e) {
                    return i.slider("value", e)
                }, this.reset = function(a) {
                    t = !0, this.setValue(e.defaultValue), t = !1
                }, this.addListeners = function() {
                    i.bind("slidestart", a).bind("slidechange", n).bind("slide", o)
                }, this.removeListeners = function() {
                    i.unbind("slidestart").unbind("slide").unbind("slidechange")
                }, this.shutdown = function() {
                    i.slider("destroy")
                }, this
            }, n.ControlsWidget.prototype._drawUICircle = function(e, t, a, n, o) {
                this._drawUICircle_HTML(e, t, a, n, o)
            }, n.ControlsWidget.prototype._drawUICircle_HTML = function(e, t, a, o, i) {
                var r, s = avpw$(e)[0],
                    l = s.getContext("2d");
                l.clearRect(0, 0, s.width, s.height), i && "transparent" !== o && this._drawUIGrid(l, s.width, s.height), l.globalCompositeOperation = "source-over", null != a ? (l.strokeStyle = i && ("transparent" == a || n.util.color_is_white(a) || null == o) ? "#444" : a, r = 3) : (l.strokeStyle = "rgba(0,0,0,0)", r = 1), l.lineWidth = r, l.beginPath(), l.arc(s.width / 2, s.height / 2, t, 0, 2 * Math.PI, !0), l.stroke(), l.closePath(), null != o && (l.save(), l.clip(), i && "transparent" == o ? this._drawUIGrid(l, s.width, s.height) : (l.fillStyle = o, l.fillRect(0, 0, s.width, s.height)), l.restore())
            }, n.ControlsWidget.prototype._drawUIGrid = function(e, t, a, n) {
                var o, i;
                for (n || (n = 5), i = 0; a + n > i; i += n)
                    for (o = 0; a + n > o; o += n) e.fillStyle = 1 == (o + i & 1) ? "#fff" : "#ddd", e.fillRect(o, i, n, n)
            }, n.ControlsWidget.prototype.showPanel = function(e) {
                null != e && (avpw$(".avpw_controlpanel").each(function() {
                    avpw$(this).hide()
                }), avpw$("#avpw_controlpanel_" + e).show())
            }, n.ControlsWidget.prototype.save = function() {
                function e(e, t) {
                    return e = e.toLowerCase(), -1 !== e.indexOf("jpg", e.length - "jpg".length) ? "image/jpg" : -1 !== e.indexOf("jpeg", e.length - "jpeg".length) ? "image/jpeg" : -1 !== e.indexOf("gif", e.length - "gif".length) ? "image/gif" : -1 !== e.indexOf("tiff", e.length - "tiff".length) ? "image/tiff" : -1 !== e.indexOf("bmp", e.length - "bmp".length) ? "image/bmp" : -1 !== e.indexOf("png", e.length - "png".length) ? "image/png" : t
                }
                var a = null,
                    i = !0,
                    r = 1e3,
                    s = function() {
                        return {
                            apikey: n.launchData.apiKey,
                            timestamp: n.launchData.timestamp,
                            signature: n.launchData.signature,
                            salt: n.launchData.salt,
                            encryptionMethod: n.launchData.encryptionMethod
                        }
                    },
                    l = function(e, t, a) {
                        var o = n.controlsWidgetInstance;
                        if (o.layoutNotify(n.launchData.openType, "enableControls", [!0]), o.paintWidget.showWaitThrobber(!1), e) {
                            var i = avpw$(n.util.getImageElem(o.paintImgIdElem));
                            i.avpw_prevURL = e, n.controlsWidget_onImageSaved(e, t)
                        } else n.errorNotify("ERROR_SAVING", [n.build.imgrecvServer, a]), n.controlsWidgetInstance.saving = !1
                    },
                    c = function(e, t) {
                        var a = n.controlsWidgetInstance;
                        if (a.layoutNotify(n.launchData.openType, "enableControls", [!0]), a.paintWidget.showWaitThrobber(!1), e) {
                            var o = avpw$(n.util.getImageElem(a.paintImgIdElem));
                            o.avpw_prevURL = e, n.controlsWidget_onHiResImageSaved(e)
                        } else t.Code && t.JobStatus ? n.errorNotify("ERROR_SAVING_HI_RES", [t.Code, t.JobStatus]) : n.errorNotify("ERROR_SAVING", [n.build.asyncImgrecvBase, t]), n.controlsWidgetInstance.saving = !1
                    },
                    u = function(e, t) {
                        var a, o, i, r, s = "";
                        if ("string" == typeof e)
                            if (-1 === e.indexOf("---FEATHER-POSTMESSAGE---")) try {
                                o = e.split("<url>")[1].split("</url>")[0]
                            } catch (c) {
                                n.errorNotify("ERROR_SAVING", ["Error parsing response."])
                            } else a = e.split("---FEATHER-POSTMESSAGE---"), o = a[0], i = a[1];
                            else if (r = avpw$(e).find("error"), r.length > 0) s = r.text();
                        else {
                            var u = avpw$(e).find("url");
                            u && (o = u.text(), o = o.replace(/^\s+|\s+$/g, ""));
                            var d = avpw$(e).find("hiresurl");
                            d && (i = d.text(), i = i.replace(/^\s+|\s+$/g, ""))
                        }
                        var g = [o, i, s];
                        "function" == typeof t ? t.apply(this, g) : l.apply(this, g)
                    },
                    d = function(t, a) {
                        var o = this,
                            i = (n.launchData.fileFormat || "").toLowerCase();
                        if (!i || i.length < 1) {
                            var r = o.origURL;
                            i = r ? e(r, "image/png") : "image/png"
                        } else i && -1 === i.indexOf("image/") && (i = "image/" + i);
                        var d = n.S3Uploader.isCapable(i);
                        o.paintWidget.exportImage(i, function(e) {
                            function r() {
                                n.controlsWidgetInstance.serverMessaging.sendMessage({
                                    id: "avpw_save_form",
                                    action: n.build.imgrecvServer,
                                    method: "POST",
                                    announcer: n.build.featherTargetAnnounce,
                                    origin: n.build.imgrecvBase,
                                    keyValues: n.util.extend(s(), {
                                        file: g,
                                        sessionid: n.usageTracker.getUUID(),
                                        actionlist: o.paintWidget.actions.exportJSON(!0),
                                        origurl: f,
                                        hiresurl: n.launchData.hiresUrl,
                                        contenttype: n.launchData.fileFormat,
                                        jpgquality: n.launchData.jpgQuality,
                                        debug: n.launchData.debug,
                                        asyncsave: n.launchData.asyncSave,
                                        usecustomfileexpiration: n.launchData.useCustomFileExpiration,
                                        encodedas: "base64text"
                                    }),
                                    callback: function() {
                                        (a || u).apply(this, arguments)
                                    }
                                })
                            }
                            var g, p = e.indexOf(";", 0),
                                h = e.indexOf(",", p);
                            e.slice(5, p), g = e.slice(h + 1), e = "";
                            var f = o.origURL;
                            f && 0 === f.indexOf("data:") && (f = ""), d ? n.S3Uploader.upload(i, g, function(e, a) {
                                e && r(), t ? c.call(this, a, null, e) : l.call(this, a, null, e)
                            }) : r()
                        })
                    },
                    g = function(e, t, a) {
                        var n = Math.round(t * a / 1e6 * 10) / 10,
                            i = ["didHitAzure:" + (e ? "Yes" : "No"), " width:" + t, " height:" + a, " megaPixels:" + n].join("");
                        o.trigger("usage:submit", "saveHiRes", i)
                    },
                    p = function() {
                        var e = n.paintWidgetInstance.getScaledSize(),
                            o = function() {
                                if (g(!0, e.hiresWidth, e.hiresHeight), !n.launchData.hiresUrl) return void n.errorNotify("ERROR_MISSING_HI_RES_URL");
                                var o = n.util.extend(s(), {
                                        actionlist: this.paintWidget.actions.exportJSON(!0),
                                        origurl: n.launchData.hiresUrl,
                                        fileformat: n.launchData.fileFormat,
                                        notificationmethod: "GET",
                                        backgroundcolor: "0xffffffff",
                                        jpgquality: n.launchData.jpgQuality
                                    }),
                                    l = function(e) {
                                        !e || e && "JobFailed" === e.JobStatusCode ? (c(null, e), t.clearInterval(a)) : e && "JobCompleted" === e.JobStatusCode && (t.clearInterval(a), c(e.JobStatus)), i = !0
                                    },
                                    u = function(e) {
                                        var o;
                                        e && e.JobId ? (o = e.JobId, a = t.setInterval(function() {
                                            i && n.controlsWidgetInstance.serverMessaging.sendMessage({
                                                id: "avpw_save_form",
                                                action: n.build.asyncImgrecvGetJobStatus,
                                                method: "POST",
                                                dataType: "json",
                                                announcer: n.build.asyncFeatherTargetAnnounce,
                                                origin: n.build.asyncImgrecvBase,
                                                keyValues: n.util.extend(s(), {
                                                    jobid: o
                                                }),
                                                callback: l
                                            }), i = !1
                                        }, r)) : c(null, e)
                                    };
                                n.controlsWidgetInstance.serverMessaging.sendMessage({
                                    id: "avpw_save_form",
                                    action: n.build.asyncImgrecvCreateJob,
                                    method: "POST",
                                    dataType: "json",
                                    announcer: n.build.asyncFeatherTargetAnnounce,
                                    origin: n.build.asyncImgrecvBase,
                                    keyValues: o,
                                    callback: u
                                })
                            },
                            l = this,
                            u = function() {
                                d.apply(l, [!0, function(t, a) {
                                    g(!1, e.hiresWidth, e.hiresHeight), c.apply(this, arguments)
                                }])
                            },
                            p = n.util.isIE11() || -1 !== navigator.userAgent.indexOf("MSIE");
                        if (p || n.launchData.forceHiResSave || n.launchData.hiresUrl !== n.launchData.url) o.call(this);
                        else {
                            var e = n.paintWidgetInstance.getScaledSize(),
                                h = n.launchData.maxSize,
                                f = n.launchData.hiresWidth,
                                m = n.launchData.hiresHeight;
                            f && m ? f > h && m > h ? o.call(this) : e.hiresWidth < h && e.hiresHeight < h ? u.call(this) : o.call(this) : o.call(this)
                        }
                    },
                    h = function(e, t, a) {
                        var o = this;
                        o.paintWidget.exportImage(a, function(a) {
                            var o = n.controlsWidgetInstance;
                            o.saving = !1, o.layoutNotify(n.launchData.openType, "enableControls", [!0]), o.paintWidget.showWaitThrobber(!1), e && "function" == typeof e && (t ? t = e(a) === !1 ? !1 : !0 : e(a)), t && n.util.nextFrame(function() {
                                n.controlsWidget_onImageSaved(o.origURL)
                            })
                        })
                    },
                    f = function(e, t, a, o) {
                        var i = !n.featherUseFlash;
                        i && this.layoutNotify(n.launchData.openType, "disableControls"), this.paintWidget.showWaitThrobber(i, function() {
                            switch (e) {
                                case "saveHiRes":
                                    p.call(r);
                                    break;
                                case "getImageData":
                                    h.call(r, t, a, o);
                                    break;
                                default:
                                    d.call(r)
                            }
                        });
                        var r = this;
                        return !1
                    };
                return function(e, t, a, i) {
                    return n.controlsWidgetInstance.loaderPhase < 2 ? !1 : this.saving ? !1 : (o.trigger("tool:commit"), o.trigger("tool:close"), this.saving = !0, n.prevActionList = this.paintWidget.actions.exportJSON(!0), n.launchData.postData && "string" != typeof n.launchData.postData && (n.launchData.postData = n.JSON.stringify(n.launchData.postData)), f.apply(this, [e, t, a, i]))
                }
            }(), n.ControlsWidget.prototype.onSaveButtonClicked = function(e) {
                if (o.trigger("usage:submit", "saveclicked"), "function" == typeof n.launchData.onSaveButtonClicked) {
                    var t = n.launchData.onSaveButtonClicked.apply(n.launchData, [n.util.getImageId(n.controlsWidgetInstance.paintImgIdElem)]);
                    if (t === !1) return !1
                }
                return n.controlsWidgetInstance.save()
            }, n.ControlsWidget.prototype.showAreYouSure = function() {
                this.messager.show("avpw_aviary_quitareyousure", !0)
            }, n.ControlsWidget.prototype.cancel = function(e) {
                this.quitCount++;
                var t = this.quitCount > 0 && this.paintWidget && this.paintWidget.actions.hasMadeChanges();
                if ("function" == typeof n.launchData.onCloseButtonClicked) {
                    var a = n.launchData.onCloseButtonClicked.apply(n.launchData, [t]);
                    a === !1 ? n.paintWidgetCloser() : this.showAreYouSure()
                } else t ? this.showAreYouSure() : n.paintWidgetCloser();
                return !1
            }, n.ControlsWidget.prototype.getScaledDims = function(e, t) {
                return n.util.getScaledDims(e, t, this.maxWidth, this.maxHeight)
            }, n.TransformStyle = function(e) {
                var t = this,
                    a = e || "";
                return t.set = function(e) {
                    if (a)
                        for (var t in e) {
                            var n = t + "\\([^\\)]*",
                                o = new RegExp(n),
                                i = !1,
                                r = function(a, n, o) {
                                    return i = !0, t + "(" + e[t]
                                };
                            a = a.replace(o, r), i || (a += " " + t + "(" + e[t] + ")")
                        } else
                            for (var t in e) a += " " + t + "(" + e[t] + ")"
                }, t.serialize = function() {
                    return a
                }, t
            }, e
        }(this, "undefined" != typeof window ? window : {}, "undefined" != typeof document ? document : {}), AV.errorNotify = function(e, t) {
            var a = {
                    BAD_IMAGE: {
                        code: 1,
                        message: "There was a problem loading your image provided to the `image` config key. Either it's not actually an image file or it doesn't really exist."
                    },
                    UNSUPPORTED: {
                        code: 2,
                        message: "It looks like you're using a browser that doesn't support the HTML canvas element (and also doesn't have Flash installed either). Please try accessing this page through a modern browser like Chrome, Firefox, Safari, or Internet Explorer (version 9 or higher). Your internets will thank you."
                    },
                    BAD_URL: {
                        code: 3,
                        message: "There was a problem loading the image URI provided to the вЂurlвЂ™ config key. Please verify that the URI is publicly accessible, and that the image is a supported format."
                    },
                    UNSUPPORTED_TOOL: {
                        code: 4,
                        message: "So sorry, but this tool is not available because it is not part of the set chosen with the `tools` config key. It's alternatively possible that your browser does not support this specific tool."
                    },
                    IMAGE_NOT_CLEAN: {
                        code: 5,
                        message: "Uh oh! We can't edit this image because the editor wasn't set up correctly to load external files via their address. You must either provide images from the same domain as the web page with the editor OR pass the external image address via the `url` config key in order for Aviary to be able to get permission from the browser to open it for editing. Sorry for the inconvenience!"
                    },
                    UNSUPPORTED_FONT: {
                        code: 6,
                        message: "So sorry, but this font looks to be unsupported by your browser or platform"
                    },
                    ERROR_SAVING: {
                        code: 7,
                        message: "There was a problem saving your photo. Please try again."
                    },
                    NO_APIKEY: {
                        code: 8,
                        message: "apiKey is required and not provided. See http://www.aviary.com/web-documentation#constructor-config-apikey."
                    },
                    ERROR_AUTHENTICATING: {
                        code: 9,
                        message: "There was a problem retrieving access to content from our server. Please ensure all authentication keys are present or do not attempt premium partner authentication."
                    },
                    ERROR_BAD_THEME: {
                        code: 10,
                        message: "Selected theme does not exist. Please use 'dark', 'light' or 'minimum' or see aviary.com/web for more info."
                    },
                    ERROR_BAD_IMAGE_WITHOUT_CORS: {
                        code: 11,
                        message: "The image URL you are trying to use is either not on the same domain or is not configured for CORS. See http://enable-cors.org/ for more info."
                    },
                    ERROR_SERVER_MESSAGING: {
                        code: 12,
                        message: "Error reaching Aviary services."
                    },
                    ERROR_BAD_AUTHENTICATION_PARAMETERS: {
                        code: 13,
                        message: "Invalid authenticationURL response. Please check the formatting the response."
                    },
                    BAD_FORCECROP_TOOLS: {
                        code: 14,
                        message: "If you're using the 'Force Crop' tool, the editor will disable the resize, orientation and crop tools so the user cannot change the intended forced size. It looks like the only tools you have enabled disabled by 'Force Crop'.."
                    },
                    ERROR_GET_ASSETS: {
                        code: 15,
                        message: "Error getting assets. Please check your authentication parameters."
                    },
                    ERROR_MISSING_HI_RES_URL: {
                        code: 16,
                        message: "Missing 'hiresUrl' from launch() method"
                    },
                    ERROR_WEBGL_LOST_CONTEXT: {
                        code: 17,
                        message: "WebGL Error: the GL lost context."
                    },
                    ERROR_SAVING_HI_RES: {
                        code: 18,
                        message: "There was a problem saving your photo."
                    },
                    UNSUPPORTED_FILE_FORMAT: {
                        code: 19,
                        message: "`fileFormat` parameter only supports `png` or `jpg`."
                    }
                },
                n = function(e) {},
                o = a[e],
                i = o.message;
            return "function" == typeof AV.launchData.onError && (o.args = t, i = AV.launchData.onError(o) || i), i && n(i), i
        },
        function(e, t, a) {
            "use strict";
            e.AV = e.AV || {};
            var n = e.AV,
                o = n.Events;
            e.Aviary = n, n.feather_loaded = !1, n.feather_loading = !1, n.build = n.build || {
                version: "",
                imgrecvServer: "imgrecvserver",
                imgrecvBase: "",
                imgtrackServer: "imgtrackserver",
                jsonp_imgserver: "",
                featherTargetAnnounce: "feather_target_announce_v3.html",
                proxyServer: "",
                feather_baseURL: "",
                feather_stickerURL: "",
                googleTracker: ""
            }, n.defaultTools = ["enhance", "effects", "frames", "overlays", "overlay", "orientation", "crop", "resize", "lighting", "color", "sharpness", "focus", "vignette", "blemish", "whiten", "redeye", "drawing", "colorsplash", "textwithfont", "meme"], n.glSupportedTools = ["enhance", "effects", "frames", "overlays", "overlay", "orientation", "crop", "resize", "lighting", "color", "sharpness", "focus", "vignette", "blemish", "whiten", "redeye", "drawing", "colorsplash", "textwithfont", "meme"], n.flashSupportedTools = ["enhance", "effects", "overlay", "crop", "resize", "orientation", "brightness", "contrast", "saturation", "sharpness", "drawing", "text", "redeye", "blemish"];
            var i = {};
            return i.image = null, i.apiKey = void 0, i.apiVersion = 4, i.appendTo = null, i.language = "en", i.theme = null, i.minimumStyling = !1, i.maxSize = 1024, i.noCloseButton = !1, i.launchDelay = 300, i.closeDelay = 300, i.forceCropPreset = null, i.forceHiResSave = !1, i.authenticationURL = null, i.tools = void 0, i.initTool = "", i.cropPresets = ["Custom", "Original", ["Square", "1:1"], "3:2", "3:5", "4:3", "4:5", "4:6", "5:7", "8:10", "16:9"], i.cropPresetDefault = "Custom", i.cropPresetsStrict = !1, i.url = null, i.enableCORS = !1, i.postUrl = void 0, i.postData = null, i.fileFormat = "", i.jpgQuality = 100, i.displayImageSize = !1, i.hiresMaxSize = 1e4, i.hiresWidth = null, i.hiresHeight = null, i.onLoad = void 0, i.onReady = void 0, i.onSaveButtonClicked = void 0, i.onSave = void 0, i.onSaveHiRes = void 0, i.onClose = void 0, i.onError = void 0, i.signature = null, i.timestamp = null, i.hiresUrl = void 0, i.isPremiumPartner = !0, i.useCustomFileExpiration = !1, i.allowInAppPurchase = !1, i.disableWebGL = !1, i.forceFlash = !1, i.forceSupport = !1, i.poweredByURL = "http://www.aviary.com", i.giveFeedbackURL = "http://support.aviary.com/", i.getWidgetURL = "https://creativesdk.adobe.com", i.debug = !1, i.asyncSave = !0, n.baseConfig = i,
                function(e) {
                    var t = function(e) {
                        return {
                            language: e.Feather_Language,
                            forceFlash: e.Feather_ForceFlash,
                            forceSupport: e.AV_Feather_ForceSupport,
                            onLoad: e.Feather_OnLoad,
                            onReady: e.Feather_OnLaunchComplete,
                            onClose: e.Feather_OnClose,
                            onSave: e.Feather_OnSave,
                            noCloseButton: e.Feather_NoCloseButton,
                            maxSize: e.Feather_MaxSize || e.Feather_MaxDisplaySize,
                            tools: e.Feather_EditOptions,
                            cropPresets: e.Feather_CropSizes,
                            resizePresets: e.Feather_ResizeSizes,
                            apiKey: e.Feather_APIKey,
                            hiresUrl: e.Feather_HiResURL,
                            postUrl: e.Feather_PostURL,
                            fileFormat: e.Feather_FileFormat || e.Feather_ContentType,
                            jpgQuality: e.Feather_FileQuality,
                            signature: e.Feather_Signature,
                            timestamp: e.Feather_Timestamp
                        }
                    };
                    if (n.baseConfig = n.util.extend(n.baseConfig, t(e)), "https:" === e.location.protocol || "chrome-extension:" === e.location.protocol) {
                        var a, o;
                        for (var i in n.build) n.build.hasOwnProperty(i) && (o = i.split("_SSL"), 2 === o.length && n.build[i] && (a = o[0], n.build[a] = n.build[i]))
                    }
                }(t), n.getLocalizedString = function(e) {
                    try {
                        var t = n.languageStrings[e];
                        return void 0 === t && (t = e), t
                    } catch (a) {}
                    return e
                }, Function.prototype.AV_bindInst = function(e) {
                    var t = this;
                    return function() {
                        return t.apply(e, arguments)
                    }
                }, n.injectControls = function() {
                    var e, t;
                    if ("popup" === n.launchData.openType ? (e = "", t = n.template[n.launchData.layout].saveBlock()) : (e = n.template[n.launchData.layout].saveBlock(), t = ""), n.criticalLayoutStyles && !n.feather_loaded) {
                        var o = a.createElement("style");
                        o.type = "text/css";
                        var i = a.createTextNode(n.criticalLayoutStyles);
                        o.styleSheet ? o.styleSheet.cssText = i.nodeValue : o.appendChild(i);
                        var r = a.getElementsByTagName("head")[0];
                        r.appendChild(o)
                    }
                    var s = n.template[n.launchData.layout].controls({
                            internalSaveBlock: e,
                            externalSaveBlock: t
                        }),
                        l = a.createElement("div");
                    l.id = "avpw_holder";
                    var c = "";
                    n.featherUseFlash && (c = "avpw_flash "), n.msie && (c += "avpw_ie" + n.msie), c && (l.className = c);
                    var u = a.getElementsByTagName("body");
                    u && (u = u[0]), u || (u = a.documentElement), u.appendChild(l), l.innerHTML = s
                }, n.Feather = function(e) {
                    e || (e = {});
                    var i = this;
                    e.authenticationURL && (e.isPremiumPartner = !0, o.on("auth:update", function(e) {
                        r(e)
                    }));
                    var r = function(a) {
                            t.avpw$.ajax({
                                url: e.authenticationURL,
                                cache: !1,
                                type: "GET",
                                contentType: "application/json"
                            }).done(function(e) {
                                for (var t, o = ["salt", "timestamp", "signature", "encryptionMethod"], r = [], s = 0; s < o.length; s++) t = o[s], e[t] || r.push(t);
                                r.length > 0 && n.errorNotify("ERROR_BAD_AUTHENTICATION_PARAMETERS", [r.join(", ")]), i.updateConfig({
                                    salt: e.salt,
                                    timestamp: e.timestamp,
                                    signature: e.signature,
                                    encryptionMethod: e.encryptionMethod
                                }), a && a()
                            })
                        },
                        s = function() {
                            n.injectControls(), n.util.nextFrame(n.loadStageFinal)
                        },
                        l = function() {
                            "undefined" != typeof avpw$ ? t.avpw$(a).ready(s) : s()
                        };
                    e && (e.openType = "aviary", e.layout = "desktop"), e = e || {}, n.launchData = n.util.extend(n.baseConfig, e);
                    var c = function() {
                        function e(e) {
                            var t = n.build.feather_baseURL + "css/" + e;
                            n.util.loadFile(t + ".css", "css")
                        }
                        var t, a;
                        if (n.featherUseFlash = !n.featherCanvasOk() && n.featherFlashOk(), n.featherGLEnabled = n.launchData.forceGL || n.shouldUseWebGL(), n.featherUseFlash && (n.launchData.forceHiResSave = !0), n.launchData.language = n.launchData.language.toLowerCase(), !n.feather_loaded && !n.feather_loading) {
                            switch (n.feather_loading = !0, t = n.launchData.language || "en", a = "js/feathercontrols_", a += n.validLanguages && n.validLanguages[t] ? t + ".js" : "en.js", !n.launchData.theme && n.launchData.minimumStyling && (n.launchData.theme = "minimum"), "minimum" === n.launchData.theme && (n.launchData.minimumStyling = !0), n.launchData.theme || (n.launchData.theme = "dark"), n.launchData.theme) {
                                case "dark":
                                case "light":
                                case "minimum":
                                    break;
                                default:
                                    n.errorNotify("ERROR_BAD_THEME")
                            }
                            var o;
                            o = n.launchData.minimumStyling && "minimum" === n.launchData.theme ? "feather_core_" : "feather_theme_aviary_", o += n.launchData.theme, e(o), n.build.bundled ? l() : n.util.loadFile(n.build.feather_baseURL + a, "js", l)
                        }
                    };
                    c();
                    var u = function() {
                        return n.paintWidgetInstance ? !1 : void n.paintWidgetLauncher(n.launchData.image, n.launchData.url)
                    };
                    return i.launch = function(e) {
                        if (!n.feather_loaded) return !1;
                        var t = a.getElementById("avpw_holder");
                        if (t || n.injectControls(), n.paintWidgetInstance) {
                            if (t) return !1;
                            i.close(!0)
                        }
                        if (n.launchData && (n.launchData.hiresWidth || n.launchData.hiresHeight) && (n.launchData.hiresWidth = null, n.launchData.hiresHeight = null), e && e.language && delete e.language, n.launchData = e ? n.util.extend(n.launchData, e) : n.launchData, !n.launchData.image) return n.errorNotify("BAD_IMAGE"), !1;
                        if (!n.launchData.apiKey) return n.errorNotify("NO_APIKEY"), !1;
                        if ("png" !== n.launchData.fileFormat && "jpg" !== n.launchData.fileFormat && "" !== n.launchData.fileFormat && (n.launchData.fileFormat = ""), "object" == typeof e.forceCropPreset ? (n.launchData.forceCropPreset = [e.forceCropPreset], n.launchData.initTool = "forcecrop") : n.launchData.forceCropPreset = null, n.launchData.initTool && (t.className += " avpw_init_hide"), n.featherUseFlash) u();
                        else {
                            if (!n.featherSupported()) return n.errorNotify("UNSUPPORTED") && (n.controlsWidgetInstance = new n.ControlsWidget, n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "placeControls", [n.util.getApiVersion(n.launchData) > 1 ? n.launchData.appendTo : void 0]), n.controlsWidgetInstance.bindControls(), a.getElementById("avpw_controls").style.display = "block", n.controlsWidgetInstance.messager.show("avpw_aviary_unsupported", !0)), !0;
                            n.util.nextFrame(u)
                        }
                        return !0
                    }, i.showWaitIndicator = function() {
                        return n.controlsWidgetInstance && n.controlsWidgetInstance.showWaitThrobber ? (n.controlsWidgetInstance.showWaitThrobber(!0), !0) : !1
                    }, i.hideWaitIndicator = function() {
                        return n.controlsWidgetInstance && n.controlsWidgetInstance.showWaitThrobber ? (n.controlsWidgetInstance.showWaitThrobber(!1), !0) : !1
                    }, i.getImageDimensions = function() {
                        var e = null;
                        return n.paintWidgetInstance && (e = n.paintWidgetInstance.getScaledSize(), n.launchData.hiresWidth && n.launchData.hiresHeight || (delete e.hiresWidth, delete e.hiresHeight)), e
                    }, i.save = function() {
                        return n.paintWidgetInstance ? n.controlsWidgetInstance.save() : !1
                    }, i.saveHiRes = function() {
                        return n.paintWidgetInstance ? n.launchData.authenticationURL ? (o.trigger("auth:update", function() {
                            n.controlsWidgetInstance.save("saveHiRes")
                        }), !0) : n.controlsWidgetInstance.save("saveHiRes") : !1
                    }, i.getImageData = function(e, t, a) {
                        return n.paintWidgetInstance ? n.controlsWidgetInstance.save("getImageData", e, t, a) : !1
                    }, i.close = function(e) {
                        return n.paintWidgetInstance ? void n.paintWidgetCloser(e) : !1
                    }, i.relaunch = function() {
                        return o.trigger("usage:interact", "api", "relaunch"), n.isRelaunched = !0, n.launchData ? void i.launch(n.launchData) : !1
                    }, i.activateTool = function(e) {
                        o.trigger("tool:open", e, n.controlsWidgetInstance)
                    }, i.replaceImage = function(e) {
                        return o.trigger("usage:interact", "api", "replaceImage"), n.launchData ? (i.close(!0), void n.util.nextFrame(function() {
                            n.launchData.url = e, i.launch(n.launchData)
                        })) : !1
                    }, i.updateConfig = function(e, t) {
                        if (!n.launchData) return !1;
                        if (e && "object" == typeof e)
                            for (var a in e) e.hasOwnProperty(a) && (n.launchData[a] = e[a]);
                        else {
                            if (!e || "string" != typeof e) return !1;
                            n.launchData[e] = t
                        }
                    }, i.getIsDirty = function() {
                        return n.paintWidgetInstance ? n.paintWidgetInstance.actions.hasMadeChanges() : !1
                    }, i.getActionList = function() {
                        return n.paintWidgetInstance ? (o.trigger("tool:commit"), n.paintWidgetInstance.actions.exportJSON(!0)) : void 0
                    }, i.disableControls = function() {
                        n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "disableControls")
                    }, i.enableControls = function() {
                        n.controlsWidgetInstance.layoutNotify(n.launchData.openType, "enableControls")
                    }, i.on = function(e, t) {
                        o && e && t && "function" == typeof t && o.on(e, t)
                    }, i.off = function(e, t) {
                        o && e && t && "function" == typeof t && o.off(e, t)
                    }, i
                }, n.loadStageFinal = function() {
                    n.feather_loaded = !0;
                    var e = function() {
                        "function" == typeof n.launchData.onLoad && n.launchData.onLoad()
                    };
                    n.launchData.authenticationURL ? o.trigger("auth:update", e) : e()
                }, n.featherSupported = function() {
                    return n.featherCanvasOk() || n.featherFlashOk() || n.launchData.forceSupport
                }, n.featherFlashOk = function() {
                    return n.launchData.forceFlash ? !0 : t.avpw_swfobject && t.avpw_swfobject.hasFlashPlayerVersion(n.build.MINIMUM_FLASH_PLAYER_VERSION)
                }, n.featherCanvasOk = function() {
                    if (n.launchData.forceFlash) return !1;
                    var e = !!a.createElement("canvas").getContext,
                        o = "function" == typeof t.postMessage;
                    return e && o
                }, n.shouldUseWebGL = function() {
                    if (n.launchData.disableWebGL) return !1;
                    var e = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
                    if (-1 === navigator.userAgent.indexOf("Chrome") && -1 === navigator.userAgent.indexOf("Firefox") && !e) return !1;
                    if (-1 !== navigator.userAgent.indexOf("Firefox")) {
                        var o = parseInt(navigator.userAgent.toLowerCase().split("firefox/")[1]);

                        if (!o || 33 > o) return !1
                    }
                    var i = a.createElement("canvas");
                    if ("undefined" == typeof t.WebGLRenderingContext) return !1;
                    if (!i || !i.getContext) return !1;
                    var r = i.getContext("webgl");
                    if (!r) return !1;
                    var s = r.getParameter(r.MAX_TEXTURE_SIZE);
                    return 4 * n.launchData.maxSize > s ? !1 : !0
                }, n.getFlashMovie = function(e) {
                    var n = t[e] || a[e];
                    return n
                }, n.msie = function() {
                    for (var e, t = 3, n = a.createElement("div"), o = n.getElementsByTagName("i"); n.innerHTML = "<!--[if gt IE " + ++t + "]><i></i><![endif]-->", o[0];);
                    return t > 4 ? t : e
                }(), n.firefox = function() {
                    var e;
                    return "Gecko" === t.navigator.product && (e = navigator.userAgent.split("Firefox/")[1], e = parseInt(e, 10)), e
                }(), e
        }(this, "undefined" != typeof window ? window : {}, "undefined" != typeof document ? document : {}), AV.S3Uploader = function() {
            function e(e, t) {
                e = atob(e);
                for (var a = new ArrayBuffer(e.length), n = new Uint8Array(a), o = 0; o < e.length; o++) n[o] = e.charCodeAt(o);
                return new Blob([a], {
                    type: t
                })
            }
            var t = {},
                a = function() {
                    return AV.build.s3SignedURLGenerator
                },
                n = function(e, t) {
                    var n = new XMLHttpRequest,
                        o = "?type=feather&content_type=" + e;
                    n.open("GET", a() + o, !0), n.onreadystatechange = function() {
                        if (4 === n.readyState) {
                            if (200 === n.status) {
                                var e;
                                try {
                                    return e = JSON.parse(n.responseText).data, t(null, e)
                                } catch (a) {
                                    return void AV.errorNotify("ERROR_SAVING")
                                }
                            }
                            return t("Could not get signed URL")
                        }
                    }, n.send()
                };
            return t.isCapable = function(e) {
                return "image/png" !== e && "image/jpg" !== e && "image/jpeg" !== e || "function" != typeof XMLHttpRequest || "function" != typeof Blob || avpw$.browser.msie || AV.util.isIE11() ? !1 : !0
            }, t.upload = function(t, a, o) {
                var i = e(a, t);
                n(t, function(e, t) {
                    if (e || !t) return void 0;
                    var a = new XMLHttpRequest;
                    a.open("PUT", t.signed_request), a.setRequestHeader("x-amz-acl", "public-read"), a.onload = function() {
                        200 === a.status && o(null, t.url)
                    }, a.onerror = function() {
                        o("Could not upload file")
                    }, a.send(i)
                })
            }, t
        }(), AV.support = function(e) {
            var t, a = e.navigator.userAgent,
                n = e.screen.width,
                o = (e.screen.height, {
                    0: /Android/i,
                    1: /webOS/i,
                    2: /iPhone/i,
                    3: /iPod/i,
                    4: /BlackBerry/i,
                    5: /iPad/i
                }),
                i = 0,
                r = 0,
                s = 0,
                l = 0;
            for (var c in o) a.match(o[c]) && (i = 1, t = parseInt(c));
            if (a.match(/AppleWebKit/i) && (r = 1), 0 === t && (s = 1), 1 === s) {
                var u = a.match(/Android [0-9].[0-9]/).toString();
                u && (l = parseFloat(u.split("Android ")[1]))
            }
            var d = {};
            return d.isAppleWebkit = function() {
                return 1 === r
            }, d.isMobileWebkit = function() {
                return 1 === r && n && (480 >= n || l > 0 && 2.3 >= l)
            }, d.isIPhoneOrIPod = function() {
                return 2 === t || 3 === t
            }, d.isAndroid = function() {
                return 1 === s
            }, d.getAndroidVersion = function() {
                return l
            }, d.getVendorProperty = function() {
                var e = {},
                    t = function(e, t) {
                        var a, n, o = ["webkit", "ms", "Moz", "O"],
                            i = e.style;
                        if (void 0 !== i[t]) return t;
                        for (t = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < o.length; n++)
                            if (a = o[n] + t, void 0 !== i[a]) return a
                    };
                return function(a) {
                    return e[a] || (e[a] = t(document.createElement("div"), a))
                }
            }(), d
        }(window)
}(window.AV || (window.AV = {}), window, document);
