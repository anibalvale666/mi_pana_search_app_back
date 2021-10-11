const {Schema, model } = require('mongoose');

const RecordSchema = Schema({
        date: {
            type: Date,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
});

const AccountSchema = Schema ({
    invoice_number: {
        type: String,
        required: true,
        uppercase: true
    },
    brand: {
        type: String,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    initial_date: {
        type: Date,
        required: true
    },
    paid: {
        type: Boolean,
        default: false,
    },
    currency :{
        type: String,
        required: true
    },
    record: [RecordSchema]
});

AccountSchema.method('toJSON', function()  {
    const{ __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('Account', AccountSchema);