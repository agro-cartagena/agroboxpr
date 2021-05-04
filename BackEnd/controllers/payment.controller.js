const paypal = require('paypal-rest-sdk')

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AdcbaD_WkkTqkhi0KRrePE5xueZJQChV6iSwCXdbD2c5pBrMS8rEY18PHEwfOm6K9VAKaoD9aN4ym_-d',
    'client_secret': 'EI2fe9phC3ZSdlnJeDSHrL2F1bsy67EGUT-XBD6a7YQE7d4ajlmWqQCUGnoBHeP8vtnqJhJ04bNlE3zQ'
})

class PaymentController {
    constructor() {}

    viewATHM = async(req, res) => {
        res.render('ATHM');
    }

    viewPayPal = async (req, res) => {
        res.render('PayPal')
    }

    processPayPal = async (req, res) => {
        const price = req.body.price

        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `http://10.0.0.6:5000/api/payment/success?price=${price}`,
                "cancel_url": "http://10.0.0.6:5000/api/payment/cancel"
            },
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": price
                },
                "description": "Pagarés hecho hacia AgroBox PR."
            }]
        };
        
        
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                console.log("Create Payment Response");
                console.log(payment);
                res.redirect(payment.links[1].href)
            }
        });
    }

    handleSuccess = async (req, res) => {
        const PayerID = req.query.PayerID,
              paymentId = req.query.paymentId,
              price = req.query.price;

        var execute_payment_json = {
            "payer_id": PayerID,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": price
                }
            }]
        };
                
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log("Get Payment Response");
                console.log(JSON.stringify(payment));

                res.render('Success', { paymentId: paymentId })
            }
        });
    }

    handleCancel = async (req, res) => {
        res.render('Cancel')
    }
}

module.exports = new PaymentController()