import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ChatAppComponent} from './chat-app.component';
import {ChatWindowComponent} from '../chat-window/chat-window.component';
import {ChatThreadsComponent} from '../chat-threads/chat-threads.component';
import {ChatThreadComponent} from '../chat-thread/chat-thread.component';
import {ChatNavBarComponent} from '../chat-nav-bar/chat-nav-bar.component';
import {ChatMessageComponent} from '../chat-message/chat-message.component';
import {ThreadsService, threadsServiceInjectables} from '../service/threads.service';
import {ChatMessagesService, messagesServiceInjectables} from '../service/chat-messages.service';
import {UsersService} from '../service/users.service';
import {FormsModule} from '@angular/forms';

describe('ChatAppComponent', () => {
    let component: ChatAppComponent;
    let fixture: ComponentFixture<ChatAppComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ChatAppComponent,
                ChatWindowComponent,
                ChatThreadsComponent,
                ChatThreadComponent,
                ChatNavBarComponent,
                ChatMessageComponent
            ],
            providers: [
                threadsServiceInjectables,
                messagesServiceInjectables,
                ChatMessagesService,
                ThreadsService,
                UsersService,
            ],
            imports: [
                FormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChatAppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
