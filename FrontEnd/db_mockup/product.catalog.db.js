const catalog = {
    'Vegetales': [
        {
            id: 1,
            name: 'Brocoli',
            catalog: 'Vegetales',
            image: {uri: 'https://solidstarts.com/wp-content/uploads/Broccoli_edited-480x320@2x.jpg'},
            quantity: 3,
            units: 'lbs',
            price: 2.49
        },
        {
            id: 2,
            name: 'Cebolla',
            catalog: 'Vegetales',
            image: {uri: 'http://dakahliaproduce.com/wp-content/uploads/2015/01/fresh-yellow-onion.jpg'},
            quantity: 5,
            units: 'lbs',
            price: 1.10
        },
        {
            id: 3,
            name: 'Ajo',
            catalog: 'Vegetales',
            image: require('../assets/products/Broccoli.jpeg'),
            quantity: 2,
            units: 'dientes',
            price: 0.30
        },
        {
            id: 9,
            name: 'Ajo',
            catalog: 'Vegetales',
            image: require('../assets/products/Broccoli.jpeg'),
            quantity: 2,
            units: 'dientes',
            price: 0.30
        }
    ],

    'Frutas': [
        {
            id: 4,
            name: 'Piña',
            catalog: 'Frutas',
            image: require('../assets/products/Broccoli.jpeg'),
            quantity: 3,
            units: 'lbs',
            price: 2.49
        },
        {
            id: 5,
            name: 'Uvas',
            catalog: 'Frutas',
            image: require('../assets/products/Broccoli.jpeg'),
            quantity: 5,
            units: 'lbs',
            price: 1.10
        },
        {
            id: 6,
            name: 'Guineos',
            catalog: 'Frutas',
            image: require('../assets/products/Broccoli.jpeg'),
            quantity: 1,
            units: 'mano',
            price: 2.30
        },
    ],

    'Viandas': [
        {
            id: 7,
            name: 'Ñame',
            catalog: 'Viandas',
            image: require('../assets/products/Broccoli.jpeg'),
            quantity: 3,
            units: 'lbs',
            price: 2.49
        },
        {
            id: 8,
            name: 'Yuca',
            catalog: 'Viandas',
            image: require('../assets/products/Broccoli.jpeg'),
            quantity: 5,
            units: 'lbs',
            price: 1.10
        },
        {
            id: 9,
            name: 'Yautía',
            catalog: 'Viandas',
            image: require('../assets/products/Broccoli.jpeg'),
            quantity: 2,
            units: 'dientes',
            price: 0.30
        },
    ]
}

export default catalog
