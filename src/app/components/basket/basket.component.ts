import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/products';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(
    private ProductsService: ProductsService
  ) { }
  basket: IProducts[];
  basketSubscription: Subscription;
  ngOnInit(): void {
    this.basketSubscription = this.ProductsService.getProductsBasket().subscribe((data) => {
      this.basket = data;
    })
  }

  minusItemBasket(product: IProducts){
    if(product.quantity === 1){
      this.ProductsService.removeProductFromBasket(product.id).subscribe(() =>{
        let inx = this.basket.findIndex(x => x.id === product.id)
        this.basket.splice(inx, 1);
      })
    }else{
      product.quantity -= 1;
      this.ProductsService.updateProductBasket(product).subscribe((data) => {
      console.log(data);
    })
    }

  }
  plusItemBasket(product: IProducts){
    product.quantity += 1;
    this.ProductsService.updateProductBasket(product).subscribe((data) => {})
  }

  ngOnDestroy(): void {
    if(this.basketSubscription) this.basketSubscription.unsubscribe();
  }

}
