import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { DatosService } from '../../services/datos.service';
import { map, delay } from 'rxjs/operators'

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  
  correo: string = "";
  
  formulario: FormGroup;

  usuario : UsuarioModel= new UsuarioModel();
  public usuarios: Observable<any[]>;


  public checks: Array<any> = [
    //el value es lo que mete en bbdd
    {description: 'Fútbol', value: 'Fútbol'},
    {description: "Baloncesto", value: 'Baloncesto'},
    {description: "Ciclismo", value: 'Ciclismo'},
    {description: "Correr", value: 'Correr'},
    {description: "Leer", value: 'Leer'}
  ];

  constructor(db: AngularFirestore, public _ds: DatosService, private router: Router) {
    //this.usuarios = db.collection('usuarios').valueChanges();
    //this._ds.cargarUsuarios().subscribe();
    this._ds.recuperaUsuario().subscribe();

    
  
  
    this.correo=localStorage.getItem("correo");
    this.formulario = new FormGroup({
      'email': new FormControl(this.correo),
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellido': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'sexo': new FormControl('',Validators.required),
      'pais':new FormControl('', Validators.required),
      'aficiones': new FormArray([]),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });
    this.formulario.controls['password2'].setValidators([Validators.required, this.comprobrarPass.bind(this.formulario)]);


  }

  ngOnInit() {
  }

  guardarCambios() {
    let usu : UsuarioModel ={
      //password: localStorage.getItem("contrasena"),
      password: this.formulario.controls.password1.value,
      email: this.formulario.controls.email.value,
      nombre: this.formulario.controls.nombre.value,
      apellido: this.formulario.controls.apellido.value,
      sexo: this.formulario.controls.sexo.value,
      pais: this.formulario.controls.pais.value,
      aficiones: this.formulario.controls.aficiones.value
    }

    this._ds.agregarUsuario(usu);
    //this.datoService.insertarUsuario(this.formulario.value);
    //const {email, username} = this.formulario.value;
    //this.usuario = {username, email};
    //this._ds.agregarUsuario(this.usuario);
    console.log(this.formulario.value);
    console.log(this.formulario);
    //para despueñes de enviar form, que vuelva por defecto; la mejor, la tercera
    //this.forma.setValue(this.usuario);
    //this.forma.reset(this.usuario);
    //this.usuario.email = ""+this.formulario.controls.email;
    console.log(this.usuario);
    this.formulario.reset();
    this.router.navigateByUrl('/tareas');
  }

  onCheckChange(event) {
    const formArray: FormArray = this.formulario.get('aficiones') as FormArray;
    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));
    }
    else{
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  comprobrarPass(control: FormControl): { [s: string]: boolean } {
    //no es !== this.forma.controls porque ya nos referimos al form con el this en el bind
    let forma: any = this;
    if (control.value !== forma.controls['password1'].value) {
      return {
        noiguales: true
      }
    }
    return null;
  }

}
