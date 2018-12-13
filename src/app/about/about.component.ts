import { Component, OnInit } from '@angular/core';
import {MessageService} from "./message.service";
import {Message} from "../model/message.model";
import {Subscription, Observable, from} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {mergeMap} from "rxjs/internal/operators";
import {GithubUser} from "../model/github-user.model";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  messageStream: Subscription;
  message: Message;
  index: number = 0;
  githubUsers: GithubUser[] = new Array<GithubUser>();

  requestStream: Observable<any> = from(["https://api.github.com/users"]);

  responseStream = this.requestStream
    .pipe(
      mergeMap( requestUrl => {
        return this.http.get(requestUrl.toString());
      })
    );

  constructor(private messageService: MessageService, private http: HttpClient) {
    this.messageStream = this.messageService.getCurrentMessage()
      .subscribe(
        response => {
          console.log("onNext");
          this.message = response },
        () => { console.log("onError") },
        () => { console.log("onComplete") }
        );

    this.responseStream.subscribe(
      (response : any) => {
        this.githubUsers = response;
      }
    )
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
