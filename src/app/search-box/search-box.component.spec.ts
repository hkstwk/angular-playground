import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SearchBoxComponent} from "./search-box.component";
import {YouTubeSearchService} from "../you-tube-search/you-tube-search.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {EventEmitter} from "@angular/core";
import {SearchResult} from "../model/search-result.model";
import {youTubeSearcInjectables} from "../you-tube-search/you-tube-search.injectables";

describe('SearchBoxComponent', () => {
    let component: SearchBoxComponent;
    let fixture: ComponentFixture<SearchBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchBoxComponent],
            providers: [
                YouTubeSearchService,
                HttpClient,
                HttpHandler,
                youTubeSearcInjectables
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchBoxComponent);
        component = fixture.componentInstance;
        component.loading = new EventEmitter<boolean>();
        component.results = new EventEmitter<SearchResult[]>();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
