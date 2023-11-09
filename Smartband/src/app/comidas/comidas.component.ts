import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


export interface UserData {
  name: string;
  prots: number;
  carbs: number;
  fats: number;
  calorias: number;
}


@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.component.html',
  styleUrls: ['./comidas.component.css']
})
export class ComidasComponent implements OnInit{

constructor(private loginService:LoginService,private httpClient:HttpClient){}


displayedColumns: string[] = ['name', 'prots', 'carbs', 'fats', 'calorias', 'actions'];
  dataSource = [];

  ngOnInit(): void {
    const token = this.loginService.getIdToken();

    const httpHeaders = {
      headers: {
        token: token,
        "Content-Type": "application/json"
      }
    };

    this.httpClient
      .get('http://localhost:3000/api/get-user-foods',httpHeaders)
      .subscribe((response:any) => {
        console.log(response.data);
        this.dataSource=response.data;
      });

  }

  cargarAlimentos(form:NgForm){

    const token = this.loginService.getIdToken();

    console.log(token)
  }

  remove(foodId:Number){
    console.log(foodId);
  }
}
