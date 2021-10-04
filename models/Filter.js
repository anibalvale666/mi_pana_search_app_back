const { Schema, model } = require('mongoose');

const FilterSchema = Schema ({
    date: {
        type: Date,
        required: true,
    },
    filterType: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    code: {
        type:String,
        required: true
    },
    application: [{value: {type:String}}]
    
});

FilterSchema.method('toJSON', function()  {
    const{ __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Filter', FilterSchema );