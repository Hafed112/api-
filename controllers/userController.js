const User = require("../model/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const register = async(req,res)=>{

    try {
        
        const {first_name,last_name,email,password}=req.body;

        if(!(first_name && last_name && email && password)){
            res.status(400).json({msg:"All inputs are required"});
        }

        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.status(409).json({msg:"User Already exists please login"})
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        console.log(encryptedPassword)

        const user = await User.create({
            first_name,
            last_name,
            email : email.toLowerCase(),
            password : encryptedPassword,
        });

        const token = jwt.sign(
            {user_id:user._id,email},
            process.env.TOKEN_KEY,
            {
                expiresIn:"2h",
            }
        );
        user.token = token;

        //return new user
        res.status(201).json(user)

    } catch (error) {
         console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const login = async(req,res) =>{

    try {
        
        const {email,password}=req.body

        if(!(email && password)){
            return res.status(400).json({msg:"All inputs are required"})
        }

        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password,user.password))){

            //create token
            const token=jwt.sign(
                {user_id:user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn:"2h",
                },

            );

            user.token = token;
            return res.status(200).json(user)
        }
        return res.status(402).json({msg:"Invalid Credentials"});


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" }); 

    }
}

module.exports = {register,login};

