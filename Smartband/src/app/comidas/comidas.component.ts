import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.component.html',
  styleUrls: ['./comidas.component.css']
})
export class ComidasComponent {

constructor(private loginService:LoginService){}


  cargarAlimentos(form:NgForm){

    const token = this.loginService.getIdToken();

    console.log(token)
  }

}
