
import { ChatMessagesService } from './chat-messages.service';
import {User} from "../model/user.model";
import {Thread} from "../model/thread.model";
import {ChatMessage} from "../model/chat-message.model";
import {TestBed} from "@angular/core/testing";

describe('ChatMessagesService',() => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatMessagesService = TestBed.get(ChatMessagesService);
    expect(service).toBeTruthy();
  });


  it('should test', () => {

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

  });
});
