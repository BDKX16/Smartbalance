import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ComidasComponent } from './comidas/comidas.component';
import { DeviceComponent } from './device/device.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes:Routes=[
  {path:"login",component:LoginComponent},
  {path:"comidas",component:ComidasComponent},
  {path:"",component:DashboardComponent},
  {path:"newdevice",component:DeviceComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DeviceComponent,
    DashboardComponent,
    ComidasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
