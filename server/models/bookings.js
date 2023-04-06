import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'userSchema',
    },
    car:{
        type: Schema.Types.ObjectId,
        ref: 'car',
    },
    bookingId: {
        type: String,
    },
    Advance: {
        type: String,
    },
    ownerAmount: {
        type: String,
    },
    TotalAmount: {
        type: String,
    },
    paymentId: {
        type: String,
    },
    pickup:{
       type:Date,
    },
    drop:{
        type:Date,
    }
},
{
    timestamps: true,
});

const bookings = mongoose.model("bookings", bookingSchema);
export default bookings;