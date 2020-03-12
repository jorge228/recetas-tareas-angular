import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

//para transformar lo que un observador puede devolver
import { map, delay } from 'rxjs/operators'
import { UsuarioModel } from '../models/usuario.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private itemsCollection: AngularFirestoreCollection<UsuarioModel>;
  public usuarios: UsuarioModel[] = [];
  correo : string = localStorage.getItem("correo");

  
  constructor(private afs: AngularFirestore) { }

  cargarUsuarios (){
    this.itemsCollection = this.afs.collection<UsuarioModel>('usuarios', ref => ref.where('nombre','==','paco'));
    
    
    
    return this.itemsCollection.valueChanges()/*.pipe(
      map((usus: UsuarioModel[]) =>{
        console.log(usus);
      })
    )*/
                  /*.map((usus: UsuarioModel[]) =>{
                    console.log(usus);
                  });*/
  }

  
  recuperaUsuario(){
    
    this.itemsCollection = this.afs.collection<UsuarioModel>('usuarios', ref => ref.where('email','==', this.correo));
    return this.itemsCollection.valueChanges();/*
    .pipe(
      map((usus: UsuarioModel[]) =>{
        console.log(usus);
      })
    )*/
  }

  agregarUsuario(usua: UsuarioModel){

    /*let usu : UsuarioModel ={
      nombre: usua.nombre,
      email: usua.email
    }*/
    /*let usu : UsuarioModel ={
      nombre: "lusi",
      email: "luci@gmail.com"
    }*/

    this.itemsCollection.add(usua);
  }
}
