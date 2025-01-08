import mongoose from "mongoose";

const surgeSchema = new mongoose.Schema({
    siteId:{
        type:String,
        default:"none",
    },
    name:{
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
    date:{
        type:String,
        required: [true, "Please provide a date"],
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

const Surge = mongoose.models.surge || mongoose.model("surge", surgeSchema);
export default Surge;