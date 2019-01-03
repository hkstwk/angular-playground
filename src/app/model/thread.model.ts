import {ChatMessage} from './chat-message.model';
import {UUID} from "angular2-uuid";
/**
 * Thread represents a group of Users exchanging Messages */
export class Thread {
  id: string;
  lastMessage: ChatMessage;
  name: string;
  avatarSrc: string;
  constructor(id?: string,
              name?: string,
              avatarSrc?: string) {
    this.id = id || UUID.UUID();
    this.name = name;
    this.avatarSrc = avatarSrc;
  }
}
