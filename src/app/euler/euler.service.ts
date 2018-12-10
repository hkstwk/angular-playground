import {Injectable} from '@angular/core';

// rxjs
import {Observable} from "rxjs";
import {Euler001Request} from "./euler001request";
import {HttpClient} from "@angular/common/http";
import {Euler001Response} from "./euler001response";


@Injectable()
export class EulerService {

  private readonly URL = "http://localhost:8080/EulerWebService/api/euler/1";

  constructor(protected httpClient: HttpClient) {
  }

  public getEuler001(request: Euler001Request): Observable<Euler001Response> {
    return this.httpClient
      .post<Euler001Response>(this.URL, request);
  }
}
