export const SCOPE_FOR_OAUTH = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
];

export const ACCESS_TYPE_FOR_OAUTH = "offline";

export const GET_METHOD = "GET";
export const POST_METHOD = "POST";

export const LABEL = {
  INTERESTED: {
    name: "Interested",
    id: "Label_4590868359866301479",
  },
  MORE_INFORMATION: {
    name: "More information",
    id: "Label_1799809905460251359",
  },
  NOT_INTERESTED: {
    name: "Not Interested",
    id: "Label_7590678631721749699",
  },
};

export const customLabelIds = [
  LABEL.INTERESTED.id,
  LABEL.MORE_INFORMATION.id,
  LABEL.NOT_INTERESTED.id,
];

export const INTERESTED_MAIL_SUBJECT = "Request for Product Demo";

export const INTERESTED_MAIL_BODY = `
Dear Customer,

Thank you for reaching out and expressing your interest in [Company Name] and our products. We're thrilled to learn about your enthusiasm!

We would be delighted to provide you with a personalized demonstration of our product. To ensure we tailor the demo to your specific needs and requirements, could you please suggest a few dates and times that work best for you? Our team will do their utmost to accommodate your schedule.

Feel free to provide any additional details or questions you may have beforehand, so we can address them during the demo.

Looking forward to showcasing the capabilities of our product and assisting you in any way we can.

Best regards,
ReachInBox Team
`;

export const MORE_INFORMATION_MAIL_SUBJECT = `Inquiry About the Product`;

export const MORE_INFORMATION_MAIL_BODY = `
Dear Customer,

Thank you for your interest in our product and for reaching out to us!

We're excited to provide you with more information about our product. To ensure we address all your queries comprehensively, could you please specify the particular aspects of the product you would like to learn more about? Whether it's features, pricing, use cases, or anything else, we're here to help.

Additionally, feel free to let us know if you have any specific requirements or use cases in mind, so we can tailor our response to suit your needs.

Looking forward to assisting you further and providing you with all the information you need to make an informed decision.

Best regards,
ReachInBox Team
`;

export const NOT_INTERESTED_MAIL_SUBJECT = `Thank You for Your Interest in our Product`;

export const NOT_INTERESTED_MAIL_BODY = `
Thank you for taking the time to consider our company and our product. We appreciate your interest and the opportunity to connect with you.

While we understand that our product/service may not currently align with your needs, we sincerely value your feedback. Understanding your requirements better helps us improve and tailor our offerings to better serve our customers.

If you have any suggestions or specific feedback on areas where we could enhance our product/service to better meet your needs in the future, we would greatly appreciate hearing from you.

Best regards,
ReachInBox Team
`;
