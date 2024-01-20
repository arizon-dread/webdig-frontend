import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrType } from '../enums/toastr-type';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private toastr: ToastrService) { }
  handleError<T>(operation = 'operation', result?: T, message = '', appendError = false) {
    return (err: HttpErrorResponse): Observable<T> => {
      console.log("Error received in errorHandler: " + err);

      //Do a bunch of logic to display error to user.
      if (err.status === 400) {
        this.displayMsgToUser("You did something the backend didn't like: " + err.message, ToastrType.error);
      } else if (err.status === 401) {
        this.displayMsgToUser("You don't seem to be logged in.", ToastrType.error);
        //this.router.navigate("/login");
      } else if (err.status === 500) {
        this.displayMsgToUser(err.message + " " + err.statusText, ToastrType.error);
      } 
      return throwError(()  => err);
    }
  }
  displayMsgToUser(message: string, type: ToastrType) {
    switch (type) {
      case ToastrType.error:
        return this.toastr.error(message);
      case ToastrType.info:
        return this.toastr.info(message);
      case ToastrType.show:
        return this.toastr.show(message);
      case ToastrType.warning:
        return this.toastr.warning(message);
      default:
        return this.toastr.success(message);
    }
  }
}
