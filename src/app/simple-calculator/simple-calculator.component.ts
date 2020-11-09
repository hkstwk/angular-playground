import {Component, OnInit, Output} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {CalcResponse} from "./CalcResponse";
import {SimpleCalculatorService} from "./simple-calculator.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-calculator',
    templateUrl: './simple-calculator.component.html',
    styleUrls: ['./simple-calculator.component.css']
})

export class SimpleCalculatorComponent implements OnInit {

    operators = ['+', '-', '*', '/'];

    public loading: boolean = false;
    public data: any;

    public leftOperand: number;
    public rightOperand: number;
    public operator: string;
    private calcResult: string;

    constructor(private calcService: SimpleCalculatorService) {
        this.initializeInputs();
    }

    ngOnInit() {}

    calculate(data: any): void {
        this.loading = true;
        this.calcService.doSingleCalculation(data)
            .subscribe(
                resp => this.handleResp(resp),
                error => this.handleError(error))
        this.loading = false;
    }

    private handleResp(resp: CalcResponse): void {
        this.calcResult = resp.calcResult;
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
        this.leftOperand = 5;
        this.rightOperand = 2;
        this.operator = "+";
    }
}
