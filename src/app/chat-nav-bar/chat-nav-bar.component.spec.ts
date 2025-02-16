import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ChatNavBarComponent} from './chat-nav-bar.component';

describe('ChatNavBarComponent', () => {
    let component: ChatNavBarComponent;
    let fixture: ComponentFixture<ChatNavBarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ChatNavBarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChatNavBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
