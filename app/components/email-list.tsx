import { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Mail, MailOpen, Tag } from "lucide-react";
import { emailApi, EmailResponse } from "~/api/email-api";
import { Button } from "./ui/button";

interface EmailListProps {
  emails: EmailResponse[];
  onSelect: (email: EmailResponse) => void;
}

export function EmailList({ emails: initialEmails, onSelect }: EmailListProps) {
  const [emails, setEmails] = useState(
    initialEmails
  );
  const [selectedEmail, setSelectedEmail] = useState<EmailResponse | null>(null);
  const [popoverOpenEmailId, setPopoverOpenEmailId] = useState<string | null>(
    null
  );
  const [modalInput, setModalInput] = useState("");

  useEffect(() => {
    setEmails(initialEmails);
  }, [initialEmails]);

  const handleTagClick = (email: EmailResponse, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedEmail(email);
    setPopoverOpenEmailId(email.id);
  };

  const handleStatusClick = async (email: EmailResponse, event: React.MouseEvent) => {
    event.stopPropagation();
    const newStatus = email.status === "UNREAD" ? "READ" : "UNREAD";
    try {
      await emailApi.updateEmailStatus(email.id, newStatus);
      const updatedEmails = await emailApi.getEmailsByFolder(email.folder);
      setEmails(updatedEmails);
    } catch (error) {
      console.error("Failed to update email status:", error);
    }
  };

  const handleEmailClick = async (email: EmailResponse) => {
    try {
      await emailApi.updateEmailStatus(email.id, "READ");
      const updatedEmails = await emailApi.getEmailsByFolder(email.folder);
      setEmails(updatedEmails);
      onSelect(email);
    } catch (error) {
      console.error("Failed to mark email as read:", error);
    }
  };

  const handlePopoverSubmit = async () => {
    if (selectedEmail && modalInput.trim()) {
      try {
        await emailApi.addTag(selectedEmail.id, modalInput);
        const updatedEmails = await emailApi.getEmailsByFolder(
          selectedEmail.folder
        );
        setEmails(updatedEmails);
        setPopoverOpenEmailId(null);
        setModalInput("");
      } catch (error) {
        console.error("Failed to add tag:", error);
      }
    }
  };

  return (
    <div className="space-y-2">
      {emails.map((email) => (
        <div
          key={email.id}
          role="button"
          tabIndex={0}
          className="p-4 border rounded hover:bg-gray-50 cursor-pointer group"
          onClick={() => handleEmailClick(email)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleEmailClick(email);
            }
          }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold">{email.subject}</h3>
              <p className="text-gray-600">{email.preview}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {Array.isArray(email.tags) &&
                  email.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
            <div className="flex gap-2 text-gray-400 group-hover:text-gray-600">
              {email.status === "UNREAD" ? (
                <Mail
                  className="h-4 w-4 cursor-pointer"
                  onClick={(e) => handleStatusClick(email, e)}
                />
              ) : (
                <MailOpen
                  className="h-4 w-4 cursor-pointer"
                  onClick={(e) => handleStatusClick(email, e)}
                />
              )}
              <Popover
                open={popoverOpenEmailId === email.id}
                onOpenChange={(open) => !open && setPopoverOpenEmailId(null)}
              >
                <PopoverTrigger asChild>
                  <Tag
                    className="h-4 w-4 cursor-pointer"
                    onClick={(e) => handleTagClick(email, e)}
                  />
                </PopoverTrigger>
                <PopoverContent
                  className="w-80"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2 bg-white text-black">
                      Add Tag
                    </h2>
                    <input
                      type="text"
                      value={modalInput}
                      onChange={(e) => setModalInput(e.target.value)}
                      className="border p-2 rounded w-full mb-4 bg-white text-black"
                      placeholder="Enter tag"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setPopoverOpenEmailId(null)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handlePopoverSubmit}>Add</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
