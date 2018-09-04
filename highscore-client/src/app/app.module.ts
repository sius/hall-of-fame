import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiModule as HighscoreServiceModule, BASE_PATH } from '../lib/highscore-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HighscoreServiceModule
  ],
  providers: [{
    provide: BASE_PATH, useValue: 'http://localhost:3000/api/v1'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
