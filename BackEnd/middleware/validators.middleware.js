const yup = require('yup');

const userSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    phone: yup.string().required(),
});

const productSchema = yup.object({
    product_name: yup.string().required(),
    product_category: yup.string().required(),
    product_quantity_stock: yup.number().required().positive().integer(),
    product_units: yup.string().required(),
    product_price: yup.number().required().positive()
})

const contentSchema = yup.object({
    _id: yup.string().required(),
    product_quantity_box : yup.number().required().positive().integer()
})

const boxSchema = yup.object({
    box_name: yup.string().required(),
    box_price: yup.number().required(),
    box_content: yup.array().of(contentSchema).required()
})

const orderSchema = yup.object({
    order_name: yup.string().required(),
    order_number: yup.string().required(),
    delivery_address: yup.string().required(),
    delivery_city: yup.string().required(),
    delivery_zipcode: yup.string().required(),
    total_price: yup.number().required(),
    payment_method: yup.string().required()
})

const orderContentBoxContentSchema = yup.object({
    productId: yup.string().required(),
    product_name: yup.string().required(),
    product_category: yup.string().required(),
    product_units: yup.string().required(),
    product_price: yup.number().required().positive(),
    product_image: yup.string().required(),
    amount: yup.number().required().positive()
})

const orderContentBoxesSchema = yup.object({
    box_Id: yup.string().required(),
    box_name: yup.string().required(),
    box_price: yup.number().positive(),
    box_quantity: yup.number().required().positive(),
    box_content: yup.array().of(orderContentBoxContentSchema)
})

const orderBodySchema = yup.object({
    order: orderSchema,
    order_content: yup.object({
        boxes: yup.array().of(orderContentBoxesSchema)
    })
})


module.exports={
    userSchema,
    productSchema,
    boxSchema,
    orderBodySchema
} 