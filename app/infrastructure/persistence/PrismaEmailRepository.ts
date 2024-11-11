import { PrismaClient } from "@prisma/client";
import { Email, EmailProps } from "../../domain/models/Email";
import { EmailRepository } from "../../domain/repositories/EmailRepository";

export class PrismaEmailRepository implements EmailRepository {
  private readonly prisma = new PrismaClient();
  
  async findByFolder(folder: string): Promise<Email[]> {
    const emailRecords = await this.prisma.email.findMany({
      where: { folder },
    });
    return emailRecords.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (record: any) =>
        new Email({
          id: record.id,
          subject: record.subject,
          preview: record.preview,
          content: record.content,
          from: record.from,
          to: record.to,
          date: record.date,
          tags: record.tags,
          status: record.status,
          folder: record.folder,
        })
    );
  }

  async findById(id: string): Promise<Email | null> {
    const record = await this.prisma.email.findUnique({ where: { id } });
    if (!record) return null;
    return new Email(record as EmailProps);
  }

  async save(email: Email): Promise<void> {
    await this.prisma.email.upsert({
      where: { id: email.id },
      update: {
        status: email.status,
        tags: email.tags,
      },
      create: {
        id: email.id,
        to: email.to,
        from: email.from,
        content: email.content,
        subject: email.subject,
        preview: email.preview,
        status: email.status,
        folder: email.folder,
        tags: email.tags,
      },
    });
  }
}
