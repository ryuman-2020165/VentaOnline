'use strict'

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user.model');
const Category = require('../models/category.model');

exports.validateData = (data) =>{
    let keys = Object.keys(data), msg = '';

    for(let key of keys){
        if(data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
        msg += `The params ${key} es obligatorio\n`
    }
    return msg.trim();
}

exports.alreadyUser = async (username)=>{
   try{
    let exist = User.findOne({username:username}).lean()
    return exist;
   }catch(err){
       return err;
   }
}

exports.encrypt = async (password) => {
    try{
        return bcrypt.hashSync(password);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.checkPassword = async (password, hash)=>{
    try{
        return bcrypt.compareSync(password, hash);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.checkPermission = async (userId, sub)=>{
    try{
        if(userId != sub){
            return false;
        }else{
            return true;
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.checkUpdate = async (user)=>{
    if(user.password || 
       Object.entries(user).length === 0 || 
       user.role){
        return false;
    }else{
        return true;
    }
}

exports.checkUpdateAdmin = async(user)=>{
    if(user.password ||
       Object.entries(user).length === 0){
        return false;
    }else{
        return true;
    }
}

exports.searchCategory = async(name)=>{
    try{
        const category = await Category.findOne({name: name});
        if(!category) return false
        return category;
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.checkUpdateProduct = async(product)=>{
    if( product.sales ||
        Object.entries(product).length === 0){
          return false;
      }else{
          return true;
      }
}
    
