import { Component, OnInit } from '@angular/core';
import {EulerService} from "./euler.service";
import {Euler001Response} from "./euler001response";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-euler',
  templateUrl: './euler.component.html',
  styleUrls: ['./euler.component.css']
})

export class EulerComponent implements OnInit {

  public loading: boolean = false;
  public data: any;

  public multiple1: number;
  public multiple2: number;
  public limit: number;

  constructor(private eulerService: EulerService) {
    this.initializeInputs();
  }

  ngOnInit() {}

  getEuler(data: any): void {
    this.loading = true;
    this.eulerService.getEuler001(data)
      .subscribe(
        resp => this.handleResp(resp),
        error => this.handleError(error))
    this.loading = false;
  }

  private handleResp(resp: Euler001Response): void {
    this.data = resp;
  }


  private handleError(err: HttpErrorResponse): void {
    this.data = err;
  }

  reset(): void {
    this.loading = false;
    this.data = null;
    this.initializeInputs();
  }

  private initializeInputs() {
    this.multiple1 = 3;
    this.multiple2 = 5;
    this.limit = 1000;
  }
}
