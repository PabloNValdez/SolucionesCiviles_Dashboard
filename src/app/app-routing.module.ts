import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListCatalogosComponent } from './list-catalogos/list-catalogos.component';
import { ListTrabajosComponent } from './list-trabajos/list-trabajos.component';
import { TrabajosComponent } from './trabajos/trabajos.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'list-trabajos', component: ListTrabajosComponent, canActivate: [AuthGuard] },
  { path: 'trabajos', component: TrabajosComponent, canActivate: [AuthGuard]},
  { path: 'list-catalogos', component: ListCatalogosComponent, canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
