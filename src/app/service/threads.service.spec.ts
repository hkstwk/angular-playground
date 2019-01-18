import {TestBed} from '@angular/core/testing';

import {ThreadsService} from './threads.service';
import {async} from "@angular/core/testing";
import {User} from "../model/user.model";
import {Thread} from "../model/thread.model";
import {ChatMessage} from "../model/chat-message.model";
import {ChatMessagesService} from "./chat-messages.service";
import * as _ from 'lodash';

describe('ThreadsService', () => {

  let service = ThreadsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ThreadsService
      ],
    });

    service = TestBed.get(ThreadsService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should collect the Threads from Messages', () => {
    const nate: User = new User('Nate Murray', '');
    const felipe: User = new User('Felipe Coury', '');

    const t1: Thread = new Thread('t1', 'Thread 1', '');
    const t2: Thread = new Thread('t2', 'Thread 2', '');

    const m1: ChatMessage = new ChatMessage({
      author: nate,
      text: 'Hi!',
      thread: t1
    });
    const m2: ChatMessage = new ChatMessage({
      author: felipe,
      text: 'Where did you get that hat?',
      thread: t1
    });
    const m3: ChatMessage = new ChatMessage({
      author: nate,
      text: 'Did you bring the briefcase?',
      thread: t2
    });

    const chatMessagesService: ChatMessagesService = new ChatMessagesService();
    const threadsService: ThreadsService = new ThreadsService(chatMessagesService);

    threadsService.threads
      .subscribe((threadIdx: {[key: string]: Thread}) => {
        const threads: Thread[] = _.values(threadIdx);
        const threadNames: string = _.map(threads, (t: Thread) => t.name)
          .join(', ');
        console.log(`=> threads (${threads.length}): ${threadNames} `);
      });

    chatMessagesService.addMessage(m1);
    chatMessagesService.addMessage(m2);
    chatMessagesService.addMessage(m3);

    // => threads (1): Thread 1
    // => threads (1): Thread 1
  });
});
