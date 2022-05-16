import {Injectable} from '@angular/core';
import {Hero} from "./model/Hero";
import {catchError, Observable, of, tap} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl: string = 'api/heroes';


  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    // this.log('fetched heroes');
    // return heroes;
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }


  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    // const hero = HEROES.find(h => h.id === id)!;
    // this.log(`fetched hero id=${id}`);
    // return of(hero);
    return this.http.get<Hero>(this.heroesUrl + '/' + id).pipe(
      tap(_ => this.log(`fetched heroes id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(message: string) {
    return this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
}
