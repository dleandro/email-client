// app/components/EmailList.tsx
export interface Email {
  id: string;
  subject: string;
  preview: string;
  content: string;
  from: string;
  to: string;
  date: string;
}

interface EmailListProps {
  emails: Email[];
  onSelect: (email: Email) => void;
}

export function EmailList({ emails, onSelect }: EmailListProps) {
  return (
    <div className="space-y-2">
      {emails.map((email) => (
        <div
          key={email.id}
          role="button"
          tabIndex={0}
          className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
          onClick={() => onSelect(email)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSelect(email);
            }
          }}
        >
          <h3 className="font-semibold">{email.subject}</h3>
          <p className="text-gray-600">{email.preview}</p>
        </div>
      ))}
    </div>
  );
}
