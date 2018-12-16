import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MessageService} from "./message.service";
import {Message} from "../model/message.model";
import {Subscription, Observable, from, fromEvent, merge} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {mergeMap, debounceTime, buffer, filter, startWith} from "rxjs/operators";
import {GithubUser} from "../model/github-user.model";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @ViewChild('btn') btn : ElementRef<any>;
  @ViewChild('refreshBtn') refreshBtn : ElementRef<any>;

  doubleClickMessage: string;
  doubleClickMessage2: string;
  noDoubleClickMessage: string;

  messageStream: Subscription;
  message: Message;
  index: number = 0;

  githubUsers: GithubUser[] = new Array<GithubUser>();

  requestStream: Observable<any> = from(["https://api.github.com/users"]);

  response: GithubUser[] = new Array<GithubUser>();
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

  ngOnInit() {
    const rxRefreshBtn = this.refreshBtn.nativeElement;
    const refresh$ = fromEvent(rxRefreshBtn, 'click').pipe(
      startWith('startup click'),
      map( (event: any) => {
        let randomOffset = Math.floor(Math.random()*500);
        return 'https://api.github.com/users?since=' + randomOffset;
      }),
      mergeMap( requestUrl => {
        return this.http.get(requestUrl.toString());
      }))
      .subscribe((resp: GithubUser[]) => {
        console.log(resp);
        this.response = resp;
        this.githubUsers = resp;
      });

    const toLength = a => a.length;
    const rxBtn = this.btn.nativeElement;                           // get the button element
    const click$ = fromEvent(rxBtn, 'click');                       // listen for clicks
    const debounced$ = click$.pipe(debounceTime(250));              // listen for 250 ms then emit click
    const buffered$ = click$.pipe(buffer(debounced$));              // collect all clicks till debounce
    const clickCount$ = buffered$.pipe(map(toLength));              // map buffered$ to #clicks
    const doubleClick$ = clickCount$.pipe(filter(x => x === 2));    // only double clicks
    const notDoubleClick$ = clickCount$.pipe(filter(x => x !== 2)); // only the not double clicks

    const doubleClick2$ = click$.pipe(
      buffer(click$.pipe(debounceTime(250))),
      map((a: any) => toLength(a)),
      filter(x => x === 2)
      )
      .subscribe(
        () => {
          this.doubleClickMessage2 = "Double click 2";
          this.noDoubleClickMessage = "";
        }
      )

    doubleClick$.subscribe(
      () => {
        this.doubleClickMessage = "Double click";
        this.noDoubleClickMessage="";
      }
    )

    clickCount$.subscribe(
      (response) => {
        console.log(response);
      }
    )

    notDoubleClick$.subscribe(
      () => {
        this.noDoubleClickMessage = "Not a double click";
        this.doubleClickMessage="";
        this.doubleClickMessage2="";
      }
    )

  }

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
    this.doubleClickMessage="";
    this.doubleClickMessage2="";
    this.noDoubleClickMessage="";
    this.messageService.clearCurrentMessage();
  }

}
