var { boxSchema } = require('./validators.middleware')

// Data validation middleware, resource schema must be a yup schema.
const validateEntity = (entitySchema) => async (req, res, next) => {
    const entity = req.body;

    console.log("Entity: ", entity)

    try {
      // throws an error if not valid
      await entitySchema.validate(entity);
      next();
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.errors.join(', ') });
      next(err);
    }
};

const validateBoxEntity = () => async (req, res, next) => {
  console.log("Inside Box validation!")
  console.log(req.body)

  const { box_name, box_price, box_content } = req.body

  try {
    const box = {
      box_name: box_name, 
      box_price: Number(box_price), 
      box_content: JSON.parse(box_content)
    }
    
    console.log(box)
    // throws an error if not valid
    await boxSchema.validate(box);
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.errors.join(', ') });
    next(err);
  }
};
  
module.exports = {
    validateEntity,
    validateBoxEntity
}