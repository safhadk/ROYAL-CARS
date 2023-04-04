import bcrypt from "bcrypt";
import { generateAuthToken } from "../middleware/auth.js";
import userModel from "../models/userSchema.js";
import car from "../models/car.js";

//user Registration

export const Register = async (req, res, next) => {
    try {
        console.log("entered to owner signup 654")
        let userDetails = req.body;
        const user = await userModel.find({ email: userDetails.email });
        if (user.length === 0) {
            console.log(444);
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
    let userSignUp = {
        Status: false,
        message: null,
        token: null,
        name: null,
    };

    try {
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
        console.log("here")
        console.log(req.query.id)
        let cars;
        if (req.query.id){
            cars=await car.find({_id:req.query.id})
        }else{
            cars = await car.find({})
        }
        
        res.status(200)
            .json({
                data: cars
            });
    } catch (error) {
        res.json({ status: "failed", message: error.message });
        console.log(error.message)
    }
};

//Search

export const Search = async (req, res) => {
    const cars = await car.find({ location: { $regex: new RegExp('^' + req.body.city + '$', 'i') } })
    console.log(cars[0])
    console.log("hai ")
    console.log(req.body)

    const pickupTime = new Date(req.body.pickup);
    const dropTime = new Date(req.body.drop);
    
    const timeDiff = dropTime - pickupTime; // difference in milliseconds
    const oneDay = 24 * 60 * 60 * 1000; // number of milliseconds in a day
    
    let diffInDays = Math.floor(timeDiff / oneDay);
    let diffInHours = Math.floor((timeDiff % oneDay) / (60 * 60 * 1000));
    let diffInMonths = 0; // initialize month to 0
    
    const result = `${diffInMonths} month ${diffInDays} day ${diffInHours} hour`;
    console.log(result);

    let cardata = {
        city: req.body.city,
        pickup: req.body.pickup,
        drop: req.body.drop,
        days:diffInDays,
        hours:diffInHours
    }
    res.json({ data: cars, bookingCarData: cardata })
}

