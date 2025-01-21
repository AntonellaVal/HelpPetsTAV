import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiservicioService {

  //cabecera si es que la api la pide
  httpOptions = { 
    headers: new HttpHeaders(
      { 
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*'
       }
    )
  }
  //URL de la ubicacion de la api rest a consumir

  //ocupar esto exactamente para lo de la api por que funciona ya que lo hizo el profe
  apiUrl: string = "https://huachitos.cl/api/animales";

  constructor(private Http: HttpClient) { }
  //metodo para obtener todos los datos de la api rest
  obtenerPosts(): Observable<any>{
    //realizar una consulta tipo GET a la api
    return this.Http.get(this.apiUrl + '/tipo/perro/').pipe(
      retry(3)
    );
  }
}
