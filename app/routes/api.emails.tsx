import type { LoaderFunctionArgs } from "@remix-run/node";

interface Email {
  id: string;
  to: string;
  from: string;
  subject: string;
  content: string;
  preview: string;
  date: string;
  folder: "inbox" | "sent" | "drafts";
}

const mockEmails: Email[] = [
  {
    id: "1",
    to: "user@example.com",
    from: "sender@example.com",
    subject: "Meeting Tomorrow",
    content: "Let's discuss the project tomorrow at 10am.",
    preview: "Let's discuss the project...",
    date: new Date().toISOString(),
    folder: "inbox",
  },
  {
    id: "2",
    to: "recipient@example.com",
    from: "user@example.com",
    subject: "Project Update",
    content: "Here's the latest update on our project.",
    preview: "Here's the latest update...",
    date: new Date().toISOString(),
    folder: "sent",
  },
  {
    id: "3",
    to: "draft@example.com",
    from: "user@example.com",
    subject: "Draft Email",
    content: "This is a draft email.",
    preview: "This is a draft...",
    date: new Date().toISOString(),
    folder: "drafts",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
     try {
       const url = new URL(request.url, "http://localhost:3000");
       const folder = url.searchParams.get("folder");

       // Validate folder parameter
       if (folder && !["inbox", "sent", "drafts"].includes(folder)) {
         return new Response("Invalid folder parameter", { status: 400 });
       }

       // Filter emails by folder
       const filteredEmails = folder
         ? mockEmails.filter((email) => email.folder === folder)
         : mockEmails;

       return new Response(JSON.stringify(filteredEmails), {
         headers: {
           "Content-Type": "application/json",
         },
       });
     } catch (error) {
       console.error("Error processing request:", error);
       return new Response("Internal server error", { status: 500 });
     }
}
