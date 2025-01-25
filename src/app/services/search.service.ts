import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // Update the search query
  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  // Get the current search query as an observable
  getSearchQuery(): Observable<string> {
    return this.searchQuerySubject.asObservable();
  }
}
