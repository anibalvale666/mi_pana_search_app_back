/*
    Rutas de Usuarios /Auth
    host + /api/auth
*/ 

const {Router} = require('express');
const { check } = require('express-validator');
const router =  Router();
const {loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/',
[ //middleware
    check('nick', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El pasword es obligatorio').not().isEmpty(),
    validarCampos
], 
loginUsuario);

router.get('/renew',validarJWT, revalidarToken);



module.exports = router;