const flatstr = require('flatstr')

module.exports = function mercurySend (req, res, next) {
  res.status = function status (code) {
    this.statusCode = code
    return this
  }

  res.send = function send (payload) {
    const stringify = res.stringify || JSON.stringify
    let contentType = 'text/plain'
    let content = payload
    if (typeof payload === 'object') {
      contentType = 'application/json;charset=utf-8'
      content = stringify(payload)
    } else {
      content = flatstr(payload)
    }

    //
    this.writeHead(res.statusCode || 200, { 'content-type': contentType })
    this.end(content)
  }

  next()
}
