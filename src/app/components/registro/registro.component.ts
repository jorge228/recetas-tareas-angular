import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    //instancio usuario al iniciar página

    this.usuario = new UsuarioModel();
    
    //this.usuario.email = 'jorgelozano228@gmail.com';
  }


  
  onSubmit(form: NgForm) {
    //console.log(form);
    //Si envío form con algún campo no validado, hago un return
    //invalid y valid están en las propiedades del form, en console.log(form)
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
      .subscribe(resp => {

        console.log(resp);
        Swal.close();

        //cada vez que se crea un usuario, meto su mail en el localStorage si recordarme es true
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        //esto para cogerlo en el about; hay otro en inicio sesión
        localStorage.setItem('correo', this.usuario.email);
        localStorage.setItem('contrasena', this.usuario.password);
        this.router.navigateByUrl('/about');

      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal...',
          text: err.error.error.message
        });
      });
  }

}
