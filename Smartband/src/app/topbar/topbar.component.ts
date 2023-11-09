import { Component,ElementRef, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit{
  constructor(private loginService:LoginService){}
  ngOnInit(): void {
  }
  
  estaLogueado(){
    return this.loginService.getIdToken();
  }

  logout(){
    this.loginService.logout();
  }

}
