const {Schema, model} = require('mongoose');


const ItemSchema = Schema({
    // OIL FILTER OTHER
    item_type: {
        type: String,
        required: true,
    },
    
    brand: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    last_date_update: {
        type: Date,
        required: true,
    },
    sale: {
        type: Number,
    },
    //oil item
    // FULL SEMI MINERAL
    oil_type: {
        type: String,
        
    },
    // 0W-40 0W-20 5W-20 5W-30 5W-40 10W-30 10W-40 15W-40 20W-50 25W-50 25W-60
    // 10W-60 SAE 40 SAE 50 
    grade :{
        type: String,

    },
    model: {
        type: String
    },
    // GASOLINE DIESEL
    fuel: {
        type: String,
    },
    //filter item
    // OIL AIR FUEL CABIN 
    filter_type: {
        type: String,
    
    },
    code: {
        type:String,
    },
    application: [{value: {type:String}}]

});

ItemSchema.method('toJSON', function()  {
    const{ __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Item', ItemSchema);