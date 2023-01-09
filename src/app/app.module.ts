import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTrabajosComponent } from './list-trabajos/list-trabajos.component';
import { TrabajosComponent } from './trabajos/trabajos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ListTrabajosComponent,
    TrabajosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    NgImageFullscreenViewModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
