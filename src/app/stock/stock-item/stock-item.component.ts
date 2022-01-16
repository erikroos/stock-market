import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {Stock} from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class StockItemComponent {

  @Input() public stock: Stock;
  @Output() toggleFavorite: EventEmitter<Stock>;

  constructor() {
    this.toggleFavorite = new EventEmitter<Stock>();
  }

  onToggleFavorite(event: any) {
    this.toggleFavorite.emit(this.stock);
  }

  changeStockPrice() {
    this.stock.price += 5;
  }
}
