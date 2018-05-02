const Mercury = require('mercury')
const send = require('../')

test('type not set', async () => {
  const app = new Mercury()
  app.use(send)
  app.router.get('/', (req, res) => res.send())
  const response = await app.inject({ url: '/' })
  expect(response.headers['content-type']).toBeUndefined()
  expect(response.payload).toBe('')
})

test('type set to text/html', async () => {
  const type = 'text/html'
  const content = '<p>Hi</p>'
  const app = new Mercury()
  app.use(send)
  app.router.get('/', (req, res) => res.type(type).send(content))
  const response = await app.inject({ url: '/' })
  expect(response.headers['content-type']).toEqual(type)
  expect(response.payload).toEqual(content)
})
