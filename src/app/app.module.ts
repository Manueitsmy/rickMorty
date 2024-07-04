import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { AppRoutingModule } from './app-routing.module';
import { CountdownPipe } from './countdown.pipe'; // Assurez-vous d'importer le pipe

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CountdownPipe // Déclarez le pipe ici
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }