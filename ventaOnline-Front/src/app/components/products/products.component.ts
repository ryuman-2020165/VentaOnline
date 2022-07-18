import { Component, OnInit } from '@angular/core';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';
import { CategoryRestService } from 'src/app/services/categoryRest/category-rest.service';
import { ProductModel } from 'src/app/models/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  categories: any;
  product: ProductModel;
  productGetId:any;
  search:any

  constructor(
    private productRest: ProductRestService,
    private categoryRest: CategoryRestService
  ) {
    this.product = new ProductModel('','','',0,0,0,'');
   }

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }

  getProducts(){
    this.productRest.getProducts().subscribe({
      next: (res:any)=>{
        this.products = res.products
        
        
      },
      error: (err)=>{
        console.log(err.error.message);
      }
    })
  }


  getCategories(){
    this.categoryRest.getCategories().subscribe({
      next: (res:any)=>{
        this.categories = res.categorys;
      },
      error: (err)=>{
        console.log(err.error.message);
      }
    });
  }


  saveProduct(addProductForm:any){
    this.productRest.saveProduct(this.product).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 1500
        })
        this.getProducts();
        addProductForm.reset();
      },
      error: (err)=>{
        console.log(err.error.message || err.error);
        
      }
    });
  }

  getProduct(id:string){
    this.productRest.getProduct(id).subscribe({
      next: (res:any)=>{
        this.productGetId = res.product;
        console.log(this.productGetId);
        
      },
      error: (err)=>{
        console.log(err.error.message);
      }
    })
  }

  updateProduct(){
    
    this.productRest.updateProduct(this.productGetId,this.productGetId._id).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 1500
        })
        this.getProducts();
      },
      error: (err)=>{
        console.log(err.error.message);
      }
    })
  }


  deleteProduct(id:string){
    this.productRest.deleteProduct(id).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message +' '+ res.productDeleted.name,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 1500
        })
        
        this.getProducts();
      },
      error: (err)=>{
        console.log(err.error.message);
        Swal.fire({
          title: err.error.message,
          icon: 'error',
          position: 'center',
          timer: 3000
        })
      }
    })
  }


}
