
// list of orders containing only one order.
const order = [
    {
        _id: '',
        order_addressee: 'Jr',
        addressee_phone: '',
        order_address: {
            street: '',
            city: '',
            state: '',
            zipcode: ''
        },
        order_total: '',
        payment_method: '',
        transaction_id: '',
        order_date: '',
        order_status: '',
        order_content: [
            {
                _id: '',
                box_name: '',
                box_price: '',
                box_quantity: '',
                box_content: [
                    {   
                        _id: '',
                        product_name: '',
                        product_price: '',
                        product_quantity_box: '',
                        product_units: ''
                    },
                    {
                        _id: '',
                        product_name: '',
                        product_price: '',
                        product_quantity_box: '',
                        product_units: ''
                    },
                    {
                        _id: '',
                        product_name: '',
                        product_price: '',
                        product_quantity_box: '',
                        product_units: ''
                    },
                    {
                        _id: '',
                        product_name: '',
                        product_price: '',
                        product_quantity_box: '',
                        product_units: ''
                    }
                ]
            },

            {
                _id: '',
                box_name: '',
                box_price: '',
                box_quantity: '',
                box_content: [
                    {   
                        _id: '',
                        product_name: '',
                        product_price: '',
                        product_quantity_box: '',
                        product_units: ''
                    },
                    {
                        _id: '',
                        product_name: '',
                        product_price: '',
                        product_quantity_box: '',
                        product_units: ''
                    },
                    {
                        _id: '',
                        product_name: '',
                        product_price: '',
                        product_quantity_box: '',
                        product_units: ''
                    },
                    {
                        _id: '',
                        product_name: '',
                        product_price: '',
                        product_quantity_box: '',
                        product_units: ''
                    }
                ]
            }
        ]
    }
]

const orders = {
    'En Camino': [
        
    ], 
    'Pendiente': [
        {
            _id: '1',
            order_name: 'Hector Jimenez',
            order_number: '732-930-8189',
            delivery_address: 'Carr 119 km 8.0',
            delivery_city: 'Camuy',
            delivery_state: 'PR',
            delivery_zipcode: '00627',
            order_total: 74.99,
            payment_method: 'Cash',
            transaction_id: 'N/A',
            order_date: '11/8/20',
            order_status: 'Pendiente'
        },
        {
            _id: '2',
            order_name: 'Bob Padilla',
            order_number: '939-543-0829',
            delivery_address: 'Calle Villa Meau',
            delivery_city: 'Aguadilla',
            delivery_state: 'PR',
            delivery_zipcode: '00690',
            order_total: 40,
            payment_method: 'PayPal',
            transaction_id: '1234124124',
            order_date: '10/12/20',
            order_status: 'Pendiente'
        },
        {
            _id: '3',
            order_name: 'Hector Jimenez',
            order_number: '732-930-8189',
            delivery_address: 'Carr 119 km 8.0',
            delivery_city: 'Mayaguez',
            delivery_state: 'PR',
            delivery_zipcode: '00627',
            order_total: 52.99,
            payment_method: 'Cash',
            transaction_id: 'N/A',
            order_date: '1/15/21',
            order_status: 'Pendiente'
        },
        {
            _id: '4',
            order_name: 'Bob Padilla',
            order_number: '939-543-0829',
            delivery_address: 'Calle Villa Meau',
            delivery_city: 'Ponce',
            delivery_state: 'PR',
            delivery_zipcode: '00690',
            order_total: 67.23,
            payment_method: 'PayPal',
            transaction_id: '1234124124',
            order_date: '3/20/20',
            order_status: 'Pendiente'
        }
    ], 
    'Completadas':[
        {
            _id: '1',
            order_name: 'Hector Jimenez',
            order_number: '732-930-8189',
            delivery_address: 'Carr 119 km 8.0',
            delivery_city: 'Camuy',
            delivery_state: 'PR',
            delivery_zipcode: '00627',
            order_total: 52.99,
            payment_method: 'Cash',
            transaction_id: 'N/A',
            order_date: '10/12/20',
            order_status: 'Completada'
        },
        {
            _id: '2',
            order_name: 'Bob Padilla',
            order_number: '939-543-0829',
            delivery_address: 'Calle Villa Meau',
            delivery_city: 'Aguadilla',
            delivery_state: 'PR',
            delivery_zipcode: '00690',
            order_total: 67.23,
            payment_method: 'PayPal',
            transaction_id: '1234124124',
            order_date: '10/12/20',
            order_status: 'Completada'
        }
    ]
}

export default orders