import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {YouTubeSearchComponent} from "./you-tube-search.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpHandler} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {YouTubeSearchService} from "./you-tube-search.service";
import {SearchBoxComponent} from "../search-box/search-box.component";
import {SearchResultComponent} from "../search-result/search-result.component";
import {Injectable, Inject} from "@angular/core";

describe('YouTubeSearchComponent', () => {
  let component: YouTubeSearchComponent;
  let fixture: ComponentFixture<YouTubeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YouTubeSearchComponent, SearchBoxComponent, SearchResultComponent ],
      providers: [ HttpClient, HttpHandler, YouTubeSearchService],
      imports: [ Injectable, Inject ]

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
