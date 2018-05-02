const flatstr = require('flatstr')

module.exports = function mercurySend (req, res, next) {
  res.type = function type (type) {
    this.contentType = type
    return this
  }

  res.status = function status (code) {
    this.statusCode = code
    return this
  }

  res.send = function send (payload) {
    const stringify = this.stringify || JSON.stringify
    const headers = {
      ...(this.contentType ? { 'content-type': this.contentType } : {})
    }

    let content = payload
    if (typeof payload === 'object') {
      if (!headers['content-type']) {
        headers['content-type'] = 'application/json;charset=utf-8'
      }
      content = stringify(payload)
    } else if (typeof payload === 'string') {
      if (!headers['content-type']) {
        headers['content-type'] = 'text/plain'
      }
      content = flatstr(payload)
    }

    //
    this.writeHead(this.statusCode || 200, headers)
    this.end(content)
  }

  next()
}
