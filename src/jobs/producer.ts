import { client } from "../modules/common/redisUtils";
import { JobInQueue } from "../types";

// Contains the code that adds the emailSending job to the queue
const { Queue } = require("bullmq");
const sendMailQueue = new Queue("email-queue", { connection: client });

export async function addJobToQueue(job: JobInQueue) {
  //console.log(`${job.fromEmailId}_${job.messageId}`)

  const jobOptions = {
    attempts: 5, // Number of retries
    backoff: {
      type: "exponential", // or 'fixed'
      delay: 1000, // Delay in milliseconds
    },
    removeOnComplete: true, // Remove job from queue on successful completion
    removeOnFail: false, // Keep the job in the queue if it fails
  };
  const res = await sendMailQueue.add(
    `${job.fromEmailId}_${job.messageId}`,
    job,
    jobOptions
  );
  return res.id;
}

export async function checkJobs(status: string) {
  const result: Array<{
    "Job ID": string;
    "Job Name": string;
  }> = [];
  const jobs = await sendMailQueue.getJobs(status);
  jobs.forEach((job: { id: string; name: string }) => {
    const jobStatus = {
      "Job ID": job.id,
      "Job Name": job.name,
      "Job status": status,
    };

    result.push(jobStatus);
  });

  return result;
}
