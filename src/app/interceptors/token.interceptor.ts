import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchAll } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token');
        if (token) {
          request = request.clone({
            setHeaders: {
              'Authorization': 'Bearer ' + token
            }
          });
        }
        if (!request.headers.has('Content-Type')) {
          request = request.clone({
            setHeaders: {
              'content-type': 'application/json'
            }
          });
        }
        request = request.clone({
          headers: request.headers.set('Accept', 'application/json')
        });
        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              console.log('event--->>>', event);
              if (event.statusText === "Created") {
                Swal.fire({
                  type: 'success',
                  title: 'Registered',
                  text: 'New user registered!',
                });
              }
              if (event.statusText === "OK") {
                Swal.fire({
                  type: 'success',
                  title: 'Logged In',
                  text: 'User has successfully logged in!',
                });
              }
            }         
            return event;
          }),

          catchError((error: HttpErrorResponse) => {
            console.log(error);

            if (error.status === 401) {
             this.router.navigate(['login']);            
            }
            if (error.status === 400) {
              let errorMessage = "";          
              if (error.error.UserName !== undefined) errorMessage += (" " + error.error.UserName[0]);
              if (error.error.Email !== undefined) errorMessage += (" " + error.error.Email[0]);
              if (error.error.Password !== undefined) errorMessage += (" " + error.error.Password[0]);
              if (error.error === "Email already exists") errorMessage += (" Email already exists.");
              if (error.error === "User not registered! Please check that your Email and Password have been entered correctly"){
                errorMessage += (" User not registered! Please check that your Email and Password have been entered correctly.");
              }

              if (errorMessage !== "")
              Swal.fire({
                type: 'error',
                title: 'Oops',
                text: errorMessage,
              });
              
              
            }
            return throwError(error);
          }));
    }
}