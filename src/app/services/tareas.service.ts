import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TareaModel } from '../models/tarea.model';

//para transformar lo que un observador puede devolver
//el observador está en tarea.ts, susbcribe
import { map, delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  //https://login-app-85deb.firebaseio.com/tareas.json
  private url = 'https://login-app-85deb.firebaseio.com/';

  constructor(private http: HttpClient) { }


  crearTarea(tarea: TareaModel) {

    return this.http.post(`${this.url}/tareas.json`, tarea).pipe(
      map((resp: any) => {
        //name es el id en firebase, así lo recupero y se lo 
        //pongo al tarea que devuelvo, y lo pone en el formulario  
        tarea.id = resp.name;
        //devuelve toda la tarea y además el id que le he asignado de la respuesta
        //el que venía en la res
        return tarea;
      })
    );
  }

  actualizarTarea(tarea: TareaModel){
    //este ya no tenemos que hacer el mapeado porque el id ya lo tenemos, lo trae la tarea enviamos por parámetro

    //si actualizo, el campo id del form lo mete como propiedad en firebase
    //me creo una tarea temporal y le elimino el id; en el form sale ese id pero no va a firebase
    //no lo elimino de la tarea porque como se pasa por referencia, se perdería el id en el form
    //por eso solo le envío a firebase el temp, rompiendo la referencia que tiene javascript
    let tareaTemp = {
      ...tarea
    };
    delete tareaTemp.id;

    //no puede ser un post porque lo crearía; put para actualizar
    return this.http.put(`${ this.url }/tareas/${ tarea.id }.json`, tareaTemp);
  }

  getTareas(){
    return this.http.get(`${ this.url }/tareas.json`)
          .pipe(
            map(this.crearArray),
            //para que aparezca el cartel cargando 1s
            delay(1000)
          );
  }

  getTarea(id: string){
    return this.http.get(`${ this.url }/tareas/${ id }.json`);
  }

  borrarTarea( id: string ){
    return this.http.delete(`${ this.url }/tareas/${ id }.json`);
  }

  private crearArray( tareasObj: object){
    //console.log(heroesObj);

    let tareas: TareaModel[] = [];

    //el key es el id de firebase; min 6 v12 12
    Object.keys(tareasObj).forEach(key=>{
      //extraigo el objeto
      let tarea: TareaModel = tareasObj[key];
      //le doy el id de firebase
      tarea.id = key;
      tareas.push(tarea);
    });
    //por si la bbdd está vacía
    if(tareasObj === null ){return []; }
    return tareas;
  }


}
