import {Component, OnInit, Input} from '@angular/core';
import {ChatMessage} from "../model/chat-message.model";
import {User} from "../model/user.model";
import {Thread} from "../model/thread.model";
import {UsersService} from "../service/users.service";
import {ThreadsService} from "../service/threads.service";
import {ChatMessagesService} from "../service/chat-messages.service";
import * as moment from 'moment';
import {ChatExampleData} from "../data/chat-example-data";

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: ChatMessage;
  currentUser: User;
  incoming: boolean;

  constructor(public chatMessageService: ChatMessagesService,
              public threadsService: ThreadsService,
              public usersService: UsersService) {
    ChatExampleData.init(chatMessageService, threadsService, usersService);
  }

  ngOnInit() : void {
    this.usersService.currentUser
      .subscribe((user: User) => {
        this.currentUser = user;
        if (this.message.author && user) {
          this.incoming = this.message.author.id !== user.id;
        }
      });
  }

}
