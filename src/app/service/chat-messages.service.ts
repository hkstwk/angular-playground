import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {User} from "../model/user.model";
import {Thread} from "../model/thread.model";
import {ChatMessage} from "../model/chat-message.model";
import {filter, scan, publishReplay, refCount, map} from "rxjs/operators";

const initialChatMessages:ChatMessage[]=[];

interface IChatMessagesOperation extends Function {
  (chatMessages: ChatMessage[]): ChatMessage[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {
  // a stream that publishes new chatMessages only once
  newChatMessages: Subject<ChatMessage> = new Subject<ChatMessage>();

  chatMessages: Observable<ChatMessage[]>;

  // `updates` receives _operations_ to be applied to our `chatMessages`
  // it's a way we can perform changes on *all* chatMessages (that are currently
  // stored in `chatMessages`)
  updates: Subject<any> = new Subject<any>();

  // action streams
  create: Subject<ChatMessage> = new Subject<ChatMessage>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.chatMessages = this.updates.pipe(
      // watch the updates and accumulate operations on the chatMessages
      scan((chatMessages: ChatMessage[],
             operation: IChatMessagesOperation) => {
          return operation(chatMessages) },
        initialChatMessages),
      // make sure we can share the most recent list of chatMessages across anyone
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

    this.newChatMessages.subscribe(this.create);

    this.markThreadAsRead
      .pipe(
        map( (thread: Thread) => {
          return (chatMessages: ChatMessage[]) => {
            return chatMessages.map( (chatMessage: ChatMessage) => {
              // note that we're manipulating `message` directly here. Mutability
              // can be confusing and there are lots of reasons why you might want
              // to, say, copy the Message object or some other 'immutable' here
              if (chatMessage.thread.id === thread.id) {
              chatMessage.isRead = true; }
            return chatMessage; });
          };
        })
      )
      .subscribe(this.updates);
  }

  addMessage(chatMessage: ChatMessage): void {
    this.newChatMessages.next(chatMessage);
  }

  chatMessagesForThreadUser(thread: Thread, user: User): Observable<ChatMessage> {
    return this.newChatMessages.pipe(
        filter((chatMessage: ChatMessage) => {
          // belongs to this thread
            return (chatMessage.thread.id === thread.id) &&
          // where user is not the author
            (chatMessage.author.id !== user.id);
        })
  )}

}

export const messagesServiceInjectables: Array<any> = [
  ChatMessagesService
];
