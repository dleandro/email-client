import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { EmailList, Email } from "./email-list";
import { EmailDetails } from "./email-details";

interface EmailLayoutProps {
  title: string;
  emails: Email[];
}
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons
import { Button } from "./ui/button";

export function EmailLayout({ title, emails }: EmailLayoutProps) {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    setIsCollapsed(false);
  }, [selectedEmail]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={selectedEmail ? 50 : 100} minSize={30}>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <EmailList emails={emails} onSelect={setSelectedEmail} />
        </div>
      </ResizablePanel>

      {selectedEmail && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={50}
            minSize={0}
            maxSize={70}
            collapsible
            collapsedSize={0}
            hidden={isCollapsed}
          >
            <div className="relative p-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? <ChevronLeft /> : <ChevronRight />}
              </Button>
              <EmailDetails email={selectedEmail} />
            </div>
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
}
