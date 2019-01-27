import {Thread} from "./thread.model";
import {ChatMessage} from "./chat-message.model";
import {User} from "./user.model";

export const t1: Thread = new Thread('t1', 'Thread 1', 'assets/images/avatars/male-avatar-2.png');
export const t2: Thread = new Thread('t2', 'Thread 2', 'assets/images/avatars/female-avatar-3.png');
export const t3: Thread = new Thread('t3', 'Thread 3', 'assets/images/avatars/female-avatar-1.png');

export const felipe: User = new User('Felipe Coury', 'assets/images/avatars/male-avatar-2.png');
export const nate: User = new User('Nate Murray', 'assets/images/avatars/male-avatar-1.png');

export const m1: ChatMessage = new ChatMessage({
  author: nate,
  text: 'WiFi!',
  sentAt: new Date('Mon Jan 21 2019 20:38:36 GMT+0100'),
  thread: t1
});
export const m2: ChatMessage = new ChatMessage({
  author: felipe,
  text: 'Where did you get that hat?',
  sentAt: new Date('Mon Jan 28 2019 20:38:36 GMT+0100'),
  thread: t1
});
export const m3: ChatMessage = new ChatMessage({
  author: nate,
  text: 'Did you bring the briefcase?',
  sentAt: new Date('Mon Jan 21 2019 20:38:40 GMT+0100'),
  thread: t2
});
export const m4: ChatMessage = new ChatMessage({
  author: felipe,
  text: 'No sorry I forgot the briefcase',
  sentAt: new Date('Mon Jan 21 2019 20:38:37 GMT+0100'),
  thread: t2
});
export const m5: ChatMessage = new ChatMessage({
  author: nate,
  text: 'Oh don\'t worry',
  sentAt: new Date('Tue Jan 22 2019 20:38:37 GMT+0100'),
  thread: t2
});
export const m6: ChatMessage = new ChatMessage({
  author: felipe,
    text: 'Just another messsage on Thread 3...',
  sentAt: new Date('Tue Feb 5 2019 20:38:37 GMT+0100'),
  thread: t3
});
