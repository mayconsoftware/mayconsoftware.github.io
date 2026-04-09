import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContributionCalendar } from '../models/contribution.model';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private http = inject(HttpClient);

  getContributions(): Observable<ContributionCalendar> {
    return this.http.get<ContributionCalendar>('assets/contributions.json');
  }
}
