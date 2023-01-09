import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListCatalogosComponent } from './list-catalogos/list-catalogos.component';
import { ListTrabajosComponent } from './list-trabajos/list-trabajos.component';
import { TrabajosComponent } from './trabajos/trabajos.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'list-trabajos', component: ListTrabajosComponent },
  { path: 'trabajos', component: TrabajosComponent},
  { path: 'list-catalogos', component: ListCatalogosComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
