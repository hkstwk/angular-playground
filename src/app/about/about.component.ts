import { Component, OnInit } from '@angular/core';
import {CounterService} from "./counter.service";
import {Counter} from "../model/counter.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  counterStream: Observable<Counter>;

  counter : number = 0;

  constructor(private counterService: CounterService) {
    this.counterStream = counterService.currentCounter;
  }

  ngOnInit() {
  }

  onClick() {
    this.counter += 1;
    this.counterService.setCurrentCounter(new Counter(this.counter));
  }

}
