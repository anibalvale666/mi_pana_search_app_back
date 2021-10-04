const { response } = require('express');
const Filter = require('../models/Filter');

const getFiltersByMonth = async(req, res= response) => {

    const data = req.body;
    const date = new Date(data.date);


    const filtros = await Filter.find({ 
        date: {
              $gte: new Date(new Date(date.getFullYear(),date.getMonth(),1).setHours(00, 00, 00)),
              $lt: new Date(new Date(date.getFullYear(),date.getMonth()+1,0).setHours(23, 59, 59))
               }
        }).sort({ date: 'asc'})  
      
    if(!filtros.length) {
        return res.status(404).json({
            ok: false,
            msg:'no hay filtros para el mes buscado'
        })
    }
    
    return res.json({
        ok: true,
        filtros
    });
}



const createDataFilter= async( req, res = response) => {

    const registro = new Filter( req.body );
    try {

        const registroGuardado = await registro.save();

        res.json({
            ok: true,
            filtro: registroGuardado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}

const changeDataFilter  = async(req, res = response) => {

    const filterId = req.params.id;
    
    try {
        const record = await Filter.findById(filterId);

        if( !record ) {
            return res.status(404).json ({
                ok: false,
                msg: 'filtro no existe por ese id'
            });
        }

        const newRecord = {
            ...req.body
        };

        const recordAct = await Filter.findByIdAndUpdate(filterId, newRecord,{new: true});

        res.json({
            ok: true,
            filtro: recordAct
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const DeleteFilter = async (req, res = response) => {

    const filterId = req.params.id;

    try {
        const record = await Filter.findById(filterId);

        if( !record ) {
            return res.status(404).json ({
                ok: false,
                msg: 'filtro no existe por ese id'
            });
        }



        await Filter.findByIdAndDelete(filterId);

        res.json({
            ok: true,
            msg: 'filtro eliminado'
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
    getFiltersByMonth,
    createDataFilter,
    changeDataFilter,
    DeleteFilter
}
