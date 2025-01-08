import { connect } from "@/dbConfig/dbConfig";
import Surge from "@/models/surgeModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id"); 

        console.log(id);

            const clientSites = await Surge.find({ siteId: id });
            console.log(clientSites);
            if (!clientSites) {
                return NextResponse.json({ error: "Document not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: clientSites });
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}