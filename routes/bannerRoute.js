import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'
import { bannerPhotoController, createBannerController, deleteBannerController, getAllBannerController } from '../controllers/bannerController.js'



const router=express.Router()
//create banner
router.post('/create-banner',requireSignIn,isAdmin,formidable(),createBannerController)

//get all banner
router.get('/get-banner',getAllBannerController)

//get banner photo
//get photo
router.get('/banner-photo/:pid',bannerPhotoController)

//delete banner
//delete product
router.delete('/delete-banner/:pid',requireSignIn,isAdmin,deleteBannerController)

export default router