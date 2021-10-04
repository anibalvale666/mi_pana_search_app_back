const {Schema, model } = require('mongoose');

const RecordSchema = Schema({
        date: {
            type: Date,
            required
        },
        amount: {
            type: String,
            required
        },
        balance: {
            type: String,
            required
        }
});

const AccountSchema = Schema ({
    invoice_number: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    record: [RecordSchema]
});


module.exports = model('Account', AccountSchema);