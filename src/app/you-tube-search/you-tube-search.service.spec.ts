import { TestBed } from '@angular/core/testing';
import { async } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {YouTubeSearchService, YOUTUBE_API_KEY, YOUTUBE_API_URL} from './you-tube-search.service';
import {HttpClient} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";
import {youTubeSearcInjectables} from "./you-tube-search.injectables";

describe('YouTubeSearchService', () => {

  let service: YouTubeSearchService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // imports: [HttpClientTestingModule],
      providers: [YouTubeSearchService, youTubeSearcInjectables, HttpClient, HttpHandler],
    });

    service = TestBed.get(YouTubeSearchService);
    // httpMock = TestBed.get(HttpTestingController);
  }));

  it('should create the YouTubeSearchService', () => {
    expect(service).toBeTruthy();
  });

  // it('should look for \'GMBN\'', () => {
  //   const params: string = [
  //     `q=gmbn`,
  //     `key=${YOUTUBE_API_KEY}`,
  //     `part=snippet`,
  //     `type=video`,
  //     `maxResults=10`
  //   ].join('&');
  //   const queryUrl = `${YOUTUBE_API_URL}?${params}`;
  // });

});
