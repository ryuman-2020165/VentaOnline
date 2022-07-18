import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRestService } from '../services/userRest/user-rest.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private userRest: UserRestService,
    public router: Router
  ){}



  canActivate(){
   

    if (this.userRest.getIdentity().role === 'ADMIN' || this.userRest.getIdentity().role === 'CLIENT') {
      return true;
    } else {
      this.router.navigateByUrl('home');
      return false;
    }


  }
  
}
