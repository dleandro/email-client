// app/routes/inbox.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { EmailLayout } from "~/components/email-layout";
import { Email } from "~/components/email-list";

export async function loader() {
  // Mock data - replace with real data fetch
  const emails: Email[] = [
    {
      id: "1",
      subject: "Hello",
      preview: "Hey there...",
      from: "",
      to: "",
      date: "",
      content: "",
    },
    {
      id: "2",
      subject: "Meeting",
      preview: "Can we meet...",
      from: "",
      to: "",
      date: "",
      content: "",
    },
  ];

  return json({ emails });
}

export default function Inbox() {
  const { emails } = useLoaderData<typeof loader>();

  return <EmailLayout title="Inbox" emails={emails} />;
}
