import { Router } from "express";
import {downloadProfile, getAllUserProfile, getUserAndProfile, login, register, updateProfileData, updateUserProfile, uploadProfilePicture } from "../controllers/user.controller.js";
import multer from "multer";
const router=Router();

// Storage (upload purpose)
const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
})

const upload=multer({storage:storage})

router.route("/update_profile_picture")
    .post(upload.single('profile_picture'),uploadProfilePicture)



router.route('/register').post(register);
router.route('/login').post(login)

// Updating and Getting User Profile
router.route('/user_update').post(updateUserProfile)
router.route("/get_user_and_profile").get(getUserAndProfile)


// 
router.route("/update_profile_data").post(updateProfileData)
router.route("/users/get_all_users").get(getAllUserProfile)

// 
router.route("/users/download_resume").get(downloadProfile)
export default router;
