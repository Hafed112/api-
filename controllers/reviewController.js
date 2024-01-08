const ReviewCustomer = require('../model/ReviewCustomer')

const createReview = async(req,res)=>{
    try {
        const {title,body,img,rating}=req.body;

        if(!(title && body && img && rating)){
            return res.status(400).json('all fields are required !')
        }

        const invalidCharacters=/[^a-zA-Z0-9\s!@#$%^&*+-?]/;
        if(invalidCharacters.test(title)){
            return res.status(401).json('Title containe invalid Characters')
        }

        if(invalidCharacters.test(body)){
            return res.status(401).json('body containe invalid Characters')
        }

        const reviewPr = await ReviewCustomer.findOne({title})
        
        if(reviewPr){
            return res.status(409).json('this review is already exists')
        }

        const newReview = new ReviewCustomer(
            {title,body,img,rating}
        );

        const review = await newReview.save();
        res.status(200).json({msg:"the review created successfily",review})

    }catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error"})
    }
}

const getAllReview = async(req,res)=>{
    try {
        const allReview = await ReviewCustomer.find();

        if(!allReview){
            return res.status(403).json({msg:"No Product has found"})
        }

        res.status(201).json(allReview);
    } catch (error) {
        
        res.status(500).json({error:"Internal Server error"})
    }
}



module.exports = {
    createReview,
    getAllReview
}

