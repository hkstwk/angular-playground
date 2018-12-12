import { Component, OnInit } from '@angular/core';
import {MessageService} from "./message.service";
import {Message} from "../model/message.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  messageStream: Subscription;
  message: Message;
  index: number = 0;

  constructor(private messageService: MessageService) {
    this.messageStream = this.messageService.getCurrentMessage()
      .subscribe(counter => {
        this.message = counter
       });
  }

  ngOnInit() { }

  add() {
    this.index += 1;
    this.messageService.setCurrentMessage(new Message(this.index));
  }

  substract() {
    this.index -= 1;
    this.messageService.setCurrentMessage(new Message(this.index));
  }

  clear() {
    this.index = 0;
    this.messageService.clearCurrentMessage();
  }
}
