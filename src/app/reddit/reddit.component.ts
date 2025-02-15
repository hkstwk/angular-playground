import { Component } from '@angular/core';
import {Article} from "./../article/article.model";

@Component({
    selector: 'app-reddit',
    templateUrl: 'reddit.component.html',
    styleUrls: ['reddit.component.css'],
    standalone: false
})
export class RedditComponent {
  articles: Article[];

  constructor() {
    this.articles = [
      new Article('Angular','http://angular.io',10),
      new Article('Fullstack','http://fullstack.io',15),
      new Article('Project Euler','https://projecteuler.net',20),
      new Article('Angular Homepage','http://angular.io')
    ]
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.articles.push(new Article(title.value, link.value));
    title.value = '';
    link.value = '';
    return false;
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }
}
