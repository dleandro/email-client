import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Mail, MailOpen, Tag } from "lucide-react"; // Import icons
import { Email } from "~/routes/api.emails";

interface EmailListProps {
  emails: Email[];
  onSelect: (email: Email) => void;
}

export function EmailList({ emails: initialEmails, onSelect }: EmailListProps) {
  const [emails, setEmails] = useState(initialEmails);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [modalInput, setModalInput] = useState("");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const handleTagClick = (email: Email, event: React.MouseEvent) => {
    event.stopPropagation(); // Stop event propagation
    setSelectedEmail(email);
    setPopoverOpen(true);
  };

  const handleStatusClick = (email: Email, event: React.MouseEvent) => {
    event.stopPropagation(); // Stop event propagation
    email.status = email.status === "UNREAD" ? "READ" : "UNREAD"; // Toggle status
    const updatedEmails = [...emails];
    setEmails(updatedEmails);
  };

  const handleEmailClick = (email: Email) => {
    email.status = "READ"; // Set status to READ when email is clicked
    setEmails(emails)
    onSelect(email);
  };

  const handlePopoverSubmit = () => {
    if (selectedEmail) {
      selectedEmail.tags.push(modalInput);
      const updatedEmails = [...emails];
      setEmails(updatedEmails);
    }
    setPopoverOpen(false);
    setModalInput("");
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
                 {email.tags.map((tag, index) => (
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
                   className="h-4 w-4"
                   onClick={(e) => handleStatusClick(email, e)}
                 />
               ) : (
                 <MailOpen
                   className="h-4 w-4"
                   onClick={(e) => handleStatusClick(email, e)}
                 />
               )}
               <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                 <PopoverTrigger asChild>
                   <Tag
                     className="h-4 w-4"
                     onClick={(e) => handleTagClick(email, e)}
                   />
                 </PopoverTrigger>
                 <PopoverContent onClick={(e) => e.stopPropagation()}>
                   <div className="p-4">
                     <h2 className="text-lg font-semibold mb-2">Add Tag</h2>
                     <input
                       type="text"
                       value={modalInput}
                       onChange={(e) => setModalInput(e.target.value)}
                       className="border p-2 rounded w-full mb-4"
                       placeholder="Enter tag"
                     />
                     <div className="flex justify-end space-x-2">
                       <button
                         onClick={() => setPopoverOpen(false)}
                         className="px-4 py-2 bg-gray-300 rounded"
                       >
                         Cancel
                       </button>
                       <button
                         onClick={handlePopoverSubmit}
                         className="px-4 py-2 bg-blue-500 text-white rounded"
                       >
                         Submit
                       </button>
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
