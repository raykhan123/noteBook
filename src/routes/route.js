const express = require('express')
const router = express.Router()
const userController = require('../Controller/UserControlle')
const authenticate = require('../middleware/auth')
const notesController = require('../Controller/notesController')

router.post('/createData',userController.createUser)
router.post('/login',userController.userLogin)
router.get('/getData',authenticate.authenticate,userController.getUser)


router.post('/notes',authenticate.authenticate,notesController.createNote)
router.get('/getNotes',authenticate.authenticate,notesController.getNotes)
router.put('/update/:id',authenticate.authenticate,notesController.updateNotes)
router.delete('/delete/:id',authenticate.authenticate,notesController.deleteNotes)









module.exports = router