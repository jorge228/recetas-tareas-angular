import { Component, OnInit } from '@angular/core';
import { RecetaModel } from 'src/app/models/receta.model';
import { RecetasService } from 'src/app/services/recetas.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  //public receta : RecetaModel;
  public recetas : RecetaModel[] = [];
  id: number;
  
  constructor(private recetasService: RecetasService, private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
this.id = this.rutaActiva.snapshot.params.id;
    this.obtenerReceta();
    console.log(this.id);
  }

  obtenerReceta(){
    return this.recetasService
      .getReceta(this.id)
      .subscribe((recetas:RecetaModel[]) => this.recetas = recetas);
  }

}
