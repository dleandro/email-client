// app/routes/compose.tsx
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export default function Compose() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="p-6">
      <Form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            name="to"
            type="email"
            placeholder="recipient@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            type="text"
            placeholder="Enter subject"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Message</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Write your message here..."
            className="min-h-[200px]"
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="submit" variant="default">
            Send
          </Button>
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
        </div>
      </Form>
    </div>
  );
}
