import { Email } from "./email-list";

// app/components/EmailDetails.tsx
interface EmailDetailsProps {
  email: Email | null;
}

export function EmailDetails({ email }: EmailDetailsProps) {
  if (!email) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select an email to view details
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{email.subject}</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-500">
          <div>From: {email.from}</div>
          <div>Date: {email.date}</div>
        </div>
        <div className="text-sm text-gray-500">To: {email.to}</div>
        <div className="mt-4">{email.content}</div>
      </div>
    </div>
  );
}
