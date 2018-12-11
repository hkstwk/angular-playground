import {Counter} from "../model/counter.model";
import {Subject, BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {scan, publishReplay, refCount, map} from "rxjs/internal/operators";

interface ICounterOperation extends Function {
  (counters: Counter[]): Counter[];
}

const initialCounter: Counter[] = [];


@Injectable()
export class CounterService {
  currentCounter: Subject<Counter> = new BehaviorSubject<Counter>(null);
  counters: Observable<Counter[]>;
  updates: Subject<any> = new Subject<any>();
  create: Subject<Counter> = new Subject<Counter>();

  constructor() {
    this.counters = this.updates
      .pipe(
        scan((counters: Counter[], operation: ICounterOperation) => {
          return operation(counters);
        },
        initialCounter),
        publishReplay(1),
        refCount()
      );
    this.create
      .pipe(
        map(function(counter: Counter): ICounterOperation {
          return (counters: Counter[]) => {
            return counters.concat(counter);
          };
        }))
      .subscribe(this.updates);
  }

  public setCurrentCounter(newCounter: Counter): void {
    this.currentCounter.next(newCounter);
  }

  // allEvenCounters() : Observable<Counter> {
  //   return this.currentCounter
  //     .pipe(filter((counter: Counter) => {
  //       return (counter.countValue % 2 === 0)
  //   }));
  // }
}
