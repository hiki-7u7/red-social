const {Router} = require('express')
const {obtenerImagen,crearImagen,likeImagen,comentarImagen,borrarImagen,home} = require('../controllers/images')
const router = Router()

router.get('/', home)

router.get('/pin/:id_img', obtenerImagen)

router.post('/pin',crearImagen)

router.post('/pin/:id_img/like',likeImagen)

router.post('/pin/:id_img/comment',comentarImagen)

router.delete('/pin/:id_img',borrarImagen)

module.exports = router