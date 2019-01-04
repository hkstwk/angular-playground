import { TestBed } from '@angular/core/testing';

import { YouTubeSearchService } from './you-tube-search.service';
import {async} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";

describe('YouTubeSearchService', () => {

  beforeEach(async(() => TestBed.configureTestingModule({
    providers: [ YouTubeSearchService, HttpClient, HttpHandler],
  })));

  it('should be created', () => {
    const service: YouTubeSearchService = TestBed.get(YouTubeSearchService);
    expect(service).toBeTruthy();
  });
});
