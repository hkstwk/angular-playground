import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {User} from "../model/user.model";
import {Thread} from "../model/thread.model";
import {ChatMessage} from "../model/chat-message.model";
import {filter} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  // a stream that publishes new messages only once
  newChatMessages: Subject<ChatMessage> = new Subject<ChatMessage>();

  constructor() { }

  addMessage(chatMessage: ChatMessage): void {
    this.newChatMessages.next(chatMessage);
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<ChatMessage> {
    return this.newChatMessages.pipe(
      filter((chatMessage: ChatMessage) => {
        // belongs to this thread
        return (chatMessage.thread.id === thread.id) &&
          // and isn't authored by this user
          (chatMessage.author.id !== user.id);
    }))
  }
}
