import { Router } from "express";
import {acceptConnectionRequest, downloadProfile, getAllUserProfile, getMyConnectionsRequests, getUserAndProfile, getUserProfileAndUserBasedOnUsername, login, register, sendConnectionRequest, updateProfileData, updateUserProfile, uploadProfilePicture, WhatAreMyConnections } from "../controllers/user.controller.js";
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


// Exploring Pdf Download
router.route("/update_profile_data").post(updateProfileData)
router.route("/user/get_all_users").get(getAllUserProfile)

// Connecting Request Functionality
router.route("/user/download_resume").get(downloadProfile)

// Connection Request Functionality
router.route("user/send_connection_request").post(sendConnectionRequest);
router.route("user/getConnectionRequests").get(getMyConnectionsRequests);
router.route("/user/user_connection_request").get(WhatAreMyConnections);
router.route("/user/accept_connection_request").post(acceptConnectionRequest);

router.route("/user/get_profile_based_on_username").get(getUserProfileAndUserBasedOnUsername)


export default router;
