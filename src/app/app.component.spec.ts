import { TestBed, async, ComponentFixture} from '@angular/core/testing';

import { AppComponent } from './app.component';
import { StockItemComponent } from "./stock/stock-item/stock-item.component";
import {Stock} from "./model/stock";
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {

  describe('Simple, No Angular Unit Test', () => {
    it('should have stock instantiated on ngInit', () => {
      const appComponent = new AppComponent();
      expect(appComponent.stockObj).toBeUndefined();
      appComponent.ngOnInit();
      expect(appComponent.stockObj).toEqual(
        new Stock('Test Stock Company - 1', 'TSC', 85, 80)
      );
    });

    it('should have toggle stock favorite', () => {
      const appComponent = new AppComponent();
      appComponent.ngOnInit();
      expect(appComponent.stockObj.favorite).toBeFalsy();
      appComponent.onToggleFavorite(new Stock('Test', 'TEST', 54, 55));
      expect(appComponent.stockObj.favorite).toBeTruthy();
      appComponent.onToggleFavorite(new Stock('Test', 'TEST', 54, 55));
      expect(appComponent.stockObj.favorite).toBeFalsy();
    });
  });

  describe('Angular Aware Test', () => {
    let fixture: ComponentFixture<AppComponent>, component: AppComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          StockItemComponent
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load stock with default values', () => {
      // @ts-ignore
      const titleEl = fixture.debugElement.query(By.css('h1'));
      expect(titleEl.nativeElement.textContent.trim()).toEqual('Stock Market App');

      const nameEl = fixture.debugElement.query(By.css('.name'));
      expect(nameEl.nativeElement.textContent).toEqual('Test Stock Company - 1 (TSC)');
      const priceEl = fixture.debugElement.query(By.css('.price'));
      expect(priceEl.nativeElement.textContent).toEqual('$ 85');
      const addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));
      expect(addToFavoriteBtnEl).toBeDefined();
    });

    it('should toggle stock favorite correctly', () => {
      expect(component.stockObj.favorite).toBeFalsy();
      let addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));
      expect(addToFavoriteBtnEl).toBeDefined();
      addToFavoriteBtnEl.triggerEventHandler('click', null);

      fixture.detectChanges();
      expect(component.stockObj.favorite).toBeTruthy();
      addToFavoriteBtnEl = fixture.debugElement.query(By.css('button'));
      expect(addToFavoriteBtnEl).toBeNull();
    });

  });

});
