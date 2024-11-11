import { EmailRepository } from "../domain/repositories/EmailRepository";
import { Email, EmailFolder, EmailStatus } from "../domain/models/Email";
import { PrismaEmailRepository } from "~/infrastructure/persistence/PrismaEmailRepository";

export class EmailService {
  private readonly emailRepository: EmailRepository =
    new PrismaEmailRepository();

  async getEmailsByFolder(folder: string): Promise<Email[]> {
    return this.emailRepository.findByFolder(folder);
  }

  async getEmailById(emailId: string): Promise<Email | null> {
    return this.emailRepository.findById(emailId);
  }

  async toggleEmailStatus(emailId: string): Promise<void> {
    const email = await this.emailRepository.findById(emailId);
    if (!email) throw new Error("Email not found");

    email.toggleStatus();
    await this.emailRepository.save(email);
  }

  async addTagToEmail(emailId: string, tag: string): Promise<void> {
    const email = await this.emailRepository.findById(emailId);
    if (!email) throw new Error("Email not found");

    email.addTag(tag);
    await this.emailRepository.save(email);
  }
  
  async createEmail({
    to,
    subject,
    content,
    folder,
  }: {
    to: string;
    subject: string;
    content: string;
    folder: EmailFolder;
  }): Promise<void> {
    const email = new Email({
      id: crypto.randomUUID(),
      to,
      from: "your-email@example.com", // Replace with actual sender email
      subject,
      content,
      preview: content.substring(0, 100),
      date: new Date(),
      tags: [],
      status: EmailStatus.UNREAD,
      folder,
    });

    await this.emailRepository.save(email);
  }
}
