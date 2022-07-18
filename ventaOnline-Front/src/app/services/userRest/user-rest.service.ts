import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(
    private http: HttpClient
  ) { }

  test(message: string){
    console.log(message);
  }

  testHttp(){
    return this.http.get(environment.baseUrl + 'user/pruebaUser', {headers: this.httpOptions});

  }

  register(params:{}){
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl+'user/register',body,{headers: this.httpOptions});
  }

  login(params:{}){
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl+'user/login',body,{headers: this.httpOptions});
  }


  getToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if (globalToken != undefined) {
        token = globalToken
    } else {
        token = '';
    }
    return token;
  }


  getIdentity(){
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if (globalIdentity != undefined) {
      identity = JSON.parse(globalIdentity);
    } else {
      identity = '';
    }
    return identity;

}

}