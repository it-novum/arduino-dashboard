import {Component, Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {

  title = 'ngfrontend';
  data: {
    humidity: 0,
    temperature: 0
  };
  humidity: 0;
  temperature: 0;

  constructor(private socket: Socket) {
    this.socket.on('data', (data) => {
      this.data = data;
      this.updateData()
    });
  }

  updateData(){
    this.humidity = this.data.humidity;
    this.temperature = this.data.temperature;
  }



}
