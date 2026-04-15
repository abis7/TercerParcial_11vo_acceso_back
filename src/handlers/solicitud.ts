import { Request, Response } from "express";
import { PagoReferencia } from "../models/PagoReferencia.model";
import { Solicitud } from "../models/Solicitud.model";


export const solicitarAcceso = async (req: Request, res: Response) => {
    try {
        const { email, folio } = req.body;

        const existeFolio = await PagoReferencia.findOne({ where: { folio } });
        
        if (!existeFolio) {
            return res.status(400).json({ 
                error: "El folio proporcionado no es válido o no ha sido precargado." 
            });
        }

        const solicitud = await Solicitud.create({ 
            email, 
            folio, 
            estatus: 'Procesando' // Requisito: estatus inicial debe ser Procesando
        });

        const n8nWebhookUrl = 'http://localhost:5678/webhook/solicitar-acceso';        
        
        try {
            await fetch(n8nWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: solicitud.id,      // Enviamos el ID generado para el callback posterior
                    email: email,          // Enviamos el correo explícitamente
                    folio: folio,          // Enviamos el folio explícitamente
                    estatus: 'Procesando'
                })
            });
            console.log('Webhook enviado a n8n con todos los datos');
        } catch (webhookError) {
            console.error('n8n no está disponible, pero la solicitud se guardó en DB:', webhookError);
        }

        res.status(201).json({
            message: "Solicitud registrada y en proceso de validación",
            solicitudId: solicitud.id,
            estatus: solicitud.estatus
        });

    } catch (error) {
        console.error('Error crítico en solicitarAcceso:', error);
        res.status(500).json({ error: 'Error interno al procesar la solicitud' });
    }
};

export const verificarEstatus = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const solicitud = await Solicitud.findOne({ 
            where: { email },
            order: [['createdAt', 'DESC']] 
        });

        if (!solicitud) {
            return res.status(404).json({ error: 'No se encontró ninguna solicitud para este correo' });
        }

        res.json({
            email: solicitud.email,
            estatus: solicitud.estatus,
            folio: solicitud.folio
        });
    } catch (error) {
        console.error('Error al verificar estatus:', error);
        res.status(500).json({ error: 'Error al obtener el estatus' });
    }
};

export const updateStatusCallback = async (req: Request, res: Response) => {
    try {
        const { id, estatus } = req.body; 

        const solicitud = await Solicitud.findByPk(id);

        if (!solicitud) {
            console.log(`Solicitud con ID ${id} no encontrada`);
            return res.status(404).json({ error: 'Solicitud no encontrada' });
        }

        solicitud.estatus = estatus; 
        
        await solicitud.save();

        console.log(`Estatus actualizado a: ${estatus} para el ID: ${id}`);
        
        res.json({ 
            message: "Estatus actualizado correctamente", 
            data: solicitud 
        });
    } catch (error) {
        console.error('Error en el callback:', error);
        res.status(500).json({ error: 'Error al actualizar el estatus' });
    }
};

export const seedFolios = async (req: Request, res: Response) => {
    try {
        const { folio } = req.body;
        const nuevoFolio = await PagoReferencia.create({ folio });
        res.status(201).json({
            msg: "Folio precargado con éxito",
            folio: nuevoFolio.folio
        });
    } catch (error) {
        console.error('Error al precargar folio:', error);
        res.status(500).json({ error: 'Error al precargar el folio' });
    }
};

