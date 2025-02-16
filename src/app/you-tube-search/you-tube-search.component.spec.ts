import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {YouTubeSearchComponent} from './you-tube-search.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {YouTubeSearchService} from './you-tube-search.service';
import {SearchBoxComponent} from '../search-box/search-box.component';
import {SearchResultComponent} from '../search-result/search-result.component';
import {youTubeSearcInjectables} from './you-tube-search.injectables';

describe('YouTubeSearchComponent', () => {
    let component: YouTubeSearchComponent;
    let fixture: ComponentFixture<YouTubeSearchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                YouTubeSearchComponent,
                SearchBoxComponent,
                SearchResultComponent
            ],
            providers: [
                HttpClient,
                HttpHandler,
                YouTubeSearchService,
                youTubeSearcInjectables
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YouTubeSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
