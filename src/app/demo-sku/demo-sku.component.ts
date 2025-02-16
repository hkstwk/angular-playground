import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl} from '@angular/forms';

function skuValidator(control: UntypedFormControl): { [s: string]: boolean} {
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
  myForm : UntypedFormGroup;
  skuString: string = '124..';

  constructor(fb: UntypedFormBuilder) {
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
