import bcrypt from "bcrypt";
import { generateAuthTokenOwner} from "../middleware/auth.js";
import ownerModel from "../models/ownerSchema.js";
import car from "../models/car.js";

//owner registration

export const Register = async (req, res, next) => {
    try {
        let ownerDetails = req.body;
        const owner = await ownerModel.find({ email: ownerDetails.email });
        if (owner.length === 0) {
            ownerDetails.password = await bcrypt.hash(ownerDetails.password, 10);
            ownerModel.create({
                    name: ownerDetails.name,
                    email: ownerDetails.email.toLowerCase(),
                    phone: ownerDetails.phone,
                    password: ownerDetails.password,
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });

            res.json({ status: true, result: ownerDetails });
        } else {
            return res.json({ error: true });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message)
    }
};

//owner login submit

export const LoginPost = async (req, res, next) => {
    try {
        let ownerSignUp = {
            Status: false,
            message: null,
            token: null,
            name: null,
        };
        const ownerDetails = req.body;
        const findowner = await ownerModel.findOne({ email: ownerDetails.email });
        if (findowner) {
            const isMatch = await bcrypt.compare(ownerDetails.password, findowner.password);
            if (isMatch === true) {
                const token = generateAuthTokenOwner(findowner);
                const name = findowner.name;
                ownerSignUp.message = "You are logged";
                ownerSignUp.Status = true;
                ownerSignUp.token = token;
                ownerSignUp.name = findowner.name;

               res.status(200)
                  .send({ ownerSignUp });
            } else {
                ownerSignUp.message = " Password is wrong";
                ownerSignUp.Status = false;
                res.send({ ownerSignUp });
            }
        } else {
            ownerSignUp.message = "your Email wrong";
            ownerSignUp.Status = false;
            res.send({ ownerSignUp });
        }
    } catch (error) {
        res.json({ status: "failed", message: error.message });
        console.log(error.message)
    }
};

//owner cars

export const Cars = async (req, res, next) => {
        try {
            const cars = await car.find({owner:req.user._id})
            console.log(cars)
            res.json({
                data:cars
            });
        } catch (error) {
            res.json({ status: "failed", message: error.message });
            console.log(error.message)
        }
    };

//owner add car page

export const addCar = async (req, res, next) => {
    try {
        const image = req.files.map((val) => val.filename)
        console.log(req.files);
        const { carModel, location, registrationNumber, perHourCharge, perDayCharge, perMonthCharge,place,seater,transmission,fuel } = req.body

        car.create({
            owner:req.user._id,
            carModel: carModel,
            location: location,
            registrationNumber: registrationNumber,
            perHourCharge: perHourCharge,
            perDayCharge: perDayCharge,
            perMonthCharge: perMonthCharge,
            place:place,
            seater:seater,
            transmission:transmission,
            fuel:fuel,
            images: image
        })
            .then((data) => {
                console.log(data);
                res.json({ status: "success" });
            })
            .catch((error) => {
                console.log(error);
                res.json({ status: "failed", message: error.message });
            });
  
    } catch (error) {
        console.log(error.message)
    }
};