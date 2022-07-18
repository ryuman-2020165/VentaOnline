import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { ProductRestService } from 'src/app/services/productRest/product-rest.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  idProduct:any;
  product: ProductModel

  constructor(
    public activatedRoute: ActivatedRoute,
    public productRest: ProductRestService
  ) { this.product = new ProductModel('','','',0,0,0,''); }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(idRuta=>{
      this.idProduct = idRuta.get('idP');
    })
    this.getProduct();
  }



  getProduct(){
    this.productRest.getProduct(this.idProduct).subscribe({
      next: (res:any)=>{
        this.product = res.product
        
        
        
      },
      error: (err)=>{
        console.log(err.error.message);
      }
    })
  }

}
