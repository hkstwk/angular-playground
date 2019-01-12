import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import { SearchResult } from "../model/search-result.model";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import {YouTubeSearchService} from "../you-tube-search/you-tube-search.service";

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    let item = {
      id: "video id",
      title: "video title",
      description: "video description",
      thumbnailUrl: "https://i.ytimg.com/vi/3kZfgpnI__s/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=3kZfgpnI__s"
    };
    component.result = new SearchResult(item);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render result title as \<h2\>', () => {
    debugEl = fixture.debugElement.query(By.css('h2'));
    fixture.detectChanges();
    expect(debugEl.nativeElement.innerText).toBe("video title");
  });

  it('should render result description in a \<p\> ', () => {
    debugEl = fixture.debugElement.query(By.css('p'));
    fixture.detectChanges();
    expect(debugEl.nativeElement.innerText).toBe("video description");
  });

  it('should render result thumbnail in a \<img\> ', () => {
    debugEl = fixture.debugElement.query(By.css('img'));
    fixture.detectChanges();
    expect(debugEl.nativeElement.currentSrc).toBe("https://i.ytimg.com/vi/3kZfgpnI__s/hqdefault.jpg");
  });

  it('should render result video in an \<a\> ', () => {
    debugEl = fixture.debugElement.query(By.css('a'));
    console.log(debugEl);
    fixture.detectChanges();
    expect(debugEl.nativeElement.href).toBe("https://www.youtube.com/watch?v=3kZfgpnI__s");
  });
});
