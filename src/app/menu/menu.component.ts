import { Component } from '@angular/core';
import { Service } from '../notifcation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(public service: Service) {}
  changeTemp() {
      this.service.changeCelsius();
  }
}
