import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



export interface Device {
  name: string;
  dId: string;
  userId: string;
  _id: string;
}



@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit{

  constructor(private loginService:LoginService, private httpClient:HttpClient){}

  devices:Device[]=[];

  ngOnInit(): void {   
    
    const token = this.loginService.getIdToken();
    
    const httpHeaders = {
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
    };

    this.httpClient
      .get('http://localhost:3000/api/device', httpHeaders)
      .subscribe((response: any) => {
        console.log(response)
        this.devices = response.data;
      });
  }
  
  
  addDevice(form:NgForm){

    const serial = form.value.serial;

    const token = this.loginService.getIdToken();

    const toSend={
      dId: serial
    }

    const httpHeaders = {
      headers: {
        token: token,
        "Content-Type": "application/json"
      }
    };
    
    this.httpClient
      .post('http://localhost:3000/api/device',toSend,httpHeaders)
      .subscribe((response:any) => {
        console.log(response.data);
        window.location.reload();
      });
    
  }

}
