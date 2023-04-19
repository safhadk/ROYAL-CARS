import bcrypt from "bcrypt";
import { generateAuthToken } from "../middleware/auth.js";
import userModel from "../models/userSchema.js";
import car from "../models/car.js";
import * as paypal from "../middleware/paypal-api.js";
import bookings from "../models/bookings.js";
import { Id } from '../helper/bookingId-Generator.js'
import messages from "../models/message.js";

//user Registration

export const Register = async (req, res, next) => {
    try {
        let userDetails = req.body;
        const user = await userModel.find({ email: userDetails.email });
        if (user.length === 0) {
            userDetails.password = await bcrypt.hash(userDetails.password, 10);
            userModel
                .create({
                    name: userDetails.name,
                    email: userDetails.email.toLowerCase(),
                    phone: userDetails.phone,
                    password: userDetails.password,
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });
            res.json({ status: true, result: userDetails });
        } else {
            return res.json({ error: true });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message)
    }
};

//user login submit

export const LoginPost = async (req, res, next) => {
    try {
        let userSignUp = {
            Status: false,
            message: null,
            token: null,
            name: null,
        };
        const userDetails = req.body;
        const findUser = await userModel.findOne({ email: userDetails.email });
        if (findUser) {
            const isMatch = await bcrypt.compare(userDetails.password, findUser.password);
            if (isMatch === true) {
                const token = generateAuthToken(findUser);
                const name = findUser.name;
                userSignUp.message = "You are logged";
                userSignUp.Status = true;
                userSignUp.token = token;
                userSignUp.name = findUser.name;

                res.status(200)
                    .send({ userSignUp });
            } else {
                userSignUp.message = " Password is wrong";
                userSignUp.Status = false;
                res.send({ userSignUp });
            }
        } else {
            userSignUp.message = "your Email wrong";
            userSignUp.Status = false;
            res.send({ userSignUp });
        }
    } catch (error) {
        res.json({ status: "failed", message: error.message });
        console.log(error.message)
    }
};

//user cars page

export const Cars = async (req, res, next) => {
    try {
        let cars;

        if (req.query.id) {
            cars = await car.find({ _id: req.query.id })

            const pickupTime = new Date(req.query.pickup);
            const dropTime = new Date(req.query.drop);

            const timeDiff = dropTime - pickupTime; 
            const oneDay = 24 * 60 * 60 * 1000; 

            let diffInDays = Math.floor(timeDiff / oneDay);
            let diffInHours = Math.floor((timeDiff % oneDay) / (60 * 60 * 1000));
            let diffInMonths = 0;

            const result = `${diffInMonths} month ${diffInDays} day ${diffInHours} hour`;
            console.log(result);

            let totalrent;
            totalrent = diffInDays % 30 * parseInt(cars[0].perDayCharge) + Math.floor(diffInDays / 30) * parseInt(cars[0].perMonthCharge) + diffInHours * parseInt(cars[0].perHourCharge)
            console.log(totalrent)

            res.status(200)
                .json({
                    data: cars,
                    rentAmount: totalrent,
                });
        } else {
            cars = await car.find({})
            const AvailableCars = await car.updateMany(
                {},
                { $set: { status: "Available" } }
            );
    
            res.status(200).json({
                    data: cars,
                });
        }
    } catch (error) {
        res.json({ status: "failed", message: error.message });
        console.log(error.message)
    }
};

//Search

export const Search = async (req, res) => {
    try {
        const pickupDate = req.body.pickup;
        const dropDate = req.body.drop;

        const reservations = await bookings.find({
            pickup: { $lte: new Date(dropDate) },
            drop: { $gte: new Date(pickupDate) }
        });

        const carIds = [];
        reservations.forEach(reservation => {
            carIds.push(reservation.car);
        });
        const bookedCars = await car.updateMany(
            { _id: { $in: carIds } },
            { $set: { status: "Booked" } }
        );

        const AvailableCars = await car.updateMany(
            { _id: { $nin: carIds } },
            { $set: { status: "Available" } }
        );

        const pickupTime = new Date(req.body.pickup);
        const dropTime = new Date(req.body.drop);

        const timeDiff = dropTime - pickupTime; 
        const oneDay = 24 * 60 * 60 * 1000;

        let diffInDays = Math.floor(timeDiff / oneDay);
        let diffInHours = Math.floor((timeDiff % oneDay) / (60 * 60 * 1000));
        let diffInMonths = 0;

        const result = `search : ${diffInMonths} month ${diffInDays} day ${diffInHours} hour`;
        console.log(result);

        let cardata = {
            city: req.body.city,
            pickup: req.body.pickup,
            drop: req.body.drop,
            days: diffInDays,
            hours: diffInHours
        }

        const cars = await car.find({
            location: { $regex: new RegExp('^' + req.body.city + '$', 'i') }
        })
       res.status(200).json({ data: cars, bookingCarData: cardata })
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message);
    }
}

//create order 

export const CreateOrder = async (req, res) => {
    try {
       
            const order = await paypal.createOrder(req.body);
            res.json(order);
        
        
    } catch (err) {
        console.log(err.message, "error occured in create order")
        res.status(500).send(err.message);
    }
}

//verify payment

export const VerifyPayment = async (req, res) => {
    try {
        const bookingId = Id();
        const { orderID } = req.body
        const { carId, advance, ownerAmount, TotalAmount, drop, pickup } = req.body.bookingData
        const captureData = await paypal.capturePayment(orderID)
        const booking = await bookings.create({
            user: req.user._id,
            bookingId,
            paymentId: orderID,
            car: carId,
            Advance: advance,
            ownerAmount,
            TotalAmount,
            drop,
            pickup,
            status: 'pickup pending'
        })
        const carStatus = await car.updateOne({ _id: carId }, { $set: { onRent: true } })
        res.json(captureData)
    } catch (err) {
        res.status(500).send(err.message);
        console.log(err.message)
    }
}

export const Bookings=async(req,res)=>{
    try {
        const booking=await bookings.find({user:req.user._id}).populate('car').sort({createdAt:-1}) 
        res.status(200).json(booking)
        // console.log(booking)
        // console.log(booking.length)
}
  catch (error) {
        console.log(error.messsage)
    }
}

export const bookingDetails=async(req,res)=>{
try {
    console.log("booking deatils hereee")
    const {id}=req.query
    console.log(id,"id")
    console.log(req.query)
    console.log(2)
    console.log(req.user._id,"user id")
    const booking =await bookings.findOne({_id:id,user:req.user._id}).populate('car')
    console.log(booking,"booking")
    res.status(200).json(booking)
   
} catch (error) {
    console.log(error.messsage,"error")
}
}


export const Profile=async(req,res)=>{
    console.log(req.user.role," : user role")
    console.log("reached profile")
    try {
        const user = await userModel.findOne({_id:req.user._id})
        console.log(user,"user details")
    
        res.status(200).json({
            user:user,
        });
    } catch (error) {
        console.log(error.message)
    }

}


export const UpdateProfile = async(req,res)=>{
    try {
        console.log("update profile hree")
        const image = req.files.map((val) => val.filename)
        console.log(req.files);
        const { place, pincode, city, district, state, country,licence} = req.body
        console.log(req.body)
        console.log(req.body.place ,"place here")

        userModel.updateOne({_id:req.user._id},{$set:{
            place:place,
            pincode:pincode,
            city:city,
            district:district,
            state:state,
            country:country,
            licence:licence,
            verified:false,
            images: image
        }})
            .then((data) => {
                console.log(data);
                res.status(200).json({ status: "success" });
            })
            .catch((error) => {
                console.log(error);
                res.json({ status: "failed", message: error.message });
            });
  
    } catch (error) {
        console.log(error.message)
    }
}

export const checkverify=async(req,res)=>{
try {
    console.log("entered to chec verify")
    console.log(req.user._id,"id hereee")
    const verification=await userModel.findOne({_id:req.user._id})
    if (verification.verified!==true){
        console.log("success")
        res.json(false)
    }
} catch (error) {
    
}
}

export const message=async(req,res)=>{
    console.log(req.body,"body here")
    try {

        let exist = await messages.findOne({
            user: req.user._id,
            owner: req.body.ownerId, 
          });

          console.log(exist,"exist")
          if (exist) {
            exist.messages.push({
              message: req.body.message,
              sender: req.user._id,
              recipient: req.body.ownerId, 
              author:req.body.author,
              time:req.body.time,
              date:req.body.date
            });
            await exist.save();
            res.status(200).json(exist)
          }else{
            const newMessage = await messages.create({
                user: req.user._id, 
                owner: req.body.ownerId, 
                  messages: [{
                  message: req.body.message,
                  sender: req.user._id,
                  recipient: req.body.ownerId, 
                  author:req.body.author,
                  time:req.body.time,
                  date:req.body.date
                }]
              });
              res.status(200).json(newMessage)
          }

       
    } catch (error) {
        console.log(error.message,"in message")
    }
    }

    export const getmessage=async(req,res)=>{
        console.log("entered to get message")
        try {
            if (req.query.ownerId){
                console.log(req.query,"owner id in get message")
                const message=await messages.findOne({
                    user: req.user._id,
                    owner: req.query.ownerId, })
                    res.status(200).json(message)
            }else{
                console.log("user role")
                const message=await messages.find({ user: req.user._id }).populate('owner')
                console.log(message);
                    res.status(200).json(message);
            }
                
        } catch (error) {
            console.log(error.message,"error in get mesage")
        }
        }