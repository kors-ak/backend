const http = require('http')
const getUsers = require('./modules/users')

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`)
  const params = url.searchParams

  if (url.pathname === '/') {
    if (params.has('hello')) {
      response.setHeader('Content-Type', 'text/plain; charset=utf-8')
      const name = params.get('hello')

      if (name) {
        response.statusCode = 200
        response.write(`Hello, ${name}!`)
      } else {
        response.statusCode = 400
        response.write('Enter a name')
      }

      response.end()

      return
    }

    response.statusCode = 200
    response.setHeader('Content-Type', 'text/plain; charset=utf-8')
    response.write('Hello, World!')
    response.end()

    return
  }

  if (url.pathname === '/users') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json; charset=utf-8')
    response.write(getUsers())
    response.end()

    return
  }

  response.statusCode = 500
  response.setHeader('Content-Type', 'text/plain; charset=utf-8')
  response.write('')
  response.end()
})

server.listen(3003, () => {
  console.log('сервер запущен по адресу http://127.0.0.1:3003')
})
