import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],  
    },
    phno: {
        type: String,
        required: [true, "Please provide a phone number"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    site:{
        type: String,
        default: "none",
    },
    shift:{
        type: String,
        default: "none",
    },
    shiftTimings: {
        type: String,
        default: "none",
    },
    acceptedSurgeRequests:[{
        surgeId:{
            type: String,
            required: [true, "Please provide a name"],  
        },
        name: {
            type: String,
            required: [true, "Please provide a name"],  
        },
        address:{
            type: String,
            required: [true, "Please provide a name"],  
        },
        location: {
            type: String,
            required: [true, "Please provide a phone number"],
        },
        shift: {
            type: String, 
            required: [true, "Please provide a password"],
        },
        shiftTimings: {
            type: String,
            required: [true, "Please provide a password"],
        },
    }]

})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;