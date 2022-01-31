import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";

import { Stock } from "../../model/stock";
import { StockService } from "../../services/stock.service";

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stocks$: Observable<Stock[]>;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stocks$ = this.stockService.getStocks();
  }
}
