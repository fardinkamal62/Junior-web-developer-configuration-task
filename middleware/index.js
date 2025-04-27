const createError = require('http-errors');

const middlewares = module.exports;
middlewares.validateRequest = (schema) => {
	return (req, _res, next) => {
		const { error } = schema.validate(req.body, { abortEarly: false });

		if (error) {
			const validationError = createError(400, 'Validation Error');
			validationError.details = error.details.map(detail => detail.message);
			next(validationError);
		}

		next();
	};

};
