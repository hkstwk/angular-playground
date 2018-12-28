import {Component, OnInit, ViewChild, AfterViewInit} from "@angular/core";
import {MessageService} from "./message.service";
import {Message} from "../model/message.model";
import {Subscription, fromEvent, merge, interval, combineLatest} from "rxjs";
import {map, mergeMap, debounceTime, buffer, filter, startWith, take} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {GithubUser} from "../model/github-user.model";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {

  @ViewChild('btn') btn;
  @ViewChild('refreshButton') refreshButton;
  @ViewChild('closeButton1') closeButton1;
  @ViewChild('closeButton2') closeButton2;
  @ViewChild('closeButton3') closeButton3;

  rxCloseButton1: any;
  closeClick1$: any;

  doubleClickMessage: string;
  noDoubleClickMessage: string;

  messageStream: Subscription;
  message: Message;
  index: number = 0;

  githubUsers: GithubUser[];// = new Array<GithubUser>();
  userSuggestion1: GithubUser;
  userSuggestion2: GithubUser;
  userSuggestion3: GithubUser;

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

    /** refreshing the list of GitHub users to follow
     * creating a refreshClickStream on the button click (resulting in MouseEvents)
     * and a "null" stream on every click (used to nullify the output
     * and thus hide the suggestion element).
     */
    const rxRefreshButton = this.refreshButton.nativeElement;
    const refreshClick$ = fromEvent(rxRefreshButton, 'click');
    const refreshClickNull$ = refreshClick$.pipe(map( () => { return null; } ));


    /** request stream, initially "faking" startup click,
     * and from then on reacting on every refresh click by returning
     * a users-URL from a random starting point (".../users?=since=...")
     */
    const request$ = refreshClick$.pipe(
      startWith('startup click'),
      map( () => {
        let randomOffset = Math.floor(Math.random()*5000);
        return 'https://api.github.com/users?since=' + randomOffset;
      }));

    /** response stream, using URL of returned by the request stream to
     * call Github API. mergeMap is used to flatten out the JSON that
     * is returned by HttpClient in yet another Observable.
     */
    const response$ = request$.pipe(
      mergeMap( requestUrl => {
        return this.http.get(requestUrl.toString());
      }));

    // const helper$ = this.closeClick1$.pipe(
    //   combineLatest(response$,
    //     (click, listUsers) => {
    //       return listUsers[Math.floor(Math.random()*listUsers.length)];
    //    })
    //   );

    /**
     * Suggestion1 Stream is for first GitHub user to display.
     * Using some Math functions we randomly select a GitHub user
     * from the response stream. Then merge with the null stream
     * to stop rendering first user later on.
     */
    const suggestion1$ = merge(
      // first part to merge
      response$.pipe(
        map((listUsers: GithubUser[]) => {
          // get one random user from the list
          return listUsers[Math.floor(Math.random()*listUsers.length)];
        })
      ),
      // second part to merge
      refreshClickNull$)
      // initial null so that nothing is rendered until we have a user to display
      .pipe(startWith(null));

    /** render suggestion1
     *  when null nothing will be displayed. When user is returned it will be displayed
     *  (handled using *ngIf in HTML)
     */
    suggestion1$.subscribe((user: GithubUser) => {
      this.closeClick1$ = null;
      console.log(user);
      this.userSuggestion1 = user;
      setTimeout(() => {
        if (!this.closeClick1$) {
          this.rxCloseButton1 = this.closeButton1.nativeElement;
          this.closeClick1$ = fromEvent(this.rxCloseButton1, 'click');
          this.closeClick1$.subscribe(
             (resp) => { console.log(resp); }
           );
        }
      }
      , 1000);
    });

    const source1$ = interval(100).pipe(
      map(function (i) { return 'First: ' + i; })
    );

    const source2$ = interval(151).pipe(
      map(function (i) { return 'Second: ' + i; })
    );

    const source$ = combineLatest(
      source1$,
      source2$,
      (s1, s2) => { return s1 + '; ' + s2 }
    ).pipe(
      take(10));

    source$.subscribe(
      function (x) {
        console.log('Next: %s', x);
      },
      function (err) {
        console.log('Error: %s', err);
      },
      function () {
        console.log('Completed');
      });

    const rxCloseButton2 = this.closeButton2.nativeElement;
    const closeClick2$ = fromEvent(rxCloseButton2, 'click');

    /**
     * Suggestion2 Stream is for first GitHub user to display.
     * Using some Math functions we randomly select a GitHub user
     * from the response stream. Then merge with the null stream
     * to stop rendering first user later on.
     */
    const suggestion2$temp = combineLatest(
      // first part to merge
      closeClick2$,
      response$,
      (click, listUsers: GithubUser[]) => {
          // get one random user from the list
          return listUsers[Math.floor(Math.random()*listUsers.length)];
        })
    // initial null so that nothing is rendered until we have a user to display

    const suggestion2$ = merge(
      suggestion2$temp,
      refreshClick$.pipe(map(function(){ return null; }),
        startWith(null))
      )

    /**
     * Suggestion2 Stream is for first GitHub user to display.
     * Using some Math functions we randomly select a GitHub user
     * from the response stream. Then merge with the null stream
     * to stop rendering first user later on.
     */
    const suggestion2a$ = merge(
      // first part to merge
      response$.pipe(
        map((listUsers: GithubUser[]) => {
          // get one random user from the list
          return listUsers[Math.floor(Math.random()*listUsers.length)];
        })
      ),
      // second part to merge
      refreshClickNull$)
    // initial null so that nothing is rendered until we have a user to display
      .pipe(startWith(null));

    /** render suggestion2
     *  when null nothing will be displayed. When user is returned it will be displayed
     *  (handled using *ngIf in HTML)
     */
    suggestion2$.subscribe((user: GithubUser) => {
      console.log(user);
      this.userSuggestion2 = user;
    });

    /**
     * Suggestion3 Stream is for first GitHub user to display.
     * Using some Math functions we randomly select a GitHub user
     * from the response stream. Then merge with the null stream
     * to stop rendering first user later on.
     */
    const suggestion3$ = merge(
        // first part to merge
        response$.pipe(
          map((listUsers: GithubUser[]) => {
            // get one random user from the list
            return listUsers[Math.floor(Math.random()*listUsers.length)];
          })
        ),
        // second part to merge
        refreshClickNull$)
      // initial null so that nothing is rendered until we have a user to display
        .pipe(startWith(null));

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
        this.noDoubleClickMessage="";
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
        this.doubleClickMessage="";
      }
    );

  };

  ngAfterViewInit() {

    /** Close 1 close this user and replace by new one
     *  close this user and replace by new one from latest response stream.
     *  it will only pick from latest response stream using that one as cache
     */
    setTimeout(() => {
      // this.rxCloseButton1 = this.closeButton1.nativeElement;
      // const closeClick1$ = fromEvent(this.rxCloseButton1, 'click');
      // closeClick1$.subscribe(
      //   (resp) => { console.log(resp); }
      // );
    }, 1000);

    /** Close 2 close this user and replace by new one
     *  close this user and replace by new one from latest response stream.
     *  it will only pick from latest response stream using that one as cache
     */
    setTimeout(() => {
      const rxCloseButton2 = this.closeButton2.nativeElement;
      const closeClick2$ = fromEvent(rxCloseButton2, 'click');
      closeClick2$.subscribe(
        (resp) => { console.log(resp); }
      );
    }, 1000);

    /** Close 3 close this user and replace by new one
     *  close this user and replace by new one from latest response stream.
     *  it will only pick from latest response stream using that one as cache
     */
    setTimeout(() => {
      const rxCloseButton3 = this.closeButton3.nativeElement;
      const closeClick3$ = fromEvent(rxCloseButton3, 'click');
      closeClick3$.subscribe(
        (resp) => { console.log(resp); }
      );
    }, 1000);
  }

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
    this.doubleClickMessage="";
    this.noDoubleClickMessage="";
    this.messageService.clearCurrentMessage();
  };

}
