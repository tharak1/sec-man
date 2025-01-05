import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {name, phno, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({phno})


        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        console.log(password);

        const newUser = new User({
            name,
            phno,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);


        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})

    }
}