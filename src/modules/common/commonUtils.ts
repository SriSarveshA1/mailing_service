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

export async function parseMailContent(content: any) {
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

  const parsedEmailContent:{replyMailId:string,subject:string,snippet:string,body:string} = {
    replyMailId: fromMailId,
    subject,
    snippet,
    body: textContent,
  };

  return parsedEmailContent;
}
