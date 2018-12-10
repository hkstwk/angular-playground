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

  private errorResp: HttpErrorResponse;

  data: any = 'waiting...'
  multiple1: number = 3;
  multiple2: number = 5;
  limit: number = 10;


  constructor(private eulerService: EulerService) { }

  ngOnInit() {
  }

  onSubmit(form: any): void {
    this.data = form;
    this.getEuler();
  }

  getEuler(): void {
    this.errorResp = null;
    this.eulerService.getEuler001(this.data)
      .subscribe(
        resp => this.handleResp(resp),
        error => this.handleError(error))
  }

  private handleResp(resp: Euler001Response): void {
    this.data = resp;
  }


  private handleError(err: HttpErrorResponse): void {
    console.log("Oops", err.error.validations);
    this.data = err;
  }
}
