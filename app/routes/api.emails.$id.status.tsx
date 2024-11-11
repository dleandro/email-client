import { LoaderFunctionArgs } from "@remix-run/node";
import { EmailService } from "~/application/EmailService";
import { EmailStatus } from "~/domain/models/Email";

const emailService = new EmailService();

export async function action({ params, request }: LoaderFunctionArgs) {
  if (request.method !== "PUT") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { id } = params;
  const { status } = await request.json();

  if (!id || !status || !Object.values(EmailStatus).includes(status)) {
    return new Response("Invalid request", { status: 400 });
  }

  try {
    await emailService.toggleEmailStatus(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 404 });
    }
    return new Response("An unknown error occurred", { status: 404 });
  }
}
