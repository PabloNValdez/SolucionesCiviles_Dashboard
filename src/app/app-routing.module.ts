import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListCatalogosComponent } from './list-catalogos/list-catalogos.component';
import { ListTrabajosComponent } from './list-trabajos/list-trabajos.component';
import { TrabajosComponent } from './trabajos/trabajos.component';
import { AuthGuard } from './guards/auth.guard';
import { EditTrabajoComponent } from './edit-trabajo/edit-trabajo.component';
import { CatalogosComponent } from './catalogos/catalogos.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'list-trabajos', component: ListTrabajosComponent, canActivate: [AuthGuard] },
  { path: 'trabajos', component: TrabajosComponent, canActivate: [AuthGuard]},
  { path: 'list-catalogos', component: ListCatalogosComponent, canActivate: [AuthGuard]},
  { path: 'edit-trabajo/:id', component: EditTrabajoComponent, canActivate: [AuthGuard]},
  { path: 'catalogos', component: CatalogosComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
