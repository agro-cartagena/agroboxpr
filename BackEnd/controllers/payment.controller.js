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
        console.log(req.body)
        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:5000/api/payment/success",
                "cancel_url": "http://localhost:5000/api/payment/cancel"
            },
            "transactions": [{
                // "item_list": {
                //     "items": [{
                //         "name": "item",
                //         "sku": "item",
                //         "price": "1.00",
                //         "currency": "USD",
                //         "quantity": 1
                //     }]
                // },
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
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
        // res.send("Success")
        const PayerID = req.query.PayerID,
              paymentId = req.query.paymentId;

        var execute_payment_json = {
            "payer_id": PayerID,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
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

                const script = `<script>window.ReactNativeWebView.postMessage(${paymentId})</script>`

                res.render('Success', { paymentId: script })
            }
        });
    }

    handleCancel = async (req, res) => {
        res.render('Cancel')
    }
}

module.exports = new PaymentController()