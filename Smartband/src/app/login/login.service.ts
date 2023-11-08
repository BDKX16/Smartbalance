import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginService {
  constructor(private router: Router, private httpClient: HttpClient, private cookies:CookieService) {}

  login(email: string, password: string) {
    return this.httpClient
      .post('http://localhost:3000/api/login', {
        email: email,
        password: password,
      })
      .subscribe((response:any) => {
        this.cookies.set('token',response.token);
        this.cookies.set('userData',JSON.stringify(response.userData));
        this.router.navigate(['/']);
      });
  }

  getIdToken() {
    return this.cookies.get('token');
  }

  getUserData() {
    return JSON.parse(this.cookies.get('userData'));
  }

  logout() {
    this.cookies.set('token','');
    this.cookies.set('userData','');
    this.router.navigate(['/login'])
  }
}
