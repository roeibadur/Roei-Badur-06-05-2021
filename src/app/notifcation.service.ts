import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn:'root'})
export class Service {
  isCelsius: boolean = true;
  constructor(private toastr: ToastrService) {}
  showSuccess(messeage: string) {
    this.toastr.success(messeage, 'Success', {timeOut: 2000});
  }

  showError(messeage: string) {
    this.toastr.error(messeage, 'Error', {timeOut: 2000});
  }

  changeCelsius() {
    this.isCelsius = !this.isCelsius;
  }
}
