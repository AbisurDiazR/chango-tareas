import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HomeComponent } from './components/home/home.component';
import { RegistroestudiantesComponent } from './components/registroestudiantes/registroestudiantes.component';
import { RegistromaestrosComponent } from './components/registromaestros/registromaestros.component';
import { SesionmaestrosComponent } from './components/sesionmaestros/sesionmaestros.component';
import { SesionestudiantesComponent } from './components/sesionestudiantes/sesionestudiantes.component';
import { ChatComponent } from './components/chat/chat.component';

//importamos el modulo toast
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FailureComponent } from './components/failure/failure.component';
import { PendingComponent } from './components/pending/pending.component';
import { SuccessComponent } from './components/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroestudiantesComponent,
    RegistromaestrosComponent,
    SesionmaestrosComponent,
    SesionestudiantesComponent,
    ChatComponent,
    FailureComponent,
    PendingComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
