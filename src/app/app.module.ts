import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angular2-qrcode';

import { AppComponent } from './app.component';
import { CodeService } from './core/services/code.service';
import { HomeComponent } from './pages/home/home.component';
import { RandomPageComponent } from './pages/random-page/random-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RandomPageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  providers: [CodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
