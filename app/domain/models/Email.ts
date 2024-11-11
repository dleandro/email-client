export interface EmailProps {
  id: string;
  subject: string;
  preview: string;
  content: string;
  from: string;
  to: string;
  date: Date;
  tags: string[];
  status: EmailStatus;
  folder: EmailFolder;
}

export enum EmailStatus {
  READ = "READ",
  UNREAD = "UNREAD",
}

export enum EmailFolder {
  INBOX = "INBOX",
  SENT = "SENT",
  DRAFTS = "DRAFTS",
}

export class Email {
  private props: EmailProps;

  constructor(props: EmailProps) {
    this.props = props;
  }

  public toggleStatus(): void {
    this.props.status =
      this.props.status === EmailStatus.UNREAD
        ? EmailStatus.READ
        : EmailStatus.UNREAD;
  }

  public addTag(tag: string): void {
    this.props.tags.push(tag);
  }

  public markAsRead(): void {
    this.props.status = EmailStatus.READ;
  }

  get id() {
    return this.props.id;
  }
  get subject() {
    return this.props.subject;
  }
  get preview() {
    return this.props.preview;
  }
  get status() {
    return this.props.status;
  }
  get tags() {
    return this.props.tags;
  }
  get folder() {
    return this.props.folder;
  }
  get date() {
    return this.props.date;
  }
  get from() {
    return this.props.from;
  }
  get to() {
    return this.props.to;
  }
  get content() {
    return this.props.content;
  }
}
