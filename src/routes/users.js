const router = require('express').Router()
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addBooksToUser,
  removeBooksFromUser,
} = require('../controllers/users')

router.get('/', getUsers)
router.post('/', createUser)
router.get('/:user_id', getUser)
router.patch('/:user_id', updateUser)
router.delete('/:user_id', deleteUser)
router.post('/:user_id/books/:book_id', addBooksToUser)
router.delete('/:user_id/books/:book_id', removeBooksFromUser)

module.exports = router
