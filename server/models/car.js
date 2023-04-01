import mongoose from "mongoose";
const Schema = mongoose.Schema;

const carSchema = new Schema({
  
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'ownerSchema',
    },
    carModel: {
        type: String,
    },
    location: {
        type: String,
    },
    registrationNumber: {
        type: String,
    },
    perHourCharge: {
        type: String,
    },
    perDayCharge: {
        type: String,
    },
    perMonthCharge: {
        type: String,
    },
    place: {
        type: String,
    },
    seater: {
        type: String,
    },
    transmission: {
        type: String,
    },
    fuel: {
        type: String,
    }, 
    images: {
        type: Array,
      },
});

const car = mongoose.model("car", carSchema);
export default car;