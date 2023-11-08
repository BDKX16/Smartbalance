import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  constructor(private loginService:LoginService){}
  title = 'Smartband';


  estaLogueado(){
    return this.loginService.getIdToken();
  }

  logout(){
    this.loginService.logout();
  }

}
