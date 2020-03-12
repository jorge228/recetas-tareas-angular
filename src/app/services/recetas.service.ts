import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  baseUrl = environment.baseUrl;
  mysqlUrl = environment.mysqlUrl;
  
  constructor(private http: HttpClient) { }

  getRecetas(){
    return this.http.get(`${this.mysqlUrl}`);
  }
  getReceta(id: string | number){
    return this.http.get(`${this.mysqlUrl}?id=${id}`);
  }

  getClientes() {
    return this.http.get(`${this.baseUrl}`);
  }

  getCliente(id: string | number){
    //http://localhost/api_completa/index.php?numCliente=2
    return this.http.get(`${this.baseUrl}?numCliente=${id}`);
  }
}
