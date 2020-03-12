import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:sign';
  
  //mi apike, de firebase
  private apikey = 'AIzaSyCYoY7xoWXKlBVnhtlw7XfGAF-SAgTgem0';

  userToken: string;

  //Sign up with email-password -> New User
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Sign in with email-password -> Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor(private http: HttpClient) {
    //para saber si hay token desde el comienzo
    this.leerToken();
  }
  


  logout() {
    localStorage.removeItem('token');
    
  }

  login(usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}InWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

  }

  nuevoUsuario(usuario: UsuarioModel) {
    //mail y usuario ya viene en el usuario; lo siguente de abajo es igual que el ...usuario, pero ... envía todos los atributos
    //email:usuario.email,
    //password: usuario.password,
    //returnSecureToken: true
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}Up?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

  }


  private guardarToken(idToken: string) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    //obtengo token y veo el momento exacto
    let hoy = new Date();
    //suma los 3600 segundos
    hoy.setSeconds(3600);

    //guardo la fecha futura (una hora más) pero en string
    localStorage.setItem('expira', hoy.getTime().toString());


  }

  leerToken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }


  estaAutenticado(): boolean {

    if (this.userToken.length < 2) {
      return false;
    }

    //creo expira, 3600s que es lo que dura sesion firebase, formateado a número, 
    //del localStorage, recogido en guardarToken
    //creo una fecha nueva y cuando esta sea mayor al expira, ya se ha superado el tiempo
    //y devuelvo false (toke no válido)
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }


  }


}
