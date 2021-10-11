const { response } = require('express');
const Company = require('../models/Company');


const getCompanies = async(req, res= response) => {
    try {
        const companies = await Company.find()  
        if(!companies.length) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay compañias registradas'
            })
        }
        
        return res.status(200).json({
            ok: true,
            companies
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}



const createCompany= async( req, res = response) => {

    const registro = new Company( req.body );
    registro.name = registro.name.toUpperCase();
    registro.brand = registro.brand.toUpperCase();
 
    try {
        const registroGuardado = await registro.save();

        res.status(201).json({
            ok: true,
            company: registroGuardado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}

const changeCompany  = async(req, res = response) => {

    const companyId = req.params.id;

    try {
        const record = await Company.findById(companyId);

        if( !record ) {
            return res.status(404).json ({
                ok: false,
                msg: 'compañia no existe por ese id'
            });
        }
        
        const newRecord = {
            ...req.body
        };

        const recordAct = await Company.findByIdAndUpdate(companyId, newRecord,{new: true});

        res.status(201).json({
            ok: true,
            company: recordAct
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const deleteCompany = async (req, res = response) => {

    const companyId = req.params.id;

    try {
        const record = await Company.findById(companyId);

        if( !record ) {
            return res.status(404).json ({
                ok: false,
                msg: 'compañia no existe por ese id'
            });
        }



        await Company.findByIdAndDelete(companyId);

        res.status(200).json({
            ok: true,
            msg: 'compañia eliminada'
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
    getCompanies,
    createCompany,
    changeCompany,
    deleteCompany
}
