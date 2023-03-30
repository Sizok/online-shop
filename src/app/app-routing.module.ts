import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BasketComponent } from './components/basket/basket.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductResolver } from './services/product.resolver';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {path:'', component: BaseComponent},
  {path:'products', component: ProductsComponent},
  {path:'product/:id', component: ProductDetailsComponent, resolve: {data: ProductResolver}},
  {path:'basket', component: BasketComponent},
  {path:'login', component: LoginComponent},
  {path:'admin',canActivate: [AuthGuard] , loadChildren: () => import('./components/admin/admin.module').then((m) => m.AdminModule)},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
