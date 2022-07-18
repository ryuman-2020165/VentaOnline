'use strict'

const ShoppingCart = require('../models/shoppingCart.model');
const Product = require('../models/product.model');
const validate = require('../utils/validate');

exports.testShoppingCart = (req, res)=>{
    return res.send({message: 'Function testShoppingCart is running'});
}

exports.addToShoppingCart = async(req, res)=>{
    try{
            //Capturar el Id del usuario
            //Capturar los datos a agregar
            //Validar la data que no venga vacia
            //Verificar que exista el product
            //Verificar si ya existe el carrito de compras o no
            //Validar que el stock del producto sea >= quantity
            //Verificar si ya existe el producto deltro del carrito (Agregar quantity a dicho producto)
        //Agregar al carrito de compras el producto
        //Realizar cálculos del SubTotal y del total
        //Guardar el carrito

        const userId = req.user.sub;
        const params = req.body;
        const data = {
            product: params.product,
            quantity: params.quantity
        };
        const msg = validate.validateData(data);
        if(msg) return res.status(400).send(msg);
        const shoppingCartExist = await ShoppingCart.findOne({user: userId});
        const productExist = await Product.findOne({_id: params.product}).lean();
        if(!productExist) return res.send({message: 'Product not found'});
        if(!shoppingCartExist){
            if(params.quantity > productExist.stock) return res.send({message: 'Stock product not available'});
            const data = {
                user: req.user.sub
            }
            const product = {
                product: params.product,
                quantity: params.quantity,
                subTotal: productExist.price * params.quantity
            }
            data.products = product;
            data.quantityProducts = 1;
            data.total = product.subTotal;

            const shoppingCart = new ShoppingCart(data);
            await shoppingCart.save();
            return res.send({message: 'Product add successfully', shoppingCart});
        }else{
            //actualizar el carrito
            if(params.quantity > productExist.stock) return res.send({message: 'Stock product not available'})
            for(let product of shoppingCartExist.products){
                console.log(product);
                if(product.product != params.product) continue; 
                ////EL ERROR ERA QUE HABÍA PUESTO product._id, CUANDO REALMENTE EL ID DEL PRODUCT
                ////SE GUARDA EN PRODUCT.
                return res.send({message: 'Already have this product in the shopping cart'});
            }
            const product = {
                product: params.product,
                quantity: params.quantity,
                subTotal: productExist.price * params.quantity
            }
            const total = shoppingCartExist.total + product.subTotal;
            const quantityProducts = shoppingCartExist.products.length + 1;
            const pushProduct = await ShoppingCart.findOneAndUpdate(
                {_id: shoppingCartExist._id},
                { $push: {products: product},
                  total: total,
                  quantityProducts: quantityProducts},
                {new: true}
            )
            if(!pushProduct) return res.send({message: 'Product not add to shopping cart'});
            return res.send({message: 'New product add to Shopping Cart', pushProduct});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error saving product to shopping cart'});
    }
}