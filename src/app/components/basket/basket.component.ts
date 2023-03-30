import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { BasketService } from 'src/app/services/basket.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  cart: Cart = {items:[{
    product: 'http://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1
  },
  {
    product: 'http://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 3,
    id: 2
  }]}
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]
  constructor( private basketService: BasketService) { }
  basketSubscription: Subscription;
  ngOnInit(): void {
    this.basketService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: Array<CartItem>): number {
    return this.basketService.getTotal(items);
  }
  onClearBasket(): void {
    this.basketService.clearBasket();
  }

  onRemoveFromBasket(item: CartItem): void {
    this.basketService.removeFromBasket(item);
  }
  onAddQuantity(item:CartItem):void{
    this.basketService.addToCart(item);
  }
  onRemoveQuatity(item:CartItem):void{
    this.basketService.removeQuantity(item);
  }

  ngOnDestroy(): void {
    if(this.basketSubscription) this.basketSubscription.unsubscribe();
  }

}
