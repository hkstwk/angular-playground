/* tslint:disable:max-line-length */
import { User } from '../model/user.model';
import { Thread } from '../model/thread.model';
import { ChatMessage } from '../model/chat-message.model';
import { ChatMessagesService } from '../service/chat-messages.service';
import { ThreadsService } from '../service/threads.service';
import { UsersService } from '../service/users.service';
import * as moment from 'moment';

// the person using the app us Juliet
const me: User      = new User('Juliet', 'assets/images/avatars/female-avatar-1.png');
const ladycap: User = new User('Lady Capulet', 'assets/images/avatars/female-avatar-2.png');
const echo: User    = new User('Echo Bot', 'assets/images/avatars/male-avatar-1.png');
const rev: User     = new User('Reverse Bot', 'assets/images/avatars/female-avatar-4.png');
const wait: User    = new User('Waiting Bot', 'assets/images/avatars/male-avatar-2.png');

const tLadycap: Thread = new Thread('tLadycap', ladycap.name, ladycap.avatarSrc);
const tEcho: Thread    = new Thread('tEcho', echo.name, echo.avatarSrc);
const tRev: Thread     = new Thread('tRev', rev.name, rev.avatarSrc);
const tWait: Thread    = new Thread('tWait', wait.name, wait.avatarSrc);

const initialMessages: Array<ChatMessage> = [
  new ChatMessage({
    author: me,
    sentAt: moment().subtract(45, 'minutes').toDate(),
    text: 'Yet let me weep for such a feeling loss.',
    thread: tLadycap
  }),
  new ChatMessage({
    author: ladycap,
    sentAt: moment().subtract(20, 'minutes').toDate(),
    text: 'So shall you feel the loss, but not the friend which you weep for.',
    thread: tLadycap
  }),
  new ChatMessage({
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: `I\'ll echo whatever you send me`,
    thread: tEcho
  }),
  new ChatMessage({
    author: rev,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: `I\'ll reverse whatever you send me`,
    thread: tRev
  }),
  new ChatMessage({
    author: wait,
    sentAt: moment().subtract(4, 'minutes').toDate(),
    text: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
    thread: tWait
  }),
];

export class ChatExampleData {
  static init(messagesService: ChatMessagesService,
              threadsService: ThreadsService,
              UsersService: UsersService): void {

    // TODO make `messages` hot
    messagesService.chatMessages.subscribe(() => ({}));

    // set "Juliet" as the current user
    UsersService.setCurrentUser(me);

    // create the initial messages
    initialMessages.map( (message: ChatMessage) => {
      messagesService.addMessage(message);
    } );

    threadsService.setCurrentThread(tEcho);

    this.setupBots(messagesService);
  }

  static setupBots(messagesService: ChatMessagesService): void {

    // echo bot
    messagesService.chatMessagesForThreadUser(tEcho, echo)
      .forEach( (message: ChatMessage): void => {
        messagesService.addMessage(
          new ChatMessage({
            author: echo,
            text: message.text,
            thread: tEcho
          })
        );
      },
                null);


    // reverse bot
    messagesService.chatMessagesForThreadUser(tRev, rev)
      .forEach( (message: ChatMessage): void => {
        messagesService.addMessage(
          new ChatMessage({
            author: rev,
            text: message.text.split('').reverse().join(''),
            thread: tRev
          })
        );
      },
                null);

    // waiting bot
    messagesService.chatMessagesForThreadUser(tWait, wait)
      .forEach( (message: ChatMessage): void => {

        let waitTime: number = parseInt(message.text, 10);
        let reply: string;

        if (isNaN(waitTime)) {
          waitTime = 0;
          reply = `I didn\'t understand ${message.text}. Try sending me a number`;
        } else {
          reply = `I waited ${waitTime} seconds to send you this.`;
        }

        setTimeout(
          () => {
            messagesService.addMessage(
              new ChatMessage({
                author: wait,
                text: reply,
                thread: tWait
              })
            );
          },
          waitTime * 1000);
      },
                null);


  }
}
