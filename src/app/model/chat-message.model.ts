import {Thread} from "./thread.model";
import {User} from "./user.model";
import {UUID} from "angular2-uuid";
/**
 * Message represents one message being sent in a Thread
 */
export class ChatMessage {
  id: string;
  sentAt: Date;
  isRead: boolean;
  author: User;
  text: string;
  thread: Thread;

  constructor(obj?: any) {
    this.id     = obj && obj.id     || UUID.UUID();
    this.isRead = obj && obj.isRead || false;
    this.sentAt = obj && obj.sentAt || new Date();
    this.author = obj && obj.author || null;
    this.text   = obj && obj.text   || null;
    this.thread = obj && obj.thread || null;
  }
}
