import { TestBed, async, ComponentFixture} from '@angular/core/testing';

import {StockItemComponent} from "./stock-item.component";
import {Stock} from "../../model/stock";
import {By} from '@angular/platform-browser';

describe('Stock Item Component', () => {

  let fixture: ComponentFixture<StockItemComponent>, component: StockItemComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StockItemComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockItemComponent);
    component = fixture.componentInstance;
    component.stock = new Stock('Testing Stock', 'TS', 100, 200);
    fixture.detectChanges();
  });

  it('should create stock component and render stock data', () => {
    const nameEl = fixture.debugElement.query(By.css('.name'));
    expect(nameEl.nativeElement.textContent).toEqual('Testing Stock (TS)');
    const priceEl = fixture.debugElement.query(By.css('.price.negative'));
    expect(priceEl.nativeElement.textContent).toEqual('$ 100');
    const AddFavoriteBtnEl = fixture.debugElement.query(By.css('button'));
    expect(AddFavoriteBtnEl).toBeDefined();
  });

  it('should trigger event emitter on add to favorite', () => {
    let selectedStock : Stock;
    component.toggleFavorite.subscribe((stock: Stock) => selectedStock = stock);
    const AddFavoriteBtnEl = fixture.debugElement.query(By.css('button'));

    // @ts-ignore
    expect(selectedStock).toBeUndefined();
    AddFavoriteBtnEl.triggerEventHandler('click', null);
    // @ts-ignore
    expect(selectedStock).toEqual(component.stock);
  });
});
