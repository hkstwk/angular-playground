import {Component, OnInit, ViewChild} from "@angular/core";
import {MessageService} from "./message.service";
import {Message} from "../model/message.model";
import {Subscription, fromEvent, merge, combineLatest} from "rxjs";
import {map, mergeMap, debounceTime, buffer, filter, startWith} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import {GithubUser} from "../model/github-user.model";
import {publishReplay, refCount} from "rxjs/internal/operators";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
})
export class AboutComponent implements OnInit {

    @ViewChild('btn', { static: true }) btn;
    @ViewChild('refreshButton', { static: true }) refreshButton;
    @ViewChild('closeButton1', { static: true }) closeButton1;
    @ViewChild('closeButton2', { static: true }) closeButton2;
    @ViewChild('closeButton3', { static: true }) closeButton3;

    doubleClickMessage: string;
    noDoubleClickMessage: string;

    messageStream: Subscription;
    message: Message;
    index: number = 0;

    githubUsers: GithubUser[];
    userSuggestion1: GithubUser;
    userSuggestion2: GithubUser;
    userSuggestion3: GithubUser;

    constructor(private messageService: MessageService, private http: HttpClient) {
        this.messageStream = this.messageService.getCurrentMessage()
            .subscribe(
                response => {
                    console.log("onNext");
                    this.message = response
                },
                () => {
                    console.log("onError")
                },
                () => {
                    console.log("onComplete")
                }
            );
    }

    ngOnInit() {

        /** refreshing the list of GitHub users to follow
         * creating a refreshClickStream on the button click (resulting in MouseEvents)
         * and a "null" stream on every click (used to nullify the output
         * and thus hide the suggestion element).
         */
        const rxRefreshButton = this.refreshButton.nativeElement;
        const refreshClick$ = fromEvent(rxRefreshButton, 'click');


        /** request stream, initially "faking" startup click,
         * and from then on reacting on every refresh click by returning
         * a users-URL from a random starting point (".../users?=since=...")
         */
        const request$ = refreshClick$.pipe(
            startWith('startup click'),
            map(() => {
                let randomOffset = Math.floor(Math.random() * 5000);
                return 'https://api.github.com/users?since=' + randomOffset;
            }));

        /** response stream, using URL returned by the request stream to
         * call Github API. mergeMap is used to flatten out the JSON that
         * is returned by HttpClient in yet another Observable.
         */
        const response$ = request$.pipe(
            mergeMap(requestUrl => {
                let resp = this.http.get(requestUrl.toString());
                resp.subscribe((resp) => console.log(resp));
                return resp;
            }),
            publishReplay(1),
            refCount());

        /**
         * Suggestion1 Stream is for first GitHub user to display.
         * Using some Math functions we randomly select a GitHub user
         * from the already available response stream.
         */
        const rxCloseButton1 = this.closeButton1.nativeElement;
        const closeClick1$ = fromEvent(rxCloseButton1, 'click').pipe(startWith(null));
        const suggestion1$ = merge(
            combineLatest(
                closeClick1$,
                response$,
                (click, listUsers: GithubUser[]) => {
                    // get one random user from the list
                    return listUsers[Math.floor(Math.random() * listUsers.length)];
                })
            , refreshClick$.pipe(map(function () {
                return null;
            }))
        );

        /** render suggestion1
         *  when null nothing will be displayed. When user is returned it will be displayed
         *  (handled using *ngIf in HTML)
         */
        suggestion1$.subscribe((user: GithubUser) => {
            console.log(user);
            this.userSuggestion1 = user;
        });

        /**
         * Suggestion2 Stream is for second GitHub user to display.
         * Using some Math functions we randomly select a GitHub user
         * from the already available response stream.
         */
        const rxCloseButton2 = this.closeButton2.nativeElement;
        const closeClick2$ = fromEvent(rxCloseButton2, 'click').pipe(startWith(null));
        const suggestion2$ = merge(
            combineLatest(
                closeClick2$,
                response$,
                (click, listUsers: GithubUser[]) => {
                    // get one random user from the list
                    return listUsers[Math.floor(Math.random() * listUsers.length)];
                }),
            refreshClick$.pipe(map(function () {
                    return null;
                })
            ));

        /** render suggestion2
         *  when null nothing will be displayed. When user is returned it will be displayed
         *  (handled using *ngIf in HTML)
         */
        suggestion2$.subscribe((user: GithubUser) => {
            console.log(user);
            this.userSuggestion2 = user;
        });

        /**
         * Suggestion2 Stream is for third GitHub user to display.
         * Using some Math functions we randomly select a GitHub user
         * from the already available response stream.
         */
        const rxCloseButton3 = this.closeButton3.nativeElement;
        const closeClick3$ = fromEvent(rxCloseButton3, 'click').pipe(startWith(null));
        const suggestion3$ = merge(
            combineLatest(
                closeClick3$,
                response$,
                (click, listUsers: GithubUser[]) => {
                    // get one random user from the list
                    return listUsers[Math.floor(Math.random() * listUsers.length)];
                }),
            refreshClick$.pipe(map(function () {
                    return null;
                })
            ));

        /** render suggestion3
         *  when null nothing will be displayed. When user is returned it will be displayed
         *  (handled using *ngIf in HTML)
         */
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
                this.noDoubleClickMessage = "";
            }
        );

        clickCount$.subscribe(
            (response) => {
                console.log(response);
            }
        );

        notDoubleClick$.subscribe(
            () => {
                this.noDoubleClickMessage = "Not a double click";
                this.doubleClickMessage = "";
            }
        );

    };

    add() {
        this.index += 1;
        this.messageService.setCurrentMessage(new Message(this.index));
    };

    substract() {
        this.index -= 1;
        this.messageService.setCurrentMessage(new Message(this.index));
    };

    clear() {
        this.index = 0;
        this.doubleClickMessage = "";
        this.noDoubleClickMessage = "";
        this.messageService.clearCurrentMessage();
    };

}
