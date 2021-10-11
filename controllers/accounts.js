const { response } = require('express');
const Account = require('../models/Account');


const getAccountsByBrand = async(req, res= response) => {

    const {brand} = req.body;

    try {
        const accounts = await Account.find({ 
            brand: brand
            })
          
        if(!accounts.length) {
            return res.status(404).json({
                ok: false,
                msg:'no hay cuentas para la marca buscada'
            })
        }
        
        return res.status(200).json({
            ok: true,
            accounts
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }    
}


const createAccount = async( req, res = response ) => {
    const registro = new Account( req.body );
    try {
        const registroGuardado = await registro.save();

        res.status(201).json({
            ok: true,
            account: registroGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}


const changeAccount = async( req, res = response) => {
    const accountId = req.params.id;
    
    try {
        const record = await Account.findById(accountId);

        if( !record ) {
            return res.status(404).json ({
                ok: false,
                msg: 'cuenta no existe por ese id'
            });
        }

        const newRecord = {
            ...req.body
        };

        const recordAct = await Account.findByIdAndUpdate(accountId, newRecord,{new: true});

        res.status(201).json({
            ok: true,
            account: recordAct
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}


const deleteAccount = async (req, res = response) => {

    const accountId = req.params.id;

    try {
        const record = await Account.findById(accountId);

        if( !record ) {
            return res.status(404).json ({
                ok: false,
                msg: 'cuenta no existe por ese id'
            });
        }

        await Account.findByIdAndDelete(accountId);

        res.status(200).json({
            ok: true,
            msg: 'cuenta eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getAccountsByBrand,
    createAccount,
    changeAccount,
    deleteAccount
}