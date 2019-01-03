
import { ChatMessagesService } from './chat-messages.service';
import {User} from "../model/user.model";
import {Thread} from "../model/thread.model";
import {ChatMessage} from "../model/chat-message.model";
import {describe, expect} from "@angular/core/testing/src/testing_internal";
import {TestBed} from "@angular/core/testing";
import {async} from "@angular/core/testing";

describe('ChatMessagesService',() => {

  let chatMessagesService: ChatMessagesService; // Add this

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ChatMessagesService]
    });

    chatMessagesService = TestBed.get(ChatMessagesService); // Add this
  }));

  it('should be created', async(() => { // Remove inject()
    expect(this.chatMessagesService).toBeTruthy();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(ChatMessagesService);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should test', async(() => {

    const user: User = new User('Harm', '');
    const thread: Thread = new Thread('t1', 'Harm', '');

    const m1: ChatMessage = new ChatMessage({
      author: user,
      text: 'Hi!',
      thread: thread
    });

    const m2: ChatMessage = new ChatMessage({
      author: user,
      text: 'Bye!',
      thread: thread
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

    chatMessagesService.addMessage(m1);
    chatMessagesService.addMessage(m2);

  }));
});
