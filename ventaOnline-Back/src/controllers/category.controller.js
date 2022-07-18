'use strict'

const Category = require('../models/category.model');
const Product = require('../models/product.model');
const validate = require('../utils/validate');

exports.testCategory = (req, res)=>{
    return res.send({message: 'Function testCategry is running'});
}

exports.saveCategory = async(req, res)=>{
    try{
            //validar que lleguen los parámetros obligatorios
            //No se duplique la categoria
            //Guardar

        const params = req.body;
        const data = {
            name: params.name,
            description: params.description
        };
        const msg = validate.validateData(data);
        if(msg) return res.status(400).send(msg);
        const alreadyCategory = await validate.searchCategory(params.name);
        if(alreadyCategory) return res.send({message: 'Category already created'});
        const category = new Category(data);
        await category.save();
        return res.send({message: 'Category created successfully'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error saving category'});
    }
}

exports.getCategorys = async(req, res)=>{
    try{
        const categorys = await Category.find().lean();
        if(categorys.length == 0) return res.status(404).send({message: 'Categorys not found'});
        return res.send({categorys});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error getting categorys'});
    }
}

exports.updateCategory = async(req, res)=>{
    try{
            //Capturar el id
            //Validar que no vayan parámetros vacios
            //Valide que exista la category
            //Validar que no se actualice la Default
            //Que no se duplique la categoria
            //Actualizar
            //Validar la actualización

        const categoryId = req.params.id;
        const params = req.body;

        if(Object.entries(params).length === 0) return res.status(400).send({message: 'Empty parameters'});
        const categoryExist = await Category.findOne({_id: categoryId});
        if(!categoryExist) return res.send({message: 'Category not found'})
        if(categoryExist.name === 'DEFAULT') return res.send({message: 'Default category can not update'});
        const alreadyCategory = await validate.searchCategory(params.name);
        if(alreadyCategory && categoryExist.name != params.name) return res.send({message: 'Category already taken'});
        const updatedCategory = await Category.findOneAndUpdate({_id: categoryId}, params, {new: true});
        if(!updatedCategory) return res.send({message: 'Category not updated'});
        return res.send({message: 'Category updated successfully', updatedCategory});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error updating category'});
    }
}

exports.deleteCategory = async(req, res)=>{
    try{
            //captura el ID
            //Verificar que exista la categoria
            //Verificar que la categoria a eliminar no sea la DEFAULT
            //Buscar la categoría DEFAULT
            //Buscar los productos que tengan la categoria a eliminar
            //Actualizar los productos con el ID de la categoria DEFAULT
            //Eliminar la categoria
            //Verificar su correcta eliminación.

        const categoryId = req.params.id;
        const categoryExist = await Category.findOne({_id: categoryId});
        if(!categoryExist) return res.send({message: 'Category not found or already deleted'});
        if(categoryExist.name === 'DEFAULT') return res.send({message: 'DEFAULT category cannot delete'});
        const defaultCategory = await Category.findOne({name: 'DEFAULT'});
        await Product.updateMany({category: categoryId},{category: defaultCategory._id});
        const categoryDeleted = await Category.findOneAndDelete({_id: categoryId});
        if(!categoryDeleted) return res.send({message: 'Category not deleted or already deleted'});
        return res.send({message: 'Category deleted successfully', categoryDeleted});

        /* ACTUALIZACIÓN DE PRODUCTOS EN TIEMPO DE EJECUCIÓN
        const products = await Product.find({category: categoryId}).lean();
        for(let product of products){
            await Product.findOneAndUpdate({_id: product._id}, {category: defaultCategory._id});
        }*/

        /**
         * findOneAndUpdate == buscar un solo registro y actualizar (filtro, datos a actualizar);
         * updateMany == buscar todos los registros y los actualiza (filtro, datos a actualizar)
         */
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error deleting category'});
    }
}