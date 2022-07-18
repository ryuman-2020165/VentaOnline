import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: any;
  role:any;
  username:any;

  constructor(
    private userRest: UserRestService
  ) { }

  ngOnInit(): void {
    this.token = this.userRest.getToken();
    this.role = this.userRest.getIdentity().role;
    this.username = this.userRest.getIdentity().username;
  }

  logOut(){
    localStorage.clear();
  }


}
