import {Component, OnInit, ChangeDetectionStrategy, ElementRef} from "@angular/core";
import {Observable} from "rxjs";
import {Thread} from "../model/thread.model";
import {ChatMessage} from "../model/chat-message.model";
import {User} from "../model/user.model";
import {ChatMessagesService} from "../service/chat-messages.service";
import {ThreadsService} from "../service/threads.service";
import {UsersService} from "../service/users.service";

@Component({
    selector: 'chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ChatWindowComponent implements OnInit {
    messages: Observable<any>;
    currentThread: Thread;
    draftMessage: ChatMessage;
    currentUser: User;

    constructor(public chatMessagesService: ChatMessagesService,
                public threadsService: ThreadsService,
                public usersService: UsersService,
                public el: ElementRef) {
    }

    ngOnInit(): void {
        this.messages = this.threadsService.currentThreadMessages;

        this.draftMessage = new ChatMessage;

        this.threadsService.currentThread.subscribe(
            (thread: Thread) => {
                this.currentThread = thread;
            }
        );

        this.usersService.currentUser.subscribe(
            (user: User) => {
                this.currentUser = user;
            }
        );

        this.messages.subscribe(
            (messages: ChatMessage[]) => {
                setTimeout(() => {
                    this.scrollToBottom();
                });
            }
        );
    }

    sendMessage(): void {
        const m: ChatMessage = this.draftMessage;
        m.author = this.currentUser;
        m.thread = this.currentThread;
        m.isRead = true;
        this.chatMessagesService.addMessage(m);
        this.draftMessage = new ChatMessage();
    }

    onEnter(event: any): void {
        this.sendMessage();
        event.preventDefault();
    }

    scrollToBottom(): void {
        const scrollPane: any = this.el
            .nativeElement.querySelector('.msg-container-base');
        scrollPane.scrollTop = scrollPane.scrollHeight;
    }

}
