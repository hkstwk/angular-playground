import { Component, OnInit } from '@angular/core';
import {MessageService} from "./message.service";
import {Message} from "../model/message.model";
import {Subscription, Observable, from} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  messageStream: Subscription;
  message: Message;
  index: number = 0;

  requestStream: Observable<any> = from(["https://api.github.com/users"]);
  responseMetastream = this.requestStream
    .pipe(
      map( (response: string ) => {return response.toUpperCase(); }
    ));

  constructor(private messageService: MessageService) {
    this.messageStream = this.messageService.getCurrentMessage()
      .subscribe(
        counter => {
          console.log("onNext");
          this.message = counter },
        () => { console.log("onError") },
        () => { console.log("onComplete") }
        );
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
