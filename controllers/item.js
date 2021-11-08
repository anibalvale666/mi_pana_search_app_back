const {response} = require('express');
const Data = require('../models/Data');
const Item = require('../models/Item');



const getItemByBrand = async(req, res= response) => {

    const {brand} = req.body;

    try {
        const items = await Item.find({ 
            brand: brand
            })
          
        if(!items.length) {
            return res.status(404).json({
                ok: false,
                msg:'no hay articulos para la marca buscada'
            })
        }
        
        return res.status(200).json({
            ok: true,
            items
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }    
}


const createItem = async( req, res = response ) => {
    const registro = new Item( req.body );
    try {
        const registroGuardado = await registro.save();

        res.status(201).json({
            ok: true,
            item: registroGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getItemByBrand,
    createItem,
}
