import { client } from "../modules/common/redisUtils";

// Contains the code that adds the emailSending job to the queue 
const {Queue} = require("bullmq");
const sendMailQueue = new Queue("email-queue", {connection:client});


