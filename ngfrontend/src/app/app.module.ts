import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChartComponent } from './chart/chart.component';
import { ThermometerComponent } from './thermometer/thermometer.component';

const config: SocketIoConfig = { url: 'http://localhost:4000/', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ThermometerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
