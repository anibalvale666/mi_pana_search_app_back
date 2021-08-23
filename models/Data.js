const {Schema, model } = require('mongoose');


const DataSchema = Schema ({
    placa: {
        type: String,
        required: true,
        unique: true
    },
    marca: {
        type: String,
        required: true
    },
    aceite_motor: {
        aceite: {
            type: String
        },
        fecha: {
            type: Date
        },
        km: {
            type: String
        }
    },
    aceite_caja: {
        aceite: {
            type: String
        },
        fecha: {
            type: Date
        },
        km: {
            type: String
        }
    },
    filtros:{
        aceite: {
            type: String
        },
        aire: {
            type: String
        },
        combustible: {
            type: String
        },
        cabina: {
            type: String
        }
    },
    liquido_radiador: {
        liquido: {
            type: String
        },
        fecha: {
            type: Date
        },
        km: {
            type: String
        }
    },
    obs: {
        type: String
    }
});

DataSchema.method('toJSON', function()  {
    const{ __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'Data', DataSchema );