import { Email } from "../models/Email";

export interface EmailRepository {
  findById(id: string): Promise<Email | null>;
  findByFolder(folder: string): Promise<Email[]>;
  save(email: Email): Promise<void>;
}
