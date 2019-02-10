import {Component, OnInit, Input} from "@angular/core";
import {ChatMessage} from "../model/chat-message.model";
import {User} from "../model/user.model";
import {UsersService} from "../service/users.service";
import * as moment from 'moment';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: ChatMessage;
  currentUser: User;
  incoming: boolean;
  ago: any;

    constructor(public usersService: UsersService) {
    }

  ngOnInit() : void {
    this.usersService.currentUser
      .subscribe((user: User) => {
        this.currentUser = user;
        if (this.message.author && user) {
          this.incoming = this.message.author.id !== user.id;
        }
      });
    this.ago = moment(this.message.sentAt).fromNow();
  }

}
