// Import SendGrid's mail package
import SendGrid from "@sendgrid/mail";
import { ReplyMailBodyAndSubject } from "../../types";

// Set your SendGrid API key
SendGrid.setApiKey("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");
export async function sendEmail() {
  // Define your email details
  const msg = {
    to: "r.srisarvesh@gmail.com",
    from: "srisarvesh3612@gmail.com",
    subject: "Information Gathering",
    text: "Hi from good things to you",
  };

  try {
    // Send the email
    console.log(await SendGrid.send(msg));
  } catch (error) {
    console.log(error);
  }
}

