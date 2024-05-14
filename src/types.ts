import express from "express";
import { OAuth2Client } from "google-auth-library";

export interface RequestWithAccessToken extends express.Request {
  accessToken?: string;
}

export interface RequestWithEmail extends express.Request {
  emailId?: string;
}

export interface RequestWithTokensAndEmail
  extends RequestWithAccessToken,
    RequestWithEmail {
  accessToken?: string;
  emailId?: string;
  refreshToken?: string;
}

export interface ParsedMailContent {
  replyMailId: string;
  subject: string;
  snippet?: string;
  body: string;
  labelIds?: string[];
}

export interface JobInQueue {
  fromEmailId: string;
  messageId: string;
  refreshToken: string;
}

export interface AxiosRequest {
  method: string;
  url: string;
  headers: {
    Authorization?: string;
    "Content-Type": string;
  };
  data?: any;
}

export interface ReplyMailBodyAndSubject {
  replyMailSubject: string;
  replyMailBody: string;
  senderMailId: string;
  replyMailId: string;
}

