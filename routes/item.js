/*
    Item Routes
    /api/item
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getItemByBrand, createItem } = require("../controllers/item");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


// cualquier peticion que se encuentre abajo de esto tienen que pasar opr validar token
// router.use( validarJWT );

// buscar items
router.post('/',[
    [   
        check('brand', 'La marca es obligatoria').not().isEmpty(), 
        validarCampos
    ]
],getItemByBrand);


//crear nuevo aceite
router.post('/new',[
    [
        check('brand', 'La marca es obligatoria').not().isEmpty(), 
        check('cost', 'El costo es obligatorio').not().isEmpty(), 
        check('last_date_update', 'Debe ingresar una fecha valida').custom(isDate),
        check('item_type', 'El tipo de articulo es obligatorio').not().isEmpty(),
        validarCampos
    ]    
], createItem);


module.exports = router;