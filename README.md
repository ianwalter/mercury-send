# mercury-send
> An Express/Connect-compatible middleware for sending HTTP responses

[![npm page][npm-image]][npm-url]
[![appjumpstart chat][gitter-image]][gitter-url]

## About

`mercury-send` is a super simple middleware that provides (or overrides) a
`res.send` function that you can use in other middleware/route handlers. You
can use it with Node's http.Server, Express, or any connect-compatible
framework. To get the most benefit, you'll want to use it in tandem with
[mercury-schema](https://github.com/appjumpstart/mercury-schema) which will
provide `mercury-send` with a stringify function based on a pre-compiled
response schema.

## Installation

```fish
❯ npm install @appjumpstart/mercury-send --save
```

## Usage

```js
const mercurySend = require('@appjumpstart/mercury-send')

// ...

// Use the mercury-send middleware to more easily send responses.
app.use(mercurySend)

// Use res.send in your route-handler to send object that are converted to
// JSON using JSON.stringify or perhaps a stringify function provided by
// mercury-schema.
app.get('/', (req, res) => res.type('json').send({ message: 'Hello!' }))
```

## Acknowledgement

`mercury-send` is completely modeled around some of the features within the
excellent [Fastify](https://fastify.io) framework.

&nbsp;

<a href="https://github.com/appjumpstart">
  <img
    alt="AppJumpstart"
    src="https://appjumpstart.nyc3.digitaloceanspaces.com/assets/appjumpstart-transparent.png"
    height="50">
</a>

[npm-image]: https://img.shields.io/npm/v/@appjumpstart/mercury-schema.svg
[npm-url]: https://www.npmjs.com/package/@appjumpstart/mercury-schema
[gitter-image]: https://img.shields.io/gitter/room/appjumpstart/appjumpstart.svg
[gitter-url]: https://gitter.im/appjumpstart
