import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ChatThreadsComponent} from './chat-threads.component';
import {ChatThreadComponent} from '../chat-thread/chat-thread.component';
import {ChatMessagesService, messagesServiceInjectables} from '../service/chat-messages.service';
import {ThreadsService, threadsServiceInjectables} from '../service/threads.service';
import {UsersService} from '../service/users.service';
import {ChatMessageComponent} from '../chat-message/chat-message.component';

describe('ChatThreadsComponent', () => {
  let component: ChatThreadsComponent;
  let fixture: ComponentFixture<ChatThreadsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatThreadsComponent,
        ChatThreadComponent,
        ChatMessageComponent
      ],
      providers: [
        UsersService,
        ThreadsService,
        ChatMessagesService,
        threadsServiceInjectables,
        messagesServiceInjectables
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ', () => {
    expect(component).toBeTruthy();
  });
});
