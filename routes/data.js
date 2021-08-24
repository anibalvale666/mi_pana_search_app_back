
/*
    Event Routes
    /api/events
*/

const {Router} = require("express");
const { check } = require("express-validator");
const { getRegistro, crearRegistro, actualizarRegistro } = require("../controllers/data");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const{ validarJWT } = require('../middlewares/validar-jwt')



const router = Router();

//Obtener registro
router.post('/', getRegistro);

// cualquier peticion que se encuentre abajo de esto tienen que pasar opr validar token
router.use( validarJWT );




//Crear nuevo registro
router.post('/',[
    [
        check('placa', 'La placa es obligatoria').not().isEmpty(),
        check('marca', 'La marca es obligatoria').not().isEmpty(),
        validarCampos
    ]
], crearRegistro);

//Actualizar Registro
router.put('/:id',  actualizarRegistro);

module.exports = router;