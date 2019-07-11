import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate( // Is the user authorised or not.
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // console.log(this.router);
      const key = localStorage.getItem('token');
      if (key == null) {
        // console.log(this.router.url);
        Swal.fire({
          type: 'error',
          title: 'Oops',
          text: 'Your session has expired. Please log in and try again.',
          confirmButtonColor: '#ff0066'
        });
        this.router.navigate(['/login'], { queryParams: { redirect: this.router.url } });
        return false;
      }

      const now = new Date();
      // console.log(now);
      const currentTime = now.getTime() / 1000;
      const expiry = JSON.parse(window.atob(key.split('.')[1])).exp;

      // console.log('currentTime', currentTime);
      // console.log('expiry', expiry);

      if (currentTime >= expiry) {
        // console.log(this.router.url);
        Swal.fire({
          type: 'error',
          title: 'Oops',
          text: 'Your session has expired. Please log in and try again.',
          confirmButtonColor: '#ff0066'
        });
        this.router.navigate(['/login'], { queryParams: { redirect: this.router.url } });
        return false;
      }
      return true;
  }
}
