import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(private ProductsService: ProductsService, public dialog: MatDialog) { }

  products: IProducts[] ;
  productsSubscription: Subscription ;
  basket: IProducts[] ;
  basketSubscription: Subscription ;

  canEdit: boolean = false;

  ngOnInit(): void {
    this.canEdit = true;
    this.productsSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
    })
    this.basketSubscription = this.ProductsService.getProductsBasket().subscribe((data) => {
      this.basket = data;
    })
  }

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( (data) => {
      if(data && data.id){
        this.updateData(data)
      }else if (data) {
        this.postData(data)
      }
    }
    );
  }

  postData(data: IProducts){
    console.log(data);
    this.ProductsService.postProduct(data).subscribe((data) => this.products.push(data));
  }

  updateData(product: IProducts){
    this.ProductsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
        if(product.id === data.id) return data;
        else return product;
      })
    });
  }

  deleteItem(id: number){
    this.ProductsService.deleteProduct(id).subscribe((data) => this.products.find((item) =>{
      if(id === item.id){
        let idx = this.products.findIndex((data) => data.id === id);
        this.products.splice(idx, 1);
      }
    }));
  }

  addToBasket(product: IProducts){
    product.quantity = 1
    let findItem;

    if(this.basket.length > 0){
      findItem = this.basket.find(item => item.id === product.id);
      if(findItem) this.updateToBasket(findItem)
      else this.postToBasket(product);
    }
    else this.postToBasket(product);
  }

  postToBasket(product: IProducts){
    this.ProductsService.postProductToBasket(product).subscribe((data) =>{
      this.basket.push(data);
    });
  }

  updateToBasket(product: IProducts){
    product.quantity +=1;
    this.ProductsService.updateProductBasket(product).subscribe((data) =>{

      })
  }

  ngOnDestroy(): void {
    if(this.productsSubscription) this.productsSubscription.unsubscribe();
    if(this.basketSubscription) this.basketSubscription.unsubscribe();
  }

}
