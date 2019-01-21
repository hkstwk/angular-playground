import {Injectable} from "@angular/core";
import {Observable, Subject, BehaviorSubject, combineLatest} from "rxjs";
import {Thread} from "../model/thread.model";
import {ChatMessagesService} from "./chat-messages.service";
import {ChatMessage} from "../model/chat-message.model";
import {map} from "rxjs/internal/operators";
import * as _ from "lodash";


@Injectable({
    providedIn: 'root'
})
export class ThreadsService {

    // `threads` is a observable that contains the most up to date list of threads
    threads: Observable<{[key: string]: Thread}>;

    // `orderedThreads` contains a newest-chatMessage-first chronological list of threads
    orderedThreads: Observable<Thread[]>;

    // `currentThread` contains the currently selected thread
    currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());

    // `currentThreadMessages` contains the set of messages for the currently // selected thread
    currentThreadMessages: Observable<ChatMessage[]>;

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
                return threads;
            })
        );

        this.orderedThreads = this.threads.pipe(
            map((thrds: {[key: string]: Thread}) => {
                const threads: Thread[] = _.values(thrds);
                return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
            }));

        this.currentThreadMessages = combineLatest(
            this.currentThread,  // initially set to an empty thread above!!
            chatMessagesService.chatMessages, // injected in constructor so
            (currentThrd: Thread, chatMsgs: ChatMessage[]) => {
                if (currentThrd && (chatMsgs.length > 0)) {
                    return _.chain(chatMsgs)
                        .filter((chatMsg: ChatMessage) => (chatMsg.thread.id === currentThrd.id))
                        .map((chatMsg: ChatMessage) => {
                            chatMsg.isRead = true;
                            return chatMsg;
                        })
                        .value();
                } else {
                    return [];
                }
            });

        this.currentThread.subscribe(chatMessagesService.markThreadAsRead);

    };

    setCurrentThread(newThread: Thread): void {
        this.currentThread.next(newThread);
    };

}
