import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        const Users = await User.find();
        return NextResponse.json({ success: true, data: Users });
    }catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}


export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { _id, ...rest } = body;
        console.log(_id);
        if (!_id) {
            return NextResponse.json({ error: "Missing required field: _id" }, { status: 400 });
        }
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { ...rest },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }
        return NextResponse.json({ data: updatedUser }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}