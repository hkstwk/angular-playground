import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Thread} from "../model/thread.model";
import {ChatMessagesService} from "./chat-messages.service";
import {ChatMessage} from "../model/chat-message.model";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {

  // `threads` is a observable that contains the most up to date list of threads
  threads: Observable<{[key: string]: Thread}>;

  // `orderedThreads` contains a newest-chatMessage-first chronological list of threads
  orderedThreads: Observable<Thread[]>;

  constructor(chatMessagesService: ChatMessagesService) {
    this.threads = chatMessagesService.chatMessages.pipe(
      map((_chatMessages: ChatMessage[]) => {

        const threads: {[key: string]: Thread} = {};

        // Store the message's thread in our accumulator `threads`
        _chatMessages.map((_chatMessage: ChatMessage) => {
            threads[_chatMessage.thread.id] = threads[_chatMessage.thread.id] ||
            _chatMessage.thread;

          // Cache the most recent message for each thread
          const chatMessagesThread: Thread = threads[_chatMessage.thread.id];
          if (!chatMessagesThread.lastMessage ||
            chatMessagesThread.lastMessage.sentAt < _chatMessage.sentAt) {
            chatMessagesThread.lastMessage = _chatMessage;
          }

        });
        console.log(threads);
        return threads;
      })
    );

    this.orderedThreads = this.threads.pipe(
      map( (thrds : { [key: string]: Thread } ) => {
        const threads : Thread[] = _.values(thrds);
        return _.sortBy(threads, (t : Thread) => t.lastMessage.sentAt).reverse();
      }));

  }


}
