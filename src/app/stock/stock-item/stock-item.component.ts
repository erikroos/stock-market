import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {Stock} from '../../model/stock';
import {StockService} from "../../services/stock.service";

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class StockItemComponent {

  @Input() public stock: Stock;

  constructor(private stockService: StockService) {}

  onToggleFavorite(event: any) {
    this.stockService.toggleFavorite(this.stock).subscribe((stock) => this.stock.favorite = !this.stock.favorite);
  }
}
