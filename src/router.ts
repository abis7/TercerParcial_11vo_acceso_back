import {Router} from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { body, param } from 'express-validator';
import { handlerInputErrors } from './middleware';
const router = Router();

router.get('/', getProducts);
router.get('/:id',
    param('id').isInt().withMessage('id no valido'),
    handlerInputErrors,
    getProductById);

router.post('/',
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('image').notEmpty().withMessage('La imagen es obligatoria'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    body('price').isFloat({min: 0}).withMessage('El precio debe ser un número válido')
        .notEmpty().withMessage('No debe ser vacío')
        .custom((value) => value > 0).withMessage('El precio debe ser un número positivo'),
    body('quantity').isInt({gt: 0}).withMessage('La cantidad debe ser un número entero positivo'),
    handlerInputErrors,
    createProduct);

router.put('/:id',
    param('id').isInt().withMessage('id no valido'),
    body('name').notEmpty().withMessage('El nombre no puede estar vacío'),
    body('image').notEmpty().withMessage('La imagen no puede estar vacía'),
    body('description').notEmpty().withMessage('La descripción no puede estar vacía'),
    body('price').isFloat({min: 0}).withMessage('El precio debe ser un número válido')
        .custom((value) => value > 0).withMessage('El precio debe ser un número positivo'),
    body('quantity').isInt({gt: 0}).withMessage('La cantidad debe ser un número entero positivo'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no válido'),
    handlerInputErrors,
    updateProduct);

router.patch('/:id',
    param('id').isInt().withMessage('id no valido'),
    handlerInputErrors,
    updateAvailability);

router.delete('/:id',
    param('id').isInt().withMessage('id no valido'),
    handlerInputErrors,
    deleteProduct);

export default router;