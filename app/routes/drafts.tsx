import { useLoaderData } from "@remix-run/react";
import { EmailLayout } from "~/components/email-layout";
import { emailApi } from "~/api/email-api";
import { json } from "@remix-run/node";

export async function loader() {
  const emails = await emailApi.getEmailsByFolder("DRAFTS");
  return json(emails);
}

export default function Drafts() {
  const emails = useLoaderData<typeof loader>();
  return <EmailLayout title="Drafts" emails={emails} />;
}
