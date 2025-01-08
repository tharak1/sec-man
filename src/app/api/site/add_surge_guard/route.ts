import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { AcceptedGuard, AcceptedSurgeRequests, surge, users } from "@/models/frontendModels";
import Surge from "@/models/surgeModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest){
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id"); 
        console.log(id);
        const surgeSite = await Surge.findById(id) as surge; 
        const userId = getDataFromToken(request);
        const userData = await User.findById(userId) as users;
        
        const x = {
            name: userData.name,
            phno: userData.phno
        }

        if(!surgeSite){
            return NextResponse.json({ error: "No surge site found! " }, { status: 400 });
        }else{
            if(surgeSite.requiredGuards > surgeSite.acceptedGuards!.length){
                const updatedGuardsList = surgeSite.acceptedGuards!.push(x);
                const updatedSurgeSite = await Surge.findByIdAndUpdate(
                    id,
                    { ...surgeSite, acceptedGuards:updatedGuardsList },
                    { new: true, runValidators: true }
                );
                const guardSurge = {
                    surgeId: surgeSite._id!,
                    name: surgeSite.name,
                    date:surgeSite.date,
                    address:surgeSite.Address,
                    location:surgeSite.location,
                    shift:surgeSite.shift,
                    shiftTimings:surgeSite.shiftTimings,
                }
                const updatedAcceptedSurgeRequests = userData.acceptedSurgeRequests!.push(guardSurge);
                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    { ...userData, acceptedSurgeRequests: updatedAcceptedSurgeRequests },
                    { new: true, runValidators: true }
                );
                return NextResponse.json({ message: "Guard added for surge!", data: {updatedSurgeSite, updatedUser} }, { status: 200 });
            }
            else{
                return NextResponse.json({ error: "Guard limit exceeded!"}, { status: 400 });
            }
        }
    }  catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        console.log(error);
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

// export async function POST(request: NextRequest){
//     try {
//         const { searchParams } = new URL(request.url);
//         const surgeId = searchParams.get("surgeId");  

//         const surgeSite = await Surge.findById(surgeId) as surge; 
//         const userId = getDataFromToken(request);
//         const userData = await User.findById(userId) as users;

//         const updatedUserAcceptedSurgeRequests = userData?.acceptedSurgeRequests?.filter((request) => request.surgeId !== surgeId);
//         console.log("Updated User Accepted Surge Requests:", updatedUserAcceptedSurgeRequests);
        
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { 
//                 ...userData,
//                 acceptedSurgeRequests: updatedUserAcceptedSurgeRequests 
//             },
//             { 
//                 new: true, 
//                 runValidators: true 
//             }
//         );
        
//         const updatedSurgeAcceptedGuards = surgeSite?.acceptedGuards?.filter((guard) => guard.phno !== userData?.phno);
//         console.log("Updated Surge Accepted Guards:", updatedSurgeAcceptedGuards);
        
//         const updatedSurgeSite = await Surge.findByIdAndUpdate(
//             surgeId,
//             { 
//                 ...surgeSite,
//                 acceptedGuards: updatedSurgeAcceptedGuards 
//             },
//             { 
//                 new: true, 
//                 runValidators: true 
//             }
//         );

//         return NextResponse.json({ message: "Guard added for surge!", data: {updatedSurgeSite, updatedUser} }, { status: 200 });


//     }  catch (error: unknown) {
//         if (error instanceof Error) {
//             console.log(error.message);
//             return NextResponse.json({ error: error.message }, { status: 500 });
//         }
//         console.log(error);
//         return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
//     }

// }


export async function POST(request: NextRequest) {
    try {
        // Parse the surgeId from the request URL
        const { searchParams } = new URL(request.url);
        const surgeId = searchParams.get("surgeId");
        if (!surgeId) {
            return NextResponse.json({ error: "Missing surgeId parameter" }, { status: 400 });
        }

        // Fetch the surge and user data from the database
        const surgeSite = await Surge.findById(surgeId);
        if (!surgeSite) {
            return NextResponse.json({ error: "Surge site not found" }, { status: 404 });
        }

        const userId = getDataFromToken(request);
        const userData = await User.findById(userId);
        if (!userData) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Update the user's accepted surge requests
        const updatedUserAcceptedSurgeRequests = userData.acceptedSurgeRequests?.filter(
            (request:AcceptedSurgeRequests) => request.surgeId !== surgeId
        );
        // console.log("Updated User Accepted Surge Requests:", updatedUserAcceptedSurgeRequests);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...userData.toObject(), // Spread the current user data
                acceptedSurgeRequests: updatedUserAcceptedSurgeRequests,
            },
            { new: true, runValidators: true }
        );

        // console.log({...userData,acceptedSurgeRequests: updatedUserAcceptedSurgeRequests,})

        if (!updatedUser) {
            return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
        }

        // Update the surge site's accepted guards
        const updatedSurgeAcceptedGuards = surgeSite.acceptedGuards?.filter(
            (guard:AcceptedGuard) => guard.phno !== userData.phno
        );
        // console.log("Updated Surge Accepted Guards:", updatedSurgeAcceptedGuards);

        const updatedSurgeSite = await Surge.findByIdAndUpdate(
            surgeId,
            {
                ...surgeSite.toObject(), // Spread the current surge data
                acceptedGuards: updatedSurgeAcceptedGuards,
            },
            { new: true, runValidators: true }
        );

        if (!updatedSurgeSite) {
            return NextResponse.json({ error: "Failed to update surge site" }, { status: 500 });
        }

        // Return success response
        return NextResponse.json(
            {
                message: "Guard added for surge!",
                data: { updatedSurgeSite, updatedUser },
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        console.error("Unknown Error:", error);
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
