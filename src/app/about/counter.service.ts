import {Counter} from "../model/counter.model";
import {Subject, BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class CounterService {
  currentCounter: Subject<Counter> = new BehaviorSubject<Counter>(null);

  public setCurrentCounter(newCounter: Counter): void {
    this.currentCounter.next(newCounter);
  }
}
