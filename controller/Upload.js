const Models=require('../models/Upload')
const {cloudinary} = require('../utils/Cloudinary')

exports.getModelById=async(req,res,next,id)=>{
    try{
        const model = await Models.findById(id)
        if(!model){
            res.status(400).json("Model not found")
        }

        req.model = model
        next()
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getAllModels=async(req,res)=>{
    try{
        const models = await Models.find();
        if(!models){
            res.status(400).json("Model not found")
        }

        res.status(200).json(models)
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getModel=async(req,res)=>{
    try{
        res.status(200).json(req.model)
    }catch(err){
        res.status(500).json(err)
    }
}


exports.postModel=async(req,res)=>{
    try{
        const {file,name,price} = req.body

        if(!name || !price){
            return res.status(400).json({
                error: "Please include all fields"
            });
        }
        
        const uploadedResponse = await cloudinary.uploader.upload(file,{upload_preset:"fabrik_images"})

        const model = new Models({
            name:name,
            price:price,
            imageURL:uploadedResponse.public_id
        })
        
        model.save((err, model) => {
            if (err) {
                return res.status(400).json({
                  error: "NOT able to save category in DB"
                });
            }
            res.json({ model });
        });
        

    }catch(err){
        res.status(500).json(err)
    }
}