import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ChatWindowComponent} from "./chat-window.component";
import {ChatMessageComponent} from "../chat-message/chat-message.component";
import {messagesServiceInjectables, ChatMessagesService} from "../service/chat-messages.service";
import {threadsServiceInjectables, ThreadsService} from "../service/threads.service";
import {UsersService} from "../service/users.service";
import {FormsModule} from "@angular/forms";

describe('ChatWindowComponent', () => {
    let component: ChatWindowComponent;
    let fixture: ComponentFixture<ChatWindowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ChatWindowComponent,
                ChatMessageComponent
            ],
            providers: [
                messagesServiceInjectables,
                threadsServiceInjectables,
                ChatMessagesService,
                ThreadsService,
                UsersService
            ],
            imports: [
                FormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChatWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
