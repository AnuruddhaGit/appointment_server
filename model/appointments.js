const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    name: {
        type: String, required: true 
    },
    mobile_number: {
        type: String, unique: true, required: true 
    },
    slots: {
        type: String, required: true 
    },
    status: {
        type: String, required: false
    }
})

module.exports = mongoose.model('Appointments', appointmentSchema);
