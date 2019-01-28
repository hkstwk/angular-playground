import { AppPage } from './app.po';
import { ChatAppPage } from './chat-app.po';

describe('workspace-project App', () => {
  let page: AppPage;
  let chatApp: ChatAppPage;

  beforeEach(() => {
    page = new AppPage();
    chatApp = new ChatAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ng-book-2 on Angular 7');
  });

  it('should display chat-app message', () => {
    chatApp.navigateTo();
    chatApp.sendChatMessage();
    expect(chatApp.getChatMessageText()).toEqual('my message sent using protractor');
  });
});
