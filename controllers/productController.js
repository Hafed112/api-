const mongoose = require('mongoose');
const Product = require("../model/Product");


const getAllProduct = async(req,res)=>{
    try {

        const {searchingPr,sort,fields,limit,categories}=req.query;
        const queryObject ={};

        if(categories){
            queryObject.category={$in:categories.split(",")}

        }

        if(searchingPr){
            queryObject.title={$regex:searchingPr,$options:'i'};
        }

        let result =Product.find(queryObject);
      
        result = result.sort({price:-1});
        
        if(sort){
            sortList= sort.split(',').join(" ");
            result = result.sort(sortList).limit(limit);
        }else{
            result=result.sort({createdAt:-1})
        }


        if(fields){
            const fieldsList = fields.split(",").join(" ");
            result = result.select(fieldsList)
        }

        
        if (!result || result.length === 0){
            return res.status(404).json({msg:"No product is find"})
        }
        
        const products=await result;

        res.status(201).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error :"Internal Server error"})
    }
}

const getProduct = async(req,res)=>{
    try {

         const productId = req.params.productId;

        // Validate if productId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid Product ID' });
        }

        const product = await Product.findById(productId);
        if (!product){
            return res.status(404).json({msg:"this product not found"})
        }
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error :"Internal Server error"})
    }
}






const createProduct = async(req,res) =>{

    try {
        const {title,description,category,img,color,price,inStock,cartImg,defaultColor} 
        =req.body

        if (!(
            title && description && category && img && color && price && cartImg 
            && defaultColor
            )){
            return res.status(400).json({msg:"All inputs are require"})
        }

        const titlePro = await Product.findOne({title});
        if(titlePro){
            return res.status(409).json({msg:"this product is already exists"})
        }

        const newProduct = new Product(
            {title,description,category,img,color,price,inStock,cartImg,defaultColor}
        );

        const saveProduct = await newProduct.save();
        res.status(201).json({msg:"product created Successifly",saveProduct})


    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error"})
    }

}

const deleteProduct = async(req,res)=>{
    try {

         const productId = req.params.productId;

        // Validate if productId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid Product ID' });
        }

         const result = await Product.deleteOne({ _id: productId });
        if (!result){
            return res.status(404).json({msg:"this product not found to delete"})
        }
        
        res.status(201).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error :"Internal Server error"})
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    getProduct,
    deleteProduct,
}