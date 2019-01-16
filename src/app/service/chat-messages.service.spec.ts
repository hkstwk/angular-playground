import {ChatMessagesService} from './chat-messages.service';
import {User} from "../model/user.model";
import {Thread} from "../model/thread.model";
import {ChatMessage} from "../model/chat-message.model";
import {TestBed} from "@angular/core/testing";
import {Observable} from "rxjs";
import {async} from "@angular/core/testing";

export const user1: User = new User('Harm', '');
export const user2: User = new User('Bea', '');
export const thread1: Thread = new Thread('t1', 'Thread Harm', '');


export const m1: ChatMessage = new ChatMessage({
  author: user2,
  text: ` => 1  Hi! this is a message from ${user2.name} on ${thread1.name}`,
  thread: thread1
});

export const m2: ChatMessage = new ChatMessage({
  author: user1,
  text: ` => 2  Bye! from ${user1.name} on ${thread1.name}`,
  thread: thread1
});

export const m3: ChatMessage = new ChatMessage({
  author: user2,
  text: `=> 3  Hi! this is a message from ${user2.name} on ${thread1.name}`,
  thread: thread1
});

export const m4: ChatMessage = new ChatMessage({
  author: user1,
  text: `=> 4  Bye! from ${user1.name} on ${thread1.name}`,
  thread: thread1
});


export const m5: ChatMessage = new ChatMessage({
  author: user1,
  text: `=> 5  Hi! this is a message from ${user1.name} on ${thread1.name}`,
  thread: thread1
});

export const m6: ChatMessage = new ChatMessage({
  author: user1,
  text: `=> 6  Bye! from ${user1.name} on ${thread1.name}`,
  thread: thread1
});



describe('ChatMessagesService', () => {

  let service: ChatMessagesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatMessagesService
        ],
    });

    service = TestBed.get(ChatMessagesService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should test', () => {
    // listen to each message indivdually as it comes in
    service.newChatMessages
      .subscribe((chatMessage: ChatMessage) => {
        console.log('=> newMessages: ' + chatMessage.text);
      });

    // listen to the stream of most current chatMessages
    service.chatMessages
      .subscribe((chatMessages: ChatMessage[]) => {
        console.log('=> chatMessages: ' + chatMessages.length);
      });

    // listen to the stream of chatMessages for thread user
    service.chatMessagesForThreadUser(thread1, user1)
      .subscribe((chatMessage: ChatMessage) => {
        console.log('=> chatMessagesForThreadUser: ' + chatMessage.text);
      });

    service.addMessage(m1);
    service.addMessage(m2);
    service.addMessage(m3);
    service.addMessage(m4);
    service.addMessage(m5);
    service.addMessage(m6);

  });

  it('should show correct number of messages', () => {

    let numberOfMessages : number;

    // listen to the stream of most current chatMessages
    service.chatMessages
      .subscribe((chatMessages: ChatMessage[]) => {
        numberOfMessages = chatMessages.length;
      });

    service.addMessage(m1);
    service.addMessage(m2);
    service.addMessage(m3);

    expect(numberOfMessages).toBe(3);
  });
});
