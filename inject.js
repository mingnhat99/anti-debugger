(function () {
    // 1. Kill eval("debugger")
    const _eval = window.eval;
    window.eval = function (code) {
        if (typeof code === "string" && code.includes("debugger")) return;
        return _eval.call(this, code);
    };

    // 2. Kill Function("debugger")() - multiple layers
    const _Fn = window.Function;

    // 2a. Replace Function constructor entirely
    function SafeFunction() {
        var args = Array.prototype.slice.call(arguments);
        for (var i = 0; i < args.length; i++) {
            if (typeof args[i] === "string" && args[i].includes("debugger")) {
                return function () { };
            }
        }
        return _Fn.apply(this, args);
    }
    SafeFunction.prototype = _Fn.prototype;
    SafeFunction.prototype.constructor = SafeFunction;
    window.Function = SafeFunction;

    // 2b. Also patch .constructor on function instances
    var _origConstructor = (function () { }).constructor;
    Object.defineProperty(Function.prototype, "constructor", {
        get: function () {
            return SafeFunction;
        },
        set: function () { },
        configurable: true,
    });

    // 3. Kill setInterval with debugger/eval
    const _si = window.setInterval;
    window.setInterval = function (fn, ms) {
        var s = typeof fn === "function" ? fn.toString() : String(fn);
        if (s.includes("debugger") || s.includes("eval")) return 0;
        return _si.apply(this, arguments);
    };

    // 4. Block redirect location.href = "/"
    var d = Object.getOwnPropertyDescriptor(Location.prototype, "href");
    if (d) {
        Object.defineProperty(Location.prototype, "href", {
            get: d.get,
            set: function (val) {
                if (val === "/" && this.pathname !== "/") return;
                return d.set.call(this, val);
            },
            configurable: true,
        });
    }

    // 5. Disable console timing detection
    var _ct = console.table, _cl = console.log, _cc = console.clear;
    console.table = console.log = console.clear = function () { };

    // 6. Kill debugger via CSP meta tag (blocks eval-based debugger)
    var meta = document.createElement("meta");
    meta.httpEquiv = "Content-Security-Policy";
    meta.content = "script-src 'self' 'unsafe-inline' https: http:;";
    document.documentElement.appendChild(meta);

    // Restore console after page loads
    window.addEventListener("load", function () {
        setTimeout(function () {
            console.table = _ct;
            console.log = _cl;
            console.clear = _cc;
            console.log("[bypass] DevTools protection disabled. Console restored.");
        }, 3000);
    });
})();