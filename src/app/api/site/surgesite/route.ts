import { connect } from "@/dbConfig/dbConfig";
import Surge from "@/models/surgeModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        console.log(body);

        const newClientSite = await Surge.create(body);
        console.log(body);
        return NextResponse.json({ success: true, data: newClientSite });
      } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id"); 

        if (id) {
            const clientSite = await Surge.findById(id);
            if (!clientSite) {
                return NextResponse.json({ error: "Document not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: clientSite });
        } else {
            const clientSites = await Surge.find();
            return NextResponse.json({ success: true, data: clientSites });
        }
    } catch (error: unknown) {
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
        const updatedClientSite = await Surge.findByIdAndUpdate(
            _id,
            { ...rest },
            { new: true, runValidators: true }
        );
        if (!updatedClientSite) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }
        return NextResponse.json({ data: updatedClientSite }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id"); 
        if (!id) {
            return NextResponse.json({ error: "Missing required field: _id" }, { status: 400 });
        }
        const deletedClientSite = await Surge.findByIdAndDelete(id);
        if (!deletedClientSite) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }
        return NextResponse.json({ data: deletedClientSite }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}