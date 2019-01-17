import {ChatMessagesService} from "./chat-messages.service";
import {User} from "../model/user.model";
import {Thread} from "../model/thread.model";
import {ChatMessage} from "../model/chat-message.model";
import {TestBed, async} from "@angular/core/testing";

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
  author: user2,
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

  it('should show correct number of messages', () => {

    let numberOfMessages : number = 0;

    // listen to the stream of most current chatMessages
    service.chatMessages
      .subscribe((chatMessages: ChatMessage[]) => {
        numberOfMessages = chatMessages.length;
      });

    service.addMessage(m1);
    service.addMessage(m2);
    service.addMessage(m3);

    expect(numberOfMessages).toBe(3);

    service.addMessage(m4);
    service.addMessage(m5);
    service.addMessage(m6);
    service.addMessage(m1);
    service.addMessage(m2);
    service.addMessage(m3);

    expect(numberOfMessages).toBe(9);

  });

  it('should add the third test message', () => {

    let chatMessage : ChatMessage = null;

    // listen to each message indivdually as it comes in
    service.newChatMessages
      .subscribe((_chatMessage: ChatMessage) => {
        chatMessage = _chatMessage;
      });

    service.addMessage(m3);

    expect(chatMessage.author.name).toBe('Bea');
    expect(chatMessage.thread.name).toBe('Thread Harm');
    expect(chatMessage.text).toContain('=> 3');
  });

  it('should show all but a users own messages of a thread', () => {

    let chatMessage : ChatMessage = null;

    // listen to the stream of chatMessages for thread user1 (not including his own messages)
    service.chatMessagesForThreadUser(thread1, user1)
      .subscribe((_chatMessage: ChatMessage) => {
        chatMessage = _chatMessage;
      });

    // message 1 comes from from user2, should display '=> 1'
    service.addMessage(m1);
    expect(chatMessage.text).toContain('=> 1');

    // message 2 comes from user1, should not display '=>2' because this message is not pushed to this stream.
    service.addMessage(m2);
    expect(chatMessage.text).not.toContain('=> 2');

    // message 3 comes from from user2 again , should display '=>3'
    service.addMessage(m3);
    expect(chatMessage.text).toContain('=> 3');

    // message 4 and 5 come from from user1 again , should not display '=> 4' and '=> 5'
    // because these messages were not pushed to this stream.
    service.addMessage(m4);
    expect(chatMessage.text).not.toContain('=> 4');
    service.addMessage(m5);
    expect(chatMessage.text).not.toContain('=> 5');

    // message 6 comes from from user2 again , should display '=> 6'
    service.addMessage(m6);
    expect(chatMessage.text).toContain('=> 6');
  });

});
