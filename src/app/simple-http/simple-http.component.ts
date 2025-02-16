import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, UntypedFormBuilder} from '@angular/forms';

@Component({
    selector: 'app-simple-http',
    templateUrl: './simple-http.component.html',
    styleUrls: ['./simple-http.component.css'],
    standalone: false
})
export class SimpleHttpComponent implements OnInit {
    data: Object;
    loading: boolean = false;
    myForm: FormGroup;

    constructor(private http: HttpClient, fb: UntypedFormBuilder) {

        this.myForm = new FormGroup({
            url: new FormControl('https://api.github.com/repos/hkstwk/euler/contents/Euler/src/nl/hkolvoort/euler/P001_SumOfMultiples.java')
        });
    }

    ngOnInit() {
    }

    get urlControl(): FormControl {
        return this.myForm.get('url') as FormControl;
    }

    makeRequest(url: string): void {
        if (this.data) {
            this.data = null;
        }
        this.loading = true;
        this.http
            .get(url)
            .subscribe(
                (data: any) => {
                    this.data = atob(data.content);
                    this.loading = false;
                },
                (err: any) => {
                    this.data = err;
                    this.loading = false;
                });
    }

    reset(): void {
        this.loading = false;
        this.data = null;
    }

    protected readonly FormControl = FormControl;
}
