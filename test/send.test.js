const Mercury = require('mercury')
const send = require('../')

test('send no content', async () => {
  const app = new Mercury()
  app.use(send)
  app.router.get('/', (req, res) => res.send())
  const response = await app.inject({ url: '/' })
  expect(response.statusCode).toBe(200)
  expect(response.payload).toBe('')
})
