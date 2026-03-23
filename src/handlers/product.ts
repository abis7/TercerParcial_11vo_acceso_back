import Product from "../models/Product.model";
import { Request, Response } from "express";


export const getProducts = async (req: Request, res: Response) => {
    try{
        const products = await Product.findAll(
            {
                order:[[
                    'price', 'DESC'], 
            ], 
            //limit: 10,
            //attributes:['createdAt', 'updatedAt']
            }
        );
        res.json(products);
    }catch(error){
        console.error('Error al obtener los productos:', error);
        res.status(500).json({error: 'Error al obtener los productos'});
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
       const product = await Product.findByPk(id as unknown as number);
       /* const product = await Product.findOne({
            where: {id: id,
                availability: true
            },
                attributes: {exclude: ['createdAt', 'updatedAt']}
        });*/

        if(!product){
            return res.status(404).json({error: 'Producto no encontrado'});
        }
        res.json(product);
      
    }catch(error){
        console.error('Error al obtener el producto:', error);
        res.status(500).json({error: 'Error al obtener el producto'});
    }
};

export const createProduct = async (req: Request, res: Response) => {
//express validator

try{
    const product = await Product.create(req.body);
    res.status(201).json(product);
}catch(error){
    console.error('Error al crear el producto:', error);
    res.status(500).json({error: 'Error al crear el producto'});
}

};

export const updateProduct = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
       const product = await Product.findByPk(id as unknown as number);

        if(!product){
            return res.status(404).json({error: 'Producto no encontrado'});
        }
        await product.update(req.body);
        await product.save();   
        res.json(product);
    }catch(error){
        console.error('Error al obtener el producto:', error);
        res.status(500).json({error: 'Error al obtener el producto'});
    }
};


export const updateAvailability = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
       const product = await Product.findByPk(id as unknown as number);

        if(!product){
            return res.status(404).json({error: 'Producto no encontrado'});
        }
        //actualizar solo la disponibilidad
        product.availability = !product.dataValues.availability;
        product.save();   
        res.json(product);
    }catch(error){
        console.error('Error al actualizar disponibilidad:', error);
        res.status(500).json({error: 'Error al actualizar disponibilidad'});
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
       const product = await Product.findByPk(id as unknown as number);

        if(!product){
            return res.status(404).json({error: 'Producto no encontrado'});
        }
        await product.destroy();
        res.json({message: 'Producto eliminado'});

    }catch(error){
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({error: 'Error al eliminar el producto'});
    }
};


//REACT Y COMPONENTES