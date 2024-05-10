import express, { NextFunction } from "express";

export const gmailRouter = express.Router();


const redirect_path = process.env.REDIRECT_PATH;

gmailRouter.get('/auth/gmail', (req, res, next:NextFunction) => {



});



