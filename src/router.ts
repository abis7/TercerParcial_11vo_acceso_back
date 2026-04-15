import { Router } from 'express';
import { body, param } from 'express-validator';
import { 
    solicitarAcceso, 
    verificarEstatus, 
    updateStatusCallback, 
    seedFolios
} from './handlers/solicitud';
import { handlerInputErrors } from './middleware';

const router = Router();

/**
 * @section RUTAS DE SOLICITUDES Y ACCESO
 */

// 1. POST /api/solicitar-acceso
// Registra la intención y valida si el folio existe en pagos_referencia
router.post('/solicitar-acceso',
    body('email')
        .isEmail().withMessage('Email no válido')
        .notEmpty().withMessage('El email es obligatorio'),
    body('folio')
        .notEmpty().withMessage('El folio es obligatorio'),
    handlerInputErrors,
    solicitarAcceso
);

// 2. GET /api/verificar-estatus/:email
// Devuelve el estado actual del trámite basado en el correo
router.get('/verificar-estatus/:email',
    param('email').isEmail().withMessage('Email no válido'),
    handlerInputErrors,
    verificarEstatus
);

// 3. PATCH /api/callback-n8n
// Endpoint para que n8n actualice el estatus a "Aceptado" o "Rechazado"
router.patch('/update-status',
    body('id').isInt().withMessage('ID de solicitud no válido'),
    body('estatus').notEmpty().withMessage('El estatus es obligatorio'),
    handlerInputErrors,
    updateStatusCallback
);

router.post('/admin/seed-folios', seedFolios);
export default router;