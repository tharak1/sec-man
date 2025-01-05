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
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;