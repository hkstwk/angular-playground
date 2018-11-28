import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';

function skuValidator(control: FormControl): { [s: string]: boolean} {
  if (!control.value.match(/^123/)) {
    return {"invalidSku": true};
  }
}

@Component({
  selector: 'app-demo-sku',
  templateUrl: './demo-sku.component.html',
  styleUrls: ['./demo-sku.component.css']
})
export class DemoSkuComponent implements OnInit {
  myForm : FormGroup;
  skuString: string = '124..';

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'sku': ['', Validators.compose([
        Validators.required, skuValidator])]
    });

    this.myForm.controls['sku'].valueChanges.subscribe(
      (value: string) => {
        console.log('sku changed to: ', value);
      }
    );

    this.myForm.valueChanges.subscribe(
      (form: any) => {
        console.log('form changed to: ', form)
      }
    )
  }

  ngOnInit() {
  }

  onSubmit(form: any): void {
    console.log(' you submitted value: ', form);
  }

  onSubmitReactive(value: string): void {
    console.log(' you submitted value: ', value);
  }



}
