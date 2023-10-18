import Joi from 'joi';

export const reviewValidator = async (data) => {
  const Schema = Joi.object({
    title: Joi.string().optional(),
    content: Joi.string().optional(),
  });

  const validate = Schema.validate(data);
  let error = false;
  let message = '';

  if (validate.error) {
    message = validate.error.details[0].message;
    message = message.replace(/"/g, '');
    error = true;
  }
  return { error, message };
};
