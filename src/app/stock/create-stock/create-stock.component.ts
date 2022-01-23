import { Component } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormArray} from "@angular/forms";
import { Stock } from "../../model/stock";

let counter = 1;

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {

  public stock: Stock;
  public stockForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
      notablePeople: this.fb.array([])
    });
  }

  addNotablePerson() {
    this.notablePeople.push(this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required]
    }));
  }

  removeNotablePerson(index: number) {
    this.notablePeople.removeAt(index);
  }

  resetForm() {
    this.stockForm.reset();
  }

  onSubmit() {
    this.stock = Object.assign({}, this.stockForm.value);
    console.log("Saving stock", this.stockForm.value);
  }

  // Getters
  get name() { return this.stockForm.get('name'); }
  get price() { return this.stockForm.get('price'); }
  get code() { return this.stockForm.get('code'); }
  get notablePeople(): FormArray {
    return this.stockForm.get('notablePeople') as FormArray;
  }
}
