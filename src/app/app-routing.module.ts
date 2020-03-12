import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { RecetaComponent } from './components/receta/receta.component';


const routes: Routes = [
  //canActivate: [ AuthGuard ] para autenticar
  //{ path: 'home', component: HomeComponent },
  { path: 'recetas', component: RecetasComponent },
  { path: 'receta/:id', component: RecetaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'formulario', component: FormularioComponent, canActivate: [ AuthGuard ]},
  { path: 'tareas', component: TareasComponent, canActivate: [ AuthGuard ] },
  { path: 'tarea/:id', component: TareaComponent, canActivate: [ AuthGuard ] },
  //{ path: 'about', component: AboutComponent, canActivate: [ AuthGuard ] },
  { path: '**', redirectTo: 'recetas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
