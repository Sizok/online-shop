import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';
import { BasketService } from './services/basket.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'online-vs-shop';
  cart: Cart = {items: []}
  isLoggedIn: boolean;

  constructor(private basketServices: BasketService, private authService: AuthService){}

  ngOnInit(): void {
      this.basketServices.cart.subscribe((_cart) => this.cart = _cart)
  }


}
