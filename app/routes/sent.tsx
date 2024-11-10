import { useLoaderData } from "@remix-run/react";
import { EmailLayout } from "~/components/email-layout";

export async function loader() {
  const response = await fetch("http://localhost:5173/api/emails?folder=sent");
  const emails = await response.json();
  return new Response(JSON.stringify({ emails }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default function Sent() {
  const { emails } = useLoaderData<typeof loader>();
  return <EmailLayout title="Sent" emails={emails} />;
}
