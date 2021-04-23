
// Data validation middleware, resource schema must be a yup schema.
const validateEntity = (entitySchema) => async (req, res, next) => {
    const entity = req.body;
    try {
      // throws an error if not valid
      await entitySchema.validate(entity);
      next();
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.errors.join(', ') });
    //   next(err);
    }
};
  
module.exports = {
    validateEntity
}