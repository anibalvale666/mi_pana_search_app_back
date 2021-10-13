/* 
    account Routes
    .../api/account

*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getAccountsByBrand, deleteAccount, changeAccount, createAccount, getNotPaidAccounts } = require("../controllers/accounts");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

// cualquier peticion que se encuentre abajo de esto tienen que pasar opr validar token
router.use(validarJWT);


//cargar todas las cuentas activas
router.post('/notpaidaccounts',[],getNotPaidAccounts);


//cargar cuentas de una determinada marca
router.post('/',[
    [   
        check('brand', 'La marca es obligatoria').not().isEmpty(), 
        validarCampos
    ]
]
    ,getAccountsByBrand)

//añadir cuenta
router.post('/new',[
    [
        check('invoice_number', 'invoice_number obligatorio').not().isEmpty(),
        check('brand', 'marca es obligatorio').not().isEmpty(),
        check('total_amount', 'monto total obligatorio').not().isEmpty()
    ]
],createAccount);   

//eliminar cuenta
router.delete('/delete/:id',deleteAccount);
//editar cuenta
router.put('/:id',changeAccount);



module.exports = router;