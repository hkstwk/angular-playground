import {inject, fakeAsync, tick, TestBed } from '@angular/core/testing';
import {async} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";

import {YouTubeSearchService, YOUTUBE_API_KEY, YOUTUBE_API_URL} from './you-tube-search.service';

describe('YouTubeSearchService', () => {

  let service: YouTubeSearchService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YouTubeSearchService],
    });

    service = TestBed.get(YouTubeSearchService);
    console.log(service);
    httpMock = TestBed.get(HttpTestingController);
  }));

  it('should look for \'GMBN\'', () => {
    const params: string = [
      `q=gmbn`,
      `key=${YOUTUBE_API_KEY}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');
    const queryUrl = `${YOUTUBE_API_URL}?${params}`;
  });

});
