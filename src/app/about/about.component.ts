import { Component, OnInit } from '@angular/core';
import {CounterService} from "./counter.service";
import {Counter} from "../model/counter.model";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  counterStream: Subscription;
  counter: Counter;
  index: number = 0;

  constructor(private counterService: CounterService) {
    this.counterStream = this.counterService.getCurrentCounter()
      .subscribe(counter => {
        this.counter = counter
       });
  }

  ngOnInit() { }

  add() {
    this.index += 1;
    this.counterService.setCurrentCounter(new Counter(this.index));
  }

  substract() {
    this.index -= 1;
    this.counterService.setCurrentCounter(new Counter(this.index));
  }

  clear() {
    this.index = 0;
    this.counterService.clearCurrentCounter();
  }
}
