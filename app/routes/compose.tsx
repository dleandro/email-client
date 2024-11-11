import { useState } from "react";
import { Form, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { emailApi } from "~/api/email-api";
import { EmailFolder } from "~/domain/models/Email";

export default function Compose() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const action = formData.get("action") as "send" | "draft";

    const emailData = {
      to: formData.get("to") as string,
      subject: formData.get("subject") as string,
      content: formData.get("content") as string,
      folder: action === "send" ? EmailFolder.SENT : EmailFolder.DRAFTS,
    };

    try {
      await emailApi.createEmail(emailData);
      setSuccessMessage(
        action === "send"
          ? "Email sent successfully!"
          : "Draft saved successfully!"
      );
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/inbox");
      }, 2000);
    } catch (error) {
      console.error("Failed to save email", error);
    }
  };

  return (
    <div className="p-6">
      {successMessage && (
        <div className="mb-4 p-4 text-green-700 bg-green-100 rounded">
          {successMessage}
        </div>
      )}
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

        <input type="hidden" name="action" value="send" />
        <div className="flex justify-end space-x-2">
          <Button
            type="submit"
            variant="default"
            onClick={() => {
              const actionInput = document.querySelector(
                'input[name="action"]'
              ) as HTMLInputElement;
              actionInput.value = "send";
            }}
          >
            Send
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const actionInput = document.querySelector(
                'input[name="action"]'
              ) as HTMLInputElement;
              actionInput.value = "draft";
              const form = actionInput.closest("form") as HTMLFormElement;
              form.requestSubmit();
            }}
          >
            Save as Draft
          </Button>
        </div>
      </Form>
    </div>
  );
}
