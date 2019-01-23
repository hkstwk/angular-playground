import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatThreadsComponent } from './chat-threads.component';
import {ChatThreadComponent} from "../chat-thread/chat-thread.component";
import {ChatMessagesService, messagesServiceInjectables} from "../service/chat-messages.service";
import {ThreadsService, threadsServiceInjectables} from "../service/threads.service";
import {UsersService} from "../service/users.service";

describe('ChatThreadsComponent', () => {
  let component: ChatThreadsComponent;
  let fixture: ComponentFixture<ChatThreadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatThreadsComponent,
        ChatThreadComponent,
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
