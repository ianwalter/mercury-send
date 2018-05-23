const flatstr = require('flatstr')

module.exports = function mercurySend (req, res, next) {
  // Preserve the original send function for later use if it exists or use
  // Node's res.end in it's place.
  res.originalSend = res.send || res.end

  res.send = function (payload) {
    let body = payload
    if (typeof payload === 'string') {
      // Use flatstr to flatten the string in case it's been concatenated.
      body = flatstr(payload)
    } else if (typeof payload === 'object') {
      // Default the stringify function that converts JavaScript objects and
      // arrays to a JSON string to JSON.stringify.
      let stringify = JSON.stringify

      // If the response object has a stringify function defined, try to use it
      // instead of the default.
      if (this.stringify) {
        const type = typeof this.stringify
        if (type === 'function') {
          // Use res.stringify directly since it's a function.
          stringify = this.stringify
        } else if (type === 'object' && this.stringify[this.statusCode]) {
          // Use a property of res.stringify based on the status code.
          stringify = this.stringify[this.statusCode]
        }
      }

      // Convert the payload into a string using the stringify function.
      body = stringify(payload)
    }

    // Use the original send function to actually send the response.
    res.originalSend(body)
  }

  // Pony up!
  next()
}
