import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Stock } from "../../model/stock";
import { StockService } from "../../services/stock.service";

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {

  public stock: Stock;
  public stockForm: FormGroup;
  public confirmed: boolean = false;
  public message: String = null;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];

  constructor(private fb: FormBuilder, private stockService: StockService) {
    this.createForm();
    this.initializeStock();
  }

  initializeStock() {
    this.stock = {
      name: '',
      code: '',
      price: 0,
      previousPrice: 0,
      exchange: 'NASDAQ',
      favorite: false
    };
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  resetForm() {
    this.stockForm.reset();
  }

  setStockPrice(price: number) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  onSubmit() {
    console.log("Submitted data: ", this.stockForm.value);
    Object.assign(this.stock, this.stockForm.value);
    console.log("Saving stock: ", this.stock);
    this.stockService.createStock(this.stock).subscribe((result: any) => {
        this.message = result.msg;
        this.initializeStock();
        //this.stockForm.reset();
      }, (err) => {
        this.message = err.error.msg;
    });
  }

  // Getters
  get name() { return this.stockForm.get('name'); }
  get price() { return this.stockForm.get('price'); }
  get code() { return this.stockForm.get('code'); }
}
