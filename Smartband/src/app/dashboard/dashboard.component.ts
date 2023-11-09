import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { HttpClient } from '@angular/common/http';

export interface IUserIngests {
  name: string;
  foodId: number;
  grams: number;
  time: string;
  dia: number;
  prots: number;
  carbs: number;
  fats: number;
  calorias: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient
  ) {}
  displayedColumns: string[] = [
    'name',
    'time',
    'grams',
    'prots',
    'carbs',
    'fats',
    'calorias',
  ];
  UserIngests: IUserIngests[] = [];
  UserIngestsTable: IUserIngests[] = [];
  UserFoods = [];
  diaActualCode: number = 0;
  diaShownCode: number = 0;
  diaShown: string = '';
  diaAsegun: string = 'Hoy';

  ngOnInit(): void {
    const timestamp = Date.now();
    const ahora = new Date(timestamp);

    // Obtener el día de la semana
    const diasSemana = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    this.diaShown = diasSemana[ahora.getDay()];
    this.diaActualCode = ahora.getDay();
    this.diaShownCode = ahora.getDay();

    const token = this.loginService.getIdToken();

    const httpHeaders = {
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
    };

    this.httpClient
      .get('http://localhost:3000/api/get-user-foods', httpHeaders)
      .subscribe((response: any) => {
        console.log(response.data);
        this.UserFoods = response.data;
      });

    let baseUrl = 'http://localhost:3000/api/get-data?timeAgo=' + 4;
    let tempIngestsArray: any;

    this.httpClient.get(baseUrl, httpHeaders).subscribe((response: any) => {
      console.log(response.data);
      tempIngestsArray = response.data;
      let tempSendArray: IUserIngests[] = [];

      tempIngestsArray.forEach(
        (item: { foodId: number; grams: number; time: number }) => {
          this.UserFoods.forEach(
            (userFood: {
              foodId: number;
              name: string;
              calorias: number;
              fats: number;
              carbs: number;
              prots: number;
            }) => {
              if (item.foodId === userFood.foodId) {
                const index = item.grams / 100;

                const now = new Date(item.time);
                // Obtener el momento del día en HH:MM
                const horas = now.getHours();
                const minutos = now.getMinutes();
                const momentoDia = `${horas < 10 ? '0' + horas : horas}:${
                  minutos < 10 ? '0' + minutos : minutos
                }`;

                const newItem = {
                  foodId: item.foodId,
                  name: userFood.name,
                  grams: item.grams,
                  dia: now.getDay(),
                  time: momentoDia,
                  prots: userFood.prots * index,
                  carbs: userFood.carbs * index,
                  fats: userFood.fats * index,
                  calorias: userFood.calorias * index,
                };

                tempSendArray.push(newItem);
              }
            }
          );
          this.UserIngests = tempSendArray;
          console.log(tempSendArray);

          //if()
        }
      );
    });
  }

  nextDay(){
    if(this.limiteDia("next")){

      const diasSemana = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ];

      this.diaShownCode = this.diaShownCode + 1;
      this.diaShown = diasSemana[this.diaShownCode];
      
      const dif = this.diaActualCode - this.diaShownCode;
      if(dif <= 2 && dif >= 0){
        const diasAsegun = [
          'Hoy',
          'Ayer',
          'Anteayer'
        ];
        this.diaAsegun = diasAsegun[dif];

      }else{
        this.diaAsegun = this.diaShown;
      }
    }
  }

  prevDay(){
    if(this.limiteDia("prev")){

      const diasSemana = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ];

      this.diaShownCode = this.diaShownCode - 1;
      this.diaShown = diasSemana[this.diaShownCode];

      const dif = this.diaActualCode - this.diaShownCode;
      if(dif <= 2 && dif >= 0){
        const diasAsegun = [
          'Hoy',
          'Ayer',
          'Anteayer'
        ];
        this.diaAsegun = diasAsegun[dif];

      }else{
        this.diaAsegun = this.diaShown;
      }
      
    }
  }

  limiteDia(move:string){
    if(this.diaShownCode>0&&this.diaShownCode<6){
      if(move==='next'&&this.diaShownCode<this.diaActualCode){
        return true;
      }else if(move==='prev'){
        return true;
      }
      return false;
    }else if(this.diaShownCode==0 && move==='next'){
      return true;
    }
    return false;
  }

  getTotal(type: string) {
    if (type == 'fats') {
      return this.UserIngests.map((t) => t.fats).reduce(
        (acc, value) => acc + value,
        0
      );
    } else if (type == 'carbs') {
      return this.UserIngests.map((t) => t.carbs).reduce(
        (acc, value) => acc + value,
        0
      );
    } else if (type == 'prots') {
      return this.UserIngests.map((t) => t.prots).reduce(
        (acc, value) => acc + value,
        0
      );
    }

    return '-';
  }

  getTotalGrams() {
    return this.UserIngests.map((t) => t.grams).reduce(
      (acc, value) => acc + value,
      0
    );
  }

  getTotalCalories() {
    return this.UserIngests.map((t) => t.calorias).reduce(
      (acc, value) => acc + value,
      0
    );
  }
}
