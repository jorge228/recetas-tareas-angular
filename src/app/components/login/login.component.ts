import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }


  login(form: NgForm) {
    if (form.invalid) { return; }

    //alertas
    Swal.fire({
      //para no cerrar alert si se hace click fuera
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    //la bolita de cargar
    Swal.showLoading();


    this.auth.login(this.usuario)
      .subscribe(resp => {

        console.log(resp);
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        localStorage.setItem('correo', this.usuario.email);
        localStorage.setItem('contrasena', this.usuario.password);

        
        this.router.navigateByUrl('/tareas');
        

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
