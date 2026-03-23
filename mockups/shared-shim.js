/* ============================================================
   BLAZE COMPATIBILITY SHIM — DELETE THIS FILE IN METEOR.
   In Meteor, Template and ReactiveVar are provided by the framework.

   This shim exists solely so the static HTML mockups can demonstrate
   interactive behaviour (tab switching, modals, toggles) using the
   same Template.name.events / helpers / onCreated / onRendered
   patterns that real Blaze code uses.

   When converting to Meteor:
   1. Delete this file entirely.
   2. Remove the <script src="./shared-shim.js"></script> tag from
      each mockup HTML file.
   3. The Template and ReactiveVar references in each page's own
      <script> block are now real Blaze/Meteor globals.
   ============================================================ */

var ReactiveVar = function(v) {
  this._v = v; this._d = [];
  this.get = function() { return this._v; };
  this.set = function(v) { this._v = v; var s = this; this._d.forEach(function(f){f.call(s,v);}); };
  this.onChange = function(f) { this._d.push(f); };
};

var Template = {};
Template.instance = function() { return Template._inst; };
Template._inst = { $: function(sel) { return document.querySelectorAll(sel); } };
Template._define = function(name) {
  var t = { _e: {}, _h: {}, _inst: Template._inst };
  Template[name] = t;
  t.helpers = function(h) { Object.assign(t._h, h); return t; };
  t.events = function(e) { Object.assign(t._e, e); return t; };
  t.onCreated = function(fn) { t._created = fn; fn.call(t._inst); return t; };
  t.onRendered = function(fn) {
    document.addEventListener('DOMContentLoaded', function() { fn.call(t._inst); });
    return t;
  };
  return t;
};

/* Bind events from event maps on DOMContentLoaded */
document.addEventListener('DOMContentLoaded', function() {
  Object.keys(Template).forEach(function(name) {
    var t = Template[name];
    if (!t || !t._e) return;
    Object.keys(t._e).forEach(function(key) {
      // Blaze event maps support comma-separated entries: 'click .a, change .b'
      var entries = key.split(',').map(function(s) { return s.trim(); });
      var handler = t._e[key];
      entries.forEach(function(entry) {
        var parts = entry.split(' ');
        var eventType = parts[0];
        var selector = parts.slice(1).join(' ');
        document.querySelectorAll(selector).forEach(function(el) {
          el.addEventListener(eventType, function(e) { handler.call(this, e, t._inst); });
        });
      });
    });
  });
});
