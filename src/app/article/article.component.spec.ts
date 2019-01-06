import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { Component } from "@angular/core";
import { Article } from "./article.model";

describe('ArticleComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: `host-component`,
    template: `<app-article [article]="article"></app-article>`
  })
  class TestHostComponent {
    article = new Article('Project Euler','https://projecteuler.net',395);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleComponent, TestHostComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should show #votes of "395"', () => {
    expect(testHostFixture.nativeElement.querySelector('div#votes').innerText).toEqual("395");
  });

  it('should show title "Project Euler"', () => {
    expect(testHostFixture.nativeElement.querySelector('a#title').innerText).toEqual("Project Euler");
  });

  it('should show domain "projecteuler.net"', () => {
    expect(testHostFixture.nativeElement.querySelector('div#domain').innerText).toEqual("projecteuler.net");
  });

  it('should show upVote "upvote"', () => {
    expect(testHostFixture.nativeElement.querySelector('a#voteUp').innerText).toEqual("upvote");
  });

  it('should show "Arrow Up Icon"', () => {
    expect(testHostFixture.nativeElement.querySelector('i#ArrowUpIcon').toBe);
  });

  it('should show upVote "downvote"', () => {
    expect(testHostFixture.nativeElement.querySelector('a#voteUp').innerText).toEqual("upvote");
  });

  it('should show "Arrow Down Icon"', () => {
    expect(testHostFixture.nativeElement.querySelector('i#ArrowDownIcon').toBe);
  });

});
