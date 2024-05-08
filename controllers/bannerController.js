import bannerModel from "../models/bannerModel.js";
import fs from 'fs';


//Create Banner
export const createBannerController = async (req, res) =>  {
    try {
        const { name } = req.fields;
        const { photo } = req.files;
        
        // Validation
        if (!name) {
            return res.status(500).send({ error: "Name is Required" });
        }
        if (!photo || !photo.path) {
            return res.status(500).send({ error: "Photo is Required" });
        }

        // Read and store photo data
        const banners = new bannerModel({ ...req.fields});
        banners.photo.data = fs.readFileSync(photo.path);
        banners.photo.contentType = photo.type;

        await banners.save();
        res.status(201).send({
            success: true,
            message: "Banner Created Successfully",
            banners,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating banner",
        });
    }
};

//Get all banner
export const getAllBannerController=async(req,res)=>{
    try{
       const banners=await bannerModel.find({}).select('-photo').sort({createdAt:-1})
       res.status(200).send({
        success: true,
        countTotal: banners.length,
        message: 'Banners getting successfull',
        banners,
    })
    }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Something went wrong while getting banners",
    })
    }
}



//get banner photo
export const bannerPhotoController=async(req,res)=>{
    try{
        const banner=await bannerModel.findById(req.params.pid).select('photo')
        if(banner.photo.data){
            res.set('Content-type',banner.photo.contentType)
            res.status(200).send(banner.photo.data)
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting banner photo',
            error
        })
    }
}

//delete banner
export const deleteBannerController=async(req,res)=>{
    try{
 await bannerModel.findByIdAndDelete(req.params.pid).select('-photo')
res.status(200).send({
    success:true,
    message:'Banner Deleted successfully'
})
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting banner',
            error
        })
    }
}
