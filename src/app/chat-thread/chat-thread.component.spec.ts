import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ChatThreadComponent} from "./chat-thread.component";
import {Thread} from "../model/thread.model";
import {ThreadsService} from "../service/threads.service";
import {ChatMessage} from "../model/chat-message.model";
import {User} from "../model/user.model";
import {DebugElement, ElementRef} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('ChatThreadComponent', () => {
    let component: ChatThreadComponent;
    let fixture: ComponentFixture<ChatThreadComponent>;
    let thread: Thread;
    let de: DebugElement;
    let clickedAnchor: ElementRef;

    beforeAll(() => {
        // One time setup test data
        const testThread: Thread = new Thread(null, 'Test Thread for ChatThreadComponent', 'assets/images/avatars/female-avatar-1.png');
        const testThreadTwo: Thread = new Thread(null, 'Test Thread for ChatThreadComponent', 'assets/images/avatars/female-avatar-1.png');
        const testUser: User = new User('Test User for ChatThreadComponent', 'assets/images/avatars/male-avatar-2.png');
        const testMessage: ChatMessage = new ChatMessage({
            author: testUser,
            text: 'Test Message for ChatThreadComponent',
            sentAt: new Date('Tue Feb 5 2019 20:38:37 GMT+0100'),
            thread: testThread
        });

        thread = testThread;
        testThread.lastMessage = testMessage;
    })

    afterAll(() => {
        thread = null;
    })


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

    it('should have \'Test Thread for ChatThreadComponent\' as name of the thread', () => {
        expect(component.thread.name).toBe('Test Thread for ChatThreadComponent');
    });

    it('should have \'assets/images/avatars/female-avatar-1.png\' as avatarSrc', () => {
        expect(component.thread.avatarSrc).toBe('assets/images/avatars/female-avatar-1.png');
    });

    it('should have \'Test Message for ChatThreadComponent\' as lastMessage.text', () => {
        expect(component.thread.lastMessage.text).toBe('Test Message for ChatThreadComponent');
    });

    it('should set selected from false to true after click on thread', () => {
        // initially selected should be false, because currentThread is undefined
        expect(component.selected).toBe(false);

        // click on thread
        de = fixture.debugElement;
        clickedAnchor = de.query(By.css('a#clicked'));
        clickedAnchor.nativeElement.click();

        // Now selected shoud be true
        expect(component.selected).toBe(true);
    });

});

