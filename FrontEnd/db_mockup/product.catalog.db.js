const catalog = {
    'Vegetales': [
        {
            _id: 1,
            product_name: 'Brocoli',
            product_category: 'Vegetales',
            product_image: {uri: 'https://solidstarts.com/wp-content/uploads/Broccoli_edited-480x320@2x.jpg'},
            product_quantity_stock: 3,
            product_units: 'lbs',
            product_price: 2.49
        },
        {
            _id: 2,
            product_name: 'Cebolla',
            product_category: 'Vegetales',
            product_image: {uri: 'http://dakahliaproduce.com/wp-content/uploads/2015/01/fresh-yellow-onion.jpg'},
            product_quantity_stock: 5,
            product_units: 'lbs',
            product_price: 1.10
        },
        {
            _id: 3,
            product_name: 'Ajo',
            product_category: 'Vegetales',
            product_image: require('../assets/products/Broccoli.jpeg'),
            product_quantity_stock: 2,
            product_units: 'dientes',
            product_price: 0.30
        },
        {
            _id: 9,
            product_name: 'Ajo',
            product_category: 'Vegetales',
            product_image: require('../assets/products/Broccoli.jpeg'),
            product_quantity_stock: 2,
            product_units: 'dientes',
            product_price: 0.30
        },
        {
            _id: 20,
            product_name: 'Ajo',
            product_category: 'Vegetales',
            product_image: require('../assets/products/Broccoli.jpeg'),
            product_quantity_stock: 2,
            product_units: 'dientes',
            product_price: 0.30
        }
    ],

    'Frutas': [
        {
            _id: 4,
            product_name: 'Piña',
            product_category: 'Frutas',
            product_image: require('../assets/products/Broccoli.jpeg'),
            product_quantity_stock: 3,
            product_units: 'lbs',
            product_price: 2.49
        },
        {
            _id: 5,
            product_name: 'Uvas',
            product_category: 'Frutas',
            product_image: require('../assets/products/Broccoli.jpeg'),
            product_quantity_stock: 5,
            product_units: 'lbs',
            product_price: 1.10
        },
        {
            _id: 6,
            product_name: 'Guineos',
            product_category: 'Frutas',
            product_image: require('../assets/products/Broccoli.jpeg'),
            product_quantity_stock: 1,
            product_units: 'mano',
            product_price: 2.30
        },
    ],

    'Viandas': [
        {
            _id: 7,
            product_name: 'Ñame',
            product_category: 'Viandas',
            product_image: require('../assets/products/Broccoli.jpeg'),
            product_quantity_stock: 3,
            product_units: 'lbs',
            product_price: 2.49
        },
        {
            _id: 8,
            product_name: 'Yuca',
            product_category: 'Viandas',
            product_image: require('../assets/products/Broccoli.jpeg'),
            product_quantity_stock: 5,
            product_units: 'lbs',
            product_price: 1.10
        },
        {
            _id: 9,
            product_name: 'Yautía',
            product_category: 'Viandas',
            product_image: require('../assets/products/Broccoli.jpeg'),
            product_quantity_stock: 2,
            product_units: 'dientes',
            product_price: 0.30
        },
    ]
}

export default catalog
