// Acorn: Copyright 2012 Marijn Haverbeke, MIT License
var mod$$inline_58 = function (a) {
  function b(a) {
    n = a || {};
    for (var b in Ua)
      Object.prototype.hasOwnProperty.call(n, b) || (n[b] = Ua[b]);
    wa = n.sourceFile || null;
  }
  function c(a, b) {
    var c = Ab(k, a);
    b += " (" + c.line + ":" + c.column + ")";
    var d = new SyntaxError(b);
    d.pos = a;
    d.loc = c;
    d.raisedAt = f;
    throw d;
  }
  function d(a) {
    function b(a) {
      if (1 == a.length)
        return (c += "return str === " + JSON.stringify(a[0]) + ";");
      c += "switch(str){";
      for (var va = 0; va < a.length; ++va)
        c += "case " + JSON.stringify(a[va]) + ":";
      c += "return true}return false;";
    }
    a = a.split(" ");
    var c = "",
      d = [],
      e = 0;
    a: for (; e < a.length; ++e) {
      for (var g = 0; g < d.length; ++g)
        if (d[g][0].length == a[e].length) {
          d[g].push(a[e]);
          continue a;
        }
      d.push([a[e]]);
    }
    if (3 < d.length) {
      d.sort(function (a, b) {
        return b.length - a.length;
      });
      c += "switch(str.length){";
      for (e = 0; e < d.length; ++e)
        (a = d[e]), (c += "case " + a[0].length + ":"), b(a);
      c += "}";
    } else b(a);
    return new Function("str", c);
  }
  function e() {
    this.line = G;
    this.column = f - D;
  }
  function g(a, b) {
    X = f;
    n.locations && (ia = new e());
    p = a;
    l();
    H = b;
    R = a.beforeExpr;
  }
  function h() {
    for (
      var a = f,
        b = n.onComment && n.locations && new e(),
        c = k.charCodeAt((f += 2));
      f < S && 10 !== c && 13 !== c && 8232 !== c && 8233 !== c;

    )
      ++f, (c = k.charCodeAt(f));
    if (n.onComment)
      n.onComment(!1, k.slice(a + 2, f), a, f, b, n.locations && new e());
  }
  function l() {
    for (; f < S; ) {
      var a = k.charCodeAt(f);
      if (32 === a) ++f;
      else if (13 === a)
        ++f,
          (a = k.charCodeAt(f)),
          10 === a && ++f,
          n.locations && (++G, (D = f));
      else if (10 === a || 8232 === a || 8233 === a)
        ++f, n.locations && (++G, (D = f));
      else if (8 < a && 14 > a) ++f;
      else if (47 === a)
        if (((a = k.charCodeAt(f + 1)), 42 === a)) {
          var a = n.onComment && n.locations && new e(),
            b = f,
            d = k.indexOf("*/", (f += 2));
          -1 === d && c(f - 2, "Unterminated comment");
          f = d + 2;
          if (n.locations) {
            Y.lastIndex = b;
            for (var g = void 0; (g = Y.exec(k)) && g.index < f; )
              ++G, (D = g.index + g[0].length);
          }
          if (n.onComment)
            n.onComment(!0, k.slice(b + 2, d), b, f, a, n.locations && new e());
        } else if (47 === a) h();
        else break;
      else if (160 === a) ++f;
      else if (5760 <= a && Bb.test(String.fromCharCode(a))) ++f;
      else break;
    }
  }
  function m(a) {
    switch (a) {
      case 46:
        return (
          (a = k.charCodeAt(f + 1)),
          48 <= a && 57 >= a ? (a = P(!0)) : (++f, (a = g(xa))),
          a
        );
      case 40:
        return ++f, g(I);
      case 41:
        return ++f, g(E);
      case 59:
        return ++f, g(J);
      case 44:
        return ++f, g(L);
      case 91:
        return ++f, g(ja);
      case 93:
        return ++f, g(ka);
      case 123:
        return ++f, g(Z);
      case 125:
        return ++f, g(T);
      case 58:
        return ++f, g(aa);
      case 63:
        return ++f, g(ya);
      case 48:
        if (((a = k.charCodeAt(f + 1)), 120 === a || 88 === a))
          return (
            (f += 2),
            (a = B(16)),
            null == a && c(x + 2, "Expected hexadecimal number"),
            la(k.charCodeAt(f)) && c(f, "Identifier directly after number"),
            (a = g(ba, a))
          );
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return P(!1);
      case 34:
      case 39:
        a: {
          f++;
          for (var b = ""; ; ) {
            f >= S && c(x, "Unterminated string constant");
            var d = k.charCodeAt(f);
            if (d === a) {
              ++f;
              a = g(da, b);
              break a;
            }
            if (92 === d) {
              var d = k.charCodeAt(++f),
                e = /^[0-7]+/.exec(k.slice(f, f + 3));
              for (e && (e = e[0]); e && 255 < parseInt(e, 8); )
                e = e.slice(0, -1);
              "0" === e && (e = null);
              ++f;
              if (e)
                C && c(f - 2, "Octal literal in strict mode"),
                  (b += String.fromCharCode(parseInt(e, 8))),
                  (f += e.length - 1);
              else
                switch (d) {
                  case 110:
                    b += "\n";
                    break;
                  case 114:
                    b += "\r";
                    break;
                  case 120:
                    b += String.fromCharCode(ma(2));
                    break;
                  case 117:
                    b += String.fromCharCode(ma(4));
                    break;
                  case 85:
                    b += String.fromCharCode(ma(8));
                    break;
                  case 116:
                    b += "\t";
                    break;
                  case 98:
                    b += "\b";
                    break;
                  case 118:
                    b += "\x0B";
                    break;
                  case 102:
                    b += "\f";
                    break;
                  case 48:
                    b += "\x00";
                    break;
                  case 13:
                    10 === k.charCodeAt(f) && ++f;
                  case 10:
                    n.locations && ((D = f), ++G);
                    break;
                  default:
                    b += String.fromCharCode(d);
                }
            } else
              (13 !== d && 10 !== d && 8232 !== d && 8233 !== d) ||
                c(x, "Unterminated string constant"),
                (b += String.fromCharCode(d)),
                ++f;
          }
        }
        return a;
      case 47:
        return (
          (a = k.charCodeAt(f + 1)),
          R ? (++f, (a = K())) : (a = 61 === a ? t(U, 2) : t(za, 1)),
          a
        );
      case 37:
      case 42:
        return (
          (a = k.charCodeAt(f + 1)), (a = 61 === a ? t(U, 2) : t(Cb, 1)), a
        );
      case 124:
      case 38:
        return (
          (b = k.charCodeAt(f + 1)),
          (a =
            b === a
              ? t(124 === a ? Va : Wa, 2)
              : 61 === b
              ? t(U, 2)
              : t(124 === a ? Db : Eb, 1)),
          a
        );
      case 94:
        return (
          (a = k.charCodeAt(f + 1)), (a = 61 === a ? t(U, 2) : t(Fb, 1)), a
        );
      case 43:
      case 45:
        return (
          (b = k.charCodeAt(f + 1)),
          b === a
            ? 45 == b && 62 == k.charCodeAt(f + 2) && na.test(k.slice(M, f))
              ? ((f += 3), h(), l(), (a = z()))
              : (a = t(Gb, 2))
            : (a = 61 === b ? t(U, 2) : t(Hb, 1)),
          a
        );
      case 60:
      case 62:
        return (
          (b = k.charCodeAt(f + 1)),
          (d = 1),
          b === a
            ? ((d = 62 === a && 62 === k.charCodeAt(f + 2) ? 3 : 2),
              (a = 61 === k.charCodeAt(f + d) ? t(U, d + 1) : t(Ib, d)))
            : 33 == b &&
              60 == a &&
              45 == k.charCodeAt(f + 2) &&
              45 == k.charCodeAt(f + 3)
            ? ((f += 4), h(), l(), (a = z()))
            : (61 === b && (d = 61 === k.charCodeAt(f + 2) ? 3 : 2),
              (a = t(Jb, d))),
          a
        );
      case 61:
      case 33:
        return (
          (b = k.charCodeAt(f + 1)),
          (a =
            61 === b
              ? t(Kb, 61 === k.charCodeAt(f + 2) ? 3 : 2)
              : t(61 === a ? Aa : Xa, 1)),
          a
        );
      case 126:
        return t(Xa, 1);
    }
    return !1;
  }
  function z(a) {
    a ? (f = x + 1) : (x = f);
    n.locations && (oa = new e());
    if (a) return K();
    if (f >= S) return g(pa);
    var b = k.charCodeAt(f);
    if (la(b) || 92 === b) return Ya();
    a = m(b);
    if (!1 === a) {
      b = String.fromCharCode(b);
      if ("\\" === b || Za.test(b)) return Ya();
      c(f, "Unexpected character '" + b + "'");
    }
    return a;
  }
  function t(a, b) {
    var c = k.slice(f, f + b);
    f += b;
    g(a, c);
  }
  function K() {
    for (var a, b, d = f; ; ) {
      f >= S && c(d, "Unterminated regular expression");
      var e = k.charAt(f);
      na.test(e) && c(d, "Unterminated regular expression");
      if (a) a = !1;
      else {
        if ("[" === e) b = !0;
        else if ("]" === e && b) b = !1;
        else if ("/" === e && !b) break;
        a = "\\" === e;
      }
      ++f;
    }
    a = k.slice(d, f);
    ++f;
    (b = $a()) && !/^[gmsiy]*$/.test(b) && c(d, "Invalid regexp flag");
    return g(Ba, new RegExp(a, b));
  }
  function B(a, b) {
    for (var c = f, d = 0, e = 0, g = null == b ? Infinity : b; e < g; ++e) {
      var h = k.charCodeAt(f),
        h =
          97 <= h
            ? h - 97 + 10
            : 65 <= h
            ? h - 65 + 10
            : 48 <= h && 57 >= h
            ? h - 48
            : Infinity;
      if (h >= a) break;
      ++f;
      d = d * a + h;
    }
    return f === c || (null != b && f - c !== b) ? null : d;
  }
  function P(a) {
    var b = f,
      d = !1,
      e = 48 === k.charCodeAt(f);
    a || null !== B(10) || c(b, "Invalid number");
    46 === k.charCodeAt(f) && (++f, B(10), (d = !0));
    a = k.charCodeAt(f);
    if (69 === a || 101 === a)
      (a = k.charCodeAt(++f)),
        (43 !== a && 45 !== a) || ++f,
        null === B(10) && c(b, "Invalid number"),
        (d = !0);
    la(k.charCodeAt(f)) && c(f, "Identifier directly after number");
    a = k.slice(b, f);
    var h;
    d
      ? (h = parseFloat(a))
      : e && 1 !== a.length
      ? /[89]/.test(a) || C
        ? c(b, "Invalid number")
        : (h = parseInt(a, 8))
      : (h = parseInt(a, 10));
    return g(ba, h);
  }
  function ma(a) {
    a = B(16, a);
    null === a && c(x, "Bad character escape sequence");
    return a;
  }
  function $a() {
    ca = !1;
    for (var a, b = !0, d = f; ; ) {
      var e = k.charCodeAt(f);
      if (ab(e)) ca && (a += k.charAt(f)), ++f;
      else if (92 === e) {
        ca || (a = k.slice(d, f));
        ca = !0;
        117 != k.charCodeAt(++f) &&
          c(f, "Expecting Unicode escape sequence \\uXXXX");
        ++f;
        var e = ma(4),
          g = String.fromCharCode(e);
        g || c(f - 1, "Invalid Unicode escape");
        (b ? la(e) : ab(e)) || c(f - 4, "Invalid Unicode escape");
        a += g;
      } else break;
      b = !1;
    }
    return ca ? a : k.slice(d, f);
  }
  function Ya() {
    var a = $a(),
      b = V;
    ca ||
      (Lb(a)
        ? (b = Ca[a])
        : ((n.forbidReserved && (3 === n.ecmaVersion ? Mb : Nb)(a)) ||
            (C && bb(a))) &&
          c(x, "The keyword '" + a + "' is reserved"));
    return g(b, a);
  }
  function r() {
    Da = x;
    M = X;
    Ea = ia;
    z();
  }
  function Fa(a) {
    C = a;
    f = M;
    if (n.locations) for (; f < D; ) (D = k.lastIndexOf("\n", D - 2) + 1), --G;
    l();
    z();
  }
  function cb() {
    this.type = null;
    this.start = x;
    this.end = null;
  }
  function db() {
    this.start = oa;
    this.end = null;
    null !== wa && (this.source = wa);
  }
  function y() {
    var a = new cb();
    n.locations && (a.loc = new db());
    n.directSourceFile && (a.sourceFile = n.directSourceFile);
    n.ranges && (a.range = [x, 0]);
    return a;
  }
  function Q(a) {
    var b = new cb();
    b.start = a.start;
    n.locations && ((b.loc = new db()), (b.loc.start = a.loc.start));
    n.ranges && (b.range = [a.range[0], 0]);
    return b;
  }
  function q(a, b) {
    a.type = b;
    a.end = M;
    n.locations && (a.loc.end = Ea);
    n.ranges && (a.range[1] = M);
    return a;
  }
  function Ga(a) {
    return (
      5 <= n.ecmaVersion &&
      "ExpressionStatement" === a.type &&
      "Literal" === a.expression.type &&
      "use strict" === a.expression.value
    );
  }
  function u(a) {
    if (p === a) return r(), !0;
  }
  function qa() {
    return (
      !n.strictSemicolons && (p === pa || p === T || na.test(k.slice(M, x)))
    );
  }
  function W() {
    u(J) || qa() || N();
  }
  function v(a) {
    p === a ? r() : N();
  }
  function N() {
    c(x, "Unexpected token");
  }
  function ra(a) {
    "Identifier" !== a.type &&
      "MemberExpression" !== a.type &&
      c(a.start, "Assigning to rvalue");
    C &&
      "Identifier" === a.type &&
      sa(a.name) &&
      c(a.start, "Assigning to " + a.name + " in strict mode");
  }
  function F() {
    (p === za || (p === U && "/=" == H)) && z(!0);
    var a = p,
      b = y();
    switch (a) {
      case Ha:
      case eb:
        r();
        var d = a === Ha;
        u(J) || qa()
          ? (b.label = null)
          : p !== V
          ? N()
          : ((b.label = O()), W());
        for (var e = 0; e < w.length; ++e) {
          var g = w[e];
          if (null == b.label || g.name === b.label.name) {
            if (null != g.kind && (d || "loop" === g.kind)) break;
            if (b.label && d) break;
          }
        }
        e === w.length && c(b.start, "Unsyntactic " + a.keyword);
        return q(b, d ? "BreakStatement" : "ContinueStatement");
      case fb:
        return r(), W(), q(b, "DebuggerStatement");
      case gb:
        return (
          r(),
          w.push(Ia),
          (b.body = F()),
          w.pop(),
          v(Ja),
          (b.test = ea()),
          W(),
          q(b, "DoWhileStatement")
        );
      case hb:
        r();
        w.push(Ia);
        v(I);
        if (p === J) return Ka(b, null);
        if (p === La)
          return (
            (a = y()),
            r(),
            ib(a, !0),
            q(a, "VariableDeclaration"),
            1 === a.declarations.length && u(ta) ? jb(b, a) : Ka(b, a)
          );
        a = A(!1, !0);
        return u(ta) ? (ra(a), jb(b, a)) : Ka(b, a);
      case Ma:
        return r(), Na(b, !0);
      case kb:
        return (
          r(),
          (b.test = ea()),
          (b.consequent = F()),
          (b.alternate = u(lb) ? F() : null),
          q(b, "IfStatement")
        );
      case mb:
        return (
          fa || c(x, "'return' outside of function"),
          r(),
          u(J) || qa() ? (b.argument = null) : ((b.argument = A()), W()),
          q(b, "ReturnStatement")
        );
      case Oa:
        r();
        b.discriminant = ea();
        b.cases = [];
        v(Z);
        for (w.push(Ob); p != T; )
          p === Pa || p === nb
            ? ((a = p === Pa),
              e && q(e, "SwitchCase"),
              b.cases.push((e = y())),
              (e.consequent = []),
              r(),
              a
                ? (e.test = A())
                : (d && c(Da, "Multiple default clauses"),
                  (d = !0),
                  (e.test = null)),
              v(aa))
            : (e || N(), e.consequent.push(F()));
        e && q(e, "SwitchCase");
        r();
        w.pop();
        return q(b, "SwitchStatement");
      case ob:
        return (
          r(),
          na.test(k.slice(M, x)) && c(M, "Illegal newline after throw"),
          (b.argument = A()),
          W(),
          q(b, "ThrowStatement")
        );
      case pb:
        return (
          r(),
          (b.block = ga()),
          (b.handler = null),
          p === qb &&
            ((a = y()),
            r(),
            v(I),
            (a.param = O()),
            C &&
              sa(a.param.name) &&
              c(a.param.start, "Binding " + a.param.name + " in strict mode"),
            v(E),
            (a.guard = null),
            (a.body = ga()),
            (b.handler = q(a, "CatchClause"))),
          (b.guardedHandlers = rb),
          (b.finalizer = u(sb) ? ga() : null),
          b.handler ||
            b.finalizer ||
            c(b.start, "Missing catch or finally clause"),
          q(b, "TryStatement")
        );
      case La:
        return r(), ib(b), W(), q(b, "VariableDeclaration");
      case Ja:
        return (
          r(),
          (b.test = ea()),
          w.push(Ia),
          (b.body = F()),
          w.pop(),
          q(b, "WhileStatement")
        );
      case tb:
        return (
          C && c(x, "'with' in strict mode"),
          r(),
          (b.object = ea()),
          (b.body = F()),
          q(b, "WithStatement")
        );
      case Z:
        return ga();
      case J:
        return r(), q(b, "EmptyStatement");
      default:
        d = H;
        g = A();
        if (a === V && "Identifier" === g.type && u(aa)) {
          for (e = 0; e < w.length; ++e)
            w[e].name === d &&
              c(g.start, "Label '" + d + "' is already declared");
          a = p.isLoop ? "loop" : p === Oa ? "switch" : null;
          w.push({ name: d, kind: a });
          b.body = F();
          w.pop();
          b.label = g;
          return q(b, "LabeledStatement");
        }
        b.expression = g;
        W();
        return q(b, "ExpressionStatement");
    }
  }
  function ea() {
    v(I);
    var a = A();
    v(E);
    return a;
  }
  function ga(a) {
    var b = y(),
      c = !0,
      d = !1,
      e;
    b.body = [];
    for (v(Z); !u(T); ) {
      var g = F();
      b.body.push(g);
      c && a && Ga(g) && ((e = d), Fa((d = !0)));
      c = !1;
    }
    d && !e && Fa(!1);
    return q(b, "BlockStatement");
  }
  function Ka(a, b) {
    a.init = b;
    v(J);
    a.test = p === J ? null : A();
    v(J);
    a.update = p === E ? null : A();
    v(E);
    a.body = F();
    w.pop();
    return q(a, "ForStatement");
  }
  function jb(a, b) {
    a.left = b;
    a.right = A();
    v(E);
    a.body = F();
    w.pop();
    return q(a, "ForInStatement");
  }
  function ib(a, b) {
    a.declarations = [];
    for (a.kind = "var"; ; ) {
      var d = y();
      d.id = O();
      C &&
        sa(d.id.name) &&
        c(d.id.start, "Binding " + d.id.name + " in strict mode");
      d.init = u(Aa) ? A(!0, b) : null;
      a.declarations.push(q(d, "VariableDeclarator"));
      if (!u(L)) break;
    }
    return a;
  }
  function A(a, b) {
    var c = Qa(b);
    if (!a && p === L) {
      var d = Q(c);
      for (d.expressions = [c]; u(L); ) d.expressions.push(Qa(b));
      return q(d, "SequenceExpression");
    }
    return c;
  }
  function Qa(a) {
    var b;
    b = a;
    var c;
    c = b;
    c = Ra(Sa(), -1, c);
    if (u(ya)) {
      var d = Q(c);
      d.test = c;
      d.consequent = A(!0);
      v(aa);
      d.alternate = A(!0, b);
      b = q(d, "ConditionalExpression");
    } else b = c;
    return p.isAssign
      ? ((c = Q(b)),
        (c.operator = H),
        (c.left = b),
        r(),
        (c.right = Qa(a)),
        ra(b),
        q(c, "AssignmentExpression"))
      : b;
  }
  function Ra(a, b, c) {
    var d = p.binop;
    if (null != d && (!c || p !== ta) && d > b) {
      var e = Q(a);
      e.left = a;
      e.operator = H;
      a = p;
      r();
      e.right = Ra(Sa(), d, c);
      d = q(e, a === Va || a === Wa ? "LogicalExpression" : "BinaryExpression");
      return Ra(d, b, c);
    }
    return a;
  }
  function Sa() {
    if (p.prefix) {
      var a = y(),
        b = p.isUpdate;
      a.operator = H;
      R = a.prefix = !0;
      r();
      a.argument = Sa();
      b
        ? ra(a.argument)
        : C &&
          "delete" === a.operator &&
          "Identifier" === a.argument.type &&
          c(a.start, "Deleting local variable in strict mode");
      return q(a, b ? "UpdateExpression" : "UnaryExpression");
    }
    for (b = ha(ua()); p.postfix && !qa(); )
      (a = Q(b)),
        (a.operator = H),
        (a.prefix = !1),
        (a.argument = b),
        ra(b),
        r(),
        (b = q(a, "UpdateExpression"));
    return b;
  }
  function ha(a, b) {
    if (u(xa)) {
      var c = Q(a);
      c.object = a;
      c.property = O(!0);
      c.computed = !1;
      return ha(q(c, "MemberExpression"), b);
    }
    return u(ja)
      ? ((c = Q(a)),
        (c.object = a),
        (c.property = A()),
        (c.computed = !0),
        v(ka),
        ha(q(c, "MemberExpression"), b))
      : !b && u(I)
      ? ((c = Q(a)),
        (c.callee = a),
        (c.arguments = Ta(E, !1)),
        ha(q(c, "CallExpression"), b))
      : a;
  }
  function ua() {
    switch (p) {
      case ub:
        var a = y();
        r();
        return q(a, "ThisExpression");
      case V:
        return O();
      case ba:
      case da:
      case Ba:
        return (
          (a = y()),
          (a.value = H),
          (a.raw = k.slice(x, X)),
          r(),
          q(a, "Literal")
        );
      case vb:
      case wb:
      case xb:
        return (
          (a = y()),
          (a.value = p.atomValue),
          (a.raw = p.keyword),
          r(),
          q(a, "Literal")
        );
      case I:
        var a = oa,
          b = x;
        r();
        var d = A();
        d.start = b;
        d.end = X;
        n.locations && ((d.loc.start = a), (d.loc.end = ia));
        n.ranges && (d.range = [b, X]);
        v(E);
        return d;
      case ja:
        return (
          (a = y()), r(), (a.elements = Ta(ka, !0, !0)), q(a, "ArrayExpression")
        );
      case Z:
        a = y();
        b = !0;
        d = !1;
        a.properties = [];
        for (r(); !u(T); ) {
          if (b) b = !1;
          else if ((v(L), n.allowTrailingCommas && u(T))) break;
          var e = { key: p === ba || p === da ? ua() : O(!0) },
            g = !1,
            h;
          u(aa)
            ? ((e.value = A(!0)), (h = e.kind = "init"))
            : 5 <= n.ecmaVersion &&
              "Identifier" === e.key.type &&
              ("get" === e.key.name || "set" === e.key.name)
            ? ((g = d = !0),
              (h = e.kind = e.key.name),
              (e.key = p === ba || p === da ? ua() : O(!0)),
              p !== I && N(),
              (e.value = Na(y(), !1)))
            : N();
          if ("Identifier" === e.key.type && (C || d))
            for (var f = 0; f < a.properties.length; ++f) {
              var l = a.properties[f];
              if (l.key.name === e.key.name) {
                var m =
                  h == l.kind ||
                  (g && "init" === l.kind) ||
                  ("init" === h && ("get" === l.kind || "set" === l.kind));
                m && !C && "init" === h && "init" === l.kind && (m = !1);
                m && c(e.key.start, "Redefinition of property");
              }
            }
          a.properties.push(e);
        }
        return (a = q(a, "ObjectExpression"));
      case Ma:
        return (a = y()), r(), Na(a, !1);
      case yb:
        return (
          (a = y()),
          r(),
          (a.callee = ha(ua(), !0)),
          u(I) ? (a.arguments = Ta(E, !1)) : (a.arguments = rb),
          (a = q(a, "NewExpression"))
        );
      default:
        N();
    }
  }
  function Na(a, b) {
    p === V ? (a.id = O()) : b ? N() : (a.id = null);
    a.params = [];
    var d = !0;
    for (v(I); !u(E); ) d ? (d = !1) : v(L), a.params.push(O());
    var d = fa,
      e = w;
    fa = !0;
    w = [];
    a.body = ga(!0);
    fa = d;
    w = e;
    if (C || (a.body.body.length && Ga(a.body.body[0])))
      for (d = a.id ? -1 : 0; d < a.params.length; ++d)
        if (
          ((e = 0 > d ? a.id : a.params[d]),
          (bb(e.name) || sa(e.name)) &&
            c(e.start, "Defining '" + e.name + "' in strict mode"),
          0 <= d)
        )
          for (var g = 0; g < d; ++g)
            e.name === a.params[g].name &&
              c(e.start, "Argument name clash in strict mode");
    return q(a, b ? "FunctionDeclaration" : "FunctionExpression");
  }
  function Ta(a, b, c) {
    for (var d = [], e = !0; !u(a); ) {
      if (e) e = !1;
      else if ((v(L), b && n.allowTrailingCommas && u(a))) break;
      c && p === L ? d.push(null) : d.push(A(!0));
    }
    return d;
  }
  function O(a) {
    var b = y();
    b.name = p === V ? H : (a && !n.forbidReserved && p.keyword) || N();
    R = !1;
    r();
    return q(b, "Identifier");
  }
  a.version = "0.4.1";
  var n, k, S, wa;
  a.parse = function (a, c) {
    k = String(a);
    S = k.length;
    b(c);
    G = 1;
    f = D = 0;
    R = !0;
    l();
    var d,
      g = n.program;
    Da = M = f;
    n.locations && (Ea = new e());
    fa = C = null;
    w = [];
    z();
    d = g || y();
    var h = !0;
    g || (d.body = []);
    for (; p !== pa; )
      (g = F()), d.body.push(g), h && Ga(g) && Fa(!0), (h = !1);
    return (d = q(d, "Program"));
  };
  var Ua = (a.defaultOptions = {
      ecmaVersion: 5,
      strictSemicolons: !1,
      allowTrailingCommas: !0,
      forbidReserved: !1,
      locations: !1,
      onComment: null,
      ranges: !1,
      program: null,
      sourceFile: null,
      directSourceFile: null,
    }),
    Ab = (a.getLineInfo = function (a, b) {
      for (var c = 1, d = 0; ; ) {
        Y.lastIndex = d;
        var e = Y.exec(a);
        if (e && e.index < b) ++c, (d = e.index + e[0].length);
        else break;
      }
      return { line: c, column: b - d };
    });
  a.tokenize = function (a, c) {
    function d(a) {
      z(a);
      e.start = x;
      e.end = X;
      e.startLoc = oa;
      e.endLoc = ia;
      e.type = p;
      e.value = H;
      return e;
    }
    k = String(a);
    S = k.length;
    b(c);
    G = 1;
    f = D = 0;
    R = !0;
    l();
    var e = {};
    d.jumpTo = function (a, b) {
      f = a;
      if (n.locations) {
        G = 1;
        D = Y.lastIndex = 0;
        for (var c; (c = Y.exec(k)) && c.index < a; )
          ++G, (D = c.index + c[0].length);
      }
      R = b;
      l();
    };
    return d;
  };
  var f,
    x,
    X,
    oa,
    ia,
    p,
    H,
    R,
    G,
    D,
    Da,
    M,
    Ea,
    fa,
    w,
    C,
    rb = [],
    ba = { type: "num" },
    Ba = { type: "regexp" },
    da = { type: "string" },
    V = { type: "name" },
    pa = { type: "eof" },
    Ha = { keyword: "break" },
    Pa = { keyword: "case", beforeExpr: !0 },
    qb = { keyword: "catch" },
    eb = { keyword: "continue" },
    fb = { keyword: "debugger" },
    nb = { keyword: "default" },
    gb = { keyword: "do", isLoop: !0 },
    lb = { keyword: "else", beforeExpr: !0 },
    sb = { keyword: "finally" },
    hb = { keyword: "for", isLoop: !0 },
    Ma = { keyword: "function" },
    kb = { keyword: "if" },
    mb = { keyword: "return", beforeExpr: !0 },
    Oa = { keyword: "switch" },
    ob = { keyword: "throw", beforeExpr: !0 },
    pb = { keyword: "try" },
    La = { keyword: "var" },
    Ja = { keyword: "while", isLoop: !0 },
    tb = { keyword: "with" },
    yb = { keyword: "new", beforeExpr: !0 },
    ub = { keyword: "this" },
    vb = { keyword: "null", atomValue: null },
    wb = { keyword: "true", atomValue: !0 },
    xb = { keyword: "false", atomValue: !1 },
    ta = { keyword: "in", binop: 7, beforeExpr: !0 },
    Ca = {
      break: Ha,
      case: Pa,
      catch: qb,
      continue: eb,
      debugger: fb,
      default: nb,
      do: gb,
      else: lb,
      finally: sb,
      for: hb,
      function: Ma,
      if: kb,
      return: mb,
      switch: Oa,
      throw: ob,
      try: pb,
      var: La,
      while: Ja,
      with: tb,
      null: vb,
      true: wb,
      false: xb,
      new: yb,
      in: ta,
      instanceof: { keyword: "instanceof", binop: 7, beforeExpr: !0 },
      this: ub,
      typeof: { keyword: "typeof", prefix: !0, beforeExpr: !0 },
      void: { keyword: "void", prefix: !0, beforeExpr: !0 },
      delete: { keyword: "delete", prefix: !0, beforeExpr: !0 },
    },
    ja = { type: "[", beforeExpr: !0 },
    ka = { type: "]" },
    Z = { type: "{", beforeExpr: !0 },
    T = { type: "}" },
    I = { type: "(", beforeExpr: !0 },
    E = { type: ")" },
    L = { type: ",", beforeExpr: !0 },
    J = { type: ";", beforeExpr: !0 },
    aa = { type: ":", beforeExpr: !0 },
    xa = { type: "." },
    ya = { type: "?", beforeExpr: !0 },
    za = { binop: 10, beforeExpr: !0 },
    Aa = { isAssign: !0, beforeExpr: !0 },
    U = { isAssign: !0, beforeExpr: !0 },
    Gb = { postfix: !0, prefix: !0, isUpdate: !0 },
    Xa = { prefix: !0, beforeExpr: !0 },
    Va = { binop: 1, beforeExpr: !0 },
    Wa = { binop: 2, beforeExpr: !0 },
    Db = { binop: 3, beforeExpr: !0 },
    Fb = { binop: 4, beforeExpr: !0 },
    Eb = { binop: 5, beforeExpr: !0 },
    Kb = { binop: 6, beforeExpr: !0 },
    Jb = { binop: 7, beforeExpr: !0 },
    Ib = { binop: 8, beforeExpr: !0 },
    Hb = { binop: 9, prefix: !0, beforeExpr: !0 },
    Cb = { binop: 10, beforeExpr: !0 };
  a.tokTypes = {
    bracketL: ja,
    bracketR: ka,
    braceL: Z,
    braceR: T,
    parenL: I,
    parenR: E,
    comma: L,
    semi: J,
    colon: aa,
    dot: xa,
    question: ya,
    slash: za,
    eq: Aa,
    name: V,
    eof: pa,
    num: ba,
    regexp: Ba,
    string: da,
  };
  for (var zb in Ca) a.tokTypes["_" + zb] = Ca[zb];
  var Mb = d(
      "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"
    ),
    Nb = d("class enum extends super const export import"),
    bb = d(
      "implements interface let package private protected public static yield"
    ),
    sa = d("eval arguments"),
    Lb = d(
      "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"
    ),
    Bb = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
    Za = RegExp(
      "[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]"
    ),
    Pb = RegExp(
      "[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]"
    ),
    na = /[\n\r\u2028\u2029]/,
    Y = /\r\n|[\n\r\u2028\u2029]/g,
    la = (a.isIdentifierStart = function (a) {
      return 65 > a
        ? 36 === a
        : 91 > a
        ? !0
        : 97 > a
        ? 95 === a
        : 123 > a
        ? !0
        : 170 <= a && Za.test(String.fromCharCode(a));
    }),
    ab = (a.isIdentifierChar = function (a) {
      return 48 > a
        ? 36 === a
        : 58 > a
        ? !0
        : 65 > a
        ? !1
        : 91 > a
        ? !0
        : 97 > a
        ? 95 === a
        : 123 > a
        ? !0
        : 170 <= a && Pb.test(String.fromCharCode(a));
    }),
    ca,
    Ia = { kind: "loop" },
    Ob = { kind: "switch" };
};
"object" == typeof exports && "object" == typeof module
  ? mod$$inline_58(exports)
  : "function" == typeof define && define.amd
  ? define(["exports"], mod$$inline_58)
  : mod$$inline_58(this.acorn || (this.acorn = {}));
// JS-Interpreter: Copyright 2013 Google LLC, Apache 2.0
function t(a, b) {
  "string" === typeof a && (a = Ga(a, "code"));
  this.Ga = a.constructor;
  var d = new this.Ga({ options: {} }),
    c;
  for (c in a) d[c] = "body" === c ? a[c].slice() : a[c];
  this.ka = d;
  this.kb = b;
  this.sa = !1;
  this.$ = [];
  this.Ra = 0;
  this.lb = Object.create(null);
  a = /^step([A-Z]\w*)$/;
  var f, g;
  for (g in this)
    "function" === typeof this[g] &&
      (f = g.match(a)) &&
      (this.lb[f[1]] = this[g].bind(this));
  this.X = Ha(this, this.ka, null);
  this.Sa = this.X.object;
  this.ka = Ga(this.$.join("\n"), "polyfills");
  this.$ = void 0;
  Ia(this.ka, void 0, void 0);
  f = new u(this.ka, this.X);
  f.done = !1;
  this.o = [f];
  this.xb();
  this.value = void 0;
  this.ka = d;
  f = new u(this.ka, this.X);
  f.done = !1;
  this.o.length = 0;
  this.o[0] = f;
  this.stateStack = this.o;
}
var Ja = { locations: !0, ecmaVersion: 5 },
  Ka = { configurable: !0, enumerable: !0, writable: !1 },
  v = { configurable: !0, enumerable: !1, writable: !0 },
  B = { configurable: !0, enumerable: !1, writable: !1 },
  La = { configurable: !1, enumerable: !1, writable: !1 },
  Ma = { configurable: !1, enumerable: !0, writable: !0 },
  Na = { STEP_ERROR: !0 },
  Oa = { SCOPE_REFERENCE: !0 },
  Pa = { VALUE_IN_DESCRIPTOR: !0 },
  Qa = { REGEXP_TIMEOUT: !0 },
  eb = [],
  fb = null,
  gb = "undefined" === typeof globalThis ? this : globalThis,
  Gb = [
    "onmessage = function(e) {",
    "var result;",
    "var data = e.data;",
    "switch (data[0]) {",
    "case 'split':",
    "result = data[1].split(data[2], data[3]);",
    "break;",
    "case 'match':",
    "result = data[1].match(data[2]);",
    "break;",
    "case 'search':",
    "result = data[1].search(data[2]);",
    "break;",
    "case 'replace':",
    "result = data[1].replace(data[2], data[3]);",
    "break;",
    "case 'exec':",
    "var regexp = data[1];",
    "regexp.lastIndex = data[2];",
    "result = [regexp.exec(data[3]), data[1].lastIndex];",
    "break;",
    "default:",
    "throw Error('Unknown RegExp operation: ' + data[0]);",
    "}",
    "postMessage(result);",
    "};",
  ];
function Hb(a) {
  var b = a >>> 0;
  return b === Number(a) ? b : NaN;
}
function Ib(a) {
  var b = a >>> 0;
  return String(b) === String(a) && 4294967295 !== b ? b : NaN;
}
function Ia(a, b, d) {
  b ? (a.start = b) : delete a.start;
  d ? (a.end = d) : delete a.end;
  for (var c in a)
    if ("loc" !== c && a.hasOwnProperty(c)) {
      var f = a[c];
      f && "object" === typeof f && Ia(f, b, d);
    }
}
t.prototype.REGEXP_MODE = 2;
t.prototype.REGEXP_THREAD_TIMEOUT = 1e3;
t.prototype.POLYFILL_TIMEOUT = 1e3;
p = t.prototype;
p.N = !1;
p.Da = !1;
p.Db = 0;
function Ga(a, b) {
  var d = {},
    c;
  for (c in Ja) d[c] = Ja[c];
  d.sourceFile = b;
  return acorn.parse(a, d);
}
p.Cb = function (a) {
  var b = this.o[0];
  if (!b || "Program" !== b.node.type)
    throw Error("Expecting original AST to start with a Program node.");
  "string" === typeof a && (a = Ga(a, "appendCode" + this.Db++));
  if (!a || "Program" !== a.type)
    throw Error("Expecting new AST to start with a Program node.");
  Jb(this, a, b.scope);
  Array.prototype.push.apply(b.node.body, a.body);
  b.done = !1;
};
p.fb = function () {
  var a = this.o,
    b = Date.now();
  do {
    var d = a[a.length - 1];
    if (!d) return !1;
    var c = d.node,
      f = c.type;
    if ("Program" === f && d.done) return !1;
    if (this.sa) break;
    try {
      var g = this.lb[f](a, d, c);
    } catch (l) {
      if (l !== Na) throw l;
    }
    g && a.push(g);
    if (this.N) throw Error("Getter not supported in this context");
    if (this.Da) throw Error("Setter not supported in this context");
  } while (!c.end && b + this.POLYFILL_TIMEOUT > Date.now());
  return !0;
};
p.xb = function () {
  for (; !this.sa && this.fb(); );
  return this.sa;
};
function Kb(a, b) {
  a.g(b, "NaN", NaN, La);
  a.g(b, "Infinity", Infinity, La);
  a.g(b, "undefined", void 0, La);
  a.g(b, "window", b, Ka);
  a.g(b, "this", b, La);
  a.g(b, "self", b);
  a.L = new D(null);
  a.W = new D(a.L);
  Lb(a, b);
  Mb(a, b);
  b.ra = a.L;
  a.g(b, "constructor", a.v, v);
  Nb(a, b);
  Ob(a, b);
  Pb(a, b);
  Qb(a, b);
  Rb(a, b);
  Sb(a, b);
  Tb(a, b);
  Ub(a, b);
  Cc(a, b);
  var d = a.i(function () {
    throw EvalError("Can't happen");
  }, !1);
  d.eval = !0;
  a.g(b, "eval", d, v);
  a.g(b, "parseInt", a.i(parseInt, !1), v);
  a.g(b, "parseFloat", a.i(parseFloat, !1), v);
  a.g(b, "isNaN", a.i(isNaN, !1), v);
  a.g(b, "isFinite", a.i(isFinite, !1), v);
  d = [
    [escape, "escape"],
    [unescape, "unescape"],
    [decodeURI, "decodeURI"],
    [decodeURIComponent, "decodeURIComponent"],
    [encodeURI, "encodeURI"],
    [encodeURIComponent, "encodeURIComponent"],
  ];
  for (var c = 0; c < d.length; c++)
    a.g(
      b,
      d[c][1],
      a.i(
        (function (f) {
          return function (g) {
            try {
              return f(g);
            } catch (l) {
              K(a, a.zb, l.message);
            }
          };
        })(d[c][0]),
        !1
      ),
      v
    );
  a.OBJECT = a.v;
  a.OBJECT_PROTO = a.L;
  a.FUNCTION = a.M;
  a.FUNCTION_PROTO = a.W;
  a.ARRAY = a.ia;
  a.ARRAY_PROTO = a.Ea;
  a.REGEXP = a.I;
  a.REGEXP_PROTO = a.Fa;
  a.DATE = a.Y;
  a.DATE_PROTO = a.hb;
  a.kb && a.kb(a, b);
}
p.Qb = 0;
function Lb(a, b) {
  var d = /^[A-Za-z_$][\w$]*$/;
  var c = function (f) {
    var g = arguments.length ? String(arguments[arguments.length - 1]) : "",
      l = Array.prototype.slice.call(arguments, 0, -1).join(",").trim();
    if (l) {
      l = l.split(/\s*,\s*/);
      for (var w = 0; w < l.length; w++) {
        var E = l[w];
        d.test(E) || K(a, a.ja, "Invalid function argument: " + E);
      }
      l = l.join(", ");
    }
    try {
      var N = Ga("(function(" + l + ") {" + g + "})", "function" + a.Qb++);
    } catch (C) {
      K(a, a.ja, "Invalid code: " + C.message);
    }
    1 !== N.body.length && K(a, a.ja, "Invalid code in function body.");
    return Dc(a, N.body[0].expression, a.X, "anonymous");
  };
  a.M = a.i(c, !0);
  a.g(b, "Function", a.M, v);
  a.g(a.M, "prototype", a.W, v);
  a.g(a.W, "constructor", a.M, v);
  a.W.La = function () {};
  a.W.La.id = a.Ra++;
  a.W.ub = !0;
  a.g(a.W, "length", 0, B);
  a.W.H = "Function";
  c = function (f, g) {
    var l = a.o[a.o.length - 1];
    l.ba = this;
    l.B = f;
    l.G = [];
    null !== g &&
      void 0 !== g &&
      (g instanceof D
        ? (l.G = Ec(a, g))
        : K(a, a.m, "CreateListFromArrayLike called on non-object"));
    l.Ya = !1;
  };
  M(a, a.M, "apply", c);
  c = function (f) {
    var g = a.o[a.o.length - 1];
    g.ba = this;
    g.B = f;
    g.G = [];
    for (var l = 1; l < arguments.length; l++) g.G.push(arguments[l]);
    g.Ya = !1;
  };
  M(a, a.M, "call", c);
  a.$.push(
    "Object.defineProperty(Function.prototype, 'bind',",
    "{configurable: true, writable: true, value:",
    "function bind(oThis) {",
    "if (typeof this !== 'function') {",
    "throw TypeError('What is trying to be bound is not callable');",
    "}",
    "var aArgs   = Array.prototype.slice.call(arguments, 1),",
    "fToBind = this,",
    "fNOP    = function() {},",
    "fBound  = function() {",
    "return fToBind.apply(this instanceof fNOP",
    "? this",
    ": oThis,",
    "aArgs.concat(Array.prototype.slice.call(arguments)));",
    "};",
    "if (this.prototype) {",
    "fNOP.prototype = this.prototype;",
    "}",
    "fBound.prototype = new fNOP();",
    "return fBound;",
    "}",
    "});",
    ""
  );
  c = function () {
    return String(this);
  };
  M(a, a.M, "toString", c);
  a.g(a.M, "toString", a.i(c, !1), v);
  c = function () {
    return this.valueOf();
  };
  M(a, a.M, "valueOf", c);
  a.g(a.M, "valueOf", a.i(c, !1), v);
}
function Mb(a, b) {
  function d(f) {
    (void 0 !== f && null !== f) ||
      K(a, a.m, "Cannot convert '" + f + "' to object");
  }
  var c = function (f) {
    if (void 0 === f || null === f) return Fc(a) ? this : a.s(a.L);
    if (!(f instanceof D)) {
      var g = a.s(Gc(a, f));
      g.data = f;
      return g;
    }
    return f;
  };
  a.v = a.i(c, !0);
  a.g(a.v, "prototype", a.L, v);
  a.g(a.L, "constructor", a.v, v);
  a.g(b, "Object", a.v, v);
  c = function (f) {
    d(f);
    return Hc(a, Object.getOwnPropertyNames(f instanceof D ? f.h : f));
  };
  a.g(a.v, "getOwnPropertyNames", a.i(c, !1), v);
  c = function (f) {
    d(f);
    f instanceof D && (f = f.h);
    return Hc(a, Object.keys(f));
  };
  a.g(a.v, "keys", a.i(c, !1), v);
  c = function (f) {
    if (null === f) return a.s(null);
    f instanceof D ||
      K(a, a.m, "Object prototype may only be an Object or null");
    return a.s(f);
  };
  a.g(a.v, "create", a.i(c, !1), v);
  a.$.push(
    "(function() {",
    "var create_ = Object.create;",
    "Object.create = function create(proto, props) {",
    "var obj = create_(proto);",
    "props && Object.defineProperties(obj, props);",
    "return obj;",
    "};",
    "})();",
    ""
  );
  c = function (f, g, l) {
    g = String(g);
    f instanceof D || K(a, a.m, "Object.defineProperty called on non-object");
    l instanceof D || K(a, a.m, "Property description must be an object");
    !f.h[g] &&
      f.preventExtensions &&
      K(a, a.m, "Can't define property '" + g + "', object is not extensible");
    a.g(f, g, Pa, l.h);
    return f;
  };
  a.g(a.v, "defineProperty", a.i(c, !1), v);
  a.$.push(
    "(function() {",
    "var defineProperty_ = Object.defineProperty;",
    "Object.defineProperty = function defineProperty(obj, prop, d1) {",
    "var d2 = {};",
    "if ('configurable' in d1) d2.configurable = d1.configurable;",
    "if ('enumerable' in d1) d2.enumerable = d1.enumerable;",
    "if ('writable' in d1) d2.writable = d1.writable;",
    "if ('value' in d1) d2.value = d1.value;",
    "if ('get' in d1) d2.get = d1.get;",
    "if ('set' in d1) d2.set = d1.set;",
    "return defineProperty_(obj, prop, d2);",
    "};",
    "})();",
    "Object.defineProperty(Object, 'defineProperties',",
    "{configurable: true, writable: true, value:",
    "function defineProperties(obj, props) {",
    "var keys = Object.keys(props);",
    "for (var i = 0; i < keys.length; i++) {",
    "Object.defineProperty(obj, keys[i], props[keys[i]]);",
    "}",
    "return obj;",
    "}",
    "});",
    ""
  );
  c = function (f, g) {
    f instanceof D ||
      K(a, a.m, "Object.getOwnPropertyDescriptor called on non-object");
    g = String(g);
    if (g in f.h) {
      var l = Object.getOwnPropertyDescriptor(f.h, g),
        w = f.S[g];
      f = f.V[g];
      g = a.s(a.L);
      w || f
        ? (a.g(g, "get", w), a.g(g, "set", f))
        : (a.g(g, "value", l.value), a.g(g, "writable", l.writable));
      a.g(g, "configurable", l.configurable);
      a.g(g, "enumerable", l.enumerable);
      return g;
    }
  };
  a.g(a.v, "getOwnPropertyDescriptor", a.i(c, !1), v);
  c = function (f) {
    d(f);
    return Gc(a, f);
  };
  a.g(a.v, "getPrototypeOf", a.i(c, !1), v);
  c = function (f) {
    return !!f && !f.preventExtensions;
  };
  a.g(a.v, "isExtensible", a.i(c, !1), v);
  c = function (f) {
    f instanceof D && (f.preventExtensions = !0);
    return f;
  };
  a.g(a.v, "preventExtensions", a.i(c, !1), v);
  M(a, a.v, "toString", D.prototype.toString);
  M(a, a.v, "toLocaleString", D.prototype.toString);
  M(a, a.v, "valueOf", D.prototype.valueOf);
  c = function (f) {
    d(this);
    return this instanceof D ? String(f) in this.h : this.hasOwnProperty(f);
  };
  M(a, a.v, "hasOwnProperty", c);
  c = function (f) {
    d(this);
    return this instanceof D
      ? Object.prototype.propertyIsEnumerable.call(this.h, f)
      : this.propertyIsEnumerable(f);
  };
  M(a, a.v, "propertyIsEnumerable", c);
  c = function (f) {
    for (;;) {
      f = Gc(a, f);
      if (!f) return !1;
      if (f === this) return !0;
    }
  };
  M(a, a.v, "isPrototypeOf", c);
}
function Nb(a, b) {
  var d = function (c) {
    var f = Fc(a) ? this : Ic(a),
      g = arguments[0];
    if (1 === arguments.length && "number" === typeof g)
      isNaN(Hb(g)) && K(a, a.ib, "Invalid array length"), (f.h.length = g);
    else {
      for (g = 0; g < arguments.length; g++) f.h[g] = arguments[g];
      f.h.length = g;
    }
    return f;
  };
  a.ia = a.i(d, !0);
  a.Ea = a.ia.h.prototype;
  a.g(b, "Array", a.ia, v);
  d = function (c) {
    return c && "Array" === c.H;
  };
  a.g(a.ia, "isArray", a.i(d, !1), v);
  a.g(a.Ea, "length", 0, { configurable: !1, enumerable: !1, writable: !0 });
  a.Ea.H = "Array";
  a.$.push(
    "Object.defineProperty(Array.prototype, 'pop',",
    "{configurable: true, writable: true, value:",
    "function pop() {",
    "if (!this) throw TypeError();",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "if (!len || len < 0) {",
    "o.length = 0;",
    "return undefined;",
    "}",
    "len--;",
    "var x = o[len];",
    "delete o[len];",
    "o.length = len;",
    "return x;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'push',",
    "{configurable: true, writable: true, value:",
    "function push(var_args) {",
    "if (!this) throw TypeError();",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "for (var i = 0; i < arguments.length; i++) {",
    "o[len] = arguments[i];",
    "len++;",
    "}",
    "o.length = len;",
    "return len;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'shift',",
    "{configurable: true, writable: true, value:",
    "function shift() {",
    "if (!this) throw TypeError();",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "if (!len || len < 0) {",
    "o.length = 0;",
    "return undefined;",
    "}",
    "var value = o[0];",
    "for (var i = 0; i < len - 1; i++) {",
    "o[i] = o[i + 1];",
    "}",
    "delete o[i];",
    "o.length = len - 1;",
    "return value;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'unshift',",
    "{configurable: true, writable: true, value:",
    "function unshift(var_args) {",
    "if (!this) throw TypeError();",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "if (!len || len < 0) {",
    "len = 0;",
    "}",
    "for (var i = len - 1; i >= 0; i--) {",
    "o[i + arguments.length] = o[i];",
    "}",
    "for (var i = 0; i < arguments.length; i++) {",
    "o[i] = arguments[i];",
    "}",
    "return o.length = len + arguments.length;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'reverse',",
    "{configurable: true, writable: true, value:",
    "function reverse() {",
    "if (!this) throw TypeError();",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "if (!len || len < 2) {",
    "return o;",
    "}",
    "for (var i = 0; i < len / 2 - 0.5; i++) {",
    "var x = o[i];",
    "o[i] = o[len - i - 1];",
    "o[len - i - 1] = x;",
    "}",
    "return o;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'indexOf',",
    "{configurable: true, writable: true, value:",
    "function indexOf(searchElement, fromIndex) {",
    "if (!this) throw TypeError();",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "var n = fromIndex | 0;",
    "if (!len || n >= len) {",
    "return -1;",
    "}",
    "var i = Math.max(n >= 0 ? n : len - Math.abs(n), 0);",
    "while (i < len) {",
    "if (i in o && o[i] === searchElement) {",
    "return i;",
    "}",
    "i++;",
    "}",
    "return -1;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'lastIndexOf',",
    "{configurable: true, writable: true, value:",
    "function lastIndexOf(searchElement, fromIndex) {",
    "if (!this) throw TypeError();",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "if (!len) {",
    "return -1;",
    "}",
    "var n = len - 1;",
    "if (arguments.length > 1) {",
    "n = fromIndex | 0;",
    "if (n) {",
    "n = (n > 0 || -1) * Math.floor(Math.abs(n));",
    "}",
    "}",
    "var i = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);",
    "while (i >= 0) {",
    "if (i in o && o[i] === searchElement) {",
    "return i;",
    "}",
    "i--;",
    "}",
    "return -1;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'slice',",
    "{configurable: true, writable: true, value:",
    "function slice(start, end) {",
    "if (!this) throw TypeError();",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "start |= 0;",
    "start = (start >= 0) ? start : Math.max(0, len + start);",
    "if (typeof end !== 'undefined') {",
    "if (end !== Infinity) {",
    "end |= 0;",
    "}",
    "if (end < 0) {",
    "end = len + end;",
    "} else {",
    "end = Math.min(end, len);",
    "}",
    "} else {",
    "end = len;",
    "}",
    "var size = end - start;",
    "var cloned = [];",
    "for (var i = 0; i < size; i++) {",
    "cloned[i] = o[start + i];",
    "}",
    "return cloned;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'splice',",
    "{configurable: true, writable: true, value:",
    "function splice(start, deleteCount, var_args) {",
    "if (!this) throw TypeError();",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "start |= 0;",
    "if (start < 0) {",
    "start = Math.max(len + start, 0);",
    "} else {",
    "start = Math.min(start, len);",
    "}",
    "if (arguments.length < 1) {",
    "deleteCount = len - start;",
    "} else {",
    "deleteCount |= 0;",
    "deleteCount = Math.max(0, Math.min(deleteCount, len - start));",
    "}",
    "var removed = [];",
    "for (var i = start; i < start + deleteCount; i++) {",
    "removed[removed.length++] = o[i];",
    "o[i] = o[i + deleteCount];",
    "}",
    "for (var i = start + deleteCount; i < len - deleteCount; i++) {",
    "o[i] = o[i + deleteCount];",
    "}",
    "for (var i = len - deleteCount; i < len; i++) {",
    "delete o[i];",
    "}",
    "len -= deleteCount;",
    "for (var i = len - 1; i >= start; i--) {",
    "o[i + arguments.length - 2] = o[i];",
    "}",
    "len += arguments.length - 2;",
    "for (var i = 2; i < arguments.length; i++) {",
    "o[start + i - 2] = arguments[i];",
    "}",
    "o.length = len;",
    "return removed;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'concat',",
    "{configurable: true, writable: true, value:",
    "function concat(var_args) {",
    "if (!this) throw TypeError();",
    "var o = Object(this);",
    "var cloned = [];",
    "for (var i = -1; i < arguments.length; i++) {",
    "var value = (i === -1) ? o : arguments[i];",
    "if (Array.isArray(value)) {",
    "cloned.push.apply(cloned, value);",
    "} else {",
    "cloned.push(value);",
    "}",
    "}",
    "return cloned;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'join',",
    "{configurable: true, writable: true, value:",
    "function join(opt_separator) {",
    "if (!this) throw TypeError();",
    "var o = Object(this);",
    "var sep = typeof opt_separator === 'undefined' ?",
    "',' : ('' + opt_separator);",
    "var str = '';",
    "for (var i = 0; i < o.length; i++) {",
    "if (i && sep) {",
    "str += sep;",
    "}",
    "str += o[i];",
    "}",
    "return str;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'every',",
    "{configurable: true, writable: true, value:",
    "function every(callbackfn, thisArg) {",
    "if (!this || typeof callbackfn !== 'function') throw TypeError();",
    "var t, k;",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "if (arguments.length > 1) t = thisArg;",
    "k = 0;",
    "while (k < len) {",
    "if (k in o && !callbackfn.call(t, o[k], k, o)) return false;",
    "k++;",
    "}",
    "return true;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'filter',",
    "{configurable: true, writable: true, value:",
    "function filter(fun, var_args) {",
    "if (this === void 0 || this === null || typeof fun !== 'function') throw TypeError();",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "var res = [];",
    "var thisArg = arguments.length >= 2 ? arguments[1] : void 0;",
    "for (var i = 0; i < len; i++) {",
    "if (i in o) {",
    "var val = o[i];",
    "if (fun.call(thisArg, val, i, o)) res.push(val);",
    "}",
    "}",
    "return res;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'forEach',",
    "{configurable: true, writable: true, value:",
    "function forEach(callback, thisArg) {",
    "if (!this || typeof callback !== 'function') throw TypeError();",
    "var t, k;",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "if (arguments.length > 1) t = thisArg;",
    "k = 0;",
    "while (k < len) {",
    "if (k in o) callback.call(t, o[k], k, o);",
    "k++;",
    "}",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'map',",
    "{configurable: true, writable: true, value:",
    "function map(callback, thisArg) {",
    "if (!this || typeof callback !== 'function') throw TypeError();",
    "var t, a, k;",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "if (arguments.length > 1) t = thisArg;",
    "a = new Array(len);",
    "k = 0;",
    "while (k < len) {",
    "if (k in o) a[k] = callback.call(t, o[k], k, o);",
    "k++;",
    "}",
    "return a;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'reduce',",
    "{configurable: true, writable: true, value:",
    "function reduce(callback /*, initialValue*/) {",
    "if (!this || typeof callback !== 'function') throw TypeError();",
    "var o = Object(this), len = o.length >>> 0, k = 0, value;",
    "if (arguments.length === 2) {",
    "value = arguments[1];",
    "} else {",
    "while (k < len && !(k in o)) k++;",
    "if (k >= len) {",
    "throw TypeError('Reduce of empty array with no initial value');",
    "}",
    "value = o[k++];",
    "}",
    "for (; k < len; k++) {",
    "if (k in o) value = callback(value, o[k], k, o);",
    "}",
    "return value;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'reduceRight',",
    "{configurable: true, writable: true, value:",
    "function reduceRight(callback /*, initialValue*/) {",
    "if (null === this || 'undefined' === typeof this || 'function' !== typeof callback) throw TypeError();",
    "var o = Object(this), len = o.length >>> 0, k = len - 1, value;",
    "if (arguments.length >= 2) {",
    "value = arguments[1];",
    "} else {",
    "while (k >= 0 && !(k in o)) k--;",
    "if (k < 0) {",
    "throw TypeError('Reduce of empty array with no initial value');",
    "}",
    "value = o[k--];",
    "}",
    "for (; k >= 0; k--) {",
    "if (k in o) value = callback(value, o[k], k, o);",
    "}",
    "return value;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'some',",
    "{configurable: true, writable: true, value:",
    "function some(fun/*, thisArg*/) {",
    "if (!this || typeof fun !== 'function') throw TypeError();",
    "var o = Object(this);",
    "var len = o.length >>> 0;",
    "var thisArg = arguments.length >= 2 ? arguments[1] : void 0;",
    "for (var i = 0; i < len; i++) {",
    "if (i in o && fun.call(thisArg, o[i], i, o)) {",
    "return true;",
    "}",
    "}",
    "return false;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'sort',",
    "{configurable: true, writable: true, value:",
    "function sort(opt_comp) {",
    "if (!this) throw TypeError();",
    "if (typeof opt_comp !== 'function') {",
    "opt_comp = undefined;",
    "}",
    "for (var i = 0; i < this.length; i++) {",
    "var changes = 0;",
    "for (var j = 0; j < this.length - i - 1; j++) {",
    "if (opt_comp ? (opt_comp(this[j], this[j + 1]) > 0) :",
    "(String(this[j]) > String(this[j + 1]))) {",
    "var swap = this[j];",
    "this[j] = this[j + 1];",
    "this[j + 1] = swap;",
    "changes++;",
    "}",
    "}",
    "if (!changes) break;",
    "}",
    "return this;",
    "}",
    "});",
    "Object.defineProperty(Array.prototype, 'toLocaleString',",
    "{configurable: true, writable: true, value:",
    "function toLocaleString() {",
    "if (!this) throw TypeError();",
    "var o = Object(this);",
    "var out = [];",
    "for (var i = 0; i < o.length; i++) {",
    "out[i] = (o[i] === null || o[i] === undefined) ? '' : o[i].toLocaleString();",
    "}",
    "return out.join(',');",
    "}",
    "});",
    ""
  );
}
function Ob(a, b) {
  var d = function (c) {
    c = arguments.length ? gb.String(c) : "";
    return Fc(a) ? ((this.data = c), this) : c;
  };
  a.J = a.i(d, !0);
  a.g(b, "String", a.J, v);
  a.g(a.J, "fromCharCode", a.i(String.fromCharCode, !1), v);
  b =
    "charAt charCodeAt concat indexOf lastIndexOf slice substr substring toLocaleLowerCase toLocaleUpperCase toLowerCase toUpperCase trim".split(
      " "
    );
  for (d = 0; d < b.length; d++) M(a, a.J, b[d], String.prototype[b[d]]);
  d = function (c, f, g) {
    f = a.O(f);
    g = a.O(g);
    try {
      return String(this).localeCompare(c, f, g);
    } catch (l) {
      K(a, a.F, "localeCompare: " + l.message);
    }
  };
  M(a, a.J, "localeCompare", d);
  d = function (c, f, g) {
    var l = String(this);
    f = f ? Number(f) : void 0;
    if (P(a, c, a.I) && ((c = c.data), Jc(a, c, g), 2 === a.REGEXP_MODE)) {
      if (fb)
        (c = Kc(
          a,
          "string.split(separator, limit)",
          { string: l, separator: c, limit: f },
          c,
          g
        )),
          c !== Qa && g(Hc(a, c));
      else {
        var w = a.da(),
          E = Lc(a, c, w, g);
        w.onmessage = function (N) {
          clearTimeout(E);
          g(Hc(a, N.data));
        };
        w.postMessage(["split", l, c, f]);
      }
      return;
    }
    c = l.split(c, f);
    g(Hc(a, c));
  };
  Mc(a, a.J, "split", d);
  d = function (c, f) {
    var g = String(this);
    P(a, c, a.I) ? (c = c.data) : (c = new RegExp(c));
    Jc(a, c, f);
    if (2 === a.REGEXP_MODE)
      if (fb)
        (c = Kc(a, "string.match(regexp)", { string: g, regexp: c }, c, f)),
          c !== Qa && f(c && Hc(a, c));
      else {
        var l = a.da(),
          w = Lc(a, c, l, f);
        l.onmessage = function (E) {
          clearTimeout(w);
          f(E.data && Hc(a, E.data));
        };
        l.postMessage(["match", g, c]);
      }
    else (c = g.match(c)), f(c && Hc(a, c));
  };
  Mc(a, a.J, "match", d);
  d = function (c, f) {
    var g = String(this);
    P(a, c, a.I) ? (c = c.data) : (c = new RegExp(c));
    Jc(a, c, f);
    if (2 === a.REGEXP_MODE)
      if (fb)
        (c = Kc(a, "string.search(regexp)", { string: g, regexp: c }, c, f)),
          c !== Qa && f(c);
      else {
        var l = a.da(),
          w = Lc(a, c, l, f);
        l.onmessage = function (E) {
          clearTimeout(w);
          f(E.data);
        };
        l.postMessage(["search", g, c]);
      }
    else f(g.search(c));
  };
  Mc(a, a.J, "search", d);
  d = function (c, f, g) {
    var l = String(this);
    f = String(f);
    if (P(a, c, a.I) && ((c = c.data), Jc(a, c, g), 2 === a.REGEXP_MODE)) {
      if (fb)
        (c = Kc(
          a,
          "string.replace(substr, newSubstr)",
          { string: l, substr: c, newSubstr: f },
          c,
          g
        )),
          c !== Qa && g(c);
      else {
        var w = a.da(),
          E = Lc(a, c, w, g);
        w.onmessage = function (N) {
          clearTimeout(E);
          g(N.data);
        };
        w.postMessage(["replace", l, c, f]);
      }
      return;
    }
    g(l.replace(c, f));
  };
  Mc(a, a.J, "replace", d);
  a.$.push(
    "(function() {",
    "var replace_ = String.prototype.replace;",
    "String.prototype.replace = function replace(substr, newSubstr) {",
    "if (typeof newSubstr !== 'function') {",
    "return replace_.call(this, substr, newSubstr);",
    "}",
    "var str = this;",
    "if (substr instanceof RegExp) {",
    "var subs = [];",
    "var m = substr.exec(str);",
    "while (m) {",
    "m.push(m.index, str);",
    "var inject = newSubstr.apply(null, m);",
    "subs.push([m.index, m[0].length, inject]);",
    "m = substr.global ? substr.exec(str) : null;",
    "}",
    "for (var i = subs.length - 1; i >= 0; i--) {",
    "str = str.substring(0, subs[i][0]) + subs[i][2] + str.substring(subs[i][0] + subs[i][1]);",
    "}",
    "} else {",
    "var i = str.indexOf(substr);",
    "if (i !== -1) {",
    "var inject = newSubstr(str.substr(i, substr.length), i, str);",
    "str = str.substring(0, i) + inject + str.substring(i + substr.length);",
    "}",
    "}",
    "return str;",
    "};",
    "})();",
    ""
  );
}
function Pb(a, b) {
  a.gb = a.i(function (d) {
    d = gb.Boolean(d);
    return Fc(a) ? ((this.data = d), this) : d;
  }, !0);
  a.g(b, "Boolean", a.gb, v);
}
function Qb(a, b) {
  var d = function (c) {
    c = arguments.length ? gb.Number(c) : 0;
    return Fc(a) ? ((this.data = c), this) : c;
  };
  a.Z = a.i(d, !0);
  a.g(b, "Number", a.Z, v);
  b = [
    "MAX_VALUE",
    "MIN_VALUE",
    "NaN",
    "NEGATIVE_INFINITY",
    "POSITIVE_INFINITY",
  ];
  for (d = 0; d < b.length; d++) a.g(a.Z, b[d], Number[b[d]], La);
  d = function (c) {
    try {
      return Number(this).toExponential(c);
    } catch (f) {
      K(a, a.F, f.message);
    }
  };
  M(a, a.Z, "toExponential", d);
  d = function (c) {
    try {
      return Number(this).toFixed(c);
    } catch (f) {
      K(a, a.F, f.message);
    }
  };
  M(a, a.Z, "toFixed", d);
  d = function (c) {
    try {
      return Number(this).toPrecision(c);
    } catch (f) {
      K(a, a.F, f.message);
    }
  };
  M(a, a.Z, "toPrecision", d);
  d = function (c) {
    try {
      return Number(this).toString(c);
    } catch (f) {
      K(a, a.F, f.message);
    }
  };
  M(a, a.Z, "toString", d);
  d = function (c, f) {
    c = c ? a.O(c) : void 0;
    f = f ? a.O(f) : void 0;
    return Number(this).toLocaleString(c, f);
  };
  M(a, a.Z, "toLocaleString", d);
}
function Rb(a, b) {
  var d = function (f, g) {
    if (!Fc(a)) return gb.Date();
    var l = [null].concat(Array.from(arguments));
    this.data = new (Function.prototype.bind.apply(gb.Date, l))();
    return this;
  };
  a.Y = a.i(d, !0);
  a.hb = a.Y.h.prototype;
  a.g(b, "Date", a.Y, v);
  a.g(a.Y, "now", a.i(Date.now, !1), v);
  a.g(a.Y, "parse", a.i(Date.parse, !1), v);
  a.g(a.Y, "UTC", a.i(Date.UTC, !1), v);
  b =
    "getDate getDay getFullYear getHours getMilliseconds getMinutes getMonth getSeconds getTime getTimezoneOffset getUTCDate getUTCDay getUTCFullYear getUTCHours getUTCMilliseconds getUTCMinutes getUTCMonth getUTCSeconds getYear setDate setFullYear setHours setMilliseconds setMinutes setMonth setSeconds setTime setUTCDate setUTCFullYear setUTCHours setUTCMilliseconds setUTCMinutes setUTCMonth setUTCSeconds setYear toDateString toISOString toJSON toGMTString toLocaleDateString toLocaleString toLocaleTimeString toTimeString toUTCString".split(
      " "
    );
  for (var c = 0; c < b.length; c++)
    (d = (function (f) {
      return function (g) {
        var l = this.data;
        l instanceof Date || K(a, a.m, f + " not called on a Date");
        for (var w = [], E = 0; E < arguments.length; E++)
          w[E] = a.O(arguments[E]);
        return l[f].apply(l, w);
      };
    })(b[c])),
      M(a, a.Y, b[c], d);
}
function Sb(a, b) {
  var d = function (c, f) {
    if (Fc(a)) var g = this;
    else {
      if (void 0 === f && P(a, c, a.I)) return c;
      g = a.s(a.Fa);
    }
    c = void 0 === c ? "" : String(c);
    f = f ? String(f) : "";
    Nc(a, g, new gb.RegExp(c, f));
    return g;
  };
  a.I = a.i(d, !0);
  a.Fa = a.I.h.prototype;
  a.g(b, "RegExp", a.I, v);
  a.g(a.I.h.prototype, "global", void 0, B);
  a.g(a.I.h.prototype, "ignoreCase", void 0, B);
  a.g(a.I.h.prototype, "multiline", void 0, B);
  a.g(a.I.h.prototype, "source", "(?:)", B);
  a.$.push(
    "Object.defineProperty(RegExp.prototype, 'test',",
    "{configurable: true, writable: true, value:",
    "function test(str) {",
    "return !!this.exec(str);",
    "}",
    "});"
  );
  d = function (c, f) {
    function g(C) {
      if (C) {
        var ua = Hc(a, C);
        a.g(ua, "index", C.index);
        a.g(ua, "input", C.input);
        return ua;
      }
      return null;
    }
    var l = this.data;
    c = String(c);
    l.lastIndex = Number(a.D(this, "lastIndex"));
    Jc(a, l, f);
    if (2 === a.REGEXP_MODE)
      if (fb)
        (c = Kc(a, "regexp.exec(string)", { string: c, regexp: l }, l, f)),
          c !== Qa && (a.g(this, "lastIndex", l.lastIndex), f(g(c)));
      else {
        var w = a.da(),
          E = Lc(a, l, w, f),
          N = this;
        w.onmessage = function (C) {
          clearTimeout(E);
          a.g(N, "lastIndex", C.data[1]);
          f(g(C.data[0]));
        };
        w.postMessage(["exec", l, l.lastIndex, c]);
      }
    else (c = l.exec(c)), a.g(this, "lastIndex", l.lastIndex), f(g(c));
  };
  Mc(a, a.I, "exec", d);
}
function Tb(a, b) {
  function d(c) {
    var f = a.i(function (g) {
      var l = Fc(a) ? this : a.ta(f);
      Oc(a, l, g);
      return l;
    }, !0);
    a.g(f, "prototype", a.ta(a.F), v);
    a.g(f.h.prototype, "name", c, v);
    a.g(b, c, f, v);
    return f;
  }
  a.F = a.i(function (c) {
    var f = Fc(a) ? this : a.ta(a.F);
    Oc(a, f, c);
    return f;
  }, !0);
  a.g(b, "Error", a.F, v);
  a.g(a.F.h.prototype, "message", "", v);
  a.g(a.F.h.prototype, "name", "Error", v);
  d("EvalError");
  a.ib = d("RangeError");
  a.jb = d("ReferenceError");
  a.ja = d("SyntaxError");
  a.m = d("TypeError");
  a.zb = d("URIError");
}
function Ub(a, b) {
  var d = a.s(a.L);
  a.g(b, "Math", d, v);
  var c = "E LN2 LN10 LOG2E LOG10E PI SQRT1_2 SQRT2".split(" ");
  for (b = 0; b < c.length; b++) a.g(d, c[b], Math[c[b]], B);
  c =
    "abs acos asin atan atan2 ceil cos exp floor log max min pow random round sin sqrt tan".split(
      " "
    );
  for (b = 0; b < c.length; b++) a.g(d, c[b], a.i(Math[c[b]], !1), v);
}
function Cc(a, b) {
  function d(f) {
    try {
      var g = JSON.parse(String(f));
    } catch (l) {
      K(a, a.ja, l.message);
    }
    return a.Ba(g);
  }
  var c = a.s(a.L);
  a.g(b, "JSON", c, v);
  a.g(c, "parse", a.i(d, !1));
  d = function (f, g, l) {
    g && "Function" === g.H
      ? K(a, a.m, "Function replacer on JSON.stringify not supported")
      : g && "Array" === g.H
      ? ((g = Ec(a, g)),
        (g = g.filter(function (E) {
          return "string" === typeof E || "number" === typeof E;
        })))
      : (g = null);
    "string" !== typeof l && "number" !== typeof l && (l = void 0);
    f = a.O(f);
    try {
      var w = JSON.stringify(f, g, l);
    } catch (E) {
      K(a, a.m, E.message);
    }
    return w;
  };
  a.g(c, "stringify", a.i(d, !1));
}
function P(a, b, d) {
  if (null === b || void 0 === b || !d) return !1;
  d = d.h.prototype;
  if (b === d) return !0;
  for (b = Gc(a, b); b; ) {
    if (b === d) return !0;
    b = b.ra;
  }
  return !1;
}
function Nc(a, b, d) {
  b.data = new RegExp(d.source, d.flags);
  a.g(b, "lastIndex", d.lastIndex, v);
  a.g(b, "source", d.source, B);
  a.g(b, "global", d.global, B);
  a.g(b, "ignoreCase", d.ignoreCase, B);
  a.g(b, "multiline", d.multiline, B);
}
function Oc(a, b, d) {
  d && a.g(b, "message", String(d), v);
  d = [];
  for (var c = a.o.length - 1; 0 <= c; c--) {
    var f = a.o[c],
      g = f.node;
    "CallExpression" === g.type &&
      (f = f.ba) &&
      d.length &&
      (d[d.length - 1].name = a.D(f, "name"));
    !g.loc || (d.length && "CallExpression" !== g.type) || d.push({ U: g.loc });
  }
  g = String(a.D(b, "name"));
  c = String(a.D(b, "message"));
  f = g + ": " + c + "\n";
  for (c = 0; c < d.length; c++) {
    var l = d[c].U;
    g = d[c].name;
    l = l.source + ":" + l.start.line + ":" + l.start.column;
    f = g ? f + ("  at " + g + " (" + l + ")\n") : f + ("  at " + l + "\n");
  }
  a.g(b, "stack", f.trim(), v);
}
p.da = function () {
  var a = this.da.Eb;
  a ||
    ((a = new Blob([Gb.join("\n")], { type: "application/javascript" })),
    (this.da.Eb = a));
  return new Worker(URL.createObjectURL(a));
};
function Kc(a, b, d, c, f) {
  var g = { timeout: a.REGEXP_THREAD_TIMEOUT };
  try {
    return fb.runInNewContext(b, d, g);
  } catch (l) {
    f(null), K(a, a.F, "RegExp Timeout: " + c);
  }
  return Qa;
}
function Jc(a, b, d) {
  if (0 === a.REGEXP_MODE) var c = !1;
  else if (1 === a.REGEXP_MODE) c = !0;
  else if (fb) c = !0;
  else if ("function" === typeof Worker && "function" === typeof URL) c = !0;
  else if ("function" === typeof require) {
    try {
      fb = require("vm");
    } catch (f) {}
    c = !!fb;
  } else c = !1;
  c || (d(null), K(a, a.F, "Regular expressions not supported: " + b));
}
function Lc(a, b, d, c) {
  return setTimeout(function () {
    d.terminate();
    c(null);
    try {
      K(a, a.F, "RegExp Timeout: " + b);
    } catch (f) {}
  }, a.REGEXP_THREAD_TIMEOUT);
}
p.ta = function (a) {
  return this.s(a && a.h.prototype);
};
p.s = function (a) {
  if ("object" !== typeof a) throw Error("Non object prototype");
  a = new D(a);
  P(this, a, this.F) && (a.H = "Error");
  return a;
};
function Ic(a) {
  var b = a.s(a.Ea);
  a.g(b, "length", 0, { configurable: !1, enumerable: !1, writable: !0 });
  b.H = "Array";
  return b;
}
function ed(a, b, d) {
  var c = a.s(a.W);
  d
    ? ((d = a.s(a.L)), a.g(c, "prototype", d, v), a.g(d, "constructor", c, v))
    : (c.ub = !0);
  a.g(c, "length", b, B);
  c.H = "Function";
  return c;
}
function Dc(a, b, d, c) {
  var f = ed(a, b.params.length, !0);
  f.Oa = d;
  f.node = b;
  a.g(f, "name", b.id ? String(b.id.name) : c || "", B);
  return f;
}
p.i = function (a, b) {
  b = ed(this, a.length, b);
  b.La = a;
  a.id = this.Ra++;
  this.g(b, "name", a.name, B);
  return b;
};
p.ob = function (a) {
  var b = ed(this, a.length, !0);
  b.Ta = a;
  a.id = this.Ra++;
  this.g(b, "name", a.name, B);
  return b;
};
p.Ba = function (a) {
  if (a instanceof D) throw Error("Object is already pseudo");
  if (("object" !== typeof a && "function" !== typeof a) || null === a)
    return a;
  if (a instanceof RegExp) {
    var b = this.s(this.Fa);
    Nc(this, b, a);
    return b;
  }
  if (a instanceof Date)
    return (b = this.s(this.hb)), (b.data = new Date(a.valueOf())), b;
  if ("function" === typeof a) {
    var d = this;
    b = Object.getOwnPropertyDescriptor(a, "prototype");
    return this.i(function () {
      var f = Array.prototype.slice.call(arguments).map(function (g) {
        return d.O(g);
      });
      f = a.apply(d, f);
      return d.Ba(f);
    }, !!b);
  }
  if (Array.isArray(a)) {
    b = Ic(this);
    for (var c = 0; c < a.length; c++) c in a && this.g(b, c, this.Ba(a[c]));
    return b;
  }
  b = this.s(this.L);
  for (c in a) this.g(b, c, this.Ba(a[c]));
  return b;
};
p.O = function (a, b) {
  if (("object" !== typeof a && "function" !== typeof a) || null === a)
    return a;
  if (!(a instanceof D)) throw Error("Object is not pseudo");
  if (P(this, a, this.I))
    return (
      (b = new RegExp(a.data.source, a.data.flags)),
      (b.lastIndex = a.data.lastIndex),
      b
    );
  if (P(this, a, this.Y)) return new Date(a.data.valueOf());
  b = b || { bb: [], Ka: [] };
  var d = b.bb.indexOf(a);
  if (-1 !== d) return b.Ka[d];
  b.bb.push(a);
  if (P(this, a, this.ia)) {
    var c = [];
    b.Ka.push(c);
    var f = this.D(a, "length");
    for (d = 0; d < f; d++) fd(this, a, d) && (c[d] = this.O(this.D(a, d), b));
  } else
    for (f in ((c = {}), b.Ka.push(c), a.h))
      (d = this.O(a.h[f], b)),
        Object.defineProperty(c, f, {
          value: d,
          writable: !0,
          enumerable: !0,
          configurable: !0,
        });
  b.bb.pop();
  b.Ka.pop();
  return c;
};
function Hc(a, b) {
  for (
    var d = Ic(a), c = Object.getOwnPropertyNames(b), f = 0;
    f < c.length;
    f++
  )
    a.g(d, c[f], b[c[f]]);
  return d;
}
function Ec(a, b) {
  var d = [],
    c;
  for (c in b.h) d[c] = a.D(b, c);
  d.length = Hb(a.D(b, "length")) || 0;
  return d;
}
function Gc(a, b) {
  switch (typeof b) {
    case "number":
      return a.Z.h.prototype;
    case "boolean":
      return a.gb.h.prototype;
    case "string":
      return a.J.h.prototype;
  }
  return b ? b.ra : null;
}
p.D = function (a, b) {
  if (this.N) throw Error("Getter not supported in that context");
  b = String(b);
  (void 0 !== a && null !== a) ||
    K(this, this.m, "Cannot read property '" + b + "' of " + a);
  if ("object" === typeof a && !(a instanceof D))
    throw TypeError("Expecting native value or pseudo object");
  if ("length" === b) {
    if (P(this, a, this.J)) return String(a).length;
  } else if (64 > b.charCodeAt(0) && P(this, a, this.J)) {
    var d = Ib(b);
    if (!isNaN(d) && d < String(a).length) return String(a)[d];
  }
  do if (a.h && b in a.h) return (d = a.S[b]) ? ((this.N = !0), d) : a.h[b];
  while ((a = Gc(this, a)));
};
function fd(a, b, d) {
  if (!(b instanceof D))
    throw TypeError("Primitive data type has no properties");
  d = String(d);
  if ("length" === d && P(a, b, a.J)) return !0;
  if (P(a, b, a.J)) {
    var c = Ib(d);
    if (!isNaN(c) && c < String(b).length) return !0;
  }
  do if (b.h && d in b.h) return !0;
  while ((b = Gc(a, b)));
  return !1;
}
p.g = function (a, b, d, c) {
  if (this.Da) throw Error("Setter not supported in that context");
  b = String(b);
  (void 0 !== a && null !== a) ||
    K(this, this.m, "Cannot set property '" + b + "' of " + a);
  if ("object" === typeof a && !(a instanceof D))
    throw TypeError("Expecting native value or pseudo object");
  c &&
    ("get" in c || "set" in c) &&
    ("value" in c || "writable" in c) &&
    K(
      this,
      this.m,
      "Invalid property descriptor. Cannot both specify accessors and a value or writable attribute"
    );
  var f = !this.o || gd(this).P;
  if (a instanceof D) {
    if (P(this, a, this.J)) {
      var g = Ib(b);
      if ("length" === b || (!isNaN(g) && g < String(a).length)) {
        f &&
          K(
            this,
            this.m,
            "Cannot assign to read only property '" +
              b +
              "' of String '" +
              a.data +
              "'"
          );
        return;
      }
    }
    if ("Array" === a.H)
      if (((g = a.h.length), "length" === b)) {
        if (c) {
          if (!("value" in c)) return;
          d = c.value;
        }
        d = Hb(d);
        isNaN(d) && K(this, this.ib, "Invalid array length");
        if (d < g)
          for (l in a.h) {
            var l = Ib(l);
            !isNaN(l) && d <= l && delete a.h[l];
          }
      } else isNaN((l = Ib(b))) || (a.h.length = Math.max(g, l + 1));
    if (!a.preventExtensions || b in a.h)
      if (c) {
        f = {};
        "get" in c && c.get && ((a.S[b] = c.get), (f.get = this.g.Ub));
        "set" in c && c.set && ((a.V[b] = c.set), (f.set = this.g.Vb));
        "configurable" in c && (f.configurable = c.configurable);
        "enumerable" in c && (f.enumerable = c.enumerable);
        "writable" in c &&
          ((f.writable = c.writable), delete a.S[b], delete a.V[b]);
        "value" in c
          ? ((f.value = c.value), delete a.S[b], delete a.V[b])
          : d !== Pa && ((f.value = d), delete a.S[b], delete a.V[b]);
        try {
          Object.defineProperty(a.h, b, f);
        } catch (w) {
          K(this, this.m, "Cannot redefine property: " + b);
        }
        "get" in c && !c.get && delete a.S[b];
        "set" in c && !c.set && delete a.V[b];
      } else {
        if (d === Pa) throw ReferenceError("Value not specified.");
        for (c = a; !(b in c.h); )
          if (((c = Gc(this, c)), !c)) {
            c = a;
            break;
          }
        if (c.V && c.V[b]) return (this.Da = !0), c.V[b];
        if (c.S && c.S[b])
          f &&
            K(
              this,
              this.m,
              "Cannot set property '" +
                b +
                "' of object '" +
                a +
                "' which only has a getter"
            );
        else
          try {
            a.h[b] = d;
          } catch (w) {
            f &&
              K(
                this,
                this.m,
                "Cannot assign to read only property '" +
                  b +
                  "' of object '" +
                  a +
                  "'"
              );
          }
      }
    else
      f &&
        K(
          this,
          this.m,
          "Can't add property '" + b + "', object is not extensible"
        );
  } else
    f && K(this, this.m, "Can't create property '" + b + "' on '" + a + "'");
};
p.g.Ub = function () {
  throw Error("Placeholder getter");
};
p.g.Vb = function () {
  throw Error("Placeholder setter");
};
function M(a, b, d, c) {
  a.g(b.h.prototype, d, a.i(c, !1), v);
}
function Mc(a, b, d, c) {
  a.g(b.h.prototype, d, a.ob(c), v);
}
function gd(a) {
  a = a.o[a.o.length - 1].scope;
  if (!a) throw Error("No scope found.");
  return a;
}
function Ha(a, b, d) {
  var c = !1;
  if (d && d.P) c = !0;
  else {
    var f = b.body && b.body[0];
    f &&
      f.xa &&
      "Literal" === f.xa.type &&
      "use strict" === f.xa.value &&
      (c = !0);
  }
  f = a.s(null);
  c = new hd(d, c, f);
  d || Kb(a, c.object);
  Jb(a, b, c);
  return c;
}
function id(a, b, d) {
  if (!b) throw Error("parentScope required");
  a = d || a.s(null);
  return new hd(b, b.P, a);
}
function jd(a, b) {
  for (var d = gd(a); d && d !== a.X; ) {
    if (b in d.object.h) return d.object.h[b];
    d = d.Oa;
  }
  if (d === a.X && fd(a, d.object, b)) return a.D(d.object, b);
  d = a.o[a.o.length - 1].node;
  ("UnaryExpression" === d.type && "typeof" === d.operator) ||
    K(a, a.jb, b + " is not defined");
}
function kd(a, b, d) {
  for (var c = gd(a), f = c.P; c && c !== a.X; ) {
    if (b in c.object.h) {
      c.object.h[b] = d;
      return;
    }
    c = c.Oa;
  }
  if (c === a.X && (!f || fd(a, c.object, b))) return a.g(c.object, b, d);
  K(a, a.jb, b + " is not defined");
}
function Jb(a, b, d) {
  if ("VariableDeclaration" === b.type)
    for (var c = 0; c < b.declarations.length; c++)
      a.g(d.object, b.declarations[c].id.name, void 0, Ma);
  else {
    if ("FunctionDeclaration" === b.type) {
      a.g(d.object, b.id.name, Dc(a, b, d), Ma);
      return;
    }
    if ("FunctionExpression" === b.type || "ExpressionStatement" === b.type)
      return;
  }
  var f = b.constructor,
    g;
  for (g in b) {
    var l = b[g];
    if (l && "object" === typeof l)
      if (Array.isArray(l))
        for (c = 0; c < l.length; c++)
          l[c] && l[c].constructor === f && Jb(a, l[c], d);
      else l.constructor === f && Jb(a, l, d);
  }
}
function Fc(a) {
  return a.o[a.o.length - 1].isConstructor;
}
function ld(a, b) {
  return b[0] === Oa ? jd(a, b[1]) : a.D(b[0], b[1]);
}
function md(a, b, d) {
  return b[0] === Oa ? kd(a, b[1], d) : a.g(b[0], b[1], d);
}
function K(a, b, d) {
  void 0 !== d && ((b = a.ta(b)), Oc(a, b, d));
  nd(a, 4, b, void 0);
  throw Na;
}
function nd(a, b, d, c) {
  if (0 === b) throw TypeError("Should not unwind for NORMAL completions");
  var f = a.o;
  a: for (; 0 < f.length; f.pop()) {
    var g = f[f.length - 1];
    switch (g.node.type) {
      case "TryStatement":
        g.aa = { type: b, value: d, label: c };
        return;
      case "CallExpression":
      case "NewExpression":
        if (3 === b) {
          g.value = d;
          return;
        }
        if (4 !== b)
          throw Error("Unsynatctic break/continue not rejected by Acorn");
        break;
      case "Program":
        g.done = !0;
        break a;
    }
    if (1 === b) {
      if (c ? g.labels && -1 !== g.labels.indexOf(c) : g.T || g.Sb) {
        f.pop();
        return;
      }
    } else if (2 === b && (c ? g.labels && -1 !== g.labels.indexOf(c) : g.T))
      return;
  }
  P(a, d, a.F)
    ? ((b = {
        EvalError: EvalError,
        RangeError: RangeError,
        ReferenceError: ReferenceError,
        SyntaxError: SyntaxError,
        TypeError: TypeError,
        URIError: URIError,
      }),
      (c = String(a.D(d, "name"))),
      (f = a.D(d, "message").valueOf()),
      (b = (b[c] || Error)(f)),
      (b.stack = String(a.D(d, "stack"))))
    : (b = String(d));
  throw b;
}
function od(a, b, d) {
  if (!a.N) throw Error("Unexpected call to createGetter");
  a.N = !1;
  d = Array.isArray(d) ? d[0] : d;
  var c = new a.Ga({ options: {} });
  c.type = "CallExpression";
  a = new u(c, a.o[a.o.length - 1].scope);
  a.na = !0;
  a.B = d;
  a.ba = b;
  a.Xa = !0;
  a.G = [];
  return a;
}
function pd(a, b, d, c) {
  if (!a.Da) throw Error("Unexpected call to createSetter");
  a.Da = !1;
  d = Array.isArray(d) ? d[0] : a.Sa;
  var f = new a.Ga({ options: {} });
  f.type = "CallExpression";
  a = new u(f, a.o[a.o.length - 1].scope);
  a.na = !0;
  a.B = d;
  a.ba = b;
  a.Xa = !0;
  a.G = [c];
  return a;
}
function qd(a, b) {
  return void 0 === b || null === b
    ? a.Sa
    : b instanceof D
    ? b
    : ((a = a.s(Gc(a, b))), (a.data = b), a);
}
function u(a, b) {
  this.node = a;
  this.scope = b;
}
function hd(a, b, d) {
  this.Oa = a;
  this.P = b;
  this.object = d;
}
function D(a) {
  this.S = Object.create(null);
  this.V = Object.create(null);
  this.h = Object.create(null);
  this.ra = a;
}
p = D.prototype;
p.ra = null;
p.H = "Object";
p.data = null;
p.toString = function () {
  if (!(this instanceof D)) return String(this);
  if ("Array" === this.H) {
    var a = eb;
    a.push(this);
    try {
      var b = [],
        d = this.h.length,
        c = !1;
      1024 < d && ((d = 1e3), (c = !0));
      for (var f = 0; f < d; f++) {
        var g = this.h[f];
        b[f] = g instanceof D && -1 !== a.indexOf(g) ? "..." : g;
      }
      c && b.push("...");
    } finally {
      a.pop();
    }
    return b.join(",");
  }
  if ("Error" === this.H) {
    a = eb;
    if (-1 !== a.indexOf(this)) return "[object Error]";
    d = this;
    do
      if ("name" in d.h) {
        b = d.h.name;
        break;
      }
    while ((d = d.ra));
    d = this;
    do
      if ("message" in d.h) {
        c = d.h.message;
        break;
      }
    while ((d = d.ra));
    a.push(this);
    try {
      (b = b && String(b)), (c = c && String(c));
    } finally {
      a.pop();
    }
    return c ? b + ": " + c : String(b);
  }
  return null !== this.data ? String(this.data) : "[object " + this.H + "]";
};
p.valueOf = function () {
  return void 0 === this.data ||
    null === this.data ||
    this.data instanceof RegExp
    ? this
    : this.data instanceof Date
    ? this.data.valueOf()
    : this.data;
};
t.prototype.stepArrayExpression = function (a, b, d) {
  d = d.elements;
  var c = b.A || 0;
  b.Ha
    ? (this.g(b.Ha, c, b.value), c++)
    : ((b.Ha = Ic(this)), (b.Ha.h.length = d.length));
  for (; c < d.length; ) {
    if (d[c]) return (b.A = c), new u(d[c], b.scope);
    c++;
  }
  a.pop();
  a[a.length - 1].value = b.Ha;
};
t.prototype.stepAssignmentExpression = function (a, b, d) {
  if (!b.ea) return (b.ea = !0), (b = new u(d.left, b.scope)), (b.ma = !0), b;
  if (!b.wa) {
    b.ya || (b.ya = b.value);
    b.ua && (b.fa = b.value);
    if (
      !b.ua &&
      "=" !== d.operator &&
      ((a = ld(this, b.ya)), (b.fa = a), this.N)
    )
      return (b.ua = !0), od(this, a, b.ya);
    b.wa = !0;
    "=" === d.operator && "Identifier" === d.left.type && (b.Ia = d.left.name);
    return new u(d.right, b.scope);
  }
  if (b.oa) a.pop(), (a[a.length - 1].value = b.cb);
  else {
    var c = b.fa,
      f = b.value;
    switch (d.operator) {
      case "=":
        c = f;
        break;
      case "+=":
        c += f;
        break;
      case "-=":
        c -= f;
        break;
      case "*=":
        c *= f;
        break;
      case "/=":
        c /= f;
        break;
      case "%=":
        c %= f;
        break;
      case "<<=":
        c <<= f;
        break;
      case ">>=":
        c >>= f;
        break;
      case ">>>=":
        c >>>= f;
        break;
      case "&=":
        c &= f;
        break;
      case "^=":
        c ^= f;
        break;
      case "|=":
        c |= f;
        break;
      default:
        throw SyntaxError("Unknown assignment expression: " + d.operator);
    }
    if ((d = md(this, b.ya, c)))
      return (b.oa = !0), (b.cb = c), pd(this, d, b.ya, c);
    a.pop();
    a[a.length - 1].value = c;
  }
};
t.prototype.stepBinaryExpression = function (a, b, d) {
  if (!b.ea) return (b.ea = !0), new u(d.left, b.scope);
  if (!b.wa) return (b.wa = !0), (b.fa = b.value), new u(d.right, b.scope);
  a.pop();
  var c = b.fa;
  b = b.value;
  switch (d.operator) {
    case "==":
      d = c == b;
      break;
    case "!=":
      d = c != b;
      break;
    case "===":
      d = c === b;
      break;
    case "!==":
      d = c !== b;
      break;
    case ">":
      d = c > b;
      break;
    case ">=":
      d = c >= b;
      break;
    case "<":
      d = c < b;
      break;
    case "<=":
      d = c <= b;
      break;
    case "+":
      d = c + b;
      break;
    case "-":
      d = c - b;
      break;
    case "*":
      d = c * b;
      break;
    case "/":
      d = c / b;
      break;
    case "%":
      d = c % b;
      break;
    case "&":
      d = c & b;
      break;
    case "|":
      d = c | b;
      break;
    case "^":
      d = c ^ b;
      break;
    case "<<":
      d = c << b;
      break;
    case ">>":
      d = c >> b;
      break;
    case ">>>":
      d = c >>> b;
      break;
    case "in":
      b instanceof D ||
        K(this, this.m, "'in' expects an object, not '" + b + "'");
      d = fd(this, b, c);
      break;
    case "instanceof":
      P(this, b, this.M) ||
        K(this, this.m, "Right-hand side of instanceof is not an object");
      d = c instanceof D ? P(this, c, b) : !1;
      break;
    default:
      throw SyntaxError("Unknown binary operator: " + d.operator);
  }
  a[a.length - 1].value = d;
};
t.prototype.stepBlockStatement = function (a, b, d) {
  var c = b.A || 0;
  if ((d = d.body[c])) return (b.A = c + 1), new u(d, b.scope);
  a.pop();
};
t.prototype.stepBreakStatement = function (a, b, d) {
  nd(this, 1, void 0, d.label && d.label.name);
};
t.prototype.Ab = 0;
t.prototype.stepCallExpression = function (a, b, d) {
  if (!b.na) {
    b.na = 1;
    var c = new u(d.callee, b.scope);
    c.ma = !0;
    return c;
  }
  if (1 === b.na) {
    b.na = 2;
    c = b.value;
    if (Array.isArray(c)) {
      if (
        ((b.ba = ld(this, c)),
        c[0] === Oa ? (b.Hb = "eval" === c[1]) : (b.B = c[0]),
        (c = b.ba),
        this.N)
      )
        return (b.na = 1), od(this, c, b.value);
    } else b.ba = c;
    b.G = [];
    b.A = 0;
  }
  c = b.ba;
  if (!b.Xa) {
    0 !== b.A && b.G.push(b.value);
    if (d.arguments[b.A]) return new u(d.arguments[b.A++], b.scope);
    if ("NewExpression" === d.type) {
      (c instanceof D && !c.ub) || K(this, this.m, c + " is not a constructor");
      if (c === this.ia) b.B = Ic(this);
      else {
        var f = c.h.prototype;
        if ("object" !== typeof f || null === f) f = this.L;
        b.B = this.s(f);
      }
      b.isConstructor = !0;
    }
    b.Xa = !0;
  }
  if (b.Ya)
    a.pop(),
      (a[a.length - 1].value =
        b.isConstructor && "object" !== typeof b.value ? b.B : b.value);
  else {
    b.Ya = !0;
    c instanceof D || K(this, this.m, c + " is not a function");
    if ((a = c.node)) {
      d = Ha(this, a.body, c.Oa);
      for (var g = 0; g < a.params.length; g++)
        this.g(d.object, a.params[g].name, b.G.length > g ? b.G[g] : void 0);
      f = Ic(this);
      for (g = 0; g < b.G.length; g++) this.g(f, g, b.G[g]);
      this.g(d.object, "arguments", f);
      (g = a.id && a.id.name) && this.g(d.object, g, c);
      d.P || (b.B = qd(this, b.B));
      this.g(d.object, "this", b.B, Ka);
      b.value = void 0;
      return new u(a.body, d);
    }
    if (c.eval)
      if (((c = b.G[0]), "string" !== typeof c)) b.value = c;
      else {
        try {
          g = Ga(String(c), "eval" + this.Ab++);
        } catch (w) {
          K(this, this.ja, "Invalid code: " + w.message);
        }
        c = new this.Ga({ options: {} });
        c.type = "EvalProgram_";
        c.body = g.body;
        Ia(c, d.start, d.end);
        d = b.Hb ? b.scope : this.X;
        d.P ? (d = Ha(this, g, d)) : Jb(this, g, d);
        this.value = void 0;
        return new u(c, d);
      }
    else if (c.La)
      b.scope.P || (b.B = qd(this, b.B)), (b.value = c.La.apply(b.B, b.G));
    else if (c.Ta) {
      var l = this;
      g = c.Ta.length - 1;
      g = b.G.concat(Array(g)).slice(0, g);
      g.push(function (w) {
        b.value = w;
        l.sa = !1;
      });
      this.sa = !0;
      b.scope.P || (b.B = qd(this, b.B));
      c.Ta.apply(b.B, g);
    } else K(this, this.m, c.H + " is not callable");
  }
};
t.prototype.stepCatchClause = function (a, b, d) {
  if (b.R) a.pop();
  else
    return (
      (b.R = !0),
      (a = id(this, b.scope)),
      this.g(a.object, d.param.name, b.ac),
      new u(d.body, a)
    );
};
t.prototype.stepConditionalExpression = function (a, b, d) {
  var c = b.ga || 0;
  if (0 === c) return (b.ga = 1), new u(d.test, b.scope);
  if (1 === c) {
    b.ga = 2;
    if ((c = !!b.value) && d.consequent) return new u(d.consequent, b.scope);
    if (!c && d.alternate) return new u(d.alternate, b.scope);
    this.value = void 0;
  }
  a.pop();
  "ConditionalExpression" === d.type && (a[a.length - 1].value = b.value);
};
t.prototype.stepContinueStatement = function (a, b, d) {
  nd(this, 2, void 0, d.label && d.label.name);
};
t.prototype.stepDebuggerStatement = function (a) {
  a.pop();
};
t.prototype.stepDoWhileStatement = function (a, b, d) {
  "DoWhileStatement" === d.type &&
    void 0 === b.ca &&
    ((b.value = !0), (b.ca = !0));
  if (!b.ca) return (b.ca = !0), new u(d.test, b.scope);
  if (!b.value) a.pop();
  else if (d.body) return (b.ca = !1), (b.T = !0), new u(d.body, b.scope);
};
t.prototype.stepEmptyStatement = function (a) {
  a.pop();
};
t.prototype.stepEvalProgram_ = function (a, b, d) {
  var c = b.A || 0;
  if ((d = d.body[c])) return (b.A = c + 1), new u(d, b.scope);
  a.pop();
  a[a.length - 1].value = this.value;
};
t.prototype.stepExpressionStatement = function (a, b, d) {
  if (!b.R) return (b.R = !0), new u(d.expression, b.scope);
  a.pop();
  this.value = b.value;
};
t.prototype.stepForInStatement = function (a, b, d) {
  if (
    !b.Mb &&
    ((b.Mb = !0), d.left.declarations && d.left.declarations[0].init)
  )
    return (
      b.scope.P &&
        K(
          this,
          this.ja,
          "for-in loop variable declaration may not have an initializer."
        ),
      new u(d.left, b.scope)
    );
  if (!b.va)
    return (b.va = !0), b.ha || (b.ha = b.value), new u(d.right, b.scope);
  b.T || ((b.T = !0), (b.u = b.value), (b.eb = Object.create(null)));
  if (void 0 === b.Ja)
    a: for (;;) {
      if (b.u instanceof D)
        for (b.qa || (b.qa = Object.getOwnPropertyNames(b.u.h)); ; ) {
          var c = b.qa.shift();
          if (void 0 === c) break;
          if (
            Object.prototype.hasOwnProperty.call(b.u.h, c) &&
            !b.eb[c] &&
            ((b.eb[c] = !0),
            Object.prototype.propertyIsEnumerable.call(b.u.h, c))
          ) {
            b.Ja = c;
            break a;
          }
        }
      else if (null !== b.u && void 0 !== b.u)
        for (b.qa || (b.qa = Object.getOwnPropertyNames(b.u)); ; ) {
          c = b.qa.shift();
          if (void 0 === c) break;
          b.eb[c] = !0;
          if (Object.prototype.propertyIsEnumerable.call(b.u, c)) {
            b.Ja = c;
            break a;
          }
        }
      b.u = Gc(this, b.u);
      b.qa = null;
      if (null === b.u) {
        a.pop();
        return;
      }
    }
  if (!b.rb)
    if (((b.rb = !0), (a = d.left), "VariableDeclaration" === a.type))
      b.ha = [Oa, a.declarations[0].id.name];
    else return (b.ha = null), (b = new u(a, b.scope)), (b.ma = !0), b;
  b.ha || (b.ha = b.value);
  if (!b.oa && ((b.oa = !0), (a = b.Ja), (c = md(this, b.ha, a))))
    return pd(this, c, b.ha, a);
  b.Ja = void 0;
  b.rb = !1;
  b.oa = !1;
  if (d.body) return new u(d.body, b.scope);
};
t.prototype.stepForStatement = function (a, b, d) {
  var c = b.ga || 0;
  if (0 === c) {
    if (((b.ga = 1), d.init)) return new u(d.init, b.scope);
  } else if (1 === c) {
    if (((b.ga = 2), d.test)) return new u(d.test, b.scope);
  } else if (2 === c)
    if (((b.ga = 3), d.test && !b.value)) a.pop();
    else return (b.T = !0), new u(d.body, b.scope);
  else if (3 === c && ((b.ga = 1), d.update)) return new u(d.update, b.scope);
};
t.prototype.stepFunctionDeclaration = function (a) {
  a.pop();
};
t.prototype.stepFunctionExpression = function (a, b, d) {
  a.pop();
  b = a[a.length - 1];
  b.value = Dc(this, d, b.scope, b.Ia);
};
t.prototype.stepIdentifier = function (a, b, d) {
  a.pop();
  if (b.ma) a[a.length - 1].value = [Oa, d.name];
  else {
    b = jd(this, d.name);
    if (this.N) return od(this, b, this.Sa);
    a[a.length - 1].value = b;
  }
};
t.prototype.stepIfStatement = t.prototype.stepConditionalExpression;
t.prototype.stepLabeledStatement = function (a, b, d) {
  a.pop();
  a = b.labels || [];
  a.push(d.label.name);
  b = new u(d.body, b.scope);
  b.labels = a;
  return b;
};
t.prototype.stepLiteral = function (a, b, d) {
  a.pop();
  b = d.value;
  b instanceof RegExp && ((d = this.s(this.Fa)), Nc(this, d, b), (b = d));
  a[a.length - 1].value = b;
};
t.prototype.stepLogicalExpression = function (a, b, d) {
  if ("&&" !== d.operator && "||" !== d.operator)
    throw SyntaxError("Unknown logical operator: " + d.operator);
  if (!b.ea) return (b.ea = !0), new u(d.left, b.scope);
  if (b.wa) a.pop(), (a[a.length - 1].value = b.value);
  else if (
    ("&&" === d.operator && !b.value) ||
    ("||" === d.operator && b.value)
  )
    a.pop(), (a[a.length - 1].value = b.value);
  else return (b.wa = !0), new u(d.right, b.scope);
};
t.prototype.stepMemberExpression = function (a, b, d) {
  if (!b.va) return (b.va = !0), new u(d.object, b.scope);
  if (d.computed)
    if (b.Nb) d = b.value;
    else return (b.u = b.value), (b.Nb = !0), new u(d.property, b.scope);
  else (b.u = b.value), (d = d.property.name);
  a.pop();
  if (b.ma) a[a.length - 1].value = [b.u, d];
  else {
    d = this.D(b.u, d);
    if (this.N) return od(this, d, b.u);
    a[a.length - 1].value = d;
  }
};
t.prototype.stepNewExpression = t.prototype.stepCallExpression;
t.prototype.stepObjectExpression = function (a, b, d) {
  var c = b.A || 0,
    f = d.properties[c];
  if (b.u) {
    var g = b.Ia;
    b.Ca[g] || (b.Ca[g] = {});
    b.Ca[g][f.kind] = b.value;
    b.A = ++c;
    f = d.properties[c];
  } else (b.u = this.s(this.L)), (b.Ca = Object.create(null));
  if (f) {
    var l = f.key;
    if ("Identifier" === l.type) g = l.name;
    else if ("Literal" === l.type) g = l.value;
    else throw SyntaxError("Unknown object structure: " + l.type);
    b.Ia = g;
    return new u(f.value, b.scope);
  }
  for (l in b.Ca)
    (d = b.Ca[l]),
      "get" in d || "set" in d
        ? this.g(b.u, l, Pa, {
            configurable: !0,
            enumerable: !0,
            get: d.get,
            set: d.set,
          })
        : this.g(b.u, l, d.init);
  a.pop();
  a[a.length - 1].value = b.u;
};
t.prototype.stepProgram = function (a, b, d) {
  if ((a = d.body.shift())) return (b.done = !1), new u(a, b.scope);
  b.done = !0;
};
t.prototype.stepReturnStatement = function (a, b, d) {
  if (d.argument && !b.R) return (b.R = !0), new u(d.argument, b.scope);
  nd(this, 3, b.value, void 0);
};
t.prototype.stepSequenceExpression = function (a, b, d) {
  var c = b.A || 0;
  if ((d = d.expressions[c])) return (b.A = c + 1), new u(d, b.scope);
  a.pop();
  a[a.length - 1].value = b.value;
};
t.prototype.stepSwitchStatement = function (a, b, d) {
  if (!b.ca) return (b.ca = 1), new u(d.discriminant, b.scope);
  1 === b.ca && ((b.ca = 2), (b.$b = b.value), (b.Wa = -1));
  for (;;) {
    var c = b.$a || 0,
      f = d.cases[c];
    if (b.Aa || !f || f.test)
      if (f || b.Aa || -1 === b.Wa)
        if (f) {
          if (!b.Aa && !b.yb && f.test)
            return (b.yb = !0), new u(f.test, b.scope);
          if (b.Aa || b.value === b.$b) {
            b.Aa = !0;
            var g = b.A || 0;
            if (f.consequent[g])
              return (
                (b.Sb = !0), (b.A = g + 1), new u(f.consequent[g], b.scope)
              );
          }
          b.yb = !1;
          b.A = 0;
          b.$a = c + 1;
        } else {
          a.pop();
          break;
        }
      else (b.Aa = !0), (b.$a = b.Wa);
    else (b.Wa = c), (b.$a = c + 1);
  }
};
t.prototype.stepThisExpression = function (a) {
  a.pop();
  a[a.length - 1].value = jd(this, "this");
};
t.prototype.stepThrowStatement = function (a, b, d) {
  if (b.R) K(this, b.value);
  else return (b.R = !0), new u(d.argument, b.scope);
};
t.prototype.stepTryStatement = function (a, b, d) {
  if (!b.Ib) return (b.Ib = !0), new u(d.block, b.scope);
  if (b.aa && 4 === b.aa.type && !b.Lb && d.handler)
    return (
      (b.Lb = !0),
      (a = new u(d.handler, b.scope)),
      (a.ac = b.aa.value),
      (b.aa = void 0),
      a
    );
  if (!b.Kb && d.finalizer) return (b.Kb = !0), new u(d.finalizer, b.scope);
  a.pop();
  b.aa && nd(this, b.aa.type, b.aa.value, b.aa.label);
};
t.prototype.stepUnaryExpression = function (a, b, d) {
  if (!b.R)
    return (
      (b.R = !0),
      (a = new u(d.argument, b.scope)),
      (a.ma = "delete" === d.operator),
      a
    );
  a.pop();
  var c = b.value;
  if ("-" === d.operator) c = -c;
  else if ("+" === d.operator) c = +c;
  else if ("!" === d.operator) c = !c;
  else if ("~" === d.operator) c = ~c;
  else if ("delete" === d.operator) {
    d = !0;
    if (Array.isArray(c)) {
      var f = c[0];
      f === Oa && (f = b.scope);
      c = String(c[1]);
      try {
        delete f.h[c];
      } catch (g) {
        b.scope.P
          ? K(this, this.m, "Cannot delete property '" + c + "' of '" + f + "'")
          : (d = !1);
      }
    }
    c = d;
  } else if ("typeof" === d.operator)
    c = c && "Function" === c.H ? "function" : typeof c;
  else if ("void" === d.operator) c = void 0;
  else throw SyntaxError("Unknown unary operator: " + d.operator);
  a[a.length - 1].value = c;
};
t.prototype.stepUpdateExpression = function (a, b, d) {
  if (!b.ea)
    return (b.ea = !0), (a = new u(d.argument, b.scope)), (a.ma = !0), a;
  b.za || (b.za = b.value);
  b.ua && (b.fa = b.value);
  if (!b.ua) {
    var c = ld(this, b.za);
    b.fa = c;
    if (this.N) return (b.ua = !0), od(this, c, b.za);
  }
  if (b.oa) a.pop(), (a[a.length - 1].value = b.cb);
  else {
    c = Number(b.fa);
    if ("++" === d.operator) var f = c + 1;
    else if ("--" === d.operator) f = c - 1;
    else throw SyntaxError("Unknown update expression: " + d.operator);
    d = d.prefix ? f : c;
    if ((c = md(this, b.za, f)))
      return (b.oa = !0), (b.cb = d), pd(this, c, b.za, f);
    a.pop();
    a[a.length - 1].value = d;
  }
};
t.prototype.stepVariableDeclaration = function (a, b, d) {
  d = d.declarations;
  var c = b.A || 0,
    f = d[c];
  b.vb && f && (kd(this, f.id.name, b.value), (b.vb = !1), (f = d[++c]));
  for (; f; ) {
    if (f.init)
      return (b.A = c), (b.vb = !0), (b.Ia = f.id.name), new u(f.init, b.scope);
    f = d[++c];
  }
  a.pop();
};
t.prototype.stepWithStatement = function (a, b, d) {
  if (b.va)
    if (b.Jb) a.pop();
    else return (b.Jb = !0), (a = id(this, b.scope, b.value)), new u(d.body, a);
  else return (b.va = !0), new u(d.object, b.scope);
};
t.prototype.stepWhileStatement = t.prototype.stepDoWhileStatement;
this.Interpreter = t;
t.prototype.step = t.prototype.fb;
t.prototype.run = t.prototype.xb;
t.prototype.appendCode = t.prototype.Cb;
t.prototype.createObject = t.prototype.ta;
t.prototype.createObjectProto = t.prototype.s;
t.prototype.createAsyncFunction = t.prototype.ob;
t.prototype.createNativeFunction = t.prototype.i;
t.prototype.getProperty = t.prototype.D;
t.prototype.setProperty = t.prototype.g;
t.prototype.nativeToPseudo = t.prototype.Ba;
t.prototype.pseudoToNative = t.prototype.O;
