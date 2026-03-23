import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Cambiamos 'any' por los tipos reales de Express
export const handlerInputErrors = (req: Request, res: Response, next: NextFunction) => {
   console.log('Ejecutando Middleware de validación...');
   
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   
   next(); // Si no hay errores, pasa al siguiente handler
};