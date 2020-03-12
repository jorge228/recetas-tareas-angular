import { Component, OnInit } from '@angular/core';
import { TareaModel } from 'src/app/models/tarea.model';
import { TareasService } from 'src/app/services/tareas.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareas: TareaModel[] = [];
  cargando = false;

  constructor(private tareasService: TareasService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.cargando = true;
    this.tareasService.getTareas()
      .subscribe(resp => {
        this.tareas = resp;
        this.cargando = false;
      });
  }

  //botón de cerrar sesión
  salir() {
    //llamo la función de auth.service.ts para eliminar el token = cerrar sesión
    this.auth.logout();
    //para que se recargue la página y se elimine la sesión
    location.reload();
    //this.router.navigateByUrl('/home');
  }

  //botón mi perfil
  miPerfil(){
    this.router.navigateByUrl('formulario');
  }

  borrarTarea(tarea: TareaModel, i: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Va a eliminar a este ${tarea.descripcion}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      //si la respuesta es true, elimino héroe, en cualquier otro caso se ignora
      if (resp.value) {
        //con splice elimino el índice i, comenzando en i, y 1 elementos
        this.tareas.splice(i, 1);
        this.tareasService.borrarTarea(tarea.id).subscribe();
      }
    });


  }

}
