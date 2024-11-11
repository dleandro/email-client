import { EmailFolder, EmailStatus } from "~/domain/models/Email";

export interface EmailResponse {
  id: string;
  subject: string;
  preview: string;
  content: string;
  from: string;
  to: string;
  date: string;
  tags: string[];
  status: EmailStatus;
  folder: EmailFolder;
}

const BASE_URL = "http://localhost:5173/api/emails";

export const emailApi = {
  async getEmailsByFolder(folder: string): Promise<EmailResponse[]> {
    const response = await fetch(`${BASE_URL}?folder=${folder}`);
    if (!response.ok) {
      throw new Error("Failed to fetch emails");
    }
    return response.json();
  },

  async updateEmailStatus(
    id: string,
    status: "READ" | "UNREAD"
  ): Promise<void> {
    await fetch(`${BASE_URL}/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  },

  async addTag(id: string, tag: string): Promise<void> {
    await fetch(`${BASE_URL}/${id}/tags`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tag }),
    });
  },

  async createEmail(emailData: {
    to: string;
    subject: string;
    content: string;
    folder: EmailFolder;
  }): Promise<void> {
    await fetch("/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });
  },
};
