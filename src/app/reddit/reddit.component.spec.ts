import { TestBed, async } from '@angular/core/testing';
import { RedditComponent } from './reddit.component';

describe('RedditComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RedditComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RedditComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-reddit'`, () => {
    const fixture = TestBed.createComponent(RedditComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-reddit');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(RedditComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-reddit!');
  });
});
