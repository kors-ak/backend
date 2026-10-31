const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const routes = require('./routes')
const cors = require('./middlewares/cors')
const mongoose = require('mongoose')

dotenv.config()

const app = express()

const { API_URL, PORT, DATABASE } = process.env

app.use(bodyParser.json())
app.use('/', cors)
app.use('/', routes)

app.use((req, res) => {
  res.status(404).send({ message: 'Запрошенный маршрут не найден' })
})

mongoose
  .connect(DATABASE)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err.message)
  })
