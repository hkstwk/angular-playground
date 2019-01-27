import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ChatThreadComponent} from "./chat-thread.component";
import {Thread} from "../model/thread.model";
import {ThreadsService} from "../service/threads.service";
import {t3, m6} from "../model/chat-message.data";

describe('ChatThreadComponent', () => {
  let component: ChatThreadComponent;
  let fixture: ComponentFixture<ChatThreadComponent>;
  let thread: Thread = t3;
  t3.lastMessage = m6;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatThreadComponent
      ],
      providers: [
        ThreadsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatThreadComponent);
    component = fixture.componentInstance;
    component.thread = thread;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
