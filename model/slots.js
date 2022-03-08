const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotsSchema = new Schema({
    slots: {
        type: String, required: false
    },
    status: {
        type: String, required: false
    }
})

module.exports = mongoose.model('Slots', slotsSchema);