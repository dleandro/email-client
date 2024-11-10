// app/routes/inbox.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface Email {
  id: string;
  subject: string;
  preview: string;
}

export async function loader() {
  // Mock data - replace with real data fetch
  const emails: Email[] = [
    { id: "1", subject: "Hello", preview: "Hey there..." },
    { id: "2", subject: "Meeting", preview: "Can we meet..." },
  ];

  return json({ emails });
}

export default function Drafts() {
  const { emails } = useLoaderData<typeof loader>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drafts</h1>
      <div className="space-y-2">
        {emails.map((email) => (
          <div key={email.id} className="p-4 border rounded hover:bg-gray-50">
            <h3 className="font-semibold">{email.subject}</h3>
            <p className="text-gray-600">{email.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
