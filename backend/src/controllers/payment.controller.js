import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {instance}  from "../app.js"
import crypto from "crypto"
import {payment} from "../models/payment.model.js"
import { Teacher } from "../models/teacher.model.js";


const coursePayment = asyncHandler(async(req,res)=>{
    const {fees} = req.body

    if(!fees){
      throw new ApiError(400,"fees is required")
    }

    if(!req.Student){
      throw new ApiError(401,"Student not authenticated")
    }

    // Check if using dummy keys or no keys
    if(!instance || process.env.KEY_ID === 'dummy_key') {
      // Return mock order for testing
      const mockOrder = {
        id: `order_mock_${Date.now()}`,
        amount: fees,
        currency: "INR",
        receipt: `order_${Date.now()}`,
        status: "created"
      };
      
      return res
      .status(200)
      .json( new ApiResponse(200, mockOrder,"Mock order created"))
    }

    try {
      const options = {
          amount: fees,
          currency: "INR",
          receipt: `order_${Date.now()}`
      };
      
      const order = await instance.orders.create(options)

      return res
      .status(200)
      .json( new ApiResponse(200, order,"order fetched"))
    } catch (error) {
      console.error('Razorpay error:', error)
      throw new ApiError(500, "Payment initialization failed")
    }
})


const getkey = asyncHandler(async(req,res)=>{
  return res
  .status(200)
  .json(new ApiResponse(200,{key:process.env.KEY_ID}, "razor key fetched"))
})


const coursePaymentConfirmation = asyncHandler(async(req,res)=>{
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  
  const studentID = req.Student._id
  const courseID = req.params.courseID

  // Handle mock payment
  if(razorpay_order_id?.startsWith('order_mock_')) {
    const orderDetails = await payment.create({
      razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id || 'mock_payment_id',
      razorpay_signature: razorpay_signature || 'mock_signature',
      courseID, 
      studentID,
    });

    return res
    .status(200)
    .json(new ApiResponse(200,{orderDetails}, "Mock payment confirmed" ))
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const orderDetails = await payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseID, 
      studentID,
    });

    return res
    .status(200)
    .json(new ApiResponse(200,{orderDetails}, "payment confirmed" ))
  } else {
    throw new ApiError(400, "payment failed")
  }
})


const teacherAmount = asyncHandler(async(req,res)=>{
  const teacher = req.teacher

  const newEnrolledStudentCount = await Teacher.aggregate([
    {
      $match: { _id: teacher._id }
    },
    {
      $unwind: "$enrolledStudent"
    },
    {
      $match: { "enrolledStudent.isNewEnrolled": true }
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 }
      }
    }
  ]);

  const count = newEnrolledStudentCount.length > 0 ? newEnrolledStudentCount[0].count : 0;


  await Teacher.findByIdAndUpdate(
    teacher._id,
    { $inc: { Balance: count * 500 } },
   
  );

  const newTeacher = await Teacher.findOneAndUpdate(
    { _id: teacher._id, "enrolledStudent.isNewEnrolled": true },
    { $set: { "enrolledStudent.$[elem].isNewEnrolled": false } },
    { 
        new: true,
        arrayFilters: [{ "elem.isNewEnrolled": true }],
    }
  );

  if(!newTeacher){
    const newTeacher = await Teacher.findById(
      teacher._id
    )

    return res
    .status(200)
    .json(new ApiResponse(200, {newTeacher}, "balance"))
  }


  return res
  .status(200)
  .json(new ApiResponse(200, {newTeacher}, "balance"))
  
})


const withdrawAmount = asyncHandler(async(req,res)=>{

  const teacherId = req.teacher._id
  const amount = req.body.amount

  console.log(amount);

  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  if (teacher.Balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  teacher.Balance -= amount;
  teacher.WithdrawalHistory.push({ amount });
  await teacher.save();

  const newTeacher = await Teacher.findById(teacherId)

  return res
  .status(200)
  .json(new ApiResponse(200, {newTeacher}, "balance"))
  
})



export {coursePayment, getkey, coursePaymentConfirmation, teacherAmount, withdrawAmount}