const Mercury = require('mercury')
const send = require('../')

test('status with no content', async () => {
  const app = new Mercury()
  app.use(send)
  app.router.get('/', (req, res) => res.status(204).send())
  const response = await app.inject({ url: '/' })
  expect(response.statusCode).toBe(204)
  expect(response.payload).toBe('')
})
