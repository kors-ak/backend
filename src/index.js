const http = require('http')
const getUsers = require('./modules/users')

const server = http.createServer((request, response) => {
  if (request.url === '/users') {
    response.statusCode = 200
    response.statusMessage = 'ok'
    response.header = 'Content-Type: application/json'
    response.write(getUsers())
    response.end()

    return
  }

  response.statusCode = 200
  response.statusMessage = 'ok'
  response.header = 'Content-Type: text/plain'
  response.write('Hello, World')
  response.end()
})

server.listen(3000, () => {
  console.log('сервер запущен по адресу http://127.0.0.1:3003')
})
