const session = require('express-session');
const express = require('express');

let router 	= express.Router();

let appointmentSchema = require('../model/appointments');
let slotsSchema = require('../model/slots');

router.use(session({
	secret: 'appointments',
	resave: false,
	saveUninitialized: false,
	cookie: { expires: 6000000 }
}));

router.post('/bookAppointment', async (req, res, next) => {
    let  phoneNnumber = req.body.mobile_number;
    if (phoneNnumber.length!=10) {
		res.json({ success: false, message: "phone number must be enter 10 Digit"});
		return;
	}
	if(isNaN(phoneNnumber)||phoneNnumber.indexOf(" ")!=-1) {
		res.json({ success: false, msg: "invalid phone number enter valid digit" });
        return false;
    }

    let appointmentDetails = new appointmentSchema({
        name: req.body.name, mobile_number: phoneNnumber, slots: req.body.slots, status: 'booked'
    })
    let booked = await slotsSchema.updateOne({_id : req.body.id}, {
        $set: {
            status: 'booked'
        }
    })
    appointmentDetails.save().then(doc => {
        res.status(201).json({
            status: 200, message: "appointment booked successfully "
        });
    })
});

router.get('/appointmentList', async (req, res, next) => {
    let appointment = await appointmentSchema.find({status: 'booked'});
    if(appointment.length > 0) {
        res.status(200).json({
            status: 200, message: "list of appointment fetched successfully", data : appointment
        })
    }
    else {
        res.status(404).json({
            status: 404, message: "no appointment found"
        })
    }
});


router.get('/availableSlots', async (req, res, next) => {
    let slots = await slotsSchema.find({status: 'available'});
    if(slots.length > 0) {
        res.status(200).json({
            status: 200, message: "available slots fetched successfully", data : slots
        })
    }
    else {
        res.status(404).json({
            status: 404, message: "no slots found" 
        })
    }
});


module.exports = router;