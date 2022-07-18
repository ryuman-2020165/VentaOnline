import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {path: '',component: HomeComponent},//Ruta por default o principal
  {path: 'home',component: HomeComponent},//Ruta normal
  {path: 'login',component: LoginComponent},//Ruta normal
  {path: 'register',component: RegisterComponent},//Ruta normal

  {path: 'user',canActivate:[UserGuard],component: UserComponent, children: [
    {path: 'products',component: ProductsComponent},
    {path: 'viewProduct/:idP',component: ViewProductComponent },
  ]},//Ruta normal

  {path: '**',component: NotFoundComponent},//Ruta normal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
