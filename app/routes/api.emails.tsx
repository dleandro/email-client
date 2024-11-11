import { LoaderFunctionArgs } from "@remix-run/node";
import { EmailService } from "~/application/EmailService";
import { EmailFolder } from "~/domain/models/Email";
import { mapEmailsToEmailResponses } from "~/mappers/email-mapper";

const emailService = new EmailService();

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const searchParams = new URLSearchParams(request.url.split("?")[1]);
    const folder = searchParams.get("folder");

    // Validate folder parameter
    if (folder && !Object.values(EmailFolder).includes(folder as EmailFolder)) {
      return new Response(
        JSON.stringify({ error: "Invalid folder parameter" }),
        { status: 400 }
      );
    }

    if (!folder) {
      return new Response(
        JSON.stringify({ error: "Folder parameter is required" }),
        { status: 400 }
      );
    }

    const emails = await emailService.getEmailsByFolder(folder);
    const emailResponses = mapEmailsToEmailResponses(emails);
    return new Response(JSON.stringify(emailResponses), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to load emails" }), {
      status: 500,
    });
  }
}

export async function action({ request }: LoaderFunctionArgs) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { to, subject, content, folder } = await request.json();

  if (!to || !subject || !content || !folder) {
    return new Response("Invalid request", { status: 400 });
  }

  try {
    await emailService.createEmail({ to, subject, content, folder });
    return new Response(null, { status: 201 });
  } catch (error) {
    return new Response("Failed to create email", { status: 500 });
  }
}
