
import { ChatMessagesService } from './chat-messages.service';
import {User} from "../model/user.model";
import {Thread} from "../model/thread.model";
import {ChatMessage} from "../model/chat-message.model";
import {TestBed} from "@angular/core/testing";
import {Observable} from "rxjs";

describe('ChatMessagesService',() => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatMessagesService = TestBed.get(ChatMessagesService);
    expect(service).toBeTruthy();
  });


  it('should test', () => {

    const user1: User = new User('Harm', '');
    const user2: User = new User('Bea', '');
    const thread1: Thread = new Thread('t1', 'Thread Harm', '');


    const m1: ChatMessage = new ChatMessage({
      author: user2,
      text: ` => 1  Hi! this is a message from ${user2.name} on ${thread1.name}`,
      thread: thread1
    });

    const m2: ChatMessage = new ChatMessage({
      author: user1,
      text: ` => 2  Bye! from ${user1.name} on ${thread1.name}`,
      thread: thread1
    });

    const m3: ChatMessage = new ChatMessage({
      author: user2,
      text: `=> 3  Hi! this is a message from ${user2.name} on ${thread1.name}`,
      thread: thread1
    });

    const m4: ChatMessage = new ChatMessage({
      author: user1,
      text: `=> 4  Bye! from ${user1.name} on ${thread1.name}`,
      thread: thread1
    });


    const m5: ChatMessage = new ChatMessage({
      author: user1,
      text: `=> 5  Hi! this is a message from ${user1.name} on ${thread1.name}`,
      thread: thread1
    });

    const m6: ChatMessage = new ChatMessage({
      author: user1,
      text: `=> 6  Bye! from ${user1.name} on ${thread1.name}`,
      thread: thread1
    });

    const chatMessagesService: ChatMessagesService = new ChatMessagesService();

    // listen to each message indivdually as it comes in
    chatMessagesService.newChatMessages
      .subscribe( (chatMessage: ChatMessage) => {
        console.log('=> newMessages: ' + chatMessage.text);
      });

    // listen to the stream of most current chatMessages
    chatMessagesService.chatMessages
      .subscribe( (chatMessages: ChatMessage[]) => {
        console.log('=> chatMessages: ' + chatMessages.length);
      });

    // listen to the stream of chatMessages for thread user
    chatMessagesService.chatMessagesForThreadUser(thread1, user1)
        .subscribe( (chatMessage: ChatMessage) => {
          console.log('=> chatMessagesForThreadUser: ' + chatMessage.text);
        });

    chatMessagesService.addMessage(m1);
    chatMessagesService.addMessage(m2);
    chatMessagesService.addMessage(m3);
    chatMessagesService.addMessage(m4);
    chatMessagesService.addMessage(m5);
    chatMessagesService.addMessage(m6);

  });
});
