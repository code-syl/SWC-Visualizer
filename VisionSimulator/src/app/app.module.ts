import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TileComponent } from './components/tile/tile.component';
import {NumberInputBoxComponent} from "./components/input-box/number-input-box.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TileComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomePageComponent},
    ]),
    NumberInputBoxComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
