import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:UserModel;
  repeatPass:string = "";
  timer: any;
  

  constructor(
    private userRest: UserRestService,
    private router : Router
  ) {
    this.user = new UserModel('','','','','','','','');
   }


  ngOnInit(): void {
  }



  async checkPassword(){
    clearTimeout(this.timer);
    this.timer = await setTimeout(()=>{
      if (this.repeatPass != this.user.password) {
        alert('Password does not match');
        clearTimeout(this.timer);
    } else {
      alert('Password match');
      clearTimeout(this.timer);
    }
    },1500);
  }

  
  

  register(){
    this.userRest.register(this.user).subscribe({
      next :(res:any)=>{
        Swal.fire({
          title: res.message + ' You can login now',
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl('/login');
      },
      error :(err)=>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          position: 'center',
          timer: 3000
        })
        
        
      }
    
  });

  }



}

