import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteModel } from 'src/app/models/cliente.model';
import { RecetasService } from 'src/app/services/recetas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string = null;

  public clientes: ClienteModel[] = [];

  constructor(private recetasService: RecetasService) {

  }

  ngOnInit() {
    this.token = localStorage.getItem("token");
    this.recetasService
      .getClientes()
      .subscribe((clientes:ClienteModel[]) => this.clientes = clientes);
  }

  obtenerClientes(){
    return this.recetasService
      .getClientes()
      .subscribe((clientes:ClienteModel[]) => this.clientes = clientes);
  }

}
