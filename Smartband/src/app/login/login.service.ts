import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  constructor(private router: Router, private httpClient: HttpClient) {}

  token: string | undefined;
  userData: any | undefined;

  login(email: string, password: string) {
    return this.httpClient
      .post('http://localhost:3000/api/login', {
        email: email,
        password: password,
      })
      .subscribe((response:any) => {
        this.token = response.token;
        this.userData = response.userData;
        this.router.navigate(['/']);
      });
  }

  getIdToken() {
    return this.token;
  }

  getUserData() {
    return this.userData;
  }

  logout() {
    this.userData = undefined;
    this.token = undefined;
    this.router.navigate(['/login'])
  }
}
