//initialize the stripe package by requiring it with the stripe package and call with secret key

const stripe = require('stripe')('sk_test_EJd2HkMJXEBVwi8fP7NHu27b008wZTZhYR');

//create a new function postCharge
//function is a request handler thus two parameters; res and req
//open try catch block in which all variable to be sent along are destructured
//create new variable charge which holds an event of an async call to the stripe api
async function postCharge(res, req) {
    try {
        const {amount, source, receipt_email} = req.body;
        const charge = await stripe.charges.create({
            amount,
            currency: 'ksh',
            source,
            receipt_email
        });

        //if result of call is false means payment failed
        if (!charge) throw new Error('Charge unsuccessful');

        //payment success respond with 200 status code and json object
        res.status(200).json({
            message: 'charge posted successfully',
            charge
        })
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = postCharge;