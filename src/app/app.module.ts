import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrabajosComponent } from './trabajos/trabajos.component';
import { ListTrabajosComponent } from './list-trabajos/list-trabajos.component';
import { ListCatalogosComponent } from './list-catalogos/list-catalogos.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptorService } from './Services/auth.interceptor.service';
import { EditTrabajoComponent } from './edit-trabajo/edit-trabajo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmationComponent } from './Modals/modal-confirmation/modal-confirmation.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CatalogosComponent } from './catalogos/catalogos.component';

export function tokenGetter() {
  return sessionStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    ListTrabajosComponent,
    TrabajosComponent,
    ListCatalogosComponent,
    HomeComponent,
    EditTrabajoComponent,
    ModalConfirmationComponent,
    CatalogosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    NgImageFullscreenViewModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7073'], //-> comentar para publicar
        //allowedDomains: ['asdasdad.com'], // -> descomentar para publicar
        disallowedRoutes: [],
      },
    }),
    NgbModule,
    NgxPaginationModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
