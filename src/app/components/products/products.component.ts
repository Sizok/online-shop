import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BasketService } from 'src/app/services/basket.service';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

import { OpenDialogService } from 'src/app/services/opendialog.service';

const ROWS_HEIGHT:{[id: number] : number}  = {
  1: 400,
  3: 335,
  4: 350
};

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;
  newItemAddedSubscription: Subscription;

  constructor( private basketService: BasketService , private storeService: StoreService, private openDialogService: OpenDialogService) { }

  ngOnInit(): void {
    this.getProducts();
    this.newItemAddedSubscription = this.openDialogService.newItemAdded$.subscribe((data) => {
      this.addNewProduct(data);
    });
  }
  addNewProduct(product: Product){
    debugger;
    if(this.products){
      let data = this.products?.find(item => item.id === product.id)
      if(!data){
        this.products?.unshift(product);
      }
    }
  }
  getProducts():void{
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe((_product) => {
      this.products = _product;
    })
  }
  onColumnsCountChange(colsNum: number):void{
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  onShowCategory(newCategory: string):void{
    this.category = newCategory;
    this.getProducts();
  }
  onAddToCart(product: Product):void{
    this.basketService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }
  onRemoveProduct(_product: Product): void {
    debugger;
    if(this.products){
      let idx = this.products.findIndex((data) => data.id === _product.id);
      this.products.splice(idx, 1);
    }
  }

  onItemsCountChange(newCount:string): void {
    this.count = newCount;
    this.getProducts();
  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
  ngOnDestroy(): void {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }
    if(this.newItemAddedSubscription){
      this.newItemAddedSubscription.unsubscribe();
    }
  }

}
