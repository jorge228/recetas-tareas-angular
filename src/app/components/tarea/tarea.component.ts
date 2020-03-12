import { Component, OnInit } from '@angular/core';
import { TareaModel } from 'src/app/models/tarea.model';
import { NgForm } from '@angular/forms';
import { TareasService } from 'src/app/services/tareas.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {
  
  //https://login-app-85deb.firebaseio.com/tareas.json

  tarea: TareaModel = new TareaModel();
  

  constructor(private tareasService: TareasService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //obtengo id de la url; para ello, private route: ActivatedRoute
    //en otros ejemplos nos suscribíamos a los cambios del snapshot
    let id = this.route.snapshot.paramMap.get('id');
    //si le doy al botón de agregar -> routerLink="/heroe/nuevo"
    //al de modificar el de algún héroe -> [routerLink]="['/heroe', heroe.id ]"
    //en uno envío 'nuevo' y en otro un id
    if (id !== 'nueva'){
      this.tareasService.getTarea( id )
        .subscribe((resp: TareaModel)=>{
          //en la resp no viene el id; pues la cambio a resp: HeroeModel y le doy el id
          this.tarea = resp;
          this.tarea.id = id;
        });
      
    }
  }

  guardar(form: NgForm) {

    if (form.invalid) {
      console.log("Formulario NO VÁLIDO");
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.tarea.id) {
      peticion = this.tareasService.actualizarTarea(this.tarea);
    } else {
      peticion = this.tareasService.crearTarea(this.tarea);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.tarea.descripcion,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
      this.router.navigateByUrl('/tareas');
    });

  }

}
