import { Component, OnInit } from '@angular/core';
import {EulerService} from "./euler.service";
import {Euler001Request} from "./euler001request";
import {Euler001Response} from "./euler001response";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-euler',
  templateUrl: './euler.component.html',
  styleUrls: ['./euler.component.css']
})

export class EulerComponent implements OnInit {
  private euler001req: Euler001Request = {
    multiple1: 3,
    multiple2: 5,
    limit: 10
  };

  private multiple1: number = 3;
  private multiple2: number = 5;
  private limit:     number = 10;

  private euler001resp: Euler001Response;
  private errorResp: HttpErrorResponse;
  private respAvailable: boolean;

  data: any = 'waiting...'

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: any): void {
    this.data = form;
    console.log(' you submitted value: ', form);
    console.log(' you submitted value: ', this.data);
  }
}
