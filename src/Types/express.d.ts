import express from "express";
import { JwtPayload } from "jsonwebtoken";


// Custom Typescript types or Interface (if any) for express can be added here
declare global {

    namespace Express {
        interface Request {
            user?: JwtPayload | string;
        }
    }
}

export {};