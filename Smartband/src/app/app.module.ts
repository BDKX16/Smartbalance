import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ComidasComponent } from './comidas/comidas.component';
import { DeviceComponent } from './device/device.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginService } from './login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginGuardian } from './login/login-guardian';
import { ErrorComponent } from './error/error.component';
import { TopbarComponent } from './topbar/topbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';

import {MatPaginatorModule} from '@angular/material/paginator';

const appRoutes:Routes=[
  {path:"login",component:LoginComponent},
  {path:"comidas",component:ComidasComponent},
  {path:"",component:DashboardComponent},
  {path:"newdevice",component:DeviceComponent,canActivate:[LoginGuardian]},
  {path:"**",component:ErrorComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DeviceComponent,
    DashboardComponent,
    ComidasComponent,
    ErrorComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [LoginService, CookieService, LoginGuardian],
  bootstrap: [AppComponent]
})
export class AppModule { }
