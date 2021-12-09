import { checkSchema } from 'express-validator';

export default {
    signup: checkSchema({
        name: {
            trim: true,
            isLength: {
                options: {min: 2}
            },
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Senha precisa ser preenchida'
        },
        state: {
            notEmpty: true,
            errorMessage: 'Estado precisa ser preenchido'
        },
    }),

    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Senha precisa ser preenchida'
        },
    })
}