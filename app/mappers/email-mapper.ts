import { EmailResponse } from "~/api/email-api";
import { Email, EmailProps } from "~/domain/models/Email";

export function mapEmailResponseToEmail(emailResponse: EmailResponse): Email {
  const emailProps: EmailProps = {
    ...emailResponse,
    date: new Date(emailResponse.date),
  };
  return new Email(emailProps);
}

export function mapEmailResponsesToEmails(
  emailResponses: EmailResponse[]
): Email[] {
  return emailResponses.map(mapEmailResponseToEmail);
}

export function mapEmailToEmailResponse(email: Email): EmailResponse {
  return {
    id: email.id,
    subject: email.subject,
    preview: email.preview,
    content: email.content,
    from: email.from,
    to: email.to,
    date: email.date.toISOString(),
    tags: email.tags,
    status: email.status,
    folder: email.folder,
  };
}

export function mapEmailsToEmailResponses(emails: Email[]): EmailResponse[] {
  return emails.map(mapEmailToEmailResponse);
}