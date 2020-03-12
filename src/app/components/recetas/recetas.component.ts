import { Component, OnInit } from '@angular/core';
import { RecetaModel } from 'src/app/models/receta.model';
import { RecetasService } from 'src/app/services/recetas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {

  public recetas : RecetaModel[] = [];

  constructor(private recetasService: RecetasService) { }

  ngOnInit() {
    this.obtenerRecetas();
  }

  obtenerRecetas(){
    return this.recetasService
      .getRecetas()
      .subscribe((recetas:RecetaModel[]) => this.recetas = recetas);
  }

}
