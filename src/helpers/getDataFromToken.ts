// import { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export const getDataFromToken = (request: NextRequest) => {
//     try {
//         const token = request.cookies.get("token")?.value || '';
//         const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
//         return decodedToken.id;
//     } catch (error: any) {
//         throw new Error(error.message);
//     }

// }

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: string; 
}

export const getDataFromToken = (request: NextRequest): string => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
        return decodedToken.id;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while verifying the token.");
    }
};




interface DecodedToken {
    id: string;
    phno: string;   
    name: string;
}

export const getPhnoFromToken = (token: string): string => {
    try {
        if (!token) {
            throw new Error("Token is required.");
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
        console.log(decodedToken);
        return decodedToken.id;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Token verification failed: ${error.message}`);
        }
        throw new Error("An unknown error occurred while verifying the token.");
    }
};
