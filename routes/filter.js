/*
    Event Routes
    /api/filterswishlist
*/

const { Router } = require( "express");
const { check } = require( "express-validator" );
const { getFiltersByMonth,createDataFilter, DeleteFilter, changeDataFilter } = require("../controllers/filters");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


// cualquier peticion que se encuentre abajo de esto tienen que pasar opr validar token
router.use( validarJWT );


//buscar filtros por mes
router.post('/', [
    [
        check('date', 'La fecha es obligatoria').not().isEmpty(),
        check('date', 'Debe ingresar una fecha valida').custom(isDate),
        validarCampos
    ]    
], getFiltersByMonth)

//crear un nuevo registro de filtro
router.post('/new',[
    [
        check('date', 'La fecha es obligatoria').not().isEmpty(),
        check('date', 'Debe ingresar una fecha valida').custom(isDate),
        check('brand', 'La Marca es obligatoria').not().isEmpty(),
        check('filterType', 'El tipo de filtro es obligatorio').not().isEmpty(),
        check('code', 'El codigo es obligatoria').not().isEmpty(),
        validarCampos
    ]    
], createDataFilter)

//eliminar registro de filtro
router.delete('/delete/:id', DeleteFilter)

//modificar registro de filtro
router.put('/:id',changeDataFilter)

//traer lista de filtro


module.exports = router;