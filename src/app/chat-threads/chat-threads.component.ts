import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {ThreadsService} from "../service/threads.service";
import {ChatExampleData, initialMessages} from "../data/chat-example-data";
import {ChatMessagesService} from "../service/chat-messages.service";
import {UsersService} from "../service/users.service";
import {ChatMessage} from "../model/chat-message.model";
import {Thread} from "../model/thread.model";

@Component({
    selector: 'chat-threads',
    templateUrl: './chat-threads.component.html',
    styleUrls: ['./chat-threads.component.css'],
    standalone: false
})
export class ChatThreadsComponent implements OnInit {
  threads: Observable<any>;
  message: ChatMessage;

  constructor(public chatMessageService: ChatMessagesService,
              public threadsService: ThreadsService,
              public usersService: UsersService) {
    this.threads = threadsService.orderedThreads;
    chatMessageService.chatMessages.subscribe( (mesgs: ChatMessage[]) => {
      this.message = mesgs[mesgs.length-3];
    });
    ChatExampleData.init(chatMessageService, threadsService, usersService);
  }

  ngOnInit() {
  }

}
