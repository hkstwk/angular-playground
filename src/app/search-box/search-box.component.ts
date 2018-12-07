import {Component, OnInit, EventEmitter, Output, ElementRef} from '@angular/core';
import {SearchResult} from "../model/search-result.model";
import {YouTubeSearchService} from "../you-tube-search/you-tube-search.service";
import {Observable, fromEvent} from "rxjs";
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YouTubeSearchService, private el: ElementRef<any, any>) { }

  ngOnInit() {
    const obs = fromEvent(this.el.nativeElement, 'keyup')
      .pipe (
        map((e:any) => e.target.value), // extract the value of the input

        filter((text:string) => text.length > 1), //filter out if empty

        debounceTime(250), //only search after 250 ms

        tap(() => this.loading.emit(true)), // Enable loading
        // search, call the search service

        map((query:string) => this.youtube.search(query)) ,
        // discard old events if new input comes in

        switchAll()
        // act on the return of the search
      )
      .subscribe(
      (results: SearchResult[]) => { // on sucesss
        this.loading.emit(false);
        this.results.emit(results);
      },
      (err: any) => { // on error
        console.log(err);
        this.loading.emit(false);
      },
      () => { // on completion
        this.loading.emit(false);
      }
    );
  }

}
