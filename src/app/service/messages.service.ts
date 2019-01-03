import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {User} from "../model/user.model";
import {Thread} from "../model/thread.model";
import {ChatMessage} from "../model/chat-message.model";
import {filter, scan, publishReplay, refCount, map} from "rxjs/internal/operators";

const initialChatMessages:ChatMessage[]=[];

interface IChatMessagesOperation extends Function {
  (chatMessages: ChatMessage[]): ChatMessage[];
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  // a stream that publishes new messages only once
  newChatMessages: Subject<ChatMessage> = new Subject<ChatMessage>();

  messages: Observable<ChatMessage[]>;

  // `updates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently // stored in `messages`)
  updates: Subject<any> = new Subject<any>();

  // action streams
  create: Subject<ChatMessage> = new Subject<ChatMessage>();

  constructor() {
    this.messages = this.updates.pipe(
      // watch the updates and accumulate operations on the messages
      scan((chatMessages: ChatMessage[],
             operation: IChatMessagesOperation) => {
          return operation(chatMessages) },
        initialChatMessages),
      // make sure we can share the most recent list of messages across anyone
      publishReplay(1),
      refCount()
    );

    this.create.pipe(
      map(function(chatMessage: ChatMessage): IChatMessagesOperation {
        return (chatMessages: ChatMessage[]) => {
          return chatMessages.concat(chatMessage);
        };
      })
    ).subscribe(this.updates);
  }

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
