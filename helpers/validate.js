const joi = require("joi");

const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

const validateData = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().trim(),
    template: joi.string().min(4).max(20).required().trim(),
    apikey: joi.string().trim().min(35).max(35).required(),
  });
  return schema.validate(data, options);
};

module.exports = {
  validateData,
};
