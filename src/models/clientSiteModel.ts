import mongoose from "mongoose";

const clientSiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],  
    },
    address:{
        type: String,
        required: [true, "Please provide a address"],
    },
    location: {
        type: String,
        required: [true, "Please provide a phone number"],
    },
    ownedBy: {
        type: String,
        required: [true, "Please provide a password"],
    },
    ownerContactNumber: {
        type: String,
        required: [true, "Please provide a password"],
    },
    shifts:[
        {
            shift:{
                type: String,
                required: [true, "Please provide a password"],
            },
            shiftTimings:{
                type: String,
                required: [true, "Please provide a password"],
            }
        }
    ],
    guards:[{
        name: {
            type: String,
            required: [true, "Please provide a name"],  
        },
        phno: {
            type: String,
            required: [true, "Please provide a phone number"],
        },
        site:{
            type: String,
            required: [true, "Please provide a password"],
        },
        shift:{
            type: String,
            required: [true, "Please provide a password"],
        },
        shiftTimings: {
            type: String,
            required: [true, "Please provide a password"],
        },
    }],
})

const ClientSite = mongoose.models.clientSite || mongoose.model("clientsite", clientSiteSchema);

export default ClientSite; 