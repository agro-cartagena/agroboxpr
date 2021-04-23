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
    box_content: yup.array().of(contentSchema)
})

module.exports={
    userSchema,
    productSchema,
    boxSchema
} 