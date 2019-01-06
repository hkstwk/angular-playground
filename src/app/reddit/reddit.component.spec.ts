import { TestBed, async } from '@angular/core/testing';
import { RedditComponent } from './reddit.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ArticleComponent} from "../article/article.component";

describe('RedditComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RedditComponent,
        ArticleComponent
      ],
      imports: [ RouterTestingModule ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RedditComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have four articles`, () => {
    const fixture = TestBed.createComponent(RedditComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp.articles.length).toEqual(4);
  });

  it('should render title in a h3 tag', () => {
    const fixture = TestBed.createComponent(RedditComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Add a Link');
  });
});
