import Joi from "joi";

const userAuthValidator = Joi.object({
    username: Joi.string().required().messages({
        "string.empty": "Потрібно ввести логін.",
    }),

    password: Joi.string().required().messages({
        "string.empty": "Потрібно ввести пароль.",
    }),
});

export default userAuthValidator;