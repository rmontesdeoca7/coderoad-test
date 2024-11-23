import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// interfaces
import { IQuery, IResponse } from '@/interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpClient = inject(HttpClient);
  private readonly apiKey = '1b501bbda107113acc653f328a2e935d';

  getMovies(query: IQuery): Observable<IResponse> {
    const url = `https://api.themoviedb.org/3/movie/${query.category}?language=${query.language}&api_key=${this.apiKey}&page=${query.page}`;
    return this.httpClient.get<IResponse>(url)
  }

}
