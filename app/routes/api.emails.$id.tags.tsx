import { LoaderFunctionArgs } from "@remix-run/node";
import { EmailService } from "~/application/EmailService";

const emailService = new EmailService();

export async function action({ params, request }: LoaderFunctionArgs) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { id } = params;
  const { tag } = await request.json();

  if (!id || !tag?.trim()) {
    return new Response("Invalid request", { status: 400 });
  }

  try {
    await emailService.addTagToEmail(id, tag);
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 404 });
    }
    return new Response("An unknown error occurred", { status: 404 });
  }
}
