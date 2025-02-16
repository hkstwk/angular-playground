import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ChatWindowComponent} from './chat-window.component';
import {ChatMessageComponent} from '../chat-message/chat-message.component';
import {ChatMessagesService, messagesServiceInjectables} from '../service/chat-messages.service';
import {ThreadsService, threadsServiceInjectables} from '../service/threads.service';
import {UsersService} from '../service/users.service';
import {FormsModule} from '@angular/forms';

describe('ChatWindowComponent', () => {
    let component: ChatWindowComponent;
    let fixture: ComponentFixture<ChatWindowComponent>;

    beforeEach(waitForAsync(() => {
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
