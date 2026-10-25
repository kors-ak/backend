const http = require('http')
const getUsers = require('./modules/users')

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`)
  const params = url.searchParams

  response.setHeader('Content-Type', 'text/plain; charset=utf-8')

  if (url.pathname === '/users') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json; charset=utf-8')
    response.end(getUsers())

    return
  }

  if (url.pathname !== '/') {
    response.statusCode = 500
    response.end()
    return
  }

  if (params.has('hello')) {
    const name = params.get('hello')

    response.statusCode = name ? 200 : 400
    response.end(name ? `Hello, ${name}!` : 'Enter a name')

    return
  }

  if (params.size > 0) {
    response.statusCode = 500
    response.end()
    return
  }

  response.statusCode = 200
  response.end('Hello, World!')
})

server.listen(3003, () => {
  console.log('сервер запущен по адресу http://127.0.0.1:3003')
})
