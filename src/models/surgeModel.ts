import mongoose from "mongoose";
import { number } from "yup";

const surgeSchema = new mongoose.Schema({
    site:{
        type:String,
        required: [true, "Please provide a site name"],
    },
    Address:{
        type:String,
        required: [true, "Please provide a site name"],
    },
    location:{
        type:String,
        required: [true, "Please provide a site name"],
    },
    shift:{
        type:String,
        required: [true, "Please provide a shift"],
    },
    shiftTimings:{
        type:String,
        required: [true, "Please provide a shift timings"],
    },
    reason:{
        type:String,
        required: [true, "Please provide a reason"],
    },
    requiredGuards:{
        type:Number,
        required: [true, "Please provide a required guards"],
    },
    acceptedGuards:[{
        name: {
            type: String,
            required: [true, "Please provide a name"],  
        },
        phno: {
            type: String,
            required: [true, "Please provide a phone number"],
        },
    }]

});

const SurgeSchema = mongoose.model("surgeSchema", surgeSchema);
export default SurgeSchema;

