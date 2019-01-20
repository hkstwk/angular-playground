import {TestBed, async} from "@angular/core/testing";
import {ThreadsService} from "./threads.service";
import {Thread} from "../model/thread.model";
import {ChatMessagesService} from "./chat-messages.service";
import * as _ from "lodash";
import {m6, m1, m2, m3, m4, m5} from "../model/chat-message.data";

describe('ThreadsService', () => {

  let service = ThreadsService;
  let chatMessagesService: ChatMessagesService;
  let threadsService: ThreadsService;
  let threads: Thread[];
  let threadNames: string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ThreadsService
      ],
    });

    service = TestBed.get(ThreadsService);
  }));

  beforeEach(() => {
    chatMessagesService = new ChatMessagesService();
    threadsService = new ThreadsService(chatMessagesService);

    threadsService.threads
      .subscribe((threadIdx: {[key: string]: Thread}) => {
        threads = _.values(threadIdx);
        threadNames = _.map(threads, (t: Thread) => t.name)
          .join(', ');
        console.log(`=> threads (${threads.length}): ${threadNames} `);
      });
  });

  afterEach(() => {
    chatMessagesService = null;
    threadsService = null;
    threads = null;
    threadNames = null;
  });

  it('should be created', () => {

    expect(service).toBeTruthy();

  });

  it('should collect one thread with two messages, with latest message being \'m2\'', () => {

    chatMessagesService.addMessage(m1);
    expect(threads.length).toBe(1);

    chatMessagesService.addMessage(m2);
    expect(threads.length).toBe(1);
    expect(threads[0].lastMessage.text).toBe('Where did you get that hat?');

  });


  it('should collect one thread with name \'Thread 1\'', () => {

    chatMessagesService.addMessage(m1);
    expect(threads[0].name).toBe('Thread 1');

  });

  it('should collect three Threads', () => {

    chatMessagesService.addMessage(m1);
    chatMessagesService.addMessage(m2);
    chatMessagesService.addMessage(m3);
    chatMessagesService.addMessage(m4);
    chatMessagesService.addMessage(m5);
    chatMessagesService.addMessage(m6);

    expect(threads.length).toBe(3);

  });
});
