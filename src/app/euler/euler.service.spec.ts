import { TestBed } from '@angular/core/testing';

import { EulerService } from './euler.service';
import {async} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";

describe('EulerService', () => {

  beforeEach(async(() => TestBed.configureTestingModule({
    providers: [ EulerService, HttpClient, HttpHandler],
  })));

  it('should be created', () => {
    const service: EulerService = TestBed.get(EulerService);
    expect(service).toBeTruthy();
  });
});
