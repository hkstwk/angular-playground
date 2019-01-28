import { browser, by, element } from 'protractor';

export class ChatAppPage {
  navigateTo() {
    return browser.get('/chat');
  }

  sendChatMessage() {
    element(by.className('chat-input')).sendKeys('my message sent using protractor');
    element(by.cssContainingText('button','Send')).click();
  }

  getChatMessageText() {
    return element(by.className('description')).getText();
  }

}
