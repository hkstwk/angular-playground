import {Component, OnInit} from "@angular/core";
import * as _ from "lodash";
import {ChatMessagesService} from "../service/chat-messages.service";
import {ThreadsService} from "../service/threads.service";
import {Observable, combineLatest} from "rxjs";
import {ChatMessage} from "../model/chat-message.model";
import {Thread} from "../model/thread.model";

@Component({
    selector: 'chat-nav-bar',
    templateUrl: './chat-nav-bar.component.html',
    styleUrls: ['./chat-nav-bar.component.css']
})
export class ChatNavBarComponent implements OnInit {
    unreadMessagesCount: number;
    messageCount$: Observable<any>;

    constructor(public chatMessagesService: ChatMessagesService,
                public threadsService: ThreadsService) {
    }

    ngOnInit() {
        this.messageCount$ = combineLatest(
            this.chatMessagesService.chatMessages,
            this.threadsService.currentThread,
            (messages: ChatMessage[], currentThread: Thread) => {
                return [currentThread, messages]
            }
        )

        this.messageCount$.subscribe(
            ([currentThread, messages]: [Thread, ChatMessage[]]) => {
                this.unreadMessagesCount =
                    _.reduce(
                        messages,
                        (sum: number, m: ChatMessage) => {
                            const messageIsInCurrentThread: boolean = m.thread &&
                                currentThread &&
                                (currentThread.id === m.thread.id);
                            if (m && !m.isRead && !messageIsInCurrentThread) {
                                sum = sum + 1;
                            }
                            return sum;
                        }
                        , 0);
            }
        );
    }

}
