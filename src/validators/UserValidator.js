import { checkSchema } from 'express-validator';

export default {
    editAction: checkSchema({
        token: {
            notEmpty: true,
        },
        name: {
            optional: true,
            trim: true,
            isLength: {
                options: {min: 2}
            },
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            optional: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Senha precisa ser preenchida'
        },
        state: {
            optional: true,
            notEmpty: true,
            errorMessage: 'Estado precisa ser preenchido'
        },
    }),
}