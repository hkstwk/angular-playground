import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ThreadsService} from "../service/threads.service";
import {ChatExampleData} from "../data/chat-example-data";
import {ChatMessagesService} from "../service/chat-messages.service";
import {UsersService} from "../service/users.service";

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {
  threads: Observable<any>;

  constructor(public chatMessageService: ChatMessagesService,
              public threadsService: ThreadsService,
              public usersService: UsersService) {
    this.threads = threadsService.orderedThreads;
    ChatExampleData.init(chatMessageService, threadsService, usersService);
  }

  ngOnInit() {
  }

}
