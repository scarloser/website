const Ee = {},
  y = Symbol(),
  De = !1;
var Yt = Array.isArray,
  Lt = Array.prototype.indexOf,
  $t = Array.from,
  Ht = Object.defineProperty,
  ue = Object.getOwnPropertyDescriptor,
  jt = Object.prototype,
  qt = Array.prototype,
  Bt = Object.getPrototypeOf,
  We = Object.isExtensible;
function Ut(e) {
  for (var t = 0; t < e.length; t++) e[t]();
}
function Vt() {
  var e,
    t,
    n = new Promise((i, r) => {
      ((e = i), (t = r));
    });
  return { promise: n, resolve: e, reject: t };
}
const b = 2,
  Fe = 4,
  Le = 8,
  tt = 1 << 24,
  L = 16,
  X = 32,
  ee = 64,
  $e = 128,
  k = 512,
  m = 1024,
  R = 2048,
  $ = 4096,
  j = 8192,
  G = 16384,
  nt = 32768,
  me = 65536,
  ze = 1 << 17,
  rt = 1 << 18,
  xe = 1 << 19,
  Kt = 1 << 20,
  Q = 32768,
  Ce = 1 << 21,
  it = 1 << 22,
  ae = 1 << 23,
  Ne = Symbol("$state"),
  st = new (class extends Error {
    name = "StaleReactionError";
    message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
  })(),
  Se = 8;
function Wt() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function zt() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function Gt() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Zt() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Jt() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Qt() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function lt(e) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Xt() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let F = !1;
function ve(e) {
  F = e;
}
let A;
function ce(e) {
  if (e === null) throw (lt(), Ee);
  return (A = e);
}
function ft() {
  return ce(le(A));
}
function en(e = 1) {
  if (F) {
    for (var t = e, n = A; t--;) n = le(n);
    A = n;
  }
}
function tn(e = !0) {
  for (var t = 0, n = A; ;) {
    if (n.nodeType === Se) {
      var i = n.data;
      if (i === "]") {
        if (t === 0) return n;
        t -= 1;
      } else (i === "[" || i === "[!") && (t += 1);
    }
    var r = le(n);
    (e && n.remove(), (n = r));
  }
}
function nn(e) {
  return e === this.v;
}
let rn = !1,
  Y = null;
function be(e) {
  Y = e;
}
function sn(e, t = !1, n) {
  Y = { p: Y, i: !1, c: null, e: null, s: e, x: null, l: null };
}
function ln(e) {
  var t = Y,
    n = t.e;
  if (n !== null) {
    t.e = null;
    for (var i of n) En(i);
  }
  return ((t.i = !0), (Y = t.p), {});
}
function ut() {
  return !0;
}
let ne = [];
function fn() {
  var e = ne;
  ((ne = []), Ut(e));
}
function He(e) {
  if (ne.length === 0) {
    var t = ne;
    queueMicrotask(() => {
      t === ne && fn();
    });
  }
  ne.push(e);
}
function ot(e) {
  var t = v;
  if (t === null) return ((d.f |= ae), e);
  if ((t.f & nt) === 0) {
    if ((t.f & $e) === 0) throw e;
    t.b.error(e);
  } else Te(e, t);
}
function Te(e, t) {
  for (; t !== null;) {
    if ((t.f & $e) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (n) {
        e = n;
      }
    t = t.parent;
  }
  throw e;
}
const un = -7169;
function p(e, t) {
  e.f = (e.f & un) | t;
}
function je(e) {
  (e.f & k) !== 0 || e.deps === null ? p(e, m) : p(e, $);
}
function at(e) {
  if (e !== null) for (const t of e) (t.f & b) === 0 || (t.f & Q) === 0 || ((t.f ^= Q), at(t.deps));
}
function ct(e, t, n) {
  ((e.f & R) !== 0 ? t.add(e) : (e.f & $) !== 0 && n.add(e), at(e.deps), p(e, m));
}
const pe = new Set();
let w = null,
  N = null,
  D = [],
  qe = null,
  Ie = !1;
class C {
  committed = !1;
  current = new Map();
  previous = new Map();
  #t = new Set();
  #o = new Set();
  #r = 0;
  #l = 0;
  #i = null;
  #n = new Set();
  #e = new Set();
  skipped_effects = new Set();
  is_fork = !1;
  is_deferred() {
    return this.is_fork || this.#l > 0;
  }
  process(t) {
    ((D = []), this.apply());
    var n = [],
      i = [];
    for (const r of t) this.#s(r, n, i);
    (this.is_fork || this.#u(),
      this.is_deferred()
        ? (this.#f(i), this.#f(n))
        : ((w = null), Ge(i), Ge(n), this.#i?.resolve()),
      (N = null));
  }
  #s(t, n, i) {
    t.f ^= m;
    for (var r = t.first, s = null; r !== null;) {
      var f = r.f,
        l = (f & (X | ee)) !== 0,
        u = l && (f & m) !== 0,
        o = u || (f & j) !== 0 || this.skipped_effects.has(r);
      if (!o && r.fn !== null) {
        l
          ? (r.f ^= m)
          : s !== null && (f & (Fe | Le | tt)) !== 0
            ? s.b.defer_effect(r)
            : (f & Fe) !== 0
              ? n.push(r)
              : de(r) && ((f & L) !== 0 && this.#n.add(r), he(r));
        var _ = r.first;
        if (_ !== null) {
          r = _;
          continue;
        }
      }
      var h = r.parent;
      for (r = r.next; r === null && h !== null;)
        (h === s && (s = null), (r = h.next), (h = h.parent));
    }
  }
  #f(t) {
    for (var n = 0; n < t.length; n += 1) ct(t[n], this.#n, this.#e);
  }
  capture(t, n) {
    (n !== y && !this.previous.has(t) && this.previous.set(t, n),
      (t.f & ae) === 0 && (this.current.set(t, t.v), N?.set(t, t.v)));
  }
  activate() {
    ((w = this), this.apply());
  }
  deactivate() {
    w === this && ((w = null), (N = null));
  }
  flush() {
    if ((this.activate(), D.length > 0)) {
      if ((on(), w !== null && w !== this)) return;
    } else this.#r === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#o) t(this);
    this.#o.clear();
  }
  #u() {
    if (this.#l === 0) {
      for (const t of this.#t) t();
      this.#t.clear();
    }
    this.#r === 0 && this.#a();
  }
  #a() {
    if (pe.size > 1) {
      this.previous.clear();
      var t = N,
        n = !0;
      for (const r of pe) {
        if (r === this) {
          n = !1;
          continue;
        }
        const s = [];
        for (const [l, u] of this.current) {
          if (r.current.has(l))
            if (n && u !== r.current.get(l)) r.current.set(l, u);
            else continue;
          s.push(l);
        }
        if (s.length === 0) continue;
        const f = [...r.current.keys()].filter((l) => !this.current.has(l));
        if (f.length > 0) {
          var i = D;
          D = [];
          const l = new Set(),
            u = new Map();
          for (const o of s) _t(o, f, l, u);
          if (D.length > 0) {
            ((w = r), r.apply());
            for (const o of D) r.#s(o, [], []);
            r.deactivate();
          }
          D = i;
        }
      }
      ((w = null), (N = t));
    }
    ((this.committed = !0), pe.delete(this));
  }
  increment(t) {
    ((this.#r += 1), t && (this.#l += 1));
  }
  decrement(t) {
    ((this.#r -= 1), t && (this.#l -= 1), this.revive());
  }
  revive() {
    for (const t of this.#n) (this.#e.delete(t), p(t, R), B(t));
    for (const t of this.#e) (p(t, $), B(t));
    this.flush();
  }
  oncommit(t) {
    this.#t.add(t);
  }
  ondiscard(t) {
    this.#o.add(t);
  }
  settled() {
    return (this.#i ??= Vt()).promise;
  }
  static ensure() {
    if (w === null) {
      const t = (w = new C());
      (pe.add(w),
        C.enqueue(() => {
          w === t && t.flush();
        }));
    }
    return w;
  }
  static enqueue(t) {
    He(t);
  }
  apply() {}
}
function on() {
  var e = Z;
  Ie = !0;
  var t = null;
  try {
    var n = 0;
    for (Ae(!0); D.length > 0;) {
      var i = C.ensure();
      if (n++ > 1e3) {
        var r, s;
        an();
      }
      (i.process(D), q.clear());
    }
  } finally {
    ((Ie = !1), Ae(e), (qe = null));
  }
}
function an() {
  try {
    Wt();
  } catch (e) {
    Te(e, qe);
  }
}
let P = null;
function Ge(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t;) {
      var i = e[n++];
      if (
        (i.f & (G | j)) === 0 &&
        de(i) &&
        ((P = new Set()),
        he(i),
        i.deps === null &&
          i.first === null &&
          i.nodes === null &&
          (i.teardown === null && i.ac === null ? xt(i) : (i.fn = null)),
        P?.size > 0)
      ) {
        q.clear();
        for (const r of P) {
          if ((r.f & (G | j)) !== 0) continue;
          const s = [r];
          let f = r.parent;
          for (; f !== null;) (P.has(f) && (P.delete(f), s.push(f)), (f = f.parent));
          for (let l = s.length - 1; l >= 0; l--) {
            const u = s[l];
            (u.f & (G | j)) === 0 && he(u);
          }
        }
        P.clear();
      }
    }
    P = null;
  }
}
function _t(e, t, n, i) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const r of e.reactions) {
      const s = r.f;
      (s & b) !== 0
        ? _t(r, t, n, i)
        : (s & (it | L)) !== 0 && (s & R) === 0 && ht(r, t, i) && (p(r, R), B(r));
    }
}
function ht(e, t, n) {
  const i = n.get(e);
  if (i !== void 0) return i;
  if (e.deps !== null)
    for (const r of e.deps) {
      if (t.includes(r)) return !0;
      if ((r.f & b) !== 0 && ht(r, t, n)) return (n.set(r, !0), !0);
    }
  return (n.set(e, !1), !1);
}
function B(e) {
  for (var t = (qe = e); t.parent !== null;) {
    t = t.parent;
    var n = t.f;
    if (Ie && t === v && (n & L) !== 0 && (n & rt) === 0) return;
    if ((n & (ee | X)) !== 0) {
      if ((n & m) === 0) return;
      t.f ^= m;
    }
  }
  D.push(t);
}
function cn(e) {
  let t = 0,
    n = Ue(0),
    i;
  return () => {
    Ve() &&
      (ie(n),
      bn(
        () => (
          t === 0 && (i = On(() => e(() => oe(n)))),
          (t += 1),
          () => {
            He(() => {
              ((t -= 1), t === 0 && (i?.(), (i = void 0), oe(n)));
            });
          }
        ),
      ));
  };
}
var _n = me | xe | $e;
function hn(e, t, n) {
  new dn(e, t, n);
}
class dn {
  parent;
  is_pending = !1;
  #t;
  #o = F ? A : null;
  #r;
  #l;
  #i;
  #n = null;
  #e = null;
  #s = null;
  #f = null;
  #u = null;
  #a = 0;
  #c = 0;
  #h = !1;
  #d = new Set();
  #v = new Set();
  #_ = null;
  #E = cn(
    () => (
      (this.#_ = Ue(this.#a)),
      () => {
        this.#_ = null;
      }
    ),
  );
  constructor(t, n, i) {
    ((this.#t = t),
      (this.#r = n),
      (this.#l = i),
      (this.parent = v.b),
      (this.is_pending = !!this.#r.pending),
      (this.#i = Tn(() => {
        if (((v.b = this), F)) {
          const s = this.#o;
          (ft(),
            s.nodeType === Se && s.data === "[!"
              ? this.#b()
              : (this.#m(), this.#c === 0 && (this.is_pending = !1)));
        } else {
          var r = this.#y();
          try {
            this.#n = W(() => i(r));
          } catch (s) {
            this.error(s);
          }
          this.#c > 0 ? this.#g() : (this.is_pending = !1);
        }
        return () => {
          this.#u?.remove();
        };
      }, _n)),
      F && (this.#t = A));
  }
  #m() {
    try {
      this.#n = W(() => this.#l(this.#t));
    } catch (t) {
      this.error(t);
    }
  }
  #b() {
    const t = this.#r.pending;
    t &&
      ((this.#e = W(() => t(this.#t))),
      C.enqueue(() => {
        var n = this.#y();
        ((this.#n = this.#p(() => (C.ensure(), W(() => this.#l(n))))),
          this.#c > 0
            ? this.#g()
            : (we(this.#e, () => {
                this.#e = null;
              }),
              (this.is_pending = !1)));
      }));
  }
  #y() {
    var t = this.#t;
    return (this.is_pending && ((this.#u = mt()), this.#t.before(this.#u), (t = this.#u)), t);
  }
  defer_effect(t) {
    ct(t, this.#d, this.#v);
  }
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#r.pending;
  }
  #p(t) {
    var n = v,
      i = d,
      r = Y;
    (U(this.#i), S(this.#i), be(this.#i.ctx));
    try {
      return t();
    } catch (s) {
      return (ot(s), null);
    } finally {
      (U(n), S(i), be(r));
    }
  }
  #g() {
    const t = this.#r.pending;
    (this.#n !== null &&
      ((this.#f = document.createDocumentFragment()),
      this.#f.append(this.#u),
      xn(this.#n, this.#f)),
      this.#e === null && (this.#e = W(() => t(this.#t))));
  }
  #w(t) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#w(t);
      return;
    }
    if (((this.#c += t), this.#c === 0)) {
      this.is_pending = !1;
      for (const n of this.#d) (p(n, R), B(n));
      for (const n of this.#v) (p(n, $), B(n));
      (this.#d.clear(),
        this.#v.clear(),
        this.#e &&
          we(this.#e, () => {
            this.#e = null;
          }),
        this.#f && (this.#t.before(this.#f), (this.#f = null)));
    }
  }
  update_pending_count(t) {
    (this.#w(t), (this.#a += t), this.#_ && gt(this.#_, this.#a));
  }
  get_effect_pending() {
    return (this.#E(), ie(this.#_));
  }
  error(t) {
    var n = this.#r.onerror;
    let i = this.#r.failed;
    if (this.#h || (!n && !i)) throw t;
    (this.#n && (I(this.#n), (this.#n = null)),
      this.#e && (I(this.#e), (this.#e = null)),
      this.#s && (I(this.#s), (this.#s = null)),
      F && (ce(this.#o), en(), ce(tn())));
    var r = !1,
      s = !1;
    const f = () => {
      if (r) {
        Xt();
        return;
      }
      ((r = !0),
        s && Qt(),
        C.ensure(),
        (this.#a = 0),
        this.#s !== null &&
          we(this.#s, () => {
            this.#s = null;
          }),
        (this.is_pending = this.has_pending_snippet()),
        (this.#n = this.#p(() => ((this.#h = !1), W(() => this.#l(this.#t))))),
        this.#c > 0 ? this.#g() : (this.is_pending = !1));
    };
    var l = d;
    try {
      (S(null), (s = !0), n?.(t, f), (s = !1));
    } catch (u) {
      Te(u, this.#i && this.#i.parent);
    } finally {
      S(l);
    }
    i &&
      He(() => {
        this.#s = this.#p(() => {
          (C.ensure(), (this.#h = !0));
          try {
            return W(() => {
              i(
                this.#t,
                () => t,
                () => f,
              );
            });
          } catch (u) {
            return (Te(u, this.#i.parent), null);
          } finally {
            this.#h = !1;
          }
        });
      });
  }
}
function dt(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1) I(t[n]);
  }
}
function vn(e) {
  for (var t = e.parent; t !== null;) {
    if ((t.f & b) === 0) return (t.f & G) === 0 ? t : null;
    t = t.parent;
  }
  return null;
}
function Be(e) {
  var t,
    n = v;
  U(vn(e));
  try {
    ((e.f &= ~Q), dt(e), (t = Dt(e)));
  } finally {
    U(n);
  }
  return t;
}
function vt(e) {
  var t = Be(e);
  if (
    !e.equals(t) &&
    ((e.wv = Nt()), (!w?.is_fork || e.deps === null) && ((e.v = t), e.deps === null))
  ) {
    p(e, m);
    return;
  }
  se || (N !== null ? (Ve() || w?.is_fork) && N.set(e, t) : je(e));
}
let Pe = new Set();
const q = new Map();
let pt = !1;
function Ue(e, t) {
  var n = { f: 0, v: e, reactions: null, equals: nn, rv: 0, wv: 0 };
  return n;
}
function H(e, t) {
  const n = Ue(e);
  return (Sn(n), n);
}
function z(e, t, n = !1) {
  d !== null &&
    (!O || (d.f & ze) !== 0) &&
    ut() &&
    (d.f & (b | L | it | ze)) !== 0 &&
    !M?.includes(e) &&
    Jt();
  let i = n ? re(t) : t;
  return gt(e, i);
}
function gt(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    (se ? q.set(e, t) : q.set(e, n), (e.v = t));
    var i = C.ensure();
    if ((i.capture(e, n), (e.f & b) !== 0)) {
      const r = e;
      ((e.f & R) !== 0 && Be(r), je(r));
    }
    ((e.wv = Nt()),
      yt(e, R),
      v !== null && (v.f & m) !== 0 && (v.f & (X | ee)) === 0 && (x === null ? kn([e]) : x.push(e)),
      !i.is_fork && Pe.size > 0 && !pt && pn());
  }
  return t;
}
function pn() {
  pt = !1;
  var e = Z;
  Ae(!0);
  const t = Array.from(Pe);
  try {
    for (const n of t) ((n.f & m) !== 0 && p(n, $), de(n) && he(n));
  } finally {
    Ae(e);
  }
  Pe.clear();
}
function oe(e) {
  z(e, e.v + 1);
}
function yt(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var i = n.length, r = 0; r < i; r++) {
      var s = n[r],
        f = s.f,
        l = (f & R) === 0;
      if ((l && p(s, t), (f & b) !== 0)) {
        var u = s;
        (N?.delete(u), (f & Q) === 0 && (f & k && (s.f |= Q), yt(u, $)));
      } else l && ((f & L) !== 0 && P !== null && P.add(s), B(s));
    }
}
function re(e) {
  if (typeof e != "object" || e === null || Ne in e) return e;
  const t = Bt(e);
  if (t !== jt && t !== qt) return e;
  var n = new Map(),
    i = Yt(e),
    r = H(0),
    s = J,
    f = (l) => {
      if (J === s) return l();
      var u = d,
        o = J;
      (S(null), Qe(s));
      var _ = l();
      return (S(u), Qe(o), _);
    };
  return (
    i && n.set("length", H(e.length)),
    new Proxy(e, {
      defineProperty(l, u, o) {
        (!("value" in o) || o.configurable === !1 || o.enumerable === !1 || o.writable === !1) &&
          Gt();
        var _ = n.get(u);
        return (
          _ === void 0
            ? (_ = f(() => {
                var h = H(o.value);
                return (n.set(u, h), h);
              }))
            : z(_, o.value, !0),
          !0
        );
      },
      deleteProperty(l, u) {
        var o = n.get(u);
        if (o === void 0) {
          if (u in l) {
            const _ = f(() => H(y));
            (n.set(u, _), oe(r));
          }
        } else (z(o, y), oe(r));
        return !0;
      },
      get(l, u, o) {
        if (u === Ne) return e;
        var _ = n.get(u),
          h = u in l;
        if (
          (_ === void 0 &&
            (!h || ue(l, u)?.writable) &&
            ((_ = f(() => {
              var c = re(h ? l[u] : y),
                g = H(c);
              return g;
            })),
            n.set(u, _)),
          _ !== void 0)
        ) {
          var a = ie(_);
          return a === y ? void 0 : a;
        }
        return Reflect.get(l, u, o);
      },
      getOwnPropertyDescriptor(l, u) {
        var o = Reflect.getOwnPropertyDescriptor(l, u);
        if (o && "value" in o) {
          var _ = n.get(u);
          _ && (o.value = ie(_));
        } else if (o === void 0) {
          var h = n.get(u),
            a = h?.v;
          if (h !== void 0 && a !== y)
            return { enumerable: !0, configurable: !0, value: a, writable: !0 };
        }
        return o;
      },
      has(l, u) {
        if (u === Ne) return !0;
        var o = n.get(u),
          _ = (o !== void 0 && o.v !== y) || Reflect.has(l, u);
        if (o !== void 0 || (v !== null && (!_ || ue(l, u)?.writable))) {
          o === void 0 &&
            ((o = f(() => {
              var a = _ ? re(l[u]) : y,
                c = H(a);
              return c;
            })),
            n.set(u, o));
          var h = ie(o);
          if (h === y) return !1;
        }
        return _;
      },
      set(l, u, o, _) {
        var h = n.get(u),
          a = u in l;
        if (i && u === "length")
          for (var c = o; c < h.v; c += 1) {
            var g = n.get(c + "");
            g !== void 0 ? z(g, y) : c in l && ((g = f(() => H(y))), n.set(c + "", g));
          }
        if (h === void 0)
          (!a || ue(l, u)?.writable) && ((h = f(() => H(void 0))), z(h, re(o)), n.set(u, h));
        else {
          a = h.v !== y;
          var V = f(() => re(o));
          z(h, V);
        }
        var K = Reflect.getOwnPropertyDescriptor(l, u);
        if ((K?.set && K.set.call(_, o), !a)) {
          if (i && typeof u == "string") {
            var Ke = n.get("length"),
              ke = Number(u);
            Number.isInteger(ke) && ke >= Ke.v && z(Ke, ke + 1);
          }
          oe(r);
        }
        return !0;
      },
      ownKeys(l) {
        ie(r);
        var u = Reflect.ownKeys(l).filter((h) => {
          var a = n.get(h);
          return a === void 0 || a.v !== y;
        });
        for (var [o, _] of n) _.v !== y && !(o in l) && u.push(o);
        return u;
      },
      setPrototypeOf() {
        Zt();
      },
    })
  );
}
var Ze, wt, Et;
function Me() {
  if (Ze === void 0) {
    Ze = window;
    var e = Element.prototype,
      t = Node.prototype,
      n = Text.prototype;
    ((wt = ue(t, "firstChild").get),
      (Et = ue(t, "nextSibling").get),
      We(e) &&
        ((e.__click = void 0),
        (e.__className = void 0),
        (e.__attributes = null),
        (e.__style = void 0),
        (e.__e = void 0)),
      We(n) && (n.__t = void 0));
  }
}
function mt(e = "") {
  return document.createTextNode(e);
}
function bt(e) {
  return wt.call(e);
}
function le(e) {
  return Et.call(e);
}
function gn(e) {
  e.textContent = "";
}
function Tt(e) {
  var t = d,
    n = v;
  (S(null), U(null));
  try {
    return e();
  } finally {
    (S(t), U(n));
  }
}
function yn(e, t) {
  var n = t.last;
  n === null ? (t.last = t.first = e) : ((n.next = e), (e.prev = n), (t.last = e));
}
function fe(e, t, n) {
  var i = v;
  i !== null && (i.f & j) !== 0 && (e |= j);
  var r = {
    ctx: Y,
    deps: null,
    nodes: null,
    f: e | R | k,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: i,
    b: i && i.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null,
  };
  if (n)
    try {
      (he(r), (r.f |= nt));
    } catch (l) {
      throw (I(r), l);
    }
  else t !== null && B(r);
  var s = r;
  if (
    (n &&
      s.deps === null &&
      s.teardown === null &&
      s.nodes === null &&
      s.first === s.last &&
      (s.f & xe) === 0 &&
      ((s = s.first), (e & L) !== 0 && (e & me) !== 0 && s !== null && (s.f |= me)),
    s !== null &&
      ((s.parent = i), i !== null && yn(s, i), d !== null && (d.f & b) !== 0 && (e & ee) === 0))
  ) {
    var f = d;
    (f.effects ??= []).push(s);
  }
  return r;
}
function Ve() {
  return d !== null && !O;
}
function wn(e) {
  const t = fe(Le, null, !1);
  return (p(t, m), (t.teardown = e), t);
}
function En(e) {
  return fe(Fe | Kt, e, !1);
}
function mn(e) {
  C.ensure();
  const t = fe(ee | xe, e, !0);
  return (n = {}) =>
    new Promise((i) => {
      n.outro
        ? we(t, () => {
            (I(t), i(void 0));
          })
        : (I(t), i(void 0));
    });
}
function bn(e, t = 0) {
  return fe(Le | t, e, !0);
}
function Tn(e, t = 0) {
  var n = fe(L | t, e, !0);
  return n;
}
function W(e) {
  return fe(X | xe, e, !0);
}
function At(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = se,
      i = d;
    (Je(!0), S(null));
    try {
      t.call(null);
    } finally {
      (Je(n), S(i));
    }
  }
}
function Rt(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null;) {
    const r = n.ac;
    r !== null &&
      Tt(() => {
        r.abort(st);
      });
    var i = n.next;
    ((n.f & ee) !== 0 ? (n.parent = null) : I(n, t), (n = i));
  }
}
function An(e) {
  for (var t = e.first; t !== null;) {
    var n = t.next;
    ((t.f & X) === 0 && I(t), (t = n));
  }
}
function I(e, t = !0) {
  var n = !1;
  ((t || (e.f & rt) !== 0) &&
    e.nodes !== null &&
    e.nodes.end !== null &&
    (Rn(e.nodes.start, e.nodes.end), (n = !0)),
    Rt(e, t && !n),
    Re(e, 0),
    p(e, G));
  var i = e.nodes && e.nodes.t;
  if (i !== null) for (const s of i) s.stop();
  At(e);
  var r = e.parent;
  (r !== null && r.first !== null && xt(e),
    (e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null));
}
function Rn(e, t) {
  for (; e !== null;) {
    var n = e === t ? null : le(e);
    (e.remove(), (e = n));
  }
}
function xt(e) {
  var t = e.parent,
    n = e.prev,
    i = e.next;
  (n !== null && (n.next = i),
    i !== null && (i.prev = n),
    t !== null && (t.first === e && (t.first = i), t.last === e && (t.last = n)));
}
function we(e, t, n = !0) {
  var i = [];
  St(e, i, !0);
  var r = () => {
      (n && I(e), t && t());
    },
    s = i.length;
  if (s > 0) {
    var f = () => --s || r();
    for (var l of i) l.out(f);
  } else r();
}
function St(e, t, n) {
  if ((e.f & j) === 0) {
    e.f ^= j;
    var i = e.nodes && e.nodes.t;
    if (i !== null) for (const l of i) (l.is_global || n) && t.push(l);
    for (var r = e.first; r !== null;) {
      var s = r.next,
        f = (r.f & me) !== 0 || ((r.f & X) !== 0 && (e.f & L) !== 0);
      (St(r, t, f ? n : !1), (r = s));
    }
  }
}
function xn(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, i = e.nodes.end; n !== null;) {
      var r = n === i ? null : le(n);
      (t.append(n), (n = r));
    }
}
let Z = !1;
function Ae(e) {
  Z = e;
}
let se = !1;
function Je(e) {
  se = e;
}
let d = null,
  O = !1;
function S(e) {
  d = e;
}
let v = null;
function U(e) {
  v = e;
}
let M = null;
function Sn(e) {
  d !== null && (M === null ? (M = [e]) : M.push(e));
}
let E = null,
  T = 0,
  x = null;
function kn(e) {
  x = e;
}
let kt = 1,
  _e = 0,
  J = _e;
function Qe(e) {
  J = e;
}
function Nt() {
  return ++kt;
}
function de(e) {
  var t = e.f;
  if ((t & R) !== 0) return !0;
  if ((t & b && (e.f &= ~Q), (t & $) !== 0)) {
    for (var n = e.deps, i = n.length, r = 0; r < i; r++) {
      var s = n[r];
      if ((de(s) && vt(s), s.wv > e.wv)) return !0;
    }
    (t & k) !== 0 && N === null && p(e, m);
  }
  return !1;
}
function Ot(e, t, n = !0) {
  var i = e.reactions;
  if (i !== null && !M?.includes(e))
    for (var r = 0; r < i.length; r++) {
      var s = i[r];
      (s.f & b) !== 0 ? Ot(s, t, !1) : t === s && (n ? p(s, R) : (s.f & m) !== 0 && p(s, $), B(s));
    }
}
function Dt(e) {
  var t = E,
    n = T,
    i = x,
    r = d,
    s = M,
    f = Y,
    l = O,
    u = J,
    o = e.f;
  ((E = null),
    (T = 0),
    (x = null),
    (d = (o & (X | ee)) === 0 ? e : null),
    (M = null),
    be(e.ctx),
    (O = !1),
    (J = ++_e),
    e.ac !== null &&
      (Tt(() => {
        e.ac.abort(st);
      }),
      (e.ac = null)));
  try {
    e.f |= Ce;
    var _ = e.fn,
      h = _(),
      a = e.deps;
    if (E !== null) {
      var c;
      if ((Re(e, T), a !== null && T > 0))
        for (a.length = T + E.length, c = 0; c < E.length; c++) a[T + c] = E[c];
      else e.deps = a = E;
      if (Ve() && (e.f & k) !== 0) for (c = T; c < a.length; c++) (a[c].reactions ??= []).push(e);
    } else a !== null && T < a.length && (Re(e, T), (a.length = T));
    if (ut() && x !== null && !O && a !== null && (e.f & (b | $ | R)) === 0)
      for (c = 0; c < x.length; c++) Ot(x[c], e);
    return (
      r !== null && r !== e && (_e++, x !== null && (i === null ? (i = x) : i.push(...x))),
      (e.f & ae) !== 0 && (e.f ^= ae),
      h
    );
  } catch (g) {
    return ot(g);
  } finally {
    ((e.f ^= Ce), (E = t), (T = n), (x = i), (d = r), (M = s), be(f), (O = l), (J = u));
  }
}
function Nn(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var i = Lt.call(n, e);
    if (i !== -1) {
      var r = n.length - 1;
      r === 0 ? (n = t.reactions = null) : ((n[i] = n[r]), n.pop());
    }
  }
  if (n === null && (t.f & b) !== 0 && (E === null || !E.includes(t))) {
    var s = t;
    ((s.f & k) !== 0 && ((s.f ^= k), (s.f &= ~Q)), je(s), dt(s), Re(s, 0));
  }
}
function Re(e, t) {
  var n = e.deps;
  if (n !== null) for (var i = t; i < n.length; i++) Nn(e, n[i]);
}
function he(e) {
  var t = e.f;
  if ((t & G) === 0) {
    p(e, m);
    var n = v,
      i = Z;
    ((v = e), (Z = !0));
    try {
      ((t & (L | tt)) !== 0 ? An(e) : Rt(e), At(e));
      var r = Dt(e);
      ((e.teardown = typeof r == "function" ? r : null), (e.wv = kt));
      var s;
      De && rn && (e.f & R) !== 0 && e.deps;
    } finally {
      ((Z = i), (v = n));
    }
  }
}
function ie(e) {
  var t = e.f,
    n = (t & b) !== 0;
  if (d !== null && !O) {
    var i = v !== null && (v.f & G) !== 0;
    if (!i && !M?.includes(e)) {
      var r = d.deps;
      if ((d.f & Ce) !== 0)
        e.rv < _e &&
          ((e.rv = _e),
          E === null && r !== null && r[T] === e
            ? T++
            : E === null
              ? (E = [e])
              : E.includes(e) || E.push(e));
      else {
        (d.deps ??= []).push(e);
        var s = e.reactions;
        s === null ? (e.reactions = [d]) : s.includes(d) || s.push(d);
      }
    }
  }
  if (se && q.has(e)) return q.get(e);
  if (n) {
    var f = e;
    if (se) {
      var l = f.v;
      return ((((f.f & m) === 0 && f.reactions !== null) || Ct(f)) && (l = Be(f)), q.set(f, l), l);
    }
    var u = (f.f & k) === 0 && !O && d !== null && (Z || (d.f & k) !== 0),
      o = f.deps === null;
    (de(f) && (u && (f.f |= k), vt(f)), u && !o && Ft(f));
  }
  if (N?.has(e)) return N.get(e);
  if ((e.f & ae) !== 0) throw e.v;
  return e.v;
}
function Ft(e) {
  if (e.deps !== null) {
    e.f |= k;
    for (const t of e.deps)
      ((t.reactions ??= []).push(e), (t.f & b) !== 0 && (t.f & k) === 0 && Ft(t));
  }
}
function Ct(e) {
  if (e.v === y) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps) if (q.has(t) || ((t.f & b) !== 0 && Ct(t))) return !0;
  return !1;
}
function On(e) {
  var t = O;
  try {
    return ((O = !0), e());
  } finally {
    O = t;
  }
}
const Dn = new Set(),
  Xe = new Set();
let et = null;
function ge(e) {
  var t = this,
    n = t.ownerDocument,
    i = e.type,
    r = e.composedPath?.() || [],
    s = r[0] || e.target;
  et = e;
  var f = 0,
    l = et === e && e.__root;
  if (l) {
    var u = r.indexOf(l);
    if (u !== -1 && (t === document || t === window)) {
      e.__root = t;
      return;
    }
    var o = r.indexOf(t);
    if (o === -1) return;
    u <= o && (f = u);
  }
  if (((s = r[f] || e.target), s !== t)) {
    Ht(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      },
    });
    var _ = d,
      h = v;
    (S(null), U(null));
    try {
      for (var a, c = []; s !== null;) {
        var g = s.assignedSlot || s.parentNode || s.host || null;
        try {
          var V = s["__" + i];
          V != null && (!s.disabled || e.target === s) && V.call(s, e);
        } catch (K) {
          a ? c.push(K) : (a = K);
        }
        if (e.cancelBubble || g === t || g === null) break;
        s = g;
      }
      if (a) {
        for (let K of c)
          queueMicrotask(() => {
            throw K;
          });
        throw a;
      }
    } finally {
      ((e.__root = t), delete e.currentTarget, S(_), U(h));
    }
  }
}
function Fn(e) {
  var t = document.createElement("template");
  return ((t.innerHTML = e.replaceAll("<!>", "<!---->")), t.content);
}
function It(e, t) {
  var n = v;
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
const Cn = ["touchstart", "touchmove"];
function In(e) {
  return Cn.includes(e);
}
function Pt(e, t) {
  return Mt(e, t);
}
function Pn(e, t) {
  (Me(), (t.intro = t.intro ?? !1));
  const n = t.target,
    i = F,
    r = A;
  try {
    for (var s = bt(n); s && (s.nodeType !== Se || s.data !== "[");) s = le(s);
    if (!s) throw Ee;
    (ve(!0), ce(s));
    const f = Mt(e, { ...t, anchor: s });
    return (ve(!1), f);
  } catch (f) {
    if (
      f instanceof Error &&
      f.message
        .split(
          `
`,
        )
        .some((l) => l.startsWith("https://svelte.dev/e/"))
    )
      throw f;
    return (
      f !== Ee && console.warn("Failed to hydrate: ", f),
      t.recover === !1 && zt(),
      Me(),
      gn(n),
      ve(!1),
      Pt(e, t)
    );
  } finally {
    (ve(i), ce(r));
  }
}
const te = new Map();
function Mt(e, { target: t, anchor: n, props: i = {}, events: r, context: s, intro: f = !0 }) {
  Me();
  var l = new Set(),
    u = (h) => {
      for (var a = 0; a < h.length; a++) {
        var c = h[a];
        if (!l.has(c)) {
          l.add(c);
          var g = In(c);
          t.addEventListener(c, ge, { passive: g });
          var V = te.get(c);
          V === void 0
            ? (document.addEventListener(c, ge, { passive: g }), te.set(c, 1))
            : te.set(c, V + 1);
        }
      }
    };
  (u($t(Dn)), Xe.add(u));
  var o = void 0,
    _ = mn(() => {
      var h = n ?? t.appendChild(mt());
      return (
        hn(h, { pending: () => {} }, (a) => {
          if (s) {
            sn({});
            var c = Y;
            c.c = s;
          }
          if (
            (r && (i.$$events = r),
            F && It(a, null),
            (o = e(a, i) || {}),
            F && ((v.nodes.end = A), A === null || A.nodeType !== Se || A.data !== "]"))
          )
            throw (lt(), Ee);
          s && ln();
        }),
        () => {
          for (var a of l) {
            t.removeEventListener(a, ge);
            var c = te.get(a);
            --c === 0 ? (document.removeEventListener(a, ge), te.delete(a)) : te.set(a, c);
          }
          (Xe.delete(u), h !== n && h.parentNode?.removeChild(h));
        }
      );
    });
  return (Ye.set(o, _), o);
}
let Ye = new WeakMap();
function Mn(e, t) {
  const n = Ye.get(e);
  return n ? (Ye.delete(e), n(t)) : Promise.resolve();
}
function ye(e) {
  return (t, ...n) => {
    var i = e(...n),
      r;
    if (F) ((r = A), ft());
    else {
      var s = i.render().trim(),
        f = Fn(s);
      ((r = bt(f)), t.before(r));
    }
    const l = i.setup?.(r);
    (It(r, r), typeof l == "function" && wn(l));
  };
}
const Oe = new WeakMap();
var $n =
  (e) =>
  async (t, n, i, { client: r }) => {
    if (!e.hasAttribute("ssr")) return;
    let s,
      f,
      l = {};
    for (const [o, _] of Object.entries(i))
      ((f ??= {}),
        o === "default"
          ? ((f.default = !0), (s = ye(() => ({ render: () => `<astro-slot>${_}</astro-slot>` }))))
          : (f[o] = ye(() => ({ render: () => `<astro-slot name="${o}">${_}</astro-slot>` }))),
        o === "default"
          ? (l.children = ye(() => ({ render: () => `<astro-slot>${_}</astro-slot>` })))
          : (l[o] = ye(() => ({ render: () => `<astro-slot name="${o}">${_}</astro-slot>` }))));
    const u = { ...n, children: s, $$slots: f, ...l };
    if (Oe.has(e)) Oe.get(e).setProps(u);
    else {
      const o = Yn(t, e, u, r !== "only");
      (Oe.set(e, o), e.addEventListener("astro:unmount", () => o.destroy(), { once: !0 }));
    }
  };
function Yn(e, t, n, i) {
  let r = re(n);
  const s = i ? Pn : Pt;
  i || (t.innerHTML = "");
  const f = s(e, { target: t, props: r });
  return {
    setProps(l) {
      Object.assign(r, l);
      for (const u in r) u in l || delete r[u];
    },
    destroy() {
      Mn(f);
    },
  };
}
export { $n as default };
