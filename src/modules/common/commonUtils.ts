import { ParsedMailContent } from "../../types";
import {
  customLabelIds,
  INTERESTED_MAIL_BODY,
  INTERESTED_MAIL_SUBJECT,
  LABEL,
  MORE_INFORMATION_MAIL_BODY,
  MORE_INFORMATION_MAIL_SUBJECT,
  NOT_INTERESTED_MAIL_BODY,
  NOT_INTERESTED_MAIL_SUBJECT,
} from "./constants";

function retrieveEmailAddress(content: string): string {
  let startIndex = -1;
  let endIndex = -1;

  for (let i = 0; i < content.length; i++) {
    if (content[i] == "<") {
      startIndex = i;
    }
    if (content[i] == ">") {
      endIndex = i;
      break;
    }
  }

  return content.substring(startIndex + 1, endIndex);
}

export function parseMailContent(content: any) {
  const labelIds = content.labelIds;
  const payload = content.payload;
  const headers = payload.headers;

  const subject = headers.find(
    (header: any) => header.name === "Subject"
  )?.value;

  let fromMailId: string = headers.find(
    (header: any) => header.name === "From"
  )?.value;

  fromMailId = retrieveEmailAddress(fromMailId);

  let textContent = "";
  if (payload.parts) {
    const text = payload.parts.find((el: any) => el.mimeType === "text/plain");
    if (text) {
      textContent = Buffer.from(text.body.data, "base64").toString("utf-8");
    }
  } else {
    textContent = Buffer.from(payload.body.data, "base64").toString("utf-8");
  }

  let snippet = content.snippet;

  const parsedEmailContent: ParsedMailContent = {
    replyMailId: fromMailId,
    subject,
    snippet,
    body: textContent,
    labelIds,
  };

  return parsedEmailContent;
}

export function getLabelIdFromLabel(label: string) {
  let labelId: string | undefined;

  switch (label.trim()) {
    case "Interested":
      labelId = LABEL.INTERESTED.id;
      break;
    case "More_Information":
    case "More Information":
      labelId = LABEL.MORE_INFORMATION.id;
      break;
    case "Not_Interested":
    case "Not Interested":
      labelId = LABEL.NOT_INTERESTED.id;
      break;
    default:
      labelId = undefined;
  }

  return labelId;
}

export function getSubjectFromLabel(analyzedLabel: string) {
  let replyMailSubject: string = "";

  switch (analyzedLabel) {
    case "Interested":
      replyMailSubject = INTERESTED_MAIL_SUBJECT;
      break;

    case "Not Interested":
      replyMailSubject = NOT_INTERESTED_MAIL_SUBJECT;
      break;

    default:
      replyMailSubject = MORE_INFORMATION_MAIL_SUBJECT;
  }

  return replyMailSubject;
}
