import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MessageService} from "./message.service";
import {Message} from "../model/message.model";
import {Subscription, Observable, from, fromEvent, merge, range, OperatorFunction} from "rxjs";
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
  noDoubleClickMessage: string;

  messageStream: Subscription;
  message: Message;
  index: number = 0;

  githubUsers: GithubUser[] = new Array<GithubUser>();
  userSuggestion1: GithubUser = new GithubUser();
  userSuggestion2: GithubUser = new GithubUser();
  userSuggestion3: GithubUser = new GithubUser();

  constructor(private messageService: MessageService, private http: HttpClient) {
    this.messageStream = this.messageService.getCurrentMessage()
      .subscribe(
        response => {
          console.log("onNext");
          this.message = response },
        () => { console.log("onError") },
        () => { console.log("onComplete") }
        );
  }

  ngOnInit() {
    const rxRefreshBtn = this.refreshBtn.nativeElement;
    const refreshClick$ = fromEvent(rxRefreshBtn, 'click');
    const refreshClickClear$ = refreshClick$.pipe(
      map( (resp: Observable<any>) => {
        return "hallo" }));
    const request$ = refreshClick$.pipe(
      startWith('startup click'),
      map( () => {
        let randomOffset = Math.floor(Math.random()*500);
        return 'https://api.github.com/users?since=' + randomOffset;
      }));

    const response$ = request$.pipe(
      mergeMap( requestUrl => {
        return this.http.get(requestUrl.toString());
      }));

    response$.subscribe((resp: GithubUser[]) => {
        this.githubUsers = resp;
      });

    const suggestion1$ = response$.pipe(
      map((listUsers: GithubUser[]) => {
        // get one random user from the list
        return listUsers[Math.floor(Math.random()*listUsers.length)];
      }));
    suggestion1$.subscribe((user: GithubUser) => {
      console.log(user);
      this.userSuggestion1 = user;
    });

    const suggestion2$ = response$.pipe(
      // startWith(''),
      map((listUsers: GithubUser[]) => {
        // get one random user from the list
        return listUsers[Math.floor(Math.random()*listUsers.length)];
      }));

    suggestion2$.subscribe((user: GithubUser) => {
      console.log(user);
      this.userSuggestion2 = user;
    });

    const suggestion3$ = response$.pipe(
      startWith(''),
      map((listUsers: GithubUser[]) => {
        // get one random user from the list
        return listUsers[Math.floor(Math.random()*listUsers.length)];
      }));

    suggestion3$.subscribe((user: GithubUser) => {
      console.log(user);
      this.userSuggestion3 = user;
    });

    const toLength = a => a.length;
    const rxBtn = this.btn.nativeElement;                           // get the button element
    const click$ = fromEvent(rxBtn, 'click');                       // listen for clicks
    const debounced$ = click$.pipe(debounceTime(250));              // listen for 250 ms then emit click
    const buffered$ = click$.pipe(buffer(debounced$));              // collect all clicks till debounce
    const clickCount$ = buffered$.pipe(map(toLength));              // map buffered$ to #clicks
    const doubleClick$ = clickCount$.pipe(filter(x => x === 2));    // only double clicks
    const notDoubleClick$ = clickCount$.pipe(filter(x => x !== 2)); // only the not double clicks

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
    this.noDoubleClickMessage="";
    this.messageService.clearCurrentMessage();
  }

}
