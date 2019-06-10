import { Injectable } from '@angular/core';
import { Verification } from '../../verification/verification';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  apiUrl = 'https://localhost:6001/api/verification';

  constructor(private http: HttpClient) { }

  getVerification(): Observable<Verification[]> {
    return this.http.get<Verification[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched verifications')),
        catchError(this.handleError('getVerification', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
