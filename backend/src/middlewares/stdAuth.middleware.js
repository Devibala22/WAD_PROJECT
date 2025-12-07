import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {student} from "../models/student.model.js";
import jwt from "jsonwebtoken";

const authSTD = asyncHandler(async(req, res, next) =>{
    const accToken = req.cookies?.accessToken

    if(!accToken) {
        throw new ApiError(401, "Access token is required")
    }

    try {
        const decodedAccToken = jwt.verify(accToken, process.env.ACCESS_TOKEN_SECRET)
        
        const Student = await student.findById(decodedAccToken?._id).select("-Password -Refreshtoken")

        if(!Student){
            throw new ApiError(401, "Invalid access token")
        }

        req.Student = Student
        next()
    } catch (error) {
        throw new ApiError(401, "Authentication failed")
    }
})

export { authSTD }