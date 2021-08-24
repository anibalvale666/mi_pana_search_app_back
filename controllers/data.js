const {response} = require('express');
const Data = require('../models/Data');




const getRegistro = async(req, res = response) => {

    // const dataf = await Data.find({
    //     plca: ''
    // })

    const data = req.body;
    const placa = data.placa.toUpperCase();
   try {
        const dataf = await Data.findOne({placa});

        if(dataf) {
            return res.status(200).json({
                ok: true,
                data: dataf
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'la placa ingresada no se encuentra registrada'
            });
        }
       
   } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
   }


}



const crearRegistro = async(req, res = response) => {

    const data = new Data( req.body);
    data.placa = data.placa.toUpperCase();
    const {placa} = data;
    

    try {
        const dataf = await Data.findOne({placa});
        if(dataf) {
            return res.status(404).json({
                ok: false,
                msg: 'la placa ya fue registrada'
            });
        }
 
        const dataGuardada = await data.save()

        res.json({
            ok: true,
            data: dataGuardada
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}
const actualizarRegistro = async (req, res = response) => {
    const dataId = req.params.id;

    try {
        const data = await Data.findById( dataId );

        if(!data) {
            res.status(404).json({
                ok: false,
                msg: 'la placa no esta registrada'
            })
        }
        const nuevaData = {
            ...req.body
        }

         const dataActualizada = await Data.findByIdAndUpdate( dataId, nuevaData, { new: true } );
        return res.status(200).json({
            ok:true,
            data: dataActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getRegistro,
    crearRegistro,
    actualizarRegistro
}
