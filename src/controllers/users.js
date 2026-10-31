const User = require('../models/user')

const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      if (user.length === 0) {
        return res.status(404).send({ message: 'Список пользователей пуст' })
      }
      res.status(200).send(user)
    })
    .catch((e) => {
      res.status(500).send(e.message)
    })
}

const getUser = (req, res) => {
  const { user_id } = req.params
  User.findById(user_id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Пользователь с таким ID не найден' })
      }
      res.status(200).send(user)
    })
    .catch((e) => {
      res.status(500).send(e.message)
    })
}

const createUser = (req, res) => {
  const data = req.body
  User.create(data)
    .then((user) => {
      res.status(201).send(user)
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя',
        })
      }
      res.status(500).send(e.message)
    })
}

const updateUser = (req, res) => {
  const { user_id } = req.params
  const data = req.body
  User.findByIdAndUpdate(user_id, data, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Пользователь с таким ID не найден' })
      }
      res.status(200).send(user)
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Передан некорректный ID пользователя' })
      }
      if (e.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при обновлении пользователя',
        })
      }
      res.status(500).send(e.message)
    })
}

const deleteUser = (req, res) => {
  const { user_id } = req.params
  User.findByIdAndDelete(user_id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Пользователь с таким ID не найден' })
      }
      res.status(200).send('Данные успешно удалены')
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Передан некорректный ID пользователя' })
      }
      res.status(500).send(e.message)
    })
}

const addBooksToUser = (req, res) => {
  const { user_id, book_id } = req.params
  User.findByIdAndUpdate(
    user_id,
    { $addToSet: { books: book_id } },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Пользователь с таким ID не найден' })
      }
      res.status(201).send('Книга успешно добавлена')
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Передан некорректный ID пользователя или книги' })
      }
      res.status(500).send(e.message)
    })
}

const removeBooksFromUser = (req, res) => {
  const { user_id, book_id } = req.params
  User.findByIdAndUpdate(user_id, { $pull: { books: book_id } })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Пользователь с таким ID не найден' })
      }
      res.status(200).send('Книга успешно удалена')
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Передан некорректный ID пользователя или книги' })
      }
      res.status(500).send(e.message)
    })
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addBooksToUser,
  removeBooksFromUser,
}
