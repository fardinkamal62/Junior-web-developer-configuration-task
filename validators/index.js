const Joi = require('joi')

const MAX_EMAIL_LENGTH = 100;

const schemas = module.exports;

schemas.loginSchema = Joi.object({
	email: Joi.string().max(MAX_EMAIL_LENGTH).email().required(),
	password: Joi.string()
		.min(8)
		.max(100)
		.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
		.messages({
			'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
		})
		.required(),
});

schemas.registerUser = Joi.object({
	name: Joi.string().min(2).max(100).required(),
	email: Joi.string().max(MAX_EMAIL_LENGTH).email().required(),
	password: Joi.string()
		.min(8)
		.max(100)
		.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
		.messages({
			'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
		})
		.required(),
});
