import { body, param, validationResult } from 'express-validator';

const responderErrores = (req, res, next) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
        });
    }

    next();
}

export const validarCrearNota = [
    body('titulo').trim().isLength({ min: 3, max: 60 }).withMessage('El titulo debe tener entre 3 y 60 caracteres'),
    body('contendio').trim().isLength({ min: 1, max: 200 }).withMessage('El contenido debe tener entre 1 y 200 caracteres'),
    body('categoria').trim().isIn([ 'calse', 'tarea', 'idea' ]).withMessage('Categoria no válida'),
    responderErrores,
];

export const validarActualizarNota = [
    body('titulo').optional().trim().isLength({ min: 3, max: 60 }),
    body('contendio').optional().trim().isLength({ min: 1, max: 200 }),
    body('categoria').optional().trim().isIn([ 'calse', 'tarea', 'idea' ]),
    responderErrores,
];

export const validarNotaId = [
    param('id').isMongoId('EL id no es válido'),
    responderErrores
];