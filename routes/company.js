/*
    Event Routes
    /api/company
*/

const { Router } = require( "express"); 
const { check } = require( "express-validator" );
const { getCompanies, createCompany, deleteCompany, changeCompany } = require("../controllers/company");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


// cualquier peticion que se encuentre abajo de esto tienen que pasar opr validar token
router.use( validarJWT );


//buscar compañias
router.post('/', [], getCompanies)

//crear un nuevo registro de filtro
router.post('/new',[[   
    check('name', 'el nombre es obligatoria').not().isEmpty(),
    check('brand', 'La marca es obligatoria').not().isEmpty(),
    validarCampos
]], createCompany)

//eliminar registro de filtro
router.delete('/delete/:id', deleteCompany)

//modificar registro de filtro
router.put('/:id',changeCompany)

//traer lista de filtro
module.exports = router;