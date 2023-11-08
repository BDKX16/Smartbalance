import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private loginService:LoginService){}
  title = 'Smartband';


  estaLogueado(){
    return this.loginService.getIdToken();
  }

  logout(){
    this.loginService.logout();
  }
}
