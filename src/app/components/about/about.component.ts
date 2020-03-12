import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  
  constructor(private auth: AuthService, private router: Router) {
    
  }

  ngOnInit() {
  }
  

  salir() {

    //llamo la función de auth.service.ts para eliminar el token = cerrar sesión
    this.auth.logout();
    //para que se recargue la página y se elimine la sesión
    location.reload();
    //this.router.navigateByUrl('/home');
  }
  

  

}
