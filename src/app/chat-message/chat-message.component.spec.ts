import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ChatMessageComponent} from "./chat-message.component";
import {ChatMessagesService, messagesServiceInjectables} from "../service/chat-messages.service";
import {ThreadsService, threadsServiceInjectables} from "../service/threads.service";
import {UsersService} from "../service/users.service";
import {m2, felipe} from "../model/chat-message.data";

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatMessageComponent,
      ],
      providers: [
        ChatMessagesService,
        ThreadsService,
        UsersService,
        threadsServiceInjectables,
        messagesServiceInjectables
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    component.message = m2;
    component.currentUser = felipe;
    component.incoming = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
