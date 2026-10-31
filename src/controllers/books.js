const Book = require('../models/book')

const getBooks = (req, res) => {
  Book.find({})
    .then((book) => {
      if (book.length === 0) {
        return res.status(404).send({ message: 'Список книг пуст' })
      }
      res.status(200).send(book)
    })
    .catch((e) => {
      res.status(500).send(e.message)
    })
}

const getBook = (req, res) => {
  const { book_id } = req.params
  Book.findById(book_id)
    .then((book) => {
      if (!book) {
        return res.status(404).send({ message: 'Книга с таким ID не найдена' })
      }
      res.status(200).send(book)
    })
    .catch((e) => {
      res.status(500).send(e.message)
    })
}

const createBook = (req, res) => {
  const data = req.body
  Book.create(data)
    .then((book) => {
      res.status(201).send(book)
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании книги',
        })
      }
      res.status(500).send(e.message)
    })
}

const updateBook = (req, res) => {
  const { book_id } = req.params
  const data = req.body
  Book.findByIdAndUpdate(book_id, data, { new: true, runValidators: true })
    .then((book) => {
      if (!book) {
        return res.status(404).send({ message: 'Книга с таким ID не найдена' })
      }
      res.status(200).send(book)
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Передан некорректный ID книги' })
      }
      if (e.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при обновлении данных книги',
        })
      }
      res.status(500).send(e.message)
    })
}

const deleteBook = (req, res) => {
  const { book_id } = req.params
  Book.findByIdAndDelete(book_id)
    .then((book) => {
      if (!book) {
        return res.status(404).send({ message: 'Книга с таким ID не найдена' })
      }
      res.status(200).send('Данные успешно удалены')
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Передан некорректный ID книги' })
      }
      res.status(500).send(e.message)
    })
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
}
