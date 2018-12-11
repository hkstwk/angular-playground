import {Counter} from "../model/counter.model";
import {Subject, BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";


@Injectable()
export class CounterService {
  private currentCounter: Subject<Counter> = new BehaviorSubject<Counter>(null);

  constructor() {
  }

  public setCurrentCounter(newCounter: Counter): void {
    this.currentCounter.next(newCounter);
  }

  public clearCurrentCounter(){
    this.currentCounter.next();
  }

  public getCurrentCounter() : Observable<Counter> {
    return this.currentCounter.asObservable();
  }
}
