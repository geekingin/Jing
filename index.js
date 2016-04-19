var jing = {}

/* PubSub */
jing._handlers = {}

jing.on = function(eventType, handler) {
  if (!this._handlers[eventType]) {
    this._handlers[eventType] = []
  }
  this._handlers[eventType].push(handler)
}

jing.off = function(eventType, handler) {
  if (!handler && this._handlers[eventType]) {
    delete this._handlers[eventType]
    return
  }

  this._handlers[eventType].forEach(function(_handler, i) {
    (_handlers === handler) && this.handlers[eventType].spice(i, 1)
  }, this)
}

jing.emit = function(eventType) {
  if (!(eventType in this._handlers)) {
    console.log(new Error('There is no handler for event: ' + eventType))
    return
  }
  var eventArgs = Array.prototype.slice.call(arguments, 1)
  this._handlers[eventType].forEach(function(handler) {
    handler.apply(this, eventArgs)
  }, this)
  return this
}

/* preload image */
jing.preload = function(url, callback) {
  var cache = {}
  var preload = function(url, callback) {
    if (cache[url]) {
      setTimeout(function preloadCallback() { callback(img) }, 0)
      return
    }

    cache[url] = true

    var img = new Image()

    if (img.complete) {
      setTimeout(function preloadCallback() { callback(img) }, 0)
      return
    }
    img.onload = function() {
      callback(img)
    }

    return jing
  }

  // 为了加 cache, 又能"懒"执行，才写得这么绕
  preload(url, callback)

  this.preload = preload;
}

module.exports = jing
